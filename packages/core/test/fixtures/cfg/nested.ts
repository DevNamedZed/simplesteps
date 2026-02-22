import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const serviceA = Lambda<{ id: string }, { type: string }>('arn:aws:lambda:us-east-1:123:function:A');
const serviceB = Lambda<{ id: string }, { data: string }>('arn:aws:lambda:us-east-1:123:function:B');
const serviceC = Lambda<{ id: string }, { info: string }>('arn:aws:lambda:us-east-1:123:function:C');

export const nested = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; priority: string }) => {
    const check = await serviceA.call({ id: input.id });

    if (check.type === 'premium') {
      if (input.priority === 'high') {
        const b = await serviceB.call({ id: input.id });
        return { result: b.data, tier: 'premium-high' };
      } else {
        const c = await serviceC.call({ id: input.id });
        return { result: c.info, tier: 'premium-low' };
      }
    } else {
      return { result: 'standard', tier: 'basic' };
    }
  },
);
