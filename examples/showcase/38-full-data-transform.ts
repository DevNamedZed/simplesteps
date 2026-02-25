// Full Data Transformation Pipeline
//
// A realistic workflow that fetches order data, then uses pure
// TypeScript to filter, transform, aggregate, and format the
// results — all compiled to JSONata expressions in a single state.
//
// This combines: Lambda call, .filter(), .map(), .reduce(),
// Math.round(), string methods, typeof, and template literals.
//
// Works with both JSONata (default) and JSONPath backends.
// Use --query-language jsonpath to switch. (Note: filter/map/reduce
// and string/math methods require JSONata; the Lambda call and
// template literals work in both modes.)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const fetchOrders = Lambda<
  { region: string },
  { orders: Array<{ product: string; quantity: number; unitPrice: number; shipped: boolean }> }
>('arn:aws:lambda:us-east-1:123:function:FetchOrders');

const sendReport = Lambda<{ report: string; total: number; count: number }, { sent: boolean }>(
  'arn:aws:lambda:us-east-1:123:function:SendReport',
);

export const fullDataTransform = Steps.createFunction(
  async (context: SimpleStepContext, input: { region: string }) => {
    // 1. Fetch raw order data from Lambda
    const data = await fetchOrders.call({ region: input.region });

    // 2. Filter to shipped orders only → $filter(...)
    const shipped = data.orders.filter(o => o.shipped);

    // 3. Extract product names → $map(...)
    const products = shipped.map(o => o.product);

    // 4. Calculate total revenue → $reduce(...)
    const revenue = shipped.reduce((sum, o) => sum + o.quantity * o.unitPrice, 0);

    // 5. Round to whole dollars → $round(...)
    const roundedRevenue = Math.round(revenue);

    // 6. Count shipped orders
    const shippedCount = shipped.length;

    // 7. Build a comma-separated product list → $join(...)
    const productList = products.join(', ');

    // 8. Format the summary → States.Format
    const summary = `Shipped ${shippedCount} orders (${productList}) for $${roundedRevenue}`;

    // 9. Send the report to another Lambda
    const confirmation = await sendReport.call({
      report: summary,
      total: roundedRevenue,
      count: shippedCount,
    });

    return { summary, confirmation };
  },
);
