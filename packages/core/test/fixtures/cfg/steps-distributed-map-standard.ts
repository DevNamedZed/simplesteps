// Test fixture: Steps.distributedMap() with executionType: 'STANDARD'

import { Steps, SimpleStepContext } from '../../../src/runtime/index';

export const distributedMapStandard = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: any[] }) => {
    const results = await Steps.distributedMap(
      input.items,
      async (item) => {
        return { processed: item };
      },
      {
        executionType: 'STANDARD',
        maxConcurrency: 100,
        label: 'StandardExec',
      },
    );

    return { count: results.length };
  },
);

export const distributedMapExpress = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: any[] }) => {
    const results = await Steps.distributedMap(
      input.items,
      async (item) => {
        return { done: item };
      },
      {
        executionType: 'EXPRESS',
        label: 'ExpressExec',
      },
    );

    return { count: results.length };
  },
);
