import { Steps, SimpleStepContext, StepException } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

class OrderNotFound extends StepException {}
class PaymentFailed extends StepException {}

const processFn = Lambda<{ orderId: string }, { total: number }>('arn:aws:lambda:us-east-1:123:function:ProcessOrder');
const refundFn = Lambda<{ orderId: string }, void>('arn:aws:lambda:us-east-1:123:function:Refund');
const notifyFn = Lambda<{ message: string }, void>('arn:aws:lambda:us-east-1:123:function:Notify');

export const typedErrors = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    try {
      const result = await processFn.call({ orderId: input.orderId });
      return { status: 'success', total: result.total };
    } catch (e) {
      if (e instanceof OrderNotFound) {
        await notifyFn.call({ message: 'Order not found' });
        return { status: 'not_found' };
      }
      if (e instanceof PaymentFailed) {
        await refundFn.call({ orderId: input.orderId });
        return { status: 'payment_failed' };
      }
      return { status: 'unknown_error' };
    }
  },
);
