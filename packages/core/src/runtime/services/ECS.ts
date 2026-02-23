import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for ECS operations. */
export interface EcsOptions {
  retry?: RetryPolicy;
}

/** ECS cluster binding for the SimpleSteps compiler. */
export class ECS {
  constructor(clusterArn: string) {}

  runTask<T = any>(params: Record<string, any>, options?: EcsOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  runTaskAsync(params: Record<string, any>, options?: EcsOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
