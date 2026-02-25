// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface AccelerationSettings {
  /** Specify the conditions when the service will run your job with accelerated transcoding. */
  Mode: 'DISABLED' | 'ENABLED' | 'PREFERRED';
}

export interface HopDestination {
  /** Optional. When you set up a job to use queue hopping, you can specify a different relative priority for the job in the destination queue. If you don't specify, the relative priority will remain the sa */
  Priority?: number;
  /** Optional unless the job is submitted on the default queue. When you set up a job to use queue hopping, you can specify a destination queue. This queue cannot be the original queue to which the job is  */
  Queue?: string;
  /** Required for setting up a job to use queue hopping. Minimum wait time in minutes until the job can hop to the destination queue. Valid range is 1 to 4320 minutes, inclusive. */
  WaitMinutes?: number;
}

export interface AvailBlanking {
  /** Blanking image to be used. Leave empty for solid black. Only bmp and png images are supported. */
  AvailBlankingImage?: string;
}

export interface EsamSettings {
  /** Specifies an ESAM ManifestConfirmConditionNotification XML as per OC-SP-ESAM-API-I03-131025. The transcoder uses the manifest conditioning instructions that you provide in the setting MCC XML. */
  ManifestConfirmConditionNotification?: any;
  /** Specifies the stream distance, in milliseconds, between the SCTE 35 messages that the transcoder places and the splice points that they refer to. If the time between the start of the asset and the SCT */
  ResponseSignalPreroll?: number;
  /** Specifies an ESAM SignalProcessingNotification XML as per OC-SP-ESAM-API-I03-131025. The transcoder uses the signal processing instructions that you provide in the setting SCC XML. */
  SignalProcessingNotification?: any;
}

export interface ExtendedDataServices {
  /** The action to take on copy and redistribution control XDS packets. If you select PASSTHROUGH, packets will not be changed. If you select STRIP, any packets will be removed in output captions. */
  CopyProtectionAction?: 'PASSTHROUGH' | 'STRIP';
  /** The action to take on content advisory XDS packets. If you select PASSTHROUGH, packets will not be changed. If you select STRIP, any packets will be removed in output captions. */
  VchipAction?: 'PASSTHROUGH' | 'STRIP';
}

export interface KantarWatermarkSettings {
  /** Provide an audio channel name from your Kantar audio license. */
  ChannelName?: string;
  /** Specify a unique identifier for Kantar to use for this piece of content. */
  ContentReference?: string;
  /** Provide the name of the AWS Secrets Manager secret where your Kantar credentials are stored. Note that your MediaConvert service role must provide access to this secret. For more information, see http */
  CredentialsSecretName?: string;
  /** Optional. Specify an offset, in whole seconds, from the start of your output and the beginning of the watermarking. When you don't specify an offset, Kantar defaults to zero. */
  FileOffset?: number;
  /** Provide your Kantar license ID number. You should get this number from Kantar. */
  KantarLicenseId?: number;
  /** Provide the HTTPS endpoint to the Kantar server. You should get this endpoint from Kantar. */
  KantarServerUrl?: string;
  /** Optional. Specify the Amazon S3 bucket where you want MediaConvert to store your Kantar watermark XML logs. When you don't specify a bucket, MediaConvert doesn't save these logs. Note that your MediaC */
  LogDestination?: string;
  /** You can optionally use this field to specify the first timestamp that Kantar embeds during watermarking. Kantar suggests that you be very cautious when using this Kantar feature, and that you use it o */
  Metadata3?: string;
  /** Additional metadata that MediaConvert sends to Kantar. Maximum length is 50 characters. */
  Metadata4?: string;
  /** Additional metadata that MediaConvert sends to Kantar. Maximum length is 50 characters. */
  Metadata5?: string;
  /** Additional metadata that MediaConvert sends to Kantar. Maximum length is 50 characters. */
  Metadata6?: string;
  /** Additional metadata that MediaConvert sends to Kantar. Maximum length is 50 characters. */
  Metadata7?: string;
  /** Additional metadata that MediaConvert sends to Kantar. Maximum length is 50 characters. */
  Metadata8?: string;
}

export interface MotionImageInserter {
  /** If your motion graphic asset is a .mov file, keep this setting unspecified. If your motion graphic asset is a series of .png files, specify the frame rate of the overlay in frames per second, as a fra */
  Framerate?: any;
  /** Specify the .mov file or series of .png files that you want to overlay on your video. For .png files, provide the file name of the first file in the series. Make sure that the names of the .png files  */
  Input?: string;
  /** Choose the type of motion graphic asset that you are providing for your overlay. You can choose either a .mov file or a series of .png files. */
  InsertionMode?: 'MOV' | 'PNG';
  /** Use Offset to specify the placement of your motion graphic overlay on the video frame. Specify in pixels, from the upper-left corner of the frame. If you don't specify an offset, the service scales yo */
  Offset?: any;
  /** Specify whether your motion graphic overlay repeats on a loop or plays only once. */
  Playback?: 'ONCE' | 'REPEAT';
  /** Specify when the motion overlay begins. Use timecode format (HH:MM:SS:FF or HH:MM:SS;FF). Make sure that the timecode you provide here takes into account how you have set up your timecode configuratio */
  StartTime?: string;
}

export interface NielsenConfiguration {
  /** Nielsen has discontinued the use of breakout code functionality. If you must include this property, set the value to zero. */
  BreakoutCode?: number;
  /** Use Distributor ID to specify the distributor ID that is assigned to your organization by Nielsen. */
  DistributorId?: string;
}

export interface NielsenNonLinearWatermarkSettings {
  /** Choose the type of Nielsen watermarks that you want in your outputs. When you choose NAES 2 and NW, you must provide a value for the setting SID. When you choose CBET, you must provide a value for the */
  ActiveWatermarkProcess?: 'NAES2_AND_NW' | 'CBET' | 'NAES2_AND_NW_AND_CBET';
  /** Optional. Use this setting when you want the service to include an ADI file in the Nielsen metadata .zip file. To provide an ADI file, store it in Amazon S3 and provide a URL to it here. The URL shoul */
  AdiFilename?: string;
  /** Use the asset ID that you provide to Nielsen to uniquely identify this asset. Required for all Nielsen non-linear watermarking. */
  AssetId?: string;
  /** Use the asset name that you provide to Nielsen for this asset. Required for all Nielsen non-linear watermarking. */
  AssetName?: string;
  /** Use the CSID that Nielsen provides to you. This CBET source ID should be unique to your Nielsen account but common to all of your output assets that have CBET watermarking. Required when you choose a  */
  CbetSourceId?: string;
  /** Optional. If this asset uses an episode ID with Nielsen, provide it here. */
  EpisodeId?: string;
  /** Specify the Amazon S3 location where you want MediaConvert to save your Nielsen non-linear metadata .zip file. This Amazon S3 bucket must be in the same Region as the one where you do your MediaConver */
  MetadataDestination?: string;
  /** Use the SID that Nielsen provides to you. This source ID should be unique to your Nielsen account but common to all of your output assets. Required for all Nielsen non-linear watermarking. This ID sho */
  SourceId?: number;
  /** Required. Specify whether your source content already contains Nielsen non-linear watermarks. When you set this value to Watermarked, the service fails the job. Nielsen requires that you add non-linea */
  SourceWatermarkStatus?: 'CLEAN' | 'WATERMARKED';
  /** Specify the endpoint for the TIC server that you have deployed and configured in the AWS Cloud. Required for all Nielsen non-linear watermarking. MediaConvert can't connect directly to a TIC server. I */
  TicServerUrl?: string;
  /** To create assets that have the same TIC values in each audio track, keep the default value Share TICs. To create assets that have unique TIC values for each audio track, choose Use unique TICs. */
  UniqueTicPerAudioTrack?: 'RESERVE_UNIQUE_TICS_PER_TRACK' | 'SAME_TICS_PER_TRACK';
}

export interface TimecodeConfig {
  /** If you use an editing platform that relies on an anchor timecode, use Anchor Timecode to specify a timecode that will match the input video frame to the output video frame. Use 24-hour format with fra */
  Anchor?: string;
  /** Use Source to set how timecodes are handled within this job. To make sure that your video, audio, captions, and markers are synchronized and that time-based features, such as image inserter, work corr */
  Source?: 'EMBEDDED' | 'ZEROBASED' | 'SPECIFIEDSTART';
  /** Only use when you set Source to Specified start. Use Start timecode to specify the timecode for the initial frame. Use 24-hour format with frame number, (HH:MM:SS:FF) or (HH:MM:SS;FF). */
  Start?: string;
  /** Only applies to outputs that support program-date-time stamp. Use Timestamp offset to overwrite the timecode date without affecting the time and frame number. Provide the new date as a string in the f */
  TimestampOffset?: string;
}

export interface TimedMetadataInsertion {
  /** Id3Insertions contains the array of Id3Insertion instances. */
  Id3Insertions?: any[];
}

export interface JobSettings {
  /** When specified, this offset (in milliseconds) is added to the input Ad Avail PTS time. */
  AdAvailOffset?: number;
  /** Settings for ad avail blanking. Video can be blanked or overlaid with an image, and audio muted during SCTE-35 triggered ad avails. */
  AvailBlanking?: AvailBlanking;
  /** Use 3D LUTs to specify custom color mapping behavior when you convert from one color space into another. You can include up to 8 different 3D LUTs. For more information, see: https://docs.aws.amazon.c */
  ColorConversion3DLUTSettings?: any[];
  /** Settings for Event Signaling And Messaging (ESAM). If you don't do ad insertion, you can ignore these settings. */
  Esam?: EsamSettings;
  /** If your source content has EIA-608 Line 21 Data Services, enable this feature to specify what MediaConvert does with the Extended Data Services (XDS) packets. You can choose to pass through XDS packet */
  ExtendedDataServices?: ExtendedDataServices;
  /** Specify the input that MediaConvert references for your default output settings. MediaConvert uses this input's Resolution, Frame rate, and Pixel aspect ratio for all outputs that you don't manually s */
  FollowSource?: number;
  /** Use Inputs to define source file used in the transcode job. There can be multiple inputs add in a job. These inputs will be concantenated together to create the output. */
  Inputs?: any[];
  /** Use these settings only when you use Kantar watermarking. Specify the values that MediaConvert uses to generate and place Kantar watermarks in your output audio. These settings apply to every output i */
  KantarWatermark?: KantarWatermarkSettings;
  /** Overlay motion graphics on top of your video. The motion graphics that you specify here appear on all outputs in all output groups. For more information, see https://docs.aws.amazon.com/mediaconvert/l */
  MotionImageInserter?: MotionImageInserter;
  /** Settings for your Nielsen configuration. If you don't do Nielsen measurement and analytics, ignore these settings. When you enable Nielsen configuration, MediaConvert enables PCM to ID3 tagging for al */
  NielsenConfiguration?: NielsenConfiguration;
  /** Ignore these settings unless you are using Nielsen non-linear watermarking. Specify the values that MediaConvert uses to generate and place Nielsen watermarks in your output audio. In addition to spec */
  NielsenNonLinearWatermark?: NielsenNonLinearWatermarkSettings;
  /** Contains one group of settings for each set of outputs that share a common package type. All unpackaged files (MPEG-4, MPEG-2 TS, Quicktime, MXF, and no container) are grouped in a single output group */
  OutputGroups?: any[];
  /** These settings control how the service handles timecodes throughout the job. These settings don't affect input clipping. */
  TimecodeConfig?: TimecodeConfig;
  /** Insert user-defined custom ID3 metadata at timecodes that you specify. In each output that you want to include this metadata, you must set ID3 metadata to Passthrough. */
  TimedMetadataInsertion?: TimedMetadataInsertion;
}

export interface JobTemplateSettings {
  /** When specified, this offset (in milliseconds) is added to the input Ad Avail PTS time. */
  AdAvailOffset?: number;
  /** Settings for ad avail blanking. Video can be blanked or overlaid with an image, and audio muted during SCTE-35 triggered ad avails. */
  AvailBlanking?: AvailBlanking;
  /** Use 3D LUTs to specify custom color mapping behavior when you convert from one color space into another. You can include up to 8 different 3D LUTs. For more information, see: https://docs.aws.amazon.c */
  ColorConversion3DLUTSettings?: any[];
  /** Settings for Event Signaling And Messaging (ESAM). If you don't do ad insertion, you can ignore these settings. */
  Esam?: EsamSettings;
  /** If your source content has EIA-608 Line 21 Data Services, enable this feature to specify what MediaConvert does with the Extended Data Services (XDS) packets. You can choose to pass through XDS packet */
  ExtendedDataServices?: ExtendedDataServices;
  /** Specify the input that MediaConvert references for your default output settings. MediaConvert uses this input's Resolution, Frame rate, and Pixel aspect ratio for all outputs that you don't manually s */
  FollowSource?: number;
  /** Use Inputs to define the source file used in the transcode job. There can only be one input in a job template. Using the API, you can include multiple inputs when referencing a job template. */
  Inputs?: any[];
  /** Use these settings only when you use Kantar watermarking. Specify the values that MediaConvert uses to generate and place Kantar watermarks in your output audio. These settings apply to every output i */
  KantarWatermark?: KantarWatermarkSettings;
  /** Overlay motion graphics on top of your video. The motion graphics that you specify here appear on all outputs in all output groups. For more information, see https://docs.aws.amazon.com/mediaconvert/l */
  MotionImageInserter?: MotionImageInserter;
  /** Settings for your Nielsen configuration. If you don't do Nielsen measurement and analytics, ignore these settings. When you enable Nielsen configuration, MediaConvert enables PCM to ID3 tagging for al */
  NielsenConfiguration?: NielsenConfiguration;
  /** Ignore these settings unless you are using Nielsen non-linear watermarking. Specify the values that MediaConvert uses to generate and place Nielsen watermarks in your output audio. In addition to spec */
  NielsenNonLinearWatermark?: NielsenNonLinearWatermarkSettings;
  /** Contains one group of settings for each set of outputs that share a common package type. All unpackaged files (MPEG-4, MPEG-2 TS, Quicktime, MXF, and no container) are grouped in a single output group */
  OutputGroups?: any[];
  /** These settings control how the service handles timecodes throughout the job. These settings don't affect input clipping. */
  TimecodeConfig?: TimecodeConfig;
  /** Insert user-defined custom ID3 metadata at timecodes that you specify. In each output that you want to include this metadata, you must set ID3 metadata to Passthrough. */
  TimedMetadataInsertion?: TimedMetadataInsertion;
}

export interface ContainerSettings {
  /** These settings relate to the fragmented MP4 container for the segments in your CMAF outputs. */
  CmfcSettings?: any;
  /** Container for this output. Some containers require a container settings object. If not specified, the default object will be created. */
  Container?: 'F4V' | 'GIF' | 'ISMV' | 'M2TS' | 'M3U8' | 'CMFC' | 'MOV' | 'MP4' | 'MPD' | 'MXF' | 'OGG' | 'WEBM' | 'RAW' | 'Y4M';
  /** Settings for F4v container */
  F4vSettings?: any;
  /** MPEG-2 TS container settings. These apply to outputs in a File output group when the output's container is MPEG-2 Transport Stream (M2TS). In these assets, data is organized by the program map table ( */
  M2tsSettings?: any;
  /** These settings relate to the MPEG-2 transport stream (MPEG2-TS) container for the MPEG2-TS segments in your HLS outputs. */
  M3u8Settings?: any;
  /** These settings relate to your QuickTime MOV output container. */
  MovSettings?: any;
  /** These settings relate to your MP4 output container. You can create audio only outputs with this container. For more information, see https://docs.aws.amazon.com/mediaconvert/latest/ug/supported-codecs */
  Mp4Settings?: any;
  /** These settings relate to the fragmented MP4 container for the segments in your DASH outputs. */
  MpdSettings?: any;
  /** These settings relate to your MXF output container. */
  MxfSettings?: any;
}

export interface VideoDescription {
  /** This setting only applies to H.264, H.265, and MPEG2 outputs. Use Insert AFD signaling to specify whether the service includes AFD values in the output video data and what those values are. * Choose N */
  AfdSignaling?: 'NONE' | 'AUTO' | 'FIXED';
  /** The anti-alias filter is automatically applied to all outputs. The service no longer accepts the value DISABLED for AntiAlias. If you specify that in your job, the service will ignore the setting. */
  AntiAlias?: 'DISABLED' | 'ENABLED';
  /** Specify the chroma sample positioning metadata for your H.264 or H.265 output. To have MediaConvert automatically determine chroma positioning: We recommend that you keep the default value, Auto. To s */
  ChromaPositionMode?: 'AUTO' | 'FORCE_CENTER' | 'FORCE_TOP_LEFT';
  /** Video codec settings contains the group of settings related to video encoding. The settings in this group vary depending on the value that you choose for Video codec. For each codec enum that you choo */
  CodecSettings?: any;
  /** Choose Insert for this setting to include color metadata in this output. Choose Ignore to exclude color metadata from this output. If you don't specify a value, the service sets this to Insert by defa */
  ColorMetadata?: 'IGNORE' | 'INSERT';
  /** Use Cropping selection to specify the video area that the service will include in the output video frame. */
  Crop?: any;
  /** Applies only to 29.97 fps outputs. When this feature is enabled, the service will use drop-frame timecode on outputs. If it is not possible to use drop-frame timecode, the system will fall back to non */
  DropFrameTimecode?: 'DISABLED' | 'ENABLED';
  /** Applies only if you set AFD Signaling to Fixed. Use Fixed to specify a four-bit AFD value which the service will write on all frames of this video output. */
  FixedAfd?: number;
  /** Use Height to define the video resolution height, in pixels, for this output. To use the same resolution as your input: Leave both Width and Height blank. To evenly scale from your input resolution: L */
  Height?: number;
  /** Use Selection placement to define the video area in your output frame. The area outside of the rectangle that you specify here is black. */
  Position?: any;
  /** Use Respond to AFD to specify how the service changes the video itself in response to AFD values in the input. * Choose Respond to clip the input video frame according to the AFD value, input display  */
  RespondToAfd?: 'NONE' | 'RESPOND' | 'PASSTHROUGH';
  /** Specify the video Scaling behavior when your output has a different resolution than your input. For more information, see https://docs.aws.amazon.com/mediaconvert/latest/ug/video-scaling.html */
  ScalingBehavior?: 'DEFAULT' | 'STRETCH_TO_OUTPUT' | 'FIT' | 'FIT_NO_UPSCALE' | 'FILL';
  /** Use Sharpness setting to specify the strength of anti-aliasing. This setting changes the width of the anti-alias filter kernel used for scaling. Sharpness only applies if your output resolution is dif */
  Sharpness?: number;
  /** Applies only to H.264, H.265, MPEG2, and ProRes outputs. Only enable Timecode insertion when the input frame rate is identical to the output frame rate. To include timecodes in this output, set Timeco */
  TimecodeInsertion?: 'DISABLED' | 'PIC_TIMING_SEI';
  /** To include a timecode track in your MP4 output: Choose Enabled. MediaConvert writes the timecode track in the Null Media Header box (NMHD), without any timecode text formatting information. You can al */
  TimecodeTrack?: 'DISABLED' | 'ENABLED';
  /** Find additional transcoding features under Preprocessors. Enable the features at each output individually. These features are disabled by default. */
  VideoPreprocessors?: any;
  /** Use Width to define the video resolution width, in pixels, for this output. To use the same resolution as your input: Leave both Width and Height blank. To evenly scale from your input resolution: Lea */
  Width?: number;
}

export interface PresetSettings {
  /** Contains groups of audio encoding settings organized by audio codec. Include one instance of per output. Can contain multiple groups of encoding settings. */
  AudioDescriptions?: any[];
  /** This object holds groups of settings related to captions for one output. For each output that has captions, include one instance of CaptionDescriptions. */
  CaptionDescriptions?: any[];
  /** Container specific settings. */
  ContainerSettings?: ContainerSettings;
  /** VideoDescription contains a group of video encoding settings. The specific video settings depend on the video codec that you choose for the property codec. Include one instance of VideoDescription per */
  VideoDescription?: VideoDescription;
}

export interface ReservationPlanSettings {
  /** The length of the term of your reserved queue pricing plan commitment. */
  Commitment: 'ONE_YEAR';
  /** Specifies whether the term of your reserved queue pricing plan is automatically extended (AUTO_RENEW) or expires (EXPIRE) at the end of the term. When your term is auto renewed, you extend your commit */
  RenewalType: 'AUTO_RENEW' | 'EXPIRE';
  /** Specifies the number of reserved transcode slots (RTS) for this queue. The number of RTS determines how many jobs the queue can process in parallel; each RTS can process one job at a time. You can't d */
  ReservedSlots: number;
}

export interface ProbeInputFile {
  /** Specify the S3, HTTP, or HTTPS URL for your media file. */
  FileUrl?: string;
}

export interface Policy {
  /** Allow or disallow jobs that specify HTTP inputs. */
  HttpInputs?: 'ALLOWED' | 'DISALLOWED';
  /** Allow or disallow jobs that specify HTTPS inputs. */
  HttpsInputs?: 'ALLOWED' | 'DISALLOWED';
  /** Allow or disallow jobs that specify Amazon S3 inputs. */
  S3Inputs?: 'ALLOWED' | 'DISALLOWED';
}

export interface JobsQueryFilter {
  /** Specify job details to filter for while performing a jobs query. You specify these filters as part of a key-value pair within the JobsQueryFilter array. The following list describes which keys are ava */
  Key?: 'queue' | 'status' | 'fileInput' | 'jobEngineVersionRequested' | 'jobEngineVersionUsed' | 'audioCodec' | 'videoCodec';
  /** A list of values associated with a JobsQueryFilterKey. */
  Values?: any[];
}

export interface AssociateCertificateInput {
  /** The ARN of the ACM certificate that you want to associate with your MediaConvert resource. */
  Arn: string;
}

export interface CancelJobInput {
  /** The Job ID of the job to be cancelled. */
  Id: string;
}

export interface CreateJobInput {
  /** Required. The IAM role you use for creating this job. For details about permissions, see the User Guide topic at the User Guide at https://docs.aws.amazon.com/mediaconvert/latest/ug/iam-role.html. */
  Role: string;
  /** JobSettings contains all the transcode settings for a job. */
  Settings: JobSettings;
  /** Optional. Accelerated transcoding can significantly speed up jobs with long, visually complex content. Outputs that use this feature incur pro-tier pricing. For information about feature limitations,  */
  AccelerationSettings?: AccelerationSettings;
  /** Optionally choose a Billing tags source that AWS Billing and Cost Management will use to display tags for individual output costs on any billing report that you set up. Leave blank to use the default  */
  BillingTagsSource?: 'QUEUE' | 'PRESET' | 'JOB_TEMPLATE' | 'JOB';
  /** Prevent duplicate jobs from being created and ensure idempotency for your requests. A client request token can be any string that includes up to 64 ASCII characters. If you reuse a client request toke */
  ClientRequestToken?: string;
  /** Optional. Use queue hopping to avoid overly long waits in the backlog of the queue that you submit your job to. Specify an alternate queue and the maximum time that your job will wait in the initial q */
  HopDestinations?: HopDestination[];
  /** Use Job engine versions to run jobs for your production workflow on one version, while you test and validate the latest version. Job engine versions represent periodically grouped MediaConvert release */
  JobEngineVersion?: string;
  /** Optional. When you create a job, you can either specify a job template or specify the transcoding settings individually. */
  JobTemplate?: string;
  /** Optional. Specify the relative priority for this job. In any given queue, the service begins processing the job with the highest value first. When more than one job has the same priority, the service  */
  Priority?: number;
  /** Optional. When you create a job, you can specify a queue to send it to. If you don't specify, the job will go to the default queue. For more about queues, see the User Guide topic at https://docs.aws. */
  Queue?: string;
  /** Optional. Enable this setting when you run a test job to estimate how many reserved transcoding slots (RTS) you need. When this is enabled, MediaConvert runs your job from an on-demand queue with simi */
  SimulateReservedQueue?: 'DISABLED' | 'ENABLED';
  /** Optional. Specify how often MediaConvert sends STATUS_UPDATE events to Amazon CloudWatch Events. Set the interval, in seconds, between status updates. MediaConvert sends an update at this interval fro */
  StatusUpdateInterval?: 'SECONDS_10' | 'SECONDS_12' | 'SECONDS_15' | 'SECONDS_20' | 'SECONDS_30' | 'SECONDS_60' | 'SECONDS_120' | 'SECONDS_180' | 'SECONDS_240' | 'SECONDS_300' | 'SECONDS_360' | 'SECONDS_420' | 'SECONDS_480' | 'SECONDS_540' | 'SECONDS_600';
  /** Optional. The tags that you want to add to the resource. You can tag resources with a key-value pair or with only a key. Use standard AWS tags on your job for automatic integration with AWS services a */
  Tags?: Record<string, string>;
  /** Optional. User-defined metadata that you want to associate with an MediaConvert job. You specify metadata in key/value pairs. Use only for existing integrations or workflows that rely on job metadata  */
  UserMetadata?: Record<string, string>;
}

export interface CreateJobTemplateInput {
  /** The name of the job template you are creating. */
  Name: string;
  /** JobTemplateSettings contains all the transcode settings saved in the template that will be applied to jobs created from it. */
  Settings: JobTemplateSettings;
  /** Accelerated transcoding can significantly speed up jobs with long, visually complex content. Outputs that use this feature incur pro-tier pricing. For information about feature limitations, see the AW */
  AccelerationSettings?: AccelerationSettings;
  /** Optional. A category for the job template you are creating */
  Category?: string;
  /** Optional. A description of the job template you are creating. */
  Description?: string;
  /** Optional. Use queue hopping to avoid overly long waits in the backlog of the queue that you submit your job to. Specify an alternate queue and the maximum time that your job will wait in the initial q */
  HopDestinations?: HopDestination[];
  /** Specify the relative priority for this job. In any given queue, the service begins processing the job with the highest value first. When more than one job has the same priority, the service begins pro */
  Priority?: number;
  /** Optional. The queue that jobs created from this template are assigned to. If you don't specify this, jobs will go to the default queue. */
  Queue?: string;
  /** Specify how often MediaConvert sends STATUS_UPDATE events to Amazon CloudWatch Events. Set the interval, in seconds, between status updates. MediaConvert sends an update at this interval from the time */
  StatusUpdateInterval?: 'SECONDS_10' | 'SECONDS_12' | 'SECONDS_15' | 'SECONDS_20' | 'SECONDS_30' | 'SECONDS_60' | 'SECONDS_120' | 'SECONDS_180' | 'SECONDS_240' | 'SECONDS_300' | 'SECONDS_360' | 'SECONDS_420' | 'SECONDS_480' | 'SECONDS_540' | 'SECONDS_600';
  /** The tags that you want to add to the resource. You can tag resources with a key-value pair or with only a key. */
  Tags?: Record<string, string>;
}

export interface CreatePresetInput {
  /** The name of the preset you are creating. */
  Name: string;
  /** Settings for preset */
  Settings: PresetSettings;
  /** Optional. A category for the preset you are creating. */
  Category?: string;
  /** Optional. A description of the preset you are creating. */
  Description?: string;
  /** The tags that you want to add to the resource. You can tag resources with a key-value pair or with only a key. */
  Tags?: Record<string, string>;
}

export interface CreateQueueInput {
  /** The name of the queue that you are creating. */
  Name: string;
  /** Specify the maximum number of jobs your queue can process concurrently. For on-demand queues, the value you enter is constrained by your service quotas for Maximum concurrent jobs, per on-demand queue */
  ConcurrentJobs?: number;
  /** Optional. A description of the queue that you are creating. */
  Description?: string;
  /** Specifies whether the pricing plan for the queue is on-demand or reserved. For on-demand, you pay per minute, billed in increments of .01 minute. For reserved, you pay for the transcoding capacity of  */
  PricingPlan?: 'ON_DEMAND' | 'RESERVED';
  /** Details about the pricing plan for your reserved queue. Required for reserved queues and not applicable to on-demand queues. */
  ReservationPlanSettings?: ReservationPlanSettings;
  /** Initial state of the queue. If you create a paused queue, then jobs in that queue won't begin. */
  Status?: 'ACTIVE' | 'PAUSED';
  /** The tags that you want to add to the resource. You can tag resources with a key-value pair or with only a key. */
  Tags?: Record<string, string>;
}

export interface CreateResourceShareInput {
  /** Specify MediaConvert Job ID or ARN to share */
  JobId: string;
  /** AWS Support case identifier */
  SupportCaseId: string;
}

export interface DeleteJobTemplateInput {
  /** The name of the job template to be deleted. */
  Name: string;
}

export interface DeletePresetInput {
  /** The name of the preset to be deleted. */
  Name: string;
}

export interface DeleteQueueInput {
  /** The name of the queue that you want to delete. */
  Name: string;
}

export interface DescribeEndpointsInput {
  /** Optional. Max number of endpoints, up to twenty, that will be returned at one time. */
  MaxResults?: number;
  /** Optional field, defaults to DEFAULT. Specify DEFAULT for this operation to return your endpoints if any exist, or to create an endpoint for you and return it if one doesn't already exist. Specify GET_ */
  Mode?: 'DEFAULT' | 'GET_ONLY';
  /** Use this string, provided with the response to a previous request, to request the next batch of endpoints. */
  NextToken?: string;
}

export interface DisassociateCertificateInput {
  /** The ARN of the ACM certificate that you want to disassociate from your MediaConvert resource. */
  Arn: string;
}

export interface GetJobInput {
  /** the job ID of the job. */
  Id: string;
}

export interface GetJobsQueryResultsInput {
  /** The ID of the jobs query. */
  Id: string;
}

export interface GetJobTemplateInput {
  /** The name of the job template. */
  Name: string;
}

export interface GetPresetInput {
  /** The name of the preset. */
  Name: string;
}

export interface GetQueueInput {
  /** The name of the queue that you want information about. */
  Name: string;
}

export interface ListJobsInput {
  /** Optional. Number of jobs, up to twenty, that will be returned at one time. */
  MaxResults?: number;
  /** Optional. Use this string, provided with the response to a previous request, to request the next batch of jobs. */
  NextToken?: string;
  /** Optional. When you request lists of resources, you can specify whether they are sorted in ASCENDING or DESCENDING order. Default varies by resource. */
  Order?: 'ASCENDING' | 'DESCENDING';
  /** Optional. Provide a queue name to get back only jobs from that queue. */
  Queue?: string;
  /** Optional. A job's status can be SUBMITTED, PROGRESSING, COMPLETE, CANCELED, or ERROR. */
  Status?: 'SUBMITTED' | 'PROGRESSING' | 'COMPLETE' | 'CANCELED' | 'ERROR';
}

export interface ListJobTemplatesInput {
  /** Optionally, specify a job template category to limit responses to only job templates from that category. */
  Category?: string;
  /** Optional. When you request a list of job templates, you can choose to list them alphabetically by NAME or chronologically by CREATION_DATE. If you don't specify, the service will list them by name. */
  ListBy?: 'NAME' | 'CREATION_DATE' | 'SYSTEM';
  /** Optional. Number of job templates, up to twenty, that will be returned at one time. */
  MaxResults?: number;
  /** Use this string, provided with the response to a previous request, to request the next batch of job templates. */
  NextToken?: string;
  /** Optional. When you request lists of resources, you can specify whether they are sorted in ASCENDING or DESCENDING order. Default varies by resource. */
  Order?: 'ASCENDING' | 'DESCENDING';
}

export interface ListPresetsInput {
  /** Optionally, specify a preset category to limit responses to only presets from that category. */
  Category?: string;
  /** Optional. When you request a list of presets, you can choose to list them alphabetically by NAME or chronologically by CREATION_DATE. If you don't specify, the service will list them by name. */
  ListBy?: 'NAME' | 'CREATION_DATE' | 'SYSTEM';
  /** Optional. Number of presets, up to twenty, that will be returned at one time */
  MaxResults?: number;
  /** Use this string, provided with the response to a previous request, to request the next batch of presets. */
  NextToken?: string;
  /** Optional. When you request lists of resources, you can specify whether they are sorted in ASCENDING or DESCENDING order. Default varies by resource. */
  Order?: 'ASCENDING' | 'DESCENDING';
}

export interface ListQueuesInput {
  /** Optional. When you request a list of queues, you can choose to list them alphabetically by NAME or chronologically by CREATION_DATE. If you don't specify, the service will list them by creation date. */
  ListBy?: 'NAME' | 'CREATION_DATE';
  /** Optional. Number of queues, up to twenty, that will be returned at one time. */
  MaxResults?: number;
  /** Use this string, provided with the response to a previous request, to request the next batch of queues. */
  NextToken?: string;
  /** Optional. When you request lists of resources, you can specify whether they are sorted in ASCENDING or DESCENDING order. Default varies by resource. */
  Order?: 'ASCENDING' | 'DESCENDING';
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the resource that you want to list tags for. To get the ARN, send a GET request with the resource name. */
  Arn: string;
}

export interface ListVersionsInput {
  /** Optional. Number of valid Job engine versions, up to twenty, that will be returned at one time. */
  MaxResults?: number;
  /** Optional. Use this string, provided with the response to a previous request, to request the next batch of Job engine versions. */
  NextToken?: string;
}

export interface ProbeInput {
  /** Specify a media file to probe. */
  InputFiles?: ProbeInputFile[];
}

export interface PutPolicyInput {
  /** A policy configures behavior that you allow or disallow for your account. For information about MediaConvert policies, see the user guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.h */
  Policy: Policy;
}

export interface SearchJobsInput {
  /** Optional. Provide your input file URL or your partial input file name. The maximum length for an input file is 300 characters. */
  InputFile?: string;
  /** Optional. Number of jobs, up to twenty, that will be returned at one time. */
  MaxResults?: number;
  /** Optional. Use this string, provided with the response to a previous request, to request the next batch of jobs. */
  NextToken?: string;
  /** Optional. When you request lists of resources, you can specify whether they are sorted in ASCENDING or DESCENDING order. Default varies by resource. */
  Order?: 'ASCENDING' | 'DESCENDING';
  /** Optional. Provide a queue name, or a queue ARN, to return only jobs from that queue. */
  Queue?: string;
  /** Optional. A job's status can be SUBMITTED, PROGRESSING, COMPLETE, CANCELED, or ERROR. */
  Status?: 'SUBMITTED' | 'PROGRESSING' | 'COMPLETE' | 'CANCELED' | 'ERROR';
}

export interface StartJobsQueryInput {
  /** Optional. Provide an array of JobsQueryFilters for your StartJobsQuery request. */
  FilterList?: JobsQueryFilter[];
  /** Optional. Number of jobs, up to twenty, that will be included in the jobs query. */
  MaxResults?: number;
  /** Use this string to request the next batch of jobs matched by a jobs query. */
  NextToken?: string;
  /** Optional. When you request lists of resources, you can specify whether they are sorted in ASCENDING or DESCENDING order. Default varies by resource. */
  Order?: 'ASCENDING' | 'DESCENDING';
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource that you want to tag. To get the ARN, send a GET request with the resource name. */
  Arn: string;
  /** The tags that you want to add to the resource. You can tag resources with a key-value pair or with only a key. */
  Tags: Record<string, string>;
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource that you want to remove tags from. To get the ARN, send a GET request with the resource name. */
  Arn: string;
  /** The keys of the tags that you want to remove from the resource. */
  TagKeys?: string[];
}

export interface UpdateJobTemplateInput {
  /** The name of the job template you are modifying */
  Name: string;
  /** Accelerated transcoding can significantly speed up jobs with long, visually complex content. Outputs that use this feature incur pro-tier pricing. For information about feature limitations, see the AW */
  AccelerationSettings?: AccelerationSettings;
  /** The new category for the job template, if you are changing it. */
  Category?: string;
  /** The new description for the job template, if you are changing it. */
  Description?: string;
  /** Optional list of hop destinations. */
  HopDestinations?: HopDestination[];
  /** Specify the relative priority for this job. In any given queue, the service begins processing the job with the highest value first. When more than one job has the same priority, the service begins pro */
  Priority?: number;
  /** The new queue for the job template, if you are changing it. */
  Queue?: string;
  /** JobTemplateSettings contains all the transcode settings saved in the template that will be applied to jobs created from it. */
  Settings?: JobTemplateSettings;
  /** Specify how often MediaConvert sends STATUS_UPDATE events to Amazon CloudWatch Events. Set the interval, in seconds, between status updates. MediaConvert sends an update at this interval from the time */
  StatusUpdateInterval?: 'SECONDS_10' | 'SECONDS_12' | 'SECONDS_15' | 'SECONDS_20' | 'SECONDS_30' | 'SECONDS_60' | 'SECONDS_120' | 'SECONDS_180' | 'SECONDS_240' | 'SECONDS_300' | 'SECONDS_360' | 'SECONDS_420' | 'SECONDS_480' | 'SECONDS_540' | 'SECONDS_600';
}

export interface UpdatePresetInput {
  /** The name of the preset you are modifying. */
  Name: string;
  /** The new category for the preset, if you are changing it. */
  Category?: string;
  /** The new description for the preset, if you are changing it. */
  Description?: string;
  /** Settings for preset */
  Settings?: PresetSettings;
}

export interface UpdateQueueInput {
  /** The name of the queue that you are modifying. */
  Name: string;
  /** Specify the maximum number of jobs your queue can process concurrently. For on-demand queues, the value you enter is constrained by your service quotas for Maximum concurrent jobs, per on-demand queue */
  ConcurrentJobs?: number;
  /** The new description for the queue, if you are changing it. */
  Description?: string;
  /** The new details of your pricing plan for your reserved queue. When you set up a new pricing plan to replace an expired one, you enter into another 12-month commitment. When you add capacity to your qu */
  ReservationPlanSettings?: ReservationPlanSettings;
  /** Pause or activate a queue by changing its status between ACTIVE and PAUSED. If you pause a queue, jobs in that queue won't begin. Jobs that are running when you pause the queue continue to run until t */
  Status?: 'ACTIVE' | 'PAUSED';
}

/** MediaConvert service binding for Step Functions SDK integrations. */
export class MediaConvert {
  constructor() {}

  associateCertificate<T>(params: AssociateCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelJob<T>(params: CancelJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createJob<T>(params: CreateJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createJobTemplate<T>(params: CreateJobTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPreset<T>(params: CreatePresetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createQueue<T>(params: CreateQueueInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createResourceShare<T>(params: CreateResourceShareInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteJobTemplate<T>(params: DeleteJobTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePolicy<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePreset<T>(params: DeletePresetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteQueue<T>(params: DeleteQueueInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEndpoints<T>(params: DescribeEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateCertificate<T>(params: DisassociateCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJob<T>(params: GetJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJobsQueryResults<T>(params: GetJobsQueryResultsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJobTemplate<T>(params: GetJobTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPolicy<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPreset<T>(params: GetPresetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getQueue<T>(params: GetQueueInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listJobs<T>(params: ListJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listJobTemplates<T>(params: ListJobTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPresets<T>(params: ListPresetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listQueues<T>(params: ListQueuesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listVersions<T>(params: ListVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  probe<T>(params: ProbeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putPolicy<T>(params: PutPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchJobs<T>(params: SearchJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startJobsQuery<T>(params: StartJobsQueryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateJobTemplate<T>(params: UpdateJobTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePreset<T>(params: UpdatePresetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateQueue<T>(params: UpdateQueueInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
