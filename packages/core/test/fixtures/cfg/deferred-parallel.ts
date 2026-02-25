import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const validateOrder = Lambda<{ orderId: string }, { valid: boolean }>('arn:aws:lambda:us-east-1:123:function:ValidateOrder');
const processPayment = Lambda<{ amount: number }, { confirmed: boolean }>('arn:aws:lambda:us-east-1:123:function:ProcessPayment');

export const deferredParallel = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; amount: number }) => {
    const orderPromise = validateOrder.call({ orderId: input.orderId });
    const paymentPromise = processPayment.call({ amount: input.amount });
    const order = await orderPromise;
    const payment = await paymentPromise;
    return { order, payment };
  },
);
