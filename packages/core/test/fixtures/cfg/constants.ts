// Test fixture: Compile-time constants
//
// Module-level constants (simple and folded) should be inlined
// as literal values in ASL parameters — no JSONPath, no intrinsics.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

// Module-level compile-time constants
const BASE_URL = 'https://api.example.com';
const MAX_RETRIES = 3;
const TIMEOUT = 30 + 10;                         // folds to 40
const GREETING = 'Hello' + ' ' + 'World';        // folds to "Hello World"
const DOUBLED = MAX_RETRIES * 2;                  // chained: folds to 6
const NEGATIVE = -1;
const COMPUTED = Math.max(10, 20);                // pure function: folds to 20

const processFn = Lambda<{ url: string; retries: number }, { result: string }>(
  'arn:aws:lambda:us-east-1:123:function:Process',
);

export const constantsWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const result = await processFn.call({ url: BASE_URL, retries: MAX_RETRIES });
    return {
      result: result.result,
      timeout: TIMEOUT,
      greeting: GREETING,
      doubled: DOUBLED,
      negative: NEGATIVE,
      computed: COMPUTED,
    };
  },
);
