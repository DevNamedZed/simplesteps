// If/Else Branching
//
// Branch on an input field using a Choice state. Each branch calls a
// different Lambda and returns its result. Both branches end the
// state machine independently.
//
// ASL output:
//   Check_tier (Choice, StringEquals "premium")
//     → Invoke_premiumFn (Task) → Return_Result (Pass, End)
//     → Invoke_standardFn (Task) → Return_Result_2 (Pass, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const premiumFn = Lambda<{ id: string }, { plan: string }>('arn:aws:lambda:us-east-1:123:function:Premium');
const standardFn = Lambda<{ id: string }, { plan: string }>('arn:aws:lambda:us-east-1:123:function:Standard');

export const ifElse = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; tier: string }) => {
    if (input.tier === 'premium') {
      const result = await premiumFn.call({ id: input.id });
      return { plan: result.plan };
    } else {
      const result = await standardFn.call({ id: input.id });
      return { plan: result.plan };
    }
  },
);
