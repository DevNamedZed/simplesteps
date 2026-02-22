// String Interpolation with Template Literals
//
// Write natural template strings — the compiler maps them to
// States.Format intrinsic functions automatically.
//
// Mapping:
//   `Hello ${name}`        → States.Format('Hello {}', name)
//   `${a} and ${b}`        → States.Format('{} and {}', a, b)
//   `Total: ${a + b}`      → States.Format('Total: {}', States.MathAdd(a, b))

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';

export const stringInterpolation = Steps.createFunction(
  async (context: SimpleStepContext, input: { name: string; orderId: string; price: number; tax: number }) => {
    const total = input.price + input.tax;

    // Simple interpolation
    const greeting = `Hello, ${input.name}!`;

    // Multiple substitutions
    const summary = `Order ${input.orderId}: $${total} (including tax)`;

    // Nested expressions in template
    const receipt = `Receipt for ${input.name} — Order #${input.orderId}, Total: $${Steps.add(input.price, input.tax)}`;

    return { greeting, summary, receipt };
  },
);
