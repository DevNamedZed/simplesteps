import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const validate = Lambda<{ id: string }, { valid: boolean }>('arn:aws:lambda:us-east-1:123:function:Validate');
const process = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Process');
const notify = Lambda<{ message: string }, void>('arn:aws:lambda:us-east-1:123:function:Notify');

// Helper function — should be inlined at the call site
async function processAndNotify(id: string) {
  const result = await process.call({ id });
  await notify.call({ message: result.result });
}

export const helperBasic = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const validation = await validate.call({ id: input.id });
    await processAndNotify(input.id);
    return { done: true };
  },
);
