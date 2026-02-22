import { Steps, SimpleStepContext, StepException, TimeoutError } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';
import { SNS } from '../../../src/runtime/services/SNS';

class OrderNotFoundError extends StepException {}

const processOrder = Lambda<{ orderId: string }, { status: string }>('arn:aws:lambda:us-east-1:123:function:ProcessOrder');
const alerts = new SNS('arn:aws:sns:us-east-1:123:alerts');

// Test 1: instanceof chain with specific error handlers
export const instanceofChain = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    try {
      const result = await processOrder.call({ orderId: input.orderId });
      return { status: result.status };
    } catch (e) {
      if (e instanceof TimeoutError) {
        await alerts.publish({ message: 'Timed out' });
      } else if (e instanceof OrderNotFoundError) {
        await alerts.publish({ message: 'Not found' });
      } else {
        await alerts.publish({ message: 'Unknown error' });
      }
    }
  },
);

// Test 2: throw with custom error class and literal message
export const throwCustomError = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    throw new OrderNotFoundError('Order not found');
  },
);

// Test 3: throw with built-in ASL error
export const throwBuiltinError = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    throw new TimeoutError('Operation timed out');
  },
);

// Test 4: bare catch (no instanceof) — should still generate States.ALL
export const bareCatch = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    try {
      const result = await processOrder.call({ orderId: input.data });
      return result;
    } catch (error) {
      await alerts.publish({ message: 'Something failed' });
    }
  },
);
