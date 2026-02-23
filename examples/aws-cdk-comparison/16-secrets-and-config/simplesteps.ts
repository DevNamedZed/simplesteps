// Secrets & Config — SimpleSteps
//
// Retrieve secrets from Secrets Manager and config from SSM Parameter Store,
// then use them in a Lambda call.
// When installed via npm, use: import { Steps } from '@simplesteps/core/runtime'

import { Steps, SimpleStepContext } from '../../../packages/core/src/runtime/index';
import { Lambda } from '../../../packages/core/src/runtime/services/Lambda';
import { SecretsManager } from '../../../packages/core/src/runtime/services/SecretsManager';
import { SSM } from '../../../packages/core/src/runtime/services/SSM';

const callExternalApi = Lambda<
  { apiKey: string; endpoint: string },
  { statusCode: number; body: string }
>('arn:aws:lambda:us-east-1:123456789:function:CallExternalApi');

const secrets = new SecretsManager();
const config = new SSM();

export const secretsAndConfig = Steps.createFunction(
  async (context: SimpleStepContext, input: { endpoint: string }) => {
    const secret = await secrets.getSecretValue({
      SecretId: 'prod/external-api-key',
    });

    const flags = await config.getParameter({
      Name: '/myapp/config/feature-flags',
      WithDecryption: true,
    });

    const response = await callExternalApi.call({
      apiKey: secret.SecretString,
      endpoint: input.endpoint,
    });

    return {
      statusCode: response.statusCode,
      body: response.body,
    };
  },
);
