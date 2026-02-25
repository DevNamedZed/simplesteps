// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface S3Location {
  /** The S3 bucket. */
  bucket?: string;
  /** The S3 key. */
  key?: string;
  /** The S3 bucket version. */
  version?: string;
}

export interface Sbom {
  s3Location?: S3Location;
}

export interface PolicyVersionIdentifier {
  /** The name of the policy. */
  policyName?: string;
  /** The ID of the version of the policy associated with the resource. */
  policyVersionId?: string;
}

export interface IssuerCertificateIdentifier {
  /** The subject of the issuer certificate. */
  issuerCertificateSubject?: string;
  /** The issuer ID. */
  issuerId?: string;
  /** The issuer certificate serial number. */
  issuerCertificateSerialNumber?: string;
}

export interface ResourceIdentifier {
  /** The ID of the certificate attached to the resource. */
  deviceCertificateId?: string;
  /** The ID of the CA certificate used to authorize the certificate. */
  caCertificateId?: string;
  /** The ID of the Amazon Cognito identity pool. */
  cognitoIdentityPoolId?: string;
  /** The client ID. */
  clientId?: string;
  /** The version of the policy associated with the resource. */
  policyVersionIdentifier?: PolicyVersionIdentifier;
  /** The account with which the resource is associated. */
  account?: string;
  /** The ARN of the IAM role that has overly permissive actions. */
  iamRoleArn?: string;
  /** The ARN of the role alias that has overly permissive actions. */
  roleAliasArn?: string;
  /** The issuer certificate identifier. */
  issuerCertificateIdentifier?: IssuerCertificateIdentifier;
  /** The ARN of the identified device certificate. */
  deviceCertificateArn?: string;
}

export interface Tag {
  /** The tag's key. */
  Key: string;
  /** The tag's value. */
  Value?: string;
}

export interface BillingGroupProperties {
  /** The description of the billing group. */
  billingGroupDescription?: string;
}

export interface CommandPayload {
  /** The static payload file for the command. */
  content?: string;
  /** The content type that specifies the format type of the payload file. This field must use a type/subtype format, such as application/json. For information about various content types, see Common MIME t */
  contentType?: string;
}

export interface AwsJsonSubstitutionCommandPreprocessorConfig {
  /** Converts the command preprocessor result to the format defined by this parameter, before sending it to the device. */
  outputFormat: 'JSON' | 'CBOR';
}

export interface CommandPreprocessor {
  /** Configuration for the JSON substitution preprocessor. */
  awsJsonSubstitution?: AwsJsonSubstitutionCommandPreprocessorConfig;
}

export interface CommandParameter {
  /** The name of a specific parameter used in a command and command execution. */
  name: string;
  /** The type of the command parameter. */
  type?: 'STRING' | 'INTEGER' | 'DOUBLE' | 'LONG' | 'UNSIGNEDLONG' | 'BOOLEAN' | 'BINARY';
  /** Parameter value that overrides the default value, if set. */
  value?: any;
  /** The default value used to describe the command. This is the value assumed by the parameter if no other value is assigned to it. */
  defaultValue?: any;
  /** The list of conditions that a command parameter value must satisfy to create a command execution. */
  valueConditions?: any[];
  /** The description of the command parameter. */
  description?: string;
}

export interface AuthorizerConfig {
  /** The name of the authorization service for a domain configuration. */
  defaultAuthorizerName?: string;
  /** A Boolean that specifies whether the domain configuration's authorization service can be overridden. */
  allowAuthorizerOverride?: boolean;
}

export interface TlsConfig {
  /** The security policy for a domain configuration. For more information, see Security policies in the Amazon Web Services IoT Core developer guide. */
  securityPolicy?: string;
}

export interface ServerCertificateConfig {
  /** A Boolean value that indicates whether Online Certificate Status Protocol (OCSP) server certificate check is enabled or not. For more information, see Server certificate configuration for OCSP staplin */
  enableOCSPCheck?: boolean;
  /** The Amazon Resource Name (ARN) for a Lambda function that acts as a Request for Comments (RFC) 6960-compliant Online Certificate Status Protocol (OCSP) responder, supporting basic OCSP responses. The  */
  ocspLambdaArn?: string;
  /** The Amazon Resource Name (ARN) for an X.509 certificate stored in Amazon Web Services Certificate Manager (ACM). If provided, Amazon Web Services IoT Core will use this certificate to validate the sig */
  ocspAuthorizedResponderArn?: string;
}

export interface ClientCertificateConfig {
  /** The ARN of the Lambda function that IoT invokes after mutual TLS authentication during the connection. */
  clientCertificateCallbackArn?: string;
}

export interface AttributePayload {
  /** A JSON string containing up to three key-value pair in JSON format. For example: {\"attributes\":{\"string1\":\"string2\"}} */
  attributes?: Record<string, any>;
  /** Specifies whether the list of attributes provided in the AttributePayload is merged with the attributes stored in the registry, instead of overwriting them. To remove an attribute, call UpdateThing wi */
  merge?: boolean;
}

export interface ThingGroupProperties {
  /** The thing group description. */
  thingGroupDescription?: string;
  /** The thing group attributes in JSON format. */
  attributePayload?: AttributePayload;
}

export interface AggregationType {
  /** The name of the aggregation type. */
  name: 'Statistics' | 'Percentiles' | 'Cardinality';
  /** A list of the values of aggregation types. */
  values?: string[];
}

export interface PresignedUrlConfig {
  /** The ARN of an IAM role that grants permission to download files from the S3 bucket where the job data/updates are stored. The role must also grant permission for IoT to download the files. For informa */
  roleArn?: string;
  /** How long (in seconds) pre-signed URLs are valid. Valid values are 60 - 3600, the default value is 3600 seconds. Pre-signed URLs are generated when Jobs receives an MQTT request for the job document. */
  expiresInSec?: number;
}

export interface ExponentialRolloutRate {
  /** The minimum number of things that will be notified of a pending job, per minute at the start of job rollout. This parameter allows you to define the initial rate of rollout. */
  baseRatePerMinute: number;
  /** The exponential factor to increase the rate of rollout for a job. Amazon Web Services IoT Core supports up to one digit after the decimal (for example, 1.5, but not 1.55). */
  incrementFactor: number;
  /** The criteria to initiate the increase in rate of rollout for a job. */
  rateIncreaseCriteria: any;
}

export interface JobExecutionsRolloutConfig {
  /** The maximum number of things that will be notified of a pending job, per minute. This parameter allows you to create a staged rollout. */
  maximumPerMinute?: number;
  /** The rate of increase for a job rollout. This parameter allows you to define an exponential rate for a job rollout. */
  exponentialRate?: ExponentialRolloutRate;
}

export interface AbortConfig {
  /** The list of criteria that determine when and how to abort the job. */
  criteriaList: any[];
}

export interface TimeoutConfig {
  /** Specifies the amount of time, in minutes, this device has to finish execution of this job. The timeout interval can be anywhere between 1 minute and 7 days (1 to 10080 minutes). The in progress timer  */
  inProgressTimeoutInMinutes?: number;
}

export interface JobExecutionsRetryConfig {
  /** The list of criteria that determines how many retries are allowed for each failure type for a job. */
  criteriaList: any[];
}

export interface SchedulingConfig {
  /** The time a job will begin rollout of the job document to all devices in the target group for a job. The startTime can be scheduled up to a year in advance and must be scheduled a minimum of thirty min */
  startTime?: string;
  /** The time a job will stop rollout of the job document to all devices in the target group for a job. The endTime must take place no later than two years from the current time and be scheduled a minimum  */
  endTime?: string;
  /** Specifies the end behavior for all job executions after a job reaches the selected endTime. If endTime is not selected when creating the job, then endBehavior does not apply. */
  endBehavior?: 'STOP_ROLLOUT' | 'CANCEL' | 'FORCE_CANCEL';
  /** An optional configuration within the SchedulingConfig to setup a recurring maintenance window with a predetermined start time and duration for the rollout of a job document to all devices in a target  */
  maintenanceWindows?: any[];
}

export interface MaintenanceWindow {
  /** Displays the start time of the next maintenance window. */
  startTime: string;
  /** Displays the duration of the next maintenance window. */
  durationInMinutes: number;
}

export interface UpdateDeviceCertificateParams {
  /** The action that you want to apply to the device certificate. The only supported value is DEACTIVATE. */
  action: 'DEACTIVATE';
}

export interface UpdateCACertificateParams {
  /** The action that you want to apply to the CA certificate. The only supported value is DEACTIVATE. */
  action: 'DEACTIVATE';
}

export interface AddThingsToThingGroupParams {
  /** The list of groups to which you want to add the things that triggered the mitigation action. You can add a thing to a maximum of 10 groups, but you can't add a thing to more than one group in the same */
  thingGroupNames: any[];
  /** Specifies if this mitigation action can move the things that triggered the mitigation action even if they are part of one or more dynamic thing groups. */
  overrideDynamicGroups?: boolean;
}

export interface ReplaceDefaultPolicyVersionParams {
  /** The name of the template to be applied. The only supported value is BLANK_POLICY. */
  templateName: 'BLANK_POLICY';
}

export interface EnableIoTLoggingParams {
  /** The Amazon Resource Name (ARN) of the IAM role used for logging. */
  roleArnForLogging: string;
  /** Specifies the type of information to be logged. */
  logLevel: 'DEBUG' | 'INFO' | 'ERROR' | 'WARN' | 'DISABLED';
}

export interface PublishFindingToSnsParams {
  /** The ARN of the topic to which you want to publish the findings. */
  topicArn: string;
}

export interface MitigationActionParams {
  /** Parameters to define a mitigation action that changes the state of the device certificate to inactive. */
  updateDeviceCertificateParams?: UpdateDeviceCertificateParams;
  /** Parameters to define a mitigation action that changes the state of the CA certificate to inactive. */
  updateCACertificateParams?: UpdateCACertificateParams;
  /** Parameters to define a mitigation action that moves devices associated with a certificate to one or more specified thing groups, typically for quarantine. */
  addThingsToThingGroupParams?: AddThingsToThingGroupParams;
  /** Parameters to define a mitigation action that adds a blank policy to restrict permissions. */
  replaceDefaultPolicyVersionParams?: ReplaceDefaultPolicyVersionParams;
  /** Parameters to define a mitigation action that enables Amazon Web Services IoT Core logging at a specified level of detail. */
  enableIoTLoggingParams?: EnableIoTLoggingParams;
  /** Parameters to define a mitigation action that publishes findings to Amazon Simple Notification Service (Amazon SNS. You can implement your own custom actions in response to the Amazon SNS messages. */
  publishFindingToSnsParams?: PublishFindingToSnsParams;
}

export interface AwsJobExponentialRolloutRate {
  /** The minimum number of things that will be notified of a pending job, per minute, at the start of the job rollout. This is the initial rate of the rollout. */
  baseRatePerMinute: number;
  /** The rate of increase for a job rollout. The number of things notified is multiplied by this factor. */
  incrementFactor: number;
  /** The criteria to initiate the increase in rate of rollout for a job. Amazon Web Services IoT Core supports up to one digit after the decimal (for example, 1.5, but not 1.55). */
  rateIncreaseCriteria: any;
}

export interface AwsJobExecutionsRolloutConfig {
  /** The maximum number of OTA update job executions started per minute. */
  maximumPerMinute?: number;
  /** The rate of increase for a job rollout. This parameter allows you to define an exponential rate increase for a job rollout. */
  exponentialRate?: AwsJobExponentialRolloutRate;
}

export interface AwsJobPresignedUrlConfig {
  /** How long (in seconds) pre-signed URLs are valid. Valid values are 60 - 3600, the default value is 1800 seconds. Pre-signed URLs are generated when a request for the job document is received. */
  expiresInSec?: number;
}

export interface AwsJobAbortConfig {
  /** The list of criteria that determine when and how to abort the job. */
  abortCriteriaList: any[];
}

export interface AwsJobTimeoutConfig {
  /** Specifies the amount of time, in minutes, this device has to finish execution of this job. The timeout interval can be anywhere between 1 minute and 7 days (1 to 10080 minutes). The in progress timer  */
  inProgressTimeoutInMinutes?: number;
}

export interface OTAUpdateFile {
  /** The name of the file. */
  fileName?: string;
  /** An integer value you can include in the job document to allow your devices to identify the type of file received from the cloud. */
  fileType?: number;
  /** The file version. */
  fileVersion?: string;
  /** The location of the updated firmware. */
  fileLocation?: any;
  /** The code signing method of the file. */
  codeSigning?: any;
  /** A list of name-attribute pairs. They won't be sent to devices as a part of the Job document. */
  attributes?: Record<string, any>;
}

export interface PackageVersionArtifact {
  s3Location?: S3Location;
}

export interface ProvisioningHook {
  /** The payload that was sent to the target function. Note: Only Lambda functions are currently supported. */
  payloadVersion?: string;
  /** The ARN of the target function. Note: Only Lambda functions are currently supported. */
  targetArn: string;
}

export interface Behavior {
  /** The name you've given to the behavior. */
  name: string;
  /** What is measured by the behavior. */
  metric?: string;
  /** The dimension for a metric in your behavior. For example, using a TOPIC_FILTER dimension, you can narrow down the scope of the metric to only MQTT topics where the name matches the pattern specified i */
  metricDimension?: any;
  /** The criteria that determine if a device is behaving normally in regard to the metric. In the IoT console, you can choose to be sent an alert through Amazon SNS when IoT Device Defender detects that a  */
  criteria?: any;
  /** Suppresses alerts. */
  suppressAlerts?: boolean;
  /** Value indicates exporting metrics related to the behavior when it is true. */
  exportMetric?: boolean;
}

export interface AlertTarget {
  /** The Amazon Resource Name (ARN) of the notification target to which alerts are sent. */
  alertTargetArn: string;
  /** The ARN of the role that grants permission to send alerts to the notification target. */
  roleArn: string;
}

export interface MetricToRetain {
  /** What is measured by the behavior. */
  metric: string;
  /** The dimension of a metric. This can't be used with custom metrics. */
  metricDimension?: any;
  /** The value indicates exporting metrics related to the MetricToRetain when it's true. */
  exportMetric?: boolean;
}

export interface MetricsExportConfig {
  /** The MQTT topic that Device Defender Detect should publish messages to for metrics export. */
  mqttTopic: string;
  /** This role ARN has permission to publish MQTT messages, after which Device Defender Detect can assume the role and publish messages on your behalf. */
  roleArn: string;
}

export interface StreamFile {
  /** The file ID. */
  fileId?: number;
  /** The location of the file in S3. */
  s3Location?: any;
}

export interface Mqtt5Configuration {
  /** An object that represents the propagating thing attributes and the connection attributes. */
  propagatingAttributes?: any[];
}

export interface ThingTypeProperties {
  /** The description of the thing type. */
  thingTypeDescription?: string;
  /** A list of searchable thing attribute names. */
  searchableAttributes?: string[];
  /** The configuration to add user-defined properties to enrich MQTT 5 messages. */
  mqtt5Configuration?: Mqtt5Configuration;
}

export interface Action {
  /** Write to a DynamoDB table. */
  dynamoDB?: any;
  /** Write to a DynamoDB table. This is a new version of the DynamoDB action. It allows you to write each attribute in an MQTT message payload into a separate DynamoDB column. */
  dynamoDBv2?: any;
  /** Invoke a Lambda function. */
  lambda?: any;
  /** Publish to an Amazon SNS topic. */
  sns?: any;
  /** Publish to an Amazon SQS queue. */
  sqs?: any;
  /** Write data to an Amazon Kinesis stream. */
  kinesis?: any;
  /** Publish to another MQTT topic. */
  republish?: any;
  /** Write to an Amazon S3 bucket. */
  s3?: any;
  /** Write to an Amazon Kinesis Firehose stream. */
  firehose?: any;
  /** Capture a CloudWatch metric. */
  cloudwatchMetric?: any;
  /** Change the state of a CloudWatch alarm. */
  cloudwatchAlarm?: any;
  /** Send data to CloudWatch Logs. */
  cloudwatchLogs?: any;
  /** Write data to an Amazon OpenSearch Service domain. The Elasticsearch action can only be used by existing rule actions. To create a new rule action or to update an existing rule action, use the OpenSea */
  elasticsearch?: any;
  /** Send a message to a Salesforce IoT Cloud Input Stream. */
  salesforce?: any;
  /** Sends message data to an IoT Analytics channel. */
  iotAnalytics?: any;
  /** Sends an input to an IoT Events detector. */
  iotEvents?: any;
  /** Sends data from the MQTT message that triggered the rule to IoT SiteWise asset properties. */
  iotSiteWise?: any;
  /** Starts execution of a Step Functions state machine. */
  stepFunctions?: any;
  /** The Timestream rule action writes attributes (measures) from an MQTT message into an Amazon Timestream table. For more information, see the Timestream topic rule action documentation. */
  timestream?: any;
  /** Send data to an HTTPS endpoint. */
  http?: any;
  /** Send messages to an Amazon Managed Streaming for Apache Kafka (Amazon MSK) or self-managed Apache Kafka cluster. */
  kafka?: any;
  /** Write data to an Amazon OpenSearch Service domain. */
  openSearch?: any;
  /** The Amazon Location Service rule action sends device location updates from an MQTT message to an Amazon Location tracker resource. */
  location?: any;
}

export interface TopicRulePayload {
  /** The SQL statement used to query the topic. For more information, see IoT SQL Reference in the IoT Developer Guide. */
  sql: string;
  /** The description of the rule. */
  description?: string;
  /** The actions associated with the rule. */
  actions: any[];
  /** Specifies whether the rule is disabled. */
  ruleDisabled?: boolean;
  /** The version of the SQL rules engine to use when evaluating the rule. */
  awsIotSqlVersion?: string;
  /** The action to take when an error occurs. */
  errorAction?: Action;
}

export interface HttpUrlDestinationConfiguration {
  /** The URL IoT uses to confirm ownership of or access to the topic rule destination URL. */
  confirmationUrl: string;
}

export interface VpcDestinationConfiguration {
  /** The subnet IDs of the VPC destination. */
  subnetIds: any[];
  /** The security groups of the VPC destination. */
  securityGroups?: any[];
  /** The ID of the VPC. */
  vpcId: string;
  /** The ARN of a role that has permission to create and attach to elastic network interfaces (ENIs). */
  roleArn: string;
}

export interface TopicRuleDestinationConfiguration {
  /** Configuration of the HTTP URL. */
  httpUrlConfiguration?: HttpUrlDestinationConfiguration;
  /** Configuration of the virtual private cloud (VPC) connection. */
  vpcConfiguration?: VpcDestinationConfiguration;
}

export interface TermsAggregation {
  /** The number of buckets to return in the response. Default to 10. */
  maxBuckets?: number;
}

export interface BucketsAggregationType {
  /** Performs an aggregation that will return a list of buckets. The list of buckets is a ranked list of the number of occurrences of an aggregation field value. */
  termsAggregation?: TermsAggregation;
}

export interface TimeFilter {
  /** Filter to display command executions that started or completed only after a particular date and time. */
  after?: string;
  /** Filter to display command executions that started or completed only before a particular date and time. */
  before?: string;
}

export interface RegistrationConfig {
  /** The template body. */
  templateBody?: string;
  /** The ARN of the role. */
  roleArn?: string;
  /** The name of the provisioning template. */
  templateName?: string;
}

export interface LoggingOptionsPayload {
  /** The ARN of the IAM role that grants access. */
  roleArn: string;
  /** The log level. */
  logLevel?: 'DEBUG' | 'INFO' | 'ERROR' | 'WARN' | 'DISABLED';
}

export interface LogTarget {
  /** The target type. */
  targetType: 'DEFAULT' | 'THING_GROUP' | 'CLIENT_ID' | 'SOURCE_IP' | 'PRINCIPAL_ID';
  /** The target name. */
  targetName?: string;
}

export interface LogEventConfiguration {
  /** The type of event to log. These include event types like Connect, Publish, and Disconnect. */
  eventType: string;
  /** The logging level for the specified event type. Determines the verbosity of log messages generated for this event type. */
  logLevel?: 'DEBUG' | 'INFO' | 'ERROR' | 'WARN' | 'DISABLED';
  /** CloudWatch Log Group for event-based logging. Specifies where log events should be sent. The log destination for event-based logging overrides default Log Group for the specified event type and applie */
  logDestination?: string;
}

export interface AuditMitigationActionsTaskTarget {
  /** If the task will apply a mitigation action to findings from a specific audit, this value uniquely identifies the audit. */
  auditTaskId?: string;
  /** If the task will apply a mitigation action to one or more listed findings, this value uniquely identifies those findings. */
  findingIds?: string[];
  /** Specifies a filter in the form of an audit check and set of reason codes that identify the findings from the audit to which the audit mitigation actions task apply. */
  auditCheckToReasonCodeFilter?: Record<string, any[]>;
}

export interface DetectMitigationActionsTaskTarget {
  /** The unique identifiers of the violations. */
  violationIds?: string[];
  /** The name of the security profile. */
  securityProfileName?: string;
  /** The name of the behavior. */
  behaviorName?: string;
}

export interface ViolationEventOccurrenceRange {
  /** The start date and time of a time period in which violation events occurred. */
  startTime: string;
  /** The end date and time of a time period in which violation events occurred. */
  endTime: string;
}

export interface AuthInfo {
  /** The type of action for which the principal is being authorized. */
  actionType?: 'PUBLISH' | 'SUBSCRIBE' | 'RECEIVE' | 'CONNECT';
  /** The resources for which the principal is being authorized to perform the specified action. */
  resources: any[];
}

export interface HttpContext {
  /** The header keys and values in an HTTP authorization request. */
  headers?: Record<string, string>;
  /** The query string keys and values in an HTTP authorization request. */
  queryString?: string;
}

export interface MqttContext {
  /** The value of the username key in an MQTT authorization request. */
  username?: string;
  /** The value of the password key in an MQTT authorization request. */
  password?: string;
  /** The value of the clientId key in an MQTT authorization request. */
  clientId?: string;
}

export interface TlsContext {
  /** The value of the serverName key in a TLS authorization request. */
  serverName?: string;
}

export interface AuditNotificationTarget {
  /** The ARN of the target (SNS topic) to which audit notifications are sent. */
  targetArn?: string;
  /** The ARN of the role that grants permission to send notifications to the target. */
  roleArn?: string;
  /** True if notifications to the target are enabled. */
  enabled?: boolean;
}

export interface AuditCheckConfiguration {
  /** True if this audit check is enabled for this account. */
  enabled?: boolean;
  /** A structure containing the configName and corresponding configValue for configuring audit checks. */
  configuration?: Record<string, any>;
}

export interface Configuration {
  /** True to enable the configuration. */
  Enabled?: boolean;
}

export interface IndexingFilter {
  /** The shadow names that you select to index. The default maximum number of shadow names for indexing is 10. To increase the limit, see Amazon Web Services IoT Device Management Quotas in the Amazon Web  */
  namedShadowNames?: any[];
  /** The list of geolocation targets that you select to index. The default maximum number of geolocation targets for indexing is 1. To increase the limit, see Amazon Web Services IoT Device Management Quot */
  geoLocations?: any[];
}

export interface ThingIndexingConfiguration {
  /** Thing indexing mode. Valid values are: REGISTRY – Your thing index contains registry data only. REGISTRY_AND_SHADOW - Your thing index contains registry and shadow data. OFF - Thing indexing is disabl */
  thingIndexingMode: 'OFF' | 'REGISTRY' | 'REGISTRY_AND_SHADOW';
  /** Thing connectivity indexing mode. Valid values are: STATUS – Your thing index contains connectivity status. To enable thing connectivity indexing, thingIndexMode must not be set to OFF. OFF - Thing co */
  thingConnectivityIndexingMode?: 'OFF' | 'STATUS';
  /** Device Defender indexing mode. Valid values are: VIOLATIONS – Your thing index contains Device Defender violations. To enable Device Defender indexing, deviceDefenderIndexingMode must not be set to OF */
  deviceDefenderIndexingMode?: 'OFF' | 'VIOLATIONS';
  /** Named shadow indexing mode. Valid values are: ON – Your thing index contains named shadow. To enable thing named shadow indexing, namedShadowIndexingMode must not be set to OFF. OFF - Named shadow ind */
  namedShadowIndexingMode?: 'OFF' | 'ON';
  /** Contains fields that are indexed and whose types are already known by the Fleet Indexing service. This is an optional field. For more information, see Managed fields in the Amazon Web Services IoT Cor */
  managedFields?: any[];
  /** Contains custom field names and their data type. */
  customFields?: any[];
  /** Provides additional selections for named shadows and geolocation data. To add named shadows to your fleet indexing configuration, set namedShadowIndexingMode to be ON and specify your shadow names in  */
  filter?: IndexingFilter;
}

export interface ThingGroupIndexingConfiguration {
  /** Thing group indexing mode. */
  thingGroupIndexingMode: 'OFF' | 'ON';
  /** Contains fields that are indexed and whose types are already known by the Fleet Indexing service. This is an optional field. For more information, see Managed fields in the Amazon Web Services IoT Cor */
  managedFields?: any[];
  /** A list of thing group fields to index. This list cannot contain any managed fields. Use the GetIndexingConfiguration API to get a list of managed fields. Contains custom field names and their data typ */
  customFields?: any[];
}

export interface VersionUpdateByJobsConfig {
  /** Indicates whether the Job is enabled or not. */
  enabled?: boolean;
  /** The Amazon Resource Name (ARN) of the role that grants permission to the IoT jobs service to update the reserved named shadow when the job successfully completes. */
  roleArn?: string;
}

/** The input for the AcceptCertificateTransfer operation. */
export interface AcceptCertificateTransferInput {
  /** The ID of the certificate. (The last part of the certificate ARN contains the certificate ID.) */
  certificateId: string;
  /** Specifies whether the certificate is active. */
  setAsActive?: boolean;
}

export interface AddThingToBillingGroupInput {
  /** The ARN of the billing group. */
  billingGroupArn?: string;
  /** The name of the billing group. This call is asynchronous. It might take several seconds for the detachment to propagate. */
  billingGroupName?: string;
  /** The ARN of the thing to be added to the billing group. */
  thingArn?: string;
  /** The name of the thing to be added to the billing group. */
  thingName?: string;
}

export interface AddThingToThingGroupInput {
  /** Override dynamic thing groups with static thing groups when 10-group limit is reached. If a thing belongs to 10 thing groups, and one or more of those groups are dynamic thing groups, adding a thing t */
  overrideDynamicGroups?: boolean;
  /** The ARN of the thing to add to a group. */
  thingArn?: string;
  /** The ARN of the group to which you are adding a thing. */
  thingGroupArn?: string;
  /** The name of the group to which you are adding a thing. */
  thingGroupName?: string;
  /** The name of the thing to add to a group. */
  thingName?: string;
}

export interface AssociateSbomWithPackageVersionInput {
  /** The name of the new software package. */
  packageName: string;
  sbom: Sbom;
  /** The name of the new package version. */
  versionName: string;
  /** A unique case-sensitive identifier that you can provide to ensure the idempotency of the request. Don't reuse this client token if a new idempotent request is required. */
  clientToken?: string;
}

export interface AssociateTargetsWithJobInput {
  /** The unique identifier you assigned to this job when it was created. */
  jobId: string;
  /** A list of thing group ARNs that define the targets of the job. */
  targets: string[];
  /** An optional comment string describing why the job was associated with the targets. */
  comment?: string;
  /** The namespace used to indicate that a job is a customer-managed job. When you specify a value for this parameter, Amazon Web Services IoT Core sends jobs notifications to MQTT topics that contain the  */
  namespaceId?: string;
}

export interface AttachPolicyInput {
  /** The name of the policy to attach. */
  policyName: string;
  /** The identity to which the policy is attached. For example, a thing group or a certificate. */
  target: string;
}

/** The input for the AttachPrincipalPolicy operation. */
export interface AttachPrincipalPolicyInput {
  /** The policy name. */
  policyName: string;
  /** The principal, which can be a certificate ARN (as returned from the CreateCertificate operation) or an Amazon Cognito ID. */
  principal: string;
}

export interface AttachSecurityProfileInput {
  /** The security profile that is attached. */
  securityProfileName: string;
  /** The ARN of the target (thing group) to which the security profile is attached. */
  securityProfileTargetArn: string;
}

/** The input for the AttachThingPrincipal operation. */
export interface AttachThingPrincipalInput {
  /** The principal, which can be a certificate ARN (as returned from the CreateCertificate operation) or an Amazon Cognito ID. */
  principal: string;
  /** The name of the thing. */
  thingName: string;
  /** The type of the relation you want to specify when you attach a principal to a thing. EXCLUSIVE_THING - Attaches the specified principal to the specified thing, exclusively. The thing will be the only  */
  thingPrincipalType?: 'EXCLUSIVE_THING' | 'NON_EXCLUSIVE_THING';
}

export interface CancelAuditMitigationActionsTaskInput {
  /** The unique identifier for the task that you want to cancel. */
  taskId: string;
}

export interface CancelAuditTaskInput {
  /** The ID of the audit you want to cancel. You can only cancel an audit that is "IN_PROGRESS". */
  taskId: string;
}

/** The input for the CancelCertificateTransfer operation. */
export interface CancelCertificateTransferInput {
  /** The ID of the certificate. (The last part of the certificate ARN contains the certificate ID.) */
  certificateId: string;
}

export interface CancelDetectMitigationActionsTaskInput {
  /** The unique identifier of the task. */
  taskId: string;
}

export interface CancelJobInput {
  /** The unique identifier you assigned to this job when it was created. */
  jobId: string;
  /** An optional comment string describing why the job was canceled. */
  comment?: string;
  /** (Optional) If true job executions with status "IN_PROGRESS" and "QUEUED" are canceled, otherwise only job executions with status "QUEUED" are canceled. The default is false. Canceling a job which is " */
  force?: boolean;
  /** (Optional)A reason code string that explains why the job was canceled. */
  reasonCode?: string;
}

export interface CancelJobExecutionInput {
  /** The ID of the job to be canceled. */
  jobId: string;
  /** The name of the thing whose execution of the job will be canceled. */
  thingName: string;
  /** (Optional) The expected current version of the job execution. Each time you update the job execution, its version is incremented. If the version of the job execution stored in Jobs does not match, the */
  expectedVersion?: number;
  /** (Optional) If true the job execution will be canceled if it has status IN_PROGRESS or QUEUED, otherwise the job execution will be canceled only if it has status QUEUED. If you attempt to cancel a job  */
  force?: boolean;
  /** A collection of name/value pairs that describe the status of the job execution. If not specified, the statusDetails are unchanged. You can specify at most 10 name/value pairs. */
  statusDetails?: Record<string, string>;
}

export interface ConfirmTopicRuleDestinationInput {
  /** The token used to confirm ownership or access to the topic rule confirmation URL. */
  confirmationToken: string;
}

export interface CreateAuditSuppressionInput {
  checkName: string;
  /** Each audit supression must have a unique client request token. If you try to create a new audit suppression with the same token as one that already exists, an exception occurs. If you omit this value, */
  clientRequestToken: string;
  resourceIdentifier: ResourceIdentifier;
  /** The description of the audit suppression. */
  description?: string;
  /** The epoch timestamp in seconds at which this suppression expires. */
  expirationDate?: string;
  /** Indicates whether a suppression should exist indefinitely or not. */
  suppressIndefinitely?: boolean;
}

export interface CreateAuthorizerInput {
  /** The ARN of the authorizer's Lambda function. */
  authorizerFunctionArn: string;
  /** The authorizer name. */
  authorizerName: string;
  /** When true, the result from the authorizer’s Lambda function is cached for clients that use persistent HTTP connections. The results are cached for the time specified by the Lambda function in refreshA */
  enableCachingForHttp?: boolean;
  /** Specifies whether IoT validates the token signature in an authorization request. */
  signingDisabled?: boolean;
  /** The status of the create authorizer request. */
  status?: 'ACTIVE' | 'INACTIVE';
  /** Metadata which can be used to manage the custom authorizer. For URI Request parameters use format: ...key1=value1&key2=value2... For the CLI command-line parameter use format: &&tags "key1=value1&key2 */
  tags?: Tag[];
  /** The name of the token key used to extract the token from the HTTP headers. */
  tokenKeyName?: string;
  /** The public keys used to verify the digital signature returned by your custom authentication service. */
  tokenSigningPublicKeys?: Record<string, string>;
}

export interface CreateBillingGroupInput {
  /** The name you wish to give to the billing group. */
  billingGroupName: string;
  /** The properties of the billing group. */
  billingGroupProperties?: BillingGroupProperties;
  /** Metadata which can be used to manage the billing group. */
  tags?: Tag[];
}

/** The input for the CreateCertificateFromCsr operation. */
export interface CreateCertificateFromCsrInput {
  /** The certificate signing request (CSR). */
  certificateSigningRequest: string;
  /** Specifies whether the certificate is active. */
  setAsActive?: boolean;
}

export interface CreateCertificateProviderInput {
  /** A list of the operations that the certificate provider will use to generate certificates. Valid value: CreateCertificateFromCsr. */
  accountDefaultForOperations: 'CreateCertificateFromCsr'[];
  /** The name of the certificate provider. */
  certificateProviderName: string;
  /** The ARN of the Lambda function that defines the authentication logic. */
  lambdaFunctionArn: string;
  /** A string that you can optionally pass in the CreateCertificateProvider request to make sure the request is idempotent. */
  clientToken?: string;
  /** Metadata which can be used to manage the certificate provider. */
  tags?: Tag[];
}

export interface CreateCommandInput {
  /** A unique identifier for the command. We recommend using UUID. Alpha-numeric characters, hyphens, and underscores are valid for use here. */
  commandId: string;
  /** A short text decription of the command. */
  description?: string;
  /** The user-friendly name in the console for the command. This name doesn't have to be unique. You can update the user-friendly name after you define it. */
  displayName?: string;
  /** A list of parameters that are used by StartCommandExecution API for execution payload generation. */
  mandatoryParameters?: CommandParameter[];
  /** The namespace of the command. The MQTT reserved topics and validations will be used for command executions according to the namespace setting. */
  namespace?: 'AWS-IoT' | 'AWS-IoT-FleetWise';
  /** The payload object for the static command. You can upload a static payload file from your local storage that contains the instructions for the device to process. The payload file can use any format. T */
  payload?: CommandPayload;
  /** The payload template for the dynamic command. This parameter is required for dynamic commands where the command execution placeholders are supplied either from mandatoryParameters or when StartCommand */
  payloadTemplate?: string;
  /** Configuration that determines how payloadTemplate is processed to generate command execution payload. This parameter is required for dynamic commands, along with payloadTemplate, and mandatoryParamete */
  preprocessor?: CommandPreprocessor;
  /** The IAM role that you must provide when using the AWS-IoT-FleetWise namespace. The role grants IoT Device Management the permission to access IoT FleetWise resources for generating the payload for the */
  roleArn?: string;
  /** Name-value pairs that are used as metadata to manage a command. */
  tags?: Tag[];
}

export interface CreateCustomMetricInput {
  /** Each custom metric must have a unique client request token. If you try to create a new custom metric that already exists with a different token, an exception occurs. If you omit this value, Amazon Web */
  clientRequestToken: string;
  /** The name of the custom metric. This will be used in the metric report submitted from the device/thing. The name can't begin with aws:. You can't change the name after you define it. */
  metricName: string;
  /** The type of the custom metric. The type number only takes a single metric value as an input, but when you submit the metrics value in the DeviceMetrics report, you must pass it as an array with a sing */
  metricType: 'string-list' | 'ip-address-list' | 'number-list' | 'number';
  /** The friendly name in the console for the custom metric. This name doesn't have to be unique. Don't use this name as the metric identifier in the device metric report. You can update the friendly name  */
  displayName?: string;
  /** Metadata that can be used to manage the custom metric. */
  tags?: Tag[];
}

export interface CreateDimensionInput {
  /** Each dimension must have a unique client request token. If you try to create a new dimension with the same token as a dimension that already exists, an exception occurs. If you omit this value, Amazon */
  clientRequestToken: string;
  /** A unique identifier for the dimension. Choose something that describes the type and value to make it easy to remember what it does. */
  name: string;
  /** Specifies the value or list of values for the dimension. For TOPIC_FILTER dimensions, this is a pattern used to match the MQTT topic (for example, "admin/#"). */
  stringValues: string[];
  /** Specifies the type of dimension. Supported types: TOPIC_FILTER. */
  type: 'TOPIC_FILTER';
  /** Metadata that can be used to manage the dimension. */
  tags?: Tag[];
}

export interface CreateDomainConfigurationInput {
  /** The name of the domain configuration. This value must be unique to a region. */
  domainConfigurationName: string;
  /** An enumerated string that speciﬁes the application-layer protocol. SECURE_MQTT - MQTT over TLS. MQTT_WSS - MQTT over WebSocket. HTTPS - HTTP over TLS. DEFAULT - Use a combination of port and Applicati */
  applicationProtocol?: 'SECURE_MQTT' | 'MQTT_WSS' | 'HTTPS' | 'DEFAULT';
  /** An enumerated string that speciﬁes the authentication type. CUSTOM_AUTH_X509 - Use custom authentication and authorization with additional details from the X.509 client certificate. CUSTOM_AUTH - Use  */
  authenticationType?: 'CUSTOM_AUTH_X509' | 'CUSTOM_AUTH' | 'AWS_X509' | 'AWS_SIGV4' | 'DEFAULT';
  /** An object that specifies the authorization service for a domain. */
  authorizerConfig?: AuthorizerConfig;
  /** An object that speciﬁes the client certificate conﬁguration for a domain. */
  clientCertificateConfig?: ClientCertificateConfig;
  /** The name of the domain. */
  domainName?: string;
  /** The ARNs of the certificates that IoT passes to the device during the TLS handshake. Currently you can specify only one certificate ARN. This value is not required for Amazon Web Services-managed doma */
  serverCertificateArns?: string[];
  /** The server certificate configuration. */
  serverCertificateConfig?: ServerCertificateConfig;
  /** The type of service delivered by the endpoint. Amazon Web Services IoT Core currently supports only the DATA service type. */
  serviceType?: 'DATA' | 'CREDENTIAL_PROVIDER' | 'JOBS';
  /** Metadata which can be used to manage the domain configuration. For URI Request parameters use format: ...key1=value1&key2=value2... For the CLI command-line parameter use format: &&tags "key1=value1&k */
  tags?: Tag[];
  /** An object that specifies the TLS configuration for a domain. */
  tlsConfig?: TlsConfig;
  /** The certificate used to validate the server certificate and prove domain name ownership. This certificate must be signed by a public certificate authority. This value is not required for Amazon Web Se */
  validationCertificateArn?: string;
}

export interface CreateDynamicThingGroupInput {
  /** The dynamic thing group search query string. See Query Syntax for information about query string syntax. */
  queryString: string;
  /** The dynamic thing group name to create. */
  thingGroupName: string;
  /** The dynamic thing group index name. Currently one index is supported: AWS_Things. */
  indexName?: string;
  /** The dynamic thing group query version. Currently one query version is supported: "2017-09-30". If not specified, the query version defaults to this value. */
  queryVersion?: string;
  /** Metadata which can be used to manage the dynamic thing group. */
  tags?: Tag[];
  /** The dynamic thing group properties. */
  thingGroupProperties?: ThingGroupProperties;
}

export interface CreateFleetMetricInput {
  /** The field to aggregate. */
  aggregationField: string;
  /** The type of the aggregation query. */
  aggregationType: AggregationType;
  /** The name of the fleet metric to create. */
  metricName: string;
  /** The time in seconds between fleet metric emissions. Range [60(1 min), 86400(1 day)] and must be multiple of 60. */
  period: number;
  /** The search query string. */
  queryString: string;
  /** The fleet metric description. */
  description?: string;
  /** The name of the index to search. */
  indexName?: string;
  /** The query version. */
  queryVersion?: string;
  /** Metadata, which can be used to manage the fleet metric. */
  tags?: Tag[];
  /** Used to support unit transformation such as milliseconds to seconds. The unit must be supported by CW metric. Default to null. */
  unit?: 'Seconds' | 'Microseconds' | 'Milliseconds' | 'Bytes' | 'Kilobytes' | 'Megabytes' | 'Gigabytes' | 'Terabytes' | 'Bits' | 'Kilobits' | 'Megabits' | 'Gigabits' | 'Terabits' | 'Percent' | 'Count' | 'Bytes/Second' | 'Kilobytes/Second' | 'Megabytes/Second' | 'Gigabytes/Second' | 'Terabytes/Second' | 'Bits/Second' | 'Kilobits/Second' | 'Megabits/Second' | 'Gigabits/Second' | 'Terabits/Second' | 'Count/Second' | 'None';
}

export interface CreateJobInput {
  /** A job identifier which must be unique for your account. We recommend using a UUID. Alpha-numeric characters, "-" and "_" are valid for use here. */
  jobId: string;
  /** A list of things and thing groups to which the job should be sent. */
  targets: string[];
  /** Allows you to create the criteria to abort a job. */
  abortConfig?: AbortConfig;
  /** A short text description of the job. */
  description?: string;
  /** The package version Amazon Resource Names (ARNs) that are installed on the device when the job successfully completes. The package version must be in either the Published or Deprecated state when the  */
  destinationPackageVersions?: string[];
  /** The job document. Required if you don't specify a value for documentSource. */
  document?: string;
  /** Parameters of an Amazon Web Services managed template that you can specify to create the job document. documentParameters can only be used when creating jobs from Amazon Web Services managed templates */
  documentParameters?: Record<string, string>;
  /** An S3 link, or S3 object URL, to the job document. The link is an Amazon S3 object URL and is required if you don't specify a value for document. For example, --document-source https://s3.region-code. */
  documentSource?: string;
  /** Allows you to create the criteria to retry a job. */
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
  /** Allows you to create a staged rollout of the job. */
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  /** The ARN of the job template used to create the job. */
  jobTemplateArn?: string;
  /** The namespace used to indicate that a job is a customer-managed job. When you specify a value for this parameter, Amazon Web Services IoT Core sends jobs notifications to MQTT topics that contain the  */
  namespaceId?: string;
  /** Configuration information for pre-signed S3 URLs. */
  presignedUrlConfig?: PresignedUrlConfig;
  /** The configuration that allows you to schedule a job for a future date and time in addition to specifying the end behavior for each job execution. */
  schedulingConfig?: SchedulingConfig;
  /** Metadata which can be used to manage the job. */
  tags?: Tag[];
  /** Specifies whether the job will continue to run (CONTINUOUS), or will be complete after all those things specified as targets have completed the job (SNAPSHOT). If continuous, the job may also be run o */
  targetSelection?: 'CONTINUOUS' | 'SNAPSHOT';
  /** Specifies the amount of time each device has to finish its execution of the job. The timer is started when the job execution status is set to IN_PROGRESS. If the job execution status is not set to ano */
  timeoutConfig?: TimeoutConfig;
}

export interface CreateJobTemplateInput {
  /** A description of the job document. */
  description: string;
  /** A unique identifier for the job template. We recommend using a UUID. Alpha-numeric characters, "-", and "_" are valid for use here. */
  jobTemplateId: string;
  abortConfig?: AbortConfig;
  /** The package version Amazon Resource Names (ARNs) that are installed on the device when the job successfully completes. The package version must be in either the Published or Deprecated state when the  */
  destinationPackageVersions?: string[];
  /** The job document. Required if you don't specify a value for documentSource. */
  document?: string;
  /** An S3 link, or S3 object URL, to the job document. The link is an Amazon S3 object URL and is required if you don't specify a value for document. For example, --document-source https://s3.region-code. */
  documentSource?: string;
  /** The ARN of the job to use as the basis for the job template. */
  jobArn?: string;
  /** Allows you to create the criteria to retry a job. */
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  /** Allows you to configure an optional maintenance window for the rollout of a job document to all devices in the target group for a job. */
  maintenanceWindows?: MaintenanceWindow[];
  presignedUrlConfig?: PresignedUrlConfig;
  /** Metadata that can be used to manage the job template. */
  tags?: Tag[];
  timeoutConfig?: TimeoutConfig;
}

/** The input for the CreateKeysAndCertificate operation. Requires permission to access the CreateKeysAndCertificateRequest action. */
export interface CreateKeysAndCertificateInput {
  /** Specifies whether the certificate is active. */
  setAsActive?: boolean;
}

export interface CreateMitigationActionInput {
  /** A friendly name for the action. Choose a friendly name that accurately describes the action (for example, EnableLoggingAction). */
  actionName: string;
  /** Defines the type of action and the parameters for that action. */
  actionParams: MitigationActionParams;
  /** The ARN of the IAM role that is used to apply the mitigation action. */
  roleArn: string;
  /** Metadata that can be used to manage the mitigation action. */
  tags?: Tag[];
}

export interface CreateOTAUpdateInput {
  /** The files to be streamed by the OTA update. */
  files: OTAUpdateFile[];
  /** The ID of the OTA update to be created. */
  otaUpdateId: string;
  /** The IAM role that grants Amazon Web Services IoT Core access to the Amazon S3, IoT jobs and Amazon Web Services Code Signing resources to create an OTA update job. */
  roleArn: string;
  /** The devices targeted to receive OTA updates. */
  targets: string[];
  /** A list of additional OTA update parameters, which are name-value pairs. They won't be sent to devices as a part of the Job document. */
  additionalParameters?: Record<string, string>;
  /** The criteria that determine when and how a job abort takes place. */
  awsJobAbortConfig?: AwsJobAbortConfig;
  /** Configuration for the rollout of OTA updates. */
  awsJobExecutionsRolloutConfig?: AwsJobExecutionsRolloutConfig;
  /** Configuration information for pre-signed URLs. */
  awsJobPresignedUrlConfig?: AwsJobPresignedUrlConfig;
  /** Specifies the amount of time each device has to finish its execution of the job. A timer is started when the job execution status is set to IN_PROGRESS. If the job execution status is not set to anoth */
  awsJobTimeoutConfig?: AwsJobTimeoutConfig;
  /** The description of the OTA update. */
  description?: string;
  /** The protocol used to transfer the OTA update image. Valid values are [HTTP], [MQTT], [HTTP, MQTT]. When both HTTP and MQTT are specified, the target device can choose the protocol. */
  protocols?: 'MQTT' | 'HTTP'[];
  /** Metadata which can be used to manage updates. */
  tags?: Tag[];
  /** Specifies whether the update will continue to run (CONTINUOUS), or will be complete after all the things specified as targets have completed the update (SNAPSHOT). If continuous, the update may also b */
  targetSelection?: 'CONTINUOUS' | 'SNAPSHOT';
}

export interface CreatePackageInput {
  /** The name of the new software package. */
  packageName: string;
  /** A unique case-sensitive identifier that you can provide to ensure the idempotency of the request. Don't reuse this client token if a new idempotent request is required. */
  clientToken?: string;
  /** A summary of the package being created. This can be used to outline the package's contents or purpose. */
  description?: string;
  /** Metadata that can be used to manage the package. */
  tags?: Record<string, string>;
}

export interface CreatePackageVersionInput {
  /** The name of the associated software package. */
  packageName: string;
  /** The name of the new package version. */
  versionName: string;
  /** The various build components created during the build process such as libraries and configuration files that make up a software package version. */
  artifact?: PackageVersionArtifact;
  /** Metadata that can be used to define a package version’s configuration. For example, the S3 file location, configuration options that are being sent to the device or fleet. The combined size of all the */
  attributes?: Record<string, string>;
  /** A unique case-sensitive identifier that you can provide to ensure the idempotency of the request. Don't reuse this client token if a new idempotent request is required. */
  clientToken?: string;
  /** A summary of the package version being created. This can be used to outline the package's contents or purpose. */
  description?: string;
  /** The inline job document associated with a software package version used for a quick job deployment. */
  recipe?: string;
  /** Metadata that can be used to manage the package version. */
  tags?: Record<string, string>;
}

/** The input for the CreatePolicy operation. */
export interface CreatePolicyInput {
  /** The JSON document that describes the policy. policyDocument must have a minimum length of 1, with a maximum length of 2048, excluding whitespace. */
  policyDocument: string;
  /** The policy name. */
  policyName: string;
  /** Metadata which can be used to manage the policy. For URI Request parameters use format: ...key1=value1&key2=value2... For the CLI command-line parameter use format: &&tags "key1=value1&key2=value2..." */
  tags?: Tag[];
}

/** The input for the CreatePolicyVersion operation. */
export interface CreatePolicyVersionInput {
  /** The JSON document that describes the policy. Minimum length of 1. Maximum length of 2048, excluding whitespace. */
  policyDocument: string;
  /** The policy name. */
  policyName: string;
  /** Specifies whether the policy version is set as the default. When this parameter is true, the new policy version becomes the operative version (that is, the version that is in effect for the certificat */
  setAsDefault?: boolean;
}

export interface CreateProvisioningClaimInput {
  /** The name of the provisioning template to use. */
  templateName: string;
}

export interface CreateProvisioningTemplateInput {
  /** The role ARN for the role associated with the provisioning template. This IoT role grants permission to provision a device. */
  provisioningRoleArn: string;
  /** The JSON formatted contents of the provisioning template. */
  templateBody: string;
  /** The name of the provisioning template. */
  templateName: string;
  /** The description of the provisioning template. */
  description?: string;
  /** True to enable the provisioning template, otherwise false. */
  enabled?: boolean;
  /** Creates a pre-provisioning hook template. Only supports template of type FLEET_PROVISIONING. For more information about provisioning template types, see type. */
  preProvisioningHook?: ProvisioningHook;
  /** Metadata which can be used to manage the provisioning template. For URI Request parameters use format: ...key1=value1&key2=value2... For the CLI command-line parameter use format: &&tags "key1=value1& */
  tags?: Tag[];
  /** The type you define in a provisioning template. You can create a template with only one type. You can't change the template type after its creation. The default value is FLEET_PROVISIONING. For more i */
  type?: 'FLEET_PROVISIONING' | 'JITP';
}

export interface CreateProvisioningTemplateVersionInput {
  /** The JSON formatted contents of the provisioning template. */
  templateBody: string;
  /** The name of the provisioning template. */
  templateName: string;
  /** Sets a fleet provision template version as the default version. */
  setAsDefault?: boolean;
}

export interface CreateRoleAliasInput {
  /** The role alias that points to a role ARN. This allows you to change the role without having to update the device. */
  roleAlias: string;
  /** The role ARN. */
  roleArn: string;
  /** How long (in seconds) the credentials will be valid. The default value is 3,600 seconds. This value must be less than or equal to the maximum session duration of the IAM role that the role alias refer */
  credentialDurationSeconds?: number;
  /** Metadata which can be used to manage the role alias. For URI Request parameters use format: ...key1=value1&key2=value2... For the CLI command-line parameter use format: &&tags "key1=value1&key2=value2 */
  tags?: Tag[];
}

export interface CreateScheduledAuditInput {
  /** How often the scheduled audit takes place, either DAILY, WEEKLY, BIWEEKLY or MONTHLY. The start time of each audit is determined by the system. */
  frequency: 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  /** The name you want to give to the scheduled audit. (Max. 128 chars) */
  scheduledAuditName: string;
  /** Which checks are performed during the scheduled audit. Checks must be enabled for your account. (Use DescribeAccountAuditConfiguration to see the list of all checks, including those that are enabled o */
  targetCheckNames: string[];
  /** The day of the month on which the scheduled audit takes place. This can be "1" through "31" or "LAST". This field is required if the "frequency" parameter is set to MONTHLY. If days 29 to 31 are speci */
  dayOfMonth?: string;
  /** The day of the week on which the scheduled audit takes place, either SUN, MON, TUE, WED, THU, FRI, or SAT. This field is required if the frequency parameter is set to WEEKLY or BIWEEKLY. */
  dayOfWeek?: 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';
  /** Metadata that can be used to manage the scheduled audit. */
  tags?: Tag[];
}

export interface CreateSecurityProfileInput {
  /** The name you are giving to the security profile. */
  securityProfileName: string;
  /** Please use CreateSecurityProfileRequest$additionalMetricsToRetainV2 instead. A list of metrics whose data is retained (stored). By default, data is retained for any metric used in the profile's behavi */
  additionalMetricsToRetain?: string[];
  /** A list of metrics whose data is retained (stored). By default, data is retained for any metric used in the profile's behaviors, but it is also retained for any metric specified here. Can be used with  */
  additionalMetricsToRetainV2?: MetricToRetain[];
  /** Specifies the destinations to which alerts are sent. (Alerts are always sent to the console.) Alerts are generated when a device (thing) violates a behavior. */
  alertTargets?: Record<string, AlertTarget>;
  /** Specifies the behaviors that, when violated by a device (thing), cause an alert. */
  behaviors?: Behavior[];
  /** Specifies the MQTT topic and role ARN required for metric export. */
  metricsExportConfig?: MetricsExportConfig;
  /** A description of the security profile. */
  securityProfileDescription?: string;
  /** Metadata that can be used to manage the security profile. */
  tags?: Tag[];
}

export interface CreateStreamInput {
  /** The files to stream. */
  files: StreamFile[];
  /** An IAM role that allows the IoT service principal to access your S3 files. */
  roleArn: string;
  /** The stream ID. */
  streamId: string;
  /** A description of the stream. */
  description?: string;
  /** Metadata which can be used to manage streams. */
  tags?: Tag[];
}

/** The input for the CreateThing operation. */
export interface CreateThingInput {
  /** The name of the thing to create. You can't change a thing's name after you create it. To change a thing's name, you must create a new thing, give it the new name, and then delete the old thing. */
  thingName: string;
  /** The attribute payload, which consists of up to three name/value pairs in a JSON document. For example: {\"attributes\":{\"string1\":\"string2\"}} */
  attributePayload?: AttributePayload;
  /** The name of the billing group the thing will be added to. */
  billingGroupName?: string;
  /** The name of the thing type associated with the new thing. */
  thingTypeName?: string;
}

export interface CreateThingGroupInput {
  /** The thing group name to create. */
  thingGroupName: string;
  /** The name of the parent thing group. */
  parentGroupName?: string;
  /** Metadata which can be used to manage the thing group. */
  tags?: Tag[];
  /** The thing group properties. */
  thingGroupProperties?: ThingGroupProperties;
}

/** The input for the CreateThingType operation. */
export interface CreateThingTypeInput {
  /** The name of the thing type. */
  thingTypeName: string;
  /** Metadata which can be used to manage the thing type. */
  tags?: Tag[];
  /** The ThingTypeProperties for the thing type to create. It contains information about the new thing type including a description, and a list of searchable thing attribute names. */
  thingTypeProperties?: ThingTypeProperties;
}

/** The input for the CreateTopicRule operation. */
export interface CreateTopicRuleInput {
  /** The name of the rule. */
  ruleName: string;
  /** The rule payload. */
  topicRulePayload: TopicRulePayload;
  /** Metadata which can be used to manage the topic rule. For URI Request parameters use format: ...key1=value1&key2=value2... For the CLI command-line parameter use format: --tags "key1=value1&key2=value2 */
  tags?: string;
}

export interface CreateTopicRuleDestinationInput {
  /** The topic rule destination configuration. */
  destinationConfiguration: TopicRuleDestinationConfiguration;
}

export interface DeleteAccountAuditConfigurationInput {
  /** If true, all scheduled audits are deleted. */
  deleteScheduledAudits?: boolean;
}

export interface DeleteAuditSuppressionInput {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
}

export interface DeleteAuthorizerInput {
  /** The name of the authorizer to delete. */
  authorizerName: string;
}

export interface DeleteBillingGroupInput {
  /** The name of the billing group. */
  billingGroupName: string;
  /** The expected version of the billing group. If the version of the billing group does not match the expected version specified in the request, the DeleteBillingGroup request is rejected with a VersionCo */
  expectedVersion?: number;
}

/** Input for the DeleteCACertificate operation. */
export interface DeleteCACertificateInput {
  /** The ID of the certificate to delete. (The last part of the certificate ARN contains the certificate ID.) */
  certificateId: string;
}

/** The input for the DeleteCertificate operation. */
export interface DeleteCertificateInput {
  /** The ID of the certificate. (The last part of the certificate ARN contains the certificate ID.) */
  certificateId: string;
  /** Forces the deletion of a certificate if it is inactive and is not attached to an IoT thing. */
  forceDelete?: boolean;
}

export interface DeleteCertificateProviderInput {
  /** The name of the certificate provider. */
  certificateProviderName: string;
}

export interface DeleteCommandInput {
  /** The unique identifier of the command to be deleted. */
  commandId: string;
}

export interface DeleteCommandExecutionInput {
  /** The unique identifier of the command execution that you want to delete from your account. */
  executionId: string;
  /** The Amazon Resource Number (ARN) of the target device for which you want to delete command executions. */
  targetArn: string;
}

export interface DeleteCustomMetricInput {
  /** The name of the custom metric. */
  metricName: string;
}

export interface DeleteDimensionInput {
  /** The unique identifier for the dimension that you want to delete. */
  name: string;
}

export interface DeleteDomainConfigurationInput {
  /** The name of the domain configuration to be deleted. */
  domainConfigurationName: string;
}

export interface DeleteDynamicThingGroupInput {
  /** The name of the dynamic thing group to delete. */
  thingGroupName: string;
  /** The expected version of the dynamic thing group to delete. */
  expectedVersion?: number;
}

export interface DeleteFleetMetricInput {
  /** The name of the fleet metric to delete. */
  metricName: string;
  /** The expected version of the fleet metric to delete. */
  expectedVersion?: number;
}

export interface DeleteJobInput {
  /** The ID of the job to be deleted. After a job deletion is completed, you may reuse this jobId when you create a new job. However, this is not recommended, and you must ensure that your devices are not  */
  jobId: string;
  /** (Optional) When true, you can delete a job which is "IN_PROGRESS". Otherwise, you can only delete a job which is in a terminal state ("COMPLETED" or "CANCELED") or an exception will occur. The default */
  force?: boolean;
  /** The namespace used to indicate that a job is a customer-managed job. When you specify a value for this parameter, Amazon Web Services IoT Core sends jobs notifications to MQTT topics that contain the  */
  namespaceId?: string;
}

export interface DeleteJobExecutionInput {
  /** The ID of the job execution to be deleted. The executionNumber refers to the execution of a particular job on a particular device. Note that once a job execution is deleted, the executionNumber may be */
  executionNumber: number;
  /** The ID of the job whose execution on a particular device will be deleted. */
  jobId: string;
  /** The name of the thing whose job execution will be deleted. */
  thingName: string;
  /** (Optional) When true, you can delete a job execution which is "IN_PROGRESS". Otherwise, you can only delete a job execution which is in a terminal state ("SUCCEEDED", "FAILED", "REJECTED", "REMOVED" o */
  force?: boolean;
  /** The namespace used to indicate that a job is a customer-managed job. When you specify a value for this parameter, Amazon Web Services IoT Core sends jobs notifications to MQTT topics that contain the  */
  namespaceId?: string;
}

export interface DeleteJobTemplateInput {
  /** The unique identifier of the job template to delete. */
  jobTemplateId: string;
}

export interface DeleteMitigationActionInput {
  /** The name of the mitigation action that you want to delete. */
  actionName: string;
}

export interface DeleteOTAUpdateInput {
  /** The ID of the OTA update to delete. */
  otaUpdateId: string;
  /** When true, the stream created by the OTAUpdate process is deleted when the OTA update is deleted. Ignored if the stream specified in the OTAUpdate is supplied by the user. */
  deleteStream?: boolean;
  /** When true, deletes the IoT job created by the OTAUpdate process even if it is "IN_PROGRESS". Otherwise, if the job is not in a terminal state ("COMPLETED" or "CANCELED") an exception will occur. The d */
  forceDeleteAWSJob?: boolean;
}

export interface DeletePackageInput {
  /** The name of the target software package. */
  packageName: string;
  /** A unique case-sensitive identifier that you can provide to ensure the idempotency of the request. Don't reuse this client token if a new idempotent request is required. */
  clientToken?: string;
}

export interface DeletePackageVersionInput {
  /** The name of the associated software package. */
  packageName: string;
  /** The name of the target package version. */
  versionName: string;
  /** A unique case-sensitive identifier that you can provide to ensure the idempotency of the request. Don't reuse this client token if a new idempotent request is required. */
  clientToken?: string;
}

/** The input for the DeletePolicy operation. */
export interface DeletePolicyInput {
  /** The name of the policy to delete. */
  policyName: string;
}

/** The input for the DeletePolicyVersion operation. */
export interface DeletePolicyVersionInput {
  /** The name of the policy. */
  policyName: string;
  /** The policy version ID. */
  policyVersionId: string;
}

export interface DeleteProvisioningTemplateInput {
  /** The name of the fleet provision template to delete. */
  templateName: string;
}

export interface DeleteProvisioningTemplateVersionInput {
  /** The name of the provisioning template version to delete. */
  templateName: string;
  /** The provisioning template version ID to delete. */
  versionId: number;
}

export interface DeleteRoleAliasInput {
  /** The role alias to delete. */
  roleAlias: string;
}

export interface DeleteScheduledAuditInput {
  /** The name of the scheduled audit you want to delete. */
  scheduledAuditName: string;
}

export interface DeleteSecurityProfileInput {
  /** The name of the security profile to be deleted. */
  securityProfileName: string;
  /** The expected version of the security profile. A new version is generated whenever the security profile is updated. If you specify a value that is different from the actual version, a VersionConflictEx */
  expectedVersion?: number;
}

export interface DeleteStreamInput {
  /** The stream ID. */
  streamId: string;
}

/** The input for the DeleteThing operation. */
export interface DeleteThingInput {
  /** The name of the thing to delete. */
  thingName: string;
  /** The expected version of the thing record in the registry. If the version of the record in the registry does not match the expected version specified in the request, the DeleteThing request is rejected */
  expectedVersion?: number;
}

export interface DeleteThingGroupInput {
  /** The name of the thing group to delete. */
  thingGroupName: string;
  /** The expected version of the thing group to delete. */
  expectedVersion?: number;
}

/** The input for the DeleteThingType operation. */
export interface DeleteThingTypeInput {
  /** The name of the thing type. */
  thingTypeName: string;
}

/** The input for the DeleteTopicRule operation. */
export interface DeleteTopicRuleInput {
  /** The name of the rule. */
  ruleName: string;
}

export interface DeleteTopicRuleDestinationInput {
  /** The ARN of the topic rule destination to delete. */
  arn: string;
}

export interface DeleteV2LoggingLevelInput {
  /** The name of the resource for which you are configuring logging. */
  targetName: string;
  /** The type of resource for which you are configuring logging. Must be THING_Group. */
  targetType: 'DEFAULT' | 'THING_GROUP' | 'CLIENT_ID' | 'SOURCE_IP' | 'PRINCIPAL_ID';
}

/** The input for the DeprecateThingType operation. */
export interface DeprecateThingTypeInput {
  /** The name of the thing type to deprecate. */
  thingTypeName: string;
  /** Whether to undeprecate a deprecated thing type. If true, the thing type will not be deprecated anymore and you can associate it with things. */
  undoDeprecate?: boolean;
}

export interface DescribeAuditFindingInput {
  /** A unique identifier for a single audit finding. You can use this identifier to apply mitigation actions to the finding. */
  findingId: string;
}

export interface DescribeAuditMitigationActionsTaskInput {
  /** The unique identifier for the audit mitigation task. */
  taskId: string;
}

export interface DescribeAuditSuppressionInput {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
}

export interface DescribeAuditTaskInput {
  /** The ID of the audit whose information you want to get. */
  taskId: string;
}

export interface DescribeAuthorizerInput {
  /** The name of the authorizer to describe. */
  authorizerName: string;
}

export interface DescribeBillingGroupInput {
  /** The name of the billing group. */
  billingGroupName: string;
}

/** The input for the DescribeCACertificate operation. */
export interface DescribeCACertificateInput {
  /** The CA certificate identifier. */
  certificateId: string;
}

/** The input for the DescribeCertificate operation. */
export interface DescribeCertificateInput {
  /** The ID of the certificate. (The last part of the certificate ARN contains the certificate ID.) */
  certificateId: string;
}

export interface DescribeCertificateProviderInput {
  /** The name of the certificate provider. */
  certificateProviderName: string;
}

export interface DescribeCustomMetricInput {
  /** The name of the custom metric. */
  metricName: string;
}

export interface DescribeDetectMitigationActionsTaskInput {
  /** The unique identifier of the task. */
  taskId: string;
}

export interface DescribeDimensionInput {
  /** The unique identifier for the dimension. */
  name: string;
}

export interface DescribeDomainConfigurationInput {
  /** The name of the domain configuration. */
  domainConfigurationName: string;
}

/** The input for the DescribeEndpoint operation. */
export interface DescribeEndpointInput {
  /** The endpoint type. Valid endpoint types include: iot:Data - Returns a VeriSign signed data endpoint. iot:Data-ATS - Returns an ATS signed data endpoint. iot:CredentialProvider - Returns an IoT credent */
  endpointType?: string;
}

export interface DescribeFleetMetricInput {
  /** The name of the fleet metric to describe. */
  metricName: string;
}

export interface DescribeIndexInput {
  /** The index name. */
  indexName: string;
}

export interface DescribeJobInput {
  /** The unique identifier you assigned to this job when it was created. */
  jobId: string;
  /** Provides a view of the job document before and after the substitution parameters have been resolved with their exact values. */
  beforeSubstitution?: boolean;
}

export interface DescribeJobExecutionInput {
  /** The unique identifier you assigned to this job when it was created. */
  jobId: string;
  /** The name of the thing on which the job execution is running. */
  thingName: string;
  /** A string (consisting of the digits "0" through "9" which is used to specify a particular job execution on a particular device. */
  executionNumber?: number;
}

export interface DescribeJobTemplateInput {
  /** The unique identifier of the job template. */
  jobTemplateId: string;
}

export interface DescribeManagedJobTemplateInput {
  /** The unique name of a managed job template, which is required. */
  templateName: string;
  /** An optional parameter to specify version of a managed template. If not specified, the pre-defined default version is returned. */
  templateVersion?: string;
}

export interface DescribeMitigationActionInput {
  /** The friendly name that uniquely identifies the mitigation action. */
  actionName: string;
}

export interface DescribeProvisioningTemplateInput {
  /** The name of the provisioning template. */
  templateName: string;
}

export interface DescribeProvisioningTemplateVersionInput {
  /** The template name. */
  templateName: string;
  /** The provisioning template version ID. */
  versionId: number;
}

export interface DescribeRoleAliasInput {
  /** The role alias to describe. */
  roleAlias: string;
}

export interface DescribeScheduledAuditInput {
  /** The name of the scheduled audit whose information you want to get. */
  scheduledAuditName: string;
}

export interface DescribeSecurityProfileInput {
  /** The name of the security profile whose information you want to get. */
  securityProfileName: string;
}

export interface DescribeStreamInput {
  /** The stream ID. */
  streamId: string;
}

/** The input for the DescribeThing operation. */
export interface DescribeThingInput {
  /** The name of the thing. */
  thingName: string;
}

export interface DescribeThingGroupInput {
  /** The name of the thing group. */
  thingGroupName: string;
}

export interface DescribeThingRegistrationTaskInput {
  /** The task ID. */
  taskId: string;
}

/** The input for the DescribeThingType operation. */
export interface DescribeThingTypeInput {
  /** The name of the thing type. */
  thingTypeName: string;
}

export interface DetachPolicyInput {
  /** The policy to detach. */
  policyName: string;
  /** The target from which the policy will be detached. */
  target: string;
}

/** The input for the DetachPrincipalPolicy operation. */
export interface DetachPrincipalPolicyInput {
  /** The name of the policy to detach. */
  policyName: string;
  /** The principal. Valid principals are CertificateArn (arn:aws:iot:region:accountId:cert/certificateId), thingGroupArn (arn:aws:iot:region:accountId:thinggroup/groupName) and CognitoId (region:id). */
  principal: string;
}

export interface DetachSecurityProfileInput {
  /** The security profile that is detached. */
  securityProfileName: string;
  /** The ARN of the thing group from which the security profile is detached. */
  securityProfileTargetArn: string;
}

/** The input for the DetachThingPrincipal operation. */
export interface DetachThingPrincipalInput {
  /** If the principal is a certificate, this value must be ARN of the certificate. If the principal is an Amazon Cognito identity, this value must be the ID of the Amazon Cognito identity. */
  principal: string;
  /** The name of the thing. */
  thingName: string;
}

/** The input for the DisableTopicRuleRequest operation. */
export interface DisableTopicRuleInput {
  /** The name of the rule to disable. */
  ruleName: string;
}

export interface DisassociateSbomFromPackageVersionInput {
  /** The name of the new software package. */
  packageName: string;
  /** The name of the new package version. */
  versionName: string;
  /** A unique case-sensitive identifier that you can provide to ensure the idempotency of the request. Don't reuse this client token if a new idempotent request is required. */
  clientToken?: string;
}

/** The input for the EnableTopicRuleRequest operation. */
export interface EnableTopicRuleInput {
  /** The name of the topic rule to enable. */
  ruleName: string;
}

export interface GetBehaviorModelTrainingSummariesInput {
  /** The maximum number of results to return at one time. The default is 10. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
  /** The name of the security profile. */
  securityProfileName?: string;
}

export interface GetBucketsAggregationInput {
  /** The aggregation field. */
  aggregationField: string;
  /** The basic control of the response shape and the bucket aggregation type to perform. */
  bucketsAggregationType: BucketsAggregationType;
  /** The search query string. */
  queryString: string;
  /** The name of the index to search. */
  indexName?: string;
  /** The version of the query. */
  queryVersion?: string;
}

export interface GetCardinalityInput {
  /** The search query string. */
  queryString: string;
  /** The field to aggregate. */
  aggregationField?: string;
  /** The name of the index to search. */
  indexName?: string;
  /** The query version. */
  queryVersion?: string;
}

export interface GetCommandInput {
  /** The unique identifier of the command for which you want to retrieve information. */
  commandId: string;
}

export interface GetCommandExecutionInput {
  /** The unique identifier for the command execution. This information is returned as a response of the StartCommandExecution API request. */
  executionId: string;
  /** The Amazon Resource Number (ARN) of the device on which the command execution is being performed. */
  targetArn: string;
  /** Can be used to specify whether to include the result of the command execution in the GetCommandExecution API response. Your device can use this field to provide additional information about the comman */
  includeResult?: boolean;
}

export interface GetEffectivePoliciesInput {
  /** The Cognito identity pool ID. */
  cognitoIdentityPoolId?: string;
  /** The principal. Valid principals are CertificateArn (arn:aws:iot:region:accountId:cert/certificateId), thingGroupArn (arn:aws:iot:region:accountId:thinggroup/groupName) and CognitoId (region:id). */
  principal?: string;
  /** The thing name. */
  thingName?: string;
}

export interface GetJobDocumentInput {
  /** The unique identifier you assigned to this job when it was created. */
  jobId: string;
  /** Provides a view of the job document before and after the substitution parameters have been resolved with their exact values. */
  beforeSubstitution?: boolean;
}

export interface GetOTAUpdateInput {
  /** The OTA update ID. */
  otaUpdateId: string;
}

export interface GetPackageInput {
  /** The name of the target software package. */
  packageName: string;
}

export interface GetPackageVersionInput {
  /** The name of the associated package. */
  packageName: string;
  /** The name of the target package version. */
  versionName: string;
}

export interface GetPercentilesInput {
  /** The search query string. */
  queryString: string;
  /** The field to aggregate. */
  aggregationField?: string;
  /** The name of the index to search. */
  indexName?: string;
  /** The percentile groups returned. */
  percents?: number[];
  /** The query version. */
  queryVersion?: string;
}

/** The input for the GetPolicy operation. */
export interface GetPolicyInput {
  /** The name of the policy. */
  policyName: string;
}

/** The input for the GetPolicyVersion operation. */
export interface GetPolicyVersionInput {
  /** The name of the policy. */
  policyName: string;
  /** The policy version ID. */
  policyVersionId: string;
}

export interface GetStatisticsInput {
  /** The query used to search. You can specify "*" for the query string to get the count of all indexed things in your Amazon Web Services account. */
  queryString: string;
  /** The aggregation field name. */
  aggregationField?: string;
  /** The name of the index to search. The default value is AWS_Things. */
  indexName?: string;
  /** The version of the query used to search. */
  queryVersion?: string;
}

export interface GetThingConnectivityDataInput {
  /** The name of your IoT thing. */
  thingName: string;
}

/** The input for the GetTopicRule operation. */
export interface GetTopicRuleInput {
  /** The name of the rule. */
  ruleName: string;
}

export interface GetTopicRuleDestinationInput {
  /** The ARN of the topic rule destination. */
  arn: string;
}

export interface GetV2LoggingOptionsInput {
  /** The flag is used to get all the event types and their respective configuration that event-based logging supports. */
  verbose?: boolean;
}

export interface ListActiveViolationsInput {
  /** The criteria for a behavior. */
  behaviorCriteriaType?: 'STATIC' | 'STATISTICAL' | 'MACHINE_LEARNING';
  /** A list of all suppressed alerts. */
  listSuppressedAlerts?: boolean;
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
  /** The name of the Device Defender security profile for which violations are listed. */
  securityProfileName?: string;
  /** The name of the thing whose active violations are listed. */
  thingName?: string;
  /** The verification state of the violation (detect alarm). */
  verificationState?: 'FALSE_POSITIVE' | 'BENIGN_POSITIVE' | 'TRUE_POSITIVE' | 'UNKNOWN';
}

export interface ListAttachedPoliciesInput {
  /** The group or principal for which the policies will be listed. Valid principals are CertificateArn (arn:aws:iot:region:accountId:cert/certificateId), thingGroupArn (arn:aws:iot:region:accountId:thinggr */
  target: string;
  /** The token to retrieve the next set of results. */
  marker?: string;
  /** The maximum number of results to be returned per request. */
  pageSize?: number;
  /** When true, recursively list attached policies. */
  recursive?: boolean;
}

export interface ListAuditFindingsInput {
  /** A filter to limit results to the findings for the specified audit check. */
  checkName?: string;
  /** A filter to limit results to those found before the specified time. You must specify either the startTime and endTime or the taskId, but not both. */
  endTime?: string;
  /** Boolean flag indicating whether only the suppressed findings or the unsuppressed findings should be listed. If this parameter isn't provided, the response will list both suppressed and unsuppressed fi */
  listSuppressedFindings?: boolean;
  /** The maximum number of results to return at one time. The default is 25. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
  /** Information identifying the noncompliant resource. */
  resourceIdentifier?: ResourceIdentifier;
  /** A filter to limit results to those found after the specified time. You must specify either the startTime and endTime or the taskId, but not both. */
  startTime?: string;
  /** A filter to limit results to the audit with the specified ID. You must specify either the taskId or the startTime and endTime, but not both. */
  taskId?: string;
}

export interface ListAuditMitigationActionsExecutionsInput {
  /** Specify this filter to limit results to those that were applied to a specific audit finding. */
  findingId: string;
  /** Specify this filter to limit results to actions for a specific audit mitigation actions task. */
  taskId: string;
  /** Specify this filter to limit results to those with a specific status. */
  actionStatus?: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELED' | 'SKIPPED' | 'PENDING';
  /** The maximum number of results to return at one time. The default is 25. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
}

export interface ListAuditMitigationActionsTasksInput {
  /** Specify this filter to limit results to tasks that were completed or canceled on or before a specific date and time. */
  endTime: string;
  /** Specify this filter to limit results to tasks that began on or after a specific date and time. */
  startTime: string;
  /** Specify this filter to limit results to tasks that were applied to results for a specific audit. */
  auditTaskId?: string;
  /** Specify this filter to limit results to tasks that were applied to a specific audit finding. */
  findingId?: string;
  /** The maximum number of results to return at one time. The default is 25. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
  /** Specify this filter to limit results to tasks that are in a specific state. */
  taskStatus?: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELED';
}

export interface ListAuditSuppressionsInput {
  /** Determines whether suppressions are listed in ascending order by expiration date or not. If parameter isn't provided, ascendingOrder=true. */
  ascendingOrder?: boolean;
  checkName?: string;
  /** The maximum number of results to return at one time. The default is 25. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
  resourceIdentifier?: ResourceIdentifier;
}

export interface ListAuditTasksInput {
  /** The end of the time period. */
  endTime: string;
  /** The beginning of the time period. Audit information is retained for a limited time (90 days). Requesting a start time prior to what is retained results in an "InvalidRequestException". */
  startTime: string;
  /** The maximum number of results to return at one time. The default is 25. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
  /** A filter to limit the output to audits with the specified completion status: can be one of "IN_PROGRESS", "COMPLETED", "FAILED", or "CANCELED". */
  taskStatus?: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELED';
  /** A filter to limit the output to the specified type of audit: can be one of "ON_DEMAND_AUDIT_TASK" or "SCHEDULED__AUDIT_TASK". */
  taskType?: 'ON_DEMAND_AUDIT_TASK' | 'SCHEDULED_AUDIT_TASK';
}

export interface ListAuthorizersInput {
  /** Return the list of authorizers in ascending alphabetical order. */
  ascendingOrder?: boolean;
  /** A marker used to get the next set of results. */
  marker?: string;
  /** The maximum number of results to return at one time. */
  pageSize?: number;
  /** The status of the list authorizers request. */
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface ListBillingGroupsInput {
  /** The maximum number of results to return per request. */
  maxResults?: number;
  /** Limit the results to billing groups whose names have the given prefix. */
  namePrefixFilter?: string;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
}

/** Input for the ListCACertificates operation. */
export interface ListCACertificatesInput {
  /** Determines the order of the results. */
  ascendingOrder?: boolean;
  /** The marker for the next set of results. */
  marker?: string;
  /** The result page size. */
  pageSize?: number;
  /** The name of the provisioning template. */
  templateName?: string;
}

export interface ListCertificateProvidersInput {
  /** Returns the list of certificate providers in ascending alphabetical order. */
  ascendingOrder?: boolean;
  /** The token for the next set of results, or null if there are no more results. */
  nextToken?: string;
}

/** The input for the ListCertificates operation. */
export interface ListCertificatesInput {
  /** Specifies the order for results. If True, the results are returned in ascending order, based on the creation date. */
  ascendingOrder?: boolean;
  /** The marker for the next set of results. */
  marker?: string;
  /** The result page size. */
  pageSize?: number;
}

/** The input to the ListCertificatesByCA operation. */
export interface ListCertificatesByCAInput {
  /** The ID of the CA certificate. This operation will list all registered device certificate that were signed by this CA certificate. */
  caCertificateId: string;
  /** Specifies the order for results. If True, the results are returned in ascending order, based on the creation date. */
  ascendingOrder?: boolean;
  /** The marker for the next set of results. */
  marker?: string;
  /** The result page size. */
  pageSize?: number;
}

export interface ListCommandExecutionsInput {
  /** The Amazon Resource Number (ARN) of the command. You can use this information to list all command executions for a particular command. */
  commandArn?: string;
  /** List all command executions that completed any time before or after the date and time that you specify. The date and time uses the format yyyy-MM-dd'T'HH:mm. */
  completedTimeFilter?: TimeFilter;
  /** The maximum number of results to return in this operation. */
  maxResults?: number;
  /** The namespace of the command. */
  namespace?: 'AWS-IoT' | 'AWS-IoT-FleetWise';
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
  /** Specify whether to list the command executions that were created in the ascending or descending order. By default, the API returns all commands in the descending order based on the start time or compl */
  sortOrder?: 'ASCENDING' | 'DESCENDING';
  /** List all command executions that started any time before or after the date and time that you specify. The date and time uses the format yyyy-MM-dd'T'HH:mm. */
  startedTimeFilter?: TimeFilter;
  /** List all command executions for the device that have a particular status. For example, you can filter the list to display only command executions that have failed or timed out. */
  status?: 'CREATED' | 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'REJECTED' | 'TIMED_OUT';
  /** The Amazon Resource Number (ARN) of the target device. You can use this information to list all command executions for a particular device. */
  targetArn?: string;
}

export interface ListCommandsInput {
  /** A filter that can be used to display the list of commands that have a specific command parameter name. */
  commandParameterName?: string;
  /** The maximum number of results to return in this operation. By default, the API returns up to a maximum of 25 results. You can override this default value to return up to a maximum of 100 results for t */
  maxResults?: number;
  /** The namespace of the command. By default, the API returns all commands that have been created for both AWS-IoT and AWS-IoT-FleetWise namespaces. You can override this default value if you want to retu */
  namespace?: 'AWS-IoT' | 'AWS-IoT-FleetWise';
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
  /** Specify whether to list the commands that you have created in the ascending or descending order. By default, the API returns all commands in the descending order based on the time that they were creat */
  sortOrder?: 'ASCENDING' | 'DESCENDING';
}

export interface ListCustomMetricsInput {
  /** The maximum number of results to return at one time. The default is 25. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
}

export interface ListDetectMitigationActionsExecutionsInput {
  /** The end of the time period for which ML Detect mitigation actions executions are returned. */
  endTime?: string;
  /** The maximum number of results to return at one time. The default is 25. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
  /** A filter to limit results to those found after the specified time. You must specify either the startTime and endTime or the taskId, but not both. */
  startTime?: string;
  /** The unique identifier of the task. */
  taskId?: string;
  /** The name of the thing whose mitigation actions are listed. */
  thingName?: string;
  /** The unique identifier of the violation. */
  violationId?: string;
}

export interface ListDetectMitigationActionsTasksInput {
  /** The end of the time period for which ML Detect mitigation actions tasks are returned. */
  endTime: string;
  /** A filter to limit results to those found after the specified time. You must specify either the startTime and endTime or the taskId, but not both. */
  startTime: string;
  /** The maximum number of results to return at one time. The default is 25. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
}

export interface ListDimensionsInput {
  /** The maximum number of results to retrieve at one time. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
}

export interface ListDomainConfigurationsInput {
  /** The marker for the next set of results. */
  marker?: string;
  /** The result page size. */
  pageSize?: number;
  /** The type of service delivered by the endpoint. */
  serviceType?: 'DATA' | 'CREDENTIAL_PROVIDER' | 'JOBS';
}

export interface ListFleetMetricsInput {
  /** The maximum number of results to return in this operation. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
}

export interface ListIndicesInput {
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** The token used to get the next set of results, or null if there are no additional results. */
  nextToken?: string;
}

export interface ListJobExecutionsForJobInput {
  /** The unique identifier you assigned to this job when it was created. */
  jobId: string;
  /** The maximum number of results to be returned per request. */
  maxResults?: number;
  /** The token to retrieve the next set of results. */
  nextToken?: string;
  /** The status of the job. */
  status?: 'QUEUED' | 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'TIMED_OUT' | 'REJECTED' | 'REMOVED' | 'CANCELED';
}

export interface ListJobExecutionsForThingInput {
  /** The thing name. */
  thingName: string;
  /** The unique identifier you assigned to this job when it was created. */
  jobId?: string;
  /** The maximum number of results to be returned per request. */
  maxResults?: number;
  /** The namespace used to indicate that a job is a customer-managed job. When you specify a value for this parameter, Amazon Web Services IoT Core sends jobs notifications to MQTT topics that contain the  */
  namespaceId?: string;
  /** The token to retrieve the next set of results. */
  nextToken?: string;
  /** An optional filter that lets you search for jobs that have the specified status. */
  status?: 'QUEUED' | 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'TIMED_OUT' | 'REJECTED' | 'REMOVED' | 'CANCELED';
}

export interface ListJobsInput {
  /** The maximum number of results to return per request. */
  maxResults?: number;
  /** The namespace used to indicate that a job is a customer-managed job. When you specify a value for this parameter, Amazon Web Services IoT Core sends jobs notifications to MQTT topics that contain the  */
  namespaceId?: string;
  /** The token to retrieve the next set of results. */
  nextToken?: string;
  /** An optional filter that lets you search for jobs that have the specified status. */
  status?: 'IN_PROGRESS' | 'CANCELED' | 'COMPLETED' | 'DELETION_IN_PROGRESS' | 'SCHEDULED';
  /** Specifies whether the job will continue to run (CONTINUOUS), or will be complete after all those things specified as targets have completed the job (SNAPSHOT). If continuous, the job may also be run o */
  targetSelection?: 'CONTINUOUS' | 'SNAPSHOT';
  /** A filter that limits the returned jobs to those for the specified group. */
  thingGroupId?: string;
  /** A filter that limits the returned jobs to those for the specified group. */
  thingGroupName?: string;
}

export interface ListJobTemplatesInput {
  /** The maximum number of results to return in the list. */
  maxResults?: number;
  /** The token to use to return the next set of results in the list. */
  nextToken?: string;
}

export interface ListManagedJobTemplatesInput {
  /** Maximum number of entries that can be returned. */
  maxResults?: number;
  /** The token to retrieve the next set of results. */
  nextToken?: string;
  /** An optional parameter for template name. If specified, only the versions of the managed job templates that have the specified template name will be returned. */
  templateName?: string;
}

export interface ListMetricValuesInput {
  /** The end of the time period for which metric values are returned. */
  endTime: string;
  /** The name of the security profile metric for which values are returned. */
  metricName: string;
  /** The start of the time period for which metric values are returned. */
  startTime: string;
  /** The name of the thing for which security profile metric values are returned. */
  thingName: string;
  /** The dimension name. */
  dimensionName?: string;
  /** The dimension value operator. */
  dimensionValueOperator?: 'IN' | 'NOT_IN';
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
}

export interface ListMitigationActionsInput {
  /** Specify a value to limit the result to mitigation actions with a specific action type. */
  actionType?: 'UPDATE_DEVICE_CERTIFICATE' | 'UPDATE_CA_CERTIFICATE' | 'ADD_THINGS_TO_THING_GROUP' | 'REPLACE_DEFAULT_POLICY_VERSION' | 'ENABLE_IOT_LOGGING' | 'PUBLISH_FINDING_TO_SNS';
  /** The maximum number of results to return at one time. The default is 25. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
}

export interface ListOTAUpdatesInput {
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** A token used to retrieve the next set of results. */
  nextToken?: string;
  /** The OTA update job status. */
  otaUpdateStatus?: 'CREATE_PENDING' | 'CREATE_IN_PROGRESS' | 'CREATE_COMPLETE' | 'CREATE_FAILED' | 'DELETE_IN_PROGRESS' | 'DELETE_FAILED';
}

/** The input to the ListOutgoingCertificates operation. */
export interface ListOutgoingCertificatesInput {
  /** Specifies the order for results. If True, the results are returned in ascending order, based on the creation date. */
  ascendingOrder?: boolean;
  /** The marker for the next set of results. */
  marker?: string;
  /** The result page size. */
  pageSize?: number;
}

export interface ListPackagesInput {
  /** The maximum number of results returned at one time. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
}

export interface ListPackageVersionsInput {
  /** The name of the target software package. */
  packageName: string;
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
  /** The status of the package version. For more information, see Package version lifecycle. */
  status?: 'DRAFT' | 'PUBLISHED' | 'DEPRECATED';
}

/** The input for the ListPolicies operation. */
export interface ListPoliciesInput {
  /** Specifies the order for results. If true, the results are returned in ascending creation order. */
  ascendingOrder?: boolean;
  /** The marker for the next set of results. */
  marker?: string;
  /** The result page size. */
  pageSize?: number;
}

/** The input for the ListPolicyPrincipals operation. */
export interface ListPolicyPrincipalsInput {
  /** The policy name. */
  policyName: string;
  /** Specifies the order for results. If true, the results are returned in ascending creation order. */
  ascendingOrder?: boolean;
  /** The marker for the next set of results. */
  marker?: string;
  /** The result page size. */
  pageSize?: number;
}

/** The input for the ListPolicyVersions operation. */
export interface ListPolicyVersionsInput {
  /** The policy name. */
  policyName: string;
}

/** The input for the ListPrincipalPolicies operation. */
export interface ListPrincipalPoliciesInput {
  /** The principal. Valid principals are CertificateArn (arn:aws:iot:region:accountId:cert/certificateId), thingGroupArn (arn:aws:iot:region:accountId:thinggroup/groupName) and CognitoId (region:id). */
  principal: string;
  /** Specifies the order for results. If true, results are returned in ascending creation order. */
  ascendingOrder?: boolean;
  /** The marker for the next set of results. */
  marker?: string;
  /** The result page size. */
  pageSize?: number;
}

/** The input for the ListPrincipalThings operation. */
export interface ListPrincipalThingsInput {
  /** The principal. */
  principal: string;
  /** The maximum number of results to return in this operation. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
}

export interface ListPrincipalThingsV2Input {
  /** The principal. A principal can be an X.509 certificate or an Amazon Cognito ID. */
  principal: string;
  /** The maximum number of results to return in this operation. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
  /** The type of the relation you want to filter in the response. If no value is provided in this field, the response will list all things, including both the EXCLUSIVE_THING and NON_EXCLUSIVE_THING attach */
  thingPrincipalType?: 'EXCLUSIVE_THING' | 'NON_EXCLUSIVE_THING';
}

export interface ListProvisioningTemplatesInput {
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** A token to retrieve the next set of results. */
  nextToken?: string;
}

export interface ListProvisioningTemplateVersionsInput {
  /** The name of the provisioning template. */
  templateName: string;
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** A token to retrieve the next set of results. */
  nextToken?: string;
}

export interface ListRelatedResourcesForAuditFindingInput {
  /** The finding Id. */
  findingId: string;
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** A token that can be used to retrieve the next set of results, or null if there are no additional results. */
  nextToken?: string;
}

export interface ListRoleAliasesInput {
  /** Return the list of role aliases in ascending alphabetical order. */
  ascendingOrder?: boolean;
  /** A marker used to get the next set of results. */
  marker?: string;
  /** The maximum number of results to return at one time. */
  pageSize?: number;
}

export interface ListSbomValidationResultsInput {
  /** The name of the new software package. */
  packageName: string;
  /** The name of the new package version. */
  versionName: string;
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** A token that can be used to retrieve the next set of results, or null if there are no additional results. */
  nextToken?: string;
  /** The end result of the */
  validationResult?: 'FAILED' | 'SUCCEEDED';
}

export interface ListScheduledAuditsInput {
  /** The maximum number of results to return at one time. The default is 25. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
}

export interface ListSecurityProfilesInput {
  /** A filter to limit results to the security profiles that use the defined dimension. Cannot be used with metricName */
  dimensionName?: string;
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** The name of the custom metric. Cannot be used with dimensionName. */
  metricName?: string;
  /** The token for the next set of results. */
  nextToken?: string;
}

export interface ListSecurityProfilesForTargetInput {
  /** The ARN of the target (thing group) whose attached security profiles you want to get. */
  securityProfileTargetArn: string;
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
  /** If true, return child groups too. */
  recursive?: boolean;
}

export interface ListStreamsInput {
  /** Set to true to return the list of streams in ascending order. */
  ascendingOrder?: boolean;
  /** The maximum number of results to return at a time. */
  maxResults?: number;
  /** A token used to get the next set of results. */
  nextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The ARN of the resource. */
  resourceArn: string;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
}

export interface ListTargetsForPolicyInput {
  /** The policy name. */
  policyName: string;
  /** A marker used to get the next set of results. */
  marker?: string;
  /** The maximum number of results to return at one time. */
  pageSize?: number;
}

export interface ListTargetsForSecurityProfileInput {
  /** The security profile. */
  securityProfileName: string;
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
}

export interface ListThingGroupsInput {
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** A filter that limits the results to those with the specified name prefix. */
  namePrefixFilter?: string;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
  /** A filter that limits the results to those with the specified parent group. */
  parentGroup?: string;
  /** If true, return child groups as well. */
  recursive?: boolean;
}

export interface ListThingGroupsForThingInput {
  /** The thing name. */
  thingName: string;
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
}

/** The input for the ListThingPrincipal operation. */
export interface ListThingPrincipalsInput {
  /** The name of the thing. */
  thingName: string;
  /** The maximum number of results to return in this operation. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
}

export interface ListThingPrincipalsV2Input {
  /** The name of the thing. */
  thingName: string;
  /** The maximum number of results to return in this operation. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
  /** The type of the relation you want to filter in the response. If no value is provided in this field, the response will list all principals, including both the EXCLUSIVE_THING and NON_EXCLUSIVE_THING at */
  thingPrincipalType?: 'EXCLUSIVE_THING' | 'NON_EXCLUSIVE_THING';
}

export interface ListThingRegistrationTaskReportsInput {
  /** The type of task report. */
  reportType: 'ERRORS' | 'RESULTS';
  /** The id of the task. */
  taskId: string;
  /** The maximum number of results to return per request. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
}

export interface ListThingRegistrationTasksInput {
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
  /** The status of the bulk thing provisioning task. */
  status?: 'InProgress' | 'Completed' | 'Failed' | 'Cancelled' | 'Cancelling';
}

/** The input for the ListThings operation. */
export interface ListThingsInput {
  /** The attribute name used to search for things. */
  attributeName?: string;
  /** The attribute value used to search for things. */
  attributeValue?: string;
  /** The maximum number of results to return in this operation. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
  /** The name of the thing type used to search for things. */
  thingTypeName?: string;
  /** When true, the action returns the thing resources with attribute values that start with the attributeValue provided. When false, or not present, the action returns only the thing resources with attrib */
  usePrefixAttributeValue?: boolean;
}

export interface ListThingsInBillingGroupInput {
  /** The name of the billing group. */
  billingGroupName: string;
  /** The maximum number of results to return per request. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
}

export interface ListThingsInThingGroupInput {
  /** The thing group name. */
  thingGroupName: string;
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
  /** When true, list things in this thing group and in all child groups as well. */
  recursive?: boolean;
}

/** The input for the ListThingTypes operation. */
export interface ListThingTypesInput {
  /** The maximum number of results to return in this operation. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
  /** The name of the thing type. */
  thingTypeName?: string;
}

export interface ListTopicRuleDestinationsInput {
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
}

/** The input for the ListTopicRules operation. */
export interface ListTopicRulesInput {
  /** The maximum number of results to return. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
  /** Specifies whether the rule is disabled. */
  ruleDisabled?: boolean;
  /** The topic. */
  topic?: string;
}

export interface ListV2LoggingLevelsInput {
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** To retrieve the next set of results, the nextToken value from a previous response; otherwise null to receive the first set of results. */
  nextToken?: string;
  /** The type of resource for which you are configuring logging. Must be THING_Group. */
  targetType?: 'DEFAULT' | 'THING_GROUP' | 'CLIENT_ID' | 'SOURCE_IP' | 'PRINCIPAL_ID';
}

export interface ListViolationEventsInput {
  /** The end time for the alerts to be listed. */
  endTime: string;
  /** The start time for the alerts to be listed. */
  startTime: string;
  /** The criteria for a behavior. */
  behaviorCriteriaType?: 'STATIC' | 'STATISTICAL' | 'MACHINE_LEARNING';
  /** A list of all suppressed alerts. */
  listSuppressedAlerts?: boolean;
  /** The maximum number of results to return at one time. */
  maxResults?: number;
  /** The token for the next set of results. */
  nextToken?: string;
  /** A filter to limit results to those alerts generated by the specified security profile. */
  securityProfileName?: string;
  /** A filter to limit results to those alerts caused by the specified thing. */
  thingName?: string;
  /** The verification state of the violation (detect alarm). */
  verificationState?: 'FALSE_POSITIVE' | 'BENIGN_POSITIVE' | 'TRUE_POSITIVE' | 'UNKNOWN';
}

export interface PutVerificationStateOnViolationInput {
  /** The verification state of the violation. */
  verificationState: 'FALSE_POSITIVE' | 'BENIGN_POSITIVE' | 'TRUE_POSITIVE' | 'UNKNOWN';
  /** The violation ID. */
  violationId: string;
  /** The description of the verification state of the violation (detect alarm). */
  verificationStateDescription?: string;
}

/** The input to the RegisterCACertificate operation. */
export interface RegisterCACertificateInput {
  /** The CA certificate. */
  caCertificate: string;
  /** Allows this CA certificate to be used for auto registration of device certificates. */
  allowAutoRegistration?: boolean;
  /** Describes the certificate mode in which the Certificate Authority (CA) will be registered. If the verificationCertificate field is not provided, set certificateMode to be SNI_ONLY. If the verification */
  certificateMode?: 'DEFAULT' | 'SNI_ONLY';
  /** Information about the registration configuration. */
  registrationConfig?: RegistrationConfig;
  /** A boolean value that specifies if the CA certificate is set to active. Valid values: ACTIVE | INACTIVE */
  setAsActive?: boolean;
  /** Metadata which can be used to manage the CA certificate. For URI Request parameters use format: ...key1=value1&key2=value2... For the CLI command-line parameter use format: &&tags "key1=value1&key2=va */
  tags?: Tag[];
  /** The private key verification certificate. If certificateMode is SNI_ONLY, the verificationCertificate field must be empty. If certificateMode is DEFAULT or not provided, the verificationCertificate fi */
  verificationCertificate?: string;
}

/** The input to the RegisterCertificate operation. */
export interface RegisterCertificateInput {
  /** The certificate data, in PEM format. */
  certificatePem: string;
  /** The CA certificate used to sign the device certificate being registered. */
  caCertificatePem?: string;
  /** A boolean value that specifies if the certificate is set to active. Valid values: ACTIVE | INACTIVE */
  setAsActive?: boolean;
  /** The status of the register certificate request. Valid values that you can use include ACTIVE, INACTIVE, and REVOKED. */
  status?: 'ACTIVE' | 'INACTIVE' | 'REVOKED' | 'PENDING_TRANSFER' | 'REGISTER_INACTIVE' | 'PENDING_ACTIVATION';
}

export interface RegisterCertificateWithoutCAInput {
  /** The certificate data, in PEM format. */
  certificatePem: string;
  /** The status of the register certificate request. */
  status?: 'ACTIVE' | 'INACTIVE' | 'REVOKED' | 'PENDING_TRANSFER' | 'REGISTER_INACTIVE' | 'PENDING_ACTIVATION';
}

export interface RegisterThingInput {
  /** The provisioning template. See Provisioning Devices That Have Device Certificates for more information. */
  templateBody: string;
  /** The parameters for provisioning a thing. See Provisioning Templates for more information. */
  parameters?: Record<string, string>;
}

/** The input for the RejectCertificateTransfer operation. */
export interface RejectCertificateTransferInput {
  /** The ID of the certificate. (The last part of the certificate ARN contains the certificate ID.) */
  certificateId: string;
  /** The reason the certificate transfer was rejected. */
  rejectReason?: string;
}

export interface RemoveThingFromBillingGroupInput {
  /** The ARN of the billing group. */
  billingGroupArn?: string;
  /** The name of the billing group. */
  billingGroupName?: string;
  /** The ARN of the thing to be removed from the billing group. */
  thingArn?: string;
  /** The name of the thing to be removed from the billing group. */
  thingName?: string;
}

export interface RemoveThingFromThingGroupInput {
  /** The ARN of the thing to remove from the group. */
  thingArn?: string;
  /** The group ARN. */
  thingGroupArn?: string;
  /** The group name. */
  thingGroupName?: string;
  /** The name of the thing to remove from the group. */
  thingName?: string;
}

/** The input for the ReplaceTopicRule operation. */
export interface ReplaceTopicRuleInput {
  /** The name of the rule. */
  ruleName: string;
  /** The rule payload. */
  topicRulePayload: TopicRulePayload;
}

export interface SearchIndexInput {
  /** The search query string. For more information about the search query syntax, see Query syntax. */
  queryString: string;
  /** The search index name. */
  indexName?: string;
  /** The maximum number of results to return per page at one time. This maximum number cannot exceed 100. The response might contain fewer results but will never contain more. You can use nextToken to retr */
  maxResults?: number;
  /** The token used to get the next set of results, or null if there are no additional results. */
  nextToken?: string;
  /** The query version. */
  queryVersion?: string;
}

export interface SetDefaultAuthorizerInput {
  /** The authorizer name. */
  authorizerName: string;
}

/** The input for the SetDefaultPolicyVersion operation. */
export interface SetDefaultPolicyVersionInput {
  /** The policy name. */
  policyName: string;
  /** The policy version ID. */
  policyVersionId: string;
}

/** The input for the SetLoggingOptions operation. */
export interface SetLoggingOptionsInput {
  /** The logging options payload. */
  loggingOptionsPayload: LoggingOptionsPayload;
}

export interface SetV2LoggingLevelInput {
  /** The log level. */
  logLevel: 'DEBUG' | 'INFO' | 'ERROR' | 'WARN' | 'DISABLED';
  /** The log target. */
  logTarget: LogTarget;
}

export interface SetV2LoggingOptionsInput {
  /** The default logging level. */
  defaultLogLevel?: 'DEBUG' | 'INFO' | 'ERROR' | 'WARN' | 'DISABLED';
  /** If true all logs are disabled. The default is false. */
  disableAllLogs?: boolean;
  /** The list of event configurations that override account-level logging. */
  eventConfigurations?: LogEventConfiguration[];
  /** The ARN of the role that allows IoT to write to Cloudwatch logs. */
  roleArn?: string;
}

export interface StartAuditMitigationActionsTaskInput {
  /** For an audit check, specifies which mitigation actions to apply. Those actions must be defined in your Amazon Web Services accounts. */
  auditCheckToActionsMapping: Record<string, string[]>;
  /** Each audit mitigation task must have a unique client request token. If you try to start a new task with the same token as a task that already exists, an exception occurs. If you omit this value, a uni */
  clientRequestToken: string;
  /** Specifies the audit findings to which the mitigation actions are applied. You can apply them to a type of audit check, to all findings from an audit, or to a specific set of findings. */
  target: AuditMitigationActionsTaskTarget;
  /** A unique identifier for the task. You can use this identifier to check the status of the task or to cancel it. */
  taskId: string;
}

export interface StartDetectMitigationActionsTaskInput {
  /** The actions to be performed when a device has unexpected behavior. */
  actions: string[];
  /** Each mitigation action task must have a unique client request token. If you try to create a new task with the same token as a task that already exists, an exception occurs. If you omit this value, Ama */
  clientRequestToken: string;
  /** Specifies the ML Detect findings to which the mitigation actions are applied. */
  target: DetectMitigationActionsTaskTarget;
  /** The unique identifier of the task. */
  taskId: string;
  /** Specifies to list only active violations. */
  includeOnlyActiveViolations?: boolean;
  /** Specifies to include suppressed alerts. */
  includeSuppressedAlerts?: boolean;
  /** Specifies the time period of which violation events occurred between. */
  violationEventOccurrenceRange?: ViolationEventOccurrenceRange;
}

export interface StartOnDemandAuditTaskInput {
  /** Which checks are performed during the audit. The checks you specify must be enabled for your account or an exception occurs. Use DescribeAccountAuditConfiguration to see the list of all checks, includ */
  targetCheckNames: string[];
}

export interface StartThingRegistrationTaskInput {
  /** The S3 bucket that contains the input file. */
  inputFileBucket: string;
  /** The name of input file within the S3 bucket. This file contains a newline delimited JSON file. Each line contains the parameter values to provision one device (thing). */
  inputFileKey: string;
  /** The IAM role ARN that grants permission the input file. */
  roleArn: string;
  /** The provisioning template. */
  templateBody: string;
}

export interface StopThingRegistrationTaskInput {
  /** The bulk thing provisioning task ID. */
  taskId: string;
}

export interface TagResourceInput {
  /** The ARN of the resource. */
  resourceArn: string;
  /** The new or modified tags for the resource. */
  tags: Tag[];
}

export interface TestAuthorizationInput {
  /** A list of authorization info objects. Simulating authorization will create a response for each authInfo object in the list. */
  authInfos: AuthInfo[];
  /** The MQTT client ID. */
  clientId?: string;
  /** The Cognito identity pool ID. */
  cognitoIdentityPoolId?: string;
  /** When testing custom authorization, the policies specified here are treated as if they are attached to the principal being authorized. */
  policyNamesToAdd?: string[];
  /** When testing custom authorization, the policies specified here are treated as if they are not attached to the principal being authorized. */
  policyNamesToSkip?: string[];
  /** The principal. Valid principals are CertificateArn (arn:aws:iot:region:accountId:cert/certificateId) and CognitoId (region:id). */
  principal?: string;
}

export interface TestInvokeAuthorizerInput {
  /** The custom authorizer name. */
  authorizerName: string;
  /** Specifies a test HTTP authorization request. */
  httpContext?: HttpContext;
  /** Specifies a test MQTT authorization request. */
  mqttContext?: MqttContext;
  /** Specifies a test TLS authorization request. */
  tlsContext?: TlsContext;
  /** The token returned by your custom authentication service. */
  token?: string;
  /** The signature made with the token and your custom authentication service's private key. This value must be Base-64-encoded. */
  tokenSignature?: string;
}

/** The input for the TransferCertificate operation. */
export interface TransferCertificateInput {
  /** The ID of the certificate. (The last part of the certificate ARN contains the certificate ID.) */
  certificateId: string;
  /** The Amazon Web Services account. */
  targetAwsAccount: string;
  /** The transfer message. */
  transferMessage?: string;
}

export interface UntagResourceInput {
  /** The ARN of the resource. */
  resourceArn: string;
  /** A list of the keys of the tags to be removed from the resource. */
  tagKeys: string[];
}

export interface UpdateAccountAuditConfigurationInput {
  /** Specifies which audit checks are enabled and disabled for this account. Use DescribeAccountAuditConfiguration to see the list of all checks, including those that are currently enabled. Some data colle */
  auditCheckConfigurations?: Record<string, AuditCheckConfiguration>;
  /** Information about the targets to which audit notifications are sent. */
  auditNotificationTargetConfigurations?: Record<string, AuditNotificationTarget>;
  /** The Amazon Resource Name (ARN) of the role that grants permission to IoT to access information about your devices, policies, certificates, and other items as required when performing an audit. */
  roleArn?: string;
}

export interface UpdateAuditSuppressionInput {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
  /** The description of the audit suppression. */
  description?: string;
  /** The expiration date (epoch timestamp in seconds) that you want the suppression to adhere to. */
  expirationDate?: string;
  /** Indicates whether a suppression should exist indefinitely or not. */
  suppressIndefinitely?: boolean;
}

export interface UpdateAuthorizerInput {
  /** The authorizer name. */
  authorizerName: string;
  /** The ARN of the authorizer's Lambda function. */
  authorizerFunctionArn?: string;
  /** When true, the result from the authorizer’s Lambda function is cached for the time specified in refreshAfterInSeconds. The cached result is used while the device reuses the same HTTP connection. */
  enableCachingForHttp?: boolean;
  /** The status of the update authorizer request. */
  status?: 'ACTIVE' | 'INACTIVE';
  /** The key used to extract the token from the HTTP headers. */
  tokenKeyName?: string;
  /** The public keys used to verify the token signature. */
  tokenSigningPublicKeys?: Record<string, string>;
}

export interface UpdateBillingGroupInput {
  /** The name of the billing group. */
  billingGroupName: string;
  /** The properties of the billing group. */
  billingGroupProperties: BillingGroupProperties;
  /** The expected version of the billing group. If the version of the billing group does not match the expected version specified in the request, the UpdateBillingGroup request is rejected with a VersionCo */
  expectedVersion?: number;
}

/** The input to the UpdateCACertificate operation. */
export interface UpdateCACertificateInput {
  /** The CA certificate identifier. */
  certificateId: string;
  /** The new value for the auto registration status. Valid values are: "ENABLE" or "DISABLE". */
  newAutoRegistrationStatus?: 'ENABLE' | 'DISABLE';
  /** The updated status of the CA certificate. Note: The status value REGISTER_INACTIVE is deprecated and should not be used. */
  newStatus?: 'ACTIVE' | 'INACTIVE';
  /** Information about the registration configuration. */
  registrationConfig?: RegistrationConfig;
  /** If true, removes auto registration. */
  removeAutoRegistration?: boolean;
}

/** The input for the UpdateCertificate operation. */
export interface UpdateCertificateInput {
  /** The ID of the certificate. (The last part of the certificate ARN contains the certificate ID.) */
  certificateId: string;
  /** The new status. Note: Setting the status to PENDING_TRANSFER or PENDING_ACTIVATION will result in an exception being thrown. PENDING_TRANSFER and PENDING_ACTIVATION are statuses used internally by IoT */
  newStatus: 'ACTIVE' | 'INACTIVE' | 'REVOKED' | 'PENDING_TRANSFER' | 'REGISTER_INACTIVE' | 'PENDING_ACTIVATION';
}

export interface UpdateCertificateProviderInput {
  /** The name of the certificate provider. */
  certificateProviderName: string;
  /** A list of the operations that the certificate provider will use to generate certificates. Valid value: CreateCertificateFromCsr. */
  accountDefaultForOperations?: 'CreateCertificateFromCsr'[];
  /** The Lambda function ARN that's associated with the certificate provider. */
  lambdaFunctionArn?: string;
}

export interface UpdateCommandInput {
  /** The unique identifier of the command to be updated. */
  commandId: string;
  /** A boolean that you can use to specify whether to deprecate a command. */
  deprecated?: boolean;
  /** A short text description of the command. */
  description?: string;
  /** The new user-friendly name to use in the console for the command. */
  displayName?: string;
}

export interface UpdateCustomMetricInput {
  /** Field represents a friendly name in the console for the custom metric, it doesn't have to be unique. Don't use this name as the metric identifier in the device metric report. Can be updated. */
  displayName: string;
  /** The name of the custom metric. Cannot be updated. */
  metricName: string;
}

export interface UpdateDimensionInput {
  /** A unique identifier for the dimension. Choose something that describes the type and value to make it easy to remember what it does. */
  name: string;
  /** Specifies the value or list of values for the dimension. For TOPIC_FILTER dimensions, this is a pattern used to match the MQTT topic (for example, "admin/#"). */
  stringValues: string[];
}

export interface UpdateDomainConfigurationInput {
  /** The name of the domain configuration to be updated. */
  domainConfigurationName: string;
  /** An enumerated string that speciﬁes the application-layer protocol. SECURE_MQTT - MQTT over TLS. MQTT_WSS - MQTT over WebSocket. HTTPS - HTTP over TLS. DEFAULT - Use a combination of port and Applicati */
  applicationProtocol?: 'SECURE_MQTT' | 'MQTT_WSS' | 'HTTPS' | 'DEFAULT';
  /** An enumerated string that speciﬁes the authentication type. CUSTOM_AUTH_X509 - Use custom authentication and authorization with additional details from the X.509 client certificate. CUSTOM_AUTH - Use  */
  authenticationType?: 'CUSTOM_AUTH_X509' | 'CUSTOM_AUTH' | 'AWS_X509' | 'AWS_SIGV4' | 'DEFAULT';
  /** An object that specifies the authorization service for a domain. */
  authorizerConfig?: AuthorizerConfig;
  /** An object that speciﬁes the client certificate conﬁguration for a domain. */
  clientCertificateConfig?: ClientCertificateConfig;
  /** The status to which the domain configuration should be updated. */
  domainConfigurationStatus?: 'ENABLED' | 'DISABLED';
  /** Removes the authorization configuration from a domain. */
  removeAuthorizerConfig?: boolean;
  /** The server certificate configuration. */
  serverCertificateConfig?: ServerCertificateConfig;
  /** An object that specifies the TLS configuration for a domain. */
  tlsConfig?: TlsConfig;
}

export interface UpdateDynamicThingGroupInput {
  /** The name of the dynamic thing group to update. */
  thingGroupName: string;
  /** The dynamic thing group properties to update. */
  thingGroupProperties: ThingGroupProperties;
  /** The expected version of the dynamic thing group to update. */
  expectedVersion?: number;
  /** The dynamic thing group index to update. Currently one index is supported: AWS_Things. */
  indexName?: string;
  /** The dynamic thing group search query string to update. */
  queryString?: string;
  /** The dynamic thing group query version to update. Currently one query version is supported: "2017-09-30". If not specified, the query version defaults to this value. */
  queryVersion?: string;
}

export interface UpdateEncryptionConfigurationInput {
  /** The type of the KMS key. */
  encryptionType: 'CUSTOMER_MANAGED_KMS_KEY' | 'AWS_OWNED_KMS_KEY';
  /** The Amazon Resource Name (ARN) of the IAM role assumed by Amazon Web Services IoT Core to call KMS on behalf of the customer. */
  kmsAccessRoleArn?: string;
  /** The ARN of the customer managedKMS key. */
  kmsKeyArn?: string;
}

export interface UpdateEventConfigurationsInput {
  /** The new event configuration values. */
  eventConfigurations?: Record<string, Configuration>;
}

export interface UpdateFleetMetricInput {
  /** The name of the index to search. */
  indexName: string;
  /** The name of the fleet metric to update. */
  metricName: string;
  /** The field to aggregate. */
  aggregationField?: string;
  /** The type of the aggregation query. */
  aggregationType?: AggregationType;
  /** The description of the fleet metric. */
  description?: string;
  /** The expected version of the fleet metric record in the registry. */
  expectedVersion?: number;
  /** The time in seconds between fleet metric emissions. Range [60(1 min), 86400(1 day)] and must be multiple of 60. */
  period?: number;
  /** The search query string. */
  queryString?: string;
  /** The version of the query. */
  queryVersion?: string;
  /** Used to support unit transformation such as milliseconds to seconds. The unit must be supported by CW metric. */
  unit?: 'Seconds' | 'Microseconds' | 'Milliseconds' | 'Bytes' | 'Kilobytes' | 'Megabytes' | 'Gigabytes' | 'Terabytes' | 'Bits' | 'Kilobits' | 'Megabits' | 'Gigabits' | 'Terabits' | 'Percent' | 'Count' | 'Bytes/Second' | 'Kilobytes/Second' | 'Megabytes/Second' | 'Gigabytes/Second' | 'Terabytes/Second' | 'Bits/Second' | 'Kilobits/Second' | 'Megabits/Second' | 'Gigabits/Second' | 'Terabits/Second' | 'Count/Second' | 'None';
}

export interface UpdateIndexingConfigurationInput {
  /** Thing group indexing configuration. */
  thingGroupIndexingConfiguration?: ThingGroupIndexingConfiguration;
  /** Thing indexing configuration. */
  thingIndexingConfiguration?: ThingIndexingConfiguration;
}

export interface UpdateJobInput {
  /** The ID of the job to be updated. */
  jobId: string;
  /** Allows you to create criteria to abort a job. */
  abortConfig?: AbortConfig;
  /** A short text description of the job. */
  description?: string;
  /** Allows you to create the criteria to retry a job. */
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
  /** Allows you to create a staged rollout of the job. */
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  /** The namespace used to indicate that a job is a customer-managed job. When you specify a value for this parameter, Amazon Web Services IoT Core sends jobs notifications to MQTT topics that contain the  */
  namespaceId?: string;
  /** Configuration information for pre-signed S3 URLs. */
  presignedUrlConfig?: PresignedUrlConfig;
  /** Specifies the amount of time each device has to finish its execution of the job. The timer is started when the job execution status is set to IN_PROGRESS. If the job execution status is not set to ano */
  timeoutConfig?: TimeoutConfig;
}

export interface UpdateMitigationActionInput {
  /** The friendly name for the mitigation action. You cannot change the name by using UpdateMitigationAction. Instead, you must delete and recreate the mitigation action with the new name. */
  actionName: string;
  /** Defines the type of action and the parameters for that action. */
  actionParams?: MitigationActionParams;
  /** The ARN of the IAM role that is used to apply the mitigation action. */
  roleArn?: string;
}

export interface UpdatePackageInput {
  /** The name of the target software package. */
  packageName: string;
  /** A unique case-sensitive identifier that you can provide to ensure the idempotency of the request. Don't reuse this client token if a new idempotent request is required. */
  clientToken?: string;
  /** The name of the default package version. Note: You cannot name a defaultVersion and set unsetDefaultVersion equal to true at the same time. */
  defaultVersionName?: string;
  /** The package description. */
  description?: string;
  /** Indicates whether you want to remove the named default package version from the software package. Set as true to remove the default package version. Note: You cannot name a defaultVersion and set unse */
  unsetDefaultVersion?: boolean;
}

export interface UpdatePackageConfigurationInput {
  /** A unique case-sensitive identifier that you can provide to ensure the idempotency of the request. Don't reuse this client token if a new idempotent request is required. */
  clientToken?: string;
  /** Configuration to manage job's package version reporting. This updates the thing's reserved named shadow that the job targets. */
  versionUpdateByJobsConfig?: VersionUpdateByJobsConfig;
}

export interface UpdatePackageVersionInput {
  /** The name of the associated software package. */
  packageName: string;
  /** The name of the target package version. */
  versionName: string;
  /** The status that the package version should be assigned. For more information, see Package version lifecycle. */
  action?: 'PUBLISH' | 'DEPRECATE';
  /** The various components that make up a software package version. */
  artifact?: PackageVersionArtifact;
  /** Metadata that can be used to define a package version’s configuration. For example, the Amazon S3 file location, configuration options that are being sent to the device or fleet. Note: Attributes can  */
  attributes?: Record<string, string>;
  /** A unique case-sensitive identifier that you can provide to ensure the idempotency of the request. Don't reuse this client token if a new idempotent request is required. */
  clientToken?: string;
  /** The package version description. */
  description?: string;
  /** The inline job document associated with a software package version used for a quick job deployment. */
  recipe?: string;
}

export interface UpdateProvisioningTemplateInput {
  /** The name of the provisioning template. */
  templateName: string;
  /** The ID of the default provisioning template version. */
  defaultVersionId?: number;
  /** The description of the provisioning template. */
  description?: string;
  /** True to enable the provisioning template, otherwise false. */
  enabled?: boolean;
  /** Updates the pre-provisioning hook template. Only supports template of type FLEET_PROVISIONING. For more information about provisioning template types, see type. */
  preProvisioningHook?: ProvisioningHook;
  /** The ARN of the role associated with the provisioning template. This IoT role grants permission to provision a device. */
  provisioningRoleArn?: string;
  /** Removes pre-provisioning hook template. */
  removePreProvisioningHook?: boolean;
}

export interface UpdateRoleAliasInput {
  /** The role alias to update. */
  roleAlias: string;
  /** The number of seconds the credential will be valid. This value must be less than or equal to the maximum session duration of the IAM role that the role alias references. */
  credentialDurationSeconds?: number;
  /** The role ARN. */
  roleArn?: string;
}

export interface UpdateScheduledAuditInput {
  /** The name of the scheduled audit. (Max. 128 chars) */
  scheduledAuditName: string;
  /** The day of the month on which the scheduled audit takes place. This can be 1 through 31 or LAST. This field is required if the frequency parameter is set to MONTHLY. If days 29-31 are specified, and t */
  dayOfMonth?: string;
  /** The day of the week on which the scheduled audit takes place. This can be one of SUN, MON, TUE, WED, THU, FRI, or SAT. This field is required if the "frequency" parameter is set to WEEKLY or BIWEEKLY. */
  dayOfWeek?: 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';
  /** How often the scheduled audit takes place, either DAILY, WEEKLY, BIWEEKLY, or MONTHLY. The start time of each audit is determined by the system. */
  frequency?: 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  /** Which checks are performed during the scheduled audit. Checks must be enabled for your account. (Use DescribeAccountAuditConfiguration to see the list of all checks, including those that are enabled o */
  targetCheckNames?: string[];
}

export interface UpdateSecurityProfileInput {
  /** The name of the security profile you want to update. */
  securityProfileName: string;
  /** Please use UpdateSecurityProfileRequest$additionalMetricsToRetainV2 instead. A list of metrics whose data is retained (stored). By default, data is retained for any metric used in the profile's behavi */
  additionalMetricsToRetain?: string[];
  /** A list of metrics whose data is retained (stored). By default, data is retained for any metric used in the profile's behaviors, but it is also retained for any metric specified here. Can be used with  */
  additionalMetricsToRetainV2?: MetricToRetain[];
  /** Where the alerts are sent. (Alerts are always sent to the console.) */
  alertTargets?: Record<string, AlertTarget>;
  /** Specifies the behaviors that, when violated by a device (thing), cause an alert. */
  behaviors?: Behavior[];
  /** If true, delete all additionalMetricsToRetain defined for this security profile. If any additionalMetricsToRetain are defined in the current invocation, an exception occurs. */
  deleteAdditionalMetricsToRetain?: boolean;
  /** If true, delete all alertTargets defined for this security profile. If any alertTargets are defined in the current invocation, an exception occurs. */
  deleteAlertTargets?: boolean;
  /** If true, delete all behaviors defined for this security profile. If any behaviors are defined in the current invocation, an exception occurs. */
  deleteBehaviors?: boolean;
  /** Set the value as true to delete metrics export related configurations. */
  deleteMetricsExportConfig?: boolean;
  /** The expected version of the security profile. A new version is generated whenever the security profile is updated. If you specify a value that is different from the actual version, a VersionConflictEx */
  expectedVersion?: number;
  /** Specifies the MQTT topic and role ARN required for metric export. */
  metricsExportConfig?: MetricsExportConfig;
  /** A description of the security profile. */
  securityProfileDescription?: string;
}

export interface UpdateStreamInput {
  /** The stream ID. */
  streamId: string;
  /** The description of the stream. */
  description?: string;
  /** The files associated with the stream. */
  files?: StreamFile[];
  /** An IAM role that allows the IoT service principal assumes to access your S3 files. */
  roleArn?: string;
}

/** The input for the UpdateThing operation. */
export interface UpdateThingInput {
  /** The name of the thing to update. You can't change a thing's name. To change a thing's name, you must create a new thing, give it the new name, and then delete the old thing. */
  thingName: string;
  /** A list of thing attributes, a JSON string containing name-value pairs. For example: {\"attributes\":{\"name1\":\"value2\"}} This data is used to add new attributes or update existing attributes. */
  attributePayload?: AttributePayload;
  /** The expected version of the thing record in the registry. If the version of the record in the registry does not match the expected version specified in the request, the UpdateThing request is rejected */
  expectedVersion?: number;
  /** Remove a thing type association. If true, the association is removed. */
  removeThingType?: boolean;
  /** The name of the thing type. */
  thingTypeName?: string;
}

export interface UpdateThingGroupInput {
  /** The thing group to update. */
  thingGroupName: string;
  /** The thing group properties. */
  thingGroupProperties: ThingGroupProperties;
  /** The expected version of the thing group. If this does not match the version of the thing group being updated, the update will fail. */
  expectedVersion?: number;
}

export interface UpdateThingGroupsForThingInput {
  /** Override dynamic thing groups with static thing groups when 10-group limit is reached. If a thing belongs to 10 thing groups, and one or more of those groups are dynamic thing groups, adding a thing t */
  overrideDynamicGroups?: boolean;
  /** The groups to which the thing will be added. */
  thingGroupsToAdd?: string[];
  /** The groups from which the thing will be removed. */
  thingGroupsToRemove?: string[];
  /** The thing whose group memberships will be updated. */
  thingName?: string;
}

export interface UpdateThingTypeInput {
  /** The name of a thing type. */
  thingTypeName: string;
  thingTypeProperties?: ThingTypeProperties;
}

export interface UpdateTopicRuleDestinationInput {
  /** The ARN of the topic rule destination. */
  arn: string;
  /** The status of the topic rule destination. Valid values are: IN_PROGRESS A topic rule destination was created but has not been confirmed. You can set status to IN_PROGRESS by calling UpdateTopicRuleDes */
  status: 'ENABLED' | 'IN_PROGRESS' | 'DISABLED' | 'ERROR' | 'DELETING';
}

export interface ValidateSecurityProfileBehaviorsInput {
  /** Specifies the behaviors that, when violated by a device (thing), cause an alert. */
  behaviors: Behavior[];
}

/** IoT service binding for Step Functions SDK integrations. */
export class IoT {
  constructor() {}

  acceptCertificateTransfer<T>(params: AcceptCertificateTransferInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addThingToBillingGroup<T>(params: AddThingToBillingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addThingToThingGroup<T>(params: AddThingToThingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateSbomWithPackageVersion<T>(params: AssociateSbomWithPackageVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateTargetsWithJob<T>(params: AssociateTargetsWithJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachPolicy<T>(params: AttachPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachPrincipalPolicy<T>(params: AttachPrincipalPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachSecurityProfile<T>(params: AttachSecurityProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachThingPrincipal<T>(params: AttachThingPrincipalInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelAuditMitigationActionsTask<T>(params: CancelAuditMitigationActionsTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelAuditTask<T>(params: CancelAuditTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelCertificateTransfer<T>(params: CancelCertificateTransferInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelDetectMitigationActionsTask<T>(params: CancelDetectMitigationActionsTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelJob<T>(params: CancelJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelJobExecution<T>(params: CancelJobExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  clearDefaultAuthorizer<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  confirmTopicRuleDestination<T>(params: ConfirmTopicRuleDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAuditSuppression<T>(params: CreateAuditSuppressionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAuthorizer<T>(params: CreateAuthorizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createBillingGroup<T>(params: CreateBillingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCertificateFromCsr<T>(params: CreateCertificateFromCsrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCertificateProvider<T>(params: CreateCertificateProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCommand<T>(params: CreateCommandInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCustomMetric<T>(params: CreateCustomMetricInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDimension<T>(params: CreateDimensionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDomainConfiguration<T>(params: CreateDomainConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDynamicThingGroup<T>(params: CreateDynamicThingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createFleetMetric<T>(params: CreateFleetMetricInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createJob<T>(params: CreateJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createJobTemplate<T>(params: CreateJobTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createKeysAndCertificate<T>(params: CreateKeysAndCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createMitigationAction<T>(params: CreateMitigationActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createOTAUpdate<T>(params: CreateOTAUpdateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPackage<T>(params: CreatePackageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPackageVersion<T>(params: CreatePackageVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPolicy<T>(params: CreatePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPolicyVersion<T>(params: CreatePolicyVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createProvisioningClaim<T>(params: CreateProvisioningClaimInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createProvisioningTemplate<T>(params: CreateProvisioningTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createProvisioningTemplateVersion<T>(params: CreateProvisioningTemplateVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRoleAlias<T>(params: CreateRoleAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createScheduledAudit<T>(params: CreateScheduledAuditInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSecurityProfile<T>(params: CreateSecurityProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStream<T>(params: CreateStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createThing<T>(params: CreateThingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createThingGroup<T>(params: CreateThingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createThingType<T>(params: CreateThingTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTopicRule<T>(params: CreateTopicRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTopicRuleDestination<T>(params: CreateTopicRuleDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAccountAuditConfiguration<T>(params: DeleteAccountAuditConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAuditSuppression<T>(params: DeleteAuditSuppressionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAuthorizer<T>(params: DeleteAuthorizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteBillingGroup<T>(params: DeleteBillingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCACertificate<T>(params: DeleteCACertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCertificate<T>(params: DeleteCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCertificateProvider<T>(params: DeleteCertificateProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCommand<T>(params: DeleteCommandInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCommandExecution<T>(params: DeleteCommandExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCustomMetric<T>(params: DeleteCustomMetricInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDimension<T>(params: DeleteDimensionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDomainConfiguration<T>(params: DeleteDomainConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDynamicThingGroup<T>(params: DeleteDynamicThingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteFleetMetric<T>(params: DeleteFleetMetricInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteJob<T>(params: DeleteJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteJobExecution<T>(params: DeleteJobExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteJobTemplate<T>(params: DeleteJobTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteMitigationAction<T>(params: DeleteMitigationActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteOTAUpdate<T>(params: DeleteOTAUpdateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePackage<T>(params: DeletePackageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePackageVersion<T>(params: DeletePackageVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePolicy<T>(params: DeletePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePolicyVersion<T>(params: DeletePolicyVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteProvisioningTemplate<T>(params: DeleteProvisioningTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteProvisioningTemplateVersion<T>(params: DeleteProvisioningTemplateVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRegistrationCode<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRoleAlias<T>(params: DeleteRoleAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteScheduledAudit<T>(params: DeleteScheduledAuditInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSecurityProfile<T>(params: DeleteSecurityProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStream<T>(params: DeleteStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteThing<T>(params: DeleteThingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteThingGroup<T>(params: DeleteThingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteThingType<T>(params: DeleteThingTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTopicRule<T>(params: DeleteTopicRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTopicRuleDestination<T>(params: DeleteTopicRuleDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteV2LoggingLevel<T>(params: DeleteV2LoggingLevelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deprecateThingType<T>(params: DeprecateThingTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAccountAuditConfiguration<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAuditFinding<T>(params: DescribeAuditFindingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAuditMitigationActionsTask<T>(params: DescribeAuditMitigationActionsTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAuditSuppression<T>(params: DescribeAuditSuppressionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAuditTask<T>(params: DescribeAuditTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAuthorizer<T>(params: DescribeAuthorizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeBillingGroup<T>(params: DescribeBillingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCACertificate<T>(params: DescribeCACertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCertificate<T>(params: DescribeCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCertificateProvider<T>(params: DescribeCertificateProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCustomMetric<T>(params: DescribeCustomMetricInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDefaultAuthorizer<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDetectMitigationActionsTask<T>(params: DescribeDetectMitigationActionsTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDimension<T>(params: DescribeDimensionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDomainConfiguration<T>(params: DescribeDomainConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEncryptionConfiguration<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEndpoint<T>(params: DescribeEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEventConfigurations<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFleetMetric<T>(params: DescribeFleetMetricInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIndex<T>(params: DescribeIndexInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeJob<T>(params: DescribeJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeJobExecution<T>(params: DescribeJobExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeJobTemplate<T>(params: DescribeJobTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeManagedJobTemplate<T>(params: DescribeManagedJobTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMitigationAction<T>(params: DescribeMitigationActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProvisioningTemplate<T>(params: DescribeProvisioningTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProvisioningTemplateVersion<T>(params: DescribeProvisioningTemplateVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRoleAlias<T>(params: DescribeRoleAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeScheduledAudit<T>(params: DescribeScheduledAuditInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSecurityProfile<T>(params: DescribeSecurityProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStream<T>(params: DescribeStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeThing<T>(params: DescribeThingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeThingGroup<T>(params: DescribeThingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeThingRegistrationTask<T>(params: DescribeThingRegistrationTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeThingType<T>(params: DescribeThingTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachPolicy<T>(params: DetachPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachPrincipalPolicy<T>(params: DetachPrincipalPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachSecurityProfile<T>(params: DetachSecurityProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachThingPrincipal<T>(params: DetachThingPrincipalInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableTopicRule<T>(params: DisableTopicRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateSbomFromPackageVersion<T>(params: DisassociateSbomFromPackageVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableTopicRule<T>(params: EnableTopicRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getBehaviorModelTrainingSummaries<T>(params: GetBehaviorModelTrainingSummariesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getBucketsAggregation<T>(params: GetBucketsAggregationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCardinality<T>(params: GetCardinalityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCommand<T>(params: GetCommandInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCommandExecution<T>(params: GetCommandExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEffectivePolicies<T>(params: GetEffectivePoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIndexingConfiguration<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJobDocument<T>(params: GetJobDocumentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLoggingOptions<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getOTAUpdate<T>(params: GetOTAUpdateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPackage<T>(params: GetPackageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPackageConfiguration<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPackageVersion<T>(params: GetPackageVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPercentiles<T>(params: GetPercentilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPolicy<T>(params: GetPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPolicyVersion<T>(params: GetPolicyVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRegistrationCode<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getStatistics<T>(params: GetStatisticsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getThingConnectivityData<T>(params: GetThingConnectivityDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTopicRule<T>(params: GetTopicRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTopicRuleDestination<T>(params: GetTopicRuleDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getV2LoggingOptions<T>(params: GetV2LoggingOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listActiveViolations<T>(params: ListActiveViolationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAttachedPolicies<T>(params: ListAttachedPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAuditFindings<T>(params: ListAuditFindingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAuditMitigationActionsExecutions<T>(params: ListAuditMitigationActionsExecutionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAuditMitigationActionsTasks<T>(params: ListAuditMitigationActionsTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAuditSuppressions<T>(params: ListAuditSuppressionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAuditTasks<T>(params: ListAuditTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAuthorizers<T>(params: ListAuthorizersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBillingGroups<T>(params: ListBillingGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCACertificates<T>(params: ListCACertificatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCertificateProviders<T>(params: ListCertificateProvidersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCertificates<T>(params: ListCertificatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCertificatesByCA<T>(params: ListCertificatesByCAInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCommandExecutions<T>(params: ListCommandExecutionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCommands<T>(params: ListCommandsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCustomMetrics<T>(params: ListCustomMetricsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDetectMitigationActionsExecutions<T>(params: ListDetectMitigationActionsExecutionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDetectMitigationActionsTasks<T>(params: ListDetectMitigationActionsTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDimensions<T>(params: ListDimensionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDomainConfigurations<T>(params: ListDomainConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listFleetMetrics<T>(params: ListFleetMetricsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listIndices<T>(params: ListIndicesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listJobExecutionsForJob<T>(params: ListJobExecutionsForJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listJobExecutionsForThing<T>(params: ListJobExecutionsForThingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listJobs<T>(params: ListJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listJobTemplates<T>(params: ListJobTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listManagedJobTemplates<T>(params: ListManagedJobTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMetricValues<T>(params: ListMetricValuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMitigationActions<T>(params: ListMitigationActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listOTAUpdates<T>(params: ListOTAUpdatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listOutgoingCertificates<T>(params: ListOutgoingCertificatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPackages<T>(params: ListPackagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPackageVersions<T>(params: ListPackageVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPolicies<T>(params: ListPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPolicyPrincipals<T>(params: ListPolicyPrincipalsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPolicyVersions<T>(params: ListPolicyVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPrincipalPolicies<T>(params: ListPrincipalPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPrincipalThings<T>(params: ListPrincipalThingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPrincipalThingsV2<T>(params: ListPrincipalThingsV2Input): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listProvisioningTemplates<T>(params: ListProvisioningTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listProvisioningTemplateVersions<T>(params: ListProvisioningTemplateVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRelatedResourcesForAuditFinding<T>(params: ListRelatedResourcesForAuditFindingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRoleAliases<T>(params: ListRoleAliasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSbomValidationResults<T>(params: ListSbomValidationResultsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listScheduledAudits<T>(params: ListScheduledAuditsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSecurityProfiles<T>(params: ListSecurityProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSecurityProfilesForTarget<T>(params: ListSecurityProfilesForTargetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStreams<T>(params: ListStreamsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTargetsForPolicy<T>(params: ListTargetsForPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTargetsForSecurityProfile<T>(params: ListTargetsForSecurityProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listThingGroups<T>(params: ListThingGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listThingGroupsForThing<T>(params: ListThingGroupsForThingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listThingPrincipals<T>(params: ListThingPrincipalsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listThingPrincipalsV2<T>(params: ListThingPrincipalsV2Input): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listThingRegistrationTaskReports<T>(params: ListThingRegistrationTaskReportsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listThingRegistrationTasks<T>(params: ListThingRegistrationTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listThings<T>(params: ListThingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listThingsInBillingGroup<T>(params: ListThingsInBillingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listThingsInThingGroup<T>(params: ListThingsInThingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listThingTypes<T>(params: ListThingTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTopicRuleDestinations<T>(params: ListTopicRuleDestinationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTopicRules<T>(params: ListTopicRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listV2LoggingLevels<T>(params: ListV2LoggingLevelsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listViolationEvents<T>(params: ListViolationEventsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putVerificationStateOnViolation<T>(params: PutVerificationStateOnViolationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerCACertificate<T>(params: RegisterCACertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerCertificate<T>(params: RegisterCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerCertificateWithoutCA<T>(params: RegisterCertificateWithoutCAInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerThing<T>(params: RegisterThingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectCertificateTransfer<T>(params: RejectCertificateTransferInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeThingFromBillingGroup<T>(params: RemoveThingFromBillingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeThingFromThingGroup<T>(params: RemoveThingFromThingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  replaceTopicRule<T>(params: ReplaceTopicRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchIndex<T>(params: SearchIndexInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setDefaultAuthorizer<T>(params: SetDefaultAuthorizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setDefaultPolicyVersion<T>(params: SetDefaultPolicyVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setLoggingOptions<T>(params: SetLoggingOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setV2LoggingLevel<T>(params: SetV2LoggingLevelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setV2LoggingOptions<T>(params: SetV2LoggingOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startAuditMitigationActionsTask<T>(params: StartAuditMitigationActionsTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDetectMitigationActionsTask<T>(params: StartDetectMitigationActionsTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startOnDemandAuditTask<T>(params: StartOnDemandAuditTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startThingRegistrationTask<T>(params: StartThingRegistrationTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopThingRegistrationTask<T>(params: StopThingRegistrationTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testAuthorization<T>(params: TestAuthorizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testInvokeAuthorizer<T>(params: TestInvokeAuthorizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  transferCertificate<T>(params: TransferCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAccountAuditConfiguration<T>(params: UpdateAccountAuditConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAuditSuppression<T>(params: UpdateAuditSuppressionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAuthorizer<T>(params: UpdateAuthorizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateBillingGroup<T>(params: UpdateBillingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateCACertificate<T>(params: UpdateCACertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateCertificate<T>(params: UpdateCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateCertificateProvider<T>(params: UpdateCertificateProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateCommand<T>(params: UpdateCommandInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateCustomMetric<T>(params: UpdateCustomMetricInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDimension<T>(params: UpdateDimensionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDomainConfiguration<T>(params: UpdateDomainConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDynamicThingGroup<T>(params: UpdateDynamicThingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEncryptionConfiguration<T>(params: UpdateEncryptionConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEventConfigurations<T>(params: UpdateEventConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateFleetMetric<T>(params: UpdateFleetMetricInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateIndexingConfiguration<T>(params: UpdateIndexingConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateJob<T>(params: UpdateJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateMitigationAction<T>(params: UpdateMitigationActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePackage<T>(params: UpdatePackageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePackageConfiguration<T>(params: UpdatePackageConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePackageVersion<T>(params: UpdatePackageVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateProvisioningTemplate<T>(params: UpdateProvisioningTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRoleAlias<T>(params: UpdateRoleAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateScheduledAudit<T>(params: UpdateScheduledAuditInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSecurityProfile<T>(params: UpdateSecurityProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStream<T>(params: UpdateStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateThing<T>(params: UpdateThingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateThingGroup<T>(params: UpdateThingGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateThingGroupsForThing<T>(params: UpdateThingGroupsForThingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateThingType<T>(params: UpdateThingTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTopicRuleDestination<T>(params: UpdateTopicRuleDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  validateSecurityProfileBehaviors<T>(params: ValidateSecurityProfileBehaviorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
