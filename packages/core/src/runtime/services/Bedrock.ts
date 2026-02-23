import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Bedrock operations. */
export interface BedrockOptions {
  retry?: RetryPolicy;
}

/** Bedrock model binding for the SimpleSteps compiler. */
export class Bedrock {
  constructor(modelId: string) {}

  invokeModel<T = any>(params: Record<string, any>, options?: BedrockOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
