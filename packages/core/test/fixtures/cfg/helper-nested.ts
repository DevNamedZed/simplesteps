import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const svcA = Lambda<{ x: string }, void>('arn:aws:lambda:us-east-1:123:function:SvcA');
const svcB = Lambda<{ x: string }, void>('arn:aws:lambda:us-east-1:123:function:SvcB');
const svcC = Lambda<{ x: string }, void>('arn:aws:lambda:us-east-1:123:function:SvcC');

// Inner helper — leaf function, calls only a service
async function innerHelper(val: string) {
  await svcA.call({ x: val });
}

// Outer helper — calls innerHelper (nested inlining)
async function outerHelper(val: string) {
  await innerHelper(val);
  await svcB.call({ x: val });
}

export const nestedHelper = Steps.createFunction(
  async (context: SimpleStepContext, input: { x: string }) => {
    await outerHelper(input.x);
    await svcC.call({ x: input.x });
    return { done: true };
  },
);
