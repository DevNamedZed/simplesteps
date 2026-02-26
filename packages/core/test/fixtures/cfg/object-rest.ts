// Test fixture: Object rest patterns (JSONata only)

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const myLambda = Lambda<{ id: string }, { name: string; age: number; city: string; email: string }>(
  'arn:aws:lambda:us-east-1:123:function:MyFunc'
);

export const objectRest = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const { name, ...metadata } = await myLambda.call({ id: input.id });

    return { name, metadata };
  },
);
