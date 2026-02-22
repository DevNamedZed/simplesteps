// JavaScript Operator & Method Mapping
//
// The same logic as 17-intrinsics.ts, but written using standard
// JavaScript operators and methods. The compiler recognizes these
// patterns and maps them to the exact same ASL intrinsic functions.
//
// Compare the generated ASL output — it's identical!
//
// Mapping table:
//   a + b              → States.MathAdd(a, b)
//   a - 5              → States.MathAdd(a, -5)
//   `${a} text ${b}`   → States.Format('{} text {}', a, b)
//   str.split(delim)   → States.StringSplit(str, delim)
//   JSON.parse(str)    → States.StringToJson(str)
//   JSON.stringify(obj) → States.JsonToString(obj)
//   arr.includes(val)  → States.ArrayContains(arr, val)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';

export const jsOperators = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; price: number; tax: number; metadata: string }) => {
    // Arithmetic using the + operator (same as Steps.add)
    const total = input.price + input.tax;

    // String formatting using template literals (compiles to States.Format)
    const message = `Order ${input.orderId} confirmed, total: ${total}`;

    // Generate a unique ID (no JS equivalent — Steps.uuid() is the only way)
    const trackingId = Steps.uuid();

    // Parse a JSON string using JSON.parse (same as Steps.jsonParse)
    const meta = JSON.parse(input.metadata);

    return {
      message: message,
      trackingId: trackingId,
      total: total,
      meta: meta,
    };
  },
);
