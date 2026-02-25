// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for SimpleQueueService operations. */
export interface SqsPublishOptions {
  delaySeconds?: number;
  messageGroupId?: string;
  messageDeduplicationId?: string;
  retry?: RetryPolicy;
  timeoutSeconds?: number;
  heartbeatSeconds?: number;
}

/** Retrieves one or more messages from a specified queue. */
export interface ReceiveMessageInput {
  /** This parameter has been discontinued but will be supported for backward compatibility. To provide attribute names, you are encouraged to use MessageSystemAttributeNames. A list of attributes that need */
  AttributeNames?: 'All' | 'Policy' | 'VisibilityTimeout' | 'MaximumMessageSize' | 'MessageRetentionPeriod' | 'ApproximateNumberOfMessages' | 'ApproximateNumberOfMessagesNotVisible' | 'CreatedTimestamp' | 'LastModifiedTimestamp' | 'QueueArn' | 'ApproximateNumberOfMessagesDelayed' | 'DelaySeconds' | 'ReceiveMessageWaitTimeSeconds' | 'RedrivePolicy' | 'FifoQueue' | 'ContentBasedDeduplication' | 'KmsMasterKeyId' | 'KmsDataKeyReusePeriodSeconds' | 'DeduplicationScope' | 'FifoThroughputLimit' | 'RedriveAllowPolicy' | 'SqsManagedSseEnabled'[];
  /** The maximum number of messages to return. Amazon SQS never returns more messages than this value (however, fewer messages might be returned). Valid values: 1 to 10. Default: 1. */
  MaxNumberOfMessages?: number;
  /** The name of the message attribute, where N is the index. The name can contain alphanumeric characters and the underscore (_), hyphen (-), and period (.). The name is case-sensitive and must be unique  */
  MessageAttributeNames?: string[];
  /** A list of attributes that need to be returned along with each message. These attributes include: All – Returns all values. ApproximateFirstReceiveTimestamp – Returns the time the message was first rec */
  MessageSystemAttributeNames?: 'All' | 'SenderId' | 'SentTimestamp' | 'ApproximateReceiveCount' | 'ApproximateFirstReceiveTimestamp' | 'SequenceNumber' | 'MessageDeduplicationId' | 'MessageGroupId' | 'AWSTraceHeader' | 'DeadLetterQueueSourceArn'[];
  /** This parameter applies only to FIFO (first-in-first-out) queues. The token used for deduplication of ReceiveMessage calls. If a networking issue occurs after a ReceiveMessage action, and instead of a  */
  ReceiveRequestAttemptId?: string;
  /** The duration (in seconds) that the received messages are hidden from subsequent retrieve requests after being retrieved by a ReceiveMessage request. If not specified, the default visibility timeout fo */
  VisibilityTimeout?: number;
  /** The duration (in seconds) for which the call waits for a message to arrive in the queue before returning. If a message is available, the call returns sooner than WaitTimeSeconds. If no messages are av */
  WaitTimeSeconds?: number;
}

export interface DeleteMessageInput {
  /** The receipt handle associated with the message to delete. */
  ReceiptHandle: string;
}

/** SQS queue binding for the SimpleSteps compiler. */
export class SimpleQueueService {
  constructor(queueUrl: string) {}

  publish(message: any, options?: SqsPublishOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  publishWithCallback<T>(message: any, options?: SqsPublishOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  receiveMessage<T>(params: ReceiveMessageInput, options?: SqsPublishOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteMessage(params: DeleteMessageInput, options?: SqsPublishOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}

export { SimpleQueueService as SQS };
