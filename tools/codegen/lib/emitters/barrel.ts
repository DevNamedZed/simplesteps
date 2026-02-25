/**
 * Emits runtime/services/index.ts barrel file.
 */

import type { ServiceConfig, AutoServiceInfo } from '../config.js';
import { isAlias, type OperationConfig } from '../config.js';
import { normalizeClassName } from './serviceFile.js';

const HEADER = `// @generated — DO NOT EDIT. Run \`npx tsx tools/codegen/generate.ts\` to regenerate.`;

export interface BarrelInput {
  optimizedServices: Record<string, ServiceConfig>;
  autoServices: AutoServiceInfo[];
}

export function emitBarrel(input: BarrelInput): string {
  const lines: string[] = [HEADER];

  // Always re-export RetryPolicy and TaskOptions from types.ts (hand-maintained)
  lines.push(`export type { RetryPolicy, TaskOptions } from './types';`);

  // Re-export metadata for compiler consumption
  lines.push(`export {`);
  lines.push(`  SERVICE_SDK_IDS,`);
  lines.push(`  OPTIMIZED_INTEGRATIONS,`);
  lines.push(`  SDK_PARAM_SHAPE,`);
  lines.push(`  SDK_RESOURCE_INJECT,`);
  lines.push(`} from './metadata';`);
  lines.push(`export type {`);
  lines.push(`  ServiceIntegration,`);
  lines.push(`  OptimizedMethodEntry,`);
  lines.push(`  OptimizedMethodAlias,`);
  lines.push(`  OptimizedEntry,`);
  lines.push(`} from './metadata';`);

  // Optimized services
  for (const [_serviceName, config] of Object.entries(input.optimizedServices)) {
    const fileName = `./${config.className}`;

    if (config.pattern === 'factory') {
      lines.push(`export { ${config.className} } from '${fileName}';`);
      const typeExports: string[] = [`${config.className}Instance`];
      typeExports.push(config.options.interfaceName);
      lines.push(`export type { ${typeExports.join(', ')} } from '${fileName}';`);
    } else {
      lines.push(`export { ${config.className}${config.classAlias ? `, ${config.classAlias}` : ''} } from '${fileName}';`);

      const typeExports: string[] = [config.options.interfaceName];
      if (config.customTypes) {
        for (const ct of config.customTypes) {
          if (ct.exported) typeExports.push(ct.name);
        }
      }
      lines.push(`export type { ${typeExports.join(', ')} } from '${fileName}';`);
    }
  }

  // Auto-discovered services
  for (const svc of input.autoServices) {
    const fileName = `./${svc.className}`;
    lines.push(`export { ${svc.className} } from '${fileName}';`);
  }

  return lines.join('\n') + '\n';
}
