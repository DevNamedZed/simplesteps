// EventBridge Integration
//
// Publish a domain event to an EventBridge bus. The compiler wraps
// user parameters with EventBusName from the constructor. Note that
// the event parameter is passed as a flat object — nested dynamic
// objects are a future enhancement.
//
// ASL output:
//   Invoke_processFn (Task, Lambda)
//   → Invoke_eventBus (Task, arn:aws:states:::events:putEvents,
//       Parameters: { EventBusName: "MyAppBus", Detail: { orderId.$, status } },
//       ResultPath: null)
//   → Return_Result (Pass, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';
import { EventBridge } from '../../packages/core/src/runtime/services/EventBridge';

const processFn = Lambda<{ orderId: string }, { total: number }>('arn:aws:lambda:us-east-1:123:function:ProcessOrder');
const eventBus = new EventBridge('MyAppBus');

export const eventBridgeExample = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const order = await processFn.call({ orderId: input.orderId });
    await eventBus.putEvent({ orderId: input.orderId, status: 'processed' });
    return { published: true };
  },
);
