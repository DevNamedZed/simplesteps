// Variable-to-variable relational comparisons (JSONPath mode)
//
// Tests that comparing two service result fields (a.count > b.count)
// emits NumericGreaterThanPath (not NumericGreaterThan with a literal).

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const svcA = Lambda<any, { count: number }>('arn:aws:lambda:us-east-1:123:function:A');
const svcB = Lambda<any, { count: number }>('arn:aws:lambda:us-east-1:123:function:B');

export const relationalComparisons = Steps.createFunction(
  async (context: SimpleStepContext, input: any) => {
    const a = await svcA.call(input);
    const b = await svcB.call(input);
    if (a.count > b.count) {
      return { winner: 'A' };
    }
    return { winner: 'B' };
  },
);
