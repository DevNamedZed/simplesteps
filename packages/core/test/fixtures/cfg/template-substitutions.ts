// Test fixture: Deploy-time substitutions
//
// This fixture uses placeholder ARNs that can be overridden via the
// substitutions option on compile(). Used to test CDK-style deploy-time
// value injection.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';
import { DynamoDB } from '../../../src/runtime/services/DynamoDB';

const myLambda = Lambda<{ id: string }, { result: string }>('placeholder-arn');
const myTable = new DynamoDB('placeholder-table');

export const substitutionTest = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const result = await myLambda.call({ id: input.id });
    await myTable.putItem({ Item: { id: input.id, data: result.result } });
    return { success: true };
  },
);
