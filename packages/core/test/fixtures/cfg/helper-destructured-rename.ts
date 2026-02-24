import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const process = Lambda<{ id: string; name: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Process');

// Substep with renamed destructuring: { userId: id, userName: name }
async function processItem({ userId: id, userName: name }: { userId: string; userName: string }) {
  return await process.call({ id, name });
}

export const helperDestructuredRename = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string; userName: string }) => {
    const result = await processItem({ userId: input.userId, userName: input.userName });
    return { output: result.result };
  },
);
