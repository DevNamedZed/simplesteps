// ---------------------------------------------------------------------------
// esbuild Plugin for SimpleSteps Transformer
//
// Wraps the TypeScript transformer for use with esbuild builds.
// Uses esbuild's onLoad hook to transform files before bundling.
// ---------------------------------------------------------------------------

import ts from 'typescript';
import fs from 'fs';
import { createSimpleStepsTransformer } from '../index.js';

interface EsbuildPlugin {
  name: string;
  setup: (build: EsbuildPluginBuild) => void;
}

interface EsbuildPluginBuild {
  onLoad: (options: { filter: RegExp; namespace?: string }, callback: (args: { path: string }) => Promise<{ contents: string; loader: string } | null | undefined> | { contents: string; loader: string } | null | undefined) => void;
}

export interface SimpleStepsEsbuildPluginOptions {
  /** tsconfig.json path. Defaults to `./tsconfig.json`. */
  tsconfig?: string;
}

/**
 * esbuild plugin that applies the SimpleSteps TypeScript transformer.
 *
 * @example
 * ```ts
 * import { simpleStepsEsbuildPlugin } from '@simplesteps/core/transformer/plugins/esbuild';
 *
 * await esbuild.build({
 *   entryPoints: ['src/index.ts'],
 *   plugins: [simpleStepsEsbuildPlugin()],
 * });
 * ```
 */
export function simpleStepsEsbuildPlugin(
  options: SimpleStepsEsbuildPluginOptions = {},
): EsbuildPlugin {
  const tsconfigPath = options.tsconfig ?? './tsconfig.json';
  let program: ts.Program | undefined;

  return {
    name: 'simplesteps-transformer',

    setup(build) {
      build.onLoad({ filter: /\.tsx?$/ }, (args) => {
        const code = fs.readFileSync(args.path, 'utf-8');

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
        const sourceFile = program.getSourceFile(args.path);
        if (!sourceFile) return null;

        const transformer = createSimpleStepsTransformer(program);
        const result = ts.transform(sourceFile, [transformer]);
        const transformedFile = result.transformed[0];

        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
        const output = printer.printFile(transformedFile);

        result.dispose();

        // Only return if the code actually changed
        if (output === code) return null;

        return {
          contents: output,
          loader: args.path.endsWith('.tsx') ? 'tsx' : 'ts',
        };
      });
    },
  };
}

export default simpleStepsEsbuildPlugin;
