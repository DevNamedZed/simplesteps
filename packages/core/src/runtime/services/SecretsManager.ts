import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Secrets Manager operations. */
export interface SecretsManagerOptions {
  retry?: RetryPolicy;
}

/** Secrets Manager binding for the SimpleSteps compiler. */
export class SecretsManager {
  constructor() {}

  getSecretValue<T = any>(params: Record<string, any>, options?: SecretsManagerOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putSecretValue(params: Record<string, any>, options?: SecretsManagerOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  createSecret<T = any>(params: Record<string, any>, options?: SecretsManagerOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSecret(params: Record<string, any>, options?: SecretsManagerOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  deleteSecret(params: Record<string, any>, options?: SecretsManagerOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  describeSecret<T = any>(params: Record<string, any>, options?: SecretsManagerOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
