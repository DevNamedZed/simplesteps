// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface SourceApiAssociationConfig {
  /** The property that indicates which merging option is enabled in the source API association. Valid merge types are MANUAL_MERGE (default) and AUTO_MERGE. Manual merges are the default behavior and requi */
  mergeType?: 'MANUAL_MERGE' | 'AUTO_MERGE';
}

export interface EventLogConfig {
  /** The type of information to log for the Event API. */
  logLevel: 'NONE' | 'ERROR' | 'ALL' | 'INFO' | 'DEBUG';
  /** The IAM service role that AppSync assumes to publish CloudWatch Logs in your account. */
  cloudWatchLogsRoleArn: string;
}

export interface EventConfig {
  /** A list of authorization providers. */
  authProviders: any[];
  /** A list of valid authorization modes for the Event API connections. */
  connectionAuthModes: any[];
  /** A list of valid authorization modes for the Event API publishing. */
  defaultPublishAuthModes: any[];
  /** A list of valid authorization modes for the Event API subscriptions. */
  defaultSubscribeAuthModes: any[];
  /** The CloudWatch Logs configuration for the Event API. */
  logConfig?: EventLogConfig;
}

export interface AuthMode {
  /** The authorization type. */
  authType: 'API_KEY' | 'AWS_IAM' | 'AMAZON_COGNITO_USER_POOLS' | 'OPENID_CONNECT' | 'AWS_LAMBDA';
}

export interface HandlerConfig {
  /** The behavior for the handler. */
  behavior: 'CODE' | 'DIRECT';
  /** The integration data source configuration for the handler. */
  integration: any;
}

export interface HandlerConfigs {
  /** The configuration for the OnPublish handler. */
  onPublish?: HandlerConfig;
  /** The configuration for the OnSubscribe handler. */
  onSubscribe?: HandlerConfig;
}

export interface DeltaSyncConfig {
  /** The number of minutes that an Item is stored in the data source. */
  baseTableTTL?: number;
  /** The Delta Sync table name. */
  deltaSyncTableName?: string;
  /** The number of minutes that a Delta Sync log entry is stored in the Delta Sync table. */
  deltaSyncTableTTL?: number;
}

export interface DynamodbDataSourceConfig {
  /** The table name. */
  tableName: string;
  /** The Amazon Web Services Region. */
  awsRegion: string;
  /** Set to TRUE to use Amazon Cognito credentials with this data source. */
  useCallerCredentials?: boolean;
  /** The DeltaSyncConfig for a versioned data source. */
  deltaSyncConfig?: DeltaSyncConfig;
  /** Set to TRUE to use Conflict Detection and Resolution with this data source. */
  versioned?: boolean;
}

export interface LambdaDataSourceConfig {
  /** The Amazon Resource Name (ARN) for the Lambda function. */
  lambdaFunctionArn: string;
}

export interface ElasticsearchDataSourceConfig {
  /** The endpoint. */
  endpoint: string;
  /** The Amazon Web Services Region. */
  awsRegion: string;
}

export interface OpenSearchServiceDataSourceConfig {
  /** The endpoint. */
  endpoint: string;
  /** The Amazon Web Services Region. */
  awsRegion: string;
}

export interface AuthorizationConfig {
  /** The authorization type that the HTTP endpoint requires. AWS_IAM: The authorization type is Signature Version 4 (SigV4). */
  authorizationType: 'AWS_IAM';
  /** The Identity and Access Management (IAM) settings. */
  awsIamConfig?: any;
}

export interface HttpDataSourceConfig {
  /** The HTTP URL endpoint. You can specify either the domain name or IP, and port combination, and the URL scheme must be HTTP or HTTPS. If you don't specify the port, AppSync uses the default port 80 for */
  endpoint?: string;
  /** The authorization configuration in case the HTTP endpoint requires authorization. */
  authorizationConfig?: AuthorizationConfig;
}

export interface RdsHttpEndpointConfig {
  /** Amazon Web Services Region for Amazon RDS HTTP endpoint. */
  awsRegion?: string;
  /** Amazon RDS cluster Amazon Resource Name (ARN). */
  dbClusterIdentifier?: string;
  /** Logical database name. */
  databaseName?: string;
  /** Logical schema name. */
  schema?: string;
  /** Amazon Web Services secret store Amazon Resource Name (ARN) for database credentials. */
  awsSecretStoreArn?: string;
}

export interface RelationalDatabaseDataSourceConfig {
  /** Source type for the relational database. RDS_HTTP_ENDPOINT: The relational database source type is an Amazon Relational Database Service (Amazon RDS) HTTP endpoint. */
  relationalDatabaseSourceType?: 'RDS_HTTP_ENDPOINT';
  /** Amazon RDS HTTP endpoint settings. */
  rdsHttpEndpointConfig?: RdsHttpEndpointConfig;
}

export interface EventBridgeDataSourceConfig {
  /** The ARN of the event bus. For more information about event buses, see Amazon EventBridge event buses. */
  eventBusArn: string;
}

export interface LambdaConflictHandlerConfig {
  /** The Amazon Resource Name (ARN) for the Lambda function to use as the Conflict Handler. */
  lambdaConflictHandlerArn?: string;
}

export interface SyncConfig {
  /** The Conflict Resolution strategy to perform in the event of a conflict. OPTIMISTIC_CONCURRENCY: Resolve conflicts by rejecting mutations when versions don't match the latest version at the server. AUT */
  conflictHandler?: 'OPTIMISTIC_CONCURRENCY' | 'LAMBDA' | 'AUTOMERGE' | 'NONE';
  /** The Conflict Detection strategy to use. VERSION: Detect conflicts based on object versions for this resolver. NONE: Do not detect conflicts when invoking this resolver. */
  conflictDetection?: 'VERSION' | 'NONE';
  /** The LambdaConflictHandlerConfig when configuring LAMBDA as the Conflict Handler. */
  lambdaConflictHandlerConfig?: LambdaConflictHandlerConfig;
}

export interface AppSyncRuntime {
  /** The name of the runtime to use. Currently, the only allowed value is APPSYNC_JS. */
  name: 'APPSYNC_JS';
  /** The version of the runtime to use. Currently, the only allowed version is 1.0.0. */
  runtimeVersion: string;
}

export interface LogConfig {
  /** The field logging level. Values can be NONE, ERROR, or ALL. NONE: No field-level logs are captured. ERROR: Logs the following information only for the fields that are in error: The error section in th */
  fieldLogLevel: 'NONE' | 'ERROR' | 'ALL' | 'INFO' | 'DEBUG';
  /** The service role that AppSync assumes to publish to CloudWatch logs in your account. */
  cloudWatchLogsRoleArn: string;
  /** Set to TRUE to exclude sections that contain information such as headers, context, and evaluated mapping templates, regardless of logging level. */
  excludeVerboseContent?: boolean;
}

export interface UserPoolConfig {
  /** The user pool ID. */
  userPoolId: string;
  /** The Amazon Web Services Region in which the user pool was created. */
  awsRegion: string;
  /** The action that you want your GraphQL API to take when a request that uses Amazon Cognito user pool authentication doesn't match the Amazon Cognito user pool configuration. */
  defaultAction: 'ALLOW' | 'DENY';
  /** A regular expression for validating the incoming Amazon Cognito user pool app client ID. If this value isn't set, no filtering is applied. */
  appIdClientRegex?: string;
}

export interface OpenIDConnectConfig {
  /** The issuer for the OIDC configuration. The issuer returned by discovery must exactly match the value of iss in the ID token. */
  issuer: string;
  /** The client identifier of the relying party at the OpenID identity provider. This identifier is typically obtained when the relying party is registered with the OpenID identity provider. You can specif */
  clientId?: string;
  /** The number of milliseconds that a token is valid after it's issued to a user. */
  iatTTL?: number;
  /** The number of milliseconds that a token is valid after being authenticated. */
  authTTL?: number;
}

export interface AdditionalAuthenticationProvider {
  /** The authentication type: API key, Identity and Access Management (IAM), OpenID Connect (OIDC), Amazon Cognito user pools, or Lambda. */
  authenticationType?: 'API_KEY' | 'AWS_IAM' | 'AMAZON_COGNITO_USER_POOLS' | 'OPENID_CONNECT' | 'AWS_LAMBDA';
  /** The OIDC configuration. */
  openIDConnectConfig?: any;
  /** The Amazon Cognito user pool configuration. */
  userPoolConfig?: any;
  /** Configuration for Lambda function authorization. */
  lambdaAuthorizerConfig?: any;
}

export interface LambdaAuthorizerConfig {
  /** The number of seconds a response should be cached for. The default is 0 seconds, which disables caching. If you don't specify a value for authorizerResultTtlInSeconds, the default value is used. The m */
  authorizerResultTtlInSeconds?: number;
  /** The Amazon Resource Name (ARN) of the Lambda function to be called for authorization. This can be a standard Lambda ARN, a version ARN (.../v3), or an alias ARN. Note: This Lambda function must have t */
  authorizerUri: string;
  /** A regular expression for validation of tokens before the Lambda function is called. */
  identityValidationExpression?: string;
}

export interface EnhancedMetricsConfig {
  /** Controls how resolver metrics will be emitted to CloudWatch. Resolver metrics include: GraphQL errors: The number of GraphQL errors that occurred. Requests: The number of invocations that occurred dur */
  resolverLevelMetricsBehavior: 'FULL_REQUEST_RESOLVER_METRICS' | 'PER_RESOLVER_METRICS';
  /** Controls how data source metrics will be emitted to CloudWatch. Data source metrics include: Requests: The number of invocations that occured during a request. Latency: The time to complete a data sou */
  dataSourceLevelMetricsBehavior: 'FULL_REQUEST_DATA_SOURCE_METRICS' | 'PER_DATA_SOURCE_METRICS';
  /** Controls how operation metrics will be emitted to CloudWatch. Operation metrics include: Requests: The number of times a specified GraphQL operation was called. GraphQL errors: The number of GraphQL e */
  operationLevelMetricsConfig: 'ENABLED' | 'DISABLED';
}

export interface PipelineConfig {
  /** A list of Function objects. */
  functions?: string[];
}

export interface CachingConfig {
  /** The TTL in seconds for a resolver that has caching activated. Valid values are 1–3,600 seconds. */
  ttl: number;
  /** The caching keys for a resolver that has caching activated. Valid values are entries from the $context.arguments, $context.source, and $context.identity maps. */
  cachingKeys?: string[];
}

export interface RdsDataApiConfig {
  /** The resource ARN of the RDS cluster. */
  resourceArn: string;
  /** The secret's ARN that was obtained from Secrets Manager. A secret consists of secret information, the secret value, plus metadata about the secret. A secret value can be a string or binary. It typical */
  secretArn: string;
  /** The name of the database in the cluster. */
  databaseName: string;
}

export interface AssociateApiInput {
  /** The API ID. Private APIs can not be associated with custom domains. */
  apiId: string;
  /** The domain name. */
  domainName: string;
}

export interface AssociateMergedGraphqlApiInput {
  /** The identifier of the AppSync Merged API. This is generated by the AppSync service. In most cases, Merged APIs (especially in your account) only require the API ID value or ARN of the merged API. Howe */
  mergedApiIdentifier: string;
  /** The identifier of the AppSync Source API. This is generated by the AppSync service. In most cases, source APIs (especially in your account) only require the API ID value or ARN of the source API. Howe */
  sourceApiIdentifier: string;
  /** The description field. */
  description?: string;
  /** The SourceApiAssociationConfig object data. */
  sourceApiAssociationConfig?: SourceApiAssociationConfig;
}

export interface AssociateSourceGraphqlApiInput {
  /** The identifier of the AppSync Merged API. This is generated by the AppSync service. In most cases, Merged APIs (especially in your account) only require the API ID value or ARN of the merged API. Howe */
  mergedApiIdentifier: string;
  /** The identifier of the AppSync Source API. This is generated by the AppSync service. In most cases, source APIs (especially in your account) only require the API ID value or ARN of the source API. Howe */
  sourceApiIdentifier: string;
  /** The description field. */
  description?: string;
  /** The SourceApiAssociationConfig object data. */
  sourceApiAssociationConfig?: SourceApiAssociationConfig;
}

export interface CreateApiInput {
  /** The Event API configuration. This includes the default authorization configuration for connecting, publishing, and subscribing to an Event API. */
  eventConfig: EventConfig;
  /** The name for the Api. */
  name: string;
  /** The owner contact information for the Api. */
  ownerContact?: string;
  tags?: Record<string, string>;
}

/** Represents the input of a CreateApiCache operation. */
export interface CreateApiCacheInput {
  /** Caching behavior. FULL_REQUEST_CACHING: All requests from the same user are cached. Individual resolvers are automatically cached. All API calls will try to return responses from the cache. PER_RESOLV */
  apiCachingBehavior: 'FULL_REQUEST_CACHING' | 'PER_RESOLVER_CACHING' | 'OPERATION_LEVEL_CACHING';
  /** The GraphQL API ID. */
  apiId: string;
  /** TTL in seconds for cache entries. Valid values are 1–3,600 seconds. */
  ttl: number;
  /** The cache instance type. Valid values are SMALL MEDIUM LARGE XLARGE LARGE_2X LARGE_4X LARGE_8X (not available in all regions) LARGE_12X Historically, instance types were identified by an EC2-style val */
  type: 'T2_SMALL' | 'T2_MEDIUM' | 'R4_LARGE' | 'R4_XLARGE' | 'R4_2XLARGE' | 'R4_4XLARGE' | 'R4_8XLARGE' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'XLARGE' | 'LARGE_2X' | 'LARGE_4X' | 'LARGE_8X' | 'LARGE_12X';
  /** At-rest encryption flag for cache. You cannot update this setting after creation. */
  atRestEncryptionEnabled?: boolean;
  /** Controls how cache health metrics will be emitted to CloudWatch. Cache health metrics include: NetworkBandwidthOutAllowanceExceeded: The network packets dropped because the throughput exceeded the agg */
  healthMetricsConfig?: 'ENABLED' | 'DISABLED';
  /** Transit encryption flag when connecting to cache. You cannot update this setting after creation. */
  transitEncryptionEnabled?: boolean;
}

export interface CreateApiKeyInput {
  /** The ID for your GraphQL API. */
  apiId: string;
  /** A description of the purpose of the API key. */
  description?: string;
  /** From the creation time, the time after which the API key expires. The date is represented as seconds since the epoch, rounded down to the nearest hour. The default value for this parameter is 7 days f */
  expires?: number;
}

export interface CreateChannelNamespaceInput {
  /** The Api ID. */
  apiId: string;
  /** The name of the ChannelNamespace. This name must be unique within the Api */
  name: string;
  /** The event handler functions that run custom business logic to process published events and subscribe requests. */
  codeHandlers?: string;
  /** The configuration for the OnPublish and OnSubscribe handlers. */
  handlerConfigs?: HandlerConfigs;
  /** The authorization mode to use for publishing messages on the channel namespace. This configuration overrides the default Api authorization configuration. */
  publishAuthModes?: AuthMode[];
  /** The authorization mode to use for subscribing to messages on the channel namespace. This configuration overrides the default Api authorization configuration. */
  subscribeAuthModes?: AuthMode[];
  tags?: Record<string, string>;
}

export interface CreateDataSourceInput {
  /** The API ID for the GraphQL API for the DataSource. */
  apiId: string;
  /** A user-supplied name for the DataSource. */
  name: string;
  /** The type of the DataSource. */
  type: 'AWS_LAMBDA' | 'AMAZON_DYNAMODB' | 'AMAZON_ELASTICSEARCH' | 'NONE' | 'HTTP' | 'RELATIONAL_DATABASE' | 'AMAZON_OPENSEARCH_SERVICE' | 'AMAZON_EVENTBRIDGE' | 'AMAZON_BEDROCK_RUNTIME';
  /** A description of the DataSource. */
  description?: string;
  /** Amazon DynamoDB settings. */
  dynamodbConfig?: DynamodbDataSourceConfig;
  /** Amazon OpenSearch Service settings. As of September 2021, Amazon Elasticsearch service is Amazon OpenSearch Service. This configuration is deprecated. For new data sources, use CreateDataSourceRequest */
  elasticsearchConfig?: ElasticsearchDataSourceConfig;
  /** Amazon EventBridge settings. */
  eventBridgeConfig?: EventBridgeDataSourceConfig;
  /** HTTP endpoint settings. */
  httpConfig?: HttpDataSourceConfig;
  /** Lambda settings. */
  lambdaConfig?: LambdaDataSourceConfig;
  /** Enables or disables enhanced data source metrics for specified data sources. Note that metricsConfig won't be used unless the dataSourceLevelMetricsBehavior value is set to PER_DATA_SOURCE_METRICS. If */
  metricsConfig?: 'ENABLED' | 'DISABLED';
  /** Amazon OpenSearch Service settings. */
  openSearchServiceConfig?: OpenSearchServiceDataSourceConfig;
  /** Relational database settings. */
  relationalDatabaseConfig?: RelationalDatabaseDataSourceConfig;
  /** The Identity and Access Management (IAM) service role Amazon Resource Name (ARN) for the data source. The system assumes this role when accessing the data source. */
  serviceRoleArn?: string;
}

export interface CreateDomainNameInput {
  /** The Amazon Resource Name (ARN) of the certificate. This can be an Certificate Manager (ACM) certificate or an Identity and Access Management (IAM) server certificate. */
  certificateArn: string;
  /** The domain name. */
  domainName: string;
  /** A description of the DomainName. */
  description?: string;
  tags?: Record<string, string>;
}

export interface CreateFunctionInput {
  /** The GraphQL API ID. */
  apiId: string;
  /** The Function DataSource name. */
  dataSourceName: string;
  /** The Function name. The function name does not have to be unique. */
  name: string;
  /** The function code that contains the request and response functions. When code is used, the runtime is required. The runtime value must be APPSYNC_JS. */
  code?: string;
  /** The Function description. */
  description?: string;
  /** The version of the request mapping template. Currently, the supported value is 2018-05-29. Note that when using VTL and mapping templates, the functionVersion is required. */
  functionVersion?: string;
  /** The maximum batching size for a resolver. */
  maxBatchSize?: number;
  /** The Function request mapping template. Functions support only the 2018-05-29 version of the request mapping template. */
  requestMappingTemplate?: string;
  /** The Function response mapping template. */
  responseMappingTemplate?: string;
  runtime?: AppSyncRuntime;
  syncConfig?: SyncConfig;
}

export interface CreateGraphqlApiInput {
  /** The authentication type: API key, Identity and Access Management (IAM), OpenID Connect (OIDC), Amazon Cognito user pools, or Lambda. */
  authenticationType: 'API_KEY' | 'AWS_IAM' | 'AMAZON_COGNITO_USER_POOLS' | 'OPENID_CONNECT' | 'AWS_LAMBDA';
  /** A user-supplied name for the GraphqlApi. */
  name: string;
  /** A list of additional authentication providers for the GraphqlApi API. */
  additionalAuthenticationProviders?: AdditionalAuthenticationProvider[];
  /** The value that indicates whether the GraphQL API is a standard API (GRAPHQL) or merged API (MERGED). */
  apiType?: 'GRAPHQL' | 'MERGED';
  /** The enhancedMetricsConfig object. */
  enhancedMetricsConfig?: EnhancedMetricsConfig;
  /** Sets the value of the GraphQL API to enable (ENABLED) or disable (DISABLED) introspection. If no value is provided, the introspection configuration will be set to ENABLED by default. This field will p */
  introspectionConfig?: 'ENABLED' | 'DISABLED';
  /** Configuration for Lambda function authorization. */
  lambdaAuthorizerConfig?: LambdaAuthorizerConfig;
  /** The Amazon CloudWatch Logs configuration. */
  logConfig?: LogConfig;
  /** The Identity and Access Management service role ARN for a merged API. The AppSync service assumes this role on behalf of the Merged API to validate access to source APIs at runtime and to prompt the A */
  mergedApiExecutionRoleArn?: string;
  /** The OIDC configuration. */
  openIDConnectConfig?: OpenIDConnectConfig;
  /** The owner contact information for an API resource. This field accepts any string input with a length of 0 - 256 characters. */
  ownerContact?: string;
  /** The maximum depth a query can have in a single request. Depth refers to the amount of nested levels allowed in the body of query. The default value is 0 (or unspecified), which indicates there's no de */
  queryDepthLimit?: number;
  /** The maximum number of resolvers that can be invoked in a single request. The default value is 0 (or unspecified), which will set the limit to 10000. When specified, the limit value can be between 1 an */
  resolverCountLimit?: number;
  /** A TagMap object. */
  tags?: Record<string, string>;
  /** The Amazon Cognito user pool configuration. */
  userPoolConfig?: UserPoolConfig;
  /** Sets the value of the GraphQL API to public (GLOBAL) or private (PRIVATE). If no value is provided, the visibility will be set to GLOBAL by default. This value cannot be changed once the API has been  */
  visibility?: 'GLOBAL' | 'PRIVATE';
  /** A flag indicating whether to use X-Ray tracing for the GraphqlApi. */
  xrayEnabled?: boolean;
}

export interface CreateResolverInput {
  /** The ID for the GraphQL API for which the resolver is being created. */
  apiId: string;
  /** The name of the field to attach the resolver to. */
  fieldName: string;
  /** The name of the Type. */
  typeName: string;
  /** The caching configuration for the resolver. */
  cachingConfig?: CachingConfig;
  /** The resolver code that contains the request and response functions. When code is used, the runtime is required. The runtime value must be APPSYNC_JS. */
  code?: string;
  /** The name of the data source for which the resolver is being created. */
  dataSourceName?: string;
  /** The resolver type. UNIT: A UNIT resolver type. A UNIT resolver is the default resolver type. You can use a UNIT resolver to run a GraphQL query against a single data source. PIPELINE: A PIPELINE resol */
  kind?: 'UNIT' | 'PIPELINE';
  /** The maximum batching size for a resolver. */
  maxBatchSize?: number;
  /** Enables or disables enhanced resolver metrics for specified resolvers. Note that metricsConfig won't be used unless the resolverLevelMetricsBehavior value is set to PER_RESOLVER_METRICS. If the resolv */
  metricsConfig?: 'ENABLED' | 'DISABLED';
  /** The PipelineConfig. */
  pipelineConfig?: PipelineConfig;
  /** The mapping template to use for requests. A resolver uses a request mapping template to convert a GraphQL expression into a format that a data source can understand. Mapping templates are written in A */
  requestMappingTemplate?: string;
  /** The mapping template to use for responses from the data source. */
  responseMappingTemplate?: string;
  runtime?: AppSyncRuntime;
  /** The SyncConfig for a resolver attached to a versioned data source. */
  syncConfig?: SyncConfig;
}

export interface CreateTypeInput {
  /** The API ID. */
  apiId: string;
  /** The type definition, in GraphQL Schema Definition Language (SDL) format. For more information, see the GraphQL SDL documentation. */
  definition: string;
  /** The type format: SDL or JSON. */
  format: 'SDL' | 'JSON';
}

export interface DeleteApiInput {
  /** The Api ID. */
  apiId: string;
}

/** Represents the input of a DeleteApiCache operation. */
export interface DeleteApiCacheInput {
  /** The API ID. */
  apiId: string;
}

export interface DeleteApiKeyInput {
  /** The API ID. */
  apiId: string;
  /** The ID for the API key. */
  id: string;
}

export interface DeleteChannelNamespaceInput {
  /** The ID of the Api associated with the ChannelNamespace. */
  apiId: string;
  /** The name of the ChannelNamespace. */
  name: string;
}

export interface DeleteDataSourceInput {
  /** The API ID. */
  apiId: string;
  /** The name of the data source. */
  name: string;
}

export interface DeleteDomainNameInput {
  /** The domain name. */
  domainName: string;
}

export interface DeleteFunctionInput {
  /** The GraphQL API ID. */
  apiId: string;
  /** The Function ID. */
  functionId: string;
}

export interface DeleteGraphqlApiInput {
  /** The API ID. */
  apiId: string;
}

export interface DeleteResolverInput {
  /** The API ID. */
  apiId: string;
  /** The resolver field name. */
  fieldName: string;
  /** The name of the resolver type. */
  typeName: string;
}

export interface DeleteTypeInput {
  /** The API ID. */
  apiId: string;
  /** The type name. */
  typeName: string;
}

export interface DisassociateApiInput {
  /** The domain name. */
  domainName: string;
}

export interface DisassociateMergedGraphqlApiInput {
  /** The ID generated by the AppSync service for the source API association. */
  associationId: string;
  /** The identifier of the AppSync Source API. This is generated by the AppSync service. In most cases, source APIs (especially in your account) only require the API ID value or ARN of the source API. Howe */
  sourceApiIdentifier: string;
}

export interface DisassociateSourceGraphqlApiInput {
  /** The ID generated by the AppSync service for the source API association. */
  associationId: string;
  /** The identifier of the AppSync Merged API. This is generated by the AppSync service. In most cases, Merged APIs (especially in your account) only require the API ID value or ARN of the merged API. Howe */
  mergedApiIdentifier: string;
}

export interface EvaluateCodeInput {
  /** The code definition to be evaluated. Note that code and runtime are both required for this action. The runtime value must be APPSYNC_JS. */
  code: string;
  /** The map that holds all of the contextual information for your resolver invocation. A context is required for this action. */
  context: string;
  /** The runtime to be used when evaluating the code. Currently, only the APPSYNC_JS runtime is supported. */
  runtime: AppSyncRuntime;
  /** The function within the code to be evaluated. If provided, the valid values are request and response. */
  function?: string;
}

export interface EvaluateMappingTemplateInput {
  /** The map that holds all of the contextual information for your resolver invocation. A context is required for this action. */
  context: string;
  /** The mapping template; this can be a request or response template. A template is required for this action. */
  template: string;
}

/** Represents the input of a FlushApiCache operation. */
export interface FlushApiCacheInput {
  /** The API ID. */
  apiId: string;
}

export interface GetApiInput {
  /** The Api ID. */
  apiId: string;
}

export interface GetApiAssociationInput {
  /** The domain name. */
  domainName: string;
}

/** Represents the input of a GetApiCache operation. */
export interface GetApiCacheInput {
  /** The API ID. */
  apiId: string;
}

export interface GetChannelNamespaceInput {
  /** The Api ID. */
  apiId: string;
  /** The name of the ChannelNamespace. */
  name: string;
}

export interface GetDataSourceInput {
  /** The API ID. */
  apiId: string;
  /** The name of the data source. */
  name: string;
}

export interface GetDataSourceIntrospectionInput {
  /** The introspection ID. Each introspection contains a unique ID that can be used to reference the instrospection record. */
  introspectionId: string;
  /** A boolean flag that determines whether SDL should be generated for introspected types. If set to true, each model will contain an sdl property that contains the SDL for that type. The SDL only contain */
  includeModelsSDL?: boolean;
  /** The maximum number of introspected types that will be returned in a single response. */
  maxResults?: number;
  /** Determines the number of types to be returned in a single response before paginating. This value is typically taken from nextToken value from the previous response. */
  nextToken?: string;
}

export interface GetDomainNameInput {
  /** The domain name. */
  domainName: string;
}

export interface GetFunctionInput {
  /** The GraphQL API ID. */
  apiId: string;
  /** The Function ID. */
  functionId: string;
}

export interface GetGraphqlApiInput {
  /** The API ID for the GraphQL API. */
  apiId: string;
}

export interface GetGraphqlApiEnvironmentVariablesInput {
  /** The ID of the API from which the environmental variable list will be retrieved. */
  apiId: string;
}

export interface GetIntrospectionSchemaInput {
  /** The API ID. */
  apiId: string;
  /** The schema format: SDL or JSON. */
  format: 'SDL' | 'JSON';
  /** A flag that specifies whether the schema introspection should contain directives. */
  includeDirectives?: boolean;
}

export interface GetResolverInput {
  /** The API ID. */
  apiId: string;
  /** The resolver field name. */
  fieldName: string;
  /** The resolver type name. */
  typeName: string;
}

export interface GetSchemaCreationStatusInput {
  /** The API ID. */
  apiId: string;
}

export interface GetSourceApiAssociationInput {
  /** The ID generated by the AppSync service for the source API association. */
  associationId: string;
  /** The identifier of the AppSync Merged API. This is generated by the AppSync service. In most cases, Merged APIs (especially in your account) only require the API ID value or ARN of the merged API. Howe */
  mergedApiIdentifier: string;
}

export interface GetTypeInput {
  /** The API ID. */
  apiId: string;
  /** The type format: SDL or JSON. */
  format: 'SDL' | 'JSON';
  /** The type name. */
  typeName: string;
}

export interface ListApiKeysInput {
  /** The API ID. */
  apiId: string;
  /** The maximum number of results that you want the request to return. */
  maxResults?: number;
  /** An identifier that was returned from the previous call to this operation, which you can use to return the next set of items in the list. */
  nextToken?: string;
}

export interface ListApisInput {
  /** The maximum number of results that you want the request to return. */
  maxResults?: number;
  /** An identifier that was returned from the previous call to this operation, which you can use to return the next set of items in the list. */
  nextToken?: string;
}

export interface ListChannelNamespacesInput {
  /** The Api ID. */
  apiId: string;
  /** The maximum number of results that you want the request to return. */
  maxResults?: number;
  /** An identifier that was returned from the previous call to this operation, which you can use to return the next set of items in the list. */
  nextToken?: string;
}

export interface ListDataSourcesInput {
  /** The API ID. */
  apiId: string;
  /** The maximum number of results that you want the request to return. */
  maxResults?: number;
  /** An identifier that was returned from the previous call to this operation, which you can use to return the next set of items in the list. */
  nextToken?: string;
}

export interface ListDomainNamesInput {
  /** The maximum number of results that you want the request to return. */
  maxResults?: number;
  /** An identifier that was returned from the previous call to this operation, which you can use to return the next set of items in the list. */
  nextToken?: string;
}

export interface ListFunctionsInput {
  /** The GraphQL API ID. */
  apiId: string;
  /** The maximum number of results that you want the request to return. */
  maxResults?: number;
  /** An identifier that was returned from the previous call to this operation, which you can use to return the next set of items in the list. */
  nextToken?: string;
}

export interface ListGraphqlApisInput {
  /** The value that indicates whether the GraphQL API is a standard API (GRAPHQL) or merged API (MERGED). */
  apiType?: 'GRAPHQL' | 'MERGED';
  /** The maximum number of results that you want the request to return. */
  maxResults?: number;
  /** An identifier that was returned from the previous call to this operation, which you can use to return the next set of items in the list. */
  nextToken?: string;
  /** The account owner of the GraphQL API. */
  owner?: 'CURRENT_ACCOUNT' | 'OTHER_ACCOUNTS';
}

export interface ListResolversInput {
  /** The API ID. */
  apiId: string;
  /** The type name. */
  typeName: string;
  /** The maximum number of results that you want the request to return. */
  maxResults?: number;
  /** An identifier that was returned from the previous call to this operation, which you can use to return the next set of items in the list. */
  nextToken?: string;
}

export interface ListResolversByFunctionInput {
  /** The API ID. */
  apiId: string;
  /** The function ID. */
  functionId: string;
  /** The maximum number of results that you want the request to return. */
  maxResults?: number;
  /** An identifier that was returned from the previous call to this operation, which you can use to return the next set of items in the list. */
  nextToken?: string;
}

export interface ListSourceApiAssociationsInput {
  /** The API ID. */
  apiId: string;
  /** The maximum number of results that you want the request to return. */
  maxResults?: number;
  /** An identifier that was returned from the previous call to this operation, which you can use to return the next set of items in the list. */
  nextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The GraphqlApi Amazon Resource Name (ARN). */
  resourceArn: string;
}

export interface ListTypesInput {
  /** The API ID. */
  apiId: string;
  /** The type format: SDL or JSON. */
  format: 'SDL' | 'JSON';
  /** The maximum number of results that you want the request to return. */
  maxResults?: number;
  /** An identifier that was returned from the previous call to this operation, which you can use to return the next set of items in the list. */
  nextToken?: string;
}

export interface ListTypesByAssociationInput {
  /** The ID generated by the AppSync service for the source API association. */
  associationId: string;
  /** The format type. */
  format: 'SDL' | 'JSON';
  /** The identifier of the AppSync Merged API. This is generated by the AppSync service. In most cases, Merged APIs (especially in your account) only require the API ID value or ARN of the merged API. Howe */
  mergedApiIdentifier: string;
  /** The maximum number of results that you want the request to return. */
  maxResults?: number;
  /** An identifier that was returned from the previous call to this operation, which you can use to return the next set of items in the list. */
  nextToken?: string;
}

export interface PutGraphqlApiEnvironmentVariablesInput {
  /** The ID of the API to which the environmental variable list will be written. */
  apiId: string;
  /** The list of environmental variables to add to the API. When creating an environmental variable key-value pair, it must follow the additional constraints below: Keys must begin with a letter. Keys must */
  environmentVariables: Record<string, string>;
}

export interface StartDataSourceIntrospectionInput {
  /** The rdsDataApiConfig object data. */
  rdsDataApiConfig?: RdsDataApiConfig;
}

export interface StartSchemaCreationInput {
  /** The API ID. */
  apiId: string;
  /** The schema definition, in GraphQL schema language format. */
  definition: string;
}

export interface StartSchemaMergeInput {
  /** The ID generated by the AppSync service for the source API association. */
  associationId: string;
  /** The identifier of the AppSync Merged API. This is generated by the AppSync service. In most cases, Merged APIs (especially in your account) only require the API ID value or ARN of the merged API. Howe */
  mergedApiIdentifier: string;
}

export interface TagResourceInput {
  /** The GraphqlApi Amazon Resource Name (ARN). */
  resourceArn: string;
  /** A TagMap object. */
  tags: Record<string, string>;
}

export interface UntagResourceInput {
  /** The GraphqlApi Amazon Resource Name (ARN). */
  resourceArn: string;
  /** A list of TagKey objects. */
  tagKeys: string[];
}

export interface UpdateApiInput {
  /** The Api ID. */
  apiId: string;
  /** The new event configuration. This includes the default authorization configuration for connecting, publishing, and subscribing to an Event API. */
  eventConfig: EventConfig;
  /** The name of the Api. */
  name: string;
  /** The owner contact information for the Api. */
  ownerContact?: string;
}

/** Represents the input of a UpdateApiCache operation. */
export interface UpdateApiCacheInput {
  /** Caching behavior. FULL_REQUEST_CACHING: All requests from the same user are cached. Individual resolvers are automatically cached. All API calls will try to return responses from the cache. PER_RESOLV */
  apiCachingBehavior: 'FULL_REQUEST_CACHING' | 'PER_RESOLVER_CACHING' | 'OPERATION_LEVEL_CACHING';
  /** The GraphQL API ID. */
  apiId: string;
  /** TTL in seconds for cache entries. Valid values are 1–3,600 seconds. */
  ttl: number;
  /** The cache instance type. Valid values are SMALL MEDIUM LARGE XLARGE LARGE_2X LARGE_4X LARGE_8X (not available in all regions) LARGE_12X Historically, instance types were identified by an EC2-style val */
  type: 'T2_SMALL' | 'T2_MEDIUM' | 'R4_LARGE' | 'R4_XLARGE' | 'R4_2XLARGE' | 'R4_4XLARGE' | 'R4_8XLARGE' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'XLARGE' | 'LARGE_2X' | 'LARGE_4X' | 'LARGE_8X' | 'LARGE_12X';
  /** Controls how cache health metrics will be emitted to CloudWatch. Cache health metrics include: NetworkBandwidthOutAllowanceExceeded: The network packets dropped because the throughput exceeded the agg */
  healthMetricsConfig?: 'ENABLED' | 'DISABLED';
}

export interface UpdateApiKeyInput {
  /** The ID for the GraphQL API. */
  apiId: string;
  /** The API key ID. */
  id: string;
  /** A description of the purpose of the API key. */
  description?: string;
  /** From the update time, the time after which the API key expires. The date is represented as seconds since the epoch. For more information, see . */
  expires?: number;
}

export interface UpdateChannelNamespaceInput {
  /** The Api ID. */
  apiId: string;
  /** The name of the ChannelNamespace. */
  name: string;
  /** The event handler functions that run custom business logic to process published events and subscribe requests. */
  codeHandlers?: string;
  /** The configuration for the OnPublish and OnSubscribe handlers. */
  handlerConfigs?: HandlerConfigs;
  /** The authorization mode to use for publishing messages on the channel namespace. This configuration overrides the default Api authorization configuration. */
  publishAuthModes?: AuthMode[];
  /** The authorization mode to use for subscribing to messages on the channel namespace. This configuration overrides the default Api authorization configuration. */
  subscribeAuthModes?: AuthMode[];
}

export interface UpdateDataSourceInput {
  /** The API ID. */
  apiId: string;
  /** The new name for the data source. */
  name: string;
  /** The new data source type. */
  type: 'AWS_LAMBDA' | 'AMAZON_DYNAMODB' | 'AMAZON_ELASTICSEARCH' | 'NONE' | 'HTTP' | 'RELATIONAL_DATABASE' | 'AMAZON_OPENSEARCH_SERVICE' | 'AMAZON_EVENTBRIDGE' | 'AMAZON_BEDROCK_RUNTIME';
  /** The new description for the data source. */
  description?: string;
  /** The new Amazon DynamoDB configuration. */
  dynamodbConfig?: DynamodbDataSourceConfig;
  /** The new OpenSearch configuration. As of September 2021, Amazon Elasticsearch service is Amazon OpenSearch Service. This configuration is deprecated. Instead, use UpdateDataSourceRequest$openSearchServ */
  elasticsearchConfig?: ElasticsearchDataSourceConfig;
  /** The new Amazon EventBridge settings. */
  eventBridgeConfig?: EventBridgeDataSourceConfig;
  /** The new HTTP endpoint configuration. */
  httpConfig?: HttpDataSourceConfig;
  /** The new Lambda configuration. */
  lambdaConfig?: LambdaDataSourceConfig;
  /** Enables or disables enhanced data source metrics for specified data sources. Note that metricsConfig won't be used unless the dataSourceLevelMetricsBehavior value is set to PER_DATA_SOURCE_METRICS. If */
  metricsConfig?: 'ENABLED' | 'DISABLED';
  /** The new OpenSearch configuration. */
  openSearchServiceConfig?: OpenSearchServiceDataSourceConfig;
  /** The new relational database configuration. */
  relationalDatabaseConfig?: RelationalDatabaseDataSourceConfig;
  /** The new service role Amazon Resource Name (ARN) for the data source. */
  serviceRoleArn?: string;
}

export interface UpdateDomainNameInput {
  /** The domain name. */
  domainName: string;
  /** A description of the DomainName. */
  description?: string;
}

export interface UpdateFunctionInput {
  /** The GraphQL API ID. */
  apiId: string;
  /** The Function DataSource name. */
  dataSourceName: string;
  /** The function ID. */
  functionId: string;
  /** The Function name. */
  name: string;
  /** The function code that contains the request and response functions. When code is used, the runtime is required. The runtime value must be APPSYNC_JS. */
  code?: string;
  /** The Function description. */
  description?: string;
  /** The version of the request mapping template. Currently, the supported value is 2018-05-29. Note that when using VTL and mapping templates, the functionVersion is required. */
  functionVersion?: string;
  /** The maximum batching size for a resolver. */
  maxBatchSize?: number;
  /** The Function request mapping template. Functions support only the 2018-05-29 version of the request mapping template. */
  requestMappingTemplate?: string;
  /** The Function request mapping template. */
  responseMappingTemplate?: string;
  runtime?: AppSyncRuntime;
  syncConfig?: SyncConfig;
}

export interface UpdateGraphqlApiInput {
  /** The API ID. */
  apiId: string;
  /** The new authentication type for the GraphqlApi object. */
  authenticationType: 'API_KEY' | 'AWS_IAM' | 'AMAZON_COGNITO_USER_POOLS' | 'OPENID_CONNECT' | 'AWS_LAMBDA';
  /** The new name for the GraphqlApi object. */
  name: string;
  /** A list of additional authentication providers for the GraphqlApi API. */
  additionalAuthenticationProviders?: AdditionalAuthenticationProvider[];
  /** The enhancedMetricsConfig object. */
  enhancedMetricsConfig?: EnhancedMetricsConfig;
  /** Sets the value of the GraphQL API to enable (ENABLED) or disable (DISABLED) introspection. If no value is provided, the introspection configuration will be set to ENABLED by default. This field will p */
  introspectionConfig?: 'ENABLED' | 'DISABLED';
  /** Configuration for Lambda function authorization. */
  lambdaAuthorizerConfig?: LambdaAuthorizerConfig;
  /** The Amazon CloudWatch Logs configuration for the GraphqlApi object. */
  logConfig?: LogConfig;
  /** The Identity and Access Management service role ARN for a merged API. The AppSync service assumes this role on behalf of the Merged API to validate access to source APIs at runtime and to prompt the A */
  mergedApiExecutionRoleArn?: string;
  /** The OpenID Connect configuration for the GraphqlApi object. */
  openIDConnectConfig?: OpenIDConnectConfig;
  /** The owner contact information for an API resource. This field accepts any string input with a length of 0 - 256 characters. */
  ownerContact?: string;
  /** The maximum depth a query can have in a single request. Depth refers to the amount of nested levels allowed in the body of query. The default value is 0 (or unspecified), which indicates there's no de */
  queryDepthLimit?: number;
  /** The maximum number of resolvers that can be invoked in a single request. The default value is 0 (or unspecified), which will set the limit to 10000. When specified, the limit value can be between 1 an */
  resolverCountLimit?: number;
  /** The new Amazon Cognito user pool configuration for the ~GraphqlApi object. */
  userPoolConfig?: UserPoolConfig;
  /** A flag indicating whether to use X-Ray tracing for the GraphqlApi. */
  xrayEnabled?: boolean;
}

export interface UpdateResolverInput {
  /** The API ID. */
  apiId: string;
  /** The new field name. */
  fieldName: string;
  /** The new type name. */
  typeName: string;
  /** The caching configuration for the resolver. */
  cachingConfig?: CachingConfig;
  /** The resolver code that contains the request and response functions. When code is used, the runtime is required. The runtime value must be APPSYNC_JS. */
  code?: string;
  /** The new data source name. */
  dataSourceName?: string;
  /** The resolver type. UNIT: A UNIT resolver type. A UNIT resolver is the default resolver type. You can use a UNIT resolver to run a GraphQL query against a single data source. PIPELINE: A PIPELINE resol */
  kind?: 'UNIT' | 'PIPELINE';
  /** The maximum batching size for a resolver. */
  maxBatchSize?: number;
  /** Enables or disables enhanced resolver metrics for specified resolvers. Note that metricsConfig won't be used unless the resolverLevelMetricsBehavior value is set to PER_RESOLVER_METRICS. If the resolv */
  metricsConfig?: 'ENABLED' | 'DISABLED';
  /** The PipelineConfig. */
  pipelineConfig?: PipelineConfig;
  /** The new request mapping template. A resolver uses a request mapping template to convert a GraphQL expression into a format that a data source can understand. Mapping templates are written in Apache Ve */
  requestMappingTemplate?: string;
  /** The new response mapping template. */
  responseMappingTemplate?: string;
  runtime?: AppSyncRuntime;
  /** The SyncConfig for a resolver attached to a versioned data source. */
  syncConfig?: SyncConfig;
}

export interface UpdateSourceApiAssociationInput {
  /** The ID generated by the AppSync service for the source API association. */
  associationId: string;
  /** The identifier of the AppSync Merged API. This is generated by the AppSync service. In most cases, Merged APIs (especially in your account) only require the API ID value or ARN of the merged API. Howe */
  mergedApiIdentifier: string;
  /** The description field. */
  description?: string;
  /** The SourceApiAssociationConfig object data. */
  sourceApiAssociationConfig?: SourceApiAssociationConfig;
}

export interface UpdateTypeInput {
  /** The API ID. */
  apiId: string;
  /** The new type format: SDL or JSON. */
  format: 'SDL' | 'JSON';
  /** The new type name. */
  typeName: string;
  /** The new definition. */
  definition?: string;
}

/** AppSync service binding for Step Functions SDK integrations. */
export class AppSync {
  constructor() {}

  associateApi<T>(params: AssociateApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateMergedGraphqlApi<T>(params: AssociateMergedGraphqlApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateSourceGraphqlApi<T>(params: AssociateSourceGraphqlApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createApi<T>(params: CreateApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createApiCache<T>(params: CreateApiCacheInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createApiKey<T>(params: CreateApiKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createChannelNamespace<T>(params: CreateChannelNamespaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDataSource<T>(params: CreateDataSourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDomainName<T>(params: CreateDomainNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createFunction<T>(params: CreateFunctionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createGraphqlApi<T>(params: CreateGraphqlApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createResolver<T>(params: CreateResolverInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createType<T>(params: CreateTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApi<T>(params: DeleteApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApiCache<T>(params: DeleteApiCacheInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApiKey<T>(params: DeleteApiKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteChannelNamespace<T>(params: DeleteChannelNamespaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDataSource<T>(params: DeleteDataSourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDomainName<T>(params: DeleteDomainNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteFunction<T>(params: DeleteFunctionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteGraphqlApi<T>(params: DeleteGraphqlApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteResolver<T>(params: DeleteResolverInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteType<T>(params: DeleteTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateApi<T>(params: DisassociateApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateMergedGraphqlApi<T>(params: DisassociateMergedGraphqlApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateSourceGraphqlApi<T>(params: DisassociateSourceGraphqlApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  evaluateCode<T>(params: EvaluateCodeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  evaluateMappingTemplate<T>(params: EvaluateMappingTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  flushApiCache<T>(params: FlushApiCacheInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApi<T>(params: GetApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApiAssociation<T>(params: GetApiAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApiCache<T>(params: GetApiCacheInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getChannelNamespace<T>(params: GetChannelNamespaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDataSource<T>(params: GetDataSourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDataSourceIntrospection<T>(params: GetDataSourceIntrospectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDomainName<T>(params: GetDomainNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getFunction<T>(params: GetFunctionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getGraphqlApi<T>(params: GetGraphqlApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getGraphqlApiEnvironmentVariables<T>(params: GetGraphqlApiEnvironmentVariablesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIntrospectionSchema<T>(params: GetIntrospectionSchemaInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getResolver<T>(params: GetResolverInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSchemaCreationStatus<T>(params: GetSchemaCreationStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSourceApiAssociation<T>(params: GetSourceApiAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getType<T>(params: GetTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listApiKeys<T>(params: ListApiKeysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listApis<T>(params: ListApisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listChannelNamespaces<T>(params: ListChannelNamespacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDataSources<T>(params: ListDataSourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDomainNames<T>(params: ListDomainNamesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listFunctions<T>(params: ListFunctionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listGraphqlApis<T>(params: ListGraphqlApisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listResolvers<T>(params: ListResolversInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listResolversByFunction<T>(params: ListResolversByFunctionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSourceApiAssociations<T>(params: ListSourceApiAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTypes<T>(params: ListTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTypesByAssociation<T>(params: ListTypesByAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putGraphqlApiEnvironmentVariables<T>(params: PutGraphqlApiEnvironmentVariablesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDataSourceIntrospection<T>(params: StartDataSourceIntrospectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startSchemaCreation<T>(params: StartSchemaCreationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startSchemaMerge<T>(params: StartSchemaMergeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApi<T>(params: UpdateApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApiCache<T>(params: UpdateApiCacheInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApiKey<T>(params: UpdateApiKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateChannelNamespace<T>(params: UpdateChannelNamespaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDataSource<T>(params: UpdateDataSourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDomainName<T>(params: UpdateDomainNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateFunction<T>(params: UpdateFunctionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateGraphqlApi<T>(params: UpdateGraphqlApiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateResolver<T>(params: UpdateResolverInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSourceApiAssociation<T>(params: UpdateSourceApiAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateType<T>(params: UpdateTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
