// Steps.map() — Functional Map API
//
// Steps.map() provides a functional alternative to for...of with three advantages:
//   1. Result capture — collect iteration results into a variable
//   2. Closures — access outer await results inside the callback
//   3. MaxConcurrency — limit parallel execution
//
// ASL output:
//   Invoke_getConfig (Task, ResultPath: $.config)
//   → Map_items (Map, ItemSelector: { item: $$.Map.Item.Value, config: $.config },
//                ResultPath: $.results, MaxConcurrency: 5)
//       ItemProcessor:
//         Invoke_processItem (Task, End: true)
//   → Return_Result (Pass, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const getConfig = Lambda<{ env: string }, { prefix: string; region: string }>(
  'arn:aws:lambda:us-east-1:123:function:GetConfig',
);
const processItem = Lambda<{ item: string; prefix: string }, { processed: boolean }>(
  'arn:aws:lambda:us-east-1:123:function:ProcessItem',
);

export const stepsMap = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[]; env: string }) => {
    // Fetch config (outer scope)
    const config = await getConfig.call({ env: input.env });

    // Map with closure, result capture, and concurrency limit
    const results = await Steps.map(input.items, async (item) => {
      // config.prefix is captured from outer scope via ItemSelector
      return await processItem.call({ item, prefix: config.prefix });
    }, { maxConcurrency: 5 });

    return { results };
  },
);
