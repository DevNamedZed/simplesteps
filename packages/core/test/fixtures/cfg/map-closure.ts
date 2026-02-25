import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const getPrefix = Lambda<{ env: string }, { value: string }>('arn:aws:lambda:us-east-1:123:function:GetPrefix');
const processItem = Lambda<{ item: string; prefix: string }, { done: boolean }>('arn:aws:lambda:us-east-1:123:function:ProcessItem');

export const mapClosure = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[]; env: string }) => {
    const prefix = await getPrefix.call({ env: input.env });

    await Steps.map(input.items, async (item) => {
      await processItem.call({ item, prefix: prefix.value });
    });
  },
);
