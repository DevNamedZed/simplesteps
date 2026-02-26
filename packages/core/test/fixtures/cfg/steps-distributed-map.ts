// Test fixture: Steps.distributedMap() with S3-based I/O

import { Steps, SimpleStepContext } from '../../../src/runtime/index';

export const distributedMapBasic = Steps.createFunction(
  async (context: SimpleStepContext, input: { bucket: string; prefix: string; items: any[] }) => {
    const results = await Steps.distributedMap(
      input.items,
      async (item) => {
        return { processed: item };
      },
      {
        maxConcurrency: 1000,
        itemReader: {
          Resource: 'arn:aws:states:::s3:getObject',
          ReaderConfig: { InputType: 'CSV' },
          Parameters: { Bucket: input.bucket, Key: 'data.csv' },
        },
        resultWriter: {
          Resource: 'arn:aws:states:::s3:putObject',
          Parameters: { Bucket: input.bucket, Prefix: input.prefix },
        },
        toleratedFailurePercentage: 5,
        label: 'ProcessRecords',
      },
    );

    return { count: results.length };
  },
);
