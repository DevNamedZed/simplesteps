// Complete JavaScript Pattern Reference
//
// Every JS pattern the compiler maps to ASL, in one place.
// The TypeScript source is identical regardless of backend —
// only the ASL output differs.
//
// JSONata mode (default):
//   a + b (numbers)       → native JSONata addition
//   a - 5                 → native JSONata subtraction
//   a * b, a / b, a % b   → native JSONata operators (JSONata only)
//   `${a} text ${b}`      → JSONata & concatenation
//   str.split(delim)      → $split(str, delim)
//   JSON.parse(str)       → $eval(str)
//   JSON.stringify(obj)   → $string(obj)
//   arr.includes(val)     → val in arr
//   arr.length            → $count(arr)
//   Steps.uuid()          → States.UUID() (intrinsic in both)
//
// JSONPath mode (--query-language jsonpath):
//   a + b (numbers)       → States.MathAdd(a, b)
//   a - 5 (literal right) → States.MathAdd(a, -5)
//   `${a} text ${b}`      → States.Format('{} text {}', a, b)
//   str.split(delim)      → States.StringSplit(str, delim)
//   JSON.parse(str)       → States.StringToJson(str)
//   JSON.stringify(obj)   → States.JsonToString(obj)
//   arr.includes(val)     → States.ArrayContains(arr, val)
//   arr.length            → States.ArrayLength(arr)
//   Steps.uuid()          → States.UUID()
//
// See also 34-37 for JSONata-only methods (string, math, array,
// and higher-order functions like map/filter/reduce).

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';

export const jsPatterns = Steps.createFunction(
  async (context: SimpleStepContext, input: {
    items: string[]; csv: string; data: string;
    price: number; tax: number; name: string
  }) => {
    // Arithmetic: JSONata: native +, JSONPath: States.MathAdd
    const total = input.price + input.tax;

    // Subtraction: JSONata: native -, JSONPath: States.MathAdd(a, -literal)
    const discounted = input.price - 5;

    // Template literals: JSONata: & concat, JSONPath: States.Format
    const message = `Hello ${input.name}, your total is ${total}`;

    // String split: JSONata: $split(), JSONPath: States.StringSplit
    const parts = input.csv.split(',');

    // JSON.parse: JSONata: $eval(), JSONPath: States.StringToJson
    const parsed = JSON.parse(input.data);

    // JSON.stringify: JSONata: $string(), JSONPath: States.JsonToString
    const serialized = JSON.stringify(parsed);

    // Array includes: JSONata: `in` operator, JSONPath: States.ArrayContains
    const hasItem = input.items.includes('special');

    // Array length: JSONata: $count(), JSONPath: States.ArrayLength
    const count = input.items.length;

    // Steps.uuid: States.UUID() in both backends
    const id = Steps.uuid();

    return { total, discounted, message, parts, parsed, serialized, hasItem, count, id };
  },
);
