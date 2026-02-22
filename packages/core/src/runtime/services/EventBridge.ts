import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** An event to be published to EventBridge. */
export interface EventBridgeEvent {
  source: string;
  detailType: string;
  detail: any;
}

/** Options for EventBridge operations. */
export interface EventBridgeOptions {
  retry?: RetryPolicy;
}

/** EventBridge binding for the SimpleSteps compiler. */
export class EventBridge {
  constructor(eventBusName: string) {
    throw new Error(BINDING_ERROR);
  }

  putEvent(event: EventBridgeEvent, options?: EventBridgeOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
