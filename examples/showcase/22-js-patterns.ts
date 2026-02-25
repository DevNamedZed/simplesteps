// Complete JavaScript Pattern Reference
//
// Every JS pattern the compiler maps to ASL, in one place.
//
// See also 34-37 for JSONata-only methods (string, math, array,
// and higher-order functions like map/filter/reduce).
//
// Mapping table:
//   a + b (numbers)       → States.MathAdd(a, b)
//   a - 5 (literal right) → States.MathAdd(a, -5)
//   `${a} text ${b}`      → States.Format('{} text {}', a, b)
//   str.split(delim)      → States.StringSplit(str, delim)
//   JSON.parse(str)       → States.StringToJson(str)
//   JSON.stringify(obj)   → States.JsonToString(obj)
//   arr.includes(val)     → States.ArrayContains(arr, val)
//   arr.length            → States.ArrayLength(arr)
//   Steps.uuid()          → States.UUID()

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';

export const jsPatterns = Steps.createFunction(
  async (context: SimpleStepContext, input: {
    items: string[]; csv: string; data: string;
    price: number; tax: number; name: string
  }) => {
    // Arithmetic: + → States.MathAdd
    const total = input.price + input.tax;

    // Subtraction: - literal → States.MathAdd(a, -literal)
    const discounted = input.price - 5;

    // Template literals → States.Format
    const message = `Hello ${input.name}, your total is ${total}`;

    // String split → States.StringSplit
    const parts = input.csv.split(',');

    // JSON.parse → States.StringToJson
    const parsed = JSON.parse(input.data);

    // JSON.stringify → States.JsonToString
    const serialized = JSON.stringify(parsed);

    // Array includes → States.ArrayContains
    const hasItem = input.items.includes('special');

    // Array length → States.ArrayLength
    const count = input.items.length;

    // Steps.uuid → States.UUID
    const id = Steps.uuid();

    return { total, discounted, message, parts, parsed, serialized, hasItem, count, id };
  },
);
