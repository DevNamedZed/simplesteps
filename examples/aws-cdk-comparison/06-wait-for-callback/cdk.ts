// Wait for Callback — AWS CDK
//
// Pause workflow and wait for an external system to call back.
// Uses SQS with WAIT_FOR_TASK_TOKEN integration pattern.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class WaitForCallbackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create resources
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

    // Define states
    const validateOrder = new tasks.LambdaInvoke(this, 'Validate Order', {
      lambdaFunction: validateOrderFn,
      outputPath: '$.Payload',
    });

    // SQS with waitForTaskToken — pauses until callback
    const sendForApproval = new tasks.SqsSendMessage(this, 'Send For Approval', {
      queue: approvalQueue,
      integrationPattern: sfn.IntegrationPattern.WAIT_FOR_TASK_TOKEN,
      messageBody: sfn.TaskInput.fromObject({
        'taskToken': sfn.JsonPath.taskToken,
        'orderId.$': '$.orderId',
        'amount.$': '$.amount',
      }),
      resultPath: '$.approval',
    });

    const orderRejected = new sfn.Fail(this, 'Order Rejected', {
      error: 'OrderRejected',
      cause: 'Order was rejected by approver',
    });

    const checkApproval = new sfn.Choice(this, 'Approved?')
      .when(
        sfn.Condition.booleanEquals('$.approval.approved', false),
        orderRejected,
      )
      .otherwise(
        new tasks.LambdaInvoke(this, 'Fulfill Order (Approved)', {
          lambdaFunction: fulfillOrderFn,
          payload: sfn.TaskInput.fromObject({
            'orderId.$': '$.orderId',
            'approvedBy.$': '$.approval.approvedBy',
          }),
          resultPath: '$.fulfillment',
        }),
      );

    const fulfillAutoApproved = new tasks.LambdaInvoke(this, 'Fulfill Order (Auto)', {
      lambdaFunction: fulfillOrderFn,
      payload: sfn.TaskInput.fromObject({
        'orderId.$': '$.orderId',
        'approvedBy': 'auto',
      }),
      resultPath: '$.fulfillment',
    });

    const checkRequiresApproval = new sfn.Choice(this, 'Requires Approval?')
      .when(
        sfn.Condition.booleanEquals('$.requiresApproval', true),
        sendForApproval.next(checkApproval),
      )
      .otherwise(fulfillAutoApproved);

    const orderComplete = new sfn.Succeed(this, 'Order Fulfilled');

    const definition = validateOrder
      .next(checkRequiresApproval);

    // Create the state machine
    const stateMachine = new sfn.StateMachine(this, 'CallbackStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
    });

    // Grant permissions
    validateOrderFn.grantInvoke(stateMachine);
    fulfillOrderFn.grantInvoke(stateMachine);
    approvalQueue.grantSendMessages(stateMachine);
  }
}
