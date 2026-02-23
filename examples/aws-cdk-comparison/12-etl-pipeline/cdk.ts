// ETL Pipeline — AWS CDK
//
// Multi-service ETL: S3 (extract), Lambda (transform), DynamoDB (load),
// S3 (output), SNS (notify). Requires CustomState for every S3 and
// DynamoDB operation, plus Map state for iteration.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class EtlPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create resources
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

    // EXTRACT — S3 getObject (requires CustomState)
    const readSource = new sfn.CustomState(this, 'Read Source Data', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::aws-sdk:s3:getObject',
        Parameters: {
          Bucket: sourceBucket.bucketName,
          'Key.$': '$.sourceKey',
        },
        ResultPath: '$.sourceData',
      },
    });

    // Parse raw data into records
    const extractRecords = new tasks.LambdaInvoke(this, 'Extract Records', {
      lambdaFunction: extractRecordsFn,
      payload: sfn.TaskInput.fromObject({
        'rawData.$': '$.sourceData.Body',
      }),
      resultPath: '$.extracted',
      outputPath: '$.extracted.Payload',
    });

    // TRANSFORM — Map state to process each record
    const transformMap = new sfn.Map(this, 'Transform Each Record', {
      itemsPath: '$.records',
      resultPath: '$.transformResults',
    });

    transformMap.itemProcessor(
      new tasks.LambdaInvoke(this, 'Transform Record', {
        lambdaFunction: transformRecordFn,
        outputPath: '$.Payload',
      }),
    );

    // LOAD — DynamoDB putItem (requires CustomState)
    const saveResults = new sfn.CustomState(this, 'Save Results', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::dynamodb:putItem',
        Parameters: {
          TableName: resultsTable.tableName,
          Item: {
            'batchId': { 'S.$': '$.batchId' },
            'status': { 'S': 'COMPLETED' },
          },
        },
        ResultPath: null,
      },
    });

    // S3 putObject for output (requires CustomState)
    const writeOutput = new sfn.CustomState(this, 'Write Output', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::aws-sdk:s3:putObject',
        Parameters: {
          Bucket: outputBucket.bucketName,
          'Key.$': "States.Format('output/{}/results.json', $.batchId)",
          'Body.$': '$.sourceKey',
          ContentType: 'application/json',
        },
        ResultPath: null,
      },
    });

    // NOTIFY — SNS publish
    const notifyComplete = new tasks.SnsPublish(this, 'Notify Completion', {
      topic: notificationsTopic,
      subject: 'ETL Pipeline Complete',
      message: sfn.TaskInput.fromObject({
        'batchId.$': '$.batchId',
        'status': 'COMPLETED',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    // Wire up the pipeline
    const definition = readSource
      .next(extractRecords)
      .next(transformMap)
      .next(saveResults)
      .next(writeOutput)
      .next(notifyComplete)
      .next(new sfn.Succeed(this, 'ETL Complete'));

    // Create the state machine
    const stateMachine = new sfn.StateMachine(this, 'EtlPipelineStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
    });

    // Grant permissions — manual for CustomState operations
    extractRecordsFn.grantInvoke(stateMachine);
    transformRecordFn.grantInvoke(stateMachine);
    sourceBucket.grantRead(stateMachine);
    outputBucket.grantWrite(stateMachine);
    resultsTable.grantWriteData(stateMachine);
    notificationsTopic.grantPublish(stateMachine);
  }
}
