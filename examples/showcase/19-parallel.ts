// Parallel Execution with Promise.all
//
// Use Promise.all([...]) to run multiple service calls in parallel.
// The compiler maps this to an ASL Parallel state, where each
// array element becomes an independent branch.
//
// Array destructuring captures each branch's output:
//   const [a, b] = await Promise.all([callA(), callB()])
//   → Parallel state with ResultPath + Assign Pass states for each binding

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const getOrder = Lambda<{ orderId: string }, { status: string; total: number }>(
  'arn:aws:lambda:us-east-1:123:function:GetOrder',
);
const getPayment = Lambda<{ orderId: string }, { paid: boolean; method: string }>(
  'arn:aws:lambda:us-east-1:123:function:GetPayment',
);

export const parallel = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    // Run both lookups in parallel — compiles to Parallel state
    const [order, payment] = await Promise.all([
      getOrder.call({ orderId: input.orderId }),
      getPayment.call({ orderId: input.orderId }),
    ]);

    return { order: order, payment: payment };
  },
);
