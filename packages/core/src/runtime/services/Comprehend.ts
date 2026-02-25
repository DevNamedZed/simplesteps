// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface DocumentReaderConfig {
  /** This field defines the Amazon Textract API operation that Amazon Comprehend uses to extract text from PDF files and image files. Enter one of the following values: TEXTRACT_DETECT_DOCUMENT_TEXT - The  */
  DocumentReadAction: 'TEXTRACT_DETECT_DOCUMENT_TEXT' | 'TEXTRACT_ANALYZE_DOCUMENT';
  /** Determines the text extraction actions for PDF files. Enter one of the following values: SERVICE_DEFAULT - use the Amazon Comprehend service defaults for PDF files. FORCE_DOCUMENT_READ_ACTION - Amazon */
  DocumentReadMode?: 'SERVICE_DEFAULT' | 'FORCE_DOCUMENT_READ_ACTION';
  /** Specifies the type of Amazon Textract features to apply. If you chose TEXTRACT_ANALYZE_DOCUMENT as the read action, you must specify one or both of the following values: TABLES - Returns additional in */
  FeatureTypes?: 'TABLES' | 'FORMS'[];
}

export interface DatasetDocumentClassifierInputDataConfig {
  /** The Amazon S3 URI for the input data. The S3 bucket must be in the same Region as the API endpoint that you are calling. The URI can point to a single input file or it can provide the prefix for a col */
  S3Uri: string;
  /** Indicates the delimiter used to separate each label for training a multi-label classifier. The default delimiter between labels is a pipe (|). You can use a different character as a delimiter (if it's */
  LabelDelimiter?: string;
}

export interface DatasetEntityRecognizerInputDataConfig {
  /** The S3 location of the annotation documents for your custom entity recognizer. */
  Annotations?: any;
  /** The format and location of the training documents for your custom entity recognizer. */
  Documents: any;
  /** The S3 location of the entity list for your custom entity recognizer. */
  EntityList?: any;
}

export interface DatasetInputDataConfig {
  /** A list of augmented manifest files that provide training data for your custom model. An augmented manifest file is a labeled dataset that is produced by Amazon SageMaker Ground Truth. */
  AugmentedManifests?: any[];
  /** COMPREHEND_CSV: The data format is a two-column CSV file, where the first column contains labels and the second column contains documents. AUGMENTED_MANIFEST: The data format */
  DataFormat?: 'COMPREHEND_CSV' | 'AUGMENTED_MANIFEST';
  /** The input properties for training a document classifier model. For more information on how the input file is formatted, see Preparing training data in the Comprehend Developer Guide. */
  DocumentClassifierInputDataConfig?: DatasetDocumentClassifierInputDataConfig;
  /** The input properties for training an entity recognizer model. */
  EntityRecognizerInputDataConfig?: DatasetEntityRecognizerInputDataConfig;
}

export interface Tag {
  /** The initial part of a key-value pair that forms a tag associated with a given resource. For instance, if you want to show which resources are used by which departments, you might use “Department” as t */
  Key: string;
  /** The second part of a key-value pair that forms a tag associated with a given resource. For instance, if you want to show which resources are used by which departments, you might use “Department” as th */
  Value?: string;
}

export interface DocumentClassifierDocuments {
  /** The S3 URI location of the training documents specified in the S3Uri CSV file. */
  S3Uri: string;
  /** The S3 URI location of the test documents included in the TestS3Uri CSV file. This field is not required if you do not specify a test CSV file. */
  TestS3Uri?: string;
}

export interface DocumentClassifierInputDataConfig {
  /** The format of your training data: COMPREHEND_CSV: A two-column CSV file, where labels are provided in the first column, and documents are provided in the second. If you use this value, you must provid */
  DataFormat?: 'COMPREHEND_CSV' | 'AUGMENTED_MANIFEST';
  /** The Amazon S3 URI for the input data. The S3 bucket must be in the same Region as the API endpoint that you are calling. The URI can point to a single input file or it can provide the prefix for a col */
  S3Uri?: string;
  /** This specifies the Amazon S3 location that contains the test annotations for the document classifier. The URI must be in the same Amazon Web Services Region as the API endpoint that you are calling. */
  TestS3Uri?: string;
  /** Indicates the delimiter used to separate each label for training a multi-label classifier. The default delimiter between labels is a pipe (|). You can use a different character as a delimiter (if it's */
  LabelDelimiter?: string;
  /** A list of augmented manifest files that provide training data for your custom model. An augmented manifest file is a labeled dataset that is produced by Amazon SageMaker Ground Truth. This parameter i */
  AugmentedManifests?: any[];
  /** The type of input documents for training the model. Provide plain-text documents to create a plain-text model, and provide semi-structured documents to create a native document model. */
  DocumentType?: 'PLAIN_TEXT_DOCUMENT' | 'SEMI_STRUCTURED_DOCUMENT';
  /** The S3 location of the training documents. This parameter is required in a request to create a native document model. */
  Documents?: DocumentClassifierDocuments;
  DocumentReaderConfig?: DocumentReaderConfig;
}

export interface DocumentClassifierOutputDataConfig {
  /** When you use the OutputDataConfig object while creating a custom classifier, you specify the Amazon S3 location where you want to write the confusion matrix and other output files. The URI must be in  */
  S3Uri?: string;
  /** ID for the Amazon Web Services Key Management Service (KMS) key that Amazon Comprehend uses to encrypt the output results from an analysis job. The KmsKeyId can be one of the following formats: KMS Ke */
  KmsKeyId?: string;
  /** The Amazon S3 prefix for the data lake location of the flywheel statistics. */
  FlywheelStatsS3Prefix?: string;
}

export interface VpcConfig {
  /** The ID number for a security group on an instance of your private VPC. Security groups on your VPC function serve as a virtual firewall to control inbound and outbound traffic and provides security fo */
  SecurityGroupIds: string[];
  /** The ID for each subnet being used in your private VPC. This subnet is a subset of the a range of IPv4 addresses used by the VPC and is specific to a given availability zone in the VPC’s Region. This I */
  Subnets: string[];
}

export interface EntityRecognizerDocuments {
  /** Specifies the Amazon S3 location where the training documents for an entity recognizer are located. The URI must be in the same Region as the API endpoint that you are calling. */
  S3Uri: string;
  /** Specifies the Amazon S3 location where the test documents for an entity recognizer are located. The URI must be in the same Amazon Web Services Region as the API endpoint that you are calling. */
  TestS3Uri?: string;
  /** Specifies how the text in an input file should be processed. This is optional, and the default is ONE_DOC_PER_LINE. ONE_DOC_PER_FILE - Each file is considered a separate document. Use this option when */
  InputFormat?: 'ONE_DOC_PER_FILE' | 'ONE_DOC_PER_LINE';
}

export interface EntityRecognizerAnnotations {
  /** Specifies the Amazon S3 location where the annotations for an entity recognizer are located. The URI must be in the same Region as the API endpoint that you are calling. */
  S3Uri: string;
  /** Specifies the Amazon S3 location where the test annotations for an entity recognizer are located. The URI must be in the same Region as the API endpoint that you are calling. */
  TestS3Uri?: string;
}

export interface EntityRecognizerEntityList {
  /** Specifies the Amazon S3 location where the entity list is located. The URI must be in the same Region as the API endpoint that you are calling. */
  S3Uri: string;
}

export interface EntityRecognizerInputDataConfig {
  /** The format of your training data: COMPREHEND_CSV: A CSV file that supplements your training documents. The CSV file contains information about the custom entities that your trained model will detect.  */
  DataFormat?: 'COMPREHEND_CSV' | 'AUGMENTED_MANIFEST';
  /** The entity types in the labeled training data that Amazon Comprehend uses to train the custom entity recognizer. Any entity types that you don't specify are ignored. A maximum of 25 entity types can b */
  EntityTypes: any[];
  /** The S3 location of the folder that contains the training documents for your custom entity recognizer. This parameter is required if you set DataFormat to COMPREHEND_CSV. */
  Documents?: EntityRecognizerDocuments;
  /** The S3 location of the CSV file that annotates your training documents. */
  Annotations?: EntityRecognizerAnnotations;
  /** The S3 location of the CSV file that has the entity list for your custom entity recognizer. */
  EntityList?: EntityRecognizerEntityList;
  /** A list of augmented manifest files that provide training data for your custom model. An augmented manifest file is a labeled dataset that is produced by Amazon SageMaker Ground Truth. This parameter i */
  AugmentedManifests?: any[];
}

export interface DocumentClassificationConfig {
  /** Classification mode indicates whether the documents are MULTI_CLASS or MULTI_LABEL. */
  Mode: 'MULTI_CLASS' | 'MULTI_LABEL';
  /** One or more labels to associate with the custom classifier. */
  Labels?: any[];
}

export interface EntityRecognitionConfig {
  /** Up to 25 entity types that the model is trained to recognize. */
  EntityTypes: any[];
}

export interface TaskConfig {
  /** Language code for the language that the model supports. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** Configuration required for a document classification model. */
  DocumentClassificationConfig?: DocumentClassificationConfig;
  /** Configuration required for an entity recognition model. */
  EntityRecognitionConfig?: EntityRecognitionConfig;
}

export interface DataSecurityConfig {
  /** ID for the KMS key that Amazon Comprehend uses to encrypt trained custom models. The ModelKmsKeyId can be either of the following formats: KMS Key ID: "1234abcd-12ab-34cd-56ef-1234567890ab" Amazon Res */
  ModelKmsKeyId?: string;
  /** ID for the KMS key that Amazon Comprehend uses to encrypt the volume. */
  VolumeKmsKeyId?: string;
  /** ID for the KMS key that Amazon Comprehend uses to encrypt the data in the data lake. */
  DataLakeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}

export interface TextSegment {
  /** The text content. */
  Text: string;
}

export interface DatasetFilter {
  /** Filter the datasets based on the dataset status. */
  Status?: 'CREATING' | 'COMPLETED' | 'FAILED';
  /** Filter the datasets based on the dataset type. */
  DatasetType?: 'TRAIN' | 'TEST';
  /** Filter the datasets to include datasets created after the specified time. */
  CreationTimeAfter?: string;
  /** Filter the datasets to include datasets created before the specified time. */
  CreationTimeBefore?: string;
}

export interface DocumentClassificationJobFilter {
  /** Filters on the name of the job. */
  JobName?: string;
  /** Filters the list based on job status. Returns only jobs with the specified status. */
  JobStatus?: 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'STOP_REQUESTED' | 'STOPPED';
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted before the specified time. Jobs are returned in ascending order, oldest to newest. */
  SubmitTimeBefore?: string;
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted after the specified time. Jobs are returned in descending order, newest to oldest. */
  SubmitTimeAfter?: string;
}

export interface DocumentClassifierFilter {
  /** Filters the list of classifiers based on status. */
  Status?: 'SUBMITTED' | 'TRAINING' | 'DELETING' | 'STOP_REQUESTED' | 'STOPPED' | 'IN_ERROR' | 'TRAINED' | 'TRAINED_WITH_WARNING';
  /** The name that you assigned to the document classifier */
  DocumentClassifierName?: string;
  /** Filters the list of classifiers based on the time that the classifier was submitted for processing. Returns only classifiers submitted before the specified time. Classifiers are returned in ascending  */
  SubmitTimeBefore?: string;
  /** Filters the list of classifiers based on the time that the classifier was submitted for processing. Returns only classifiers submitted after the specified time. Classifiers are returned in descending  */
  SubmitTimeAfter?: string;
}

export interface DominantLanguageDetectionJobFilter {
  /** Filters on the name of the job. */
  JobName?: string;
  /** Filters the list of jobs based on job status. Returns only jobs with the specified status. */
  JobStatus?: 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'STOP_REQUESTED' | 'STOPPED';
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted before the specified time. Jobs are returned in ascending order, oldest to newest. */
  SubmitTimeBefore?: string;
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted after the specified time. Jobs are returned in descending order, newest to oldest. */
  SubmitTimeAfter?: string;
}

export interface EndpointFilter {
  /** The Amazon Resource Number (ARN) of the model to which the endpoint is attached. */
  ModelArn?: string;
  /** Specifies the status of the endpoint being returned. Possible values are: Creating, Ready, Updating, Deleting, Failed. */
  Status?: 'CREATING' | 'DELETING' | 'FAILED' | 'IN_SERVICE' | 'UPDATING';
  /** Specifies a date before which the returned endpoint or endpoints were created. */
  CreationTimeBefore?: string;
  /** Specifies a date after which the returned endpoint or endpoints were created. */
  CreationTimeAfter?: string;
}

export interface EntitiesDetectionJobFilter {
  /** Filters on the name of the job. */
  JobName?: string;
  /** Filters the list of jobs based on job status. Returns only jobs with the specified status. */
  JobStatus?: 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'STOP_REQUESTED' | 'STOPPED';
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted before the specified time. Jobs are returned in ascending order, oldest to newest. */
  SubmitTimeBefore?: string;
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted after the specified time. Jobs are returned in descending order, newest to oldest. */
  SubmitTimeAfter?: string;
}

export interface EntityRecognizerFilter {
  /** The status of an entity recognizer. */
  Status?: 'SUBMITTED' | 'TRAINING' | 'DELETING' | 'STOP_REQUESTED' | 'STOPPED' | 'IN_ERROR' | 'TRAINED' | 'TRAINED_WITH_WARNING';
  /** The name that you assigned the entity recognizer. */
  RecognizerName?: string;
  /** Filters the list of entities based on the time that the list was submitted for processing. Returns only jobs submitted before the specified time. Jobs are returned in descending order, newest to oldes */
  SubmitTimeBefore?: string;
  /** Filters the list of entities based on the time that the list was submitted for processing. Returns only jobs submitted after the specified time. Jobs are returned in ascending order, oldest to newest. */
  SubmitTimeAfter?: string;
}

export interface EventsDetectionJobFilter {
  /** Filters on the name of the events detection job. */
  JobName?: string;
  /** Filters the list of jobs based on job status. Returns only jobs with the specified status. */
  JobStatus?: 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'STOP_REQUESTED' | 'STOPPED';
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted before the specified time. Jobs are returned in ascending order, oldest to newest. */
  SubmitTimeBefore?: string;
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted after the specified time. Jobs are returned in descending order, newest to oldest. */
  SubmitTimeAfter?: string;
}

export interface FlywheelIterationFilter {
  /** Filter the flywheel iterations to include iterations created after the specified time. */
  CreationTimeAfter?: string;
  /** Filter the flywheel iterations to include iterations created before the specified time. */
  CreationTimeBefore?: string;
}

export interface FlywheelFilter {
  /** Filter the flywheels based on the flywheel status. */
  Status?: 'CREATING' | 'ACTIVE' | 'UPDATING' | 'DELETING' | 'FAILED';
  /** Filter the flywheels to include flywheels created after the specified time. */
  CreationTimeAfter?: string;
  /** Filter the flywheels to include flywheels created before the specified time. */
  CreationTimeBefore?: string;
}

export interface KeyPhrasesDetectionJobFilter {
  /** Filters on the name of the job. */
  JobName?: string;
  /** Filters the list of jobs based on job status. Returns only jobs with the specified status. */
  JobStatus?: 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'STOP_REQUESTED' | 'STOPPED';
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted before the specified time. Jobs are returned in ascending order, oldest to newest. */
  SubmitTimeBefore?: string;
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted after the specified time. Jobs are returned in descending order, newest to oldest. */
  SubmitTimeAfter?: string;
}

export interface PiiEntitiesDetectionJobFilter {
  /** Filters on the name of the job. */
  JobName?: string;
  /** Filters the list of jobs based on job status. Returns only jobs with the specified status. */
  JobStatus?: 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'STOP_REQUESTED' | 'STOPPED';
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted before the specified time. Jobs are returned in ascending order, oldest to newest. */
  SubmitTimeBefore?: string;
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted after the specified time. Jobs are returned in descending order, newest to oldest. */
  SubmitTimeAfter?: string;
}

export interface SentimentDetectionJobFilter {
  /** Filters on the name of the job. */
  JobName?: string;
  /** Filters the list of jobs based on job status. Returns only jobs with the specified status. */
  JobStatus?: 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'STOP_REQUESTED' | 'STOPPED';
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted before the specified time. Jobs are returned in ascending order, oldest to newest. */
  SubmitTimeBefore?: string;
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted after the specified time. Jobs are returned in descending order, newest to oldest. */
  SubmitTimeAfter?: string;
}

export interface TargetedSentimentDetectionJobFilter {
  /** Filters on the name of the job. */
  JobName?: string;
  /** Filters the list of jobs based on job status. Returns only jobs with the specified status. */
  JobStatus?: 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'STOP_REQUESTED' | 'STOPPED';
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted before the specified time. Jobs are returned in ascending order, oldest to newest. */
  SubmitTimeBefore?: string;
  /** Filters the list of jobs based on the time that the job was submitted for processing. Returns only jobs submitted after the specified time. Jobs are returned in descending order, newest to oldest. */
  SubmitTimeAfter?: string;
}

export interface TopicsDetectionJobFilter {
  JobName?: string;
  /** Filters the list of topic detection jobs based on job status. Returns only jobs with the specified status. */
  JobStatus?: 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'STOP_REQUESTED' | 'STOPPED';
  /** Filters the list of jobs based on the time that the job was submitted for processing. Only returns jobs submitted before the specified time. Jobs are returned in descending order, newest to oldest. */
  SubmitTimeBefore?: string;
  /** Filters the list of jobs based on the time that the job was submitted for processing. Only returns jobs submitted after the specified time. Jobs are returned in ascending order, oldest to newest. */
  SubmitTimeAfter?: string;
}

export interface InputDataConfig {
  /** The Amazon S3 URI for the input data. The URI must be in same Region as the API endpoint that you are calling. The URI can point to a single input file or it can provide the prefix for a collection of */
  S3Uri: string;
  /** Specifies how the text in an input file should be processed: ONE_DOC_PER_FILE - Each file is considered a separate document. Use this option when you are processing large documents, such as newspaper  */
  InputFormat?: 'ONE_DOC_PER_FILE' | 'ONE_DOC_PER_LINE';
  /** Provides configuration parameters to override the default actions for extracting text from PDF documents and image files. */
  DocumentReaderConfig?: DocumentReaderConfig;
}

export interface OutputDataConfig {
  /** When you use the OutputDataConfig object with asynchronous operations, you specify the Amazon S3 location where you want to write the output data. The URI must be in the same Region as the API endpoin */
  S3Uri: string;
  /** ID for the Amazon Web Services Key Management Service (KMS) key that Amazon Comprehend uses to encrypt the output results from an analysis job. Specify the Key Id of a symmetric key, because you canno */
  KmsKeyId?: string;
}

export interface RedactionConfig {
  /** An array of the types of PII entities that Amazon Comprehend detects in the input text for your request. */
  PiiEntityTypes?: 'BANK_ACCOUNT_NUMBER' | 'BANK_ROUTING' | 'CREDIT_DEBIT_NUMBER' | 'CREDIT_DEBIT_CVV' | 'CREDIT_DEBIT_EXPIRY' | 'PIN' | 'EMAIL' | 'ADDRESS' | 'NAME' | 'PHONE' | 'SSN' | 'DATE_TIME' | 'PASSPORT_NUMBER' | 'DRIVER_ID' | 'URL' | 'AGE' | 'USERNAME' | 'PASSWORD' | 'AWS_ACCESS_KEY' | 'AWS_SECRET_KEY' | 'IP_ADDRESS' | 'MAC_ADDRESS' | 'ALL' | 'LICENSE_PLATE' | 'VEHICLE_IDENTIFICATION_NUMBER' | 'UK_NATIONAL_INSURANCE_NUMBER' | 'CA_SOCIAL_INSURANCE_NUMBER' | 'US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER' | 'UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER' | 'IN_PERMANENT_ACCOUNT_NUMBER' | 'IN_NREGA' | 'INTERNATIONAL_BANK_ACCOUNT_NUMBER' | 'SWIFT_CODE' | 'UK_NATIONAL_HEALTH_SERVICE_NUMBER' | 'CA_HEALTH_NUMBER' | 'IN_AADHAAR' | 'IN_VOTER_NUMBER'[];
  /** Specifies whether the PII entity is redacted with the mask character or the entity type. */
  MaskMode?: 'MASK' | 'REPLACE_WITH_PII_ENTITY_TYPE';
  /** A character that replaces each character in the redacted PII entity. */
  MaskCharacter?: string;
}

export interface UpdateDataSecurityConfig {
  /** ID for the KMS key that Amazon Comprehend uses to encrypt trained custom models. The ModelKmsKeyId can be either of the following formats: KMS Key ID: "1234abcd-12ab-34cd-56ef-1234567890ab" Amazon Res */
  ModelKmsKeyId?: string;
  /** ID for the KMS key that Amazon Comprehend uses to encrypt the volume. */
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}

export interface BatchDetectDominantLanguageInput {
  /** A list containing the UTF-8 encoded text of the input documents. The list can contain a maximum of 25 documents. Each document should contain at least 20 characters. The maximum size of each document  */
  TextList: string[];
}

export interface BatchDetectEntitiesInput {
  /** The language of the input documents. You can specify any of the primary languages supported by Amazon Comprehend. All documents must be in the same language. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** A list containing the UTF-8 encoded text of the input documents. The list can contain a maximum of 25 documents. The maximum size of each document is 5 KB. */
  TextList: string[];
}

export interface BatchDetectKeyPhrasesInput {
  /** The language of the input documents. You can specify any of the primary languages supported by Amazon Comprehend. All documents must be in the same language. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** A list containing the UTF-8 encoded text of the input documents. The list can contain a maximum of 25 documents. The maximum size of each document is 5 KB. */
  TextList: string[];
}

export interface BatchDetectSentimentInput {
  /** The language of the input documents. You can specify any of the primary languages supported by Amazon Comprehend. All documents must be in the same language. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** A list containing the UTF-8 encoded text of the input documents. The list can contain a maximum of 25 documents. The maximum size of each document is 5 KB. */
  TextList: string[];
}

export interface BatchDetectSyntaxInput {
  /** The language of the input documents. You can specify any of the following languages supported by Amazon Comprehend: German ("de"), English ("en"), Spanish ("es"), French ("fr"), Italian ("it"), or Por */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt';
  /** A list containing the UTF-8 encoded text of the input documents. The list can contain a maximum of 25 documents. The maximum size for each document is 5 KB. */
  TextList: string[];
}

export interface BatchDetectTargetedSentimentInput {
  /** The language of the input documents. Currently, English is the only supported language. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** A list containing the UTF-8 encoded text of the input documents. The list can contain a maximum of 25 documents. The maximum size of each document is 5 KB. */
  TextList: string[];
}

export interface ClassifyDocumentInput {
  /** The Amazon Resource Number (ARN) of the endpoint. For prompt safety classification, Amazon Comprehend provides the endpoint ARN. For more information about prompt safety classifiers, see Prompt safety */
  EndpointArn: string;
  /** Use the Bytes parameter to input a text, PDF, Word or image file. When you classify a document using a custom model, you can also use the Bytes parameter to input an Amazon Textract DetectDocumentText */
  Bytes?: string;
  /** Provides configuration parameters to override the default actions for extracting text from PDF documents and image files. */
  DocumentReaderConfig?: DocumentReaderConfig;
  /** The document text to be analyzed. If you enter text using this parameter, do not use the Bytes parameter. */
  Text?: string;
}

export interface ContainsPiiEntitiesInput {
  /** The language of the input documents. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** A UTF-8 text string. The maximum string size is 100 KB. */
  Text: string;
}

export interface CreateDatasetInput {
  /** Name of the dataset. */
  DatasetName: string;
  /** The Amazon Resource Number (ARN) of the flywheel of the flywheel to receive the data. */
  FlywheelArn: string;
  /** Information about the input data configuration. The type of input data varies based on the format of the input and whether the data is for a classifier model or an entity recognition model. */
  InputDataConfig: DatasetInputDataConfig;
  /** A unique identifier for the request. If you don't set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** The dataset type. You can specify that the data in a dataset is for training the model or for testing the model. */
  DatasetType?: 'TRAIN' | 'TEST';
  /** Description of the dataset. */
  Description?: string;
  /** Tags for the dataset. */
  Tags?: Tag[];
}

export interface CreateDocumentClassifierInput {
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data. */
  DataAccessRoleArn: string;
  /** The name of the document classifier. */
  DocumentClassifierName: string;
  /** Specifies the format and location of the input data for the job. */
  InputDataConfig: DocumentClassifierInputDataConfig;
  /** The language of the input documents. You can specify any of the languages supported by Amazon Comprehend. All documents must be in the same language. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** A unique identifier for the request. If you don't set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** Indicates the mode in which the classifier will be trained. The classifier can be trained in multi-class (single-label) mode or multi-label mode. Multi-class mode identifies a single class label for e */
  Mode?: 'MULTI_CLASS' | 'MULTI_LABEL';
  /** ID for the KMS key that Amazon Comprehend uses to encrypt trained custom models. The ModelKmsKeyId can be either of the following formats: KMS Key ID: "1234abcd-12ab-34cd-56ef-1234567890ab" Amazon Res */
  ModelKmsKeyId?: string;
  /** The resource-based policy to attach to your custom document classifier model. You can use this policy to allow another Amazon Web Services account to import your custom model. Provide your policy as a */
  ModelPolicy?: string;
  /** Specifies the location for the output files from a custom classifier job. This parameter is required for a request that creates a native document model. */
  OutputDataConfig?: DocumentClassifierOutputDataConfig;
  /** Tags to associate with the document classifier. A tag is a key-value pair that adds as a metadata to a resource used by Amazon Comprehend. For example, a tag with "Sales" as the key might be added to  */
  Tags?: Tag[];
  /** The version name given to the newly created classifier. Version names can have a maximum of 256 characters. Alphanumeric characters, hyphens (-) and underscores (_) are allowed. The version name must  */
  VersionName?: string;
  /** ID for the Amazon Web Services Key Management Service (KMS) key that Amazon Comprehend uses to encrypt data on the storage volume attached to the ML compute instance(s) that process the analysis job.  */
  VolumeKmsKeyId?: string;
  /** Configuration parameters for an optional private Virtual Private Cloud (VPC) containing the resources you are using for your custom classifier. For more information, see Amazon VPC. */
  VpcConfig?: VpcConfig;
}

export interface CreateEndpointInput {
  /** The desired number of inference units to be used by the model using this endpoint. Each inference unit represents of a throughput of 100 characters per second. */
  DesiredInferenceUnits: number;
  /** This is the descriptive suffix that becomes part of the EndpointArn used for all subsequent requests to this resource. */
  EndpointName: string;
  /** An idempotency token provided by the customer. If this token matches a previous endpoint creation request, Amazon Comprehend will not return a ResourceInUseException. */
  ClientRequestToken?: string;
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to trained custom models encrypted with a customer managed key (ModelKmsKeyId). */
  DataAccessRoleArn?: string;
  /** The Amazon Resource Number (ARN) of the flywheel to which the endpoint will be attached. */
  FlywheelArn?: string;
  /** The Amazon Resource Number (ARN) of the model to which the endpoint will be attached. */
  ModelArn?: string;
  /** Tags to associate with the endpoint. A tag is a key-value pair that adds metadata to the endpoint. For example, a tag with "Sales" as the key might be added to an endpoint to indicate its use by the s */
  Tags?: Tag[];
}

export interface CreateEntityRecognizerInput {
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data. */
  DataAccessRoleArn: string;
  /** Specifies the format and location of the input data. The S3 bucket containing the input data must be located in the same Region as the entity recognizer being created. */
  InputDataConfig: EntityRecognizerInputDataConfig;
  /** You can specify any of the following languages: English ("en"), Spanish ("es"), French ("fr"), Italian ("it"), German ("de"), or Portuguese ("pt"). If you plan to use this entity recognizer with PDF,  */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** The name given to the newly created recognizer. Recognizer names can be a maximum of 256 characters. Alphanumeric characters, hyphens (-) and underscores (_) are allowed. The name must be unique in th */
  RecognizerName: string;
  /** A unique identifier for the request. If you don't set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** ID for the KMS key that Amazon Comprehend uses to encrypt trained custom models. The ModelKmsKeyId can be either of the following formats: KMS Key ID: "1234abcd-12ab-34cd-56ef-1234567890ab" Amazon Res */
  ModelKmsKeyId?: string;
  /** The JSON resource-based policy to attach to your custom entity recognizer model. You can use this policy to allow another Amazon Web Services account to import your custom model. Provide your JSON as  */
  ModelPolicy?: string;
  /** Tags to associate with the entity recognizer. A tag is a key-value pair that adds as a metadata to a resource used by Amazon Comprehend. For example, a tag with "Sales" as the key might be added to a  */
  Tags?: Tag[];
  /** The version name given to the newly created recognizer. Version names can be a maximum of 256 characters. Alphanumeric characters, hyphens (-) and underscores (_) are allowed. The version name must be */
  VersionName?: string;
  /** ID for the Amazon Web Services Key Management Service (KMS) key that Amazon Comprehend uses to encrypt data on the storage volume attached to the ML compute instance(s) that process the analysis job.  */
  VolumeKmsKeyId?: string;
  /** Configuration parameters for an optional private Virtual Private Cloud (VPC) containing the resources you are using for your custom entity recognizer. For more information, see Amazon VPC. */
  VpcConfig?: VpcConfig;
}

export interface CreateFlywheelInput {
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend the permissions required to access the flywheel data in the data lake. */
  DataAccessRoleArn: string;
  /** Enter the S3 location for the data lake. You can specify a new S3 bucket or a new folder of an existing S3 bucket. The flywheel creates the data lake at this location. */
  DataLakeS3Uri: string;
  /** Name for the flywheel. */
  FlywheelName: string;
  /** To associate an existing model with the flywheel, specify the Amazon Resource Number (ARN) of the model version. Do not set TaskConfig or ModelType if you specify an ActiveModelArn. */
  ActiveModelArn?: string;
  /** A unique identifier for the request. If you don't set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** Data security configurations. */
  DataSecurityConfig?: DataSecurityConfig;
  /** The model type. You need to set ModelType if you are creating a flywheel for a new model. */
  ModelType?: 'DOCUMENT_CLASSIFIER' | 'ENTITY_RECOGNIZER';
  /** The tags to associate with this flywheel. */
  Tags?: Tag[];
  /** Configuration about the model associated with the flywheel. You need to set TaskConfig if you are creating a flywheel for a new model. */
  TaskConfig?: TaskConfig;
}

export interface DeleteDocumentClassifierInput {
  /** The Amazon Resource Name (ARN) that identifies the document classifier. */
  DocumentClassifierArn: string;
}

export interface DeleteEndpointInput {
  /** The Amazon Resource Number (ARN) of the endpoint being deleted. */
  EndpointArn: string;
}

export interface DeleteEntityRecognizerInput {
  /** The Amazon Resource Name (ARN) that identifies the entity recognizer. */
  EntityRecognizerArn: string;
}

export interface DeleteFlywheelInput {
  /** The Amazon Resource Number (ARN) of the flywheel to delete. */
  FlywheelArn: string;
}

export interface DeleteResourcePolicyInput {
  /** The Amazon Resource Name (ARN) of the custom model version that has the policy to delete. */
  ResourceArn: string;
  /** The revision ID of the policy to delete. */
  PolicyRevisionId?: string;
}

export interface DescribeDatasetInput {
  /** The ARN of the dataset. */
  DatasetArn: string;
}

export interface DescribeDocumentClassificationJobInput {
  /** The identifier that Amazon Comprehend generated for the job. The StartDocumentClassificationJob operation returns this identifier in its response. */
  JobId: string;
}

export interface DescribeDocumentClassifierInput {
  /** The Amazon Resource Name (ARN) that identifies the document classifier. The CreateDocumentClassifier operation returns this identifier in its response. */
  DocumentClassifierArn: string;
}

export interface DescribeDominantLanguageDetectionJobInput {
  /** The identifier that Amazon Comprehend generated for the job. The StartDominantLanguageDetectionJob operation returns this identifier in its response. */
  JobId: string;
}

export interface DescribeEndpointInput {
  /** The Amazon Resource Number (ARN) of the endpoint being described. */
  EndpointArn: string;
}

export interface DescribeEntitiesDetectionJobInput {
  /** The identifier that Amazon Comprehend generated for the job. The StartEntitiesDetectionJob operation returns this identifier in its response. */
  JobId: string;
}

export interface DescribeEntityRecognizerInput {
  /** The Amazon Resource Name (ARN) that identifies the entity recognizer. */
  EntityRecognizerArn: string;
}

export interface DescribeEventsDetectionJobInput {
  /** The identifier of the events detection job. */
  JobId: string;
}

export interface DescribeFlywheelInput {
  /** The Amazon Resource Number (ARN) of the flywheel. */
  FlywheelArn: string;
}

export interface DescribeFlywheelIterationInput {
  FlywheelArn: string;
  FlywheelIterationId: string;
}

export interface DescribeKeyPhrasesDetectionJobInput {
  /** The identifier that Amazon Comprehend generated for the job. The StartKeyPhrasesDetectionJob operation returns this identifier in its response. */
  JobId: string;
}

export interface DescribePiiEntitiesDetectionJobInput {
  /** The identifier that Amazon Comprehend generated for the job. The operation returns this identifier in its response. */
  JobId: string;
}

export interface DescribeResourcePolicyInput {
  /** The Amazon Resource Name (ARN) of the custom model version that has the resource policy. */
  ResourceArn: string;
}

export interface DescribeSentimentDetectionJobInput {
  /** The identifier that Amazon Comprehend generated for the job. The operation returns this identifier in its response. */
  JobId: string;
}

export interface DescribeTargetedSentimentDetectionJobInput {
  /** The identifier that Amazon Comprehend generated for the job. The StartTargetedSentimentDetectionJob operation returns this identifier in its response. */
  JobId: string;
}

export interface DescribeTopicsDetectionJobInput {
  /** The identifier assigned by the user to the detection job. */
  JobId: string;
}

export interface DetectDominantLanguageInput {
  /** A UTF-8 text string. The string must contain at least 20 characters. The maximum string size is 100 KB. */
  Text: string;
}

export interface DetectEntitiesInput {
  /** This field applies only when you use a custom entity recognition model that was trained with PDF annotations. For other cases, enter your text input in the Text field. Use the Bytes parameter to input */
  Bytes?: string;
  /** Provides configuration parameters to override the default actions for extracting text from PDF documents and image files. */
  DocumentReaderConfig?: DocumentReaderConfig;
  /** The Amazon Resource Name of an endpoint that is associated with a custom entity recognition model. Provide an endpoint if you want to detect entities by using your own custom model instead of the defa */
  EndpointArn?: string;
  /** The language of the input documents. You can specify any of the primary languages supported by Amazon Comprehend. If your request includes the endpoint for a custom entity recognition model, Amazon Co */
  LanguageCode?: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** A UTF-8 text string. The maximum string size is 100 KB. If you enter text using this parameter, do not use the Bytes parameter. */
  Text?: string;
}

export interface DetectKeyPhrasesInput {
  /** The language of the input documents. You can specify any of the primary languages supported by Amazon Comprehend. All documents must be in the same language. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** A UTF-8 text string. The string must contain less than 100 KB of UTF-8 encoded characters. */
  Text: string;
}

export interface DetectPiiEntitiesInput {
  /** The language of the input text. Enter the language code for English (en) or Spanish (es). */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** A UTF-8 text string. The maximum string size is 100 KB. */
  Text: string;
}

export interface DetectSentimentInput {
  /** The language of the input documents. You can specify any of the primary languages supported by Amazon Comprehend. All documents must be in the same language. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** A UTF-8 text string. The maximum string size is 5 KB. */
  Text: string;
}

export interface DetectSyntaxInput {
  /** The language code of the input documents. You can specify any of the following languages supported by Amazon Comprehend: German ("de"), English ("en"), Spanish ("es"), French ("fr"), Italian ("it"), o */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt';
  /** A UTF-8 string. The maximum string size is 5 KB. */
  Text: string;
}

export interface DetectTargetedSentimentInput {
  /** The language of the input documents. Currently, English is the only supported language. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** A UTF-8 text string. The maximum string length is 5 KB. */
  Text: string;
}

export interface DetectToxicContentInput {
  /** The language of the input text. Currently, English is the only supported language. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** A list of up to 10 text strings. Each string has a maximum size of 1 KB, and the maximum size of the list is 10 KB. */
  TextSegments: TextSegment[];
}

export interface ImportModelInput {
  /** The Amazon Resource Name (ARN) of the custom model to import. */
  SourceModelArn: string;
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend permission to use Amazon Key Management Service (KMS) to encrypt or decrypt the custom model. */
  DataAccessRoleArn?: string;
  /** ID for the KMS key that Amazon Comprehend uses to encrypt trained custom models. The ModelKmsKeyId can be either of the following formats: KMS Key ID: "1234abcd-12ab-34cd-56ef-1234567890ab" Amazon Res */
  ModelKmsKeyId?: string;
  /** The name to assign to the custom model that is created in Amazon Comprehend by this import. */
  ModelName?: string;
  /** Tags to associate with the custom model that is created by this import. A tag is a key-value pair that adds as a metadata to a resource used by Amazon Comprehend. For example, a tag with "Sales" as th */
  Tags?: Tag[];
  /** The version name given to the custom model that is created by this import. Version names can have a maximum of 256 characters. Alphanumeric characters, hyphens (-) and underscores (_) are allowed. The */
  VersionName?: string;
}

export interface ListDatasetsInput {
  /** Filters the datasets to be returned in the response. */
  Filter?: DatasetFilter;
  /** The Amazon Resource Number (ARN) of the flywheel. */
  FlywheelArn?: string;
  /** Maximum number of results to return in a response. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListDocumentClassificationJobsInput {
  /** Filters the jobs that are returned. You can filter jobs on their names, status, or the date and time that they were submitted. You can only set one filter at a time. */
  Filter?: DocumentClassificationJobFilter;
  /** The maximum number of results to return in each page. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListDocumentClassifiersInput {
  /** Filters the jobs that are returned. You can filter jobs on their name, status, or the date and time that they were submitted. You can only set one filter at a time. */
  Filter?: DocumentClassifierFilter;
  /** The maximum number of results to return in each page. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListDocumentClassifierSummariesInput {
  /** The maximum number of results to return on each page. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListDominantLanguageDetectionJobsInput {
  /** Filters that jobs that are returned. You can filter jobs on their name, status, or the date and time that they were submitted. You can only set one filter at a time. */
  Filter?: DominantLanguageDetectionJobFilter;
  /** The maximum number of results to return in each page. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListEndpointsInput {
  /** Filters the endpoints that are returned. You can filter endpoints on their name, model, status, or the date and time that they were created. You can only set one filter at a time. */
  Filter?: EndpointFilter;
  /** The maximum number of results to return in each page. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListEntitiesDetectionJobsInput {
  /** Filters the jobs that are returned. You can filter jobs on their name, status, or the date and time that they were submitted. You can only set one filter at a time. */
  Filter?: EntitiesDetectionJobFilter;
  /** The maximum number of results to return in each page. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListEntityRecognizersInput {
  /** Filters the list of entities returned. You can filter on Status, SubmitTimeBefore, or SubmitTimeAfter. You can only set one filter at a time. */
  Filter?: EntityRecognizerFilter;
  /** The maximum number of results to return on each page. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListEntityRecognizerSummariesInput {
  /** The maximum number of results to return on each page. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListEventsDetectionJobsInput {
  /** Filters the jobs that are returned. You can filter jobs on their name, status, or the date and time that they were submitted. You can only set one filter at a time. */
  Filter?: EventsDetectionJobFilter;
  /** The maximum number of results to return in each page. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListFlywheelIterationHistoryInput {
  /** The ARN of the flywheel. */
  FlywheelArn: string;
  /** Filter the flywheel iteration history based on creation time. */
  Filter?: FlywheelIterationFilter;
  /** Maximum number of iteration history results to return */
  MaxResults?: number;
  /** Next token */
  NextToken?: string;
}

export interface ListFlywheelsInput {
  /** Filters the flywheels that are returned. You can filter flywheels on their status, or the date and time that they were submitted. You can only set one filter at a time. */
  Filter?: FlywheelFilter;
  /** Maximum number of results to return in a response. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListKeyPhrasesDetectionJobsInput {
  /** Filters the jobs that are returned. You can filter jobs on their name, status, or the date and time that they were submitted. You can only set one filter at a time. */
  Filter?: KeyPhrasesDetectionJobFilter;
  /** The maximum number of results to return in each page. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListPiiEntitiesDetectionJobsInput {
  /** Filters the jobs that are returned. You can filter jobs on their name, status, or the date and time that they were submitted. You can only set one filter at a time. */
  Filter?: PiiEntitiesDetectionJobFilter;
  /** The maximum number of results to return in each page. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListSentimentDetectionJobsInput {
  /** Filters the jobs that are returned. You can filter jobs on their name, status, or the date and time that they were submitted. You can only set one filter at a time. */
  Filter?: SentimentDetectionJobFilter;
  /** The maximum number of results to return in each page. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the given Amazon Comprehend resource you are querying. */
  ResourceArn: string;
}

export interface ListTargetedSentimentDetectionJobsInput {
  /** Filters the jobs that are returned. You can filter jobs on their name, status, or the date and time that they were submitted. You can only set one filter at a time. */
  Filter?: TargetedSentimentDetectionJobFilter;
  /** The maximum number of results to return in each page. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface ListTopicsDetectionJobsInput {
  /** Filters the jobs that are returned. Jobs can be filtered on their name, status, or the date and time that they were submitted. You can set only one filter at a time. */
  Filter?: TopicsDetectionJobFilter;
  /** The maximum number of results to return in each page. The default is 100. */
  MaxResults?: number;
  /** Identifies the next page of results to return. */
  NextToken?: string;
}

export interface PutResourcePolicyInput {
  /** The Amazon Resource Name (ARN) of the custom model to attach the policy to. */
  ResourceArn: string;
  /** The JSON resource-based policy to attach to your custom model. Provide your JSON as a UTF-8 encoded string without line breaks. To provide valid JSON for your policy, enclose the attribute names and v */
  ResourcePolicy: string;
  /** The revision ID that Amazon Comprehend assigned to the policy that you are updating. If you are creating a new policy that has no prior version, don't use this parameter. Amazon Comprehend creates the */
  PolicyRevisionId?: string;
}

export interface StartDocumentClassificationJobInput {
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data. */
  DataAccessRoleArn: string;
  /** Specifies the format and location of the input data for the job. */
  InputDataConfig: InputDataConfig;
  /** Specifies where to send the output files. */
  OutputDataConfig: OutputDataConfig;
  /** A unique identifier for the request. If you do not set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** The Amazon Resource Name (ARN) of the document classifier to use to process the job. */
  DocumentClassifierArn?: string;
  /** The Amazon Resource Number (ARN) of the flywheel associated with the model to use. */
  FlywheelArn?: string;
  /** The identifier of the job. */
  JobName?: string;
  /** Tags to associate with the document classification job. A tag is a key-value pair that adds metadata to a resource used by Amazon Comprehend. For example, a tag with "Sales" as the key might be added  */
  Tags?: Tag[];
  /** ID for the Amazon Web Services Key Management Service (KMS) key that Amazon Comprehend uses to encrypt data on the storage volume attached to the ML compute instance(s) that process the analysis job.  */
  VolumeKmsKeyId?: string;
  /** Configuration parameters for an optional private Virtual Private Cloud (VPC) containing the resources you are using for your document classification job. For more information, see Amazon VPC. */
  VpcConfig?: VpcConfig;
}

export interface StartDominantLanguageDetectionJobInput {
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data. For more information, see Role-based permissions. */
  DataAccessRoleArn: string;
  /** Specifies the format and location of the input data for the job. */
  InputDataConfig: InputDataConfig;
  /** Specifies where to send the output files. */
  OutputDataConfig: OutputDataConfig;
  /** A unique identifier for the request. If you do not set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** An identifier for the job. */
  JobName?: string;
  /** Tags to associate with the dominant language detection job. A tag is a key-value pair that adds metadata to a resource used by Amazon Comprehend. For example, a tag with "Sales" as the key might be ad */
  Tags?: Tag[];
  /** ID for the Amazon Web Services Key Management Service (KMS) key that Amazon Comprehend uses to encrypt data on the storage volume attached to the ML compute instance(s) that process the analysis job.  */
  VolumeKmsKeyId?: string;
  /** Configuration parameters for an optional private Virtual Private Cloud (VPC) containing the resources you are using for your dominant language detection job. For more information, see Amazon VPC. */
  VpcConfig?: VpcConfig;
}

export interface StartEntitiesDetectionJobInput {
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data. For more information, see Role-based permissions. */
  DataAccessRoleArn: string;
  /** Specifies the format and location of the input data for the job. */
  InputDataConfig: InputDataConfig;
  /** The language of the input documents. All documents must be in the same language. You can specify any of the languages supported by Amazon Comprehend. If custom entities recognition is used, this param */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** Specifies where to send the output files. */
  OutputDataConfig: OutputDataConfig;
  /** A unique identifier for the request. If you don't set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** The Amazon Resource Name (ARN) that identifies the specific entity recognizer to be used by the StartEntitiesDetectionJob. This ARN is optional and is only used for a custom entity recognition job. */
  EntityRecognizerArn?: string;
  /** The Amazon Resource Number (ARN) of the flywheel associated with the model to use. */
  FlywheelArn?: string;
  /** The identifier of the job. */
  JobName?: string;
  /** Tags to associate with the entities detection job. A tag is a key-value pair that adds metadata to a resource used by Amazon Comprehend. For example, a tag with "Sales" as the key might be added to a  */
  Tags?: Tag[];
  /** ID for the Amazon Web Services Key Management Service (KMS) key that Amazon Comprehend uses to encrypt data on the storage volume attached to the ML compute instance(s) that process the analysis job.  */
  VolumeKmsKeyId?: string;
  /** Configuration parameters for an optional private Virtual Private Cloud (VPC) containing the resources you are using for your entity detection job. For more information, see Amazon VPC. */
  VpcConfig?: VpcConfig;
}

export interface StartEventsDetectionJobInput {
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data. */
  DataAccessRoleArn: string;
  /** Specifies the format and location of the input data for the job. */
  InputDataConfig: InputDataConfig;
  /** The language code of the input documents. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** Specifies where to send the output files. */
  OutputDataConfig: OutputDataConfig;
  /** The types of events to detect in the input documents. */
  TargetEventTypes: string[];
  /** An unique identifier for the request. If you don't set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** The identifier of the events detection job. */
  JobName?: string;
  /** Tags to associate with the events detection job. A tag is a key-value pair that adds metadata to a resource used by Amazon Comprehend. For example, a tag with "Sales" as the key might be added to a re */
  Tags?: Tag[];
}

export interface StartFlywheelIterationInput {
  /** The ARN of the flywheel. */
  FlywheelArn: string;
  /** A unique identifier for the request. If you don't set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
}

export interface StartKeyPhrasesDetectionJobInput {
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data. For more information, see Role-based permissions. */
  DataAccessRoleArn: string;
  /** Specifies the format and location of the input data for the job. */
  InputDataConfig: InputDataConfig;
  /** The language of the input documents. You can specify any of the primary languages supported by Amazon Comprehend. All documents must be in the same language. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** Specifies where to send the output files. */
  OutputDataConfig: OutputDataConfig;
  /** A unique identifier for the request. If you don't set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** The identifier of the job. */
  JobName?: string;
  /** Tags to associate with the key phrases detection job. A tag is a key-value pair that adds metadata to a resource used by Amazon Comprehend. For example, a tag with "Sales" as the key might be added to */
  Tags?: Tag[];
  /** ID for the Amazon Web Services Key Management Service (KMS) key that Amazon Comprehend uses to encrypt data on the storage volume attached to the ML compute instance(s) that process the analysis job.  */
  VolumeKmsKeyId?: string;
  /** Configuration parameters for an optional private Virtual Private Cloud (VPC) containing the resources you are using for your key phrases detection job. For more information, see Amazon VPC. */
  VpcConfig?: VpcConfig;
}

export interface StartPiiEntitiesDetectionJobInput {
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data. */
  DataAccessRoleArn: string;
  /** The input properties for a PII entities detection job. */
  InputDataConfig: InputDataConfig;
  /** The language of the input documents. Enter the language code for English (en) or Spanish (es). */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** Specifies whether the output provides the locations (offsets) of PII entities or a file in which PII entities are redacted. */
  Mode: 'ONLY_REDACTION' | 'ONLY_OFFSETS';
  /** Provides conﬁguration parameters for the output of PII entity detection jobs. */
  OutputDataConfig: OutputDataConfig;
  /** A unique identifier for the request. If you don't set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** The identifier of the job. */
  JobName?: string;
  /** Provides configuration parameters for PII entity redaction. This parameter is required if you set the Mode parameter to ONLY_REDACTION. In that case, you must provide a RedactionConfig definition that */
  RedactionConfig?: RedactionConfig;
  /** Tags to associate with the PII entities detection job. A tag is a key-value pair that adds metadata to a resource used by Amazon Comprehend. For example, a tag with "Sales" as the key might be added t */
  Tags?: Tag[];
}

export interface StartSentimentDetectionJobInput {
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data. For more information, see Role-based permissions. */
  DataAccessRoleArn: string;
  /** Specifies the format and location of the input data for the job. */
  InputDataConfig: InputDataConfig;
  /** The language of the input documents. You can specify any of the primary languages supported by Amazon Comprehend. All documents must be in the same language. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** Specifies where to send the output files. */
  OutputDataConfig: OutputDataConfig;
  /** A unique identifier for the request. If you don't set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** The identifier of the job. */
  JobName?: string;
  /** Tags to associate with the sentiment detection job. A tag is a key-value pair that adds metadata to a resource used by Amazon Comprehend. For example, a tag with "Sales" as the key might be added to a */
  Tags?: Tag[];
  /** ID for the Amazon Web Services Key Management Service (KMS) key that Amazon Comprehend uses to encrypt data on the storage volume attached to the ML compute instance(s) that process the analysis job.  */
  VolumeKmsKeyId?: string;
  /** Configuration parameters for an optional private Virtual Private Cloud (VPC) containing the resources you are using for your sentiment detection job. For more information, see Amazon VPC. */
  VpcConfig?: VpcConfig;
}

export interface StartTargetedSentimentDetectionJobInput {
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data. For more information, see Role-based permissions. */
  DataAccessRoleArn: string;
  InputDataConfig: InputDataConfig;
  /** The language of the input documents. Currently, English is the only supported language. */
  LanguageCode: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'hi' | 'ja' | 'ko' | 'zh' | 'zh-TW';
  /** Specifies where to send the output files. */
  OutputDataConfig: OutputDataConfig;
  /** A unique identifier for the request. If you don't set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** The identifier of the job. */
  JobName?: string;
  /** Tags to associate with the targeted sentiment detection job. A tag is a key-value pair that adds metadata to a resource used by Amazon Comprehend. For example, a tag with "Sales" as the key might be a */
  Tags?: Tag[];
  /** ID for the KMS key that Amazon Comprehend uses to encrypt data on the storage volume attached to the ML compute instance(s) that process the analysis job. The VolumeKmsKeyId can be either of the follo */
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}

export interface StartTopicsDetectionJobInput {
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data. For more information, see Role-based permissions. */
  DataAccessRoleArn: string;
  /** Specifies the format and location of the input data for the job. */
  InputDataConfig: InputDataConfig;
  /** Specifies where to send the output files. The output is a compressed archive with two files, topic-terms.csv that lists the terms associated with each topic, and doc-topics.csv that lists the document */
  OutputDataConfig: OutputDataConfig;
  /** A unique identifier for the request. If you do not set the client request token, Amazon Comprehend generates one. */
  ClientRequestToken?: string;
  /** The identifier of the job. */
  JobName?: string;
  /** The number of topics to detect. */
  NumberOfTopics?: number;
  /** Tags to associate with the topics detection job. A tag is a key-value pair that adds metadata to a resource used by Amazon Comprehend. For example, a tag with "Sales" as the key might be added to a re */
  Tags?: Tag[];
  /** ID for the Amazon Web Services Key Management Service (KMS) key that Amazon Comprehend uses to encrypt data on the storage volume attached to the ML compute instance(s) that process the analysis job.  */
  VolumeKmsKeyId?: string;
  /** Configuration parameters for an optional private Virtual Private Cloud (VPC) containing the resources you are using for your topic detection job. For more information, see Amazon VPC. */
  VpcConfig?: VpcConfig;
}

export interface StopDominantLanguageDetectionJobInput {
  /** The identifier of the dominant language detection job to stop. */
  JobId: string;
}

export interface StopEntitiesDetectionJobInput {
  /** The identifier of the entities detection job to stop. */
  JobId: string;
}

export interface StopEventsDetectionJobInput {
  /** The identifier of the events detection job to stop. */
  JobId: string;
}

export interface StopKeyPhrasesDetectionJobInput {
  /** The identifier of the key phrases detection job to stop. */
  JobId: string;
}

export interface StopPiiEntitiesDetectionJobInput {
  /** The identifier of the PII entities detection job to stop. */
  JobId: string;
}

export interface StopSentimentDetectionJobInput {
  /** The identifier of the sentiment detection job to stop. */
  JobId: string;
}

export interface StopTargetedSentimentDetectionJobInput {
  /** The identifier of the targeted sentiment detection job to stop. */
  JobId: string;
}

export interface StopTrainingDocumentClassifierInput {
  /** The Amazon Resource Name (ARN) that identifies the document classifier currently being trained. */
  DocumentClassifierArn: string;
}

export interface StopTrainingEntityRecognizerInput {
  /** The Amazon Resource Name (ARN) that identifies the entity recognizer currently being trained. */
  EntityRecognizerArn: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the given Amazon Comprehend resource to which you want to associate the tags. */
  ResourceArn: string;
  /** Tags being associated with a specific Amazon Comprehend resource. There can be a maximum of 50 tags (both existing and pending) associated with a specific resource. */
  Tags: Tag[];
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the given Amazon Comprehend resource from which you want to remove the tags. */
  ResourceArn: string;
  /** The initial part of a key-value pair that forms a tag being removed from a given resource. For example, a tag with "Sales" as the key might be added to a resource to indicate its use by the sales depa */
  TagKeys: string[];
}

export interface UpdateEndpointInput {
  /** The Amazon Resource Number (ARN) of the endpoint being updated. */
  EndpointArn: string;
  /** Data access role ARN to use in case the new model is encrypted with a customer CMK. */
  DesiredDataAccessRoleArn?: string;
  /** The desired number of inference units to be used by the model using this endpoint. Each inference unit represents of a throughput of 100 characters per second. */
  DesiredInferenceUnits?: number;
  /** The ARN of the new model to use when updating an existing endpoint. */
  DesiredModelArn?: string;
  /** The Amazon Resource Number (ARN) of the flywheel */
  FlywheelArn?: string;
}

export interface UpdateFlywheelInput {
  /** The Amazon Resource Number (ARN) of the flywheel to update. */
  FlywheelArn: string;
  /** The Amazon Resource Number (ARN) of the active model version. */
  ActiveModelArn?: string;
  /** The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend permission to access the flywheel data. */
  DataAccessRoleArn?: string;
  /** Flywheel data security configuration. */
  DataSecurityConfig?: UpdateDataSecurityConfig;
}

/** Comprehend service binding for Step Functions SDK integrations. */
export class Comprehend {
  constructor() {}

  batchDetectDominantLanguage<T>(params: BatchDetectDominantLanguageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDetectEntities<T>(params: BatchDetectEntitiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDetectKeyPhrases<T>(params: BatchDetectKeyPhrasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDetectSentiment<T>(params: BatchDetectSentimentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDetectSyntax<T>(params: BatchDetectSyntaxInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDetectTargetedSentiment<T>(params: BatchDetectTargetedSentimentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  classifyDocument<T>(params: ClassifyDocumentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  containsPiiEntities<T>(params: ContainsPiiEntitiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDataset<T>(params: CreateDatasetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDocumentClassifier<T>(params: CreateDocumentClassifierInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEndpoint<T>(params: CreateEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEntityRecognizer<T>(params: CreateEntityRecognizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createFlywheel<T>(params: CreateFlywheelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDocumentClassifier<T>(params: DeleteDocumentClassifierInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEndpoint<T>(params: DeleteEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEntityRecognizer<T>(params: DeleteEntityRecognizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteFlywheel<T>(params: DeleteFlywheelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteResourcePolicy<T>(params: DeleteResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDataset<T>(params: DescribeDatasetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDocumentClassificationJob<T>(params: DescribeDocumentClassificationJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDocumentClassifier<T>(params: DescribeDocumentClassifierInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDominantLanguageDetectionJob<T>(params: DescribeDominantLanguageDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEndpoint<T>(params: DescribeEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEntitiesDetectionJob<T>(params: DescribeEntitiesDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEntityRecognizer<T>(params: DescribeEntityRecognizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEventsDetectionJob<T>(params: DescribeEventsDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFlywheel<T>(params: DescribeFlywheelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFlywheelIteration<T>(params: DescribeFlywheelIterationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeKeyPhrasesDetectionJob<T>(params: DescribeKeyPhrasesDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePiiEntitiesDetectionJob<T>(params: DescribePiiEntitiesDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeResourcePolicy<T>(params: DescribeResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSentimentDetectionJob<T>(params: DescribeSentimentDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTargetedSentimentDetectionJob<T>(params: DescribeTargetedSentimentDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTopicsDetectionJob<T>(params: DescribeTopicsDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectDominantLanguage<T>(params: DetectDominantLanguageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectEntities<T>(params: DetectEntitiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectKeyPhrases<T>(params: DetectKeyPhrasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectPiiEntities<T>(params: DetectPiiEntitiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectSentiment<T>(params: DetectSentimentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectSyntax<T>(params: DetectSyntaxInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectTargetedSentiment<T>(params: DetectTargetedSentimentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectToxicContent<T>(params: DetectToxicContentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importModel<T>(params: ImportModelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDatasets<T>(params: ListDatasetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDocumentClassificationJobs<T>(params: ListDocumentClassificationJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDocumentClassifiers<T>(params: ListDocumentClassifiersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDocumentClassifierSummaries<T>(params: ListDocumentClassifierSummariesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDominantLanguageDetectionJobs<T>(params: ListDominantLanguageDetectionJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEndpoints<T>(params: ListEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEntitiesDetectionJobs<T>(params: ListEntitiesDetectionJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEntityRecognizers<T>(params: ListEntityRecognizersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEntityRecognizerSummaries<T>(params: ListEntityRecognizerSummariesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEventsDetectionJobs<T>(params: ListEventsDetectionJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listFlywheelIterationHistory<T>(params: ListFlywheelIterationHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listFlywheels<T>(params: ListFlywheelsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listKeyPhrasesDetectionJobs<T>(params: ListKeyPhrasesDetectionJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPiiEntitiesDetectionJobs<T>(params: ListPiiEntitiesDetectionJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSentimentDetectionJobs<T>(params: ListSentimentDetectionJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTargetedSentimentDetectionJobs<T>(params: ListTargetedSentimentDetectionJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTopicsDetectionJobs<T>(params: ListTopicsDetectionJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putResourcePolicy<T>(params: PutResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDocumentClassificationJob<T>(params: StartDocumentClassificationJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDominantLanguageDetectionJob<T>(params: StartDominantLanguageDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startEntitiesDetectionJob<T>(params: StartEntitiesDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startEventsDetectionJob<T>(params: StartEventsDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startFlywheelIteration<T>(params: StartFlywheelIterationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startKeyPhrasesDetectionJob<T>(params: StartKeyPhrasesDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startPiiEntitiesDetectionJob<T>(params: StartPiiEntitiesDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startSentimentDetectionJob<T>(params: StartSentimentDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startTargetedSentimentDetectionJob<T>(params: StartTargetedSentimentDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startTopicsDetectionJob<T>(params: StartTopicsDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopDominantLanguageDetectionJob<T>(params: StopDominantLanguageDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopEntitiesDetectionJob<T>(params: StopEntitiesDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopEventsDetectionJob<T>(params: StopEventsDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopKeyPhrasesDetectionJob<T>(params: StopKeyPhrasesDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopPiiEntitiesDetectionJob<T>(params: StopPiiEntitiesDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopSentimentDetectionJob<T>(params: StopSentimentDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopTargetedSentimentDetectionJob<T>(params: StopTargetedSentimentDetectionJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopTrainingDocumentClassifier<T>(params: StopTrainingDocumentClassifierInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopTrainingEntityRecognizer<T>(params: StopTrainingEntityRecognizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEndpoint<T>(params: UpdateEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateFlywheel<T>(params: UpdateFlywheelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
