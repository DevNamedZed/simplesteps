// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface LexBot {
  /** The name of the Amazon Lex bot. */
  Name: string;
  /** The Amazon Web Services Region where the Amazon Lex bot was created. */
  LexRegion: string;
}

export interface LexV2Bot {
  /** The Amazon Resource Name (ARN) of the Amazon Lex V2 bot. */
  AliasArn?: string;
}

export interface AliasConfiguration {
  /** The email address ID. */
  EmailAddressId: string;
}

export interface ParentHoursOfOperationConfig {
  /** The identifier for the hours of operation. */
  HoursOfOperationId?: string;
}

export interface S3Config {
  /** The S3 bucket name. */
  BucketName: string;
  /** The S3 bucket prefix. */
  BucketPrefix: string;
  /** The Amazon S3 encryption configuration. */
  EncryptionConfig?: any;
}

export interface KinesisVideoStreamConfig {
  /** The prefix of the video stream. */
  Prefix: string;
  /** The number of hours data is retained in the stream. Kinesis Video Streams retains the data in a data store that is associated with the stream. The default value is 0, indicating that the stream does n */
  RetentionPeriodHours: number;
  /** The encryption configuration. */
  EncryptionConfig: any;
}

export interface KinesisStreamConfig {
  /** The Amazon Resource Name (ARN) of the data stream. */
  StreamArn: string;
}

export interface KinesisFirehoseConfig {
  /** The Amazon Resource Name (ARN) of the delivery stream. */
  FirehoseArn: string;
}

export interface InstanceStorageConfig {
  /** The existing association identifier that uniquely identifies the resource type and storage config for the given instance ID. */
  AssociationId?: string;
  /** A valid storage type. */
  StorageType: 'S3' | 'KINESIS_VIDEO_STREAM' | 'KINESIS_STREAM' | 'KINESIS_FIREHOSE';
  /** The S3 bucket configuration. */
  S3Config?: S3Config;
  /** The configuration of the Kinesis video stream. */
  KinesisVideoStreamConfig?: KinesisVideoStreamConfig;
  /** The configuration of the Kinesis data stream. */
  KinesisStreamConfig?: KinesisStreamConfig;
  /** The configuration of the Kinesis Firehose delivery stream. */
  KinesisFirehoseConfig?: KinesisFirehoseConfig;
}

export interface RoutingProfileQueueConfig {
  /** Contains information about a queue resource. */
  QueueReference: any;
  /** The order in which contacts are to be handled for the queue. For more information, see Queues: priority and delay. */
  Priority: number;
  /** The delay, in seconds, a contact should be in the queue before they are routed to an available agent. For more information, see Queues: priority and delay in the Amazon Connect Administrator Guide. */
  Delay: number;
}

export interface RoutingProfileManualAssignmentQueueConfig {
  QueueReference: any;
}

export interface SecurityProfileItem {
  /** Id of a security profile item. */
  Id?: string;
}

export interface UserProficiency {
  /** The name of user's proficiency. You must use name of predefined attribute present in the Amazon Connect instance. */
  AttributeName: string;
  /** The value of user's proficiency. You must use value of predefined attribute present in the Amazon Connect instance. */
  AttributeValue: string;
  /** The level of the proficiency. The valid values are 1, 2, 3, 4 and 5. */
  Level: number;
}

export interface DataTableValue {
  /** The value's primary values. */
  PrimaryValues?: any[];
  /** The value's attribute name. */
  AttributeName: string;
  /** The value's value. */
  Value: string;
  /** The value's lock version. */
  LockVersion?: any;
  /** The value's last modified time. */
  LastModifiedTime?: string;
  /** The value's last modified region. */
  LastModifiedRegion?: string;
}

export interface DataTableDeleteValueIdentifier {
  /** The identifier's primary values. */
  PrimaryValues?: any[];
  /** The identifier's attribute name. */
  AttributeName: string;
  /** The identifier's lock version. */
  LockVersion: any;
}

export interface DataTableValueIdentifier {
  /** The identifier's primary values. */
  PrimaryValues?: any[];
  /** The identifier's attribute name. */
  AttributeName: string;
}

export interface ContactDataRequest {
  /** Endpoint associated with the Amazon Connect instance from which outbound contact will be initiated for the campaign. */
  SystemEndpoint?: any;
  /** Endpoint of the customer for which contact will be initiated. */
  CustomerEndpoint?: any;
  /** Identifier to uniquely identify individual requests in the batch. */
  RequestIdentifier?: string;
  /** The identifier of the queue associated with the Amazon Connect instance in which contacts that are created will be queued. */
  QueueId?: string;
  /** List of attributes to be stored in a contact. */
  Attributes?: Record<string, any>;
  /** Structure to store information associated with a campaign. */
  Campaign?: any;
  /** Information about the outbound strategy. */
  OutboundStrategy?: any;
}

export interface Reference {
  /** A valid value for the reference. For example, for a URL reference, a formatted URL that is displayed to an agent in the Contact Control Panel (CCP). */
  Value?: string;
  /** The type of the reference. DATE must be of type Epoch timestamp. */
  Type: 'URL' | 'ATTACHMENT' | 'CONTACT_ANALYSIS' | 'NUMBER' | 'STRING' | 'DATE' | 'EMAIL' | 'EMAIL_MESSAGE' | 'EMAIL_MESSAGE_PLAIN_TEXT';
  /** Status of the attachment reference type. */
  Status?: 'AVAILABLE' | 'DELETED' | 'APPROVED' | 'REJECTED' | 'PROCESSING' | 'FAILED';
  /** The Amazon Resource Name (ARN) of the reference */
  Arn?: string;
  /** Relevant details why the reference was not successfully created. */
  StatusReason?: string;
}

export interface UserInfo {
  /** The user identifier for the contact. */
  UserId?: string;
}

export interface SegmentAttributeValue {
  /** The value of a segment attribute. */
  ValueString?: string;
  /** The value of a segment attribute. */
  ValueMap?: Record<string, any>;
  /** The value of a segment attribute. */
  ValueInteger?: number;
  /** The value of a segment attribute. This is only supported for system-defined attributes, not for user-defined attributes. */
  ValueList?: any[];
  /** The value of a segment attribute that has to be a valid ARN. This is only supported for system-defined attributes, not for user-defined attributes. */
  ValueArn?: string;
}

export interface ExternalInvocationConfiguration {
  /** Enable external invocation. */
  Enabled?: boolean;
}

export interface ValidationEnum {
  /** Boolean that defaults to false. When true, only values specified in the enum list are allowed. When false, custom values beyond the enumerated list are permitted. */
  Strict?: boolean;
  /** A list of predefined values that are allowed for this attribute. These values are always permitted regardless of the Strict setting. */
  Values?: any[];
}

export interface Validation {
  /** The minimum number of characters a text value can contain. Applies to TEXT value type and values within a TEXT_LIST. Must be less than or equal to MaxLength. */
  MinLength?: number;
  /** The maximum number of characters a text value can contain. Applies to TEXT value type and values within a TEXT_LIST. Must be greater than or equal to MinLength. */
  MaxLength?: number;
  /** The minimum number of values in a list. Must be an integer greater than or equal to 0 and less than or equal to MaxValues. Applies to all list types. */
  MinValues?: number;
  /** The maximum number of values in a list. Must be an integer greater than or equal to 0 and greater than or equal to MinValues. Applies to all list types. */
  MaxValues?: number;
  /** Boolean that defaults to false. Applies to text lists and text primary attributes. When true, enforces case-insensitive uniqueness for primary attributes and allows case-insensitive lookups. */
  IgnoreCase?: boolean;
  /** The smallest inclusive numeric value for NUMBER value type. Cannot be provided when ExclusiveMinimum is also provided. Must be less than or equal to Maximum and less than ExclusiveMaximum. Applies to  */
  Minimum?: number;
  /** The largest inclusive numeric value for NUMBER value type. Can be provided alongside ExclusiveMaximum where both operate independently. Must be greater than or equal to Minimum and greater than Exclus */
  Maximum?: number;
  /** The smallest exclusive numeric value for NUMBER value type. Can be provided alongside Minimum where both operate independently. Must be less than ExclusiveMaximum and Maximum. Applies to NUMBER and va */
  ExclusiveMinimum?: number;
  /** The largest exclusive numeric value for NUMBER value type. Can be provided alongside Maximum where both operate independently. Must be greater than ExclusiveMinimum and Minimum. Applies to NUMBER and  */
  ExclusiveMaximum?: number;
  /** Specifies that numeric values must be multiples of this number. Must be greater than 0. The result of dividing a value by this multiple must result in an integer. Applies to NUMBER and values within N */
  MultipleOf?: number;
  /** Defines enumeration constraints for attribute values. Can specify a list of allowed values and whether custom values are permitted beyond the enumerated list. */
  Enum?: ValidationEnum;
}

export interface EvaluationFormScoringStrategy {
  /** The scoring mode of the evaluation form. */
  Mode: 'QUESTION_ONLY' | 'SECTION_ONLY';
  /** The scoring status of the evaluation form. */
  Status: 'ENABLED' | 'DISABLED';
}

export interface EvaluationFormAutoEvaluationConfiguration {
  /** When automated evaluation is enabled. */
  Enabled: boolean;
}

export interface EvaluationReviewConfiguration {
  /** List of recipients who should be notified when a review is requested. */
  ReviewNotificationRecipients: any[];
  /** Number of days during which a request for review can be submitted for evaluations created from this form. */
  EligibilityDays?: number;
}

export interface EvaluationFormTargetConfiguration {
  /** The contact interaction type for this evaluation form. */
  ContactInteractionType: 'AGENT' | 'AUTOMATED';
}

export interface EvaluationFormLanguageConfiguration {
  /** The language for the evaluation form. */
  FormLanguage?: 'de-DE' | 'en-US' | 'es-ES' | 'fr-FR' | 'it-IT' | 'pt-BR';
}

export interface HoursOfOperationConfig {
  /** The day that the hours of operation applies to. */
  Day: 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';
  /** The start time that your contact center opens. */
  StartTime: any;
  /** The end time that your contact center closes. */
  EndTime: any;
}

export interface HoursOfOperationOverrideConfig {
  /** The day that the hours of operation override applies to. */
  Day?: 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';
  /** The start time when your contact center opens if overrides are applied. */
  StartTime?: any;
  /** The end time that your contact center closes if overrides are applied. */
  EndTime?: any;
}

export interface RecurrencePattern {
  /** Defines how often the pattern repeats. This is the base unit for the recurrence schedule and works in conjunction with the Interval field to determine the exact repetition sequence. */
  Frequency: 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  /** Specifies the number of frequency units between each occurrence. Must be a positive integer. Examples: To repeat every week, set Interval=1 with WEEKLY frequency. To repeat every two months, set Inter */
  Interval: number;
  /** Specifies which month the event should occur in (1-12, where 1=January, 12=December). Used with YEARLY frequency to schedule events in specific month. Note: It does not accept multiple values in the s */
  ByMonth?: any[];
  /** Specifies which day of the month the event should occur on (1-31). Used with MONTHLY or YEARLY frequency to schedule events on specific date within a month. Examples: [15] for events on the 15th of ea */
  ByMonthDay?: any[];
  /** Specifies which occurrence of a weekday within the month the event should occur on. Must be used with MONTHLY or YEARLY frequency. Example: 2 corresponds to second occurrence of the weekday in the mon */
  ByWeekdayOccurrence?: any[];
}

export interface RecurrenceConfig {
  /** The recurrence pattern that defines how the event repeats. Example: Frequency, Interval, ByMonth, ByMonthDay, ByWeekdayOccurrence */
  RecurrencePattern: RecurrencePattern;
}

export interface ParticipantCapabilities {
  /** The configuration having the video and screen sharing capabilities for participants over the call. */
  Video?: 'SEND';
  /** The screen sharing capability that is enabled for the participant. SEND indicates the participant can share their screen. */
  ScreenShare?: 'SEND';
}

export interface ParticipantDetailsToAdd {
  /** The role of the participant being added. */
  ParticipantRole?: 'AGENT' | 'CUSTOMER' | 'SYSTEM' | 'CUSTOM_BOT' | 'SUPERVISOR';
  /** The display name of the participant. */
  DisplayName?: string;
  ParticipantCapabilities?: ParticipantCapabilities;
}

export interface InputPredefinedAttributeConfiguration {
  /** When this parameter is set to true, Amazon Connect enforces strict validation on the specific values, if the values are predefined in attributes. The contact will store only valid and predefined value */
  EnableValueValidationOnAssociation?: boolean;
}

export interface ContactConfiguration {
  /** The identifier of the contact within the Amazon Connect instance. */
  ContactId: string;
  /** The role of the participant in the chat conversation. Only CUSTOMER is currently supported. Any other values other than CUSTOMER will result in an exception (4xx error). */
  ParticipantRole?: 'AGENT' | 'CUSTOMER' | 'SYSTEM' | 'CUSTOM_BOT' | 'SUPERVISOR';
  /** Whether to include raw connect message in the push notification payload. Default is False. */
  IncludeRawMessage?: boolean;
}

export interface OutboundCallerConfig {
  /** The caller ID name. */
  OutboundCallerIdName?: string;
  /** The caller ID number. */
  OutboundCallerIdNumberId?: string;
  /** The outbound whisper flow to be used during an outbound call. */
  OutboundFlowId?: string;
}

export interface OutboundEmailConfig {
  /** The identifier of the email address. */
  OutboundEmailAddressId?: string;
}

export interface UserQuickConnectConfig {
  /** The identifier of the user. */
  UserId: string;
  /** The identifier of the flow. */
  ContactFlowId: string;
}

export interface QueueQuickConnectConfig {
  /** The identifier for the queue. */
  QueueId: string;
  /** The identifier of the flow. */
  ContactFlowId: string;
}

export interface PhoneNumberQuickConnectConfig {
  /** The phone number in E.164 format. */
  PhoneNumber: string;
}

export interface FlowQuickConnectConfig {
  /** The contact flow ID for the quick connect configuration. */
  ContactFlowId: string;
}

export interface QuickConnectConfig {
  /** The type of quick connect. In the Amazon Connect admin website, when you create a quick connect, you are prompted to assign one of the following types: Agent (USER), External (PHONE_NUMBER), or Queue  */
  QuickConnectType: 'USER' | 'QUEUE' | 'PHONE_NUMBER' | 'FLOW';
  /** The user configuration. This is required only if QuickConnectType is USER. */
  UserConfig?: UserQuickConnectConfig;
  /** The queue configuration. This is required only if QuickConnectType is QUEUE. */
  QueueConfig?: QueueQuickConnectConfig;
  /** The phone configuration. This is required only if QuickConnectType is PHONE_NUMBER. */
  PhoneConfig?: PhoneNumberQuickConnectConfig;
  /** Flow configuration for quick connect setup. */
  FlowConfig?: FlowQuickConnectConfig;
}

export interface MediaConcurrency {
  /** The channels that agents can handle in the Contact Control Panel (CCP). */
  Channel: 'VOICE' | 'CHAT' | 'TASK' | 'EMAIL';
  /** The number of contacts an agent can have on a channel simultaneously. Valid Range for VOICE: Minimum value of 1. Maximum value of 1. Valid Range for CHAT: Minimum value of 1. Maximum value of 10. Vali */
  Concurrency: number;
  /** Defines the cross-channel routing behavior for each channel that is enabled for this Routing Profile. For example, this allows you to offer an agent a different contact from another channel when they  */
  CrossChannelBehavior?: any;
}

export interface RuleTriggerEventSource {
  /** The name of the event source. */
  EventSourceName: 'OnPostCallAnalysisAvailable' | 'OnRealTimeCallAnalysisAvailable' | 'OnRealTimeChatAnalysisAvailable' | 'OnPostChatAnalysisAvailable' | 'OnZendeskTicketCreate' | 'OnZendeskTicketStatusUpdate' | 'OnSalesforceCaseCreate' | 'OnContactEvaluationSubmit' | 'OnMetricDataUpdate' | 'OnCaseCreate' | 'OnCaseUpdate' | 'OnSlaBreach';
  /** The identifier for the integration association. */
  IntegrationAssociationId?: string;
}

export interface RuleAction {
  /** The type of action that creates a rule. */
  ActionType: 'CREATE_TASK' | 'ASSIGN_CONTACT_CATEGORY' | 'GENERATE_EVENTBRIDGE_EVENT' | 'SEND_NOTIFICATION' | 'CREATE_CASE' | 'UPDATE_CASE' | 'ASSIGN_SLA' | 'END_ASSOCIATED_TASKS' | 'SUBMIT_AUTO_EVALUATION';
  /** Information about the task action. This field is required if TriggerEventSource is one of the following values: OnZendeskTicketCreate | OnZendeskTicketStatusUpdate | OnSalesforceCaseCreate */
  TaskAction?: any;
  /** Information about the EventBridge action. Supported only for TriggerEventSource values: OnPostCallAnalysisAvailable | OnRealTimeCallAnalysisAvailable | OnRealTimeChatAnalysisAvailable | OnPostChatAnal */
  EventBridgeAction?: any;
  /** Information about the contact category action. Supported only for TriggerEventSource values: OnPostCallAnalysisAvailable | OnRealTimeCallAnalysisAvailable | OnRealTimeChatAnalysisAvailable | OnPostCha */
  AssignContactCategoryAction?: any;
  /** Information about the send notification action. Supported only for TriggerEventSource values: OnPostCallAnalysisAvailable | OnRealTimeCallAnalysisAvailable | OnRealTimeChatAnalysisAvailable | OnPostCh */
  SendNotificationAction?: any;
  /** Information about the create case action. Supported only for TriggerEventSource values: OnPostCallAnalysisAvailable | OnPostChatAnalysisAvailable. */
  CreateCaseAction?: any;
  /** Information about the update case action. Supported only for TriggerEventSource values: OnCaseCreate | OnCaseUpdate. */
  UpdateCaseAction?: any;
  /** Information about the assign SLA action. */
  AssignSlaAction?: any;
  /** Information about the end associated tasks action. Supported only for TriggerEventSource values: OnCaseUpdate. */
  EndAssociatedTasksAction?: any;
  /** Information about the submit automated evaluation action. */
  SubmitAutoEvaluationAction?: any;
}

export interface Application {
  /** Namespace of the application that you want to give access to. */
  Namespace?: string;
  /** The permissions that the agent is granted on the application. For third-party applications, only the ACCESS permission is supported. For MCP Servers, the permissions are tool Identifiers accepted by M */
  ApplicationPermissions?: any[];
  /** Type of Application. */
  Type?: 'MCP' | 'THIRD_PARTY_APPLICATION';
}

export interface FlowModule {
  /** Only Type we support is MCP. */
  Type?: 'MCP';
  /** If of Flow Modules invocable as tool */
  FlowModuleId?: string;
}

export interface DataTableAccessControlConfiguration {
  /** The configuration's primary attribute access control configuration. */
  PrimaryAttributeAccessControlConfiguration?: any;
}

export interface GranularAccessControlConfiguration {
  /** The access control configuration for data tables. */
  DataTableAccessControlConfiguration?: DataTableAccessControlConfiguration;
}

export interface TaskTemplateConstraints {
  /** Lists the fields that are required to be filled by agents. */
  RequiredFields?: any[];
  /** Lists the fields that are read-only to agents, and cannot be edited. */
  ReadOnlyFields?: any[];
  /** Lists the fields that are invisible to agents. */
  InvisibleFields?: any[];
}

export interface TaskTemplateDefaults {
  /** Default value for the field. */
  DefaultFieldValues?: any[];
}

export interface TaskTemplateField {
  /** The unique identifier for the field. */
  Id: any;
  /** The description of the field. */
  Description?: string;
  /** Indicates the type of field. */
  Type?: 'NAME' | 'DESCRIPTION' | 'SCHEDULED_TIME' | 'QUICK_CONNECT' | 'URL' | 'NUMBER' | 'TEXT' | 'TEXT_AREA' | 'DATE_TIME' | 'BOOLEAN' | 'SINGLE_SELECT' | 'EMAIL' | 'SELF_ASSIGN' | 'EXPIRY_DURATION';
  /** A list of options for a single select field. */
  SingleSelectOptions?: any[];
}

export interface VoiceCallEntryPointParameters {
  /** The source phone number for the test. */
  SourcePhoneNumber?: string;
  /** The destination phone number for the test. */
  DestinationPhoneNumber?: string;
  /** The flow identifier for the test. */
  FlowId?: string;
}

export interface TestCaseEntryPoint {
  /** The type of entry point. */
  Type?: 'VOICE_CALL';
  /** Parameters for voice call entry point. */
  VoiceCallEntryPointParameters?: VoiceCallEntryPointParameters;
}

export interface UserIdentityInfo {
  /** The first name. This is required if you are using Amazon Connect or SAML for identity management. Inputs must be in Unicode Normalization Form C (NFC). Text containing characters in a non-NFC form (fo */
  FirstName?: string;
  /** The last name. This is required if you are using Amazon Connect or SAML for identity management. Inputs must be in Unicode Normalization Form C (NFC). Text containing characters in a non-NFC form (for */
  LastName?: string;
  /** The email address. If you are using SAML for identity management and include this parameter, an error is returned. */
  Email?: string;
  /** The user's secondary email address. If you provide a secondary email, the user receives email notifications - other than password reset notifications - to this email address instead of to their primar */
  SecondaryEmail?: string;
  /** The user's mobile number. */
  Mobile?: string;
}

export interface UserPhoneConfig {
  /** The phone type. */
  PhoneType?: 'SOFT_PHONE' | 'DESK_PHONE';
  /** The Auto accept setting. */
  AutoAccept?: boolean;
  /** The After Call Work (ACW) timeout setting, in seconds. This parameter has a minimum value of 0 and a maximum value of 2,000,000 seconds (24 days). Enter 0 if you don't want to allocate a specific amou */
  AfterContactWorkTimeLimit?: number;
  /** The phone number for the user's desk phone. */
  DeskPhoneNumber?: string;
  /** The persistent connection setting for the user. */
  PersistentConnection?: boolean;
}

export interface AutoAcceptConfig {
  /** The channel for this auto-accept configuration. Valid values: VOICE, CHAT, TASK, EMAIL. */
  Channel: 'VOICE' | 'CHAT' | 'TASK' | 'EMAIL';
  /** Indicates whether auto-accept is enabled for this channel. When enabled, available agents are automatically connected to contacts from this channel. */
  AutoAccept: boolean;
  /** Indicates whether auto-accept is enabled for agent-first callbacks. This setting only applies to the VOICE channel. */
  AgentFirstCallbackAutoAccept?: boolean;
}

export interface AfterContactWorkConfigPerChannel {
  /** The channel for this ACW timeout configuration. Valid values: VOICE, CHAT, TASK, EMAIL. */
  Channel: 'VOICE' | 'CHAT' | 'TASK' | 'EMAIL';
  /** The ACW timeout settings for this channel. */
  AfterContactWorkConfig: any;
  /** The ACW timeout settings for agent-first callbacks. This setting only applies to the VOICE channel. */
  AgentFirstCallbackAfterContactWorkConfig?: any;
}

export interface PhoneNumberConfig {
  /** The channel for this phone number configuration. Only VOICE is supported for this data type. */
  Channel: 'VOICE' | 'CHAT' | 'TASK' | 'EMAIL';
  /** The phone type. Valid values: SOFT_PHONE, DESK_PHONE. */
  PhoneType: 'SOFT_PHONE' | 'DESK_PHONE';
  /** The phone number for the user's desk phone. */
  PhoneNumber?: string;
}

export interface PersistentConnectionConfig {
  /** Configuration settings for persistent connection. Only VOICE is supported for this data type. */
  Channel: 'VOICE' | 'CHAT' | 'TASK' | 'EMAIL';
  /** Indicates whether persistent connection is enabled. When enabled, the agent's connection is maintained after a call ends, enabling subsequent calls to connect faster. */
  PersistentConnection: boolean;
}

export interface VoiceEnhancementConfig {
  /** The channel for this voice enhancement configuration. Only VOICE is supported for this data type. */
  Channel: 'VOICE' | 'CHAT' | 'TASK' | 'EMAIL';
  /** The voice enhancement mode. */
  VoiceEnhancementMode: 'VOICE_ISOLATION' | 'NOISE_SUPPRESSION' | 'NONE';
}

export interface ViewInputContent {
  /** The view template representing the structure of the view. */
  Template?: string;
  /** A list of possible actions from the view. */
  Actions?: string[];
}

export interface WorkspaceThemeConfig {
  /** The color palette configuration for the workspace theme. */
  Palette?: any;
  /** The image assets used in the workspace theme. */
  Images?: any;
  /** The typography configuration for the workspace theme. */
  Typography?: any;
}

export interface WorkspaceTheme {
  /** The theme configuration for light mode. */
  Light?: WorkspaceThemeConfig;
  /** The theme configuration for dark mode. */
  Dark?: WorkspaceThemeConfig;
}

export interface RoutingProfileQueueReference {
  /** The identifier for the queue. */
  QueueId: string;
  /** The channels agents can handle in the Contact Control Panel (CCP) for this routing profile. */
  Channel: 'VOICE' | 'CHAT' | 'TASK' | 'EMAIL';
}

export interface UserProficiencyDisassociate {
  /** The name of user's proficiency. */
  AttributeName: string;
  /** The value of user's proficiency. */
  AttributeValue: string;
}

export interface DataTableValueEvaluationSet {
  /** The set's primary values. */
  PrimaryValues?: any[];
  /** The set's attribute names. */
  AttributeNames: any[];
}

export interface ContactMetricInfo {
  /** The name of the metric to retrieve. Supported values are POSITION_IN_QUEUE (returns the contact's current position in the queue) and ESTIMATED_WAIT_TIME (returns the predicted wait time in seconds). */
  Name: 'ESTIMATED_WAIT_TIME' | 'POSITION_IN_QUEUE';
}

export interface Filters {
  /** The queues to use to filter the metrics. You should specify at least one queue, and can specify up to 100 queues per request. The GetCurrentMetricsData API in particular requires a queue when you incl */
  Queues?: string[];
  /** The channel to use to filter the metrics. */
  Channels?: 'VOICE' | 'CHAT' | 'TASK' | 'EMAIL'[];
  /** A list of up to 100 routing profile IDs or ARNs. */
  RoutingProfiles?: string[];
  /** A list of expressions as a filter, in which an expression is an object of a step in a routing criteria. */
  RoutingStepExpressions?: string[];
  /** A list of up to 50 agent status IDs or ARNs. */
  AgentStatuses?: string[];
  /** A list of up to 10 subtypes can be provided. */
  Subtypes?: string[];
  /** A list of up to 10 validationTestTypes can be provided. */
  ValidationTestTypes?: string[];
}

export interface CurrentMetric {
  /** The name of the metric. */
  Name?: 'AGENTS_ONLINE' | 'AGENTS_AVAILABLE' | 'AGENTS_ON_CALL' | 'AGENTS_NON_PRODUCTIVE' | 'AGENTS_AFTER_CONTACT_WORK' | 'AGENTS_ERROR' | 'AGENTS_STAFFED' | 'CONTACTS_IN_QUEUE' | 'OLDEST_CONTACT_AGE' | 'CONTACTS_SCHEDULED' | 'AGENTS_ON_CONTACT' | 'SLOTS_ACTIVE' | 'SLOTS_AVAILABLE' | 'ESTIMATED_WAIT_TIME';
  /** Out of the box current metrics or custom metrics can be referenced via this field. This field is a valid AWS Connect Arn or a UUID. */
  MetricId?: string;
  /** The Unit parameter is not supported for custom metrics. The unit for the metric. */
  Unit?: 'SECONDS' | 'COUNT' | 'PERCENT';
}

export interface CurrentMetricSortCriteria {
  SortByMetric?: 'AGENTS_ONLINE' | 'AGENTS_AVAILABLE' | 'AGENTS_ON_CALL' | 'AGENTS_NON_PRODUCTIVE' | 'AGENTS_AFTER_CONTACT_WORK' | 'AGENTS_ERROR' | 'AGENTS_STAFFED' | 'CONTACTS_IN_QUEUE' | 'OLDEST_CONTACT_AGE' | 'CONTACTS_SCHEDULED' | 'AGENTS_ON_CONTACT' | 'SLOTS_ACTIVE' | 'SLOTS_AVAILABLE' | 'ESTIMATED_WAIT_TIME';
  /** The way to sort. */
  SortOrder?: 'ASCENDING' | 'DESCENDING';
}

export interface ContactFilter {
  /** A list of up to 9 contact states. */
  ContactStates?: any[];
}

export interface UserDataFilters {
  /** A list of up to 100 queues or ARNs. */
  Queues?: string[];
  /** A filter for the user data based on the contact information that is associated to the user. It contains a list of contact states. */
  ContactFilter?: ContactFilter;
  /** A list of up to 100 routing profile IDs or ARNs. */
  RoutingProfiles?: string[];
  /** A list of up to 100 agent IDs or ARNs. */
  Agents?: string[];
  /** A UserHierarchyGroup ID or ARN. */
  UserHierarchyGroups?: string[];
}

export interface HistoricalMetric {
  /** The name of the metric. Following is a list of each supported metric mapped to the UI name, linked to a detailed description in the Amazon Connect Administrator Guide. ABANDON_TIME Unit: SECONDS Stati */
  Name?: 'CONTACTS_QUEUED' | 'CONTACTS_HANDLED' | 'CONTACTS_ABANDONED' | 'CONTACTS_CONSULTED' | 'CONTACTS_AGENT_HUNG_UP_FIRST' | 'CONTACTS_HANDLED_INCOMING' | 'CONTACTS_HANDLED_OUTBOUND' | 'CONTACTS_HOLD_ABANDONS' | 'CONTACTS_TRANSFERRED_IN' | 'CONTACTS_TRANSFERRED_OUT' | 'CONTACTS_TRANSFERRED_IN_FROM_QUEUE' | 'CONTACTS_TRANSFERRED_OUT_FROM_QUEUE' | 'CONTACTS_MISSED' | 'CALLBACK_CONTACTS_HANDLED' | 'API_CONTACTS_HANDLED' | 'OCCUPANCY' | 'HANDLE_TIME' | 'AFTER_CONTACT_WORK_TIME' | 'QUEUED_TIME' | 'ABANDON_TIME' | 'QUEUE_ANSWER_TIME' | 'HOLD_TIME' | 'INTERACTION_TIME' | 'INTERACTION_AND_HOLD_TIME' | 'SERVICE_LEVEL';
  /** The threshold for the metric, used with service level metrics. */
  Threshold?: any;
  /** The statistic for the metric. */
  Statistic?: 'SUM' | 'MAX' | 'AVG';
  /** The unit for the metric. */
  Unit?: 'SECONDS' | 'COUNT' | 'PERCENT';
}

export interface IntervalDetails {
  /** The timezone applied to requested metrics. */
  TimeZone?: string;
  /** IntervalPeriod: An aggregated grouping applied to request metrics. Valid IntervalPeriod values are: FIFTEEN_MIN | THIRTY_MIN | HOUR | DAY | WEEK | TOTAL. For example, if IntervalPeriod is selected THI */
  IntervalPeriod?: 'FIFTEEN_MIN' | 'THIRTY_MIN' | 'HOUR' | 'DAY' | 'WEEK' | 'TOTAL';
}

export interface FilterV2 {
  /** The key to use for filtering data. For example, QUEUE, ROUTING_PROFILE, AGENT, CHANNEL, AGENT_HIERARCHY_LEVEL_ONE, AGENT_HIERARCHY_LEVEL_TWO, AGENT_HIERARCHY_LEVEL_THREE, AGENT_HIERARCHY_LEVEL_FOUR, A */
  FilterKey?: string;
  /** The identifiers to use for filtering data. For example, if you have a filter key of QUEUE, you would add queue IDs or ARNs in FilterValues. */
  FilterValues?: any[];
  /** System defined filtering condition. For example, the NOT_EXISTS StringCondition returns documents where the field specified by FilterKey does not exist in the document. When the NOT_EXISTS StringCondi */
  StringCondition?: any;
}

export interface MetricV2 {
  /** The name of the metric. */
  Name?: string;
  /** Contains information about the threshold for service level metrics. */
  Threshold?: any[];
  /** Historical metrics or custom metrics can be referenced via this field. This field is a valid Amazon Connect Arn or a UUID */
  MetricId?: string;
  /** Contains the filters to be used when returning data. */
  MetricFilters?: any[];
}

export interface PrimaryAttributeValueFilter {
  /** The filter's attribute name. */
  AttributeName: string;
  /** The filter's values. */
  Values: any[];
}

export interface ControlPlaneAttributeFilter {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndCondition?: any;
  TagCondition?: any;
}

export interface AgentStatusSearchFilter {
  /** An object that can be used to specify Tag conditions inside the SearchFilter. This accepts an OR of AND (List of List) input where: The top level list specifies conditions that need to be applied with */
  AttributeFilter?: ControlPlaneAttributeFilter;
}

export interface StringCondition {
  /** The name of the field in the string condition. */
  FieldName?: string;
  /** The value of the string. */
  Value?: string;
  /** The type of comparison to be made when evaluating the string condition. */
  ComparisonType?: 'STARTS_WITH' | 'CONTAINS' | 'EXACT';
}

export interface AgentStatusSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A leaf node condition which can be used to specify a string condition. The currently supported values for FieldName are name, description, state, type, displayOrder, and resourceID. */
  AndConditions?: any[];
  /** A leaf node condition which can be used to specify a string condition. The currently supported values for FieldName are name, description, state, type, displayOrder, and resourceID. */
  StringCondition?: StringCondition;
}

export interface NumberCondition {
  /** The name of the field in the number condition. */
  FieldName?: string;
  /** The minValue to be used while evaluating the number condition. */
  MinValue?: number;
  /** The maxValue to be used while evaluating the number condition. */
  MaxValue?: number;
  /** The type of comparison to be made when evaluating the number condition. */
  ComparisonType?: 'GREATER_OR_EQUAL' | 'GREATER' | 'LESSER_OR_EQUAL' | 'LESSER' | 'EQUAL' | 'NOT_EQUAL' | 'RANGE';
}

export interface BooleanCondition {
  /** A name of the property to be searched. */
  FieldName?: string;
  /** Boolean property comparison type. */
  ComparisonType?: 'IS_TRUE' | 'IS_FALSE';
}

export interface DateTimeCondition {
  /** A name of the datetime property to be searched */
  FieldName?: string;
  /** A minimum value of the property. */
  MinValue?: string;
  /** A maximum value of the property. */
  MaxValue?: string;
  /** Datetime property comparison type. */
  ComparisonType?: 'GREATER_THAN' | 'LESS_THAN' | 'GREATER_THAN_OR_EQUAL_TO' | 'LESS_THAN_OR_EQUAL_TO' | 'EQUAL_TO' | 'RANGE';
}

export interface DecimalCondition {
  /** A name of the decimal property to be searched. */
  FieldName?: string;
  /** A minimum value of the decimal property. */
  MinValue?: number;
  /** A maximum value of the decimal property. */
  MaxValue?: number;
  /** The type of comparison to be made when evaluating the decimal condition. */
  ComparisonType?: 'GREATER_OR_EQUAL' | 'GREATER' | 'LESSER_OR_EQUAL' | 'LESSER' | 'EQUAL' | 'NOT_EQUAL' | 'RANGE';
}

export interface EvaluationSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
  NumberCondition?: NumberCondition;
  /** The boolean condition search criteria for searching evaluations. */
  BooleanCondition?: BooleanCondition;
  /** The datetime condition search criteria for searching evaluations. */
  DateTimeCondition?: DateTimeCondition;
  /** The decimal condition search criteria for searching evaluations. */
  DecimalCondition?: DecimalCondition;
}

export interface EvaluationSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}

export interface ControlPlaneTagFilter {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  /** A leaf node condition which can be used to specify a tag condition. */
  TagCondition?: any;
}

export interface ContactFlowModuleSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}

export interface ContactFlowModuleSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
  /** The state of the flow. */
  StateCondition?: 'ACTIVE' | 'ARCHIVED';
  /** The status of the flow. */
  StatusCondition?: 'PUBLISHED' | 'SAVED';
}

export interface ContactFlowAttributeFilter {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with a AND condition. */
  AndCondition?: any;
  TagCondition?: any;
  /** Contact flow type condition within attribute filter. */
  ContactFlowTypeCondition?: any;
}

export interface ContactFlowSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
  /** Flow attribute filter for contact flow search operations. */
  FlowAttributeFilter?: ContactFlowAttributeFilter;
}

export interface ContactFlowSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
  /** The type of flow. */
  TypeCondition?: 'CONTACT_FLOW' | 'CUSTOMER_QUEUE' | 'CUSTOMER_HOLD' | 'CUSTOMER_WHISPER' | 'AGENT_HOLD' | 'AGENT_WHISPER' | 'OUTBOUND_WHISPER' | 'AGENT_TRANSFER' | 'QUEUE_TRANSFER' | 'CAMPAIGN';
  /** The state of the flow. */
  StateCondition?: 'ACTIVE' | 'ARCHIVED';
  /** The status of the flow. */
  StatusCondition?: 'PUBLISHED' | 'SAVED';
}

export interface SearchContactsTimeRange {
  /** The type of timestamp to search. */
  Type: 'INITIATION_TIMESTAMP' | 'SCHEDULED_TIMESTAMP' | 'CONNECTED_TO_AGENT_TIMESTAMP' | 'DISCONNECT_TIMESTAMP' | 'ENQUEUE_TIMESTAMP';
  /** The start time of the time range. */
  StartTime: string;
  /** The end time of the time range. */
  EndTime: string;
}

export interface NameCriteria {
  /** The words or phrases used to match the contact name. */
  SearchText: any[];
  /** The match type combining name search criteria using multiple search texts in a name criteria. */
  MatchType: 'MATCH_ALL' | 'MATCH_ANY' | 'MATCH_EXACT' | 'MATCH_NONE';
}

export interface AgentHierarchyGroups {
  /** The identifiers for level 1 hierarchy groups. */
  L1Ids?: any[];
  /** The identifiers for level 2 hierarchy groups. */
  L2Ids?: any[];
  /** The identifiers for level 3 hierarchy groups. */
  L3Ids?: any[];
  /** The identifiers for level 4 hierarchy groups. */
  L4Ids?: any[];
  /** The identifiers for level 5 hierarchy groups. */
  L5Ids?: any[];
}

export interface ContactAnalysis {
  /** Search criteria based on transcript analyzed by Amazon Connect Contact Lens. */
  Transcript?: any;
}

export interface SearchableRoutingCriteria {
  /** The list of Routing criteria steps of the contact routing. */
  Steps?: any[];
}

export interface SearchContactsAdditionalTimeRange {
  /** List of criteria of the time range to additionally filter on. */
  Criteria: any[];
  /** The match type combining multiple time range filters. */
  MatchType: 'MATCH_ALL' | 'MATCH_ANY' | 'MATCH_EXACT' | 'MATCH_NONE';
}

export interface SearchableContactAttributes {
  /** The list of criteria based on user-defined contact attributes that are configured for contact search. */
  Criteria: any[];
  /** The match type combining search criteria using multiple searchable contact attributes. */
  MatchType?: 'MATCH_ALL' | 'MATCH_ANY' | 'MATCH_EXACT' | 'MATCH_NONE';
}

export interface SearchableSegmentAttributes {
  /** The list of criteria based on searchable segment attributes. */
  Criteria: any[];
  /** The match type combining search criteria using multiple searchable segment attributes. */
  MatchType?: 'MATCH_ALL' | 'MATCH_ANY' | 'MATCH_EXACT' | 'MATCH_NONE';
}

export interface SearchCriteria {
  /** Name of the contact. */
  Name?: NameCriteria;
  /** The identifiers of agents who handled the contacts. */
  AgentIds?: string[];
  /** The agent hierarchy groups of the agent at the time of handling the contact. */
  AgentHierarchyGroups?: AgentHierarchyGroups;
  /** The list of channels associated with contacts. */
  Channels?: 'VOICE' | 'CHAT' | 'TASK' | 'EMAIL'[];
  /** Search criteria based on analysis outputs from Amazon Connect Contact Lens. */
  ContactAnalysis?: ContactAnalysis;
  /** The list of initiation methods associated with contacts. */
  InitiationMethods?: 'INBOUND' | 'OUTBOUND' | 'TRANSFER' | 'QUEUE_TRANSFER' | 'CALLBACK' | 'API' | 'DISCONNECT' | 'MONITOR' | 'EXTERNAL_OUTBOUND' | 'WEBRTC_API' | 'AGENT_REPLY' | 'FLOW'[];
  /** The list of queue IDs associated with contacts. */
  QueueIds?: string[];
  /** Routing criteria for the contact. */
  RoutingCriteria?: SearchableRoutingCriteria;
  /** Additional TimeRange used to filter contacts. */
  AdditionalTimeRange?: SearchContactsAdditionalTimeRange;
  /** The search criteria based on user-defined contact attributes that have been configured for contact search. For more information, see Search by custom contact attributes in the Amazon Connect Administr */
  SearchableContactAttributes?: SearchableContactAttributes;
  /** The search criteria based on searchable segment attributes of a contact. */
  SearchableSegmentAttributes?: SearchableSegmentAttributes;
  /** The list of active regions for contacts in ACGR instances. */
  ActiveRegions?: string[];
  ContactTags?: ControlPlaneTagFilter;
}

export interface Sort {
  /** The name of the field on which to sort. */
  FieldName: 'INITIATION_TIMESTAMP' | 'SCHEDULED_TIMESTAMP' | 'CONNECTED_TO_AGENT_TIMESTAMP' | 'DISCONNECT_TIMESTAMP' | 'INITIATION_METHOD' | 'CHANNEL' | 'EXPIRY_TIMESTAMP';
  /** An ascending or descending sort. */
  Order: 'ASCENDING' | 'DESCENDING';
}

export interface DataTableSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}

export interface DataTableSearchCriteria {
  /** The criteria's or conditions. */
  OrConditions?: any[];
  /** The criteria's and conditions. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
}

export interface EmailAddressSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
}

export interface EmailAddressSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}

export interface EvaluationFormSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
  NumberCondition?: NumberCondition;
  /** Boolean search condition. */
  BooleanCondition?: BooleanCondition;
  /** Datetime search condition. */
  DateTimeCondition?: DateTimeCondition;
}

export interface EvaluationFormSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}

export interface HoursOfOperationSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}

export interface DateCondition {
  /** An object to specify the hours of operation override date field. */
  FieldName?: string;
  /** An object to specify the hours of operation override date value. */
  Value?: string;
  /** An object to specify the hours of operation override date condition comparisonType. */
  ComparisonType?: 'GREATER_THAN' | 'LESS_THAN' | 'GREATER_THAN_OR_EQUAL_TO' | 'LESS_THAN_OR_EQUAL_TO' | 'EQUAL_TO';
}

export interface HoursOfOperationOverrideSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
  /** A leaf node condition which can be used to specify a date condition. */
  DateCondition?: DateCondition;
}

export interface HoursOfOperationSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  /** A leaf node condition which can be used to specify a string condition. The currently supported values for FieldName are name, description, timezone, and resourceID. */
  StringCondition?: StringCondition;
}

export interface NotificationSearchFilter {
  /** Attribute-based filters to apply to the search results. */
  AttributeFilter?: ControlPlaneAttributeFilter;
}

export interface NotificationSearchCriteria {
  /** A list of conditions to be met, where at least one condition must be satisfied. */
  OrConditions?: any[];
  /** A list of conditions that must all be satisfied. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
}

export interface PredefinedAttributeSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
}

export interface PromptSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}

export interface PromptSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  /** A leaf node condition which can be used to specify a string condition. The currently supported values for FieldName are name, description, and resourceID. */
  StringCondition?: StringCondition;
}

export interface QueueSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}

export interface QueueSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  /** A leaf node condition which can be used to specify a string condition. The currently supported values for FieldName are name, description, and resourceID. */
  StringCondition?: StringCondition;
  /** The type of queue. */
  QueueTypeCondition?: 'STANDARD';
}

export interface QuickConnectSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}

export interface QuickConnectSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  /** A leaf node condition which can be used to specify a string condition. The currently supported values for FieldName are name, description, and resourceID. */
  StringCondition?: StringCondition;
}

export interface TagSearchCondition {
  /** The tag key used in the tag search condition. */
  tagKey?: string;
  /** The tag value used in the tag search condition. */
  tagValue?: string;
  /** The type of comparison to be made when evaluating the tag key in tag search condition. */
  tagKeyComparisonType?: 'STARTS_WITH' | 'CONTAINS' | 'EXACT';
  /** The type of comparison to be made when evaluating the tag value in tag search condition. */
  tagValueComparisonType?: 'STARTS_WITH' | 'CONTAINS' | 'EXACT';
}

export interface ResourceTagsSearchCriteria {
  /** The search criteria to be used to return tags. */
  TagSearchCondition?: TagSearchCondition;
}

export interface RoutingProfileSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}

export interface RoutingProfileSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  /** A leaf node condition which can be used to specify a string condition. The currently supported values for FieldName are associatedQueueIds, name, description, and resourceID. */
  StringCondition?: StringCondition;
}

export interface SecurityProfileSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
}

export interface SecurityProfilesSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
}

export interface TestCaseSearchFilter {
  /** An object that can be used to specify Tag conditions inside the SearchFilter. This accepts an OR of AND (List of List) input where: Top level list specifies conditions that need to be applied with OR  */
  TagFilter?: ControlPlaneTagFilter;
}

export interface TestCaseSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  /** A leaf node condition which can be used to specify a string condition. */
  StringCondition?: StringCondition;
  /** The status of the test case. */
  StatusCondition?: 'PUBLISHED' | 'SAVED';
}

export interface UserHierarchyGroupSearchFilter {
  /** An object that can be used to specify Tag conditions inside the SearchFilter. This accepts an OR or AND (List of List) input where: The top level list specifies conditions that need to be applied with */
  AttributeFilter?: ControlPlaneAttributeFilter;
}

export interface UserHierarchyGroupSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  /** A leaf node condition which can be used to specify a string condition. The currently supported values for FieldName are name, parentId, levelId, and resourceID. */
  StringCondition?: StringCondition;
}

export interface ControlPlaneUserAttributeFilter {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndCondition?: any;
  TagCondition?: any;
  HierarchyGroupCondition?: any;
}

export interface UserSearchFilter {
  TagFilter?: ControlPlaneTagFilter;
  /** An object that can be used to specify Tag conditions or Hierarchy Group conditions inside the SearchFilter. This accepts an OR of AND (List of List) input where: The top level list specifies condition */
  UserAttributeFilter?: ControlPlaneUserAttributeFilter;
}

export interface ListCondition {
  /** The type of target list that will be used to filter the users. */
  TargetListType?: 'PROFICIENCIES';
  /** A list of Condition objects which would be applied together with an AND condition. */
  Conditions?: any[];
}

export interface HierarchyGroupCondition {
  /** The value in the hierarchy group condition. */
  Value?: string;
  /** The type of hierarchy group match. */
  HierarchyGroupMatchType?: 'EXACT' | 'WITH_CHILD_GROUPS';
}

export interface UserSearchCriteria {
  /** A list of conditions which would be applied together with an OR condition. */
  OrConditions?: any[];
  /** A list of conditions which would be applied together with an AND condition. */
  AndConditions?: any[];
  /** A leaf node condition which can be used to specify a string condition. The currently supported values for FieldName are Username, FirstName, LastName, RoutingProfileId, SecurityProfileId, resourceId. */
  StringCondition?: StringCondition;
  /** A leaf node condition which can be used to specify a List condition to search users with attributes included in Lists like Proficiencies. */
  ListCondition?: ListCondition;
  /** A leaf node condition which can be used to specify a hierarchy group condition. */
  HierarchyGroupCondition?: HierarchyGroupCondition;
}

export interface ViewSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}

export interface ViewSearchCriteria {
  /** A list of conditions to be met, where at least one condition must be satisfied. */
  OrConditions?: any[];
  /** A list of conditions that must all be satisfied. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
  /** A condition that filters views by their type. */
  ViewTypeCondition?: 'CUSTOMER_MANAGED' | 'AWS_MANAGED';
  /** A condition that filters views by their status. */
  ViewStatusCondition?: 'PUBLISHED' | 'SAVED';
}

export interface WorkspaceAssociationSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}

export interface WorkspaceAssociationSearchCriteria {
  /** A list of conditions to be met, where at least one condition must be satisfied. */
  OrConditions?: any[];
  /** A list of conditions that must all be satisfied. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
}

export interface WorkspaceSearchFilter {
  AttributeFilter?: ControlPlaneAttributeFilter;
}

export interface WorkspaceSearchCriteria {
  /** A list of conditions to be met, where at least one condition must be satisfied. */
  OrConditions?: any[];
  /** A list of conditions that must all be satisfied. */
  AndConditions?: any[];
  StringCondition?: StringCondition;
}

export interface ChatEvent {
  /** Type of chat integration event. */
  Type: 'DISCONNECT' | 'MESSAGE' | 'EVENT';
  /** Type of content. This is required when Type is MESSAGE or EVENT. For allowed message content types, see the ContentType parameter in the SendMessage topic in the Amazon Connect Participant Service API */
  ContentType?: string;
  /** Content of the message or event. This is required when Type is MESSAGE and for certain ContentTypes when Type is EVENT. For allowed message content, see the Content parameter in the SendMessage topic  */
  Content?: string;
}

export interface ParticipantDetails {
  /** Display name of the participant. */
  DisplayName: string;
}

export interface ChatStreamingConfiguration {
  /** The Amazon Resource Name (ARN) of the standard Amazon SNS topic. The Amazon Resource Name (ARN) of the streaming endpoint that is used to publish real-time message streaming for chat conversations. */
  StreamingEndpointArn: string;
}

export interface NewSessionDetails {
  /** The supported chat message content types. Supported types are text/plain, text/markdown, application/json, application/vnd.amazonaws.connect.message.interactive, and application/vnd.amazonaws.connect. */
  SupportedMessagingContentTypes?: string[];
  ParticipantDetails?: ParticipantDetails;
  /** A custom key-value pair using an attribute map. The attributes are standard Amazon Connect attributes. They can be accessed in flows just like any other contact attributes. There can be up to 32,768 U */
  Attributes?: Record<string, string>;
  StreamingConfiguration?: ChatStreamingConfiguration;
}

export interface EmailAddressInfo {
  /** The email address, including the domain. */
  EmailAddress: string;
  /** The display name of email address. */
  DisplayName?: string;
}

export interface OutboundAdditionalRecipients {
  /** Information about the additional CC email address recipients. Email recipients are limited to 50 total addresses: 1 required recipient in the DestinationEmailAddress field and up to 49 recipients in t */
  CcEmailAddresses?: any[];
}

export interface TemplatedMessageConfig {
  /** The identifier of the knowledge base. Can be either the ID or the ARN. URLs cannot contain the ARN. */
  KnowledgeBaseId: string;
  /** The identifier of the message template Id. */
  MessageTemplateId: string;
  /** Information about template attributes, that is, CustomAttributes or CustomerProfileAttributes. */
  TemplateAttributes: any;
}

export interface OutboundRawMessage {
  /** The email subject. */
  Subject: string;
  /** The email message body. */
  Body: string;
  /** Type of content, that is, text/plain or text/html. */
  ContentType: string;
}

export interface OutboundEmailContent {
  /** The message source type, that is, RAW or TEMPLATE. */
  MessageSourceType: 'TEMPLATE' | 'RAW';
  /** Information about template message configuration. */
  TemplatedMessageConfig?: TemplatedMessageConfig;
  /** The raw email body content. */
  RawMessage?: OutboundRawMessage;
}

export interface SourceCampaign {
  /** A unique identifier for a campaign. */
  CampaignId?: string;
  /** A unique identifier for a each request part of same campaign. */
  OutboundRequestId?: string;
}

export interface ParticipantConfiguration {
  /** The mode in which responses should be sent to the participant. */
  ResponseMode?: 'INCREMENTAL' | 'COMPLETE';
}

export interface ChatMessage {
  /** The type of the content. Supported types are text/plain, text/markdown, application/json, and application/vnd.amazonaws.connect.message.interactive.response. */
  ContentType: string;
  /** The content of the chat message. For text/plain and text/markdown, the Length Constraints are Minimum of 1, Maximum of 1024. For application/json, the Length Constraints are Minimum of 1, Maximum of 1 */
  Content: string;
}

export interface PersistentChat {
  /** The contactId that is used for rehydration depends on the rehydration type. RehydrationType is required for persistent chat. ENTIRE_PAST_SESSION: Rehydrates a chat from the most recently terminated pa */
  RehydrationType?: 'ENTIRE_PAST_SESSION' | 'FROM_SEGMENT';
  /** The contactId from which a persistent chat session must be started. */
  SourceContactId?: string;
}

export interface AutoEvaluationConfiguration {
  /** Whether automated evaluations are enabled. */
  Enabled: boolean;
}

export interface VoiceRecordingConfiguration {
  /** Identifies which track is being recorded. */
  VoiceRecordingTrack?: 'FROM_AGENT' | 'TO_AGENT' | 'ALL';
  /** Identifies which IVR track is being recorded. One and only one of the track configurations should be presented in the request. */
  IvrRecordingTrack?: 'ALL';
}

export interface InboundRawMessage {
  /** The email subject. */
  Subject: string;
  /** The email message body. */
  Body: string;
  /** Type of content, that is, text/plain or text/html. */
  ContentType: string;
  /** Headers present in inbound email. */
  Headers?: Record<string, any>;
}

export interface InboundEmailContent {
  /** The message source type, that is, RAW. */
  MessageSourceType: 'RAW';
  /** The raw email body content. */
  RawMessage?: InboundRawMessage;
}

export interface InboundAdditionalRecipients {
  /** The additional recipients information present in to list. You must have 1 required recipient (DestinationEmailAddress). You can then specify up to 49 additional recipients (across ToAddresses and CcAd */
  ToAddresses?: any[];
  /** The additional recipients information present in cc list. You must have 1 required recipient (DestinationEmailAddress). You can then specify up to 49 additional recipients (across ToAddresses and CcAd */
  CcAddresses?: any[];
}

export interface EmailAttachment {
  /** A case-sensitive name of the attached file being uploaded. */
  FileName: string;
  /** The pre-signed URLs for the S3 bucket where the email attachment is stored. */
  S3Url: string;
}

export interface Endpoint {
  /** Type of the endpoint. */
  Type?: 'TELEPHONE_NUMBER' | 'VOIP' | 'CONTACT_FLOW' | 'CONNECT_PHONENUMBER_ARN' | 'EMAIL_ADDRESS';
  /** Address of the endpoint. */
  Address?: string;
}

export interface AnswerMachineDetectionConfig {
  /** The flag to indicate if answer machine detection analysis needs to be performed for a voice call. If set to true, TrafficType must be set as CAMPAIGN. */
  EnableAnswerMachineDetection?: boolean;
  /** Wait for the answering machine prompt. */
  AwaitAnswerMachinePrompt?: boolean;
}

export interface OutboundStrategyConfig {
  /** The config of agent first outbound strategy. */
  AgentFirst?: any;
}

export interface OutboundStrategy {
  /** Type of the outbound strategy. */
  Type: 'AGENT_FIRST';
  /** Config of the outbound strategy. */
  Config?: OutboundStrategyConfig;
}

export interface TaskAttachment {
  /** A case-sensitive name of the attached file being uploaded. */
  FileName: string;
  /** The pre-signed URLs for the S3 bucket where the task attachment is stored. */
  S3Url: string;
}

export interface AllowedCapabilities {
  /** Information about the customer's video sharing capabilities. */
  Customer?: ParticipantCapabilities;
  /** Information about the agent's video sharing capabilities. */
  Agent?: ParticipantCapabilities;
}

export interface DisconnectReason {
  /** A code that indicates how the contact was terminated. */
  Code?: string;
}

export interface EvaluationAnswerInput {
  /** The value for an answer in a contact evaluation. */
  Value?: any;
}

export interface EvaluationNote {
  /** The note for an item (section or question) in a contact evaluation. Even though a note in an evaluation can have up to 3072 chars, there is also a limit on the total number of chars for all the notes  */
  Value?: string;
}

export interface QueueInfoInput {
  /** The identifier of the queue. */
  Id?: string;
}

export interface RoutingCriteriaInput {
  /** When Amazon Connect does not find an available agent meeting the requirements in a step for a given step duration, the routing criteria will move on to the next step sequentially until a join is compl */
  Steps?: any[];
}

export interface PrimaryValue {
  /** The name of the primary attribute that this value belongs to. */
  AttributeName: string;
  /** The actual value for the primary attribute. Must be provided as a string regardless of the attribute's value type. Primary values cannot be expressions and must be explicitly specified. */
  Value: string;
}

export interface DataTableLockVersion {
  /** The lock version for the data table itself. Used for optimistic locking and table versioning. Changes with each update to the table's metadata or structure. */
  DataTable?: string;
  /** The lock version for a specific attribute. When the ValueLockLevel is ATTRIBUTE, this version changes when any value for the attribute changes. For other lock levels, it only changes when the attribut */
  Attribute?: string;
  /** The lock version for a specific set of primary values (record). This includes the default record even if the table does not have any primary attributes. Used for record-level locking. */
  PrimaryValues?: string;
  /** The lock version for a specific value. Changes each time the individual value is modified. Used for the finest-grained locking control. */
  Value?: string;
}

export interface ChatParticipantRoleConfig {
  /** A list of participant timers. You can specify any unique combination of role and timer type. Duplicate entries error out the request with a 400. */
  ParticipantTimerConfigList: any[];
}

export interface TelephonyConfig {
  /** Information about traffic distributions. */
  Distributions: any[];
}

export interface SignInConfig {
  /** Information about traffic distributions. */
  Distributions: any[];
}

export interface AgentConfig {
  /** Information about traffic distributions. */
  Distributions: any[];
}

export interface HierarchyLevelUpdate {
  /** The name of the user hierarchy level. Must not be more than 50 characters. */
  Name: string;
}

export interface HierarchyStructureUpdate {
  /** The update for level one. */
  LevelOne?: HierarchyLevelUpdate;
  /** The update for level two. */
  LevelTwo?: HierarchyLevelUpdate;
  /** The update for level three. */
  LevelThree?: HierarchyLevelUpdate;
  /** The update for level four. */
  LevelFour?: HierarchyLevelUpdate;
  /** The update for level five. */
  LevelFive?: HierarchyLevelUpdate;
}

export interface ActivateEvaluationFormInput {
  /** The unique identifier for the evaluation form. */
  EvaluationFormId: string;
  /** The version of the evaluation form to activate. If the version property is not provided, the latest version of the evaluation form is activated. */
  EvaluationFormVersion: number;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface AssociateAnalyticsDataSetInput {
  /** The identifier of the dataset to associate with the target account. */
  DataSetId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the target account. Use to associate a dataset to a different account than the one containing the Amazon Connect instance. If not specified, by default this value is the Amazon Web S */
  TargetAccountId?: string;
}

export interface AssociateApprovedOriginInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The domain to add to your allow list. */
  Origin: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface AssociateBotInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  LexBot?: LexBot;
  /** The Amazon Lex V2 bot to associate with the instance. */
  LexV2Bot?: LexV2Bot;
}

export interface AssociateContactWithUserInput {
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the user. This can be the ID or the ARN of the user. */
  UserId: string;
}

export interface AssociateDefaultVocabularyInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The language code of the vocabulary entries. For a list of languages and their corresponding language codes, see What is Amazon Transcribe? */
  LanguageCode: 'ar-AE' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fr-CA' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'pt-BR' | 'pt-PT' | 'zh-CN' | 'en-NZ' | 'en-ZA' | 'ca-ES' | 'da-DK' | 'fi-FI' | 'id-ID' | 'ms-MY' | 'nl-NL' | 'no-NO' | 'pl-PL' | 'sv-SE' | 'tl-PH';
  /** The identifier of the custom vocabulary. If this is empty, the default is set to none. */
  VocabularyId?: string;
}

export interface AssociateEmailAddressAliasInput {
  /** Configuration object that specifies which email address will serve as the alias. The specified email address must already exist in the Amazon Connect instance and cannot already be configured as an al */
  AliasConfiguration: AliasConfiguration;
  /** The identifier of the email address. */
  EmailAddressId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface AssociateFlowInput {
  /** The identifier of the flow. */
  FlowId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the resource. Amazon Web Services End User Messaging SMS phone number ARN when using SMS_PHONE_NUMBER Amazon Web Services End User Messaging Social phone number ARN when using WHATSA */
  ResourceId: string;
  /** A valid resource type. */
  ResourceType: 'SMS_PHONE_NUMBER' | 'INBOUND_EMAIL' | 'OUTBOUND_EMAIL' | 'ANALYTICS_CONNECTOR' | 'WHATSAPP_MESSAGING_PHONE_NUMBER';
}

export interface AssociateHoursOfOperationsInput {
  /** The identifier of the child hours of operation. */
  HoursOfOperationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The Amazon Resource Names (ARNs) of the parent hours of operation resources to associate with the child hours of operation resource. */
  ParentHoursOfOperationConfigs: ParentHoursOfOperationConfig[];
}

export interface AssociateInstanceStorageConfigInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A valid resource type. To enable streaming for real-time analysis of contacts, use the following types: For chat contacts, use REAL_TIME_CONTACT_ANALYSIS_CHAT_SEGMENTS. For voice contacts, use REAL_TI */
  ResourceType: 'CHAT_TRANSCRIPTS' | 'CALL_RECORDINGS' | 'SCHEDULED_REPORTS' | 'MEDIA_STREAMS' | 'CONTACT_TRACE_RECORDS' | 'AGENT_EVENTS' | 'REAL_TIME_CONTACT_ANALYSIS_SEGMENTS' | 'ATTACHMENTS' | 'CONTACT_EVALUATIONS' | 'SCREEN_RECORDINGS' | 'REAL_TIME_CONTACT_ANALYSIS_CHAT_SEGMENTS' | 'REAL_TIME_CONTACT_ANALYSIS_VOICE_SEGMENTS' | 'EMAIL_MESSAGES';
  /** A valid storage type. */
  StorageConfig: InstanceStorageConfig;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface AssociateLambdaFunctionInput {
  /** The Amazon Resource Name (ARN) for the Lambda function being associated. Maximum number of characters allowed is 140. */
  FunctionArn: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface AssociateLexBotInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The Amazon Lex bot to associate with the instance. */
  LexBot: LexBot;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface AssociatePhoneNumberContactFlowInput {
  /** The identifier of the flow. */
  ContactFlowId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique identifier for the phone number. */
  PhoneNumberId: string;
}

export interface AssociateQueueQuickConnectsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the queue. */
  QueueId: string;
  /** The quick connects to associate with this queue. */
  QuickConnectIds: string[];
}

export interface AssociateRoutingProfileQueuesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the routing profile. */
  RoutingProfileId: string;
  /** The manual assignment queues to associate with this routing profile. Note: Use this config for chat, email, and task contacts. It does not support voice contacts. */
  ManualAssignmentQueueConfigs?: RoutingProfileManualAssignmentQueueConfig[];
  /** The queues to associate with this routing profile. */
  QueueConfigs?: RoutingProfileQueueConfig[];
}

export interface AssociateSecurityKeyInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A valid security key in PEM format as a String. */
  Key: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface AssociateSecurityProfilesInput {
  /** Arn of a Q in Connect AI Agent. */
  EntityArn: string;
  /** Only supported type is AI_AGENT. */
  EntityType: 'USER' | 'AI_AGENT';
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** List of Security Profile Object. */
  SecurityProfiles: SecurityProfileItem[];
}

export interface AssociateTrafficDistributionGroupUserInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the traffic distribution group. This can be the ID or the ARN of the traffic distribution group. */
  TrafficDistributionGroupId: string;
  /** The identifier of the user account. This can be the ID or the ARN of the user. */
  UserId: string;
}

export interface AssociateUserProficienciesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN of the instance). */
  InstanceId: string;
  /** The identifier of the user account. */
  UserId: string;
  /** The proficiencies to associate with the user. */
  UserProficiencies: UserProficiency[];
}

export interface AssociateWorkspaceInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The Amazon Resource Names (ARNs) of the resources to associate with the workspace. Valid resource types are users and routing profiles. */
  ResourceArns: string[];
  /** The identifier of the workspace. */
  WorkspaceId: string;
}

export interface BatchAssociateAnalyticsDataSetInput {
  /** An array of dataset identifiers to associate. */
  DataSetIds: string[];
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the target account. Use to associate a dataset to a different account than the one containing the Amazon Connect instance. If not specified, by default this value is the Amazon Web S */
  TargetAccountId?: string;
}

export interface BatchCreateDataTableValueInput {
  /** The unique identifier for the data table. Must also accept the table ARN with or without a version alias. If no alias is provided, the default behavior is identical to providing the $LATEST alias. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
  /** A list of values to create. Each value must specify the attribute name and optionally primary values if the table has primary attributes. */
  Values: DataTableValue[];
}

export interface BatchDeleteDataTableValueInput {
  /** The unique identifier for the data table. Must also accept the table ARN with or without a version alias. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
  /** A list of value identifiers to delete, each specifying primary values, attribute name, and lock version information. */
  Values: DataTableDeleteValueIdentifier[];
}

export interface BatchDescribeDataTableValueInput {
  /** The unique identifier for the data table. Must also accept the table ARN with or without a version alias. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
  /** A list of value identifiers to retrieve, each specifying primary values and attribute names. */
  Values: DataTableValueIdentifier[];
}

export interface BatchDisassociateAnalyticsDataSetInput {
  /** An array of associated dataset identifiers to remove. */
  DataSetIds: string[];
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the target account. Use to disassociate a dataset from a different account than the one containing the Amazon Connect instance. If not specified, by default this value is the Amazon  */
  TargetAccountId?: string;
}

export interface BatchGetAttachedFileMetadataInput {
  /** The resource to which the attached file is (being) uploaded to. The supported resources are Cases and Email. This value must be a valid ARN. */
  AssociatedResourceArn: string;
  /** The unique identifiers of the attached file resource. */
  FileIds: string[];
  /** The unique identifier of the Connect instance. */
  InstanceId: string;
}

export interface BatchGetFlowAssociationInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A list of resource identifiers to retrieve flow associations. Amazon Web Services End User Messaging SMS phone number ARN when using SMS_PHONE_NUMBER Amazon Web Services End User Messaging Social phon */
  ResourceIds: string[];
  /** The type of resource association. */
  ResourceType?: 'WHATSAPP_MESSAGING_PHONE_NUMBER' | 'VOICE_PHONE_NUMBER' | 'INBOUND_EMAIL' | 'OUTBOUND_EMAIL' | 'ANALYTICS_CONNECTOR';
}

export interface BatchPutContactInput {
  /** List of individual contact requests. */
  ContactDataRequestList: ContactDataRequest[];
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface BatchUpdateDataTableValueInput {
  /** The unique identifier for the data table. Must also accept the table ARN with or without a version alias. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
  /** A list of values to update, each including the current lock version to ensure optimistic locking. */
  Values: DataTableValue[];
}

export interface ClaimPhoneNumberInput {
  /** The phone number you want to claim. Phone numbers are formatted [+] [country code] [subscriber number including area code]. */
  PhoneNumber: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The identifier of the Amazon Connect instance that phone numbers are claimed to. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. You must enter InstanceId or TargetArn. */
  InstanceId?: string;
  /** The description of the phone number. */
  PhoneNumberDescription?: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
  /** The Amazon Resource Name (ARN) for Amazon Connect instances or traffic distribution groups that phone number inbound traffic is routed through. You must enter InstanceId or TargetArn. */
  TargetArn?: string;
}

/** Request to CompleteAttachedFileUpload API */
export interface CompleteAttachedFileUploadInput {
  /** The resource to which the attached file is (being) uploaded to. The supported resources are Cases and Email. This value must be a valid ARN. */
  AssociatedResourceArn: string;
  /** The unique identifier of the attached file resource. */
  FileId: string;
  /** The unique identifier of the Amazon Connect instance. */
  InstanceId: string;
}

export interface CreateAgentStatusInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the status. */
  Name: string;
  /** The state of the status. */
  State: 'ENABLED' | 'DISABLED';
  /** The description of the status. */
  Description?: string;
  /** The display order of the status. */
  DisplayOrder?: number;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateContactInput {
  /** The channel for the contact. The CHAT channel is not supported. The following information is incorrect. We're working to correct it. */
  Channel: 'VOICE' | 'CHAT' | 'TASK' | 'EMAIL';
  /** Indicates how the contact was initiated. CreateContact only supports the following initiation methods. Valid values by channel are: For VOICE: TRANSFER and the subtype connect:ExternalAudio For EMAIL: */
  InitiationMethod: 'INBOUND' | 'OUTBOUND' | 'TRANSFER' | 'QUEUE_TRANSFER' | 'CALLBACK' | 'API' | 'DISCONNECT' | 'MONITOR' | 'EXTERNAL_OUTBOUND' | 'WEBRTC_API' | 'AGENT_REPLY' | 'FLOW';
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A custom key-value pair using an attribute map. The attributes are standard Amazon Connect attributes, and can be accessed in flows just like any other contact attributes. There can be up to 32,768 UT */
  Attributes?: Record<string, string>;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** A description of the contact. */
  Description?: string;
  /** Number of minutes the contact will be active for before expiring */
  ExpiryDurationInMinutes?: number;
  /** Initial state of the contact when it's created. Only TASK channel contacts can be initiated with COMPLETED state. */
  InitiateAs?: 'CONNECTED_TO_USER' | 'COMPLETED';
  /** The name of a the contact. */
  Name?: string;
  /** The ID of the previous contact when creating a transfer contact. This value can be provided only for external audio contacts. For more information, see Integrate Amazon Connect Contact Lens with exter */
  PreviousContactId?: string;
  /** A formatted URL that is shown to an agent in the Contact Control Panel (CCP). Tasks can have the following reference types at the time of creation: URL | NUMBER | STRING | DATE | EMAIL | ATTACHMENT. */
  References?: Record<string, Reference>;
  /** The identifier of the contact in this instance of Amazon Connect. */
  RelatedContactId?: string;
  /** A set of system defined key-value pairs stored on individual contact segments (unique contact ID) using an attribute map. The attributes are standard Amazon Connect attributes. They can be accessed in */
  SegmentAttributes?: Record<string, SegmentAttributeValue>;
  /** User details for the contact UserInfo is required when creating an EMAIL contact with OUTBOUND and AGENT_REPLY contact initiation methods. */
  UserInfo?: UserInfo;
}

export interface CreateContactFlowInput {
  /** The JSON string that represents the content of the flow. For an example, see Example flow in Amazon Connect Flow language. Length Constraints: Minimum length of 1. Maximum length of 256000. */
  Content: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The name of the flow. */
  Name: string;
  /** The type of the flow. For descriptions of the available types, see Choose a flow type in the Amazon Connect Administrator Guide. */
  Type: 'CONTACT_FLOW' | 'CUSTOMER_QUEUE' | 'CUSTOMER_HOLD' | 'CUSTOMER_WHISPER' | 'AGENT_HOLD' | 'AGENT_WHISPER' | 'OUTBOUND_WHISPER' | 'AGENT_TRANSFER' | 'QUEUE_TRANSFER' | 'CAMPAIGN';
  /** The description of the flow. */
  Description?: string;
  /** Indicates the flow status as either SAVED or PUBLISHED. The PUBLISHED status will initiate validation on the content. the SAVED status does not initiate validation of the content. SAVED | PUBLISHED. */
  Status?: 'PUBLISHED' | 'SAVED';
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateContactFlowModuleInput {
  /** The JSON string that represents the content of the flow. For an example, see Example flow in Amazon Connect Flow language. */
  Content: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the flow module. */
  Name: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The description of the flow module. */
  Description?: string;
  /** The external invocation configuration for the flow module. */
  ExternalInvocationConfiguration?: ExternalInvocationConfiguration;
  /** The configuration settings for the flow module. */
  Settings?: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateContactFlowModuleAliasInput {
  /** The name of the alias. */
  AliasName: string;
  /** The identifier of the flow module. */
  ContactFlowModuleId: string;
  /** The version of the flow module. */
  ContactFlowModuleVersion: number;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The description of the alias. */
  Description?: string;
}

export interface CreateContactFlowModuleVersionInput {
  /** The identifier of the flow module. */
  ContactFlowModuleId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The description of the flow module version. */
  Description?: string;
  /** Indicates the checksum value of the flow module content. */
  FlowModuleContentSha256?: string;
}

export interface CreateContactFlowVersionInput {
  /** The identifier of the flow. */
  ContactFlowId: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The identifier of the flow version. */
  ContactFlowVersion?: number;
  /** The description of the flow version. */
  Description?: string;
  /** Indicates the checksum value of the flow content. */
  FlowContentSha256?: string;
  /** The Amazon Web Services Region where this resource was last modified. */
  LastModifiedRegion?: string;
  /** The Amazon Web Services Region where this resource was last modified. */
  LastModifiedTime?: string;
}

export interface CreateDataTableInput {
  /** The unique identifier for the Amazon Connect instance where the data table will be created. */
  InstanceId: string;
  /** The name for the data table. Must conform to Connect human readable string specification and have 1-127 characters. Whitespace must be trimmed first. Must not start with the reserved case insensitive  */
  Name: string;
  /** The status of the data table. One of PUBLISHED or SAVED. Required parameter that determines the initial state of the table. */
  Status: 'PUBLISHED';
  /** The IANA timezone identifier to use when resolving time based dynamic values. Required even if no time slices are specified. */
  TimeZone: string;
  /** The data level that concurrent value edits are locked on. One of DATA_TABLE, PRIMARY_VALUE, ATTRIBUTE, VALUE, and NONE. NONE is the default if unspecified. This determines how concurrent edits are han */
  ValueLockLevel: 'NONE' | 'DATA_TABLE' | 'PRIMARY_VALUE' | 'ATTRIBUTE' | 'VALUE';
  /** An optional description for the data table. Must conform to Connect human readable string specification and have 0-250 characters. Whitespace must be trimmed first. */
  Description?: string;
  /** Key value pairs for attribute based access control (TBAC or ABAC). Optional tags to apply to the data table for organization and access control purposes. */
  Tags?: Record<string, string>;
}

export interface CreateDataTableAttributeInput {
  /** The unique identifier for the data table. Must also accept the table ARN with or without a version alias. If the version is provided as part of the identifier or ARN, the version must be one of the tw */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
  /** The name for the attribute. Must conform to Connect human readable string specification and have 1-127 characters. Must not start with the reserved case insensitive values 'connect:' and 'aws:'. White */
  Name: string;
  /** The type of value allowed or the resultant type after the value's expression is evaluated. Must be one of TEXT, TEXT_LIST, NUMBER, NUMBER_LIST, and BOOLEAN. */
  ValueType: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'TEXT_LIST' | 'NUMBER_LIST';
  /** An optional description for the attribute. Must conform to Connect human readable string specification and have 0-250 characters. Whitespace trimmed before persisting. */
  Description?: string;
  /** Optional boolean that defaults to false. Determines if the value is used to identify a record in the table. Values for primary attributes must not be expressions. */
  Primary?: boolean;
  /** Optional validation rules for the attribute. Borrows heavily from JSON Schema - Draft 2020-12. The maximum length of arrays within validations and depth of validations is 5. There are default limits t */
  Validation?: Validation;
}

export interface CreateEmailAddressInput {
  /** The email address, including the domain. */
  EmailAddress: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The description of the email address. */
  Description?: string;
  /** The display name of email address */
  DisplayName?: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateEvaluationFormInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Items that are part of the evaluation form. The total number of sections and questions must not exceed 100 each. Questions must be contained in a section. */
  Items: { Section?: any } | { Question?: any }[];
  /** A title of the evaluation form. */
  Title: string;
  /** A boolean flag indicating whether to create evaluation form in draft state. */
  AsDraft?: boolean;
  /** Configuration information about automated evaluations. */
  AutoEvaluationConfiguration?: EvaluationFormAutoEvaluationConfiguration;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The description of the evaluation form. */
  Description?: string;
  /** Configuration for language settings of the evaluation form. */
  LanguageConfiguration?: EvaluationFormLanguageConfiguration;
  /** Configuration information about evaluation reviews. */
  ReviewConfiguration?: EvaluationReviewConfiguration;
  /** A scoring strategy of the evaluation form. */
  ScoringStrategy?: EvaluationFormScoringStrategy;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
  /** Configuration that specifies the target for the evaluation form. */
  TargetConfiguration?: EvaluationFormTargetConfiguration;
}

export interface CreateHoursOfOperationInput {
  /** Configuration information for the hours of operation: day, start time, and end time. */
  Config: HoursOfOperationConfig[];
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the hours of operation. */
  Name: string;
  /** The time zone of the hours of operation. */
  TimeZone: string;
  /** The description of the hours of operation. */
  Description?: string;
  /** Configuration for parent hours of operations. Eg: ResourceArn. For more information about parent hours of operations, see Link overrides from different hours of operation in the Administrator Guide. */
  ParentHoursOfOperationConfigs?: ParentHoursOfOperationConfig[];
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateHoursOfOperationOverrideInput {
  /** Configuration information for the hours of operation override: day, start time, and end time. */
  Config: HoursOfOperationOverrideConfig[];
  /** The date from when the hours of operation override is effective. */
  EffectiveFrom: string;
  /** The date until when the hours of operation override is effective. */
  EffectiveTill: string;
  /** The identifier for the hours of operation */
  HoursOfOperationId: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The name of the hours of operation override. */
  Name: string;
  /** The description of the hours of operation override. */
  Description?: string;
  /** Whether the override will be defined as a standard or as a recurring event. For more information about how override types are applied, see Build your list of overrides in the Administrator Guide. */
  OverrideType?: 'STANDARD' | 'OPEN' | 'CLOSED';
  /** Configuration for a recurring event. */
  RecurrenceConfig?: RecurrenceConfig;
}

export interface CreateInstanceInput {
  /** The type of identity management for your Amazon Connect users. */
  IdentityManagementType: 'SAML' | 'CONNECT_MANAGED' | 'EXISTING_DIRECTORY';
  /** Your contact center handles incoming contacts. */
  InboundCallsEnabled: boolean;
  /** Your contact center allows outbound calls. */
  OutboundCallsEnabled: boolean;
  /** The idempotency token. */
  ClientToken?: string;
  /** The identifier for the directory. */
  DirectoryId?: string;
  /** The name for your instance. */
  InstanceAlias?: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateIntegrationAssociationInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The Amazon Resource Name (ARN) of the integration. When integrating with Amazon Web Services End User Messaging, the Amazon Connect and Amazon Web Services End User Messaging instances must be in the  */
  IntegrationArn: string;
  /** The type of information to be ingested. */
  IntegrationType: 'EVENT' | 'VOICE_ID' | 'PINPOINT_APP' | 'WISDOM_ASSISTANT' | 'WISDOM_KNOWLEDGE_BASE' | 'WISDOM_QUICK_RESPONSES' | 'Q_MESSAGE_TEMPLATES' | 'CASES_DOMAIN' | 'APPLICATION' | 'FILE_SCANNER' | 'SES_IDENTITY' | 'ANALYTICS_CONNECTOR' | 'CALL_TRANSFER_CONNECTOR' | 'COGNITO_USER_POOL' | 'MESSAGE_PROCESSOR';
  /** The name of the external application. This field is only required for the EVENT integration type. */
  SourceApplicationName?: string;
  /** The URL for the external application. This field is only required for the EVENT integration type. */
  SourceApplicationUrl?: string;
  /** The type of the data source. This field is only required for the EVENT integration type. */
  SourceType?: 'SALESFORCE' | 'ZENDESK' | 'CASES';
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateNotificationInput {
  /** The localized content of the notification. A map where keys are locale codes and values are the notification text in that locale. Content supports links. Maximum 250 characters per locale. */
  Content: Record<string, string>;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A list of Amazon Resource Names (ARNs) identifying the recipients of the notification. Can include user ARNs or instance ARNs to target all users in an instance. Maximum of 200 recipients. */
  Recipients: string[];
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The timestamp when the notification should expire and no longer be displayed to users. If not specified, defaults to one week from creation. */
  ExpiresAt?: string;
  PredefinedNotificationId?: string;
  /** The priority level of the notification. Valid values are HIGH and LOW. High priority notifications are displayed above low priority notifications. */
  Priority?: 'HIGH' | 'LOW';
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateParticipantInput {
  /** The identifier of the contact in this instance of Amazon Connect. Supports contacts in the CHAT channel and VOICE (WebRTC) channels. For WebRTC calls, this should be the initial contact ID that was ge */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Information identifying the participant. The only valid value for ParticipantRole is CUSTOM_BOT for chat contact and CUSTOMER for voice contact. */
  ParticipantDetails: ParticipantDetailsToAdd;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface CreatePersistentContactAssociationInput {
  /** This is the contactId of the current contact that the CreatePersistentContactAssociation API is being called from. */
  InitialContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The contactId chosen for rehydration depends on the type chosen. ENTIRE_PAST_SESSION: Rehydrates a chat from the most recently terminated past chat contact of the specified past ended chat session. To */
  RehydrationType: 'ENTIRE_PAST_SESSION' | 'FROM_SEGMENT';
  /** The contactId from which a persistent chat session must be started. */
  SourceContactId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface CreatePredefinedAttributeInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the predefined attribute. */
  Name: string;
  /** Custom metadata that is associated to predefined attributes to control behavior in upstream services, such as controlling how a predefined attribute should be displayed in the Amazon Connect admin web */
  AttributeConfiguration?: InputPredefinedAttributeConfiguration;
  /** Values that enable you to categorize your predefined attributes. You can use them in custom UI elements across the Amazon Connect admin website. */
  Purposes?: string[];
  /** The values of the predefined attribute. */
  Values?: { StringList?: string[] };
}

export interface CreatePromptInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the prompt. */
  Name: string;
  /** The URI for the S3 bucket where the prompt is stored. You can provide S3 pre-signed URLs returned by the GetPromptFile API instead of providing S3 URIs. */
  S3Uri: string;
  /** The description of the prompt. */
  Description?: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreatePushNotificationRegistrationInput {
  /** The contact configuration for push notification registration. */
  ContactConfiguration: ContactConfiguration;
  /** The push notification token issued by the Apple or Google gateways. */
  DeviceToken: string;
  /** The device type to use when sending the message. */
  DeviceType: 'GCM' | 'APNS' | 'APNS_SANDBOX';
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The Amazon Resource Name (ARN) of the Pinpoint application. */
  PinpointAppArn: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface CreateQueueInput {
  /** The identifier for the hours of operation. */
  HoursOfOperationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the queue. */
  Name: string;
  /** The description of the queue. */
  Description?: string;
  /** The maximum number of contacts that can be in the queue before it is considered full. */
  MaxContacts?: number;
  /** The outbound caller ID name, number, and outbound whisper flow. */
  OutboundCallerConfig?: OutboundCallerConfig;
  /** The outbound email address ID for a specified queue. */
  OutboundEmailConfig?: OutboundEmailConfig;
  /** The quick connects available to agents who are working the queue. */
  QuickConnectIds?: string[];
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateQuickConnectInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique name of the quick connect. */
  Name: string;
  /** Configuration settings for the quick connect. */
  QuickConnectConfig: QuickConnectConfig;
  /** The description of the quick connect. */
  Description?: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateRoutingProfileInput {
  /** The default outbound queue for the routing profile. */
  DefaultOutboundQueueId: string;
  /** Description of the routing profile. Must not be more than 250 characters. */
  Description: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The channels that agents can handle in the Contact Control Panel (CCP) for this routing profile. */
  MediaConcurrencies: MediaConcurrency[];
  /** The name of the routing profile. Must not be more than 127 characters. */
  Name: string;
  /** Whether agents with this routing profile will have their routing order calculated based on longest idle time or time since their last inbound contact. */
  AgentAvailabilityTimer?: 'TIME_SINCE_LAST_ACTIVITY' | 'TIME_SINCE_LAST_INBOUND';
  /** The manual assignment queues associated with the routing profile. If no queue is added, agents and supervisors can't pick or assign any contacts from this routing profile. The limit of 10 array member */
  ManualAssignmentQueueConfigs?: RoutingProfileManualAssignmentQueueConfig[];
  /** The inbound queues associated with the routing profile. If no queue is added, the agent can make only outbound calls. The limit of 10 array members applies to the maximum number of RoutingProfileQueue */
  QueueConfigs?: RoutingProfileQueueConfig[];
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateRuleInput {
  /** A list of actions to be run when the rule is triggered. */
  Actions: RuleAction[];
  /** The conditions of the rule. */
  Function: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique name for the rule. */
  Name: string;
  /** The publish status of the rule. */
  PublishStatus: 'DRAFT' | 'PUBLISHED';
  /** The event source to trigger the rule. */
  TriggerEventSource: RuleTriggerEventSource;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface CreateSecurityProfileInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the security profile. */
  SecurityProfileName: string;
  /** The identifier of the hierarchy group that a security profile uses to restrict access to resources in Amazon Connect. */
  AllowedAccessControlHierarchyGroupId?: string;
  /** The list of tags that a security profile uses to restrict access to resources in Amazon Connect. */
  AllowedAccessControlTags?: Record<string, string>;
  /** A list of Flow Modules an AI Agent can invoke as a tool. */
  AllowedFlowModules?: FlowModule[];
  /** A list of third-party applications or MCP Servers that the security profile will give access to. */
  Applications?: Application[];
  /** The description of the security profile. */
  Description?: string;
  /** The granular access control configuration for the security profile, including data table permissions. */
  GranularAccessControlConfiguration?: GranularAccessControlConfiguration;
  /** The list of resources that a security profile applies hierarchy restrictions to in Amazon Connect. Following are acceptable ResourceNames: User. */
  HierarchyRestrictedResources?: string[];
  /** Permissions assigned to the security profile. For a list of valid permissions, see List of security profile permissions. */
  Permissions?: string[];
  /** The list of resources that a security profile applies tag restrictions to in Amazon Connect. For a list of Amazon Connect resources that you can tag, see Add tags to resources in Amazon Connect in the */
  TagRestrictedResources?: string[];
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateTaskTemplateInput {
  /** Fields that are part of the template. */
  Fields: TaskTemplateField[];
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the task template. */
  Name: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** Constraints that are applicable to the fields listed. */
  Constraints?: TaskTemplateConstraints;
  /** The identifier of the flow that runs by default when a task is created by referencing this template. */
  ContactFlowId?: string;
  /** The default values for fields when a task is created by referencing this template. */
  Defaults?: TaskTemplateDefaults;
  /** The description of the task template. */
  Description?: string;
  /** The ContactFlowId for the flow that will be run if this template is used to create a self-assigned task. */
  SelfAssignFlowId?: string;
  /** Marks a template as ACTIVE or INACTIVE for a task to refer to it. Tasks can only be created from ACTIVE templates. If a template is marked as INACTIVE, then a task that refers to this template cannot  */
  Status?: 'ACTIVE' | 'INACTIVE';
}

export interface CreateTestCaseInput {
  /** The JSON string that represents the content of the test. */
  Content: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The name of the test. */
  Name: string;
  /** The description of the test. */
  Description?: string;
  /** Defines the starting point for your test. */
  EntryPoint?: TestCaseEntryPoint;
  /** Defines the initial custom attributes for your test. */
  InitializationData?: string;
  /** The region in which the resource was last modified */
  LastModifiedRegion?: string;
  /** The time at which the resource was last modified. */
  LastModifiedTime?: string;
  /** Indicates the test status as either SAVED or PUBLISHED. The PUBLISHED status will initiate validation on the content. The SAVED status does not initiate validation of the content. */
  Status?: 'PUBLISHED' | 'SAVED';
  /** The tags used to organize, track, or control access for this resource. */
  Tags?: Record<string, string>;
  /** Id of the test case if you want to create it in a replica region using Amazon Connect Global Resiliency */
  TestCaseId?: string;
}

export interface CreateTrafficDistributionGroupInput {
  /** The identifier of the Amazon Connect instance that has been replicated. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The name for the traffic distribution group. */
  Name: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** A description for the traffic distribution group. */
  Description?: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateUseCaseInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the integration association. */
  IntegrationAssociationId: string;
  /** The type of use case to associate to the integration association. Each integration association can have only one of each use case type. */
  UseCaseType: 'RULES_EVALUATION' | 'CONNECT_CAMPAIGNS';
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateUserInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the routing profile for the user. */
  RoutingProfileId: string;
  /** The identifier of the security profile for the user. */
  SecurityProfileIds: string[];
  /** The user name for the account. For instances not using SAML for identity management, the user name can include up to 20 characters. If you are using SAML for identity management, the user name can inc */
  Username: string;
  /** The list of after contact work (ACW) timeout configuration settings for each channel. */
  AfterContactWorkConfigs?: AfterContactWorkConfigPerChannel[];
  /** The list of auto-accept configuration settings for each channel. */
  AutoAcceptConfigs?: AutoAcceptConfig[];
  /** The identifier of the user account in the directory used for identity management. If Amazon Connect cannot access the directory, you can specify this identifier to authenticate users. If you include t */
  DirectoryUserId?: string;
  /** The identifier of the hierarchy group for the user. */
  HierarchyGroupId?: string;
  /** The information about the identity of the user. */
  IdentityInfo?: UserIdentityInfo;
  /** The password for the user account. A password is required if you are using Amazon Connect for identity management. Otherwise, it is an error to include a password. */
  Password?: string;
  /** The list of persistent connection configuration settings for each channel. */
  PersistentConnectionConfigs?: PersistentConnectionConfig[];
  /** The phone settings for the user. This parameter is optional. If not provided, the user can be configured using channel-specific parameters such as AutoAcceptConfigs, AfterContactWorkConfigs, PhoneNumb */
  PhoneConfig?: UserPhoneConfig;
  /** The list of phone number configuration settings for each channel. */
  PhoneNumberConfigs?: PhoneNumberConfig[];
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
  /** The list of voice enhancement configuration settings for each channel. */
  VoiceEnhancementConfigs?: VoiceEnhancementConfig[];
}

export interface CreateUserHierarchyGroupInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the user hierarchy group. Must not be more than 100 characters. */
  Name: string;
  /** The identifier for the parent hierarchy group. The user hierarchy is created at level one if the parent group ID is null. */
  ParentGroupId?: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateViewInput {
  /** View content containing all content necessary to render a view except for runtime input data. The total uncompressed content has a maximum file size of 400kB. */
  Content: ViewInputContent;
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The name of the view. */
  Name: string;
  /** Indicates the view status as either SAVED or PUBLISHED. The PUBLISHED status will initiate validation on the content. */
  Status: 'PUBLISHED' | 'SAVED';
  /** A unique Id for each create view request to avoid duplicate view creation. For example, the view is idempotent ClientToken is provided. */
  ClientToken?: string;
  /** The description of the view. */
  Description?: string;
  /** The tags associated with the view resource (not specific to view version).These tags can be used to organize, track, or control access for this resource. For example, { "tags": {"key1":"value1", "key2 */
  Tags?: Record<string, string>;
}

export interface CreateViewVersionInput {
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The identifier of the view. Both ViewArn and ViewId can be used. */
  ViewId: string;
  /** The description for the version being published. */
  VersionDescription?: string;
  /** Indicates the checksum value of the latest published view content. */
  ViewContentSha256?: string;
}

export interface CreateVocabularyInput {
  /** The content of the custom vocabulary in plain-text format with a table of values. Each row in the table represents a word or a phrase, described with Phrase, IPA, SoundsLike, and DisplayAs fields. Sep */
  Content: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The language code of the vocabulary entries. For a list of languages and their corresponding language codes, see What is Amazon Transcribe? */
  LanguageCode: 'ar-AE' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fr-CA' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'pt-BR' | 'pt-PT' | 'zh-CN' | 'en-NZ' | 'en-ZA' | 'ca-ES' | 'da-DK' | 'fi-FI' | 'id-ID' | 'ms-MY' | 'nl-NL' | 'no-NO' | 'pl-PL' | 'sv-SE' | 'tl-PH';
  /** A unique name of the custom vocabulary. */
  VocabularyName: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface CreateWorkspaceInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the workspace. Must be unique within the instance and can contain 1-127 characters. */
  Name: string;
  /** The description of the workspace. Maximum length is 250 characters. */
  Description?: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
  /** The theme configuration for the workspace, including colors and styling. */
  Theme?: WorkspaceTheme;
  /** The title displayed for the workspace. */
  Title?: string;
}

export interface CreateWorkspacePageInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The page identifier. Valid system pages include HOME and AGENT_EXPERIENCE. Custom pages cannot use the aws: or connect: prefixes. */
  Page: string;
  /** The Amazon Resource Name (ARN) of the view to associate with the page. */
  ResourceArn: string;
  /** The identifier of the workspace. */
  WorkspaceId: string;
  /** A JSON string containing input parameters for the view, validated against the view's input schema. */
  InputData?: string;
  /** The URL-friendly identifier for the page. */
  Slug?: string;
}

export interface DeactivateEvaluationFormInput {
  /** The unique identifier for the evaluation form. */
  EvaluationFormId: string;
  /** A version of the evaluation form. If the version property is not provided, the latest version of the evaluation form is deactivated. */
  EvaluationFormVersion: number;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

/** Request to DeleteAttachedFile API */
export interface DeleteAttachedFileInput {
  /** The resource to which the attached file is (being) uploaded to. Cases are the only current supported resource. This value must be a valid ARN. */
  AssociatedResourceArn: string;
  /** The unique identifier of the attached file resource. */
  FileId: string;
  /** The unique identifier of the Connect instance. */
  InstanceId: string;
}

export interface DeleteContactEvaluationInput {
  /** A unique identifier for the contact evaluation. */
  EvaluationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DeleteContactFlowInput {
  /** The identifier of the flow. */
  ContactFlowId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DeleteContactFlowModuleInput {
  /** The identifier of the flow module. */
  ContactFlowModuleId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DeleteContactFlowModuleAliasInput {
  /** The identifier of the alias. */
  AliasId: string;
  /** The identifier of the flow module. */
  ContactFlowModuleId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DeleteContactFlowModuleVersionInput {
  /** The identifier of the flow module. */
  ContactFlowModuleId: string;
  /** The version of the flow module to delete. */
  ContactFlowModuleVersion: number;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DeleteContactFlowVersionInput {
  /** The identifier of the flow. */
  ContactFlowId: string;
  /** The identifier of the flow version. */
  ContactFlowVersion: number;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DeleteDataTableInput {
  /** The unique identifier for the data table to delete. Must also accept the table ARN. Fails with an error if the version is provided and is not $LATEST. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
}

export interface DeleteDataTableAttributeInput {
  /** The name of the attribute to delete. */
  AttributeName: string;
  /** The unique identifier for the data table. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
}

export interface DeleteEmailAddressInput {
  /** The identifier of the email address. */
  EmailAddressId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DeleteEvaluationFormInput {
  /** The unique identifier for the evaluation form. */
  EvaluationFormId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The unique identifier for the evaluation form. */
  EvaluationFormVersion?: number;
}

export interface DeleteHoursOfOperationInput {
  /** The identifier for the hours of operation. */
  HoursOfOperationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DeleteHoursOfOperationOverrideInput {
  /** The identifier for the hours of operation. */
  HoursOfOperationId: string;
  /** The identifier for the hours of operation override. */
  HoursOfOperationOverrideId: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
}

export interface DeleteInstanceInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface DeleteIntegrationAssociationInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the integration association. */
  IntegrationAssociationId: string;
}

export interface DeleteNotificationInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The unique identifier for the notification to delete. */
  NotificationId: string;
}

export interface DeletePredefinedAttributeInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the predefined attribute. */
  Name: string;
}

export interface DeletePromptInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique identifier for the prompt. */
  PromptId: string;
}

export interface DeletePushNotificationRegistrationInput {
  /** The identifier of the contact within the Amazon Connect instance. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the registration. */
  RegistrationId: string;
}

export interface DeleteQueueInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the queue. */
  QueueId: string;
}

export interface DeleteQuickConnectInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the quick connect. */
  QuickConnectId: string;
}

export interface DeleteRoutingProfileInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the routing profile. */
  RoutingProfileId: string;
}

export interface DeleteRuleInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique identifier for the rule. */
  RuleId: string;
}

export interface DeleteSecurityProfileInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the security profle. */
  SecurityProfileId: string;
}

export interface DeleteTaskTemplateInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique identifier for the task template. */
  TaskTemplateId: string;
}

export interface DeleteTestCaseInput {
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The identifier of the test case to delete. */
  TestCaseId: string;
}

export interface DeleteTrafficDistributionGroupInput {
  /** The identifier of the traffic distribution group. This can be the ID or the ARN of the traffic distribution group. */
  TrafficDistributionGroupId: string;
}

export interface DeleteUseCaseInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the integration association. */
  IntegrationAssociationId: string;
  /** The identifier for the use case. */
  UseCaseId: string;
}

export interface DeleteUserInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the user. */
  UserId: string;
}

export interface DeleteUserHierarchyGroupInput {
  /** The identifier of the hierarchy group. */
  HierarchyGroupId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DeleteViewInput {
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The identifier of the view. Both ViewArn and ViewId can be used. */
  ViewId: string;
}

export interface DeleteViewVersionInput {
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The identifier of the view. Both ViewArn and ViewId can be used. */
  ViewId: string;
  /** The version number of the view. */
  ViewVersion: number;
}

export interface DeleteVocabularyInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the custom vocabulary. */
  VocabularyId: string;
}

export interface DeleteWorkspaceInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the workspace. */
  WorkspaceId: string;
}

export interface DeleteWorkspaceMediaInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The type of media to delete. Valid values are: IMAGE_LOGO_FAVICON and IMAGE_LOGO_HORIZONTAL. */
  MediaType: 'IMAGE_LOGO_LIGHT_FAVICON' | 'IMAGE_LOGO_DARK_FAVICON' | 'IMAGE_LOGO_LIGHT_HORIZONTAL' | 'IMAGE_LOGO_DARK_HORIZONTAL';
  /** The identifier of the workspace. */
  WorkspaceId: string;
}

export interface DeleteWorkspacePageInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The page identifier. */
  Page: string;
  /** The identifier of the workspace. */
  WorkspaceId: string;
}

export interface DescribeAgentStatusInput {
  /** The identifier for the agent status. */
  AgentStatusId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DescribeAuthenticationProfileInput {
  /** A unique identifier for the authentication profile. */
  AuthenticationProfileId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DescribeContactInput {
  /** The identifier of the contact. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DescribeContactEvaluationInput {
  /** A unique identifier for the contact evaluation. */
  EvaluationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DescribeContactFlowInput {
  /** The identifier of the flow. */
  ContactFlowId: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
}

export interface DescribeContactFlowModuleInput {
  /** The identifier of the flow module. */
  ContactFlowModuleId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DescribeContactFlowModuleAliasInput {
  /** The identifier of the alias. */
  AliasId: string;
  /** The identifier of the flow module. */
  ContactFlowModuleId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DescribeDataTableInput {
  /** The unique identifier for the data table. Must also accept the table ARN with or without a version alias. If no alias is provided, the default behavior is identical to providing the $LATEST alias. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
}

export interface DescribeDataTableAttributeInput {
  /** The name of the attribute to retrieve detailed information for. */
  AttributeName: string;
  /** The unique identifier for the data table. Must also accept the table ARN with or without a version alias. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
}

export interface DescribeEmailAddressInput {
  /** The identifier of the email address. */
  EmailAddressId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DescribeEvaluationFormInput {
  /** A unique identifier for the contact evaluation. */
  EvaluationFormId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A version of the evaluation form. */
  EvaluationFormVersion?: number;
}

export interface DescribeHoursOfOperationInput {
  /** The identifier for the hours of operation. */
  HoursOfOperationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DescribeHoursOfOperationOverrideInput {
  /** The identifier for the hours of operation. */
  HoursOfOperationId: string;
  /** The identifier for the hours of operation override. */
  HoursOfOperationOverrideId: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
}

export interface DescribeInstanceInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DescribeInstanceAttributeInput {
  /** The type of attribute. */
  AttributeType: 'INBOUND_CALLS' | 'OUTBOUND_CALLS' | 'CONTACTFLOW_LOGS' | 'CONTACT_LENS' | 'AUTO_RESOLVE_BEST_VOICES' | 'USE_CUSTOM_TTS_VOICES' | 'EARLY_MEDIA' | 'MULTI_PARTY_CONFERENCE' | 'HIGH_VOLUME_OUTBOUND' | 'ENHANCED_CONTACT_MONITORING' | 'ENHANCED_CHAT_MONITORING' | 'MULTI_PARTY_CHAT_CONFERENCE' | 'MESSAGE_STREAMING';
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DescribeInstanceStorageConfigInput {
  /** The existing association identifier that uniquely identifies the resource type and storage config for the given instance ID. */
  AssociationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A valid resource type. */
  ResourceType: 'CHAT_TRANSCRIPTS' | 'CALL_RECORDINGS' | 'SCHEDULED_REPORTS' | 'MEDIA_STREAMS' | 'CONTACT_TRACE_RECORDS' | 'AGENT_EVENTS' | 'REAL_TIME_CONTACT_ANALYSIS_SEGMENTS' | 'ATTACHMENTS' | 'CONTACT_EVALUATIONS' | 'SCREEN_RECORDINGS' | 'REAL_TIME_CONTACT_ANALYSIS_CHAT_SEGMENTS' | 'REAL_TIME_CONTACT_ANALYSIS_VOICE_SEGMENTS' | 'EMAIL_MESSAGES';
}

export interface DescribeNotificationInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The unique identifier for the notification. */
  NotificationId: string;
}

export interface DescribePhoneNumberInput {
  /** A unique identifier for the phone number. */
  PhoneNumberId: string;
}

export interface DescribePredefinedAttributeInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the predefined attribute. */
  Name: string;
}

export interface DescribePromptInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique identifier for the prompt. */
  PromptId: string;
}

export interface DescribeQueueInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the queue. */
  QueueId: string;
}

export interface DescribeQuickConnectInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the quick connect. */
  QuickConnectId: string;
}

export interface DescribeRoutingProfileInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the routing profile. */
  RoutingProfileId: string;
}

export interface DescribeRuleInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique identifier for the rule. */
  RuleId: string;
}

export interface DescribeSecurityProfileInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the security profle. */
  SecurityProfileId: string;
}

export interface DescribeTestCaseInput {
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The identifier of the test case. */
  TestCaseId: string;
  /** The status of the test case version to retrieve. If not specified, returns the published version if available, otherwise returns the saved version. */
  Status?: 'PUBLISHED' | 'SAVED';
}

export interface DescribeTrafficDistributionGroupInput {
  /** The identifier of the traffic distribution group. This can be the ID or the ARN if the API is being called in the Region where the traffic distribution group was created. The ARN must be provided if t */
  TrafficDistributionGroupId: string;
}

export interface DescribeUserInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the user account. */
  UserId: string;
}

export interface DescribeUserHierarchyGroupInput {
  /** The identifier of the hierarchy group. */
  HierarchyGroupId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DescribeUserHierarchyStructureInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface DescribeViewInput {
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The ViewId of the view. This must be an ARN for Amazon Web Services managed views. */
  ViewId: string;
}

export interface DescribeVocabularyInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the custom vocabulary. */
  VocabularyId: string;
}

export interface DescribeWorkspaceInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the workspace. */
  WorkspaceId: string;
}

export interface DisassociateAnalyticsDataSetInput {
  /** The identifier of the dataset to remove. */
  DataSetId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the target account. Use to associate a dataset to a different account than the one containing the Amazon Connect instance. If not specified, by default this value is the Amazon Web S */
  TargetAccountId?: string;
}

export interface DisassociateApprovedOriginInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The domain URL of the integrated application. */
  Origin: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface DisassociateBotInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  LexBot?: LexBot;
  /** The Amazon Lex V2 bot to disassociate from the instance. */
  LexV2Bot?: LexV2Bot;
}

export interface DisassociateEmailAddressAliasInput {
  /** Configuration object that specifies which alias relationship to remove. The alias association must currently exist between the primary email address and the specified alias email address. */
  AliasConfiguration: AliasConfiguration;
  /** The identifier of the email address. */
  EmailAddressId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface DisassociateFlowInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the resource. Amazon Web Services End User Messaging SMS phone number ARN when using SMS_PHONE_NUMBER Amazon Web Services End User Messaging Social phone number ARN when using WHATSA */
  ResourceId: string;
  /** A valid resource type. */
  ResourceType: 'SMS_PHONE_NUMBER' | 'INBOUND_EMAIL' | 'OUTBOUND_EMAIL' | 'ANALYTICS_CONNECTOR' | 'WHATSAPP_MESSAGING_PHONE_NUMBER';
}

export interface DisassociateHoursOfOperationsInput {
  /** The identifier of the child hours of operation. */
  HoursOfOperationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The Amazon Resource Names (ARNs) of the parent hours of operation resources to disassociate with the child hours of operation resource. */
  ParentHoursOfOperationIds: string[];
}

export interface DisassociateInstanceStorageConfigInput {
  /** The existing association identifier that uniquely identifies the resource type and storage config for the given instance ID. */
  AssociationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A valid resource type. */
  ResourceType: 'CHAT_TRANSCRIPTS' | 'CALL_RECORDINGS' | 'SCHEDULED_REPORTS' | 'MEDIA_STREAMS' | 'CONTACT_TRACE_RECORDS' | 'AGENT_EVENTS' | 'REAL_TIME_CONTACT_ANALYSIS_SEGMENTS' | 'ATTACHMENTS' | 'CONTACT_EVALUATIONS' | 'SCREEN_RECORDINGS' | 'REAL_TIME_CONTACT_ANALYSIS_CHAT_SEGMENTS' | 'REAL_TIME_CONTACT_ANALYSIS_VOICE_SEGMENTS' | 'EMAIL_MESSAGES';
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface DisassociateLambdaFunctionInput {
  /** The Amazon Resource Name (ARN) of the Lambda function being disassociated. */
  FunctionArn: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance.. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface DisassociateLexBotInput {
  /** The name of the Amazon Lex bot. Maximum character limit of 50. */
  BotName: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The Amazon Web Services Region in which the Amazon Lex bot has been created. */
  LexRegion: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface DisassociatePhoneNumberContactFlowInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique identifier for the phone number. */
  PhoneNumberId: string;
}

export interface DisassociateQueueQuickConnectsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the queue. */
  QueueId: string;
  /** The quick connects to disassociate from the queue. */
  QuickConnectIds: string[];
}

export interface DisassociateRoutingProfileQueuesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the routing profile. */
  RoutingProfileId: string;
  /** The manual assignment queues to disassociate with this routing profile. */
  ManualAssignmentQueueReferences?: RoutingProfileQueueReference[];
  /** The queues to disassociate from this routing profile. */
  QueueReferences?: RoutingProfileQueueReference[];
}

export interface DisassociateSecurityKeyInput {
  /** The existing association identifier that uniquely identifies the resource type and storage config for the given instance ID. */
  AssociationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface DisassociateSecurityProfilesInput {
  /** ARN of a Q in Connect AI Agent. */
  EntityArn: string;
  /** Only supported type is AI_AGENT. */
  EntityType: 'USER' | 'AI_AGENT';
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** List of Security Profile Object. */
  SecurityProfiles: SecurityProfileItem[];
}

export interface DisassociateTrafficDistributionGroupUserInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the traffic distribution group. This can be the ID or the ARN of the traffic distribution group. */
  TrafficDistributionGroupId: string;
  /** The identifier for the user. This can be the ID or the ARN of the user. */
  UserId: string;
}

export interface DisassociateUserProficienciesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the user account. */
  UserId: string;
  /** The proficiencies to disassociate from the user. */
  UserProficiencies: UserProficiencyDisassociate[];
}

export interface DisassociateWorkspaceInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The Amazon Resource Names (ARNs) of the resources to disassociate from the workspace. */
  ResourceArns: string[];
  /** The identifier of the workspace. */
  WorkspaceId: string;
}

export interface DismissUserContactInput {
  /** The identifier of the contact. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The identifier of the user account. */
  UserId: string;
}

export interface EvaluateDataTableValuesInput {
  /** The unique identifier for the data table. Must also accept the table ARN with or without a version alias. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
  /** A list of value evaluation sets specifying which primary values and attributes to evaluate. */
  Values: DataTableValueEvaluationSet[];
  /** The maximum number of data table values to return in one page of results. */
  MaxResults?: number;
  /** Specify the pagination token from a previous request to retrieve the next page of results. */
  NextToken?: string;
  /** Optional IANA timezone identifier to use when resolving time based dynamic values. Defaults to the data table time zone if not provided. */
  TimeZone?: string;
}

/** Request to GetAttachedFile API. */
export interface GetAttachedFileInput {
  /** The resource to which the attached file is (being) uploaded to. The supported resources are Cases and Email. This value must be a valid ARN. */
  AssociatedResourceArn: string;
  /** The unique identifier of the attached file resource. */
  FileId: string;
  /** The unique identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** Optional override for the expiry of the pre-signed S3 URL in seconds. The default value is 300. */
  UrlExpiryInSeconds?: number;
}

export interface GetContactAttributesInput {
  /** The identifier of the initial contact. */
  InitialContactId: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
}

export interface GetContactMetricsInput {
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A list of contact level metrics to retrieve.Supported metrics include POSITION_IN_QUEUE (the contact's current position in the queue) and ESTIMATED_WAIT_TIME (the predicted time in seconds until the c */
  Metrics: ContactMetricInfo[];
}

export interface GetCurrentMetricDataInput {
  /** The metrics to retrieve. Specify the name or metricId, and unit for each metric. The following metrics are available. For a description of all the metrics, see Metrics definitions in the Amazon Connec */
  CurrentMetrics: CurrentMetric[];
  /** The filters to apply to returned metrics. You can filter up to the following limits: Queues: 100 Routing profiles: 100 Channels: 3 (VOICE, CHAT, and TASK channels are supported.) RoutingStepExpression */
  Filters: Filters;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Defines the level of aggregation for metrics data by a dimension(s). Its similar to sorting items into buckets based on a common characteristic, then counting or calculating something for each bucket. */
  Groupings?: 'QUEUE' | 'CHANNEL' | 'ROUTING_PROFILE' | 'ROUTING_STEP_EXPRESSION' | 'AGENT_STATUS' | 'SUBTYPE' | 'VALIDATION_TEST_TYPE'[];
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. The token expires after 5 minutes from the time it is cr */
  NextToken?: string;
  /** The way to sort the resulting response based on metrics. You can enter one sort criteria. By default resources are sorted based on AGENTS_ONLINE, DESCENDING. The metric collection is sorted based on t */
  SortCriteria?: CurrentMetricSortCriteria[];
}

export interface GetCurrentUserDataInput {
  /** The filters to apply to returned user data. You can filter up to the following limits: Queues: 100 Routing profiles: 100 Agents: 100 Contact states: 9 User hierarchy groups: 1 The user data is retriev */
  Filters: UserDataFilters;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface GetEffectiveHoursOfOperationsInput {
  /** The date from when the hours of operation are listed. */
  FromDate: string;
  /** The identifier for the hours of operation. */
  HoursOfOperationId: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The date until when the hours of operation are listed. */
  ToDate: string;
}

export interface GetFederationTokenInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface GetFlowAssociationInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the resource. Amazon Web Services End User Messaging SMS phone number ARN when using SMS_PHONE_NUMBER Amazon Web Services End User Messaging Social phone number ARN when using WHATSA */
  ResourceId: string;
  /** A valid resource type. */
  ResourceType: 'SMS_PHONE_NUMBER' | 'INBOUND_EMAIL' | 'OUTBOUND_EMAIL' | 'ANALYTICS_CONNECTOR' | 'WHATSAPP_MESSAGING_PHONE_NUMBER';
}

export interface GetMetricDataInput {
  /** The timestamp, in UNIX Epoch time format, at which to end the reporting interval for the retrieval of historical metrics data. The time must be specified using an interval of 5 minutes, such as 11:00, */
  EndTime: string;
  /** The queues, up to 100, or channels, to use to filter the metrics returned. Metric data is retrieved only for the resources associated with the queues or channels included in the filter. You can includ */
  Filters: Filters;
  /** The metrics to retrieve. Specify the name, unit, and statistic for each metric. The following historical metrics are available. For a description of each metric, see Metrics definition in the Amazon C */
  HistoricalMetrics: HistoricalMetric[];
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The timestamp, in UNIX Epoch time format, at which to start the reporting interval for the retrieval of historical metrics data. The time must be specified using a multiple of 5 minutes, such as 10:05 */
  StartTime: string;
  /** The grouping applied to the metrics returned. For example, when results are grouped by queue, the metrics returned are grouped by queue. The values returned apply to the metrics for each queue rather  */
  Groupings?: 'QUEUE' | 'CHANNEL' | 'ROUTING_PROFILE' | 'ROUTING_STEP_EXPRESSION' | 'AGENT_STATUS' | 'SUBTYPE' | 'VALIDATION_TEST_TYPE'[];
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface GetMetricDataV2Input {
  /** The timestamp, in UNIX Epoch time format, at which to end the reporting interval for the retrieval of historical metrics data. The time must be later than the start time timestamp. It cannot be later  */
  EndTime: string;
  /** The filters to apply to returned metrics. You can filter on the following resources: Agents Campaigns Channels Feature Queues Routing profiles Routing step expression User hierarchy groups At least on */
  Filters: FilterV2[];
  /** The metrics to retrieve. Specify the name or metricId, groupings, and filters for each metric. The following historical metrics are available. For a description of each metric, see Metrics definition  */
  Metrics: MetricV2[];
  /** The Amazon Resource Name (ARN) of the resource. This includes the instanceId an Amazon Connect instance. */
  ResourceArn: string;
  /** The timestamp, in UNIX Epoch time format, at which to start the reporting interval for the retrieval of historical metrics data. The time must be before the end time timestamp. The start and end time  */
  StartTime: string;
  /** The grouping applied to the metrics that are returned. For example, when results are grouped by queue, the metrics returned are grouped by queue. The values that are returned apply to the metrics for  */
  Groupings?: string[];
  /** The interval period and timezone to apply to returned metrics. IntervalPeriod: An aggregated grouping applied to request metrics. Valid IntervalPeriod values are: FIFTEEN_MIN | THIRTY_MIN | HOUR | DAY */
  Interval?: IntervalDetails;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface GetPromptFileInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique identifier for the prompt. */
  PromptId: string;
}

export interface GetTaskTemplateInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique identifier for the task template. */
  TaskTemplateId: string;
  /** The system generated version of a task template that is associated with a task, when the task is created. */
  SnapshotVersion?: string;
}

export interface GetTestCaseExecutionSummaryInput {
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The identifier of the test case execution. */
  TestCaseExecutionId: string;
  /** The identifier of the test case. */
  TestCaseId: string;
}

export interface GetTrafficDistributionInput {
  /** The identifier of the traffic distribution group. This can be the ID or the ARN if the API is being called in the Region where the traffic distribution group was created. The ARN must be provided if t */
  Id: string;
}

export interface ImportPhoneNumberInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The claimed phone number ARN being imported from the external service, such as Amazon Web Services End User Messaging. If it is from Amazon Web Services End User Messaging, it looks like the ARN of th */
  SourcePhoneNumberArn: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The description of the phone number. */
  PhoneNumberDescription?: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface ImportWorkspaceMediaInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The media source. Can be an S3 presigned URL or a base64-encoded string. */
  MediaSource: string;
  /** The type of media. Valid values are: IMAGE_LOGO_FAVICON and IMAGE_LOGO_HORIZONTAL. */
  MediaType: 'IMAGE_LOGO_LIGHT_FAVICON' | 'IMAGE_LOGO_DARK_FAVICON' | 'IMAGE_LOGO_LIGHT_HORIZONTAL' | 'IMAGE_LOGO_DARK_HORIZONTAL';
  /** The identifier of the workspace. */
  WorkspaceId: string;
}

export interface ListAgentStatusesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Available agent status types. */
  AgentStatusTypes?: 'ROUTABLE' | 'CUSTOM' | 'OFFLINE'[];
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListAnalyticsDataAssociationsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the dataset to get the association status. */
  DataSetId?: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListAnalyticsDataLakeDataSetsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListApprovedOriginsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListAssociatedContactsInput {
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListAuthenticationProfilesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListBotsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The version of Amazon Lex or Amazon Lex V2. */
  LexVersion: 'V1' | 'V2';
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListChildHoursOfOperationsInput {
  /** The identifier of the parent hours of operation. */
  HoursOfOperationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListContactEvaluationsInput {
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. This is not expected to be set because the value returne */
  NextToken?: string;
}

export interface ListContactFlowModuleAliasesInput {
  /** The identifier of the flow module. */
  ContactFlowModuleId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListContactFlowModulesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The state of the flow module. */
  ContactFlowModuleState?: 'ACTIVE' | 'ARCHIVED';
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListContactFlowModuleVersionsInput {
  /** The identifier of the flow module. */
  ContactFlowModuleId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListContactFlowsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The type of flow. */
  ContactFlowTypes?: 'CONTACT_FLOW' | 'CUSTOMER_QUEUE' | 'CUSTOMER_HOLD' | 'CUSTOMER_WHISPER' | 'AGENT_HOLD' | 'AGENT_WHISPER' | 'OUTBOUND_WHISPER' | 'AGENT_TRANSFER' | 'QUEUE_TRANSFER' | 'CAMPAIGN'[];
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListContactFlowVersionsInput {
  /** The identifier of the flow. */
  ContactFlowId: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListContactReferencesInput {
  /** The identifier of the initial contact. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The type of reference. */
  ReferenceTypes: 'URL' | 'ATTACHMENT' | 'CONTACT_ANALYSIS' | 'NUMBER' | 'STRING' | 'DATE' | 'EMAIL' | 'EMAIL_MESSAGE' | 'EMAIL_MESSAGE_PLAIN_TEXT'[];
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. This is not expected to be set, because the value return */
  NextToken?: string;
}

export interface ListDataTableAttributesInput {
  /** The unique identifier for the data table whose attributes should be listed. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
  /** Optional list of specific attribute IDs to retrieve. Used for CloudFormation to effectively describe attributes by ID. If NextToken is provided, this parameter is ignored. */
  AttributeIds?: string[];
  /** The maximum number of data table attributes to return in one page of results. */
  MaxResults?: number;
  /** Specify the pagination token from a previous request to retrieve the next page of results. */
  NextToken?: string;
}

export interface ListDataTablePrimaryValuesInput {
  /** The unique identifier for the data table whose primary values should be listed. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
  /** The maximum number of data table primary values to return in one page of results. */
  MaxResults?: number;
  /** Specify the pagination token from a previous request to retrieve the next page of results. */
  NextToken?: string;
  /** Optional filter to retrieve primary values matching specific criteria. */
  PrimaryAttributeValues?: PrimaryAttributeValueFilter[];
  /** Optional list of specific record IDs to retrieve. Used for CloudFormation to effectively describe records by ID. If NextToken is provided, this parameter is ignored. */
  RecordIds?: string[];
}

export interface ListDataTablesInput {
  /** The unique identifier for the Amazon Connect instance whose data tables should be listed. */
  InstanceId: string;
  /** The maximum number of data tables to return in one page of results. */
  MaxResults?: number;
  /** Specify the pagination token from a previous request to retrieve the next page of results. */
  NextToken?: string;
}

export interface ListDataTableValuesInput {
  /** The unique identifier for the data table whose values should be listed. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
  /** The maximum number of data table values to return in one page of results. */
  MaxResults?: number;
  /** Specify the pagination token from a previous request to retrieve the next page of results. */
  NextToken?: string;
  /** Optional filter to retrieve values for records matching specific primary attribute criteria. */
  PrimaryAttributeValues?: PrimaryAttributeValueFilter[];
  /** Optional list of specific record IDs to retrieve values for. */
  RecordIds?: string[];
}

export interface ListDefaultVocabulariesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The language code of the vocabulary entries. For a list of languages and their corresponding language codes, see What is Amazon Transcribe? */
  LanguageCode?: 'ar-AE' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fr-CA' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'pt-BR' | 'pt-PT' | 'zh-CN' | 'en-NZ' | 'en-ZA' | 'ca-ES' | 'da-DK' | 'fi-FI' | 'id-ID' | 'ms-MY' | 'nl-NL' | 'no-NO' | 'pl-PL' | 'sv-SE' | 'tl-PH';
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListEntitySecurityProfilesInput {
  /** ARN of a Q in Connect AI Agent. */
  EntityArn: string;
  /** Only supported type is AI_AGENT. */
  EntityType: 'USER' | 'AI_AGENT';
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListEvaluationFormsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListEvaluationFormVersionsInput {
  /** The unique identifier for the evaluation form. */
  EvaluationFormId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListFlowAssociationsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** A valid resource type. */
  ResourceType?: 'WHATSAPP_MESSAGING_PHONE_NUMBER' | 'VOICE_PHONE_NUMBER' | 'INBOUND_EMAIL' | 'OUTBOUND_EMAIL' | 'ANALYTICS_CONNECTOR';
}

export interface ListHoursOfOperationOverridesInput {
  /** The identifier for the hours of operation. */
  HoursOfOperationId: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListHoursOfOperationsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListInstanceAttributesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListInstancesInput {
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListInstanceStorageConfigsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A valid resource type. */
  ResourceType: 'CHAT_TRANSCRIPTS' | 'CALL_RECORDINGS' | 'SCHEDULED_REPORTS' | 'MEDIA_STREAMS' | 'CONTACT_TRACE_RECORDS' | 'AGENT_EVENTS' | 'REAL_TIME_CONTACT_ANALYSIS_SEGMENTS' | 'ATTACHMENTS' | 'CONTACT_EVALUATIONS' | 'SCREEN_RECORDINGS' | 'REAL_TIME_CONTACT_ANALYSIS_CHAT_SEGMENTS' | 'REAL_TIME_CONTACT_ANALYSIS_VOICE_SEGMENTS' | 'EMAIL_MESSAGES';
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListIntegrationAssociationsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The Amazon Resource Name (ARN) of the integration. */
  IntegrationArn?: string;
  /** The integration type. */
  IntegrationType?: 'EVENT' | 'VOICE_ID' | 'PINPOINT_APP' | 'WISDOM_ASSISTANT' | 'WISDOM_KNOWLEDGE_BASE' | 'WISDOM_QUICK_RESPONSES' | 'Q_MESSAGE_TEMPLATES' | 'CASES_DOMAIN' | 'APPLICATION' | 'FILE_SCANNER' | 'SES_IDENTITY' | 'ANALYTICS_CONNECTOR' | 'CALL_TRANSFER_CONNECTOR' | 'COGNITO_USER_POOL' | 'MESSAGE_PROCESSOR';
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListLambdaFunctionsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListLexBotsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. If no value is specified, the default is 10. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListNotificationsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. Valid range is 1-100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response to retrieve the next page of results. */
  NextToken?: string;
}

export interface ListPhoneNumbersInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The ISO country code. */
  PhoneNumberCountryCodes?: 'AF' | 'AL' | 'DZ' | 'AS' | 'AD' | 'AO' | 'AI' | 'AQ' | 'AG' | 'AR' | 'AM' | 'AW' | 'AU' | 'AT' | 'AZ' | 'BS' | 'BH' | 'BD' | 'BB' | 'BY' | 'BE' | 'BZ' | 'BJ' | 'BM' | 'BT' | 'BO' | 'BA' | 'BW' | 'BR' | 'IO' | 'VG' | 'BN' | 'BG' | 'BF' | 'BI' | 'KH' | 'CM' | 'CA' | 'CV' | 'KY' | 'CF' | 'TD' | 'CL' | 'CN' | 'CX' | 'CC' | 'CO' | 'KM' | 'CK' | 'CR' | 'HR' | 'CU' | 'CW' | 'CY' | 'CZ' | 'CD' | 'DK' | 'DJ' | 'DM' | 'DO' | 'TL' | 'EC' | 'EG' | 'SV' | 'GQ' | 'ER' | 'EE' | 'ET' | 'FK' | 'FO' | 'FJ' | 'FI' | 'FR' | 'PF' | 'GA' | 'GM' | 'GE' | 'DE' | 'GH' | 'GI' | 'GR' | 'GL' | 'GD' | 'GU' | 'GT' | 'GG' | 'GN' | 'GW' | 'GY' | 'HT' | 'HN' | 'HK' | 'HU' | 'IS' | 'IN' | 'ID' | 'IR' | 'IQ' | 'IE' | 'IM' | 'IL' | 'IT' | 'CI' | 'JM' | 'JP' | 'JE' | 'JO' | 'KZ' | 'KE' | 'KI' | 'KW' | 'KG' | 'LA' | 'LV' | 'LB' | 'LS' | 'LR' | 'LY' | 'LI' | 'LT' | 'LU' | 'MO' | 'MK' | 'MG' | 'MW' | 'MY' | 'MV' | 'ML' | 'MT' | 'MH' | 'MR' | 'MU' | 'YT' | 'MX' | 'FM' | 'MD' | 'MC' | 'MN' | 'ME' | 'MS' | 'MA' | 'MZ' | 'MM' | 'NA' | 'NR' | 'NP' | 'NL' | 'AN' | 'NC' | 'NZ' | 'NI' | 'NE' | 'NG' | 'NU' | 'KP' | 'MP' | 'NO' | 'OM' | 'PK' | 'PW' | 'PA' | 'PG' | 'PY' | 'PE' | 'PH' | 'PN' | 'PL' | 'PT' | 'PR' | 'QA' | 'CG' | 'RE' | 'RO' | 'RU' | 'RW' | 'BL' | 'SH' | 'KN' | 'LC' | 'MF' | 'PM' | 'VC' | 'WS' | 'SM' | 'ST' | 'SA' | 'SN' | 'RS' | 'SC' | 'SL' | 'SG' | 'SX' | 'SK' | 'SI' | 'SB' | 'SO' | 'ZA' | 'KR' | 'ES' | 'LK' | 'SD' | 'SR' | 'SJ' | 'SZ' | 'SE' | 'CH' | 'SY' | 'TW' | 'TJ' | 'TZ' | 'TH' | 'TG' | 'TK' | 'TO' | 'TT' | 'TN' | 'TR' | 'TM' | 'TC' | 'TV' | 'VI' | 'UG' | 'UA' | 'AE' | 'GB' | 'US' | 'UY' | 'UZ' | 'VU' | 'VA' | 'VE' | 'VN' | 'WF' | 'EH' | 'YE' | 'ZM' | 'ZW'[];
  /** The type of phone number. We recommend using ListPhoneNumbersV2 to return phone number types. While ListPhoneNumbers returns number types UIFN, SHARED, THIRD_PARTY_TF, and THIRD_PARTY_DID, it incorrec */
  PhoneNumberTypes?: 'TOLL_FREE' | 'DID' | 'UIFN' | 'SHARED' | 'THIRD_PARTY_TF' | 'THIRD_PARTY_DID' | 'SHORT_CODE'[];
}

export interface ListPhoneNumbersV2Input {
  /** The identifier of the Amazon Connect instance that phone numbers are claimed to. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. If both TargetArn and InstanceId are no */
  InstanceId?: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The ISO country code. */
  PhoneNumberCountryCodes?: 'AF' | 'AL' | 'DZ' | 'AS' | 'AD' | 'AO' | 'AI' | 'AQ' | 'AG' | 'AR' | 'AM' | 'AW' | 'AU' | 'AT' | 'AZ' | 'BS' | 'BH' | 'BD' | 'BB' | 'BY' | 'BE' | 'BZ' | 'BJ' | 'BM' | 'BT' | 'BO' | 'BA' | 'BW' | 'BR' | 'IO' | 'VG' | 'BN' | 'BG' | 'BF' | 'BI' | 'KH' | 'CM' | 'CA' | 'CV' | 'KY' | 'CF' | 'TD' | 'CL' | 'CN' | 'CX' | 'CC' | 'CO' | 'KM' | 'CK' | 'CR' | 'HR' | 'CU' | 'CW' | 'CY' | 'CZ' | 'CD' | 'DK' | 'DJ' | 'DM' | 'DO' | 'TL' | 'EC' | 'EG' | 'SV' | 'GQ' | 'ER' | 'EE' | 'ET' | 'FK' | 'FO' | 'FJ' | 'FI' | 'FR' | 'PF' | 'GA' | 'GM' | 'GE' | 'DE' | 'GH' | 'GI' | 'GR' | 'GL' | 'GD' | 'GU' | 'GT' | 'GG' | 'GN' | 'GW' | 'GY' | 'HT' | 'HN' | 'HK' | 'HU' | 'IS' | 'IN' | 'ID' | 'IR' | 'IQ' | 'IE' | 'IM' | 'IL' | 'IT' | 'CI' | 'JM' | 'JP' | 'JE' | 'JO' | 'KZ' | 'KE' | 'KI' | 'KW' | 'KG' | 'LA' | 'LV' | 'LB' | 'LS' | 'LR' | 'LY' | 'LI' | 'LT' | 'LU' | 'MO' | 'MK' | 'MG' | 'MW' | 'MY' | 'MV' | 'ML' | 'MT' | 'MH' | 'MR' | 'MU' | 'YT' | 'MX' | 'FM' | 'MD' | 'MC' | 'MN' | 'ME' | 'MS' | 'MA' | 'MZ' | 'MM' | 'NA' | 'NR' | 'NP' | 'NL' | 'AN' | 'NC' | 'NZ' | 'NI' | 'NE' | 'NG' | 'NU' | 'KP' | 'MP' | 'NO' | 'OM' | 'PK' | 'PW' | 'PA' | 'PG' | 'PY' | 'PE' | 'PH' | 'PN' | 'PL' | 'PT' | 'PR' | 'QA' | 'CG' | 'RE' | 'RO' | 'RU' | 'RW' | 'BL' | 'SH' | 'KN' | 'LC' | 'MF' | 'PM' | 'VC' | 'WS' | 'SM' | 'ST' | 'SA' | 'SN' | 'RS' | 'SC' | 'SL' | 'SG' | 'SX' | 'SK' | 'SI' | 'SB' | 'SO' | 'ZA' | 'KR' | 'ES' | 'LK' | 'SD' | 'SR' | 'SJ' | 'SZ' | 'SE' | 'CH' | 'SY' | 'TW' | 'TJ' | 'TZ' | 'TH' | 'TG' | 'TK' | 'TO' | 'TT' | 'TN' | 'TR' | 'TM' | 'TC' | 'TV' | 'VI' | 'UG' | 'UA' | 'AE' | 'GB' | 'US' | 'UY' | 'UZ' | 'VU' | 'VA' | 'VE' | 'VN' | 'WF' | 'EH' | 'YE' | 'ZM' | 'ZW'[];
  /** The prefix of the phone number. If provided, it must contain + as part of the country code. */
  PhoneNumberPrefix?: string;
  /** The type of phone number. */
  PhoneNumberTypes?: 'TOLL_FREE' | 'DID' | 'UIFN' | 'SHARED' | 'THIRD_PARTY_TF' | 'THIRD_PARTY_DID' | 'SHORT_CODE'[];
  /** The Amazon Resource Name (ARN) for Amazon Connect instances or traffic distribution groups that phone number inbound traffic is routed through. If both TargetArn and InstanceId input are not provided, */
  TargetArn?: string;
}

export interface ListPredefinedAttributesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListPromptsInput {
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListQueueQuickConnectsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the queue. */
  QueueId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListQueuesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The type of queue. */
  QueueTypes?: 'STANDARD' | 'AGENT'[];
}

export interface ListQuickConnectsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. Both Instance ID and Instance ARN are supported input formats. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The type of quick connect. In the Amazon Connect admin website, when you create a quick connect, you are prompted to assign one of the following types: Agent (USER), External (PHONE_NUMBER), or Queue  */
  QuickConnectTypes?: 'USER' | 'QUEUE' | 'PHONE_NUMBER' | 'FLOW'[];
}

export interface ListRealtimeContactAnalysisSegmentsV2Input {
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The Contact Lens output type to be returned. */
  OutputType: 'Raw' | 'Redacted';
  /** Enum with segment types . Each value corresponds to a segment type returned in the segments list of the API. Each segment type has its own structure. Different channels may have different sets of supp */
  SegmentTypes: 'Transcript' | 'Categories' | 'Issues' | 'Event' | 'Attachments' | 'PostContactSummary'[];
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListRoutingProfileManualAssignmentQueuesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the routing profile. */
  RoutingProfileId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListRoutingProfileQueuesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the routing profile. */
  RoutingProfileId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListRoutingProfilesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListRulesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the event source. */
  EventSourceName?: 'OnPostCallAnalysisAvailable' | 'OnRealTimeCallAnalysisAvailable' | 'OnRealTimeChatAnalysisAvailable' | 'OnPostChatAnalysisAvailable' | 'OnZendeskTicketCreate' | 'OnZendeskTicketStatusUpdate' | 'OnSalesforceCaseCreate' | 'OnContactEvaluationSubmit' | 'OnMetricDataUpdate' | 'OnCaseCreate' | 'OnCaseUpdate' | 'OnSlaBreach';
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The publish status of the rule. */
  PublishStatus?: 'DRAFT' | 'PUBLISHED';
}

export interface ListSecurityKeysInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListSecurityProfileApplicationsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the security profle. */
  SecurityProfileId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListSecurityProfileFlowModulesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the security profile. */
  SecurityProfileId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListSecurityProfilePermissionsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the security profle. */
  SecurityProfileId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListSecurityProfilesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the resource. All Amazon Connect resources (instances, queues, flows, routing profiles, etc) have an ARN. To locate the ARN for an instance, for example, see Find you */
  resourceArn: string;
}

export interface ListTaskTemplatesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. It is not expected that you set this. */
  MaxResults?: number;
  /** The name of the task template. */
  Name?: string;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. It is not expected that you set this because the value r */
  NextToken?: string;
  /** Marks a template as ACTIVE or INACTIVE for a task to refer to it. Tasks can only be created from ACTIVE templates. If a template is marked as INACTIVE, then a task that refers to this template cannot  */
  Status?: 'ACTIVE' | 'INACTIVE';
}

export interface ListTestCaseExecutionRecordsInput {
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The identifier of the test case execution. */
  TestCaseExecutionId: string;
  /** The identifier of the test case. */
  TestCaseId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** Filter execution records by status. */
  Status?: 'INITIATED' | 'PASSED' | 'FAILED' | 'IN_PROGRESS' | 'STOPPED';
}

export interface ListTestCaseExecutionsInput {
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** Filter executions that started before this time. */
  EndTime?: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** Filter executions that started after this time. */
  StartTime?: string;
  /** Filter executions by status. */
  Status?: 'INITIATED' | 'PASSED' | 'FAILED' | 'IN_PROGRESS' | 'STOPPED';
  /** Filter executions by test case identifier. */
  TestCaseId?: string;
  /** Filter executions by test case name. */
  TestCaseName?: string;
}

export interface ListTestCasesInput {
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListTrafficDistributionGroupsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId?: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListTrafficDistributionGroupUsersInput {
  /** The identifier of the traffic distribution group. This can be the ID or the ARN if the API is being called in the Region where the traffic distribution group was created. The ARN must be provided if t */
  TrafficDistributionGroupId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

/** Provides summary information about the use cases for the specified integration association. */
export interface ListUseCasesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the integration association. */
  IntegrationAssociationId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListUserHierarchyGroupsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListUserNotificationsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the user. */
  UserId: string;
  /** The maximum number of results to return per page. Valid range is 1-1000. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response to retrieve the next page of results. */
  NextToken?: string;
}

export interface ListUserProficienciesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the user account. */
  UserId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListUsersInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListViewsInput {
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The type of the view. */
  Type?: 'CUSTOMER_MANAGED' | 'AWS_MANAGED';
}

export interface ListViewVersionsInput {
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The identifier of the view. Both ViewArn and ViewId can be used. */
  ViewId: string;
  /** The maximum number of results to return per page. The default MaxResult size is 100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListWorkspaceMediaInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the workspace. */
  WorkspaceId: string;
}

export interface ListWorkspacePagesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the workspace. */
  WorkspaceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListWorkspacesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
}

export interface MonitorContactInput {
  /** The identifier of the contact. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The identifier of the user account. */
  UserId: string;
  /** Specify which monitoring actions the user is allowed to take. For example, whether the user is allowed to escalate from silent monitoring to barge. AllowedMonitorCapabilities is required if barge is e */
  AllowedMonitorCapabilities?: 'SILENT_MONITOR' | 'BARGE'[];
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface PauseContactInput {
  /** The identifier of the contact. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The identifier of the flow. */
  ContactFlowId?: string;
}

export interface PutUserStatusInput {
  /** The identifier of the agent status. */
  AgentStatusId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the user. */
  UserId: string;
}

export interface ReleasePhoneNumberInput {
  /** A unique identifier for the phone number. */
  PhoneNumberId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface ReplicateInstanceInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. You can provide the InstanceId, or the entire ARN. */
  InstanceId: string;
  /** The alias for the replicated instance. The ReplicaAlias must be unique. */
  ReplicaAlias: string;
  /** The Amazon Web Services Region where to replicate the Amazon Connect instance. */
  ReplicaRegion: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface ResumeContactInput {
  /** The identifier of the contact. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The identifier of the flow. */
  ContactFlowId?: string;
}

export interface ResumeContactRecordingInput {
  /** The identifier of the contact. */
  ContactId: string;
  /** The identifier of the contact. This is the identifier of the contact associated with the first interaction with the contact center. */
  InitialContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The type of recording being operated on. */
  ContactRecordingType?: 'AGENT' | 'IVR' | 'SCREEN';
}

export interface SearchAgentStatusesInput {
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return agent statuses. */
  SearchCriteria?: AgentStatusSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: AgentStatusSearchFilter;
}

export interface SearchAvailablePhoneNumbersInput {
  /** The ISO country code. */
  PhoneNumberCountryCode: 'AF' | 'AL' | 'DZ' | 'AS' | 'AD' | 'AO' | 'AI' | 'AQ' | 'AG' | 'AR' | 'AM' | 'AW' | 'AU' | 'AT' | 'AZ' | 'BS' | 'BH' | 'BD' | 'BB' | 'BY' | 'BE' | 'BZ' | 'BJ' | 'BM' | 'BT' | 'BO' | 'BA' | 'BW' | 'BR' | 'IO' | 'VG' | 'BN' | 'BG' | 'BF' | 'BI' | 'KH' | 'CM' | 'CA' | 'CV' | 'KY' | 'CF' | 'TD' | 'CL' | 'CN' | 'CX' | 'CC' | 'CO' | 'KM' | 'CK' | 'CR' | 'HR' | 'CU' | 'CW' | 'CY' | 'CZ' | 'CD' | 'DK' | 'DJ' | 'DM' | 'DO' | 'TL' | 'EC' | 'EG' | 'SV' | 'GQ' | 'ER' | 'EE' | 'ET' | 'FK' | 'FO' | 'FJ' | 'FI' | 'FR' | 'PF' | 'GA' | 'GM' | 'GE' | 'DE' | 'GH' | 'GI' | 'GR' | 'GL' | 'GD' | 'GU' | 'GT' | 'GG' | 'GN' | 'GW' | 'GY' | 'HT' | 'HN' | 'HK' | 'HU' | 'IS' | 'IN' | 'ID' | 'IR' | 'IQ' | 'IE' | 'IM' | 'IL' | 'IT' | 'CI' | 'JM' | 'JP' | 'JE' | 'JO' | 'KZ' | 'KE' | 'KI' | 'KW' | 'KG' | 'LA' | 'LV' | 'LB' | 'LS' | 'LR' | 'LY' | 'LI' | 'LT' | 'LU' | 'MO' | 'MK' | 'MG' | 'MW' | 'MY' | 'MV' | 'ML' | 'MT' | 'MH' | 'MR' | 'MU' | 'YT' | 'MX' | 'FM' | 'MD' | 'MC' | 'MN' | 'ME' | 'MS' | 'MA' | 'MZ' | 'MM' | 'NA' | 'NR' | 'NP' | 'NL' | 'AN' | 'NC' | 'NZ' | 'NI' | 'NE' | 'NG' | 'NU' | 'KP' | 'MP' | 'NO' | 'OM' | 'PK' | 'PW' | 'PA' | 'PG' | 'PY' | 'PE' | 'PH' | 'PN' | 'PL' | 'PT' | 'PR' | 'QA' | 'CG' | 'RE' | 'RO' | 'RU' | 'RW' | 'BL' | 'SH' | 'KN' | 'LC' | 'MF' | 'PM' | 'VC' | 'WS' | 'SM' | 'ST' | 'SA' | 'SN' | 'RS' | 'SC' | 'SL' | 'SG' | 'SX' | 'SK' | 'SI' | 'SB' | 'SO' | 'ZA' | 'KR' | 'ES' | 'LK' | 'SD' | 'SR' | 'SJ' | 'SZ' | 'SE' | 'CH' | 'SY' | 'TW' | 'TJ' | 'TZ' | 'TH' | 'TG' | 'TK' | 'TO' | 'TT' | 'TN' | 'TR' | 'TM' | 'TC' | 'TV' | 'VI' | 'UG' | 'UA' | 'AE' | 'GB' | 'US' | 'UY' | 'UZ' | 'VU' | 'VA' | 'VE' | 'VN' | 'WF' | 'EH' | 'YE' | 'ZM' | 'ZW';
  /** The type of phone number. */
  PhoneNumberType: 'TOLL_FREE' | 'DID' | 'UIFN' | 'SHARED' | 'THIRD_PARTY_TF' | 'THIRD_PARTY_DID' | 'SHORT_CODE';
  /** The identifier of the Amazon Connect instance that phone numbers are claimed to. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. You must enter InstanceId or TargetArn. */
  InstanceId?: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The prefix of the phone number. If provided, it must contain + as part of the country code. */
  PhoneNumberPrefix?: string;
  /** The Amazon Resource Name (ARN) for Amazon Connect instances or traffic distribution groups that phone number inbound traffic is routed through. You must enter InstanceId or TargetArn. */
  TargetArn?: string;
}

export interface SearchContactEvaluationsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return contact evaluations. */
  SearchCriteria?: EvaluationSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: EvaluationSearchFilter;
}

export interface SearchContactFlowModulesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return flow modules. The name and description fields support "contains" queries with a minimum of 2 characters and a maximum of 25 characters. Any queries with charac */
  SearchCriteria?: ContactFlowModuleSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: ContactFlowModuleSearchFilter;
}

export interface SearchContactFlowsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return flows. The name and description fields support "contains" queries with a minimum of 2 characters and a maximum of 25 characters. Any queries with character len */
  SearchCriteria?: ContactFlowSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: ContactFlowSearchFilter;
}

export interface SearchContactsInput {
  /** The identifier of Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Time range that you want to search results. */
  TimeRange: SearchContactsTimeRange;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return contacts. */
  SearchCriteria?: SearchCriteria;
  /** Specifies a field to sort by and a sort order. */
  Sort?: Sort;
}

export interface SearchDataTablesInput {
  /** The unique identifier for the Amazon Connect instance to search within. */
  InstanceId: string;
  /** The maximum number of data tables to return in one page of results. */
  MaxResults?: number;
  /** Specify the pagination token from a previous request to retrieve the next page of results. */
  NextToken?: string;
  /** Search criteria including string conditions for matching table names, descriptions, or resource IDs. Supports STARTS_WITH, CONTAINS, and EXACT comparison types. */
  SearchCriteria?: DataTableSearchCriteria;
  /** Optional filters to apply to the search results, such as tag-based filtering for attribute-based access control. */
  SearchFilter?: DataTableSearchFilter;
}

export interface SearchEmailAddressesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return email addresses. */
  SearchCriteria?: EmailAddressSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: EmailAddressSearchFilter;
}

export interface SearchEvaluationFormsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return evaluation forms. */
  SearchCriteria?: EvaluationFormSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: EvaluationFormSearchFilter;
}

export interface SearchHoursOfOperationOverridesInput {
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return hours of operations overrides. */
  SearchCriteria?: HoursOfOperationOverrideSearchCriteria;
  SearchFilter?: HoursOfOperationSearchFilter;
}

export interface SearchHoursOfOperationsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return hours of operations. */
  SearchCriteria?: HoursOfOperationSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: HoursOfOperationSearchFilter;
}

export interface SearchNotificationsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. Valid range is 1-100. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response to retrieve the next page of results. */
  NextToken?: string;
  /** The search criteria to apply when searching for notifications. Supports filtering by notification ID and message content using comparison types such as STARTS_WITH, CONTAINS, and EXACT. */
  SearchCriteria?: NotificationSearchCriteria;
  /** Filters to apply to the search results, such as tag-based filters. */
  SearchFilter?: NotificationSearchFilter;
}

export interface SearchPredefinedAttributesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return predefined attributes. */
  SearchCriteria?: PredefinedAttributeSearchCriteria;
}

export interface SearchPromptsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return prompts. */
  SearchCriteria?: PromptSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: PromptSearchFilter;
}

export interface SearchQueuesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return queues. The name and description fields support "contains" queries with a minimum of 2 characters and a maximum of 25 characters. Any queries with character le */
  SearchCriteria?: QueueSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: QueueSearchFilter;
}

export interface SearchQuickConnectsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return quick connects. */
  SearchCriteria?: QuickConnectSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: QuickConnectSearchFilter;
}

export interface SearchResourceTagsInput {
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The list of resource types to be used to search tags from. If not provided or if any empty list is provided, this API will search from all supported resource types. Note that lowercase and - are requi */
  ResourceTypes?: string[];
  /** The search criteria to be used to return tags. */
  SearchCriteria?: ResourceTagsSearchCriteria;
}

export interface SearchRoutingProfilesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return routing profiles. The name and description fields support "contains" queries with a minimum of 2 characters and a maximum of 25 characters. Any queries with ch */
  SearchCriteria?: RoutingProfileSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: RoutingProfileSearchFilter;
}

export interface SearchSecurityProfilesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return security profiles. The name field support "contains" queries with a minimum of 2 characters and maximum of 25 characters. Any queries with character lengths ou */
  SearchCriteria?: SecurityProfileSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: SecurityProfilesSearchFilter;
}

export interface SearchTestCasesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return test cases. */
  SearchCriteria?: TestCaseSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: TestCaseSearchFilter;
}

export interface SearchUserHierarchyGroupsInput {
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria to be used to return UserHierarchyGroups. */
  SearchCriteria?: UserHierarchyGroupSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: UserHierarchyGroupSearchFilter;
}

export interface SearchUsersInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  SearchCriteria?: UserSearchCriteria;
  /** Filters to be applied to search results. */
  SearchFilter?: UserSearchFilter;
}

export interface SearchViewsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria, including field names and comparison types. */
  SearchCriteria?: ViewSearchCriteria;
  /** Filters to apply to the search, such as tag-based filters. */
  SearchFilter?: ViewSearchFilter;
}

export interface SearchVocabulariesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The language code of the vocabulary entries. For a list of languages and their corresponding language codes, see What is Amazon Transcribe? */
  LanguageCode?: 'ar-AE' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fr-CA' | 'fr-FR' | 'hi-IN' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'pt-BR' | 'pt-PT' | 'zh-CN' | 'en-NZ' | 'en-ZA' | 'ca-ES' | 'da-DK' | 'fi-FI' | 'id-ID' | 'ms-MY' | 'nl-NL' | 'no-NO' | 'pl-PL' | 'sv-SE' | 'tl-PH';
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The starting pattern of the name of the vocabulary. */
  NameStartsWith?: string;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The current state of the custom vocabulary. */
  State?: 'CREATION_IN_PROGRESS' | 'ACTIVE' | 'CREATION_FAILED' | 'DELETE_IN_PROGRESS';
}

export interface SearchWorkspaceAssociationsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria, including workspace ID, resource ID, or resource type. */
  SearchCriteria?: WorkspaceAssociationSearchCriteria;
  /** Filters to apply to the search, such as tag-based filters. */
  SearchFilter?: WorkspaceAssociationSearchFilter;
}

export interface SearchWorkspacesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The maximum number of results to return per page. */
  MaxResults?: number;
  /** The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results. */
  NextToken?: string;
  /** The search criteria, including field names and comparison types. */
  SearchCriteria?: WorkspaceSearchCriteria;
  /** Filters to apply to the search, such as tag-based filters. */
  SearchFilter?: WorkspaceSearchFilter;
}

export interface SendChatIntegrationEventInput {
  /** Chat system identifier, used in part to uniquely identify chat. This is associated with the Amazon Connect instance and flow to be used to start chats. For Server Migration Service, this is the phone  */
  DestinationId: string;
  /** Chat integration event payload */
  Event: ChatEvent;
  /** External identifier of chat customer participant, used in part to uniquely identify a chat. For SMS, this is the E164 phone number of the chat customer participant. */
  SourceId: string;
  /** Contact properties to apply when starting a new chat. If the integration event is handled with an existing chat, this is ignored. */
  NewSessionDetails?: NewSessionDetails;
  /** Classification of a channel. This is used in part to uniquely identify chat. Valid value: ["connect:sms", connect:"WhatsApp"] */
  Subtype?: string;
}

export interface SendOutboundEmailInput {
  /** The email address to send the email to. */
  DestinationEmailAddress: EmailAddressInfo;
  /** The email message body to be sent to the newly created email. */
  EmailMessage: OutboundEmailContent;
  /** The email address to be used for sending email. */
  FromEmailAddress: EmailAddressInfo;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Denotes the class of traffic. Only the CAMPAIGN traffic type is supported. */
  TrafficType: 'GENERAL' | 'CAMPAIGN';
  /** The additional recipients address of the email in CC. */
  AdditionalRecipients?: OutboundAdditionalRecipients;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** A Campaign object need for Campaign traffic type. */
  SourceCampaign?: SourceCampaign;
}

export interface StartAttachedFileUploadInput {
  /** The resource to which the attached file is (being) uploaded to. The supported resources are Cases and Email. This value must be a valid ARN. */
  AssociatedResourceArn: string;
  /** A case-sensitive name of the attached file being uploaded. */
  FileName: string;
  /** The size of the attached file in bytes. */
  FileSizeInBytes: number;
  /** The use case for the file. Only ATTACHMENTS are supported. */
  FileUseCaseType: 'EMAIL_MESSAGE' | 'ATTACHMENT';
  /** The unique identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** Represents the identity that created the file. */
  CreatedBy?: { ConnectUserArn?: string } | { AWSIdentityArn?: string };
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
  /** Optional override for the expiry of the pre-signed S3 URL in seconds. The default value is 300. */
  UrlExpiryInSeconds?: number;
}

export interface StartChatContactInput {
  /** The identifier of the flow for initiating the chat. To see the ContactFlowId in the Amazon Connect admin website, on the navigation menu go to Routing, Flows. Choose the flow. On the flow page, under  */
  ContactFlowId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Information identifying the participant. */
  ParticipantDetails: ParticipantDetails;
  /** A custom key-value pair using an attribute map. The attributes are standard Amazon Connect attributes. They can be accessed in flows just like any other contact attributes. There can be up to 32,768 U */
  Attributes?: Record<string, string>;
  /** The total duration of the newly started chat session. If not specified, the chat session duration defaults to 25 hour. The minimum configurable time is 60 minutes. The maximum configurable time is 10, */
  ChatDurationInMinutes?: number;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The customer's identification number. For example, the CustomerId may be a customer number from your CRM. */
  CustomerId?: string;
  /** A list of participant types to automatically disconnect when the end customer ends the chat session, allowing them to continue through disconnect flows such as surveys or feedback forms. */
  DisconnectOnCustomerExit?: 'AGENT'[];
  /** The initial message to be sent to the newly created chat. */
  InitialMessage?: ChatMessage;
  /** The configuration of the participant. */
  ParticipantConfiguration?: ParticipantConfiguration;
  /** Enable persistent chats. For more information about enabling persistent chat, and for example use cases and how to configure for them, see Enable persistent chat. */
  PersistentChat?: PersistentChat;
  /** The unique identifier for an Amazon Connect contact. This identifier is related to the chat starting. You cannot provide data for both RelatedContactId and PersistentChat. */
  RelatedContactId?: string;
  /** A set of system defined key-value pairs stored on individual contact segments using an attribute map. The attributes are standard Amazon Connect attributes. They can be accessed in flows. Attribute ke */
  SegmentAttributes?: Record<string, SegmentAttributeValue>;
  /** The supported chat message content types. Supported types are text/plain, text/markdown, application/json, application/vnd.amazonaws.connect.message.interactive, and application/vnd.amazonaws.connect. */
  SupportedMessagingContentTypes?: string[];
}

export interface StartContactEvaluationInput {
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The unique identifier for the evaluation form. */
  EvaluationFormId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Whether automated evaluations are enabled. */
  AutoEvaluationConfiguration?: AutoEvaluationConfiguration;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  Tags?: Record<string, string>;
}

export interface StartContactMediaProcessingInput {
  /** The identifier of the contact. */
  ContactId?: string;
  /** The desired behavior for failed message processing. */
  FailureMode?: 'DELIVER_UNPROCESSED_MESSAGE' | 'DO_NOT_DELIVER_UNPROCESSED_MESSAGE';
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId?: string;
  /** The Amazon Resource Name (ARN) of the Lambda processor. You can find the Amazon Resource Name of the lambda in the lambda console. */
  ProcessorArn?: string;
}

export interface StartContactRecordingInput {
  /** The identifier of the contact. */
  ContactId: string;
  /** The identifier of the contact. This is the identifier of the contact associated with the first interaction with the contact center. */
  InitialContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The person being recorded. */
  VoiceRecordingConfiguration: VoiceRecordingConfiguration;
}

export interface StartContactStreamingInput {
  /** The streaming configuration, such as the Amazon SNS streaming endpoint. */
  ChatStreamingConfiguration: ChatStreamingConfiguration;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken: string;
  /** The identifier of the contact. This is the identifier of the contact associated with the first interaction with the contact center. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface StartEmailContactInput {
  /** The email address associated with the Amazon Connect instance. */
  DestinationEmailAddress: string;
  /** The email message body to be sent to the newly created email. */
  EmailMessage: InboundEmailContent;
  /** The email address of the customer. */
  FromEmailAddress: EmailAddressInfo;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The additional recipients address of the email. */
  AdditionalRecipients?: InboundAdditionalRecipients;
  /** List of S3 presigned URLs of email attachments and their file name. */
  Attachments?: EmailAttachment[];
  /** A custom key-value pair using an attribute map. The attributes are standard Amazon Connect attributes, and can be accessed in flows just like any other contact attributes. There can be up to 32,768 UT */
  Attributes?: Record<string, string>;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The identifier of the flow for initiating the emails. To see the ContactFlowId in the Amazon Connect admin website, on the navigation menu go to Routing, Flows. Choose the flow. On the flow page, unde */
  ContactFlowId?: string;
  /** A description of the email contact. */
  Description?: string;
  /** The name of a email that is shown to an agent in the Contact Control Panel (CCP). */
  Name?: string;
  /** A formatted URL that is shown to an agent in the Contact Control Panel (CCP). Emails can have the following reference types at the time of creation: URL | NUMBER | STRING | DATE. EMAIL | EMAIL_MESSAGE */
  References?: Record<string, Reference>;
  /** The contactId that is related to this contact. Linking emails together by using RelatedContactID copies over contact attributes from the related email contact to the new email contact. All updates to  */
  RelatedContactId?: string;
  /** A set of system defined key-value pairs stored on individual contact segments using an attribute map. The attributes are standard Amazon Connect attributes. They can be accessed in flows. Attribute ke */
  SegmentAttributes?: Record<string, SegmentAttributeValue>;
}

export interface StartOutboundChatContactInput {
  /** The identifier of the flow for the call. To see the ContactFlowId in the Amazon Connect console user interface, on the navigation menu go to Routing, Contact Flows. Choose the flow. On the flow page,  */
  ContactFlowId: string;
  DestinationEndpoint: Endpoint;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A set of system defined key-value pairs stored on individual contact segments using an attribute map. The attributes are standard Amazon Connect attributes. They can be accessed in flows. Attribute ke */
  SegmentAttributes: Record<string, SegmentAttributeValue>;
  SourceEndpoint: Endpoint;
  /** A custom key-value pair using an attribute map. The attributes are standard Amazon Connect attributes, and can be accessed in flows just like any other contact attributes. */
  Attributes?: Record<string, string>;
  /** The total duration of the newly started chat session. If not specified, the chat session duration defaults to 25 hour. The minimum configurable time is 60 minutes. The maximum configurable time is 10, */
  ChatDurationInMinutes?: number;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  InitialSystemMessage?: ChatMessage;
  InitialTemplatedSystemMessage?: TemplatedMessageConfig;
  ParticipantDetails?: ParticipantDetails;
  /** The unique identifier for an Amazon Connect contact. This identifier is related to the contact starting. */
  RelatedContactId?: string;
  /** The supported chat message content types. Supported types are: text/plain text/markdown application/json, application/vnd.amazonaws.connect.message.interactive application/vnd.amazonaws.connect.messag */
  SupportedMessagingContentTypes?: string[];
}

export interface StartOutboundEmailContactInput {
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The email address of the customer. */
  DestinationEmailAddress: EmailAddressInfo;
  /** The email message body to be sent to the newly created email. */
  EmailMessage: OutboundEmailContent;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The additional recipients address of email in CC. */
  AdditionalRecipients?: OutboundAdditionalRecipients;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The email address associated with the Amazon Connect instance. */
  FromEmailAddress?: EmailAddressInfo;
}

export interface StartOutboundVoiceContactInput {
  /** The identifier of the flow for the outbound call. To see the ContactFlowId in the Amazon Connect admin website, on the navigation menu go to Routing, Contact Flows. Choose the flow. On the flow page,  */
  ContactFlowId: string;
  /** The phone number of the customer, in E.164 format. */
  DestinationPhoneNumber: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Configuration of the answering machine detection for this outbound call. */
  AnswerMachineDetectionConfig?: AnswerMachineDetectionConfig;
  /** A custom key-value pair using an attribute map. The attributes are standard Amazon Connect attributes, and can be accessed in flows just like any other contact attributes. There can be up to 32,768 UT */
  Attributes?: Record<string, string>;
  /** The campaign identifier of the outbound communication. */
  CampaignId?: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** A description of the voice contact that appears in the agent's snapshot in the CCP logs. For more information about CCP logs, see Download and review CCP logs in the Amazon Connect Administrator Guide */
  Description?: string;
  /** The name of a voice contact that is shown to an agent in the Contact Control Panel (CCP). */
  Name?: string;
  /** Information about the outbound strategy. */
  OutboundStrategy?: OutboundStrategy;
  /** The queue for the call. If you specify a queue, the phone displayed for caller ID is the phone number specified in the queue. If you do not specify a queue, the queue defined in the flow is used. If y */
  QueueId?: string;
  /** A formatted URL that is shown to an agent in the Contact Control Panel (CCP). Contacts can have the following reference types at the time of creation: URL | NUMBER | STRING | DATE | EMAIL. ATTACHMENT  */
  References?: Record<string, Reference>;
  /** The contactId that is related to this contact. Linking voice, task, or chat by using RelatedContactID copies over contact attributes from the related contact to the new contact. All updates to user-de */
  RelatedContactId?: string;
  /** The maximum time the outbound call will wait for the destination to answer the call, in seconds */
  RingTimeoutInSeconds?: number;
  /** The phone number associated with the Amazon Connect instance, in E.164 format. If you do not specify a source phone number, you must specify a queue. */
  SourcePhoneNumber?: string;
  /** Denotes the class of traffic. Calls with different traffic types are handled differently by Amazon Connect. The default value is GENERAL. Use CAMPAIGN if EnableAnswerMachineDetection is set to true. F */
  TrafficType?: 'GENERAL' | 'CAMPAIGN';
}

export interface StartScreenSharingInput {
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface StartTaskContactInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of a task that is shown to an agent in the Contact Control Panel (CCP). */
  Name: string;
  /** List of S3 presigned URLs of task attachments and their file name. You can have a maximum of 5 attachments per task. */
  Attachments?: TaskAttachment[];
  /** A custom key-value pair using an attribute map. The attributes are standard Amazon Connect attributes, and can be accessed in flows just like any other contact attributes. There can be up to 32,768 UT */
  Attributes?: Record<string, string>;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The identifier of the flow for initiating the tasks. To see the ContactFlowId in the Amazon Connect admin website, on the navigation menu go to Routing, Flows. Choose the flow. On the flow page, under */
  ContactFlowId?: string;
  /** A description of the task that is shown to an agent in the Contact Control Panel (CCP). */
  Description?: string;
  /** The identifier of the previous chat, voice, or task contact. Any updates to user-defined attributes to task contacts linked using the same PreviousContactID will affect every contact in the chain. The */
  PreviousContactId?: string;
  /** The identifier for the quick connect. Tasks that are created by using QuickConnectId will use the flow that is defined on agent or queue quick connect. For more information about quick connects, see C */
  QuickConnectId?: string;
  /** A formatted URL that is shown to an agent in the Contact Control Panel (CCP). Tasks can have the following reference types at the time of creation: URL | NUMBER | STRING | DATE | EMAIL. ATTACHMENT is  */
  References?: Record<string, Reference>;
  /** The contactId that is related to this contact. Linking tasks together by using RelatedContactID copies over contact attributes from the related task contact to the new task contact. All updates to use */
  RelatedContactId?: string;
  /** The timestamp, in Unix Epoch seconds format, at which to start running the inbound flow. The scheduled time cannot be in the past. It must be within up to 6 days in future. */
  ScheduledTime?: string;
  /** A set of system defined key-value pairs stored on individual contact segments (unique contact ID) using an attribute map. The attributes are standard Amazon Connect attributes. They can be accessed in */
  SegmentAttributes?: Record<string, SegmentAttributeValue>;
  /** A unique identifier for the task template. For more information about task templates, see Create task templates in the Amazon Connect Administrator Guide. */
  TaskTemplateId?: string;
}

export interface StartTestCaseExecutionInput {
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The identifier of the test case to execute. */
  TestCaseId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface StartWebRTCContactInput {
  /** The identifier of the flow for the call. To see the ContactFlowId in the Amazon Connect admin website, on the navigation menu go to Routing, Flows. Choose the flow. On the flow page, under the name of */
  ContactFlowId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  ParticipantDetails: ParticipantDetails;
  /** Information about the video sharing capabilities of the participants (customer, agent). */
  AllowedCapabilities?: AllowedCapabilities;
  /** A custom key-value pair using an attribute map. The attributes are standard Amazon Connect attributes, and can be accessed in flows just like any other contact attributes. There can be up to 32,768 UT */
  Attributes?: Record<string, string>;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** A description of the task that is shown to an agent in the Contact Control Panel (CCP). */
  Description?: string;
  /** A formatted URL that is shown to an agent in the Contact Control Panel (CCP). Tasks can have the following reference types at the time of creation: URL | NUMBER | STRING | DATE | EMAIL. ATTACHMENT is  */
  References?: Record<string, Reference>;
  /** The unique identifier for an Amazon Connect contact. This identifier is related to the contact starting. */
  RelatedContactId?: string;
}

export interface StopContactInput {
  /** The ID of the contact. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The reason a contact can be disconnected. Only Amazon Connect outbound campaigns can provide this field. For a list and description of all the possible disconnect reasons by channel (including outboun */
  DisconnectReason?: DisconnectReason;
}

export interface StopContactMediaProcessingInput {
  /** The identifier of the contact. */
  ContactId?: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId?: string;
}

export interface StopContactRecordingInput {
  /** The identifier of the contact. */
  ContactId: string;
  /** The identifier of the contact. This is the identifier of the contact associated with the first interaction with the contact center. */
  InitialContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The type of recording being operated on. */
  ContactRecordingType?: 'AGENT' | 'IVR' | 'SCREEN';
}

export interface StopContactStreamingInput {
  /** The identifier of the contact. This is the identifier of the contact that is associated with the first interaction with the contact center. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the streaming configuration enabled. */
  StreamingId: string;
}

export interface StopTestCaseExecutionInput {
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The identifier of the test case execution to stop. */
  TestCaseExecutionId: string;
  /** The identifier of the test case. */
  TestCaseId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface SubmitContactEvaluationInput {
  /** A unique identifier for the contact evaluation. */
  EvaluationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A map of question identifiers to answer value. */
  Answers?: Record<string, EvaluationAnswerInput>;
  /** A map of question identifiers to note value. */
  Notes?: Record<string, EvaluationNote>;
  /** The ID of the user who submitted the contact evaluation. */
  SubmittedBy?: { ConnectUserArn?: string };
}

export interface SuspendContactRecordingInput {
  /** The identifier of the contact. */
  ContactId: string;
  /** The identifier of the contact. This is the identifier of the contact associated with the first interaction with the contact center. */
  InitialContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The type of recording being operated on. */
  ContactRecordingType?: 'AGENT' | 'IVR' | 'SCREEN';
}

export interface TagContactInput {
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The tags to be assigned to the contact resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. Authorization is not supported by this tag. */
  Tags: Record<string, string>;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource. */
  resourceArn: string;
  /** The tags used to organize, track, or control access for this resource. For example, { "Tags": {"key1":"value1", "key2":"value2"} }. */
  tags: Record<string, string>;
}

export interface TransferContactInput {
  /** The identifier of the flow. */
  ContactFlowId: string;
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The identifier for the queue. */
  QueueId?: string;
  /** The identifier for the user. This can be the ID or the ARN of the user. */
  UserId?: string;
}

export interface UntagContactInput {
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A list of tag keys. Existing tags on the contact whose keys are members of this list will be removed. */
  TagKeys: string[];
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource. */
  resourceArn: string;
  /** The tag keys. */
  tagKeys: string[];
}

export interface UpdateAgentStatusInput {
  /** The identifier of the agent status. */
  AgentStatusId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The description of the agent status. */
  Description?: string;
  /** The display order of the agent status. */
  DisplayOrder?: number;
  /** The name of the agent status. */
  Name?: string;
  /** A number indicating the reset order of the agent status. */
  ResetOrderNumber?: boolean;
  /** The state of the agent status. */
  State?: 'ENABLED' | 'DISABLED';
}

export interface UpdateAuthenticationProfileInput {
  /** A unique identifier for the authentication profile. */
  AuthenticationProfileId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A list of IP address range strings that are allowed to access the instance. For more information on how to configure IP addresses, seeConfigure session timeouts in the Amazon Connect Administrator Gui */
  AllowedIps?: string[];
  /** A list of IP address range strings that are blocked from accessing the instance. For more information on how to configure IP addresses, For more information on how to configure IP addresses, see Confi */
  BlockedIps?: string[];
  /** The description for the authentication profile. */
  Description?: string;
  /** The name for the authentication profile. */
  Name?: string;
  /** The short lived session duration configuration for users logged in to Amazon Connect, in minutes. This value determines the maximum possible time before an agent is authenticated. For more information */
  PeriodicSessionDuration?: number;
  /** The period, in minutes, before an agent is automatically signed out of the contact center when they go inactive. */
  SessionInactivityDuration?: number;
  /** Determines if automatic logout on user inactivity is enabled. */
  SessionInactivityHandlingEnabled?: boolean;
}

export interface UpdateContactInput {
  /** The identifier of the contact. This is the identifier of the contact associated with the first interaction with your contact center. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The endpoint of the customer for which the contact was initiated. For external audio contacts, this is usually the end customer's phone number. This value can only be updated for external audio contac */
  CustomerEndpoint?: Endpoint;
  /** The description of the contact. */
  Description?: string;
  /** The name of the contact. */
  Name?: string;
  /** Information about the queue associated with a contact. This parameter can only be updated for external audio contacts. It is used when you integrate third-party systems with Contact Lens for analytics */
  QueueInfo?: QueueInfoInput;
  /** Well-formed data on contact, shown to agents on Contact Control Panel (CCP). */
  References?: Record<string, Reference>;
  /** A set of system defined key-value pairs stored on individual contact segments (unique contact ID) using an attribute map. The attributes are standard Amazon Connect attributes. They can be accessed in */
  SegmentAttributes?: Record<string, SegmentAttributeValue>;
  /** External system endpoint for the contact was initiated. For external audio contacts, this is the phone number of the external system such as the contact center. This value can only be updated for exte */
  SystemEndpoint?: Endpoint;
  /** Information about the agent associated with a contact. This parameter can only be updated for external audio contacts. It is used when you integrate third-party systems with Contact Lens for analytics */
  UserInfo?: UserInfo;
}

export interface UpdateContactAttributesInput {
  /** The Amazon Connect attributes. These attributes can be accessed in flows just like any other contact attributes. You can have up to 32,768 UTF-8 bytes across all attributes for a contact. Attribute ke */
  Attributes: Record<string, string>;
  /** The identifier of the contact. This is the identifier of the contact associated with the first interaction with the contact center. */
  InitialContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface UpdateContactEvaluationInput {
  /** A unique identifier for the contact evaluation. */
  EvaluationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A map of question identifiers to answer value. */
  Answers?: Record<string, EvaluationAnswerInput>;
  /** A map of question identifiers to note value. */
  Notes?: Record<string, EvaluationNote>;
  /** The ID of the user who updated the contact evaluation. */
  UpdatedBy?: { ConnectUserArn?: string };
}

export interface UpdateContactFlowContentInput {
  /** The identifier of the flow. */
  ContactFlowId: string;
  /** The JSON string that represents the content of the flow. For an example, see Example flow in Amazon Connect Flow language. Length Constraints: Minimum length of 1. Maximum length of 256000. */
  Content: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
}

export interface UpdateContactFlowMetadataInput {
  /** The identifier of the flow. */
  ContactFlowId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The state of flow. */
  ContactFlowState?: 'ACTIVE' | 'ARCHIVED';
  /** The description of the flow. */
  Description?: string;
  /** The name of the flow. */
  Name?: string;
}

export interface UpdateContactFlowModuleAliasInput {
  /** The identifier of the alias. */
  AliasId: string;
  /** The identifier of the flow module. */
  ContactFlowModuleId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The version of the flow module. */
  ContactFlowModuleVersion?: number;
  /** The description of the alias. */
  Description?: string;
  /** The name of the alias. */
  Name?: string;
}

export interface UpdateContactFlowModuleContentInput {
  /** The identifier of the flow module. */
  ContactFlowModuleId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The JSON string that represents the content of the flow. For an example, see Example flow in Amazon Connect Flow language. */
  Content?: string;
  /** Serialized JSON string of the flow module Settings schema. */
  Settings?: string;
}

export interface UpdateContactFlowModuleMetadataInput {
  /** The identifier of the flow module. */
  ContactFlowModuleId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The description of the flow module. */
  Description?: string;
  /** The name of the flow module. */
  Name?: string;
  /** The state of flow module. */
  State?: 'ACTIVE' | 'ARCHIVED';
}

export interface UpdateContactFlowNameInput {
  /** The identifier of the flow. */
  ContactFlowId: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The description of the flow. */
  Description?: string;
  /** The name of the flow. */
  Name?: string;
}

export interface UpdateContactRoutingDataInput {
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Priority of the contact in the queue. The default priority for new contacts is 5. You can raise the priority of a contact compared to other contacts in the queue by assigning them a higher priority, s */
  QueuePriority?: number;
  /** The number of seconds to add or subtract from the contact's routing age. Contacts are routed to agents on a first-come, first-serve basis. This means that changing their amount of time in queue compar */
  QueueTimeAdjustmentSeconds?: number;
  /** Updates the routing criteria on the contact. These properties can be used to change how a contact is routed within the queue. */
  RoutingCriteria?: RoutingCriteriaInput;
}

export interface UpdateContactScheduleInput {
  /** The identifier of the contact. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The timestamp, in Unix Epoch seconds format, at which to start running the inbound flow. The scheduled time cannot be in the past. It must be within up to 6 days in future. */
  ScheduledTime: string;
}

export interface UpdateDataTableAttributeInput {
  /** The current name of the attribute to update. Used as an identifier since attribute names can be changed. */
  AttributeName: string;
  /** The unique identifier for the data table. Must also accept the table ARN with or without a version alias. */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
  /** The new name for the attribute. Must conform to Connect human readable string specification and be unique within the data table. */
  Name: string;
  /** The updated value type for the attribute. When changing value types, existing values are not deleted but may return default values if incompatible. */
  ValueType: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'TEXT_LIST' | 'NUMBER_LIST';
  /** The updated description for the attribute. */
  Description?: string;
  /** Whether the attribute should be treated as a primary key. Converting to primary attribute requires existing values to maintain uniqueness. */
  Primary?: boolean;
  /** The updated validation rules for the attribute. Changes do not affect existing values until they are modified. */
  Validation?: Validation;
}

export interface UpdateDataTableMetadataInput {
  /** The unique identifier for the data table. Must also accept the table ARN with or without a version alias. If the version is provided as part of the identifier or ARN, the version must be $LATEST. Prov */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
  /** The updated name for the data table. Must conform to Connect human readable string specification and have 1-127 characters. Must be unique for the instance using case-insensitive comparison. */
  Name: string;
  /** The updated IANA timezone identifier to use when resolving time based dynamic values. */
  TimeZone: string;
  /** The updated value lock level for the data table. One of DATA_TABLE, PRIMARY_VALUE, ATTRIBUTE, VALUE, and NONE. */
  ValueLockLevel: 'NONE' | 'DATA_TABLE' | 'PRIMARY_VALUE' | 'ATTRIBUTE' | 'VALUE';
  /** The updated description for the data table. Must conform to Connect human readable string specification and have 0-250 characters. */
  Description?: string;
}

export interface UpdateDataTablePrimaryValuesInput {
  /** The unique identifier for the data table. Must also accept the table ARN with or without a version alias. If the version is provided as part of the identifier or ARN, the version must be one of the tw */
  DataTableId: string;
  /** The unique identifier for the Amazon Connect instance. */
  InstanceId: string;
  /** The lock version information required for optimistic locking to prevent concurrent modifications. */
  LockVersion: DataTableLockVersion;
  /** The new primary values for the record. Required and must include values for all primary attributes. The combination must be unique within the table. */
  NewPrimaryValues: PrimaryValue[];
  /** The current primary values for the record. Required and must include values for all primary attributes. Fails if the table has primary attributes and some primary values are omitted. */
  PrimaryValues: PrimaryValue[];
}

export interface UpdateEmailAddressMetadataInput {
  /** The identifier of the email address. */
  EmailAddressId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The description of the email address. */
  Description?: string;
  /** The display name of email address. */
  DisplayName?: string;
}

export interface UpdateEvaluationFormInput {
  /** The unique identifier for the evaluation form. */
  EvaluationFormId: string;
  /** A version of the evaluation form to update. */
  EvaluationFormVersion: number;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Items that are part of the evaluation form. The total number of sections and questions must not exceed 100 each. Questions must be contained in a section. */
  Items: { Section?: any } | { Question?: any }[];
  /** A title of the evaluation form. */
  Title: string;
  /** A boolean flag indicating whether to update evaluation form to draft state. */
  AsDraft?: boolean;
  /** Whether automated evaluations are enabled. */
  AutoEvaluationConfiguration?: EvaluationFormAutoEvaluationConfiguration;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** A flag indicating whether the operation must create a new version. */
  CreateNewVersion?: boolean;
  /** The description of the evaluation form. */
  Description?: string;
  /** Configuration for language settings of the evaluation form. */
  LanguageConfiguration?: EvaluationFormLanguageConfiguration;
  /** Configuration for evaluation review settings of the evaluation form. */
  ReviewConfiguration?: EvaluationReviewConfiguration;
  /** A scoring strategy of the evaluation form. */
  ScoringStrategy?: EvaluationFormScoringStrategy;
  /** Configuration that specifies the target for the evaluation form. */
  TargetConfiguration?: EvaluationFormTargetConfiguration;
}

export interface UpdateHoursOfOperationInput {
  /** The identifier of the hours of operation. */
  HoursOfOperationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Configuration information of the hours of operation. */
  Config?: HoursOfOperationConfig[];
  /** The description of the hours of operation. */
  Description?: string;
  /** The name of the hours of operation. */
  Name?: string;
  /** The time zone of the hours of operation. */
  TimeZone?: string;
}

export interface UpdateHoursOfOperationOverrideInput {
  /** The identifier for the hours of operation. */
  HoursOfOperationId: string;
  /** The identifier for the hours of operation override. */
  HoursOfOperationOverrideId: string;
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** Configuration information for the hours of operation override: day, start time, and end time. */
  Config?: HoursOfOperationOverrideConfig[];
  /** The description of the hours of operation override. */
  Description?: string;
  /** The date from when the hours of operation override would be effective. */
  EffectiveFrom?: string;
  /** The date until the hours of operation override is effective. */
  EffectiveTill?: string;
  /** The name of the hours of operation override. */
  Name?: string;
  /** Whether the override will be defined as a standard or as a recurring event. For more information about how override types are applied, see Build your list of overrides in the Administrator Guide. */
  OverrideType?: 'STANDARD' | 'OPEN' | 'CLOSED';
  /** Configuration for a recurring event. */
  RecurrenceConfig?: RecurrenceConfig;
}

export interface UpdateInstanceAttributeInput {
  /** The type of attribute. Only allowlisted customers can consume USE_CUSTOM_TTS_VOICES. To access this feature, contact Amazon Web Services Support for allowlisting. If you set the attribute type as MESS */
  AttributeType: 'INBOUND_CALLS' | 'OUTBOUND_CALLS' | 'CONTACTFLOW_LOGS' | 'CONTACT_LENS' | 'AUTO_RESOLVE_BEST_VOICES' | 'USE_CUSTOM_TTS_VOICES' | 'EARLY_MEDIA' | 'MULTI_PARTY_CONFERENCE' | 'HIGH_VOLUME_OUTBOUND' | 'ENHANCED_CONTACT_MONITORING' | 'ENHANCED_CHAT_MONITORING' | 'MULTI_PARTY_CHAT_CONFERENCE' | 'MESSAGE_STREAMING';
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The value for the attribute. Maximum character limit is 100. */
  Value: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface UpdateInstanceStorageConfigInput {
  /** The existing association identifier that uniquely identifies the resource type and storage config for the given instance ID. */
  AssociationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A valid resource type. */
  ResourceType: 'CHAT_TRANSCRIPTS' | 'CALL_RECORDINGS' | 'SCHEDULED_REPORTS' | 'MEDIA_STREAMS' | 'CONTACT_TRACE_RECORDS' | 'AGENT_EVENTS' | 'REAL_TIME_CONTACT_ANALYSIS_SEGMENTS' | 'ATTACHMENTS' | 'CONTACT_EVALUATIONS' | 'SCREEN_RECORDINGS' | 'REAL_TIME_CONTACT_ANALYSIS_CHAT_SEGMENTS' | 'REAL_TIME_CONTACT_ANALYSIS_VOICE_SEGMENTS' | 'EMAIL_MESSAGES';
  StorageConfig: InstanceStorageConfig;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
}

export interface UpdateNotificationContentInput {
  /** The updated localized content of the notification. A map of locale codes and values. Maximum 500 characters per locale. */
  Content: Record<string, string>;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The unique identifier for the notification to update. */
  NotificationId: string;
}

export interface UpdateParticipantAuthenticationInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The state query parameter that was provided by Cognito in the redirectUri. This will also match the state parameter provided in the AuthenticationUrl from the GetAuthenticationUrl response. */
  State: string;
  /** The code query parameter provided by Cognito in the redirectUri. */
  Code?: string;
  /** The error query parameter provided by Cognito in the redirectUri. */
  Error?: string;
  /** The error_description parameter provided by Cognito in the redirectUri. */
  ErrorDescription?: string;
}

export interface UpdateParticipantRoleConfigInput {
  /** The Amazon Connect channel you want to configure. */
  ChannelConfiguration: { Chat?: ChatParticipantRoleConfig };
  /** The identifier of the contact in this instance of Amazon Connect. */
  ContactId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface UpdatePhoneNumberInput {
  /** A unique identifier for the phone number. */
  PhoneNumberId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The identifier of the Amazon Connect instance that phone numbers are claimed to. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. You must enter InstanceId or TargetArn. */
  InstanceId?: string;
  /** The Amazon Resource Name (ARN) for Amazon Connect instances or traffic distribution groups that phone number inbound traffic is routed through. You must enter InstanceId or TargetArn. */
  TargetArn?: string;
}

export interface UpdatePhoneNumberMetadataInput {
  /** The Amazon Resource Name (ARN) or resource ID of the phone number. */
  PhoneNumberId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If not provided, the Amazon Web Services SDK populates this field. For more information about idempotency */
  ClientToken?: string;
  /** The description of the phone number. */
  PhoneNumberDescription?: string;
}

export interface UpdatePredefinedAttributeInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the predefined attribute. */
  Name: string;
  /** Custom metadata that is associated to predefined attributes to control behavior in upstream services, such as controlling how a predefined attribute should be displayed in the Amazon Connect admin web */
  AttributeConfiguration?: InputPredefinedAttributeConfiguration;
  /** Values that enable you to categorize your predefined attributes. You can use them in custom UI elements across the Amazon Connect admin website. */
  Purposes?: string[];
  /** The values of the predefined attribute. */
  Values?: { StringList?: string[] };
}

export interface UpdatePromptInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique identifier for the prompt. */
  PromptId: string;
  /** A description of the prompt. */
  Description?: string;
  /** The name of the prompt. */
  Name?: string;
  /** The URI for the S3 bucket where the prompt is stored. You can provide S3 pre-signed URLs returned by the GetPromptFile API instead of providing S3 URIs. */
  S3Uri?: string;
}

export interface UpdateQueueHoursOfOperationInput {
  /** The identifier for the hours of operation. */
  HoursOfOperationId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the queue. */
  QueueId: string;
}

export interface UpdateQueueMaxContactsInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the queue. */
  QueueId: string;
  /** The maximum number of contacts that can be in the queue before it is considered full. */
  MaxContacts?: number;
}

export interface UpdateQueueNameInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the queue. */
  QueueId: string;
  /** The description of the queue. */
  Description?: string;
  /** The name of the queue. */
  Name?: string;
}

export interface UpdateQueueOutboundCallerConfigInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The outbound caller ID name, number, and outbound whisper flow. */
  OutboundCallerConfig: OutboundCallerConfig;
  /** The identifier for the queue. */
  QueueId: string;
}

export interface UpdateQueueOutboundEmailConfigInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The outbound email address ID for a specified queue. */
  OutboundEmailConfig: OutboundEmailConfig;
  /** The identifier for the queue. */
  QueueId: string;
}

export interface UpdateQueueStatusInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the queue. */
  QueueId: string;
  /** The status of the queue. */
  Status: 'ENABLED' | 'DISABLED';
}

export interface UpdateQuickConnectConfigInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Information about the configuration settings for the quick connect. */
  QuickConnectConfig: QuickConnectConfig;
  /** The identifier for the quick connect. */
  QuickConnectId: string;
}

export interface UpdateQuickConnectNameInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the quick connect. */
  QuickConnectId: string;
  /** The description of the quick connect. */
  Description?: string;
  /** The name of the quick connect. */
  Name?: string;
}

export interface UpdateRoutingProfileAgentAvailabilityTimerInput {
  /** Whether agents with this routing profile will have their routing order calculated based on time since their last inbound contact or longest idle time. */
  AgentAvailabilityTimer: 'TIME_SINCE_LAST_ACTIVITY' | 'TIME_SINCE_LAST_INBOUND';
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the routing profile. */
  RoutingProfileId: string;
}

export interface UpdateRoutingProfileConcurrencyInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The channels that agents can handle in the Contact Control Panel (CCP). */
  MediaConcurrencies: MediaConcurrency[];
  /** The identifier of the routing profile. */
  RoutingProfileId: string;
}

export interface UpdateRoutingProfileDefaultOutboundQueueInput {
  /** The identifier for the default outbound queue. */
  DefaultOutboundQueueId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the routing profile. */
  RoutingProfileId: string;
}

export interface UpdateRoutingProfileNameInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the routing profile. */
  RoutingProfileId: string;
  /** The description of the routing profile. Must not be more than 250 characters. */
  Description?: string;
  /** The name of the routing profile. Must not be more than 127 characters. */
  Name?: string;
}

export interface UpdateRoutingProfileQueuesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The queues to be updated for this routing profile. Queues must first be associated to the routing profile. You can do this using AssociateRoutingProfileQueues. */
  QueueConfigs: RoutingProfileQueueConfig[];
  /** The identifier of the routing profile. */
  RoutingProfileId: string;
}

export interface UpdateRuleInput {
  /** A list of actions to be run when the rule is triggered. */
  Actions: RuleAction[];
  /** The conditions of the rule. */
  Function: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the rule. You can change the name only if TriggerEventSource is one of the following values: OnZendeskTicketCreate | OnZendeskTicketStatusUpdate | OnSalesforceCaseCreate */
  Name: string;
  /** The publish status of the rule. */
  PublishStatus: 'DRAFT' | 'PUBLISHED';
  /** A unique identifier for the rule. */
  RuleId: string;
}

export interface UpdateSecurityProfileInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier for the security profle. */
  SecurityProfileId: string;
  /** The identifier of the hierarchy group that a security profile uses to restrict access to resources in Amazon Connect. */
  AllowedAccessControlHierarchyGroupId?: string;
  /** The list of tags that a security profile uses to restrict access to resources in Amazon Connect. */
  AllowedAccessControlTags?: Record<string, string>;
  /** A list of Flow Modules an AI Agent can invoke as a tool */
  AllowedFlowModules?: FlowModule[];
  /** A list of the third-party application's metadata. */
  Applications?: Application[];
  /** The description of the security profile. */
  Description?: string;
  /** The granular access control configuration for the security profile, including data table permissions. */
  GranularAccessControlConfiguration?: GranularAccessControlConfiguration;
  /** The list of resources that a security profile applies hierarchy restrictions to in Amazon Connect. Following are acceptable ResourceNames: User. */
  HierarchyRestrictedResources?: string[];
  /** The permissions granted to a security profile. For a list of valid permissions, see List of security profile permissions. */
  Permissions?: string[];
  /** The list of resources that a security profile applies tag restrictions to in Amazon Connect. */
  TagRestrictedResources?: string[];
}

export interface UpdateTaskTemplateInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** A unique identifier for the task template. */
  TaskTemplateId: string;
  /** Constraints that are applicable to the fields listed. */
  Constraints?: TaskTemplateConstraints;
  /** The identifier of the flow that runs by default when a task is created by referencing this template. */
  ContactFlowId?: string;
  /** The default values for fields when a task is created by referencing this template. */
  Defaults?: TaskTemplateDefaults;
  /** The description of the task template. */
  Description?: string;
  /** Fields that are part of the template. */
  Fields?: TaskTemplateField[];
  /** The name of the task template. */
  Name?: string;
  /** The ContactFlowId for the flow that will be run if this template is used to create a self-assigned task. */
  SelfAssignFlowId?: string;
  /** Marks a template as ACTIVE or INACTIVE for a task to refer to it. Tasks can only be created from ACTIVE templates. If a template is marked as INACTIVE, then a task that refers to this template cannot  */
  Status?: 'ACTIVE' | 'INACTIVE';
}

export interface UpdateTestCaseInput {
  /** The identifier of the Amazon Connect instance. */
  InstanceId: string;
  /** The identifier of the test case to update. */
  TestCaseId: string;
  /** The JSON string that represents the content of the test. */
  Content?: string;
  /** The description of the test case. */
  Description?: string;
  /** Defines the starting point for your test. */
  EntryPoint?: TestCaseEntryPoint;
  /** Defines the test attributes for precise data representation. */
  InitializationData?: string;
  /** The region in which the resource was last modified */
  LastModifiedRegion?: string;
  /** The time at which the resource was last modified. */
  LastModifiedTime?: string;
  /** The name of the test case. */
  Name?: string;
  /** Indicates the test status as either SAVED or PUBLISHED. The PUBLISHED status will initiate validation on the content. The SAVED status does not initiate validation of the content. */
  Status?: 'PUBLISHED' | 'SAVED';
}

export interface UpdateTrafficDistributionInput {
  /** The identifier of the traffic distribution group. This can be the ID or the ARN if the API is being called in the Region where the traffic distribution group was created. The ARN must be provided if t */
  Id: string;
  /** The distribution of agents between the instance and its replica(s). */
  AgentConfig?: AgentConfig;
  /** The distribution that determines which Amazon Web Services Regions should be used to sign in agents in to both the instance and its replica(s). */
  SignInConfig?: SignInConfig;
  /** The distribution of traffic between the instance and its replica(s). */
  TelephonyConfig?: TelephonyConfig;
}

export interface UpdateUserConfigInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the user account. */
  UserId: string;
  /** The list of after contact work (ACW) timeout configuration settings for each channel. ACW timeout specifies how many seconds agents have for after contact work, such as entering notes about the contac */
  AfterContactWorkConfigs?: AfterContactWorkConfigPerChannel[];
  /** The list of auto-accept configuration settings for each channel. When auto-accept is enabled for a channel, available agents are automatically connected to contacts from that channel without needing t */
  AutoAcceptConfigs?: AutoAcceptConfig[];
  /** The list of persistent connection configuration settings for each channel. */
  PersistentConnectionConfigs?: PersistentConnectionConfig[];
  /** The list of phone number configuration settings for each channel. */
  PhoneNumberConfigs?: PhoneNumberConfig[];
  /** The list of voice enhancement configuration settings for each channel. */
  VoiceEnhancementConfigs?: VoiceEnhancementConfig[];
}

export interface UpdateUserHierarchyInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the user account. */
  UserId: string;
  /** The identifier of the hierarchy group. */
  HierarchyGroupId?: string;
}

export interface UpdateUserHierarchyGroupNameInput {
  /** The identifier of the hierarchy group. */
  HierarchyGroupId: string;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The name of the hierarchy group. Must not be more than 100 characters. */
  Name: string;
}

export interface UpdateUserHierarchyStructureInput {
  /** The hierarchy levels to update. */
  HierarchyStructure: HierarchyStructureUpdate;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
}

export interface UpdateUserIdentityInfoInput {
  /** The identity information for the user. */
  IdentityInfo: UserIdentityInfo;
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the user account. */
  UserId: string;
}

export interface UpdateUserNotificationStatusInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The unique identifier for the notification. */
  NotificationId: string;
  /** The new status for the notification. Valid values are READ, UNREAD, and HIDDEN. */
  Status: 'READ' | 'UNREAD' | 'HIDDEN';
  /** The identifier of the user whose notification status is being updated. */
  UserId: string;
  /** The AWS Region where the notification status was last modified. Used for cross-region replication. */
  LastModifiedRegion?: string;
  /** The timestamp when the notification status was last modified. Used for cross-region replication and optimistic locking. */
  LastModifiedTime?: string;
}

export interface UpdateUserPhoneConfigInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** Information about phone configuration settings for the user. */
  PhoneConfig: UserPhoneConfig;
  /** The identifier of the user account. */
  UserId: string;
}

export interface UpdateUserProficienciesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the user account. */
  UserId: string;
  /** The proficiencies to be updated for the user. Proficiencies must first be associated to the user. You can do this using AssociateUserProficiencies API. */
  UserProficiencies: UserProficiency[];
}

export interface UpdateUserRoutingProfileInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the routing profile for the user. */
  RoutingProfileId: string;
  /** The identifier of the user account. */
  UserId: string;
}

export interface UpdateUserSecurityProfilesInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifiers of the security profiles for the user. */
  SecurityProfileIds: string[];
  /** The identifier of the user account. */
  UserId: string;
}

export interface UpdateViewContentInput {
  /** View content containing all content necessary to render a view except for runtime input data and the runtime input schema, which is auto-generated by this operation. The total uncompressed content has */
  Content: ViewInputContent;
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** Indicates the view status as either SAVED or PUBLISHED. The PUBLISHED status will initiate validation on the content. */
  Status: 'PUBLISHED' | 'SAVED';
  /** The identifier of the view. Both ViewArn and ViewId can be used. */
  ViewId: string;
}

export interface UpdateViewMetadataInput {
  /** The identifier of the Amazon Connect instance. You can find the instanceId in the ARN of the instance. */
  InstanceId: string;
  /** The identifier of the view. Both ViewArn and ViewId can be used. */
  ViewId: string;
  /** The description of the view. */
  Description?: string;
  /** The name of the view. */
  Name?: string;
}

export interface UpdateWorkspaceMetadataInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the workspace. */
  WorkspaceId: string;
  /** The description of the workspace. */
  Description?: string;
  /** The name of the workspace. */
  Name?: string;
  /** The title displayed for the workspace. */
  Title?: string;
}

export interface UpdateWorkspacePageInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The current page identifier. */
  Page: string;
  /** The identifier of the workspace. */
  WorkspaceId: string;
  /** A JSON string containing input parameters for the view. */
  InputData?: string;
  /** The new page identifier, if changing the page name. */
  NewPage?: string;
  /** The Amazon Resource Name (ARN) of the view to associate with the page. */
  ResourceArn?: string;
  /** The URL-friendly identifier for the page. */
  Slug?: string;
}

export interface UpdateWorkspaceThemeInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The identifier of the workspace. */
  WorkspaceId: string;
  /** The theme configuration, including color schemes and visual styles. */
  Theme?: WorkspaceTheme;
}

export interface UpdateWorkspaceVisibilityInput {
  /** The identifier of the Amazon Connect instance. You can find the instance ID in the Amazon Resource Name (ARN) of the instance. */
  InstanceId: string;
  /** The visibility setting for the workspace. Valid values are: ALL (available to all users), ASSIGNED (available only to assigned users and routing profiles), and NONE (not visible to any users). */
  Visibility: 'ALL' | 'ASSIGNED' | 'NONE';
  /** The identifier of the workspace. */
  WorkspaceId: string;
}

/** Connect service binding for Step Functions SDK integrations. */
export class Connect {
  constructor() {}

  activateEvaluationForm<T>(params: ActivateEvaluationFormInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateAnalyticsDataSet<T>(params: AssociateAnalyticsDataSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateApprovedOrigin<T>(params: AssociateApprovedOriginInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateBot<T>(params: AssociateBotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateContactWithUser<T>(params: AssociateContactWithUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateDefaultVocabulary<T>(params: AssociateDefaultVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateEmailAddressAlias<T>(params: AssociateEmailAddressAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateFlow<T>(params: AssociateFlowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateHoursOfOperations<T>(params: AssociateHoursOfOperationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateInstanceStorageConfig<T>(params: AssociateInstanceStorageConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateLambdaFunction<T>(params: AssociateLambdaFunctionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateLexBot<T>(params: AssociateLexBotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associatePhoneNumberContactFlow<T>(params: AssociatePhoneNumberContactFlowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateQueueQuickConnects<T>(params: AssociateQueueQuickConnectsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateRoutingProfileQueues<T>(params: AssociateRoutingProfileQueuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateSecurityKey<T>(params: AssociateSecurityKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateSecurityProfiles<T>(params: AssociateSecurityProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateTrafficDistributionGroupUser<T>(params: AssociateTrafficDistributionGroupUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateUserProficiencies<T>(params: AssociateUserProficienciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateWorkspace<T>(params: AssociateWorkspaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchAssociateAnalyticsDataSet<T>(params: BatchAssociateAnalyticsDataSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchCreateDataTableValue<T>(params: BatchCreateDataTableValueInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDeleteDataTableValue<T>(params: BatchDeleteDataTableValueInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDescribeDataTableValue<T>(params: BatchDescribeDataTableValueInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDisassociateAnalyticsDataSet<T>(params: BatchDisassociateAnalyticsDataSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchGetAttachedFileMetadata<T>(params: BatchGetAttachedFileMetadataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchGetFlowAssociation<T>(params: BatchGetFlowAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchPutContact<T>(params: BatchPutContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchUpdateDataTableValue<T>(params: BatchUpdateDataTableValueInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  claimPhoneNumber<T>(params: ClaimPhoneNumberInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  completeAttachedFileUpload<T>(params: CompleteAttachedFileUploadInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAgentStatus<T>(params: CreateAgentStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createContact<T>(params: CreateContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createContactFlow<T>(params: CreateContactFlowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createContactFlowModule<T>(params: CreateContactFlowModuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createContactFlowModuleAlias<T>(params: CreateContactFlowModuleAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createContactFlowModuleVersion<T>(params: CreateContactFlowModuleVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createContactFlowVersion<T>(params: CreateContactFlowVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDataTable<T>(params: CreateDataTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDataTableAttribute<T>(params: CreateDataTableAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEmailAddress<T>(params: CreateEmailAddressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEvaluationForm<T>(params: CreateEvaluationFormInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createHoursOfOperation<T>(params: CreateHoursOfOperationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createHoursOfOperationOverride<T>(params: CreateHoursOfOperationOverrideInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createInstance<T>(params: CreateInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIntegrationAssociation<T>(params: CreateIntegrationAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createNotification<T>(params: CreateNotificationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createParticipant<T>(params: CreateParticipantInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPersistentContactAssociation<T>(params: CreatePersistentContactAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPredefinedAttribute<T>(params: CreatePredefinedAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPrompt<T>(params: CreatePromptInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPushNotificationRegistration<T>(params: CreatePushNotificationRegistrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createQueue<T>(params: CreateQueueInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createQuickConnect<T>(params: CreateQuickConnectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRoutingProfile<T>(params: CreateRoutingProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRule<T>(params: CreateRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSecurityProfile<T>(params: CreateSecurityProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTaskTemplate<T>(params: CreateTaskTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTestCase<T>(params: CreateTestCaseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTrafficDistributionGroup<T>(params: CreateTrafficDistributionGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createUseCase<T>(params: CreateUseCaseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createUser<T>(params: CreateUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createUserHierarchyGroup<T>(params: CreateUserHierarchyGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createView<T>(params: CreateViewInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createViewVersion<T>(params: CreateViewVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVocabulary<T>(params: CreateVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createWorkspace<T>(params: CreateWorkspaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createWorkspacePage<T>(params: CreateWorkspacePageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deactivateEvaluationForm<T>(params: DeactivateEvaluationFormInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAttachedFile<T>(params: DeleteAttachedFileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteContactEvaluation<T>(params: DeleteContactEvaluationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteContactFlow<T>(params: DeleteContactFlowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteContactFlowModule<T>(params: DeleteContactFlowModuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteContactFlowModuleAlias<T>(params: DeleteContactFlowModuleAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteContactFlowModuleVersion<T>(params: DeleteContactFlowModuleVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteContactFlowVersion<T>(params: DeleteContactFlowVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDataTable<T>(params: DeleteDataTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDataTableAttribute<T>(params: DeleteDataTableAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEmailAddress<T>(params: DeleteEmailAddressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEvaluationForm<T>(params: DeleteEvaluationFormInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteHoursOfOperation<T>(params: DeleteHoursOfOperationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteHoursOfOperationOverride<T>(params: DeleteHoursOfOperationOverrideInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteInstance<T>(params: DeleteInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIntegrationAssociation<T>(params: DeleteIntegrationAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteNotification<T>(params: DeleteNotificationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePredefinedAttribute<T>(params: DeletePredefinedAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePrompt<T>(params: DeletePromptInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePushNotificationRegistration<T>(params: DeletePushNotificationRegistrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteQueue<T>(params: DeleteQueueInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteQuickConnect<T>(params: DeleteQuickConnectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRoutingProfile<T>(params: DeleteRoutingProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRule<T>(params: DeleteRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSecurityProfile<T>(params: DeleteSecurityProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTaskTemplate<T>(params: DeleteTaskTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTestCase<T>(params: DeleteTestCaseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTrafficDistributionGroup<T>(params: DeleteTrafficDistributionGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUseCase<T>(params: DeleteUseCaseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUser<T>(params: DeleteUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUserHierarchyGroup<T>(params: DeleteUserHierarchyGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteView<T>(params: DeleteViewInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteViewVersion<T>(params: DeleteViewVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVocabulary<T>(params: DeleteVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteWorkspace<T>(params: DeleteWorkspaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteWorkspaceMedia<T>(params: DeleteWorkspaceMediaInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteWorkspacePage<T>(params: DeleteWorkspacePageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAgentStatus<T>(params: DescribeAgentStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAuthenticationProfile<T>(params: DescribeAuthenticationProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeContact<T>(params: DescribeContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeContactEvaluation<T>(params: DescribeContactEvaluationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeContactFlow<T>(params: DescribeContactFlowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeContactFlowModule<T>(params: DescribeContactFlowModuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeContactFlowModuleAlias<T>(params: DescribeContactFlowModuleAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDataTable<T>(params: DescribeDataTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDataTableAttribute<T>(params: DescribeDataTableAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEmailAddress<T>(params: DescribeEmailAddressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEvaluationForm<T>(params: DescribeEvaluationFormInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeHoursOfOperation<T>(params: DescribeHoursOfOperationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeHoursOfOperationOverride<T>(params: DescribeHoursOfOperationOverrideInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstance<T>(params: DescribeInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceAttribute<T>(params: DescribeInstanceAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceStorageConfig<T>(params: DescribeInstanceStorageConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNotification<T>(params: DescribeNotificationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePhoneNumber<T>(params: DescribePhoneNumberInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePredefinedAttribute<T>(params: DescribePredefinedAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePrompt<T>(params: DescribePromptInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeQueue<T>(params: DescribeQueueInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeQuickConnect<T>(params: DescribeQuickConnectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRoutingProfile<T>(params: DescribeRoutingProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRule<T>(params: DescribeRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSecurityProfile<T>(params: DescribeSecurityProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTestCase<T>(params: DescribeTestCaseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTrafficDistributionGroup<T>(params: DescribeTrafficDistributionGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeUser<T>(params: DescribeUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeUserHierarchyGroup<T>(params: DescribeUserHierarchyGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeUserHierarchyStructure<T>(params: DescribeUserHierarchyStructureInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeView<T>(params: DescribeViewInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVocabulary<T>(params: DescribeVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeWorkspace<T>(params: DescribeWorkspaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateAnalyticsDataSet<T>(params: DisassociateAnalyticsDataSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateApprovedOrigin<T>(params: DisassociateApprovedOriginInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateBot<T>(params: DisassociateBotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateEmailAddressAlias<T>(params: DisassociateEmailAddressAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateFlow<T>(params: DisassociateFlowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateHoursOfOperations<T>(params: DisassociateHoursOfOperationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateInstanceStorageConfig<T>(params: DisassociateInstanceStorageConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateLambdaFunction<T>(params: DisassociateLambdaFunctionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateLexBot<T>(params: DisassociateLexBotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociatePhoneNumberContactFlow<T>(params: DisassociatePhoneNumberContactFlowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateQueueQuickConnects<T>(params: DisassociateQueueQuickConnectsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateRoutingProfileQueues<T>(params: DisassociateRoutingProfileQueuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateSecurityKey<T>(params: DisassociateSecurityKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateSecurityProfiles<T>(params: DisassociateSecurityProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateTrafficDistributionGroupUser<T>(params: DisassociateTrafficDistributionGroupUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateUserProficiencies<T>(params: DisassociateUserProficienciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateWorkspace<T>(params: DisassociateWorkspaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  dismissUserContact<T>(params: DismissUserContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  evaluateDataTableValues<T>(params: EvaluateDataTableValuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAttachedFile<T>(params: GetAttachedFileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getContactAttributes<T>(params: GetContactAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getContactMetrics<T>(params: GetContactMetricsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCurrentMetricData<T>(params: GetCurrentMetricDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCurrentUserData<T>(params: GetCurrentUserDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEffectiveHoursOfOperations<T>(params: GetEffectiveHoursOfOperationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getFederationToken<T>(params: GetFederationTokenInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getFlowAssociation<T>(params: GetFlowAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMetricData<T>(params: GetMetricDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMetricDataV2<T>(params: GetMetricDataV2Input): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPromptFile<T>(params: GetPromptFileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTaskTemplate<T>(params: GetTaskTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTestCaseExecutionSummary<T>(params: GetTestCaseExecutionSummaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTrafficDistribution<T>(params: GetTrafficDistributionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importPhoneNumber<T>(params: ImportPhoneNumberInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importWorkspaceMedia<T>(params: ImportWorkspaceMediaInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAgentStatuses<T>(params: ListAgentStatusesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAnalyticsDataAssociations<T>(params: ListAnalyticsDataAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAnalyticsDataLakeDataSets<T>(params: ListAnalyticsDataLakeDataSetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listApprovedOrigins<T>(params: ListApprovedOriginsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAssociatedContacts<T>(params: ListAssociatedContactsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAuthenticationProfiles<T>(params: ListAuthenticationProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBots<T>(params: ListBotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listChildHoursOfOperations<T>(params: ListChildHoursOfOperationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listContactEvaluations<T>(params: ListContactEvaluationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listContactFlowModuleAliases<T>(params: ListContactFlowModuleAliasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listContactFlowModules<T>(params: ListContactFlowModulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listContactFlowModuleVersions<T>(params: ListContactFlowModuleVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listContactFlows<T>(params: ListContactFlowsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listContactFlowVersions<T>(params: ListContactFlowVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listContactReferences<T>(params: ListContactReferencesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDataTableAttributes<T>(params: ListDataTableAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDataTablePrimaryValues<T>(params: ListDataTablePrimaryValuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDataTables<T>(params: ListDataTablesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDataTableValues<T>(params: ListDataTableValuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDefaultVocabularies<T>(params: ListDefaultVocabulariesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEntitySecurityProfiles<T>(params: ListEntitySecurityProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEvaluationForms<T>(params: ListEvaluationFormsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEvaluationFormVersions<T>(params: ListEvaluationFormVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listFlowAssociations<T>(params: ListFlowAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listHoursOfOperationOverrides<T>(params: ListHoursOfOperationOverridesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listHoursOfOperations<T>(params: ListHoursOfOperationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listInstanceAttributes<T>(params: ListInstanceAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listInstances<T>(params: ListInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listInstanceStorageConfigs<T>(params: ListInstanceStorageConfigsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listIntegrationAssociations<T>(params: ListIntegrationAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLambdaFunctions<T>(params: ListLambdaFunctionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLexBots<T>(params: ListLexBotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listNotifications<T>(params: ListNotificationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPhoneNumbers<T>(params: ListPhoneNumbersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPhoneNumbersV2<T>(params: ListPhoneNumbersV2Input): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPredefinedAttributes<T>(params: ListPredefinedAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPrompts<T>(params: ListPromptsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listQueueQuickConnects<T>(params: ListQueueQuickConnectsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listQueues<T>(params: ListQueuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listQuickConnects<T>(params: ListQuickConnectsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRealtimeContactAnalysisSegmentsV2<T>(params: ListRealtimeContactAnalysisSegmentsV2Input): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRoutingProfileManualAssignmentQueues<T>(params: ListRoutingProfileManualAssignmentQueuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRoutingProfileQueues<T>(params: ListRoutingProfileQueuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRoutingProfiles<T>(params: ListRoutingProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRules<T>(params: ListRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSecurityKeys<T>(params: ListSecurityKeysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSecurityProfileApplications<T>(params: ListSecurityProfileApplicationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSecurityProfileFlowModules<T>(params: ListSecurityProfileFlowModulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSecurityProfilePermissions<T>(params: ListSecurityProfilePermissionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSecurityProfiles<T>(params: ListSecurityProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTaskTemplates<T>(params: ListTaskTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTestCaseExecutionRecords<T>(params: ListTestCaseExecutionRecordsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTestCaseExecutions<T>(params: ListTestCaseExecutionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTestCases<T>(params: ListTestCasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTrafficDistributionGroups<T>(params: ListTrafficDistributionGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTrafficDistributionGroupUsers<T>(params: ListTrafficDistributionGroupUsersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUseCases<T>(params: ListUseCasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUserHierarchyGroups<T>(params: ListUserHierarchyGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUserNotifications<T>(params: ListUserNotificationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUserProficiencies<T>(params: ListUserProficienciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUsers<T>(params: ListUsersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listViews<T>(params: ListViewsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listViewVersions<T>(params: ListViewVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listWorkspaceMedia<T>(params: ListWorkspaceMediaInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listWorkspacePages<T>(params: ListWorkspacePagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listWorkspaces<T>(params: ListWorkspacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  monitorContact<T>(params: MonitorContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  pauseContact<T>(params: PauseContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putUserStatus<T>(params: PutUserStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  releasePhoneNumber<T>(params: ReleasePhoneNumberInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  replicateInstance<T>(params: ReplicateInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resumeContact<T>(params: ResumeContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resumeContactRecording<T>(params: ResumeContactRecordingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchAgentStatuses<T>(params: SearchAgentStatusesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchAvailablePhoneNumbers<T>(params: SearchAvailablePhoneNumbersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchContactEvaluations<T>(params: SearchContactEvaluationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchContactFlowModules<T>(params: SearchContactFlowModulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchContactFlows<T>(params: SearchContactFlowsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchContacts<T>(params: SearchContactsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchDataTables<T>(params: SearchDataTablesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchEmailAddresses<T>(params: SearchEmailAddressesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchEvaluationForms<T>(params: SearchEvaluationFormsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchHoursOfOperationOverrides<T>(params: SearchHoursOfOperationOverridesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchHoursOfOperations<T>(params: SearchHoursOfOperationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchNotifications<T>(params: SearchNotificationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchPredefinedAttributes<T>(params: SearchPredefinedAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchPrompts<T>(params: SearchPromptsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchQueues<T>(params: SearchQueuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchQuickConnects<T>(params: SearchQuickConnectsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchResourceTags<T>(params: SearchResourceTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchRoutingProfiles<T>(params: SearchRoutingProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchSecurityProfiles<T>(params: SearchSecurityProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchTestCases<T>(params: SearchTestCasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchUserHierarchyGroups<T>(params: SearchUserHierarchyGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchUsers<T>(params: SearchUsersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchViews<T>(params: SearchViewsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchVocabularies<T>(params: SearchVocabulariesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchWorkspaceAssociations<T>(params: SearchWorkspaceAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchWorkspaces<T>(params: SearchWorkspacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendChatIntegrationEvent<T>(params: SendChatIntegrationEventInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendOutboundEmail<T>(params: SendOutboundEmailInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startAttachedFileUpload<T>(params: StartAttachedFileUploadInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startChatContact<T>(params: StartChatContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startContactEvaluation<T>(params: StartContactEvaluationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startContactMediaProcessing<T>(params: StartContactMediaProcessingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startContactRecording<T>(params: StartContactRecordingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startContactStreaming<T>(params: StartContactStreamingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startEmailContact<T>(params: StartEmailContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startOutboundChatContact<T>(params: StartOutboundChatContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startOutboundEmailContact<T>(params: StartOutboundEmailContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startOutboundVoiceContact<T>(params: StartOutboundVoiceContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startScreenSharing<T>(params: StartScreenSharingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startTaskContact<T>(params: StartTaskContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startTestCaseExecution<T>(params: StartTestCaseExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startWebRTCContact<T>(params: StartWebRTCContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopContact<T>(params: StopContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopContactMediaProcessing<T>(params: StopContactMediaProcessingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopContactRecording<T>(params: StopContactRecordingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopContactStreaming<T>(params: StopContactStreamingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopTestCaseExecution<T>(params: StopTestCaseExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  submitContactEvaluation<T>(params: SubmitContactEvaluationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  suspendContactRecording<T>(params: SuspendContactRecordingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagContact<T>(params: TagContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  transferContact<T>(params: TransferContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagContact<T>(params: UntagContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAgentStatus<T>(params: UpdateAgentStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAuthenticationProfile<T>(params: UpdateAuthenticationProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContact<T>(params: UpdateContactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContactAttributes<T>(params: UpdateContactAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContactEvaluation<T>(params: UpdateContactEvaluationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContactFlowContent<T>(params: UpdateContactFlowContentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContactFlowMetadata<T>(params: UpdateContactFlowMetadataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContactFlowModuleAlias<T>(params: UpdateContactFlowModuleAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContactFlowModuleContent<T>(params: UpdateContactFlowModuleContentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContactFlowModuleMetadata<T>(params: UpdateContactFlowModuleMetadataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContactFlowName<T>(params: UpdateContactFlowNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContactRoutingData<T>(params: UpdateContactRoutingDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateContactSchedule<T>(params: UpdateContactScheduleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDataTableAttribute<T>(params: UpdateDataTableAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDataTableMetadata<T>(params: UpdateDataTableMetadataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDataTablePrimaryValues<T>(params: UpdateDataTablePrimaryValuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEmailAddressMetadata<T>(params: UpdateEmailAddressMetadataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEvaluationForm<T>(params: UpdateEvaluationFormInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateHoursOfOperation<T>(params: UpdateHoursOfOperationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateHoursOfOperationOverride<T>(params: UpdateHoursOfOperationOverrideInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateInstanceAttribute<T>(params: UpdateInstanceAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateInstanceStorageConfig<T>(params: UpdateInstanceStorageConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateNotificationContent<T>(params: UpdateNotificationContentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateParticipantAuthentication<T>(params: UpdateParticipantAuthenticationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateParticipantRoleConfig<T>(params: UpdateParticipantRoleConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePhoneNumber<T>(params: UpdatePhoneNumberInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePhoneNumberMetadata<T>(params: UpdatePhoneNumberMetadataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePredefinedAttribute<T>(params: UpdatePredefinedAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePrompt<T>(params: UpdatePromptInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateQueueHoursOfOperation<T>(params: UpdateQueueHoursOfOperationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateQueueMaxContacts<T>(params: UpdateQueueMaxContactsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateQueueName<T>(params: UpdateQueueNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateQueueOutboundCallerConfig<T>(params: UpdateQueueOutboundCallerConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateQueueOutboundEmailConfig<T>(params: UpdateQueueOutboundEmailConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateQueueStatus<T>(params: UpdateQueueStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateQuickConnectConfig<T>(params: UpdateQuickConnectConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateQuickConnectName<T>(params: UpdateQuickConnectNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRoutingProfileAgentAvailabilityTimer<T>(params: UpdateRoutingProfileAgentAvailabilityTimerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRoutingProfileConcurrency<T>(params: UpdateRoutingProfileConcurrencyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRoutingProfileDefaultOutboundQueue<T>(params: UpdateRoutingProfileDefaultOutboundQueueInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRoutingProfileName<T>(params: UpdateRoutingProfileNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRoutingProfileQueues<T>(params: UpdateRoutingProfileQueuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRule<T>(params: UpdateRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSecurityProfile<T>(params: UpdateSecurityProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTaskTemplate<T>(params: UpdateTaskTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTestCase<T>(params: UpdateTestCaseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTrafficDistribution<T>(params: UpdateTrafficDistributionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUserConfig<T>(params: UpdateUserConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUserHierarchy<T>(params: UpdateUserHierarchyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUserHierarchyGroupName<T>(params: UpdateUserHierarchyGroupNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUserHierarchyStructure<T>(params: UpdateUserHierarchyStructureInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUserIdentityInfo<T>(params: UpdateUserIdentityInfoInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUserNotificationStatus<T>(params: UpdateUserNotificationStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUserPhoneConfig<T>(params: UpdateUserPhoneConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUserProficiencies<T>(params: UpdateUserProficienciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUserRoutingProfile<T>(params: UpdateUserRoutingProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUserSecurityProfiles<T>(params: UpdateUserSecurityProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateViewContent<T>(params: UpdateViewContentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateViewMetadata<T>(params: UpdateViewMetadataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateWorkspaceMetadata<T>(params: UpdateWorkspaceMetadataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateWorkspacePage<T>(params: UpdateWorkspacePageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateWorkspaceTheme<T>(params: UpdateWorkspaceThemeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateWorkspaceVisibility<T>(params: UpdateWorkspaceVisibilityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
