import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Lambda invocations. */
export interface LambdaOptions {
  retry?: RetryPolicy;
}

/** A callable Lambda function instance. */
export interface LambdaInstance<TInput, TOutput> {
  (input: TInput): Promise<TOutput>;
  call(input: TInput, options?: LambdaOptions): Promise<TOutput>;
  callAsync(input: TInput, options?: LambdaOptions): Promise<void>;
  callWithCallback<TResult = any>(input: TInput, options?: LambdaOptions): Promise<TResult>;
}

/**
 * Creates a typed Lambda function binding.
 *
 * This is a compile-time-only construct and will throw at runtime.
 */
export function Lambda<TInput = any, TOutput = any>(
  arn: string,
  options?: LambdaOptions,
): LambdaInstance<TInput, TOutput> {
  throw new Error(BINDING_ERROR);
}
