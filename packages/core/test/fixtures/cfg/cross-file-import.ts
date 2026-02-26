import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { validateFn, ordersDb, notifications } from './imported-services';

export const crossFileWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; amount: number }) => {
    const validation = await validateFn.call({ orderId: input.orderId });
    if (!validation.valid) {
      return { error: 'Invalid order' };
    }
    await ordersDb.putItem({ orderId: input.orderId, amount: input.amount });
    await notifications.publish({ orderId: input.orderId, status: 'confirmed' });
    return { success: true, orderId: input.orderId };
  },
);
