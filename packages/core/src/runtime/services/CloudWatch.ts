// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface Dimension {
  /** The name of the dimension. Dimension names must contain only ASCII characters, must include at least one non-whitespace character, and cannot start with a colon (:). ASCII control characters are not s */
  Name: string;
  /** The value of the dimension. Dimension values must contain only ASCII characters and must include at least one non-whitespace character. ASCII control characters are not supported as part of dimension  */
  Value: string;
}

export interface SingleMetricAnomalyDetector {
  /** If the CloudWatch metric that provides the time series that the anomaly detector uses as input is in another account, specify that account ID here. If you omit this parameter, the current account is u */
  AccountId?: string;
  /** The namespace of the metric to create the anomaly detection model for. */
  Namespace?: string;
  /** The name of the metric to create the anomaly detection model for. */
  MetricName?: string;
  /** The metric dimensions to create the anomaly detection model for. */
  Dimensions?: any[];
  /** The statistic to use for the metric and anomaly detection model. */
  Stat?: string;
}

export interface MetricMathAnomalyDetector {
  /** An array of metric data query structures that enables you to create an anomaly detector based on the result of a metric math expression. Each item in MetricDataQueries gets a metric or performs a math */
  MetricDataQueries?: any[];
}

export interface MetricDataQuery {
  /** A short name used to tie this object to the results in the response. This name must be unique within a single call to GetMetricData. If you are performing math expressions on this set of data, this na */
  Id: string;
  /** The metric to be returned, along with statistics, period, and units. Use this parameter only if this object is retrieving a metric and not performing a math expression on returned data. Within one Met */
  MetricStat?: any;
  /** This field can contain either a Metrics Insights query, or a metric math expression to be performed on the returned data. For more information about Metrics Insights queries, see Metrics Insights quer */
  Expression?: string;
  /** A human-readable label for this metric or expression. This is especially useful if this is an expression, so that you know what the value represents. If the metric or expression is shown in a CloudWat */
  Label?: string;
  /** When used in GetMetricData, this option indicates whether to return the timestamps and raw data values of this metric. If you are performing this call just to do math expressions and do not also need  */
  ReturnData?: boolean;
  /** The granularity, in seconds, of the returned data points. For metrics with regular resolution, a period can be as short as one minute (60 seconds) and must be a multiple of 60. For high-resolution met */
  Period?: number;
  /** The ID of the account where the metrics are located. If you are performing a GetMetricData operation in a monitoring account, use this to specify which account to retrieve this metric from. If you are */
  AccountId?: string;
}

export interface LabelOptions {
  /** The time zone to use for metric data return in this operation. The format is + or - followed by four digits. The first two digits indicate the number of hours ahead or behind of UTC, and the final two */
  Timezone?: string;
}

export interface DimensionFilter {
  /** The dimension name to be matched. */
  Name: string;
  /** The value of the dimension to be matched. */
  Value?: string;
}

export interface AnomalyDetectorConfiguration {
  /** An array of time ranges to exclude from use when the anomaly detection model is trained. Use this to make sure that events that could cause unusual values for the metric, such as deployments, aren't u */
  ExcludedTimeRanges?: any[];
  /** The time zone to use for the metric. This is useful to enable the model to automatically account for daylight savings time changes if the metric is sensitive to such time changes. To specify a time zo */
  MetricTimezone?: string;
}

export interface MetricCharacteristics {
  /** Set this parameter to true if values for this metric consistently include spikes that should not be considered to be anomalies. With this set to true, CloudWatch will expect to see spikes that occurre */
  PeriodicSpikes?: boolean;
}

export interface Tag {
  /** A string that you can use to assign a value. The combination of tag keys and values can help you organize and categorize your resources. */
  Key: string;
  /** The value for the specified tag key. */
  Value: string;
}

export interface ManagedRule {
  /** The template name for the managed Contributor Insights rule, as returned by ListManagedInsightRules. */
  TemplateName: string;
  /** The ARN of an Amazon Web Services resource that has managed Contributor Insights rules. */
  ResourceARN: string;
  /** A list of key-value pairs that you can associate with a managed Contributor Insights rule. You can associate as many as 50 tags with a rule. Tags can help you organize and categorize your resources. Y */
  Tags?: any[];
}

export interface MetricDatum {
  /** The name of the metric. */
  MetricName: string;
  /** The dimensions associated with the metric. */
  Dimensions?: any[];
  /** The time the metric data was received, expressed as the number of milliseconds since Jan 1, 1970 00:00:00 UTC. */
  Timestamp?: string;
  /** The value for the metric. Although the parameter accepts numbers of type Double, CloudWatch rejects values that are either too small or too large. Values must be in the range of -2^360 to 2^360. In ad */
  Value?: number;
  /** The statistical values for the metric. */
  StatisticValues?: any;
  /** Array of numbers representing the values for the metric during the period. Each unique value is listed just once in this array, and the corresponding number in the Counts array specifies the number of */
  Values?: any[];
  /** Array of numbers that is used along with the Values array. Each number in the Count array is the number of times the corresponding value in the Values array occurred during the period. If you omit the */
  Counts?: any[];
  /** When you are using a Put operation, this defines what unit you want to use when storing the metric. In a Get operation, this displays the unit that is used for the metric. */
  Unit?: 'Seconds' | 'Microseconds' | 'Milliseconds' | 'Bytes' | 'Kilobytes' | 'Megabytes' | 'Gigabytes' | 'Terabytes' | 'Bits' | 'Kilobits' | 'Megabits' | 'Gigabits' | 'Terabits' | 'Percent' | 'Count' | 'Bytes/Second' | 'Kilobytes/Second' | 'Megabytes/Second' | 'Gigabytes/Second' | 'Terabytes/Second' | 'Bits/Second' | 'Kilobits/Second' | 'Megabits/Second' | 'Gigabits/Second' | 'Terabits/Second' | 'Count/Second' | 'None';
  /** Valid values are 1 and 60. Setting this to 1 specifies this metric as a high-resolution metric, so that CloudWatch stores the metric with sub-minute resolution down to one second. Setting this to 60 s */
  StorageResolution?: number;
}

export interface EntityMetricData {
  /** The entity associated with the metrics. */
  Entity?: any;
  /** The metric data. */
  MetricData?: any[];
}

export interface MetricStreamFilter {
  /** The name of the metric namespace for this filter. The namespace can contain only ASCII printable characters (ASCII range 32 through 126). It must contain at least one non-whitespace character. */
  Namespace?: string;
  /** The names of the metrics to either include or exclude from the metric stream. If you omit this parameter, all metrics in the namespace are included or excluded, depending on whether this filter is spe */
  MetricNames?: any[];
}

export interface MetricStreamStatisticsConfiguration {
  /** An array of metric name and namespace pairs that stream the additional statistics listed in the value of the AdditionalStatistics parameter. There can be as many as 100 pairs in the array. All metrics */
  IncludeMetrics: any[];
  /** The list of additional statistics that are to be streamed for the metrics listed in the IncludeMetrics array in this structure. This list can include as many as 20 statistics. If the OutputFormat for  */
  AdditionalStatistics: any[];
}

export interface DeleteAlarmsInput {
  /** The alarms to be deleted. Do not enclose the alarm names in quote marks. */
  AlarmNames: string[];
}

export interface DeleteAnomalyDetectorInput {
  /** The metric dimensions associated with the anomaly detection model to delete. */
  Dimensions?: Dimension[];
  /** The metric math anomaly detector to be deleted. When using MetricMathAnomalyDetector, you cannot include following parameters in the same operation: Dimensions, MetricName Namespace Stat the SingleMet */
  MetricMathAnomalyDetector?: MetricMathAnomalyDetector;
  /** The metric name associated with the anomaly detection model to delete. */
  MetricName?: string;
  /** The namespace associated with the anomaly detection model to delete. */
  Namespace?: string;
  /** A single metric anomaly detector to be deleted. When using SingleMetricAnomalyDetector, you cannot include the following parameters in the same operation: Dimensions, MetricName Namespace Stat the Met */
  SingleMetricAnomalyDetector?: SingleMetricAnomalyDetector;
  /** The statistic associated with the anomaly detection model to delete. */
  Stat?: string;
}

export interface DeleteDashboardsInput {
  /** The dashboards to be deleted. This parameter is required. */
  DashboardNames: string[];
}

export interface DeleteInsightRulesInput {
  /** An array of the rule names to delete. If you need to find out the names of your rules, use DescribeInsightRules. */
  RuleNames: string[];
}

export interface DeleteMetricStreamInput {
  /** The name of the metric stream to delete. */
  Name: string;
}

export interface DescribeAlarmContributorsInput {
  /** The name of the alarm for which to retrieve contributor information. */
  AlarmName: string;
  /** The token returned by a previous call to indicate that there is more data available. */
  NextToken?: string;
}

export interface DescribeAlarmHistoryInput {
  /** The unique identifier of a specific alarm contributor to filter the alarm history results. */
  AlarmContributorId?: string;
  /** The name of the alarm. */
  AlarmName?: string;
  /** Use this parameter to specify whether you want the operation to return metric alarms or composite alarms. If you omit this parameter, only metric alarms are returned. */
  AlarmTypes?: 'CompositeAlarm' | 'MetricAlarm'[];
  /** The ending date to retrieve alarm history. */
  EndDate?: string;
  /** The type of alarm histories to retrieve. */
  HistoryItemType?: 'ConfigurationUpdate' | 'StateUpdate' | 'Action' | 'AlarmContributorStateUpdate' | 'AlarmContributorAction';
  /** The maximum number of alarm history records to retrieve. */
  MaxRecords?: number;
  /** The token returned by a previous call to indicate that there is more data available. */
  NextToken?: string;
  /** Specified whether to return the newest or oldest alarm history first. Specify TimestampDescending to have the newest event history returned first, and specify TimestampAscending to have the oldest his */
  ScanBy?: 'TimestampDescending' | 'TimestampAscending';
  /** The starting date to retrieve alarm history. */
  StartDate?: string;
}

export interface DescribeAlarmsInput {
  /** Use this parameter to filter the results of the operation to only those alarms that use a certain alarm action. For example, you could specify the ARN of an SNS topic to find all alarms that send noti */
  ActionPrefix?: string;
  /** An alarm name prefix. If you specify this parameter, you receive information about all alarms that have names that start with this prefix. If this parameter is specified, you cannot specify AlarmNames */
  AlarmNamePrefix?: string;
  /** The names of the alarms to retrieve information about. */
  AlarmNames?: string[];
  /** Use this parameter to specify whether you want the operation to return metric alarms or composite alarms. If you omit this parameter, only metric alarms are returned, even if composite alarms exist in */
  AlarmTypes?: 'CompositeAlarm' | 'MetricAlarm'[];
  /** If you use this parameter and specify the name of a composite alarm, the operation returns information about the "children" alarms of the alarm you specify. These are the metric alarms and composite a */
  ChildrenOfAlarmName?: string;
  /** The maximum number of alarm descriptions to retrieve. */
  MaxRecords?: number;
  /** The token returned by a previous call to indicate that there is more data available. */
  NextToken?: string;
  /** If you use this parameter and specify the name of a metric or composite alarm, the operation returns information about the "parent" alarms of the alarm you specify. These are the composite alarms that */
  ParentsOfAlarmName?: string;
  /** Specify this parameter to receive information only about alarms that are currently in the state that you specify. */
  StateValue?: 'OK' | 'ALARM' | 'INSUFFICIENT_DATA';
}

export interface DescribeAlarmsForMetricInput {
  /** The name of the metric. */
  MetricName: string;
  /** The namespace of the metric. */
  Namespace: string;
  /** The dimensions associated with the metric. If the metric has any associated dimensions, you must specify them in order for the call to succeed. */
  Dimensions?: Dimension[];
  /** The percentile statistic for the metric. Specify a value between p0.0 and p100. */
  ExtendedStatistic?: string;
  /** The period, in seconds, over which the statistic is applied. */
  Period?: number;
  /** The statistic for the metric, other than percentiles. For percentile statistics, use ExtendedStatistics. */
  Statistic?: 'SampleCount' | 'Average' | 'Sum' | 'Minimum' | 'Maximum';
  /** The unit for the metric. */
  Unit?: 'Seconds' | 'Microseconds' | 'Milliseconds' | 'Bytes' | 'Kilobytes' | 'Megabytes' | 'Gigabytes' | 'Terabytes' | 'Bits' | 'Kilobits' | 'Megabits' | 'Gigabits' | 'Terabits' | 'Percent' | 'Count' | 'Bytes/Second' | 'Kilobytes/Second' | 'Megabytes/Second' | 'Gigabytes/Second' | 'Terabytes/Second' | 'Bits/Second' | 'Kilobits/Second' | 'Megabits/Second' | 'Gigabits/Second' | 'Terabits/Second' | 'Count/Second' | 'None';
}

export interface DescribeAnomalyDetectorsInput {
  /** The anomaly detector types to request when using DescribeAnomalyDetectorsInput. If empty, defaults to SINGLE_METRIC. */
  AnomalyDetectorTypes?: 'SINGLE_METRIC' | 'METRIC_MATH'[];
  /** Limits the results to only the anomaly detection models that are associated with the specified metric dimensions. If there are multiple metrics that have these dimensions and have anomaly detection mo */
  Dimensions?: Dimension[];
  /** The maximum number of results to return in one operation. The maximum value that you can specify is 100. To retrieve the remaining results, make another call with the returned NextToken value. */
  MaxResults?: number;
  /** Limits the results to only the anomaly detection models that are associated with the specified metric name. If there are multiple metrics with this name in different namespaces that have anomaly detec */
  MetricName?: string;
  /** Limits the results to only the anomaly detection models that are associated with the specified namespace. */
  Namespace?: string;
  /** Use the token returned by the previous operation to request the next page of results. */
  NextToken?: string;
}

export interface DescribeInsightRulesInput {
  /** The maximum number of results to return in one operation. If you omit this parameter, the default of 500 is used. */
  MaxResults?: number;
  /** Include this value, if it was returned by the previous operation, to get the next set of rules. */
  NextToken?: string;
}

export interface DisableAlarmActionsInput {
  /** The names of the alarms. */
  AlarmNames: string[];
}

export interface DisableInsightRulesInput {
  /** An array of the rule names to disable. If you need to find out the names of your rules, use DescribeInsightRules. */
  RuleNames: string[];
}

export interface EnableAlarmActionsInput {
  /** The names of the alarms. */
  AlarmNames: string[];
}

export interface EnableInsightRulesInput {
  /** An array of the rule names to enable. If you need to find out the names of your rules, use DescribeInsightRules. */
  RuleNames: string[];
}

export interface GetDashboardInput {
  /** The name of the dashboard to be described. */
  DashboardName: string;
}

export interface GetInsightRuleReportInput {
  /** The end time of the data to use in the report. When used in a raw HTTP Query API, it is formatted as yyyy-MM-dd'T'HH:mm:ss. For example, 2019-07-01T23:59:59. */
  EndTime: string;
  /** The period, in seconds, to use for the statistics in the InsightRuleMetricDatapoint results. */
  Period: number;
  /** The name of the rule that you want to see data from. */
  RuleName: string;
  /** The start time of the data to use in the report. When used in a raw HTTP Query API, it is formatted as yyyy-MM-dd'T'HH:mm:ss. For example, 2019-07-01T23:59:59. */
  StartTime: string;
  /** The maximum number of contributors to include in the report. The range is 1 to 100. If you omit this, the default of 10 is used. */
  MaxContributorCount?: number;
  /** Specifies which metrics to use for aggregation of contributor values for the report. You can specify one or more of the following metrics: UniqueContributors -- the number of unique contributors for e */
  Metrics?: string[];
  /** Determines what statistic to use to rank the contributors. Valid values are Sum and Maximum. */
  OrderBy?: string;
}

export interface GetMetricDataInput {
  /** The time stamp indicating the latest data to be returned. The value specified is exclusive; results include data points up to the specified time stamp. For better performance, specify StartTime and En */
  EndTime: string;
  /** The metric queries to be returned. A single GetMetricData call can include as many as 500 MetricDataQuery structures. Each of these structures can specify either a metric to retrieve, a Metrics Insigh */
  MetricDataQueries: MetricDataQuery[];
  /** The time stamp indicating the earliest data to be returned. The value specified is inclusive; results include data points with the specified time stamp. CloudWatch rounds the specified time stamp as f */
  StartTime: string;
  /** This structure includes the Timezone parameter, which you can use to specify your time zone so that the labels of returned data display the correct time for your time zone. */
  LabelOptions?: LabelOptions;
  /** The maximum number of data points the request should return before paginating. If you omit this, the default of 100,800 is used. */
  MaxDatapoints?: number;
  /** Include this value, if it was returned by the previous GetMetricData operation, to get the next set of data points. */
  NextToken?: string;
  /** The order in which data points should be returned. TimestampDescending returns the newest data first and paginates when the MaxDatapoints limit is reached. TimestampAscending returns the oldest data f */
  ScanBy?: 'TimestampDescending' | 'TimestampAscending';
}

export interface GetMetricStatisticsInput {
  /** The time stamp that determines the last data point to return. The value specified is exclusive; results include data points up to the specified time stamp. In a raw HTTP query, the time stamp must be  */
  EndTime: string;
  /** The name of the metric, with or without spaces. */
  MetricName: string;
  /** The namespace of the metric, with or without spaces. */
  Namespace: string;
  /** The granularity, in seconds, of the returned data points. For metrics with regular resolution, a period can be as short as one minute (60 seconds) and must be a multiple of 60. For high-resolution met */
  Period: number;
  /** The time stamp that determines the first data point to return. Start times are evaluated relative to the time that CloudWatch receives the request. The value specified is inclusive; results include da */
  StartTime: string;
  /** The dimensions. If the metric contains multiple dimensions, you must include a value for each dimension. CloudWatch treats each unique combination of dimensions as a separate metric. If a specific com */
  Dimensions?: Dimension[];
  /** The percentile statistics. Specify values between p0.0 and p100. When calling GetMetricStatistics, you must specify either Statistics or ExtendedStatistics, but not both. Percentile statistics are not */
  ExtendedStatistics?: string[];
  /** The metric statistics, other than percentile. For percentile statistics, use ExtendedStatistics. When calling GetMetricStatistics, you must specify either Statistics or ExtendedStatistics, but not bot */
  Statistics?: 'SampleCount' | 'Average' | 'Sum' | 'Minimum' | 'Maximum'[];
  /** The unit for a given metric. If you omit Unit, all data that was collected with any unit is returned, along with the corresponding units that were specified when the data was reported to CloudWatch. I */
  Unit?: 'Seconds' | 'Microseconds' | 'Milliseconds' | 'Bytes' | 'Kilobytes' | 'Megabytes' | 'Gigabytes' | 'Terabytes' | 'Bits' | 'Kilobits' | 'Megabits' | 'Gigabits' | 'Terabits' | 'Percent' | 'Count' | 'Bytes/Second' | 'Kilobytes/Second' | 'Megabytes/Second' | 'Gigabytes/Second' | 'Terabytes/Second' | 'Bits/Second' | 'Kilobits/Second' | 'Megabits/Second' | 'Gigabits/Second' | 'Terabits/Second' | 'Count/Second' | 'None';
}

export interface GetMetricStreamInput {
  /** The name of the metric stream to retrieve information about. */
  Name: string;
}

export interface GetMetricWidgetImageInput {
  /** A JSON string that defines the bitmap graph to be retrieved. The string includes the metrics to include in the graph, statistics, annotations, title, axis limits, and so on. You can include only one M */
  MetricWidget: string;
  /** The format of the resulting image. Only PNG images are supported. The default is png. If you specify png, the API returns an HTTP response with the content-type set to text/xml. The image data is in a */
  OutputFormat?: string;
}

export interface ListDashboardsInput {
  /** If you specify this parameter, only the dashboards with names starting with the specified string are listed. The maximum length is 255, and valid characters are A-Z, a-z, 0-9, ".", "-", and "_". */
  DashboardNamePrefix?: string;
  /** The token returned by a previous call to indicate that there is more data available. */
  NextToken?: string;
}

export interface ListManagedInsightRulesInput {
  /** The ARN of an Amazon Web Services resource that has managed Contributor Insights rules. */
  ResourceARN: string;
  /** The maximum number of results to return in one operation. If you omit this parameter, the default number is used. The default number is 100. */
  MaxResults?: number;
  /** Include this value to get the next set of rules if the value was returned by the previous operation. */
  NextToken?: string;
}

export interface ListMetricsInput {
  /** The dimensions to filter against. Only the dimension with names that match exactly will be returned. If you specify one dimension name and a metric has that dimension and also other dimensions, it wil */
  Dimensions?: DimensionFilter[];
  /** If you are using this operation in a monitoring account, specify true to include metrics from source accounts in the returned data. The default is false. */
  IncludeLinkedAccounts?: boolean;
  /** The name of the metric to filter against. Only the metrics with names that match exactly will be returned. */
  MetricName?: string;
  /** The metric namespace to filter against. Only the namespace that matches exactly will be returned. */
  Namespace?: string;
  /** The token returned by a previous call to indicate that there is more data available. */
  NextToken?: string;
  /** When you use this operation in a monitoring account, use this field to return metrics only from one source account. To do so, specify that source account ID in this field, and also specify true for In */
  OwningAccount?: string;
  /** To filter the results to show only metrics that have had data points published in the past three hours, specify this parameter with a value of PT3H. This is the only valid value for this parameter. Th */
  RecentlyActive?: 'PT3H';
}

export interface ListMetricStreamsInput {
  /** The maximum number of results to return in one operation. */
  MaxResults?: number;
  /** Include this value, if it was returned by the previous call, to get the next set of metric streams. */
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The ARN of the CloudWatch resource that you want to view tags for. The ARN format of an alarm is arn:aws:cloudwatch:Region:account-id:alarm:alarm-name The ARN format of a Contributor Insights rule is  */
  ResourceARN: string;
}

export interface PutAnomalyDetectorInput {
  /** The configuration specifies details about how the anomaly detection model is to be trained, including time ranges to exclude when training and updating the model. You can specify as many as 10 time ra */
  Configuration?: AnomalyDetectorConfiguration;
  /** The metric dimensions to create the anomaly detection model for. */
  Dimensions?: Dimension[];
  /** Use this object to include parameters to provide information about your metric to CloudWatch to help it build more accurate anomaly detection models. Currently, it includes the PeriodicSpikes paramete */
  MetricCharacteristics?: MetricCharacteristics;
  /** The metric math anomaly detector to be created. When using MetricMathAnomalyDetector, you cannot include the following parameters in the same operation: Dimensions MetricName Namespace Stat the Single */
  MetricMathAnomalyDetector?: MetricMathAnomalyDetector;
  /** The name of the metric to create the anomaly detection model for. */
  MetricName?: string;
  /** The namespace of the metric to create the anomaly detection model for. */
  Namespace?: string;
  /** A single metric anomaly detector to be created. When using SingleMetricAnomalyDetector, you cannot include the following parameters in the same operation: Dimensions MetricName Namespace Stat the Metr */
  SingleMetricAnomalyDetector?: SingleMetricAnomalyDetector;
  /** The statistic to use for the metric and the anomaly detection model. */
  Stat?: string;
}

export interface PutCompositeAlarmInput {
  /** The name for the composite alarm. This name must be unique within the Region. */
  AlarmName: string;
  /** An expression that specifies which other alarms are to be evaluated to determine this composite alarm's state. For each alarm that you reference, you designate a function that specifies whether that a */
  AlarmRule: string;
  /** Indicates whether actions should be executed during any changes to the alarm state of the composite alarm. The default is TRUE. */
  ActionsEnabled?: boolean;
  /** Actions will be suppressed if the suppressor alarm is in the ALARM state. ActionsSuppressor can be an AlarmName or an Amazon Resource Name (ARN) from an existing alarm. */
  ActionsSuppressor?: string;
  /** The maximum time in seconds that the composite alarm waits after suppressor alarm goes out of the ALARM state. After this time, the composite alarm performs its actions. ExtensionPeriod is required on */
  ActionsSuppressorExtensionPeriod?: number;
  /** The maximum time in seconds that the composite alarm waits for the suppressor alarm to go into the ALARM state. After this time, the composite alarm performs its actions. WaitPeriod is required only w */
  ActionsSuppressorWaitPeriod?: number;
  /** The actions to execute when this alarm transitions to the ALARM state from any other state. Each action is specified as an Amazon Resource Name (ARN). Valid Values: ] Amazon SNS actions: arn:aws:sns:r */
  AlarmActions?: string[];
  /** The description for the composite alarm. */
  AlarmDescription?: string;
  /** The actions to execute when this alarm transitions to the INSUFFICIENT_DATA state from any other state. Each action is specified as an Amazon Resource Name (ARN). Valid Values: ] Amazon SNS actions: a */
  InsufficientDataActions?: string[];
  /** The actions to execute when this alarm transitions to an OK state from any other state. Each action is specified as an Amazon Resource Name (ARN). Valid Values: ] Amazon SNS actions: arn:aws:sns:regio */
  OKActions?: string[];
  /** A list of key-value pairs to associate with the alarm. You can associate as many as 50 tags with an alarm. To be able to associate tags with the alarm when you create the alarm, you must have the clou */
  Tags?: Tag[];
}

export interface PutDashboardInput {
  /** The detailed information about the dashboard in JSON format, including the widgets to include and their location on the dashboard. This parameter is required. For more information about the syntax, se */
  DashboardBody: string;
  /** The name of the dashboard. If a dashboard with this name already exists, this call modifies that dashboard, replacing its current contents. Otherwise, a new dashboard is created. The maximum length is */
  DashboardName: string;
}

export interface PutInsightRuleInput {
  /** The definition of the rule, as a JSON object. For details on the valid syntax, see Contributor Insights Rule Syntax. */
  RuleDefinition: string;
  /** A unique name for the rule. */
  RuleName: string;
  /** Specify true to have this rule evaluate log events after they have been transformed by Log transformation. If you specify true, then the log events in log groups that have transformers will be evaluat */
  ApplyOnTransformedLogs?: boolean;
  /** The state of the rule. Valid values are ENABLED and DISABLED. */
  RuleState?: string;
  /** A list of key-value pairs to associate with the Contributor Insights rule. You can associate as many as 50 tags with a rule. Tags can help you organize and categorize your resources. You can also use  */
  Tags?: Tag[];
}

export interface PutManagedInsightRulesInput {
  /** A list of ManagedRules to enable. */
  ManagedRules: ManagedRule[];
}

export interface PutMetricAlarmInput {
  /** The name for the alarm. This name must be unique within the Region. The name must contain only UTF-8 characters, and can't contain ASCII control characters */
  AlarmName: string;
  /** The arithmetic operation to use when comparing the specified statistic and threshold. The specified statistic value is used as the first operand. The values LessThanLowerOrGreaterThanUpperThreshold, L */
  ComparisonOperator: 'GreaterThanOrEqualToThreshold' | 'GreaterThanThreshold' | 'LessThanThreshold' | 'LessThanOrEqualToThreshold' | 'LessThanLowerOrGreaterThanUpperThreshold' | 'LessThanLowerThreshold' | 'GreaterThanUpperThreshold';
  /** The number of periods over which data is compared to the specified threshold. If you are setting an alarm that requires that a number of consecutive data points be breaching to trigger the alarm, this */
  EvaluationPeriods: number;
  /** Indicates whether actions should be executed during any changes to the alarm state. The default is TRUE. */
  ActionsEnabled?: boolean;
  /** The actions to execute when this alarm transitions to the ALARM state from any other state. Each action is specified as an Amazon Resource Name (ARN). Valid values: EC2 actions: arn:aws:automate:regio */
  AlarmActions?: string[];
  /** The description for the alarm. */
  AlarmDescription?: string;
  /** The number of data points that must be breaching to trigger the alarm. This is used only if you are setting an "M out of N" alarm. In that case, this value is the M. For more information, see Evaluati */
  DatapointsToAlarm?: number;
  /** The dimensions for the metric specified in MetricName. */
  Dimensions?: Dimension[];
  /** Used only for alarms based on percentiles. If you specify ignore, the alarm state does not change during periods with too few data points to be statistically significant. If you specify evaluate or om */
  EvaluateLowSampleCountPercentile?: string;
  /** The extended statistic for the metric specified in MetricName. When you call PutMetricAlarm and specify a MetricName, you must specify either Statistic or ExtendedStatistic but not both. If you specif */
  ExtendedStatistic?: string;
  /** The actions to execute when this alarm transitions to the INSUFFICIENT_DATA state from any other state. Each action is specified as an Amazon Resource Name (ARN). Valid values: EC2 actions: arn:aws:au */
  InsufficientDataActions?: string[];
  /** The name for the metric associated with the alarm. For each PutMetricAlarm operation, you must specify either MetricName or a Metrics array. If you are creating an alarm based on a math expression, yo */
  MetricName?: string;
  /** An array of MetricDataQuery structures that enable you to create an alarm based on the result of a metric math expression. For each PutMetricAlarm operation, you must specify either MetricName or a Me */
  Metrics?: MetricDataQuery[];
  /** The namespace for the metric associated specified in MetricName. */
  Namespace?: string;
  /** The actions to execute when this alarm transitions to an OK state from any other state. Each action is specified as an Amazon Resource Name (ARN). Valid values: EC2 actions: arn:aws:automate:region:ec */
  OKActions?: string[];
  /** The length, in seconds, used each time the metric specified in MetricName is evaluated. Valid values are 10, 20, 30, and any multiple of 60. Period is required for alarms based on static thresholds. I */
  Period?: number;
  /** The statistic for the metric specified in MetricName, other than percentile. For percentile statistics, use ExtendedStatistic. When you call PutMetricAlarm and specify a MetricName, you must specify e */
  Statistic?: 'SampleCount' | 'Average' | 'Sum' | 'Minimum' | 'Maximum';
  /** A list of key-value pairs to associate with the alarm. You can associate as many as 50 tags with an alarm. To be able to associate tags with the alarm when you create the alarm, you must have the clou */
  Tags?: Tag[];
  /** The value against which the specified statistic is compared. This parameter is required for alarms based on static thresholds, but should not be used for alarms based on anomaly detection models. */
  Threshold?: number;
  /** If this is an alarm based on an anomaly detection model, make this value match the ID of the ANOMALY_DETECTION_BAND function. For an example of how to use this parameter, see the Anomaly Detection Mod */
  ThresholdMetricId?: string;
  /** Sets how this alarm is to handle missing data points. If TreatMissingData is omitted, the default behavior of missing is used. For more information, see Configuring How CloudWatch Alarms Treats Missin */
  TreatMissingData?: string;
  /** The unit of measure for the statistic. For example, the units for the Amazon EC2 NetworkIn metric are Bytes because NetworkIn tracks the number of bytes that an instance receives on all network interf */
  Unit?: 'Seconds' | 'Microseconds' | 'Milliseconds' | 'Bytes' | 'Kilobytes' | 'Megabytes' | 'Gigabytes' | 'Terabytes' | 'Bits' | 'Kilobits' | 'Megabits' | 'Gigabits' | 'Terabits' | 'Percent' | 'Count' | 'Bytes/Second' | 'Kilobytes/Second' | 'Megabytes/Second' | 'Gigabytes/Second' | 'Terabytes/Second' | 'Bits/Second' | 'Kilobits/Second' | 'Megabits/Second' | 'Gigabits/Second' | 'Terabits/Second' | 'Count/Second' | 'None';
}

export interface PutMetricDataInput {
  /** The namespace for the metric data. You can use ASCII characters for the namespace, except for control characters which are not supported. To avoid conflicts with Amazon Web Services service namespaces */
  Namespace: string;
  /** Data for metrics that contain associated entity information. You can include up to two EntityMetricData objects, each of which can contain a single Entity and associated metrics. The limit of metrics  */
  EntityMetricData?: EntityMetricData[];
  /** The data for the metrics. Use this parameter if your metrics do not contain associated entities. The array can include no more than 1000 metrics per call. The limit of metrics allowed, 1000, is the su */
  MetricData?: MetricDatum[];
  /** Whether to accept valid metric data when an invalid entity is sent. When set to true: Any validation error (for entity or metric data) will fail the entire request, and no data will be ingested. The f */
  StrictEntityValidation?: boolean;
}

export interface PutMetricStreamInput {
  /** The ARN of the Amazon Kinesis Data Firehose delivery stream to use for this metric stream. This Amazon Kinesis Data Firehose delivery stream must already exist and must be in the same account as the m */
  FirehoseArn: string;
  /** If you are creating a new metric stream, this is the name for the new stream. The name must be different than the names of other metric streams in this account and Region. If you are updating a metric */
  Name: string;
  /** The output format for the stream. Valid values are json, opentelemetry1.0, and opentelemetry0.7. For more information about metric stream output formats, see Metric streams output formats. */
  OutputFormat: 'json' | 'opentelemetry0.7' | 'opentelemetry1.0';
  /** The ARN of an IAM role that this metric stream will use to access Amazon Kinesis Data Firehose resources. This IAM role must already exist and must be in the same account as the metric stream. This IA */
  RoleArn: string;
  /** If you specify this parameter, the stream sends metrics from all metric namespaces except for the namespaces that you specify here. You cannot include ExcludeFilters and IncludeFilters in the same ope */
  ExcludeFilters?: MetricStreamFilter[];
  /** If you specify this parameter, the stream sends only the metrics from the metric namespaces that you specify here. You cannot include IncludeFilters and ExcludeFilters in the same operation. */
  IncludeFilters?: MetricStreamFilter[];
  /** If you are creating a metric stream in a monitoring account, specify true to include metrics from source accounts in the metric stream. */
  IncludeLinkedAccountsMetrics?: boolean;
  /** By default, a metric stream always sends the MAX, MIN, SUM, and SAMPLECOUNT statistics for each metric that is streamed. You can use this parameter to have the metric stream also send additional stati */
  StatisticsConfigurations?: MetricStreamStatisticsConfiguration[];
  /** A list of key-value pairs to associate with the metric stream. You can associate as many as 50 tags with a metric stream. Tags can help you organize and categorize your resources. You can also use the */
  Tags?: Tag[];
}

export interface SetAlarmStateInput {
  /** The name of the alarm. */
  AlarmName: string;
  /** The reason that this alarm is set to this specific state, in text format. */
  StateReason: string;
  /** The value of the state. */
  StateValue: 'OK' | 'ALARM' | 'INSUFFICIENT_DATA';
  /** The reason that this alarm is set to this specific state, in JSON format. For SNS or EC2 alarm actions, this is just informational. But for EC2 Auto Scaling or application Auto Scaling alarm actions,  */
  StateReasonData?: string;
}

export interface StartMetricStreamsInput {
  /** The array of the names of metric streams to start streaming. This is an "all or nothing" operation. If you do not have permission to access all of the metric streams that you list here, then none of t */
  Names: string[];
}

export interface StopMetricStreamsInput {
  /** The array of the names of metric streams to stop streaming. This is an "all or nothing" operation. If you do not have permission to access all of the metric streams that you list here, then none of th */
  Names: string[];
}

export interface TagResourceInput {
  /** The ARN of the CloudWatch resource that you're adding tags to. The ARN format of an alarm is arn:aws:cloudwatch:Region:account-id:alarm:alarm-name The ARN format of a Contributor Insights rule is arn: */
  ResourceARN: string;
  /** The list of key-value pairs to associate with the alarm. */
  Tags: Tag[];
}

export interface UntagResourceInput {
  /** The ARN of the CloudWatch resource that you're removing tags from. The ARN format of an alarm is arn:aws:cloudwatch:Region:account-id:alarm:alarm-name The ARN format of a Contributor Insights rule is  */
  ResourceARN: string;
  /** The list of tag keys to remove from the resource. */
  TagKeys: string[];
}

/** CloudWatch service binding for Step Functions SDK integrations. */
export class CloudWatch {
  constructor() {}

  deleteAlarms<T>(params: DeleteAlarmsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAnomalyDetector<T>(params: DeleteAnomalyDetectorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDashboards<T>(params: DeleteDashboardsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteInsightRules<T>(params: DeleteInsightRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteMetricStream<T>(params: DeleteMetricStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAlarmContributors<T>(params: DescribeAlarmContributorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAlarmHistory<T>(params: DescribeAlarmHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAlarms<T>(params: DescribeAlarmsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAlarmsForMetric<T>(params: DescribeAlarmsForMetricInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAnomalyDetectors<T>(params: DescribeAnomalyDetectorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInsightRules<T>(params: DescribeInsightRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableAlarmActions<T>(params: DisableAlarmActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableInsightRules<T>(params: DisableInsightRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableAlarmActions<T>(params: EnableAlarmActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableInsightRules<T>(params: EnableInsightRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDashboard<T>(params: GetDashboardInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getInsightRuleReport<T>(params: GetInsightRuleReportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMetricData<T>(params: GetMetricDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMetricStatistics<T>(params: GetMetricStatisticsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMetricStream<T>(params: GetMetricStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMetricWidgetImage<T>(params: GetMetricWidgetImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDashboards<T>(params: ListDashboardsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listManagedInsightRules<T>(params: ListManagedInsightRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMetrics<T>(params: ListMetricsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMetricStreams<T>(params: ListMetricStreamsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putAnomalyDetector<T>(params: PutAnomalyDetectorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putCompositeAlarm<T>(params: PutCompositeAlarmInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDashboard<T>(params: PutDashboardInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putInsightRule<T>(params: PutInsightRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putManagedInsightRules<T>(params: PutManagedInsightRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putMetricAlarm<T>(params: PutMetricAlarmInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putMetricData<T>(params: PutMetricDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putMetricStream<T>(params: PutMetricStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setAlarmState<T>(params: SetAlarmStateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startMetricStreams<T>(params: StartMetricStreamsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopMetricStreams<T>(params: StopMetricStreamsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
