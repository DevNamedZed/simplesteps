// Test fixture: HttpEndpoint — HTTPS Endpoint invocation

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { HttpEndpoint } from '../../../src/runtime/services/HttpEndpoint';

const http = new HttpEndpoint();

export const httpEndpoint = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string; name: string }) => {
    const result = await http.invoke<{ id: string; status: string }>({
      ApiEndpoint: 'https://api.example.com/users',
      Method: 'POST',
      Headers: { 'Content-Type': 'application/json' },
      RequestBody: { name: input.name },
      Authentication: {
        ConnectionArn: 'arn:aws:events:us-east-1:123456789:connection/MyApiConnection',
      },
    });

    return { id: result.id, status: result.status };
  },
);
