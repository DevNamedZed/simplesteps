// Test fixture: Lambda callWithCallback (.waitForTaskToken pattern)

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const callbackFn = Lambda<{ taskToken: string; data: string }, { result: string }>(
  'arn:aws:lambda:us-east-1:123456789012:function:CallbackHandler'
);

export const callbackTest = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    const result = await callbackFn.callWithCallback({ taskToken: 'token', data: input.data });
    return { result: result.result };
  },
);
