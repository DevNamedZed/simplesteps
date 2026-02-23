import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Athena operations. */
export interface AthenaOptions {
  retry?: RetryPolicy;
}

/** Athena query binding for the SimpleSteps compiler. */
export class Athena {
  constructor() {}

  startQueryExecution<T = any>(params: Record<string, any>, options?: AthenaOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getQueryExecution<T = any>(params: Record<string, any>, options?: AthenaOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getQueryResults<T = any>(params: Record<string, any>, options?: AthenaOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
