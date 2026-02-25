// Lambda Expressions — Higher-Order Array Functions
//
// When a callback is a pure expression (no awaits), the compiler
// converts it to a JSONata higher-order function. If the callback
// contains awaits or service calls, use Steps.map() instead
// (see 31-steps-map.ts).
//
// Query Language: JSONata (default)
//
// These methods require JSONata mode. To compile with JSONPath instead
// (where these would be errors), use:
//   simplesteps compile 37-lambda-expressions.ts --query-language jsonpath
//
// Or programmatically:
//   compile({ sourceFiles: ['37-lambda-expressions.ts'], queryLanguage: 'JSONPath' })
//
// Mapping table:
//   arr.map(v => expr)          → $map(arr, function($v) { expr })
//   arr.filter(v => pred)       → $filter(arr, function($v) { pred })
//   arr.reduce((a, v) => e, i)  → $reduce(arr, function($a, $v) { e }, i)
//   arr.find(v => pred)         → $filter(arr, function($v) { pred })[0]
//   arr.some(v => pred)         → $count($filter(arr, function($v) { pred })) > 0
//   arr.every(v => pred)        → $count($filter(arr, function($v) { pred })) = $count(arr)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const getOrders = Lambda<
  { customerId: string },
  { orders: Array<{ id: string; status: string; amount: number; priority: boolean }> }
>('arn:aws:lambda:us-east-1:123:function:GetOrders');

export const lambdaExpressions = Steps.createFunction(
  async (context: SimpleStepContext, input: { customerId: string; targetOrderId: string }) => {
    const result = await getOrders.call({ customerId: input.customerId });

    // map → $map(arr, function($order) { $order.id })
    const orderIds = result.orders.map(order => order.id);

    // filter → $filter(arr, function($order) { $order.status = 'active' })
    const activeOrders = result.orders.filter(order => order.status === 'active');

    // reduce → $reduce(arr, function($sum, $order) { $sum + $order.amount }, 0)
    const totalSpend = result.orders.reduce((sum, order) => sum + order.amount, 0);

    // find → $filter(arr, function($order) { $order.id = targetOrderId })[0]
    const targetOrder = result.orders.find(order => order.id === input.targetOrderId);

    // some → $count($filter(arr, function($order) { $order.priority })) > 0
    const hasPriority = result.orders.some(order => order.priority);

    // every → $count($filter(arr, function($order) { $order.amount > 0 })) = $count(arr)
    const allPaid = result.orders.every(order => order.amount > 0);

    return { orderIds, activeOrders, totalSpend, targetOrder, hasPriority, allPaid };
  },
);
