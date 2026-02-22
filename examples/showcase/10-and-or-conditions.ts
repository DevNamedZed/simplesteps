// Compound Conditions (And/Or)
//
// Use && and || in if conditions. The compiler produces Choice rules
// with And/Or arrays containing the individual comparisons. Each
// sub-rule is stripped of its Next field — only the outer rule
// carries the branch target.
//
// ASL output:
//   Check_priority (Choice)
//     And: [
//       { Variable: $.priority, NumericGreaterThan: 5 },
//       { Variable: $.status, StringEquals: "active" }
//     ] → Invoke_urgentFn → Return_Result
//     Default → Invoke_normalFn → Return_Result_2

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const urgentFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:HandleUrgent');
const normalFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:HandleNormal');

export const andOrConditions = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; priority: number; status: string }) => {
    if (input.priority > 5 && input.status === 'active') {
      const result = await urgentFn.call({ id: input.id });
      return { urgent: true, result: result.result };
    } else {
      const result = await normalFn.call({ id: input.id });
      return { urgent: false, result: result.result };
    }
  },
);
