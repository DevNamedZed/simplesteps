// Parallel Processing — CDK + SimpleSteps
//
// Run three independent Lambda lookups in parallel and combine results.
// Same infrastructure as pure CDK — only the step function definition changes.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';

export class ParallelProcessingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

    const getUserProfile = Lambda<
      { userId: string },
      { name: string; email: string; tier: string }
    >(getUserProfileFn.functionArn);

    const getOrderHistory = Lambda<
      { userId: string },
      { orders: string[]; totalSpent: number }
    >(getOrderHistoryFn.functionArn);

    const getRecommendations = Lambda<
      { userId: string },
      { items: string[] }
    >(getRecommendationsFn.functionArn);

    const machine = new SimpleStepsStateMachine(this, 'ParallelStateMachine', {
      workflow: Steps.createFunction(
        async (context: SimpleStepContext, input: { userId: string }) => {
          const [profile, history, recommendations] = await Promise.all([
            getUserProfile.call({ userId: input.userId }),
            getOrderHistory.call({ userId: input.userId }),
            getRecommendations.call({ userId: input.userId }),
          ]);

          return {
            user: profile.name,
            email: profile.email,
            tier: profile.tier,
            orderCount: history.totalSpent,
            recommendedItems: recommendations.items,
          };
        },
      ),
    });

    getUserProfileFn.grantInvoke(machine);
    getOrderHistoryFn.grantInvoke(machine);
    getRecommendationsFn.grantInvoke(machine);
  }
}
