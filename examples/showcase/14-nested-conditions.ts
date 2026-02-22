// Nested Conditions
//
// Multi-level if/else chains. The compiler creates nested Choice
// states — the first Choice branches, then one of its paths contains
// another Choice. Demonstrates deep branching logic.
//
// ASL output:
//   Check_role (Choice, $.role === "admin")
//     → Check_level (Choice, $.level > 5)
//       → Invoke_superFn → Return_Result
//       → Invoke_adminFn → Return_Result_2
//     → Invoke_userFn → Return_Result_3

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const superFn = Lambda<{ id: string }, { access: string }>('arn:aws:lambda:us-east-1:123:function:SuperAdmin');
const adminFn = Lambda<{ id: string }, { access: string }>('arn:aws:lambda:us-east-1:123:function:Admin');
const userFn = Lambda<{ id: string }, { access: string }>('arn:aws:lambda:us-east-1:123:function:User');

export const nestedConditions = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; role: string; level: number }) => {
    if (input.role === 'admin') {
      if (input.level > 5) {
        const result = await superFn.call({ id: input.id });
        return { access: result.access, tier: 'super' };
      } else {
        const result = await adminFn.call({ id: input.id });
        return { access: result.access, tier: 'admin' };
      }
    } else {
      const result = await userFn.call({ id: input.id });
      return { access: result.access, tier: 'user' };
    }
  },
);
