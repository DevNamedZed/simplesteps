import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const lookup = Lambda<{ id: string }, { firstName: string; fallbackName: string; valid: boolean }>('arn:aws:lambda:us-east-1:123:function:Lookup');
const greet = Lambda<{ name: string }, void>('arn:aws:lambda:us-east-1:123:function:Greet');

export const ternaryJsonpath = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const result = await lookup.call({ id: input.id });
    // Ternary with JSONPath branches → Choice + two Pass states with InputPath
    const name = result.valid ? result.firstName : result.fallbackName;
    await greet.call({ name });
    return { name };
  },
);
