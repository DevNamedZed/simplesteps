// Variable reassignment with sequential service calls
//
// Tests that a variable initially assigned from one service call
// can be reassigned to another service call result without compiler errors,
// and both Task states appear in the output.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const fnA = Lambda<any, { value: string }>('arn:aws:lambda:us-east-1:123:function:FnA');
const fnB = Lambda<any, { value: string }>('arn:aws:lambda:us-east-1:123:function:FnB');

export const deferredReassignment = Steps.createFunction(
  async (context: SimpleStepContext, input: any) => {
    // First call
    let result = await fnA.call(input);
    // Reassign with second call
    result = await fnB.call({ second: true });
    return result;
  },
);
