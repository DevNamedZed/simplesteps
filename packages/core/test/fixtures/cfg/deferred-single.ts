import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const validateOrder = Lambda<{ orderId: string }, { valid: boolean }>('arn:aws:lambda:us-east-1:123:function:ValidateOrder');

export const deferredSingle = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const orderPromise = validateOrder.call({ orderId: input.orderId });
    const order = await orderPromise;
    return { valid: order.valid };
  },
);
