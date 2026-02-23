// Multi-Catch with Retry — CDK + SimpleSteps
//
// Typed error handling with retry policies and different recovery strategies.
// Same infrastructure as pure CDK — only the step function definition changes.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import {
  Steps,
  SimpleStepContext,
  TimeoutError,
  PermissionsError,
} from '@simplesteps/core/runtime';
import { Lambda, SNS } from '@simplesteps/core/runtime/services';

export class MultiCatchRetryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

    const callExternalApi = Lambda<
      { endpoint: string; payload: string },
      { statusCode: number; body: string }
    >(callExternalApiFn.functionArn);

    const fallbackService = Lambda<
      { endpoint: string },
      { body: string }
    >(fallbackServiceFn.functionArn);

    const alerts = new SNS(alertsTopic.topicArn);

    const machine = new SimpleStepsStateMachine(this, 'MultiCatchRetryStateMachine', {
      workflow: Steps.createFunction(
        async (context: SimpleStepContext, input: { endpoint: string; payload: string }) => {
          try {
            const response = await callExternalApi.call(
              { endpoint: input.endpoint, payload: input.payload },
              {
                retry: {
                  errorEquals: ['States.TaskFailed', 'States.Timeout'],
                  intervalSeconds: 2,
                  maxAttempts: 3,
                  backoffRate: 2,
                },
              },
            );

            return { status: 'SUCCESS', body: response.body };
          } catch (e) {
            if (e instanceof TimeoutError) {
              const fallback = await fallbackService.call({ endpoint: input.endpoint });
              return { status: 'FALLBACK', body: fallback.body };
            } else if (e instanceof PermissionsError) {
              await alerts.publish(
                { error: 'PERMISSIONS', endpoint: input.endpoint },
                { subject: 'Permission Denied' },
              );
              return { status: 'PERMISSION_DENIED', body: '' };
            } else {
              await alerts.publish(
                { error: 'UNKNOWN', endpoint: input.endpoint },
                { subject: 'Workflow Error' },
              );
              return { status: 'ERROR', body: '' };
            }
          }
        },
      ),
    });

    callExternalApiFn.grantInvoke(machine);
    fallbackServiceFn.grantInvoke(machine);
    alertsTopic.grantPublish(machine);
  }
}
