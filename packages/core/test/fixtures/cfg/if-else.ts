import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const serviceA = Lambda<{ id: string }, { status: string }>('arn:aws:lambda:us-east-1:123:function:A');
const serviceB = Lambda<{ id: string }, { data: string }>('arn:aws:lambda:us-east-1:123:function:B');

export const ifElse = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; mode: string }) => {
    if (input.mode === 'fast') {
      const a = await serviceA.call({ id: input.id });
      return { result: a.status };
    } else {
      const b = await serviceB.call({ id: input.id });
      return { result: b.data };
    }
  },
);
