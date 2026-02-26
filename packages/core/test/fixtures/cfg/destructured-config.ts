import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const config = {
  processArn: 'arn:aws:lambda:us-east-1:123:function:ProcessOrder',
  maxRetries: 3,
  timeoutMs: 30000,
};

const { processArn, maxRetries, timeoutMs } = config;

const processFn = Lambda<{ orderId: string; retries: number }, { status: string }>(processArn);

export const configWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const result = await processFn.call({ orderId: input.orderId, retries: maxRetries });
    return { status: result.status, timeout: timeoutMs };
  },
);
