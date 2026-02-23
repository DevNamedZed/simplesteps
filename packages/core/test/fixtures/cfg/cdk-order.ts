// Test fixture: CDK order workflow (Lambda + DynamoDB with substitutions)
//
// Uses placeholder values that are overridden at deploy time via the
// substitutions option. This mirrors how the CDK construct injects
// real resource ARNs.
//
// Note: This fixture intentionally diverges from lib/stack.ts:
// - Uses `return { status: 'INVALID' }` instead of `throw new Error(...)`,
//   producing a Pass state instead of Fail. Both are valid SimpleSteps patterns.
// - Uses document-format DynamoDB items (no `{S:...}` wrappers).

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';
import { DynamoDB } from '../../../src/runtime/services/DynamoDB';

const validateOrder = Lambda<{ orderId: string }, { valid: boolean; total: number }>(
  'placeholder-validate-arn',
);
const ordersTable = new DynamoDB('placeholder-orders-table');

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
