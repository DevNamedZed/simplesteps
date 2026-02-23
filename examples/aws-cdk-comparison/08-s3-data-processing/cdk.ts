// S3 Data Processing — AWS CDK
//
// Read from S3, transform with Lambda, write back to S3.
// CDK has no S3 task constructs — every S3 operation requires
// CustomState with raw ASL JSON using the aws-sdk integration.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class S3DataProcessingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create resources
    const transformFn = new lambda.Function(this, 'TransformFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/transform'),
    });

    const dataBucket = new s3.Bucket(this, 'DataBucket');

    // S3 getObject — requires CustomState (no CDK construct)
    const readInput = new sfn.CustomState(this, 'Read Input', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::aws-sdk:s3:getObject',
        Parameters: {
          Bucket: dataBucket.bucketName,
          'Key.$': '$.inputKey',
        },
        ResultPath: '$.sourceData',
      },
    });

    // Lambda transform — CDK does have a construct for this
    const transform = new tasks.LambdaInvoke(this, 'Transform Data', {
      lambdaFunction: transformFn,
      payload: sfn.TaskInput.fromObject({
        'data.$': '$.sourceData.Body',
      }),
      outputPath: '$.Payload',
      resultPath: '$.transformed',
    });

    // S3 putObject — requires CustomState (no CDK construct)
    const writeOutput = new sfn.CustomState(this, 'Write Output', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::aws-sdk:s3:putObject',
        Parameters: {
          Bucket: dataBucket.bucketName,
          'Key.$': '$.outputKey',
          'Body.$': '$.transformed.result',
          ContentType: 'application/json',
        },
        ResultPath: null,
      },
    });

    // S3 headObject — requires CustomState (no CDK construct)
    const verifyOutput = new sfn.CustomState(this, 'Verify Output', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::aws-sdk:s3:headObject',
        Parameters: {
          Bucket: dataBucket.bucketName,
          'Key.$': '$.outputKey',
        },
        ResultPath: '$.metadata',
      },
    });

    // Wire up
    const definition = readInput
      .next(transform)
      .next(writeOutput)
      .next(verifyOutput)
      .next(new sfn.Succeed(this, 'Done'));

    // Create the state machine
    const stateMachine = new sfn.StateMachine(this, 'S3ProcessingStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
    });

    // Grant permissions — manual for CustomState S3 operations
    transformFn.grantInvoke(stateMachine);
    dataBucket.grantReadWrite(stateMachine);
  }
}
