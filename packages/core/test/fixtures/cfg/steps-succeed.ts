// Test fixture: Steps.succeed() emits a Succeed state

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const myLambda = Lambda<{ id: string }, { status: string }>(
  'arn:aws:lambda:us-east-1:123:function:MyFunc'
);

export const stepsSucceed = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const result = await myLambda.call({ id: input.id });

    if (result.status === 'done') {
      Steps.succeed();
    }

    return { status: result.status };
  },
);
