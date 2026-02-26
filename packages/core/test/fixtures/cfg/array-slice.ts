// Test fixture: Steps.arraySlice intrinsic mapping

import { Steps, SimpleStepContext } from '../../../src/runtime/index';

export const arraySliceTest = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[] }) => {
    const first3 = Steps.arraySlice(input.items, 0, 3);
    return { sliced: first3 };
  },
);
