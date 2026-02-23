// Wait for Callback — CDK + SimpleSteps
//
// Pause workflow and wait for an external system to call back.
// Same infrastructure as pure CDK — only the step function definition changes.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, SQS } from '@simplesteps/core/runtime/services';

export class WaitForCallbackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const validateOrderFn = new lambda.Function(this, 'ValidateOrderFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/validate-order'),
    });

    const fulfillOrderFn = new lambda.Function(this, 'FulfillOrderFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/fulfill-order'),
    });

    const approvalQueue = new sqs.Queue(this, 'ApprovalQueue');

    const validateOrder = Lambda<
      { orderId: string },
      { orderId: string; amount: number; requiresApproval: boolean }
    >(validateOrderFn.functionArn);

    const approval = new SQS(approvalQueue.queueUrl);

    const fulfillOrder = Lambda<
      { orderId: string; approvedBy: string },
      { fulfilled: boolean }
    >(fulfillOrderFn.functionArn);

    const machine = new SimpleStepsStateMachine(this, 'CallbackStateMachine', {
      workflow: Steps.createFunction(
        async (context: SimpleStepContext, input: { orderId: string }) => {
          const order = await validateOrder.call({ orderId: input.orderId });

          if (order.requiresApproval) {
            const result = await approval.publishWithCallback<{
              approved: boolean;
              approvedBy: string;
            }>({
              orderId: order.orderId,
              amount: order.amount,
            });

            if (!result.approved) {
              throw new Error('Order rejected');
            }

            await fulfillOrder.call({
              orderId: order.orderId,
              approvedBy: result.approvedBy,
            });
          } else {
            await fulfillOrder.call({
              orderId: order.orderId,
              approvedBy: 'auto',
            });
          }

          return { orderId: input.orderId, status: 'FULFILLED' };
        },
      ),
    });

    validateOrderFn.grantInvoke(machine);
    fulfillOrderFn.grantInvoke(machine);
    approvalQueue.grantSendMessages(machine);
  }
}
