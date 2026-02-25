/**
 * Emits runtime/services/metadata.ts — service metadata tables consumed by the compiler.
 *
 * Tables:
 *   - SERVICE_SDK_IDS: className → SDK service ID for ARN construction
 *   - OPTIMIZED_INTEGRATIONS: className → { methodName → { integration, sdkResource?, hasOutput } }
 *   - SDK_PARAM_SHAPE: className → { methodName → { resourceKey, paramKey, extraParams? } }
 *   - SDK_RESOURCE_INJECT: className → resource field name
 */

import type { ServiceConfig, OperationConfig, AutoServiceInfo, ParamShapeEntry } from '../config.js';
import { isAlias } from '../config.js';

const HEADER = `// @generated — DO NOT EDIT. Run \`npx tsx tools/codegen/generate.ts\` to regenerate.`;

export interface MetadataInput {
  optimizedServices: Record<string, ServiceConfig>;
  autoServices: AutoServiceInfo[];
}

export function emitMetadata(input: MetadataInput): string {
  const lines: string[] = [HEADER];
  lines.push('');

  // -----------------------------------------------------------------------
  // SERVICE_SDK_IDS
  // -----------------------------------------------------------------------
  lines.push(`/**`);
  lines.push(` * Maps service class name → lowercase SDK service ID for ARN construction.`);
  lines.push(` * Used to build \`arn:aws:states:::aws-sdk:{sdkId}:{action}\` ARNs.`);
  lines.push(` */`);
  lines.push(`export const SERVICE_SDK_IDS: Record<string, string> = {`);

  // Optimized services — derive sdkId from sdkResource ARNs or arnNamespace
  const optimizedSdkIds = deriveOptimizedSdkIds(input.optimizedServices);
  for (const [className, sdkId] of Object.entries(optimizedSdkIds).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`  ${className}: '${sdkId}',`);
  }

  // Auto-discovered services
  for (const svc of input.autoServices) {
    if (!optimizedSdkIds[svc.className]) {
      lines.push(`  ${svc.className}: '${svc.sdkId}',`);
    }
  }

  lines.push(`};`);
  lines.push('');

  // -----------------------------------------------------------------------
  // OPTIMIZED_INTEGRATIONS
  // -----------------------------------------------------------------------
  lines.push(`export type ServiceIntegration = 'direct' | 'sdk';`);
  lines.push('');
  lines.push(`export interface OptimizedMethodEntry {`);
  lines.push(`  readonly integration: ServiceIntegration;`);
  lines.push(`  readonly sdkResource?: string;`);
  lines.push(`  readonly hasOutput: boolean;`);
  lines.push(`}`);
  lines.push('');
  lines.push(`export interface OptimizedMethodAlias {`);
  lines.push(`  readonly aliasOf: string;`);
  lines.push(`}`);
  lines.push('');
  lines.push(`export type OptimizedEntry = OptimizedMethodEntry | OptimizedMethodAlias;`);
  lines.push('');
  lines.push(`/**`);
  lines.push(` * Services with special ARN patterns (not the generic aws-sdk:service:action pattern).`);
  lines.push(` * If a method is listed here, use its sdkResource. Otherwise fall back to generic.`);
  lines.push(` */`);
  lines.push(`export const OPTIMIZED_INTEGRATIONS: Record<string, Record<string, OptimizedEntry>> = {`);

  for (const [_name, config] of Object.entries(input.optimizedServices)) {
    lines.push(`  ${config.className}: {`);
    for (const [methodName, opEntry] of Object.entries(config.operations)) {
      if (isAlias(opEntry)) {
        lines.push(`    ${methodName}: { aliasOf: '${opEntry.aliasOf}' },`);
      } else {
        const op = opEntry as OperationConfig;
        const parts: string[] = [];
        parts.push(`integration: '${op.integration}'`);
        if (op.sdkResource) {
          parts.push(`sdkResource: '${op.sdkResource}'`);
        }
        parts.push(`hasOutput: ${op.hasOutput}`);
        lines.push(`    ${methodName}: { ${parts.join(', ')} },`);
      }
    }
    lines.push(`  },`);
  }

  lines.push(`};`);
  lines.push('');

  // -----------------------------------------------------------------------
  // SDK_PARAM_SHAPE
  // -----------------------------------------------------------------------
  lines.push(`export const SDK_PARAM_SHAPE: Record<string, Record<string, {`);
  lines.push(`  resourceKey: string;`);
  lines.push(`  paramKey: string;`);
  lines.push(`  extraParams?: Record<string, unknown>;`);
  lines.push(`}>> = {`);

  for (const [_name, config] of Object.entries(input.optimizedServices)) {
    if (!config.paramShape || Object.keys(config.paramShape).length === 0) continue;

    lines.push(`  ${config.className}: {`);
    for (const [methodName, shape] of Object.entries(config.paramShape)) {
      const parts: string[] = [];
      parts.push(`resourceKey: '${shape.resourceKey}'`);
      parts.push(`paramKey: '${shape.paramKey}'`);
      if (shape.extraParams) {
        parts.push(`extraParams: ${JSON.stringify(shape.extraParams)}`);
      }
      lines.push(`    ${methodName}: { ${parts.join(', ')} },`);
    }
    lines.push(`  },`);
  }

  lines.push(`};`);
  lines.push('');

  // -----------------------------------------------------------------------
  // SDK_RESOURCE_INJECT
  // -----------------------------------------------------------------------
  lines.push(`export const SDK_RESOURCE_INJECT: Record<string, string> = {`);

  for (const [_name, config] of Object.entries(input.optimizedServices)) {
    if (!config.resourceInject) continue;
    lines.push(`  ${config.className}: '${config.resourceInject}',`);
  }

  lines.push(`};`);
  lines.push('');

  return lines.join('\n') + '\n';
}

/**
 * Derive SDK IDs for optimized services from their ARN patterns or class names.
 */
function deriveOptimizedSdkIds(services: Record<string, ServiceConfig>): Record<string, string> {
  const result: Record<string, string> = {};

  // Known mappings for services where the SDK ID doesn't match the class name
  const KNOWN_SDK_IDS: Record<string, string> = {
    Lambda: 'lambda',
    SimpleQueueService: 'sqs',
    DynamoDB: 'dynamodb',
    SNS: 'sns',
    StepFunction: 'sfn',
    EventBridge: 'eventbridge',
    S3: 's3',
    SecretsManager: 'secretsmanager',
    SSM: 'ssm',
    ECS: 'ecs',
    Bedrock: 'bedrock',
    Batch: 'batch',
    Glue: 'glue',
    CodeBuild: 'codebuild',
    Athena: 'athena',
  };

  for (const [_name, config] of Object.entries(services)) {
    result[config.className] = KNOWN_SDK_IDS[config.className] ?? config.className.toLowerCase();
  }

  return result;
}
