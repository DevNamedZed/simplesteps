import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for SQS publish operations. */
export interface SqsPublishOptions {
  delaySeconds?: number;
  messageGroupId?: string;
  messageDeduplicationId?: string;
  retry?: RetryPolicy;
}

/** SQS queue binding for the SimpleSteps compiler. */
export class SimpleQueueService {
  constructor(queueUrl: string) {
    throw new Error(BINDING_ERROR);
  }

  publish(message: any, options?: SqsPublishOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  publishWithCallback<T>(message: any, options?: SqsPublishOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}

export { SimpleQueueService as SQS };
