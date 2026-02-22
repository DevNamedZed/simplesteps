import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const serviceA = Lambda<{ id: string }, { name: string }>('arn:aws:lambda:us-east-1:123:function:A');
const serviceB = Lambda<{ name: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:B');

export const sequential = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const a = await serviceA.call({ id: input.id });
    const b = await serviceB.call({ name: a.name });
    return { result: b.result };
  },
);
