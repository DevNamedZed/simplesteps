// Script to compile every playground example and report failures.
// Run from repo root: npx tsx playground/test-all-examples.ts

import ts from 'typescript';
import { compileFromProgram } from '../packages/core/dist/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const runtimeDir = path.resolve(__dirname, '../packages/core/src/runtime');
const servicesDir = path.join(runtimeDir, 'services');

const RUNTIME_PATH = '/virtual/runtime/index.ts';
const SERVICES_DIR = '/virtual/runtime/services';

function readRaw(p: string) { return fs.readFileSync(p, 'utf8'); }

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

function buildVirtualFiles(userFiles: Record<string, string>): Record<string, string> {
  const svcDir = servicesDir;
  const files: Record<string, string> = {
    '/virtual/runtime/index.ts': readRaw(path.join(runtimeDir, 'index.ts')),
    '/virtual/runtime/services/types.ts': readRaw(path.join(svcDir, 'types.ts')),
    '/virtual/runtime/services/Lambda.ts': readRaw(path.join(svcDir, 'Lambda.ts')),
    '/virtual/runtime/services/DynamoDB.ts': readRaw(path.join(svcDir, 'DynamoDB.ts')),
    '/virtual/runtime/services/SNS.ts': readRaw(path.join(svcDir, 'SNS.ts')),
    '/virtual/runtime/services/SimpleQueueService.ts': readRaw(path.join(svcDir, 'SimpleQueueService.ts')),
    '/virtual/runtime/services/StepFunction.ts': readRaw(path.join(svcDir, 'StepFunction.ts')),
    '/virtual/runtime/services/EventBridge.ts': readRaw(path.join(svcDir, 'EventBridge.ts')),
    '/virtual/runtime/services/S3.ts': readRaw(path.join(svcDir, 'S3.ts')),
    '/virtual/runtime/services/SecretsManager.ts': readRaw(path.join(svcDir, 'SecretsManager.ts')),
    '/virtual/runtime/services/SSM.ts': readRaw(path.join(svcDir, 'SSM.ts')),
    '/virtual/runtime/services/ECS.ts': readRaw(path.join(svcDir, 'ECS.ts')),
    '/virtual/runtime/services/Bedrock.ts': readRaw(path.join(svcDir, 'Bedrock.ts')),
    '/virtual/runtime/services/Batch.ts': readRaw(path.join(svcDir, 'Batch.ts')),
    '/virtual/runtime/services/Glue.ts': readRaw(path.join(svcDir, 'Glue.ts')),
    '/virtual/runtime/services/CodeBuild.ts': readRaw(path.join(svcDir, 'CodeBuild.ts')),
    '/virtual/runtime/services/Athena.ts': readRaw(path.join(svcDir, 'Athena.ts')),
    '/virtual/runtime/services/index.ts': readRaw(path.join(svcDir, 'index.ts')),
    '/lib/lib.shim.d.ts': LIB_SHIM,
  };
  for (const [name, content] of Object.entries(userFiles)) {
    files[`/virtual/${name}`] = content;
  }
  return files;
}

function resolveVirtualPath(containingFile: string, specifier: string): string {
  if (!specifier.startsWith('.')) return specifier;
  const parts = containingFile.split('/');
  parts.pop();
  const dir = parts.join('/');
  const segments = `${dir}/${specifier}`.split('/');
  const resolved: string[] = [];
  for (const seg of segments) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') { resolved.pop(); continue; }
    resolved.push(seg);
  }
  let p = '/' + resolved.join('/');
  if (!p.endsWith('.ts')) p += '.ts';
  return p;
}

function createVirtualHost(files: Record<string, string>): ts.CompilerHost {
  const sourceFiles = new Map<string, ts.SourceFile>();
  return {
    getSourceFile(fileName: string, languageVersion: ts.ScriptTarget) {
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
    fileExists: (f: string) => f in files,
    readFile: (f: string) => files[f] ?? undefined,
    resolveModuleNameLiterals(moduleLiterals: readonly ts.StringLiteralLike[], containingFile: string) {
      return moduleLiterals.map((literal) => {
        const name = literal.text;
        const resolved = resolveVirtualPath(containingFile, name);
        if (resolved in files) {
          return { resolvedModule: { resolvedFileName: resolved, isExternalLibraryImport: false, extension: ts.Extension.Ts } };
        }
        const asIndex = resolved.replace(/\.ts$/, '/index.ts');
        if (asIndex in files) {
          return { resolvedModule: { resolvedFileName: asIndex, isExternalLibraryImport: false, extension: ts.Extension.Ts } };
        }
        return { resolvedModule: undefined };
      });
    },
  } as ts.CompilerHost;
}

function compileExample(userFiles: Record<string, string>) {
  const files = buildVirtualFiles(userFiles);
  const host = createVirtualHost(files);
  const opts: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true, esModuleInterop: true, skipLibCheck: true, noLib: true,
  };
  const program = ts.createProgram(Object.keys(files), opts, host);
  return compileFromProgram({ program, runtimePath: RUNTIME_PATH, servicesDir: SERVICES_DIR, skipPatterns: ['/virtual/runtime/', '/lib/lib.shim'] });
}

// Extract examples from main.ts
const mainSrc = fs.readFileSync(path.join(__dirname, 'src/main.ts'), 'utf8');

interface ExFile { name: string; content: string }

function extractExampleFiles(key: string): ExFile[] | null {
  const startIdx = mainSrc.indexOf(`'${key}': {`);
  if (startIdx === -1) return null;

  const filesIdx = mainSrc.indexOf('files:', startIdx);
  if (filesIdx === -1 || filesIdx - startIdx > 500) return null;

  const bracketStart = mainSrc.indexOf('[', filesIdx);
  if (bracketStart === -1) return null;

  let depth = 0;
  let i = bracketStart;
  for (; i < mainSrc.length; i++) {
    if (mainSrc[i] === '[') depth++;
    if (mainSrc[i] === ']') { depth--; if (depth === 0) break; }
  }
  const filesArrayStr = mainSrc.slice(bracketStart, i + 1);

  const result: ExFile[] = [];
  // Match template literals properly — handle escaped backticks (\`) inside content
  const fileRegex = /\{\s*name:\s*'([^']+)'\s*,\s*content:\s*`((?:[^`\\]|\\.)*)`\s*\}/g;
  let fileMatch;
  while ((fileMatch = fileRegex.exec(filesArrayStr)) !== null) {
    // Unescape template literal escape sequences
    const raw = fileMatch[2]
      .replace(/\\`/g, '`')
      .replace(/\\\$/g, '$')
      .replace(/\\\\/g, '\\');
    result.push({ name: fileMatch[1], content: raw });
  }

  return result.length > 0 ? result : null;
}

// Get example keys
const exampleRegex = /^\s*'([a-z][a-z0-9-]*)'\s*:\s*\{\s*description:/gm;
const keys: string[] = [];
let match;
while ((match = exampleRegex.exec(mainSrc)) !== null) {
  keys.push(match[1]);
}

const passed: string[] = [];
const failed: { key: string; errors: string[] }[] = [];
const skipped: string[] = [];

for (const key of keys) {
  const files = extractExampleFiles(key);
  if (!files) { skipped.push(key); continue; }

  const userFiles: Record<string, string> = {};
  for (const f of files) userFiles[f.name] = f.content;

  try {
    const result = compileExample(userFiles);
    const realErrors = result.errors.filter(e => e.severity === 'error');
    const isLimit = key.startsWith('limit-');

    if (realErrors.length === 0) {
      passed.push(isLimit ? `${key} (limit - compiled OK)` : key);
    } else if (isLimit) {
      passed.push(`${key} (limit - ${realErrors.length} expected error(s))`);
    } else {
      failed.push({ key, errors: realErrors.map(e => `  [${e.code}] line ${e.line}: ${e.message.substring(0, 150)}`) });
    }
  } catch (err: any) {
    failed.push({ key, errors: [`  CRASH: ${err.message?.substring(0, 150)}`] });
  }
}

console.log(`\n=== RESULTS ===`);
console.log(`Passed: ${passed.length}  |  Failed: ${failed.length}  |  Skipped: ${skipped.length}`);

if (failed.length > 0) {
  console.log(`\n=== FAILURES ===`);
  for (const f of failed) {
    console.log(`\n❌ ${f.key}:`);
    for (const e of f.errors) console.log(e);
  }
}

if (skipped.length > 0) {
  console.log(`\nSkipped: ${skipped.join(', ')}`);
}
