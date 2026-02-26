// Steps.succeed() — Explicit Early Termination
//
// Use Steps.succeed() to terminate the workflow without a return value.
// This compiles to an ASL Succeed state.
//
// In most cases, `return value` is sufficient. Steps.succeed() is useful
// when you want to stop execution in a branch without returning data.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const checkStatus = Lambda<{ id: string }, { status: string }>(
  'arn:aws:lambda:us-east-1:123:function:CheckStatus',
);
const processItem = Lambda<{ id: string }, { result: string }>(
  'arn:aws:lambda:us-east-1:123:function:ProcessItem',
);

export const stepsSucceed = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const status = await checkStatus.call({ id: input.id });

    // If already processed, succeed immediately — no further work needed
    if (status.status === 'already_processed') {
      Steps.succeed();
    }

    // This only runs if the status check didn't succeed early
    const result = await processItem.call({ id: input.id });
    return { result: result.result };
  },
);
