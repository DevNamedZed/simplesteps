import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for SSM Parameter Store operations. */
export interface SSMOptions {
  retry?: RetryPolicy;
}

/** SSM Parameter Store binding for the SimpleSteps compiler. */
export class SSM {
  constructor() {
    throw new Error(BINDING_ERROR);
  }

  getParameter<T = any>(params: Record<string, any>, options?: SSMOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putParameter(params: Record<string, any>, options?: SSMOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  getParameters<T = any>(params: Record<string, any>, options?: SSMOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getParametersByPath<T = any>(params: Record<string, any>, options?: SSMOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteParameter(params: Record<string, any>, options?: SSMOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
