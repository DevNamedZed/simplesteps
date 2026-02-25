import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const getConfig = Lambda<{ env: string }, { value: string }>('arn:aws:lambda:us-east-1:123:function:GetConfig');
const getOrder = Lambda<{ id: string }, { status: string }>('arn:aws:lambda:us-east-1:123:function:GetOrder');
const getPayment = Lambda<{ amount: number }, { confirmed: boolean }>('arn:aws:lambda:us-east-1:123:function:GetPayment');

export const parallelWithPriorState = Steps.createFunction(
  async (context: SimpleStepContext, input: { env: string; orderId: string; amount: number }) => {
    const config = await getConfig.call({ env: input.env });
    const [order, payment] = await Promise.all([
      getOrder.call({ id: input.orderId }),
      getPayment.call({ amount: input.amount }),
    ]);
    return { order: order.status, config: config.value };
  },
);
