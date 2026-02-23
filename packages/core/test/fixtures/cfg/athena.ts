// Test fixture: Athena query workflow
//
// Starts a query, gets execution details, and retrieves results.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Athena } from '../../../src/runtime/services/Athena';

const athena = new Athena();

export const athenaWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { query: string; database: string }) => {
    const execution = await athena.startQueryExecution({
      QueryString: input.query,
      QueryExecutionContext: { Database: input.database },
      ResultConfiguration: { OutputLocation: 's3://query-results/' },
    });

    const results = await athena.getQueryResults({
      QueryExecutionId: execution,
    });

    return { results };
  },
);
