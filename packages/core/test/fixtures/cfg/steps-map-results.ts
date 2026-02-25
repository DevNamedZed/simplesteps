import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const processOrder = Lambda<{ order: string }, { processed: boolean }>('arn:aws:lambda:us-east-1:123:function:ProcessOrder');

export const stepsMapResults = Steps.createFunction(
  async (context: SimpleStepContext, input: { orders: string[] }) => {
    const results = await Steps.map(input.orders, async (order) => {
      return await processOrder.call({ order });
    });
    return { results };
  },
);
