import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const processItem = Lambda<{ item: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:ProcessItem');

export const stepsMap = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[] }) => {
    await Steps.map(input.items, async (item) => {
      await processItem.call({ item });
    }, { maxConcurrency: 10 });
  },
);
