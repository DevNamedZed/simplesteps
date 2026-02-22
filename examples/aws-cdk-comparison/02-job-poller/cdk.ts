// Job Poller — AWS CDK
//
// The canonical CDK Step Functions example: submit a job, poll for status
// in a loop, handle success or failure.
// Based on: https://github.com/aws-samples/aws-cdk-examples/blob/main/typescript/stepfunctions-job-poller

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class JobPollerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda functions
    const submitJobFn = new lambda.Function(this, 'SubmitJobFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/submit-job'),
    });

    const getStatusFn = new lambda.Function(this, 'GetStatusFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/get-status'),
    });

    // Define state machine states
    const submitJob = new tasks.LambdaInvoke(this, 'Submit Job', {
      lambdaFunction: submitJobFn,
      outputPath: '$.Payload',
    });

    const waitThirtySeconds = new sfn.Wait(this, 'Wait 30 Seconds', {
      time: sfn.WaitTime.duration(cdk.Duration.seconds(30)),
    });

    const getJobStatus = new tasks.LambdaInvoke(this, 'Get Job Status', {
      lambdaFunction: getStatusFn,
      outputPath: '$.Payload',
    });

    const jobFailed = new sfn.Fail(this, 'Job Failed', {
      cause: 'AWS Job Failed',
      error: 'DescribeJob returned FAILED',
    });

    const jobSucceeded = new sfn.Succeed(this, 'Job Succeeded');

    // Wire up the state machine definition
    const checkStatus = new sfn.Choice(this, 'Job Complete?')
      .when(sfn.Condition.stringEquals('$.status', 'FAILED'), jobFailed)
      .when(sfn.Condition.stringEquals('$.status', 'SUCCEEDED'), jobSucceeded)
      .otherwise(waitThirtySeconds);

    const definition = submitJob
      .next(waitThirtySeconds)
      .next(getJobStatus)
      .next(checkStatus);

    // Create the state machine
    const stateMachine = new sfn.StateMachine(this, 'JobPollerStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
      timeout: cdk.Duration.minutes(30),
    });

    // Grant permissions
    submitJobFn.grantInvoke(stateMachine);
    getStatusFn.grantInvoke(stateMachine);
  }
}
