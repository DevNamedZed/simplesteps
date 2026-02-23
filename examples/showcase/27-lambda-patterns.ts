// Lambda Invocation Patterns
//
// Three Lambda invocation modes: synchronous (default), asynchronous
// (fire-and-forget), and wait-for-callback (waitForTaskToken).

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const processOrder = Lambda<{ orderId: string }, { status: string }>(
  'arn:aws:lambda:us-east-1:123456789:function:ProcessOrder',
);

const sendEmail = Lambda<{ to: string; body: string }, void>(
  'arn:aws:lambda:us-east-1:123456789:function:SendEmail',
);

const longRunningJob = Lambda<{ jobId: string }, { result: string }>(
  'arn:aws:lambda:us-east-1:123456789:function:LongRunningJob',
);

export const lambdaPatterns = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; email: string }) => {
    // Synchronous — wait for result
    const order = await processOrder.call({ orderId: input.orderId });

    // Asynchronous — fire and forget (InvocationType: Event)
    await sendEmail.callAsync({
      to: input.email,
      body: order.status,
    });

    // Wait for callback — pauses until Lambda calls SendTaskSuccess
    const jobResult = await longRunningJob.callWithCallback<{ result: string }>({
      jobId: input.orderId,
    });

    return { orderStatus: order.status, jobResult: jobResult.result };
  },
);
