// Test fixture: Credentials on Task states (cross-account execution)

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const crossAccountFn = Lambda<{ data: string }, { result: string }>(
  'arn:aws:lambda:us-east-1:999999999999:function:CrossAccountFn'
);

export const credentialsTest = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    const result = await crossAccountFn.call(
      { data: input.data },
      { credentials: { RoleArn: 'arn:aws:iam::999999999999:role/CrossAccountRole' } },
    );

    return { result: result.result };
  },
);
