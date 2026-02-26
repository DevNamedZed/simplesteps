// Steps.parallel() — Parallel Execution with Retry
//
// Steps.parallel() is like Promise.all() but adds retry rules
// on the Parallel state itself. Use it when you need the entire
// parallel group to retry if any branch fails.
//
// For simple parallel execution without retry, use Promise.all() instead.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const getUser = Lambda<{ id: string }, { name: string; email: string }>(
  'arn:aws:lambda:us-east-1:123:function:GetUser',
);
const getOrders = Lambda<{ userId: string }, { orders: { id: string }[] }>(
  'arn:aws:lambda:us-east-1:123:function:GetOrders',
);

export const stepsParallel = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string }) => {
    // Run both calls in parallel — retry the entire Parallel state
    // up to 3 times if any branch fails
    const [user, orderData] = await Steps.parallel(
      [
        async () => await getUser.call({ id: input.userId }),
        async () => await getOrders.call({ userId: input.userId }),
      ],
      {
        retry: {
          errorEquals: ['States.ALL'],
          maxAttempts: 3,
          intervalSeconds: 1,
          backoffRate: 2,
        },
      },
    );

    return { name: user.name, orderCount: orderData.orders.length };
  },
);
