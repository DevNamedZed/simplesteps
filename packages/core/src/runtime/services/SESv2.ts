// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface BatchGetMetricDataQuery {
  /** The query identifier. */
  Id: string;
  /** The query namespace - e.g. VDM */
  Namespace: 'VDM';
  /** The queried metric. This can be one of the following: SEND – Emails sent eligible for tracking in the VDM dashboard. This excludes emails sent to the mailbox simulator and emails addressed to more tha */
  Metric: 'SEND' | 'COMPLAINT' | 'PERMANENT_BOUNCE' | 'TRANSIENT_BOUNCE' | 'OPEN' | 'CLICK' | 'DELIVERY' | 'DELIVERY_OPEN' | 'DELIVERY_CLICK' | 'DELIVERY_COMPLAINT';
  /** An object that contains mapping between MetricDimensionName and MetricDimensionValue to filter metrics by. */
  Dimensions?: Record<string, any>;
  /** Represents the start date for the query interval. */
  StartDate: string;
  /** Represents the end date for the query interval. */
  EndDate: string;
}

export interface TrackingOptions {
  /** The domain to use for tracking open and click events. */
  CustomRedirectDomain: string;
  /** The https policy to use for tracking open and click events. */
  HttpsPolicy?: 'REQUIRE' | 'REQUIRE_OPEN_ONLY' | 'OPTIONAL';
}

export interface DeliveryOptions {
  /** Specifies whether messages that use the configuration set are required to use Transport Layer Security (TLS). If the value is Require, messages are only delivered if a TLS connection can be establishe */
  TlsPolicy?: 'REQUIRE' | 'OPTIONAL';
  /** The name of the dedicated IP pool to associate with the configuration set. */
  SendingPoolName?: string;
  /** The maximum amount of time, in seconds, that Amazon SES API v2 will attempt delivery of email. If specified, the value must greater than or equal to 300 seconds (5 minutes) and less than or equal to 5 */
  MaxDeliverySeconds?: number;
}

export interface ReputationOptions {
  /** If true, tracking of reputation metrics is enabled for the configuration set. If false, tracking of reputation metrics is disabled for the configuration set. */
  ReputationMetricsEnabled?: boolean;
  /** The date and time (in Unix time) when the reputation metrics were last given a fresh start. When your account is given a fresh start, your reputation metrics are calculated starting from the date of t */
  LastFreshStart?: string;
}

export interface SendingOptions {
  /** If true, email sending is enabled for the configuration set. If false, email sending is disabled for the configuration set. */
  SendingEnabled?: boolean;
}

export interface Tag {
  /** One part of a key-value pair that defines a tag. The maximum length of a tag key is 128 characters. The minimum length is 1 character. */
  Key: string;
  /** The optional part of a key-value pair that defines a tag. The maximum length of a tag value is 256 characters. The minimum length is 0 characters. If you don't want a resource to have a specific tag v */
  Value: string;
}

export interface SuppressionValidationOptions {
  /** Specifies the condition threshold settings for suppression validation. */
  ConditionThreshold: any;
}

export interface SuppressionOptions {
  /** A list that contains the reasons that email addresses are automatically added to the suppression list for your account. This list can contain any or all of the following: COMPLAINT – Amazon SES adds a */
  SuppressedReasons?: 'BOUNCE' | 'COMPLAINT'[];
  ValidationOptions?: SuppressionValidationOptions;
}

export interface DashboardOptions {
  /** Specifies the status of your VDM engagement metrics collection. Can be one of the following: ENABLED – Amazon SES enables engagement metrics for the configuration set. DISABLED – Amazon SES disables e */
  EngagementMetrics?: 'ENABLED' | 'DISABLED';
}

export interface GuardianOptions {
  /** Specifies the status of your VDM optimized shared delivery. Can be one of the following: ENABLED – Amazon SES enables optimized shared delivery for the configuration set. DISABLED – Amazon SES disable */
  OptimizedSharedDelivery?: 'ENABLED' | 'DISABLED';
}

export interface VdmOptions {
  /** Specifies additional settings for your VDM configuration as applicable to the Dashboard. */
  DashboardOptions?: DashboardOptions;
  /** Specifies additional settings for your VDM configuration as applicable to the Guardian. */
  GuardianOptions?: GuardianOptions;
}

export interface ArchivingOptions {
  /** The Amazon Resource Name (ARN) of the MailManager archive where the Amazon SES API v2 will archive sent emails. */
  ArchiveArn?: string;
}

export interface KinesisFirehoseDestination {
  /** The Amazon Resource Name (ARN) of the IAM role that the Amazon SES API v2 uses to send email events to the Amazon Kinesis Data Firehose stream. */
  IamRoleArn: string;
  /** The Amazon Resource Name (ARN) of the Amazon Kinesis Data Firehose stream that the Amazon SES API v2 sends email events to. */
  DeliveryStreamArn: string;
}

export interface CloudWatchDestination {
  /** An array of objects that define the dimensions to use when you send email events to Amazon CloudWatch. */
  DimensionConfigurations: any[];
}

export interface SnsDestination {
  /** The Amazon Resource Name (ARN) of the Amazon SNS topic to publish email events to. For more information about Amazon SNS topics, see the Amazon SNS Developer Guide. */
  TopicArn: string;
}

export interface EventBridgeDestination {
  /** The Amazon Resource Name (ARN) of the Amazon EventBridge bus to publish email events to. Only the default bus is supported. */
  EventBusArn: string;
}

export interface PinpointDestination {
  /** The Amazon Resource Name (ARN) of the Amazon Pinpoint project to send email events to. */
  ApplicationArn?: string;
}

export interface EventDestinationDefinition {
  /** If true, the event destination is enabled. When the event destination is enabled, the specified event types are sent to the destinations in this EventDestinationDefinition. If false, the event destina */
  Enabled?: boolean;
  /** An array that specifies which events the Amazon SES API v2 should send to the destinations in this EventDestinationDefinition. */
  MatchingEventTypes?: 'SEND' | 'REJECT' | 'BOUNCE' | 'COMPLAINT' | 'DELIVERY' | 'OPEN' | 'CLICK' | 'RENDERING_FAILURE' | 'DELIVERY_DELAY' | 'SUBSCRIPTION'[];
  /** An object that defines an Amazon Kinesis Data Firehose destination for email events. You can use Amazon Kinesis Data Firehose to stream data to other services, such as Amazon S3 and Amazon Redshift. */
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  /** An object that defines an Amazon CloudWatch destination for email events. You can use Amazon CloudWatch to monitor and gain insights on your email sending metrics. */
  CloudWatchDestination?: CloudWatchDestination;
  /** An object that defines an Amazon SNS destination for email events. You can use Amazon SNS to send notifications when certain email events occur. */
  SnsDestination?: SnsDestination;
  /** An object that defines an Amazon EventBridge destination for email events. You can use Amazon EventBridge to send notifications when certain email events occur. */
  EventBridgeDestination?: EventBridgeDestination;
  /** An object that defines an Amazon Pinpoint project destination for email events. You can send email event data to a Amazon Pinpoint project to view metrics using the Transactional Messaging dashboards  */
  PinpointDestination?: PinpointDestination;
}

export interface TopicPreference {
  /** The name of the topic. */
  TopicName: string;
  /** The contact's subscription status to a topic which is either OPT_IN or OPT_OUT. */
  SubscriptionStatus: 'OPT_IN' | 'OPT_OUT';
}

export interface Topic {
  /** The name of the topic. */
  TopicName: string;
  /** The name of the topic the contact will see. */
  DisplayName: string;
  /** A description of what the topic is about, which the contact will see. */
  Description?: string;
  /** The default subscription status to be applied to a contact if the contact has not noted their preference for subscribing to a topic. */
  DefaultSubscriptionStatus: 'OPT_IN' | 'OPT_OUT';
}

export interface Message {
  /** The subject line of the email. The subject line can only contain 7-bit ASCII characters. However, you can specify non-ASCII characters in the subject line by using encoded-word syntax, as described in */
  Subject: any;
  /** The body of the message. You can specify an HTML version of the message, a text-only version of the message, or both. */
  Body: any;
  /** The list of message headers that will be added to the email message. */
  Headers?: any[];
  /** The List of attachments to include in your email. All recipients will receive the same attachments. */
  Attachments?: any[];
}

export interface RawMessage {
  /** The raw email message. The message has to meet the following criteria: The message has to contain a header and a body, separated by one blank line. All of the required header fields must be present in */
  Data: string;
}

export interface Template {
  /** The name of the template. You will refer to this name when you send email using the SendEmail or SendBulkEmail operations. */
  TemplateName?: string;
  /** The Amazon Resource Name (ARN) of the template. */
  TemplateArn?: string;
  /** The content of the template. Amazon SES supports only simple substitions when you send email using the SendEmail or SendBulkEmail operations and you provide the full template content in the request. */
  TemplateContent?: any;
  /** An object that defines the values to use for message variables in the template. This object is a set of key-value pairs. Each key defines a message variable in the template. The corresponding value de */
  TemplateData?: string;
  /** The list of message headers that will be added to the email message. */
  Headers?: any[];
  /** The List of attachments to include in your email. All recipients will receive the same attachments. */
  Attachments?: any[];
}

export interface EmailContent {
  /** The simple email message. The message consists of a subject, message body and attachments list. */
  Simple?: Message;
  /** The raw email message. The message has to meet the following criteria: The message has to contain a header and a body, separated by one blank line. All of the required header fields must be present in */
  Raw?: RawMessage;
  /** The template to use for the email message. */
  Template?: Template;
}

export interface DkimSigningAttributes {
  /** [Bring Your Own DKIM] A string that's used to identify a public key in the DNS configuration for a domain. */
  DomainSigningSelector?: string;
  /** [Bring Your Own DKIM] A private key that's used to generate a DKIM signature. The private key must use 1024 or 2048-bit RSA encryption, and must be encoded using base64 encoding. */
  DomainSigningPrivateKey?: string;
  /** [Easy DKIM] The key length of the future DKIM key pair to be generated. This can be changed at most once per day. */
  NextSigningKeyLength?: 'RSA_1024_BIT' | 'RSA_2048_BIT';
  /** The attribute to use for configuring DKIM for the identity depends on the operation: For PutEmailIdentityDkimSigningAttributes: None of the values are allowed - use the SigningAttributesOrigin paramet */
  DomainSigningAttributesOrigin?: 'AWS_SES' | 'EXTERNAL' | 'AWS_SES_AF_SOUTH_1' | 'AWS_SES_EU_NORTH_1' | 'AWS_SES_AP_SOUTH_1' | 'AWS_SES_EU_WEST_3' | 'AWS_SES_EU_WEST_2' | 'AWS_SES_EU_SOUTH_1' | 'AWS_SES_EU_WEST_1' | 'AWS_SES_AP_NORTHEAST_3' | 'AWS_SES_AP_NORTHEAST_2' | 'AWS_SES_ME_SOUTH_1' | 'AWS_SES_AP_NORTHEAST_1' | 'AWS_SES_IL_CENTRAL_1' | 'AWS_SES_SA_EAST_1' | 'AWS_SES_CA_CENTRAL_1' | 'AWS_SES_AP_SOUTHEAST_1' | 'AWS_SES_AP_SOUTHEAST_2' | 'AWS_SES_AP_SOUTHEAST_3' | 'AWS_SES_EU_CENTRAL_1' | 'AWS_SES_US_EAST_1' | 'AWS_SES_US_EAST_2' | 'AWS_SES_US_WEST_1' | 'AWS_SES_US_WEST_2' | 'AWS_SES_ME_CENTRAL_1' | 'AWS_SES_AP_SOUTH_2' | 'AWS_SES_EU_CENTRAL_2' | 'AWS_SES_AP_SOUTHEAST_5' | 'AWS_SES_CA_WEST_1';
}

export interface EmailTemplateContent {
  /** The subject line of the email. */
  Subject?: string;
  /** The email body that will be visible to recipients whose email clients do not display HTML. */
  Text?: string;
  /** The HTML body of the email. */
  Html?: string;
}

export interface MetricsDataSource {
  /** An object that contains a mapping between a MetricDimensionName and MetricDimensionValue to filter metrics by. Must contain a least 1 dimension but no more than 3 unique ones. */
  Dimensions: Record<string, any>;
  /** The metrics namespace - e.g., VDM. */
  Namespace: 'VDM';
  /** A list of ExportMetric objects to export. */
  Metrics: any[];
  /** Represents the start date for the export interval as a timestamp. */
  StartDate: string;
  /** Represents the end date for the export interval as a timestamp. */
  EndDate: string;
}

export interface MessageInsightsDataSource {
  /** Represents the start date for the export interval as a timestamp. The start date is inclusive. */
  StartDate: string;
  /** Represents the end date for the export interval as a timestamp. The end date is inclusive. */
  EndDate: string;
  /** Filters for results to be included in the export file. */
  Include?: any;
  /** Filters for results to be excluded from the export file. */
  Exclude?: any;
  /** The maximum number of results. */
  MaxResults?: number;
}

export interface ExportDataSource {
  MetricsDataSource?: MetricsDataSource;
  MessageInsightsDataSource?: MessageInsightsDataSource;
}

export interface ExportDestination {
  /** The data format of the final export job file, can be one of the following: CSV - A comma-separated values file. JSON - A Json file. */
  DataFormat: 'CSV' | 'JSON';
  /** An Amazon S3 pre-signed URL that points to the generated export file. */
  S3Url?: string;
}

export interface SuppressionListDestination {
  /** The type of action to perform on the address. The following are possible values: PUT: add the addresses to the suppression list. If the record already exists, it will override it with the new value. D */
  SuppressionListImportAction: 'DELETE' | 'PUT';
}

export interface ContactListDestination {
  /** The name of the contact list. */
  ContactListName: string;
  /** >The type of action to perform on the addresses. The following are the possible values: PUT: add the addresses to the contact list. If the record already exists, it will override it with the new value */
  ContactListImportAction: 'DELETE' | 'PUT';
}

export interface ImportDestination {
  /** An object that contains the action of the import job towards suppression list. */
  SuppressionListDestination?: SuppressionListDestination;
  /** An object that contains the action of the import job towards a contact list. */
  ContactListDestination?: ContactListDestination;
}

export interface ImportDataSource {
  /** An Amazon S3 URL in the format s3:///. */
  S3Url: string;
  /** The data format of the import job's data source. */
  DataFormat: 'CSV' | 'JSON';
}

export interface Details {
  /** A list of route configuration details. Must contain exactly one route configuration. */
  RoutesDetails: any[];
}

export interface TopicFilter {
  /** The name of a topic on which you wish to apply the filter. */
  TopicName?: string;
  /** Notes that the default subscription status should be applied to a contact because the contact has not noted their preference for subscribing to a topic. */
  UseDefaultIfPreferenceUnavailable?: boolean;
}

export interface ListContactsFilter {
  /** The status by which you are filtering: OPT_IN or OPT_OUT. */
  FilteredStatus?: 'OPT_IN' | 'OPT_OUT';
  /** Used for filtering by a specific topic preference. */
  TopicFilter?: TopicFilter;
}

export interface SuppressionConditionThreshold {
  /** Indicates whether Auto Validation is enabled for suppression. Set to ENABLED to enable the Auto Validation feature, or set to DISABLED to disable it. */
  ConditionThresholdEnabled: 'ENABLED' | 'DISABLED';
  /** The overall confidence threshold used to determine suppression decisions. */
  OverallConfidenceThreshold?: any;
}

export interface SuppressionValidationAttributes {
  /** Specifies the condition threshold settings for account-level suppression. */
  ConditionThreshold: SuppressionConditionThreshold;
}

export interface DashboardAttributes {
  /** Specifies the status of your VDM engagement metrics collection. Can be one of the following: ENABLED – Amazon SES enables engagement metrics for your account. DISABLED – Amazon SES disables engagement */
  EngagementMetrics?: 'ENABLED' | 'DISABLED';
}

export interface GuardianAttributes {
  /** Specifies the status of your VDM optimized shared delivery. Can be one of the following: ENABLED – Amazon SES enables optimized shared delivery for your account. DISABLED – Amazon SES disables optimiz */
  OptimizedSharedDelivery?: 'ENABLED' | 'DISABLED';
}

export interface VdmAttributes {
  /** Specifies the status of your VDM configuration. Can be one of the following: ENABLED – Amazon SES enables VDM for your account. DISABLED – Amazon SES disables VDM for your account. */
  VdmEnabled: 'ENABLED' | 'DISABLED';
  /** Specifies additional settings for your VDM configuration as applicable to the Dashboard. */
  DashboardAttributes?: DashboardAttributes;
  /** Specifies additional settings for your VDM configuration as applicable to the Guardian. */
  GuardianAttributes?: GuardianAttributes;
}

export interface DomainDeliverabilityTrackingOption {
  /** A verified domain that’s associated with your Amazon Web Services account and currently has an active Deliverability dashboard subscription. */
  Domain?: string;
  /** The date when you enabled the Deliverability dashboard for the domain. */
  SubscriptionStartDate?: string;
  /** An object that contains information about the inbox placement data settings for the domain. */
  InboxPlacementTrackingOption?: any;
}

export interface MessageTag {
  /** The name of the message tag. The message tag name has to meet the following criteria: It can only contain ASCII letters (a–z, A–Z), numbers (0–9), underscores (_), or dashes (-). It can contain no mor */
  Name: string;
  /** The value of the message tag. The message tag value has to meet the following criteria: It can only contain ASCII letters (a–z, A–Z), numbers (0–9), underscores (_), or dashes (-). It can contain no m */
  Value: string;
}

export interface BulkEmailContent {
  /** The template to use for the bulk email message. */
  Template?: Template;
}

export interface BulkEmailEntry {
  /** Represents the destination of the message, consisting of To:, CC:, and BCC: fields. Amazon SES does not support the SMTPUTF8 extension, as described in RFC6531. For this reason, the local part of a de */
  Destination: any;
  /** A list of tags, in the form of name/value pairs, to apply to an email that you send using the SendBulkTemplatedEmail operation. Tags correspond to characteristics of the email that you define, so that */
  ReplacementTags?: any[];
  /** The ReplacementEmailContent associated with a BulkEmailEntry. */
  ReplacementEmailContent?: any;
  /** The list of message headers associated with the BulkEmailEntry data type. Headers Not Present in BulkEmailEntry: If a header is specified in Template but not in BulkEmailEntry, the header from Templat */
  ReplacementHeaders?: any[];
}

export interface Destination {
  /** An array that contains the email addresses of the "To" recipients for the email. */
  ToAddresses?: string[];
  /** An array that contains the email addresses of the "CC" (carbon copy) recipients for the email. */
  CcAddresses?: string[];
  /** An array that contains the email addresses of the "BCC" (blind carbon copy) recipients for the email. */
  BccAddresses?: string[];
}

export interface ListManagementOptions {
  /** The name of the contact list. */
  ContactListName: string;
  /** The name of the topic. */
  TopicName?: string;
}

/** Represents a request to retrieve a batch of metric data. */
export interface BatchGetMetricDataInput {
  /** A list of queries for metrics to be retrieved. */
  Queries: BatchGetMetricDataQuery[];
}

/** Represents a request to cancel an export job using the export job ID. */
export interface CancelExportJobInput {
  /** The export job ID. */
  JobId: string;
}

/** A request to create a configuration set. */
export interface CreateConfigurationSetInput {
  /** The name of the configuration set. The name can contain up to 64 alphanumeric characters, including letters, numbers, hyphens (-) and underscores (_) only. */
  ConfigurationSetName: string;
  /** An object that defines the MailManager archiving options for emails that you send using the configuration set. */
  ArchivingOptions?: ArchivingOptions;
  /** An object that defines the dedicated IP pool that is used to send emails that you send using the configuration set. */
  DeliveryOptions?: DeliveryOptions;
  /** An object that defines whether or not Amazon SES collects reputation metrics for the emails that you send that use the configuration set. */
  ReputationOptions?: ReputationOptions;
  /** An object that defines whether or not Amazon SES can send email that you send using the configuration set. */
  SendingOptions?: SendingOptions;
  SuppressionOptions?: SuppressionOptions;
  /** An array of objects that define the tags (keys and values) to associate with the configuration set. */
  Tags?: Tag[];
  /** An object that defines the open and click tracking options for emails that you send using the configuration set. */
  TrackingOptions?: TrackingOptions;
  /** An object that defines the VDM options for emails that you send using the configuration set. */
  VdmOptions?: VdmOptions;
}

/** A request to add an event destination to a configuration set. */
export interface CreateConfigurationSetEventDestinationInput {
  /** The name of the configuration set . */
  ConfigurationSetName: string;
  /** An object that defines the event destination. */
  EventDestination: EventDestinationDefinition;
  /** A name that identifies the event destination within the configuration set. */
  EventDestinationName: string;
}

export interface CreateContactInput {
  /** The name of the contact list to which the contact should be added. */
  ContactListName: string;
  /** The contact's email address. */
  EmailAddress: string;
  /** The attribute data attached to a contact. */
  AttributesData?: string;
  /** The contact's preferences for being opted-in to or opted-out of topics. */
  TopicPreferences?: TopicPreference[];
  /** A boolean value status noting if the contact is unsubscribed from all contact list topics. */
  UnsubscribeAll?: boolean;
}

export interface CreateContactListInput {
  /** The name of the contact list. */
  ContactListName: string;
  /** A description of what the contact list is about. */
  Description?: string;
  /** The tags associated with a contact list. */
  Tags?: Tag[];
  /** An interest group, theme, or label within a list. A contact list can have multiple topics. */
  Topics?: Topic[];
}

/** Represents a request to create a custom verification email template. */
export interface CreateCustomVerificationEmailTemplateInput {
  /** The URL that the recipient of the verification email is sent to if his or her address is not successfully verified. */
  FailureRedirectionURL: string;
  /** The email address that the custom verification email is sent from. */
  FromEmailAddress: string;
  /** The URL that the recipient of the verification email is sent to if his or her address is successfully verified. */
  SuccessRedirectionURL: string;
  /** The content of the custom verification email. The total size of the email must be less than 10 MB. The message body may contain HTML, with some limitations. For more information, see Custom verificati */
  TemplateContent: string;
  /** The name of the custom verification email template. */
  TemplateName: string;
  /** The subject line of the custom verification email. */
  TemplateSubject: string;
  /** An array of objects that define the tags (keys and values) to associate with the custom verification email template. */
  Tags?: Tag[];
}

/** A request to create a new dedicated IP pool. */
export interface CreateDedicatedIpPoolInput {
  /** The name of the dedicated IP pool. */
  PoolName: string;
  /** The type of scaling mode. */
  ScalingMode?: 'STANDARD' | 'MANAGED';
  /** An object that defines the tags (keys and values) that you want to associate with the pool. */
  Tags?: Tag[];
}

/** A request to perform a predictive inbox placement test. Predictive inbox placement tests can help you predict how your messages will be handled by various email providers around the world. When you pe */
export interface CreateDeliverabilityTestReportInput {
  /** The HTML body of the message that you sent when you performed the predictive inbox placement test. */
  Content: EmailContent;
  /** The email address that the predictive inbox placement test email was sent from. */
  FromEmailAddress: string;
  /** A unique name that helps you to identify the predictive inbox placement test when you retrieve the results. */
  ReportName?: string;
  /** An array of objects that define the tags (keys and values) that you want to associate with the predictive inbox placement test. */
  Tags?: Tag[];
}

/** A request to begin the verification process for an email identity (an email address or domain). */
export interface CreateEmailIdentityInput {
  /** The email address or domain to verify. */
  EmailIdentity: string;
  /** The configuration set to use by default when sending from this identity. Note that any configuration set defined in the email sending request takes precedence. */
  ConfigurationSetName?: string;
  /** If your request includes this object, Amazon SES configures the identity to use Bring Your Own DKIM (BYODKIM) for DKIM authentication purposes, or, configures the key length to be used for Easy DKIM.  */
  DkimSigningAttributes?: DkimSigningAttributes;
  /** An array of objects that define the tags (keys and values) to associate with the email identity. */
  Tags?: Tag[];
}

/** Represents a request to create a sending authorization policy for an identity. Sending authorization is an Amazon SES feature that enables you to authorize other senders to use your identities. For in */
export interface CreateEmailIdentityPolicyInput {
  /** The email identity. */
  EmailIdentity: string;
  /** The text of the policy in JSON format. The policy cannot exceed 4 KB. For information about the syntax of sending authorization policies, see the Amazon SES Developer Guide. */
  Policy: string;
  /** The name of the policy. The policy name cannot exceed 64 characters and can only include alphanumeric characters, dashes, and underscores. */
  PolicyName: string;
}

/** Represents a request to create an email template. For more information, see the Amazon SES Developer Guide. */
export interface CreateEmailTemplateInput {
  /** The content of the email template, composed of a subject line, an HTML part, and a text-only part. */
  TemplateContent: EmailTemplateContent;
  /** The name of the template. */
  TemplateName: string;
  /** An array of objects that define the tags (keys and values) to associate with the email template. */
  Tags?: Tag[];
}

/** Represents a request to create an export job from a data source to a data destination. */
export interface CreateExportJobInput {
  /** The data source for the export job. */
  ExportDataSource: ExportDataSource;
  /** The destination for the export job. */
  ExportDestination: ExportDestination;
}

/** Represents a request to create an import job from a data source for a data destination. */
export interface CreateImportJobInput {
  /** The data source for the import job. */
  ImportDataSource: ImportDataSource;
  /** The destination for the import job. */
  ImportDestination: ImportDestination;
}

/** Represents a request to create a multi-region endpoint (global-endpoint). */
export interface CreateMultiRegionEndpointInput {
  /** Contains details of a multi-region endpoint (global-endpoint) being created. */
  Details: Details;
  /** The name of the multi-region endpoint (global-endpoint). */
  EndpointName: string;
  /** An array of objects that define the tags (keys and values) to associate with the multi-region endpoint (global-endpoint). */
  Tags?: Tag[];
}

/** Represents a request to create a tenant. Tenants are logical containers that group related SES resources together. Each tenant can have its own set of resources like email identities, configuration se */
export interface CreateTenantInput {
  /** The name of the tenant to create. The name can contain up to 64 alphanumeric characters, including letters, numbers, hyphens (-) and underscores (_) only. */
  TenantName: string;
  /** An array of objects that define the tags (keys and values) to associate with the tenant */
  Tags?: Tag[];
}

/** Represents a request to associate a resource with a tenant. Resources can be email identities, configuration sets, or email templates. When you associate a resource with a tenant, you can use that res */
export interface CreateTenantResourceAssociationInput {
  /** The Amazon Resource Name (ARN) of the resource to associate with the tenant. */
  ResourceArn: string;
  /** The name of the tenant to associate the resource with. */
  TenantName: string;
}

/** A request to delete a configuration set. */
export interface DeleteConfigurationSetInput {
  /** The name of the configuration set. */
  ConfigurationSetName: string;
}

/** A request to delete an event destination from a configuration set. */
export interface DeleteConfigurationSetEventDestinationInput {
  /** The name of the configuration set that contains the event destination to delete. */
  ConfigurationSetName: string;
  /** The name of the event destination to delete. */
  EventDestinationName: string;
}

export interface DeleteContactInput {
  /** The name of the contact list from which the contact should be removed. */
  ContactListName: string;
  /** The contact's email address. */
  EmailAddress: string;
}

export interface DeleteContactListInput {
  /** The name of the contact list. */
  ContactListName: string;
}

/** Represents a request to delete an existing custom verification email template. */
export interface DeleteCustomVerificationEmailTemplateInput {
  /** The name of the custom verification email template that you want to delete. */
  TemplateName: string;
}

/** A request to delete a dedicated IP pool. */
export interface DeleteDedicatedIpPoolInput {
  /** The name of the dedicated IP pool that you want to delete. */
  PoolName: string;
}

/** A request to delete an existing email identity. When you delete an identity, you lose the ability to send email from that identity. You can restore your ability to send email by completing the verific */
export interface DeleteEmailIdentityInput {
  /** The identity (that is, the email address or domain) to delete. */
  EmailIdentity: string;
}

/** Represents a request to delete a sending authorization policy for an identity. Sending authorization is an Amazon SES feature that enables you to authorize other senders to use your identities. For in */
export interface DeleteEmailIdentityPolicyInput {
  /** The email identity. */
  EmailIdentity: string;
  /** The name of the policy. The policy name cannot exceed 64 characters and can only include alphanumeric characters, dashes, and underscores. */
  PolicyName: string;
}

/** Represents a request to delete an email template. For more information, see the Amazon SES Developer Guide. */
export interface DeleteEmailTemplateInput {
  /** The name of the template to be deleted. */
  TemplateName: string;
}

/** Represents a request to delete a multi-region endpoint (global-endpoint). */
export interface DeleteMultiRegionEndpointInput {
  /** The name of the multi-region endpoint (global-endpoint) to be deleted. */
  EndpointName: string;
}

/** A request to remove an email address from the suppression list for your account. */
export interface DeleteSuppressedDestinationInput {
  /** The suppressed email destination to remove from the account suppression list. */
  EmailAddress: string;
}

/** Represents a request to delete a tenant. */
export interface DeleteTenantInput {
  /** The name of the tenant to delete. */
  TenantName: string;
}

/** Represents a request to delete an association between a tenant and a resource. */
export interface DeleteTenantResourceAssociationInput {
  /** The Amazon Resource Name (ARN) of the resource to remove from the tenant association. */
  ResourceArn: string;
  /** The name of the tenant to remove the resource association from. */
  TenantName: string;
}

/** A request to retrieve a list of the blacklists that your dedicated IP addresses appear on. */
export interface GetBlacklistReportsInput {
  /** A list of IP addresses that you want to retrieve blacklist information about. You can only specify the dedicated IP addresses that you use to send email using Amazon SES or Amazon Pinpoint. */
  BlacklistItemNames: string[];
}

/** A request to obtain information about a configuration set. */
export interface GetConfigurationSetInput {
  /** The name of the configuration set. */
  ConfigurationSetName: string;
}

/** A request to obtain information about the event destinations for a configuration set. */
export interface GetConfigurationSetEventDestinationsInput {
  /** The name of the configuration set that contains the event destination. */
  ConfigurationSetName: string;
}

export interface GetContactInput {
  /** The name of the contact list to which the contact belongs. */
  ContactListName: string;
  /** The contact's email address. */
  EmailAddress: string;
}

export interface GetContactListInput {
  /** The name of the contact list. */
  ContactListName: string;
}

/** Represents a request to retrieve an existing custom verification email template. */
export interface GetCustomVerificationEmailTemplateInput {
  /** The name of the custom verification email template that you want to retrieve. */
  TemplateName: string;
}

/** A request to obtain more information about a dedicated IP address. */
export interface GetDedicatedIpInput {
  /** The IP address that you want to obtain more information about. The value you specify has to be a dedicated IP address that's assocaited with your Amazon Web Services account. */
  Ip: string;
}

/** A request to obtain more information about a dedicated IP pool. */
export interface GetDedicatedIpPoolInput {
  /** The name of the dedicated IP pool to retrieve. */
  PoolName: string;
}

/** A request to obtain more information about dedicated IP pools. */
export interface GetDedicatedIpsInput {
  /** A token returned from a previous call to GetDedicatedIps to indicate the position of the dedicated IP pool in the list of IP pools. */
  NextToken?: string;
  /** The number of results to show in a single call to GetDedicatedIpsRequest. If the number of results is larger than the number you specified in this parameter, then the response includes a NextToken ele */
  PageSize?: number;
  /** The name of the IP pool that the dedicated IP address is associated with. */
  PoolName?: string;
}

/** A request to retrieve the results of a predictive inbox placement test. */
export interface GetDeliverabilityTestReportInput {
  /** A unique string that identifies the predictive inbox placement test. */
  ReportId: string;
}

/** Retrieve all the deliverability data for a specific campaign. This data is available for a campaign only if the campaign sent email by using a domain that the Deliverability dashboard is enabled for ( */
export interface GetDomainDeliverabilityCampaignInput {
  /** The unique identifier for the campaign. The Deliverability dashboard automatically generates and assigns this identifier to a campaign. */
  CampaignId: string;
}

/** A request to obtain deliverability metrics for a domain. */
export interface GetDomainStatisticsReportInput {
  /** The domain that you want to obtain deliverability metrics for. */
  Domain: string;
  /** The last day (in Unix time) that you want to obtain domain deliverability metrics for. The EndDate that you specify has to be less than or equal to 30 days after the StartDate. */
  EndDate: string;
  /** The first day (in Unix time) that you want to obtain domain deliverability metrics for. */
  StartDate: string;
}

/** A request to return validation insights about an email address. */
export interface GetEmailAddressInsightsInput {
  /** The email address to analyze for validation insights. */
  EmailAddress: string;
}

/** A request to return details about an email identity. */
export interface GetEmailIdentityInput {
  /** The email identity. */
  EmailIdentity: string;
}

/** A request to return the policies of an email identity. */
export interface GetEmailIdentityPoliciesInput {
  /** The email identity. */
  EmailIdentity: string;
}

/** Represents a request to display the template object (which includes the subject line, HTML part and text part) for the template you specify. */
export interface GetEmailTemplateInput {
  /** The name of the template. */
  TemplateName: string;
}

/** Represents a request to retrieve information about an export job using the export job ID. */
export interface GetExportJobInput {
  /** The export job ID. */
  JobId: string;
}

/** Represents a request for information about an import job using the import job ID. */
export interface GetImportJobInput {
  /** The ID of the import job. */
  JobId: string;
}

/** A request to return information about a message. */
export interface GetMessageInsightsInput {
  /** A MessageId is a unique identifier for a message, and is returned when sending emails through Amazon SES. */
  MessageId: string;
}

/** Represents a request to display the multi-region endpoint (global-endpoint). */
export interface GetMultiRegionEndpointInput {
  /** The name of the multi-region endpoint (global-endpoint). */
  EndpointName: string;
}

/** Represents a request to retrieve information about a specific reputation entity. */
export interface GetReputationEntityInput {
  /** The unique identifier for the reputation entity. For resource-type entities, this is the Amazon Resource Name (ARN) of the resource. */
  ReputationEntityReference: string;
  /** The type of reputation entity. Currently, only RESOURCE type entities are supported. */
  ReputationEntityType: 'RESOURCE';
}

/** A request to retrieve information about an email address that's on the suppression list for your account. */
export interface GetSuppressedDestinationInput {
  /** The email address that's on the account suppression list. */
  EmailAddress: string;
}

/** Represents a request to get information about a specific tenant. */
export interface GetTenantInput {
  /** The name of the tenant to retrieve information about. */
  TenantName: string;
}

/** A request to obtain a list of configuration sets for your Amazon SES account in the current Amazon Web Services Region. */
export interface ListConfigurationSetsInput {
  /** A token returned from a previous call to ListConfigurationSets to indicate the position in the list of configuration sets. */
  NextToken?: string;
  /** The number of results to show in a single call to ListConfigurationSets. If the number of results is larger than the number you specified in this parameter, then the response includes a NextToken elem */
  PageSize?: number;
}

export interface ListContactListsInput {
  /** A string token indicating that there might be additional contact lists available to be listed. Use the token provided in the Response to use in the subsequent call to ListContactLists with the same pa */
  NextToken?: string;
  /** Maximum number of contact lists to return at once. Use this parameter to paginate results. If additional contact lists exist beyond the specified limit, the NextToken element is sent in the response.  */
  PageSize?: number;
}

export interface ListContactsInput {
  /** The name of the contact list. */
  ContactListName: string;
  /** A filter that can be applied to a list of contacts. */
  Filter?: ListContactsFilter;
  /** A string token indicating that there might be additional contacts available to be listed. Use the token provided in the Response to use in the subsequent call to ListContacts with the same parameters  */
  NextToken?: string;
  /** The number of contacts that may be returned at once, which is dependent on if there are more or less contacts than the value of the PageSize. Use this parameter to paginate results. If additional cont */
  PageSize?: number;
}

/** Represents a request to list the existing custom verification email templates for your account. */
export interface ListCustomVerificationEmailTemplatesInput {
  /** A token returned from a previous call to ListCustomVerificationEmailTemplates to indicate the position in the list of custom verification email templates. */
  NextToken?: string;
  /** The number of results to show in a single call to ListCustomVerificationEmailTemplates. If the number of results is larger than the number you specified in this parameter, then the response includes a */
  PageSize?: number;
}

/** A request to obtain a list of dedicated IP pools. */
export interface ListDedicatedIpPoolsInput {
  /** A token returned from a previous call to ListDedicatedIpPools to indicate the position in the list of dedicated IP pools. */
  NextToken?: string;
  /** The number of results to show in a single call to ListDedicatedIpPools. If the number of results is larger than the number you specified in this parameter, then the response includes a NextToken eleme */
  PageSize?: number;
}

/** A request to list all of the predictive inbox placement tests that you've performed. */
export interface ListDeliverabilityTestReportsInput {
  /** A token returned from a previous call to ListDeliverabilityTestReports to indicate the position in the list of predictive inbox placement tests. */
  NextToken?: string;
  /** The number of results to show in a single call to ListDeliverabilityTestReports. If the number of results is larger than the number you specified in this parameter, then the response includes a NextTo */
  PageSize?: number;
}

/** Retrieve deliverability data for all the campaigns that used a specific domain to send email during a specified time range. This data is available for a domain only if you enabled the Deliverability d */
export interface ListDomainDeliverabilityCampaignsInput {
  /** The last day that you want to obtain deliverability data for. This value has to be less than or equal to 30 days after the value of the StartDate parameter. */
  EndDate: string;
  /** The first day that you want to obtain deliverability data for. */
  StartDate: string;
  /** The domain to obtain deliverability data for. */
  SubscribedDomain: string;
  /** A token that’s returned from a previous call to the ListDomainDeliverabilityCampaigns operation. This token indicates the position of a campaign in the list of campaigns. */
  NextToken?: string;
  /** The maximum number of results to include in response to a single call to the ListDomainDeliverabilityCampaigns operation. If the number of results is larger than the number that you specify in this pa */
  PageSize?: number;
}

/** A request to list all of the email identities associated with your Amazon Web Services account. This list includes identities that you've already verified, identities that are unverified, and identiti */
export interface ListEmailIdentitiesInput {
  /** A token returned from a previous call to ListEmailIdentities to indicate the position in the list of identities. */
  NextToken?: string;
  /** The number of results to show in a single call to ListEmailIdentities. If the number of results is larger than the number you specified in this parameter, then the response includes a NextToken elemen */
  PageSize?: number;
}

/** Represents a request to list the email templates present in your Amazon SES account in the current Amazon Web Services Region. For more information, see the Amazon SES Developer Guide. */
export interface ListEmailTemplatesInput {
  /** A token returned from a previous call to ListEmailTemplates to indicate the position in the list of email templates. */
  NextToken?: string;
  /** The number of results to show in a single call to ListEmailTemplates. If the number of results is larger than the number you specified in this parameter, then the response includes a NextToken element */
  PageSize?: number;
}

/** Represents a request to list all export jobs with filters. */
export interface ListExportJobsInput {
  /** A value used to list export jobs that have a certain ExportSourceType. */
  ExportSourceType?: 'METRICS_DATA' | 'MESSAGE_INSIGHTS';
  /** A value used to list export jobs that have a certain JobStatus. */
  JobStatus?: 'CREATED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  /** The pagination token returned from a previous call to ListExportJobs to indicate the position in the list of export jobs. */
  NextToken?: string;
  /** Maximum number of export jobs to return at once. Use this parameter to paginate results. If additional export jobs exist beyond the specified limit, the NextToken element is sent in the response. Use  */
  PageSize?: number;
}

/** Represents a request to list all of the import jobs for a data destination within the specified maximum number of import jobs. */
export interface ListImportJobsInput {
  /** The destination of the import job, which can be used to list import jobs that have a certain ImportDestinationType. */
  ImportDestinationType?: 'SUPPRESSION_LIST' | 'CONTACT_LIST';
  /** A string token indicating that there might be additional import jobs available to be listed. Copy this token to a subsequent call to ListImportJobs with the same parameters to retrieve the next page o */
  NextToken?: string;
  /** Maximum number of import jobs to return at once. Use this parameter to paginate results. If additional import jobs exist beyond the specified limit, the NextToken element is sent in the response. Use  */
  PageSize?: number;
}

/** Represents a request to list all the multi-region endpoints (global-endpoints) whose primary region is the AWS-Region where operation is executed. */
export interface ListMultiRegionEndpointsInput {
  /** A token returned from a previous call to ListMultiRegionEndpoints to indicate the position in the list of multi-region endpoints (global-endpoints). */
  NextToken?: string;
  /** The number of results to show in a single call to ListMultiRegionEndpoints. If the number of results is larger than the number you specified in this parameter, the response includes a NextToken elemen */
  PageSize?: number;
}

/** Represents a request to list the existing recommendations for your account. */
export interface ListRecommendationsInput {
  /** Filters applied when retrieving recommendations. Can eiter be an individual filter, or combinations of STATUS and IMPACT or STATUS and TYPE */
  Filter?: Record<string, string>;
  /** A token returned from a previous call to ListRecommendations to indicate the position in the list of recommendations. */
  NextToken?: string;
  /** The number of results to show in a single call to ListRecommendations. If the number of results is larger than the number you specified in this parameter, then the response includes a NextToken elemen */
  PageSize?: number;
}

/** Represents a request to list reputation entities with optional filtering. */
export interface ListReputationEntitiesInput {
  /** An object that contains filters to apply when listing reputation entities. You can filter by entity type, reputation impact, sending status, or entity reference prefix. */
  Filter?: Record<string, string>;
  /** A token returned from a previous call to ListReputationEntities to indicate the position in the list of reputation entities. */
  NextToken?: string;
  /** The number of results to show in a single call to ListReputationEntities. If the number of results is larger than the number you specified in this parameter, then the response includes a NextToken ele */
  PageSize?: number;
}

/** Represents a request to list tenants associated with a specific resource. */
export interface ListResourceTenantsInput {
  /** The Amazon Resource Name (ARN) of the resource to list associated tenants for. */
  ResourceArn: string;
  /** A token returned from a previous call to ListResourceTenants to indicate the position in the list of resource tenants. */
  NextToken?: string;
  /** The number of results to show in a single call to ListResourceTenants. If the number of results is larger than the number you specified in this parameter, then the response includes a NextToken elemen */
  PageSize?: number;
}

/** A request to obtain a list of email destinations that are on the suppression list for your account. */
export interface ListSuppressedDestinationsInput {
  /** Used to filter the list of suppressed email destinations so that it only includes addresses that were added to the list before a specific date. */
  EndDate?: string;
  /** A token returned from a previous call to ListSuppressedDestinations to indicate the position in the list of suppressed email addresses. */
  NextToken?: string;
  /** The number of results to show in a single call to ListSuppressedDestinations. If the number of results is larger than the number you specified in this parameter, then the response includes a NextToken */
  PageSize?: number;
  /** The factors that caused the email address to be added to . */
  Reasons?: 'BOUNCE' | 'COMPLAINT'[];
  /** Used to filter the list of suppressed email destinations so that it only includes addresses that were added to the list after a specific date. */
  StartDate?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the resource that you want to retrieve tag information for. */
  ResourceArn: string;
}

/** Represents a request to list resources associated with a specific tenant. */
export interface ListTenantResourcesInput {
  /** The name of the tenant to list resources for. */
  TenantName: string;
  /** A map of filter keys and values for filtering the list of tenant resources. Currently, the only supported filter key is RESOURCE_TYPE. */
  Filter?: Record<string, string>;
  /** A token returned from a previous call to ListTenantResources to indicate the position in the list of tenant resources. */
  NextToken?: string;
  /** The number of results to show in a single call to ListTenantResources. If the number of results is larger than the number you specified in this parameter, then the response includes a NextToken elemen */
  PageSize?: number;
}

/** Represents a request to list all tenants associated with your account in the current Amazon Web Services Region. */
export interface ListTenantsInput {
  /** A token returned from a previous call to ListTenants to indicate the position in the list of tenants. */
  NextToken?: string;
  /** The number of results to show in a single call to ListTenants. If the number of results is larger than the number you specified in this parameter, then the response includes a NextToken element, which */
  PageSize?: number;
}

/** A request to enable or disable the automatic IP address warm-up feature. */
export interface PutAccountDedicatedIpWarmupAttributesInput {
  /** Enables or disables the automatic warm-up feature for dedicated IP addresses that are associated with your Amazon SES account in the current Amazon Web Services Region. Set to true to enable the autom */
  AutoWarmupEnabled?: boolean;
}

/** A request to submit new account details. */
export interface PutAccountDetailsInput {
  /** The type of email your account will send. */
  MailType: 'MARKETING' | 'TRANSACTIONAL';
  /** The URL of your website. This information helps us better understand the type of content that you plan to send. */
  WebsiteURL: string;
  /** Additional email addresses that you would like to be notified regarding Amazon SES matters. */
  AdditionalContactEmailAddresses?: string[];
  /** The language you would prefer to be contacted with. */
  ContactLanguage?: 'EN' | 'JA';
  /** Indicates whether or not your account should have production access in the current Amazon Web Services Region. If the value is false, then your account is in the sandbox. When your account is in the s */
  ProductionAccessEnabled?: boolean;
  /** A description of the types of email that you plan to send. */
  UseCaseDescription?: string;
}

/** A request to change the ability of your account to send email. */
export interface PutAccountSendingAttributesInput {
  /** Enables or disables your account's ability to send email. Set to true to enable email sending, or set to false to disable email sending. If Amazon Web Services paused your account's ability to send em */
  SendingEnabled?: boolean;
}

/** A request to change your account's suppression preferences. */
export interface PutAccountSuppressionAttributesInput {
  /** A list that contains the reasons that email addresses will be automatically added to the suppression list for your account. This list can contain any or all of the following: COMPLAINT – Amazon SES ad */
  SuppressedReasons?: 'BOUNCE' | 'COMPLAINT'[];
  /** An object that contains additional suppression attributes for your account. */
  ValidationAttributes?: SuppressionValidationAttributes;
}

/** A request to submit new account VDM attributes. */
export interface PutAccountVdmAttributesInput {
  /** The VDM attributes that you wish to apply to your Amazon SES account. */
  VdmAttributes: VdmAttributes;
}

/** A request to associate a configuration set with a MailManager archive. */
export interface PutConfigurationSetArchivingOptionsInput {
  /** The name of the configuration set to associate with a MailManager archive. */
  ConfigurationSetName: string;
  /** The Amazon Resource Name (ARN) of the MailManager archive that the Amazon SES API v2 sends email to. */
  ArchiveArn?: string;
}

/** A request to associate a configuration set with a dedicated IP pool. */
export interface PutConfigurationSetDeliveryOptionsInput {
  /** The name of the configuration set to associate with a dedicated IP pool. */
  ConfigurationSetName: string;
  /** The maximum amount of time, in seconds, that Amazon SES API v2 will attempt delivery of email. If specified, the value must greater than or equal to 300 seconds (5 minutes) and less than or equal to 5 */
  MaxDeliverySeconds?: number;
  /** The name of the dedicated IP pool to associate with the configuration set. */
  SendingPoolName?: string;
  /** Specifies whether messages that use the configuration set are required to use Transport Layer Security (TLS). If the value is Require, messages are only delivered if a TLS connection can be establishe */
  TlsPolicy?: 'REQUIRE' | 'OPTIONAL';
}

/** A request to enable or disable tracking of reputation metrics for a configuration set. */
export interface PutConfigurationSetReputationOptionsInput {
  /** The name of the configuration set. */
  ConfigurationSetName: string;
  /** If true, tracking of reputation metrics is enabled for the configuration set. If false, tracking of reputation metrics is disabled for the configuration set. */
  ReputationMetricsEnabled?: boolean;
}

/** A request to enable or disable the ability of Amazon SES to send emails that use a specific configuration set. */
export interface PutConfigurationSetSendingOptionsInput {
  /** The name of the configuration set to enable or disable email sending for. */
  ConfigurationSetName: string;
  /** If true, email sending is enabled for the configuration set. If false, email sending is disabled for the configuration set. */
  SendingEnabled?: boolean;
}

/** A request to change the account suppression list preferences for a specific configuration set. */
export interface PutConfigurationSetSuppressionOptionsInput {
  /** The name of the configuration set to change the suppression list preferences for. */
  ConfigurationSetName: string;
  /** A list that contains the reasons that email addresses are automatically added to the suppression list for your account. This list can contain any or all of the following: COMPLAINT – Amazon SES adds a */
  SuppressedReasons?: 'BOUNCE' | 'COMPLAINT'[];
  /** An object that contains information about the email address suppression preferences for the configuration set in the current Amazon Web Services Region. */
  ValidationOptions?: SuppressionValidationOptions;
}

/** A request to add a custom domain for tracking open and click events to a configuration set. */
export interface PutConfigurationSetTrackingOptionsInput {
  /** The name of the configuration set. */
  ConfigurationSetName: string;
  /** The domain to use to track open and click events. */
  CustomRedirectDomain?: string;
  HttpsPolicy?: 'REQUIRE' | 'REQUIRE_OPEN_ONLY' | 'OPTIONAL';
}

/** A request to add specific VDM settings to a configuration set. */
export interface PutConfigurationSetVdmOptionsInput {
  /** The name of the configuration set. */
  ConfigurationSetName: string;
  /** The VDM options to apply to the configuration set. */
  VdmOptions?: VdmOptions;
}

/** A request to move a dedicated IP address to a dedicated IP pool. */
export interface PutDedicatedIpInPoolInput {
  /** The name of the IP pool that you want to add the dedicated IP address to. You have to specify an IP pool that already exists. */
  DestinationPoolName: string;
  /** The IP address that you want to move to the dedicated IP pool. The value you specify has to be a dedicated IP address that's associated with your Amazon Web Services account. */
  Ip: string;
}

/** A request to convert a dedicated IP pool to a different scaling mode. */
export interface PutDedicatedIpPoolScalingAttributesInput {
  /** The name of the dedicated IP pool. */
  PoolName: string;
  /** The scaling mode to apply to the dedicated IP pool. Changing the scaling mode from MANAGED to STANDARD is not supported. */
  ScalingMode: 'STANDARD' | 'MANAGED';
}

/** A request to change the warm-up attributes for a dedicated IP address. This operation is useful when you want to resume the warm-up process for an existing IP address. */
export interface PutDedicatedIpWarmupAttributesInput {
  /** The dedicated IP address that you want to update the warm-up attributes for. */
  Ip: string;
  /** The warm-up percentage that you want to associate with the dedicated IP address. */
  WarmupPercentage: number;
}

/** Enable or disable the Deliverability dashboard. When you enable the Deliverability dashboard, you gain access to reputation, deliverability, and other metrics for the domains that you use to send emai */
export interface PutDeliverabilityDashboardOptionInput {
  /** Specifies whether to enable the Deliverability dashboard. To enable the dashboard, set this value to true. */
  DashboardEnabled: boolean;
  /** An array of objects, one for each verified domain that you use to send email and enabled the Deliverability dashboard for. */
  SubscribedDomains?: DomainDeliverabilityTrackingOption[];
}

/** A request to associate a configuration set with an email identity. */
export interface PutEmailIdentityConfigurationSetAttributesInput {
  /** The email address or domain to associate with a configuration set. */
  EmailIdentity: string;
  /** The configuration set to associate with an email identity. */
  ConfigurationSetName?: string;
}

/** A request to enable or disable DKIM signing of email that you send from an email identity. */
export interface PutEmailIdentityDkimAttributesInput {
  /** The email identity. */
  EmailIdentity: string;
  /** Sets the DKIM signing configuration for the identity. When you set this value true, then the messages that are sent from the identity are signed using DKIM. If you set this value to false, your messag */
  SigningEnabled?: boolean;
}

/** A request to change the DKIM attributes for an email identity. */
export interface PutEmailIdentityDkimSigningAttributesInput {
  /** The email identity. */
  EmailIdentity: string;
  /** The method to use to configure DKIM for the identity. There are the following possible values: AWS_SES – Configure DKIM for the identity by using Easy DKIM. EXTERNAL – Configure DKIM for the identity  */
  SigningAttributesOrigin: 'AWS_SES' | 'EXTERNAL' | 'AWS_SES_AF_SOUTH_1' | 'AWS_SES_EU_NORTH_1' | 'AWS_SES_AP_SOUTH_1' | 'AWS_SES_EU_WEST_3' | 'AWS_SES_EU_WEST_2' | 'AWS_SES_EU_SOUTH_1' | 'AWS_SES_EU_WEST_1' | 'AWS_SES_AP_NORTHEAST_3' | 'AWS_SES_AP_NORTHEAST_2' | 'AWS_SES_ME_SOUTH_1' | 'AWS_SES_AP_NORTHEAST_1' | 'AWS_SES_IL_CENTRAL_1' | 'AWS_SES_SA_EAST_1' | 'AWS_SES_CA_CENTRAL_1' | 'AWS_SES_AP_SOUTHEAST_1' | 'AWS_SES_AP_SOUTHEAST_2' | 'AWS_SES_AP_SOUTHEAST_3' | 'AWS_SES_EU_CENTRAL_1' | 'AWS_SES_US_EAST_1' | 'AWS_SES_US_EAST_2' | 'AWS_SES_US_WEST_1' | 'AWS_SES_US_WEST_2' | 'AWS_SES_ME_CENTRAL_1' | 'AWS_SES_AP_SOUTH_2' | 'AWS_SES_EU_CENTRAL_2' | 'AWS_SES_AP_SOUTHEAST_5' | 'AWS_SES_CA_WEST_1';
  /** An object that contains information about the private key and selector that you want to use to configure DKIM for the identity for Bring Your Own DKIM (BYODKIM) for the identity, or, configures the ke */
  SigningAttributes?: DkimSigningAttributes;
}

/** A request to set the attributes that control how bounce and complaint events are processed. */
export interface PutEmailIdentityFeedbackAttributesInput {
  /** The email identity. */
  EmailIdentity: string;
  /** Sets the feedback forwarding configuration for the identity. If the value is true, you receive email notifications when bounce or complaint events occur. These notifications are sent to the address th */
  EmailForwardingEnabled?: boolean;
}

/** A request to configure the custom MAIL FROM domain for a verified identity. */
export interface PutEmailIdentityMailFromAttributesInput {
  /** The verified email identity. */
  EmailIdentity: string;
  /** The action to take if the required MX record isn't found when you send an email. When you set this value to UseDefaultValue, the mail is sent using amazonses.com as the MAIL FROM domain. When you set  */
  BehaviorOnMxFailure?: 'USE_DEFAULT_VALUE' | 'REJECT_MESSAGE';
  /** The custom MAIL FROM domain that you want the verified identity to use. The MAIL FROM domain must meet the following criteria: It has to be a subdomain of the verified identity. It can't be used to re */
  MailFromDomain?: string;
}

/** A request to add an email destination to the suppression list for your account. */
export interface PutSuppressedDestinationInput {
  /** The email address that should be added to the suppression list for your account. */
  EmailAddress: string;
  /** The factors that should cause the email address to be added to the suppression list for your account. */
  Reason: 'BOUNCE' | 'COMPLAINT';
}

/** Represents a request to send email messages to multiple destinations using Amazon SES. For more information, see the Amazon SES Developer Guide. */
export interface SendBulkEmailInput {
  /** The list of bulk email entry objects. */
  BulkEmailEntries: BulkEmailEntry[];
  /** An object that contains the body of the message. You can specify a template message. */
  DefaultContent: BulkEmailContent;
  /** The name of the configuration set to use when sending the email. */
  ConfigurationSetName?: string;
  /** A list of tags, in the form of name/value pairs, to apply to an email that you send using the SendEmail operation. Tags correspond to characteristics of the email that you define, so that you can publ */
  DefaultEmailTags?: MessageTag[];
  /** The ID of the multi-region endpoint (global-endpoint). */
  EndpointId?: string;
  /** The address that you want bounce and complaint notifications to be sent to. */
  FeedbackForwardingEmailAddress?: string;
  /** This parameter is used only for sending authorization. It is the ARN of the identity that is associated with the sending authorization policy that permits you to use the email address specified in the */
  FeedbackForwardingEmailAddressIdentityArn?: string;
  /** The email address to use as the "From" address for the email. The address that you specify has to be verified. */
  FromEmailAddress?: string;
  /** This parameter is used only for sending authorization. It is the ARN of the identity that is associated with the sending authorization policy that permits you to use the email address specified in the */
  FromEmailAddressIdentityArn?: string;
  /** The "Reply-to" email addresses for the message. When the recipient replies to the message, each Reply-to address receives the reply. */
  ReplyToAddresses?: string[];
  /** The name of the tenant through which this bulk email will be sent. The email sending operation will only succeed if all referenced resources (identities, configuration sets, and templates) are associa */
  TenantName?: string;
}

/** Represents a request to send a custom verification email to a specified recipient. */
export interface SendCustomVerificationEmailInput {
  /** The email address to verify. */
  EmailAddress: string;
  /** The name of the custom verification email template to use when sending the verification email. */
  TemplateName: string;
  /** Name of a configuration set to use when sending the verification email. */
  ConfigurationSetName?: string;
}

/** Represents a request to send a single formatted email using Amazon SES. For more information, see the Amazon SES Developer Guide. */
export interface SendEmailInput {
  /** An object that contains the body of the message. You can send either a Simple message, Raw message, or a Templated message. */
  Content: EmailContent;
  /** The name of the configuration set to use when sending the email. */
  ConfigurationSetName?: string;
  /** An object that contains the recipients of the email message. */
  Destination?: Destination;
  /** A list of tags, in the form of name/value pairs, to apply to an email that you send using the SendEmail operation. Tags correspond to characteristics of the email that you define, so that you can publ */
  EmailTags?: MessageTag[];
  /** The ID of the multi-region endpoint (global-endpoint). */
  EndpointId?: string;
  /** The address that you want bounce and complaint notifications to be sent to. */
  FeedbackForwardingEmailAddress?: string;
  /** This parameter is used only for sending authorization. It is the ARN of the identity that is associated with the sending authorization policy that permits you to use the email address specified in the */
  FeedbackForwardingEmailAddressIdentityArn?: string;
  /** The email address to use as the "From" address for the email. The address that you specify has to be verified. */
  FromEmailAddress?: string;
  /** This parameter is used only for sending authorization. It is the ARN of the identity that is associated with the sending authorization policy that permits you to use the email address specified in the */
  FromEmailAddressIdentityArn?: string;
  /** An object used to specify a list or topic to which an email belongs, which will be used when a contact chooses to unsubscribe. */
  ListManagementOptions?: ListManagementOptions;
  /** The "Reply-to" email addresses for the message. When the recipient replies to the message, each Reply-to address receives the reply. */
  ReplyToAddresses?: string[];
  /** The name of the tenant through which this email will be sent. The email sending operation will only succeed if all referenced resources (identities, configuration sets, and templates) are associated w */
  TenantName?: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource that you want to add one or more tags to. */
  ResourceArn: string;
  /** A list of the tags that you want to add to the resource. A tag consists of a required tag key (Key) and an associated tag value (Value). The maximum length of a tag key is 128 characters. The maximum  */
  Tags: Tag[];
}

/** >Represents a request to create a preview of the MIME content of an email when provided with a template and a set of replacement data. */
export interface TestRenderEmailTemplateInput {
  /** A list of replacement values to apply to the template. This parameter is a JSON object, typically consisting of key-value pairs in which the keys correspond to replacement tags in the email template. */
  TemplateData: string;
  /** The name of the template. */
  TemplateName: string;
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource that you want to remove one or more tags from. */
  ResourceArn: string;
  /** The tags (tag keys) that you want to remove from the resource. When you specify a tag key, the action removes both that key and its associated tag value. To remove more than one tag from the resource, */
  TagKeys: string[];
}

/** A request to change the settings for an event destination for a configuration set. */
export interface UpdateConfigurationSetEventDestinationInput {
  /** The name of the configuration set that contains the event destination to modify. */
  ConfigurationSetName: string;
  /** An object that defines the event destination. */
  EventDestination: EventDestinationDefinition;
  /** The name of the event destination. */
  EventDestinationName: string;
}

export interface UpdateContactInput {
  /** The name of the contact list. */
  ContactListName: string;
  /** The contact's email address. */
  EmailAddress: string;
  /** The attribute data attached to a contact. */
  AttributesData?: string;
  /** The contact's preference for being opted-in to or opted-out of a topic. */
  TopicPreferences?: TopicPreference[];
  /** A boolean value status noting if the contact is unsubscribed from all contact list topics. */
  UnsubscribeAll?: boolean;
}

export interface UpdateContactListInput {
  /** The name of the contact list. */
  ContactListName: string;
  /** A description of what the contact list is about. */
  Description?: string;
  /** An interest group, theme, or label within a list. A contact list can have multiple topics. */
  Topics?: Topic[];
}

/** Represents a request to update an existing custom verification email template. */
export interface UpdateCustomVerificationEmailTemplateInput {
  /** The URL that the recipient of the verification email is sent to if his or her address is not successfully verified. */
  FailureRedirectionURL: string;
  /** The email address that the custom verification email is sent from. */
  FromEmailAddress: string;
  /** The URL that the recipient of the verification email is sent to if his or her address is successfully verified. */
  SuccessRedirectionURL: string;
  /** The content of the custom verification email. The total size of the email must be less than 10 MB. The message body may contain HTML, with some limitations. For more information, see Custom verificati */
  TemplateContent: string;
  /** The name of the custom verification email template that you want to update. */
  TemplateName: string;
  /** The subject line of the custom verification email. */
  TemplateSubject: string;
}

/** Represents a request to update a sending authorization policy for an identity. Sending authorization is an Amazon SES feature that enables you to authorize other senders to use your identities. For in */
export interface UpdateEmailIdentityPolicyInput {
  /** The email identity. */
  EmailIdentity: string;
  /** The text of the policy in JSON format. The policy cannot exceed 4 KB. For information about the syntax of sending authorization policies, see the Amazon SES Developer Guide. */
  Policy: string;
  /** The name of the policy. The policy name cannot exceed 64 characters and can only include alphanumeric characters, dashes, and underscores. */
  PolicyName: string;
}

/** Represents a request to update an email template. For more information, see the Amazon SES Developer Guide. */
export interface UpdateEmailTemplateInput {
  /** The content of the email template, composed of a subject line, an HTML part, and a text-only part. */
  TemplateContent: EmailTemplateContent;
  /** The name of the template. */
  TemplateName: string;
}

/** Represents a request to update the customer-managed sending status for a reputation entity. */
export interface UpdateReputationEntityCustomerManagedStatusInput {
  /** The unique identifier for the reputation entity. For resource-type entities, this is the Amazon Resource Name (ARN) of the resource. */
  ReputationEntityReference: string;
  /** The type of reputation entity. Currently, only RESOURCE type entities are supported. */
  ReputationEntityType: 'RESOURCE';
  /** The new customer-managed sending status for the reputation entity. This can be one of the following: ENABLED – Allow sending for this entity. DISABLED – Prevent sending for this entity. REINSTATED – A */
  SendingStatus: 'ENABLED' | 'REINSTATED' | 'DISABLED';
}

/** Represents a request to update the reputation management policy for a reputation entity. */
export interface UpdateReputationEntityPolicyInput {
  /** The Amazon Resource Name (ARN) of the reputation management policy to apply to this entity. This is an Amazon Web Services Amazon SES-managed policy. */
  ReputationEntityPolicy: string;
  /** The unique identifier for the reputation entity. For resource-type entities, this is the Amazon Resource Name (ARN) of the resource. */
  ReputationEntityReference: string;
  /** The type of reputation entity. Currently, only RESOURCE type entities are supported. */
  ReputationEntityType: 'RESOURCE';
}

/** SESv2 service binding for Step Functions SDK integrations. */
export class SESv2 {
  constructor() {}

  batchGetMetricData<T>(params: BatchGetMetricDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelExportJob<T>(params: CancelExportJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createConfigurationSet<T>(params: CreateConfigurationSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createConfigurationSetEventDestination<T>(params: CreateConfigurationSetEventDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createContact<T>(params: CreateContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createContactList<T>(params: CreateContactListInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCustomVerificationEmailTemplate<T>(params: CreateCustomVerificationEmailTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDedicatedIpPool<T>(params: CreateDedicatedIpPoolInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDeliverabilityTestReport<T>(params: CreateDeliverabilityTestReportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEmailIdentity<T>(params: CreateEmailIdentityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEmailIdentityPolicy<T>(params: CreateEmailIdentityPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEmailTemplate<T>(params: CreateEmailTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createExportJob<T>(params: CreateExportJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createImportJob<T>(params: CreateImportJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createMultiRegionEndpoint<T>(params: CreateMultiRegionEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTenant<T>(params: CreateTenantInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTenantResourceAssociation<T>(params: CreateTenantResourceAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteConfigurationSet<T>(params: DeleteConfigurationSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteConfigurationSetEventDestination<T>(params: DeleteConfigurationSetEventDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteContact<T>(params: DeleteContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteContactList<T>(params: DeleteContactListInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCustomVerificationEmailTemplate<T>(params: DeleteCustomVerificationEmailTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDedicatedIpPool<T>(params: DeleteDedicatedIpPoolInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEmailIdentity<T>(params: DeleteEmailIdentityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEmailIdentityPolicy<T>(params: DeleteEmailIdentityPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEmailTemplate<T>(params: DeleteEmailTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteMultiRegionEndpoint<T>(params: DeleteMultiRegionEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSuppressedDestination<T>(params: DeleteSuppressedDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTenant<T>(params: DeleteTenantInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTenantResourceAssociation<T>(params: DeleteTenantResourceAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAccount<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getBlacklistReports<T>(params: GetBlacklistReportsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getConfigurationSet<T>(params: GetConfigurationSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getConfigurationSetEventDestinations<T>(params: GetConfigurationSetEventDestinationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getContact<T>(params: GetContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getContactList<T>(params: GetContactListInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCustomVerificationEmailTemplate<T>(params: GetCustomVerificationEmailTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDedicatedIp<T>(params: GetDedicatedIpInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDedicatedIpPool<T>(params: GetDedicatedIpPoolInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDedicatedIps<T>(params: GetDedicatedIpsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDeliverabilityDashboardOptions<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDeliverabilityTestReport<T>(params: GetDeliverabilityTestReportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDomainDeliverabilityCampaign<T>(params: GetDomainDeliverabilityCampaignInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDomainStatisticsReport<T>(params: GetDomainStatisticsReportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEmailAddressInsights<T>(params: GetEmailAddressInsightsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEmailIdentity<T>(params: GetEmailIdentityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEmailIdentityPolicies<T>(params: GetEmailIdentityPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEmailTemplate<T>(params: GetEmailTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getExportJob<T>(params: GetExportJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getImportJob<T>(params: GetImportJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMessageInsights<T>(params: GetMessageInsightsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMultiRegionEndpoint<T>(params: GetMultiRegionEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getReputationEntity<T>(params: GetReputationEntityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSuppressedDestination<T>(params: GetSuppressedDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTenant<T>(params: GetTenantInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listConfigurationSets<T>(params: ListConfigurationSetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listContactLists<T>(params: ListContactListsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listContacts<T>(params: ListContactsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCustomVerificationEmailTemplates<T>(params: ListCustomVerificationEmailTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDedicatedIpPools<T>(params: ListDedicatedIpPoolsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDeliverabilityTestReports<T>(params: ListDeliverabilityTestReportsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDomainDeliverabilityCampaigns<T>(params: ListDomainDeliverabilityCampaignsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEmailIdentities<T>(params: ListEmailIdentitiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEmailTemplates<T>(params: ListEmailTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listExportJobs<T>(params: ListExportJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listImportJobs<T>(params: ListImportJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMultiRegionEndpoints<T>(params: ListMultiRegionEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRecommendations<T>(params: ListRecommendationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listReputationEntities<T>(params: ListReputationEntitiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listResourceTenants<T>(params: ListResourceTenantsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSuppressedDestinations<T>(params: ListSuppressedDestinationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTenantResources<T>(params: ListTenantResourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTenants<T>(params: ListTenantsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putAccountDedicatedIpWarmupAttributes<T>(params: PutAccountDedicatedIpWarmupAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putAccountDetails<T>(params: PutAccountDetailsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putAccountSendingAttributes<T>(params: PutAccountSendingAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putAccountSuppressionAttributes<T>(params: PutAccountSuppressionAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putAccountVdmAttributes<T>(params: PutAccountVdmAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putConfigurationSetArchivingOptions<T>(params: PutConfigurationSetArchivingOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putConfigurationSetDeliveryOptions<T>(params: PutConfigurationSetDeliveryOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putConfigurationSetReputationOptions<T>(params: PutConfigurationSetReputationOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putConfigurationSetSendingOptions<T>(params: PutConfigurationSetSendingOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putConfigurationSetSuppressionOptions<T>(params: PutConfigurationSetSuppressionOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putConfigurationSetTrackingOptions<T>(params: PutConfigurationSetTrackingOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putConfigurationSetVdmOptions<T>(params: PutConfigurationSetVdmOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDedicatedIpInPool<T>(params: PutDedicatedIpInPoolInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDedicatedIpPoolScalingAttributes<T>(params: PutDedicatedIpPoolScalingAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDedicatedIpWarmupAttributes<T>(params: PutDedicatedIpWarmupAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDeliverabilityDashboardOption<T>(params: PutDeliverabilityDashboardOptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putEmailIdentityConfigurationSetAttributes<T>(params: PutEmailIdentityConfigurationSetAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putEmailIdentityDkimAttributes<T>(params: PutEmailIdentityDkimAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putEmailIdentityDkimSigningAttributes<T>(params: PutEmailIdentityDkimSigningAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putEmailIdentityFeedbackAttributes<T>(params: PutEmailIdentityFeedbackAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putEmailIdentityMailFromAttributes<T>(params: PutEmailIdentityMailFromAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putSuppressedDestination<T>(params: PutSuppressedDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendBulkEmail<T>(params: SendBulkEmailInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendCustomVerificationEmail<T>(params: SendCustomVerificationEmailInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendEmail<T>(params: SendEmailInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testRenderEmailTemplate<T>(params: TestRenderEmailTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateConfigurationSetEventDestination<T>(params: UpdateConfigurationSetEventDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContact<T>(params: UpdateContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContactList<T>(params: UpdateContactListInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateCustomVerificationEmailTemplate<T>(params: UpdateCustomVerificationEmailTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEmailIdentityPolicy<T>(params: UpdateEmailIdentityPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEmailTemplate<T>(params: UpdateEmailTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateReputationEntityCustomerManagedStatus<T>(params: UpdateReputationEntityCustomerManagedStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateReputationEntityPolicy<T>(params: UpdateReputationEntityPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
