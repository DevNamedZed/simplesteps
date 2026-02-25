import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const myLambda = Lambda<{ data: string }, { items: string[]; nums: number[]; obj: Record<string, any>; val: string }>(
  'arn:aws:lambda:us-east-1:123:function:MyFunc',
);

// Test: Array, Math, type conversion, and Object method → JSONata function mappings
export const arrayMathMethods = Steps.createFunction(
  async (context: SimpleStepContext, input: { x: number; y: number; text: string }) => {
    const result = await myLambda.call({ data: input.text });

    // Array methods
    const joined = result.items.join(', ');
    const reversed = result.items.reverse();
    const sorted = result.items.sort();
    const combined = result.items.concat(result.nums);

    // Math methods
    const floored = Math.floor(input.x);
    const ceiled = Math.ceil(input.x);
    const rounded = Math.round(input.x);
    const absolute = Math.abs(input.x);
    const power = Math.pow(input.x, input.y);
    const root = Math.sqrt(input.x);
    const minimum = Math.min(input.x, input.y);
    const maximum = Math.max(input.x, input.y);
    const rand = Math.random();

    // Type conversion
    const num = Number(input.text);
    const str = String(input.x);
    const parsed = parseInt(input.text);
    const bool = Boolean(input.text);

    // Object methods
    const keys = Object.keys(result.obj);
    const values = Object.values(result.obj);

    // Date.now() → $millis()
    const timestamp = Date.now();

    // Array.isArray(val) → $type(val) = 'array'
    const isArr = Array.isArray(result.items);

    return {
      joined, reversed, sorted, combined,
      floored, ceiled, rounded, absolute, power, root, minimum, maximum, rand,
      num, str, parsed, bool,
      keys, values,
      timestamp, isArr,
    };
  },
);
