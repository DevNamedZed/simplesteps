import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const fetchUser = Lambda<{ id: string }, { name: string }>('arn:aws:lambda:us-east-1:123:function:FetchUser');
const enrichUser = Lambda<{ name: string }, { enriched: string }>('arn:aws:lambda:us-east-1:123:function:EnrichUser');

// Inner helper — returns a value
async function getUserName(id: string) {
  return await fetchUser.call({ id });
}

// Outer helper — calls inner helper, uses its result, returns a value
async function getEnrichedUser(id: string) {
  const user = await getUserName(id);
  return await enrichUser.call({ name: user.name });
}

export const nestedValueHelper = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string }) => {
    const enriched = await getEnrichedUser(input.userId);
    return { result: enriched.enriched };
  },
);
