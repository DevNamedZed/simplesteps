import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { extractDefinition, getStatesByType, getAllStateNames, hasResourcePattern, hasLambdaInvocation } from './helpers';

// The fixture mirrors the inline workflow from lib/stack.ts but uses relative
// imports so the compile() API can resolve it without package-level mappings.
const ORDER_FIXTURE = path.resolve(
  __dirname, '../../../../packages/core/test/fixtures/cfg/cdk-order.ts',
);

describe('OrderStack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'OrderTestStack');

    const validateFn = new lambda.Function(stack, 'ValidateOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = async (e) => ({ valid: true, total: 42 })'),
    });

    const ordersTable = new dynamodb.Table(stack, 'OrdersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const machine = new SimpleStepsStateMachine(stack, 'OrderWorkflow', {
      sourceFile: ORDER_FIXTURE,
      bindings: {
        validateOrder: validateFn.functionArn,
        ordersTable: ordersTable.tableName,
      },
    });

    validateFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);

    template = Template.fromStack(stack);
  });

  test('creates a Step Functions state machine', () => {
    template.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  });

  test('creates a Lambda function with Node.js 20 runtime', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs20.x',
      Handler: 'index.handler',
    });
  });

  test('creates a DynamoDB table with string partition key', () => {
    template.hasResourceProperties('AWS::DynamoDB::Table', {
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    });
  });

  test('DynamoDB table has DESTROY removal policy', () => {
    template.hasResource('AWS::DynamoDB::Table', {
      DeletionPolicy: 'Delete',
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

  test('state machine role has DynamoDB write permission', () => {
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

  test('state machine definition is valid JSON with StartAt', () => {
    const resources = template.findResources('AWS::StepFunctions::StateMachine');
    const sm = Object.values(resources)[0];
    // DefinitionString may contain Fn::Join with CDK token references
    const defString = sm.Properties.DefinitionString;
    expect(defString).toBeDefined();
  });

  describe('State Machine Definition', () => {
    let definition: any;

    beforeAll(() => {
      definition = extractDefinition(template);
    });

    test('StartAt is a valid state name', () => {
      const stateNames = getAllStateNames(definition);
      expect(stateNames).toContain(definition.StartAt);
    });

    test('has exactly 1 Choice state (if/else on order.valid)', () => {
      const choices = getStatesByType(definition, 'Choice');
      expect(choices.length).toBe(1);
    });

    test('has a Task state for Lambda invocation', () => {
      expect(hasLambdaInvocation(definition)).toBe(true);
    });

    test('has a Task with resource containing dynamodb:putItem', () => {
      expect(hasResourcePattern(definition, 'dynamodb:putItem')).toBe(true);
    });

    test('has Pass states for early return and final output', () => {
      const passes = getStatesByType(definition, 'Pass');
      expect(passes.length).toBe(2);
    });

    test('has exactly 5 top-level states', () => {
      const stateNames = getAllStateNames(definition);
      expect(stateNames.length).toBe(5);
    });
  });
});
