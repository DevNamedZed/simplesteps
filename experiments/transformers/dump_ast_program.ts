import * as path from 'path';
import type * as ts from 'typescript';
import type { ProgramTransformerExtras, PluginConfig } from 'ts-patch';

export const newFile = path.resolve(__dirname, 'added-file.ts');

export default function (
  program: ts.Program, 
  host: ts.CompilerHost | undefined, 
  options: PluginConfig, 
  { ts: tsInstance }: ProgramTransformerExtras
) {
    
  return program;
}