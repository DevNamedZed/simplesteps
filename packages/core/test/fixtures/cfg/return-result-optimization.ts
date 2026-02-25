import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const processOrder = Lambda<{ orderId: string }, { status: string; total: number }>(
  'arn:aws:lambda:us-east-1:123:function:ProcessOrder',
);

export const returnResultOptimization = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const result = await processOrder.call({ orderId: input.orderId });
    return result;
  },
);
