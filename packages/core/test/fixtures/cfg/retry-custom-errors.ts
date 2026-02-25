import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const serviceA = Lambda<{ id: string }, { name: string }>('arn:aws:lambda:us-east-1:123:function:A');

export const retryCustomErrors = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const a = await serviceA.call({ id: input.id }, {
      retry: {
        errorEquals: ['States.Timeout', 'States.TaskFailed'],
        maxAttempts: 5,
        intervalSeconds: 1,
        backoffRate: 1.5,
        maxDelaySeconds: 60,
        jitterStrategy: 'FULL',
      },
    });
    return { result: a.name };
  },
);
