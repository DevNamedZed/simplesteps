// Reusable Functions Across Multiple Step Functions
//
// Service bindings are shared variables — define them once at module
// scope and use them in multiple step functions. The compiler resolves
// each step function independently, generating a separate state
// machine per Steps.createFunction() call.
//
// This file produces TWO state machines:
//   1. createOrder — validates, persists, notifies
//   2. cancelOrder — looks up, deletes, notifies
// Both share the same Lambda, DynamoDB, and SNS bindings.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';
import { DynamoDB } from '../../packages/core/src/runtime/services/DynamoDB';
import { SNS } from '../../packages/core/src/runtime/services/SNS';

// -- Shared service bindings (reused across both step functions) --

const validateFn = Lambda<{ orderId: string; amount: number }, { valid: boolean }>(
  'arn:aws:lambda:us-east-1:123:function:ValidateOrder',
);
const lookupFn = Lambda<{ orderId: string }, { exists: boolean; status: string }>(
  'arn:aws:lambda:us-east-1:123:function:LookupOrder',
);
const ordersDb = new DynamoDB('OrdersTable');
const notifications = new SNS('arn:aws:sns:us-east-1:123:OrderEvents');

// -- Step function 1: Create Order --

export const createOrder = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; amount: number }) => {
    const check = await validateFn.call({ orderId: input.orderId, amount: input.amount });
    if (!check.valid) {
      return { success: false, error: 'Validation failed' };
    }
    await ordersDb.putItem({
      Item: { orderId: { S: input.orderId }, amount: { N: String(input.amount) }, status: { S: 'created' } },
    });
    await notifications.publish({ orderId: input.orderId, event: 'created' });
    return { success: true, orderId: input.orderId };
  },
);

// -- Step function 2: Cancel Order --

export const cancelOrder = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const order = await lookupFn.call({ orderId: input.orderId });
    if (!order.exists) {
      return { success: false, error: 'Order not found' };
    }
    await ordersDb.deleteItem({ Key: { orderId: { S: input.orderId } } });
    await notifications.publish({ orderId: input.orderId, event: 'cancelled' });
    return { success: true, orderId: input.orderId };
  },
);
