import { Steps, SimpleStepContext, TimeoutError } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const longTask = Lambda<{ jobId: string }, { status: string }>('arn:aws:lambda:us-east-1:123:function:LongTask');

export const retryMixedErrors = Steps.createFunction(
  async (context: SimpleStepContext, input: { jobId: string }) => {
    const result = await longTask.call({ jobId: input.jobId }, {
      retry: {
        errors: [TimeoutError],
        errorEquals: ['CustomError'],
        maxAttempts: 3,
      },
    });
    return { status: result.status };
  },
);
