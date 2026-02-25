import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const serviceA = Lambda<{ id: string }, { name: string }>('arn:aws:lambda:us-east-1:123:function:A');

export const retryTimeout = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const a = await serviceA.call({ id: input.id }, {
      retry: {
        maxAttempts: 3,
        intervalSeconds: 2,
        backoffRate: 2,
      },
      timeoutSeconds: 30,
      heartbeatSeconds: 10,
    });
    return { result: a.name };
  },
);
