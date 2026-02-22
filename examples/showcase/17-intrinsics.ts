// Intrinsic Functions — Explicit Steps.* Calls
//
// SimpleSteps maps Steps.* methods to ASL intrinsic functions (States.*).
// These are compile-time only — they produce intrinsic strings in the
// generated ASL, enabling data transformation without Lambda.
//
// Compare with 18-js-operators.ts which does the SAME thing using
// natural JavaScript operators and methods instead.
//
// Mapping table:
//   Steps.format()       → States.Format
//   Steps.uuid()         → States.UUID
//   Steps.add()          → States.MathAdd
//   Steps.jsonParse()    → States.StringToJson
//   Steps.jsonStringify() → States.JsonToString

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';

export const intrinsics = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; price: number; tax: number; metadata: string }) => {
    // Arithmetic using Steps.add()
    const total = Steps.add(input.price, input.tax);

    // String formatting using Steps.format()
    const message = Steps.format('Order {} confirmed, total: {}', input.orderId, total);

    // Generate a unique ID using Steps.uuid()
    const trackingId = Steps.uuid();

    // Parse a JSON string using Steps.jsonParse()
    const meta = Steps.jsonParse(input.metadata);

    return {
      message: message,
      trackingId: trackingId,
      total: total,
      meta: meta,
    };
  },
);
