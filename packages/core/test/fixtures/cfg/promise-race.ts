// Test fixture: Promise.race / Promise.any — expected to produce SS421 error

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const fastFn = Lambda<{ input: string }, { result: string }>('arn:aws:lambda:us-east-1:123456789012:function:Fast');
const slowFn = Lambda<{ input: string }, { result: string }>('arn:aws:lambda:us-east-1:123456789012:function:Slow');

export const promiseRaceTest = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    const result = await Promise.race([
      fastFn.call({ input: input.data }),
      slowFn.call({ input: input.data }),
    ]);
    return { result: result.result };
  },
);
