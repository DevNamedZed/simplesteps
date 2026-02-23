// ---------------------------------------------------------------------------
// Vite Plugin for SimpleSteps Transformer
//
// Wraps the TypeScript transformer for use with Vite builds.
// Applies the SimpleSteps transform during the Vite build pipeline.
// ---------------------------------------------------------------------------

import ts from 'typescript';
import { createSimpleStepsTransformer } from '../index.js';

interface VitePlugin {
  name: string;
  enforce?: 'pre' | 'post';
  transform?: (code: string, id: string) => { code: string; map?: null } | null;
}

export interface SimpleStepsVitePluginOptions {
  /** tsconfig.json path. Defaults to `./tsconfig.json`. */
  tsconfig?: string;
  /** File extensions to process. Defaults to `['.ts', '.tsx']`. */
  extensions?: string[];
}

/**
 * Vite plugin that applies the SimpleSteps TypeScript transformer.
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { simpleStepsVitePlugin } from '@simplesteps/core/transformer/plugins/vite';
 *
 * export default defineConfig({
 *   plugins: [simpleStepsVitePlugin()],
 * });
 * ```
 */
export function simpleStepsVitePlugin(
  options: SimpleStepsVitePluginOptions = {},
): VitePlugin {
  const extensions = options.extensions ?? ['.ts', '.tsx'];
  const tsconfigPath = options.tsconfig ?? './tsconfig.json';

  let program: ts.Program | undefined;

  return {
    name: 'simplesteps-transformer',
    enforce: 'pre',

    transform(code: string, id: string) {
      // Only process TypeScript files
      if (!extensions.some(ext => id.endsWith(ext))) return null;

      // Quick check: skip files that don't reference SimpleStepsStateMachine
      if (!code.includes('SimpleStepsStateMachine')) return null;

      // Build or reuse the program
      if (!program) {
        const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
        if (configFile.error) return null;

        const parsed = ts.parseJsonConfigFileContent(
          configFile.config,
          ts.sys,
          process.cwd(),
        );
        program = ts.createProgram(parsed.fileNames, parsed.options);
      }

      // Apply the transformer
      const sourceFile = program.getSourceFile(id);
      if (!sourceFile) return null;

      const transformer = createSimpleStepsTransformer(program);
      const result = ts.transform(sourceFile, [transformer]);
      const transformedFile = result.transformed[0];

      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
      const output = printer.printFile(transformedFile);

      result.dispose();

      // Only return if the code actually changed
      if (output === code) return null;

      return { code: output, map: null };
    },
  };
}

export default simpleStepsVitePlugin;
