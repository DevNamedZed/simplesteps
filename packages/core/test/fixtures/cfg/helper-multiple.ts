import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const stepA = Lambda<{ x: string }, { a: string }>('arn:aws:lambda:us-east-1:123:function:StepA');
const stepB = Lambda<{ x: string }, { b: string }>('arn:aws:lambda:us-east-1:123:function:StepB');
const stepC = Lambda<{ x: string }, { c: string }>('arn:aws:lambda:us-east-1:123:function:StepC');

// Two separate helpers — both should be independently inlinable
async function doA(val: string) {
  await stepA.call({ x: val });
}

async function doB(val: string) {
  await stepB.call({ x: val });
}

export const helperMultiple = Steps.createFunction(
  async (context: SimpleStepContext, input: { x: string }) => {
    await doA(input.x);
    await doB(input.x);
    await stepC.call({ x: input.x });
    return { done: true };
  },
);
