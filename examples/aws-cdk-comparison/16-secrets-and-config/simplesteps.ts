// Secrets & Config — SimpleSteps
//
// Retrieve secrets from Secrets Manager and config from SSM Parameter Store,
// then use them in a Lambda call.

import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';
import { SecretsManager } from '@simplesteps/core/runtime/services';
import { SSM } from '@simplesteps/core/runtime/services';

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
