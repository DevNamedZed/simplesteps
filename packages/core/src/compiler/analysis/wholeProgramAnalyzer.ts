// ---------------------------------------------------------------------------
// Whole-Program Analyzer
//
// Top-level orchestrator for cross-module constant propagation.
// Caches per-module environments and provides demand-driven import resolution.
// ---------------------------------------------------------------------------

import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import { ErrorCodes, type DiagnosticCode } from '../diagnosticCodes.js';
import type { ServiceRegistry } from '../discovery/serviceDiscovery.js';
import {
  type LatticeValue,
  constant,
  bottom,
  isConstant,
} from './lattice.js';
import {
  ModuleEnvironment,
  analyzeModule,
  type ImportResolver,
  type NamespaceResolver,
} from './moduleAnalyzer.js';

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

export interface WholeProgramAnalyzerOptions {
  /** Maximum inlining depth for pure functions (default: 1). */
  readonly inliningDepth?: number;
}

// ---------------------------------------------------------------------------
// WholeProgramAnalyzer
// ---------------------------------------------------------------------------

export class WholeProgramAnalyzer {
  private readonly program: ts.Program;
  private readonly checker: ts.TypeChecker;
  private readonly context: CompilerContext;
  private readonly serviceRegistry: ServiceRegistry;
  private readonly inliningDepth: number;

  /** Cached module environments keyed by file path. */
  private readonly cache = new Map<string, ModuleEnvironment>();

  /** Files currently being analyzed (cycle detection). */
  private readonly inProgress = new Set<string>();

  /** Track which diagnostics we've already emitted to avoid duplicates. */
  private readonly emittedDiagnostics = new Set<string>();

  constructor(
    context: CompilerContext,
    serviceRegistry: ServiceRegistry,
    options?: WholeProgramAnalyzerOptions,
  ) {
    this.context = context;
    this.program = context.program;
    this.checker = context.checker;
    this.serviceRegistry = serviceRegistry;
    this.inliningDepth = options?.inliningDepth ?? 1;
  }

  // -----------------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------------

  /**
   * Analyze a source file and return its module environment.
   * Results are cached — calling this twice for the same file is free.
   */
  analyzeFile(sourceFile: ts.SourceFile): ModuleEnvironment {
    const key = sourceFile.fileName;

    const cached = this.cache.get(key);
    if (cached) return cached;

    // Cycle detection
    if (this.inProgress.has(key)) {
      // Return a placeholder environment — imports from this file will Bottom
      const placeholder = new ModuleEnvironment(sourceFile, this.checker);
      this.cache.set(key, placeholder);
      return placeholder;
    }

    this.inProgress.add(key);

    const importResolver: ImportResolver = (fromFile, moduleSpec, importedName) => {
      return this.resolveImport(fromFile, moduleSpec, importedName);
    };

    const namespaceResolver: NamespaceResolver = (fromFile, moduleSpec) => {
      return this.resolveNamespaceImport(fromFile, moduleSpec);
    };

    const env = analyzeModule(
      sourceFile,
      this.checker,
      importResolver,
      namespaceResolver,
      this.inliningDepth,
    );

    this.cache.set(key, env);
    this.inProgress.delete(key);

    return env;
  }

  /**
   * Resolve a symbol to its lattice value, analyzing the declaring module if needed.
   */
  resolveSymbol(symbol: ts.Symbol): LatticeValue {
    const decls = symbol.getDeclarations();
    if (!decls || decls.length === 0) {
      return bottom(`Symbol '${symbol.getName()}' has no declarations`);
    }

    const sourceFile = decls[0].getSourceFile();
    if (sourceFile.isDeclarationFile) {
      return bottom(`Symbol '${symbol.getName()}' is from a declaration file`);
    }

    const env = this.analyzeFile(sourceFile);
    return env.resolve(symbol);
  }

  /**
   * Resolve an import across modules.
   */
  resolveImport(
    fromFile: ts.SourceFile,
    moduleSpecifier: string,
    importedName: string,
  ): LatticeValue {
    const resolved = this.resolveModulePath(fromFile, moduleSpecifier);
    if (!resolved) {
      this.emitImportDiagnostic(
        fromFile, moduleSpecifier,
        `Cannot resolve module '${moduleSpecifier}'`,
        ErrorCodes.DataFlow.UnresolvableImport,
      );
      return bottom(`Cannot resolve module '${moduleSpecifier}'`);
    }

    const targetFile = this.program.getSourceFile(resolved);
    if (!targetFile) {
      this.emitImportDiagnostic(
        fromFile, moduleSpecifier,
        `Module '${moduleSpecifier}' not found in program`,
        ErrorCodes.DataFlow.UnresolvableImport,
      );
      return bottom(`Module '${moduleSpecifier}' not found in program`);
    }

    if (targetFile.isDeclarationFile) {
      // Not an error — .d.ts modules just aren't analyzable for constant values
      return bottom(`Module '${moduleSpecifier}' is a declaration file — values not analyzable`);
    }

    // Cycle detection
    if (this.inProgress.has(targetFile.fileName)) {
      this.emitImportDiagnostic(
        fromFile, moduleSpecifier,
        `Circular import dependency: ${fromFile.fileName} → ${targetFile.fileName}`,
        ErrorCodes.DataFlow.CircularImport,
      );
      return bottom(`Circular import dependency: ${fromFile.fileName} → ${targetFile.fileName}`);
    }

    const env = this.analyzeFile(targetFile);

    if (importedName === 'default') {
      return env.getExport('default');
    }

    return env.getExport(importedName);
  }

  /**
   * Resolve a namespace import (import * as X) — returns an object of all exports.
   */
  resolveNamespaceImport(
    fromFile: ts.SourceFile,
    moduleSpecifier: string,
  ): LatticeValue {
    const resolved = this.resolveModulePath(fromFile, moduleSpecifier);
    if (!resolved) {
      return bottom(`Cannot resolve module '${moduleSpecifier}'`);
    }

    const targetFile = this.program.getSourceFile(resolved);
    if (!targetFile) {
      return bottom(`Module '${moduleSpecifier}' not found in program`);
    }

    if (targetFile.isDeclarationFile) {
      return bottom(`Module '${moduleSpecifier}' is a declaration file`);
    }

    if (this.inProgress.has(targetFile.fileName)) {
      this.emitImportDiagnostic(
        fromFile, moduleSpecifier,
        `Circular import dependency`,
        ErrorCodes.DataFlow.CircularImport,
      );
      return bottom(`Circular import dependency`);
    }

    const env = this.analyzeFile(targetFile);
    const allExports = env.getAllExports();

    // Build a constant object from exports that are all constant
    const nsObj: Record<string, unknown> = {};
    let allConstant = true;

    for (const [name, value] of allExports) {
      if (isConstant(value)) {
        nsObj[name] = value.value;
      } else {
        allConstant = false;
        break;
      }
    }

    if (allConstant) {
      return constant(nsObj);
    }

    return bottom(`Namespace import from '${moduleSpecifier}' contains non-constant exports`);
  }

  // -----------------------------------------------------------------------
  // Diagnostic helpers
  // -----------------------------------------------------------------------

  /**
   * Find the import declaration node for a given module specifier and emit a diagnostic.
   * Deduplicates by file+specifier+code to avoid noisy repeated errors.
   */
  private emitImportDiagnostic(
    fromFile: ts.SourceFile,
    moduleSpecifier: string,
    message: string,
    code: DiagnosticCode,
  ): void {
    const key = `${fromFile.fileName}:${moduleSpecifier}:${code.code}`;
    if (this.emittedDiagnostics.has(key)) return;
    this.emittedDiagnostics.add(key);

    // Find the import declaration node for accurate source location
    const node = this.findImportNode(fromFile, moduleSpecifier);
    if (!node) return; // Can't emit without a node

    if (code.severity === 'warning') {
      this.context.addWarning(node, message, code);
    } else {
      this.context.addError(node, message, code);
    }
  }

  private findImportNode(
    sourceFile: ts.SourceFile,
    moduleSpecifier: string,
  ): ts.Node | undefined {
    for (const stmt of sourceFile.statements) {
      if (ts.isImportDeclaration(stmt) &&
          ts.isStringLiteral(stmt.moduleSpecifier) &&
          stmt.moduleSpecifier.text === moduleSpecifier) {
        return stmt.moduleSpecifier;
      }
      if (ts.isExportDeclaration(stmt) &&
          stmt.moduleSpecifier &&
          ts.isStringLiteral(stmt.moduleSpecifier) &&
          stmt.moduleSpecifier.text === moduleSpecifier) {
        return stmt.moduleSpecifier;
      }
    }
    return undefined;
  }

  // -----------------------------------------------------------------------
  // Module resolution
  // -----------------------------------------------------------------------

  private resolveModulePath(
    fromFile: ts.SourceFile,
    moduleSpecifier: string,
  ): string | undefined {
    const compilerOptions = this.program.getCompilerOptions();

    // Try standard module resolution first (works with real file systems)
    if (ts.sys) {
      const result = ts.resolveModuleName(
        moduleSpecifier,
        fromFile.fileName,
        compilerOptions,
        ts.sys,
      );
      if (result.resolvedModule) {
        return result.resolvedModule.resolvedFileName;
      }
    }

    // Fallback: scan program source files for a match.
    // Handles virtual file systems (browser environments, tests) where
    // ts.sys doesn't know about the files.
    return this.resolveModulePathFromProgram(fromFile, moduleSpecifier);
  }

  private resolveModulePathFromProgram(
    fromFile: ts.SourceFile,
    moduleSpecifier: string,
  ): string | undefined {
    if (!moduleSpecifier.startsWith('.')) return undefined;

    // Resolve the relative path from the importing file's directory
    const fromDir = fromFile.fileName.substring(0, fromFile.fileName.lastIndexOf('/'));
    const candidates = this.buildResolutionCandidates(fromDir, moduleSpecifier);

    for (const candidate of candidates) {
      if (this.program.getSourceFile(candidate)) {
        return candidate;
      }
    }

    return undefined;
  }

  private buildResolutionCandidates(fromDir: string, specifier: string): string[] {
    // Normalize the path: resolve './' and '../'
    const rawPath = `${fromDir}/${specifier}`;
    const parts = rawPath.split('/');
    const resolved: string[] = [];
    for (const part of parts) {
      if (part === '.') continue;
      if (part === '..') { resolved.pop(); continue; }
      resolved.push(part);
    }
    const base = resolved.join('/');

    // If specifier already has an extension, try it directly
    if (/\.\w+$/.test(specifier)) {
      return [base];
    }

    // Try common extensions
    return [
      `${base}.ts`,
      `${base}.tsx`,
      `${base}/index.ts`,
      `${base}/index.tsx`,
      base,
    ];
  }
}
