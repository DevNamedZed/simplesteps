import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const riskyService = Lambda<{ data: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Risky');

export const tryCatch = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    try {
      const result = await riskyService.call({ data: input.data });
      return { success: true, result: result.result };
    } catch (err) {
      return { success: false, error: 'Service failed' };
    }
  },
);
