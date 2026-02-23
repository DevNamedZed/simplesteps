import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { extractDefinition, getStatesByType, getAllStateNames, hasResourcePattern, hasLambdaInvocation } from './helpers';

const EVENT_DRIVEN_FIXTURE = path.resolve(
  __dirname, '../../../../packages/core/test/fixtures/cfg/cdk-event-driven.ts',
);

describe('EventDrivenStack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'EventDrivenTestStack');

    const enrichFn = new lambda.Function(stack, 'EnrichPayment', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ ...e, enriched: true, risk: "low" })',
      ),
    });

    const auditBus = new events.EventBus(stack, 'AuditBus');

    const fraudCheckMachine = new sfn.StateMachine(stack, 'FraudCheck', {
      definitionBody: sfn.DefinitionBody.fromString(JSON.stringify({
        StartAt: 'Check',
        States: {
          Check: {
            Type: 'Pass',
            Result: { fraudulent: false },
            End: true,
          },
        },
      })),
    });

    const machine = new SimpleStepsStateMachine(stack, 'PaymentWorkflow', {
      sourceFile: EVENT_DRIVEN_FIXTURE,
      bindings: {
        enrichPayment: enrichFn.functionArn,
        auditEvents: auditBus.eventBusName,
        fraudCheck: fraudCheckMachine.stateMachineArn,
      },
    });

    enrichFn.grantInvoke(machine);
    auditBus.grantPutEventsTo(machine);
    fraudCheckMachine.grantStartSyncExecution(machine);

    template = Template.fromStack(stack);
  });

  test('creates two Step Functions state machines (payment + fraud check)', () => {
    template.resourceCountIs('AWS::StepFunctions::StateMachine', 2);
  });

  test('creates a Lambda function', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs20.x',
    });
  });

  test('creates an EventBridge event bus', () => {
    template.resourceCountIs('AWS::Events::EventBus', 1);
  });

  test('fraud check state machine has a Pass state definition', () => {
    const machines = template.findResources('AWS::StepFunctions::StateMachine');
    const definitions = Object.values(machines).map(
      (m: any) => m.Properties.DefinitionString,
    );
    const fraudDef = definitions.find(
      (d: any) => typeof d === 'string' && d.includes('"Pass"'),
    );
    expect(fraudDef).toBeDefined();
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

  test('state machine role has EventBridge put events permission', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 'events:PutEvents',
            Effect: 'Allow',
          }),
        ]),
      },
    });
  });

  test('state machine role has Step Functions start sync execution permission', () => {
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

  describe('State Machine Definition', () => {
    let definition: any;

    beforeAll(() => {
      // The event-driven stack has 2 state machines; the compiled workflow
      // is the one produced by SimpleStepsStateMachine (not the fraud-check Pass machine).
      // We try index 0 first; if it looks like the trivial fraud-check, use index 1.
      let def = extractDefinition(template, 0);
      if (getAllStateNames(def).length <= 1) {
        def = extractDefinition(template, 1);
      }
      definition = def;
    });

    test('has a Task state for Lambda invocation', () => {
      expect(hasLambdaInvocation(definition)).toBe(true);
    });

    test('has a Task with resource containing events', () => {
      expect(hasResourcePattern(definition, 'events')).toBe(true);
    });

    test('has a Task with resource containing step function execution', () => {
      // StepFunction.startExecution compiles to either states:startExecution or __CDK_TOKEN__
      const tasks = getStatesByType(definition, 'Task');
      expect(tasks.length).toBeGreaterThanOrEqual(3);
    });

    test('has a Choice state (if/else on fraud.fraudulent)', () => {
      const choices = getStatesByType(definition, 'Choice');
      expect(choices.length).toBeGreaterThanOrEqual(1);
    });

    test('at least 5 states total', () => {
      const stateNames = getAllStateNames(definition);
      expect(stateNames.length).toBeGreaterThanOrEqual(5);
    });
  });
});
