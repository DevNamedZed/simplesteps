// Test fixture: JSON.stringify() on a runtime (state output) value
//
// Verifies: Does JSON.stringify(runtimeValue) map to States.JsonToString($.runtimeValue)?
// The variableResolver.ts lines 489-495 handle this mapping.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const fetchData = Lambda<{ id: string }, { name: string; age: number }>(
  'arn:aws:lambda:us-east-1:123:function:FetchData',
);

export const jsonStringifyTest = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const data = await fetchData.call({ id: input.id });

    // JSON.stringify on runtime value — should map to States.JsonToString($.data)
    const json = JSON.stringify(data);

    return { serialized: json };
  },
);
