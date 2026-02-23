import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Glue operations. */
export interface GlueOptions {
  retry?: RetryPolicy;
}

/** AWS Glue job binding for the SimpleSteps compiler. */
export class Glue {
  constructor(jobName: string) {}

  startJobRun<T = any>(params: Record<string, any>, options?: GlueOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startJobRunAsync(params: Record<string, any>, options?: GlueOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
