// Distributed Map
//
// Process large datasets (up to 10,000 concurrent iterations) with S3-based
// input/output. Compiles to ASL Map with ProcessorConfig Mode: DISTRIBUTED.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const processRecord = Lambda<{ record: any }, { result: string }>(
  'arn:aws:lambda:us-east-1:123456789012:function:ProcessRecord'
);

export const distributedMapWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { bucket: string; items: any[] }) => {
    const results = await Steps.distributedMap(
      input.items,
      async (item) => {
        const result = await processRecord.call({ record: item });
        return { processed: result.result };
      },
      {
        maxConcurrency: 1000,
        executionType: 'EXPRESS',
        itemReader: {
          Resource: 'arn:aws:states:::s3:getObject',
          ReaderConfig: { InputType: 'CSV' },
          Parameters: { Bucket: input.bucket, Key: 'data.csv' },
        },
        resultWriter: {
          Resource: 'arn:aws:states:::s3:putObject',
          Parameters: { Bucket: input.bucket, Prefix: 'results/' },
        },
        toleratedFailurePercentage: 5,
        label: 'ProcessRecords',
      },
    );

    return { processed: results.length };
  },
);
