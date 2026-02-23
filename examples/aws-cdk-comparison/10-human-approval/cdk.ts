// Human Approval — AWS CDK
//
// Pause workflow for human approval via SQS with waitForTaskToken,
// then route based on the decision. Requires manual Choice wiring,
// SNS publish constructs, and explicit task token handling.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class HumanApprovalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create resources
    const processApprovedFn = new lambda.Function(this, 'ProcessApprovedFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/process-approved'),
    });

    const approvalQueue = new sqs.Queue(this, 'ApprovalQueue');
    const notifyTopic = new sns.Topic(this, 'ApprovalNotifications');

    // Send approval request with task token — pauses execution
    const sendApprovalRequest = new tasks.SqsSendMessage(this, 'Send Approval Request', {
      queue: approvalQueue,
      integrationPattern: sfn.IntegrationPattern.WAIT_FOR_TASK_TOKEN,
      messageBody: sfn.TaskInput.fromObject({
        'taskToken': sfn.JsonPath.taskToken,
        'requestId.$': '$.requestId',
        'amount.$': '$.amount',
        'requester.$': '$.requester',
      }),
      resultPath: '$.approval',
    });

    // Process approved request
    const processApproved = new tasks.LambdaInvoke(this, 'Process Approved Request', {
      lambdaFunction: processApprovedFn,
      payload: sfn.TaskInput.fromObject({
        'requestId.$': '$.requestId',
        'amount.$': '$.amount',
      }),
      resultPath: '$.result',
    });

    // Notify approval
    const notifyApproved = new tasks.SnsPublish(this, 'Notify Approved', {
      topic: notifyTopic,
      subject: 'Request Approved',
      message: sfn.TaskInput.fromObject({
        'requestId.$': '$.requestId',
        'status': 'APPROVED',
        'approver.$': '$.approval.approver',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    // Notify rejection
    const notifyRejected = new tasks.SnsPublish(this, 'Notify Rejected', {
      topic: notifyTopic,
      subject: 'Request Rejected',
      message: sfn.TaskInput.fromObject({
        'requestId.$': '$.requestId',
        'status': 'REJECTED',
        'approver.$': '$.approval.approver',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    const approvedResult = new sfn.Pass(this, 'Approved Result', {
      result: sfn.Result.fromObject({ status: 'APPROVED', processed: true }),
    });

    const rejectedResult = new sfn.Pass(this, 'Rejected Result', {
      result: sfn.Result.fromObject({ status: 'REJECTED', processed: false }),
    });

    // Decision routing
    const checkDecision = new sfn.Choice(this, 'Decision?')
      .when(
        sfn.Condition.stringEquals('$.approval.decision', 'APPROVED'),
        processApproved
          .next(notifyApproved)
          .next(approvedResult),
      )
      .otherwise(
        notifyRejected
          .next(rejectedResult),
      );

    // Wire up
    const definition = sendApprovalRequest.next(checkDecision);

    // Create the state machine
    const stateMachine = new sfn.StateMachine(this, 'HumanApprovalStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
    });

    // Grant permissions
    processApprovedFn.grantInvoke(stateMachine);
    approvalQueue.grantSendMessages(stateMachine);
    notifyTopic.grantPublish(stateMachine);
  }
}
