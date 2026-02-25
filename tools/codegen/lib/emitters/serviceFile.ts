/**
 * Emits runtime/services/<Service>.ts files.
 *
 * Handles both "optimized" services (from config) and "auto-generated" services
 * (discovered from Smithy models).
 */

import type { ServiceConfig, OperationConfig, OperationEntry } from '../config.js';
import type { ResolvedInterface, SmithyParser, SmithyServiceInfo, SmithyOperationInfo } from '../smithy.js';
import { isAlias } from '../config.js';

const HEADER = `// @generated — DO NOT EDIT. Run \`npx tsx tools/codegen/generate.ts\` to regenerate.`;

// ---------------------------------------------------------------------------
// Optimized service file (hand-maintained config)
// ---------------------------------------------------------------------------

export function emitServiceFile(
  serviceName: string,
  config: ServiceConfig,
  smithyParser: SmithyParser | null,
): string {
  const lines: string[] = [HEADER];
  lines.push(`import type { RetryPolicy, TaskOptions } from './types';`);
  lines.push('');
  lines.push(`const BINDING_ERROR =`);
  lines.push(`  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';`);
  lines.push('');

  // Resolve Smithy types for operations that have smithyOperation set
  const operationInputInterfaces: Map<string, string> = new Map(); // methodName → interfaceName
  const allInterfaces: ResolvedInterface[] = [];
  const seenInterfaceNames = new Set<string>();

  if (smithyParser) {
    smithyParser.reset();

    for (const [methodName, opEntry] of Object.entries(config.operations)) {
      if (isAlias(opEntry)) continue;
      const op = opEntry as OperationConfig;
      if (!op.smithyOperation || op.customSignature) continue;

      const interfaceName = pascalCase(methodName) + 'Input';
      const result = smithyParser.resolveOperationInput(
        op.smithyOperation,
        op.omitFromInput ?? [],
        interfaceName,
      );

      // Only emit the interface if it has fields
      if (result.iface.fields.length > 0) {
        operationInputInterfaces.set(methodName, interfaceName);
        if (!seenInterfaceNames.has(interfaceName)) {
          allInterfaces.push(result.iface);
          seenInterfaceNames.add(interfaceName);
        }
      }
    }

    // Collect shared types
    for (const shared of smithyParser.getSharedTypes()) {
      if (!seenInterfaceNames.has(shared.name)) {
        allInterfaces.push(shared);
        seenInterfaceNames.add(shared.name);
      }
    }
  }

  // Emit custom types
  if (config.customTypes) {
    for (const ct of config.customTypes) {
      if (ct.doc) lines.push(`/** ${ct.doc} */`);
      lines.push(`export interface ${ct.name} {`);
      for (const [fieldName, fieldDef] of Object.entries(ct.members)) {
        const opt = fieldDef.required ? '' : '?';
        if (fieldDef.doc) lines.push(`  /** ${fieldDef.doc} */`);
        lines.push(`  ${fieldName}${opt}: ${fieldDef.type};`);
      }
      lines.push(`}`);
      lines.push('');
    }
  }

  // Emit options interface extending shared TaskOptions
  const opts = config.options;
  const hasServiceFields = Object.keys(opts.fields).length > 0;
  lines.push(`/** Options for ${config.className} operations. */`);
  lines.push(`export interface ${opts.interfaceName} extends TaskOptions {`);
  for (const [fieldName, fieldDef] of Object.entries(opts.fields)) {
    const opt = fieldDef.optional !== false ? '?' : '';
    lines.push(`  ${fieldName}${opt}: ${fieldDef.type};`);
  }
  lines.push(`}`);
  lines.push('');

  // Emit shared Smithy type interfaces (before operation input interfaces)
  const sharedTypes = smithyParser?.getSharedTypes() ?? [];
  for (const iface of sharedTypes) {
    if (!operationInputInterfaces.has(iface.name)) {
      emitInterface(lines, iface, true);
    }
  }

  // Emit operation input interfaces
  for (const [methodName, interfaceName] of operationInputInterfaces) {
    const iface = allInterfaces.find(i => i.name === interfaceName);
    if (iface) {
      emitInterface(lines, iface, true);
    }
  }

  // Emit the service class or factory function
  if (config.pattern === 'factory') {
    emitFactoryFunction(lines, serviceName, config, opts);
  } else {
    emitClassDeclaration(lines, serviceName, config, opts, operationInputInterfaces);
  }

  return lines.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// Auto-generated service file (from Smithy model)
// ---------------------------------------------------------------------------

export function emitAutoServiceFile(
  serviceInfo: SmithyServiceInfo,
  smithyParser: SmithyParser,
): string {
  const className = normalizeClassName(serviceInfo.sdkId);
  const lines: string[] = [HEADER];
  lines.push(`import type { RetryPolicy, TaskOptions } from './types';`);
  lines.push('');
  lines.push(`const BINDING_ERROR =`);
  lines.push(`  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';`);
  lines.push('');

  // Resolve input types for all operations
  smithyParser.reset();
  const operationInputInterfaces: Map<string, string> = new Map();
  const allInterfaces: ResolvedInterface[] = [];
  const seenInterfaceNames = new Set<string>();

  for (const op of serviceInfo.operations) {
    if (!op.hasInput) continue;

    const interfaceName = pascalCase(op.methodName) + 'Input';
    try {
      const result = smithyParser.resolveOperationInput(op.operationId, [], interfaceName);
      if (result.iface.fields.length > 0) {
        operationInputInterfaces.set(op.methodName, interfaceName);
        if (!seenInterfaceNames.has(interfaceName)) {
          allInterfaces.push(result.iface);
          seenInterfaceNames.add(interfaceName);
        }
      }
    } catch {
      // Skip operations we can't resolve
    }
  }

  // Collect shared types
  for (const shared of smithyParser.getSharedTypes()) {
    if (!seenInterfaceNames.has(shared.name)) {
      allInterfaces.push(shared);
      seenInterfaceNames.add(shared.name);
    }
  }

  // Emit shared type interfaces
  const sharedTypes = smithyParser.getSharedTypes();
  for (const iface of sharedTypes) {
    if (!operationInputInterfaces.has(iface.name)) {
      emitInterface(lines, iface, true);
    }
  }

  // Emit operation input interfaces
  for (const [_methodName, interfaceName] of operationInputInterfaces) {
    const iface = allInterfaces.find(i => i.name === interfaceName);
    if (iface) {
      emitInterface(lines, iface, true);
    }
  }

  // Emit the class
  lines.push(`/** ${serviceInfo.sdkId} service binding for Step Functions SDK integrations. */`);
  lines.push(`export class ${className} {`);
  lines.push(`  constructor() {}`);
  lines.push('');

  for (let i = 0; i < serviceInfo.operations.length; i++) {
    const op = serviceInfo.operations[i];
    const inputInterfaceName = operationInputInterfaces.get(op.methodName);
    const paramType = inputInterfaceName ?? 'Record<string, any>';
    const hasParams = op.hasInput;

    if (hasParams) {
      lines.push(`  ${op.methodName}<T>(params: ${paramType}): Promise<T> {`);
    } else {
      lines.push(`  ${op.methodName}<T>(): Promise<T> {`);
    }
    lines.push(`    throw new Error(BINDING_ERROR);`);
    lines.push(`  }`);

    if (i < serviceInfo.operations.length - 1) lines.push('');
  }

  lines.push(`}`);

  return lines.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function emitInterface(lines: string[], iface: ResolvedInterface, exported: boolean): void {
  if (iface.doc) lines.push(`/** ${iface.doc} */`);
  lines.push(`${exported ? 'export ' : ''}interface ${iface.name} {`);
  for (const field of iface.fields) {
    if (field.doc) lines.push(`  /** ${field.doc} */`);
    const opt = field.required ? '' : '?';
    lines.push(`  ${field.name}${opt}: ${field.tsType};`);
  }
  lines.push(`}`);
  lines.push('');
}

function emitClassDeclaration(
  lines: string[],
  serviceName: string,
  config: ServiceConfig,
  opts: ServiceConfig['options'],
  operationInputInterfaces: Map<string, string>,
): void {
  const generics = config.genericParams ? `<${config.genericParams.join(', ')}>` : '';
  if (config.doc) lines.push(`/** ${config.doc} */`);
  lines.push(`export class ${config.className}${generics} {`);

  // Constructor
  if (config.constructorArg) {
    const optionsParam = config.constructorOptions
      ? `, options?: ${config.constructorOptions.type}`
      : '';
    lines.push(`  constructor(${config.constructorArg.name}: ${config.constructorArg.type}${optionsParam}) {}`);
  } else {
    lines.push(`  constructor() {}`);
  }
  lines.push('');

  // Methods
  const operations = Object.entries(config.operations);
  for (let i = 0; i < operations.length; i++) {
    const [methodName, opEntry] = operations[i];
    if (isAlias(opEntry)) {
      const targetEntry = config.operations[opEntry.aliasOf];
      if (targetEntry && !isAlias(targetEntry)) {
        emitMethod(lines, methodName, targetEntry as OperationConfig, opts, operationInputInterfaces, opEntry.aliasOf);
      }
    } else {
      emitMethod(lines, methodName, opEntry as OperationConfig, opts, operationInputInterfaces);
    }
    if (i < operations.length - 1) lines.push('');
  }

  lines.push(`}`);

  // Class alias
  if (config.classAlias) {
    lines.push('');
    lines.push(`export { ${config.className} as ${config.classAlias} };`);
  }
}

function emitMethod(
  lines: string[],
  methodName: string,
  op: OperationConfig,
  opts: ServiceConfig['options'],
  operationInputInterfaces: Map<string, string>,
  aliasTarget?: string,
): void {
  if (op.customSignature) {
    lines.push(`  ${methodName}${op.customSignature} {`);
  } else {
    const inputInterfaceName = operationInputInterfaces.get(aliasTarget ?? methodName);
    const paramType = inputInterfaceName ?? 'Record<string, any>';
    const returnType = op.returnType === 'void' ? 'void' : 'T';
    const generic = op.returnType === 'void' ? '' : '<T>';

    lines.push(`  ${methodName}${generic}(params: ${paramType}, options?: ${opts.interfaceName}): Promise<${returnType}> {`);
  }
  lines.push(`    throw new Error(BINDING_ERROR);`);
  lines.push(`  }`);
}

function emitFactoryFunction(
  lines: string[],
  serviceName: string,
  config: ServiceConfig,
  opts: ServiceConfig['options'],
): void {
  const generics = config.genericParams ? `<${config.genericParams.join(', ')}>` : '';
  const instanceName = `${config.className}Instance`;

  if (config.doc) lines.push(`/** ${config.doc} */`);
  lines.push(`export interface ${instanceName}${generics} {`);

  if (config.callable) {
    const callOp = config.operations['call'];
    if (callOp && !isAlias(callOp) && (callOp as OperationConfig).customSignature) {
      lines.push(`  ${(callOp as OperationConfig).customSignature};`);
    }
  }

  for (const [methodName, opEntry] of Object.entries(config.operations)) {
    if (isAlias(opEntry)) continue;
    const op = opEntry as OperationConfig;
    if (op.customSignature) {
      lines.push(`  ${methodName}${op.customSignature};`);
    }
  }

  lines.push(`}`);
  lines.push('');

  const ctorGenerics = config.genericParams ? `<${config.genericParams.join(', ')}>` : '';
  const returnGenerics = config.genericParams
    ? `<${config.genericParams.map(p => p.split('=')[0].trim()).join(', ')}>`
    : '';

  const params: string[] = [
    `${config.constructorArg!.name}: ${config.constructorArg!.type}`,
  ];
  if (config.constructorOptions) {
    params.push(`options?: ${config.constructorOptions.type}`);
  }

  lines.push(`/**`);
  lines.push(` * Creates a typed ${config.className} function binding.`);
  lines.push(` *`);
  lines.push(` * Returns a stub at runtime (safe for CDK inline workflows where the`);
  lines.push(` * transformer replaces usage). Methods throw if called directly.`);
  lines.push(` */`);
  lines.push(`export function ${config.className}${ctorGenerics}(`);
  lines.push(`  ${params.join(',\n  ')},`);
  lines.push(`): ${instanceName}${returnGenerics} {`);

  lines.push(`  const stub: any = () => { throw new Error(BINDING_ERROR); };`);
  for (const methodName of Object.keys(config.operations)) {
    if (isAlias(config.operations[methodName])) continue;
    lines.push(`  stub.${methodName} = () => { throw new Error(BINDING_ERROR); };`);
  }
  lines.push(`  return stub;`);
  lines.push(`}`);
}

function pascalCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Normalize a Smithy sdkId to a valid TypeScript class name.
 * "DynamoDB" → "DynamoDB", "Secrets Manager" → "SecretsManager"
 */
export function normalizeClassName(sdkId: string): string {
  return sdkId.replace(/\s+/g, '');
}
