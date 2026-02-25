import { Steps, SimpleStepContext, TimeoutError, TaskFailedError } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const longTask = Lambda<{ jobId: string }, { status: string }>('arn:aws:lambda:us-east-1:123:function:LongTask');

export const retryErrors = Steps.createFunction(
  async (context: SimpleStepContext, input: { jobId: string }) => {
    const result = await longTask.call({ jobId: input.jobId }, {
      retry: {
        errors: [TimeoutError, TaskFailedError],
        maxAttempts: 3,
        intervalSeconds: 2,
        backoffRate: 2,
      },
    });
    return { status: result.status };
  },
);
