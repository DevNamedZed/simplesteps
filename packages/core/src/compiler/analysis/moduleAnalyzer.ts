// ---------------------------------------------------------------------------
// Module Analyzer
//
// Per-module forward scan that builds a ModuleEnvironment by processing
// top-level statements in source order using the constant propagation lattice.
// ---------------------------------------------------------------------------

import ts from 'typescript';
import {
  type LatticeValue,
  type ConstantValue,
  top,
  constant,
  bottom,
  isConstant,
  isBottom,
} from './lattice.js';
import { ExpressionEvaluator, type SymbolResolver } from './expressionEvaluator.js';
import { isEligibleForInlining, inlineFunction } from './pureFunctionInliner.js';

// ---------------------------------------------------------------------------
// Import metadata
// ---------------------------------------------------------------------------

export interface ImportInfo {
  /** The module specifier string (e.g., './config'). */
  readonly moduleSpecifier: string;
  /** The imported name in the source module (or 'default' for default imports). */
  readonly importedName: string;
  /** Whether this is a namespace import (import * as X). */
  readonly isNamespace: boolean;
}

// ---------------------------------------------------------------------------
// ModuleEnvironment
// ---------------------------------------------------------------------------

/**
 * Import resolver callback — provided by WholeProgramAnalyzer.
 */
export type ImportResolver = (
  fromFile: ts.SourceFile,
  moduleSpecifier: string,
  importedName: string,
) => LatticeValue;

/**
 * Namespace import resolver — resolves `import * as X` to an object of all exports.
 */
export type NamespaceResolver = (
  fromFile: ts.SourceFile,
  moduleSpecifier: string,
) => LatticeValue;

export class ModuleEnvironment {
  readonly sourceFile: ts.SourceFile;

  private readonly values = new Map<ts.Symbol, LatticeValue>();
  private readonly imports = new Map<ts.Symbol, ImportInfo>();
  private readonly functions = new Map<ts.Symbol, ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction>();
  private readonly assignmentCounts = new Map<ts.Symbol, number>();
  private readonly exports = new Map<string, ts.Symbol>();
  private readonly starReExports: string[] = [];

  private readonly checker: ts.TypeChecker;
  private readonly importResolver?: ImportResolver;
  private readonly namespaceResolver?: NamespaceResolver;

  constructor(
    sourceFile: ts.SourceFile,
    checker: ts.TypeChecker,
    importResolver?: ImportResolver,
    namespaceResolver?: NamespaceResolver,
  ) {
    this.sourceFile = sourceFile;
    this.checker = checker;
    this.importResolver = importResolver;
    this.namespaceResolver = namespaceResolver;
  }

  get(symbol: ts.Symbol): LatticeValue {
    return this.values.get(symbol) ?? top();
  }

  set(symbol: ts.Symbol, value: LatticeValue): void {
    this.values.set(symbol, value);
  }

  /**
   * Resolve a symbol's value — handles imports on demand.
   */
  resolve(symbol: ts.Symbol): LatticeValue {
    // Check local values first
    const local = this.values.get(symbol);
    if (local !== undefined && local.kind !== 'top') return local;

    // Check if it's an import
    const importInfo = this.imports.get(symbol);
    if (importInfo && this.importResolver) {
      if (importInfo.isNamespace && this.namespaceResolver) {
        const nsValue = this.namespaceResolver(this.sourceFile, importInfo.moduleSpecifier);
        this.values.set(symbol, nsValue);
        return nsValue;
      }
      const resolved = this.importResolver(
        this.sourceFile,
        importInfo.moduleSpecifier,
        importInfo.importedName,
      );
      this.values.set(symbol, resolved);
      return resolved;
    }

    return local ?? bottom(`Symbol '${symbol.getName()}' not found in module scope`);
  }

  markImport(symbol: ts.Symbol, info: ImportInfo): void {
    this.imports.set(symbol, info);
    this.values.set(symbol, top()); // deferred resolution
  }

  markExport(name: string, symbol: ts.Symbol): void {
    this.exports.set(name, symbol);
  }

  addStarReExport(moduleSpecifier: string): void {
    this.starReExports.push(moduleSpecifier);
  }

  getExport(name: string): LatticeValue {
    // Check local exports first
    const sym = this.exports.get(name);
    if (sym) return this.resolve(sym);

    // Check star re-exports (export * from './mod')
    if (this.importResolver) {
      for (const moduleSpec of this.starReExports) {
        const value = this.importResolver(this.sourceFile, moduleSpec, name);
        if (value.kind !== 'bottom' || !value.reason.includes('not found')) {
          return value;
        }
      }
    }

    return bottom(`Export '${name}' not found in ${this.sourceFile.fileName}`);
  }

  getAllExports(): Map<string, LatticeValue> {
    const result = new Map<string, LatticeValue>();

    // Star re-exports first (so local exports override)
    if (this.importResolver && this.namespaceResolver) {
      for (const moduleSpec of this.starReExports) {
        const nsValue = this.namespaceResolver(this.sourceFile, moduleSpec);
        if (isConstant(nsValue) && typeof nsValue.value === 'object' && nsValue.value !== null) {
          for (const [key, val] of Object.entries(nsValue.value as Record<string, unknown>)) {
            if (!result.has(key)) {
              result.set(key, constant(val));
            }
          }
        }
      }
    }

    // Local exports override
    for (const [name, sym] of this.exports) {
      result.set(name, this.resolve(sym));
    }

    return result;
  }

  setFunction(symbol: ts.Symbol, decl: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction): void {
    this.functions.set(symbol, decl);
  }

  getFunction(symbol: ts.Symbol): ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction | undefined {
    return this.functions.get(symbol);
  }

  incrementAssignment(symbol: ts.Symbol): number {
    const count = (this.assignmentCounts.get(symbol) ?? 0) + 1;
    this.assignmentCounts.set(symbol, count);
    return count;
  }

  getAssignmentCount(symbol: ts.Symbol): number {
    return this.assignmentCounts.get(symbol) ?? 0;
  }

  /** Iterate all symbol → value pairs. */
  entries(): IterableIterator<[ts.Symbol, LatticeValue]> {
    return this.values.entries();
  }
}

// ---------------------------------------------------------------------------
// Module analysis
// ---------------------------------------------------------------------------

/**
 * Analyze a source file's top-level statements, building a ModuleEnvironment
 * with lattice values for every top-level variable.
 */
export function analyzeModule(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  importResolver?: ImportResolver,
  namespaceResolver?: NamespaceResolver,
  inliningDepth: number = 1,
): ModuleEnvironment {
  const env = new ModuleEnvironment(sourceFile, checker, importResolver, namespaceResolver);

  // Build the symbol resolver for the expression evaluator
  const symbolResolver: SymbolResolver = (sym) => env.resolve(sym);

  // Build the call resolver for pure function inlining
  const callResolver = inliningDepth > 0
    ? (expr: ts.CallExpression, evaluator: ExpressionEvaluator) => {
        return tryInlineCall(expr, evaluator, env, checker, inliningDepth);
      }
    : undefined;

  const evaluator = new ExpressionEvaluator(checker, symbolResolver, callResolver);

  for (const stmt of sourceFile.statements) {
    processStatement(stmt, env, evaluator, checker);
  }

  return env;
}

// ---------------------------------------------------------------------------
// Statement processing
// ---------------------------------------------------------------------------

function processStatement(
  stmt: ts.Statement,
  env: ModuleEnvironment,
  evaluator: ExpressionEvaluator,
  checker: ts.TypeChecker,
): void {
  // Import declarations
  if (ts.isImportDeclaration(stmt)) {
    processImport(stmt, env, checker);
    return;
  }

  // Variable statements
  if (ts.isVariableStatement(stmt)) {
    const isConst = !!(stmt.declarationList.flags & ts.NodeFlags.Const);
    const isExported = stmt.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) ?? false;

    for (const decl of stmt.declarationList.declarations) {
      processVariableDeclaration(decl, isConst, isExported, env, evaluator, checker);
    }
    return;
  }

  // Function declarations
  if (ts.isFunctionDeclaration(stmt) && stmt.name) {
    const sym = checker.getSymbolAtLocation(stmt.name);
    if (sym) {
      env.setFunction(sym, stmt);
      // A function declaration doesn't have a lattice value itself
      // (it's used via call inlining, not direct reference)
    }
    if (stmt.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) && stmt.name) {
      const sym = checker.getSymbolAtLocation(stmt.name);
      if (sym) env.markExport(stmt.name.text, sym);
    }
    return;
  }

  // Enum declarations
  if (ts.isEnumDeclaration(stmt)) {
    processEnum(stmt, env, checker);
    return;
  }

  // Expression statements (assignments)
  if (ts.isExpressionStatement(stmt)) {
    processExpressionStatement(stmt, env, evaluator, checker);
    return;
  }

  // Export declarations (re-exports)
  if (ts.isExportDeclaration(stmt)) {
    processExportDeclaration(stmt, env, checker);
    return;
  }

  // Other statement types (class, namespace, etc.) — no action needed
}

// ---------------------------------------------------------------------------
// Import processing
// ---------------------------------------------------------------------------

function processImport(
  stmt: ts.ImportDeclaration,
  env: ModuleEnvironment,
  checker: ts.TypeChecker,
): void {
  if (!ts.isStringLiteral(stmt.moduleSpecifier)) return;
  const moduleSpec = stmt.moduleSpecifier.text;
  const clause = stmt.importClause;
  if (!clause) return;

  // Default import: import X from './mod'
  if (clause.name) {
    const sym = checker.getSymbolAtLocation(clause.name);
    if (sym) {
      env.markImport(sym, { moduleSpecifier: moduleSpec, importedName: 'default', isNamespace: false });
    }
  }

  // Named / namespace bindings
  if (clause.namedBindings) {
    if (ts.isNamespaceImport(clause.namedBindings)) {
      // import * as M from './mod'
      const sym = checker.getSymbolAtLocation(clause.namedBindings.name);
      if (sym) {
        env.markImport(sym, { moduleSpecifier: moduleSpec, importedName: '*', isNamespace: true });
      }
    } else if (ts.isNamedImports(clause.namedBindings)) {
      // import { A, B as C } from './mod'
      for (const spec of clause.namedBindings.elements) {
        const localSym = checker.getSymbolAtLocation(spec.name);
        if (localSym) {
          const importedName = spec.propertyName ? spec.propertyName.text : spec.name.text;
          env.markImport(localSym, { moduleSpecifier: moduleSpec, importedName, isNamespace: false });
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Variable declaration processing
// ---------------------------------------------------------------------------

function processVariableDeclaration(
  decl: ts.VariableDeclaration,
  isConst: boolean,
  isExported: boolean,
  env: ModuleEnvironment,
  evaluator: ExpressionEvaluator,
  checker: ts.TypeChecker,
): void {
  // Simple identifier binding
  if (ts.isIdentifier(decl.name)) {
    const sym = checker.getSymbolAtLocation(decl.name);
    if (!sym) return;

    if (isExported) env.markExport(decl.name.text, sym);

    if (decl.initializer) {
      const value = evaluator.evaluate(decl.initializer);
      env.set(sym, value);
      env.incrementAssignment(sym);
    } else {
      // Uninitialized: let x;
      env.set(sym, top());
    }
    return;
  }

  // Destructuring: const { a, b } = expr  or  const [a, b] = expr
  if (decl.initializer) {
    const baseValue = evaluator.evaluate(decl.initializer);
    expandBindingPattern(decl.name, baseValue, isExported, env, checker);
  }
}

/**
 * Expand a binding pattern (object or array destructuring) into individual
 * variable entries in the environment.
 */
function expandBindingPattern(
  pattern: ts.BindingPattern,
  baseValue: LatticeValue,
  isExported: boolean,
  env: ModuleEnvironment,
  checker: ts.TypeChecker,
): void {
  if (ts.isObjectBindingPattern(pattern)) {
    for (const element of pattern.elements) {
      if (element.dotDotDotToken) {
        // Rest pattern: const { a, ...rest } = obj
        // Complex — mark as bottom for now
        const sym = ts.isIdentifier(element.name) ? checker.getSymbolAtLocation(element.name) : undefined;
        if (sym) {
          env.set(sym, bottom('Rest patterns in destructuring are not yet supported for constant propagation'));
          env.incrementAssignment(sym);
          if (isExported && ts.isIdentifier(element.name)) {
            env.markExport(element.name.text, sym);
          }
        }
        continue;
      }

      const propName = element.propertyName
        ? (ts.isIdentifier(element.propertyName) ? element.propertyName.text : ts.isStringLiteral(element.propertyName) ? element.propertyName.text : undefined)
        : (ts.isIdentifier(element.name) ? element.name.text : undefined);

      if (!propName) continue;

      let elemValue: LatticeValue;
      if (isConstant(baseValue)) {
        const obj = baseValue.value;
        if (obj !== null && obj !== undefined && typeof obj === 'object') {
          const val = (obj as Record<string, unknown>)[propName];
          elemValue = val !== undefined ? constant(val) : bottom(`Property '${propName}' not found in destructured object`);
        } else {
          elemValue = bottom('Destructuring non-object constant');
        }
      } else if (isBottom(baseValue)) {
        elemValue = { kind: 'bottom', reason: `destructured from unresolvable value`, rootCause: baseValue.rootCause ?? baseValue, isSafe: baseValue.isSafe };
      } else {
        elemValue = bottom('Destructuring non-constant value');
      }

      // Handle default value: const { a = defaultVal } = obj
      if (element.initializer && isConstant(elemValue) && elemValue.value === undefined) {
        const evaluator = new ExpressionEvaluator(checker, (sym) => env.resolve(sym));
        elemValue = evaluator.evaluate(element.initializer);
      }

      // Nested destructuring
      if (ts.isObjectBindingPattern(element.name) || ts.isArrayBindingPattern(element.name)) {
        expandBindingPattern(element.name, elemValue, isExported, env, checker);
      } else if (ts.isIdentifier(element.name)) {
        const sym = checker.getSymbolAtLocation(element.name);
        if (sym) {
          env.set(sym, elemValue);
          env.incrementAssignment(sym);
          if (isExported) env.markExport(element.name.text, sym);
        }
      }
    }
  } else if (ts.isArrayBindingPattern(pattern)) {
    for (let i = 0; i < pattern.elements.length; i++) {
      const element = pattern.elements[i];
      if (ts.isOmittedExpression(element)) continue;

      let elemValue: LatticeValue;

      if (element.dotDotDotToken) {
        // Rest pattern: const [a, ...rest] = arr
        if (isConstant(baseValue) && Array.isArray(baseValue.value)) {
          elemValue = constant(baseValue.value.slice(i));
        } else {
          elemValue = bottom('Array rest pattern on non-constant');
        }
      } else if (isConstant(baseValue)) {
        if (Array.isArray(baseValue.value)) {
          const val = baseValue.value[i];
          elemValue = val !== undefined ? constant(val) : bottom(`Index ${i} out of bounds`);
        } else {
          elemValue = bottom('Array destructuring of non-array');
        }
      } else if (isBottom(baseValue)) {
        elemValue = { kind: 'bottom', reason: 'destructured from unresolvable', rootCause: baseValue.rootCause ?? baseValue, isSafe: baseValue.isSafe };
      } else {
        elemValue = bottom('Array destructuring of non-constant');
      }

      if (ts.isIdentifier(element.name)) {
        const sym = checker.getSymbolAtLocation(element.name);
        if (sym) {
          env.set(sym, elemValue);
          env.incrementAssignment(sym);
          if (isExported) env.markExport(element.name.text, sym);
        }
      } else if (ts.isObjectBindingPattern(element.name) || ts.isArrayBindingPattern(element.name)) {
        expandBindingPattern(element.name, elemValue, isExported, env, checker);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Enum processing
// ---------------------------------------------------------------------------

function processEnum(
  stmt: ts.EnumDeclaration,
  env: ModuleEnvironment,
  checker: ts.TypeChecker,
): void {
  const isExported = stmt.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) ?? false;

  // Build an object representing the enum
  const enumObj: Record<string, unknown> = {};
  let autoValue = 0;

  for (const member of stmt.members) {
    const name = ts.isIdentifier(member.name) ? member.name.text
      : ts.isStringLiteral(member.name) ? member.name.text
      : undefined;
    if (!name) continue;

    if (member.initializer) {
      const evaluator = new ExpressionEvaluator(checker, (sym) => env.resolve(sym));
      const val = evaluator.evaluate(member.initializer);
      if (isConstant(val)) {
        enumObj[name] = val.value;
        if (typeof val.value === 'number') autoValue = val.value + 1;
      } else {
        enumObj[name] = undefined;
      }
    } else {
      enumObj[name] = autoValue;
      autoValue++;
    }

    // Register individual member as a symbol
    const memberSym = checker.getSymbolAtLocation(member.name);
    if (memberSym) {
      env.set(memberSym, enumObj[name] !== undefined ? constant(enumObj[name]) : bottom('Unresolvable enum value'));
    }
  }

  // Register the enum itself as a constant object
  const enumSym = checker.getSymbolAtLocation(stmt.name);
  if (enumSym) {
    env.set(enumSym, constant(enumObj));
    if (isExported) env.markExport(stmt.name.text, enumSym);
  }
}

// ---------------------------------------------------------------------------
// Expression statement processing (assignments)
// ---------------------------------------------------------------------------

function processExpressionStatement(
  stmt: ts.ExpressionStatement,
  env: ModuleEnvironment,
  evaluator: ExpressionEvaluator,
  checker: ts.TypeChecker,
): void {
  const expr = stmt.expression;

  // Assignment: x = expr
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
    if (ts.isIdentifier(expr.left)) {
      const sym = checker.getSymbolAtLocation(expr.left);
      if (!sym) return;

      const count = env.incrementAssignment(sym);
      if (count > 1) {
        env.set(sym, bottom(`Multiple assignments to '${expr.left.text}'`));
      } else {
        const value = evaluator.evaluate(expr.right);
        env.set(sym, value);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Export declaration processing (re-exports)
// ---------------------------------------------------------------------------

function processExportDeclaration(
  stmt: ts.ExportDeclaration,
  env: ModuleEnvironment,
  checker: ts.TypeChecker,
): void {
  if (!stmt.moduleSpecifier || !ts.isStringLiteral(stmt.moduleSpecifier)) return;
  const moduleSpec = stmt.moduleSpecifier.text;

  if (stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
    // export { X, Y as Z } from './mod'
    for (const spec of stmt.exportClause.elements) {
      const localSym = checker.getSymbolAtLocation(spec.name);
      const importedName = spec.propertyName ? spec.propertyName.text : spec.name.text;
      const exportedName = spec.name.text;

      if (localSym) {
        env.markImport(localSym, { moduleSpecifier: moduleSpec, importedName, isNamespace: false });
        env.markExport(exportedName, localSym);
      }
    }
  }
  // export * from './mod'
  if (!stmt.exportClause) {
    env.addStarReExport(moduleSpec);
  }
}

// ---------------------------------------------------------------------------
// Pure function inlining callback
// ---------------------------------------------------------------------------

function tryInlineCall(
  expr: ts.CallExpression,
  evaluator: ExpressionEvaluator,
  env: ModuleEnvironment,
  checker: ts.TypeChecker,
  depth: number,
): LatticeValue | undefined {
  // Resolve callee to a symbol
  const calleeSym = getCalleeSymbol(expr.expression, checker);
  if (!calleeSym) return undefined;

  // Look up the function declaration
  const funcDecl = env.getFunction(calleeSym);
  if (!funcDecl) return undefined;

  // Check eligibility
  if (!isEligibleForInlining(funcDecl)) return undefined;

  // Evaluate arguments
  const argValues: ConstantValue[] = [];
  for (const arg of expr.arguments) {
    const val = evaluator.evaluate(arg);
    if (!isConstant(val)) return undefined; // non-constant arg → can't inline
    argValues.push(val);
  }

  // Inline with reduced depth
  if (depth <= 0) return undefined;

  return inlineFunction(funcDecl, argValues, checker, (sym) => env.resolve(sym));
}

function getCalleeSymbol(expr: ts.Expression, checker: ts.TypeChecker): ts.Symbol | undefined {
  if (ts.isIdentifier(expr)) {
    const sym = checker.getSymbolAtLocation(expr);
    if (sym && sym.flags & ts.SymbolFlags.Alias) {
      return checker.getAliasedSymbol(sym);
    }
    return sym;
  }
  return undefined;
}
