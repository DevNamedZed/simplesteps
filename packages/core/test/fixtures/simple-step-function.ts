import { Steps, SimpleStepContext } from '../../src/runtime/index';
import { Lambda } from '../../src/runtime/services/Lambda';

const orderService = Lambda<{ orderId: string }, { status: string }>('arn:aws:lambda:us-east-1:123456789:function:OrderService');

export const processOrder = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const result = await orderService.call({ orderId: input.orderId });
    return { status: result.status };
  },
);
