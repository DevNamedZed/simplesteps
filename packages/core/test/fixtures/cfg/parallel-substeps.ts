import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const validateOrder = Lambda<{ orderId: string }, { valid: boolean }>('arn:aws:lambda:us-east-1:123:function:ValidateOrder');
const enrichOrder = Lambda<{ orderId: string }, { enriched: boolean }>('arn:aws:lambda:us-east-1:123:function:EnrichOrder');
const processPayment = Lambda<{ amount: number }, { confirmed: boolean }>('arn:aws:lambda:us-east-1:123:function:ProcessPayment');
const notifyPayment = Lambda<{ confirmed: boolean }, void>('arn:aws:lambda:us-east-1:123:function:NotifyPayment');

async function orderFlow(orderId: string) {
  const validated = await validateOrder.call({ orderId });
  const enriched = await enrichOrder.call({ orderId });
  return enriched;
}

async function paymentFlow(amount: number) {
  const confirmed = await processPayment.call({ amount });
  await notifyPayment.call({ confirmed: confirmed.confirmed });
  return confirmed;
}

export const parallelSubsteps = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; amount: number }) => {
    const [orderResult, paymentResult] = await Promise.all([
      orderFlow(input.orderId),
      paymentFlow(input.amount),
    ]);
    return { order: orderResult, payment: paymentResult };
  },
);
