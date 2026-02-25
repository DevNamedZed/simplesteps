// Array Methods & Object Utilities
//
// Array methods and Object utilities that compile to JSONata
// built-in functions for data manipulation.
//
// Query Language: JSONata (default)
//
// These methods require JSONata mode. To compile with JSONPath instead
// (where these would be errors), use:
//   simplesteps compile 36-array-methods.ts --query-language jsonpath
//
// Or programmatically:
//   compile({ sourceFiles: ['36-array-methods.ts'], queryLanguage: 'JSONPath' })
//
// Mapping table:
//   arr.join(delim)          → $join(arr, delim)
//   arr.reverse()            → $reverse(arr)
//   arr.sort()               → $sort(arr)
//   arr.concat(b)            → $append(arr, b)
//   arr.length               → $count(arr)      [also: States.ArrayLength in JSONPath]
//   arr.includes(val)        → States.ArrayContains(arr, val)  [works in both modes]
//   Object.keys(o)           → $keys(o)
//   Object.values(o)         → $lookup(o, $keys(o))

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const getInventory = Lambda<
  { warehouse: string },
  { items: string[]; backorder: string[]; metadata: Record<string, string> }
>('arn:aws:lambda:us-east-1:123:function:GetInventory');

export const arrayMethods = Steps.createFunction(
  async (context: SimpleStepContext, input: { warehouse: string; requiredItem: string }) => {
    const inv = await getInventory.call({ warehouse: input.warehouse });

    // Join → $join(arr, delim)
    const itemList = inv.items.join(', ');

    // Reverse → $reverse(arr)
    const reversed = inv.items.reverse();

    // Sort → $sort(arr)
    const sorted = inv.items.sort();

    // Concat → $append(arr, arr)
    const allItems = inv.items.concat(inv.backorder);

    // Length → $count(arr)
    const totalCount = inv.items.length;

    // Includes → States.ArrayContains (works in both modes)
    const inStock = inv.items.includes(input.requiredItem);

    // Object.keys → $keys(o)
    const metaKeys = Object.keys(inv.metadata);

    // Object.values → $lookup(o, $keys(o))
    const metaValues = Object.values(inv.metadata);

    return {
      itemList,
      reversed,
      sorted,
      allItems,
      totalCount,
      inStock,
      metaKeys,
      metaValues,
    };
  },
);
