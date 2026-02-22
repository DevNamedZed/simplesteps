// Try/Catch (Error Handling)
//
// Wrap a risky Lambda call in try/catch. The compiler adds a Catch
// rule to the Task state pointing at the catch handler. On success
// execution flows to the next Pass state; on any error it jumps
// to the catch Pass state instead.
//
// ASL output:
//   Invoke_riskyFn (Task, Catch: [{ ErrorEquals: ["States.ALL"], Next: Return_Result }])
//     → Return_Result_2 (Pass { success: true }, End)
//   Return_Result (Pass { success: false, error: "Fetch failed" }, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const riskyFn = Lambda<{ url: string }, { data: string }>('arn:aws:lambda:us-east-1:123:function:FetchData');

export const tryCatch = Steps.createFunction(
  async (context: SimpleStepContext, input: { url: string }) => {
    try {
      const data = await riskyFn.call({ url: input.url });
      return { success: true, data: data.data };
    } catch (e) {
      return { success: false, error: 'Fetch failed' };
    }
  },
);
