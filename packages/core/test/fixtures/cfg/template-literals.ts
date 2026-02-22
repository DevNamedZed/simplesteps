// Test fixture: Template literals
//
// Template expressions compile to States.Format intrinsic.
// All-literal templates fold to plain strings at compile time.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';

const NAME = 'World';
const TEMPLATE_GREETING = `Hello ${NAME}`;  // folds to "Hello World"

export const templateLiterals = Steps.createFunction(
  async (context: SimpleStepContext, input: { name: string; a: string; b: string; x: number; y: number }) => {
    // Simple interpolation
    const greeting = `Hello ${input.name}`;

    // Multiple substitutions
    const combined = `${input.a} and ${input.b}`;

    // Nested intrinsic in template
    const total = `Total: ${Steps.add(input.x, input.y)}`;

    // All-literal fold
    const literal = `Hello ${42}`;

    // Template with constant
    const withConst = TEMPLATE_GREETING;

    // Template with special chars (single quote)
    const quoted = `It's ${input.x}`;

    return { greeting, combined, total, literal, withConst, quoted };
  },
);
