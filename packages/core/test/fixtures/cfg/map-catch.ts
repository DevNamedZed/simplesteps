import { Steps, SimpleStepContext, StepException } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const processItem = Lambda<{ item: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:ProcessItem');
const handleError = Lambda<{ message: string }, void>('arn:aws:lambda:us-east-1:123:function:HandleError');

export const mapCatch = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[] }) => {
    try {
      for (const item of input.items) {
        await processItem.call({ item });
      }
    } catch (e) {
      if (e instanceof StepException) {
        await handleError.call({ message: 'Map failed' });
      }
    }
  },
);
