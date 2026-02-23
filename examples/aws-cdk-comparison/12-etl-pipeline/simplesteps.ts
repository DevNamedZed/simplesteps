// ETL Pipeline — CDK + SimpleSteps
//
// Multi-service ETL: S3 (extract), Lambda (transform), DynamoDB (load),
// S3 (output), SNS (notify).
// Same infrastructure as pure CDK — only the step function definition changes.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, S3, DynamoDB, SNS } from '@simplesteps/core/runtime/services';

export class EtlPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const extractRecordsFn = new lambda.Function(this, 'ExtractRecordsFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/extract-records'),
    });

    const transformRecordFn = new lambda.Function(this, 'TransformRecordFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/transform-record'),
    });

    const sourceBucket = new s3.Bucket(this, 'SourceBucket');
    const outputBucket = new s3.Bucket(this, 'OutputBucket');

    const resultsTable = new dynamodb.Table(this, 'ETLResultsTable', {
      partitionKey: { name: 'batchId', type: dynamodb.AttributeType.STRING },
    });

    const notificationsTopic = new sns.Topic(this, 'ETLNotifications');

    const extractRecords = Lambda<
      { rawData: string },
      { records: Array<{ id: string; data: string }> }
    >(extractRecordsFn.functionArn);

    const transformRecord = Lambda<
      { id: string; data: string },
      { id: string; transformed: string; valid: boolean }
    >(transformRecordFn.functionArn);

    const source = new S3(sourceBucket.bucketName);
    const output = new S3(outputBucket.bucketName);
    const results = new DynamoDB(resultsTable.tableName);
    const notifications = new SNS(notificationsTopic.topicArn);

    const machine = new SimpleStepsStateMachine(this, 'EtlPipelineStateMachine', {
      workflow: Steps.createFunction(
        async (context: SimpleStepContext, input: { sourceKey: string; batchId: string }) => {
          // EXTRACT
          const sourceData = await source.getObject({ Key: input.sourceKey });
          const extracted = await extractRecords.call({ rawData: sourceData.Body });

          // TRANSFORM — process each record (compiles to Map state)
          for (const record of extracted.records) {
            await transformRecord.call({ id: record.id, data: record.data });
          }

          // LOAD
          await results.putItem({
            Item: {
              batchId: { S: input.batchId },
              status: { S: 'COMPLETED' },
            },
          });

          await output.putObject({
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
      ),
    });

    extractRecordsFn.grantInvoke(machine);
    transformRecordFn.grantInvoke(machine);
    sourceBucket.grantRead(machine);
    outputBucket.grantWrite(machine);
    resultsTable.grantWriteData(machine);
    notificationsTopic.grantPublish(machine);
  }
}
