import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const checkService = Lambda<{ id: string }, { done: boolean; data: string }>(
  'arn:aws:lambda:us-east-1:123:function:Check'
);

export const whileLoop = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    let result = await checkService.call({ id: input.id });
    while (!result.done) {
      result = await checkService.call({ id: input.id });
    }
    return { finished: true, data: result.data };
  },
);
