// Test fixture: Subtraction operator
//
// a - <literal> compiles to States.MathAdd(a, -literal)

import { Steps, SimpleStepContext } from '../../../src/runtime/index';

export const subtraction = Steps.createFunction(
  async (context: SimpleStepContext, input: { price: number; quantity: number }) => {
    // Subtract a literal number
    const discounted = input.price - 10;

    // Subtract zero (edge case)
    const same = input.price - 0;

    return { discounted, same };
  },
);
