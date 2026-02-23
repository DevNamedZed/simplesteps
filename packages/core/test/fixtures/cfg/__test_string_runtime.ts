// Test fixture: String() on a runtime (state output) value
//
// Verifies: Does String(runtimeValue) produce an error?
// There is no ASL intrinsic for String conversion (no States.StringConvert).
// Expected: SS502 error or the expression returns unknown.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const getTotal = Lambda<{ orderId: string }, { total: number }>(
  'arn:aws:lambda:us-east-1:123:function:GetTotal',
);

export const stringRuntimeTest = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const order = await getTotal.call({ orderId: input.orderId });

    // String() on a runtime value — no ASL equivalent
    const totalStr = String(order.total);

    return { total: totalStr };
  },
);
