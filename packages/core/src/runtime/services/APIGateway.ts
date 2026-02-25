// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface StageKey {
  /** The string identifier of the associated RestApi. */
  restApiId?: string;
  /** The stage name associated with the stage key. */
  stageName?: string;
}

export interface DeploymentCanarySettings {
  /** The percentage (0.0-100.0) of traffic routed to the canary deployment. */
  percentTraffic?: number;
  /** A stage variable overrides used for the canary release deployment. They can override existing stage variables or add new stage variables for the canary release deployment. These stage variables are re */
  stageVariableOverrides?: Record<string, string>;
  /** A Boolean flag to indicate whether the canary release deployment uses the stage cache or not. */
  useStageCache?: boolean;
}

export interface DocumentationPartLocation {
  /** The type of API entity to which the documentation content applies. Valid values are API, AUTHORIZER, MODEL, RESOURCE, METHOD, PATH_PARAMETER, QUERY_PARAMETER, REQUEST_HEADER, REQUEST_BODY, RESPONSE, R */
  type: 'API' | 'AUTHORIZER' | 'MODEL' | 'RESOURCE' | 'METHOD' | 'PATH_PARAMETER' | 'QUERY_PARAMETER' | 'REQUEST_HEADER' | 'REQUEST_BODY' | 'RESPONSE' | 'RESPONSE_HEADER' | 'RESPONSE_BODY';
  /** The URL path of the target. It is a valid field for the API entity types of RESOURCE, METHOD, PATH_PARAMETER, QUERY_PARAMETER, REQUEST_HEADER, REQUEST_BODY, RESPONSE, RESPONSE_HEADER, and RESPONSE_BOD */
  path?: string;
  /** The HTTP verb of a method. It is a valid field for the API entity types of METHOD, PATH_PARAMETER, QUERY_PARAMETER, REQUEST_HEADER, REQUEST_BODY, RESPONSE, RESPONSE_HEADER, and RESPONSE_BODY. The defa */
  method?: string;
  /** The HTTP status code of a response. It is a valid field for the API entity types of RESPONSE, RESPONSE_HEADER, and RESPONSE_BODY. The default value is * for any status code. When an applicable child e */
  statusCode?: string;
  /** The name of the targeted API entity. It is a valid and required field for the API entity types of AUTHORIZER, MODEL, PATH_PARAMETER, QUERY_PARAMETER, REQUEST_HEADER, REQUEST_BODY and RESPONSE_HEADER.  */
  name?: string;
}

export interface EndpointConfiguration {
  /** A list of endpoint types of an API (RestApi) or its custom domain name (DomainName). For an edge-optimized API and its custom domain name, the endpoint type is "EDGE". For a regional API and its custo */
  types?: 'REGIONAL' | 'EDGE' | 'PRIVATE'[];
  /** The IP address types that can invoke an API (RestApi) or a DomainName. Use ipv4 to allow only IPv4 addresses to invoke an API or DomainName, or use dualstack to allow both IPv4 and IPv6 addresses to i */
  ipAddressType?: 'ipv4' | 'dualstack';
  /** A list of VpcEndpointIds of an API (RestApi) against which to create Route53 ALIASes. It is only supported for PRIVATE endpoint type. */
  vpcEndpointIds?: string[];
}

export interface MutualTlsAuthenticationInput {
  /** An Amazon S3 URL that specifies the truststore for mutual TLS authentication, for example s3://bucket-name/key-name. The truststore can contain certificates from public or private certificate authorit */
  truststoreUri?: string;
  /** The version of the S3 object that contains your truststore. To specify a version, you must have versioning enabled for the S3 bucket */
  truststoreVersion?: string;
}

export interface CanarySettings {
  /** The percent (0-100) of traffic diverted to a canary deployment. */
  percentTraffic?: number;
  /** The ID of the canary deployment. */
  deploymentId?: string;
  /** Stage variables overridden for a canary release deployment, including new stage variables introduced in the canary. These stage variables are represented as a string-to-string map between stage variab */
  stageVariableOverrides?: Record<string, string>;
  /** A Boolean flag to indicate whether the canary deployment uses the stage cache or not. */
  useStageCache?: boolean;
}

export interface ApiStage {
  /** API Id of the associated API stage in a usage plan. */
  apiId?: string;
  /** API stage name of the associated API stage in a usage plan. */
  stage?: string;
  /** Map containing method level throttling information for API stage in a usage plan. */
  throttle?: Record<string, any>;
}

export interface ThrottleSettings {
  /** The API target request burst rate limit. This allows more requests through for a period of time than the target rate limit. */
  burstLimit?: number;
  /** The API target request rate limit. */
  rateLimit?: number;
}

export interface QuotaSettings {
  /** The target maximum number of requests that can be made in a given time period. */
  limit?: number;
  /** The number of requests subtracted from the given limit in the initial time period. */
  offset?: number;
  /** The time period in which the limit applies. Valid values are "DAY", "WEEK" or "MONTH". */
  period?: 'DAY' | 'WEEK' | 'MONTH';
}

export interface TlsConfig {
  /** Specifies whether or not API Gateway skips verification that the certificate for an integration endpoint is issued by a supported certificate authority. This isn’t recommended, but it enables you to u */
  insecureSkipVerification?: boolean;
}

export interface PatchOperation {
  /** An update operation to be performed with this PATCH request. The valid value can be add, remove, replace or copy. Not all valid operations are supported for a given resource. Support of the operations */
  op?: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';
  /** The op operation's target, as identified by a JSON Pointer value that references a location within the targeted resource. For example, if the target resource has an updateable property of {"name":"val */
  path?: string;
  /** The new target value of the update operation. It is applicable for the add or replace operation. When using AWS CLI to update a property of a JSON value, enclose the JSON object with a pair of single  */
  value?: string;
  /** The copy update operation's source as identified by a JSON-Pointer value referencing the location within the targeted resource to copy the value from. For example, to promote a canary deployment, you  */
  from?: string;
}

/** Request to create an ApiKey resource. */
export interface CreateApiKeyInput {
  /** An Amazon Web Services Marketplace customer identifier, when integrating with the Amazon Web Services SaaS Marketplace. */
  customerId?: string;
  /** The description of the ApiKey. */
  description?: string;
  /** Specifies whether the ApiKey can be used by callers. */
  enabled?: boolean;
  /** Specifies whether (true) or not (false) the key identifier is distinct from the created API key value. This parameter is deprecated and should not be used. */
  generateDistinctId?: boolean;
  /** The name of the ApiKey. */
  name?: string;
  /** DEPRECATED FOR USAGE PLANS - Specifies stages associated with the API key. */
  stageKeys?: StageKey[];
  /** The key-value map of strings. The valid character set is [a-zA-Z+-=._:/]. The tag key can be up to 128 characters and must not start with aws:. The tag value can be up to 256 characters. */
  tags?: Record<string, string>;
  /** Specifies a value of the API key. */
  value?: string;
}

/** Request to add a new Authorizer to an existing RestApi resource. */
export interface CreateAuthorizerInput {
  /** The name of the authorizer. */
  name: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The authorizer type. Valid values are TOKEN for a Lambda function using a single authorization token submitted in a custom header, REQUEST for a Lambda function using incoming request parameters, and  */
  type: 'TOKEN' | 'REQUEST' | 'COGNITO_USER_POOLS';
  /** Specifies the required credentials as an IAM role for API Gateway to invoke the authorizer. To specify an IAM role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To use resource */
  authorizerCredentials?: string;
  /** The TTL in seconds of cached authorizer results. If it equals 0, authorization caching is disabled. If it is greater than 0, API Gateway will cache authorizer responses. If this field is not set, the  */
  authorizerResultTtlInSeconds?: number;
  /** Specifies the authorizer's Uniform Resource Identifier (URI). For TOKEN or REQUEST authorizers, this must be a well-formed Lambda function URI, for example, arn:aws:apigateway:us-west-2:lambda:path/20 */
  authorizerUri?: string;
  /** Optional customer-defined field, used in OpenAPI imports and exports without functional impact. */
  authType?: string;
  /** The identity source for which authorization is requested. For a TOKEN or COGNITO_USER_POOLS authorizer, this is required and specifies the request header mapping expression for the custom header holdi */
  identitySource?: string;
  /** A validation expression for the incoming identity token. For TOKEN authorizers, this value is a regular expression. For COGNITO_USER_POOLS authorizers, API Gateway will match the aud field of the inco */
  identityValidationExpression?: string;
  /** A list of the Amazon Cognito user pool ARNs for the COGNITO_USER_POOLS authorizer. Each element is of this format: arn:aws:cognito-idp:{region}:{account_id}:userpool/{user_pool_id}. For a TOKEN or REQ */
  providerARNs?: string[];
}

/** Requests API Gateway to create a new BasePathMapping resource. */
export interface CreateBasePathMappingInput {
  /** The domain name of the BasePathMapping resource to create. */
  domainName: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The base path name that callers of the API must provide as part of the URL after the domain name. This value must be unique for all of the mappings across a single API. Specify '(none)' if you do not  */
  basePath?: string;
  /** The identifier for the domain name resource. Required for private custom domain names. */
  domainNameId?: string;
  /** The name of the API's stage that you want to use for this mapping. Specify '(none)' if you want callers to explicitly specify the stage name after any base path name. */
  stage?: string;
}

/** Requests API Gateway to create a Deployment resource. */
export interface CreateDeploymentInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** Enables a cache cluster for the Stage resource specified in the input. */
  cacheClusterEnabled?: boolean;
  /** The stage's cache capacity in GB. For more information about choosing a cache size, see Enabling API caching to enhance responsiveness. */
  cacheClusterSize?: '0.5' | '1.6' | '6.1' | '13.5' | '28.4' | '58.2' | '118' | '237';
  /** The input configuration for the canary deployment when the deployment is a canary release deployment. */
  canarySettings?: DeploymentCanarySettings;
  /** The description for the Deployment resource to create. */
  description?: string;
  /** The description of the Stage resource for the Deployment resource to create. */
  stageDescription?: string;
  /** The name of the Stage resource for the Deployment resource to create. */
  stageName?: string;
  /** Specifies whether active tracing with X-ray is enabled for the Stage. */
  tracingEnabled?: boolean;
  /** A map that defines the stage variables for the Stage resource that is associated with the new deployment. Variable names can have alphanumeric and underscore characters, and the values must match [A-Z */
  variables?: Record<string, string>;
}

/** Creates a new documentation part of a given API. */
export interface CreateDocumentationPartInput {
  /** The location of the targeted API entity of the to-be-created documentation part. */
  location: DocumentationPartLocation;
  /** The new documentation content map of the targeted API entity. Enclosed key-value pairs are API-specific, but only OpenAPI-compliant key-value pairs can be exported and, hence, published. */
  properties: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Creates a new documentation version of a given API. */
export interface CreateDocumentationVersionInput {
  /** The version identifier of the new snapshot. */
  documentationVersion: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** A description about the new documentation snapshot. */
  description?: string;
  /** The stage name to be associated with the new documentation snapshot. */
  stageName?: string;
}

/** A request to create a new domain name. */
export interface CreateDomainNameInput {
  /** The name of the DomainName resource. */
  domainName: string;
  /** The reference to an Amazon Web Services-managed certificate that will be used by edge-optimized endpoint or private endpoint for this domain name. Certificate Manager is the only supported source. */
  certificateArn?: string;
  /** [Deprecated] The body of the server certificate that will be used by edge-optimized endpoint or private endpoint for this domain name provided by your certificate authority. */
  certificateBody?: string;
  /** [Deprecated] The intermediate certificates and optionally the root certificate, one after the other without any blank lines, used by an edge-optimized endpoint for this domain name. If you include the */
  certificateChain?: string;
  /** The user-friendly name of the certificate that will be used by edge-optimized endpoint or private endpoint for this domain name. */
  certificateName?: string;
  /** [Deprecated] Your edge-optimized endpoint's domain name certificate's private key. */
  certificatePrivateKey?: string;
  /** The endpoint access mode of the DomainName. Only available for DomainNames that use security policies that start with SecurityPolicy_. */
  endpointAccessMode?: 'BASIC' | 'STRICT';
  /** The endpoint configuration of this DomainName showing the endpoint types and IP address types of the domain name. */
  endpointConfiguration?: EndpointConfiguration;
  mutualTlsAuthentication?: MutualTlsAuthenticationInput;
  /** The ARN of the public certificate issued by ACM to validate ownership of your custom domain. Only required when configuring mutual TLS and using an ACM imported or private CA certificate ARN as the re */
  ownershipVerificationCertificateArn?: string;
  /** A stringified JSON policy document that applies to the execute-api service for this DomainName regardless of the caller and Method configuration. Supported only for private custom domain names. */
  policy?: string;
  /** The reference to an Amazon Web Services-managed certificate that will be used by regional endpoint for this domain name. Certificate Manager is the only supported source. */
  regionalCertificateArn?: string;
  /** The user-friendly name of the certificate that will be used by regional endpoint for this domain name. */
  regionalCertificateName?: string;
  /** The routing mode for this domain name. The routing mode determines how API Gateway sends traffic from your custom domain name to your private APIs. */
  routingMode?: 'BASE_PATH_MAPPING_ONLY' | 'ROUTING_RULE_ONLY' | 'ROUTING_RULE_THEN_BASE_PATH_MAPPING';
  /** The Transport Layer Security (TLS) version + cipher suite for this DomainName. */
  securityPolicy?: 'TLS_1_0' | 'TLS_1_2' | 'SecurityPolicy_TLS13_1_3_2025_09' | 'SecurityPolicy_TLS13_1_3_FIPS_2025_09' | 'SecurityPolicy_TLS13_1_2_PFS_PQ_2025_09' | 'SecurityPolicy_TLS13_1_2_FIPS_PQ_2025_09' | 'SecurityPolicy_TLS13_1_2_PQ_2025_09' | 'SecurityPolicy_TLS13_1_2_2021_06' | 'SecurityPolicy_TLS13_2025_EDGE' | 'SecurityPolicy_TLS12_PFS_2025_EDGE' | 'SecurityPolicy_TLS12_2018_EDGE';
  /** The key-value map of strings. The valid character set is [a-zA-Z+-=._:/]. The tag key can be up to 128 characters and must not start with aws:. The tag value can be up to 256 characters. */
  tags?: Record<string, string>;
}

export interface CreateDomainNameAccessAssociationInput {
  /** The identifier of the domain name access association source. For a VPCE, the value is the VPC endpoint ID. */
  accessAssociationSource: string;
  /** The type of the domain name access association source. */
  accessAssociationSourceType: 'VPCE';
  /** The ARN of the domain name. */
  domainNameArn: string;
  /** The key-value map of strings. The valid character set is [a-zA-Z+-=._:/]. The tag key can be up to 128 characters and must not start with aws:. The tag value can be up to 256 characters. */
  tags?: Record<string, string>;
}

/** Request to add a new Model to an existing RestApi resource. */
export interface CreateModelInput {
  /** The content-type for the model. */
  contentType: string;
  /** The name of the model. Must be alphanumeric. */
  name: string;
  /** The RestApi identifier under which the Model will be created. */
  restApiId: string;
  /** The description of the model. */
  description?: string;
  /** The schema for the model. For application/json models, this should be JSON schema draft 4 model. The maximum size of the model is 400 KB. */
  schema?: string;
}

/** Creates a RequestValidator of a given RestApi. */
export interface CreateRequestValidatorInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The name of the to-be-created RequestValidator. */
  name?: string;
  /** A Boolean flag to indicate whether to validate request body according to the configured model schema for the method (true) or not (false). */
  validateRequestBody?: boolean;
  /** A Boolean flag to indicate whether to validate request parameters, true, or not false. */
  validateRequestParameters?: boolean;
}

/** Requests API Gateway to create a Resource resource. */
export interface CreateResourceInput {
  /** The parent resource's identifier. */
  parentId: string;
  /** The last path segment for this resource. */
  pathPart: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** The POST Request to add a new RestApi resource to your collection. */
export interface CreateRestApiInput {
  /** The name of the RestApi. */
  name: string;
  /** The source of the API key for metering requests according to a usage plan. Valid values are: HEADER to read the API key from the X-API-Key header of a request. AUTHORIZER to read the API key from the  */
  apiKeySource?: 'HEADER' | 'AUTHORIZER';
  /** The list of binary media types supported by the RestApi. By default, the RestApi supports only UTF-8-encoded text payloads. */
  binaryMediaTypes?: string[];
  /** The ID of the RestApi that you want to clone from. */
  cloneFrom?: string;
  /** The description of the RestApi. */
  description?: string;
  /** Specifies whether clients can invoke your API by using the default execute-api endpoint. By default, clients can invoke your API with the default https://{api_id}.execute-api.{region}.amazonaws.com en */
  disableExecuteApiEndpoint?: boolean;
  /** The endpoint access mode of the RestApi. Only available for RestApis that use security policies that start with SecurityPolicy_. */
  endpointAccessMode?: 'BASIC' | 'STRICT';
  /** The endpoint configuration of this RestApi showing the endpoint types and IP address types of the API. */
  endpointConfiguration?: EndpointConfiguration;
  /** A nullable integer that is used to enable compression (with non-negative between 0 and 10485760 (10M) bytes, inclusive) or disable compression (with a null value) on an API. When compression is enable */
  minimumCompressionSize?: number;
  /** A stringified JSON policy document that applies to this RestApi regardless of the caller and Method configuration. */
  policy?: string;
  /** The Transport Layer Security (TLS) version + cipher suite for this RestApi. */
  securityPolicy?: 'TLS_1_0' | 'TLS_1_2' | 'SecurityPolicy_TLS13_1_3_2025_09' | 'SecurityPolicy_TLS13_1_3_FIPS_2025_09' | 'SecurityPolicy_TLS13_1_2_PFS_PQ_2025_09' | 'SecurityPolicy_TLS13_1_2_FIPS_PQ_2025_09' | 'SecurityPolicy_TLS13_1_2_PQ_2025_09' | 'SecurityPolicy_TLS13_1_2_2021_06' | 'SecurityPolicy_TLS13_2025_EDGE' | 'SecurityPolicy_TLS12_PFS_2025_EDGE' | 'SecurityPolicy_TLS12_2018_EDGE';
  /** The key-value map of strings. The valid character set is [a-zA-Z+-=._:/]. The tag key can be up to 128 characters and must not start with aws:. The tag value can be up to 256 characters. */
  tags?: Record<string, string>;
  /** A version identifier for the API. */
  version?: string;
}

/** Requests API Gateway to create a Stage resource. */
export interface CreateStageInput {
  /** The identifier of the Deployment resource for the Stage resource. */
  deploymentId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The name for the Stage resource. Stage names can only contain alphanumeric characters, hyphens, and underscores. Maximum length is 128 characters. */
  stageName: string;
  /** Whether cache clustering is enabled for the stage. */
  cacheClusterEnabled?: boolean;
  /** The stage's cache capacity in GB. For more information about choosing a cache size, see Enabling API caching to enhance responsiveness. */
  cacheClusterSize?: '0.5' | '1.6' | '6.1' | '13.5' | '28.4' | '58.2' | '118' | '237';
  /** The canary deployment settings of this stage. */
  canarySettings?: CanarySettings;
  /** The description of the Stage resource. */
  description?: string;
  /** The version of the associated API documentation. */
  documentationVersion?: string;
  /** The key-value map of strings. The valid character set is [a-zA-Z+-=._:/]. The tag key can be up to 128 characters and must not start with aws:. The tag value can be up to 256 characters. */
  tags?: Record<string, string>;
  /** Specifies whether active tracing with X-ray is enabled for the Stage. */
  tracingEnabled?: boolean;
  /** A map that defines the stage variables for the new Stage resource. Variable names can have alphanumeric and underscore characters, and the values must match [A-Za-z0-9-._~:/?#&=,]+. */
  variables?: Record<string, string>;
}

/** The POST request to create a usage plan with the name, description, throttle limits and quota limits, as well as the associated API stages, specified in the payload. */
export interface CreateUsagePlanInput {
  /** The name of the usage plan. */
  name: string;
  /** The associated API stages of the usage plan. */
  apiStages?: ApiStage[];
  /** The description of the usage plan. */
  description?: string;
  /** The quota of the usage plan. */
  quota?: QuotaSettings;
  /** The key-value map of strings. The valid character set is [a-zA-Z+-=._:/]. The tag key can be up to 128 characters and must not start with aws:. The tag value can be up to 256 characters. */
  tags?: Record<string, string>;
  /** The throttling limits of the usage plan. */
  throttle?: ThrottleSettings;
}

/** The POST request to create a usage plan key for adding an existing API key to a usage plan. */
export interface CreateUsagePlanKeyInput {
  /** The identifier of a UsagePlanKey resource for a plan customer. */
  keyId: string;
  /** The type of a UsagePlanKey resource for a plan customer. */
  keyType: string;
  /** The Id of the UsagePlan resource representing the usage plan containing the to-be-created UsagePlanKey resource representing a plan customer. */
  usagePlanId: string;
}

/** Creates a VPC link, under the caller's account in a selected region, in an asynchronous operation that typically takes 2-4 minutes to complete and become operational. The caller must have permissions  */
export interface CreateVpcLinkInput {
  /** The name used to label and identify the VPC link. */
  name: string;
  /** The ARN of the network load balancer of the VPC targeted by the VPC link. The network load balancer must be owned by the same Amazon Web Services account of the API owner. */
  targetArns: string[];
  /** The description of the VPC link. */
  description?: string;
  /** The key-value map of strings. The valid character set is [a-zA-Z+-=._:/]. The tag key can be up to 128 characters and must not start with aws:. The tag value can be up to 256 characters. */
  tags?: Record<string, string>;
}

/** A request to delete the ApiKey resource. */
export interface DeleteApiKeyInput {
  /** The identifier of the ApiKey resource to be deleted. */
  apiKey: string;
}

/** Request to delete an existing Authorizer resource. */
export interface DeleteAuthorizerInput {
  /** The identifier of the Authorizer resource. */
  authorizerId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** A request to delete the BasePathMapping resource. */
export interface DeleteBasePathMappingInput {
  /** The base path name of the BasePathMapping resource to delete. To specify an empty base path, set this parameter to '(none)'. */
  basePath: string;
  /** The domain name of the BasePathMapping resource to delete. */
  domainName: string;
  /** The identifier for the domain name resource. Supported only for private custom domain names. */
  domainNameId?: string;
}

/** A request to delete the ClientCertificate resource. */
export interface DeleteClientCertificateInput {
  /** The identifier of the ClientCertificate resource to be deleted. */
  clientCertificateId: string;
}

/** Requests API Gateway to delete a Deployment resource. */
export interface DeleteDeploymentInput {
  /** The identifier of the Deployment resource to delete. */
  deploymentId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Deletes an existing documentation part of an API. */
export interface DeleteDocumentationPartInput {
  /** The identifier of the to-be-deleted documentation part. */
  documentationPartId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Deletes an existing documentation version of an API. */
export interface DeleteDocumentationVersionInput {
  /** The version identifier of a to-be-deleted documentation snapshot. */
  documentationVersion: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** A request to delete the DomainName resource. */
export interface DeleteDomainNameInput {
  /** The name of the DomainName resource to be deleted. */
  domainName: string;
  /** The identifier for the domain name resource. Supported only for private custom domain names. */
  domainNameId?: string;
}

export interface DeleteDomainNameAccessAssociationInput {
  /** The ARN of the domain name access association resource. */
  domainNameAccessAssociationArn: string;
}

/** Clears any customization of a GatewayResponse of a specified response type on the given RestApi and resets it with the default settings. */
export interface DeleteGatewayResponseInput {
  /** The response type of the associated GatewayResponse. */
  responseType: 'DEFAULT_4XX' | 'DEFAULT_5XX' | 'RESOURCE_NOT_FOUND' | 'UNAUTHORIZED' | 'INVALID_API_KEY' | 'ACCESS_DENIED' | 'AUTHORIZER_FAILURE' | 'AUTHORIZER_CONFIGURATION_ERROR' | 'INVALID_SIGNATURE' | 'EXPIRED_TOKEN' | 'MISSING_AUTHENTICATION_TOKEN' | 'INTEGRATION_FAILURE' | 'INTEGRATION_TIMEOUT' | 'API_CONFIGURATION_ERROR' | 'UNSUPPORTED_MEDIA_TYPE' | 'BAD_REQUEST_PARAMETERS' | 'BAD_REQUEST_BODY' | 'REQUEST_TOO_LARGE' | 'THROTTLED' | 'QUOTA_EXCEEDED' | 'WAF_FILTERED';
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Represents a delete integration request. */
export interface DeleteIntegrationInput {
  /** Specifies a delete integration request's HTTP method. */
  httpMethod: string;
  /** Specifies a delete integration request's resource identifier. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Represents a delete integration response request. */
export interface DeleteIntegrationResponseInput {
  /** Specifies a delete integration response request's HTTP method. */
  httpMethod: string;
  /** Specifies a delete integration response request's resource identifier. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** Specifies a delete integration response request's status code. */
  statusCode: string;
}

/** Request to delete an existing Method resource. */
export interface DeleteMethodInput {
  /** The HTTP verb of the Method resource. */
  httpMethod: string;
  /** The Resource identifier for the Method resource. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** A request to delete an existing MethodResponse resource. */
export interface DeleteMethodResponseInput {
  /** The HTTP verb of the Method resource. */
  httpMethod: string;
  /** The Resource identifier for the MethodResponse resource. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The status code identifier for the MethodResponse resource. */
  statusCode: string;
}

/** Request to delete an existing model in an existing RestApi resource. */
export interface DeleteModelInput {
  /** The name of the model to delete. */
  modelName: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Deletes a specified RequestValidator of a given RestApi. */
export interface DeleteRequestValidatorInput {
  /** The identifier of the RequestValidator to be deleted. */
  requestValidatorId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Request to delete a Resource. */
export interface DeleteResourceInput {
  /** The identifier of the Resource resource. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Request to delete the specified API from your collection. */
export interface DeleteRestApiInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Requests API Gateway to delete a Stage resource. */
export interface DeleteStageInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The name of the Stage resource to delete. */
  stageName: string;
}

/** The DELETE request to delete a usage plan of a given plan Id. */
export interface DeleteUsagePlanInput {
  /** The Id of the to-be-deleted usage plan. */
  usagePlanId: string;
}

/** The DELETE request to delete a usage plan key and remove the underlying API key from the associated usage plan. */
export interface DeleteUsagePlanKeyInput {
  /** The Id of the UsagePlanKey resource to be deleted. */
  keyId: string;
  /** The Id of the UsagePlan resource representing the usage plan containing the to-be-deleted UsagePlanKey resource representing a plan customer. */
  usagePlanId: string;
}

/** Deletes an existing VpcLink of a specified identifier. */
export interface DeleteVpcLinkInput {
  /** The identifier of the VpcLink. It is used in an Integration to reference this VpcLink. */
  vpcLinkId: string;
}

/** Request to flush authorizer cache entries on a specified stage. */
export interface FlushStageAuthorizersCacheInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The name of the stage to flush. */
  stageName: string;
}

/** Requests API Gateway to flush a stage's cache. */
export interface FlushStageCacheInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The name of the stage to flush its cache. */
  stageName: string;
}

/** A request to generate a ClientCertificate resource. */
export interface GenerateClientCertificateInput {
  /** The description of the ClientCertificate. */
  description?: string;
  /** The key-value map of strings. The valid character set is [a-zA-Z+-=._:/]. The tag key can be up to 128 characters and must not start with aws:. The tag value can be up to 256 characters. */
  tags?: Record<string, string>;
}

/** A request to get information about the current ApiKey resource. */
export interface GetApiKeyInput {
  /** The identifier of the ApiKey resource. */
  apiKey: string;
  /** A boolean flag to specify whether (true) or not (false) the result contains the key value. */
  includeValue?: boolean;
}

/** A request to get information about the current ApiKeys resource. */
export interface GetApiKeysInput {
  /** The identifier of a customer in Amazon Web Services Marketplace or an external system, such as a developer portal. */
  customerId?: string;
  /** A boolean flag to specify whether (true) or not (false) the result contains key values. */
  includeValues?: boolean;
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The name of queried API keys. */
  nameQuery?: string;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** Request to describe an existing Authorizer resource. */
export interface GetAuthorizerInput {
  /** The identifier of the Authorizer resource. */
  authorizerId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Request to describe an existing Authorizers resource. */
export interface GetAuthorizersInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** Request to describe a BasePathMapping resource. */
export interface GetBasePathMappingInput {
  /** The base path name that callers of the API must provide as part of the URL after the domain name. This value must be unique for all of the mappings across a single API. Specify '(none)' if you do not  */
  basePath: string;
  /** The domain name of the BasePathMapping resource to be described. */
  domainName: string;
  /** The identifier for the domain name resource. Supported only for private custom domain names. */
  domainNameId?: string;
}

/** A request to get information about a collection of BasePathMapping resources. */
export interface GetBasePathMappingsInput {
  /** The domain name of a BasePathMapping resource. */
  domainName: string;
  /** The identifier for the domain name resource. Supported only for private custom domain names. */
  domainNameId?: string;
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** A request to get information about the current ClientCertificate resource. */
export interface GetClientCertificateInput {
  /** The identifier of the ClientCertificate resource to be described. */
  clientCertificateId: string;
}

/** A request to get information about a collection of ClientCertificate resources. */
export interface GetClientCertificatesInput {
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** Requests API Gateway to get information about a Deployment resource. */
export interface GetDeploymentInput {
  /** The identifier of the Deployment resource to get information about. */
  deploymentId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** A query parameter to retrieve the specified embedded resources of the returned Deployment resource in the response. In a REST API call, this embed parameter value is a list of comma-separated strings, */
  embed?: string[];
}

/** Requests API Gateway to get information about a Deployments collection. */
export interface GetDeploymentsInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** Gets a specified documentation part of a given API. */
export interface GetDocumentationPartInput {
  /** The string identifier of the associated RestApi. */
  documentationPartId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Gets the documentation parts of an API. The result may be filtered by the type, name, or path of API entities (targets). */
export interface GetDocumentationPartsInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The status of the API documentation parts to retrieve. Valid values are DOCUMENTED for retrieving DocumentationPart resources with content and UNDOCUMENTED for DocumentationPart resources without cont */
  locationStatus?: 'DOCUMENTED' | 'UNDOCUMENTED';
  /** The name of API entities of the to-be-retrieved documentation parts. */
  nameQuery?: string;
  /** The path of API entities of the to-be-retrieved documentation parts. */
  path?: string;
  /** The current pagination position in the paged result set. */
  position?: string;
  /** The type of API entities of the to-be-retrieved documentation parts. */
  type?: 'API' | 'AUTHORIZER' | 'MODEL' | 'RESOURCE' | 'METHOD' | 'PATH_PARAMETER' | 'QUERY_PARAMETER' | 'REQUEST_HEADER' | 'REQUEST_BODY' | 'RESPONSE' | 'RESPONSE_HEADER' | 'RESPONSE_BODY';
}

/** Gets a documentation snapshot of an API. */
export interface GetDocumentationVersionInput {
  /** The version identifier of the to-be-retrieved documentation snapshot. */
  documentationVersion: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Gets the documentation versions of an API. */
export interface GetDocumentationVersionsInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** Request to get the name of a DomainName resource. */
export interface GetDomainNameInput {
  /** The name of the DomainName resource. */
  domainName: string;
  /** The identifier for the domain name resource. Required for private custom domain names. */
  domainNameId?: string;
}

export interface GetDomainNameAccessAssociationsInput {
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
  /** The owner of the domain name access association. Use SELF to only list the domain name access associations owned by your own account. Use OTHER_ACCOUNTS to list the domain name access associations wit */
  resourceOwner?: 'SELF' | 'OTHER_ACCOUNTS';
}

/** Request to describe a collection of DomainName resources. */
export interface GetDomainNamesInput {
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
  /** The owner of the domain name access association. */
  resourceOwner?: 'SELF' | 'OTHER_ACCOUNTS';
}

/** Request a new export of a RestApi for a particular Stage. */
export interface GetExportInput {
  /** The type of export. Acceptable values are 'oas30' for OpenAPI 3.0.x and 'swagger' for Swagger/OpenAPI 2.0. */
  exportType: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The name of the Stage that will be exported. */
  stageName: string;
  /** The content-type of the export, for example application/json. Currently application/json and application/yaml are supported for exportType ofoas30 and swagger. This should be specified in the Accept h */
  accepts?: string;
  /** A key-value map of query string parameters that specify properties of the export, depending on the requested exportType. For exportType oas30 and swagger, any combination of the following parameters a */
  parameters?: Record<string, string>;
}

/** Gets a GatewayResponse of a specified response type on the given RestApi. */
export interface GetGatewayResponseInput {
  /** The response type of the associated GatewayResponse. */
  responseType: 'DEFAULT_4XX' | 'DEFAULT_5XX' | 'RESOURCE_NOT_FOUND' | 'UNAUTHORIZED' | 'INVALID_API_KEY' | 'ACCESS_DENIED' | 'AUTHORIZER_FAILURE' | 'AUTHORIZER_CONFIGURATION_ERROR' | 'INVALID_SIGNATURE' | 'EXPIRED_TOKEN' | 'MISSING_AUTHENTICATION_TOKEN' | 'INTEGRATION_FAILURE' | 'INTEGRATION_TIMEOUT' | 'API_CONFIGURATION_ERROR' | 'UNSUPPORTED_MEDIA_TYPE' | 'BAD_REQUEST_PARAMETERS' | 'BAD_REQUEST_BODY' | 'REQUEST_TOO_LARGE' | 'THROTTLED' | 'QUOTA_EXCEEDED' | 'WAF_FILTERED';
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Gets the GatewayResponses collection on the given RestApi. If an API developer has not added any definitions for gateway responses, the result will be the API Gateway-generated default GatewayResponse */
export interface GetGatewayResponsesInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. The GatewayResponses collection does not support pagination and the limit does not apply here. */
  limit?: number;
  /** The current pagination position in the paged result set. The GatewayResponse collection does not support pagination and the position does not apply here. */
  position?: string;
}

/** Represents a request to get the integration configuration. */
export interface GetIntegrationInput {
  /** Specifies a get integration request's HTTP method. */
  httpMethod: string;
  /** Specifies a get integration request's resource identifier */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Represents a get integration response request. */
export interface GetIntegrationResponseInput {
  /** Specifies a get integration response request's HTTP method. */
  httpMethod: string;
  /** Specifies a get integration response request's resource identifier. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** Specifies a get integration response request's status code. */
  statusCode: string;
}

/** Request to describe an existing Method resource. */
export interface GetMethodInput {
  /** Specifies the method request's HTTP method type. */
  httpMethod: string;
  /** The Resource identifier for the Method resource. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Request to describe a MethodResponse resource. */
export interface GetMethodResponseInput {
  /** The HTTP verb of the Method resource. */
  httpMethod: string;
  /** The Resource identifier for the MethodResponse resource. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The status code for the MethodResponse resource. */
  statusCode: string;
}

/** Request to list information about a model in an existing RestApi resource. */
export interface GetModelInput {
  /** The name of the model as an identifier. */
  modelName: string;
  /** The RestApi identifier under which the Model exists. */
  restApiId: string;
  /** A query parameter of a Boolean value to resolve (true) all external model references and returns a flattened model schema or not (false) The default is false. */
  flatten?: boolean;
}

/** Request to list existing Models defined for a RestApi resource. */
export interface GetModelsInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** Request to generate a sample mapping template used to transform the payload. */
export interface GetModelTemplateInput {
  /** The name of the model for which to generate a template. */
  modelName: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Gets a RequestValidator of a given RestApi. */
export interface GetRequestValidatorInput {
  /** The identifier of the RequestValidator to be retrieved. */
  requestValidatorId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** Gets the RequestValidators collection of a given RestApi. */
export interface GetRequestValidatorsInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** Request to list information about a resource. */
export interface GetResourceInput {
  /** The identifier for the Resource resource. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** A query parameter to retrieve the specified resources embedded in the returned Resource representation in the response. This embed parameter value is a list of comma-separated strings. Currently, the  */
  embed?: string[];
}

/** Request to list information about a collection of resources. */
export interface GetResourcesInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** A query parameter used to retrieve the specified resources embedded in the returned Resources resource in the response. This embed parameter value is a list of comma-separated strings. Currently, the  */
  embed?: string[];
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** The GET request to list an existing RestApi defined for your collection. */
export interface GetRestApiInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
}

/** The GET request to list existing RestApis defined for your collection. */
export interface GetRestApisInput {
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** Request a new generated client SDK for a RestApi and Stage. */
export interface GetSdkInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The language for the generated SDK. Currently java, javascript, android, objectivec (for iOS), swift (for iOS), and ruby are supported. */
  sdkType: string;
  /** The name of the Stage that the SDK will use. */
  stageName: string;
  /** A string-to-string key-value map of query parameters sdkType-dependent properties of the SDK. For sdkType of objectivec or swift, a parameter named classPrefix is required. For sdkType of android, par */
  parameters?: Record<string, string>;
}

/** Get an SdkType instance. */
export interface GetSdkTypeInput {
  /** The identifier of the queried SdkType instance. */
  id: string;
}

/** Get the SdkTypes collection. */
export interface GetSdkTypesInput {
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** Requests API Gateway to get information about a Stage resource. */
export interface GetStageInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The name of the Stage resource to get information about. */
  stageName: string;
}

/** Requests API Gateway to get information about one or more Stage resources. */
export interface GetStagesInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The stages' deployment identifiers. */
  deploymentId?: string;
}

/** Gets the Tags collection for a given resource. */
export interface GetTagsInput {
  /** The ARN of a resource that can be tagged. */
  resourceArn: string;
  /** (Not currently supported) The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** (Not currently supported) The current pagination position in the paged result set. */
  position?: string;
}

/** The GET request to get the usage data of a usage plan in a specified time interval. */
export interface GetUsageInput {
  /** The ending date (e.g., 2016-12-31) of the usage data. */
  endDate: string;
  /** The starting date (e.g., 2016-01-01) of the usage data. */
  startDate: string;
  /** The Id of the usage plan associated with the usage data. */
  usagePlanId: string;
  /** The Id of the API key associated with the resultant usage data. */
  keyId?: string;
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** The GET request to get a usage plan of a given plan identifier. */
export interface GetUsagePlanInput {
  /** The identifier of the UsagePlan resource to be retrieved. */
  usagePlanId: string;
}

/** The GET request to get a usage plan key of a given key identifier. */
export interface GetUsagePlanKeyInput {
  /** The key Id of the to-be-retrieved UsagePlanKey resource representing a plan customer. */
  keyId: string;
  /** The Id of the UsagePlan resource representing the usage plan containing the to-be-retrieved UsagePlanKey resource representing a plan customer. */
  usagePlanId: string;
}

/** The GET request to get all the usage plan keys representing the API keys added to a specified usage plan. */
export interface GetUsagePlanKeysInput {
  /** The Id of the UsagePlan resource representing the usage plan containing the to-be-retrieved UsagePlanKey resource representing a plan customer. */
  usagePlanId: string;
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** A query parameter specifying the name of the to-be-returned usage plan keys. */
  nameQuery?: string;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** The GET request to get all the usage plans of the caller's account. */
export interface GetUsagePlansInput {
  /** The identifier of the API key associated with the usage plans. */
  keyId?: string;
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** Gets a specified VPC link under the caller's account in a region. */
export interface GetVpcLinkInput {
  /** The identifier of the VpcLink. It is used in an Integration to reference this VpcLink. */
  vpcLinkId: string;
}

/** Gets the VpcLinks collection under the caller's account in a selected region. */
export interface GetVpcLinksInput {
  /** The maximum number of returned results per page. The default value is 25 and the maximum value is 500. */
  limit?: number;
  /** The current pagination position in the paged result set. */
  position?: string;
}

/** The POST request to import API keys from an external source, such as a CSV-formatted file. */
export interface ImportApiKeysInput {
  /** The payload of the POST request to import API keys. For the payload format, see API Key File Format. */
  body: string;
  /** A query parameter to specify the input format to imported API keys. Currently, only the csv format is supported. */
  format: 'csv';
  /** A query parameter to indicate whether to rollback ApiKey importation (true) or not (false) when error is encountered. */
  failOnWarnings?: boolean;
}

/** Import documentation parts from an external (e.g., OpenAPI) definition file. */
export interface ImportDocumentationPartsInput {
  /** Raw byte array representing the to-be-imported documentation parts. To import from an OpenAPI file, this is a JSON object. */
  body: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** A query parameter to specify whether to rollback the documentation importation (true) or not (false) when a warning is encountered. The default value is false. */
  failOnWarnings?: boolean;
  /** A query parameter to indicate whether to overwrite (overwrite) any existing DocumentationParts definition or to merge (merge) the new definition into the existing one. The default value is merge. */
  mode?: 'merge' | 'overwrite';
}

/** A POST request to import an API to API Gateway using an input of an API definition file. */
export interface ImportRestApiInput {
  /** The POST request body containing external API definitions. Currently, only OpenAPI definition JSON/YAML files are supported. The maximum size of the API definition file is 6MB. */
  body: string;
  /** A query parameter to indicate whether to rollback the API creation (true) or not (false) when a warning is encountered. The default value is false. */
  failOnWarnings?: boolean;
  /** A key-value map of context-specific query string parameters specifying the behavior of different API importing operations. The following shows operation-specific parameters and their supported values. */
  parameters?: Record<string, string>;
}

/** Creates a customization of a GatewayResponse of a specified response type and status code on the given RestApi. */
export interface PutGatewayResponseInput {
  /** The response type of the associated GatewayResponse */
  responseType: 'DEFAULT_4XX' | 'DEFAULT_5XX' | 'RESOURCE_NOT_FOUND' | 'UNAUTHORIZED' | 'INVALID_API_KEY' | 'ACCESS_DENIED' | 'AUTHORIZER_FAILURE' | 'AUTHORIZER_CONFIGURATION_ERROR' | 'INVALID_SIGNATURE' | 'EXPIRED_TOKEN' | 'MISSING_AUTHENTICATION_TOKEN' | 'INTEGRATION_FAILURE' | 'INTEGRATION_TIMEOUT' | 'API_CONFIGURATION_ERROR' | 'UNSUPPORTED_MEDIA_TYPE' | 'BAD_REQUEST_PARAMETERS' | 'BAD_REQUEST_BODY' | 'REQUEST_TOO_LARGE' | 'THROTTLED' | 'QUOTA_EXCEEDED' | 'WAF_FILTERED';
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** Response parameters (paths, query strings and headers) of the GatewayResponse as a string-to-string map of key-value pairs. */
  responseParameters?: Record<string, string>;
  /** Response templates of the GatewayResponse as a string-to-string map of key-value pairs. */
  responseTemplates?: Record<string, string>;
  /** The HTTP status code of the GatewayResponse. */
  statusCode?: string;
}

/** Sets up a method's integration. */
export interface PutIntegrationInput {
  /** Specifies the HTTP method for the integration. */
  httpMethod: string;
  /** Specifies a put integration request's resource ID. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** Specifies a put integration input's type. */
  type: 'HTTP' | 'AWS' | 'MOCK' | 'HTTP_PROXY' | 'AWS_PROXY';
  /** A list of request parameters whose values API Gateway caches. To be valid values for cacheKeyParameters, these parameters must also be specified for Method requestParameters. */
  cacheKeyParameters?: string[];
  /** Specifies a group of related cached parameters. By default, API Gateway uses the resource ID as the cacheNamespace. You can specify the same cacheNamespace across resources to return the same cached d */
  cacheNamespace?: string;
  /** The ID of the VpcLink used for the integration. Specify this value only if you specify VPC_LINK as the connection type. */
  connectionId?: string;
  /** The type of the network connection to the integration endpoint. The valid value is INTERNET for connections through the public routable internet or VPC_LINK for private connections between API Gateway */
  connectionType?: 'INTERNET' | 'VPC_LINK';
  /** Specifies how to handle request payload content type conversions. Supported values are CONVERT_TO_BINARY and CONVERT_TO_TEXT, with the following behaviors: If this property is not defined, the request */
  contentHandling?: 'CONVERT_TO_BINARY' | 'CONVERT_TO_TEXT';
  /** Specifies whether credentials are required for a put integration. */
  credentials?: string;
  /** The HTTP method for the integration. */
  integrationHttpMethod?: string;
  /** The ALB or NLB listener to send the request to. */
  integrationTarget?: string;
  /** Specifies the pass-through behavior for incoming requests based on the Content-Type header in the request, and the available mapping templates specified as the requestTemplates property on the Integra */
  passthroughBehavior?: string;
  /** A key-value map specifying request parameters that are passed from the method request to the back end. The key is an integration request parameter name and the associated value is a method request par */
  requestParameters?: Record<string, string>;
  /** Represents a map of Velocity templates that are applied on the request payload based on the value of the Content-Type header sent by the client. The content type value is the key in this map, and the  */
  requestTemplates?: Record<string, string>;
  /** The response transfer mode of the integration. */
  responseTransferMode?: 'BUFFERED' | 'STREAM';
  /** Custom timeout between 50 and 29,000 milliseconds. The default value is 29,000 milliseconds or 29 seconds. You can increase the default value to longer than 29 seconds for Regional or private APIs onl */
  timeoutInMillis?: number;
  tlsConfig?: TlsConfig;
  /** Specifies Uniform Resource Identifier (URI) of the integration endpoint. For HTTP or HTTP_PROXY integrations, the URI must be a fully formed, encoded HTTP(S) URL according to the RFC-3986 specificatio */
  uri?: string;
}

/** Represents a put integration response request. */
export interface PutIntegrationResponseInput {
  /** Specifies a put integration response request's HTTP method. */
  httpMethod: string;
  /** Specifies a put integration response request's resource identifier. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** Specifies the status code that is used to map the integration response to an existing MethodResponse. */
  statusCode: string;
  /** Specifies how to handle response payload content type conversions. Supported values are CONVERT_TO_BINARY and CONVERT_TO_TEXT, with the following behaviors: If this property is not defined, the respon */
  contentHandling?: 'CONVERT_TO_BINARY' | 'CONVERT_TO_TEXT';
  /** A key-value map specifying response parameters that are passed to the method response from the back end. The key is a method response header parameter name and the mapped value is an integration respo */
  responseParameters?: Record<string, string>;
  /** Specifies a put integration response's templates. */
  responseTemplates?: Record<string, string>;
  /** Specifies the selection pattern of a put integration response. */
  selectionPattern?: string;
}

/** Request to add a method to an existing Resource resource. */
export interface PutMethodInput {
  /** The method's authorization type. Valid values are NONE for open access, AWS_IAM for using AWS IAM permissions, CUSTOM for using a custom authorizer, or COGNITO_USER_POOLS for using a Cognito user pool */
  authorizationType: string;
  /** Specifies the method request's HTTP method type. */
  httpMethod: string;
  /** The Resource identifier for the new Method resource. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** Specifies whether the method required a valid ApiKey. */
  apiKeyRequired?: boolean;
  /** A list of authorization scopes configured on the method. The scopes are used with a COGNITO_USER_POOLS authorizer to authorize the method invocation. The authorization works by matching the method sco */
  authorizationScopes?: string[];
  /** Specifies the identifier of an Authorizer to use on this Method, if the type is CUSTOM or COGNITO_USER_POOLS. The authorizer identifier is generated by API Gateway when you created the authorizer. */
  authorizerId?: string;
  /** A human-friendly operation identifier for the method. For example, you can assign the operationName of ListPets for the GET /pets method in the PetStore example. */
  operationName?: string;
  /** Specifies the Model resources used for the request's content type. Request models are represented as a key/value map, with a content type as the key and a Model name as the value. */
  requestModels?: Record<string, string>;
  /** A key-value map defining required or optional method request parameters that can be accepted by API Gateway. A key defines a method request parameter name matching the pattern of method.request.{locat */
  requestParameters?: Record<string, boolean>;
  /** The identifier of a RequestValidator for validating the method request. */
  requestValidatorId?: string;
}

/** Request to add a MethodResponse to an existing Method resource. */
export interface PutMethodResponseInput {
  /** The HTTP verb of the Method resource. */
  httpMethod: string;
  /** The Resource identifier for the Method resource. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The method response's status code. */
  statusCode: string;
  /** Specifies the Model resources used for the response's content type. Response models are represented as a key/value map, with a content type as the key and a Model name as the value. */
  responseModels?: Record<string, string>;
  /** A key-value map specifying required or optional response parameters that API Gateway can send back to the caller. A key defines a method response header name and the associated value is a Boolean flag */
  responseParameters?: Record<string, boolean>;
}

/** A PUT request to update an existing API, with external API definitions specified as the request body. */
export interface PutRestApiInput {
  /** The PUT request body containing external API definitions. Currently, only OpenAPI definition JSON/YAML files are supported. The maximum size of the API definition file is 6MB. */
  body: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** A query parameter to indicate whether to rollback the API update (true) or not (false) when a warning is encountered. The default value is false. */
  failOnWarnings?: boolean;
  /** The mode query parameter to specify the update mode. Valid values are "merge" and "overwrite". By default, the update mode is "merge". */
  mode?: 'merge' | 'overwrite';
  /** Custom header parameters as part of the request. For example, to exclude DocumentationParts from an imported API, set ignore=documentation as a parameters value, as in the AWS CLI command of aws apiga */
  parameters?: Record<string, string>;
}

export interface RejectDomainNameAccessAssociationInput {
  /** The ARN of the domain name access association resource. */
  domainNameAccessAssociationArn: string;
  /** The ARN of the domain name. */
  domainNameArn: string;
}

/** Adds or updates a tag on a given resource. */
export interface TagResourceInput {
  /** The ARN of a resource that can be tagged. */
  resourceArn: string;
  /** The key-value map of strings. The valid character set is [a-zA-Z+-=._:/]. The tag key can be up to 128 characters and must not start with aws:. The tag value can be up to 256 characters. */
  tags: Record<string, string>;
}

/** Make a request to simulate the invocation of an Authorizer. */
export interface TestInvokeAuthorizerInput {
  /** Specifies a test invoke authorizer request's Authorizer ID. */
  authorizerId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** A key-value map of additional context variables. */
  additionalContext?: Record<string, string>;
  /** The simulated request body of an incoming invocation request. */
  body?: string;
  /** A key-value map of headers to simulate an incoming invocation request. This is where the incoming authorization token, or identity source, should be specified. */
  headers?: Record<string, string>;
  /** The headers as a map from string to list of values to simulate an incoming invocation request. This is where the incoming authorization token, or identity source, may be specified. */
  multiValueHeaders?: Record<string, string[]>;
  /** The URI path, including query string, of the simulated invocation request. Use this to specify path parameters and query string parameters. */
  pathWithQueryString?: string;
  /** A key-value map of stage variables to simulate an invocation on a deployed Stage. */
  stageVariables?: Record<string, string>;
}

/** Make a request to simulate the invocation of a Method. */
export interface TestInvokeMethodInput {
  /** Specifies a test invoke method request's HTTP method. */
  httpMethod: string;
  /** Specifies a test invoke method request's resource ID. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The simulated request body of an incoming invocation request. */
  body?: string;
  /** A ClientCertificate identifier to use in the test invocation. API Gateway will use the certificate when making the HTTPS request to the defined back-end endpoint. */
  clientCertificateId?: string;
  /** A key-value map of headers to simulate an incoming invocation request. */
  headers?: Record<string, string>;
  /** The headers as a map from string to list of values to simulate an incoming invocation request. */
  multiValueHeaders?: Record<string, string[]>;
  /** The URI path, including query string, of the simulated invocation request. Use this to specify path parameters and query string parameters. */
  pathWithQueryString?: string;
  /** A key-value map of stage variables to simulate an invocation on a deployed Stage. */
  stageVariables?: Record<string, string>;
}

/** Removes a tag from a given resource. */
export interface UntagResourceInput {
  /** The ARN of a resource that can be tagged. */
  resourceArn: string;
  /** The Tag keys to delete. */
  tagKeys: string[];
}

/** Requests API Gateway to change information about the current Account resource. */
export interface UpdateAccountInput {
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** A request to change information about an ApiKey resource. */
export interface UpdateApiKeyInput {
  /** The identifier of the ApiKey resource to be updated. */
  apiKey: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Request to update an existing Authorizer resource. */
export interface UpdateAuthorizerInput {
  /** The identifier of the Authorizer resource. */
  authorizerId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** A request to change information about the BasePathMapping resource. */
export interface UpdateBasePathMappingInput {
  /** The base path of the BasePathMapping resource to change. To specify an empty base path, set this parameter to '(none)'. */
  basePath: string;
  /** The domain name of the BasePathMapping resource to change. */
  domainName: string;
  /** The identifier for the domain name resource. Supported only for private custom domain names. */
  domainNameId?: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** A request to change information about an ClientCertificate resource. */
export interface UpdateClientCertificateInput {
  /** The identifier of the ClientCertificate resource to be updated. */
  clientCertificateId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Requests API Gateway to change information about a Deployment resource. */
export interface UpdateDeploymentInput {
  /** The replacement identifier for the Deployment resource to change information about. */
  deploymentId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Updates an existing documentation part of a given API. */
export interface UpdateDocumentationPartInput {
  /** The identifier of the to-be-updated documentation part. */
  documentationPartId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Updates an existing documentation version of an API. */
export interface UpdateDocumentationVersionInput {
  /** The version identifier of the to-be-updated documentation version. */
  documentationVersion: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** A request to change information about the DomainName resource. */
export interface UpdateDomainNameInput {
  /** The name of the DomainName resource to be changed. */
  domainName: string;
  /** The identifier for the domain name resource. Supported only for private custom domain names. */
  domainNameId?: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Updates a GatewayResponse of a specified response type on the given RestApi. */
export interface UpdateGatewayResponseInput {
  /** The response type of the associated GatewayResponse. */
  responseType: 'DEFAULT_4XX' | 'DEFAULT_5XX' | 'RESOURCE_NOT_FOUND' | 'UNAUTHORIZED' | 'INVALID_API_KEY' | 'ACCESS_DENIED' | 'AUTHORIZER_FAILURE' | 'AUTHORIZER_CONFIGURATION_ERROR' | 'INVALID_SIGNATURE' | 'EXPIRED_TOKEN' | 'MISSING_AUTHENTICATION_TOKEN' | 'INTEGRATION_FAILURE' | 'INTEGRATION_TIMEOUT' | 'API_CONFIGURATION_ERROR' | 'UNSUPPORTED_MEDIA_TYPE' | 'BAD_REQUEST_PARAMETERS' | 'BAD_REQUEST_BODY' | 'REQUEST_TOO_LARGE' | 'THROTTLED' | 'QUOTA_EXCEEDED' | 'WAF_FILTERED';
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Represents an update integration request. */
export interface UpdateIntegrationInput {
  /** Represents an update integration request's HTTP method. */
  httpMethod: string;
  /** Represents an update integration request's resource identifier. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Represents an update integration response request. */
export interface UpdateIntegrationResponseInput {
  /** Specifies an update integration response request's HTTP method. */
  httpMethod: string;
  /** Specifies an update integration response request's resource identifier. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** Specifies an update integration response request's status code. */
  statusCode: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Request to update an existing Method resource. */
export interface UpdateMethodInput {
  /** The HTTP verb of the Method resource. */
  httpMethod: string;
  /** The Resource identifier for the Method resource. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** A request to update an existing MethodResponse resource. */
export interface UpdateMethodResponseInput {
  /** The HTTP verb of the Method resource. */
  httpMethod: string;
  /** The Resource identifier for the MethodResponse resource. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The status code for the MethodResponse resource. */
  statusCode: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Request to update an existing model in an existing RestApi resource. */
export interface UpdateModelInput {
  /** The name of the model to update. */
  modelName: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Updates a RequestValidator of a given RestApi. */
export interface UpdateRequestValidatorInput {
  /** The identifier of RequestValidator to be updated. */
  requestValidatorId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Request to change information about a Resource resource. */
export interface UpdateResourceInput {
  /** The identifier of the Resource resource. */
  resourceId: string;
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Request to update an existing RestApi resource in your collection. */
export interface UpdateRestApiInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Requests API Gateway to change information about a Stage resource. */
export interface UpdateStageInput {
  /** The string identifier of the associated RestApi. */
  restApiId: string;
  /** The name of the Stage resource to change information about. */
  stageName: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** The PATCH request to grant a temporary extension to the remaining quota of a usage plan associated with a specified API key. */
export interface UpdateUsageInput {
  /** The identifier of the API key associated with the usage plan in which a temporary extension is granted to the remaining quota. */
  keyId: string;
  /** The Id of the usage plan associated with the usage data. */
  usagePlanId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** The PATCH request to update a usage plan of a given plan Id. */
export interface UpdateUsagePlanInput {
  /** The Id of the to-be-updated usage plan. */
  usagePlanId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** Updates an existing VpcLink of a specified identifier. */
export interface UpdateVpcLinkInput {
  /** The identifier of the VpcLink. It is used in an Integration to reference this VpcLink. */
  vpcLinkId: string;
  /** For more information about supported patch operations, see Patch Operations. */
  patchOperations?: PatchOperation[];
}

/** API Gateway service binding for Step Functions SDK integrations. */
export class APIGateway {
  constructor() {}

  createApiKey<T>(params: CreateApiKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAuthorizer<T>(params: CreateAuthorizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createBasePathMapping<T>(params: CreateBasePathMappingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDeployment<T>(params: CreateDeploymentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDocumentationPart<T>(params: CreateDocumentationPartInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDocumentationVersion<T>(params: CreateDocumentationVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDomainName<T>(params: CreateDomainNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDomainNameAccessAssociation<T>(params: CreateDomainNameAccessAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createModel<T>(params: CreateModelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRequestValidator<T>(params: CreateRequestValidatorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createResource<T>(params: CreateResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRestApi<T>(params: CreateRestApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStage<T>(params: CreateStageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createUsagePlan<T>(params: CreateUsagePlanInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createUsagePlanKey<T>(params: CreateUsagePlanKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpcLink<T>(params: CreateVpcLinkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApiKey<T>(params: DeleteApiKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAuthorizer<T>(params: DeleteAuthorizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteBasePathMapping<T>(params: DeleteBasePathMappingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteClientCertificate<T>(params: DeleteClientCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDeployment<T>(params: DeleteDeploymentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDocumentationPart<T>(params: DeleteDocumentationPartInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDocumentationVersion<T>(params: DeleteDocumentationVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDomainName<T>(params: DeleteDomainNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDomainNameAccessAssociation<T>(params: DeleteDomainNameAccessAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteGatewayResponse<T>(params: DeleteGatewayResponseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIntegration<T>(params: DeleteIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIntegrationResponse<T>(params: DeleteIntegrationResponseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteMethod<T>(params: DeleteMethodInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteMethodResponse<T>(params: DeleteMethodResponseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteModel<T>(params: DeleteModelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRequestValidator<T>(params: DeleteRequestValidatorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteResource<T>(params: DeleteResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRestApi<T>(params: DeleteRestApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStage<T>(params: DeleteStageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUsagePlan<T>(params: DeleteUsagePlanInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUsagePlanKey<T>(params: DeleteUsagePlanKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpcLink<T>(params: DeleteVpcLinkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  flushStageAuthorizersCache<T>(params: FlushStageAuthorizersCacheInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  flushStageCache<T>(params: FlushStageCacheInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  generateClientCertificate<T>(params: GenerateClientCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAccount<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApiKey<T>(params: GetApiKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApiKeys<T>(params: GetApiKeysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAuthorizer<T>(params: GetAuthorizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAuthorizers<T>(params: GetAuthorizersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getBasePathMapping<T>(params: GetBasePathMappingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getBasePathMappings<T>(params: GetBasePathMappingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getClientCertificate<T>(params: GetClientCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getClientCertificates<T>(params: GetClientCertificatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDeployment<T>(params: GetDeploymentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDeployments<T>(params: GetDeploymentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDocumentationPart<T>(params: GetDocumentationPartInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDocumentationParts<T>(params: GetDocumentationPartsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDocumentationVersion<T>(params: GetDocumentationVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDocumentationVersions<T>(params: GetDocumentationVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDomainName<T>(params: GetDomainNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDomainNameAccessAssociations<T>(params: GetDomainNameAccessAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDomainNames<T>(params: GetDomainNamesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getExport<T>(params: GetExportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getGatewayResponse<T>(params: GetGatewayResponseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getGatewayResponses<T>(params: GetGatewayResponsesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIntegration<T>(params: GetIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIntegrationResponse<T>(params: GetIntegrationResponseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMethod<T>(params: GetMethodInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMethodResponse<T>(params: GetMethodResponseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getModel<T>(params: GetModelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getModels<T>(params: GetModelsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getModelTemplate<T>(params: GetModelTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRequestValidator<T>(params: GetRequestValidatorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRequestValidators<T>(params: GetRequestValidatorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getResource<T>(params: GetResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getResources<T>(params: GetResourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRestApi<T>(params: GetRestApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRestApis<T>(params: GetRestApisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSdk<T>(params: GetSdkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSdkType<T>(params: GetSdkTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSdkTypes<T>(params: GetSdkTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getStage<T>(params: GetStageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getStages<T>(params: GetStagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTags<T>(params: GetTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getUsage<T>(params: GetUsageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getUsagePlan<T>(params: GetUsagePlanInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getUsagePlanKey<T>(params: GetUsagePlanKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getUsagePlanKeys<T>(params: GetUsagePlanKeysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getUsagePlans<T>(params: GetUsagePlansInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVpcLink<T>(params: GetVpcLinkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVpcLinks<T>(params: GetVpcLinksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importApiKeys<T>(params: ImportApiKeysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importDocumentationParts<T>(params: ImportDocumentationPartsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importRestApi<T>(params: ImportRestApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putGatewayResponse<T>(params: PutGatewayResponseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putIntegration<T>(params: PutIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putIntegrationResponse<T>(params: PutIntegrationResponseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putMethod<T>(params: PutMethodInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putMethodResponse<T>(params: PutMethodResponseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRestApi<T>(params: PutRestApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectDomainNameAccessAssociation<T>(params: RejectDomainNameAccessAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testInvokeAuthorizer<T>(params: TestInvokeAuthorizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testInvokeMethod<T>(params: TestInvokeMethodInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAccount<T>(params: UpdateAccountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApiKey<T>(params: UpdateApiKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAuthorizer<T>(params: UpdateAuthorizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateBasePathMapping<T>(params: UpdateBasePathMappingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateClientCertificate<T>(params: UpdateClientCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDeployment<T>(params: UpdateDeploymentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDocumentationPart<T>(params: UpdateDocumentationPartInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDocumentationVersion<T>(params: UpdateDocumentationVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDomainName<T>(params: UpdateDomainNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateGatewayResponse<T>(params: UpdateGatewayResponseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateIntegration<T>(params: UpdateIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateIntegrationResponse<T>(params: UpdateIntegrationResponseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateMethod<T>(params: UpdateMethodInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateMethodResponse<T>(params: UpdateMethodResponseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateModel<T>(params: UpdateModelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRequestValidator<T>(params: UpdateRequestValidatorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateResource<T>(params: UpdateResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRestApi<T>(params: UpdateRestApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStage<T>(params: UpdateStageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUsage<T>(params: UpdateUsageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUsagePlan<T>(params: UpdateUsagePlanInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateVpcLink<T>(params: UpdateVpcLinkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
