// Test fixture: S3 bucket operations

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { S3 } from '../../../src/runtime/services/S3';

const dataBucket = new S3('my-data-bucket');

export const s3Test = Steps.createFunction(
  async (context: SimpleStepContext, input: { key: string; body: string }) => {
    await dataBucket.putObject({ Key: input.key, Body: input.body });
    const data = await dataBucket.getObject({ Key: input.key });
    return { data };
  },
);
