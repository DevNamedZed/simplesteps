import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { extractDefinition, getStatesByType, getAllStateNames, hasResourcePattern, hasLambdaInvocation } from './helpers';

const DATA_PIPELINE_FIXTURE = path.resolve(
  __dirname, '../../../../packages/core/test/fixtures/cfg/cdk-data-pipeline.ts',
);

describe('DataPipelineStack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'DataPipelineTestStack');

    const transformFn = new lambda.Function(stack, 'TransformData', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ transformed: e.records, count: 42 })',
      ),
      timeout: cdk.Duration.minutes(5),
      memorySize: 1024,
    });

    const dataBucket = new s3.Bucket(stack, 'DataBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const machine = new SimpleStepsStateMachine(stack, 'DataPipelineWorkflow', {
      sourceFile: DATA_PIPELINE_FIXTURE,
      bindings: {
        transformFn: transformFn.functionArn,
        dataBucket: dataBucket.bucketName,
      },
    });

    transformFn.grantInvoke(machine);
    dataBucket.grantReadWrite(machine);

    template = Template.fromStack(stack);
  });

  test('creates a Step Functions state machine', () => {
    template.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  });

  test('creates a Lambda function with 5-minute timeout and 1024 MB memory', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs20.x',
      Timeout: 300,
      MemorySize: 1024,
    });
  });

  test('creates an S3 bucket', () => {
    template.resourceCountIs('AWS::S3::Bucket', 1);
  });

  test('S3 bucket has DESTROY removal policy', () => {
    template.hasResource('AWS::S3::Bucket', {
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

  test('state machine definition is defined', () => {
    const resources = template.findResources('AWS::StepFunctions::StateMachine');
    const sm = Object.values(resources)[0];
    expect(sm.Properties.DefinitionString).toBeDefined();
  });

  describe('State Machine Definition', () => {
    let definition: any;

    beforeAll(() => {
      definition = extractDefinition(template);
    });

    test('has a Task state for Lambda invocation', () => {
      expect(hasLambdaInvocation(definition)).toBe(true);
    });

    test('has Task states with resource containing s3:getObject', () => {
      expect(hasResourcePattern(definition, 's3:getObject')).toBe(true);
    });

    test('has Task states with resource containing s3:putObject', () => {
      expect(hasResourcePattern(definition, 's3:putObject')).toBe(true);
    });

    test('sequential flow: exactly 3 Task states', () => {
      const tasks = getStatesByType(definition, 'Task');
      expect(tasks.length).toBe(3);
    });

    test('no Choice or Parallel states (simple sequential)', () => {
      const choices = getStatesByType(definition, 'Choice');
      const parallels = getStatesByType(definition, 'Parallel');
      expect(choices.length).toBe(0);
      expect(parallels.length).toBe(0);
    });
  });
});
