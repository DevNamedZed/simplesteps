// Secrets Manager
//
// SecretsManager is a stateless service binding — no constructor argument
// needed. The user provides SecretId and other parameters directly in the
// method call.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { SecretsManager } from '../../packages/core/src/runtime/services/SecretsManager';

const secrets = new SecretsManager();

export const secretsExample = Steps.createFunction(
  async (context: SimpleStepContext, input: { secretId: string }) => {
    const secret = await secrets.getSecretValue({ SecretId: input.secretId });
    return { secret };
  },
);
