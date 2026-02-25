// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface S3Object {
  /** Name of the S3 bucket. */
  Bucket?: string;
  /** S3 object key name. */
  Name?: string;
  /** If the bucket is versioning enabled, you can specify the object version. */
  Version?: string;
}

export interface Image {
  /** Blob of image bytes up to 5 MBs. Note that the maximum image size you can pass to DetectCustomLabels is 4MB. */
  Bytes?: string;
  /** Identifies an S3 object as the image source. */
  S3Object?: S3Object;
}

export interface OutputConfig {
  /** The S3 bucket where training output is placed. */
  S3Bucket?: string;
  /** The prefix applied to the training output files. */
  S3KeyPrefix?: string;
}

export interface GroundTruthManifest {
  S3Object?: any;
}

export interface DatasetSource {
  GroundTruthManifest?: GroundTruthManifest;
  /** The ARN of an Amazon Rekognition Custom Labels dataset that you want to copy. */
  DatasetArn?: string;
}

export interface LivenessOutputConfig {
  /** The path to an AWS Amazon S3 bucket used to store Face Liveness session results. */
  S3Bucket: string;
  /** The prefix prepended to the output files for the Face Liveness session results. */
  S3KeyPrefix?: string;
}

export interface CreateFaceLivenessSessionRequestSettings {
  /** Can specify the location of an Amazon S3 bucket, where reference and audit images will be stored. Note that the Amazon S3 bucket must be located in the caller's AWS account and in the same region as t */
  OutputConfig?: LivenessOutputConfig;
  /** Number of audit images to be returned back. Takes an integer between 0-4. Any integer less than 0 will return 0, any integer above 4 will return 4 images in the response. By default, it is set to 0. T */
  AuditImagesLimit?: number;
  /** Indicates preferred challenge types and versions for the Face Liveness session to be created. */
  ChallengePreferences?: any[];
}

export interface TrainingData {
  /** A manifest file that contains references to the training images and ground-truth annotations. */
  Assets?: any[];
}

export interface TestingData {
  /** The assets used for testing. */
  Assets?: any[];
  /** If specified, Rekognition splits training dataset to create a test dataset for the training job. */
  AutoCreate?: boolean;
}

export interface CustomizationFeatureContentModerationConfig {
  /** The confidence level you plan to use to identify if unsafe content is present during inference. */
  ConfidenceThreshold?: number;
}

export interface CustomizationFeatureConfig {
  /** Configuration options for Custom Moderation training. */
  ContentModeration?: CustomizationFeatureContentModerationConfig;
}

export interface KinesisVideoStream {
  /** ARN of the Kinesis video stream stream that streams the source video. */
  Arn?: string;
}

export interface StreamProcessorInput {
  /** The Kinesis video stream input stream for the source streaming video. */
  KinesisVideoStream?: KinesisVideoStream;
}

export interface KinesisDataStream {
  /** ARN of the output Amazon Kinesis Data Streams stream. */
  Arn?: string;
}

export interface S3Destination {
  /** The name of the Amazon S3 bucket you want to associate with the streaming video project. You must be the owner of the Amazon S3 bucket. */
  Bucket?: string;
  /** The prefix value of the location within the bucket that you want the information to be published to. For more information, see Using prefixes. */
  KeyPrefix?: string;
}

export interface StreamProcessorOutput {
  /** The Amazon Kinesis Data Streams stream to which the Amazon Rekognition stream processor streams the analysis results. */
  KinesisDataStream?: KinesisDataStream;
  /** The Amazon S3 bucket location to which Amazon Rekognition publishes the detailed inference results of a video analysis operation. */
  S3Destination?: S3Destination;
}

export interface FaceSearchSettings {
  /** The ID of a collection that contains faces that you want to search for. */
  CollectionId?: string;
  /** Minimum face match confidence score that must be met to return a result for a recognized face. The default is 80. 0 is the lowest confidence. 100 is the highest confidence. Values between 0 and 100 ar */
  FaceMatchThreshold?: number;
}

export interface ConnectedHomeSettings {
  /** Specifies what you want to detect in the video, such as people, packages, or pets. The current valid labels you can include in this list are: "PERSON", "PET", "PACKAGE", and "ALL". */
  Labels: any[];
  /** The minimum confidence required to label an object in the video. */
  MinConfidence?: number;
}

export interface StreamProcessorSettings {
  /** Face search settings to use on a streaming video. */
  FaceSearch?: FaceSearchSettings;
  ConnectedHome?: ConnectedHomeSettings;
}

export interface StreamProcessorNotificationChannel {
  /** The Amazon Resource Number (ARN) of the Amazon Amazon Simple Notification Service topic to which Amazon Rekognition posts the completion status. */
  SNSTopicArn: string;
}

export interface RegionOfInterest {
  /** The box representing a region of interest on screen. */
  BoundingBox?: any;
  /** Specifies a shape made up of up to 10 Point objects to define a region of interest. */
  Polygon?: any[];
}

export interface StreamProcessorDataSharingPreference {
  /** If this option is set to true, you choose to share data with Rekognition to improve model performance. */
  OptIn: boolean;
}

export interface GeneralLabelsSettings {
  /** The labels that should be included in the return from DetectLabels. */
  LabelInclusionFilters?: any[];
  /** The labels that should be excluded from the return from DetectLabels. */
  LabelExclusionFilters?: any[];
  /** The label categories that should be included in the return from DetectLabels. */
  LabelCategoryInclusionFilters?: any[];
  /** The label categories that should be excluded from the return from DetectLabels. */
  LabelCategoryExclusionFilters?: any[];
}

export interface DetectLabelsImagePropertiesSettings {
  /** The maximum number of dominant colors to return when detecting labels in an image. The default value is 10. */
  MaxDominantColors?: number;
}

export interface DetectLabelsSettings {
  /** Contains the specified filters for GENERAL_LABELS. */
  GeneralLabels?: GeneralLabelsSettings;
  /** Contains the chosen number of maximum dominant colors in an image. */
  ImageProperties?: DetectLabelsImagePropertiesSettings;
}

export interface HumanLoopDataAttributes {
  /** Sets whether the input image is free of personally identifiable information. */
  ContentClassifiers?: any[];
}

export interface HumanLoopConfig {
  /** The name of the human review used for this image. This should be kept unique within a region. */
  HumanLoopName: string;
  /** The Amazon Resource Name (ARN) of the flow definition. You can create a flow definition by using the Amazon Sagemaker CreateFlowDefinition Operation. */
  FlowDefinitionArn: string;
  /** Sets attributes of the input data. */
  DataAttributes?: HumanLoopDataAttributes;
}

export interface ProtectiveEquipmentSummarizationAttributes {
  /** The minimum confidence level for which you want summary information. The confidence level applies to person detection, body part detection, equipment detection, and body part coverage. Amazon Rekognit */
  MinConfidence: number;
  /** An array of personal protective equipment types for which you want summary information. If a person is detected wearing a required requipment type, the person's ID is added to the PersonsWithRequiredE */
  RequiredEquipmentTypes: 'FACE_COVER' | 'HAND_COVER' | 'HEAD_COVER'[];
}

export interface DetectionFilter {
  /** Sets the confidence of word detection. Words with detection confidence below this will be excluded from the result. Values should be between 0 and 100. The default MinConfidence is 80. */
  MinConfidence?: number;
  /** Sets the minimum height of the word bounding box. Words with bounding box heights lesser than this value will be excluded from the result. Value is relative to the video frame height. */
  MinBoundingBoxHeight?: number;
  /** Sets the minimum width of the word bounding box. Words with bounding boxes widths lesser than this value will be excluded from the result. Value is relative to the video frame width. */
  MinBoundingBoxWidth?: number;
}

export interface DetectTextFilters {
  WordFilter?: DetectionFilter;
  /** A Filter focusing on a certain area of the image. Uses a BoundingBox object to set the region of the image. */
  RegionsOfInterest?: any[];
}

export interface DistributeDataset {
  /** The Amazon Resource Name (ARN) of the dataset that you want to use. */
  Arn: string;
}

export interface Video {
  /** The Amazon S3 bucket name and file name for the video. */
  S3Object?: S3Object;
}

export interface NotificationChannel {
  /** The Amazon SNS topic to which Amazon Rekognition posts the completion status. */
  SNSTopicArn: string;
  /** The ARN of an IAM role that gives Amazon Rekognition publishing permissions to the Amazon SNS topic. */
  RoleArn: string;
}

export interface LabelDetectionSettings {
  GeneralLabels?: GeneralLabelsSettings;
}

export interface MediaAnalysisDetectModerationLabelsConfig {
  /** Specifies the minimum confidence level for the moderation labels to return. Amazon Rekognition doesn't return any labels with a confidence level lower than this specified value. */
  MinConfidence?: number;
  /** Specifies the custom moderation model to be used during the label detection job. If not provided the pre-trained model is used. */
  ProjectVersion?: string;
}

export interface MediaAnalysisOperationsConfig {
  /** Contains configuration options for a DetectModerationLabels job. */
  DetectModerationLabels?: MediaAnalysisDetectModerationLabelsConfig;
}

export interface MediaAnalysisInput {
  S3Object: S3Object;
}

export interface MediaAnalysisOutputConfig {
  /** Specifies the Amazon S3 bucket to contain the output of the media analysis job. */
  S3Bucket: string;
  /** Specifies the Amazon S3 key prefix that comes after the name of the bucket you have designated for storage. */
  S3KeyPrefix?: string;
}

export interface StartTechnicalCueDetectionFilter {
  /** Specifies the minimum confidence that Amazon Rekognition Video must have in order to return a detected segment. Confidence represents how certain Amazon Rekognition is that a segment is correctly iden */
  MinSegmentConfidence?: number;
  /** A filter that allows you to control the black frame detection by specifying the black levels and pixel coverage of black pixels in a frame. Videos can come from multiple sources, formats, and time per */
  BlackFrame?: any;
}

export interface StartShotDetectionFilter {
  /** Specifies the minimum confidence that Amazon Rekognition Video must have in order to return a detected segment. Confidence represents how certain Amazon Rekognition is that a segment is correctly iden */
  MinSegmentConfidence?: number;
}

export interface StartSegmentDetectionFilters {
  /** Filters that are specific to technical cues. */
  TechnicalCueFilter?: StartTechnicalCueDetectionFilter;
  /** Filters that are specific to shot detections. */
  ShotFilter?: StartShotDetectionFilter;
}

export interface KinesisVideoStreamStartSelector {
  /** The timestamp from the producer corresponding to the fragment, in milliseconds, expressed in unix time format. */
  ProducerTimestamp?: number;
  /** The unique identifier of the fragment. This value monotonically increases based on the ingestion order. */
  FragmentNumber?: string;
}

export interface StreamProcessingStartSelector {
  /** Specifies the starting point in the stream to start processing. This can be done with a producer timestamp or a fragment number in a Kinesis stream. */
  KVSStreamStartSelector?: KinesisVideoStreamStartSelector;
}

export interface StreamProcessingStopSelector {
  /** Specifies the maximum amount of time in seconds that you want the stream to be processed. The largest amount of time is 2 minutes. The default is 10 seconds. */
  MaxDurationInSeconds?: number;
}

export interface StartTextDetectionFilters {
  /** Filters focusing on qualities of the text, such as confidence or size. */
  WordFilter?: DetectionFilter;
  /** Filter focusing on a certain area of the frame. Uses a BoundingBox object to set the region of the screen. */
  RegionsOfInterest?: any[];
}

export interface DatasetChanges {
  /** A Base64-encoded binary data object containing one or JSON lines that either update the dataset or are additions to the dataset. You change a dataset by calling UpdateDatasetEntries. If you are using  */
  GroundTruth: string;
}

export interface ConnectedHomeSettingsForUpdate {
  /** Specifies what you want to detect in the video, such as people, packages, or pets. The current valid labels you can include in this list are: "PERSON", "PET", "PACKAGE", and "ALL". */
  Labels?: any[];
  /** The minimum confidence required to label an object in the video. */
  MinConfidence?: number;
}

export interface StreamProcessorSettingsForUpdate {
  /** The label detection settings you want to use for your stream processor. */
  ConnectedHomeForUpdate?: ConnectedHomeSettingsForUpdate;
}

export interface AssociateFacesInput {
  /** The ID of an existing collection containing the UserID. */
  CollectionId: string;
  /** An array of FaceIDs to associate with the UserID. */
  FaceIds: string[];
  /** The ID for the existing UserID. */
  UserId: string;
  /** Idempotent token used to identify the request to AssociateFaces. If you use the same token with multiple AssociateFaces requests, the same response is returned. Use ClientRequestToken to prevent the s */
  ClientRequestToken?: string;
  /** An optional value specifying the minimum confidence in the UserID match to return. The default value is 75. */
  UserMatchThreshold?: number;
}

export interface CompareFacesInput {
  /** The input image as base64-encoded bytes or an S3 object. If you use the AWS CLI to call Amazon Rekognition operations, passing base64-encoded image bytes is not supported. If you are using an AWS SDK  */
  SourceImage: Image;
  /** The target image as base64-encoded bytes or an S3 object. If you use the AWS CLI to call Amazon Rekognition operations, passing base64-encoded image bytes is not supported. If you are using an AWS SDK */
  TargetImage: Image;
  /** A filter that specifies a quality bar for how much filtering is done to identify faces. Filtered faces aren't compared. If you specify AUTO, Amazon Rekognition chooses the quality bar. If you specify  */
  QualityFilter?: 'NONE' | 'AUTO' | 'LOW' | 'MEDIUM' | 'HIGH';
  /** The minimum level of confidence in the face matches that a match must meet to be included in the FaceMatches array. */
  SimilarityThreshold?: number;
}

export interface CopyProjectVersionInput {
  /** The ARN of the project in the trusted AWS account that you want to copy the model version to. */
  DestinationProjectArn: string;
  /** The S3 bucket and folder location where the training output for the source model version is placed. */
  OutputConfig: OutputConfig;
  /** The ARN of the source project in the trusting AWS account. */
  SourceProjectArn: string;
  /** The ARN of the model version in the source project that you want to copy to a destination project. */
  SourceProjectVersionArn: string;
  /** A name for the version of the model that's copied to the destination project. */
  VersionName: string;
  /** The identifier for your AWS Key Management Service key (AWS KMS key). You can supply the Amazon Resource Name (ARN) of your KMS key, the ID of your KMS key, an alias for your KMS key, or an alias ARN. */
  KmsKeyId?: string;
  /** The key-value tags to assign to the model version. */
  Tags?: Record<string, string>;
}

export interface CreateCollectionInput {
  /** ID for the collection that you are creating. */
  CollectionId: string;
  /** A set of tags (key-value pairs) that you want to attach to the collection. */
  Tags?: Record<string, string>;
}

export interface CreateDatasetInput {
  /** The type of the dataset. Specify TRAIN to create a training dataset. Specify TEST to create a test dataset. */
  DatasetType: 'TRAIN' | 'TEST';
  /** The ARN of the Amazon Rekognition Custom Labels project to which you want to asssign the dataset. */
  ProjectArn: string;
  /** The source files for the dataset. You can specify the ARN of an existing dataset or specify the Amazon S3 bucket location of an Amazon Sagemaker format manifest file. If you don't specify datasetSourc */
  DatasetSource?: DatasetSource;
  /** A set of tags (key-value pairs) that you want to attach to the dataset. */
  Tags?: Record<string, string>;
}

export interface CreateFaceLivenessSessionInput {
  /** Idempotent token is used to recognize the Face Liveness request. If the same token is used with multiple CreateFaceLivenessSession requests, the same session is returned. This token is employed to avo */
  ClientRequestToken?: string;
  /** The identifier for your AWS Key Management Service key (AWS KMS key). Used to encrypt audit images and reference images. */
  KmsKeyId?: string;
  /** A session settings object. It contains settings for the operation to be performed. For Face Liveness, it accepts OutputConfig and AuditImagesLimit. */
  Settings?: CreateFaceLivenessSessionRequestSettings;
}

export interface CreateProjectInput {
  /** The name of the project to create. */
  ProjectName: string;
  /** Specifies whether automatic retraining should be attempted for the versions of the project. Automatic retraining is done as a best effort. Required argument for Content Moderation. Applicable only to  */
  AutoUpdate?: 'ENABLED' | 'DISABLED';
  /** Specifies feature that is being customized. If no value is provided CUSTOM_LABELS is used as a default. */
  Feature?: 'CONTENT_MODERATION' | 'CUSTOM_LABELS';
  /** A set of tags (key-value pairs) that you want to attach to the project. */
  Tags?: Record<string, string>;
}

export interface CreateProjectVersionInput {
  /** The Amazon S3 bucket location to store the results of training. The bucket can be any S3 bucket in your AWS account. You need s3:PutObject permission on the bucket. */
  OutputConfig: OutputConfig;
  /** The ARN of the Amazon Rekognition project that will manage the project version you want to train. */
  ProjectArn: string;
  /** A name for the version of the project version. This value must be unique. */
  VersionName: string;
  /** Feature-specific configuration of the training job. If the job configuration does not match the feature type associated with the project, an InvalidParameterException is returned. */
  FeatureConfig?: CustomizationFeatureConfig;
  /** The identifier for your AWS Key Management Service key (AWS KMS key). You can supply the Amazon Resource Name (ARN) of your KMS key, the ID of your KMS key, an alias for your KMS key, or an alias ARN. */
  KmsKeyId?: string;
  /** A set of tags (key-value pairs) that you want to attach to the project version. */
  Tags?: Record<string, string>;
  /** Specifies an external manifest that the service uses to test the project version. If you specify TestingData you must also specify TrainingData. The project must not have any associated datasets. */
  TestingData?: TestingData;
  /** Specifies an external manifest that the services uses to train the project version. If you specify TrainingData you must also specify TestingData. The project must not have any associated datasets. */
  TrainingData?: TrainingData;
  /** A description applied to the project version being created. */
  VersionDescription?: string;
}

export interface CreateStreamProcessorInput {
  /** Kinesis video stream stream that provides the source streaming video. If you are using the AWS CLI, the parameter name is StreamProcessorInput. This is required for both face search and label detectio */
  Input: StreamProcessorInput;
  /** An identifier you assign to the stream processor. You can use Name to manage the stream processor. For example, you can get the current status of the stream processor by calling DescribeStreamProcesso */
  Name: string;
  /** Kinesis data stream stream or Amazon S3 bucket location to which Amazon Rekognition Video puts the analysis results. If you are using the AWS CLI, the parameter name is StreamProcessorOutput. This mus */
  Output: StreamProcessorOutput;
  /** The Amazon Resource Number (ARN) of the IAM role that allows access to the stream processor. The IAM role provides Rekognition read permissions for a Kinesis stream. It also provides write permissions */
  RoleArn: string;
  /** Input parameters used in a streaming video analyzed by a stream processor. You can use FaceSearch to recognize faces in a streaming video, or you can use ConnectedHome to detect labels. */
  Settings: StreamProcessorSettings;
  /** Shows whether you are sharing data with Rekognition to improve model performance. You can choose this option at the account level or on a per-stream basis. Note that if you opt out at the account leve */
  DataSharingPreference?: StreamProcessorDataSharingPreference;
  /** The identifier for your AWS Key Management Service key (AWS KMS key). This is an optional parameter for label detection stream processors and should not be used to create a face search stream processo */
  KmsKeyId?: string;
  NotificationChannel?: StreamProcessorNotificationChannel;
  /** Specifies locations in the frames where Amazon Rekognition checks for objects or people. You can specify up to 10 regions of interest, and each region has either a polygon or a bounding box. This is a */
  RegionsOfInterest?: RegionOfInterest[];
  /** A set of tags (key-value pairs) that you want to attach to the stream processor. */
  Tags?: Record<string, string>;
}

export interface CreateUserInput {
  /** The ID of an existing collection to which the new UserID needs to be created. */
  CollectionId: string;
  /** ID for the UserID to be created. This ID needs to be unique within the collection. */
  UserId: string;
  /** Idempotent token used to identify the request to CreateUser. If you use the same token with multiple CreateUser requests, the same response is returned. Use ClientRequestToken to prevent the same requ */
  ClientRequestToken?: string;
}

export interface DeleteCollectionInput {
  /** ID of the collection to delete. */
  CollectionId: string;
}

export interface DeleteDatasetInput {
  /** The ARN of the Amazon Rekognition Custom Labels dataset that you want to delete. */
  DatasetArn: string;
}

export interface DeleteFacesInput {
  /** Collection from which to remove the specific faces. */
  CollectionId: string;
  /** An array of face IDs to delete. */
  FaceIds: string[];
}

export interface DeleteProjectInput {
  /** The Amazon Resource Name (ARN) of the project that you want to delete. */
  ProjectArn: string;
}

export interface DeleteProjectPolicyInput {
  /** The name of the policy that you want to delete. */
  PolicyName: string;
  /** The Amazon Resource Name (ARN) of the project that the project policy you want to delete is attached to. */
  ProjectArn: string;
  /** The ID of the project policy revision that you want to delete. */
  PolicyRevisionId?: string;
}

export interface DeleteProjectVersionInput {
  /** The Amazon Resource Name (ARN) of the project version that you want to delete. */
  ProjectVersionArn: string;
}

export interface DeleteStreamProcessorInput {
  /** The name of the stream processor you want to delete. */
  Name: string;
}

export interface DeleteUserInput {
  /** The ID of an existing collection from which the UserID needs to be deleted. */
  CollectionId: string;
  /** ID for the UserID to be deleted. */
  UserId: string;
  /** Idempotent token used to identify the request to DeleteUser. If you use the same token with multiple DeleteUser requests, the same response is returned. Use ClientRequestToken to prevent the same requ */
  ClientRequestToken?: string;
}

export interface DescribeCollectionInput {
  /** The ID of the collection to describe. */
  CollectionId: string;
}

export interface DescribeDatasetInput {
  /** The Amazon Resource Name (ARN) of the dataset that you want to describe. */
  DatasetArn: string;
}

export interface DescribeProjectsInput {
  /** Specifies the type of customization to filter projects by. If no value is specified, CUSTOM_LABELS is used as a default. */
  Features?: 'CONTENT_MODERATION' | 'CUSTOM_LABELS'[];
  /** The maximum number of results to return per paginated call. The largest value you can specify is 100. If you specify a value greater than 100, a ValidationException error occurs. The default value is  */
  MaxResults?: number;
  /** If the previous response was incomplete (because there is more results to retrieve), Rekognition returns a pagination token in the response. You can use this pagination token to retrieve the next set  */
  NextToken?: string;
  /** A list of the projects that you want Rekognition to describe. If you don't specify a value, the response includes descriptions for all the projects in your AWS account. */
  ProjectNames?: string[];
}

export interface DescribeProjectVersionsInput {
  /** The Amazon Resource Name (ARN) of the project that contains the model/adapter you want to describe. */
  ProjectArn: string;
  /** The maximum number of results to return per paginated call. The largest value you can specify is 100. If you specify a value greater than 100, a ValidationException error occurs. The default value is  */
  MaxResults?: number;
  /** If the previous response was incomplete (because there is more results to retrieve), Amazon Rekognition returns a pagination token in the response. You can use this pagination token to retrieve the ne */
  NextToken?: string;
  /** A list of model or project version names that you want to describe. You can add up to 10 model or project version names to the list. If you don't specify a value, all project version descriptions are  */
  VersionNames?: string[];
}

export interface DescribeStreamProcessorInput {
  /** Name of the stream processor for which you want information. */
  Name: string;
}

export interface DetectCustomLabelsInput {
  Image: Image;
  /** The ARN of the model version that you want to use. Only models associated with Custom Labels projects accepted by the operation. If a provided ARN refers to a model version associated with a project f */
  ProjectVersionArn: string;
  /** Maximum number of results you want the service to return in the response. The service returns the specified number of highest confidence labels ranked from highest confidence to lowest. */
  MaxResults?: number;
  /** Specifies the minimum confidence level for the labels to return. DetectCustomLabels doesn't return any labels with a confidence value that's lower than this specified value. If you specify a value of  */
  MinConfidence?: number;
}

export interface DetectFacesInput {
  /** The input image as base64-encoded bytes or an S3 object. If you use the AWS CLI to call Amazon Rekognition operations, passing base64-encoded image bytes is not supported. If you are using an AWS SDK  */
  Image: Image;
  /** An array of facial attributes you want to be returned. A DEFAULT subset of facial attributes - BoundingBox, Confidence, Pose, Quality, and Landmarks - will always be returned. You can request for spec */
  Attributes?: 'DEFAULT' | 'ALL' | 'AGE_RANGE' | 'BEARD' | 'EMOTIONS' | 'EYE_DIRECTION' | 'EYEGLASSES' | 'EYES_OPEN' | 'GENDER' | 'MOUTH_OPEN' | 'MUSTACHE' | 'FACE_OCCLUDED' | 'SMILE' | 'SUNGLASSES'[];
}

export interface DetectLabelsInput {
  /** The input image as base64-encoded bytes or an S3 object. If you use the AWS CLI to call Amazon Rekognition operations, passing image bytes is not supported. Images stored in an S3 Bucket do not need t */
  Image: Image;
  /** A list of the types of analysis to perform. Specifying GENERAL_LABELS uses the label detection feature, while specifying IMAGE_PROPERTIES returns information regarding image color and quality. If no o */
  Features?: 'GENERAL_LABELS' | 'IMAGE_PROPERTIES'[];
  /** Maximum number of labels you want the service to return in the response. The service returns the specified number of highest confidence labels. Only valid when GENERAL_LABELS is specified as a feature */
  MaxLabels?: number;
  /** Specifies the minimum confidence level for the labels to return. Amazon Rekognition doesn't return any labels with confidence lower than this specified value. If MinConfidence is not specified, the op */
  MinConfidence?: number;
  /** A list of the filters to be applied to returned detected labels and image properties. Specified filters can be inclusive, exclusive, or a combination of both. Filters can be used for individual labels */
  Settings?: DetectLabelsSettings;
}

export interface DetectModerationLabelsInput {
  /** The input image as base64-encoded bytes or an S3 object. If you use the AWS CLI to call Amazon Rekognition operations, passing base64-encoded image bytes is not supported. If you are using an AWS SDK  */
  Image: Image;
  /** Sets up the configuration for human evaluation, including the FlowDefinition the image will be sent to. */
  HumanLoopConfig?: HumanLoopConfig;
  /** Specifies the minimum confidence level for the labels to return. Amazon Rekognition doesn't return any labels with a confidence level lower than this specified value. If you don't specify MinConfidenc */
  MinConfidence?: number;
  /** Identifier for the custom adapter. Expects the ProjectVersionArn as a value. Use the CreateProject or CreateProjectVersion APIs to create a custom adapter. */
  ProjectVersion?: string;
}

export interface DetectProtectiveEquipmentInput {
  /** The image in which you want to detect PPE on detected persons. The image can be passed as image bytes or you can reference an image stored in an Amazon S3 bucket. */
  Image: Image;
  /** An array of PPE types that you want to summarize. */
  SummarizationAttributes?: ProtectiveEquipmentSummarizationAttributes;
}

export interface DetectTextInput {
  /** The input image as base64-encoded bytes or an Amazon S3 object. If you use the AWS CLI to call Amazon Rekognition operations, you can't pass image bytes. If you are using an AWS SDK to call Amazon Rek */
  Image: Image;
  /** Optional parameters that let you set the criteria that the text must meet to be included in your response. */
  Filters?: DetectTextFilters;
}

export interface DisassociateFacesInput {
  /** The ID of an existing collection containing the UserID. */
  CollectionId: string;
  /** An array of face IDs to disassociate from the UserID. */
  FaceIds: string[];
  /** ID for the existing UserID. */
  UserId: string;
  /** Idempotent token used to identify the request to DisassociateFaces. If you use the same token with multiple DisassociateFaces requests, the same response is returned. Use ClientRequestToken to prevent */
  ClientRequestToken?: string;
}

export interface DistributeDatasetEntriesInput {
  /** The ARNS for the training dataset and test dataset that you want to use. The datasets must belong to the same project. The test dataset must be empty. */
  Datasets: DistributeDataset[];
}

export interface GetCelebrityInfoInput {
  /** The ID for the celebrity. You get the celebrity ID from a call to the RecognizeCelebrities operation, which recognizes celebrities in an image. */
  Id: string;
}

export interface GetCelebrityRecognitionInput {
  /** Job identifier for the required celebrity recognition analysis. You can get the job identifer from a call to StartCelebrityRecognition. */
  JobId: string;
  /** Maximum number of results to return per paginated call. The largest value you can specify is 1000. If you specify a value greater than 1000, a maximum of 1000 results is returned. The default value is */
  MaxResults?: number;
  /** If the previous response was incomplete (because there is more recognized celebrities to retrieve), Amazon Rekognition Video returns a pagination token in the response. You can use this pagination tok */
  NextToken?: string;
  /** Sort to use for celebrities returned in Celebrities field. Specify ID to sort by the celebrity identifier, specify TIMESTAMP to sort by the time the celebrity was recognized. */
  SortBy?: 'ID' | 'TIMESTAMP';
}

export interface GetContentModerationInput {
  /** The identifier for the inappropriate, unwanted, or offensive content moderation job. Use JobId to identify the job in a subsequent call to GetContentModeration. */
  JobId: string;
  /** Defines how to aggregate results of the StartContentModeration request. Default aggregation option is TIMESTAMPS. SEGMENTS mode aggregates moderation labels over time. */
  AggregateBy?: 'TIMESTAMPS' | 'SEGMENTS';
  /** Maximum number of results to return per paginated call. The largest value you can specify is 1000. If you specify a value greater than 1000, a maximum of 1000 results is returned. The default value is */
  MaxResults?: number;
  /** If the previous response was incomplete (because there is more data to retrieve), Amazon Rekognition returns a pagination token in the response. You can use this pagination token to retrieve the next  */
  NextToken?: string;
  /** Sort to use for elements in the ModerationLabelDetections array. Use TIMESTAMP to sort array elements by the time labels are detected. Use NAME to alphabetically group elements for a label together. W */
  SortBy?: 'NAME' | 'TIMESTAMP';
}

export interface GetFaceDetectionInput {
  /** Unique identifier for the face detection job. The JobId is returned from StartFaceDetection. */
  JobId: string;
  /** Maximum number of results to return per paginated call. The largest value you can specify is 1000. If you specify a value greater than 1000, a maximum of 1000 results is returned. The default value is */
  MaxResults?: number;
  /** If the previous response was incomplete (because there are more faces to retrieve), Amazon Rekognition Video returns a pagination token in the response. You can use this pagination token to retrieve t */
  NextToken?: string;
}

export interface GetFaceLivenessSessionResultsInput {
  /** A unique 128-bit UUID. This is used to uniquely identify the session and also acts as an idempotency token for all operations associated with the session. */
  SessionId: string;
}

export interface GetFaceSearchInput {
  /** The job identifer for the search request. You get the job identifier from an initial call to StartFaceSearch. */
  JobId: string;
  /** Maximum number of results to return per paginated call. The largest value you can specify is 1000. If you specify a value greater than 1000, a maximum of 1000 results is returned. The default value is */
  MaxResults?: number;
  /** If the previous response was incomplete (because there is more search results to retrieve), Amazon Rekognition Video returns a pagination token in the response. You can use this pagination token to re */
  NextToken?: string;
  /** Sort to use for grouping faces in the response. Use TIMESTAMP to group faces by the time that they are recognized. Use INDEX to sort by recognized faces. */
  SortBy?: 'INDEX' | 'TIMESTAMP';
}

export interface GetLabelDetectionInput {
  /** Job identifier for the label detection operation for which you want results returned. You get the job identifer from an initial call to StartlabelDetection. */
  JobId: string;
  /** Defines how to aggregate the returned results. Results can be aggregated by timestamps or segments. */
  AggregateBy?: 'TIMESTAMPS' | 'SEGMENTS';
  /** Maximum number of results to return per paginated call. The largest value you can specify is 1000. If you specify a value greater than 1000, a maximum of 1000 results is returned. The default value is */
  MaxResults?: number;
  /** If the previous response was incomplete (because there are more labels to retrieve), Amazon Rekognition Video returns a pagination token in the response. You can use this pagination token to retrieve  */
  NextToken?: string;
  /** Sort to use for elements in the Labels array. Use TIMESTAMP to sort array elements by the time labels are detected. Use NAME to alphabetically group elements for a label together. Within each label gr */
  SortBy?: 'NAME' | 'TIMESTAMP';
}

export interface GetMediaAnalysisJobInput {
  /** Unique identifier for the media analysis job for which you want to retrieve results. */
  JobId: string;
}

export interface GetPersonTrackingInput {
  /** The identifier for a job that tracks persons in a video. You get the JobId from a call to StartPersonTracking. */
  JobId: string;
  /** Maximum number of results to return per paginated call. The largest value you can specify is 1000. If you specify a value greater than 1000, a maximum of 1000 results is returned. The default value is */
  MaxResults?: number;
  /** If the previous response was incomplete (because there are more persons to retrieve), Amazon Rekognition Video returns a pagination token in the response. You can use this pagination token to retrieve */
  NextToken?: string;
  /** Sort to use for elements in the Persons array. Use TIMESTAMP to sort array elements by the time persons are detected. Use INDEX to sort by the tracked persons. If you sort by INDEX, the array elements */
  SortBy?: 'INDEX' | 'TIMESTAMP';
}

export interface GetSegmentDetectionInput {
  /** Job identifier for the text detection operation for which you want results returned. You get the job identifer from an initial call to StartSegmentDetection. */
  JobId: string;
  /** Maximum number of results to return per paginated call. The largest value you can specify is 1000. */
  MaxResults?: number;
  /** If the response is truncated, Amazon Rekognition Video returns this token that you can use in the subsequent request to retrieve the next set of text. */
  NextToken?: string;
}

export interface GetTextDetectionInput {
  /** Job identifier for the text detection operation for which you want results returned. You get the job identifer from an initial call to StartTextDetection. */
  JobId: string;
  /** Maximum number of results to return per paginated call. The largest value you can specify is 1000. */
  MaxResults?: number;
  /** If the previous response was incomplete (because there are more labels to retrieve), Amazon Rekognition Video returns a pagination token in the response. You can use this pagination token to retrieve  */
  NextToken?: string;
}

export interface IndexFacesInput {
  /** The ID of an existing collection to which you want to add the faces that are detected in the input images. */
  CollectionId: string;
  /** The input image as base64-encoded bytes or an S3 object. If you use the AWS CLI to call Amazon Rekognition operations, passing base64-encoded image bytes isn't supported. If you are using an AWS SDK t */
  Image: Image;
  /** An array of facial attributes you want to be returned. A DEFAULT subset of facial attributes - BoundingBox, Confidence, Pose, Quality, and Landmarks - will always be returned. You can request for spec */
  DetectionAttributes?: 'DEFAULT' | 'ALL' | 'AGE_RANGE' | 'BEARD' | 'EMOTIONS' | 'EYE_DIRECTION' | 'EYEGLASSES' | 'EYES_OPEN' | 'GENDER' | 'MOUTH_OPEN' | 'MUSTACHE' | 'FACE_OCCLUDED' | 'SMILE' | 'SUNGLASSES'[];
  /** The ID you want to assign to all the faces detected in the image. */
  ExternalImageId?: string;
  /** The maximum number of faces to index. The value of MaxFaces must be greater than or equal to 1. IndexFaces returns no more than 100 detected faces in an image, even if you specify a larger value for M */
  MaxFaces?: number;
  /** A filter that specifies a quality bar for how much filtering is done to identify faces. Filtered faces aren't indexed. If you specify AUTO, Amazon Rekognition chooses the quality bar. If you specify L */
  QualityFilter?: 'NONE' | 'AUTO' | 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ListCollectionsInput {
  /** Maximum number of collection IDs to return. */
  MaxResults?: number;
  /** Pagination token from the previous response. */
  NextToken?: string;
}

export interface ListDatasetEntriesInput {
  /** The Amazon Resource Name (ARN) for the dataset that you want to use. */
  DatasetArn: string;
  /** Specifies a label filter for the response. The response includes an entry only if one or more of the labels in ContainsLabels exist in the entry. */
  ContainsLabels?: string[];
  /** Specifies an error filter for the response. Specify True to only include entries that have errors. */
  HasErrors?: boolean;
  /** Specify true to get only the JSON Lines where the image is labeled. Specify false to get only the JSON Lines where the image isn't labeled. If you don't specify Labeled, ListDatasetEntries returns JSO */
  Labeled?: boolean;
  /** The maximum number of results to return per paginated call. The largest value you can specify is 100. If you specify a value greater than 100, a ValidationException error occurs. The default value is  */
  MaxResults?: number;
  /** If the previous response was incomplete (because there is more results to retrieve), Amazon Rekognition Custom Labels returns a pagination token in the response. You can use this pagination token to r */
  NextToken?: string;
  /** If specified, ListDatasetEntries only returns JSON Lines where the value of SourceRefContains is part of the source-ref field. The source-ref field contains the Amazon S3 location of the image. You ca */
  SourceRefContains?: string;
}

export interface ListDatasetLabelsInput {
  /** The Amazon Resource Name (ARN) of the dataset that you want to use. */
  DatasetArn: string;
  /** The maximum number of results to return per paginated call. The largest value you can specify is 100. If you specify a value greater than 100, a ValidationException error occurs. The default value is  */
  MaxResults?: number;
  /** If the previous response was incomplete (because there is more results to retrieve), Amazon Rekognition Custom Labels returns a pagination token in the response. You can use this pagination token to r */
  NextToken?: string;
}

export interface ListFacesInput {
  /** ID of the collection from which to list the faces. */
  CollectionId: string;
  /** An array of face IDs to filter results with when listing faces in a collection. */
  FaceIds?: string[];
  /** Maximum number of faces to return. */
  MaxResults?: number;
  /** If the previous response was incomplete (because there is more data to retrieve), Amazon Rekognition returns a pagination token in the response. You can use this pagination token to retrieve the next  */
  NextToken?: string;
  /** An array of user IDs to filter results with when listing faces in a collection. */
  UserId?: string;
}

export interface ListMediaAnalysisJobsInput {
  /** The maximum number of results to return per paginated call. The largest value user can specify is 100. If user specifies a value greater than 100, an InvalidParameterException error occurs. The defaul */
  MaxResults?: number;
  /** Pagination token, if the previous response was incomplete. */
  NextToken?: string;
}

export interface ListProjectPoliciesInput {
  /** The ARN of the project for which you want to list the project policies. */
  ProjectArn: string;
  /** The maximum number of results to return per paginated call. The largest value you can specify is 5. If you specify a value greater than 5, a ValidationException error occurs. The default value is 5. */
  MaxResults?: number;
  /** If the previous response was incomplete (because there is more results to retrieve), Amazon Rekognition Custom Labels returns a pagination token in the response. You can use this pagination token to r */
  NextToken?: string;
}

export interface ListStreamProcessorsInput {
  /** Maximum number of stream processors you want Amazon Rekognition Video to return in the response. The default is 1000. */
  MaxResults?: number;
  /** If the previous response was incomplete (because there are more stream processors to retrieve), Amazon Rekognition Video returns a pagination token in the response. You can use this pagination token t */
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** Amazon Resource Name (ARN) of the model, collection, or stream processor that contains the tags that you want a list of. */
  ResourceArn: string;
}

export interface ListUsersInput {
  /** The ID of an existing collection. */
  CollectionId: string;
  /** Maximum number of UsersID to return. */
  MaxResults?: number;
  /** Pagingation token to receive the next set of UsersID. */
  NextToken?: string;
}

export interface PutProjectPolicyInput {
  /** A resource policy to add to the model. The policy is a JSON structure that contains one or more statements that define the policy. The policy must follow the IAM syntax. For more information about the */
  PolicyDocument: string;
  /** A name for the policy. */
  PolicyName: string;
  /** The Amazon Resource Name (ARN) of the project that the project policy is attached to. */
  ProjectArn: string;
  /** The revision ID for the Project Policy. Each time you modify a policy, Amazon Rekognition Custom Labels generates and assigns a new PolicyRevisionId and then deletes the previous version of the policy */
  PolicyRevisionId?: string;
}

export interface RecognizeCelebritiesInput {
  /** The input image as base64-encoded bytes or an S3 object. If you use the AWS CLI to call Amazon Rekognition operations, passing base64-encoded image bytes is not supported. If you are using an AWS SDK  */
  Image: Image;
}

export interface SearchFacesInput {
  /** ID of the collection the face belongs to. */
  CollectionId: string;
  /** ID of a face to find matches for in the collection. */
  FaceId: string;
  /** Optional value specifying the minimum confidence in the face match to return. For example, don't return any matches where confidence in matches is less than 70%. The default value is 80%. */
  FaceMatchThreshold?: number;
  /** Maximum number of faces to return. The operation returns the maximum number of faces with the highest confidence in the match. */
  MaxFaces?: number;
}

export interface SearchFacesByImageInput {
  /** ID of the collection to search. */
  CollectionId: string;
  /** The input image as base64-encoded bytes or an S3 object. If you use the AWS CLI to call Amazon Rekognition operations, passing base64-encoded image bytes is not supported. If you are using an AWS SDK  */
  Image: Image;
  /** (Optional) Specifies the minimum confidence in the face match to return. For example, don't return any matches where confidence in matches is less than 70%. The default value is 80%. */
  FaceMatchThreshold?: number;
  /** Maximum number of faces to return. The operation returns the maximum number of faces with the highest confidence in the match. */
  MaxFaces?: number;
  /** A filter that specifies a quality bar for how much filtering is done to identify faces. Filtered faces aren't searched for in the collection. If you specify AUTO, Amazon Rekognition chooses the qualit */
  QualityFilter?: 'NONE' | 'AUTO' | 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface SearchUsersInput {
  /** The ID of an existing collection containing the UserID, used with a UserId or FaceId. If a FaceId is provided, UserId isn’t required to be present in the Collection. */
  CollectionId: string;
  /** ID for the existing face. */
  FaceId?: string;
  /** Maximum number of identities to return. */
  MaxUsers?: number;
  /** ID for the existing User. */
  UserId?: string;
  /** Optional value that specifies the minimum confidence in the matched UserID to return. Default value of 80. */
  UserMatchThreshold?: number;
}

export interface SearchUsersByImageInput {
  /** The ID of an existing collection containing the UserID. */
  CollectionId: string;
  Image: Image;
  /** Maximum number of UserIDs to return. */
  MaxUsers?: number;
  /** A filter that specifies a quality bar for how much filtering is done to identify faces. Filtered faces aren't searched for in the collection. The default value is NONE. */
  QualityFilter?: 'NONE' | 'AUTO' | 'LOW' | 'MEDIUM' | 'HIGH';
  /** Specifies the minimum confidence in the UserID match to return. Default value is 80. */
  UserMatchThreshold?: number;
}

export interface StartCelebrityRecognitionInput {
  /** The video in which you want to recognize celebrities. The video must be stored in an Amazon S3 bucket. */
  Video: Video;
  /** Idempotent token used to identify the start request. If you use the same token with multiple StartCelebrityRecognition requests, the same JobId is returned. Use ClientRequestToken to prevent the same  */
  ClientRequestToken?: string;
  /** An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic. For example, you can use JobTag to group related jobs and id */
  JobTag?: string;
  /** The Amazon SNS topic ARN that you want Amazon Rekognition Video to publish the completion status of the celebrity recognition analysis to. The Amazon SNS topic must have a topic name that begins with  */
  NotificationChannel?: NotificationChannel;
}

export interface StartContentModerationInput {
  /** The video in which you want to detect inappropriate, unwanted, or offensive content. The video must be stored in an Amazon S3 bucket. */
  Video: Video;
  /** Idempotent token used to identify the start request. If you use the same token with multiple StartContentModeration requests, the same JobId is returned. Use ClientRequestToken to prevent the same job */
  ClientRequestToken?: string;
  /** An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic. For example, you can use JobTag to group related jobs and id */
  JobTag?: string;
  /** Specifies the minimum confidence that Amazon Rekognition must have in order to return a moderated content label. Confidence represents how certain Amazon Rekognition is that the moderated content is c */
  MinConfidence?: number;
  /** The Amazon SNS topic ARN that you want Amazon Rekognition Video to publish the completion status of the content analysis to. The Amazon SNS topic must have a topic name that begins with AmazonRekognit */
  NotificationChannel?: NotificationChannel;
}

export interface StartFaceDetectionInput {
  /** The video in which you want to detect faces. The video must be stored in an Amazon S3 bucket. */
  Video: Video;
  /** Idempotent token used to identify the start request. If you use the same token with multiple StartFaceDetection requests, the same JobId is returned. Use ClientRequestToken to prevent the same job fro */
  ClientRequestToken?: string;
  /** The face attributes you want returned. DEFAULT - The following subset of facial attributes are returned: BoundingBox, Confidence, Pose, Quality and Landmarks. ALL - All facial attributes are returned. */
  FaceAttributes?: 'DEFAULT' | 'ALL';
  /** An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic. For example, you can use JobTag to group related jobs and id */
  JobTag?: string;
  /** The ARN of the Amazon SNS topic to which you want Amazon Rekognition Video to publish the completion status of the face detection operation. The Amazon SNS topic must have a topic name that begins wit */
  NotificationChannel?: NotificationChannel;
}

export interface StartFaceSearchInput {
  /** ID of the collection that contains the faces you want to search for. */
  CollectionId: string;
  /** The video you want to search. The video must be stored in an Amazon S3 bucket. */
  Video: Video;
  /** Idempotent token used to identify the start request. If you use the same token with multiple StartFaceSearch requests, the same JobId is returned. Use ClientRequestToken to prevent the same job from b */
  ClientRequestToken?: string;
  /** The minimum confidence in the person match to return. For example, don't return any matches where confidence in matches is less than 70%. The default value is 80%. */
  FaceMatchThreshold?: number;
  /** An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic. For example, you can use JobTag to group related jobs and id */
  JobTag?: string;
  /** The ARN of the Amazon SNS topic to which you want Amazon Rekognition Video to publish the completion status of the search. The Amazon SNS topic must have a topic name that begins with AmazonRekognitio */
  NotificationChannel?: NotificationChannel;
}

export interface StartLabelDetectionInput {
  /** The video in which you want to detect labels. The video must be stored in an Amazon S3 bucket. */
  Video: Video;
  /** Idempotent token used to identify the start request. If you use the same token with multiple StartLabelDetection requests, the same JobId is returned. Use ClientRequestToken to prevent the same job fr */
  ClientRequestToken?: string;
  /** The features to return after video analysis. You can specify that GENERAL_LABELS are returned. */
  Features?: 'GENERAL_LABELS'[];
  /** An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic. For example, you can use JobTag to group related jobs and id */
  JobTag?: string;
  /** Specifies the minimum confidence that Amazon Rekognition Video must have in order to return a detected label. Confidence represents how certain Amazon Rekognition is that a label is correctly identifi */
  MinConfidence?: number;
  /** The Amazon SNS topic ARN you want Amazon Rekognition Video to publish the completion status of the label detection operation to. The Amazon SNS topic must have a topic name that begins with AmazonReko */
  NotificationChannel?: NotificationChannel;
  /** The settings for a StartLabelDetection request.Contains the specified parameters for the label detection request of an asynchronous label analysis operation. Settings can include filters for GENERAL_L */
  Settings?: LabelDetectionSettings;
}

export interface StartMediaAnalysisJobInput {
  /** Input data to be analyzed by the job. */
  Input: MediaAnalysisInput;
  /** Configuration options for the media analysis job to be created. */
  OperationsConfig: MediaAnalysisOperationsConfig;
  /** The Amazon S3 bucket location to store the results. */
  OutputConfig: MediaAnalysisOutputConfig;
  /** Idempotency token used to prevent the accidental creation of duplicate versions. If you use the same token with multiple StartMediaAnalysisJobRequest requests, the same response is returned. Use Clien */
  ClientRequestToken?: string;
  /** The name of the job. Does not have to be unique. */
  JobName?: string;
  /** The identifier of customer managed AWS KMS key (name or ARN). The key is used to encrypt images copied into the service. The key is also used to encrypt results and manifest files written to the outpu */
  KmsKeyId?: string;
}

export interface StartPersonTrackingInput {
  /** The video in which you want to detect people. The video must be stored in an Amazon S3 bucket. */
  Video: Video;
  /** Idempotent token used to identify the start request. If you use the same token with multiple StartPersonTracking requests, the same JobId is returned. Use ClientRequestToken to prevent the same job fr */
  ClientRequestToken?: string;
  /** An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic. For example, you can use JobTag to group related jobs and id */
  JobTag?: string;
  /** The Amazon SNS topic ARN you want Amazon Rekognition Video to publish the completion status of the people detection operation to. The Amazon SNS topic must have a topic name that begins with AmazonRek */
  NotificationChannel?: NotificationChannel;
}

export interface StartProjectVersionInput {
  /** The minimum number of inference units to use. A single inference unit represents 1 hour of processing. Use a higher number to increase the TPS throughput of your model. You are charged for the number  */
  MinInferenceUnits: number;
  /** The Amazon Resource Name(ARN) of the model version that you want to start. */
  ProjectVersionArn: string;
  /** The maximum number of inference units to use for auto-scaling the model. If you don't specify a value, Amazon Rekognition Custom Labels doesn't auto-scale the model. */
  MaxInferenceUnits?: number;
}

export interface StartSegmentDetectionInput {
  /** An array of segment types to detect in the video. Valid values are TECHNICAL_CUE and SHOT. */
  SegmentTypes: 'TECHNICAL_CUE' | 'SHOT'[];
  Video: Video;
  /** Idempotent token used to identify the start request. If you use the same token with multiple StartSegmentDetection requests, the same JobId is returned. Use ClientRequestToken to prevent the same job  */
  ClientRequestToken?: string;
  /** Filters for technical cue or shot detection. */
  Filters?: StartSegmentDetectionFilters;
  /** An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic. For example, you can use JobTag to group related jobs and id */
  JobTag?: string;
  /** The ARN of the Amazon SNS topic to which you want Amazon Rekognition Video to publish the completion status of the segment detection operation. Note that the Amazon SNS topic must have a topic name th */
  NotificationChannel?: NotificationChannel;
}

export interface StartStreamProcessorInput {
  /** The name of the stream processor to start processing. */
  Name: string;
  /** Specifies the starting point in the Kinesis stream to start processing. You can use the producer timestamp or the fragment number. If you use the producer timestamp, you must put the time in milliseco */
  StartSelector?: StreamProcessingStartSelector;
  /** Specifies when to stop processing the stream. You can specify a maximum amount of time to process the video. This is a required parameter for label detection stream processors and should not be used t */
  StopSelector?: StreamProcessingStopSelector;
}

export interface StartTextDetectionInput {
  Video: Video;
  /** Idempotent token used to identify the start request. If you use the same token with multiple StartTextDetection requests, the same JobId is returned. Use ClientRequestToken to prevent the same job fro */
  ClientRequestToken?: string;
  /** Optional parameters that let you set criteria the text must meet to be included in your response. */
  Filters?: StartTextDetectionFilters;
  /** An identifier returned in the completion status published by your Amazon Simple Notification Service topic. For example, you can use JobTag to group related jobs and identify them in the completion no */
  JobTag?: string;
  NotificationChannel?: NotificationChannel;
}

export interface StopProjectVersionInput {
  /** The Amazon Resource Name (ARN) of the model version that you want to stop. This operation requires permissions to perform the rekognition:StopProjectVersion action. */
  ProjectVersionArn: string;
}

export interface StopStreamProcessorInput {
  /** The name of a stream processor created by CreateStreamProcessor. */
  Name: string;
}

export interface TagResourceInput {
  /** Amazon Resource Name (ARN) of the model, collection, or stream processor that you want to assign the tags to. */
  ResourceArn: string;
  /** The key-value tags to assign to the resource. */
  Tags: Record<string, string>;
}

export interface UntagResourceInput {
  /** Amazon Resource Name (ARN) of the model, collection, or stream processor that you want to remove the tags from. */
  ResourceArn: string;
  /** A list of the tags that you want to remove. */
  TagKeys: string[];
}

export interface UpdateDatasetEntriesInput {
  /** The changes that you want to make to the dataset. */
  Changes: DatasetChanges;
  /** The Amazon Resource Name (ARN) of the dataset that you want to update. */
  DatasetArn: string;
}

export interface UpdateStreamProcessorInput {
  /** Name of the stream processor that you want to update. */
  Name: string;
  /** Shows whether you are sharing data with Rekognition to improve model performance. You can choose this option at the account level or on a per-stream basis. Note that if you opt out at the account leve */
  DataSharingPreferenceForUpdate?: StreamProcessorDataSharingPreference;
  /** A list of parameters you want to delete from the stream processor. */
  ParametersToDelete?: 'ConnectedHomeMinConfidence' | 'RegionsOfInterest'[];
  /** Specifies locations in the frames where Amazon Rekognition checks for objects or people. This is an optional parameter for label detection stream processors. */
  RegionsOfInterestForUpdate?: RegionOfInterest[];
  /** The stream processor settings that you want to update. Label detection settings can be updated to detect different labels with a different minimum confidence. */
  SettingsForUpdate?: StreamProcessorSettingsForUpdate;
}

/** Rekognition service binding for Step Functions SDK integrations. */
export class Rekognition {
  constructor() {}

  associateFaces<T>(params: AssociateFacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  compareFaces<T>(params: CompareFacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyProjectVersion<T>(params: CopyProjectVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCollection<T>(params: CreateCollectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDataset<T>(params: CreateDatasetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createFaceLivenessSession<T>(params: CreateFaceLivenessSessionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createProject<T>(params: CreateProjectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createProjectVersion<T>(params: CreateProjectVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStreamProcessor<T>(params: CreateStreamProcessorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createUser<T>(params: CreateUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCollection<T>(params: DeleteCollectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDataset<T>(params: DeleteDatasetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteFaces<T>(params: DeleteFacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteProject<T>(params: DeleteProjectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteProjectPolicy<T>(params: DeleteProjectPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteProjectVersion<T>(params: DeleteProjectVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStreamProcessor<T>(params: DeleteStreamProcessorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUser<T>(params: DeleteUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCollection<T>(params: DescribeCollectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDataset<T>(params: DescribeDatasetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProjects<T>(params: DescribeProjectsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProjectVersions<T>(params: DescribeProjectVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStreamProcessor<T>(params: DescribeStreamProcessorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectCustomLabels<T>(params: DetectCustomLabelsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectFaces<T>(params: DetectFacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectLabels<T>(params: DetectLabelsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectModerationLabels<T>(params: DetectModerationLabelsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectProtectiveEquipment<T>(params: DetectProtectiveEquipmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectText<T>(params: DetectTextInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateFaces<T>(params: DisassociateFacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  distributeDatasetEntries<T>(params: DistributeDatasetEntriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCelebrityInfo<T>(params: GetCelebrityInfoInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCelebrityRecognition<T>(params: GetCelebrityRecognitionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getContentModeration<T>(params: GetContentModerationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getFaceDetection<T>(params: GetFaceDetectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getFaceLivenessSessionResults<T>(params: GetFaceLivenessSessionResultsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getFaceSearch<T>(params: GetFaceSearchInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLabelDetection<T>(params: GetLabelDetectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMediaAnalysisJob<T>(params: GetMediaAnalysisJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPersonTracking<T>(params: GetPersonTrackingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSegmentDetection<T>(params: GetSegmentDetectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTextDetection<T>(params: GetTextDetectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  indexFaces<T>(params: IndexFacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCollections<T>(params: ListCollectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDatasetEntries<T>(params: ListDatasetEntriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDatasetLabels<T>(params: ListDatasetLabelsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listFaces<T>(params: ListFacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMediaAnalysisJobs<T>(params: ListMediaAnalysisJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listProjectPolicies<T>(params: ListProjectPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStreamProcessors<T>(params: ListStreamProcessorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUsers<T>(params: ListUsersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putProjectPolicy<T>(params: PutProjectPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  recognizeCelebrities<T>(params: RecognizeCelebritiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchFaces<T>(params: SearchFacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchFacesByImage<T>(params: SearchFacesByImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchUsers<T>(params: SearchUsersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchUsersByImage<T>(params: SearchUsersByImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startCelebrityRecognition<T>(params: StartCelebrityRecognitionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startContentModeration<T>(params: StartContentModerationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startFaceDetection<T>(params: StartFaceDetectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startFaceSearch<T>(params: StartFaceSearchInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startLabelDetection<T>(params: StartLabelDetectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startMediaAnalysisJob<T>(params: StartMediaAnalysisJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startPersonTracking<T>(params: StartPersonTrackingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startProjectVersion<T>(params: StartProjectVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startSegmentDetection<T>(params: StartSegmentDetectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startStreamProcessor<T>(params: StartStreamProcessorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startTextDetection<T>(params: StartTextDetectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopProjectVersion<T>(params: StopProjectVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopStreamProcessor<T>(params: StopStreamProcessorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDatasetEntries<T>(params: UpdateDatasetEntriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStreamProcessor<T>(params: UpdateStreamProcessorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
