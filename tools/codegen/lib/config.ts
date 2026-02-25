/** Configuration schema for services.codegen.json */

export interface CustomOptionField {
  type: string;
  optional?: boolean;
}

export interface CustomTypeDefinition {
  name: string;
  kind: 'interface';
  exported: boolean;
  doc?: string;
  members: Record<string, { type: string; required?: boolean; doc?: string }>;
}

export interface ParamShapeEntry {
  resourceKey: string;
  paramKey: string;
  extraParams?: Record<string, unknown>;
}

export interface OperationConfig {
  smithyOperation?: string | null;
  integration: 'direct' | 'sdk';
  sdkResource?: string;
  hasOutput: boolean;
  omitFromInput?: string[];
  returnType?: 'void' | 'generic';
  customSignature?: string;
}

export interface AliasConfig {
  aliasOf: string;
}

export type OperationEntry = OperationConfig | AliasConfig;

export function isAlias(entry: OperationEntry): entry is AliasConfig {
  return 'aliasOf' in entry;
}

export interface ConstructorArgConfig {
  name: string;
  type: string;
  doc?: string;
}

export interface OptionsConfig {
  interfaceName: string;
  fields: Record<string, CustomOptionField>;
}

export interface ServiceConfig {
  smithyModel: string | null;
  smithyServiceId?: string;
  className: string;
  classAlias?: string;
  pattern: 'class' | 'factory';
  constructorArg: ConstructorArgConfig | null;
  constructorOptions?: { type: string };
  genericParams?: string[];
  resourceInject?: string;
  paramShape?: Record<string, ParamShapeEntry>;
  options: OptionsConfig;
  customTypes?: CustomTypeDefinition[];
  callable?: boolean;
  operations: Record<string, OperationEntry>;
  doc?: string;
}

/** Info for an auto-discovered service from a Smithy model (not in optimizedServices). */
export interface AutoServiceInfo {
  className: string;
  sdkId: string;       // lowercase, for ARN construction (e.g., "dynamodb")
  sdkIdPascal: string; // PascalCase SDK ID (e.g., "DynamoDB")
  modelPath: string;
  operationCount: number;
}

export interface CodegenConfig {
  include: string[];
  optimizedServices: Record<string, ServiceConfig>;
}
