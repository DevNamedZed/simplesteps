// HttpEndpoint — Call External HTTP APIs Directly
//
// Use HttpEndpoint to invoke external HTTPS APIs directly from
// Step Functions, without a Lambda proxy. Compiles to ASL's
// arn:aws:states:::http:invoke resource.
//
// Authentication is handled via EventBridge Connections
// (OAuth, API Key, or Basic Auth — configured in AWS Console).

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { HttpEndpoint } from '../../packages/core/src/runtime/services/HttpEndpoint';

const http = new HttpEndpoint();

export const httpEndpoint = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string; name: string }) => {
    // POST to an external API with authentication
    const createResult = await http.invoke<{ id: string; status: string }>({
      ApiEndpoint: 'https://api.example.com/users',
      Method: 'POST',
      Headers: { 'Content-Type': 'application/json' },
      RequestBody: { name: input.name },
      Authentication: {
        ConnectionArn: 'arn:aws:events:us-east-1:123456789:connection/MyApiConnection',
      },
    });

    // GET from the API using the created resource
    const getResult = await http.invoke<{ id: string; name: string; email: string }>({
      ApiEndpoint: `https://api.example.com/users/${createResult.id}`,
      Method: 'GET',
      Authentication: {
        ConnectionArn: 'arn:aws:events:us-east-1:123456789:connection/MyApiConnection',
      },
    });

    return { userId: getResult.id, name: getResult.name, email: getResult.email };
  },
);
