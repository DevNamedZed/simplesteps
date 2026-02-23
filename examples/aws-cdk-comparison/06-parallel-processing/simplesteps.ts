// Parallel Processing — SimpleSteps
//
// Run three independent lookups in parallel and combine results.
// When installed via npm, use: import { Steps } from '@simplesteps/core/runtime'

import { Steps, SimpleStepContext } from '../../../packages/core/src/runtime/index';
import { Lambda } from '../../../packages/core/src/runtime/services/Lambda';

const getUserProfile = Lambda<
  { userId: string },
  { name: string; email: string; tier: string }
>('arn:aws:lambda:us-east-1:123456789:function:GetUserProfile');

const getOrderHistory = Lambda<
  { userId: string },
  { orders: string[]; totalSpent: number }
>('arn:aws:lambda:us-east-1:123456789:function:GetOrderHistory');

const getRecommendations = Lambda<
  { userId: string },
  { items: string[] }
>('arn:aws:lambda:us-east-1:123456789:function:GetRecommendations');

export const parallelProcessing = Steps.createFunction(
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
);
