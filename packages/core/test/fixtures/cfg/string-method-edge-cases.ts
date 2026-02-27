// String method edge cases (JSONata mode)
//
// Tests:
// - arr.join() with no args → $join(arr, ',')  (comma default)
// - str.replace('a', 'b') → $replace(str, 'a', 'b', 1)  (limit first)
// - str.includes('x') → $contains(str, 'x')
// - Backslash in string literal → properly escaped in JSONata

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const myFn = Lambda<any, { items: string[]; text: string }>(
  'arn:aws:lambda:us-east-1:123:function:myFn',
);

export const stringMethodTests = Steps.createFunction(
  async (context: SimpleStepContext, input: any) => {
    const result = await myFn.call(input);

    // Join with no separator (should use comma default)
    const joined = result.items.join();

    // Replace first occurrence only
    const replaced = result.text.replace('old', 'new');

    // String includes check
    const hasX = result.text.includes('hello');

    // Backslash in string literal
    const withBackslash = result.text.replace('\\n', ' ');

    return { joined, replaced, hasX, withBackslash };
  },
);
