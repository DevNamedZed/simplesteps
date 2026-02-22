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

const RUNTIME_MSG = 'SimpleSteps runtime types cannot be called directly';

describe('Runtime types throw at runtime', () => {
  describe('Steps class', () => {
    it('constructor throws', () => {
      expect(() => new (Steps as any)()).toThrow(RUNTIME_MSG);
    });

    it('createFunction throws', () => {
      expect(() => Steps.createFunction(async () => ({}))).toThrow(RUNTIME_MSG);
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

  describe('Service bindings throw at runtime', () => {
    it('Lambda factory throws', () => {
      expect(() => Lambda('arn:aws:lambda:us-east-1:123:function:Func')).toThrow();
    });

    it('SQS is an alias for SimpleQueueService', () => {
      expect(SQS).toBe(SimpleQueueService);
    });

    it('SimpleQueueService constructor throws', () => {
      expect(() => new SimpleQueueService('https://sqs.us-east-1.amazonaws.com/123/queue')).toThrow();
    });

    it('DynamoDB constructor throws', () => {
      expect(() => new DynamoDB('MyTable')).toThrow();
    });

    it('SNS constructor throws', () => {
      expect(() => new SNS('arn:aws:sns:us-east-1:123:topic')).toThrow();
    });

    it('StepFunction constructor throws', () => {
      expect(() => new StepFunction('arn:aws:states:us-east-1:123:stateMachine:Workflow')).toThrow();
    });

    it('EventBridge constructor throws', () => {
      expect(() => new EventBridge('my-event-bus')).toThrow();
    });
  });
});
