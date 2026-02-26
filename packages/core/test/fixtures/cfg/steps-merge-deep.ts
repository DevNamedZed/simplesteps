import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const getDefaults = Lambda<{ type: string }, { color: string; size: string }>('arn:aws:lambda:us-east-1:123:function:GetDefaults');
const getOverrides = Lambda<{ userId: string }, { color: string; label: string }>('arn:aws:lambda:us-east-1:123:function:GetOverrides');

export const deepMerge = Steps.createFunction(
  async (context: SimpleStepContext, input: { type: string; userId: string }) => {
    const defaults = await getDefaults.call({ type: input.type });
    const overrides = await getOverrides.call({ userId: input.userId });
    const merged = Steps.merge(defaults, overrides, true);
    return { merged };
  },
);
