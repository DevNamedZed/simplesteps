// Parallel Processing — SimpleSteps
//
// Run three independent lookups in parallel and combine results.

import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';

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
