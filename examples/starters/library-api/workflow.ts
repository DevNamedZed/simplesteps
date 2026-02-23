import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';

const greet = Lambda<{ name: string }, { message: string }>(
  'arn:aws:lambda:us-east-1:123456789:function:Greet',
);

export const hello = Steps.createFunction(
  async (context: SimpleStepContext, input: { name: string }) => {
    const result = await greet.call({ name: input.name });
    return { message: result.message };
  },
);
