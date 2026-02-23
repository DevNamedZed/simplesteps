import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const provision = Lambda<{ id: string }, { instanceId: string }>('arn:aws:lambda:us-east-1:123:function:Provision');
const rollback = Lambda<{ instanceId: string }, void>('arn:aws:lambda:us-east-1:123:function:Rollback');
const configure = Lambda<{ instanceId: string }, { status: string }>('arn:aws:lambda:us-east-1:123:function:Configure');

// Helper with try/catch — simulates saga rollback
async function provisionWithRollback(id: string) {
  const instance = await provision.call({ id });
  try {
    await configure.call({ instanceId: instance.instanceId });
  } catch (e) {
    await rollback.call({ instanceId: instance.instanceId });
    throw e;
  }
}

export const helperTryCatch = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    await provisionWithRollback(input.id);
    return { success: true };
  },
);
