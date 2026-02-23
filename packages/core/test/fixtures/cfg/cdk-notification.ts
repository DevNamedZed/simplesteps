// Test fixture: CDK notification pipeline (Lambda + DynamoDB + SNS + SQS)
//
// Multi-service workflow with placeholder values for CDK substitution.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';
import { DynamoDB } from '../../../src/runtime/services/DynamoDB';
import { SNS } from '../../../src/runtime/services/SNS';
import { SQS } from '../../../src/runtime/services/SimpleQueueService';

const validateOrder = Lambda<
  { orderId: string; amount: number },
  { valid: boolean }
>('placeholder-validate-arn');

const ordersTable = new DynamoDB('placeholder-orders-table');
const notifications = new SNS('placeholder-topic-arn');
const taskQueue = new SQS('placeholder-queue-url');

export const notificationPipeline = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; amount: number; email: string }) => {
    const check = await validateOrder.call({
      orderId: input.orderId,
      amount: input.amount,
    });

    if (!check.valid) {
      await notifications.publish({
        event: 'ORDER_REJECTED',
        orderId: input.orderId,
        email: input.email,
      });
      return { status: 'REJECTED' };
    }

    await ordersTable.putItem({
      orderId: input.orderId,
      amount: input.amount,
      status: 'CONFIRMED',
    });

    await notifications.publish({
      event: 'ORDER_CONFIRMED',
      orderId: input.orderId,
      email: input.email,
    });

    await taskQueue.publish({
      action: 'FULFILL',
      orderId: input.orderId,
    });

    return { status: 'CONFIRMED', orderId: input.orderId };
  },
);
