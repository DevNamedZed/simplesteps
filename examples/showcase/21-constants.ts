// Compile-Time Constants
//
// Module-level `const` values are inlined at compile time — no runtime
// lookup needed. The compiler folds arithmetic, string concatenation,
// and template literals involving constants.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const API_VERSION = 'v2';
const BASE_PATH = '/api/' + API_VERSION;    // folds to "/api/v2"
const MAX_RETRIES = 3;
const TIMEOUT_MS = 30 * 1000;               // folds to 30000
const GREETING = `Welcome to API ${API_VERSION}`;  // template + constant fold

const userService = Lambda<{ path: string; retries: number; timeout: number }, { data: string }>(
  'arn:aws:lambda:us-east-1:123:function:UserService',
);

export const constants = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string }) => {
    const result = await userService.call({
      path: BASE_PATH,
      retries: MAX_RETRIES,
      timeout: TIMEOUT_MS,
    });
    return {
      data: result.data,
      greeting: GREETING,
    };
  },
);
