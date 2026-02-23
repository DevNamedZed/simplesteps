import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Batch operations. */
export interface BatchOptions {
  retry?: RetryPolicy;
}

/** AWS Batch job queue binding for the SimpleSteps compiler. */
export class Batch {
  constructor(jobQueueArn: string) {}

  submitJob<T = any>(params: Record<string, any>, options?: BatchOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  submitJobAsync(params: Record<string, any>, options?: BatchOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
