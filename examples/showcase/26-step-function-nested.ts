// Nested Step Function Execution
//
// Start a child state machine and wait for it to complete (sync),
// fire-and-forget (async), or wait for callback.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { StepFunction } from '../../packages/core/src/runtime/services/StepFunction';

const validationWorkflow = new StepFunction<
  { data: string },
  { valid: boolean; score: number }
>('arn:aws:states:us-east-1:123456789:stateMachine:ValidationWorkflow');

const notifyWorkflow = new StepFunction<
  { message: string },
  void
>('arn:aws:states:us-east-1:123456789:stateMachine:NotifyWorkflow');

export const nestedExecution = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    // Synchronous — waits for child to complete
    const result = await validationWorkflow.startExecution({ data: input.data });

    if (!result.valid) {
      return { status: 'INVALID', score: result.score };
    }

    // Asynchronous — fire and forget
    await notifyWorkflow.startExecutionAsync({ message: 'Validation passed' });

    return { status: 'VALID', score: result.score };
  },
);
