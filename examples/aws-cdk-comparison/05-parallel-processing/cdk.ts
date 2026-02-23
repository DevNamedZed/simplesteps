// Parallel Processing — AWS CDK
//
// Run three independent Lambda lookups in parallel and combine results.
// Requires sfn.Parallel with individual branch chains and payload mapping.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class ParallelProcessingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda functions
    const getUserProfileFn = new lambda.Function(this, 'GetUserProfileFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/get-user-profile'),
    });

    const getOrderHistoryFn = new lambda.Function(this, 'GetOrderHistoryFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/get-order-history'),
    });

    const getRecommendationsFn = new lambda.Function(this, 'GetRecommendationsFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/get-recommendations'),
    });

    // Define parallel branches
    const parallel = new sfn.Parallel(this, 'Enrich User Data');

    parallel.branch(
      new tasks.LambdaInvoke(this, 'Get User Profile', {
        lambdaFunction: getUserProfileFn,
        payload: sfn.TaskInput.fromObject({
          'userId.$': '$.userId',
        }),
        outputPath: '$.Payload',
      }),
    );

    parallel.branch(
      new tasks.LambdaInvoke(this, 'Get Order History', {
        lambdaFunction: getOrderHistoryFn,
        payload: sfn.TaskInput.fromObject({
          'userId.$': '$.userId',
        }),
        outputPath: '$.Payload',
      }),
    );

    parallel.branch(
      new tasks.LambdaInvoke(this, 'Get Recommendations', {
        lambdaFunction: getRecommendationsFn,
        payload: sfn.TaskInput.fromObject({
          'userId.$': '$.userId',
        }),
        outputPath: '$.Payload',
      }),
    );

    // Merge parallel results into a single object
    const mergeResults = new sfn.Pass(this, 'Merge Results', {
      parameters: {
        'user.$': '$[0].name',
        'email.$': '$[0].email',
        'tier.$': '$[0].tier',
        'orderCount.$': '$[1].totalSpent',
        'recommendedItems.$': '$[2].items',
      },
    });

    const definition = parallel.next(mergeResults);

    // Create the state machine
    const stateMachine = new sfn.StateMachine(this, 'ParallelStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
    });

    // Grant permissions
    getUserProfileFn.grantInvoke(stateMachine);
    getOrderHistoryFn.grantInvoke(stateMachine);
    getRecommendationsFn.grantInvoke(stateMachine);
  }
}
