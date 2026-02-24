import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const fetchData = Lambda<{ id: string; retries: number }, { data: string }>('arn:aws:lambda:us-east-1:123:function:FetchData');
const notify = Lambda<{ message: string }, void>('arn:aws:lambda:us-east-1:123:function:Notify');

// Substep with default parameter value
async function fetchWithRetry(id: string, retries = 3) {
  return await fetchData.call({ id, retries });
}

export const helperDefaultParams = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    // Call without providing the default param — should use retries=3
    const result = await fetchWithRetry(input.id);
    await notify.call({ message: result.data });
    return { data: result.data };
  },
);
