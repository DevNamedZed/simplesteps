import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, S3, SSM } from '@simplesteps/core/runtime/services';

export class BatchProcessingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Infrastructure
    const processItemFn = new lambda.Function(this, 'ProcessItem', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ processed: true })',
      ),
    });

    const statusFn = new lambda.Function(this, 'CheckStatus', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ done: true, progress: 100 })',
      ),
    });

    const resultsBucket = new s3.Bucket(this, 'ResultsBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Service bindings
    const processItem = Lambda<
      { item: string },
      { processed: boolean }
    >(processItemFn.functionArn);

    const checkStatus = Lambda<
      { batchId: string },
      { done: boolean; progress: number }
    >(statusFn.functionArn);

    const bucket = new S3(resultsBucket.bucketName);
    const params = new SSM();

    // Inline workflow: SSM config → Map(process items) → while(poll status) → S3 write
    const machine = new SimpleStepsStateMachine(this, 'BatchProcessingWorkflow', {
      workflow: Steps.createFunction(
        async (
          context: SimpleStepContext,
          input: { batchId: string; items: string[] },
        ) => {
          const config = await params.getParameter({ Name: '/batch/config' });

          for (const item of input.items) {
            await processItem.call({ item: item });
          }

          let status = await checkStatus.call({ batchId: input.batchId });
          while (!status.done) {
            status = await checkStatus.call({ batchId: input.batchId });
          }

          const resultKey = Steps.format('results/{}/output.json', input.batchId);

          await bucket.putObject({
            Key: resultKey,
            Body: input.batchId,
          });

          return { batchId: input.batchId, resultKey: resultKey };
        },
      ),
    });

    // Permissions
    processItemFn.grantInvoke(machine);
    statusFn.grantInvoke(machine);
    resultsBucket.grantReadWrite(machine);
    machine.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['ssm:GetParameter'],
        resources: ['*'],
      }),
    );
  }
}
