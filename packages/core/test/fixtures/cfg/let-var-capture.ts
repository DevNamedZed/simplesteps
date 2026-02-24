// Test fixture: let/var variable capture with SS709 warnings
//
// The WPA resolves single-assignment let/var with foldable initializers
// as compile-time constants, but emits SS709 warning recommending const.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

// const — no warning
const API_VERSION = 'v2';

// let with single literal — SS709 warning
let baseUrl = 'https://api.example.com';

// var with single literal — SS709 warning
var defaultRegion = 'us-east-1';

const processFn = Lambda<
  { data: string; version: string; url: string; region: string },
  { result: string }
>('arn:aws:lambda:us-east-1:123456789:function:Process');

export const letVarCapture = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    const result = await processFn.call({
      data: input.data,
      version: API_VERSION,
      url: baseUrl,
      region: defaultRegion,
    });
    return { result: result.result };
  },
);
