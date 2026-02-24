import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const process = Lambda<{ id: string; size: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Process');

export const ternaryLiteral = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; count: number }) => {
    // Ternary with literal branches → Choice + two Pass states
    const label = input.count > 5 ? 'large' : 'small';
    const result = await process.call({ id: input.id, size: label });
    return { result: result.result };
  },
);
