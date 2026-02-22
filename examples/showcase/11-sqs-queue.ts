// SQS Queue Integration
//
// Send messages to an SQS queue. The compiler wraps user parameters
// with QueueUrl from the constructor argument. Fire-and-forget calls
// (no `const x =`) get ResultPath: null.
//
// ASL output:
//   Invoke_enrichFn (Task, Lambda)
//   → Invoke_taskQueue (Task, arn:aws:states:::sqs:sendMessage,
//       Parameters: { QueueUrl: "https://sqs...", MessageBody: { ... } },
//       ResultPath: null)
//   → Return_Result (Pass, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';
import { SQS } from '../../packages/core/src/runtime/services/SimpleQueueService';

const enrichFn = Lambda<{ orderId: string }, { payload: string }>('arn:aws:lambda:us-east-1:123:function:EnrichOrder');
const taskQueue = new SQS('https://sqs.us-east-1.amazonaws.com/123/TaskQueue');

export const sqsQueue = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const enriched = await enrichFn.call({ orderId: input.orderId });
    await taskQueue.publish({ orderId: input.orderId, payload: enriched.payload });
    return { queued: true };
  },
);
