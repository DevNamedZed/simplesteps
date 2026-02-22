import { Steps, SimpleStepContext } from '../../../src/runtime/index';

export const jsOperators = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; csv: string; price: number; tax: number; metadata: string }) => {
    const parts = input.csv.split(',');
    const total = input.price + input.tax;
    const message = `Order ${input.orderId} confirmed, total: ${total}`;
    const meta = JSON.parse(input.metadata);
    return { parts, total, message, meta };
  },
);
