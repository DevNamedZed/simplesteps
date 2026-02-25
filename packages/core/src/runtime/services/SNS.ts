// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for SNS operations. */
export interface SnsPublishOptions {
  subject?: string;
  messageAttributes?: Record<string, any>;
  retry?: RetryPolicy;
  timeoutSeconds?: number;
  heartbeatSeconds?: number;
}

/** SNS topic binding for the SimpleSteps compiler. */
export class SNS {
  constructor(topicArn: string) {}

  publish(message: any, options?: SnsPublishOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
