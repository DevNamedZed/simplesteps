// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface S3Object {
  /** The name of the S3 bucket. Note that the # character is not valid in the file name. */
  Bucket?: string;
  /** The file name of the input document. Image files may be in PDF, TIFF, JPEG, or PNG format. */
  Name?: string;
  /** If the bucket has versioning enabled, you can specify the object version. */
  Version?: string;
}

export interface Document {
  /** A blob of base64-encoded document bytes. The maximum size of a document that's provided in a blob of bytes is 5 MB. The document bytes must be in PNG or JPEG format. If you're using an AWS SDK to call */
  Bytes?: string;
  /** Identifies an S3 object as the document source. The maximum size of a document that's stored in an S3 bucket is 5 MB. */
  S3Object?: S3Object;
}

export interface HumanLoopDataAttributes {
  /** Sets whether the input image is free of personally identifiable information or adult content. */
  ContentClassifiers?: any[];
}

export interface HumanLoopConfig {
  /** The name of the human workflow used for this image. This should be kept unique within a region. */
  HumanLoopName: string;
  /** The Amazon Resource Name (ARN) of the flow definition. */
  FlowDefinitionArn: string;
  /** Sets attributes of the input data. */
  DataAttributes?: HumanLoopDataAttributes;
}

export interface QueriesConfig {
  Queries: any[];
}

export interface AdaptersConfig {
  /** A list of adapters to be used when analyzing the specified document. */
  Adapters: any[];
}

export interface AdapterVersionDatasetConfig {
  ManifestS3Object?: S3Object;
}

export interface OutputConfig {
  /** The name of the bucket your output will go to. */
  S3Bucket: string;
  /** The prefix of the object key that the output will be saved to. When not enabled, the prefix will be “textract_output". */
  S3Prefix?: string;
}

export interface DocumentLocation {
  /** The Amazon S3 bucket that contains the input document. */
  S3Object?: S3Object;
}

export interface NotificationChannel {
  /** The Amazon SNS topic that Amazon Textract posts the completion status to. */
  SNSTopicArn: string;
  /** The Amazon Resource Name (ARN) of an IAM role that gives Amazon Textract publishing permissions to the Amazon SNS topic. */
  RoleArn: string;
}

export interface AnalyzeDocumentInput {
  /** The input document as base64-encoded bytes or an Amazon S3 object. If you use the AWS CLI to call Amazon Textract operations, you can't pass image bytes. The document must be an image in JPEG, PNG, PD */
  Document: Document;
  /** A list of the types of analysis to perform. Add TABLES to the list to return information about the tables that are detected in the input document. Add FORMS to return detected form data. Add SIGNATURE */
  FeatureTypes: 'TABLES' | 'FORMS' | 'QUERIES' | 'SIGNATURES' | 'LAYOUT'[];
  /** Specifies the adapter to be used when analyzing a document. */
  AdaptersConfig?: AdaptersConfig;
  /** Sets the configuration for the human in the loop workflow for analyzing documents. */
  HumanLoopConfig?: HumanLoopConfig;
  /** Contains Queries and the alias for those Queries, as determined by the input. */
  QueriesConfig?: QueriesConfig;
}

export interface AnalyzeExpenseInput {
  Document: Document;
}

export interface AnalyzeIDInput {
  /** The document being passed to AnalyzeID. */
  DocumentPages: Document[];
}

export interface CreateAdapterInput {
  /** The name to be assigned to the adapter being created. */
  AdapterName: string;
  /** The type of feature that the adapter is being trained on. Currrenly, supported feature types are: QUERIES */
  FeatureTypes: 'TABLES' | 'FORMS' | 'QUERIES' | 'SIGNATURES' | 'LAYOUT'[];
  /** Controls whether or not the adapter should automatically update. */
  AutoUpdate?: 'ENABLED' | 'DISABLED';
  /** Idempotent token is used to recognize the request. If the same token is used with multiple CreateAdapter requests, the same session is returned. This token is employed to avoid unintentionally creatin */
  ClientRequestToken?: string;
  /** The description to be assigned to the adapter being created. */
  Description?: string;
  /** A list of tags to be added to the adapter. */
  Tags?: Record<string, string>;
}

export interface CreateAdapterVersionInput {
  /** A string containing a unique ID for the adapter that will receive a new version. */
  AdapterId: string;
  /** Specifies a dataset used to train a new adapter version. Takes a ManifestS3Object as the value. */
  DatasetConfig: AdapterVersionDatasetConfig;
  OutputConfig: OutputConfig;
  /** Idempotent token is used to recognize the request. If the same token is used with multiple CreateAdapterVersion requests, the same session is returned. This token is employed to avoid unintentionally  */
  ClientRequestToken?: string;
  /** The identifier for your AWS Key Management Service key (AWS KMS key). Used to encrypt your documents. */
  KMSKeyId?: string;
  /** A set of tags (key-value pairs) that you want to attach to the adapter version. */
  Tags?: Record<string, string>;
}

export interface DeleteAdapterInput {
  /** A string containing a unique ID for the adapter to be deleted. */
  AdapterId: string;
}

export interface DeleteAdapterVersionInput {
  /** A string containing a unique ID for the adapter version that will be deleted. */
  AdapterId: string;
  /** Specifies the adapter version to be deleted. */
  AdapterVersion: string;
}

export interface DetectDocumentTextInput {
  /** The input document as base64-encoded bytes or an Amazon S3 object. If you use the AWS CLI to call Amazon Textract operations, you can't pass image bytes. The document must be an image in JPEG or PNG f */
  Document: Document;
}

export interface GetAdapterInput {
  /** A string containing a unique ID for the adapter. */
  AdapterId: string;
}

export interface GetAdapterVersionInput {
  /** A string specifying a unique ID for the adapter version you want to retrieve information for. */
  AdapterId: string;
  /** A string specifying the adapter version you want to retrieve information for. */
  AdapterVersion: string;
}

export interface GetDocumentAnalysisInput {
  /** A unique identifier for the text-detection job. The JobId is returned from StartDocumentAnalysis. A JobId value is only valid for 7 days. */
  JobId: string;
  /** The maximum number of results to return per paginated call. The largest value that you can specify is 1,000. If you specify a value greater than 1,000, a maximum of 1,000 results is returned. The defa */
  MaxResults?: number;
  /** If the previous response was incomplete (because there are more blocks to retrieve), Amazon Textract returns a pagination token in the response. You can use this pagination token to retrieve the next  */
  NextToken?: string;
}

export interface GetDocumentTextDetectionInput {
  /** A unique identifier for the text detection job. The JobId is returned from StartDocumentTextDetection. A JobId value is only valid for 7 days. */
  JobId: string;
  /** The maximum number of results to return per paginated call. The largest value you can specify is 1,000. If you specify a value greater than 1,000, a maximum of 1,000 results is returned. The default v */
  MaxResults?: number;
  /** If the previous response was incomplete (because there are more blocks to retrieve), Amazon Textract returns a pagination token in the response. You can use this pagination token to retrieve the next  */
  NextToken?: string;
}

export interface GetExpenseAnalysisInput {
  /** A unique identifier for the text detection job. The JobId is returned from StartExpenseAnalysis. A JobId value is only valid for 7 days. */
  JobId: string;
  /** The maximum number of results to return per paginated call. The largest value you can specify is 20. If you specify a value greater than 20, a maximum of 20 results is returned. The default value is 2 */
  MaxResults?: number;
  /** If the previous response was incomplete (because there are more blocks to retrieve), Amazon Textract returns a pagination token in the response. You can use this pagination token to retrieve the next  */
  NextToken?: string;
}

export interface GetLendingAnalysisInput {
  /** A unique identifier for the lending or text-detection job. The JobId is returned from StartLendingAnalysis. A JobId value is only valid for 7 days. */
  JobId: string;
  /** The maximum number of results to return per paginated call. The largest value that you can specify is 30. If you specify a value greater than 30, a maximum of 30 results is returned. The default value */
  MaxResults?: number;
  /** If the previous response was incomplete, Amazon Textract returns a pagination token in the response. You can use this pagination token to retrieve the next set of lending results. */
  NextToken?: string;
}

export interface GetLendingAnalysisSummaryInput {
  /** A unique identifier for the lending or text-detection job. The JobId is returned from StartLendingAnalysis. A JobId value is only valid for 7 days. */
  JobId: string;
}

export interface ListAdaptersInput {
  /** Specifies the lower bound for the ListAdapters operation. Ensures ListAdapters returns only adapters created after the specified creation time. */
  AfterCreationTime?: string;
  /** Specifies the upper bound for the ListAdapters operation. Ensures ListAdapters returns only adapters created before the specified creation time. */
  BeforeCreationTime?: string;
  /** The maximum number of results to return when listing adapters. */
  MaxResults?: number;
  /** Identifies the next page of results to return when listing adapters. */
  NextToken?: string;
}

export interface ListAdapterVersionsInput {
  /** A string containing a unique ID for the adapter to match for when listing adapter versions. */
  AdapterId?: string;
  /** Specifies the lower bound for the ListAdapterVersions operation. Ensures ListAdapterVersions returns only adapter versions created after the specified creation time. */
  AfterCreationTime?: string;
  /** Specifies the upper bound for the ListAdapterVersions operation. Ensures ListAdapterVersions returns only adapter versions created after the specified creation time. */
  BeforeCreationTime?: string;
  /** The maximum number of results to return when listing adapter versions. */
  MaxResults?: number;
  /** Identifies the next page of results to return when listing adapter versions. */
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) that specifies the resource to list tags for. */
  ResourceARN: string;
}

export interface StartDocumentAnalysisInput {
  /** The location of the document to be processed. */
  DocumentLocation: DocumentLocation;
  /** A list of the types of analysis to perform. Add TABLES to the list to return information about the tables that are detected in the input document. Add FORMS to return detected form data. To perform bo */
  FeatureTypes: 'TABLES' | 'FORMS' | 'QUERIES' | 'SIGNATURES' | 'LAYOUT'[];
  /** Specifies the adapter to be used when analyzing a document. */
  AdaptersConfig?: AdaptersConfig;
  /** The idempotent token that you use to identify the start request. If you use the same token with multiple StartDocumentAnalysis requests, the same JobId is returned. Use ClientRequestToken to prevent t */
  ClientRequestToken?: string;
  /** An identifier that you specify that's included in the completion notification published to the Amazon SNS topic. For example, you can use JobTag to identify the type of document that the completion no */
  JobTag?: string;
  /** The KMS key used to encrypt the inference results. This can be in either Key ID or Key Alias format. When a KMS key is provided, the KMS key will be used for server-side encryption of the objects in t */
  KMSKeyId?: string;
  /** The Amazon SNS topic ARN that you want Amazon Textract to publish the completion status of the operation to. */
  NotificationChannel?: NotificationChannel;
  /** Sets if the output will go to a customer defined bucket. By default, Amazon Textract will save the results internally to be accessed by the GetDocumentAnalysis operation. */
  OutputConfig?: OutputConfig;
  QueriesConfig?: QueriesConfig;
}

export interface StartDocumentTextDetectionInput {
  /** The location of the document to be processed. */
  DocumentLocation: DocumentLocation;
  /** The idempotent token that's used to identify the start request. If you use the same token with multiple StartDocumentTextDetection requests, the same JobId is returned. Use ClientRequestToken to preve */
  ClientRequestToken?: string;
  /** An identifier that you specify that's included in the completion notification published to the Amazon SNS topic. For example, you can use JobTag to identify the type of document that the completion no */
  JobTag?: string;
  /** The KMS key used to encrypt the inference results. This can be in either Key ID or Key Alias format. When a KMS key is provided, the KMS key will be used for server-side encryption of the objects in t */
  KMSKeyId?: string;
  /** The Amazon SNS topic ARN that you want Amazon Textract to publish the completion status of the operation to. */
  NotificationChannel?: NotificationChannel;
  /** Sets if the output will go to a customer defined bucket. By default Amazon Textract will save the results internally to be accessed with the GetDocumentTextDetection operation. */
  OutputConfig?: OutputConfig;
}

export interface StartExpenseAnalysisInput {
  /** The location of the document to be processed. */
  DocumentLocation: DocumentLocation;
  /** The idempotent token that's used to identify the start request. If you use the same token with multiple StartDocumentTextDetection requests, the same JobId is returned. Use ClientRequestToken to preve */
  ClientRequestToken?: string;
  /** An identifier you specify that's included in the completion notification published to the Amazon SNS topic. For example, you can use JobTag to identify the type of document that the completion notific */
  JobTag?: string;
  /** The KMS key used to encrypt the inference results. This can be in either Key ID or Key Alias format. When a KMS key is provided, the KMS key will be used for server-side encryption of the objects in t */
  KMSKeyId?: string;
  /** The Amazon SNS topic ARN that you want Amazon Textract to publish the completion status of the operation to. */
  NotificationChannel?: NotificationChannel;
  /** Sets if the output will go to a customer defined bucket. By default, Amazon Textract will save the results internally to be accessed by the GetExpenseAnalysis operation. */
  OutputConfig?: OutputConfig;
}

export interface StartLendingAnalysisInput {
  DocumentLocation: DocumentLocation;
  /** The idempotent token that you use to identify the start request. If you use the same token with multiple StartLendingAnalysis requests, the same JobId is returned. Use ClientRequestToken to prevent th */
  ClientRequestToken?: string;
  /** An identifier that you specify to be included in the completion notification published to the Amazon SNS topic. For example, you can use JobTag to identify the type of document that the completion not */
  JobTag?: string;
  /** The KMS key used to encrypt the inference results. This can be in either Key ID or Key Alias format. When a KMS key is provided, the KMS key will be used for server-side encryption of the objects in t */
  KMSKeyId?: string;
  NotificationChannel?: NotificationChannel;
  OutputConfig?: OutputConfig;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) that specifies the resource to be tagged. */
  ResourceARN: string;
  /** A set of tags (key-value pairs) that you want to assign to the resource. */
  Tags: Record<string, string>;
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) that specifies the resource to be untagged. */
  ResourceARN: string;
  /** Specifies the tags to be removed from the resource specified by the ResourceARN. */
  TagKeys: string[];
}

export interface UpdateAdapterInput {
  /** A string containing a unique ID for the adapter that will be updated. */
  AdapterId: string;
  /** The new name to be applied to the adapter. */
  AdapterName?: string;
  /** The new auto-update status to be applied to the adapter. */
  AutoUpdate?: 'ENABLED' | 'DISABLED';
  /** The new description to be applied to the adapter. */
  Description?: string;
}

/** Textract service binding for Step Functions SDK integrations. */
export class Textract {
  constructor() {}

  analyzeDocument<T>(params: AnalyzeDocumentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  analyzeExpense<T>(params: AnalyzeExpenseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  analyzeID<T>(params: AnalyzeIDInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAdapter<T>(params: CreateAdapterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAdapterVersion<T>(params: CreateAdapterVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAdapter<T>(params: DeleteAdapterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAdapterVersion<T>(params: DeleteAdapterVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectDocumentText<T>(params: DetectDocumentTextInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAdapter<T>(params: GetAdapterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAdapterVersion<T>(params: GetAdapterVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDocumentAnalysis<T>(params: GetDocumentAnalysisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDocumentTextDetection<T>(params: GetDocumentTextDetectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getExpenseAnalysis<T>(params: GetExpenseAnalysisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLendingAnalysis<T>(params: GetLendingAnalysisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLendingAnalysisSummary<T>(params: GetLendingAnalysisSummaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAdapters<T>(params: ListAdaptersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAdapterVersions<T>(params: ListAdapterVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDocumentAnalysis<T>(params: StartDocumentAnalysisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDocumentTextDetection<T>(params: StartDocumentTextDetectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startExpenseAnalysis<T>(params: StartExpenseAnalysisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startLendingAnalysis<T>(params: StartLendingAnalysisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAdapter<T>(params: UpdateAdapterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
