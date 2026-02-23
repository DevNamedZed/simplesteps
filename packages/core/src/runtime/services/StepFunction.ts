import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Step Function executions. */
export interface StepFunctionOptions {
  executionName?: string;
  retry?: RetryPolicy;
}

/** Step Function binding for the SimpleSteps compiler. */
export class StepFunction<TInput = any, TOutput = any> {
  constructor(stateMachineArn: string, options?: StepFunctionOptions) {}

  startExecution(input: TInput): Promise<TOutput> {
    throw new Error(BINDING_ERROR);
  }

  startExecutionAsync(input: TInput): Promise<{ executionArn: string }> {
    throw new Error(BINDING_ERROR);
  }

  startExecutionWithCallback<TResult = any>(input: TInput): Promise<TResult> {
    throw new Error(BINDING_ERROR);
  }
}
