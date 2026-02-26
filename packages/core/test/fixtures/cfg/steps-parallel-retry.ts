// Test fixture: Steps.parallel() with retry configuration

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const svc1 = Lambda<{ id: string }, { a: string }>('arn:aws:lambda:us-east-1:123:function:Svc1');
const svc2 = Lambda<{ id: string }, { b: string }>('arn:aws:lambda:us-east-1:123:function:Svc2');

export const stepsParallelRetry = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const [r1, r2] = await Steps.parallel(
      [
        async () => await svc1.call({ id: input.id }),
        async () => await svc2.call({ id: input.id }),
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

    return { a: r1.a, b: r2.b };
  },
);
