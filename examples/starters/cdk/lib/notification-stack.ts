import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, DynamoDB, SNS, SQS } from '@simplesteps/core/runtime/services';

export class NotificationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Infrastructure
    const validateFn = new lambda.Function(this, 'ValidateOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ valid: e.amount < 10000 })',
      ),
    });

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'orderId', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const notificationTopic = new sns.Topic(this, 'OrderNotifications');

    const fulfillmentQueue = new sqs.Queue(this, 'FulfillmentQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    // Service bindings
    const validateOrder = Lambda<
      { orderId: string; amount: number },
      { valid: boolean }
    >(validateFn.functionArn);

    const orders = new DynamoDB(ordersTable.tableName);
    const notifications = new SNS(notificationTopic.topicArn);
    const taskQueue = new SQS(fulfillmentQueue.queueUrl);

    // Inline workflow: validate → persist → notify → queue fulfillment
    const machine = new SimpleStepsStateMachine(this, 'NotificationWorkflow', {
      workflow: Steps.createFunction(
        async (
          context: SimpleStepContext,
          input: { orderId: string; amount: number; email: string },
        ) => {
          const check = await validateOrder.call({
            orderId: input.orderId,
            amount: input.amount,
          });

          if (!check.valid) {
            await notifications.publish({
              event: 'ORDER_REJECTED',
              orderId: input.orderId,
              email: input.email,
            });
            return { status: 'REJECTED' };
          }

          await orders.putItem({
            Item: {
              orderId: { S: input.orderId },
              amount: { N: String(input.amount) },
              status: { S: 'CONFIRMED' },
            },
          });

          await notifications.publish({
            event: 'ORDER_CONFIRMED',
            orderId: input.orderId,
            email: input.email,
          });

          await taskQueue.publish({
            action: 'FULFILL',
            orderId: input.orderId,
          });

          return { status: 'CONFIRMED', orderId: input.orderId };
        },
      ),
    });

    // Permissions
    validateFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);
    notificationTopic.grantPublish(machine);
    fulfillmentQueue.grantSendMessages(machine);
  }
}
