// Test fixture: CDK batch processing workflow
//
// Demonstrates: for-of (Map state), while loop (Choice state loop),
// SSM parameter store, and Steps.format intrinsic.
// Uses placeholder values for CDK substitution.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';
import { S3 } from '../../../src/runtime/services/S3';
import { SSM } from '../../../src/runtime/services/SSM';

const processItem = Lambda<
  { item: string },
  { processed: boolean }
>('placeholder-process-arn');

const checkStatus = Lambda<
  { batchId: string },
  { done: boolean; progress: number }
>('placeholder-status-arn');

const resultsBucket = new S3('placeholder-results-bucket');
const params = new SSM();

export const batchProcessing = Steps.createFunction(
  async (
    context: SimpleStepContext,
    input: { batchId: string; items: string[] },
  ) => {
    // SSM → aws-sdk:ssm:getParameter
    const config = await params.getParameter({ Name: '/batch/config' });

    // for-of → Map state
    for (const item of input.items) {
      await processItem.call({ item: item });
    }

    // while loop → Choice state loop
    let status = await checkStatus.call({ batchId: input.batchId });
    while (!status.done) {
      status = await checkStatus.call({ batchId: input.batchId });
    }

    // Steps.format → States.Format intrinsic
    const resultKey = Steps.format('results/{}/output.json', input.batchId);

    // S3 write — Body simplified; JSON.stringify() is not supported by the compiler
    await resultsBucket.putObject({
      Key: resultKey,
      Body: input.batchId,
    });

    return { batchId: input.batchId, resultKey: resultKey };
  },
);
