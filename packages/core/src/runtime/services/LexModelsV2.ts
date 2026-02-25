// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface NewCustomVocabularyItem {
  /** The unique phrase for the new custom vocabulary item from the custom vocabulary list. */
  phrase: string;
  /** The weight assigned to the new custom vocabulary item from the custom vocabulary list. */
  weight?: number;
  /** The display as value assigned to the new custom vocabulary item from the custom vocabulary list. */
  displayAs?: string;
}

export interface CustomVocabularyEntryId {
  /** The unique item identifier for the custom vocabulary items. */
  itemId: string;
}

export interface CustomVocabularyItem {
  /** The unique item identifer for the custom vocabulary item from the custom vocabulary list. */
  itemId: string;
  /** The unique phrase for the custom vocabulary item from the custom vocabulary list. */
  phrase: string;
  /** The weight assigned for the custom vocabulary item from the custom vocabulary list. */
  weight?: number;
  /** The DisplayAs value for the custom vocabulary item from the custom vocabulary list. */
  displayAs?: string;
}

export interface DataPrivacy {
  /** For each Amazon Lex bot created with the Amazon Lex Model Building Service, you must specify whether your use of Amazon Lex is related to a website, program, or other application that is directed or t */
  childDirected: boolean;
}

export interface BotMember {
  /** The unique ID of a bot that is a member of this network of bots. */
  botMemberId: string;
  /** The unique name of a bot that is a member of this network of bots. */
  botMemberName: string;
  /** The alias ID of a bot that is a member of this network of bots. */
  botMemberAliasId: string;
  /** The alias name of a bot that is a member of this network of bots. */
  botMemberAliasName: string;
  /** The version of a bot that is a member of this network of bots. */
  botMemberVersion: string;
}

export interface ErrorLogSettings {
  /** Settings parameters for the error logs, when it is enabled. */
  enabled: boolean;
}

export interface BotAliasLocaleSettings {
  /** Determines whether the locale is enabled for the bot. If the value is false, the locale isn't available for use. */
  enabled: boolean;
  /** Specifies the Lambda function that should be used in the locale. */
  codeHookSpecification?: any;
}

export interface ConversationLogSettings {
  /** The Amazon CloudWatch Logs settings for logging text and metadata. */
  textLogSettings?: any[];
  /** The Amazon S3 settings for logging audio to an S3 bucket. */
  audioLogSettings?: any[];
}

export interface SentimentAnalysisSettings {
  /** Sets whether Amazon Lex uses Amazon Comprehend to detect the sentiment of user utterances. */
  detectSentiment: boolean;
}

export interface VoiceSettings {
  /** Indicates the type of Amazon Polly voice that Amazon Lex should use for voice interaction with the user. For more information, see the engine parameter of the SynthesizeSpeech operation in the Amazon  */
  engine?: 'standard' | 'neural' | 'long-form' | 'generative';
  /** The identifier of the Amazon Polly voice to use. */
  voiceId: string;
}

export interface SpeechFoundationModel {
  /** The Amazon Resource Name (ARN) of the foundation model used for speech processing. */
  modelArn: string;
  /** The identifier of the voice to use for speech synthesis with the foundation model. */
  voiceId?: string;
}

export interface UnifiedSpeechSettings {
  /** The foundation model configuration to use for unified speech processing capabilities. */
  speechFoundationModel: SpeechFoundationModel;
}

export interface SpeechModelConfig {
  /** Configuration settings for using Deepgram as the speech-to-text provider. */
  deepgramConfig?: any;
}

export interface SpeechRecognitionSettings {
  /** The speech-to-text model to use. */
  speechModelPreference?: 'Standard' | 'Neural' | 'Deepgram';
  /** Configuration settings for the selected speech-to-text model. */
  speechModelConfig?: SpeechModelConfig;
}

export interface RuntimeSettings {
  /** An object containing specifications for the assisted slot resolution feature. */
  slotResolutionImprovement?: any;
  /** An object containing specifications for the Assisted NLU feature within the bot's runtime settings. These settings determine how the bot processes and interprets user utterances during conversations. */
  nluImprovement?: any;
}

export interface BuildtimeSettings {
  /** An object containing specifications for the descriptive bot building feature. */
  descriptiveBotBuilder?: any;
  /** Contains specifications for the sample utterance generation feature. */
  sampleUtteranceGeneration?: any;
}

export interface GenerativeAISettings {
  runtimeSettings?: RuntimeSettings;
  buildtimeSettings?: BuildtimeSettings;
}

export interface BotVersionLocaleDetails {
  /** The version of a bot used for a bot locale. */
  sourceBotVersion: string;
}

export interface BotExportSpecification {
  /** The identifier of the bot assigned by Amazon Lex. */
  botId: string;
  /** The version of the bot that was exported. This will be either DRAFT or the version number. */
  botVersion: string;
}

export interface BotLocaleExportSpecification {
  /** The identifier of the bot to create the locale for. */
  botId: string;
  /** The version of the bot to export. */
  botVersion: string;
  /** The identifier of the language and locale to export. The string must match one of the locales in the bot. */
  localeId: string;
}

export interface CustomVocabularyExportSpecification {
  /** The identifier of the bot that contains the custom vocabulary to export. */
  botId: string;
  /** The version of the bot that contains the custom vocabulary to export. */
  botVersion: string;
  /** The locale of the bot that contains the custom vocabulary to export. */
  localeId: string;
}

export interface TestSetExportSpecification {
  /** The unique identifier of the test set. */
  testSetId: string;
}

export interface ExportResourceSpecification {
  /** Parameters for exporting a bot. */
  botExportSpecification?: BotExportSpecification;
  /** Parameters for exporting a bot locale. */
  botLocaleExportSpecification?: BotLocaleExportSpecification;
  /** The parameters required to export a custom vocabulary. */
  customVocabularyExportSpecification?: CustomVocabularyExportSpecification;
  /** Specifications for the test set that is exported as a resource. */
  testSetExportSpecification?: TestSetExportSpecification;
}

export interface SampleUtterance {
  /** The sample utterance that Amazon Lex uses to build its machine-learning model to recognize intents. */
  utterance: string;
}

export interface DialogCodeHookSettings {
  /** Enables the dialog code hook so that it processes user requests. */
  enabled: boolean;
}

export interface PostFulfillmentStatusSpecification {
  successResponse?: any;
  failureResponse?: any;
  timeoutResponse?: any;
  /** Specifies the next step in the conversation that Amazon Lex invokes when the fulfillment code hook completes successfully. */
  successNextStep?: any;
  /** A list of conditional branches to evaluate after the fulfillment code hook finishes successfully. */
  successConditional?: any;
  /** Specifies the next step the bot runs after the fulfillment code hook throws an exception or returns with the State field of the Intent object set to Failed. */
  failureNextStep?: any;
  /** A list of conditional branches to evaluate after the fulfillment code hook throws an exception or returns with the State field of the Intent object set to Failed. */
  failureConditional?: any;
  /** Specifies the next step that the bot runs when the fulfillment code hook times out. */
  timeoutNextStep?: any;
  /** A list of conditional branches to evaluate if the fulfillment code hook times out. */
  timeoutConditional?: any;
}

export interface FulfillmentUpdatesSpecification {
  /** Determines whether fulfillment updates are sent to the user. When this field is true, updates are sent. If the active field is set to true, the startResponse, updateResponse, and timeoutInSeconds fiel */
  active: boolean;
  /** Provides configuration information for the message sent to users when the fulfillment Lambda functions starts running. */
  startResponse?: any;
  /** Provides configuration information for messages sent periodically to the user while the fulfillment Lambda function is running. */
  updateResponse?: any;
  /** The length of time that the fulfillment Lambda function should run before it times out. */
  timeoutInSeconds?: number;
}

export interface FulfillmentCodeHookSettings {
  /** Indicates whether a Lambda function should be invoked to fulfill a specific intent. */
  enabled: boolean;
  /** Provides settings for messages sent to the user for after the Lambda fulfillment function completes. Post-fulfillment messages can be sent for both streaming and non-streaming conversations. */
  postFulfillmentStatusSpecification?: PostFulfillmentStatusSpecification;
  /** Provides settings for update messages sent to the user for long-running Lambda fulfillment functions. Fulfillment updates can be used only with streaming conversations. */
  fulfillmentUpdatesSpecification?: FulfillmentUpdatesSpecification;
  /** Determines whether the fulfillment code hook is used. When active is false, the code hook doesn't run. */
  active?: boolean;
}

export interface PromptSpecification {
  /** A collection of messages that Amazon Lex can send to the user. Amazon Lex chooses the actual message to send at runtime. */
  messageGroups: any[];
  /** The maximum number of times the bot tries to elicit a response from the user using this prompt. */
  maxRetries: number;
  /** Indicates whether the user can interrupt a speech prompt from the bot. */
  allowInterrupt?: boolean;
  /** Indicates how a message is selected from a message group among retries. */
  messageSelectionStrategy?: 'Random' | 'Ordered';
  /** Specifies the advanced settings on each attempt of the prompt. */
  promptAttemptsSpecification?: Record<string, any>;
}

export interface ResponseSpecification {
  /** A collection of responses that Amazon Lex can send to the user. Amazon Lex chooses the actual response to send at runtime. */
  messageGroups: any[];
  /** Indicates whether the user can interrupt a speech response from Amazon Lex. */
  allowInterrupt?: boolean;
}

export interface DialogState {
  dialogAction?: any;
  intent?: any;
  /** Map of key/value pairs representing session-specific context information. It contains application information passed between Amazon Lex and a client application. */
  sessionAttributes?: Record<string, any>;
}

export interface ConditionalSpecification {
  /** Determines whether a conditional branch is active. When active is false, the conditions are not evaluated. */
  active: boolean;
  /** A list of conditional branches. A conditional branch is made up of a condition, a response and a next step. The response and next step are executed when the condition is true. */
  conditionalBranches: any[];
  /** The conditional branch that should be followed when the conditions for other branches are not satisfied. A conditional branch is made up of a condition, a response and a next step. */
  defaultBranch: any;
}

export interface DialogCodeHookInvocationSetting {
  /** Indicates whether a Lambda function should be invoked for the dialog. */
  enableCodeHookInvocation: boolean;
  /** Determines whether a dialog code hook is used when the intent is activated. */
  active: boolean;
  /** A label that indicates the dialog step from which the dialog code hook is happening. */
  invocationLabel?: string;
  /** Contains the responses and actions that Amazon Lex takes after the Lambda function is complete. */
  postCodeHookSpecification: any;
}

export interface ElicitationCodeHookInvocationSetting {
  /** Indicates whether a Lambda function should be invoked for the dialog. */
  enableCodeHookInvocation: boolean;
  /** A label that indicates the dialog step from which the dialog code hook is happening. */
  invocationLabel?: string;
}

export interface IntentConfirmationSetting {
  /** Prompts the user to confirm the intent. This question should have a yes or no answer. Amazon Lex uses this prompt to ensure that the user acknowledges that the intent is ready for fulfillment. For exa */
  promptSpecification: PromptSpecification;
  /** When the user answers "no" to the question defined in promptSpecification, Amazon Lex responds with this response to acknowledge that the intent was canceled. */
  declinationResponse?: ResponseSpecification;
  /** Specifies whether the intent's confirmation is sent to the user. When this field is false, confirmation and declination responses aren't sent. If the active field isn't specified, the default is true. */
  active?: boolean;
  confirmationResponse?: ResponseSpecification;
  /** Specifies the next step that the bot executes when the customer confirms the intent. */
  confirmationNextStep?: DialogState;
  /** A list of conditional branches to evaluate after the intent is closed. */
  confirmationConditional?: ConditionalSpecification;
  /** Specifies the next step that the bot executes when the customer declines the intent. */
  declinationNextStep?: DialogState;
  /** A list of conditional branches to evaluate after the intent is declined. */
  declinationConditional?: ConditionalSpecification;
  failureResponse?: ResponseSpecification;
  /** The next step to take in the conversation if the confirmation step fails. */
  failureNextStep?: DialogState;
  failureConditional?: ConditionalSpecification;
  /** The DialogCodeHookInvocationSetting object associated with intent's confirmation step. The dialog code hook is triggered based on these invocation settings when the confirmation next step or declinati */
  codeHook?: DialogCodeHookInvocationSetting;
  /** The DialogCodeHookInvocationSetting used when the code hook is invoked during confirmation prompt retries. */
  elicitationCodeHook?: ElicitationCodeHookInvocationSetting;
}

export interface IntentClosingSetting {
  /** The response that Amazon Lex sends to the user when the intent is complete. */
  closingResponse?: ResponseSpecification;
  /** Specifies whether an intent's closing response is used. When this field is false, the closing response isn't sent to the user. If the active field isn't specified, the default is true. */
  active?: boolean;
  /** Specifies the next step that the bot executes after playing the intent's closing response. */
  nextStep?: DialogState;
  /** A list of conditional branches associated with the intent's closing response. These branches are executed when the nextStep attribute is set to EvalutateConditional. */
  conditional?: ConditionalSpecification;
}

export interface InputContext {
  /** The name of the context. */
  name: string;
}

export interface OutputContext {
  /** The name of the output context. */
  name: string;
  /** The amount of time, in seconds, that the output context should remain active. The time is figured from the first time the context is sent to the user. */
  timeToLiveInSeconds: number;
  /** The number of conversation turns that the output context should remain active. The number of turns is counted from the first time that the context is sent to the user. */
  turnsToLive: number;
}

export interface KendraConfiguration {
  /** The Amazon Resource Name (ARN) of the Amazon Kendra index that you want the AMAZON.KendraSearchIntent intent to search. The index must be in the same account and Region as the Amazon Lex bot. */
  kendraIndex: string;
  /** Determines whether the AMAZON.KendraSearchIntent intent uses a custom query string to query the Amazon Kendra index. */
  queryFilterStringEnabled?: boolean;
  /** A query filter that Amazon Lex sends to Amazon Kendra to filter the response from a query. The filter is in the format defined by Amazon Kendra. For more information, see Filtering queries. */
  queryFilterString?: string;
}

export interface InitialResponseSetting {
  initialResponse?: ResponseSpecification;
  /** The next step in the conversation. */
  nextStep?: DialogState;
  conditional?: ConditionalSpecification;
  codeHook?: DialogCodeHookInvocationSetting;
}

export interface DataSourceConfiguration {
  /** Contains details about the configuration of the Amazon OpenSearch Service database used for the AMAZON.QnAIntent. To create a domain, follow the steps at Creating and managing Amazon OpenSearch Servic */
  opensearchConfiguration?: any;
  /** Contains details about the configuration of the Amazon Kendra index used for the AMAZON.QnAIntent. To create a Amazon Kendra index, follow the steps at Creating an index. */
  kendraConfiguration?: any;
  /** Contains details about the configuration of the Amazon Bedrock knowledge base used for the AMAZON.QnAIntent. To set up a knowledge base, follow the steps at Building a knowledge base. */
  bedrockKnowledgeStoreConfiguration?: any;
}

export interface BedrockModelSpecification {
  /** The ARN of the foundation model used in descriptive bot building. */
  modelArn: string;
  /** The guardrail configuration in the Bedrock model specification details. */
  guardrail?: any;
  /** The Bedrock trace status in the Bedrock model specification details. */
  traceStatus?: 'ENABLED' | 'DISABLED';
  /** The custom prompt used in the Bedrock model specification details. */
  customPrompt?: string;
}

export interface QnAIntentConfiguration {
  /** Contains details about the configuration of the data source used for the AMAZON.QnAIntent. */
  dataSourceConfiguration?: DataSourceConfiguration;
  bedrockModelConfiguration?: BedrockModelSpecification;
}

export interface QInConnectAssistantConfiguration {
  /** The assistant Arn details of the Qinconnect assistant configuration. */
  assistantArn: string;
}

export interface QInConnectIntentConfiguration {
  /** The Qinconnect assistant configuration details of the Qinconnect intent. */
  qInConnectAssistantConfiguration?: QInConnectAssistantConfiguration;
}

export interface Principal {
  /** The name of the Amazon Web Services service that should allowed or denied access to an Amazon Lex action. */
  service?: string;
  /** The Amazon Resource Name (ARN) of the principal. */
  arn?: string;
}

export interface SlotDefaultValueSpecification {
  /** A list of default values. Amazon Lex chooses the default value to use in the order that they are presented in the list. */
  defaultValueList: any[];
}

export interface WaitAndContinueSpecification {
  /** The response that Amazon Lex sends to indicate that the bot is waiting for the conversation to continue. */
  waitingResponse: any;
  /** The response that Amazon Lex sends to indicate that the bot is ready to continue the conversation. */
  continueResponse: any;
  /** A response that Amazon Lex sends periodically to the user to indicate that the bot is still waiting for input from the user. */
  stillWaitingResponse?: any;
  /** Specifies whether the bot will wait for a user to respond. When this field is false, wait and continue responses for a slot aren't used. If the active field isn't specified, the default is true. */
  active?: boolean;
}

export interface SlotCaptureSetting {
  captureResponse?: any;
  /** Specifies the next step that the bot runs when the slot value is captured before the code hook times out. */
  captureNextStep?: any;
  /** A list of conditional branches to evaluate after the slot value is captured. */
  captureConditional?: any;
  failureResponse?: any;
  /** Specifies the next step that the bot runs when the slot value code is not recognized. */
  failureNextStep?: any;
  /** A list of conditional branches to evaluate when the slot value isn't captured. */
  failureConditional?: any;
  /** Code hook called after Amazon Lex successfully captures a slot value. */
  codeHook?: any;
  /** Code hook called when Amazon Lex doesn't capture a slot value. */
  elicitationCodeHook?: any;
}

export interface SlotResolutionSetting {
  /** Specifies whether assisted slot resolution is turned on for the slot or not. If the value is EnhancedFallback, assisted slot resolution is activated when Amazon Lex defaults to the AMAZON.FallbackInte */
  slotResolutionStrategy: 'EnhancedFallback' | 'Default';
}

export interface SlotValueElicitationSetting {
  /** A list of default values for a slot. Default values are used when Amazon Lex hasn't determined a value for a slot. You can specify default values from context variables, session attributes, and define */
  defaultValueSpecification?: SlotDefaultValueSpecification;
  /** Specifies whether the slot is required or optional. */
  slotConstraint: 'Required' | 'Optional';
  /** The prompt that Amazon Lex uses to elicit the slot value from the user. */
  promptSpecification?: PromptSpecification;
  /** If you know a specific pattern that users might respond to an Amazon Lex request for a slot value, you can provide those utterances to improve accuracy. This is optional. In most cases, Amazon Lex is  */
  sampleUtterances?: any[];
  waitAndContinueSpecification?: WaitAndContinueSpecification;
  /** Specifies the settings that Amazon Lex uses when a slot value is successfully entered by a user. */
  slotCaptureSetting?: SlotCaptureSetting;
  /** An object containing information about whether assisted slot resolution is turned on for the slot or not. */
  slotResolutionSetting?: SlotResolutionSetting;
}

export interface ObfuscationSetting {
  /** Value that determines whether Amazon Lex obscures slot values in conversation logs. The default is to obscure the values. */
  obfuscationSettingType: 'None' | 'DefaultObfuscation';
}

export interface MultipleValuesSetting {
  /** Indicates whether a slot can return multiple values. When true, the slot may return more than one value in a response. When false, the slot returns only a single value. Multi-value slots are only avai */
  allowMultipleValues?: boolean;
}

export interface SubSlotSetting {
  /** The expression text for defining the constituent sub slots in the composite slot using logical AND and OR operators. */
  expression?: string;
  /** Specifications for the constituent sub slots of a composite slot. */
  slotSpecifications?: Record<string, any>;
}

export interface SlotTypeValue {
  /** The value of the slot type entry. */
  sampleValue?: any;
  /** Additional values related to the slot type entry. */
  synonyms?: any[];
}

export interface SlotValueRegexFilter {
  /** A regular expression used to validate the value of a slot. Use a standard regular expression. Amazon Lex supports the following characters in the regular expression: A-Z, a-z 0-9 Unicode characters (" */
  pattern: string;
}

export interface AdvancedRecognitionSetting {
  /** Enables using the slot values as a custom vocabulary for recognizing user utterances. */
  audioRecognitionStrategy?: 'UseSlotValuesAsCustomVocabulary';
}

export interface SlotValueSelectionSetting {
  /** Determines the slot resolution strategy that Amazon Lex uses to return slot type values. The field can be set to one of the following values: ORIGINAL_VALUE - Returns the value entered by the user, if */
  resolutionStrategy: 'OriginalValue' | 'TopResolution' | 'Concatenation';
  /** A regular expression used to validate the value of a slot. */
  regexFilter?: SlotValueRegexFilter;
  /** Provides settings that enable advanced recognition settings for slot values. You can use this to enable using slot values as a custom vocabulary for recognizing user utterances. */
  advancedRecognitionSetting?: AdvancedRecognitionSetting;
}

export interface GrammarSlotTypeSetting {
  /** The source of the grammar used to create the slot type. */
  source?: any;
}

export interface ExternalSourceSetting {
  /** Settings required for a slot type based on a grammar that you provide. */
  grammarSlotTypeSetting?: GrammarSlotTypeSetting;
}

export interface CompositeSlotTypeSetting {
  /** Subslots in the composite slot. */
  subSlots?: any[];
}

export interface TestSetDiscrepancyReportBotAliasTarget {
  /** The unique identifier for the bot alias. */
  botId: string;
  /** The unique identifier for the bot associated with the bot alias. */
  botAliasId: string;
  /** The unique identifier of the locale associated with the bot alias. */
  localeId: string;
}

export interface TestSetDiscrepancyReportResourceTarget {
  /** Contains information about the bot alias used as the resource for the test set discrepancy report. */
  botAliasTarget?: TestSetDiscrepancyReportBotAliasTarget;
}

export interface RelativeAggregationDuration {
  /** The type of time period that the timeValue field represents. */
  timeDimension: 'Hours' | 'Days' | 'Weeks';
  /** The period of the time window to gather statistics for. The valid value depends on the setting of the timeDimension field. Hours - 1/3/6/12/24 Days - 3 Weeks - 1/2 */
  timeValue: number;
}

export interface UtteranceAggregationDuration {
  /** The desired time window for aggregating utterances. */
  relativeAggregationDuration: RelativeAggregationDuration;
}

export interface AggregatedUtterancesSortBy {
  /** The utterance attribute to sort by. */
  attribute: 'HitCount' | 'MissedCount';
  /** Specifies whether to sort the aggregated utterances in ascending or descending order. */
  order: 'Ascending' | 'Descending';
}

export interface AggregatedUtterancesFilter {
  /** The name of the field to filter the utterance list. */
  name: 'Utterance';
  /** The value to use for filtering the list of bots. */
  values: any[];
  /** The operator to use for the filter. Specify EQ when the ListAggregatedUtterances operation should return only utterances that equal the specified value. Specify CO when the ListAggregatedUtterances op */
  operator: 'CO' | 'EQ';
}

export interface BotLocaleSortBy {
  /** The bot locale attribute to sort by. */
  attribute: 'BotLocaleName';
  /** Specifies whether to sort the bot locales in ascending or descending order. */
  order: 'Ascending' | 'Descending';
}

export interface BotLocaleFilter {
  /** The name of the field to filter the list of bots. */
  name: 'BotLocaleName';
  /** The value to use for filtering the list of bots. */
  values: any[];
  /** The operator to use for the filter. Specify EQ when the ListBotLocales operation should return only aliases that equal the specified value. Specify CO when the ListBotLocales operation should return a */
  operator: 'CO' | 'EQ';
}

export interface GenerationSortBy {
  /** The attribute by which to sort the generation request information. You can sort by the following attributes. creationStartTime – The time at which the generation request was created. lastUpdatedTime – */
  attribute: 'creationStartTime' | 'lastUpdatedTime';
  /** The order by which to sort the generation request information. */
  order: 'Ascending' | 'Descending';
}

export interface BotSortBy {
  /** The attribute to use to sort the list of bots. */
  attribute: 'BotName';
  /** The order to sort the list. You can choose ascending or descending. */
  order: 'Ascending' | 'Descending';
}

export interface BotFilter {
  /** The name of the field to filter the list of bots. */
  name: 'BotName' | 'BotType';
  /** The value to use for filtering the list of bots. */
  values: any[];
  /** The operator to use for the filter. Specify EQ when the ListBots operation should return only aliases that equal the specified value. Specify CO when the ListBots operation should return aliases that  */
  operator: 'CO' | 'EQ' | 'NE';
}

export interface BotVersionReplicaSortBy {
  /** The attribute of the sort category for the version replicated bots. */
  attribute: 'BotVersion';
  /** The order of the sort category for the version replicated bots. */
  order: 'Ascending' | 'Descending';
}

export interface BotVersionSortBy {
  /** The attribute to use to sort the list of versions. */
  attribute: 'BotVersion';
  /** The order to sort the list. You can specify ascending or descending order. */
  order: 'Ascending' | 'Descending';
}

export interface BuiltInIntentSortBy {
  /** The attribute to use to sort the list of built-in intents. */
  attribute: 'IntentSignature';
  /** The order to sort the list. You can specify ascending or descending order. */
  order: 'Ascending' | 'Descending';
}

export interface BuiltInSlotTypeSortBy {
  /** The attribute to use to sort the list of built-in intents. */
  attribute: 'SlotTypeSignature';
  /** The order to sort the list. You can choose ascending or descending. */
  order: 'Ascending' | 'Descending';
}

export interface ExportSortBy {
  /** The export field to use for sorting. */
  attribute: 'LastUpdatedDateTime';
  /** The order to sort the list. */
  order: 'Ascending' | 'Descending';
}

export interface ExportFilter {
  /** The name of the field to use for filtering. */
  name: 'ExportResourceType';
  /** The values to use to filter the response. The values must be Bot, BotLocale, or CustomVocabulary. */
  values: any[];
  /** The operator to use for the filter. Specify EQ when the ListExports operation should return only resource types that equal the specified value. Specify CO when the ListExports operation should return  */
  operator: 'CO' | 'EQ';
}

export interface ImportSortBy {
  /** The export field to use for sorting. */
  attribute: 'LastUpdatedDateTime';
  /** The order to sort the list. */
  order: 'Ascending' | 'Descending';
}

export interface ImportFilter {
  /** The name of the field to use for filtering. */
  name: 'ImportResourceType';
  /** The values to use to filter the response. The values must be Bot, BotLocale, or CustomVocabulary. */
  values: any[];
  /** The operator to use for the filter. Specify EQ when the ListImports operation should return only resource types that equal the specified value. Specify CO when the ListImports operation should return  */
  operator: 'CO' | 'EQ';
}

export interface AnalyticsIntentMetric {
  /** The metric for which you want to get intent summary statistics. Count – The number of times the intent was invoked. Success – The number of times the intent succeeded. Failure – The number of times th */
  name: 'Count' | 'Success' | 'Failure' | 'Switched' | 'Dropped';
  /** The summary statistic to calculate. Sum – The total count for the category you provide in name. Average – The total count divided by the number of intents in the category you provide in name. Max – Th */
  statistic: 'Sum' | 'Avg' | 'Max';
  /** Specifies whether to sort the results in ascending or descending order. */
  order?: 'Ascending' | 'Descending';
}

export interface AnalyticsBinBySpecification {
  /** Specifies the time metric by which to bin the analytics data. */
  name: 'ConversationStartTime' | 'UtteranceTimestamp';
  /** Specifies the interval of time by which to bin the analytics data. */
  interval: 'OneHour' | 'OneDay';
  /** Specifies whether to bin the analytics data in ascending or descending order. If this field is left blank, the default order is by the key of the bin in descending order. */
  order?: 'Ascending' | 'Descending';
}

export interface AnalyticsIntentGroupBySpecification {
  /** Specifies whether to group the intent stages by their name or their end state. */
  name: 'IntentName' | 'IntentEndState' | 'IntentLevel';
}

export interface AnalyticsIntentFilter {
  /** The category by which to filter the intents. The descriptions for each option are as follows: BotAlias – The name of the bot alias. BotVersion – The version of the bot. LocaleId – The locale of the bo */
  name: 'BotAliasId' | 'BotVersion' | 'LocaleId' | 'Modality' | 'Channel' | 'SessionId' | 'OriginatingRequestId' | 'IntentName' | 'IntentEndState';
  /** The operation by which to filter the category. The following operations are possible: CO – Contains EQ – Equals GT – Greater than LT – Less than The operators that each filter supports are listed belo */
  operator: 'EQ' | 'GT' | 'LT';
  /** An array containing the values of the category by which to apply the operator to filter the results. You can provide multiple values if the operator is EQ or CO. If you provide multiple values, you fi */
  values: any[];
}

export interface AnalyticsPathFilter {
  /** The category by which to filter the intent paths. The descriptions for each option are as follows: BotAlias – The name of the bot alias. BotVersion – The version of the bot. LocaleId – The locale of t */
  name: 'BotAliasId' | 'BotVersion' | 'LocaleId' | 'Modality' | 'Channel';
  /** The operation by which to filter the category. The following operations are possible: CO – Contains EQ – Equals GT – Greater than LT – Less than The operators that each filter supports are listed belo */
  operator: 'EQ' | 'GT' | 'LT';
  /** An array containing the values of the category by which to apply the operator to filter the results. You can provide multiple values if the operator is EQ or CO. If you provide multiple values, you fi */
  values: any[];
}

export interface IntentSortBy {
  /** The attribute to use to sort the list of intents. */
  attribute: 'IntentName' | 'LastUpdatedDateTime';
  /** The order to sort the list. You can choose ascending or descending. */
  order: 'Ascending' | 'Descending';
}

export interface IntentFilter {
  /** The name of the field to use for the filter. */
  name: 'IntentName';
  /** The value to use for the filter. */
  values: any[];
  /** The operator to use for the filter. Specify EQ when the ListIntents operation should return only aliases that equal the specified value. Specify CO when the ListIntents operation should return aliases */
  operator: 'CO' | 'EQ';
}

export interface AnalyticsIntentStageMetric {
  /** The metric for which you want to get intent stage summary statistics. See Key definitions for more details about these metrics. Count – The number of times the intent stage occurred. Success – The num */
  name: 'Count' | 'Success' | 'Failed' | 'Dropped' | 'Retry';
  /** The summary statistic to calculate. Sum – The total count for the category you provide in name. Average – The total count divided by the number of intent stages in the category you provide in name. Ma */
  statistic: 'Sum' | 'Avg' | 'Max';
  /** Specifies whether to sort the results in ascending or descending order of the summary statistic (value in the response). */
  order?: 'Ascending' | 'Descending';
}

export interface AnalyticsIntentStageGroupBySpecification {
  /** Specifies whether to group the intent stages by their name or the intent to which the session was switched. */
  name: 'IntentStageName' | 'SwitchedToIntent';
}

export interface AnalyticsIntentStageFilter {
  /** The category by which to filter the intent stages. The descriptions for each option are as follows: BotAlias – The name of the bot alias. BotVersion – The version of the bot. LocaleId – The locale of  */
  name: 'BotAliasId' | 'BotVersion' | 'LocaleId' | 'Modality' | 'Channel' | 'SessionId' | 'OriginatingRequestId' | 'IntentName' | 'IntentStageName';
  /** The operation by which to filter the category. The following operations are possible: CO – Contains EQ – Equals GT – Greater than LT – Less than The operators that each filter supports are listed belo */
  operator: 'EQ' | 'GT' | 'LT';
  /** An array containing the values of the category by which to apply the operator to filter the results. You can provide multiple values if the operator is EQ or CO. If you provide multiple values, you fi */
  values: any[];
}

export interface SessionDataSortBy {
  /** The measure by which to sort the session analytics data. conversationStartTime – The date and time when the conversation began. A conversation is defined as a unique combination of a sessionId and an  */
  name: 'ConversationStartTime' | 'NumberOfTurns' | 'Duration';
  /** Specifies whether to sort the results in ascending or descending order. */
  order: 'Ascending' | 'Descending';
}

export interface AnalyticsSessionFilter {
  /** The category by which to filter the sessions. The descriptions for each option are as follows: BotAlias – The name of the bot alias. BotVersion – The version of the bot. LocaleId – The locale of the b */
  name: 'BotAliasId' | 'BotVersion' | 'LocaleId' | 'Modality' | 'Channel' | 'Duration' | 'ConversationEndState' | 'SessionId' | 'OriginatingRequestId' | 'IntentPath';
  /** The operation by which to filter the category. The following operations are possible: CO – Contains EQ – Equals GT – Greater than LT – Less than The operators that each filter supports are listed belo */
  operator: 'EQ' | 'GT' | 'LT';
  /** An array containing the values of the category by which to apply the operator to filter the results. You can provide multiple values if the operator is EQ or CO. If you provide multiple values, you fi */
  values: any[];
}

export interface AnalyticsSessionMetric {
  /** The metric for which you want to get session summary statistics. Count – The number of sessions. Success – The number of sessions that succeeded. Failure – The number of sessions that failed. Dropped  */
  name: 'Count' | 'Success' | 'Failure' | 'Dropped' | 'Duration' | 'TurnsPerConversation' | 'Concurrency';
  /** The summary statistic to calculate. Sum – The total count for the category you provide in name. Average – The total count divided by the number of sessions in the category you provide in name. Max – T */
  statistic: 'Sum' | 'Avg' | 'Max';
  /** Specifies whether to sort the results in ascending or descending order. */
  order?: 'Ascending' | 'Descending';
}

export interface AnalyticsSessionGroupBySpecification {
  /** Specifies whether to group the session by their end state or their locale. */
  name: 'ConversationEndState' | 'LocaleId';
}

export interface SlotSortBy {
  /** The attribute to use to sort the list. */
  attribute: 'SlotName' | 'LastUpdatedDateTime';
  /** The order to sort the list. You can choose ascending or descending. */
  order: 'Ascending' | 'Descending';
}

export interface SlotFilter {
  /** The name of the field to use for filtering. */
  name: 'SlotName';
  /** The value to use to filter the response. */
  values: any[];
  /** The operator to use for the filter. Specify EQ when the ListSlots operation should return only aliases that equal the specified value. Specify CO when the ListSlots operation should return aliases tha */
  operator: 'CO' | 'EQ';
}

export interface SlotTypeSortBy {
  /** The attribute to use to sort the list of slot types. */
  attribute: 'SlotTypeName' | 'LastUpdatedDateTime';
  /** The order to sort the list. You can say ascending or descending. */
  order: 'Ascending' | 'Descending';
}

export interface SlotTypeFilter {
  /** The name of the field to use for filtering. */
  name: 'SlotTypeName' | 'ExternalSourceType';
  /** The value to use to filter the response. */
  values: any[];
  /** The operator to use for the filter. Specify EQ when the ListSlotTypes operation should return only aliases that equal the specified value. Specify CO when the ListSlotTypes operation should return ali */
  operator: 'CO' | 'EQ';
}

export interface ConversationLevelTestResultsFilterBy {
  /** The selection of matched or mismatched end-to-end status to filter test set results data at the conversation level. */
  endToEndResult?: 'Matched' | 'Mismatched' | 'ExecutionError';
}

export interface TestExecutionResultFilterBy {
  /** Specifies which results to filter. See Test result details">Test results details for details about different types of results. */
  resultTypeFilter: 'OverallTestResults' | 'ConversationLevelTestResults' | 'IntentClassificationTestResults' | 'SlotResolutionTestResults' | 'UtteranceLevelResults';
  /** Contains information about the method for filtering Conversation level test results. */
  conversationLevelTestResultsFilterBy?: ConversationLevelTestResultsFilterBy;
}

export interface TestExecutionSortBy {
  /** Specifies whether to sort the test set executions by the date and time at which the test sets were created. */
  attribute: 'TestSetName' | 'CreationDateTime';
  /** Specifies whether to sort in ascending or descending order. */
  order: 'Ascending' | 'Descending';
}

export interface TestSetSortBy {
  /** Specifies whether to sort the test sets by name or by the time they were last updated. */
  attribute: 'TestSetName' | 'LastUpdatedDateTime';
  /** Specifies whether to sort in ascending or descending order. */
  order: 'Ascending' | 'Descending';
}

export interface UtteranceDataSortBy {
  /** The measure by which to sort the utterance analytics data. Count – The number of utterances. UtteranceTimestamp – The date and time of the utterance. */
  name: 'UtteranceTimestamp';
  /** Specifies whether to sort the results in ascending or descending order. */
  order: 'Ascending' | 'Descending';
}

export interface AnalyticsUtteranceFilter {
  /** The category by which to filter the utterances. The descriptions for each option are as follows: BotAlias – The name of the bot alias. BotVersion – The version of the bot. LocaleId – The locale of the */
  name: 'BotAliasId' | 'BotVersion' | 'LocaleId' | 'Modality' | 'Channel' | 'SessionId' | 'OriginatingRequestId' | 'UtteranceState' | 'UtteranceText';
  /** The operation by which to filter the category. The following operations are possible: CO – Contains EQ – Equals GT – Greater than LT – Less than The operators that each filter supports are listed belo */
  operator: 'EQ' | 'GT' | 'LT';
  /** An array containing the values of the category by which to apply the operator to filter the results. You can provide multiple values if the operator is EQ or CO. If you provide multiple values, you fi */
  values: any[];
}

export interface AnalyticsUtteranceMetric {
  /** The metric for which you want to get utterance summary statistics. Count – The number of utterances. Missed – The number of utterances that Amazon Lex failed to recognize. Detected – The number of utt */
  name: 'Count' | 'Missed' | 'Detected' | 'UtteranceTimestamp';
  /** The summary statistic to calculate. Sum – The total count for the category you provide in name. Average – The total count divided by the number of utterances in the category you provide in name. Max – */
  statistic: 'Sum' | 'Avg' | 'Max';
  /** Specifies whether to sort the results in ascending or descending order. */
  order?: 'Ascending' | 'Descending';
}

export interface AnalyticsUtteranceGroupBySpecification {
  /** Specifies whether to group the utterances by their text or their state. */
  name: 'UtteranceText' | 'UtteranceState';
}

export interface AnalyticsUtteranceAttribute {
  /** An attribute to return. The only available attribute is the intent that the bot mapped the utterance to. */
  name: 'LastUsedIntent';
}

export interface AssociatedTranscriptFilter {
  /** The name of the field to use for filtering. The allowed names are IntentId and SlotTypeId. */
  name: 'IntentId' | 'SlotTypeId';
  /** The values to use to filter the transcript. */
  values: any[];
}

export interface S3BucketTranscriptSource {
  /** The name of the bucket containing the transcript and the associated metadata. */
  s3BucketName: string;
  /** The object that contains a path format that will be applied when Amazon Lex reads the transcript file in the bucket you provide. Specify this object if you only want Lex to read a subset of files in y */
  pathFormat?: any;
  /** The format of the transcript content. Currently, Genie only supports the Amazon Lex transcript format. */
  transcriptFormat: 'Lex';
  /** The object that contains the filter which will be applied when Amazon Lex reads through the Amazon S3 bucket. Specify this object if you want Amazon Lex to read only a subset of the Amazon S3 bucket b */
  transcriptFilter?: any;
  /** The ARN of the KMS key that customer use to encrypt their Amazon S3 bucket. Only use this field if your bucket is encrypted using a customer managed KMS key. */
  kmsKeyArn?: string;
}

export interface TranscriptSourceSetting {
  /** Indicates the setting of the Amazon S3 bucket where the transcript is stored. */
  s3BucketTranscriptSource?: S3BucketTranscriptSource;
}

export interface EncryptionSetting {
  /** The KMS key ARN used to encrypt the metadata associated with the bot recommendation. */
  kmsKeyArn?: string;
  /** The password used to encrypt the recommended bot recommendation file. */
  botLocaleExportPassword?: string;
  /** The password used to encrypt the associated transcript file. */
  associatedTranscriptsPassword?: string;
}

export interface BotImportSpecification {
  /** The name that Amazon Lex should use for the bot. */
  botName: string;
  /** The Amazon Resource Name (ARN) of the IAM role used to build and run the bot. */
  roleArn: string;
  dataPrivacy: any;
  /** Allows you to configure destinations where error logs will be published during the bot import process. */
  errorLogSettings?: any;
  /** The time, in seconds, that Amazon Lex should keep information about a user's conversation with the bot. A user interaction remains active for the amount of time specified. If no conversation occurs du */
  idleSessionTTLInSeconds?: number;
  /** A list of tags to add to the bot. You can only add tags when you import a bot. You can't use the UpdateBot operation to update tags. To update tags, use the TagResource operation. */
  botTags?: Record<string, any>;
  /** A list of tags to add to the test alias for a bot. You can only add tags when you import a bot. You can't use the UpdateAlias operation to update tags. To update tags on the test alias, use the TagRes */
  testBotAliasTags?: Record<string, any>;
}

export interface BotLocaleImportSpecification {
  /** The identifier of the bot to import the locale to. */
  botId: string;
  /** The version of the bot to import the locale to. This can only be the DRAFT version of the bot. */
  botVersion: string;
  /** The identifier of the language and locale that the bot will be used in. The string must match one of the supported locales. All of the intents, slot types, and slots used in the bot must have the same */
  localeId: string;
  /** Determines the threshold where Amazon Lex will insert the AMAZON.FallbackIntent, AMAZON.KendraSearchIntent, or both when returning alternative intents. AMAZON.FallbackIntent and AMAZON.KendraSearchInt */
  nluIntentConfidenceThreshold?: number;
  voiceSettings?: any;
  /** Speech-to-text settings to apply when importing the bot locale configuration. */
  speechRecognitionSettings?: any;
  /** The sensitivity level for voice activity detection (VAD) in the bot locale. This setting helps optimize speech recognition accuracy by adjusting how the system responds to background noise during voic */
  speechDetectionSensitivity?: 'Default' | 'HighNoiseTolerance' | 'MaximumNoiseTolerance';
  /** Unified speech settings to apply when importing the bot locale configuration. */
  unifiedSpeechSettings?: any;
}

export interface CustomVocabularyImportSpecification {
  /** The identifier of the bot to import the custom vocabulary to. */
  botId: string;
  /** The version of the bot to import the custom vocabulary to. */
  botVersion: string;
  /** The identifier of the local to import the custom vocabulary to. The value must be en_GB. */
  localeId: string;
}

export interface TestSetImportResourceSpecification {
  /** The name of the test set. */
  testSetName: string;
  /** The description of the test set. */
  description?: string;
  /** The Amazon Resource Name (ARN) of an IAM role that has permission to access the test set. */
  roleArn: string;
  /** Contains information about the location that Amazon Lex uses to store the test-set. */
  storageLocation: any;
  /** Contains information about the input location from where test-set should be imported. */
  importInputLocation: any;
  /** Specifies whether the test-set being imported contains written or spoken data. */
  modality: 'Text' | 'Audio';
  /** A list of tags to add to the test set. You can only add tags when you import/generate a new test set. You can't use the UpdateTestSet operation to update tags. To update tags, use the TagResource oper */
  testSetTags?: Record<string, any>;
}

export interface ImportResourceSpecification {
  /** Parameters for importing a bot. */
  botImportSpecification?: BotImportSpecification;
  /** Parameters for importing a bot locale. */
  botLocaleImportSpecification?: BotLocaleImportSpecification;
  customVocabularyImportSpecification?: CustomVocabularyImportSpecification;
  /** Specifications for the test set that is imported. */
  testSetImportResourceSpecification?: TestSetImportResourceSpecification;
}

export interface BotAliasTestExecutionTarget {
  /** The bot Id of the bot alias used in the test set execution. */
  botId: string;
  /** The bot alias Id of the bot alias used in the test set execution. */
  botAliasId: string;
  /** The locale Id of the bot alias used in the test set execution. */
  localeId: string;
}

export interface TestExecutionTarget {
  /** Contains information about the bot alias used for the test execution. */
  botAliasTarget?: BotAliasTestExecutionTarget;
}

export interface TestSetStorageLocation {
  /** The name of the Amazon S3 bucket in which the test set is stored. */
  s3BucketName: string;
  /** The path inside the Amazon S3 bucket where the test set is stored. */
  s3Path: string;
  /** The Amazon Resource Name (ARN) of an Amazon Web Services Key Management Service (KMS) key for encrypting the test set. */
  kmsKeyArn?: string;
}

export interface ConversationLogsDataSource {
  /** The bot Id from the conversation logs. */
  botId: string;
  /** The bot alias Id from the conversation logs. */
  botAliasId: string;
  /** The locale Id of the conversation log. */
  localeId: string;
  /** The filter for the data source of the conversation log. */
  filter: any;
}

export interface TestSetGenerationDataSource {
  /** Contains information about the bot from which the conversation logs are sourced. */
  conversationLogsDataSource?: ConversationLogsDataSource;
}

export interface SlotPriority {
  /** The priority that Amazon Lex should apply to the slot. */
  priority: number;
  /** The unique identifier of the slot. */
  slotId: string;
}

export interface BatchCreateCustomVocabularyItemInput {
  /** The identifier of the bot associated with this custom vocabulary. */
  botId: string;
  /** The identifier of the version of the bot associated with this custom vocabulary. */
  botVersion: string;
  /** A list of new custom vocabulary items. Each entry must contain a phrase and can optionally contain a displayAs and/or a weight. */
  customVocabularyItemList: NewCustomVocabularyItem[];
  /** The identifier of the language and locale where this custom vocabulary is used. The string must match one of the supported locales. For more information, see Supported Languages . */
  localeId: string;
}

export interface BatchDeleteCustomVocabularyItemInput {
  /** The identifier of the bot associated with this custom vocabulary. */
  botId: string;
  /** The identifier of the version of the bot associated with this custom vocabulary. */
  botVersion: string;
  /** A list of custom vocabulary items requested to be deleted. Each entry must contain the unique custom vocabulary entry identifier. */
  customVocabularyItemList: CustomVocabularyEntryId[];
  /** The identifier of the language and locale where this custom vocabulary is used. The string must match one of the supported locales. For more information, see Supported Languages . */
  localeId: string;
}

export interface BatchUpdateCustomVocabularyItemInput {
  /** The identifier of the bot associated with this custom vocabulary */
  botId: string;
  /** The identifier of the version of the bot associated with this custom vocabulary. */
  botVersion: string;
  /** A list of custom vocabulary items with updated fields. Each entry must contain a phrase and can optionally contain a displayAs and/or a weight. */
  customVocabularyItemList: CustomVocabularyItem[];
  /** The identifier of the language and locale where this custom vocabulary is used. The string must match one of the supported locales. For more information, see Supported Languages . */
  localeId: string;
}

export interface BuildBotLocaleInput {
  /** The identifier of the bot to build. The identifier is returned in the response from the CreateBot operation. */
  botId: string;
  /** The version of the bot to build. This can only be the draft version of the bot. */
  botVersion: string;
  /** The identifier of the language and locale that the bot will be used in. The string must match one of the supported locales. All of the intents, slot types, and slots used in the bot must have the same */
  localeId: string;
}

export interface CreateBotInput {
  /** The name of the bot. The bot name must be unique in the account that creates the bot. */
  botName: string;
  /** Provides information on additional privacy protections Amazon Lex should use with the bot's data. */
  dataPrivacy: DataPrivacy;
  /** The time, in seconds, that Amazon Lex should keep information about a user's conversation with the bot. A user interaction remains active for the amount of time specified. If no conversation occurs du */
  idleSessionTTLInSeconds: number;
  /** The Amazon Resource Name (ARN) of an IAM role that has permission to access the bot. */
  roleArn: string;
  /** The list of bot members in a network to be created. */
  botMembers?: BotMember[];
  /** A list of tags to add to the bot. You can only add tags when you create a bot. You can't use the UpdateBot operation to update tags. To update tags, use the TagResource operation. */
  botTags?: Record<string, string>;
  /** The type of a bot to create. */
  botType?: 'Bot' | 'BotNetwork';
  /** A description of the bot. It appears in lists to help you identify a particular bot. */
  description?: string;
  /** Specifies the configuration for error logging during bot creation. */
  errorLogSettings?: ErrorLogSettings;
  /** A list of tags to add to the test alias for a bot. You can only add tags when you create a bot. You can't use the UpdateAlias operation to update tags. To update tags on the test alias, use the TagRes */
  testBotAliasTags?: Record<string, string>;
}

export interface CreateBotAliasInput {
  /** The alias to create. The name must be unique for the bot. */
  botAliasName: string;
  /** The unique identifier of the bot that the alias applies to. */
  botId: string;
  /** Maps configuration information to a specific locale. You can use this parameter to specify a specific Lambda function to run different functions in different locales. */
  botAliasLocaleSettings?: Record<string, BotAliasLocaleSettings>;
  /** The version of the bot that this alias points to. You can use the UpdateBotAlias operation to change the bot version associated with the alias. */
  botVersion?: string;
  /** Specifies whether Amazon Lex logs text and audio for a conversation with the bot. When you enable conversation logs, text logs store text input, transcripts of audio input, and associated metadata in  */
  conversationLogSettings?: ConversationLogSettings;
  /** A description of the alias. Use this description to help identify the alias. */
  description?: string;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
  /** A list of tags to add to the bot alias. You can only add tags when you create an alias, you can't use the UpdateBotAlias operation to update the tags on a bot alias. To update tags, use the TagResourc */
  tags?: Record<string, string>;
}

export interface CreateBotLocaleInput {
  /** The identifier of the bot to create the locale for. */
  botId: string;
  /** The version of the bot to create the locale for. This can only be the draft version of the bot. */
  botVersion: string;
  /** The identifier of the language and locale that the bot will be used in. The string must match one of the supported locales. All of the intents, slot types, and slots used in the bot must have the same */
  localeId: string;
  /** Determines the threshold where Amazon Lex will insert the AMAZON.FallbackIntent, AMAZON.KendraSearchIntent, or both when returning alternative intents. AMAZON.FallbackIntent and AMAZON.KendraSearchInt */
  nluIntentConfidenceThreshold: number;
  /** A description of the bot locale. Use this to help identify the bot locale in lists. */
  description?: string;
  generativeAISettings?: GenerativeAISettings;
  /** The sensitivity level for voice activity detection (VAD) in the bot locale. This setting helps optimize speech recognition accuracy by adjusting how the system responds to background noise during voic */
  speechDetectionSensitivity?: 'Default' | 'HighNoiseTolerance' | 'MaximumNoiseTolerance';
  /** Speech-to-text settings to configure for the new bot locale. */
  speechRecognitionSettings?: SpeechRecognitionSettings;
  /** Unified speech settings to configure for the new bot locale. */
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  /** The Amazon Polly voice ID that Amazon Lex uses for voice interaction with the user. */
  voiceSettings?: VoiceSettings;
}

export interface CreateBotReplicaInput {
  /** The request for the unique bot ID of the source bot to be replicated in the secondary region. */
  botId: string;
  /** The request for the secondary region that will be used in the replication of the source bot. */
  replicaRegion: string;
}

export interface CreateBotVersionInput {
  /** The identifier of the bot to create the version for. */
  botId: string;
  /** Specifies the locales that Amazon Lex adds to this version. You can choose the Draft version or any other previously published version for each locale. When you specify a source version, the locale da */
  botVersionLocaleSpecification: Record<string, BotVersionLocaleDetails>;
  /** A description of the version. Use the description to help identify the version in lists. */
  description?: string;
}

export interface CreateExportInput {
  /** The file format of the bot or bot locale definition files. */
  fileFormat: 'LexJson' | 'TSV' | 'CSV';
  /** Specifies the type of resource to export, either a bot or a bot locale. You can only specify one type of resource to export. */
  resourceSpecification: ExportResourceSpecification;
  /** An password to use to encrypt the exported archive. Using a password is optional, but you should encrypt the archive to protect the data in transit between Amazon Lex and your local computer. */
  filePassword?: string;
}

export interface CreateIntentInput {
  /** The identifier of the bot associated with this intent. */
  botId: string;
  /** The version of the bot associated with this intent. */
  botVersion: string;
  /** The name of the intent. Intent names must be unique in the locale that contains the intent and cannot match the name of any built-in intent. */
  intentName: string;
  /** The identifier of the language and locale where this intent is used. All of the bots, slot types, and slots used by the intent must have the same locale. For more information, see Supported languages. */
  localeId: string;
  /** A description of the intent. Use the description to help identify the intent in lists. */
  description?: string;
  /** Specifies that Amazon Lex invokes the alias Lambda function for each user input. You can invoke this Lambda function to personalize user interaction. For example, suppose that your bot determines that */
  dialogCodeHook?: DialogCodeHookSettings;
  /** Specifies that Amazon Lex invokes the alias Lambda function when the intent is ready for fulfillment. You can invoke this function to complete the bot's transaction with the user. For example, in a pi */
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  /** Configuration settings for the response that is sent to the user at the beginning of a conversation, before eliciting slot values. */
  initialResponseSetting?: InitialResponseSetting;
  /** A list of contexts that must be active for this intent to be considered by Amazon Lex. When an intent has an input context list, Amazon Lex only considers using the intent in an interaction with the u */
  inputContexts?: InputContext[];
  /** Sets the response that Amazon Lex sends to the user when the intent is closed. */
  intentClosingSetting?: IntentClosingSetting;
  /** Provides prompts that Amazon Lex sends to the user to confirm the completion of an intent. If the user answers "no," the settings contain a statement that is sent to the user to end the intent. */
  intentConfirmationSetting?: IntentConfirmationSetting;
  /** A display name for the intent. If configured, This name will be shown to users during Intent Disambiguation instead of the intent name. Display names should be user-friendly, descriptive and match the */
  intentDisplayName?: string;
  /** Configuration information required to use the AMAZON.KendraSearchIntent intent to connect to an Amazon Kendra index. The AMAZON.KendraSearchIntent intent is called when Amazon Lex can't determine anot */
  kendraConfiguration?: KendraConfiguration;
  /** A lists of contexts that the intent activates when it is fulfilled. You can use an output context to indicate the intents that Amazon Lex should consider for the next turn of the conversation with a c */
  outputContexts?: OutputContext[];
  /** A unique identifier for the built-in intent to base this intent on. */
  parentIntentSignature?: string;
  /** Qinconnect intent configuration details for the create intent request. */
  qInConnectIntentConfiguration?: QInConnectIntentConfiguration;
  /** Specifies the configuration of the built-in Amazon.QnAIntent. The AMAZON.QnAIntent intent is called when Amazon Lex can't determine another intent to invoke. If you specify this field, you can't speci */
  qnAIntentConfiguration?: QnAIntentConfiguration;
  /** An array of strings that a user might say to signal the intent. For example, "I want a pizza", or "I want a {PizzaSize} pizza". In an utterance, slot names are enclosed in curly braces ("{", "}") to i */
  sampleUtterances?: SampleUtterance[];
}

export interface CreateResourcePolicyInput {
  /** A resource policy to add to the resource. The policy is a JSON structure that contains one or more statements that define the policy. The policy must follow the IAM syntax. For more information about  */
  policy: string;
  /** The Amazon Resource Name (ARN) of the bot or bot alias that the resource policy is attached to. */
  resourceArn: string;
}

export interface CreateResourcePolicyStatementInput {
  /** The Amazon Lex action that this policy either allows or denies. The action must apply to the resource type of the specified ARN. For more information, see Actions, resources, and condition keys for Am */
  action: string[];
  /** Determines whether the statement allows or denies access to the resource. */
  effect: 'Allow' | 'Deny';
  /** An IAM principal, such as an IAM user, IAM role, or Amazon Web Services services that is allowed or denied access to a resource. For more information, see Amazon Web Services JSON policy elements: Pri */
  principal: Principal[];
  /** The Amazon Resource Name (ARN) of the bot or bot alias that the resource policy is attached to. */
  resourceArn: string;
  /** The name of the statement. The ID is the same as the Sid IAM property. The statement name must be unique within the policy. For more information, see IAM JSON policy elements: Sid. */
  statementId: string;
  /** Specifies a condition when the policy is in effect. If the principal of the policy is a service principal, you must provide two condition blocks, one with a SourceAccount global condition key and one  */
  condition?: Record<string, Record<string, string>>;
  /** The identifier of the revision of the policy to edit. If this revision ID doesn't match the current revision ID, Amazon Lex throws an exception. If you don't specify a revision, Amazon Lex overwrites  */
  expectedRevisionId?: string;
}

export interface CreateSlotInput {
  /** The identifier of the bot associated with the slot. */
  botId: string;
  /** The version of the bot associated with the slot. */
  botVersion: string;
  /** The identifier of the intent that contains the slot. */
  intentId: string;
  /** The identifier of the language and locale that the slot will be used in. The string must match one of the supported locales. All of the bots, intents, slot types used by the slot must have the same lo */
  localeId: string;
  /** The name of the slot. Slot names must be unique within the bot that contains the slot. */
  slotName: string;
  /** Specifies prompts that Amazon Lex sends to the user to elicit a response that provides the value for the slot. */
  valueElicitationSetting: SlotValueElicitationSetting;
  /** A description of the slot. Use this to help identify the slot in lists. */
  description?: string;
  /** Indicates whether the slot returns multiple values in one response. Multi-value slots are only available in the en-US locale. If you set this value to true in any other locale, Amazon Lex throws a Val */
  multipleValuesSetting?: MultipleValuesSetting;
  /** Determines how slot values are used in Amazon CloudWatch logs. If the value of the obfuscationSetting parameter is DefaultObfuscation, slot values are obfuscated in the log output. If the value is Non */
  obfuscationSetting?: ObfuscationSetting;
  /** The unique identifier for the slot type associated with this slot. The slot type determines the values that can be entered into the slot. */
  slotTypeId?: string;
  /** Specifications for the constituent sub slots and the expression for the composite slot. */
  subSlotSetting?: SubSlotSetting;
}

export interface CreateSlotTypeInput {
  /** The identifier of the bot associated with this slot type. */
  botId: string;
  /** The identifier of the bot version associated with this slot type. */
  botVersion: string;
  /** The identifier of the language and locale that the slot type will be used in. The string must match one of the supported locales. All of the bots, intents, and slots used by the slot type must have th */
  localeId: string;
  /** The name for the slot. A slot type name must be unique within the intent. */
  slotTypeName: string;
  /** Specifications for a composite slot type. */
  compositeSlotTypeSetting?: CompositeSlotTypeSetting;
  /** A description of the slot type. Use the description to help identify the slot type in lists. */
  description?: string;
  /** Sets the type of external information used to create the slot type. */
  externalSourceSetting?: ExternalSourceSetting;
  /** The built-in slot type used as a parent of this slot type. When you define a parent slot type, the new slot type has the configuration of the parent slot type. Only AMAZON.AlphaNumeric is supported. */
  parentSlotTypeSignature?: string;
  /** A list of SlotTypeValue objects that defines the values that the slot type can take. Each value can have a list of synonyms, additional values that help train the machine learning model about the valu */
  slotTypeValues?: SlotTypeValue[];
  /** Determines the strategy that Amazon Lex uses to select a value from the list of possible values. The field can be set to one of the following values: ORIGINAL_VALUE - Returns the value entered by the  */
  valueSelectionSetting?: SlotValueSelectionSetting;
}

export interface CreateTestSetDiscrepancyReportInput {
  /** The target bot for the test set discrepancy report. */
  target: TestSetDiscrepancyReportResourceTarget;
  /** The test set Id for the test set discrepancy report. */
  testSetId: string;
}

export interface DeleteBotInput {
  /** The identifier of the bot to delete. */
  botId: string;
  /** By default, Amazon Lex checks if any other resource, such as an alias or bot network, is using the bot version before it is deleted and throws a ResourceInUseException exception if the bot is being us */
  skipResourceInUseCheck?: boolean;
}

export interface DeleteBotAliasInput {
  /** The unique identifier of the bot alias to delete. */
  botAliasId: string;
  /** The unique identifier of the bot associated with the alias to delete. */
  botId: string;
  /** By default, Amazon Lex checks if any other resource, such as a bot network, is using the bot alias before it is deleted and throws a ResourceInUseException exception if the alias is being used by anot */
  skipResourceInUseCheck?: boolean;
}

export interface DeleteBotLocaleInput {
  /** The unique identifier of the bot that contains the locale. */
  botId: string;
  /** The version of the bot that contains the locale. */
  botVersion: string;
  /** The identifier of the language and locale that will be deleted. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
}

export interface DeleteBotReplicaInput {
  /** The unique ID of the replicated bot to be deleted from the secondary region */
  botId: string;
  /** The secondary region of the replicated bot that will be deleted. */
  replicaRegion: string;
}

export interface DeleteBotVersionInput {
  /** The identifier of the bot that contains the version. */
  botId: string;
  /** The version of the bot to delete. */
  botVersion: string;
  /** By default, Amazon Lex checks if any other resource, such as an alias or bot network, is using the bot version before it is deleted and throws a ResourceInUseException exception if the version is bein */
  skipResourceInUseCheck?: boolean;
}

export interface DeleteCustomVocabularyInput {
  /** The unique identifier of the bot to remove the custom vocabulary from. */
  botId: string;
  /** The version of the bot to remove the custom vocabulary from. */
  botVersion: string;
  /** The locale identifier for the locale that contains the custom vocabulary to remove. */
  localeId: string;
}

export interface DeleteExportInput {
  /** The unique identifier of the export to delete. */
  exportId: string;
}

export interface DeleteImportInput {
  /** The unique identifier of the import to delete. */
  importId: string;
}

export interface DeleteIntentInput {
  /** The identifier of the bot associated with the intent. */
  botId: string;
  /** The version of the bot associated with the intent. */
  botVersion: string;
  /** The unique identifier of the intent to delete. */
  intentId: string;
  /** The identifier of the language and locale where the bot will be deleted. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
}

export interface DeleteResourcePolicyInput {
  /** The Amazon Resource Name (ARN) of the bot or bot alias that has the resource policy attached. */
  resourceArn: string;
  /** The identifier of the revision to edit. If this ID doesn't match the current revision number, Amazon Lex returns an exception If you don't specify a revision ID, Amazon Lex will delete the current pol */
  expectedRevisionId?: string;
}

export interface DeleteResourcePolicyStatementInput {
  /** The Amazon Resource Name (ARN) of the bot or bot alias that the resource policy is attached to. */
  resourceArn: string;
  /** The name of the statement (SID) to delete from the policy. */
  statementId: string;
  /** The identifier of the revision of the policy to delete the statement from. If this revision ID doesn't match the current revision ID, Amazon Lex throws an exception. If you don't specify a revision, A */
  expectedRevisionId?: string;
}

export interface DeleteSlotInput {
  /** The identifier of the bot associated with the slot to delete. */
  botId: string;
  /** The version of the bot associated with the slot to delete. */
  botVersion: string;
  /** The identifier of the intent associated with the slot. */
  intentId: string;
  /** The identifier of the language and locale that the slot will be deleted from. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** The identifier of the slot to delete. */
  slotId: string;
}

export interface DeleteSlotTypeInput {
  /** The identifier of the bot associated with the slot type. */
  botId: string;
  /** The version of the bot associated with the slot type. */
  botVersion: string;
  /** The identifier of the language and locale that the slot type will be deleted from. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** The identifier of the slot type to delete. */
  slotTypeId: string;
  /** By default, the DeleteSlotType operations throws a ResourceInUseException exception if you try to delete a slot type used by a slot. Set the skipResourceInUseCheck parameter to true to skip this check */
  skipResourceInUseCheck?: boolean;
}

export interface DeleteTestSetInput {
  /** The test set Id of the test set to be deleted. */
  testSetId: string;
}

export interface DeleteUtterancesInput {
  /** The unique identifier of the bot that contains the utterances. */
  botId: string;
  /** The identifier of the language and locale where the utterances were collected. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId?: string;
  /** The unique identifier of the session with the user. The ID is returned in the response from the RecognizeText and RecognizeUtterance operations. */
  sessionId?: string;
}

export interface DescribeBotInput {
  /** The unique identifier of the bot to describe. */
  botId: string;
}

export interface DescribeBotAliasInput {
  /** The identifier of the bot alias to describe. */
  botAliasId: string;
  /** The identifier of the bot associated with the bot alias to describe. */
  botId: string;
}

export interface DescribeBotLocaleInput {
  /** The identifier of the bot associated with the locale. */
  botId: string;
  /** The version of the bot associated with the locale. */
  botVersion: string;
  /** The unique identifier of the locale to describe. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
}

export interface DescribeBotRecommendationInput {
  /** The unique identifier of the bot associated with the bot recommendation. */
  botId: string;
  /** The identifier of the bot recommendation to describe. */
  botRecommendationId: string;
  /** The version of the bot associated with the bot recommendation. */
  botVersion: string;
  /** The identifier of the language and locale of the bot recommendation to describe. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
}

export interface DescribeBotReplicaInput {
  /** The request for the unique bot ID of the replicated bot being monitored. */
  botId: string;
  /** The request for the region of the replicated bot being monitored. */
  replicaRegion: string;
}

export interface DescribeBotResourceGenerationInput {
  /** The unique identifier of the bot for which to return the generation details. */
  botId: string;
  /** The version of the bot for which to return the generation details. */
  botVersion: string;
  /** The unique identifier of the generation request for which to return the generation details. */
  generationId: string;
  /** The locale of the bot for which to return the generation details. */
  localeId: string;
}

export interface DescribeBotVersionInput {
  /** The identifier of the bot containing the version to return metadata for. */
  botId: string;
  /** The version of the bot to return metadata for. */
  botVersion: string;
}

export interface DescribeCustomVocabularyMetadataInput {
  /** The unique identifier of the bot that contains the custom vocabulary. */
  botId: string;
  /** The bot version of the bot to return metadata for. */
  botVersion: string;
  /** The locale to return the custom vocabulary information for. The locale must be en_GB. */
  localeId: string;
}

export interface DescribeExportInput {
  /** The unique identifier of the export to describe. */
  exportId: string;
}

export interface DescribeImportInput {
  /** The unique identifier of the import to describe. */
  importId: string;
}

export interface DescribeIntentInput {
  /** The identifier of the bot associated with the intent. */
  botId: string;
  /** The version of the bot associated with the intent. */
  botVersion: string;
  /** The identifier of the intent to describe. */
  intentId: string;
  /** The identifier of the language and locale of the intent to describe. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
}

export interface DescribeResourcePolicyInput {
  /** The Amazon Resource Name (ARN) of the bot or bot alias that the resource policy is attached to. */
  resourceArn: string;
}

export interface DescribeSlotInput {
  /** The identifier of the bot associated with the slot. */
  botId: string;
  /** The version of the bot associated with the slot. */
  botVersion: string;
  /** The identifier of the intent that contains the slot. */
  intentId: string;
  /** The identifier of the language and locale of the slot to describe. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** The unique identifier for the slot. */
  slotId: string;
}

export interface DescribeSlotTypeInput {
  /** The identifier of the bot associated with the slot type. */
  botId: string;
  /** The version of the bot associated with the slot type. */
  botVersion: string;
  /** The identifier of the language and locale of the slot type to describe. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** The identifier of the slot type. */
  slotTypeId: string;
}

export interface DescribeTestExecutionInput {
  /** The execution Id of the test set execution. */
  testExecutionId: string;
}

export interface DescribeTestSetInput {
  /** The test set Id for the test set request. */
  testSetId: string;
}

export interface DescribeTestSetDiscrepancyReportInput {
  /** The unique identifier of the test set discrepancy report. */
  testSetDiscrepancyReportId: string;
}

export interface DescribeTestSetGenerationInput {
  /** The unique identifier of the test set generation. */
  testSetGenerationId: string;
}

export interface GenerateBotElementInput {
  /** The bot unique Id for the bot request to generate utterances. */
  botId: string;
  /** The bot version for the bot request to generate utterances. */
  botVersion: string;
  /** The intent unique Id for the bot request to generate utterances. */
  intentId: string;
  /** The unique locale Id for the bot request to generate utterances. */
  localeId: string;
}

export interface GetTestExecutionArtifactsUrlInput {
  /** The unique identifier of the completed test execution. */
  testExecutionId: string;
}

export interface ListAggregatedUtterancesInput {
  /** The time window for aggregating the utterance information. You can specify a time between one hour and two weeks. */
  aggregationDuration: UtteranceAggregationDuration;
  /** The unique identifier of the bot associated with this request. */
  botId: string;
  /** The identifier of the language and locale where the utterances were collected. For more information, see Supported languages. */
  localeId: string;
  /** The identifier of the bot alias associated with this request. If you specify the bot alias, you can't specify the bot version. */
  botAliasId?: string;
  /** The identifier of the bot version associated with this request. If you specify the bot version, you can't specify the bot alias. */
  botVersion?: string;
  /** Provides the specification of a filter used to limit the utterances in the response to only those that match the filter specification. You can only specify one filter and one string to filter on. */
  filters?: AggregatedUtterancesFilter[];
  /** The maximum number of utterances to return in each page of results. If there are fewer results than the maximum page size, only the actual number of results are returned. If you don't specify the maxR */
  maxResults?: number;
  /** If the response from the ListAggregatedUtterances operation contains more results that specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken param */
  nextToken?: string;
  /** Specifies sorting parameters for the list of utterances. You can sort by the hit count, the missed count, or the number of distinct sessions the utterance appeared in. */
  sortBy?: AggregatedUtterancesSortBy;
}

export interface ListBotAliasesInput {
  /** The identifier of the bot to list aliases for. */
  botId: string;
  /** The maximum number of aliases to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListBotAliases operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken parameter to re */
  nextToken?: string;
}

export interface ListBotAliasReplicasInput {
  /** The request for the unique bot ID of the replicated bot created from the source bot alias. */
  botId: string;
  /** The request for the secondary region of the replicated bot created from the source bot alias. */
  replicaRegion: string;
  /** The request for maximum results to list the replicated bots created from the source bot alias. */
  maxResults?: number;
  /** The request for the next token for the replicated bot created from the source bot alias. */
  nextToken?: string;
}

export interface ListBotLocalesInput {
  /** The identifier of the bot to list locales for. */
  botId: string;
  /** The version of the bot to list locales for. */
  botVersion: string;
  /** Provides the specification for a filter used to limit the response to only those locales that match the filter specification. You can only specify one filter and one value to filter on. */
  filters?: BotLocaleFilter[];
  /** The maximum number of aliases to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListBotLocales operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token as the nextToken parameter to re */
  nextToken?: string;
  /** Specifies sorting parameters for the list of locales. You can sort by locale name in ascending or descending order. */
  sortBy?: BotLocaleSortBy;
}

export interface ListBotRecommendationsInput {
  /** The unique identifier of the bot that contains the bot recommendation list. */
  botId: string;
  /** The version of the bot that contains the bot recommendation list. */
  botVersion: string;
  /** The identifier of the language and locale of the bot recommendation list. */
  localeId: string;
  /** The maximum number of bot recommendations to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListBotRecommendation operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken paramete */
  nextToken?: string;
}

export interface ListBotReplicasInput {
  /** The request for the unique bot IDs in the list of replicated bots. */
  botId: string;
}

export interface ListBotResourceGenerationsInput {
  /** The unique identifier of the bot whose generation requests you want to view. */
  botId: string;
  /** The version of the bot whose generation requests you want to view. */
  botVersion: string;
  /** The locale of the bot whose generation requests you want to view. */
  localeId: string;
  /** The maximum number of results to return in the response. */
  maxResults?: number;
  /** If the total number of results is greater than the number specified in the maxResults, the response returns a token in the nextToken field. Use this token when making a request to return the next batc */
  nextToken?: string;
  /** An object containing information about the attribute and the method by which to sort the results */
  sortBy?: GenerationSortBy;
}

export interface ListBotsInput {
  /** Provides the specification of a filter used to limit the bots in the response to only those that match the filter specification. You can only specify one filter and one string to filter on. */
  filters?: BotFilter[];
  /** The maximum number of bots to return in each page of results. If there are fewer results than the maximum page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListBots operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use the returned token in the nextToken parameter of  */
  nextToken?: string;
  /** Specifies sorting parameters for the list of bots. You can specify that the list be sorted by bot name in ascending or descending order. */
  sortBy?: BotSortBy;
}

export interface ListBotVersionReplicasInput {
  /** The request for the unique ID in the list of replicated bots. */
  botId: string;
  /** The request for the region used in the list of replicated bots. */
  replicaRegion: string;
  /** The maximum results given in the list of replicated bots. */
  maxResults?: number;
  /** The next token given in the list of replicated bots. */
  nextToken?: string;
  /** The requested sort category for the list of replicated bots. */
  sortBy?: BotVersionReplicaSortBy;
}

export interface ListBotVersionsInput {
  /** The identifier of the bot to list versions for. */
  botId: string;
  /** The maximum number of versions to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response to the ListBotVersion operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken parameter to retu */
  nextToken?: string;
  /** Specifies sorting parameters for the list of versions. You can specify that the list be sorted by version name in either ascending or descending order. */
  sortBy?: BotVersionSortBy;
}

export interface ListBuiltInIntentsInput {
  /** The identifier of the language and locale of the intents to list. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** The maximum number of built-in intents to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListBuiltInIntents operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken parameter t */
  nextToken?: string;
  /** Specifies sorting parameters for the list of built-in intents. You can specify that the list be sorted by the built-in intent signature in either ascending or descending order. */
  sortBy?: BuiltInIntentSortBy;
}

export interface ListBuiltInSlotTypesInput {
  /** The identifier of the language and locale of the slot types to list. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** The maximum number of built-in slot types to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListBuiltInSlotTypes operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken parameter */
  nextToken?: string;
  /** Determines the sort order for the response from the ListBuiltInSlotTypes operation. You can choose to sort by the slot type signature in either ascending or descending order. */
  sortBy?: BuiltInSlotTypeSortBy;
}

export interface ListCustomVocabularyItemsInput {
  /** The identifier of the version of the bot associated with this custom vocabulary. */
  botId: string;
  /** The bot version of the bot to the list custom vocabulary request. */
  botVersion: string;
  /** The identifier of the language and locale where this custom vocabulary is used. The string must match one of the supported locales. For more information, see Supported languages (https://docs.aws.amaz */
  localeId: string;
  /** The maximum number of items returned by the list operation. */
  maxResults?: number;
  /** The nextToken identifier to the list custom vocabulary request. */
  nextToken?: string;
}

export interface ListExportsInput {
  /** The unique identifier that Amazon Lex assigned to the bot. */
  botId?: string;
  /** The version of the bot to list exports for. */
  botVersion?: string;
  /** Provides the specification of a filter used to limit the exports in the response to only those that match the filter specification. You can only specify one filter and one string to filter on. */
  filters?: ExportFilter[];
  /** Specifies the resources that should be exported. If you don't specify a resource type in the filters parameter, both bot locales and custom vocabularies are exported. */
  localeId?: string;
  /** The maximum number of exports to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListExports operation contains more results that specified in the maxResults parameter, a token is returned in the response. Use the returned token in the nextToken parameter  */
  nextToken?: string;
  /** Determines the field that the list of exports is sorted by. You can sort by the LastUpdatedDateTime field in ascending or descending order. */
  sortBy?: ExportSortBy;
}

export interface ListImportsInput {
  /** The unique identifier that Amazon Lex assigned to the bot. */
  botId?: string;
  /** The version of the bot to list imports for. */
  botVersion?: string;
  /** Provides the specification of a filter used to limit the bots in the response to only those that match the filter specification. You can only specify one filter and one string to filter on. */
  filters?: ImportFilter[];
  /** Specifies the locale that should be present in the list. If you don't specify a resource type in the filters parameter, the list contains both bot locales and custom vocabularies. */
  localeId?: string;
  /** The maximum number of imports to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListImports operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use the returned token in the nextToken parameter  */
  nextToken?: string;
  /** Determines the field that the list of imports is sorted by. You can sort by the LastUpdatedDateTime field in ascending or descending order. */
  sortBy?: ImportSortBy;
}

export interface ListIntentMetricsInput {
  /** The identifier for the bot for which you want to retrieve intent metrics. */
  botId: string;
  /** The date and time that marks the end of the range of time for which you want to see intent metrics. */
  endDateTime: string;
  /** A list of objects, each of which contains a metric you want to list, the statistic for the metric you want to return, and the order by which to organize the results. */
  metrics: AnalyticsIntentMetric[];
  /** The timestamp that marks the beginning of the range of time for which you want to see intent metrics. */
  startDateTime: string;
  /** A list of objects, each of which contains specifications for organizing the results by time. */
  binBy?: AnalyticsBinBySpecification[];
  /** A list of objects, each of which describes a condition by which you want to filter the results. */
  filters?: AnalyticsIntentFilter[];
  /** A list of objects, each of which specifies how to group the results. You can group by the following criteria: IntentName – The name of the intent. IntentEndState – The final state of the intent. The p */
  groupBy?: AnalyticsIntentGroupBySpecification[];
  /** The maximum number of results to return in each page of results. If there are fewer results than the maximum page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListIntentMetrics operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use the returned token in the nextToken para */
  nextToken?: string;
}

export interface ListIntentPathsInput {
  /** The identifier for the bot for which you want to retrieve intent path metrics. */
  botId: string;
  /** The date and time that marks the end of the range of time for which you want to see intent path metrics. */
  endDateTime: string;
  /** The intent path for which you want to retrieve metrics. Use a forward slash to separate intents in the path. For example: /BookCar /BookCar/BookHotel /BookHotel/BookCar */
  intentPath: string;
  /** The date and time that marks the beginning of the range of time for which you want to see intent path metrics. */
  startDateTime: string;
  /** A list of objects, each describes a condition by which you want to filter the results. */
  filters?: AnalyticsPathFilter[];
}

export interface ListIntentsInput {
  /** The unique identifier of the bot that contains the intent. */
  botId: string;
  /** The version of the bot that contains the intent. */
  botVersion: string;
  /** The identifier of the language and locale of the intents to list. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** Provides the specification of a filter used to limit the intents in the response to only those that match the filter specification. You can only specify one filter and only one string to filter on. */
  filters?: IntentFilter[];
  /** The maximum number of intents to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListIntents operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use the returned token in the nextToken parameter  */
  nextToken?: string;
  /** Determines the sort order for the response from the ListIntents operation. You can choose to sort by the intent name or last updated date in either ascending or descending order. */
  sortBy?: IntentSortBy;
}

export interface ListIntentStageMetricsInput {
  /** The identifier for the bot for which you want to retrieve intent stage metrics. */
  botId: string;
  /** The date and time that marks the end of the range of time for which you want to see intent stage metrics. */
  endDateTime: string;
  /** A list of objects, each of which contains a metric you want to list, the statistic for the metric you want to return, and the method by which to organize the results. */
  metrics: AnalyticsIntentStageMetric[];
  /** The date and time that marks the beginning of the range of time for which you want to see intent stage metrics. */
  startDateTime: string;
  /** A list of objects, each of which contains specifications for organizing the results by time. */
  binBy?: AnalyticsBinBySpecification[];
  /** A list of objects, each of which describes a condition by which you want to filter the results. */
  filters?: AnalyticsIntentStageFilter[];
  /** A list of objects, each of which specifies how to group the results. You can group by the following criteria: IntentStageName – The name of the intent stage. SwitchedToIntent – The intent to which the */
  groupBy?: AnalyticsIntentStageGroupBySpecification[];
  /** The maximum number of results to return in each page of results. If there are fewer results than the maximum page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListIntentStageMetrics operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use the returned token in the nextToken */
  nextToken?: string;
}

export interface ListRecommendedIntentsInput {
  /** The unique identifier of the bot associated with the recommended intents. */
  botId: string;
  /** The identifier of the bot recommendation that contains the recommended intents. */
  botRecommendationId: string;
  /** The version of the bot that contains the recommended intents. */
  botVersion: string;
  /** The identifier of the language and locale of the recommended intents. */
  localeId: string;
  /** The maximum number of bot recommendations to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListRecommendedIntents operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken paramet */
  nextToken?: string;
}

export interface ListSessionAnalyticsDataInput {
  /** The identifier for the bot for which you want to retrieve session analytics. */
  botId: string;
  /** The date and time that marks the end of the range of time for which you want to see session analytics. */
  endDateTime: string;
  /** The date and time that marks the beginning of the range of time for which you want to see session analytics. */
  startDateTime: string;
  /** A list of objects, each of which describes a condition by which you want to filter the results. */
  filters?: AnalyticsSessionFilter[];
  /** The maximum number of results to return in each page of results. If there are fewer results than the maximum page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListSessionAnalyticsData operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use the returned token in the nextTok */
  nextToken?: string;
  /** An object specifying the measure and method by which to sort the session analytics data. */
  sortBy?: SessionDataSortBy;
}

export interface ListSessionMetricsInput {
  /** The identifier for the bot for which you want to retrieve session metrics. */
  botId: string;
  /** The date and time that marks the end of the range of time for which you want to see session metrics. */
  endDateTime: string;
  /** A list of objects, each of which contains a metric you want to list, the statistic for the metric you want to return, and the method by which to organize the results. */
  metrics: AnalyticsSessionMetric[];
  /** The date and time that marks the beginning of the range of time for which you want to see session metrics. */
  startDateTime: string;
  /** A list of objects, each of which contains specifications for organizing the results by time. */
  binBy?: AnalyticsBinBySpecification[];
  /** A list of objects, each of which describes a condition by which you want to filter the results. */
  filters?: AnalyticsSessionFilter[];
  /** A list of objects, each of which specifies how to group the results. You can group by the following criteria: ConversationEndState – The final state of the conversation. The possible end states are de */
  groupBy?: AnalyticsSessionGroupBySpecification[];
  /** The maximum number of results to return in each page of results. If there are fewer results than the maximum page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListSessionMetrics operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use the returned token in the nextToken par */
  nextToken?: string;
}

export interface ListSlotsInput {
  /** The identifier of the bot that contains the slot. */
  botId: string;
  /** The version of the bot that contains the slot. */
  botVersion: string;
  /** The unique identifier of the intent that contains the slot. */
  intentId: string;
  /** The identifier of the language and locale of the slots to list. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** Provides the specification of a filter used to limit the slots in the response to only those that match the filter specification. You can only specify one filter and only one string to filter on. */
  filters?: SlotFilter[];
  /** The maximum number of slots to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListSlots operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken parameter to return  */
  nextToken?: string;
  /** Determines the sort order for the response from the ListSlots operation. You can choose to sort by the slot name or last updated date in either ascending or descending order. */
  sortBy?: SlotSortBy;
}

export interface ListSlotTypesInput {
  /** The unique identifier of the bot that contains the slot types. */
  botId: string;
  /** The version of the bot that contains the slot type. */
  botVersion: string;
  /** The identifier of the language and locale of the slot types to list. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** Provides the specification of a filter used to limit the slot types in the response to only those that match the filter specification. You can only specify one filter and only one string to filter on. */
  filters?: SlotTypeFilter[];
  /** The maximum number of slot types to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListSlotTypes operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken parameter to ret */
  nextToken?: string;
  /** Determines the sort order for the response from the ListSlotTypes operation. You can choose to sort by the slot type name or last updated date in either ascending or descending order. */
  sortBy?: SlotTypeSortBy;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the resource to get a list of tags for. */
  resourceARN: string;
}

export interface ListTestExecutionResultItemsInput {
  /** The filter for the list of results from the test set execution. */
  resultFilterBy: TestExecutionResultFilterBy;
  /** The unique identifier of the test execution to list the result items. */
  testExecutionId: string;
  /** The maximum number of test execution result items to return in each page. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListTestExecutionResultItems operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken p */
  nextToken?: string;
}

export interface ListTestExecutionsInput {
  /** The maximum number of test executions to return in each page. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListTestExecutions operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken parameter t */
  nextToken?: string;
  /** The sort order of the test set executions. */
  sortBy?: TestExecutionSortBy;
}

export interface ListTestSetRecordsInput {
  /** The identifier of the test set to list its test set records. */
  testSetId: string;
  /** The maximum number of test set records to return in each page. If there are fewer records than the max page size, only the actual number of records are returned. */
  maxResults?: number;
  /** If the response from the ListTestSetRecords operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken parameter t */
  nextToken?: string;
}

export interface ListTestSetsInput {
  /** The maximum number of test sets to return in each page. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListTestSets operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use that token in the nextToken parameter to retu */
  nextToken?: string;
  /** The sort order for the list of test sets. */
  sortBy?: TestSetSortBy;
}

export interface ListUtteranceAnalyticsDataInput {
  /** The identifier for the bot for which you want to retrieve utterance analytics. */
  botId: string;
  /** The date and time that marks the end of the range of time for which you want to see utterance analytics. */
  endDateTime: string;
  /** The date and time that marks the beginning of the range of time for which you want to see utterance analytics. */
  startDateTime: string;
  /** A list of objects, each of which describes a condition by which you want to filter the results. */
  filters?: AnalyticsUtteranceFilter[];
  /** The maximum number of results to return in each page of results. If there are fewer results than the maximum page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListUtteranceAnalyticsData operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use the returned token in the nextT */
  nextToken?: string;
  /** An object specifying the measure and method by which to sort the utterance analytics data. */
  sortBy?: UtteranceDataSortBy;
}

export interface ListUtteranceMetricsInput {
  /** The identifier for the bot for which you want to retrieve utterance metrics. */
  botId: string;
  /** The date and time that marks the end of the range of time for which you want to see utterance metrics. */
  endDateTime: string;
  /** A list of objects, each of which contains a metric you want to list, the statistic for the metric you want to return, and the method by which to organize the results. */
  metrics: AnalyticsUtteranceMetric[];
  /** The date and time that marks the beginning of the range of time for which you want to see utterance metrics. */
  startDateTime: string;
  /** A list containing attributes related to the utterance that you want the response to return. The following attributes are possible: LastUsedIntent – The last used intent at the time of the utterance. */
  attributes?: AnalyticsUtteranceAttribute[];
  /** A list of objects, each of which contains specifications for organizing the results by time. */
  binBy?: AnalyticsBinBySpecification[];
  /** A list of objects, each of which describes a condition by which you want to filter the results. */
  filters?: AnalyticsUtteranceFilter[];
  /** A list of objects, each of which specifies how to group the results. You can group by the following criteria: UtteranceText – The transcription of the utterance. UtteranceState – The state of the utte */
  groupBy?: AnalyticsUtteranceGroupBySpecification[];
  /** The maximum number of results to return in each page of results. If there are fewer results than the maximum page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the ListUtteranceMetrics operation contains more results than specified in the maxResults parameter, a token is returned in the response. Use the returned token in the nextToken p */
  nextToken?: string;
}

export interface SearchAssociatedTranscriptsInput {
  /** The unique identifier of the bot associated with the transcripts that you are searching. */
  botId: string;
  /** The unique identifier of the bot recommendation associated with the transcripts to search. */
  botRecommendationId: string;
  /** The version of the bot containing the transcripts that you are searching. */
  botVersion: string;
  /** A list of filter objects. */
  filters: AssociatedTranscriptFilter[];
  /** The identifier of the language and locale of the transcripts to search. The string must match one of the supported locales. For more information, see Supported languages */
  localeId: string;
  /** The maximum number of bot recommendations to return in each page of results. If there are fewer results than the max page size, only the actual number of results are returned. */
  maxResults?: number;
  /** If the response from the SearchAssociatedTranscriptsRequest operation contains more results than specified in the maxResults parameter, an index is returned in the response. Use that index in the next */
  nextIndex?: number;
  /** How SearchResults are ordered. Valid values are Ascending or Descending. The default is Descending. */
  searchOrder?: 'Ascending' | 'Descending';
}

export interface StartBotRecommendationInput {
  /** The unique identifier of the bot containing the bot recommendation. */
  botId: string;
  /** The version of the bot containing the bot recommendation. */
  botVersion: string;
  /** The identifier of the language and locale of the bot recommendation to start. The string must match one of the supported locales. For more information, see Supported languages */
  localeId: string;
  /** The object representing the Amazon S3 bucket containing the transcript, as well as the associated metadata. */
  transcriptSourceSetting: TranscriptSourceSetting;
  /** The object representing the passwords that will be used to encrypt the data related to the bot recommendation results, as well as the KMS key ARN used to encrypt the associated metadata. */
  encryptionSetting?: EncryptionSetting;
}

export interface StartBotResourceGenerationInput {
  /** The unique identifier of the bot for which to generate intents and slot types. */
  botId: string;
  /** The version of the bot for which to generate intents and slot types. */
  botVersion: string;
  /** The prompt to generate intents and slot types for the bot locale. Your description should be both detailed and precise to help generate appropriate and sufficient intents for your bot. Include a list  */
  generationInputPrompt: string;
  /** The locale of the bot for which to generate intents and slot types. */
  localeId: string;
}

export interface StartImportInput {
  /** The unique identifier for the import. It is included in the response from the CreateUploadUrl operation. */
  importId: string;
  /** The strategy to use when there is a name conflict between the imported resource and an existing resource. When the merge strategy is FailOnConflict existing resources are not overwritten and the impor */
  mergeStrategy: 'Overwrite' | 'FailOnConflict' | 'Append';
  /** Parameters for creating the bot, bot locale or custom vocabulary. */
  resourceSpecification: ImportResourceSpecification;
  /** The password used to encrypt the zip archive that contains the resource definition. You should always encrypt the zip archive to protect it during transit between your site and Amazon Lex. */
  filePassword?: string;
}

export interface StartTestExecutionInput {
  /** Indicates whether we use streaming or non-streaming APIs for the test set execution. For streaming, StartConversation Runtime API is used. Whereas, for non-streaming, RecognizeUtterance and RecognizeT */
  apiMode: 'Streaming' | 'NonStreaming';
  /** The target bot for the test set execution. */
  target: TestExecutionTarget;
  /** The test set Id for the test set execution. */
  testSetId: string;
  /** Indicates whether audio or text is used. */
  testExecutionModality?: 'Text' | 'Audio';
}

export interface StartTestSetGenerationInput {
  /** The data source for the test set generation. */
  generationDataSource: TestSetGenerationDataSource;
  /** The roleARN used for any operation in the test set to access resources in the Amazon Web Services account. */
  roleArn: string;
  /** The Amazon S3 storage location for the test set generation. */
  storageLocation: TestSetStorageLocation;
  /** The test set name for the test set generation request. */
  testSetName: string;
  /** The test set description for the test set generation request. */
  description?: string;
  /** A list of tags to add to the test set. You can only add tags when you import/generate a new test set. You can't use the UpdateTestSet operation to update tags. To update tags, use the TagResource oper */
  testSetTags?: Record<string, string>;
}

export interface StopBotRecommendationInput {
  /** The unique identifier of the bot containing the bot recommendation to be stopped. */
  botId: string;
  /** The unique identifier of the bot recommendation to be stopped. */
  botRecommendationId: string;
  /** The version of the bot containing the bot recommendation. */
  botVersion: string;
  /** The identifier of the language and locale of the bot recommendation to stop. The string must match one of the supported locales. For more information, see Supported languages */
  localeId: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the bot, bot alias, or bot channel to tag. */
  resourceARN: string;
  /** A list of tag keys to add to the resource. If a tag key already exists, the existing value is replaced with the new value. */
  tags: Record<string, string>;
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource to remove the tags from. */
  resourceARN: string;
  /** A list of tag keys to remove from the resource. If a tag key does not exist on the resource, it is ignored. */
  tagKeys: string[];
}

export interface UpdateBotInput {
  /** The unique identifier of the bot to update. This identifier is returned by the CreateBot operation. */
  botId: string;
  /** The new name of the bot. The name must be unique in the account that creates the bot. */
  botName: string;
  /** Provides information on additional privacy protections Amazon Lex should use with the bot's data. */
  dataPrivacy: DataPrivacy;
  /** The time, in seconds, that Amazon Lex should keep information about a user's conversation with the bot. A user interaction remains active for the amount of time specified. If no conversation occurs du */
  idleSessionTTLInSeconds: number;
  /** The Amazon Resource Name (ARN) of an IAM role that has permissions to access the bot. */
  roleArn: string;
  /** The list of bot members in the network associated with the update action. */
  botMembers?: BotMember[];
  /** The type of the bot to be updated. */
  botType?: 'Bot' | 'BotNetwork';
  /** A description of the bot. */
  description?: string;
  /** Allows you to modify how Amazon Lex logs errors during bot interactions, including destinations for error logs and the types of errors to be captured. */
  errorLogSettings?: ErrorLogSettings;
}

export interface UpdateBotAliasInput {
  /** The unique identifier of the bot alias. */
  botAliasId: string;
  /** The new name to assign to the bot alias. */
  botAliasName: string;
  /** The identifier of the bot with the updated alias. */
  botId: string;
  /** The new Lambda functions to use in each locale for the bot alias. */
  botAliasLocaleSettings?: Record<string, BotAliasLocaleSettings>;
  /** The new bot version to assign to the bot alias. */
  botVersion?: string;
  /** The new settings for storing conversation logs in Amazon CloudWatch Logs and Amazon S3 buckets. */
  conversationLogSettings?: ConversationLogSettings;
  /** The new description to assign to the bot alias. */
  description?: string;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
}

export interface UpdateBotLocaleInput {
  /** The unique identifier of the bot that contains the locale. */
  botId: string;
  /** The version of the bot that contains the locale to be updated. The version can only be the DRAFT version. */
  botVersion: string;
  /** The identifier of the language and locale to update. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** The new confidence threshold where Amazon Lex inserts the AMAZON.FallbackIntent and AMAZON.KendraSearchIntent intents in the list of possible intents for an utterance. */
  nluIntentConfidenceThreshold: number;
  /** The new description of the locale. */
  description?: string;
  /** Contains settings for generative AI features powered by Amazon Bedrock for your bot locale. Use this object to turn generative AI features on and off. Pricing may differ if you turn a feature on. For  */
  generativeAISettings?: GenerativeAISettings;
  /** The new sensitivity level for voice activity detection (VAD) in the bot locale. This setting helps optimize speech recognition accuracy by adjusting how the system responds to background noise during  */
  speechDetectionSensitivity?: 'Default' | 'HighNoiseTolerance' | 'MaximumNoiseTolerance';
  /** Updated speech-to-text settings to apply to the bot locale. */
  speechRecognitionSettings?: SpeechRecognitionSettings;
  /** Updated unified speech settings to apply to the bot locale. */
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  /** The new Amazon Polly voice Amazon Lex should use for voice interaction with the user. */
  voiceSettings?: VoiceSettings;
}

export interface UpdateBotRecommendationInput {
  /** The unique identifier of the bot containing the bot recommendation to be updated. */
  botId: string;
  /** The unique identifier of the bot recommendation to be updated. */
  botRecommendationId: string;
  /** The version of the bot containing the bot recommendation to be updated. */
  botVersion: string;
  /** The object representing the passwords that will be used to encrypt the data related to the bot recommendation results, as well as the KMS key ARN used to encrypt the associated metadata. */
  encryptionSetting: EncryptionSetting;
  /** The identifier of the language and locale of the bot recommendation to update. The string must match one of the supported locales. For more information, see Supported languages */
  localeId: string;
}

export interface UpdateExportInput {
  /** The unique identifier Amazon Lex assigned to the export. */
  exportId: string;
  /** The new password to use to encrypt the export zip archive. */
  filePassword?: string;
}

export interface UpdateIntentInput {
  /** The identifier of the bot that contains the intent. */
  botId: string;
  /** The version of the bot that contains the intent. Must be DRAFT. */
  botVersion: string;
  /** The unique identifier of the intent to update. */
  intentId: string;
  /** The new name for the intent. */
  intentName: string;
  /** The identifier of the language and locale where this intent is used. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** The new description of the intent. */
  description?: string;
  /** The new Lambda function to use between each turn of the conversation with the bot. */
  dialogCodeHook?: DialogCodeHookSettings;
  /** The new Lambda function to call when all of the intents required slots are provided and the intent is ready for fulfillment. */
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  /** Configuration settings for a response sent to the user before Amazon Lex starts eliciting slots. */
  initialResponseSetting?: InitialResponseSetting;
  /** A new list of contexts that must be active in order for Amazon Lex to consider the intent. */
  inputContexts?: InputContext[];
  /** The new response that Amazon Lex sends the user when the intent is closed. */
  intentClosingSetting?: IntentClosingSetting;
  /** New prompts that Amazon Lex sends to the user to confirm the completion of an intent. */
  intentConfirmationSetting?: IntentConfirmationSetting;
  /** The new display name for the intent. */
  intentDisplayName?: string;
  /** New configuration settings for connecting to an Amazon Kendra index. */
  kendraConfiguration?: KendraConfiguration;
  /** A new list of contexts that Amazon Lex activates when the intent is fulfilled. */
  outputContexts?: OutputContext[];
  /** The signature of the new built-in intent to use as the parent of this intent. */
  parentIntentSignature?: string;
  /** Qinconnect intent configuration details for the update intent request. */
  qInConnectIntentConfiguration?: QInConnectIntentConfiguration;
  /** Specifies the configuration of the built-in Amazon.QnAIntent. The AMAZON.QnAIntent intent is called when Amazon Lex can't determine another intent to invoke. If you specify this field, you can't speci */
  qnAIntentConfiguration?: QnAIntentConfiguration;
  /** New utterances used to invoke the intent. */
  sampleUtterances?: SampleUtterance[];
  /** A new list of slots and their priorities that are contained by the intent. */
  slotPriorities?: SlotPriority[];
}

export interface UpdateResourcePolicyInput {
  /** A resource policy to add to the resource. The policy is a JSON structure that contains one or more statements that define the policy. The policy must follow the IAM syntax. For more information about  */
  policy: string;
  /** The Amazon Resource Name (ARN) of the bot or bot alias that the resource policy is attached to. */
  resourceArn: string;
  /** The identifier of the revision of the policy to update. If this revision ID doesn't match the current revision ID, Amazon Lex throws an exception. If you don't specify a revision, Amazon Lex overwrite */
  expectedRevisionId?: string;
}

export interface UpdateSlotInput {
  /** The unique identifier of the bot that contains the slot. */
  botId: string;
  /** The version of the bot that contains the slot. Must always be DRAFT. */
  botVersion: string;
  /** The identifier of the intent that contains the slot. */
  intentId: string;
  /** The identifier of the language and locale that contains the slot. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** The unique identifier for the slot to update. */
  slotId: string;
  /** The new name for the slot. */
  slotName: string;
  /** A new set of prompts that Amazon Lex sends to the user to elicit a response the provides a value for the slot. */
  valueElicitationSetting: SlotValueElicitationSetting;
  /** The new description for the slot. */
  description?: string;
  /** Determines whether the slot accepts multiple values in one response. Multiple value slots are only available in the en-US locale. If you set this value to true in any other locale, Amazon Lex throws a */
  multipleValuesSetting?: MultipleValuesSetting;
  /** New settings that determine how slot values are formatted in Amazon CloudWatch logs. */
  obfuscationSetting?: ObfuscationSetting;
  /** The unique identifier of the new slot type to associate with this slot. */
  slotTypeId?: string;
  /** Specifications for the constituent sub slots and the expression for the composite slot. */
  subSlotSetting?: SubSlotSetting;
}

export interface UpdateSlotTypeInput {
  /** The identifier of the bot that contains the slot type. */
  botId: string;
  /** The version of the bot that contains the slot type. Must be DRAFT. */
  botVersion: string;
  /** The identifier of the language and locale that contains the slot type. The string must match one of the supported locales. For more information, see Supported languages. */
  localeId: string;
  /** The unique identifier of the slot type to update. */
  slotTypeId: string;
  /** The new name of the slot type. */
  slotTypeName: string;
  /** Specifications for a composite slot type. */
  compositeSlotTypeSetting?: CompositeSlotTypeSetting;
  /** The new description of the slot type. */
  description?: string;
  externalSourceSetting?: ExternalSourceSetting;
  /** The new built-in slot type that should be used as the parent of this slot type. */
  parentSlotTypeSignature?: string;
  /** A new list of values and their optional synonyms that define the values that the slot type can take. */
  slotTypeValues?: SlotTypeValue[];
  /** The strategy that Amazon Lex should use when deciding on a value from the list of slot type values. */
  valueSelectionSetting?: SlotValueSelectionSetting;
}

export interface UpdateTestSetInput {
  /** The test set Id for which update test operation to be performed. */
  testSetId: string;
  /** The new test set name. */
  testSetName: string;
  /** The new test set description. */
  description?: string;
}

/** Lex Models V2 service binding for Step Functions SDK integrations. */
export class LexModelsV2 {
  constructor() {}

  batchCreateCustomVocabularyItem<T>(params: BatchCreateCustomVocabularyItemInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDeleteCustomVocabularyItem<T>(params: BatchDeleteCustomVocabularyItemInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchUpdateCustomVocabularyItem<T>(params: BatchUpdateCustomVocabularyItemInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  buildBotLocale<T>(params: BuildBotLocaleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createBot<T>(params: CreateBotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createBotAlias<T>(params: CreateBotAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createBotLocale<T>(params: CreateBotLocaleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createBotReplica<T>(params: CreateBotReplicaInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createBotVersion<T>(params: CreateBotVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createExport<T>(params: CreateExportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIntent<T>(params: CreateIntentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createResourcePolicy<T>(params: CreateResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createResourcePolicyStatement<T>(params: CreateResourcePolicyStatementInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSlot<T>(params: CreateSlotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSlotType<T>(params: CreateSlotTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTestSetDiscrepancyReport<T>(params: CreateTestSetDiscrepancyReportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createUploadUrl<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteBot<T>(params: DeleteBotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteBotAlias<T>(params: DeleteBotAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteBotLocale<T>(params: DeleteBotLocaleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteBotReplica<T>(params: DeleteBotReplicaInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteBotVersion<T>(params: DeleteBotVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCustomVocabulary<T>(params: DeleteCustomVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteExport<T>(params: DeleteExportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteImport<T>(params: DeleteImportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIntent<T>(params: DeleteIntentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteResourcePolicy<T>(params: DeleteResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteResourcePolicyStatement<T>(params: DeleteResourcePolicyStatementInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSlot<T>(params: DeleteSlotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSlotType<T>(params: DeleteSlotTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTestSet<T>(params: DeleteTestSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUtterances<T>(params: DeleteUtterancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeBot<T>(params: DescribeBotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeBotAlias<T>(params: DescribeBotAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeBotLocale<T>(params: DescribeBotLocaleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeBotRecommendation<T>(params: DescribeBotRecommendationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeBotReplica<T>(params: DescribeBotReplicaInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeBotResourceGeneration<T>(params: DescribeBotResourceGenerationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeBotVersion<T>(params: DescribeBotVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCustomVocabularyMetadata<T>(params: DescribeCustomVocabularyMetadataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeExport<T>(params: DescribeExportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImport<T>(params: DescribeImportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIntent<T>(params: DescribeIntentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeResourcePolicy<T>(params: DescribeResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSlot<T>(params: DescribeSlotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSlotType<T>(params: DescribeSlotTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTestExecution<T>(params: DescribeTestExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTestSet<T>(params: DescribeTestSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTestSetDiscrepancyReport<T>(params: DescribeTestSetDiscrepancyReportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTestSetGeneration<T>(params: DescribeTestSetGenerationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  generateBotElement<T>(params: GenerateBotElementInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTestExecutionArtifactsUrl<T>(params: GetTestExecutionArtifactsUrlInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAggregatedUtterances<T>(params: ListAggregatedUtterancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBotAliases<T>(params: ListBotAliasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBotAliasReplicas<T>(params: ListBotAliasReplicasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBotLocales<T>(params: ListBotLocalesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBotRecommendations<T>(params: ListBotRecommendationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBotReplicas<T>(params: ListBotReplicasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBotResourceGenerations<T>(params: ListBotResourceGenerationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBots<T>(params: ListBotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBotVersionReplicas<T>(params: ListBotVersionReplicasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBotVersions<T>(params: ListBotVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBuiltInIntents<T>(params: ListBuiltInIntentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBuiltInSlotTypes<T>(params: ListBuiltInSlotTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCustomVocabularyItems<T>(params: ListCustomVocabularyItemsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listExports<T>(params: ListExportsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listImports<T>(params: ListImportsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listIntentMetrics<T>(params: ListIntentMetricsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listIntentPaths<T>(params: ListIntentPathsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listIntents<T>(params: ListIntentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listIntentStageMetrics<T>(params: ListIntentStageMetricsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRecommendedIntents<T>(params: ListRecommendedIntentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSessionAnalyticsData<T>(params: ListSessionAnalyticsDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSessionMetrics<T>(params: ListSessionMetricsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSlots<T>(params: ListSlotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSlotTypes<T>(params: ListSlotTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTestExecutionResultItems<T>(params: ListTestExecutionResultItemsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTestExecutions<T>(params: ListTestExecutionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTestSetRecords<T>(params: ListTestSetRecordsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTestSets<T>(params: ListTestSetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUtteranceAnalyticsData<T>(params: ListUtteranceAnalyticsDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUtteranceMetrics<T>(params: ListUtteranceMetricsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchAssociatedTranscripts<T>(params: SearchAssociatedTranscriptsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startBotRecommendation<T>(params: StartBotRecommendationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startBotResourceGeneration<T>(params: StartBotResourceGenerationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startImport<T>(params: StartImportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startTestExecution<T>(params: StartTestExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startTestSetGeneration<T>(params: StartTestSetGenerationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopBotRecommendation<T>(params: StopBotRecommendationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateBot<T>(params: UpdateBotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateBotAlias<T>(params: UpdateBotAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateBotLocale<T>(params: UpdateBotLocaleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateBotRecommendation<T>(params: UpdateBotRecommendationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateExport<T>(params: UpdateExportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateIntent<T>(params: UpdateIntentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateResourcePolicy<T>(params: UpdateResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSlot<T>(params: UpdateSlotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSlotType<T>(params: UpdateSlotTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTestSet<T>(params: UpdateTestSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
