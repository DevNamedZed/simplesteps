// S3 Data Processing — CDK + SimpleSteps
//
// Read from S3, transform with Lambda, write back to S3.
// Same infrastructure as pure CDK — only the step function definition changes.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, S3 } from '@simplesteps/core/runtime/services';

export class S3DataProcessingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const transformFn = new lambda.Function(this, 'TransformFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/transform'),
    });

    const dataBucket = new s3.Bucket(this, 'DataBucket');

    const transformData = Lambda<{ data: string }, { result: string }>(
      transformFn.functionArn,
    );
    const bucket = new S3(dataBucket.bucketName);

    const machine = new SimpleStepsStateMachine(this, 'S3ProcessingStateMachine', {
      workflow: Steps.createFunction(
        async (context: SimpleStepContext, input: { inputKey: string; outputKey: string }) => {
          const source = await bucket.getObject({ Key: input.inputKey });

          const transformed = await transformData.call({ data: source.Body });

          await bucket.putObject({
            Key: input.outputKey,
            Body: transformed.result,
            ContentType: 'application/json',
          });

          const metadata = await bucket.headObject({ Key: input.outputKey });

          return {
            inputKey: input.inputKey,
            outputKey: input.outputKey,
            size: metadata.ContentLength,
          };
        },
      ),
    });

    transformFn.grantInvoke(machine);
    dataBucket.grantReadWrite(machine);
  }
}
