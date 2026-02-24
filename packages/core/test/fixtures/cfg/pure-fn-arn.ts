// Test fixture: Lambda ARN via pure function call
//
// The ARN is produced by a pure function (makeArn) rather than a string
// literal or identifier. The WPA's ExpressionEvaluator inlines the function
// call to resolve the ARN at compile time.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

function makeArn(name: string) {
  return `arn:aws:lambda:us-east-1:123456789:function:${name}`;
}

const processFn = Lambda<{ orderId: string }, { status: string }>(makeArn('ProcessOrder'));
const validateFn = Lambda<{ orderId: string }, { valid: boolean }>(makeArn('ValidateOrder'));

export const pureFnArn = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const check = await validateFn.call({ orderId: input.orderId });
    if (!check.valid) {
      return { error: 'Invalid order' };
    }
    const result = await processFn.call({ orderId: input.orderId });
    return { status: result.status };
  },
);
