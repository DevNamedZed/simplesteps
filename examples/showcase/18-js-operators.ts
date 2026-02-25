// JavaScript Operator & Method Mapping
//
// Write standard JavaScript — the compiler maps operators and methods
// to the appropriate ASL representation for your chosen query language.
//
// JSONata mode (default):
//   a + b              → native JSONata addition
//   `${a} text ${b}`   → JSONata string concatenation with &
//   str.split(delim)   → $split(str, delim)
//   JSON.parse(str)    → $eval(str)
//   JSON.stringify(obj) → $string(obj)
//   arr.includes(val)  → val in arr
//
// JSONPath mode (--query-language jsonpath):
//   a + b              → States.MathAdd(a, b)
//   `${a} text ${b}`   → States.Format('{} text {}', a, b)
//   str.split(delim)   → States.StringSplit(str, delim)
//   JSON.parse(str)    → States.StringToJson(str)
//   JSON.stringify(obj) → States.JsonToString(obj)
//   arr.includes(val)  → States.ArrayContains(arr, val)
//
// The TypeScript source is identical — only the ASL output differs.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';

export const jsOperators = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; price: number; tax: number; metadata: string }) => {
    // Arithmetic → JSONata: native +, JSONPath: States.MathAdd
    const total = input.price + input.tax;

    // Template literal → JSONata: & concat, JSONPath: States.Format
    const message = `Order ${input.orderId} confirmed, total: ${total}`;

    // UUID — always States.UUID() in both backends
    const trackingId = Steps.uuid();

    // JSON.parse → JSONata: $eval(), JSONPath: States.StringToJson
    const meta = JSON.parse(input.metadata);

    return {
      message: message,
      trackingId: trackingId,
      total: total,
      meta: meta,
    };
  },
);
