// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface DataSource {
  /** The name of the data source. */
  name: string;
  /** The type of the data source. */
  type?: string;
}

export interface S3DeliveryConfiguration {
  /** This string allows re-configuring the S3 object prefix to contain either static or variable sections. The valid variables to use in the suffix path will vary by each log source. To find the values sup */
  suffixPath?: string;
  /** This parameter causes the S3 objects that contain delivered logs to use a prefix structure that allows for integration with Apache Hive. */
  enableHiveCompatiblePath?: boolean;
}

export interface ImportFilter {
  /** The start of the time range for events to import, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC. */
  startEventTime?: number;
  /** The end of the time range for events to import, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC. */
  endEventTime?: number;
}

export interface S3Configuration {
  /** The Amazon S3 URI where query results are delivered. Must be a valid S3 URI format. */
  destinationIdentifier: string;
  /** The ARN of the IAM role that grants permissions to write query results to the specified Amazon S3 destination. */
  roleArn: string;
}

export interface DestinationConfiguration {
  /** Configuration for delivering query results to Amazon S3. */
  s3Configuration: S3Configuration;
}

export interface DataSourceFilter {
  /** The name pattern to filter data sources by. */
  name: string;
  /** The type pattern to filter data sources by. */
  type?: string;
}

export interface DeliveryDestinationConfiguration {
  /** The ARN of the Amazon Web Services destination that this delivery destination represents. That Amazon Web Services destination can be a log group in CloudWatch Logs, an Amazon S3 bucket, or a delivery */
  destinationResourceArn: string;
}

export interface OpenSearchResourceConfig {
  /** To have the vended dashboard data encrypted with KMS instead of the CloudWatch Logs default encryption method, specify the ARN of the KMS key that you want to use. */
  kmsKeyArn?: string;
  /** Specify the ARN of an IAM role that CloudWatch Logs will use to create the integration. This role must have the permissions necessary to access the OpenSearch Service collection to be able to create t */
  dataSourceRoleArn: string;
  /** Specify the ARNs of IAM roles and IAM users who you want to grant permission to for viewing the dashboards. In addition to specifying these users here, you must also grant them the CloudWatchOpenSearc */
  dashboardViewerPrincipals: any[];
  /** If you want to use an existing OpenSearch Service application for your integration with OpenSearch Service, specify it here. If you omit this, a new application will be created. */
  applicationArn?: string;
  /** Specify how many days that you want the data derived by OpenSearch Service to be retained in the index that the dashboard refers to. This also sets the maximum time period that you can choose when vie */
  retentionDays: number;
}

export interface InputLogEvent {
  /** The time the event occurred, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC. */
  timestamp: number;
  /** The raw event message. Each log event can be no larger than 1 MB. */
  message: string;
}

export interface Entity {
  /** The attributes of the entity which identify the specific entity, as a list of key-value pairs. Entities with the same keyAttributes are considered to be the same entity. There are five allowed attribu */
  keyAttributes?: Record<string, string>;
  /** Additional attributes of the entity that are not used to specify the identity of the entity. A list of key-value pairs. For details about how to use the attributes, see How to add related information  */
  attributes?: Record<string, string>;
}

export interface MetricTransformation {
  /** The name of the CloudWatch metric. */
  metricName: string;
  /** A custom namespace to contain your metric in CloudWatch. Use namespaces to group together metrics that are similar. For more information, see Namespaces. */
  metricNamespace: string;
  /** The value to publish to the CloudWatch metric when a filter pattern matches a log event. */
  metricValue: string;
  /** (Optional) The value to emit when a filter pattern does not match a log event. This value can be null. */
  defaultValue?: number;
  /** The fields to use as dimensions for the metric. One metric filter can include as many as three dimensions. Metrics extracted from log events are charged as custom metrics. To prevent unexpected high c */
  dimensions?: Record<string, any>;
  /** The unit to assign to the metric. If you omit this, the unit is set as None. */
  unit?: 'Seconds' | 'Microseconds' | 'Milliseconds' | 'Bytes' | 'Kilobytes' | 'Megabytes' | 'Gigabytes' | 'Terabytes' | 'Bits' | 'Kilobits' | 'Megabits' | 'Gigabits' | 'Terabits' | 'Percent' | 'Count' | 'Bytes/Second' | 'Kilobytes/Second' | 'Megabytes/Second' | 'Gigabytes/Second' | 'Terabytes/Second' | 'Bits/Second' | 'Kilobits/Second' | 'Megabits/Second' | 'Gigabits/Second' | 'Terabits/Second' | 'Count/Second' | 'None';
}

export interface Processor {
  /** Use this parameter to include the addKeys processor in your transformer. */
  addKeys?: any;
  /** Use this parameter to include the copyValue processor in your transformer. */
  copyValue?: any;
  /** Use this parameter to include the CSV processor in your transformer. */
  csv?: any;
  /** Use this parameter to include the datetimeConverter processor in your transformer. */
  dateTimeConverter?: any;
  /** Use this parameter to include the deleteKeys processor in your transformer. */
  deleteKeys?: any;
  /** Use this parameter to include the grok processor in your transformer. */
  grok?: any;
  /** Use this parameter to include the listToMap processor in your transformer. */
  listToMap?: any;
  /** Use this parameter to include the lowerCaseString processor in your transformer. */
  lowerCaseString?: any;
  /** Use this parameter to include the moveKeys processor in your transformer. */
  moveKeys?: any;
  /** Use this parameter to include the parseCloudfront processor in your transformer. If you use this processor, it must be the first processor in your transformer. */
  parseCloudfront?: any;
  /** Use this parameter to include the parseJSON processor in your transformer. */
  parseJSON?: any;
  /** Use this parameter to include the parseKeyValue processor in your transformer. */
  parseKeyValue?: any;
  /** Use this parameter to include the parseRoute53 processor in your transformer. If you use this processor, it must be the first processor in your transformer. */
  parseRoute53?: any;
  /** Use this parameter to convert logs into Open Cybersecurity Schema (OCSF) format. */
  parseToOCSF?: any;
  /** Use this parameter to include the parsePostGres processor in your transformer. If you use this processor, it must be the first processor in your transformer. */
  parsePostgres?: any;
  /** Use this parameter to include the parseVPC processor in your transformer. If you use this processor, it must be the first processor in your transformer. */
  parseVPC?: any;
  /** Use this parameter to include the parseWAF processor in your transformer. If you use this processor, it must be the first processor in your transformer. */
  parseWAF?: any;
  /** Use this parameter to include the renameKeys processor in your transformer. */
  renameKeys?: any;
  /** Use this parameter to include the splitString processor in your transformer. */
  splitString?: any;
  /** Use this parameter to include the substituteString processor in your transformer. */
  substituteString?: any;
  /** Use this parameter to include the trimString processor in your transformer. */
  trimString?: any;
  /** Use this parameter to include the typeConverter processor in your transformer. */
  typeConverter?: any;
  /** Use this parameter to include the upperCaseString processor in your transformer. */
  upperCaseString?: any;
}

export interface SuppressionPeriod {
  /** Specifies the number of seconds, minutes or hours to suppress this anomaly. There is no maximum. */
  value?: number;
  /** Specifies whether the value of value is in seconds, minutes, or hours. */
  suppressionUnit?: 'SECONDS' | 'MINUTES' | 'HOURS';
}

export interface AssociateKmsKeyInput {
  /** The Amazon Resource Name (ARN) of the KMS key to use when encrypting log data. This must be a symmetric KMS key. For more information, see Amazon Resource Names and Using Symmetric and Asymmetric Keys */
  kmsKeyId: string;
  /** The name of the log group. In your AssociateKmsKey operation, you must specify either the resourceIdentifier parameter or the logGroup parameter, but you can't specify both. */
  logGroupName?: string;
  /** Specifies the target for this operation. You must specify one of the following: Specify the following ARN to have future GetQueryResults operations in this account encrypt the results with the specifi */
  resourceIdentifier?: string;
}

export interface AssociateSourceToS3TableIntegrationInput {
  /** The data source to associate with the S3 Table Integration. Contains the name and type of the data source. */
  dataSource: DataSource;
  /** The Amazon Resource Name (ARN) of the S3 Table Integration to associate the data source with. */
  integrationArn: string;
}

export interface CancelExportTaskInput {
  /** The ID of the export task. */
  taskId: string;
}

export interface CancelImportTaskInput {
  /** The ID of the import task to cancel. */
  importId: string;
}

export interface CreateDeliveryInput {
  /** The ARN of the delivery destination to use for this delivery. */
  deliveryDestinationArn: string;
  /** The name of the delivery source to use for this delivery. */
  deliverySourceName: string;
  /** The field delimiter to use between record fields when the final output format of a delivery is in Plain, W3C, or Raw format. */
  fieldDelimiter?: string;
  /** The list of record fields to be delivered to the destination, in order. If the delivery's log source has mandatory fields, they must be included in this list. */
  recordFields?: string[];
  /** This structure contains parameters that are valid only when the delivery's delivery destination is an S3 bucket. */
  s3DeliveryConfiguration?: S3DeliveryConfiguration;
  /** An optional list of key-value pairs to associate with the resource. For more information about tagging, see Tagging Amazon Web Services resources */
  tags?: Record<string, string>;
}

export interface CreateExportTaskInput {
  /** The name of S3 bucket for the exported log data. The bucket must be in the same Amazon Web Services Region. */
  destination: string;
  /** The start time of the range for the request, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC. Events with a timestamp earlier than this time are not exported. */
  from: number;
  /** The name of the log group. */
  logGroupName: string;
  /** The end time of the range for the request, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC. Events with a timestamp later than this time are not exported. You must specify a tim */
  to: number;
  /** The prefix used as the start of the key for every object exported. If you don't specify a value, the default is exportedlogs. The length of this parameter must comply with the S3 object key name lengt */
  destinationPrefix?: string;
  /** Export only log streams that match the provided prefix. If you don't specify a value, no prefix filter is applied. */
  logStreamNamePrefix?: string;
  /** The name of the export task. */
  taskName?: string;
}

export interface CreateImportTaskInput {
  /** The ARN of the IAM role that grants CloudWatch Logs permission to import from the CloudTrail Lake Event Data Store. */
  importRoleArn: string;
  /** The ARN of the source to import from. */
  importSourceArn: string;
  /** Optional filters to constrain the import by CloudTrail event time. Times are specified in Unix timestamp milliseconds. The range of data being imported must be within the specified source's retention  */
  importFilter?: ImportFilter;
}

export interface CreateLogAnomalyDetectorInput {
  /** An array containing the ARN of the log group that this anomaly detector will watch. You can specify only one log group ARN. */
  logGroupArnList: string[];
  /** The number of days to have visibility on an anomaly. After this time period has elapsed for an anomaly, it will be automatically baselined and the anomaly detector will treat new occurrences of a simi */
  anomalyVisibilityTime?: number;
  /** A name for this anomaly detector. */
  detectorName?: string;
  /** Specifies how often the anomaly detector is to run and look for anomalies. Set this value according to the frequency that the log group receives new logs. For example, if the log group receives new lo */
  evaluationFrequency?: 'ONE_MIN' | 'FIVE_MIN' | 'TEN_MIN' | 'FIFTEEN_MIN' | 'THIRTY_MIN' | 'ONE_HOUR';
  /** You can use this parameter to limit the anomaly detection model to examine only log events that match the pattern you specify here. For more information, see Filter and Pattern Syntax. */
  filterPattern?: string;
  /** Optionally assigns a KMS key to secure this anomaly detector and its findings. If a key is assigned, the anomalies found and the model used by this detector are encrypted at rest with the key. If a ke */
  kmsKeyId?: string;
  /** An optional list of key-value pairs to associate with the resource. For more information about tagging, see Tagging Amazon Web Services resources */
  tags?: Record<string, string>;
}

export interface CreateLogGroupInput {
  /** A name for the log group. */
  logGroupName: string;
  /** Use this parameter to enable deletion protection for the new log group. When enabled on a log group, deletion protection blocks all deletion operations until it is explicitly disabled. By default log  */
  deletionProtectionEnabled?: boolean;
  /** The Amazon Resource Name (ARN) of the KMS key to use when encrypting log data. For more information, see Amazon Resource Names. */
  kmsKeyId?: string;
  /** Use this parameter to specify the log group class for this log group. There are three classes: The Standard log class supports all CloudWatch Logs features. The Infrequent Access log class supports a  */
  logGroupClass?: 'STANDARD' | 'INFREQUENT_ACCESS' | 'DELIVERY';
  /** The key-value pairs to use for the tags. You can grant users access to certain log groups while preventing them from accessing other log groups. To do so, tag your groups and use IAM policies that ref */
  tags?: Record<string, string>;
}

export interface CreateLogStreamInput {
  /** The name of the log group. */
  logGroupName: string;
  /** The name of the log stream. */
  logStreamName: string;
}

export interface CreateScheduledQueryInput {
  /** The ARN of the IAM role that grants permissions to execute the query and deliver results to the specified destination. The role must have permissions to read from the specified log groups and write to */
  executionRoleArn: string;
  /** The name of the scheduled query. The name must be unique within your account and region. Valid characters are alphanumeric characters, hyphens, underscores, and periods. Length must be between 1 and 2 */
  name: string;
  /** The query language to use for the scheduled query. Valid values are LogsQL, PPL, and SQL. */
  queryLanguage: 'CWLI' | 'SQL' | 'PPL';
  /** The query string to execute. This is the same query syntax used in CloudWatch Logs Insights. Maximum length is 10,000 characters. */
  queryString: string;
  /** A cron expression that defines when the scheduled query runs. The expression uses standard cron syntax and supports minute-level precision. Maximum length is 256 characters. */
  scheduleExpression: string;
  /** An optional description for the scheduled query to help identify its purpose and functionality. */
  description?: string;
  /** Configuration for where to deliver query results. Currently supports Amazon S3 destinations for storing query output. */
  destinationConfiguration?: DestinationConfiguration;
  /** An array of log group names or ARNs to query. You can specify between 1 and 50 log groups. Log groups can be identified by name or full ARN. */
  logGroupIdentifiers?: string[];
  /** The end time for the scheduled query in Unix epoch format. The query will stop executing after this time. */
  scheduleEndTime?: number;
  /** The start time for the scheduled query in Unix epoch format. The query will not execute before this time. */
  scheduleStartTime?: number;
  /** The time offset in seconds that defines the lookback period for the query. This determines how far back in time the query searches from the execution time. */
  startTimeOffset?: number;
  /** The initial state of the scheduled query. Valid values are ENABLED and DISABLED. Default is ENABLED. */
  state?: 'ENABLED' | 'DISABLED';
  /** Key-value pairs to associate with the scheduled query for resource management and cost allocation. */
  tags?: Record<string, string>;
  /** The timezone for evaluating the schedule expression. This determines when the scheduled query executes relative to the specified timezone. */
  timezone?: string;
}

export interface DeleteAccountPolicyInput {
  /** The name of the policy to delete. */
  policyName: string;
  /** The type of policy to delete. */
  policyType: 'DATA_PROTECTION_POLICY' | 'SUBSCRIPTION_FILTER_POLICY' | 'FIELD_INDEX_POLICY' | 'TRANSFORMER_POLICY' | 'METRIC_EXTRACTION_POLICY';
}

export interface DeleteDataProtectionPolicyInput {
  /** The name or ARN of the log group that you want to delete the data protection policy for. */
  logGroupIdentifier: string;
}

export interface DeleteDeliveryInput {
  /** The unique ID of the delivery to delete. You can find the ID of a delivery with the DescribeDeliveries operation. */
  id: string;
}

export interface DeleteDeliveryDestinationInput {
  /** The name of the delivery destination that you want to delete. You can find a list of delivery destination names by using the DescribeDeliveryDestinations operation. */
  name: string;
}

export interface DeleteDeliveryDestinationPolicyInput {
  /** The name of the delivery destination that you want to delete the policy for. */
  deliveryDestinationName: string;
}

export interface DeleteDeliverySourceInput {
  /** The name of the delivery source that you want to delete. */
  name: string;
}

export interface DeleteDestinationInput {
  /** The name of the destination. */
  destinationName: string;
}

export interface DeleteIndexPolicyInput {
  /** The log group to delete the index policy for. You can specify either the name or the ARN of the log group. */
  logGroupIdentifier: string;
}

export interface DeleteIntegrationInput {
  /** The name of the integration to delete. To find the name of your integration, use ListIntegrations. */
  integrationName: string;
  /** Specify true to force the deletion of the integration even if vended logs dashboards currently exist. The default is false. */
  force?: boolean;
}

export interface DeleteLogAnomalyDetectorInput {
  /** The ARN of the anomaly detector to delete. You can find the ARNs of log anomaly detectors in your account by using the ListLogAnomalyDetectors operation. */
  anomalyDetectorArn: string;
}

export interface DeleteLogGroupInput {
  /** The name of the log group. */
  logGroupName: string;
}

export interface DeleteLogStreamInput {
  /** The name of the log group. */
  logGroupName: string;
  /** The name of the log stream. */
  logStreamName: string;
}

export interface DeleteMetricFilterInput {
  /** The name of the metric filter. */
  filterName: string;
  /** The name of the log group. */
  logGroupName: string;
}

export interface DeleteQueryDefinitionInput {
  /** The ID of the query definition that you want to delete. You can use DescribeQueryDefinitions to retrieve the IDs of your saved query definitions. */
  queryDefinitionId: string;
}

export interface DeleteResourcePolicyInput {
  /** The expected revision ID of the resource policy. Required when deleting a resource-scoped policy to prevent concurrent modifications. */
  expectedRevisionId?: string;
  /** The name of the policy to be revoked. This parameter is required. */
  policyName?: string;
  /** The ARN of the CloudWatch Logs resource for which the resource policy needs to be deleted */
  resourceArn?: string;
}

export interface DeleteRetentionPolicyInput {
  /** The name of the log group. */
  logGroupName: string;
}

export interface DeleteScheduledQueryInput {
  /** The ARN or name of the scheduled query to delete. */
  identifier: string;
}

export interface DeleteSubscriptionFilterInput {
  /** The name of the subscription filter. */
  filterName: string;
  /** The name of the log group. */
  logGroupName: string;
}

export interface DeleteTransformerInput {
  /** Specify either the name or ARN of the log group to delete the transformer for. If the log group is in a source account and you are using a monitoring account, you must use the log group ARN. */
  logGroupIdentifier: string;
}

export interface DescribeAccountPoliciesInput {
  /** Use this parameter to limit the returned policies to only the policies that match the policy type that you specify. */
  policyType: 'DATA_PROTECTION_POLICY' | 'SUBSCRIPTION_FILTER_POLICY' | 'FIELD_INDEX_POLICY' | 'TRANSFORMER_POLICY' | 'METRIC_EXTRACTION_POLICY';
  /** If you are using an account that is set up as a monitoring account for CloudWatch unified cross-account observability, you can use this to specify the account ID of a source account. If you do, the op */
  accountIdentifiers?: string[];
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  nextToken?: string;
  /** Use this parameter to limit the returned policies to only the policy with the name that you specify. */
  policyName?: string;
}

export interface DescribeConfigurationTemplatesInput {
  /** Use this parameter to filter the response to include only the configuration templates that apply to the delivery destination types that you specify here. */
  deliveryDestinationTypes?: 'S3' | 'CWL' | 'FH' | 'XRAY'[];
  /** Use this parameter to limit the number of configuration templates that are returned in the response. */
  limit?: number;
  /** Use this parameter to filter the response to include only the configuration templates that apply to the log types that you specify here. */
  logTypes?: string[];
  nextToken?: string;
  /** Use this parameter to filter the response to include only the configuration templates that apply to the resource types that you specify here. */
  resourceTypes?: string[];
  /** Use this parameter to filter the response to include only the configuration templates that apply to the Amazon Web Services service that you specify here. */
  service?: string;
}

export interface DescribeDeliveriesInput {
  /** Optionally specify the maximum number of deliveries to return in the response. */
  limit?: number;
  nextToken?: string;
}

export interface DescribeDeliveryDestinationsInput {
  /** Optionally specify the maximum number of delivery destinations to return in the response. */
  limit?: number;
  nextToken?: string;
}

export interface DescribeDeliverySourcesInput {
  /** Optionally specify the maximum number of delivery sources to return in the response. */
  limit?: number;
  nextToken?: string;
}

export interface DescribeDestinationsInput {
  /** The prefix to match. If you don't specify a value, no prefix filter is applied. */
  DestinationNamePrefix?: string;
  /** The maximum number of items returned. If you don't specify a value, the default maximum value of 50 items is used. */
  limit?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  nextToken?: string;
}

export interface DescribeExportTasksInput {
  /** The maximum number of items returned. If you don't specify a value, the default is up to 50 items. */
  limit?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  nextToken?: string;
  /** The status code of the export task. Specifying a status code filters the results to zero or more export tasks. */
  statusCode?: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'PENDING_CANCEL' | 'RUNNING';
  /** The ID of the export task. Specifying a task ID filters the results to one or zero export tasks. */
  taskId?: string;
}

export interface DescribeFieldIndexesInput {
  /** An array containing the names or ARNs of the log groups that you want to retrieve field indexes for. */
  logGroupIdentifiers: string[];
  nextToken?: string;
}

export interface DescribeImportTaskBatchesInput {
  /** The ID of the import task to get batch information for. */
  importId: string;
  /** Optional filter to list import batches by their status. Accepts multiple status values: IN_PROGRESS, CANCELLED, COMPLETED and FAILED. */
  batchImportStatus?: 'IN_PROGRESS' | 'CANCELLED' | 'COMPLETED' | 'FAILED'[];
  /** The maximum number of import batches to return in the response. Default: 10 */
  limit?: number;
  /** The pagination token for the next set of results. */
  nextToken?: string;
}

export interface DescribeImportTasksInput {
  /** Optional filter to describe a specific import task by its ID. */
  importId?: string;
  /** Optional filter to list imports from a specific source */
  importSourceArn?: string;
  /** Optional filter to list imports by their status. Valid values are IN_PROGRESS, CANCELLED, COMPLETED and FAILED. */
  importStatus?: 'IN_PROGRESS' | 'CANCELLED' | 'COMPLETED' | 'FAILED';
  /** The maximum number of import tasks to return in the response. Default: 50 */
  limit?: number;
  /** The pagination token for the next set of results. */
  nextToken?: string;
}

export interface DescribeIndexPoliciesInput {
  /** An array containing the name or ARN of the log group that you want to retrieve field index policies for. */
  logGroupIdentifiers: string[];
  nextToken?: string;
}

export interface DescribeLogGroupsInput {
  /** When includeLinkedAccounts is set to true, use this parameter to specify the list of accounts to search. You can specify as many as 20 account IDs in the array. */
  accountIdentifiers?: string[];
  /** If you are using a monitoring account, set this to true to have the operation return log groups in the accounts listed in accountIdentifiers. If this parameter is set to true and accountIdentifiers co */
  includeLinkedAccounts?: boolean;
  /** The maximum number of items returned. If you don't specify a value, the default is up to 50 items. */
  limit?: number;
  /** Use this parameter to limit the results to only those log groups in the specified log group class. If you omit this parameter, log groups of all classes can be returned. Specifies the log group class  */
  logGroupClass?: 'STANDARD' | 'INFREQUENT_ACCESS' | 'DELIVERY';
  /** Use this array to filter the list of log groups returned. If you specify this parameter, the only other filter that you can choose to specify is includeLinkedAccounts. If you are using this operation  */
  logGroupIdentifiers?: string[];
  /** If you specify a string for this parameter, the operation returns only log groups that have names that match the string based on a case-sensitive substring search. For example, if you specify DataLogs */
  logGroupNamePattern?: string;
  /** The prefix to match. logGroupNamePrefix and logGroupNamePattern are mutually exclusive. Only one of these parameters can be passed. */
  logGroupNamePrefix?: string;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  nextToken?: string;
}

export interface DescribeLogStreamsInput {
  /** If the value is true, results are returned in descending order. If the value is to false, results are returned in ascending order. The default value is false. */
  descending?: boolean;
  /** The maximum number of items returned. If you don't specify a value, the default is up to 50 items. */
  limit?: number;
  /** Specify either the name or ARN of the log group to view. If the log group is in a source account and you are using a monitoring account, you must use the log group ARN. You must include either logGrou */
  logGroupIdentifier?: string;
  /** The name of the log group. You must include either logGroupIdentifier or logGroupName, but not both. */
  logGroupName?: string;
  /** The prefix to match. If orderBy is LastEventTime, you cannot specify this parameter. */
  logStreamNamePrefix?: string;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  nextToken?: string;
  /** If the value is LogStreamName, the results are ordered by log stream name. If the value is LastEventTime, the results are ordered by the event time. The default value is LogStreamName. If you order th */
  orderBy?: 'LogStreamName' | 'LastEventTime';
}

export interface DescribeMetricFiltersInput {
  /** The prefix to match. CloudWatch Logs uses the value that you set here only if you also include the logGroupName parameter in your request. */
  filterNamePrefix?: string;
  /** The maximum number of items returned. If you don't specify a value, the default is up to 50 items. */
  limit?: number;
  /** The name of the log group. */
  logGroupName?: string;
  /** Filters results to include only those with the specified metric name. If you include this parameter in your request, you must also include the metricNamespace parameter. */
  metricName?: string;
  /** Filters results to include only those in the specified namespace. If you include this parameter in your request, you must also include the metricName parameter. */
  metricNamespace?: string;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  nextToken?: string;
}

export interface DescribeQueriesInput {
  /** Limits the returned queries to only those for the specified log group. */
  logGroupName?: string;
  /** Limits the number of returned queries to the specified number. */
  maxResults?: number;
  nextToken?: string;
  /** Limits the returned queries to only the queries that use the specified query language. */
  queryLanguage?: 'CWLI' | 'SQL' | 'PPL';
  /** Limits the returned queries to only those that have the specified status. Valid values are Cancelled, Complete, Failed, Running, and Scheduled. */
  status?: 'Scheduled' | 'Running' | 'Complete' | 'Failed' | 'Cancelled' | 'Timeout' | 'Unknown';
}

export interface DescribeQueryDefinitionsInput {
  /** Limits the number of returned query definitions to the specified number. */
  maxResults?: number;
  nextToken?: string;
  /** Use this parameter to filter your results to only the query definitions that have names that start with the prefix you specify. */
  queryDefinitionNamePrefix?: string;
  /** The query language used for this query. For more information about the query languages that CloudWatch Logs supports, see Supported query languages. */
  queryLanguage?: 'CWLI' | 'SQL' | 'PPL';
}

export interface DescribeResourcePoliciesInput {
  /** The maximum number of resource policies to be displayed with one call of this API. */
  limit?: number;
  nextToken?: string;
  /** Specifies the scope of the resource policy. Valid values are ACCOUNT or RESOURCE. When not specified, defaults to ACCOUNT. */
  policyScope?: 'ACCOUNT' | 'RESOURCE';
  /** The ARN of the CloudWatch Logs resource for which to query the resource policy. */
  resourceArn?: string;
}

export interface DescribeSubscriptionFiltersInput {
  /** The name of the log group. */
  logGroupName: string;
  /** The prefix to match. If you don't specify a value, no prefix filter is applied. */
  filterNamePrefix?: string;
  /** The maximum number of items returned. If you don't specify a value, the default is up to 50 items. */
  limit?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  nextToken?: string;
}

export interface DisassociateKmsKeyInput {
  /** The name of the log group. In your DisassociateKmsKey operation, you must specify either the resourceIdentifier parameter or the logGroup parameter, but you can't specify both. */
  logGroupName?: string;
  /** Specifies the target for this operation. You must specify one of the following: Specify the ARN of a log group to stop having CloudWatch Logs use the KMS key to encrypt log events that are ingested an */
  resourceIdentifier?: string;
}

export interface DisassociateSourceFromS3TableIntegrationInput {
  /** The unique identifier of the association to remove between the data source and S3 Table Integration. */
  identifier: string;
}

export interface FilterLogEventsInput {
  /** The end of the time range, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC. Events with a timestamp later than this time are not returned. */
  endTime?: number;
  /** The filter pattern to use. For more information, see Filter and Pattern Syntax. If not provided, all the events are matched. */
  filterPattern?: string;
  /** If the value is true, the operation attempts to provide responses that contain events from multiple log streams within the log group, interleaved in a single response. If the value is false, all the m */
  interleaved?: boolean;
  /** The maximum number of events to return. The default is 10,000 events. */
  limit?: number;
  /** Specify either the name or ARN of the log group to view log events from. If the log group is in a source account and you are using a monitoring account, you must use the log group ARN. You must includ */
  logGroupIdentifier?: string;
  /** The name of the log group to search. You must include either logGroupIdentifier or logGroupName, but not both. */
  logGroupName?: string;
  /** Filters the results to include only events from log streams that have names starting with this prefix. If you specify a value for both logStreamNamePrefix and logStreamNames, the action returns an Inv */
  logStreamNamePrefix?: string;
  /** Filters the results to only logs from the log streams in this list. If you specify a value for both logStreamNames and logStreamNamePrefix, the action returns an InvalidParameterException error. */
  logStreamNames?: string[];
  /** The token for the next set of events to return. (You received this token from a previous call.) */
  nextToken?: string;
  /** The start of the time range, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC. Events with a timestamp before this time are not returned. */
  startTime?: number;
  /** Specify true to display the log event fields with all sensitive data unmasked and visible. The default is false. To use this operation with this parameter, you must be signed into an account with the  */
  unmask?: boolean;
}

export interface GetDataProtectionPolicyInput {
  /** The name or ARN of the log group that contains the data protection policy that you want to see. */
  logGroupIdentifier: string;
}

export interface GetDeliveryInput {
  /** The ID of the delivery that you want to retrieve. */
  id: string;
}

export interface GetDeliveryDestinationInput {
  /** The name of the delivery destination that you want to retrieve. */
  name: string;
}

export interface GetDeliveryDestinationPolicyInput {
  /** The name of the delivery destination that you want to retrieve the policy of. */
  deliveryDestinationName: string;
}

export interface GetDeliverySourceInput {
  /** The name of the delivery source that you want to retrieve. */
  name: string;
}

export interface GetIntegrationInput {
  /** The name of the integration that you want to find information about. To find the name of your integration, use ListIntegrations */
  integrationName: string;
}

export interface GetLogAnomalyDetectorInput {
  /** The ARN of the anomaly detector to retrieve information about. You can find the ARNs of log anomaly detectors in your account by using the ListLogAnomalyDetectors operation. */
  anomalyDetectorArn: string;
}

export interface GetLogEventsInput {
  /** The name of the log stream. */
  logStreamName: string;
  /** The end of the time range, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC. Events with a timestamp equal to or later than this time are not included. */
  endTime?: number;
  /** The maximum number of log events returned. If you don't specify a limit, the default is as many log events as can fit in a response size of 1 MB (up to 10,000 log events). */
  limit?: number;
  /** Specify either the name or ARN of the log group to view events from. If the log group is in a source account and you are using a monitoring account, you must use the log group ARN. You must include ei */
  logGroupIdentifier?: string;
  /** The name of the log group. You must include either logGroupIdentifier or logGroupName, but not both. */
  logGroupName?: string;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  nextToken?: string;
  /** If the value is true, the earliest log events are returned first. If the value is false, the latest log events are returned first. The default value is false. If you are using a previous nextForwardTo */
  startFromHead?: boolean;
  /** The start of the time range, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC. Events with a timestamp equal to this time or later than this time are included. Events with a time */
  startTime?: number;
  /** Specify true to display the log event fields with all sensitive data unmasked and visible. The default is false. To use this operation with this parameter, you must be signed into an account with the  */
  unmask?: boolean;
}

export interface GetLogFieldsInput {
  /** The name of the data source to retrieve log fields for. */
  dataSourceName: string;
  /** The type of the data source to retrieve log fields for. */
  dataSourceType: string;
}

export interface GetLogGroupFieldsInput {
  /** Specify either the name or ARN of the log group to view. If the log group is in a source account and you are using a monitoring account, you must specify the ARN. You must include either logGroupIdent */
  logGroupIdentifier?: string;
  /** The name of the log group to search. You must include either logGroupIdentifier or logGroupName, but not both. */
  logGroupName?: string;
  /** The time to set as the center of the query. If you specify time, the 8 minutes before and 8 minutes after this time are searched. If you omit time, the most recent 15 minutes up to the current time ar */
  time?: number;
}

/** The parameters for the GetLogObject operation. */
export interface GetLogObjectInput {
  /** A pointer to the specific log object to retrieve. This is a required parameter that uniquely identifies the log object within CloudWatch Logs. The pointer is typically obtained from a previous query o */
  logObjectPointer: string;
  /** A boolean flag that indicates whether to unmask sensitive log data. When set to true, any masked or redacted data in the log object will be displayed in its original form. Default is false. */
  unmask?: boolean;
}

export interface GetLogRecordInput {
  /** The pointer corresponding to the log event record you want to retrieve. You get this from the response of a GetQueryResults operation. In that response, the value of the @ptr field for a log event is  */
  logRecordPointer: string;
  /** Specify true to display the log event fields with all sensitive data unmasked and visible. The default is false. To use this operation with this parameter, you must be signed into an account with the  */
  unmask?: boolean;
}

export interface GetQueryResultsInput {
  /** The ID number of the query. */
  queryId: string;
}

export interface GetScheduledQueryInput {
  /** The ARN or name of the scheduled query to retrieve. */
  identifier: string;
}

export interface GetScheduledQueryHistoryInput {
  /** The end time for the history query in Unix epoch format. */
  endTime: number;
  /** The ARN or name of the scheduled query to retrieve history for. */
  identifier: string;
  /** The start time for the history query in Unix epoch format. */
  startTime: number;
  /** An array of execution statuses to filter the history results. Only executions with the specified statuses are returned. */
  executionStatuses?: 'Running' | 'InvalidQuery' | 'Complete' | 'Failed' | 'Timeout'[];
  /** The maximum number of history records to return. Valid range is 1 to 1000. */
  maxResults?: number;
  nextToken?: string;
}

export interface GetTransformerInput {
  /** Specify either the name or ARN of the log group to return transformer information for. If the log group is in a source account and you are using a monitoring account, you must use the log group ARN. */
  logGroupIdentifier: string;
}

export interface ListAggregateLogGroupSummariesInput {
  /** Specifies how to group the log groups in the summary. */
  groupBy: 'DATA_SOURCE_NAME_TYPE_AND_FORMAT' | 'DATA_SOURCE_NAME_AND_TYPE';
  /** When includeLinkedAccounts is set to true, use this parameter to specify the list of accounts to search. You can specify as many as 20 account IDs in the array. */
  accountIdentifiers?: string[];
  /** Filters the results by data source characteristics to include only log groups associated with the specified data sources. */
  dataSources?: DataSourceFilter[];
  /** If you are using a monitoring account, set this to true to have the operation return log groups in the accounts listed in accountIdentifiers. If this parameter is set to true and accountIdentifiers co */
  includeLinkedAccounts?: boolean;
  /** The maximum number of aggregated summaries to return. If you omit this parameter, the default is up to 50 aggregated summaries. */
  limit?: number;
  /** Filters the results by log group class to include only log groups of the specified class. */
  logGroupClass?: 'STANDARD' | 'INFREQUENT_ACCESS' | 'DELIVERY';
  /** Use this parameter to limit the returned log groups to only those with names that match the pattern that you specify. This parameter is a regular expression that can match prefixes and substrings, and */
  logGroupNamePattern?: string;
  nextToken?: string;
}

export interface ListAnomaliesInput {
  /** Use this to optionally limit the results to only the anomalies found by a certain anomaly detector. */
  anomalyDetectorArn?: string;
  /** The maximum number of items to return. If you don't specify a value, the default maximum value of 50 items is used. */
  limit?: number;
  nextToken?: string;
  /** You can specify this parameter if you want to the operation to return only anomalies that are currently either suppressed or unsuppressed. */
  suppressionState?: 'SUPPRESSED' | 'UNSUPPRESSED';
}

export interface ListIntegrationsInput {
  /** To limit the results to integrations that start with a certain name prefix, specify that name prefix here. */
  integrationNamePrefix?: string;
  /** To limit the results to integrations with a certain status, specify that status here. */
  integrationStatus?: 'PROVISIONING' | 'ACTIVE' | 'FAILED';
  /** To limit the results to integrations of a certain type, specify that type here. */
  integrationType?: 'OPENSEARCH';
}

export interface ListLogAnomalyDetectorsInput {
  /** Use this to optionally filter the results to only include anomaly detectors that are associated with the specified log group. */
  filterLogGroupArn?: string;
  /** The maximum number of items to return. If you don't specify a value, the default maximum value of 50 items is used. */
  limit?: number;
  nextToken?: string;
}

export interface ListLogGroupsInput {
  /** When includeLinkedAccounts is set to true, use this parameter to specify the list of accounts to search. You can specify as many as 20 account IDs in the array. */
  accountIdentifiers?: string[];
  /** An array of data source filters to filter log groups by their associated data sources. You can filter by data source name, type, or both. Multiple filters within the same dimension are combined with O */
  dataSources?: DataSourceFilter[];
  /** An array of field index names to filter log groups that have specific field indexes. Only log groups containing all specified field indexes are returned. You can specify 1 to 20 field index names, eac */
  fieldIndexNames?: string[];
  /** If you are using a monitoring account, set this to true to have the operation return log groups in the accounts listed in accountIdentifiers. If this parameter is set to true and accountIdentifiers co */
  includeLinkedAccounts?: boolean;
  /** The maximum number of log groups to return. If you omit this parameter, the default is up to 50 log groups. */
  limit?: number;
  /** Use this parameter to limit the results to only those log groups in the specified log group class. If you omit this parameter, log groups of all classes can be returned. */
  logGroupClass?: 'STANDARD' | 'INFREQUENT_ACCESS' | 'DELIVERY';
  /** Use this parameter to limit the returned log groups to only those with names that match the pattern that you specify. This parameter is a regular expression that can match prefixes and substrings, and */
  logGroupNamePattern?: string;
  nextToken?: string;
}

export interface ListLogGroupsForQueryInput {
  /** The ID of the query to use. This query ID is from the response to your StartQuery operation. */
  queryId: string;
  /** Limits the number of returned log groups to the specified number. */
  maxResults?: number;
  nextToken?: string;
}

export interface ListScheduledQueriesInput {
  /** The maximum number of scheduled queries to return. Valid range is 1 to 1000. */
  maxResults?: number;
  nextToken?: string;
  /** Filter scheduled queries by state. Valid values are ENABLED and DISABLED. If not specified, all scheduled queries are returned. */
  state?: 'ENABLED' | 'DISABLED';
}

export interface ListSourcesForS3TableIntegrationInput {
  /** The Amazon Resource Name (ARN) of the S3 Table Integration to list associations for. */
  integrationArn: string;
  /** The maximum number of associations to return in a single call. Valid range is 1 to 100. */
  maxResults?: number;
  nextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The ARN of the resource that you want to view tags for. The ARN format of a log group is arn:aws:logs:Region:account-id:log-group:log-group-name The ARN format of a destination is arn:aws:logs:Region: */
  resourceArn: string;
}

export interface ListTagsLogGroupInput {
  /** The name of the log group. */
  logGroupName: string;
}

export interface PutAccountPolicyInput {
  /** Specify the policy, in JSON. Data protection policy A data protection policy must include two JSON blocks: The first block must include both a DataIdentifer array and an Operation property with an Aud */
  policyDocument: string;
  /** A name for the policy. This must be unique within the account and cannot start with aws/. */
  policyName: string;
  /** The type of policy that you're creating or updating. */
  policyType: 'DATA_PROTECTION_POLICY' | 'SUBSCRIPTION_FILTER_POLICY' | 'FIELD_INDEX_POLICY' | 'TRANSFORMER_POLICY' | 'METRIC_EXTRACTION_POLICY';
  /** Currently the only valid value for this parameter is ALL, which specifies that the data protection policy applies to all log groups in the account. If you omit this parameter, the default of ALL is us */
  scope?: 'ALL';
  /** Use this parameter to apply the new policy to a subset of log groups in the account or a data source name and type combination. Specifying selectionCriteria is valid only when you specify SUBSCRIPTION */
  selectionCriteria?: string;
}

export interface PutDataProtectionPolicyInput {
  /** Specify either the log group name or log group ARN. */
  logGroupIdentifier: string;
  /** Specify the data protection policy, in JSON. This policy must include two JSON blocks: The first block must include both a DataIdentifer array and an Operation property with an Audit action. The DataI */
  policyDocument: string;
}

export interface PutDeliveryDestinationInput {
  /** A name for this delivery destination. This name must be unique for all delivery destinations in your account. */
  name: string;
  /** A structure that contains the ARN of the Amazon Web Services resource that will receive the logs. deliveryDestinationConfiguration is required for CloudWatch Logs, Amazon S3, Firehose log delivery des */
  deliveryDestinationConfiguration?: DeliveryDestinationConfiguration;
  /** The type of delivery destination. This parameter specifies the target service where log data will be delivered. Valid values include: S3 - Amazon S3 for long-term storage and analytics CWL - CloudWatc */
  deliveryDestinationType?: 'S3' | 'CWL' | 'FH' | 'XRAY';
  /** The format for the logs that this delivery destination will receive. */
  outputFormat?: 'json' | 'plain' | 'w3c' | 'raw' | 'parquet';
  /** An optional list of key-value pairs to associate with the resource. For more information about tagging, see Tagging Amazon Web Services resources */
  tags?: Record<string, string>;
}

export interface PutDeliveryDestinationPolicyInput {
  /** The name of the delivery destination to assign this policy to. */
  deliveryDestinationName: string;
  /** The contents of the policy. */
  deliveryDestinationPolicy: string;
}

export interface PutDeliverySourceInput {
  /** Defines the type of log that the source is sending. For Amazon Bedrock Agents, the valid values are APPLICATION_LOGS and EVENT_LOGS. For Amazon Bedrock Knowledge Bases, the valid value is APPLICATION_ */
  logType: string;
  /** A name for this delivery source. This name must be unique for all delivery sources in your account. */
  name: string;
  /** The ARN of the Amazon Web Services resource that is generating and sending logs. For example, arn:aws:workmail:us-east-1:123456789012:organization/m-1234EXAMPLEabcd1234abcd1234abcd1234 */
  resourceArn: string;
  /** An optional list of key-value pairs to associate with the resource. For more information about tagging, see Tagging Amazon Web Services resources */
  tags?: Record<string, string>;
}

export interface PutDestinationInput {
  /** A name for the destination. */
  destinationName: string;
  /** The ARN of an IAM role that grants CloudWatch Logs permissions to call the Amazon Kinesis PutRecord operation on the destination stream. */
  roleArn: string;
  /** The ARN of an Amazon Kinesis stream to which to deliver matching log events. */
  targetArn: string;
  /** An optional list of key-value pairs to associate with the resource. For more information about tagging, see Tagging Amazon Web Services resources */
  tags?: Record<string, string>;
}

export interface PutDestinationPolicyInput {
  /** An IAM policy document that authorizes cross-account users to deliver their log events to the associated destination. This can be up to 5120 bytes. */
  accessPolicy: string;
  /** A name for an existing destination. */
  destinationName: string;
  /** Specify true if you are updating an existing destination policy to grant permission to an organization ID instead of granting permission to individual Amazon Web Services accounts. Before you update a */
  forceUpdate?: boolean;
}

export interface PutIndexPolicyInput {
  /** Specify either the log group name or log group ARN to apply this field index policy to. If you specify an ARN, use the format arn:aws:logs:region:account-id:log-group:log_group_name Don't include an * */
  logGroupIdentifier: string;
  /** The index policy document, in JSON format. The following is an example of an index policy document that creates indexes with different types. "policyDocument": "{"Fields": [ "TransactionId" ], "Fields */
  policyDocument: string;
}

export interface PutIntegrationInput {
  /** A name for the integration. */
  integrationName: string;
  /** The type of integration. Currently, the only supported type is OPENSEARCH. */
  integrationType: 'OPENSEARCH';
  /** A structure that contains configuration information for the integration that you are creating. */
  resourceConfig: { openSearchResourceConfig?: OpenSearchResourceConfig };
}

export interface PutLogEventsInput {
  /** The log events. */
  logEvents: InputLogEvent[];
  /** The name of the log group. */
  logGroupName: string;
  /** The name of the log stream. */
  logStreamName: string;
  /** The entity associated with the log events. */
  entity?: Entity;
  /** The sequence token obtained from the response of the previous PutLogEvents call. The sequenceToken parameter is now ignored in PutLogEvents actions. PutLogEvents actions are now accepted and never ret */
  sequenceToken?: string;
}

export interface PutLogGroupDeletionProtectionInput {
  /** Whether to enable deletion protection. Type: Boolean Required: Yes */
  deletionProtectionEnabled: boolean;
  /** The name or ARN of the log group. Type: String Length Constraints: Minimum length of 1. Maximum length of 512. Pattern: [\.\-_/#A-Za-z0-9]+ Required: Yes */
  logGroupIdentifier: string;
}

export interface PutMetricFilterInput {
  /** A name for the metric filter. */
  filterName: string;
  /** A filter pattern for extracting metric data out of ingested log events. */
  filterPattern: string;
  /** The name of the log group. */
  logGroupName: string;
  /** A collection of information that defines how metric data gets emitted. */
  metricTransformations: MetricTransformation[];
  /** This parameter is valid only for log groups that have an active log transformer. For more information about log transformers, see PutTransformer. If the log group uses either a log-group level or acco */
  applyOnTransformedLogs?: boolean;
  /** A list of system fields to emit as additional dimensions in the generated metrics. Valid values are @aws.account and @aws.region. These dimensions help identify the source of centralized log data and  */
  emitSystemFieldDimensions?: string[];
  /** A filter expression that specifies which log events should be processed by this metric filter based on system fields such as source account and source region. Uses selection criteria syntax with opera */
  fieldSelectionCriteria?: string;
}

export interface PutQueryDefinitionInput {
  /** A name for the query definition. If you are saving numerous query definitions, we recommend that you name them. This way, you can find the ones you want by using the first part of the name as a filter */
  name: string;
  /** The query string to use for this definition. For more information, see CloudWatch Logs Insights Query Syntax. */
  queryString: string;
  /** Used as an idempotency token, to avoid returning an exception if the service receives the same request twice because of a network error. */
  clientToken?: string;
  /** Use this parameter to include specific log groups as part of your query definition. If your query uses the OpenSearch Service query language, you specify the log group names inside the querystring ins */
  logGroupNames?: string[];
  /** If you are updating a query definition, use this parameter to specify the ID of the query definition that you want to update. You can use DescribeQueryDefinitions to retrieve the IDs of your saved que */
  queryDefinitionId?: string;
  /** Specify the query language to use for this query. The options are Logs Insights QL, OpenSearch PPL, and OpenSearch SQL. For more information about the query languages that CloudWatch Logs supports, se */
  queryLanguage?: 'CWLI' | 'SQL' | 'PPL';
}

export interface PutResourcePolicyInput {
  /** The expected revision ID of the resource policy. Required when resourceArn is provided to prevent concurrent modifications. Use null when creating a resource policy for the first time. */
  expectedRevisionId?: string;
  /** Details of the new policy, including the identity of the principal that is enabled to put logs to this account. This is formatted as a JSON string. This parameter is required. The following example cr */
  policyDocument?: string;
  /** Name of the new policy. This parameter is required. */
  policyName?: string;
  /** The ARN of the CloudWatch Logs resource to which the resource policy needs to be added or attached. Currently only supports LogGroup ARN. */
  resourceArn?: string;
}

export interface PutRetentionPolicyInput {
  /** The name of the log group. */
  logGroupName: string;
  retentionInDays: number;
}

export interface PutSubscriptionFilterInput {
  /** The ARN of the destination to deliver matching log events to. Currently, the supported destinations are: An Amazon Kinesis stream belonging to the same account as the subscription filter, for same-acc */
  destinationArn: string;
  /** A name for the subscription filter. If you are updating an existing filter, you must specify the correct name in filterName. To find the name of the filter currently associated with a log group, use D */
  filterName: string;
  /** A filter pattern for subscribing to a filtered stream of log events. */
  filterPattern: string;
  /** The name of the log group. */
  logGroupName: string;
  /** This parameter is valid only for log groups that have an active log transformer. For more information about log transformers, see PutTransformer. If the log group uses either a log-group level or acco */
  applyOnTransformedLogs?: boolean;
  /** The method used to distribute log data to the destination. By default, log data is grouped by log stream, but the grouping can be set to random for a more even distribution. This property is only appl */
  distribution?: 'Random' | 'ByLogStream';
  /** A list of system fields to include in the log events sent to the subscription destination. Valid values are @aws.account and @aws.region. These fields provide source information for centralized log da */
  emitSystemFields?: string[];
  /** A filter expression that specifies which log events should be processed by this subscription filter based on system fields such as source account and source region. Uses selection criteria syntax with */
  fieldSelectionCriteria?: string;
  /** The ARN of an IAM role that grants CloudWatch Logs permissions to deliver ingested log events to the destination stream. You don't need to provide the ARN when you are working with a logical destinati */
  roleArn?: string;
}

export interface PutTransformerInput {
  /** Specify either the name or ARN of the log group to create the transformer for. */
  logGroupIdentifier: string;
  /** This structure contains the configuration of this log transformer. A log transformer is an array of processors, where each processor applies one type of transformation to the log events that are inges */
  transformerConfig: Processor[];
}

export interface StartLiveTailInput {
  /** An array where each item in the array is a log group to include in the Live Tail session. Specify each log group by its ARN. If you specify an ARN, the ARN can't end with an asterisk (*). You can incl */
  logGroupIdentifiers: string[];
  /** An optional pattern to use to filter the results to include only log events that match the pattern. For example, a filter pattern of error 404 causes only log events that include both error and 404 to */
  logEventFilterPattern?: string;
  /** If you specify this parameter, then only log events in the log streams that have names that start with the prefixes that you specify here are included in the Live Tail session. If you specify this fie */
  logStreamNamePrefixes?: string[];
  /** If you specify this parameter, then only log events in the log streams that you specify here are included in the Live Tail session. If you specify this field, you can't also specify the logStreamNameP */
  logStreamNames?: string[];
}

export interface StartQueryInput {
  /** The end of the time range to query. The range is inclusive, so the specified end time is included in the query. Specified as epoch time, the number of seconds since January 1, 1970, 00:00:00 UTC. */
  endTime: number;
  /** The query string to use. For more information, see CloudWatch Logs Insights Query Syntax. */
  queryString: string;
  /** The beginning of the time range to query. The range is inclusive, so the specified start time is included in the query. Specified as epoch time, the number of seconds since January 1, 1970, 00:00:00 U */
  startTime: number;
  /** The maximum number of log events to return in the query. If the query string uses the fields command, only the specified fields and their values are returned. The default is 10,000. */
  limit?: number;
  /** The list of log groups to query. You can include up to 50 log groups. You can specify them by the log group name or ARN. If a log group that you're querying is in a source account and you're using a m */
  logGroupIdentifiers?: string[];
  /** The log group on which to perform the query. A StartQuery operation must include exactly one of the following parameters: logGroupName, logGroupNames, or logGroupIdentifiers. The exception is queries  */
  logGroupName?: string;
  /** The list of log groups to be queried. You can include up to 50 log groups. A StartQuery operation must include exactly one of the following parameters: logGroupName, logGroupNames, or logGroupIdentifi */
  logGroupNames?: string[];
  /** Specify the query language to use for this query. The options are Logs Insights QL, OpenSearch PPL, and OpenSearch SQL. For more information about the query languages that CloudWatch Logs supports, se */
  queryLanguage?: 'CWLI' | 'SQL' | 'PPL';
}

export interface StopQueryInput {
  /** The ID number of the query to stop. To find this ID number, use DescribeQueries. */
  queryId: string;
}

export interface TagLogGroupInput {
  /** The name of the log group. */
  logGroupName: string;
  /** The key-value pairs to use for the tags. */
  tags: Record<string, string>;
}

export interface TagResourceInput {
  /** The ARN of the resource that you're adding tags to. The ARN format of a log group is arn:aws:logs:Region:account-id:log-group:log-group-name The ARN format of a destination is arn:aws:logs:Region:acco */
  resourceArn: string;
  /** The list of key-value pairs to associate with the resource. */
  tags: Record<string, string>;
}

export interface TestMetricFilterInput {
  filterPattern: string;
  /** The log event messages to test. */
  logEventMessages: string[];
}

export interface TestTransformerInput {
  /** An array of the raw log events that you want to use to test this transformer. */
  logEventMessages: string[];
  /** This structure contains the configuration of this log transformer that you want to test. A log transformer is an array of processors, where each processor applies one type of transformation to the log */
  transformerConfig: Processor[];
}

export interface UntagLogGroupInput {
  /** The name of the log group. */
  logGroupName: string;
  /** The tag keys. The corresponding tags are removed from the log group. */
  tags: string[];
}

export interface UntagResourceInput {
  /** The ARN of the CloudWatch Logs resource that you're removing tags from. The ARN format of a log group is arn:aws:logs:Region:account-id:log-group:log-group-name The ARN format of a destination is arn: */
  resourceArn: string;
  /** The list of tag keys to remove from the resource. */
  tagKeys: string[];
}

export interface UpdateAnomalyInput {
  /** The ARN of the anomaly detector that this operation is to act on. */
  anomalyDetectorArn: string;
  /** If you are suppressing or unsuppressing an anomaly, specify its unique ID here. You can find anomaly IDs by using the ListAnomalies operation. */
  anomalyId?: string;
  /** Set this to true to prevent CloudWatch Logs from displaying this behavior as an anomaly in the future. The behavior is then treated as baseline behavior. However, if similar but more severe occurrence */
  baseline?: boolean;
  /** If you are suppressing or unsuppressing an pattern, specify its unique ID here. You can find pattern IDs by using the ListAnomalies operation. */
  patternId?: string;
  /** If you are temporarily suppressing an anomaly or pattern, use this structure to specify how long the suppression is to last. */
  suppressionPeriod?: SuppressionPeriod;
  /** Use this to specify whether the suppression to be temporary or infinite. If you specify LIMITED, you must also specify a suppressionPeriod. If you specify INFINITE, any value for suppressionPeriod is  */
  suppressionType?: 'LIMITED' | 'INFINITE';
}

export interface UpdateDeliveryConfigurationInput {
  /** The ID of the delivery to be updated by this request. */
  id: string;
  /** The field delimiter to use between record fields when the final output format of a delivery is in Plain, W3C, or Raw format. */
  fieldDelimiter?: string;
  /** The list of record fields to be delivered to the destination, in order. If the delivery's log source has mandatory fields, they must be included in this list. */
  recordFields?: string[];
  /** This structure contains parameters that are valid only when the delivery's delivery destination is an S3 bucket. */
  s3DeliveryConfiguration?: S3DeliveryConfiguration;
}

export interface UpdateLogAnomalyDetectorInput {
  /** The ARN of the anomaly detector that you want to update. */
  anomalyDetectorArn: string;
  /** Use this parameter to pause or restart the anomaly detector. */
  enabled: boolean;
  /** The number of days to use as the life cycle of anomalies. After this time, anomalies are automatically baselined and the anomaly detector model will treat new occurrences of similar event as normal. T */
  anomalyVisibilityTime?: number;
  /** Specifies how often the anomaly detector runs and look for anomalies. Set this value according to the frequency that the log group receives new logs. For example, if the log group receives new log eve */
  evaluationFrequency?: 'ONE_MIN' | 'FIVE_MIN' | 'TEN_MIN' | 'FIFTEEN_MIN' | 'THIRTY_MIN' | 'ONE_HOUR';
  filterPattern?: string;
}

export interface UpdateScheduledQueryInput {
  /** The updated ARN of the IAM role that grants permissions to execute the query and deliver results. */
  executionRoleArn: string;
  /** The ARN or name of the scheduled query to update. */
  identifier: string;
  /** The updated query language for the scheduled query. */
  queryLanguage: 'CWLI' | 'SQL' | 'PPL';
  /** The updated query string to execute. */
  queryString: string;
  /** The updated cron expression that defines when the scheduled query runs. */
  scheduleExpression: string;
  /** An updated description for the scheduled query. */
  description?: string;
  /** The updated configuration for where to deliver query results. */
  destinationConfiguration?: DestinationConfiguration;
  /** The updated array of log group names or ARNs to query. */
  logGroupIdentifiers?: string[];
  /** The updated end time for the scheduled query in Unix epoch format. */
  scheduleEndTime?: number;
  /** The updated start time for the scheduled query in Unix epoch format. */
  scheduleStartTime?: number;
  /** The updated time offset in seconds that defines the lookback period for the query. */
  startTimeOffset?: number;
  /** The updated state of the scheduled query. */
  state?: 'ENABLED' | 'DISABLED';
  /** The updated timezone for evaluating the schedule expression. */
  timezone?: string;
}

/** CloudWatch Logs service binding for Step Functions SDK integrations. */
export class CloudWatchLogs {
  constructor() {}

  associateKmsKey<T>(params: AssociateKmsKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateSourceToS3TableIntegration<T>(params: AssociateSourceToS3TableIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelExportTask<T>(params: CancelExportTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelImportTask<T>(params: CancelImportTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDelivery<T>(params: CreateDeliveryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createExportTask<T>(params: CreateExportTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createImportTask<T>(params: CreateImportTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLogAnomalyDetector<T>(params: CreateLogAnomalyDetectorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLogGroup<T>(params: CreateLogGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLogStream<T>(params: CreateLogStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createScheduledQuery<T>(params: CreateScheduledQueryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAccountPolicy<T>(params: DeleteAccountPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDataProtectionPolicy<T>(params: DeleteDataProtectionPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDelivery<T>(params: DeleteDeliveryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDeliveryDestination<T>(params: DeleteDeliveryDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDeliveryDestinationPolicy<T>(params: DeleteDeliveryDestinationPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDeliverySource<T>(params: DeleteDeliverySourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDestination<T>(params: DeleteDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIndexPolicy<T>(params: DeleteIndexPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIntegration<T>(params: DeleteIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLogAnomalyDetector<T>(params: DeleteLogAnomalyDetectorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLogGroup<T>(params: DeleteLogGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLogStream<T>(params: DeleteLogStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteMetricFilter<T>(params: DeleteMetricFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteQueryDefinition<T>(params: DeleteQueryDefinitionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteResourcePolicy<T>(params: DeleteResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRetentionPolicy<T>(params: DeleteRetentionPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteScheduledQuery<T>(params: DeleteScheduledQueryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSubscriptionFilter<T>(params: DeleteSubscriptionFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransformer<T>(params: DeleteTransformerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAccountPolicies<T>(params: DescribeAccountPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConfigurationTemplates<T>(params: DescribeConfigurationTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDeliveries<T>(params: DescribeDeliveriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDeliveryDestinations<T>(params: DescribeDeliveryDestinationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDeliverySources<T>(params: DescribeDeliverySourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDestinations<T>(params: DescribeDestinationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeExportTasks<T>(params: DescribeExportTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFieldIndexes<T>(params: DescribeFieldIndexesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImportTaskBatches<T>(params: DescribeImportTaskBatchesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImportTasks<T>(params: DescribeImportTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIndexPolicies<T>(params: DescribeIndexPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLogGroups<T>(params: DescribeLogGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLogStreams<T>(params: DescribeLogStreamsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMetricFilters<T>(params: DescribeMetricFiltersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeQueries<T>(params: DescribeQueriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeQueryDefinitions<T>(params: DescribeQueryDefinitionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeResourcePolicies<T>(params: DescribeResourcePoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSubscriptionFilters<T>(params: DescribeSubscriptionFiltersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateKmsKey<T>(params: DisassociateKmsKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateSourceFromS3TableIntegration<T>(params: DisassociateSourceFromS3TableIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  filterLogEvents<T>(params: FilterLogEventsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDataProtectionPolicy<T>(params: GetDataProtectionPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDelivery<T>(params: GetDeliveryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDeliveryDestination<T>(params: GetDeliveryDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDeliveryDestinationPolicy<T>(params: GetDeliveryDestinationPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDeliverySource<T>(params: GetDeliverySourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIntegration<T>(params: GetIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLogAnomalyDetector<T>(params: GetLogAnomalyDetectorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLogEvents<T>(params: GetLogEventsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLogFields<T>(params: GetLogFieldsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLogGroupFields<T>(params: GetLogGroupFieldsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLogObject<T>(params: GetLogObjectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLogRecord<T>(params: GetLogRecordInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getQueryResults<T>(params: GetQueryResultsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getScheduledQuery<T>(params: GetScheduledQueryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getScheduledQueryHistory<T>(params: GetScheduledQueryHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTransformer<T>(params: GetTransformerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAggregateLogGroupSummaries<T>(params: ListAggregateLogGroupSummariesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAnomalies<T>(params: ListAnomaliesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listIntegrations<T>(params: ListIntegrationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLogAnomalyDetectors<T>(params: ListLogAnomalyDetectorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLogGroups<T>(params: ListLogGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLogGroupsForQuery<T>(params: ListLogGroupsForQueryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listScheduledQueries<T>(params: ListScheduledQueriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSourcesForS3TableIntegration<T>(params: ListSourcesForS3TableIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsLogGroup<T>(params: ListTagsLogGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putAccountPolicy<T>(params: PutAccountPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDataProtectionPolicy<T>(params: PutDataProtectionPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDeliveryDestination<T>(params: PutDeliveryDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDeliveryDestinationPolicy<T>(params: PutDeliveryDestinationPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDeliverySource<T>(params: PutDeliverySourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDestination<T>(params: PutDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDestinationPolicy<T>(params: PutDestinationPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putIndexPolicy<T>(params: PutIndexPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putIntegration<T>(params: PutIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putLogEvents<T>(params: PutLogEventsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putLogGroupDeletionProtection<T>(params: PutLogGroupDeletionProtectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putMetricFilter<T>(params: PutMetricFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putQueryDefinition<T>(params: PutQueryDefinitionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putResourcePolicy<T>(params: PutResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRetentionPolicy<T>(params: PutRetentionPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putSubscriptionFilter<T>(params: PutSubscriptionFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putTransformer<T>(params: PutTransformerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startLiveTail<T>(params: StartLiveTailInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startQuery<T>(params: StartQueryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopQuery<T>(params: StopQueryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagLogGroup<T>(params: TagLogGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testMetricFilter<T>(params: TestMetricFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testTransformer<T>(params: TestTransformerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagLogGroup<T>(params: UntagLogGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAnomaly<T>(params: UpdateAnomalyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDeliveryConfiguration<T>(params: UpdateDeliveryConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateLogAnomalyDetector<T>(params: UpdateLogAnomalyDetectorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateScheduledQuery<T>(params: UpdateScheduledQueryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
