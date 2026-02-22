// Test fixture: Secrets Manager (stateless service binding)

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { SecretsManager } from '../../../src/runtime/services/SecretsManager';

const secrets = new SecretsManager();

export const secretsTest = Steps.createFunction(
  async (context: SimpleStepContext, input: { secretId: string }) => {
    const secret = await secrets.getSecretValue({ SecretId: input.secretId });
    return { secret };
  },
);
