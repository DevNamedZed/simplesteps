// Secrets & Config — CDK + SimpleSteps
//
// Retrieve secrets from Secrets Manager and config from SSM Parameter Store.
// Same infrastructure as pure CDK — only the step function definition changes.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, SecretsManager, SSM } from '@simplesteps/core/runtime/services';

export class SecretsAndConfigStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const callExternalApiFn = new lambda.Function(this, 'CallExternalApiFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/call-external-api'),
    });

    const callExternalApi = Lambda<
      { apiKey: string; endpoint: string },
      { statusCode: number; body: string }
    >(callExternalApiFn.functionArn);

    const secrets = new SecretsManager();
    const config = new SSM();

    const machine = new SimpleStepsStateMachine(this, 'SecretsConfigStateMachine', {
      workflow: Steps.createFunction(
        async (context: SimpleStepContext, input: { endpoint: string }) => {
          const secret = await secrets.getSecretValue<{ SecretString: string }>({
            SecretId: 'prod/external-api-key',
          });

          const flags = await config.getParameter<{ Parameter: { Value: string } }>({
            Name: '/myapp/config/feature-flags',
            WithDecryption: true,
          });

          const response = await callExternalApi.call({
            apiKey: secret.SecretString,
            endpoint: input.endpoint,
          });

          return {
            statusCode: response.statusCode,
            body: response.body,
            featureFlags: flags.Parameter.Value,
          };
        },
      ),
    });

    callExternalApiFn.grantInvoke(machine);

    machine.addToRolePolicy(new iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: ['*'],
    }));

    machine.addToRolePolicy(new iam.PolicyStatement({
      actions: ['ssm:GetParameter'],
      resources: ['*'],
    }));
  }
}
