import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const svc1 = Lambda<{ x: string }, void>('arn:aws:lambda:us-east-1:123:function:Svc1');
const svc2 = Lambda<{ x: string }, void>('arn:aws:lambda:us-east-1:123:function:Svc2');
const svc3 = Lambda<{ x: string }, void>('arn:aws:lambda:us-east-1:123:function:Svc3');

// Level C — leaf helper
async function levelC(val: string) {
  await svc1.call({ x: val });
}

// Level B — calls levelC
async function levelB(val: string) {
  await levelC(val);
  await svc2.call({ x: val });
}

// Level A — calls levelB (3 levels deep)
async function levelA(val: string) {
  await levelB(val);
  await svc3.call({ x: val });
}

export const deepNested = Steps.createFunction(
  async (context: SimpleStepContext, input: { x: string }) => {
    await levelA(input.x);
    return { done: true };
  },
);
