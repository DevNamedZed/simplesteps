import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const processItem = Lambda<{ item: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:ProcessItem');

export const stepsMapRetry = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[] }) => {
    const results = await Steps.map(input.items, async (item) => {
      return await processItem.call({ item });
    }, {
      maxConcurrency: 10,
      retry: { errorEquals: ['States.ALL'], maxAttempts: 3, intervalSeconds: 2 },
    });
    return { results };
  },
);
