// Multi-Catch with Retry — AWS CDK
//
// Typed error handling with retry policies and different recovery strategies.
// Requires multiple addRetry() and addCatch() calls with manual error
// string matching and explicit result path wiring.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class MultiCatchRetryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create resources
    const callExternalApiFn = new lambda.Function(this, 'CallExternalApiFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/call-external-api'),
    });

    const fallbackServiceFn = new lambda.Function(this, 'FallbackServiceFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/fallback-service'),
    });

    const alertsTopic = new sns.Topic(this, 'OperationalAlerts');

    // Define task states
    const callApi = new tasks.LambdaInvoke(this, 'Call External API', {
      lambdaFunction: callExternalApiFn,
      payload: sfn.TaskInput.fromObject({
        'endpoint.$': '$.endpoint',
        'payload.$': '$.payload',
      }),
      outputPath: '$.Payload',
    });

    // Add retry policy for transient errors
    callApi.addRetry({
      errors: ['States.TaskFailed', 'States.Timeout'],
      interval: cdk.Duration.seconds(2),
      maxAttempts: 3,
      backoffRate: 2,
    });

    // Timeout handler — try fallback service
    const handleTimeout = new tasks.LambdaInvoke(this, 'Call Fallback Service', {
      lambdaFunction: fallbackServiceFn,
      payload: sfn.TaskInput.fromObject({
        'endpoint.$': '$.endpoint',
      }),
      outputPath: '$.Payload',
    });

    const timeoutResult = new sfn.Pass(this, 'Timeout Result', {
      result: sfn.Result.fromObject({ status: 'FALLBACK' }),
      resultPath: '$.statusInfo',
    });

    // Permissions handler — alert ops team
    const handlePermissions = new tasks.SnsPublish(this, 'Alert Permissions Error', {
      topic: alertsTopic,
      subject: 'Permission Denied',
      message: sfn.TaskInput.fromObject({
        'error': 'PERMISSIONS',
        'endpoint.$': '$.endpoint',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    const permissionsResult = new sfn.Pass(this, 'Permissions Result', {
      result: sfn.Result.fromObject({ status: 'PERMISSION_DENIED', body: '' }),
    });

    // Generic error handler
    const handleGenericError = new tasks.SnsPublish(this, 'Alert Generic Error', {
      topic: alertsTopic,
      subject: 'Workflow Error',
      message: sfn.TaskInput.fromObject({
        'error': 'UNKNOWN',
        'endpoint.$': '$.endpoint',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    const genericErrorResult = new sfn.Pass(this, 'Error Result', {
      result: sfn.Result.fromObject({ status: 'ERROR', body: '' }),
    });

    // Add catch handlers for each error type
    callApi.addCatch(
      handleTimeout.next(timeoutResult),
      { errors: ['States.Timeout'], resultPath: '$.error' },
    );

    callApi.addCatch(
      handlePermissions.next(permissionsResult),
      { errors: ['States.Permissions'], resultPath: '$.error' },
    );

    callApi.addCatch(
      handleGenericError.next(genericErrorResult),
      { resultPath: '$.error' },
    );

    // Success result
    const successResult = new sfn.Pass(this, 'Success Result', {
      parameters: {
        'status': 'SUCCESS',
        'body.$': '$.body',
      },
    });

    const definition = callApi.next(successResult);

    // Create the state machine
    const stateMachine = new sfn.StateMachine(this, 'MultiCatchRetryStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
    });

    // Grant permissions
    callExternalApiFn.grantInvoke(stateMachine);
    fallbackServiceFn.grantInvoke(stateMachine);
    alertsTopic.grantPublish(stateMachine);
  }
}
