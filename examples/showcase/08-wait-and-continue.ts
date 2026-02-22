// Wait State (Steps.delay)
//
// Insert a fixed delay before continuing. Steps.delay({ seconds: N })
// compiles to an ASL Wait state. Also supports timestamp, secondsPath,
// and timestampPath for dynamic waits.
//
// ASL output:
//   Wait (Wait, Seconds: 30)
//   → Invoke_checkFn (Task)
//   → Return_Result (Pass, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const checkFn = Lambda<{ id: string }, { status: string }>('arn:aws:lambda:us-east-1:123:function:CheckStatus');

export const waitAndContinue = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    Steps.delay({ seconds: 30 });
    const result = await checkFn.call({ id: input.id });
    return { status: result.status };
  },
);
