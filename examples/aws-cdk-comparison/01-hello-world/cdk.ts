// Hello World — AWS CDK
//
// The simplest Step Functions example: invoke a Lambda and succeed.
// Based on: https://docs.aws.amazon.com/step-functions/latest/dg/tutorial-lambda-state-machine-cdk.html

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class HelloWorldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda function
    const helloFunction = new lambda.Function(this, 'HelloFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/hello'),
    });

    // Define the state machine
    const invokeHello = new tasks.LambdaInvoke(this, 'Invoke Hello', {
      lambdaFunction: helloFunction,
      outputPath: '$.Payload',
    });

    const succeed = new sfn.Succeed(this, 'Done');

    const definition = invokeHello.next(succeed);

    // Create the state machine
    const stateMachine = new sfn.StateMachine(this, 'HelloWorldStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
    });

    // Grant permissions
    helloFunction.grantInvoke(stateMachine);
  }
}
