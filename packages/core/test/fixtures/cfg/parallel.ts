import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const orderFn = Lambda<{ orderId: string }, { status: string }>('arn:aws:lambda:us-east-1:123:function:GetOrder');
const paymentFn = Lambda<{ amount: number }, { confirmed: boolean }>('arn:aws:lambda:us-east-1:123:function:ProcessPayment');

export const parallel = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; amount: number }) => {
    const [orderResult, paymentResult] = await Promise.all([
      orderFn.call({ orderId: input.orderId }),
      paymentFn.call({ amount: input.amount }),
    ]);
    return { order: orderResult, payment: paymentResult };
  },
);
