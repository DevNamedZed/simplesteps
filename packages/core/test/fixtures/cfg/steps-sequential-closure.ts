import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const getConfig = Lambda<{ env: string }, { prefix: string }>('arn:aws:lambda:us-east-1:123:function:GetConfig');
const processItem = Lambda<{ item: string; prefix: string }, void>('arn:aws:lambda:us-east-1:123:function:ProcessItem');

export const stepsSequentialClosure = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[]; env: string }) => {
    const config = await getConfig.call({ env: input.env });

    for (const item of Steps.sequential(input.items)) {
      await processItem.call({ item, prefix: config.prefix });
    }
  },
);
