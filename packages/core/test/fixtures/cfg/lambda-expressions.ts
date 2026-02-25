import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const myLambda = Lambda<{ data: string }, { items: Array<{ name: string; active: boolean; price: number; id: string; valid: boolean }> }>(
  'arn:aws:lambda:us-east-1:123:function:MyFunc',
);

// Test: Pure expression lambdas compiled to JSONata $map/$filter/$reduce
export const lambdaExpressions = Steps.createFunction(
  async (context: SimpleStepContext, input: { targetId: string }) => {
    const result = await myLambda.call({ data: 'test' });

    // arr.map(fn) → $map(arr, function($item) { $item.name })
    const names = result.items.map(item => item.name);

    // arr.filter(fn) → $filter(arr, function($item) { $item.active })
    const active = result.items.filter(item => item.active);

    // arr.reduce(fn, init) → $reduce(arr, function($acc, $item) { $acc + $item.price }, 0)
    const total = result.items.reduce((acc, item) => acc + item.price, 0);

    // arr.find(fn) → $filter(arr, function($item) { ... })[0]
    const found = result.items.find(item => item.id === input.targetId);

    // arr.some(fn) → $count($filter(arr, fn)) > 0
    const hasActive = result.items.some(item => item.active);

    // arr.every(fn) → $count($filter(arr, fn)) = $count(arr)
    const allValid = result.items.every(item => item.valid);

    // typeof → $type()
    const t = typeof input.targetId;

    return { names, active, total, found, hasActive, allValid, t };
  },
);
