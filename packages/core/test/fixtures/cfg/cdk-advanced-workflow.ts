// Test fixture: CDK advanced workflow
//
// Demonstrates: try/catch, Promise.all, Steps.delay, Steps.uuid,
// template literals, constants, and SecretsManager.
// Uses placeholder values for CDK substitution.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';
import { DynamoDB } from '../../../src/runtime/services/DynamoDB';
import { SNS } from '../../../src/runtime/services/SNS';
import { SecretsManager } from '../../../src/runtime/services/SecretsManager';

const validateOrder = Lambda<
  { orderId: string },
  { valid: boolean; total: number }
>('placeholder-validate-arn');

const checkInventory = Lambda<
  { orderId: string },
  { inStock: boolean }
>('placeholder-inventory-arn');

const ordersTable = new DynamoDB('placeholder-orders-table');
const notifications = new SNS('placeholder-topic-arn');
const secrets = new SecretsManager();

const MAX_RETRIES = 3;

export const advancedWorkflow = Steps.createFunction(
  async (
    context: SimpleStepContext,
    input: { orderId: string; customerId: string },
  ) => {
    // Steps.uuid → States.UUID() intrinsic
    const correlationId = Steps.uuid();

    // SecretsManager → aws-sdk:secretsmanager:getSecretValue
    // Result fields ARE accessible via JSONPath (e.g., apiKeySecret.SecretString
    // compiles to $.apiKeySecret.SecretString). Not used here because this
    // workflow only needs the secret retrieval as a side effect.
    const apiKeySecret = await secrets.getSecretValue({
      SecretId: 'prod/api-key',
    });

    // Promise.all → Parallel state with 2 branches
    const [validation, inventory] = await Promise.all([
      validateOrder.call({ orderId: input.orderId }),
      checkInventory.call({ orderId: input.orderId }),
    ]);

    // try/catch → Catch block on Task state
    try {
      await ordersTable.putItem({
        orderId: input.orderId,
        customerId: input.customerId,
        total: validation.total,
        status: 'CONFIRMED',
        correlationId: correlationId,
        maxRetries: MAX_RETRIES,
      });
    } catch (e) {
      await notifications.publish({
        event: 'ORDER_SAVE_FAILED',
        orderId: input.orderId,
        error: 'Failed to save order',
      });
      return { status: 'FAILED', orderId: input.orderId };
    }

    // Steps.delay → Wait state
    Steps.delay({ seconds: 10 });

    // Template literal → States.Format intrinsic
    const message = `Order ${input.orderId} processed for customer ${input.customerId}`;
    await notifications.publish({
      event: 'ORDER_CONFIRMED',
      orderId: input.orderId,
      message: message,
    });

    return {
      status: 'CONFIRMED',
      orderId: input.orderId,
      correlationId: correlationId,
    };
  },
);
