// Hello World — SimpleSteps
//
// The simplest Step Functions example: invoke a Lambda and return the result.
// When installed via npm, use: import { Steps } from '@simplesteps/core/runtime'

import { Steps, SimpleStepContext } from '../../../packages/core/src/runtime/index';
import { Lambda } from '../../../packages/core/src/runtime/services/Lambda';

const helloFn = Lambda<{ name: string }, { greeting: string }>(
  'arn:aws:lambda:us-east-1:123456789:function:Hello',
);

export const helloWorld = Steps.createFunction(
  async (context: SimpleStepContext, input: { name: string }) => {
    const result = await helloFn.call({ name: input.name });
    return { greeting: result.greeting };
  },
);
