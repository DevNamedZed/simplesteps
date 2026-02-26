// Cross-Account Credentials
//
// Task states support Credentials for cross-account execution.
// The RoleArn is included in the ASL Credentials field.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const crossAccountFn = Lambda<{ data: string }, { result: string }>(
  'arn:aws:lambda:us-east-1:999999999999:function:CrossAccountFn'
);

export const crossAccountWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    const result = await crossAccountFn.call(
      { data: input.data },
      { credentials: { RoleArn: 'arn:aws:iam::999999999999:role/CrossAccountRole' } },
    );

    return { result: result.result };
  },
);
