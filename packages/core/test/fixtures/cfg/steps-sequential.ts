import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const processItem = Lambda<{ item: string }, void>('arn:aws:lambda:us-east-1:123:function:ProcessItem');

export const stepsSequential = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[] }) => {
    for (const item of Steps.sequential(input.items)) {
      await processItem.call({ item });
    }
  },
);
