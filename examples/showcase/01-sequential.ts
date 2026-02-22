// Sequential Execution
//
// The simplest pattern: two Lambda calls in sequence, each result
// feeding into the next. The compiler chains them as Task → Task → Pass.
//
// ASL output:
//   Invoke_enrichFn (Task, ResultPath: $.enriched)
//   → Invoke_transformFn (Task, uses $.enriched.data)
//   → Return_Result (Pass, End: true)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const enrichFn = Lambda<{ id: string }, { data: string }>('arn:aws:lambda:us-east-1:123:function:Enrich');
const transformFn = Lambda<{ data: string }, { output: string }>('arn:aws:lambda:us-east-1:123:function:Transform');

export const sequential = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const enriched = await enrichFn.call({ id: input.id });
    const transformed = await transformFn.call({ data: enriched.data });
    return { output: transformed.output };
  },
);
