// Checkout Processing — AWS CDK
//
// Multi-service e-commerce checkout using Lambda, DynamoDB, SQS, and SNS.
// DynamoDB requires CustomState with raw ASL JSON since CDK has no
// high-level construct for putItem with full parameter support.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class CheckoutStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create resources
    const validateCartFn = new lambda.Function(this, 'ValidateCartFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/validate-cart'),
    });

    const processPaymentFn = new lambda.Function(this, 'ProcessPaymentFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/process-payment'),
    });

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'orderId', type: dynamodb.AttributeType.STRING },
    });

    const fulfillmentQueue = new sqs.Queue(this, 'FulfillmentQueue');

    const notificationTopic = new sns.Topic(this, 'OrderNotifications');

    // Define state machine states
    const validateCart = new tasks.LambdaInvoke(this, 'Validate Cart', {
      lambdaFunction: validateCartFn,
      outputPath: '$.Payload',
    });

    const cartInvalid = new sfn.Fail(this, 'Cart Invalid', {
      error: 'CartValidationFailed',
      cause: 'Cart validation failed',
    });

    const checkCartValid = new sfn.Choice(this, 'Cart Valid?')
      .when(sfn.Condition.booleanEquals('$.valid', false), cartInvalid)
      .otherwise(
        new tasks.LambdaInvoke(this, 'Process Payment', {
          lambdaFunction: processPaymentFn,
          payload: sfn.TaskInput.fromObject({
            'cartId.$': '$.cartId',
            'total.$': '$.total',
          }),
          outputPath: '$.Payload',
        }),
      );

    const paymentDeclined = new sfn.Fail(this, 'Payment Declined', {
      error: 'PaymentDeclined',
      cause: 'Payment was declined',
    });

    const checkPayment = new sfn.Choice(this, 'Payment Approved?')
      .when(sfn.Condition.not(sfn.Condition.stringEquals('$.status', 'approved')), paymentDeclined)
      .otherwise(
        // DynamoDB putItem — requires CustomState with raw ASL JSON
        new sfn.CustomState(this, 'Save Order', {
          stateJson: {
            Type: 'Task',
            Resource: 'arn:aws:states:::dynamodb:putItem',
            Parameters: {
              TableName: ordersTable.tableName,
              Item: {
                'orderId': { 'S.$': '$.cartId' },
                'customerId': { 'S.$': '$.customerId' },
                'paymentId': { 'S.$': '$.paymentId' },
                'status': { 'S': 'CONFIRMED' },
              },
            },
            ResultPath: null,
          },
        }),
      );

    // SQS send message
    const queueForFulfillment = new tasks.SqsSendMessage(this, 'Queue for Fulfillment', {
      queue: fulfillmentQueue,
      messageBody: sfn.TaskInput.fromObject({
        'orderId.$': '$.cartId',
        'items.$': '$.items',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    // SNS notification
    const notifyCustomer = new tasks.SnsPublish(this, 'Notify Customer', {
      topic: notificationTopic,
      message: sfn.TaskInput.fromObject({
        'message': 'Your order has been confirmed',
        'orderId.$': '$.cartId',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    const orderComplete = new sfn.Succeed(this, 'Order Complete');

    // Wire up the definition
    const definition = validateCart
      .next(checkCartValid);

    // Create the state machine
    const stateMachine = new sfn.StateMachine(this, 'CheckoutStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
    });

    // Grant permissions for ALL services
    validateCartFn.grantInvoke(stateMachine);
    processPaymentFn.grantInvoke(stateMachine);
    ordersTable.grantWriteData(stateMachine);
    fulfillmentQueue.grantSendMessages(stateMachine);
    notificationTopic.grantPublish(stateMachine);
  }
}
