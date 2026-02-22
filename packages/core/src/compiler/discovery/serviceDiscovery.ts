import ts from 'typescript';
import path from 'path';
import { CompilerContext } from '../compilerContext.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ServiceIntegration = 'direct' | 'sdk';

export interface ServiceMethodConfig {
  readonly integration: ServiceIntegration;
  readonly sdkResource?: string;
  readonly hasOutput: boolean;
}

export interface ServiceMethodAlias {
  readonly aliasOf: string;
}

type ServiceMethodEntry = ServiceMethodConfig | ServiceMethodAlias;

function isAlias(entry: ServiceMethodEntry): entry is ServiceMethodAlias {
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
// Mapping table (from spec/services.md §2.2)
// ---------------------------------------------------------------------------

const SERVICE_METHOD_MAPPINGS: Record<string, Record<string, ServiceMethodEntry>> = {
  Lambda: {
    call: { integration: 'direct', hasOutput: true },
    callAsync: { integration: 'sdk', sdkResource: 'arn:aws:states:::lambda:invoke', hasOutput: false },
    callWithCallback: { integration: 'sdk', sdkResource: 'arn:aws:states:::lambda:invoke.waitForTaskToken', hasOutput: true },
  },
  SimpleQueueService: {
    publish: { integration: 'sdk', sdkResource: 'arn:aws:states:::sqs:sendMessage', hasOutput: false },
    publishWithCallback: { integration: 'sdk', sdkResource: 'arn:aws:states:::sqs:sendMessage.waitForTaskToken', hasOutput: true },
  },
  DynamoDB: {
    getItem: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:getItem', hasOutput: true },
    get: { aliasOf: 'getItem' },
    putItem: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:putItem', hasOutput: false },
    put: { aliasOf: 'putItem' },
    deleteItem: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:deleteItem', hasOutput: false },
    delete: { aliasOf: 'deleteItem' },
    updateItem: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:updateItem', hasOutput: true },
    update: { aliasOf: 'updateItem' },
    query: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:query', hasOutput: true },
    scan: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:scan', hasOutput: true },
  },
  SNS: {
    publish: { integration: 'sdk', sdkResource: 'arn:aws:states:::sns:publish', hasOutput: false },
  },
  StepFunction: {
    startExecution: { integration: 'sdk', sdkResource: 'arn:aws:states:::states:startExecution.sync:2', hasOutput: true },
    startExecutionAsync: { integration: 'sdk', sdkResource: 'arn:aws:states:::states:startExecution', hasOutput: true },
    startExecutionWithCallback: { integration: 'sdk', sdkResource: 'arn:aws:states:::states:startExecution.waitForTaskToken', hasOutput: true },
  },
  EventBridge: {
    putEvent: { integration: 'sdk', sdkResource: 'arn:aws:states:::events:putEvents', hasOutput: false },
  },
  S3: {
    getObject: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:s3:getObject', hasOutput: true },
    putObject: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:s3:putObject', hasOutput: false },
    deleteObject: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:s3:deleteObject', hasOutput: false },
    copyObject: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:s3:copyObject', hasOutput: false },
    headObject: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:s3:headObject', hasOutput: true },
    listObjects: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:s3:listObjectsV2', hasOutput: true },
  },
  SecretsManager: {
    getSecretValue: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:secretsmanager:getSecretValue', hasOutput: true },
    putSecretValue: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:secretsmanager:putSecretValue', hasOutput: false },
    createSecret: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:secretsmanager:createSecret', hasOutput: true },
    updateSecret: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:secretsmanager:updateSecret', hasOutput: false },
    deleteSecret: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:secretsmanager:deleteSecret', hasOutput: false },
    describeSecret: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:secretsmanager:describeSecret', hasOutput: true },
  },
  SSM: {
    getParameter: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:ssm:getParameter', hasOutput: true },
    putParameter: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:ssm:putParameter', hasOutput: false },
    getParameters: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:ssm:getParameters', hasOutput: true },
    getParametersByPath: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:ssm:getParametersByPath', hasOutput: true },
    deleteParameter: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:ssm:deleteParameter', hasOutput: false },
  },
};

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
 * exported classes/functions against the SERVICE_METHOD_MAPPINGS table.
 */
export function discoverServices(context: CompilerContext, servicesDirOverride?: string): ServiceRegistry {
  const servicesDir = servicesDirOverride ?? resolveServicesDir();
  const bindings = new Map<string, ServiceBinding>();

  // Scan all source files in the program that live under the services directory
  for (const sourceFile of context.program.getSourceFiles()) {
    const filePath = sourceFile.fileName;

    // Only scan files in the services directory (exclude types.ts and index.ts)
    if (!filePath.startsWith(servicesDir)) continue;
    const baseName = getBaseName(filePath);
    if (baseName === 'types' || baseName === 'index') continue;

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
  const mappings = SERVICE_METHOD_MAPPINGS[className];
  if (!mappings) return null;

  const classSymbol = context.checker.getSymbolAtLocation(classDecl.name!);
  if (!classSymbol) return null;

  const methods = new Map<string, ServiceMethodInfo>();

  for (const member of classDecl.members) {
    if (!ts.isMethodDeclaration(member)) continue;

    const methodSymbol = context.checker.getSymbolAtLocation(member.name);
    if (!methodSymbol) continue;

    const methodName = methodSymbol.getName();
    const entry = mappings[methodName];
    if (!entry) continue;

    // Resolve aliases
    const config = resolveMethodConfig(mappings, entry);
    if (!config) continue;

    methods.set(methodName, {
      methodName,
      symbol: methodSymbol,
      integration: config.integration,
      sdkResource: config.sdkResource,
      hasOutput: config.hasOutput,
    });
  }

  return { className, symbol: classSymbol, methods };
}

function matchFunctionBinding(
  context: CompilerContext,
  funcDecl: ts.FunctionDeclaration,
  funcName: string,
): ServiceBinding | null {
  const mappings = SERVICE_METHOD_MAPPINGS[funcName];
  if (!mappings) return null;

  const funcSymbol = context.checker.getSymbolAtLocation(funcDecl.name!);
  if (!funcSymbol) return null;

  // For function-based bindings (like Lambda), the function itself is the
  // "constructor" and its return type's methods are the service methods.
  // We need to look at the return type of the function to find callable methods.
  const methods = new Map<string, ServiceMethodInfo>();

  // Check the return type for method signatures
  const signature = context.checker.getSignatureFromDeclaration(funcDecl);
  if (signature) {
    const returnType = context.checker.getReturnTypeOfSignature(signature);
    for (const prop of returnType.getProperties()) {
      const propName = prop.getName();
      const entry = mappings[propName];
      if (!entry) continue;

      const config = resolveMethodConfig(mappings, entry);
      if (!config) continue;

      methods.set(propName, {
        methodName: propName,
        symbol: prop,
        integration: config.integration,
        sdkResource: config.sdkResource,
        hasOutput: config.hasOutput,
      });
    }
  }

  return { className: funcName, symbol: funcSymbol, methods };
}

function resolveMethodConfig(
  mappings: Record<string, ServiceMethodEntry>,
  entry: ServiceMethodEntry,
): ServiceMethodConfig | null {
  if (!isAlias(entry)) return entry;

  const target = mappings[entry.aliasOf];
  if (!target) return null;
  if (isAlias(target)) return null; // Don't support chained aliases

  return target;
}
