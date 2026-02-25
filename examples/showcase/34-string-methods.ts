// String Methods
//
// Standard JavaScript string methods compile directly to JSONata
// built-in functions — no States.* intrinsics needed.
//
// Query Language: JSONata (default)
//
// These methods require JSONata mode. To compile with JSONPath instead
// (where these would be errors), use:
//   simplesteps compile 34-string-methods.ts --query-language jsonpath
//
// Or programmatically:
//   compile({ sourceFiles: ['34-string-methods.ts'], queryLanguage: 'JSONPath' })
//
// Mapping table:
//   str.toUpperCase()        → $uppercase(str)
//   str.toLowerCase()        → $lowercase(str)
//   str.trim()               → $trim(str)
//   str.substring(s, e)      → $substring(str, s, e - s)
//   str.padStart(n, ch)      → $pad(str, -n, ch)
//   str.padEnd(n, ch)        → $pad(str, n, ch)
//   str.replace(old, new)    → $replace(str, old, new)
//   str.charAt(i)            → $substring(str, i, 1)
//   str.startsWith(prefix)   → $substring(str, 0, $length(prefix)) = prefix
//   str.endsWith(suffix)     → comparison via $substring + $length
//   str.repeat(n)            → $join($map([1..n], function() { str }))
//   str.length               → $length(str)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const lookupUser = Lambda<{ userId: string }, { name: string; email: string; bio: string; code: string }>(
  'arn:aws:lambda:us-east-1:123:function:LookupUser',
);

export const stringMethods = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string; prefix: string }) => {
    const user = await lookupUser.call({ userId: input.userId });

    // Case conversion → $uppercase / $lowercase
    const displayName = user.name.toUpperCase();
    const emailNorm = user.email.toLowerCase();

    // Whitespace → $trim
    const cleanBio = user.bio.trim();

    // Substring → $substring(str, start, length)
    const preview = user.bio.substring(0, 50);

    // Padding → $pad (negative width = padStart)
    const paddedCode = user.code.padStart(8, '0');
    const paddedName = user.name.padEnd(20, ' ');

    // Replace → $replace
    const sanitized = user.bio.replace(' ', '-');

    // charAt → $substring(str, i, 1)
    const initial = user.name.charAt(0);

    // Prefix/suffix checks → composed $substring + $length
    const isInternal = user.email.startsWith(input.prefix);
    const isGmail = user.email.endsWith('@gmail.com');

    // Repeat → $join($map([1..n], function() { str }))
    const separator = user.code.repeat(3);

    // Length → $length
    const nameLen = user.name.length;

    return {
      displayName,
      emailNorm,
      cleanBio,
      preview,
      paddedCode,
      paddedName,
      sanitized,
      initial,
      separator,
      isInternal,
      isGmail,
      nameLen,
    };
  },
);
