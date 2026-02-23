import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { extractDefinition, getStatesByType, getAllStateNames, hasResourcePattern, hasLambdaInvocation } from './helpers';

const ADVANCED_FIXTURE = path.resolve(
  __dirname, '../../../../packages/core/test/fixtures/cfg/cdk-advanced-workflow.ts',
);

describe('AdvancedWorkflowStack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'AdvancedWorkflowTestStack');

    const validateFn = new lambda.Function(stack, 'ValidateOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ valid: true, total: 42 })',
      ),
    });

    const inventoryFn = new lambda.Function(stack, 'CheckInventory', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ inStock: true })',
      ),
    });

    const ordersTable = new dynamodb.Table(stack, 'OrdersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const notificationTopic = new sns.Topic(stack, 'OrderNotifications');

    const machine = new SimpleStepsStateMachine(stack, 'AdvancedWorkflow', {
      sourceFile: ADVANCED_FIXTURE,
      bindings: {
        validateOrder: validateFn.functionArn,
        checkInventory: inventoryFn.functionArn,
        ordersTable: ordersTable.tableName,
        notifications: notificationTopic.topicArn,
      },
    });

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

    template = Template.fromStack(stack);
  });

  // --- Infrastructure tests ---

  test('creates 2 Lambda functions', () => {
    template.resourceCountIs('AWS::Lambda::Function', 2);
  });

  test('creates 1 DynamoDB table', () => {
    template.resourceCountIs('AWS::DynamoDB::Table', 1);
  });

  test('creates 1 SNS topic', () => {
    template.resourceCountIs('AWS::SNS::Topic', 1);
  });

  test('creates 1 state machine', () => {
    template.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
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

  test('state machine role has SecretsManager GetSecretValue permission', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 'secretsmanager:GetSecretValue',
            Effect: 'Allow',
          }),
        ]),
      },
    });
  });

  // --- ASL definition tests ---

  describe('State Machine Definition', () => {
    let definition: any;

    beforeAll(() => {
      definition = extractDefinition(template);
    });

    test('StartAt is a valid state name', () => {
      const stateNames = getAllStateNames(definition);
      expect(stateNames).toContain(definition.StartAt);
    });

    test('has a Parallel state (from Promise.all) with exactly 2 branches', () => {
      const parallels = getStatesByType(definition, 'Parallel');
      expect(parallels.length).toBeGreaterThanOrEqual(1);
      const [, parallelState] = parallels[0];
      expect(parallelState.Branches).toHaveLength(2);
    });

    test('has a Wait state with Seconds: 10', () => {
      const waits = getStatesByType(definition, 'Wait');
      expect(waits.length).toBeGreaterThanOrEqual(1);
      const hasSeconds10 = waits.some(([, s]) => s.Seconds === 10);
      expect(hasSeconds10).toBe(true);
    });

    test('has a Task state with Catch block (from try/catch)', () => {
      const tasks = getStatesByType(definition, 'Task');
      const tasksWithCatch = tasks.filter(([, s]) => Array.isArray(s.Catch) && s.Catch.length > 0);
      expect(tasksWithCatch.length).toBeGreaterThanOrEqual(1);
    });

    test('has a Task with resource containing secretsmanager:getSecretValue', () => {
      expect(hasResourcePattern(definition, 'secretsmanager:getSecretValue')).toBe(true);
    });

    test('has a Task state for Lambda invocation', () => {
      expect(hasLambdaInvocation(definition)).toBe(true);
    });

    test('has a Task with resource containing dynamodb:putItem', () => {
      expect(hasResourcePattern(definition, 'dynamodb:putItem')).toBe(true);
    });

    test('has a Task with resource containing sns:publish', () => {
      expect(hasResourcePattern(definition, 'sns')).toBe(true);
    });

    test('has a Pass state with parameter containing States.UUID() or States.Format intrinsic', () => {
      const passes = getStatesByType(definition, 'Pass');
      const hasIntrinsic = passes.some(([, s]) => {
        const params = JSON.stringify(s.Parameters || s.Result || {});
        return params.includes('States.UUID()') || params.includes('States.Format');
      });
      expect(hasIntrinsic).toBe(true);
    });

    test('all Next targets resolve to valid state names', () => {
      const stateNames = new Set(getAllStateNames(definition));
      for (const [name, state] of Object.entries(definition.States) as [string, any][]) {
        if (state.Next) {
          expect(stateNames.has(state.Next)).toBe(true);
        }
        if (state.Choices) {
          for (const choice of state.Choices) {
            if (choice.Next) {
              expect(stateNames.has(choice.Next)).toBe(true);
            }
          }
        }
        if (state.Default) {
          expect(stateNames.has(state.Default)).toBe(true);
        }
        if (state.Catch) {
          for (const c of state.Catch) {
            if (c.Next) {
              expect(stateNames.has(c.Next)).toBe(true);
            }
          }
        }
      }
    });

    test('>= 8 states total', () => {
      const stateNames = getAllStateNames(definition);
      expect(stateNames.length).toBeGreaterThanOrEqual(8);
    });
  });
});
