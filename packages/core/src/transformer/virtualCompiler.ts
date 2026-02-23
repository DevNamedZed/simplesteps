// ---------------------------------------------------------------------------
// Virtual Compiler
//
// Creates a virtual TypeScript CompilerHost, builds a ts.Program from
// a synthesized workflow source string, and compiles it to ASL using
// compileFromProgram(). This avoids writing temporary files to disk.
//
// Adapted from playground/src/compiler-bridge.ts.
// ---------------------------------------------------------------------------

import ts from 'typescript';
import path from 'path';
import fs from 'fs';
import { compileFromProgram, AslSerializer } from '../index.js';
import type { CompilerDiagnostic } from '../compiler/compilerContext.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VirtualCompileResult {
  /** The serialized ASL JSON string. */
  readonly asl: string;
  /** Any compiler diagnostics (errors + warnings). */
  readonly errors: readonly CompilerDiagnostic[];
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Compile a synthesized workflow source string to ASL.
 *
 * @param syntheticSource - The full TypeScript source for a virtual workflow file.
 *   Should include imports, `declare const` for runtime bindings, service
 *   declarations, and the exported workflow function.
 * @param substitutions - Map of variable names to placeholder values
 *   (e.g. `{ __binding_0__: '$$0$$' }`).
 */
export function compileVirtualWorkflow(
  syntheticSource: string,
  substitutions: Record<string, unknown>,
): VirtualCompileResult {
  const runtimeDir = resolveRuntimeDir();
  const servicesDir = path.join(runtimeDir, 'services');

  // Build the virtual file map: user source + real runtime files
  const files = buildFileMap(syntheticSource, runtimeDir, servicesDir);

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.Node16,
    moduleResolution: ts.ModuleResolutionKind.Node16,
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
  };

  const host = createVirtualHost(files, compilerOptions);
  const program = ts.createProgram(
    Object.keys(files),
    compilerOptions,
    host,
  );

  const result = compileFromProgram({
    program,
    runtimePath: '/virtual/runtime/index.ts',
    servicesDir: '/virtual/runtime/services',
    skipPatterns: ['/virtual/runtime/', '/lib/'],
    substitutions,
  });

  if (result.stateMachines.length === 0) {
    return {
      asl: '{}',
      errors: result.errors,
    };
  }

  const asl = AslSerializer.serialize(result.stateMachines[0].definition);
  return { asl, errors: result.errors };
}

// ---------------------------------------------------------------------------
// Internal: resolve runtime file paths
// ---------------------------------------------------------------------------

function resolveRuntimeDir(): string {
  // When running from dist/, try to find the src/ directory for .ts files.
  // The virtual compiler needs .ts source files (not .js) to create a program.
  const distRuntime = path.resolve(__dirname, '../runtime');
  const srcRuntime = path.resolve(__dirname, '../../src/runtime');
  // Prefer src/ if it exists (development / file: reference)
  if (fs.existsSync(path.join(srcRuntime, 'index.ts'))) {
    return srcRuntime;
  }
  // Fall back to dist/ (will need to use .d.ts files)
  return distRuntime;
}

// ---------------------------------------------------------------------------
// Internal: build virtual file map
// ---------------------------------------------------------------------------

/** Minimal lib shim for virtual compilation — same as playground. */
const LIB_SHIM = `
interface Array<T> { length: number; [n: number]: T; push(...items: T[]): number; map<U>(fn: (v: T, i: number, a: T[]) => U): U[]; filter(fn: (v: T) => boolean): T[]; some(fn: (v: T) => boolean): boolean; includes(v: T): boolean; split?: never; }
interface ReadonlyArray<T> { length: number; [n: number]: T; map<U>(fn: (v: T) => U): U[]; filter(fn: (v: T) => boolean): T[]; some(fn: (v: T) => boolean): boolean; includes(v: T): boolean; }
interface String { length: number; split(sep: string): string[]; includes(s: string): boolean; startsWith(s: string): boolean; endsWith(s: string): boolean; trim(): string; replace(s: string | RegExp, r: string): string; }
interface Number {}
interface Boolean {}
interface Object {}
interface Function { prototype: any; }
interface RegExp {}
interface IArguments {}
interface Symbol {}
interface SymbolConstructor { readonly iterator: unique symbol; }
declare var Symbol: SymbolConstructor;
interface IterableIterator<T> {}
interface Iterable<T> { [Symbol.iterator](): IterableIterator<T>; }
interface Iterator<T> { next(): { value: T; done: boolean }; }
interface PromiseLike<T> { then<R>(fn: (v: T) => R): PromiseLike<R>; }
interface Promise<T> { then<R>(fn: (v: T) => R | PromiseLike<R>): Promise<R>; catch(fn: (e: any) => any): Promise<T>; }
interface PromiseConstructor { all<T extends readonly unknown[]>(values: T): Promise<{ -readonly [K in keyof T]: Awaited<T[K]> }>; resolve<T>(value: T): Promise<T>; reject(reason?: any): Promise<never>; }
declare var Promise: PromiseConstructor;
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type Partial<T> = { [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Record<K extends keyof any, V> = { [P in K]: V };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;
type NonNullable<T> = T & {};
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
interface Error { name: string; message: string; stack?: string; }
interface ErrorConstructor { new(message?: string): Error; (message?: string): Error; prototype: Error; }
declare var Error: ErrorConstructor;
interface JSON { parse(text: string): any; stringify(value: any): string; }
declare var JSON: JSON;
declare function parseInt(s: string, radix?: number): number;
declare function parseFloat(s: string): number;
interface Console { log(...args: any[]): void; error(...args: any[]): void; warn(...args: any[]): void; }
declare var console: Console;
`;

/**
 * Build a file map for the virtual compiler host.
 * Maps virtual paths to file contents, reading real runtime sources from disk.
 */
function buildFileMap(
  syntheticSource: string,
  runtimeDir: string,
  servicesDir: string,
): Record<string, string> {
  const files: Record<string, string> = {
    '/virtual/workflow.ts': syntheticSource,
    '/lib/lib.shim.d.ts': LIB_SHIM,
  };

  // Read runtime/index.ts (or .d.ts in published package)
  const runtimeIndex = fs.existsSync(path.join(runtimeDir, 'index.ts'))
    ? 'index.ts'
    : 'index.d.ts';
  files['/virtual/runtime/index.ts'] = fs.readFileSync(
    path.join(runtimeDir, runtimeIndex),
    'utf-8',
  );

  // Read all service files (.ts preferred, .d.ts fallback)
  const allFiles = fs.readdirSync(servicesDir);
  const hasTsSource = allFiles.some(f => f.endsWith('.ts') && !f.endsWith('.d.ts'));
  const serviceFiles = hasTsSource
    ? allFiles.filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'))
    : allFiles.filter(f => f.endsWith('.d.ts'));
  for (const serviceFile of serviceFiles) {
    // Always map to .ts virtual path even if reading .d.ts
    const virtualName = serviceFile.replace(/\.d\.ts$/, '.ts');
    files[`/virtual/runtime/services/${virtualName}`] = fs.readFileSync(
      path.join(servicesDir, serviceFile),
      'utf-8',
    );
  }

  return files;
}

// ---------------------------------------------------------------------------
// Internal: virtual CompilerHost
// ---------------------------------------------------------------------------

function resolveVirtualPath(containingFile: string, specifier: string): string {
  if (!specifier.startsWith('.')) return specifier;

  const parts = containingFile.split('/');
  parts.pop(); // drop filename
  const dir = parts.join('/');

  const segments = `${dir}/${specifier}`.split('/');
  const resolved: string[] = [];
  for (const seg of segments) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') {
      resolved.pop();
      continue;
    }
    resolved.push(seg);
  }

  let result = '/' + resolved.join('/');
  if (!result.endsWith('.ts')) {
    result += '.ts';
  }
  return result;
}

function createVirtualHost(
  files: Record<string, string>,
  compilerOptions: ts.CompilerOptions,
): ts.CompilerHost {
  const sourceFiles = new Map<string, ts.SourceFile>();

  const host: ts.CompilerHost = {
    getSourceFile(fileName, languageVersion) {
      if (sourceFiles.has(fileName)) return sourceFiles.get(fileName)!;
      const content = files[fileName];
      if (content == null) return undefined;
      const sf = ts.createSourceFile(fileName, content, languageVersion, true);
      sourceFiles.set(fileName, sf);
      return sf;
    },
    getDefaultLibFileName: () => '/lib/lib.shim.d.ts',
    writeFile: () => {},
    getCurrentDirectory: () => '/',
    getCanonicalFileName: (f: string) => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
    fileExists: (fileName: string) => fileName in files,
    readFile: (fileName: string) => files[fileName] ?? undefined,

    resolveModuleNameLiterals(moduleLiterals, containingFile) {
      return moduleLiterals.map((literal) => {
        const name = literal.text;
        const resolved = resolveVirtualPath(containingFile, name);
        if (resolved in files) {
          return {
            resolvedModule: {
              resolvedFileName: resolved,
              isExternalLibraryImport: false,
              extension: ts.Extension.Ts,
            },
          };
        }
        // Try index file
        const asIndex = resolved.replace(/\.ts$/, '/index.ts');
        if (asIndex in files) {
          return {
            resolvedModule: {
              resolvedFileName: asIndex,
              isExternalLibraryImport: false,
              extension: ts.Extension.Ts,
            },
          };
        }
        return { resolvedModule: undefined };
      });
    },
  };

  return host;
}
