// Switch/Case
//
// Switch statements desugar to chained Choice states. Each case
// becomes a Choice checking discriminant === caseValue, with the
// default clause as the final else. Fall-through is not allowed —
// every case must end with break or return.
//
// ASL output:
//   Choice ($.status === "active") → Invoke_activateFn → Return_Result
//   else → Choice ($.status === "pending") → Invoke_pendingFn → Return_Result_2
//   else → Invoke_defaultFn → Return_Result_3

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const activateFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Activate');
const pendingFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:ReviewPending');
const defaultFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:HandleDefault');

export const switchCase = Steps.createFunction(
  async (context: SimpleStepContext, input: { status: string; id: string }) => {
    switch (input.status) {
      case 'active':
        const activeResult = await activateFn.call({ id: input.id });
        return { handled: 'active', result: activeResult.result };
      case 'pending':
        const pendingResult = await pendingFn.call({ id: input.id });
        return { handled: 'pending', result: pendingResult.result };
      default:
        const defaultResult = await defaultFn.call({ id: input.id });
        return { handled: 'default', result: defaultResult.result };
    }
  },
);
