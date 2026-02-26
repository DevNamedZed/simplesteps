import type { TaskOptions } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Activity operations. */
export interface ActivityOptions extends TaskOptions {}

/** A callable Activity task instance. */
export interface ActivityInstance<TInput = any, TOutput = any> {
  (input: TInput, options?: ActivityOptions): Promise<TOutput>;
  call(input: TInput, options?: ActivityOptions): Promise<TOutput>;
}

/**
 * Creates a typed Activity task binding.
 *
 * Activity tasks use `Resource: "arn:aws:states:REGION:ACCOUNT:activity:NAME"`.
 * The worker polls for tasks, processes them, and sends back results via
 * SendTaskSuccess/SendTaskFailure.
 *
 * @example
 *   const reviewTask = Activity<{ document: string }, { approved: boolean }>(
 *     'arn:aws:states:us-east-1:123456789012:activity:HumanReview'
 *   );
 *
 *   const result = await reviewTask.call(
 *     { document: input.document },
 *     { timeoutSeconds: 3600, heartbeatSeconds: 60 },
 *   );
 */
export function Activity<TInput = any, TOutput = any>(
  arn: string,
  options?: ActivityOptions,
): ActivityInstance<TInput, TOutput> {
  const stub: any = () => { throw new Error(BINDING_ERROR); };
  stub.call = () => { throw new Error(BINDING_ERROR); };
  return stub;
}
