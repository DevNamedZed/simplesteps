// Continue inside switch inside while loop
//
// Tests that `continue` inside a switch/case within a while loop
// targets the while loop condition check, not the switch merge point.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const processFn = Lambda<any, { result: string }>(
  'arn:aws:lambda:us-east-1:123:function:process',
);
const logFn = Lambda<any, { ok: boolean }>(
  'arn:aws:lambda:us-east-1:123:function:log',
);

export const switchContinue = Steps.createFunction(
  async (context: SimpleStepContext, input: { type: string; active: boolean }) => {
    while (input.active) {
      switch (input.type) {
        case 'skip':
          await logFn.call({ action: 'skipped' });
          continue; // Should target while loop condition, not switch merge
        case 'process':
          await processFn.call({ action: 'processed' });
          break;
        default:
          break;
      }
      await logFn.call({ action: 'post-switch' });
    }
    return { done: true };
  },
);
