import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';

const fetchRecords = Lambda<
  { source: string; limit: number },
  { records: Array<{ id: string; value: number }> }
>('arn:aws:lambda:us-east-1:123456789:function:FetchRecords');

const transformBatch = Lambda<
  { records: Array<{ id: string; value: number }> },
  { results: Array<{ id: string; result: number }> }
>('arn:aws:lambda:us-east-1:123456789:function:TransformBatch');

const writeBatch = Lambda<
  { items: Array<{ id: string; result: number }> },
  { written: number }
>('arn:aws:lambda:us-east-1:123456789:function:WriteBatch');

/**
 * Data pipeline workflow:
 * 1. Fetch records from a source
 * 2. Transform the batch
 * 3. Write the transformed records
 *
 * Demonstrates a sequential multi-step Lambda pipeline.
 */
export const dataPipeline = Steps.createFunction(
  async (context: SimpleStepContext, input: { source: string; limit: number }) => {
    const data = await fetchRecords.call({
      source: input.source,
      limit: input.limit,
    });

    const transformed = await transformBatch.call({
      records: data.records,
    });

    const writeResult = await writeBatch.call({
      items: transformed.results,
    });

    return {
      source: input.source,
      recordCount: data.records.length,
      writtenCount: writeResult.written,
    };
  },
);
