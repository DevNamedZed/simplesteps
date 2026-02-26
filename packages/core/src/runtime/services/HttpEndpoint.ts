import type { TaskOptions } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/**
 * Request parameters for HTTPS Endpoint invocations.
 * Maps to ASL Parameters for `arn:aws:states:::http:invoke`.
 */
export interface HttpEndpointRequest {
  /** The full URL to call. */
  ApiEndpoint: string;
  /** HTTP method (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS). */
  Method: string;
  /** HTTP headers to include in the request. */
  Headers?: Record<string, string>;
  /** The request body (for POST, PUT, PATCH). */
  RequestBody?: unknown;
  /** Query string parameters. */
  QueryParameters?: Record<string, string>;
  /** Authentication configuration (EventBridge Connection). */
  Authentication?: {
    ConnectionArn: string;
  };
}

/** Options for HttpEndpoint operations. */
export interface HttpEndpointOptions extends TaskOptions {}

/**
 * HTTPS Endpoint binding for the SimpleSteps compiler.
 *
 * Calls external HTTP APIs directly from Step Functions without a Lambda proxy.
 * Compiles to `arn:aws:states:::http:invoke`.
 *
 * ```typescript
 * const http = new HttpEndpoint();
 *
 * const result = await http.invoke<ResponseType>({
 *   ApiEndpoint: 'https://api.example.com/users',
 *   Method: 'POST',
 *   Headers: { 'Content-Type': 'application/json' },
 *   RequestBody: { name: input.name },
 *   Authentication: {
 *     ConnectionArn: 'arn:aws:events:us-east-1:123:connection/MyApiConnection',
 *   },
 * });
 * ```
 */
export class HttpEndpoint {
  constructor() {}

  invoke<TOutput = any>(
    request: HttpEndpointRequest,
    options?: HttpEndpointOptions,
  ): Promise<TOutput> {
    throw new Error(BINDING_ERROR);
  }
}
