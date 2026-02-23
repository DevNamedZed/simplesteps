// Secrets & Config — AWS CDK
//
// Retrieve secrets from Secrets Manager and config from SSM Parameter Store.
// CDK has no task constructs for either service — every call requires
// CustomState with raw ASL JSON using the aws-sdk integration.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class SecretsAndConfigStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda function
    const callExternalApiFn = new lambda.Function(this, 'CallExternalApiFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/call-external-api'),
    });

    // Secrets Manager — requires CustomState (no CDK construct)
    const getSecret = new sfn.CustomState(this, 'Get API Key', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::aws-sdk:secretsmanager:getSecretValue',
        Parameters: {
          SecretId: 'prod/external-api-key',
        },
        ResultPath: '$.secret',
      },
    });

    // SSM Parameter Store — requires CustomState (no CDK construct)
    const getConfig = new sfn.CustomState(this, 'Get Feature Flags', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::aws-sdk:ssm:getParameter',
        Parameters: {
          Name: '/myapp/config/feature-flags',
          WithDecryption: true,
        },
        ResultPath: '$.config',
      },
    });

    // Lambda invocation — CDK does have a construct for this
    const callApi = new tasks.LambdaInvoke(this, 'Call External API', {
      lambdaFunction: callExternalApiFn,
      payload: sfn.TaskInput.fromObject({
        'apiKey.$': '$.secret.SecretString',
        'endpoint.$': '$.endpoint',
      }),
      outputPath: '$.Payload',
    });

    // Wire up
    const definition = getSecret
      .next(getConfig)
      .next(callApi)
      .next(new sfn.Succeed(this, 'Done'));

    // Create the state machine
    const stateMachine = new sfn.StateMachine(this, 'SecretsConfigStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
    });

    // Grant permissions
    callExternalApiFn.grantInvoke(stateMachine);

    // Manual IAM policies for CustomState operations
    stateMachine.addToRolePolicy(new iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: ['*'],
    }));

    stateMachine.addToRolePolicy(new iam.PolicyStatement({
      actions: ['ssm:GetParameter'],
      resources: ['*'],
    }));
  }
}
