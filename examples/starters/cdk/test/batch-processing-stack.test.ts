import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { extractDefinition, getStatesByType, getAllStateNames, hasResourcePattern, hasLambdaInvocation } from './helpers';

const BATCH_FIXTURE = path.resolve(
  __dirname, '../../../../packages/core/test/fixtures/cfg/cdk-batch-processing.ts',
);

describe('BatchProcessingStack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'BatchProcessingTestStack');

    const processItemFn = new lambda.Function(stack, 'ProcessItem', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ processed: true })',
      ),
    });

    const statusFn = new lambda.Function(stack, 'CheckStatus', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ done: true, progress: 100 })',
      ),
    });

    const resultsBucket = new s3.Bucket(stack, 'ResultsBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const machine = new SimpleStepsStateMachine(stack, 'BatchProcessingWorkflow', {
      sourceFile: BATCH_FIXTURE,
      bindings: {
        processItem: processItemFn.functionArn,
        checkStatus: statusFn.functionArn,
        resultsBucket: resultsBucket.bucketName,
      },
    });

    processItemFn.grantInvoke(machine);
    statusFn.grantInvoke(machine);
    resultsBucket.grantReadWrite(machine);
    machine.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['ssm:GetParameter'],
        resources: ['*'],
      }),
    );

    template = Template.fromStack(stack);
  });

  // --- Infrastructure tests ---

  test('creates at least 2 Lambda functions', () => {
    // autoDeleteObjects on the S3 bucket adds a custom resource Lambda
    const resources = template.findResources('AWS::Lambda::Function');
    expect(Object.keys(resources).length).toBeGreaterThanOrEqual(2);
  });

  test('creates 1 S3 bucket', () => {
    template.resourceCountIs('AWS::S3::Bucket', 1);
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

  test('state machine role has S3 read/write permissions', () => {
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

  test('state machine role has SSM GetParameter permission', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 'ssm:GetParameter',
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

    test('has a Map state (from for-of) with Iterator or ItemProcessor containing a Task', () => {
      const maps = getStatesByType(definition, 'Map');
      expect(maps.length).toBeGreaterThanOrEqual(1);
      const [, mapState] = maps[0];
      const processor = mapState.ItemProcessor || mapState.Iterator;
      expect(processor).toBeDefined();
      const innerStates = Object.values(processor.States) as any[];
      const hasTasks = innerStates.some((s: any) => s.Type === 'Task');
      expect(hasTasks).toBe(true);
    });

    test('has a Choice state forming a loop (while condition)', () => {
      const choices = getStatesByType(definition, 'Choice');
      expect(choices.length).toBeGreaterThanOrEqual(1);
    });

    test('has a Task with resource containing ssm:getParameter', () => {
      expect(hasResourcePattern(definition, 'ssm:getParameter')).toBe(true);
    });

    test('has a Task state for Lambda invocation', () => {
      expect(hasLambdaInvocation(definition)).toBe(true);
    });

    test('has a Task with resource containing s3:putObject', () => {
      expect(hasResourcePattern(definition, 's3:putObject')).toBe(true);
    });

    test('>= 5 states total', () => {
      const stateNames = getAllStateNames(definition);
      expect(stateNames.length).toBeGreaterThanOrEqual(5);
    });
  });
});
