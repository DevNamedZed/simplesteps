// Human Approval — SimpleSteps
//
// Pause workflow for human approval via SQS callback, then route
// based on the decision.
// When installed via npm, use: import { Steps } from '@simplesteps/core/runtime'

import { Steps, SimpleStepContext } from '../../../packages/core/src/runtime/index';
import { Lambda } from '../../../packages/core/src/runtime/services/Lambda';
import { SQS } from '../../../packages/core/src/runtime/services/SimpleQueueService';
import { SNS } from '../../../packages/core/src/runtime/services/SNS';

const processApproved = Lambda<
  { requestId: string; amount: number },
  { processed: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:ProcessApproved');

const approvalQueue = new SQS('https://sqs.us-east-1.amazonaws.com/123456789/ApprovalQueue');
const notifyTopic = new SNS('arn:aws:sns:us-east-1:123456789:ApprovalNotifications');

export const humanApproval = Steps.createFunction(
  async (context: SimpleStepContext, input: {
    requestId: string;
    amount: number;
    requester: string;
  }) => {
    const approval = await approvalQueue.publishWithCallback<{
      decision: string;
      approver: string;
    }>({
      requestId: input.requestId,
      amount: input.amount,
      requester: input.requester,
    });

    if (approval.decision === 'APPROVED') {
      const result = await processApproved.call({
        requestId: input.requestId,
        amount: input.amount,
      });

      await notifyTopic.publish(
        { requestId: input.requestId, status: 'APPROVED', approver: approval.approver },
        { subject: 'Request Approved' },
      );

      return { status: 'APPROVED', processed: result.processed };
    }

    await notifyTopic.publish(
      { requestId: input.requestId, status: 'REJECTED', approver: approval.approver },
      { subject: 'Request Rejected' },
    );

    return { status: 'REJECTED', processed: false };
  },
);
