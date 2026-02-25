// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface Tag {
  /** The first part of a key:value pair that forms a tag associated with a given resource. For example, in the tag Department:Sales, the key is 'Department'. */
  Key: string;
  /** The second part of a key:value pair that forms a tag associated with a given resource. For example, in the tag Department:Sales, the value is 'Sales'. Note that you can set the value of a tag to an em */
  Value: string;
}

export interface InputDataConfig {
  /** The Amazon S3 location (URI) of the text files you want to use to train your custom language model. Here's an example URI path: s3://DOC-EXAMPLE-BUCKET/my-model-training-data/ */
  S3Uri: string;
  /** The Amazon S3 location (URI) of the text files you want to use to tune your custom language model. Here's an example URI path: s3://DOC-EXAMPLE-BUCKET/my-model-tuning-data/ */
  TuningDataS3Uri?: string;
  /** The Amazon Resource Name (ARN) of an IAM role that has permissions to access the Amazon S3 bucket that contains your input files. If the role that you specify doesn’t have the appropriate permissions  */
  DataAccessRoleArn: string;
}

export interface Media {
  /** The Amazon S3 location of the media file you want to transcribe. For example: s3://DOC-EXAMPLE-BUCKET/my-media-file.flac s3://DOC-EXAMPLE-BUCKET/media-files/my-media-file.flac Note that the Amazon S3  */
  MediaFileUri?: string;
  /** The Amazon S3 location of the media file you want to redact. For example: s3://DOC-EXAMPLE-BUCKET/my-media-file.flac s3://DOC-EXAMPLE-BUCKET/media-files/my-media-file.flac Note that the Amazon S3 buck */
  RedactedMediaFileUri?: string;
}

export interface ContentRedaction {
  /** Specify the category of information you want to redact; PII (personally identifiable information) is the only valid value. You can use PiiEntityTypes to choose which types of PII you want to redact. I */
  RedactionType: 'PII';
  /** Specify if you want only a redacted transcript, or if you want a redacted and an unredacted transcript. When you choose redacted Amazon Transcribe creates only a redacted transcript. When you choose r */
  RedactionOutput: 'redacted' | 'redacted_and_unredacted';
  /** Specify which types of personally identifiable information (PII) you want to redact in your transcript. You can include as many types as you'd like, or you can select ALL. If you do not include PiiEnt */
  PiiEntityTypes?: any[];
}

export interface Summarization {
  /** Enables Generative call summarization in your Call Analytics request Generative call summarization provides a summary of the transcript including important components discussed in the conversation. Fo */
  GenerateAbstractiveSummary: boolean;
}

export interface CallAnalyticsJobSettings {
  /** The name of the custom vocabulary you want to include in your Call Analytics transcription request. Custom vocabulary names are case sensitive. */
  VocabularyName?: string;
  /** The name of the custom vocabulary filter you want to include in your Call Analytics transcription request. Custom vocabulary filter names are case sensitive. Note that if you include VocabularyFilterN */
  VocabularyFilterName?: string;
  /** Specify how you want your custom vocabulary filter applied to your transcript. To replace words with ***, choose mask. To delete words, choose remove. To flag words without changing them, choose tag. */
  VocabularyFilterMethod?: 'remove' | 'mask' | 'tag';
  /** The name of the custom language model you want to use when processing your Call Analytics job. Note that custom language model names are case sensitive. The language of the specified custom language m */
  LanguageModelName?: string;
  ContentRedaction?: ContentRedaction;
  /** You can specify two or more language codes that represent the languages you think may be present in your media. Including more than five is not recommended. If you're unsure what languages are present */
  LanguageOptions?: 'af-ZA' | 'ar-AE' | 'ar-SA' | 'da-DK' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fa-IR' | 'fr-CA' | 'fr-FR' | 'he-IL' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'ms-MY' | 'nl-NL' | 'pt-BR' | 'pt-PT' | 'ru-RU' | 'ta-IN' | 'te-IN' | 'tr-TR' | 'zh-CN' | 'zh-TW' | 'th-TH' | 'en-ZA' | 'en-NZ' | 'vi-VN' | 'sv-SE' | 'ab-GE' | 'ast-ES' | 'az-AZ' | 'ba-RU' | 'be-BY' | 'bg-BG' | 'bn-IN' | 'bs-BA' | 'ca-ES' | 'ckb-IQ' | 'ckb-IR' | 'cs-CZ' | 'cy-WL' | 'el-GR' | 'et-EE' | 'et-ET' | 'eu-ES' | 'fi-FI' | 'gl-ES' | 'gu-IN' | 'ha-NG' | 'hr-HR' | 'hu-HU' | 'hy-AM' | 'is-IS' | 'ka-GE' | 'kab-DZ' | 'kk-KZ' | 'kn-IN' | 'ky-KG' | 'lg-IN' | 'lt-LT' | 'lv-LV' | 'mhr-RU' | 'mi-NZ' | 'mk-MK' | 'ml-IN' | 'mn-MN' | 'mr-IN' | 'mt-MT' | 'no-NO' | 'or-IN' | 'pa-IN' | 'pl-PL' | 'ps-AF' | 'ro-RO' | 'rw-RW' | 'si-LK' | 'sk-SK' | 'sl-SI' | 'so-SO' | 'sr-RS' | 'su-ID' | 'sw-BI' | 'sw-KE' | 'sw-RW' | 'sw-TZ' | 'sw-UG' | 'tl-PH' | 'tt-RU' | 'ug-CN' | 'uk-UA' | 'uz-UZ' | 'wo-SN' | 'zh-HK' | 'zu-ZA'[];
  /** If using automatic language identification in your request and you want to apply a custom language model, a custom vocabulary, or a custom vocabulary filter, include LanguageIdSettings with the releva */
  LanguageIdSettings?: Record<string, any>;
  /** Contains GenerateAbstractiveSummary, which is a required parameter if you want to enable Generative call summarization in your Call Analytics request. */
  Summarization?: Summarization;
}

export interface ChannelDefinition {
  /** Specify the audio channel you want to define. */
  ChannelId?: number;
  /** Specify the speaker you want to define. Omitting this parameter is equivalent to specifying both participants. */
  ParticipantRole?: 'AGENT' | 'CUSTOMER';
}

export interface ClinicalNoteGenerationSettings {
  /** Specify one of the following templates to use for the clinical note summary. The default is HISTORY_AND_PHYSICAL. HISTORY_AND_PHYSICAL: Provides summaries for key sections of the clinical documentatio */
  NoteTemplate?: 'HISTORY_AND_PHYSICAL' | 'GIRPP' | 'BIRP' | 'SIRP' | 'DAP' | 'BEHAVIORAL_SOAP' | 'PHYSICAL_SOAP';
}

export interface MedicalScribeSettings {
  /** Enables speaker partitioning (diarization) in your Medical Scribe output. Speaker partitioning labels the speech from individual speakers in your media file. If you enable ShowSpeakerLabels in your re */
  ShowSpeakerLabels?: boolean;
  /** Specify the maximum number of speakers you want to partition in your media. Note that if your media contains more speakers than the specified number, multiple speakers are treated as a single speaker. */
  MaxSpeakerLabels?: number;
  /** Enables channel identification in multi-channel audio. Channel identification transcribes the audio on each channel independently, then appends the output for each channel into one transcript. For mor */
  ChannelIdentification?: boolean;
  /** The name of the custom vocabulary you want to include in your Medical Scribe request. Custom vocabulary names are case sensitive. */
  VocabularyName?: string;
  /** The name of the custom vocabulary filter you want to include in your Medical Scribe request. Custom vocabulary filter names are case sensitive. Note that if you include VocabularyFilterName in your re */
  VocabularyFilterName?: string;
  /** Specify how you want your custom vocabulary filter applied to your transcript. To replace words with ***, choose mask. To delete words, choose remove. To flag words without changing them, choose tag. */
  VocabularyFilterMethod?: 'remove' | 'mask' | 'tag';
  /** Specify settings for the clinical note generation. */
  ClinicalNoteGenerationSettings?: ClinicalNoteGenerationSettings;
}

export interface MedicalScribeChannelDefinition {
  /** Specify the audio channel you want to define. */
  ChannelId: number;
  /** Specify the participant that you want to flag. The options are CLINICIAN and PATIENT */
  ParticipantRole: 'PATIENT' | 'CLINICIAN';
}

export interface MedicalScribePatientContext {
  /** The patient's preferred pronouns that the user wants to provide as a context for clinical note generation. */
  Pronouns?: 'HE_HIM' | 'SHE_HER' | 'THEY_THEM';
}

export interface MedicalScribeContext {
  /** Contains patient-specific information. */
  PatientContext?: MedicalScribePatientContext;
}

export interface MedicalTranscriptionSetting {
  /** Enables speaker partitioning (diarization) in your transcription output. Speaker partitioning labels the speech from individual speakers in your media file. If you enable ShowSpeakerLabels in your req */
  ShowSpeakerLabels?: boolean;
  /** Specify the maximum number of speakers you want to partition in your media. Note that if your media contains more speakers than the specified number, multiple speakers are treated as a single speaker. */
  MaxSpeakerLabels?: number;
  /** Enables channel identification in multi-channel audio. Channel identification transcribes the audio on each channel independently, then appends the output for each channel into one transcript. If you  */
  ChannelIdentification?: boolean;
  /** To include alternative transcriptions within your transcription output, include ShowAlternatives in your transcription request. If you include ShowAlternatives, you must also include MaxAlternatives,  */
  ShowAlternatives?: boolean;
  /** Indicate the maximum number of alternative transcriptions you want Amazon Transcribe Medical to include in your transcript. If you select a number greater than the number of alternative transcriptions */
  MaxAlternatives?: number;
  /** The name of the custom vocabulary you want to use when processing your medical transcription job. Custom vocabulary names are case sensitive. The language of the specified custom vocabulary must match */
  VocabularyName?: string;
}

export interface Settings {
  /** The name of the custom vocabulary you want to use in your transcription job request. This name is case sensitive, cannot contain spaces, and must be unique within an Amazon Web Services account. */
  VocabularyName?: string;
  /** Enables speaker partitioning (diarization) in your transcription output. Speaker partitioning labels the speech from individual speakers in your media file. If you enable ShowSpeakerLabels in your req */
  ShowSpeakerLabels?: boolean;
  /** Specify the maximum number of speakers you want to partition in your media. Note that if your media contains more speakers than the specified number, multiple speakers are treated as a single speaker. */
  MaxSpeakerLabels?: number;
  /** Enables channel identification in multi-channel audio. Channel identification transcribes the audio on each channel independently, then appends the output for each channel into one transcript. For mor */
  ChannelIdentification?: boolean;
  /** To include alternative transcriptions within your transcription output, include ShowAlternatives in your transcription request. If you have multi-channel audio and do not enable channel identification */
  ShowAlternatives?: boolean;
  /** Indicate the maximum number of alternative transcriptions you want Amazon Transcribe to include in your transcript. If you select a number greater than the number of alternative transcriptions generat */
  MaxAlternatives?: number;
  /** The name of the custom vocabulary filter you want to use in your transcription job request. This name is case sensitive, cannot contain spaces, and must be unique within an Amazon Web Services account */
  VocabularyFilterName?: string;
  /** Specify how you want your custom vocabulary filter applied to your transcript. To replace words with ***, choose mask. To delete words, choose remove. To flag words without changing them, choose tag. */
  VocabularyFilterMethod?: 'remove' | 'mask' | 'tag';
}

export interface ModelSettings {
  /** The name of the custom language model you want to use when processing your transcription job. Note that custom language model names are case sensitive. The language of the specified custom language mo */
  LanguageModelName?: string;
}

export interface JobExecutionSettings {
  /** Makes it possible to enable job queuing when your concurrent request limit is exceeded. When AllowDeferredExecution is set to true, transcription job requests are placed in a queue until the number of */
  AllowDeferredExecution?: boolean;
  /** The Amazon Resource Name (ARN) of an IAM role that has permissions to access the Amazon S3 bucket that contains your input files. If the role that you specify doesn’t have the appropriate permissions  */
  DataAccessRoleArn?: string;
}

export interface Subtitles {
  /** Specify the output format for your subtitle file; if you select both WebVTT (vtt) and SubRip (srt) formats, two output files are generated. */
  Formats?: 'vtt' | 'srt'[];
  /** Specify the starting value that is assigned to the first subtitle segment. The default start index for Amazon Transcribe is 0, which differs from the more widely used standard of 1. If you're uncertai */
  OutputStartIndex?: number;
}

export interface LanguageIdSettings {
  /** The name of the custom vocabulary you want to use when processing your transcription job. Custom vocabulary names are case sensitive. The language of the specified custom vocabulary must match the lan */
  VocabularyName?: string;
  /** The name of the custom vocabulary filter you want to use when processing your transcription job. Custom vocabulary filter names are case sensitive. The language of the specified custom vocabulary filt */
  VocabularyFilterName?: string;
  /** The name of the custom language model you want to use when processing your transcription job. Note that custom language model names are case sensitive. The language of the specified custom language mo */
  LanguageModelName?: string;
}

export interface ToxicityDetectionSettings {
  /** If you include ToxicityDetection in your transcription request, you must also include ToxicityCategories. The only accepted value for this parameter is ALL. */
  ToxicityCategories: any[];
}

export interface CreateCallAnalyticsCategoryInput {
  /** A unique name, chosen by you, for your Call Analytics category. It's helpful to use a detailed naming system that will make sense to you in the future. For example, it's better to use sentiment-positi */
  CategoryName: string;
  /** Rules define a Call Analytics category. When creating a new category, you must create between 1 and 20 rules for that category. For each rule, you specify a filter you want applied to the attributes o */
  Rules: { NonTalkTimeFilter?: any } | { InterruptionFilter?: any } | { TranscriptFilter?: any } | { SentimentFilter?: any }[];
  /** Choose whether you want to create a real-time or a post-call category for your Call Analytics transcription. Specifying POST_CALL assigns your category to post-call transcriptions; categories with thi */
  InputType?: 'REAL_TIME' | 'POST_CALL';
  /** Adds one or more custom tags, each in the form of a key:value pair, to a new call analytics category at the time you start this new job. To learn more about using tags with Amazon Transcribe, refer to */
  Tags?: Tag[];
}

export interface CreateLanguageModelInput {
  /** The Amazon Transcribe standard language model, or base model, used to create your custom language model. Amazon Transcribe offers two options for base models: Wideband and Narrowband. If the audio you */
  BaseModelName: 'NarrowBand' | 'WideBand';
  /** Contains the Amazon S3 location of the training data you want to use to create a new custom language model, and permissions to access this location. When using InputDataConfig, you must include these  */
  InputDataConfig: InputDataConfig;
  /** The language code that represents the language of your model. Each custom language model must contain terms in only one language, and the language you select for your custom language model must match  */
  LanguageCode: 'en-US' | 'hi-IN' | 'es-US' | 'en-GB' | 'en-AU' | 'de-DE' | 'ja-JP';
  /** A unique name, chosen by you, for your custom language model. This name is case sensitive, cannot contain spaces, and must be unique within an Amazon Web Services account. If you try to create a new c */
  ModelName: string;
  /** Adds one or more custom tags, each in the form of a key:value pair, to a new custom language model at the time you create this new model. To learn more about using tags with Amazon Transcribe, refer t */
  Tags?: Tag[];
}

export interface CreateMedicalVocabularyInput {
  /** The language code that represents the language of the entries in your custom vocabulary. US English (en-US) is the only language supported with Amazon Transcribe Medical. */
  LanguageCode: 'af-ZA' | 'ar-AE' | 'ar-SA' | 'da-DK' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fa-IR' | 'fr-CA' | 'fr-FR' | 'he-IL' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'ms-MY' | 'nl-NL' | 'pt-BR' | 'pt-PT' | 'ru-RU' | 'ta-IN' | 'te-IN' | 'tr-TR' | 'zh-CN' | 'zh-TW' | 'th-TH' | 'en-ZA' | 'en-NZ' | 'vi-VN' | 'sv-SE' | 'ab-GE' | 'ast-ES' | 'az-AZ' | 'ba-RU' | 'be-BY' | 'bg-BG' | 'bn-IN' | 'bs-BA' | 'ca-ES' | 'ckb-IQ' | 'ckb-IR' | 'cs-CZ' | 'cy-WL' | 'el-GR' | 'et-EE' | 'et-ET' | 'eu-ES' | 'fi-FI' | 'gl-ES' | 'gu-IN' | 'ha-NG' | 'hr-HR' | 'hu-HU' | 'hy-AM' | 'is-IS' | 'ka-GE' | 'kab-DZ' | 'kk-KZ' | 'kn-IN' | 'ky-KG' | 'lg-IN' | 'lt-LT' | 'lv-LV' | 'mhr-RU' | 'mi-NZ' | 'mk-MK' | 'ml-IN' | 'mn-MN' | 'mr-IN' | 'mt-MT' | 'no-NO' | 'or-IN' | 'pa-IN' | 'pl-PL' | 'ps-AF' | 'ro-RO' | 'rw-RW' | 'si-LK' | 'sk-SK' | 'sl-SI' | 'so-SO' | 'sr-RS' | 'su-ID' | 'sw-BI' | 'sw-KE' | 'sw-RW' | 'sw-TZ' | 'sw-UG' | 'tl-PH' | 'tt-RU' | 'ug-CN' | 'uk-UA' | 'uz-UZ' | 'wo-SN' | 'zh-HK' | 'zu-ZA';
  /** The Amazon S3 location (URI) of the text file that contains your custom medical vocabulary. The URI must be in the same Amazon Web Services Region as the resource you're calling. Here's an example URI */
  VocabularyFileUri: string;
  /** A unique name, chosen by you, for your new custom medical vocabulary. This name is case sensitive, cannot contain spaces, and must be unique within an Amazon Web Services account. If you try to create */
  VocabularyName: string;
  /** Adds one or more custom tags, each in the form of a key:value pair, to a new custom medical vocabulary at the time you create this new custom vocabulary. To learn more about using tags with Amazon Tra */
  Tags?: Tag[];
}

export interface CreateVocabularyInput {
  /** The language code that represents the language of the entries in your custom vocabulary. Each custom vocabulary must contain terms in only one language. A custom vocabulary can only be used to transcr */
  LanguageCode: 'af-ZA' | 'ar-AE' | 'ar-SA' | 'da-DK' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fa-IR' | 'fr-CA' | 'fr-FR' | 'he-IL' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'ms-MY' | 'nl-NL' | 'pt-BR' | 'pt-PT' | 'ru-RU' | 'ta-IN' | 'te-IN' | 'tr-TR' | 'zh-CN' | 'zh-TW' | 'th-TH' | 'en-ZA' | 'en-NZ' | 'vi-VN' | 'sv-SE' | 'ab-GE' | 'ast-ES' | 'az-AZ' | 'ba-RU' | 'be-BY' | 'bg-BG' | 'bn-IN' | 'bs-BA' | 'ca-ES' | 'ckb-IQ' | 'ckb-IR' | 'cs-CZ' | 'cy-WL' | 'el-GR' | 'et-EE' | 'et-ET' | 'eu-ES' | 'fi-FI' | 'gl-ES' | 'gu-IN' | 'ha-NG' | 'hr-HR' | 'hu-HU' | 'hy-AM' | 'is-IS' | 'ka-GE' | 'kab-DZ' | 'kk-KZ' | 'kn-IN' | 'ky-KG' | 'lg-IN' | 'lt-LT' | 'lv-LV' | 'mhr-RU' | 'mi-NZ' | 'mk-MK' | 'ml-IN' | 'mn-MN' | 'mr-IN' | 'mt-MT' | 'no-NO' | 'or-IN' | 'pa-IN' | 'pl-PL' | 'ps-AF' | 'ro-RO' | 'rw-RW' | 'si-LK' | 'sk-SK' | 'sl-SI' | 'so-SO' | 'sr-RS' | 'su-ID' | 'sw-BI' | 'sw-KE' | 'sw-RW' | 'sw-TZ' | 'sw-UG' | 'tl-PH' | 'tt-RU' | 'ug-CN' | 'uk-UA' | 'uz-UZ' | 'wo-SN' | 'zh-HK' | 'zu-ZA';
  /** A unique name, chosen by you, for your new custom vocabulary. This name is case sensitive, cannot contain spaces, and must be unique within an Amazon Web Services account. If you try to create a new c */
  VocabularyName: string;
  /** The Amazon Resource Name (ARN) of an IAM role that has permissions to access the Amazon S3 bucket that contains your input files (in this case, your custom vocabulary). If the role that you specify do */
  DataAccessRoleArn?: string;
  /** Use this parameter if you want to create your custom vocabulary by including all desired terms, as comma-separated values, within your request. The other option for creating your custom vocabulary is  */
  Phrases?: string[];
  /** Adds one or more custom tags, each in the form of a key:value pair, to a new custom vocabulary at the time you create this new custom vocabulary. To learn more about using tags with Amazon Transcribe, */
  Tags?: Tag[];
  /** The Amazon S3 location of the text file that contains your custom vocabulary. The URI must be located in the same Amazon Web Services Region as the resource you're calling. Here's an example URI path: */
  VocabularyFileUri?: string;
}

export interface CreateVocabularyFilterInput {
  /** The language code that represents the language of the entries in your vocabulary filter. Each custom vocabulary filter must contain terms in only one language. A custom vocabulary filter can only be u */
  LanguageCode: 'af-ZA' | 'ar-AE' | 'ar-SA' | 'da-DK' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fa-IR' | 'fr-CA' | 'fr-FR' | 'he-IL' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'ms-MY' | 'nl-NL' | 'pt-BR' | 'pt-PT' | 'ru-RU' | 'ta-IN' | 'te-IN' | 'tr-TR' | 'zh-CN' | 'zh-TW' | 'th-TH' | 'en-ZA' | 'en-NZ' | 'vi-VN' | 'sv-SE' | 'ab-GE' | 'ast-ES' | 'az-AZ' | 'ba-RU' | 'be-BY' | 'bg-BG' | 'bn-IN' | 'bs-BA' | 'ca-ES' | 'ckb-IQ' | 'ckb-IR' | 'cs-CZ' | 'cy-WL' | 'el-GR' | 'et-EE' | 'et-ET' | 'eu-ES' | 'fi-FI' | 'gl-ES' | 'gu-IN' | 'ha-NG' | 'hr-HR' | 'hu-HU' | 'hy-AM' | 'is-IS' | 'ka-GE' | 'kab-DZ' | 'kk-KZ' | 'kn-IN' | 'ky-KG' | 'lg-IN' | 'lt-LT' | 'lv-LV' | 'mhr-RU' | 'mi-NZ' | 'mk-MK' | 'ml-IN' | 'mn-MN' | 'mr-IN' | 'mt-MT' | 'no-NO' | 'or-IN' | 'pa-IN' | 'pl-PL' | 'ps-AF' | 'ro-RO' | 'rw-RW' | 'si-LK' | 'sk-SK' | 'sl-SI' | 'so-SO' | 'sr-RS' | 'su-ID' | 'sw-BI' | 'sw-KE' | 'sw-RW' | 'sw-TZ' | 'sw-UG' | 'tl-PH' | 'tt-RU' | 'ug-CN' | 'uk-UA' | 'uz-UZ' | 'wo-SN' | 'zh-HK' | 'zu-ZA';
  /** A unique name, chosen by you, for your new custom vocabulary filter. This name is case sensitive, cannot contain spaces, and must be unique within an Amazon Web Services account. If you try to create  */
  VocabularyFilterName: string;
  /** The Amazon Resource Name (ARN) of an IAM role that has permissions to access the Amazon S3 bucket that contains your input files (in this case, your custom vocabulary filter). If the role that you spe */
  DataAccessRoleArn?: string;
  /** Adds one or more custom tags, each in the form of a key:value pair, to a new custom vocabulary filter at the time you create this new vocabulary filter. To learn more about using tags with Amazon Tran */
  Tags?: Tag[];
  /** The Amazon S3 location of the text file that contains your custom vocabulary filter terms. The URI must be located in the same Amazon Web Services Region as the resource you're calling. Here's an exam */
  VocabularyFilterFileUri?: string;
  /** Use this parameter if you want to create your custom vocabulary filter by including all desired terms, as comma-separated values, within your request. The other option for creating your vocabulary fil */
  Words?: string[];
}

export interface DeleteCallAnalyticsCategoryInput {
  /** The name of the Call Analytics category you want to delete. Category names are case sensitive. */
  CategoryName: string;
}

export interface DeleteCallAnalyticsJobInput {
  /** The name of the Call Analytics job you want to delete. Job names are case sensitive. */
  CallAnalyticsJobName: string;
}

export interface DeleteLanguageModelInput {
  /** The name of the custom language model you want to delete. Model names are case sensitive. */
  ModelName: string;
}

export interface DeleteMedicalScribeJobInput {
  /** The name of the Medical Scribe job you want to delete. Job names are case sensitive. */
  MedicalScribeJobName: string;
}

export interface DeleteMedicalTranscriptionJobInput {
  /** The name of the medical transcription job you want to delete. Job names are case sensitive. */
  MedicalTranscriptionJobName: string;
}

export interface DeleteMedicalVocabularyInput {
  /** The name of the custom medical vocabulary you want to delete. Custom medical vocabulary names are case sensitive. */
  VocabularyName: string;
}

export interface DeleteTranscriptionJobInput {
  /** The name of the transcription job you want to delete. Job names are case sensitive. */
  TranscriptionJobName: string;
}

export interface DeleteVocabularyInput {
  /** The name of the custom vocabulary you want to delete. Custom vocabulary names are case sensitive. */
  VocabularyName: string;
}

export interface DeleteVocabularyFilterInput {
  /** The name of the custom vocabulary filter you want to delete. Custom vocabulary filter names are case sensitive. */
  VocabularyFilterName: string;
}

export interface DescribeLanguageModelInput {
  /** The name of the custom language model you want information about. Model names are case sensitive. */
  ModelName: string;
}

export interface GetCallAnalyticsCategoryInput {
  /** The name of the Call Analytics category you want information about. Category names are case sensitive. */
  CategoryName: string;
}

export interface GetCallAnalyticsJobInput {
  /** The name of the Call Analytics job you want information about. Job names are case sensitive. */
  CallAnalyticsJobName: string;
}

export interface GetMedicalScribeJobInput {
  /** The name of the Medical Scribe job you want information about. Job names are case sensitive. */
  MedicalScribeJobName: string;
}

export interface GetMedicalTranscriptionJobInput {
  /** The name of the medical transcription job you want information about. Job names are case sensitive. */
  MedicalTranscriptionJobName: string;
}

export interface GetMedicalVocabularyInput {
  /** The name of the custom medical vocabulary you want information about. Custom medical vocabulary names are case sensitive. */
  VocabularyName: string;
}

export interface GetTranscriptionJobInput {
  /** The name of the transcription job you want information about. Job names are case sensitive. */
  TranscriptionJobName: string;
}

export interface GetVocabularyInput {
  /** The name of the custom vocabulary you want information about. Custom vocabulary names are case sensitive. */
  VocabularyName: string;
}

export interface GetVocabularyFilterInput {
  /** The name of the custom vocabulary filter you want information about. Custom vocabulary filter names are case sensitive. */
  VocabularyFilterName: string;
}

export interface ListCallAnalyticsCategoriesInput {
  /** The maximum number of Call Analytics categories to return in each page of results. If there are fewer results than the value that you specify, only the actual results are returned. If you do not speci */
  MaxResults?: number;
  /** If your ListCallAnalyticsCategories request returns more results than can be displayed, NextToken is displayed in the response with an associated string. To get the next page of results, copy this str */
  NextToken?: string;
}

export interface ListCallAnalyticsJobsInput {
  /** Returns only the Call Analytics jobs that contain the specified string. The search is not case sensitive. */
  JobNameContains?: string;
  /** The maximum number of Call Analytics jobs to return in each page of results. If there are fewer results than the value that you specify, only the actual results are returned. If you do not specify a v */
  MaxResults?: number;
  /** If your ListCallAnalyticsJobs request returns more results than can be displayed, NextToken is displayed in the response with an associated string. To get the next page of results, copy this string an */
  NextToken?: string;
  /** Returns only Call Analytics jobs with the specified status. Jobs are ordered by creation date, with the newest job first. If you do not include Status, all Call Analytics jobs are returned. */
  Status?: 'QUEUED' | 'IN_PROGRESS' | 'FAILED' | 'COMPLETED';
}

export interface ListLanguageModelsInput {
  /** The maximum number of custom language models to return in each page of results. If there are fewer results than the value that you specify, only the actual results are returned. If you do not specify  */
  MaxResults?: number;
  /** Returns only the custom language models that contain the specified string. The search is not case sensitive. */
  NameContains?: string;
  /** If your ListLanguageModels request returns more results than can be displayed, NextToken is displayed in the response with an associated string. To get the next page of results, copy this string and r */
  NextToken?: string;
  /** Returns only custom language models with the specified status. Language models are ordered by creation date, with the newest model first. If you do not include StatusEquals, all custom language models */
  StatusEquals?: 'IN_PROGRESS' | 'FAILED' | 'COMPLETED';
}

export interface ListMedicalScribeJobsInput {
  /** Returns only the Medical Scribe jobs that contain the specified string. The search is not case sensitive. */
  JobNameContains?: string;
  /** The maximum number of Medical Scribe jobs to return in each page of results. If there are fewer results than the value that you specify, only the actual results are returned. If you do not specify a v */
  MaxResults?: number;
  /** If your ListMedicalScribeJobs request returns more results than can be displayed, NextToken is displayed in the response with an associated string. To get the next page of results, copy this string an */
  NextToken?: string;
  /** Returns only Medical Scribe jobs with the specified status. Jobs are ordered by creation date, with the newest job first. If you do not include Status, all Medical Scribe jobs are returned. */
  Status?: 'QUEUED' | 'IN_PROGRESS' | 'FAILED' | 'COMPLETED';
}

export interface ListMedicalTranscriptionJobsInput {
  /** Returns only the medical transcription jobs that contain the specified string. The search is not case sensitive. */
  JobNameContains?: string;
  /** The maximum number of medical transcription jobs to return in each page of results. If there are fewer results than the value that you specify, only the actual results are returned. If you do not spec */
  MaxResults?: number;
  /** If your ListMedicalTranscriptionJobs request returns more results than can be displayed, NextToken is displayed in the response with an associated string. To get the next page of results, copy this st */
  NextToken?: string;
  /** Returns only medical transcription jobs with the specified status. Jobs are ordered by creation date, with the newest job first. If you do not include Status, all medical transcription jobs are return */
  Status?: 'QUEUED' | 'IN_PROGRESS' | 'FAILED' | 'COMPLETED';
}

export interface ListMedicalVocabulariesInput {
  /** The maximum number of custom medical vocabularies to return in each page of results. If there are fewer results than the value that you specify, only the actual results are returned. If you do not spe */
  MaxResults?: number;
  /** Returns only the custom medical vocabularies that contain the specified string. The search is not case sensitive. */
  NameContains?: string;
  /** If your ListMedicalVocabularies request returns more results than can be displayed, NextToken is displayed in the response with an associated string. To get the next page of results, copy this string  */
  NextToken?: string;
  /** Returns only custom medical vocabularies with the specified state. Custom vocabularies are ordered by creation date, with the newest vocabulary first. If you do not include StateEquals, all custom med */
  StateEquals?: 'PENDING' | 'READY' | 'FAILED';
}

export interface ListTagsForResourceInput {
  /** Returns a list of all tags associated with the specified Amazon Resource Name (ARN). ARNs have the format arn:partition:service:region:account-id:resource-type/resource-id. For example, arn:aws:transc */
  ResourceArn: string;
}

export interface ListTranscriptionJobsInput {
  /** Returns only the transcription jobs that contain the specified string. The search is not case sensitive. */
  JobNameContains?: string;
  /** The maximum number of transcription jobs to return in each page of results. If there are fewer results than the value that you specify, only the actual results are returned. If you do not specify a va */
  MaxResults?: number;
  /** If your ListTranscriptionJobs request returns more results than can be displayed, NextToken is displayed in the response with an associated string. To get the next page of results, copy this string an */
  NextToken?: string;
  /** Returns only transcription jobs with the specified status. Jobs are ordered by creation date, with the newest job first. If you do not include Status, all transcription jobs are returned. */
  Status?: 'QUEUED' | 'IN_PROGRESS' | 'FAILED' | 'COMPLETED';
}

export interface ListVocabulariesInput {
  /** The maximum number of custom vocabularies to return in each page of results. If there are fewer results than the value that you specify, only the actual results are returned. If you do not specify a v */
  MaxResults?: number;
  /** Returns only the custom vocabularies that contain the specified string. The search is not case sensitive. */
  NameContains?: string;
  /** If your ListVocabularies request returns more results than can be displayed, NextToken is displayed in the response with an associated string. To get the next page of results, copy this string and rep */
  NextToken?: string;
  /** Returns only custom vocabularies with the specified state. Vocabularies are ordered by creation date, with the newest vocabulary first. If you do not include StateEquals, all custom medical vocabulari */
  StateEquals?: 'PENDING' | 'READY' | 'FAILED';
}

export interface ListVocabularyFiltersInput {
  /** The maximum number of custom vocabulary filters to return in each page of results. If there are fewer results than the value that you specify, only the actual results are returned. If you do not speci */
  MaxResults?: number;
  /** Returns only the custom vocabulary filters that contain the specified string. The search is not case sensitive. */
  NameContains?: string;
  /** If your ListVocabularyFilters request returns more results than can be displayed, NextToken is displayed in the response with an associated string. To get the next page of results, copy this string an */
  NextToken?: string;
}

export interface StartCallAnalyticsJobInput {
  /** A unique name, chosen by you, for your Call Analytics job. This name is case sensitive, cannot contain spaces, and must be unique within an Amazon Web Services account. If you try to create a new job  */
  CallAnalyticsJobName: string;
  /** Describes the Amazon S3 location of the media file you want to use in your Call Analytics request. */
  Media: Media;
  /** Makes it possible to specify which speaker is on which channel. For example, if your agent is the first participant to speak, you would set ChannelId to 0 (to indicate the first channel) and Participa */
  ChannelDefinitions?: ChannelDefinition[];
  /** The Amazon Resource Name (ARN) of an IAM role that has permissions to access the Amazon S3 bucket that contains your input files. If the role that you specify doesn’t have the appropriate permissions  */
  DataAccessRoleArn?: string;
  /** The Amazon Resource Name (ARN) of a KMS key that you want to use to encrypt your Call Analytics output. KMS key ARNs have the format arn:partition:kms:region:account:key/key-id. For example: arn:aws:k */
  OutputEncryptionKMSKeyId?: string;
  /** The Amazon S3 location where you want your Call Analytics transcription output stored. You can use any of the following formats to specify the output location: s3://DOC-EXAMPLE-BUCKET s3://DOC-EXAMPLE */
  OutputLocation?: string;
  /** Specify additional optional settings in your request, including content redaction; allows you to apply custom language models, vocabulary filters, and custom vocabularies to your Call Analytics job. */
  Settings?: CallAnalyticsJobSettings;
  /** Adds one or more custom tags, each in the form of a key:value pair, to a new call analytics job at the time you start this new job. To learn more about using tags with Amazon Transcribe, refer to Tagg */
  Tags?: Tag[];
}

export interface StartMedicalScribeJobInput {
  /** The Amazon Resource Name (ARN) of an IAM role that has permissions to access the Amazon S3 bucket that contains your input files, write to the output bucket, and use your KMS key if supplied. If the r */
  DataAccessRoleArn: string;
  Media: Media;
  /** A unique name, chosen by you, for your Medical Scribe job. This name is case sensitive, cannot contain spaces, and must be unique within an Amazon Web Services account. If you try to create a new job  */
  MedicalScribeJobName: string;
  /** The name of the Amazon S3 bucket where you want your Medical Scribe output stored. Do not include the S3:// prefix of the specified bucket. Note that the role specified in the DataAccessRoleArn reques */
  OutputBucketName: string;
  /** Makes it possible to control how your Medical Scribe job is processed using a MedicalScribeSettings object. Specify ChannelIdentification if ChannelDefinitions are set. Enabled ShowSpeakerLabels if Ch */
  Settings: MedicalScribeSettings;
  /** Makes it possible to specify which speaker is on which channel. For example, if the clinician is the first participant to speak, you would set ChannelId of the first ChannelDefinition in the list to 0 */
  ChannelDefinitions?: MedicalScribeChannelDefinition[];
  /** A map of plain text, non-secret key:value pairs, known as encryption context pairs, that provide an added layer of security for your data. For more information, see KMS encryption context and Asymmetr */
  KMSEncryptionContext?: Record<string, string>;
  /** The MedicalScribeContext object that contains contextual information which is used during clinical note generation to add relevant context to the note. */
  MedicalScribeContext?: MedicalScribeContext;
  /** The Amazon Resource Name (ARN) of a KMS key that you want to use to encrypt your Medical Scribe output. KMS key ARNs have the format arn:partition:kms:region:account:key/key-id. For example: arn:aws:k */
  OutputEncryptionKMSKeyId?: string;
  /** Adds one or more custom tags, each in the form of a key:value pair, to the Medical Scribe job. To learn more about using tags with Amazon Transcribe, refer to Tagging resources. */
  Tags?: Tag[];
}

export interface StartMedicalTranscriptionJobInput {
  /** The language code that represents the language spoken in the input media file. US English (en-US) is the only valid value for medical transcription jobs. Any other value you enter for language code re */
  LanguageCode: 'af-ZA' | 'ar-AE' | 'ar-SA' | 'da-DK' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fa-IR' | 'fr-CA' | 'fr-FR' | 'he-IL' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'ms-MY' | 'nl-NL' | 'pt-BR' | 'pt-PT' | 'ru-RU' | 'ta-IN' | 'te-IN' | 'tr-TR' | 'zh-CN' | 'zh-TW' | 'th-TH' | 'en-ZA' | 'en-NZ' | 'vi-VN' | 'sv-SE' | 'ab-GE' | 'ast-ES' | 'az-AZ' | 'ba-RU' | 'be-BY' | 'bg-BG' | 'bn-IN' | 'bs-BA' | 'ca-ES' | 'ckb-IQ' | 'ckb-IR' | 'cs-CZ' | 'cy-WL' | 'el-GR' | 'et-EE' | 'et-ET' | 'eu-ES' | 'fi-FI' | 'gl-ES' | 'gu-IN' | 'ha-NG' | 'hr-HR' | 'hu-HU' | 'hy-AM' | 'is-IS' | 'ka-GE' | 'kab-DZ' | 'kk-KZ' | 'kn-IN' | 'ky-KG' | 'lg-IN' | 'lt-LT' | 'lv-LV' | 'mhr-RU' | 'mi-NZ' | 'mk-MK' | 'ml-IN' | 'mn-MN' | 'mr-IN' | 'mt-MT' | 'no-NO' | 'or-IN' | 'pa-IN' | 'pl-PL' | 'ps-AF' | 'ro-RO' | 'rw-RW' | 'si-LK' | 'sk-SK' | 'sl-SI' | 'so-SO' | 'sr-RS' | 'su-ID' | 'sw-BI' | 'sw-KE' | 'sw-RW' | 'sw-TZ' | 'sw-UG' | 'tl-PH' | 'tt-RU' | 'ug-CN' | 'uk-UA' | 'uz-UZ' | 'wo-SN' | 'zh-HK' | 'zu-ZA';
  Media: Media;
  /** A unique name, chosen by you, for your medical transcription job. The name that you specify is also used as the default name of your transcription output file. If you want to specify a different name  */
  MedicalTranscriptionJobName: string;
  /** The name of the Amazon S3 bucket where you want your medical transcription output stored. Do not include the S3:// prefix of the specified bucket. If you want your output to go to a sub-folder of this */
  OutputBucketName: string;
  /** Specify the predominant medical specialty represented in your media. For batch transcriptions, PRIMARYCARE is the only valid value. If you require additional specialties, refer to . */
  Specialty: 'PRIMARYCARE';
  /** Specify whether your input media contains only one person (DICTATION) or contains a conversation between two people (CONVERSATION). For example, DICTATION could be used for a medical professional want */
  Type: 'CONVERSATION' | 'DICTATION';
  /** Labels all personal health information (PHI) identified in your transcript. For more information, see Identifying personal health information (PHI) in a transcription. */
  ContentIdentificationType?: 'PHI';
  /** A map of plain text, non-secret key:value pairs, known as encryption context pairs, that provide an added layer of security for your data. For more information, see KMS encryption context and Asymmetr */
  KMSEncryptionContext?: Record<string, string>;
  /** Specify the format of your input media file. */
  MediaFormat?: 'mp3' | 'mp4' | 'wav' | 'flac' | 'ogg' | 'amr' | 'webm' | 'm4a';
  /** The sample rate, in hertz, of the audio track in your input media file. If you do not specify the media sample rate, Amazon Transcribe Medical determines it for you. If you specify the sample rate, it */
  MediaSampleRateHertz?: number;
  /** The Amazon Resource Name (ARN) of a KMS key that you want to use to encrypt your medical transcription output. KMS key ARNs have the format arn:partition:kms:region:account:key/key-id. For example: ar */
  OutputEncryptionKMSKeyId?: string;
  /** Use in combination with OutputBucketName to specify the output location of your transcript and, optionally, a unique name for your output file. The default name for your transcription output is the sa */
  OutputKey?: string;
  /** Specify additional optional settings in your request, including channel identification, alternative transcriptions, and speaker partitioning. You can use that to apply custom vocabularies to your tran */
  Settings?: MedicalTranscriptionSetting;
  /** Adds one or more custom tags, each in the form of a key:value pair, to a new medical transcription job at the time you start this new job. To learn more about using tags with Amazon Transcribe, refer  */
  Tags?: Tag[];
}

export interface StartTranscriptionJobInput {
  /** Describes the Amazon S3 location of the media file you want to use in your request. */
  Media: Media;
  /** A unique name, chosen by you, for your transcription job. The name that you specify is also used as the default name of your transcription output file. If you want to specify a different name for your */
  TranscriptionJobName: string;
  /** Makes it possible to redact or flag specified personally identifiable information (PII) in your transcript. If you use ContentRedaction, you must also include the sub-parameters: RedactionOutput and R */
  ContentRedaction?: ContentRedaction;
  /** Enables automatic language identification in your transcription job request. Use this parameter if your media file contains only one language. If your media contains multiple languages, use IdentifyMu */
  IdentifyLanguage?: boolean;
  /** Enables automatic multi-language identification in your transcription job request. Use this parameter if your media file contains more than one language. If your media contains only one language, use  */
  IdentifyMultipleLanguages?: boolean;
  /** Makes it possible to control how your transcription job is processed. Currently, the only JobExecutionSettings modification you can choose is enabling job queueing using the AllowDeferredExecution sub */
  JobExecutionSettings?: JobExecutionSettings;
  /** A map of plain text, non-secret key:value pairs, known as encryption context pairs, that provide an added layer of security for your data. For more information, see KMS encryption context and Asymmetr */
  KMSEncryptionContext?: Record<string, string>;
  /** The language code that represents the language spoken in the input media file. If you're unsure of the language spoken in your media file, consider using IdentifyLanguage or IdentifyMultipleLanguages  */
  LanguageCode?: 'af-ZA' | 'ar-AE' | 'ar-SA' | 'da-DK' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fa-IR' | 'fr-CA' | 'fr-FR' | 'he-IL' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'ms-MY' | 'nl-NL' | 'pt-BR' | 'pt-PT' | 'ru-RU' | 'ta-IN' | 'te-IN' | 'tr-TR' | 'zh-CN' | 'zh-TW' | 'th-TH' | 'en-ZA' | 'en-NZ' | 'vi-VN' | 'sv-SE' | 'ab-GE' | 'ast-ES' | 'az-AZ' | 'ba-RU' | 'be-BY' | 'bg-BG' | 'bn-IN' | 'bs-BA' | 'ca-ES' | 'ckb-IQ' | 'ckb-IR' | 'cs-CZ' | 'cy-WL' | 'el-GR' | 'et-EE' | 'et-ET' | 'eu-ES' | 'fi-FI' | 'gl-ES' | 'gu-IN' | 'ha-NG' | 'hr-HR' | 'hu-HU' | 'hy-AM' | 'is-IS' | 'ka-GE' | 'kab-DZ' | 'kk-KZ' | 'kn-IN' | 'ky-KG' | 'lg-IN' | 'lt-LT' | 'lv-LV' | 'mhr-RU' | 'mi-NZ' | 'mk-MK' | 'ml-IN' | 'mn-MN' | 'mr-IN' | 'mt-MT' | 'no-NO' | 'or-IN' | 'pa-IN' | 'pl-PL' | 'ps-AF' | 'ro-RO' | 'rw-RW' | 'si-LK' | 'sk-SK' | 'sl-SI' | 'so-SO' | 'sr-RS' | 'su-ID' | 'sw-BI' | 'sw-KE' | 'sw-RW' | 'sw-TZ' | 'sw-UG' | 'tl-PH' | 'tt-RU' | 'ug-CN' | 'uk-UA' | 'uz-UZ' | 'wo-SN' | 'zh-HK' | 'zu-ZA';
  /** If using automatic language identification in your request and you want to apply a custom language model, a custom vocabulary, or a custom vocabulary filter, include LanguageIdSettings with the releva */
  LanguageIdSettings?: Record<string, LanguageIdSettings>;
  /** You can specify two or more language codes that represent the languages you think may be present in your media. Including more than five is not recommended. If you're unsure what languages are present */
  LanguageOptions?: 'af-ZA' | 'ar-AE' | 'ar-SA' | 'da-DK' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fa-IR' | 'fr-CA' | 'fr-FR' | 'he-IL' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'ms-MY' | 'nl-NL' | 'pt-BR' | 'pt-PT' | 'ru-RU' | 'ta-IN' | 'te-IN' | 'tr-TR' | 'zh-CN' | 'zh-TW' | 'th-TH' | 'en-ZA' | 'en-NZ' | 'vi-VN' | 'sv-SE' | 'ab-GE' | 'ast-ES' | 'az-AZ' | 'ba-RU' | 'be-BY' | 'bg-BG' | 'bn-IN' | 'bs-BA' | 'ca-ES' | 'ckb-IQ' | 'ckb-IR' | 'cs-CZ' | 'cy-WL' | 'el-GR' | 'et-EE' | 'et-ET' | 'eu-ES' | 'fi-FI' | 'gl-ES' | 'gu-IN' | 'ha-NG' | 'hr-HR' | 'hu-HU' | 'hy-AM' | 'is-IS' | 'ka-GE' | 'kab-DZ' | 'kk-KZ' | 'kn-IN' | 'ky-KG' | 'lg-IN' | 'lt-LT' | 'lv-LV' | 'mhr-RU' | 'mi-NZ' | 'mk-MK' | 'ml-IN' | 'mn-MN' | 'mr-IN' | 'mt-MT' | 'no-NO' | 'or-IN' | 'pa-IN' | 'pl-PL' | 'ps-AF' | 'ro-RO' | 'rw-RW' | 'si-LK' | 'sk-SK' | 'sl-SI' | 'so-SO' | 'sr-RS' | 'su-ID' | 'sw-BI' | 'sw-KE' | 'sw-RW' | 'sw-TZ' | 'sw-UG' | 'tl-PH' | 'tt-RU' | 'ug-CN' | 'uk-UA' | 'uz-UZ' | 'wo-SN' | 'zh-HK' | 'zu-ZA'[];
  /** Specify the format of your input media file. */
  MediaFormat?: 'mp3' | 'mp4' | 'wav' | 'flac' | 'ogg' | 'amr' | 'webm' | 'm4a';
  /** The sample rate, in hertz, of the audio track in your input media file. If you do not specify the media sample rate, Amazon Transcribe determines it for you. If you specify the sample rate, it must ma */
  MediaSampleRateHertz?: number;
  /** Specify the custom language model you want to include with your transcription job. If you include ModelSettings in your request, you must include the LanguageModelName sub-parameter. For more informat */
  ModelSettings?: ModelSettings;
  /** The name of the Amazon S3 bucket where you want your transcription output stored. Do not include the S3:// prefix of the specified bucket. If you want your output to go to a sub-folder of this bucket, */
  OutputBucketName?: string;
  /** The Amazon Resource Name (ARN) of a KMS key that you want to use to encrypt your transcription output. KMS key ARNs have the format arn:partition:kms:region:account:key/key-id. For example: arn:aws:km */
  OutputEncryptionKMSKeyId?: string;
  /** Use in combination with OutputBucketName to specify the output location of your transcript and, optionally, a unique name for your output file. The default name for your transcription output is the sa */
  OutputKey?: string;
  /** Specify additional optional settings in your request, including channel identification, alternative transcriptions, speaker partitioning. You can use that to apply custom vocabularies and vocabulary f */
  Settings?: Settings;
  /** Produces subtitle files for your input media. You can specify WebVTT (*.vtt) and SubRip (*.srt) formats. */
  Subtitles?: Subtitles;
  /** Adds one or more custom tags, each in the form of a key:value pair, to a new transcription job at the time you start this new job. To learn more about using tags with Amazon Transcribe, refer to Taggi */
  Tags?: Tag[];
  /** Enables toxic speech detection in your transcript. If you include ToxicityDetection in your request, you must also include ToxicityCategories. For information on the types of toxic speech Amazon Trans */
  ToxicityDetection?: ToxicityDetectionSettings[];
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource you want to tag. ARNs have the format arn:partition:service:region:account-id:resource-type/resource-id. For example, arn:aws:transcribe:us-west-2:111122 */
  ResourceArn: string;
  /** Adds one or more custom tags, each in the form of a key:value pair, to the specified resource. To learn more about using tags with Amazon Transcribe, refer to Tagging resources. */
  Tags: Tag[];
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the Amazon Transcribe resource you want to remove tags from. ARNs have the format arn:partition:service:region:account-id:resource-type/resource-id. For example, arn: */
  ResourceArn: string;
  /** Removes the specified tag keys from the specified Amazon Transcribe resource. */
  TagKeys: string[];
}

export interface UpdateCallAnalyticsCategoryInput {
  /** The name of the Call Analytics category you want to update. Category names are case sensitive. */
  CategoryName: string;
  /** The rules used for the updated Call Analytics category. The rules you provide in this field replace the ones that are currently being used in the specified category. */
  Rules: { NonTalkTimeFilter?: any } | { InterruptionFilter?: any } | { TranscriptFilter?: any } | { SentimentFilter?: any }[];
  /** Choose whether you want to update a real-time or a post-call category. The input type you specify must match the input type specified when the category was created. For example, if you created a categ */
  InputType?: 'REAL_TIME' | 'POST_CALL';
}

export interface UpdateMedicalVocabularyInput {
  /** The language code that represents the language of the entries in the custom vocabulary you want to update. US English (en-US) is the only language supported with Amazon Transcribe Medical. */
  LanguageCode: 'af-ZA' | 'ar-AE' | 'ar-SA' | 'da-DK' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fa-IR' | 'fr-CA' | 'fr-FR' | 'he-IL' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'ms-MY' | 'nl-NL' | 'pt-BR' | 'pt-PT' | 'ru-RU' | 'ta-IN' | 'te-IN' | 'tr-TR' | 'zh-CN' | 'zh-TW' | 'th-TH' | 'en-ZA' | 'en-NZ' | 'vi-VN' | 'sv-SE' | 'ab-GE' | 'ast-ES' | 'az-AZ' | 'ba-RU' | 'be-BY' | 'bg-BG' | 'bn-IN' | 'bs-BA' | 'ca-ES' | 'ckb-IQ' | 'ckb-IR' | 'cs-CZ' | 'cy-WL' | 'el-GR' | 'et-EE' | 'et-ET' | 'eu-ES' | 'fi-FI' | 'gl-ES' | 'gu-IN' | 'ha-NG' | 'hr-HR' | 'hu-HU' | 'hy-AM' | 'is-IS' | 'ka-GE' | 'kab-DZ' | 'kk-KZ' | 'kn-IN' | 'ky-KG' | 'lg-IN' | 'lt-LT' | 'lv-LV' | 'mhr-RU' | 'mi-NZ' | 'mk-MK' | 'ml-IN' | 'mn-MN' | 'mr-IN' | 'mt-MT' | 'no-NO' | 'or-IN' | 'pa-IN' | 'pl-PL' | 'ps-AF' | 'ro-RO' | 'rw-RW' | 'si-LK' | 'sk-SK' | 'sl-SI' | 'so-SO' | 'sr-RS' | 'su-ID' | 'sw-BI' | 'sw-KE' | 'sw-RW' | 'sw-TZ' | 'sw-UG' | 'tl-PH' | 'tt-RU' | 'ug-CN' | 'uk-UA' | 'uz-UZ' | 'wo-SN' | 'zh-HK' | 'zu-ZA';
  /** The Amazon S3 location of the text file that contains your custom medical vocabulary. The URI must be located in the same Amazon Web Services Region as the resource you're calling. Here's an example U */
  VocabularyFileUri: string;
  /** The name of the custom medical vocabulary you want to update. Custom medical vocabulary names are case sensitive. */
  VocabularyName: string;
}

export interface UpdateVocabularyInput {
  /** The language code that represents the language of the entries in the custom vocabulary you want to update. Each custom vocabulary must contain terms in only one language. A custom vocabulary can only  */
  LanguageCode: 'af-ZA' | 'ar-AE' | 'ar-SA' | 'da-DK' | 'de-CH' | 'de-DE' | 'en-AB' | 'en-AU' | 'en-GB' | 'en-IE' | 'en-IN' | 'en-US' | 'en-WL' | 'es-ES' | 'es-US' | 'fa-IR' | 'fr-CA' | 'fr-FR' | 'he-IL' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'ms-MY' | 'nl-NL' | 'pt-BR' | 'pt-PT' | 'ru-RU' | 'ta-IN' | 'te-IN' | 'tr-TR' | 'zh-CN' | 'zh-TW' | 'th-TH' | 'en-ZA' | 'en-NZ' | 'vi-VN' | 'sv-SE' | 'ab-GE' | 'ast-ES' | 'az-AZ' | 'ba-RU' | 'be-BY' | 'bg-BG' | 'bn-IN' | 'bs-BA' | 'ca-ES' | 'ckb-IQ' | 'ckb-IR' | 'cs-CZ' | 'cy-WL' | 'el-GR' | 'et-EE' | 'et-ET' | 'eu-ES' | 'fi-FI' | 'gl-ES' | 'gu-IN' | 'ha-NG' | 'hr-HR' | 'hu-HU' | 'hy-AM' | 'is-IS' | 'ka-GE' | 'kab-DZ' | 'kk-KZ' | 'kn-IN' | 'ky-KG' | 'lg-IN' | 'lt-LT' | 'lv-LV' | 'mhr-RU' | 'mi-NZ' | 'mk-MK' | 'ml-IN' | 'mn-MN' | 'mr-IN' | 'mt-MT' | 'no-NO' | 'or-IN' | 'pa-IN' | 'pl-PL' | 'ps-AF' | 'ro-RO' | 'rw-RW' | 'si-LK' | 'sk-SK' | 'sl-SI' | 'so-SO' | 'sr-RS' | 'su-ID' | 'sw-BI' | 'sw-KE' | 'sw-RW' | 'sw-TZ' | 'sw-UG' | 'tl-PH' | 'tt-RU' | 'ug-CN' | 'uk-UA' | 'uz-UZ' | 'wo-SN' | 'zh-HK' | 'zu-ZA';
  /** The name of the custom vocabulary you want to update. Custom vocabulary names are case sensitive. */
  VocabularyName: string;
  /** The Amazon Resource Name (ARN) of an IAM role that has permissions to access the Amazon S3 bucket that contains your input files (in this case, your custom vocabulary). If the role that you specify do */
  DataAccessRoleArn?: string;
  /** Use this parameter if you want to update your custom vocabulary by including all desired terms, as comma-separated values, within your request. The other option for updating your custom vocabulary is  */
  Phrases?: string[];
  /** The Amazon S3 location of the text file that contains your custom vocabulary. The URI must be located in the same Amazon Web Services Region as the resource you're calling. Here's an example URI path: */
  VocabularyFileUri?: string;
}

export interface UpdateVocabularyFilterInput {
  /** The name of the custom vocabulary filter you want to update. Custom vocabulary filter names are case sensitive. */
  VocabularyFilterName: string;
  /** The Amazon Resource Name (ARN) of an IAM role that has permissions to access the Amazon S3 bucket that contains your input files (in this case, your custom vocabulary filter). If the role that you spe */
  DataAccessRoleArn?: string;
  /** The Amazon S3 location of the text file that contains your custom vocabulary filter terms. The URI must be located in the same Amazon Web Services Region as the resource you're calling. Here's an exam */
  VocabularyFilterFileUri?: string;
  /** Use this parameter if you want to update your custom vocabulary filter by including all desired terms, as comma-separated values, within your request. The other option for updating your vocabulary fil */
  Words?: string[];
}

/** Transcribe service binding for Step Functions SDK integrations. */
export class Transcribe {
  constructor() {}

  createCallAnalyticsCategory<T>(params: CreateCallAnalyticsCategoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLanguageModel<T>(params: CreateLanguageModelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createMedicalVocabulary<T>(params: CreateMedicalVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVocabulary<T>(params: CreateVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVocabularyFilter<T>(params: CreateVocabularyFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCallAnalyticsCategory<T>(params: DeleteCallAnalyticsCategoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCallAnalyticsJob<T>(params: DeleteCallAnalyticsJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLanguageModel<T>(params: DeleteLanguageModelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteMedicalScribeJob<T>(params: DeleteMedicalScribeJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteMedicalTranscriptionJob<T>(params: DeleteMedicalTranscriptionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteMedicalVocabulary<T>(params: DeleteMedicalVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTranscriptionJob<T>(params: DeleteTranscriptionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVocabulary<T>(params: DeleteVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVocabularyFilter<T>(params: DeleteVocabularyFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLanguageModel<T>(params: DescribeLanguageModelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCallAnalyticsCategory<T>(params: GetCallAnalyticsCategoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCallAnalyticsJob<T>(params: GetCallAnalyticsJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMedicalScribeJob<T>(params: GetMedicalScribeJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMedicalTranscriptionJob<T>(params: GetMedicalTranscriptionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMedicalVocabulary<T>(params: GetMedicalVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTranscriptionJob<T>(params: GetTranscriptionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVocabulary<T>(params: GetVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVocabularyFilter<T>(params: GetVocabularyFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCallAnalyticsCategories<T>(params: ListCallAnalyticsCategoriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCallAnalyticsJobs<T>(params: ListCallAnalyticsJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLanguageModels<T>(params: ListLanguageModelsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMedicalScribeJobs<T>(params: ListMedicalScribeJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMedicalTranscriptionJobs<T>(params: ListMedicalTranscriptionJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMedicalVocabularies<T>(params: ListMedicalVocabulariesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTranscriptionJobs<T>(params: ListTranscriptionJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listVocabularies<T>(params: ListVocabulariesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listVocabularyFilters<T>(params: ListVocabularyFiltersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startCallAnalyticsJob<T>(params: StartCallAnalyticsJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startMedicalScribeJob<T>(params: StartMedicalScribeJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startMedicalTranscriptionJob<T>(params: StartMedicalTranscriptionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startTranscriptionJob<T>(params: StartTranscriptionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateCallAnalyticsCategory<T>(params: UpdateCallAnalyticsCategoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateMedicalVocabulary<T>(params: UpdateMedicalVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateVocabulary<T>(params: UpdateVocabularyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateVocabularyFilter<T>(params: UpdateVocabularyFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
