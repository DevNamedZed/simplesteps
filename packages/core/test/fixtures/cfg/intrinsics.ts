import { Steps, SimpleStepContext } from '../../../src/runtime/index';

export const intrinsics = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; price: number; tax: number; metadata: string }) => {
    const total = Steps.add(input.price, input.tax);
    const message = Steps.format('Order {} confirmed', input.orderId);
    const id = Steps.uuid();
    const meta = Steps.jsonParse(input.metadata);
    return { message: message, id: id, total: total, meta: meta };
  },
);
