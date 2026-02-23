import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, DynamoDB, SNS, SecretsManager } from '@simplesteps/core/runtime/services';

export class AdvancedWorkflowStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Infrastructure
    const validateFn = new lambda.Function(this, 'ValidateOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ valid: true, total: 42 })',
      ),
    });

    const inventoryFn = new lambda.Function(this, 'CheckInventory', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ inStock: true })',
      ),
    });

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const notificationTopic = new sns.Topic(this, 'OrderNotifications');

    // Service bindings
    const validateOrder = Lambda<
      { orderId: string },
      { valid: boolean; total: number }
    >(validateFn.functionArn);

    const checkInventory = Lambda<
      { orderId: string },
      { inStock: boolean }
    >(inventoryFn.functionArn);

    const orders = new DynamoDB(ordersTable.tableName);
    const notifications = new SNS(notificationTopic.topicArn);
    const secrets = new SecretsManager();

    const MAX_RETRIES = 3;

    // Inline workflow: uuid → secret → parallel(validate, inventory) → try/catch save → wait → notify
    const machine = new SimpleStepsStateMachine(this, 'AdvancedWorkflow', {
      workflow: Steps.createFunction(
        async (
          context: SimpleStepContext,
          input: { orderId: string; customerId: string },
        ) => {
          const correlationId = Steps.uuid();

          const apiKeySecret = await secrets.getSecretValue({
            SecretId: 'prod/api-key',
          });

          const [validation, inventory] = await Promise.all([
            validateOrder.call({ orderId: input.orderId }),
            checkInventory.call({ orderId: input.orderId }),
          ]);

          try {
            await orders.putItem({
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

          Steps.delay({ seconds: 10 });

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
      ),
    });

    // Permissions
    validateFn.grantInvoke(machine);
    inventoryFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);
    notificationTopic.grantPublish(machine);
    machine.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['secretsmanager:GetSecretValue'],
        resources: ['*'],
      }),
    );
  }
}
