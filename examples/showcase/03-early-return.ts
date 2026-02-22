// Early Return (Guard Clause)
//
// Call a validation Lambda, then early-return on failure. The compiler
// emits a Choice state with a Not rule — the "happy path" continues
// to the next Task, while the guard exits via a Pass state.
//
// ASL output:
//   Invoke_validateFn (Task) → Check_valid (Choice)
//     [!valid] → Return_Result (Pass { error }, End)
//     [default] → Invoke_processFn (Task) → Return_Result_2 (Pass, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const validateFn = Lambda<{ data: string }, { valid: boolean }>('arn:aws:lambda:us-east-1:123:function:Validate');
const processFn = Lambda<{ data: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Process');

export const earlyReturn = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    const validation = await validateFn.call({ data: input.data });
    if (!validation.valid) {
      return { error: 'Invalid data' };
    }
    const result = await processFn.call({ data: input.data });
    return { success: true, result: result.result };
  },
);
