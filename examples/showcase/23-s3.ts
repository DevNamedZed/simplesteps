// S3 Bucket Operations
//
// The S3 service binding provides getObject, putObject, deleteObject,
// copyObject, and listObjects. The bucket name from the constructor
// is automatically injected as the Bucket parameter.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { S3 } from '../../packages/core/src/runtime/services/S3';

const dataBucket = new S3('my-data-bucket');

export const s3Operations = Steps.createFunction(
  async (context: SimpleStepContext, input: { key: string; body: string }) => {
    await dataBucket.putObject({ Key: input.key, Body: input.body });
    const data = await dataBucket.getObject({ Key: input.key });
    return { data };
  },
);
