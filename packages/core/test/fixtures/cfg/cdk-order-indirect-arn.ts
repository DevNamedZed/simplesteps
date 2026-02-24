// Test fixture: Service bindings with ARN passed via identifier reference
//
// Mirrors the playground CDK examples where the ARN is stored in a
// separate const and referenced by name, not passed as a string literal:
//   const myArn = 'arn:...';
//   const fn = Lambda(myArn);   // ← identifier, not string literal

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';
import { DynamoDB } from '../../../src/runtime/services/DynamoDB';

const validateOrderArn = 'arn:aws:lambda:us-east-1:123456789:function:ValidateOrder';
const ordersTableName = 'OrdersTable';

const validateOrder = Lambda<{ orderId: string }, { valid: boolean; total: number }>(
  validateOrderArn,
);
const ordersTable = new DynamoDB(ordersTableName);

export const orderWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; customerId: string }) => {
    const order = await validateOrder.call({ orderId: input.orderId });

    if (!order.valid) {
      return { status: 'INVALID', orderId: input.orderId };
    }

    await ordersTable.putItem({
      orderId: input.orderId,
      customerId: input.customerId,
      total: order.total,
      status: 'CONFIRMED',
    });

    return { status: 'CONFIRMED', orderId: input.orderId, total: order.total };
  },
);
