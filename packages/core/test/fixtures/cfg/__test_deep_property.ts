// Test fixture: Deep property access on service call result
//
// Verifies: Does result.nested.field resolve to $.result.nested.field via JSONPath
// inside a step function body? The variableResolver.ts line 263 recursively chains
// property access on jsonpath bases.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { SecretsManager } from '../../../src/runtime/services/SecretsManager';

const secrets = new SecretsManager();

export const deepPropertyTest = Steps.createFunction(
  async (context: SimpleStepContext, input: { secretId: string }) => {
    const apiKeySecret = await secrets.getSecretValue({
      SecretId: input.secretId,
    });

    // Deep property access — should resolve to $.apiKeySecret.SecretString via JSONPath
    return {
      secretValue: apiKeySecret.SecretString,
    };
  },
);
