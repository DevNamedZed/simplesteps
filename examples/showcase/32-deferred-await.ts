// Deferred Await — Natural Parallelism
//
// Start multiple service calls without awaiting, then collect results later.
// The compiler detects this pattern and batches the awaits into a single
// Parallel state — just like Promise.all, but written naturally.
//
// Three equivalent patterns, all compile to the same Parallel state:
//
// Pattern 1 (shown below): fire-then-await
//   const p1 = call1(); const p2 = call2(); await p1; await p2;
//
// Pattern 2: Promise.all with deferred refs
//   const p1 = call1(); const p2 = call2();
//   const [a, b] = await Promise.all([p1, p2]);
//
// Pattern 3: inline Promise.all (classic)
//   const [a, b] = await Promise.all([call1(), call2()]);
//
// ASL output:
//   Parallel (Parallel, 2 branches, ResultPath: $.__parallel)
//     Branch 0: Invoke_getOrder (Task, End)
//     Branch 1: Invoke_getPayment (Task, End)
//   → Assign_order (Pass, InputPath: $.__parallel[0], ResultPath: $.order)
//   → Assign_payment (Pass, InputPath: $.__parallel[1], ResultPath: $.payment)
//   → Return_Result (Pass, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const getOrder = Lambda<{ orderId: string }, { status: string; total: number }>(
  'arn:aws:lambda:us-east-1:123:function:GetOrder',
);
const getPayment = Lambda<{ orderId: string }, { paid: boolean; method: string }>(
  'arn:aws:lambda:us-east-1:123:function:GetPayment',
);

export const deferredAwait = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    // Start both calls — not awaited yet (compiled away, no state emitted)
    const orderPromise = getOrder.call({ orderId: input.orderId });
    const paymentPromise = getPayment.call({ orderId: input.orderId });

    // Await both — compiler batches into a single Parallel state
    const order = await orderPromise;
    const payment = await paymentPromise;

    return { order, payment };
  },
);
