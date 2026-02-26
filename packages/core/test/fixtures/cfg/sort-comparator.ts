// Test fixture: .sort(comparator) with custom comparator function (JSONata only)

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const myLambda = Lambda<{ data: string }, { items: { name: string; age: number }[] }>(
  'arn:aws:lambda:us-east-1:123:function:MyFunc'
);

export const sortComparator = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    const result = await myLambda.call({ data: input.data });

    // Sort with numeric comparator: a - b pattern
    const sortedByAge = result.items.sort((a, b) => a.age - b.age);

    return { sortedByAge };
  },
);
