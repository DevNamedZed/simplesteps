// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface CreateApplicationRequest {
  /** The display name of the application. This name is displayed as the Project name on the Amazon Pinpoint console. */
  Name: string;
  /** A string-to-string map of key-value pairs that defines the tags to associate with the application. Each tag consists of a required tag key and an associated tag value. */
  tags?: Record<string, string>;
}

export interface CustomDeliveryConfiguration {
  /** The destination to send the campaign or treatment to. This value can be one of the following: The name or Amazon Resource Name (ARN) of an AWS Lambda function to invoke to handle delivery of the campa */
  DeliveryUri: string;
  /** The types of endpoints to send the campaign or treatment to. Each valid value maps to a type of channel that you can associate with an endpoint by using the ChannelType property of an endpoint. */
  EndpointTypes?: any[];
}

export interface CampaignHook {
  /** The name or Amazon Resource Name (ARN) of the AWS Lambda function that Amazon Pinpoint invokes to customize a segment for a campaign. */
  LambdaFunctionName?: string;
  /** The mode that Amazon Pinpoint uses to invoke the AWS Lambda function. Possible values are: FILTER - Invoke the function to customize the segment that's used by a campaign. DELIVERY - (Deprecated) Prev */
  Mode?: 'DELIVERY' | 'FILTER';
  /** The web URL that Amazon Pinpoint calls to invoke the AWS Lambda function over HTTPS. */
  WebUrl?: string;
}

export interface CampaignLimits {
  /** The maximum number of messages that a campaign can send to a single endpoint during a 24-hour period. For an application, this value specifies the default limit for the number of messages that campaig */
  Daily?: number;
  /** The maximum amount of time, in seconds, that a campaign can attempt to deliver a message after the scheduled start time for the campaign. The minimum value is 60 seconds. */
  MaximumDuration?: number;
  /** The maximum number of messages that a campaign can send each second. For an application, this value specifies the default limit for the number of messages that campaigns can send each second. The mini */
  MessagesPerSecond?: number;
  /** The maximum number of messages that a campaign can send to a single endpoint during the course of the campaign. If a campaign recurs, this setting applies to all runs of the campaign. The maximum valu */
  Total?: number;
  /** The maximum total number of messages that the campaign can send per user session. */
  Session?: number;
}

export interface MessageConfiguration {
  /** The message that the campaign sends through the ADM (Amazon Device Messaging) channel. If specified, this message overrides the default message. */
  ADMMessage?: any;
  /** The message that the campaign sends through the APNs (Apple Push Notification service) channel. If specified, this message overrides the default message. */
  APNSMessage?: any;
  /** The message that the campaign sends through the Baidu (Baidu Cloud Push) channel. If specified, this message overrides the default message. */
  BaiduMessage?: any;
  /** The message that the campaign sends through a custom channel, as specified by the delivery configuration (CustomDeliveryConfiguration) settings for the campaign. If specified, this message overrides t */
  CustomMessage?: any;
  /** The default message that the campaign sends through all the channels that are configured for the campaign. */
  DefaultMessage?: any;
  /** The message that the campaign sends through the email channel. If specified, this message overrides the default message. */
  EmailMessage?: any;
  /** The message that the campaign sends through the GCM channel, which enables Amazon Pinpoint to send push notifications through the Firebase Cloud Messaging (FCM), formerly Google Cloud Messaging (GCM), */
  GCMMessage?: any;
  /** The message that the campaign sends through the SMS channel. If specified, this message overrides the default message. */
  SMSMessage?: any;
  /** The in-app message configuration. */
  InAppMessage?: any;
}

export interface Schedule {
  /** The scheduled time, in ISO 8601 format, when the campaign ended or will end. */
  EndTime?: string;
  /** The type of event that causes the campaign to be sent, if the value of the Frequency property is EVENT. */
  EventFilter?: any;
  /** Specifies how often the campaign is sent or whether the campaign is sent in response to a specific event. */
  Frequency?: 'ONCE' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'EVENT' | 'IN_APP_EVENT';
  /** Specifies whether the start and end times for the campaign schedule use each recipient's local time. To base the schedule on each recipient's local time, set this value to true. */
  IsLocalTime?: boolean;
  /** The default quiet time for the campaign. Quiet time is a specific time range when a campaign doesn't send messages to endpoints, if all the following conditions are met: The EndpointDemographic.Timezo */
  QuietTime?: any;
  /** The scheduled time when the campaign began or will begin. Valid values are: IMMEDIATE, to start the campaign immediately; or, a specific time in ISO 8601 format. */
  StartTime: string;
  /** The starting UTC offset for the campaign schedule, if the value of the IsLocalTime property is true. Valid values are: UTC, UTC+01, UTC+02, UTC+03, UTC+03:30, UTC+04, UTC+04:30, UTC+05, UTC+05:30, UTC */
  Timezone?: string;
}

export interface TemplateConfiguration {
  /** The email template to use for the message. */
  EmailTemplate?: any;
  /** The push notification template to use for the message. */
  PushTemplate?: any;
  /** The SMS template to use for the message. */
  SMSTemplate?: any;
  /** The voice template to use for the message. This object isn't supported for campaigns. */
  VoiceTemplate?: any;
  /** The InApp template to use for the message. The InApp template object is not supported for SendMessages. */
  InAppTemplate?: any;
}

export interface WriteCampaignRequest {
  /** An array of requests that defines additional treatments for the campaign, in addition to the default treatment for the campaign. */
  AdditionalTreatments?: any[];
  /** The delivery configuration settings for sending the campaign through a custom channel. This object is required if the MessageConfiguration object for the campaign specifies a CustomMessage object. */
  CustomDeliveryConfiguration?: CustomDeliveryConfiguration;
  /** A custom description of the campaign. */
  Description?: string;
  /** The allocated percentage of users (segment members) who shouldn't receive messages from the campaign. */
  HoldoutPercent?: number;
  /** The settings for the AWS Lambda function to invoke as a code hook for the campaign. You can use this hook to customize the segment that's used by the campaign. */
  Hook?: CampaignHook;
  /** Specifies whether to pause the campaign. A paused campaign doesn't run unless you resume it by changing this value to false. */
  IsPaused?: boolean;
  /** The messaging limits for the campaign. */
  Limits?: CampaignLimits;
  /** The message configuration settings for the campaign. */
  MessageConfiguration?: MessageConfiguration;
  /** A custom name for the campaign. */
  Name?: string;
  /** The schedule settings for the campaign. */
  Schedule?: Schedule;
  /** The unique identifier for the segment to associate with the campaign. */
  SegmentId?: string;
  /** The version of the segment to associate with the campaign. */
  SegmentVersion?: number;
  /** As of 22-05-2023 tags has been deprecated for update operations. After this date any value in tags is not processed and an error code is not returned. To manage tags we recommend using either Tags in  */
  tags?: Record<string, string>;
  /** The message template to use for the campaign. */
  TemplateConfiguration?: TemplateConfiguration;
  /** A custom description of the default treatment for the campaign. */
  TreatmentDescription?: string;
  /** A custom name of the default treatment for the campaign, if the campaign has multiple treatments. A treatment is a variation of a campaign that's used for A/B testing. */
  TreatmentName?: string;
  /** Defines the priority of the campaign, used to decide the order of messages displayed to user if there are multiple messages scheduled to be displayed at the same moment. */
  Priority?: number;
}

export interface EmailTemplateRequest {
  /** A JSON object that specifies the default values to use for message variables in the message template. This object is a set of key-value pairs. Each key defines a message variable in the template. The  */
  DefaultSubstitutions?: string;
  /** The message body, in HTML format, to use in email messages that are based on the message template. We recommend using HTML format for email clients that render HTML content. You can include links, for */
  HtmlPart?: string;
  /** The unique identifier for the recommender model to use for the message template. Amazon Pinpoint uses this value to determine how to retrieve and process data from a recommender model when it sends me */
  RecommenderId?: string;
  /** The subject line, or title, to use in email messages that are based on the message template. */
  Subject?: string;
  /** The list of MessageHeaders for the email. You can have up to 15 Headers. */
  Headers?: any[];
  /** As of 22-05-2023 tags has been deprecated for update operations. After this date any value in tags is not processed and an error code is not returned. To manage tags we recommend using either Tags in  */
  tags?: Record<string, string>;
  /** A custom description of the message template. */
  TemplateDescription?: string;
  /** The message body, in plain text format, to use in email messages that are based on the message template. We recommend using plain text format for email clients that don't render HTML content and clien */
  TextPart?: string;
}

export interface ExportJobRequest {
  /** The Amazon Resource Name (ARN) of the AWS Identity and Access Management (IAM) role that authorizes Amazon Pinpoint to access the Amazon S3 location where you want to export endpoint definitions to. */
  RoleArn: string;
  /** The URL of the location in an Amazon Simple Storage Service (Amazon S3) bucket where you want to export endpoint definitions to. This location is typically a folder that contains multiple files. The U */
  S3UrlPrefix: string;
  /** The identifier for the segment to export endpoint definitions from. If you don't specify this value, Amazon Pinpoint exports definitions for all the endpoints that are associated with the application. */
  SegmentId?: string;
  /** The version of the segment to export endpoint definitions from, if specified. */
  SegmentVersion?: number;
}

export interface ImportJobRequest {
  /** Specifies whether to create a segment that contains the endpoints, when the endpoint definitions are imported. */
  DefineSegment?: boolean;
  /** (Deprecated) Your AWS account ID, which you assigned to an external ID key in an IAM trust policy. Amazon Pinpoint previously used this value to assume an IAM role when importing endpoint definitions, */
  ExternalId?: string;
  /** The format of the files that contain the endpoint definitions to import. Valid values are: CSV, for comma-separated values format; and, JSON, for newline-delimited JSON format. If the Amazon S3 locati */
  Format: 'CSV' | 'JSON';
  /** Specifies whether to register the endpoints with Amazon Pinpoint, when the endpoint definitions are imported. */
  RegisterEndpoints?: boolean;
  /** The Amazon Resource Name (ARN) of the AWS Identity and Access Management (IAM) role that authorizes Amazon Pinpoint to access the Amazon S3 location to import endpoint definitions from. */
  RoleArn: string;
  /** The URL of the Amazon Simple Storage Service (Amazon S3) bucket that contains the endpoint definitions to import. This location can be a folder or a single file. If the location is a folder, Amazon Pi */
  S3Url: string;
  /** The identifier for the segment to update or add the imported endpoint definitions to, if the import job is meant to update an existing segment. */
  SegmentId?: string;
  /** A custom name for the segment that's created by the import job, if the value of the DefineSegment property is true. */
  SegmentName?: string;
}

export interface InAppTemplateRequest {
  /** The content of the message, can include up to 5 modals. Each modal must contain a message, a header, and background color. ImageUrl and buttons are optional. */
  Content?: any[];
  /** Custom config to be sent to client. */
  CustomConfig?: Record<string, string>;
  /** The layout of the message. */
  Layout?: 'BOTTOM_BANNER' | 'TOP_BANNER' | 'OVERLAYS' | 'MOBILE_FEED' | 'MIDDLE_BANNER' | 'CAROUSEL';
  /** As of 22-05-2023 tags has been deprecated for update operations. After this date any value in tags is not processed and an error code is not returned. To manage tags we recommend using either Tags in  */
  tags?: Record<string, string>;
  /** The description of the template. */
  TemplateDescription?: string;
}

export interface JourneyLimits {
  /** The maximum number of messages that the journey can send to a single participant during a 24-hour period. The maximum value is 100. */
  DailyCap?: number;
  /** The maximum number of times that a participant can enter the journey. The maximum value is 100. To allow participants to enter the journey an unlimited number of times, set this value to 0. */
  EndpointReentryCap?: number;
  /** The maximum number of messages that the journey can send each second. */
  MessagesPerSecond?: number;
  /** Minimum time that must pass before an endpoint can re-enter a given journey. The duration should use an ISO 8601 format, such as PT1H. */
  EndpointReentryInterval?: string;
  /** The number of messages that an endpoint can receive during the specified timeframe. */
  TimeframeCap?: any;
  /** The maximum number of messages a journey can sent to a single endpoint. The maximum value is 100. If set to 0, this limit will not apply. */
  TotalCap?: number;
}

export interface QuietTime {
  /** The specific time when quiet time ends. This value has to use 24-hour notation and be in HH:MM format, where HH is the hour (with a leading zero, if applicable) and MM is the minutes. For example, use */
  End?: string;
  /** The specific time when quiet time begins. This value has to use 24-hour notation and be in HH:MM format, where HH is the hour (with a leading zero, if applicable) and MM is the minutes. For example, u */
  Start?: string;
}

export interface JourneySchedule {
  /** The scheduled time, in ISO 8601 format, when the journey ended or will end. */
  EndTime?: string;
  /** The scheduled time, in ISO 8601 format, when the journey began or will begin. */
  StartTime?: string;
  /** The starting UTC offset for the journey schedule, if the value of the journey's LocalTime property is true. Valid values are: UTC, UTC+01, UTC+02, UTC+03, UTC+03:30, UTC+04, UTC+04:30, UTC+05, UTC+05: */
  Timezone?: string;
}

export interface StartCondition {
  /** The custom description of the condition. */
  Description?: string;
  EventStartCondition?: any;
  /** The segment that's associated with the first activity in the journey. This segment determines which users are participants in the journey. */
  SegmentStartCondition?: any;
}

export interface JourneyChannelSettings {
  /** Amazon Resource Name (ARN) of the Connect Campaign. */
  ConnectCampaignArn?: string;
  /** IAM role ARN to be assumed when invoking Connect campaign execution APIs for dialing. */
  ConnectCampaignExecutionRoleArn?: string;
}

export interface OpenHours {
  /** Specifies the schedule settings for the email channel. */
  EMAIL?: Record<string, any>;
  /** Specifies the schedule settings for the SMS channel. */
  SMS?: Record<string, any>;
  /** Specifies the schedule settings for the push channel. */
  PUSH?: Record<string, any>;
  /** Specifies the schedule settings for the voice channel. */
  VOICE?: Record<string, any>;
  /** Specifies the schedule settings for the custom channel. */
  CUSTOM?: Record<string, any>;
}

export interface ClosedDays {
  /** Rules for the Email channel. */
  EMAIL?: any[];
  /** Rules for the SMS channel. */
  SMS?: any[];
  /** Rules for the Push channel. */
  PUSH?: any[];
  /** Rules for the Voice channel. */
  VOICE?: any[];
  /** Rules for the Custom channel. */
  CUSTOM?: any[];
}

export interface WriteJourneyRequest {
  /** A map that contains a set of Activity objects, one object for each activity in the journey. For each Activity object, the key is the unique identifier (string) for an activity and the value is the set */
  Activities?: Record<string, any>;
  /** The date, in ISO 8601 format, when the journey was created. */
  CreationDate?: string;
  /** The date, in ISO 8601 format, when the journey was last modified. */
  LastModifiedDate?: string;
  /** The messaging and entry limits for the journey. */
  Limits?: JourneyLimits;
  /** Specifies whether the journey's scheduled start and end times use each participant's local time. To base the schedule on each participant's local time, set this value to true. */
  LocalTime?: boolean;
  /** The name of the journey. A journey name can contain a maximum of 150 characters. The characters can be alphanumeric characters or symbols, such as underscores (_) or hyphens (-). A journey name can't  */
  Name: string;
  /** The quiet time settings for the journey. Quiet time is a specific time range when a journey doesn't send messages to participants, if all the following conditions are met: The EndpointDemographic.Time */
  QuietTime?: QuietTime;
  /** The frequency with which Amazon Pinpoint evaluates segment and event data for the journey, as a duration in ISO 8601 format. */
  RefreshFrequency?: string;
  /** The schedule settings for the journey. */
  Schedule?: JourneySchedule;
  /** The unique identifier for the first activity in the journey. The identifier for this activity can contain a maximum of 128 characters. The characters must be alphanumeric characters. */
  StartActivity?: string;
  /** The segment that defines which users are participants in the journey. */
  StartCondition?: StartCondition;
  /** The status of the journey. Valid values are: DRAFT - Saves the journey and doesn't publish it. ACTIVE - Saves and publishes the journey. Depending on the journey's schedule, the journey starts running */
  State?: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'CLOSED' | 'PAUSED';
  /** Specifies whether endpoints in quiet hours should enter a wait till the end of their quiet hours. */
  WaitForQuietTime?: boolean;
  /** Indicates whether the journey participants should be refreshed when a segment is updated. */
  RefreshOnSegmentUpdate?: boolean;
  /** The channel-specific configurations for the journey. */
  JourneyChannelSettings?: JourneyChannelSettings;
  /** Indicates if journey has Advance Quiet Time enabled. This flag should be set to true in order to allow using OpenHours and ClosedDays. */
  SendingSchedule?: boolean;
  /** The time when journey allow to send messages. QuietTime should be configured first and SendingSchedule should be set to true. */
  OpenHours?: OpenHours;
  /** The time when journey will stop sending messages. QuietTime should be configured first and SendingSchedule should be set to true. */
  ClosedDays?: ClosedDays;
  /** An array of time zone estimation methods, if any, to use for determining an Endpoints time zone if the Endpoint does not have a value for the Demographic.Timezone attribute. PHONE_NUMBER - A time zone */
  TimezoneEstimationMethods?: 'PHONE_NUMBER' | 'POSTAL_CODE'[];
}

export interface AndroidPushNotificationTemplate {
  /** The action to occur if a recipient taps a push notification that's based on the message template. Valid values are: OPEN_APP - Your app opens or it becomes the foreground app if it was sent to the bac */
  Action?: 'OPEN_APP' | 'DEEP_LINK' | 'URL';
  /** The message body to use in a push notification that's based on the message template. */
  Body?: string;
  /** The URL of the large icon image to display in the content view of a push notification that's based on the message template. */
  ImageIconUrl?: string;
  /** The URL of an image to display in a push notification that's based on the message template. */
  ImageUrl?: string;
  /** The raw, JSON-formatted string to use as the payload for a push notification that's based on the message template. If specified, this value overrides all other content for the message template. */
  RawContent?: string;
  /** The URL of the small icon image to display in the status bar and the content view of a push notification that's based on the message template. */
  SmallImageIconUrl?: string;
  /** The sound to play when a recipient receives a push notification that's based on the message template. You can use the default stream or specify the file name of a sound resource that's bundled in your */
  Sound?: string;
  /** The title to use in a push notification that's based on the message template. This title appears above the notification message on a recipient's device. */
  Title?: string;
  /** The URL to open in a recipient's default mobile browser, if a recipient taps a push notification that's based on the message template and the value of the Action property is URL. */
  Url?: string;
}

export interface APNSPushNotificationTemplate {
  /** The action to occur if a recipient taps a push notification that's based on the message template. Valid values are: OPEN_APP - Your app opens or it becomes the foreground app if it was sent to the bac */
  Action?: 'OPEN_APP' | 'DEEP_LINK' | 'URL';
  /** The message body to use in push notifications that are based on the message template. */
  Body?: string;
  /** The URL of an image or video to display in push notifications that are based on the message template. */
  MediaUrl?: string;
  /** The raw, JSON-formatted string to use as the payload for push notifications that are based on the message template. If specified, this value overrides all other content for the message template. */
  RawContent?: string;
  /** The key for the sound to play when the recipient receives a push notification that's based on the message template. The value for this key is the name of a sound file in your app's main bundle or the  */
  Sound?: string;
  /** The title to use in push notifications that are based on the message template. This title appears above the notification message on a recipient's device. */
  Title?: string;
  /** The URL to open in the recipient's default mobile browser, if a recipient taps a push notification that's based on the message template and the value of the Action property is URL. */
  Url?: string;
}

export interface DefaultPushNotificationTemplate {
  /** The action to occur if a recipient taps a push notification that's based on the message template. Valid values are: OPEN_APP - Your app opens or it becomes the foreground app if it was sent to the bac */
  Action?: 'OPEN_APP' | 'DEEP_LINK' | 'URL';
  /** The message body to use in push notifications that are based on the message template. */
  Body?: string;
  /** The sound to play when a recipient receives a push notification that's based on the message template. You can use the default stream or specify the file name of a sound resource that's bundled in your */
  Sound?: string;
  /** The title to use in push notifications that are based on the message template. This title appears above the notification message on a recipient's device. */
  Title?: string;
  /** The URL to open in a recipient's default mobile browser, if a recipient taps a push notification that's based on the message template and the value of the Action property is URL. */
  Url?: string;
}

export interface PushNotificationTemplateRequest {
  /** The message template to use for the ADM (Amazon Device Messaging) channel. This message template overrides the default template for push notification channels (DefaultPushNotificationTemplate). */
  ADM?: AndroidPushNotificationTemplate;
  /** The message template to use for the APNs (Apple Push Notification service) channel. This message template overrides the default template for push notification channels (DefaultPushNotificationTemplate */
  APNS?: APNSPushNotificationTemplate;
  /** The message template to use for the Baidu (Baidu Cloud Push) channel. This message template overrides the default template for push notification channels (DefaultPushNotificationTemplate). */
  Baidu?: AndroidPushNotificationTemplate;
  /** The default message template to use for push notification channels. */
  Default?: DefaultPushNotificationTemplate;
  /** A JSON object that specifies the default values to use for message variables in the message template. This object is a set of key-value pairs. Each key defines a message variable in the template. The  */
  DefaultSubstitutions?: string;
  /** The message template to use for the GCM channel, which is used to send notifications through the Firebase Cloud Messaging (FCM), formerly Google Cloud Messaging (GCM), service. This message template o */
  GCM?: AndroidPushNotificationTemplate;
  /** The unique identifier for the recommender model to use for the message template. Amazon Pinpoint uses this value to determine how to retrieve and process data from a recommender model when it sends me */
  RecommenderId?: string;
  /** As of 22-05-2023 tags has been deprecated for update operations. After this date any value in tags is not processed and an error code is not returned. To manage tags we recommend using either Tags in  */
  tags?: Record<string, string>;
  /** A custom description of the message template. */
  TemplateDescription?: string;
}

export interface CreateRecommenderConfigurationShape {
  /** A map of key-value pairs that defines 1-10 custom endpoint or user attributes, depending on the value for the RecommendationProviderIdType property. Each of these attributes temporarily stores a recom */
  Attributes?: Record<string, string>;
  /** A custom description of the configuration for the recommender model. The description can contain up to 128 characters. The characters can be letters, numbers, spaces, or the following symbols: _ ; ()  */
  Description?: string;
  /** A custom name of the configuration for the recommender model. The name must start with a letter or number and it can contain up to 128 characters. The characters can be letters, numbers, spaces, under */
  Name?: string;
  /** The type of Amazon Pinpoint ID to associate with unique user IDs in the recommender model. This value enables the model to use attribute and event data that’s specific to a particular endpoint or user */
  RecommendationProviderIdType?: string;
  /** The Amazon Resource Name (ARN) of the AWS Identity and Access Management (IAM) role that authorizes Amazon Pinpoint to retrieve recommendation data from the recommender model. */
  RecommendationProviderRoleArn: string;
  /** The Amazon Resource Name (ARN) of the recommender model to retrieve recommendation data from. This value must match the ARN of an Amazon Personalize campaign. */
  RecommendationProviderUri: string;
  /** The name or Amazon Resource Name (ARN) of the AWS Lambda function to invoke for additional processing of recommendation data that's retrieved from the recommender model. */
  RecommendationTransformerUri?: string;
  /** A custom display name for the standard endpoint or user attribute (RecommendationItems) that temporarily stores recommended items for each endpoint or user, depending on the value for the Recommendati */
  RecommendationsDisplayName?: string;
  /** The number of recommended items to retrieve from the model for each endpoint or user, depending on the value for the RecommendationProviderIdType property. This number determines how many recommended  */
  RecommendationsPerMessage?: number;
}

export interface SegmentDimensions {
  /** One or more custom attributes to use as criteria for the segment. */
  Attributes?: Record<string, any>;
  /** The behavior-based criteria, such as how recently users have used your app, for the segment. */
  Behavior?: any;
  /** The demographic-based criteria, such as device platform, for the segment. */
  Demographic?: any;
  /** The location-based criteria, such as region or GPS coordinates, for the segment. */
  Location?: any;
  /** One or more custom metrics to use as criteria for the segment. */
  Metrics?: Record<string, any>;
  /** One or more custom user attributes to use as criteria for the segment. */
  UserAttributes?: Record<string, any>;
}

export interface SegmentGroupList {
  /** An array that defines the set of segment criteria to evaluate when handling segment groups for the segment. */
  Groups?: any[];
  /** Specifies how to handle multiple segment groups for the segment. For example, if the segment includes three segment groups, whether the resulting segment includes endpoints that match all, any, or non */
  Include?: 'ALL' | 'ANY' | 'NONE';
}

export interface WriteSegmentRequest {
  /** The criteria that define the dimensions for the segment. */
  Dimensions?: SegmentDimensions;
  /** The name of the segment. */
  Name?: string;
  /** The segment group to use and the dimensions to apply to the group's base segments in order to build the segment. A segment group can consist of zero or more base segments. Your request can include onl */
  SegmentGroups?: SegmentGroupList;
  /** As of 22-05-2023 tags has been deprecated for update operations. After this date any value in tags is not processed and an error code is not returned. To manage tags we recommend using either Tags in  */
  tags?: Record<string, string>;
}

export interface SMSTemplateRequest {
  /** The message body to use in text messages that are based on the message template. */
  Body?: string;
  /** A JSON object that specifies the default values to use for message variables in the message template. This object is a set of key-value pairs. Each key defines a message variable in the template. The  */
  DefaultSubstitutions?: string;
  /** The unique identifier for the recommender model to use for the message template. Amazon Pinpoint uses this value to determine how to retrieve and process data from a recommender model when it sends me */
  RecommenderId?: string;
  /** As of 22-05-2023 tags has been deprecated for update operations. After this date any value in tags is not processed and an error code is not returned. To manage tags we recommend using either Tags in  */
  tags?: Record<string, string>;
  /** A custom description of the message template. */
  TemplateDescription?: string;
}

export interface VoiceTemplateRequest {
  /** The text of the script to use in messages that are based on the message template, in plain text format. */
  Body?: string;
  /** A JSON object that specifies the default values to use for message variables in the message template. This object is a set of key-value pairs. Each key defines a message variable in the template. The  */
  DefaultSubstitutions?: string;
  /** The code for the language to use when synthesizing the text of the script in messages that are based on the message template. For a list of supported languages and the code for each one, see the Amazo */
  LanguageCode?: string;
  /** As of 22-05-2023 tags has been deprecated for update operations. After this date any value in tags is not processed and an error code is not returned. To manage tags we recommend using either Tags in  */
  tags?: Record<string, string>;
  /** A custom description of the message template. */
  TemplateDescription?: string;
  /** The name of the voice to use when delivering messages that are based on the message template. For a list of supported voices, see the Amazon Polly Developer Guide. */
  VoiceId?: string;
}

export interface NumberValidateRequest {
  /** The two-character code, in ISO 3166-1 alpha-2 format, for the country or region where the phone number was originally registered. */
  IsoCountryCode?: string;
  /** The phone number to retrieve information about. The phone number that you provide should include a valid numeric country code. Otherwise, the operation might result in an error. */
  PhoneNumber?: string;
}

export interface EventsRequest {
  /** The batch of events to process. For each item in a batch, the endpoint ID acts as a key that has an EventsBatch object as its value. */
  BatchItem: Record<string, any>;
}

export interface WriteEventStream {
  /** The Amazon Resource Name (ARN) of the Amazon Kinesis data stream or Amazon Kinesis Data Firehose delivery stream that you want to publish event data to. For a Kinesis data stream, the ARN format is: a */
  DestinationStreamArn: string;
  /** The AWS Identity and Access Management (IAM) role that authorizes Amazon Pinpoint to publish event data to the stream in your AWS account. */
  RoleArn: string;
}

export interface UpdateAttributesRequest {
  /** An array of the attributes to remove from all the endpoints that are associated with the application. The array can specify the complete, exact name of each attribute to remove or it can specify a glo */
  Blacklist?: string[];
}

export interface DirectMessageConfiguration {
  /** The default push notification message for the ADM (Amazon Device Messaging) channel. This message overrides the default push notification message (DefaultPushNotificationMessage). */
  ADMMessage?: any;
  /** The default push notification message for the APNs (Apple Push Notification service) channel. This message overrides the default push notification message (DefaultPushNotificationMessage). */
  APNSMessage?: any;
  /** The default push notification message for the Baidu (Baidu Cloud Push) channel. This message overrides the default push notification message (DefaultPushNotificationMessage). */
  BaiduMessage?: any;
  /** The default message for all channels. */
  DefaultMessage?: any;
  /** The default push notification message for all push notification channels. */
  DefaultPushNotificationMessage?: any;
  /** The default message for the email channel. This message overrides the default message (DefaultMessage). */
  EmailMessage?: any;
  /** The default push notification message for the GCM channel, which is used to send notifications through the Firebase Cloud Messaging (FCM), formerly Google Cloud Messaging (GCM), service. This message  */
  GCMMessage?: any;
  /** The default message for the SMS channel. This message overrides the default message (DefaultMessage). */
  SMSMessage?: any;
  /** The default message for the voice channel. This message overrides the default message (DefaultMessage). */
  VoiceMessage?: any;
}

export interface MessageRequest {
  /** A map of key-value pairs, where each key is an address and each value is an AddressConfiguration object. An address can be a push notification token, a phone number, or an email address. You can use a */
  Addresses?: Record<string, any>;
  /** A map of custom attributes to attach to the message. For a push notification, this payload is added to the data.pinpoint object. For an email or text message, this payload is added to email/SMS delive */
  Context?: Record<string, string>;
  /** A map of key-value pairs, where each key is an endpoint ID and each value is an EndpointSendConfiguration object. You can use an EndpointSendConfiguration object to tailor the message for an endpoint  */
  Endpoints?: Record<string, any>;
  /** The settings and content for the default message and any default messages that you defined for specific channels. */
  MessageConfiguration: DirectMessageConfiguration;
  /** The message template to use for the message. */
  TemplateConfiguration?: TemplateConfiguration;
  /** The unique identifier for tracing the message. This identifier is visible to message recipients. */
  TraceId?: string;
}

export interface SendOTPMessageRequestParameters {
  /** The attempts allowed to validate an OTP. */
  AllowedAttempts?: number;
  /** The brand name that will be substituted into the OTP message body. Should be owned by calling AWS account. */
  BrandName: string;
  /** Channel type for the OTP message. Supported values: [SMS]. */
  Channel: string;
  /** The number of characters in the generated OTP. */
  CodeLength?: number;
  /** The destination identity to send OTP to. */
  DestinationIdentity: string;
  /** A unique Entity ID received from DLT after entity registration is approved. */
  EntityId?: string;
  /** The language to be used for the outgoing message body containing the OTP. */
  Language?: string;
  /** The origination identity used to send OTP from. */
  OriginationIdentity: string;
  /** Developer-specified reference identifier. Required to match during OTP verification. */
  ReferenceId: string;
  /** A unique Template ID received from DLT after entity registration is approved. */
  TemplateId?: string;
  /** The time in minutes before the OTP is no longer valid. */
  ValidityPeriod?: number;
}

export interface SendUsersMessageRequest {
  /** A map of custom attribute-value pairs. For a push notification, Amazon Pinpoint adds these attributes to the data.pinpoint object in the body of the notification payload. Amazon Pinpoint also provides */
  Context?: Record<string, string>;
  /** The settings and content for the default message and any default messages that you defined for specific channels. */
  MessageConfiguration: DirectMessageConfiguration;
  /** The message template to use for the message. */
  TemplateConfiguration?: TemplateConfiguration;
  /** The unique identifier for tracing the message. This identifier is visible to message recipients. */
  TraceId?: string;
  /** A map that associates user IDs with EndpointSendConfiguration objects. You can use an EndpointSendConfiguration object to tailor the message for a user by specifying settings such as content overrides */
  Users: Record<string, any>;
}

export interface TagsModel {
  /** A string-to-string map of key-value pairs that defines the tags for an application, campaign, message template, or segment. Each of these resources can have a maximum of 50 tags. Each tag consists of  */
  tags: Record<string, string>;
}

export interface ADMChannelRequest {
  /** The Client ID that you received from Amazon to send messages by using ADM. */
  ClientId: string;
  /** The Client Secret that you received from Amazon to send messages by using ADM. */
  ClientSecret: string;
  /** Specifies whether to enable the ADM channel for the application. */
  Enabled?: boolean;
}

export interface APNSChannelRequest {
  /** The bundle identifier that's assigned to your iOS app. This identifier is used for APNs tokens. */
  BundleId?: string;
  /** The APNs client certificate that you received from Apple, if you want Amazon Pinpoint to communicate with APNs by using an APNs certificate. */
  Certificate?: string;
  /** The default authentication method that you want Amazon Pinpoint to use when authenticating with APNs, key or certificate. */
  DefaultAuthenticationMethod?: string;
  /** Specifies whether to enable the APNs channel for the application. */
  Enabled?: boolean;
  /** The private key for the APNs client certificate that you want Amazon Pinpoint to use to communicate with APNs. */
  PrivateKey?: string;
  /** The identifier that's assigned to your Apple developer account team. This identifier is used for APNs tokens. */
  TeamId?: string;
  /** The authentication key to use for APNs tokens. */
  TokenKey?: string;
  /** The key identifier that's assigned to your APNs signing key, if you want Amazon Pinpoint to communicate with APNs by using APNs tokens. */
  TokenKeyId?: string;
}

export interface APNSSandboxChannelRequest {
  /** The bundle identifier that's assigned to your iOS app. This identifier is used for APNs tokens. */
  BundleId?: string;
  /** The APNs client certificate that you received from Apple, if you want Amazon Pinpoint to communicate with the APNs sandbox environment by using an APNs certificate. */
  Certificate?: string;
  /** The default authentication method that you want Amazon Pinpoint to use when authenticating with the APNs sandbox environment, key or certificate. */
  DefaultAuthenticationMethod?: string;
  /** Specifies whether to enable the APNs sandbox channel for the application. */
  Enabled?: boolean;
  /** The private key for the APNs client certificate that you want Amazon Pinpoint to use to communicate with the APNs sandbox environment. */
  PrivateKey?: string;
  /** The identifier that's assigned to your Apple developer account team. This identifier is used for APNs tokens. */
  TeamId?: string;
  /** The authentication key to use for APNs tokens. */
  TokenKey?: string;
  /** The key identifier that's assigned to your APNs signing key, if you want Amazon Pinpoint to communicate with the APNs sandbox environment by using APNs tokens. */
  TokenKeyId?: string;
}

export interface APNSVoipChannelRequest {
  /** The bundle identifier that's assigned to your iOS app. This identifier is used for APNs tokens. */
  BundleId?: string;
  /** The APNs client certificate that you received from Apple, if you want Amazon Pinpoint to communicate with APNs by using an APNs certificate. */
  Certificate?: string;
  /** The default authentication method that you want Amazon Pinpoint to use when authenticating with APNs, key or certificate. */
  DefaultAuthenticationMethod?: string;
  /** Specifies whether to enable the APNs VoIP channel for the application. */
  Enabled?: boolean;
  /** The private key for the APNs client certificate that you want Amazon Pinpoint to use to communicate with APNs. */
  PrivateKey?: string;
  /** The identifier that's assigned to your Apple developer account team. This identifier is used for APNs tokens. */
  TeamId?: string;
  /** The authentication key to use for APNs tokens. */
  TokenKey?: string;
  /** The key identifier that's assigned to your APNs signing key, if you want Amazon Pinpoint to communicate with APNs by using APNs tokens. */
  TokenKeyId?: string;
}

export interface APNSVoipSandboxChannelRequest {
  /** The bundle identifier that's assigned to your iOS app. This identifier is used for APNs tokens. */
  BundleId?: string;
  /** The APNs client certificate that you received from Apple, if you want Amazon Pinpoint to communicate with the APNs sandbox environment by using an APNs certificate. */
  Certificate?: string;
  /** The default authentication method that you want Amazon Pinpoint to use when authenticating with the APNs sandbox environment for this channel, key or certificate. */
  DefaultAuthenticationMethod?: string;
  /** Specifies whether the APNs VoIP sandbox channel is enabled for the application. */
  Enabled?: boolean;
  /** The private key for the APNs client certificate that you want Amazon Pinpoint to use to communicate with the APNs sandbox environment. */
  PrivateKey?: string;
  /** The identifier that's assigned to your Apple developer account team. This identifier is used for APNs tokens. */
  TeamId?: string;
  /** The authentication key to use for APNs tokens. */
  TokenKey?: string;
  /** The key identifier that's assigned to your APNs signing key, if you want Amazon Pinpoint to communicate with the APNs sandbox environment by using APNs tokens. */
  TokenKeyId?: string;
}

export interface ApplicationSettingsJourneyLimits {
  /** The daily number of messages that an endpoint can receive from all journeys. The maximum value is 100. If set to 0, this limit will not apply. */
  DailyCap?: number;
  /** The default maximum number of messages that can be sent to an endpoint during the specified timeframe for all journeys. */
  TimeframeCap?: any;
  /** The default maximum number of messages that a single journey can sent to a single endpoint. The maximum value is 100. If set to 0, this limit will not apply. */
  TotalCap?: number;
}

export interface WriteApplicationSettingsRequest {
  /** The settings for the AWS Lambda function to invoke by default as a code hook for campaigns in the application. You can use this hook to customize segments that are used by campaigns in the application */
  CampaignHook?: CampaignHook;
  /** Specifies whether to enable application-related alarms in Amazon CloudWatch. */
  CloudWatchMetricsEnabled?: boolean;
  EventTaggingEnabled?: boolean;
  /** The default sending limits for campaigns in the application. To override these limits and define custom limits for a specific campaign or journey, use the Campaign resource or the Journey resource, re */
  Limits?: CampaignLimits;
  /** The default quiet time for campaigns in the application. Quiet time is a specific time range when messages aren't sent to endpoints, if all the following conditions are met: The EndpointDemographic.Ti */
  QuietTime?: QuietTime;
  /** The default sending limits for journeys in the application. These limits apply to each journey for the application but can be overridden, on a per journey basis, with the JourneyLimits resource. */
  JourneyLimits?: ApplicationSettingsJourneyLimits;
}

export interface BaiduChannelRequest {
  /** The API key that you received from the Baidu Cloud Push service to communicate with the service. */
  ApiKey: string;
  /** Specifies whether to enable the Baidu channel for the application. */
  Enabled?: boolean;
  /** The secret key that you received from the Baidu Cloud Push service to communicate with the service. */
  SecretKey: string;
}

export interface EmailChannelRequest {
  /** The Amazon SES configuration set that you want to apply to messages that you send through the channel. */
  ConfigurationSet?: string;
  /** Specifies whether to enable the email channel for the application. */
  Enabled?: boolean;
  /** The verified email address that you want to send email from when you send email through the channel. */
  FromAddress: string;
  /** The Amazon Resource Name (ARN) of the identity, verified with Amazon Simple Email Service (Amazon SES), that you want to use when you send email through the channel. */
  Identity: string;
  /** The ARN of the AWS Identity and Access Management (IAM) role that you want Amazon Pinpoint to use when it submits email-related event data for the channel. */
  RoleArn?: string;
  /** The ARN of an IAM role for Amazon Pinpoint to use to send email from your campaigns or journeys through Amazon SES. */
  OrchestrationSendingRoleArn?: string;
}

export interface EndpointDemographic {
  /** The version of the app that's associated with the endpoint. */
  AppVersion?: string;
  /** The locale of the endpoint, in the following format: the ISO 639-1 alpha-2 code, followed by an underscore (_), followed by an ISO 3166-1 alpha-2 value. */
  Locale?: string;
  /** The manufacturer of the endpoint device, such as apple or samsung. */
  Make?: string;
  /** The model name or number of the endpoint device, such as iPhone or SM-G900F. */
  Model?: string;
  /** The model version of the endpoint device. */
  ModelVersion?: string;
  /** The platform of the endpoint device, such as ios. */
  Platform?: string;
  /** The platform version of the endpoint device. */
  PlatformVersion?: string;
  /** The time zone of the endpoint, specified as a tz database name value, such as America/Los_Angeles. */
  Timezone?: string;
}

export interface EndpointLocation {
  /** The name of the city where the endpoint is located. */
  City?: string;
  /** The two-character code, in ISO 3166-1 alpha-2 format, for the country or region where the endpoint is located. For example, US for the United States. */
  Country?: string;
  /** The latitude coordinate of the endpoint location, rounded to one decimal place. */
  Latitude?: number;
  /** The longitude coordinate of the endpoint location, rounded to one decimal place. */
  Longitude?: number;
  /** The postal or ZIP code for the area where the endpoint is located. */
  PostalCode?: string;
  /** The name of the region where the endpoint is located. For locations in the United States, this value is the name of a state. */
  Region?: string;
}

export interface EndpointUser {
  /** One or more custom attributes that describe the user by associating a name with an array of values. For example, the value of an attribute named Interests might be: ["Science", "Music", "Travel"]. You */
  UserAttributes?: Record<string, any>;
  /** The unique identifier for the user. */
  UserId?: string;
}

export interface EndpointRequest {
  /** The destination address for messages or push notifications that you send to the endpoint. The address varies by channel. For a push-notification channel, use the token provided by the push notificatio */
  Address?: string;
  /** One or more custom attributes that describe the endpoint by associating a name with an array of values. For example, the value of a custom attribute named Interests might be: ["Science", "Music", "Tra */
  Attributes?: Record<string, any[]>;
  /** The channel to use when sending messages or push notifications to the endpoint. */
  ChannelType?: 'PUSH' | 'GCM' | 'APNS' | 'APNS_SANDBOX' | 'APNS_VOIP' | 'APNS_VOIP_SANDBOX' | 'ADM' | 'SMS' | 'VOICE' | 'EMAIL' | 'BAIDU' | 'CUSTOM' | 'IN_APP';
  /** The demographic information for the endpoint, such as the time zone and platform. */
  Demographic?: EndpointDemographic;
  /** The date and time, in ISO 8601 format, when the endpoint is updated. */
  EffectiveDate?: string;
  /** Specifies whether to send messages or push notifications to the endpoint. Valid values are: ACTIVE, messages are sent to the endpoint; and, INACTIVE, messages aren’t sent to the endpoint. Amazon Pinpo */
  EndpointStatus?: string;
  /** The geographic information for the endpoint. */
  Location?: EndpointLocation;
  /** One or more custom metrics that your app reports to Amazon Pinpoint for the endpoint. */
  Metrics?: Record<string, number>;
  /** Specifies whether the user who's associated with the endpoint has opted out of receiving messages and push notifications from you. Possible values are: ALL, the user has opted out and doesn't want to  */
  OptOut?: string;
  /** The unique identifier for the most recent request to update the endpoint. */
  RequestId?: string;
  /** One or more custom attributes that describe the user who's associated with the endpoint. */
  User?: EndpointUser;
}

export interface EndpointBatchRequest {
  /** An array that defines the endpoints to create or update and, for each endpoint, the property values to set or change. An array can contain a maximum of 100 items. */
  Item: any[];
}

export interface GCMChannelRequest {
  /** The Web API Key, also referred to as an API_KEY or server key, that you received from Google to communicate with Google services. */
  ApiKey?: string;
  /** The default authentication method used for GCM. Values are either "TOKEN" or "KEY". Defaults to "KEY". */
  DefaultAuthenticationMethod?: string;
  /** Specifies whether to enable the GCM channel for the application. */
  Enabled?: boolean;
  /** The contents of the JSON file provided by Google during registration in order to generate an access token for authentication. For more information see Migrate from legacy FCM APIs to HTTP v1. */
  ServiceJson?: string;
}

export interface JourneyStateRequest {
  /** The status of the journey. Currently, Supported values are ACTIVE, PAUSED, and CANCELLED If you cancel a journey, Amazon Pinpoint continues to perform activities that are currently in progress, until  */
  State?: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'CLOSED' | 'PAUSED';
}

export interface UpdateRecommenderConfigurationShape {
  /** A map of key-value pairs that defines 1-10 custom endpoint or user attributes, depending on the value for the RecommendationProviderIdType property. Each of these attributes temporarily stores a recom */
  Attributes?: Record<string, string>;
  /** A custom description of the configuration for the recommender model. The description can contain up to 128 characters. The characters can be letters, numbers, spaces, or the following symbols: _ ; ()  */
  Description?: string;
  /** A custom name of the configuration for the recommender model. The name must start with a letter or number and it can contain up to 128 characters. The characters can be letters, numbers, spaces, under */
  Name?: string;
  /** The type of Amazon Pinpoint ID to associate with unique user IDs in the recommender model. This value enables the model to use attribute and event data that’s specific to a particular endpoint or user */
  RecommendationProviderIdType?: string;
  /** The Amazon Resource Name (ARN) of the AWS Identity and Access Management (IAM) role that authorizes Amazon Pinpoint to retrieve recommendation data from the recommender model. */
  RecommendationProviderRoleArn: string;
  /** The Amazon Resource Name (ARN) of the recommender model to retrieve recommendation data from. This value must match the ARN of an Amazon Personalize campaign. */
  RecommendationProviderUri: string;
  /** The name or Amazon Resource Name (ARN) of the AWS Lambda function to invoke for additional processing of recommendation data that's retrieved from the recommender model. */
  RecommendationTransformerUri?: string;
  /** A custom display name for the standard endpoint or user attribute (RecommendationItems) that temporarily stores recommended items for each endpoint or user, depending on the value for the Recommendati */
  RecommendationsDisplayName?: string;
  /** The number of recommended items to retrieve from the model for each endpoint or user, depending on the value for the RecommendationProviderIdType property. This number determines how many recommended  */
  RecommendationsPerMessage?: number;
}

export interface SMSChannelRequest {
  /** Specifies whether to enable the SMS channel for the application. */
  Enabled?: boolean;
  /** The identity that you want to display on recipients' devices when they receive messages from the SMS channel. */
  SenderId?: string;
  /** The registered short code that you want to use when you send messages through the SMS channel. */
  ShortCode?: string;
}

export interface TemplateActiveVersionRequest {
  /** The version of the message template to use as the active version of the template. Valid values are: latest, for the most recent version of the template; or, the unique identifier for any existing vers */
  Version?: string;
}

export interface VoiceChannelRequest {
  /** Specifies whether to enable the voice channel for the application. */
  Enabled?: boolean;
}

export interface VerifyOTPMessageRequestParameters {
  /** The destination identity to send OTP to. */
  DestinationIdentity: string;
  /** The OTP the end user provided for verification. */
  Otp: string;
  /** The reference identifier provided when the OTP was previously sent. */
  ReferenceId: string;
}

export interface CreateAppInput {
  CreateApplicationRequest: CreateApplicationRequest;
}

export interface CreateCampaignInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  WriteCampaignRequest: WriteCampaignRequest;
}

export interface CreateEmailTemplateInput {
  EmailTemplateRequest: EmailTemplateRequest;
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
}

export interface CreateExportJobInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  ExportJobRequest: ExportJobRequest;
}

export interface CreateImportJobInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  ImportJobRequest: ImportJobRequest;
}

export interface CreateInAppTemplateInput {
  InAppTemplateRequest: InAppTemplateRequest;
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
}

export interface CreateJourneyInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  WriteJourneyRequest: WriteJourneyRequest;
}

export interface CreatePushTemplateInput {
  PushNotificationTemplateRequest: PushNotificationTemplateRequest;
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
}

export interface CreateRecommenderConfigurationInput {
  CreateRecommenderConfiguration: CreateRecommenderConfigurationShape;
}

export interface CreateSegmentInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  WriteSegmentRequest: WriteSegmentRequest;
}

export interface CreateSmsTemplateInput {
  SMSTemplateRequest: SMSTemplateRequest;
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
}

export interface CreateVoiceTemplateInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  VoiceTemplateRequest: VoiceTemplateRequest;
}

export interface DeleteAdmChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface DeleteApnsChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface DeleteApnsSandboxChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface DeleteApnsVoipChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface DeleteApnsVoipSandboxChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface DeleteAppInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface DeleteBaiduChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface DeleteCampaignInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the campaign. */
  CampaignId: string;
}

export interface DeleteEmailChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface DeleteEmailTemplateInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface DeleteEndpointInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The case insensitive unique identifier for the endpoint. The identifier can't contain $, { or }. */
  EndpointId: string;
}

export interface DeleteEventStreamInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface DeleteGcmChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface DeleteInAppTemplateInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface DeleteJourneyInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the journey. */
  JourneyId: string;
}

export interface DeletePushTemplateInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface DeleteRecommenderConfigurationInput {
  /** The unique identifier for the recommender model configuration. This identifier is displayed as the Recommender ID on the Amazon Pinpoint console. */
  RecommenderId: string;
}

export interface DeleteSegmentInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the segment. */
  SegmentId: string;
}

export interface DeleteSmsChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface DeleteSmsTemplateInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface DeleteUserEndpointsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the user. */
  UserId: string;
}

export interface DeleteVoiceChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface DeleteVoiceTemplateInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface GetAdmChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetApnsChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetApnsSandboxChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetApnsVoipChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetApnsVoipSandboxChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetAppInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetApplicationDateRangeKpiInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The name of the metric, also referred to as a key performance indicator (KPI), to retrieve data for. This value describes the associated metric and consists of two or more terms, which are comprised o */
  KpiName: string;
  /** The last date and time to retrieve data for, as part of an inclusive date range that filters the query results. This value should be in extended ISO 8601 format and use Coordinated Universal Time (UTC */
  EndTime?: string;
  /** The string that specifies which page of results to return in a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  NextToken?: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The first date and time to retrieve data for, as part of an inclusive date range that filters the query results. This value should be in extended ISO 8601 format and use Coordinated Universal Time (UT */
  StartTime?: string;
}

export interface GetApplicationSettingsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetAppsInput {
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface GetBaiduChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetCampaignInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the campaign. */
  CampaignId: string;
}

export interface GetCampaignActivitiesInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the campaign. */
  CampaignId: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface GetCampaignDateRangeKpiInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the campaign. */
  CampaignId: string;
  /** The name of the metric, also referred to as a key performance indicator (KPI), to retrieve data for. This value describes the associated metric and consists of two or more terms, which are comprised o */
  KpiName: string;
  /** The last date and time to retrieve data for, as part of an inclusive date range that filters the query results. This value should be in extended ISO 8601 format and use Coordinated Universal Time (UTC */
  EndTime?: string;
  /** The string that specifies which page of results to return in a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  NextToken?: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The first date and time to retrieve data for, as part of an inclusive date range that filters the query results. This value should be in extended ISO 8601 format and use Coordinated Universal Time (UT */
  StartTime?: string;
}

export interface GetCampaignsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface GetCampaignVersionInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the campaign. */
  CampaignId: string;
  /** The unique version number (Version property) for the campaign version. */
  Version: string;
}

export interface GetCampaignVersionsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the campaign. */
  CampaignId: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface GetChannelsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetEmailChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetEmailTemplateInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface GetEndpointInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The case insensitive unique identifier for the endpoint. The identifier can't contain $, { or }. */
  EndpointId: string;
}

export interface GetEventStreamInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetExportJobInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the job. */
  JobId: string;
}

export interface GetExportJobsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface GetGcmChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetImportJobInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the job. */
  JobId: string;
}

export interface GetImportJobsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface GetInAppMessagesInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the endpoint. */
  EndpointId: string;
}

export interface GetInAppTemplateInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface GetJourneyInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the journey. */
  JourneyId: string;
}

export interface GetJourneyDateRangeKpiInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the journey. */
  JourneyId: string;
  /** The name of the metric, also referred to as a key performance indicator (KPI), to retrieve data for. This value describes the associated metric and consists of two or more terms, which are comprised o */
  KpiName: string;
  /** The last date and time to retrieve data for, as part of an inclusive date range that filters the query results. This value should be in extended ISO 8601 format and use Coordinated Universal Time (UTC */
  EndTime?: string;
  /** The string that specifies which page of results to return in a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  NextToken?: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The first date and time to retrieve data for, as part of an inclusive date range that filters the query results. This value should be in extended ISO 8601 format and use Coordinated Universal Time (UT */
  StartTime?: string;
}

export interface GetJourneyExecutionActivityMetricsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the journey activity. */
  JourneyActivityId: string;
  /** The unique identifier for the journey. */
  JourneyId: string;
  /** The string that specifies which page of results to return in a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  NextToken?: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
}

export interface GetJourneyExecutionMetricsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the journey. */
  JourneyId: string;
  /** The string that specifies which page of results to return in a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  NextToken?: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
}

export interface GetJourneyRunExecutionActivityMetricsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the journey activity. */
  JourneyActivityId: string;
  /** The unique identifier for the journey. */
  JourneyId: string;
  /** The unique identifier for the journey run. */
  RunId: string;
  /** The string that specifies which page of results to return in a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  NextToken?: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
}

export interface GetJourneyRunExecutionMetricsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the journey. */
  JourneyId: string;
  /** The unique identifier for the journey run. */
  RunId: string;
  /** The string that specifies which page of results to return in a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  NextToken?: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
}

export interface GetJourneyRunsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the journey. */
  JourneyId: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface GetPushTemplateInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface GetRecommenderConfigurationInput {
  /** The unique identifier for the recommender model configuration. This identifier is displayed as the Recommender ID on the Amazon Pinpoint console. */
  RecommenderId: string;
}

export interface GetRecommenderConfigurationsInput {
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface GetSegmentInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the segment. */
  SegmentId: string;
}

export interface GetSegmentExportJobsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the segment. */
  SegmentId: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface GetSegmentImportJobsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the segment. */
  SegmentId: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface GetSegmentsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface GetSegmentVersionInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the segment. */
  SegmentId: string;
  /** The unique version number (Version property) for the campaign version. */
  Version: string;
}

export interface GetSegmentVersionsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the segment. */
  SegmentId: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface GetSmsChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetSmsTemplateInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface GetUserEndpointsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the user. */
  UserId: string;
}

export interface GetVoiceChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface GetVoiceTemplateInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface ListJourneysInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The NextToken string that specifies which page of results to return in a paginated response. */
  Token?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the resource. */
  ResourceArn: string;
}

export interface ListTemplatesInput {
  /** The string that specifies which page of results to return in a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  NextToken?: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
  /** The substring to match in the names of the message templates to include in the results. If you specify this value, Amazon Pinpoint returns only those templates whose names begin with the value that yo */
  Prefix?: string;
  /** The type of message template to include in the results. Valid values are: EMAIL, PUSH, SMS, and VOICE. To include all types of templates in the results, don't include this parameter in your request. */
  TemplateType?: string;
}

export interface ListTemplateVersionsInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** The type of channel that the message template is designed for. Valid values are: EMAIL, PUSH, SMS, and VOICE. */
  TemplateType: string;
  /** The string that specifies which page of results to return in a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  NextToken?: string;
  /** The maximum number of items to include in each page of a paginated response. This parameter is not supported for application, campaign, and journey metrics. */
  PageSize?: string;
}

export interface PhoneNumberValidateInput {
  NumberValidateRequest: NumberValidateRequest;
}

export interface PutEventsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  EventsRequest: EventsRequest;
}

export interface PutEventStreamInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  WriteEventStream: WriteEventStream;
}

export interface RemoveAttributesInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The type of attribute or attributes to remove. Valid values are: endpoint-custom-attributes - Custom attributes that describe endpoints, such as the date when an associated user opted in or out of rec */
  AttributeType: string;
  UpdateAttributesRequest: UpdateAttributesRequest;
}

export interface SendMessagesInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  MessageRequest: MessageRequest;
}

export interface SendOTPMessageInput {
  /** The unique ID of your Amazon Pinpoint application. */
  ApplicationId: string;
  SendOTPMessageRequestParameters: SendOTPMessageRequestParameters;
}

export interface SendUsersMessagesInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  SendUsersMessageRequest: SendUsersMessageRequest;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource. */
  ResourceArn: string;
  TagsModel: TagsModel;
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource. */
  ResourceArn: string;
  /** The key of the tag to remove from the resource. To remove multiple tags, append the tagKeys parameter and argument for each additional tag to remove, separated by an ampersand (&amp;). */
  TagKeys: string[];
}

export interface UpdateAdmChannelInput {
  ADMChannelRequest: ADMChannelRequest;
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface UpdateApnsChannelInput {
  APNSChannelRequest: APNSChannelRequest;
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface UpdateApnsSandboxChannelInput {
  APNSSandboxChannelRequest: APNSSandboxChannelRequest;
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface UpdateApnsVoipChannelInput {
  APNSVoipChannelRequest: APNSVoipChannelRequest;
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface UpdateApnsVoipSandboxChannelInput {
  APNSVoipSandboxChannelRequest: APNSVoipSandboxChannelRequest;
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
}

export interface UpdateApplicationSettingsInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  WriteApplicationSettingsRequest: WriteApplicationSettingsRequest;
}

export interface UpdateBaiduChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  BaiduChannelRequest: BaiduChannelRequest;
}

export interface UpdateCampaignInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the campaign. */
  CampaignId: string;
  WriteCampaignRequest: WriteCampaignRequest;
}

export interface UpdateEmailChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  EmailChannelRequest: EmailChannelRequest;
}

export interface UpdateEmailTemplateInput {
  EmailTemplateRequest: EmailTemplateRequest;
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** Specifies whether to save the updates as a new version of the message template. Valid values are: true, save the updates as a new version; and, false, save the updates to (overwrite) the latest existi */
  CreateNewVersion?: boolean;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface UpdateEndpointInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The case insensitive unique identifier for the endpoint. The identifier can't contain $, { or }. */
  EndpointId: string;
  EndpointRequest: EndpointRequest;
}

export interface UpdateEndpointsBatchInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  EndpointBatchRequest: EndpointBatchRequest;
}

export interface UpdateGcmChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  GCMChannelRequest: GCMChannelRequest;
}

export interface UpdateInAppTemplateInput {
  InAppTemplateRequest: InAppTemplateRequest;
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** Specifies whether to save the updates as a new version of the message template. Valid values are: true, save the updates as a new version; and, false, save the updates to (overwrite) the latest existi */
  CreateNewVersion?: boolean;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface UpdateJourneyInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the journey. */
  JourneyId: string;
  WriteJourneyRequest: WriteJourneyRequest;
}

export interface UpdateJourneyStateInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the journey. */
  JourneyId: string;
  JourneyStateRequest: JourneyStateRequest;
}

export interface UpdatePushTemplateInput {
  PushNotificationTemplateRequest: PushNotificationTemplateRequest;
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** Specifies whether to save the updates as a new version of the message template. Valid values are: true, save the updates as a new version; and, false, save the updates to (overwrite) the latest existi */
  CreateNewVersion?: boolean;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface UpdateRecommenderConfigurationInput {
  /** The unique identifier for the recommender model configuration. This identifier is displayed as the Recommender ID on the Amazon Pinpoint console. */
  RecommenderId: string;
  UpdateRecommenderConfiguration: UpdateRecommenderConfigurationShape;
}

export interface UpdateSegmentInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  /** The unique identifier for the segment. */
  SegmentId: string;
  WriteSegmentRequest: WriteSegmentRequest;
}

export interface UpdateSmsChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  SMSChannelRequest: SMSChannelRequest;
}

export interface UpdateSmsTemplateInput {
  SMSTemplateRequest: SMSTemplateRequest;
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** Specifies whether to save the updates as a new version of the message template. Valid values are: true, save the updates as a new version; and, false, save the updates to (overwrite) the latest existi */
  CreateNewVersion?: boolean;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface UpdateTemplateActiveVersionInput {
  TemplateActiveVersionRequest: TemplateActiveVersionRequest;
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  /** The type of channel that the message template is designed for. Valid values are: EMAIL, PUSH, SMS, and VOICE. */
  TemplateType: string;
}

export interface UpdateVoiceChannelInput {
  /** The unique identifier for the application. This identifier is displayed as the Project ID on the Amazon Pinpoint console. */
  ApplicationId: string;
  VoiceChannelRequest: VoiceChannelRequest;
}

export interface UpdateVoiceTemplateInput {
  /** The name of the message template. A template name must start with an alphanumeric character and can contain a maximum of 128 characters. The characters can be alphanumeric characters, underscores (_), */
  TemplateName: string;
  VoiceTemplateRequest: VoiceTemplateRequest;
  /** Specifies whether to save the updates as a new version of the message template. Valid values are: true, save the updates as a new version; and, false, save the updates to (overwrite) the latest existi */
  CreateNewVersion?: boolean;
  /** The unique identifier for the version of the message template to update, retrieve information about, or delete. To retrieve identifiers and other information for all the versions of a template, use th */
  Version?: string;
}

export interface VerifyOTPMessageInput {
  /** The unique ID of your Amazon Pinpoint application. */
  ApplicationId: string;
  VerifyOTPMessageRequestParameters: VerifyOTPMessageRequestParameters;
}

/** Pinpoint service binding for Step Functions SDK integrations. */
export class Pinpoint {
  constructor() {}

  createApp<T>(params: CreateAppInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCampaign<T>(params: CreateCampaignInput): Promise<T> {
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

  createInAppTemplate<T>(params: CreateInAppTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createJourney<T>(params: CreateJourneyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPushTemplate<T>(params: CreatePushTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRecommenderConfiguration<T>(params: CreateRecommenderConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSegment<T>(params: CreateSegmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSmsTemplate<T>(params: CreateSmsTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVoiceTemplate<T>(params: CreateVoiceTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAdmChannel<T>(params: DeleteAdmChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApnsChannel<T>(params: DeleteApnsChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApnsSandboxChannel<T>(params: DeleteApnsSandboxChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApnsVoipChannel<T>(params: DeleteApnsVoipChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApnsVoipSandboxChannel<T>(params: DeleteApnsVoipSandboxChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApp<T>(params: DeleteAppInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteBaiduChannel<T>(params: DeleteBaiduChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCampaign<T>(params: DeleteCampaignInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEmailChannel<T>(params: DeleteEmailChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEmailTemplate<T>(params: DeleteEmailTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEndpoint<T>(params: DeleteEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEventStream<T>(params: DeleteEventStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteGcmChannel<T>(params: DeleteGcmChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteInAppTemplate<T>(params: DeleteInAppTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteJourney<T>(params: DeleteJourneyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePushTemplate<T>(params: DeletePushTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRecommenderConfiguration<T>(params: DeleteRecommenderConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSegment<T>(params: DeleteSegmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSmsChannel<T>(params: DeleteSmsChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSmsTemplate<T>(params: DeleteSmsTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUserEndpoints<T>(params: DeleteUserEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVoiceChannel<T>(params: DeleteVoiceChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVoiceTemplate<T>(params: DeleteVoiceTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAdmChannel<T>(params: GetAdmChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApnsChannel<T>(params: GetApnsChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApnsSandboxChannel<T>(params: GetApnsSandboxChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApnsVoipChannel<T>(params: GetApnsVoipChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApnsVoipSandboxChannel<T>(params: GetApnsVoipSandboxChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApp<T>(params: GetAppInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApplicationDateRangeKpi<T>(params: GetApplicationDateRangeKpiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApplicationSettings<T>(params: GetApplicationSettingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApps<T>(params: GetAppsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getBaiduChannel<T>(params: GetBaiduChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCampaign<T>(params: GetCampaignInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCampaignActivities<T>(params: GetCampaignActivitiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCampaignDateRangeKpi<T>(params: GetCampaignDateRangeKpiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCampaigns<T>(params: GetCampaignsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCampaignVersion<T>(params: GetCampaignVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCampaignVersions<T>(params: GetCampaignVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getChannels<T>(params: GetChannelsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEmailChannel<T>(params: GetEmailChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEmailTemplate<T>(params: GetEmailTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEndpoint<T>(params: GetEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEventStream<T>(params: GetEventStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getExportJob<T>(params: GetExportJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getExportJobs<T>(params: GetExportJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getGcmChannel<T>(params: GetGcmChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getImportJob<T>(params: GetImportJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getImportJobs<T>(params: GetImportJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getInAppMessages<T>(params: GetInAppMessagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getInAppTemplate<T>(params: GetInAppTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJourney<T>(params: GetJourneyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJourneyDateRangeKpi<T>(params: GetJourneyDateRangeKpiInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJourneyExecutionActivityMetrics<T>(params: GetJourneyExecutionActivityMetricsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJourneyExecutionMetrics<T>(params: GetJourneyExecutionMetricsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJourneyRunExecutionActivityMetrics<T>(params: GetJourneyRunExecutionActivityMetricsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJourneyRunExecutionMetrics<T>(params: GetJourneyRunExecutionMetricsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJourneyRuns<T>(params: GetJourneyRunsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPushTemplate<T>(params: GetPushTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRecommenderConfiguration<T>(params: GetRecommenderConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRecommenderConfigurations<T>(params: GetRecommenderConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSegment<T>(params: GetSegmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSegmentExportJobs<T>(params: GetSegmentExportJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSegmentImportJobs<T>(params: GetSegmentImportJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSegments<T>(params: GetSegmentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSegmentVersion<T>(params: GetSegmentVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSegmentVersions<T>(params: GetSegmentVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSmsChannel<T>(params: GetSmsChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSmsTemplate<T>(params: GetSmsTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getUserEndpoints<T>(params: GetUserEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVoiceChannel<T>(params: GetVoiceChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVoiceTemplate<T>(params: GetVoiceTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listJourneys<T>(params: ListJourneysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTemplates<T>(params: ListTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTemplateVersions<T>(params: ListTemplateVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  phoneNumberValidate<T>(params: PhoneNumberValidateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putEvents<T>(params: PutEventsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putEventStream<T>(params: PutEventStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeAttributes<T>(params: RemoveAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendMessages<T>(params: SendMessagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendOTPMessage<T>(params: SendOTPMessageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendUsersMessages<T>(params: SendUsersMessagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAdmChannel<T>(params: UpdateAdmChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApnsChannel<T>(params: UpdateApnsChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApnsSandboxChannel<T>(params: UpdateApnsSandboxChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApnsVoipChannel<T>(params: UpdateApnsVoipChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApnsVoipSandboxChannel<T>(params: UpdateApnsVoipSandboxChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApplicationSettings<T>(params: UpdateApplicationSettingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateBaiduChannel<T>(params: UpdateBaiduChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateCampaign<T>(params: UpdateCampaignInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEmailChannel<T>(params: UpdateEmailChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEmailTemplate<T>(params: UpdateEmailTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEndpoint<T>(params: UpdateEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEndpointsBatch<T>(params: UpdateEndpointsBatchInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateGcmChannel<T>(params: UpdateGcmChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateInAppTemplate<T>(params: UpdateInAppTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateJourney<T>(params: UpdateJourneyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateJourneyState<T>(params: UpdateJourneyStateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePushTemplate<T>(params: UpdatePushTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRecommenderConfiguration<T>(params: UpdateRecommenderConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSegment<T>(params: UpdateSegmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSmsChannel<T>(params: UpdateSmsChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSmsTemplate<T>(params: UpdateSmsTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTemplateActiveVersion<T>(params: UpdateTemplateActiveVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateVoiceChannel<T>(params: UpdateVoiceChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateVoiceTemplate<T>(params: UpdateVoiceTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  verifyOTPMessage<T>(params: VerifyOTPMessageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
