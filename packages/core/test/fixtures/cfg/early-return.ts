import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const validateService = Lambda<{ id: string }, { valid: boolean }>('arn:aws:lambda:us-east-1:123:function:Validate');
const processService = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Process');

export const earlyReturn = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const validation = await validateService.call({ id: input.id });

    if (!validation.valid) {
      return { error: 'Invalid input' };
    }

    const result = await processService.call({ id: input.id });
    return { result: result.result };
  },
);
