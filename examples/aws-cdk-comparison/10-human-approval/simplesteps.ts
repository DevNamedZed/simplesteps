// Human Approval — CDK + SimpleSteps
//
// Pause workflow for human approval via SQS callback, then route
// based on the decision.
// Same infrastructure as pure CDK — only the step function definition changes.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, SQS, SNS } from '@simplesteps/core/runtime/services';

export class HumanApprovalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const processApprovedFn = new lambda.Function(this, 'ProcessApprovedFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/process-approved'),
    });

    const approvalQueue = new sqs.Queue(this, 'ApprovalQueue');
    const notifyTopic = new sns.Topic(this, 'ApprovalNotifications');

    const processApproved = Lambda<
      { requestId: string; amount: number },
      { processed: boolean }
    >(processApprovedFn.functionArn);

    const approval = new SQS(approvalQueue.queueUrl);
    const notify = new SNS(notifyTopic.topicArn);

    const machine = new SimpleStepsStateMachine(this, 'HumanApprovalStateMachine', {
      workflow: Steps.createFunction(
        async (context: SimpleStepContext, input: {
          requestId: string;
          amount: number;
          requester: string;
        }) => {
          const decision = await approval.publishWithCallback<{
            decision: string;
            approver: string;
          }>({
            requestId: input.requestId,
            amount: input.amount,
            requester: input.requester,
          });

          if (decision.decision === 'APPROVED') {
            const result = await processApproved.call({
              requestId: input.requestId,
              amount: input.amount,
            });

            await notify.publish(
              { requestId: input.requestId, status: 'APPROVED', approver: decision.approver },
              { subject: 'Request Approved' },
            );

            return { status: 'APPROVED', processed: result.processed };
          }

          await notify.publish(
            { requestId: input.requestId, status: 'REJECTED', approver: decision.approver },
            { subject: 'Request Rejected' },
          );

          return { status: 'REJECTED', processed: false };
        },
      ),
    });

    processApprovedFn.grantInvoke(machine);
    approvalQueue.grantSendMessages(machine);
    notifyTopic.grantPublish(machine);
  }
}
