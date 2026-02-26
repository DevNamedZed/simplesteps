import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

enum OrderStatus {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Shipped = 'SHIPPED',
}

const checkFn = Lambda<{ orderId: string }, { status: string }>('arn:aws:lambda:us-east-1:123:function:CheckStatus');
const shipFn = Lambda<{ orderId: string }, { trackingId: string }>('arn:aws:lambda:us-east-1:123:function:ShipOrder');

export const enumWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const check = await checkFn.call({ orderId: input.orderId });
    if (check.status === OrderStatus.Active) {
      const shipped = await shipFn.call({ orderId: input.orderId });
      return { status: OrderStatus.Shipped, trackingId: shipped.trackingId };
    }
    return { status: check.status };
  },
);
