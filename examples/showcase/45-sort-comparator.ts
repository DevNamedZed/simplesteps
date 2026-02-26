// .sort(comparator) — Custom Array Sorting (JSONata)
//
// In JSONata mode, .sort() supports custom comparator functions:
//   arr.sort((a, b) => a.field - b.field)
//   → $sort(arr, function($a, $b) { $a.field < $b.field })
//
// The subtraction pattern (a - b) is recognized and compiled
// to the JSONata less-than comparator automatically.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const getEmployees = Lambda<
  { department: string },
  { employees: { name: string; salary: number; startDate: string }[] }
>('arn:aws:lambda:us-east-1:123:function:GetEmployees');

export const sortComparator = Steps.createFunction(
  async (context: SimpleStepContext, input: { department: string }) => {
    const data = await getEmployees.call({ department: input.department });

    // Sort by salary (ascending) — natural JS comparator syntax
    const bySalary = data.employees.sort((a, b) => a.salary - b.salary);

    // Bare .sort() also works (lexicographic)
    const byName = data.employees.sort();

    return { bySalary, byName };
  },
);
