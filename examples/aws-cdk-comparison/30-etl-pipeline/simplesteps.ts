// ETL Pipeline — SimpleSteps
//
// Extract from S3, transform each record with Lambda, load to DynamoDB,
// write output to S3, notify completion.

import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';
import { S3 } from '@simplesteps/core/runtime/services';
import { DynamoDB } from '@simplesteps/core/runtime/services';
import { SNS } from '@simplesteps/core/runtime/services';

const extractRecords = Lambda<
  { rawData: string },
  { records: Array<{ id: string; data: string }> }
>('arn:aws:lambda:us-east-1:123456789:function:ExtractRecords');

const transformRecord = Lambda<
  { id: string; data: string },
  { id: string; transformed: string; valid: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:TransformRecord');

const sourceBucket = new S3('etl-source-bucket');
const outputBucket = new S3('etl-output-bucket');
const resultsTable = new DynamoDB('ETLResultsTable');
const notifications = new SNS('arn:aws:sns:us-east-1:123456789:ETLNotifications');

export const etlPipeline = Steps.createFunction(
  async (context: SimpleStepContext, input: { sourceKey: string; batchId: string }) => {
    // EXTRACT
    const sourceData = await sourceBucket.getObject({ Key: input.sourceKey });
    const extracted = await extractRecords.call({ rawData: sourceData.Body });

    // TRANSFORM — process each record (compiles to Map state)
    for (const record of extracted.records) {
      await transformRecord.call({ id: record.id, data: record.data });
    }

    // LOAD
    await resultsTable.putItem({
      Item: {
        batchId: { S: input.batchId },
        status: { S: 'COMPLETED' },
      },
    });

    await outputBucket.putObject({
      Key: Steps.format('output/{}/results.json', input.batchId),
      Body: input.sourceKey,
      ContentType: 'application/json',
    });

    // NOTIFY
    await notifications.publish(
      { batchId: input.batchId, status: 'COMPLETED' },
      { subject: 'ETL Pipeline Complete' },
    );

    return { batchId: input.batchId, status: 'COMPLETED' };
  },
);
