import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const processFn = Lambda<{ id: string }, { status: string }>('arn:aws:lambda:us-east-1:123:function:Process');

export const waitState = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    Steps.delay({ seconds: 30 });
    const result = await processFn.call({ id: input.id });
    return { status: result.status };
  },
);
