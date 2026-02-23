import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for CodeBuild operations. */
export interface CodeBuildOptions {
  retry?: RetryPolicy;
}

/** AWS CodeBuild project binding for the SimpleSteps compiler. */
export class CodeBuild {
  constructor(projectName: string) {}

  startBuild<T = any>(params: Record<string, any>, options?: CodeBuildOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startBuildAsync(params: Record<string, any>, options?: CodeBuildOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
