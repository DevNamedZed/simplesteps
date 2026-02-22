// While Loop (Polling)
//
// Poll a service until it reports "done". The `let status = await ...`
// followed by `status = await ...` inside the loop uses the
// reassignment pattern — the compiler reuses the same ResultPath
// on each iteration, and a Choice state loops back to the body.
//
// ASL output:
//   Invoke_pollFn (Task, ResultPath: $.status)
//   → Check_done (Choice, Not BooleanEquals true on $.status.done)
//     [!done] → Invoke_pollFn_2 (Task, ResultPath: $.status) → loops back
//     [default] → Return_Result (Pass, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const pollFn = Lambda<{ jobId: string }, { done: boolean; progress: number }>('arn:aws:lambda:us-east-1:123:function:Poll');

export const whileLoop = Steps.createFunction(
  async (context: SimpleStepContext, input: { jobId: string }) => {
    let status = await pollFn.call({ jobId: input.jobId });
    while (!status.done) {
      status = await pollFn.call({ jobId: input.jobId });
    }
    return { completed: true, progress: status.progress };
  },
);
