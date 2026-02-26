import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const pollFn = Lambda<{ jobId: string }, { status: string; retryable: boolean }>('arn:aws:lambda:us-east-1:123:function:Poll');
const processFn = Lambda<{ jobId: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Process');

export const doWhileLoop = Steps.createFunction(
  async (context: SimpleStepContext, input: { jobId: string }) => {
    let poll;
    do {
      poll = await pollFn.call({ jobId: input.jobId });
    } while (poll.status !== 'ready');
    const result = await processFn.call({ jobId: input.jobId });
    return { result: result.result };
  },
);
