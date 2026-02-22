import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const processFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Process');
const rejectFn = Lambda<{ reason: string }, void>('arn:aws:lambda:us-east-1:123:function:Reject');

export const andOrConditions = Steps.createFunction(
  async (context: SimpleStepContext, input: { priority: number; status: string }) => {
    if (input.priority > 5 && input.status === 'active') {
      const result = await processFn.call({ id: 'high-priority' });
      return { processed: true, result: result.result };
    } else {
      await rejectFn.call({ reason: 'not eligible' });
      return { processed: false };
    }
  },
);
