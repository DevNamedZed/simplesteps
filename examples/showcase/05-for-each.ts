// For-Each (Map State)
//
// Iterate over an array with for-of. The compiler emits a Map state
// whose ItemProcessor contains the loop body. Each iteration receives
// the current item as `$`. The shorthand `{ item }` compiles to
// `{ "item.$": "$" }`.
//
// ASL output:
//   Map_items (Map, ItemsPath: $.items, ResultPath: null)
//     ItemProcessor:
//       Invoke_processFn (Task, Parameters: { "item.$": "$" })
//   → Return_Result (Pass, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const processFn = Lambda<{ item: string }, { processed: boolean }>('arn:aws:lambda:us-east-1:123:function:ProcessItem');

export const forEach = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[] }) => {
    for (const item of input.items) {
      await processFn.call({ item });
    }
    return { done: true };
  },
);
