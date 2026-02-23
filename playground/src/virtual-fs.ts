// Virtual file system: runtime type declarations bundled as raw strings.
// Vite's ?raw suffix imports files as string constants at build time.

import runtimeIndex from '../../packages/core/src/runtime/index.ts?raw';
import servicesTypes from '../../packages/core/src/runtime/services/types.ts?raw';
import servicesLambda from '../../packages/core/src/runtime/services/Lambda.ts?raw';
import servicesDynamoDB from '../../packages/core/src/runtime/services/DynamoDB.ts?raw';
import servicesSNS from '../../packages/core/src/runtime/services/SNS.ts?raw';
import servicesSQS from '../../packages/core/src/runtime/services/SimpleQueueService.ts?raw';
import servicesStepFunction from '../../packages/core/src/runtime/services/StepFunction.ts?raw';
import servicesEventBridge from '../../packages/core/src/runtime/services/EventBridge.ts?raw';
import servicesS3 from '../../packages/core/src/runtime/services/S3.ts?raw';
import servicesSecretsManager from '../../packages/core/src/runtime/services/SecretsManager.ts?raw';
import servicesSSM from '../../packages/core/src/runtime/services/SSM.ts?raw';
import servicesECS from '../../packages/core/src/runtime/services/ECS.ts?raw';
import servicesBedrock from '../../packages/core/src/runtime/services/Bedrock.ts?raw';
import servicesBatch from '../../packages/core/src/runtime/services/Batch.ts?raw';
import servicesGlue from '../../packages/core/src/runtime/services/Glue.ts?raw';
import servicesCodeBuild from '../../packages/core/src/runtime/services/CodeBuild.ts?raw';
import servicesAthena from '../../packages/core/src/runtime/services/Athena.ts?raw';
import servicesIndex from '../../packages/core/src/runtime/services/index.ts?raw';

/** Minimal lib shim — just enough for the compiler's symbol resolution. */
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

export const RUNTIME_PATH = '/virtual/runtime/index.ts';
export const SERVICES_DIR = '/virtual/runtime/services';

/**
 * Build the virtual file map for the compiler.
 * Accepts a map of user files (e.g. { 'workflow.ts': '...' }) which are
 * placed under /virtual/. Import paths should use './runtime/index'.
 */
export function buildVirtualFiles(userFiles: Record<string, string>): Record<string, string> {
  const files: Record<string, string> = {
    '/virtual/runtime/index.ts': runtimeIndex,
    '/virtual/runtime/services/types.ts': servicesTypes,
    '/virtual/runtime/services/Lambda.ts': servicesLambda,
    '/virtual/runtime/services/DynamoDB.ts': servicesDynamoDB,
    '/virtual/runtime/services/SNS.ts': servicesSNS,
    '/virtual/runtime/services/SimpleQueueService.ts': servicesSQS,
    '/virtual/runtime/services/StepFunction.ts': servicesStepFunction,
    '/virtual/runtime/services/EventBridge.ts': servicesEventBridge,
    '/virtual/runtime/services/S3.ts': servicesS3,
    '/virtual/runtime/services/SecretsManager.ts': servicesSecretsManager,
    '/virtual/runtime/services/SSM.ts': servicesSSM,
    '/virtual/runtime/services/ECS.ts': servicesECS,
    '/virtual/runtime/services/Bedrock.ts': servicesBedrock,
    '/virtual/runtime/services/Batch.ts': servicesBatch,
    '/virtual/runtime/services/Glue.ts': servicesGlue,
    '/virtual/runtime/services/CodeBuild.ts': servicesCodeBuild,
    '/virtual/runtime/services/Athena.ts': servicesAthena,
    '/virtual/runtime/services/index.ts': servicesIndex,
    '/lib/lib.shim.d.ts': LIB_SHIM,
  };
  for (const [name, content] of Object.entries(userFiles)) {
    files[`/virtual/${name}`] = content;
  }
  return files;
}

/** Get the raw runtime source for Monaco autocomplete registration. */
export function getRuntimeSources(): Record<string, string> {
  return {
    'runtime/index.ts': runtimeIndex,
    'runtime/services/Lambda.ts': servicesLambda,
    'runtime/services/DynamoDB.ts': servicesDynamoDB,
    'runtime/services/SNS.ts': servicesSNS,
    'runtime/services/SimpleQueueService.ts': servicesSQS,
    'runtime/services/StepFunction.ts': servicesStepFunction,
    'runtime/services/EventBridge.ts': servicesEventBridge,
    'runtime/services/S3.ts': servicesS3,
    'runtime/services/SecretsManager.ts': servicesSecretsManager,
    'runtime/services/SSM.ts': servicesSSM,
    'runtime/services/ECS.ts': servicesECS,
    'runtime/services/Bedrock.ts': servicesBedrock,
    'runtime/services/Batch.ts': servicesBatch,
    'runtime/services/Glue.ts': servicesGlue,
    'runtime/services/CodeBuild.ts': servicesCodeBuild,
    'runtime/services/Athena.ts': servicesAthena,
    'runtime/services/index.ts': servicesIndex,
  };
}
