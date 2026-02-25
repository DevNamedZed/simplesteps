import ts from 'typescript';
import path from 'path';
import { CompilerContext } from '../compilerContext.js';
import {
  OPTIMIZED_INTEGRATIONS,
  SERVICE_SDK_IDS,
  type OptimizedEntry,
  type OptimizedMethodEntry,
  type ServiceIntegration,
} from '../../runtime/services/metadata.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type { ServiceIntegration } from '../../runtime/services/metadata.js';

export interface ServiceMethodConfig {
  readonly integration: ServiceIntegration;
  readonly sdkResource?: string;
  readonly hasOutput: boolean;
}

export interface ServiceMethodAlias {
  readonly aliasOf: string;
}

type ServiceMethodEntry = ServiceMethodConfig | ServiceMethodAlias;

function isAlias(entry: ServiceMethodEntry | OptimizedEntry): entry is ServiceMethodAlias {
  return 'aliasOf' in entry;
}

function isOptimizedAlias(entry: OptimizedEntry): entry is { aliasOf: string } {
  return 'aliasOf' in entry;
}

/**
 * Resolved info for a single service method.
 */
export interface ServiceMethodInfo {
  readonly methodName: string;
  readonly symbol: ts.Symbol;
  readonly integration: ServiceIntegration;
  readonly sdkResource?: string;
  readonly hasOutput: boolean;
}

/**
 * A discovered service binding (e.g., Lambda, DynamoDB).
 */
export interface ServiceBinding {
  readonly className: string;
  readonly symbol: ts.Symbol;
  readonly methods: ReadonlyMap<string, ServiceMethodInfo>;
}

/**
 * Registry of all discovered service bindings.
 */
export interface ServiceRegistry {
  readonly bindings: ReadonlyMap<string, ServiceBinding>;
}

// ---------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------

/**
 * Resolve the services directory path within the package.
 */
function resolveServicesDir(): string {
  return path.resolve(__dirname, '../../runtime/services');
}

/** Get the base name of a file path without .ts extension. Works without Node's path module. */
function getBaseName(filePath: string): string {
  const last = filePath.split('/').pop() ?? filePath;
  return last.endsWith('.ts') ? last.slice(0, -3) : last;
}

/**
 * Build the service registry by scanning runtime/services/ and matching
 * exported classes/functions against the OPTIMIZED_INTEGRATIONS table and
 * SERVICE_SDK_IDS for generic SDK integration fallback.
 */
export function discoverServices(context: CompilerContext, servicesDirOverride?: string): ServiceRegistry {
  const servicesDir = servicesDirOverride ?? resolveServicesDir();
  const bindings = new Map<string, ServiceBinding>();

  // Scan all source files in the program that live under the services directory
  for (const sourceFile of context.program.getSourceFiles()) {
    const filePath = sourceFile.fileName;

    // Only scan files in the services directory (exclude types, index, metadata)
    if (!filePath.startsWith(servicesDir)) continue;
    const baseName = getBaseName(filePath);
    if (baseName === 'types' || baseName === 'index' || baseName === 'metadata'
        || baseName === 'types.d' || baseName === 'index.d' || baseName === 'metadata.d') continue;

    // Look for exported classes and functions
    for (const stmt of sourceFile.statements) {
      const modifiers = ts.canHaveModifiers(stmt) ? ts.getModifiers(stmt) : undefined;
      const isExported = modifiers?.some(
        (m: ts.Modifier) => m.kind === ts.SyntaxKind.ExportKeyword,
      );
      if (!isExported) continue;

      if (ts.isClassDeclaration(stmt) && stmt.name) {
        const className = stmt.name.escapedText as string;
        const binding = matchClassBinding(context, stmt, className);
        if (binding) {
          bindings.set(className, binding);
        }
      }

      if (ts.isFunctionDeclaration(stmt) && stmt.name) {
        const funcName = stmt.name.escapedText as string;
        const binding = matchFunctionBinding(context, stmt, funcName);
        if (binding) {
          bindings.set(funcName, binding);
        }
      }
    }
  }

  context.logger.debug(
    `Discovered ${bindings.size} service bindings: ${[...bindings.keys()].join(', ')}`,
  );

  return { bindings };
}

// ---------------------------------------------------------------------------
// Matching
// ---------------------------------------------------------------------------

function matchClassBinding(
  context: CompilerContext,
  classDecl: ts.ClassDeclaration,
  className: string,
): ServiceBinding | null {
  const optimized = OPTIMIZED_INTEGRATIONS[className];
  const sdkId = SERVICE_SDK_IDS[className];

  // Not a known service at all
  if (!optimized && !sdkId) return null;

  const classSymbol = context.checker.getSymbolAtLocation(classDecl.name!);
  if (!classSymbol) return null;

  const methods = new Map<string, ServiceMethodInfo>();

  // Use index-based access instead of for-of to handle emit-phase nodes
  const members = classDecl.members;
  if (!members || typeof members.length !== 'number') return null;

  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    if (!ts.isMethodDeclaration(member)) continue;

    const methodSymbol = context.checker.getSymbolAtLocation(member.name);
    if (!methodSymbol) continue;

    const methodName = methodSymbol.getName();

    // Check optimized integrations first
    if (optimized && methodName in optimized) {
      const entry = optimized[methodName];
      const config = resolveOptimizedEntry(optimized, entry);
      if (!config) continue;

      methods.set(methodName, {
        methodName,
        symbol: methodSymbol,
        integration: config.integration,
        sdkResource: config.sdkResource,
        hasOutput: config.hasOutput,
      });
    } else if (sdkId) {
      // Generic SDK integration fallback
      methods.set(methodName, {
        methodName,
        symbol: methodSymbol,
        integration: 'sdk',
        sdkResource: `arn:aws:states:::aws-sdk:${sdkId}:${methodName}`,
        hasOutput: true,
      });
    }
  }

  return { className, symbol: classSymbol, methods };
}

function matchFunctionBinding(
  context: CompilerContext,
  funcDecl: ts.FunctionDeclaration,
  funcName: string,
): ServiceBinding | null {
  const optimized = OPTIMIZED_INTEGRATIONS[funcName];
  const sdkId = SERVICE_SDK_IDS[funcName];

  if (!optimized && !sdkId) return null;

  const funcSymbol = context.checker.getSymbolAtLocation(funcDecl.name!);
  if (!funcSymbol) return null;

  const methods = new Map<string, ServiceMethodInfo>();

  // Check the return type for method signatures
  const signature = context.checker.getSignatureFromDeclaration(funcDecl);
  if (signature) {
    const returnType = context.checker.getReturnTypeOfSignature(signature);
    for (const prop of returnType.getProperties()) {
      const propName = prop.getName();

      if (optimized && propName in optimized) {
        const entry = optimized[propName];
        const config = resolveOptimizedEntry(optimized, entry);
        if (!config) continue;

        methods.set(propName, {
          methodName: propName,
          symbol: prop,
          integration: config.integration,
          sdkResource: config.sdkResource,
          hasOutput: config.hasOutput,
        });
      } else if (sdkId) {
        methods.set(propName, {
          methodName: propName,
          symbol: prop,
          integration: 'sdk',
          sdkResource: `arn:aws:states:::aws-sdk:${sdkId}:${propName}`,
          hasOutput: true,
        });
      }
    }
  }

  return { className: funcName, symbol: funcSymbol, methods };
}

function resolveOptimizedEntry(
  mappings: Record<string, OptimizedEntry>,
  entry: OptimizedEntry,
): OptimizedMethodEntry | null {
  if (!isOptimizedAlias(entry)) return entry as OptimizedMethodEntry;

  const target = mappings[entry.aliasOf];
  if (!target) return null;
  if (isOptimizedAlias(target)) return null; // Don't support chained aliases

  return target as OptimizedMethodEntry;
}
