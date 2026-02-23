import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { extractDefinition, getStatesByType, getAllStateNames, hasResourcePattern, hasLambdaInvocation } from './helpers';

const NOTIFICATION_FIXTURE = path.resolve(
  __dirname, '../../../../packages/core/test/fixtures/cfg/cdk-notification.ts',
);

describe('NotificationStack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'NotificationTestStack');

    const validateFn = new lambda.Function(stack, 'ValidateOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ valid: e.amount < 10000 })',
      ),
    });

    const ordersTable = new dynamodb.Table(stack, 'OrdersTable', {
      partitionKey: { name: 'orderId', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const notificationTopic = new sns.Topic(stack, 'OrderNotifications');

    const fulfillmentQueue = new sqs.Queue(stack, 'FulfillmentQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    const machine = new SimpleStepsStateMachine(stack, 'NotificationWorkflow', {
      sourceFile: NOTIFICATION_FIXTURE,
      bindings: {
        validateOrder: validateFn.functionArn,
        ordersTable: ordersTable.tableName,
        notifications: notificationTopic.topicArn,
        taskQueue: fulfillmentQueue.queueUrl,
      },
    });

    validateFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);
    notificationTopic.grantPublish(machine);
    fulfillmentQueue.grantSendMessages(machine);

    template = Template.fromStack(stack);
  });

  test('creates a Step Functions state machine', () => {
    template.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  });

  test('creates a Lambda function', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs20.x',
    });
  });

  test('creates a DynamoDB table', () => {
    template.hasResourceProperties('AWS::DynamoDB::Table', {
      KeySchema: [{ AttributeName: 'orderId', KeyType: 'HASH' }],
    });
  });

  test('creates an SNS topic', () => {
    template.resourceCountIs('AWS::SNS::Topic', 1);
  });

  test('creates an SQS queue with 300s visibility timeout', () => {
    template.hasResourceProperties('AWS::SQS::Queue', {
      VisibilityTimeout: 300,
    });
  });

  test('state machine role has Lambda invoke permission', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 'lambda:InvokeFunction',
            Effect: 'Allow',
          }),
        ]),
      },
    });
  });

  test('state machine role has SNS publish permission', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 'sns:Publish',
            Effect: 'Allow',
          }),
        ]),
      },
    });
  });

  test('state machine role has SQS send permission', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: Match.anyValue(),
            Effect: 'Allow',
          }),
        ]),
      },
    });
  });

  test('four distinct resource types are created', () => {
    template.resourceCountIs('AWS::Lambda::Function', 1);
    template.resourceCountIs('AWS::DynamoDB::Table', 1);
    template.resourceCountIs('AWS::SNS::Topic', 1);
    template.resourceCountIs('AWS::SQS::Queue', 1);
  });

  describe('State Machine Definition', () => {
    let definition: any;

    beforeAll(() => {
      definition = extractDefinition(template);
    });

    test('has exactly 1 Choice state (if/else on check.valid)', () => {
      const choices = getStatesByType(definition, 'Choice');
      expect(choices.length).toBe(1);
    });

    test('has a Task state for Lambda invocation', () => {
      expect(hasLambdaInvocation(definition)).toBe(true);
    });

    test('has a Task with resource containing dynamodb:putItem', () => {
      expect(hasResourcePattern(definition, 'dynamodb:putItem')).toBe(true);
    });

    test('has a Task with resource containing sns', () => {
      expect(hasResourcePattern(definition, 'sns')).toBe(true);
    });

    test('has a Task with resource containing sqs', () => {
      expect(hasResourcePattern(definition, 'sqs')).toBe(true);
    });

    test('has exactly 8 top-level states', () => {
      const stateNames = getAllStateNames(definition);
      expect(stateNames.length).toBe(8);
    });
  });
});
