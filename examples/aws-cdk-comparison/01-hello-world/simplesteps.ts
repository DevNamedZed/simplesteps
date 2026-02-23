// Hello World — CDK + SimpleSteps
//
// The simplest Step Functions example: invoke a Lambda and return the result.
// Same infrastructure as pure CDK — only the step function definition changes.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';

export class HelloWorldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloFunction = new lambda.Function(this, 'HelloFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/hello'),
    });

    const helloFn = Lambda<{ name: string }, { greeting: string }>(
      helloFunction.functionArn,
    );

    const machine = new SimpleStepsStateMachine(this, 'HelloWorldStateMachine', {
      workflow: Steps.createFunction(
        async (context: SimpleStepContext, input: { name: string }) => {
          const result = await helloFn.call({ name: input.name });
          return { greeting: result.greeting };
        },
      ),
    });

    helloFunction.grantInvoke(machine);
  }
}
