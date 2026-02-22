import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const activateFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Activate');
const pendingFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Pending');
const defaultFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Default');

export const switchCase = Steps.createFunction(
  async (context: SimpleStepContext, input: { status: string; id: string }) => {
    switch (input.status) {
      case 'active':
        const activeResult = await activateFn.call({ id: input.id });
        return { handled: 'active', result: activeResult.result };
      case 'pending':
        const pendingResult = await pendingFn.call({ id: input.id });
        return { handled: 'pending', result: pendingResult.result };
      default:
        const defaultResult = await defaultFn.call({ id: input.id });
        return { handled: 'default', result: defaultResult.result };
    }
  },
);
