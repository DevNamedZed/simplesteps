import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const processItem = Lambda<{ item: string }, { processed: boolean }>('arn:aws:lambda:us-east-1:123:function:Process');

export const forOf = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[] }) => {
    for (const item of input.items) {
      await processItem.call({ item });
    }
    return { done: true };
  },
);
