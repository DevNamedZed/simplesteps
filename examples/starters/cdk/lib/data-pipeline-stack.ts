import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, S3 } from '@simplesteps/core/runtime/services';

export class DataPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Infrastructure
    const transformFn = new lambda.Function(this, 'TransformData', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ transformed: e.records, count: 42 })',
      ),
      timeout: cdk.Duration.minutes(5),
      memorySize: 1024,
    });

    const dataBucket = new s3.Bucket(this, 'DataBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Service bindings
    const transform = Lambda<
      { records: string; format: string },
      { transformed: string; count: number }
    >(transformFn.functionArn);

    const bucket = new S3(dataBucket.bucketName);

    // Inline workflow: S3 read → Lambda transform → S3 write
    const machine = new SimpleStepsStateMachine(this, 'DataPipelineWorkflow', {
      workflow: Steps.createFunction(
        async (
          context: SimpleStepContext,
          input: { inputKey: string; outputKey: string; format: string },
        ) => {
          const rawData = await bucket.getObject<{ Body: string }>({ Key: input.inputKey });

          const result = await transform.call({
            records: rawData.Body,
            format: input.format,
          });

          await bucket.putObject({
            Key: input.outputKey,
            Body: result.transformed,
          });

          return {
            inputKey: input.inputKey,
            outputKey: input.outputKey,
            recordCount: result.count,
          };
        },
      ),
    });

    // Permissions
    transformFn.grantInvoke(machine);
    dataBucket.grantReadWrite(machine);
  }
}
