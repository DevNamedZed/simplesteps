// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Bedrock operations. */
export interface BedrockOptions {
  retry?: RetryPolicy;
  timeoutSeconds?: number;
  heartbeatSeconds?: number;
}

export interface InvokeModelInput {
  /** The unique identifier of the model to invoke to run inference. The modelId to provide depends on the type of model or throughput that you use: If you use a base model, specify the model ID or its ARN. */
  modelId: string;
  /** The desired MIME type of the inference body in the response. The default value is application/json. */
  accept?: string;
  /** The prompt and inference parameters in the format specified in the contentType in the header. You must provide the body in JSON format. To see the format and content of the request and response bodies */
  body?: string;
  /** The MIME type of the input data in the request. You must specify application/json. */
  contentType?: string;
  /** The unique identifier of the guardrail that you want to use. If you don't provide a value, no guardrail is applied to the invocation. An error will be thrown in the following situations. You don't pro */
  guardrailIdentifier?: string;
  /** The version number for the guardrail. The value can also be DRAFT. */
  guardrailVersion?: string;
  /** Model performance settings for the request. */
  performanceConfigLatency?: 'standard' | 'optimized';
  /** Specifies the processing tier type used for serving the request. */
  serviceTier?: 'priority' | 'default' | 'flex' | 'reserved';
  /** Specifies whether to enable or disable the Bedrock trace. If enabled, you can see the full Bedrock trace. */
  trace?: 'ENABLED' | 'DISABLED' | 'ENABLED_FULL';
}

/** Bedrock model binding for the SimpleSteps compiler. */
export class Bedrock {
  constructor(modelId: string) {}

  invokeModel<T>(params: InvokeModelInput, options?: BedrockOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
