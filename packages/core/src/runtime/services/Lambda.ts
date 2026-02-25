// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy, TaskOptions } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Lambda operations. */
export interface LambdaOptions extends TaskOptions {
}

/** A callable Lambda function instance. */
export interface LambdaInstance<TInput = any, TOutput = any> {
  (input: TInput, options?: LambdaOptions): Promise<TOutput>;
  call(input: TInput, options?: LambdaOptions): Promise<TOutput>;
  callAsync(input: TInput, options?: LambdaOptions): Promise<void>;
  callWithCallback<TResult = any>(input: TInput, options?: LambdaOptions): Promise<TResult>;
}

/**
 * Creates a typed Lambda function binding.
 *
 * Returns a stub at runtime (safe for CDK inline workflows where the
 * transformer replaces usage). Methods throw if called directly.
 */
export function Lambda<TInput = any, TOutput = any>(
  arn: string,
  options?: LambdaOptions,
): LambdaInstance<TInput, TOutput> {
  const stub: any = () => { throw new Error(BINDING_ERROR); };
  stub.call = () => { throw new Error(BINDING_ERROR); };
  stub.callAsync = () => { throw new Error(BINDING_ERROR); };
  stub.callWithCallback = () => { throw new Error(BINDING_ERROR); };
  return stub;
}
