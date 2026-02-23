// Wait for Callback — SimpleSteps
//
// Pause workflow until external system calls back with a result.
// Uses SQS publishWithCallback() for the waitForTaskToken pattern.
// When installed via npm, use: import { Steps } from '@simplesteps/core/runtime'

import { Steps, SimpleStepContext } from '../../../packages/core/src/runtime/index';
import { Lambda } from '../../../packages/core/src/runtime/services/Lambda';
import { SQS } from '../../../packages/core/src/runtime/services/SimpleQueueService';

const validateOrder = Lambda<
  { orderId: string },
  { orderId: string; amount: number; requiresApproval: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:ValidateOrder');

const approvalQueue = new SQS('https://sqs.us-east-1.amazonaws.com/123456789/ApprovalQueue');

const fulfillOrder = Lambda<
  { orderId: string; approvedBy: string },
  { fulfilled: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:FulfillOrder');

export const waitForCallback = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const order = await validateOrder.call({ orderId: input.orderId });

    if (order.requiresApproval) {
      const approval = await approvalQueue.publishWithCallback<{
        approved: boolean;
        approvedBy: string;
      }>({
        orderId: order.orderId,
        amount: order.amount,
      });

      if (!approval.approved) {
        throw new Error('Order rejected');
      }

      await fulfillOrder.call({
        orderId: order.orderId,
        approvedBy: approval.approvedBy,
      });
    } else {
      await fulfillOrder.call({
        orderId: order.orderId,
        approvedBy: 'auto',
      });
    }

    return { orderId: input.orderId, status: 'FULFILLED' };
  },
);
