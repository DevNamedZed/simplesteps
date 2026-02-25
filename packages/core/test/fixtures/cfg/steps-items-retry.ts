import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const processItem = Lambda<{ item: string }, void>('arn:aws:lambda:us-east-1:123:function:ProcessItem');

export const stepsItemsRetry = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[] }) => {
    for (const item of Steps.items(input.items, {
      maxConcurrency: 5,
      retry: [
        { errorEquals: ['States.TaskFailed'], maxAttempts: 2 },
        { errorEquals: ['States.ALL'], maxAttempts: 5, intervalSeconds: 1, backoffRate: 2 },
      ],
    })) {
      await processItem.call({ item });
    }
  },
);
