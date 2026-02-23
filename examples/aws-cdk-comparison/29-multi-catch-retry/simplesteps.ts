// Multi-Catch with Retry — SimpleSteps
//
// Typed error handling with retry policies and different recovery
// strategies per error type.
// When installed via npm, use: import { Steps } from '@simplesteps/core/runtime'

import {
  Steps,
  SimpleStepContext,
  TimeoutError,
  TaskFailedError,
  PermissionsError,
} from '../../../packages/core/src/runtime/index';
import { Lambda } from '../../../packages/core/src/runtime/services/Lambda';
import { SNS } from '../../../packages/core/src/runtime/services/SNS';

const callExternalApi = Lambda<
  { endpoint: string; payload: string },
  { statusCode: number; body: string }
>('arn:aws:lambda:us-east-1:123456789:function:CallExternalApi');

const fallbackService = Lambda<
  { endpoint: string },
  { body: string }
>('arn:aws:lambda:us-east-1:123456789:function:FallbackService');

const alerts = new SNS('arn:aws:sns:us-east-1:123456789:OperationalAlerts');

export const multiCatchRetry = Steps.createFunction(
  async (context: SimpleStepContext, input: { endpoint: string; payload: string }) => {
    try {
      const response = await callExternalApi.call(
        { endpoint: input.endpoint, payload: input.payload },
        {
          retry: {
            errorEquals: ['States.TaskFailed', 'States.Timeout'],
            intervalSeconds: 2,
            maxAttempts: 3,
            backoffRate: 2,
          },
        },
      );

      return { status: 'SUCCESS', body: response.body };
    } catch (e) {
      if (e instanceof TimeoutError) {
        const fallback = await fallbackService.call({ endpoint: input.endpoint });
        return { status: 'FALLBACK', body: fallback.body };
      } else if (e instanceof PermissionsError) {
        await alerts.publish(
          { error: 'PERMISSIONS', endpoint: input.endpoint },
          { subject: 'Permission Denied' },
        );
        return { status: 'PERMISSION_DENIED', body: '' };
      } else {
        await alerts.publish(
          { error: 'UNKNOWN', endpoint: input.endpoint },
          { subject: 'Workflow Error' },
        );
        return { status: 'ERROR', body: '' };
      }
    }
  },
);
