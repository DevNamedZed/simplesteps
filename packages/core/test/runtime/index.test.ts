import {
  Steps,
  SimpleStepContext,
  StepException,
  stepFunction,
} from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services/Lambda';
import { SimpleQueueService, SQS } from '@simplesteps/core/runtime/services/SimpleQueueService';
import { DynamoDB } from '@simplesteps/core/runtime/services/DynamoDB';
import { SNS } from '@simplesteps/core/runtime/services/SNS';
import { StepFunction } from '@simplesteps/core/runtime/services/StepFunction';
import { EventBridge } from '@simplesteps/core/runtime/services/EventBridge';
import { S3 } from '@simplesteps/core/runtime/services/S3';
import { SecretsManager } from '@simplesteps/core/runtime/services/SecretsManager';
import { SSM } from '@simplesteps/core/runtime/services/SSM';
import { ECS } from '@simplesteps/core/runtime/services/ECS';
import { Bedrock } from '@simplesteps/core/runtime/services/Bedrock';
import { Batch } from '@simplesteps/core/runtime/services/Batch';
import { Glue } from '@simplesteps/core/runtime/services/Glue';
import { CodeBuild } from '@simplesteps/core/runtime/services/CodeBuild';
import { Athena } from '@simplesteps/core/runtime/services/Athena';

const RUNTIME_MSG = 'SimpleSteps runtime types cannot be called directly';

describe('Runtime types throw at runtime', () => {
  describe('Steps class', () => {
    it('constructor throws', () => {
      expect(() => new (Steps as any)()).toThrow(RUNTIME_MSG);
    });

    it('createFunction returns a stub', () => {
      // createFunction returns the factory as a stub (safe for CDK inline workflows)
      const result = Steps.createFunction(async () => ({}));
      expect(result).toBeDefined();
    });

    it('delay throws', () => {
      expect(() => Steps.delay({ seconds: 10 })).toThrow(RUNTIME_MSG);
    });

    it('sequential throws', () => {
      expect(() => Steps.sequential([1, 2, 3])).toThrow(RUNTIME_MSG);
    });

    it('format throws', () => {
      expect(() => Steps.format('hello {}')).toThrow(RUNTIME_MSG);
    });

    it('add throws', () => {
      expect(() => Steps.add(1, 2)).toThrow(RUNTIME_MSG);
    });

    it('random throws', () => {
      expect(() => Steps.random(1, 10)).toThrow(RUNTIME_MSG);
    });

    it('uuid throws', () => {
      expect(() => Steps.uuid()).toThrow(RUNTIME_MSG);
    });

    it('hash throws', () => {
      expect(() => Steps.hash('data', 'SHA-256')).toThrow(RUNTIME_MSG);
    });

    it('base64Encode throws', () => {
      expect(() => Steps.base64Encode('data')).toThrow(RUNTIME_MSG);
    });

    it('base64Decode throws', () => {
      expect(() => Steps.base64Decode('data')).toThrow(RUNTIME_MSG);
    });

    it('array throws', () => {
      expect(() => Steps.array(1, 2, 3)).toThrow(RUNTIME_MSG);
    });

    it('arrayPartition throws', () => {
      expect(() => Steps.arrayPartition([1, 2, 3], 2)).toThrow(RUNTIME_MSG);
    });

    it('partition alias throws', () => {
      expect(() => Steps.partition([1, 2, 3], 2)).toThrow(RUNTIME_MSG);
    });

    it('arrayContains throws', () => {
      expect(() => Steps.arrayContains([1, 2, 3], 2)).toThrow(RUNTIME_MSG);
    });

    it('arrayRange throws', () => {
      expect(() => Steps.arrayRange(0, 10, 1)).toThrow(RUNTIME_MSG);
    });

    it('range alias throws', () => {
      expect(() => Steps.range(0, 10, 1)).toThrow(RUNTIME_MSG);
    });

    it('arrayGetItem throws', () => {
      expect(() => Steps.arrayGetItem([1, 2], 0)).toThrow(RUNTIME_MSG);
    });

    it('arrayLength throws', () => {
      expect(() => Steps.arrayLength([1, 2])).toThrow(RUNTIME_MSG);
    });

    it('arrayUnique throws', () => {
      expect(() => Steps.arrayUnique([1, 1, 2])).toThrow(RUNTIME_MSG);
    });

    it('unique alias throws', () => {
      expect(() => Steps.unique([1, 1, 2])).toThrow(RUNTIME_MSG);
    });

    it('arraySlice throws', () => {
      expect(() => Steps.arraySlice([1, 2, 3], 0, 2)).toThrow(RUNTIME_MSG);
    });

    it('jsonParse throws', () => {
      expect(() => Steps.jsonParse('{}')).toThrow(RUNTIME_MSG);
    });

    it('jsonStringify throws', () => {
      expect(() => Steps.jsonStringify({})).toThrow(RUNTIME_MSG);
    });

    it('merge throws', () => {
      expect(() => Steps.merge({}, {})).toThrow(RUNTIME_MSG);
    });

    it('awsSdk throws', () => {
      expect(() => Steps.awsSdk('s3', 'getObject', {})).toThrow(RUNTIME_MSG);
    });
  });

  describe('SimpleStepContext', () => {
    it('constructor throws', () => {
      expect(() => new SimpleStepContext()).toThrow(RUNTIME_MSG);
    });
  });

  describe('StepException', () => {
    it('extends Error', () => {
      const err = new StepException('test error');
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(StepException);
      expect(err.message).toBe('test error');
    });
  });

  describe('stepFunction decorator', () => {
    it('returns the descriptor unchanged', () => {
      const descriptor: PropertyDescriptor = {
        value: () => {},
        writable: true,
      };
      const result = stepFunction({}, 'test', descriptor);
      expect(result).toBe(descriptor);
    });
  });

  describe('Service bindings at runtime', () => {
    // Constructors are no-op stubs (safe for CDK inline workflows).
    // Methods still throw since they're compiler-only.
    it('Lambda factory returns a stub', () => {
      const stub = Lambda('arn:aws:lambda:us-east-1:123:function:Func');
      expect(stub).toBeDefined();
      expect(() => stub.call({} as any)).toThrow();
    });

    it('SQS is an alias for SimpleQueueService', () => {
      expect(SQS).toBe(SimpleQueueService);
    });

    it('SimpleQueueService constructor returns instance', () => {
      const sqs = new SimpleQueueService('https://sqs.us-east-1.amazonaws.com/123/queue');
      expect(sqs).toBeInstanceOf(SimpleQueueService);
      expect(() => sqs.publish({} as any)).toThrow();
    });

    it('DynamoDB constructor returns instance', () => {
      const db = new DynamoDB('MyTable');
      expect(db).toBeInstanceOf(DynamoDB);
      expect(() => db.getItem({} as any)).toThrow();
    });

    it('SNS constructor returns instance', () => {
      const sns = new SNS('arn:aws:sns:us-east-1:123:topic');
      expect(sns).toBeInstanceOf(SNS);
      expect(() => sns.publish({} as any)).toThrow();
    });

    it('StepFunction constructor returns instance', () => {
      const sf = new StepFunction('arn:aws:states:us-east-1:123:stateMachine:Workflow');
      expect(sf).toBeInstanceOf(StepFunction);
      expect(() => sf.startExecution({} as any)).toThrow();
    });

    it('EventBridge constructor returns instance', () => {
      const eb = new EventBridge('my-event-bus');
      expect(eb).toBeInstanceOf(EventBridge);
      expect(() => eb.putEvent({} as any)).toThrow();
    });

    it('S3 constructor returns instance', () => {
      const s3 = new S3('my-bucket');
      expect(s3).toBeInstanceOf(S3);
      expect(() => s3.getObject({} as any)).toThrow();
      expect(() => s3.putObject({} as any)).toThrow();
    });

    it('SecretsManager constructor returns instance', () => {
      const sm = new SecretsManager();
      expect(sm).toBeInstanceOf(SecretsManager);
      expect(() => sm.getSecretValue({} as any)).toThrow();
    });

    it('SSM constructor returns instance', () => {
      const ssm = new SSM();
      expect(ssm).toBeInstanceOf(SSM);
      expect(() => ssm.getParameter({} as any)).toThrow();
    });

    it('ECS constructor returns instance', () => {
      const ecs = new ECS('arn:aws:ecs:us-east-1:123:cluster/test');
      expect(ecs).toBeInstanceOf(ECS);
      expect(() => ecs.runTask({} as any)).toThrow();
      expect(() => ecs.runTaskAsync({} as any)).toThrow();
    });

    it('Bedrock constructor returns instance', () => {
      const bedrock = new Bedrock('anthropic.claude-3-sonnet');
      expect(bedrock).toBeInstanceOf(Bedrock);
      expect(() => bedrock.invokeModel({} as any)).toThrow();
    });

    it('Batch constructor returns instance', () => {
      const batch = new Batch('arn:aws:batch:us-east-1:123:job-queue/test');
      expect(batch).toBeInstanceOf(Batch);
      expect(() => batch.submitJob({} as any)).toThrow();
      expect(() => batch.submitJobAsync({} as any)).toThrow();
    });

    it('Glue constructor returns instance', () => {
      const glue = new Glue('my-etl-job');
      expect(glue).toBeInstanceOf(Glue);
      expect(() => glue.startJobRun({} as any)).toThrow();
      expect(() => glue.startJobRunAsync({} as any)).toThrow();
    });

    it('CodeBuild constructor returns instance', () => {
      const cb = new CodeBuild('my-project');
      expect(cb).toBeInstanceOf(CodeBuild);
      expect(() => cb.startBuild({} as any)).toThrow();
      expect(() => cb.startBuildAsync({} as any)).toThrow();
    });

    it('Athena constructor returns instance', () => {
      const athena = new Athena();
      expect(athena).toBeInstanceOf(Athena);
      expect(() => athena.startQueryExecution({} as any)).toThrow();
      expect(() => athena.getQueryExecution({} as any)).toThrow();
      expect(() => athena.getQueryResults({} as any)).toThrow();
    });
  });
});
