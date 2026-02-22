import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const myLambda = Lambda<{ data: string }, { items: string[]; encoded: string; obj1: Record<string, any>; obj2: Record<string, any>; index: number }>(
  'arn:aws:lambda:us-east-1:123:function:MyFunc',
);

// Test: JS standard library mappings for intrinsic functions
export const jsIntrinsics = Steps.createFunction(
  async (context: SimpleStepContext, input: { name: string; items: string[]; data: string }) => {
    const result = await myLambda.call({ data: input.data });

    // arr[index] → States.ArrayGetItem
    const item = result.items[result.index];

    // [a, b] with dynamic values → States.Array
    const pair = [input.name, input.data];

    // btoa(str) → States.Base64Encode
    const encoded = btoa(input.data);

    // atob(str) → States.Base64Decode
    const decoded = atob(result.encoded);

    // crypto.randomUUID() → States.UUID
    const id = crypto.randomUUID();

    // { ...a, ...b } → States.JsonMerge
    const merged = { ...result.obj1, ...result.obj2 };

    return { item, pair, encoded, decoded, id, merged };
  },
);
