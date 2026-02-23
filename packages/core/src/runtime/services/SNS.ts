import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for SNS publish operations. */
export interface SnsPublishOptions {
  subject?: string;
  messageAttributes?: Record<string, any>;
  retry?: RetryPolicy;
}

/** SNS topic binding for the SimpleSteps compiler. */
export class SNS {
  constructor(topicArn: string) {}

  publish(message: any, options?: SnsPublishOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
