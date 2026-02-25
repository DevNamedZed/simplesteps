// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface ParallelDataConfig {
  /** The URI of the Amazon S3 folder that contains the parallel data input file. The folder must be in the same Region as the API endpoint you are calling. */
  S3Uri?: string;
  /** The format of the parallel data input file. */
  Format?: 'TSV' | 'CSV' | 'TMX';
}

export interface EncryptionKey {
  /** The type of encryption key used by Amazon Translate to encrypt this object. */
  Type: 'KMS';
  /** The Amazon Resource Name (ARN) of the encryption key being used to encrypt this object. */
  Id: string;
}

export interface Tag {
  /** The initial part of a key-value pair that forms a tag associated with a given resource. */
  Key: string;
  /** The second part of a key-value pair that forms a tag associated with a given resource. */
  Value: string;
}

export interface TerminologyData {
  /** The file containing the custom terminology data. Your version of the AWS SDK performs a Base64-encoding on this field before sending a request to the AWS service. Users of the SDK should not perform B */
  File: string;
  /** The data format of the custom terminology. */
  Format: 'CSV' | 'TMX' | 'TSV';
  /** The directionality of your terminology resource indicates whether it has one source language (uni-directional) or multiple (multi-directional). UNI The terminology resource has one source language (fo */
  Directionality?: 'UNI' | 'MULTI';
}

export interface TextTranslationJobFilter {
  /** Filters the list of jobs by name. */
  JobName?: string;
  /** Filters the list of jobs based by job status. */
  JobStatus?: 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED' | 'COMPLETED_WITH_ERROR' | 'FAILED' | 'STOP_REQUESTED' | 'STOPPED';
  /** Filters the list of jobs based on the time that the job was submitted for processing and returns only the jobs submitted before the specified time. Jobs are returned in ascending order, oldest to newe */
  SubmittedBeforeTime?: string;
  /** Filters the list of jobs based on the time that the job was submitted for processing and returns only the jobs submitted after the specified time. Jobs are returned in descending order, newest to olde */
  SubmittedAfterTime?: string;
}

export interface InputDataConfig {
  /** The URI of the AWS S3 folder that contains the input files. Amazon Translate translates all the files in the folder and all its sub-folders. The folder must be in the same Region as the API endpoint y */
  S3Uri: string;
  /** Describes the format of the data that you submit to Amazon Translate as input. You can specify one of the following multipurpose internet mail extension (MIME) types: text/html: The input data consist */
  ContentType: string;
}

export interface OutputDataConfig {
  /** The URI of the S3 folder that contains a translation job's output file. The folder must be in the same Region as the API endpoint that you are calling. */
  S3Uri: string;
  EncryptionKey?: EncryptionKey;
}

export interface TranslationSettings {
  /** You can specify the desired level of formality for translations to supported target languages. The formality setting controls the level of formal language usage (also known as register) in the transla */
  Formality?: 'FORMAL' | 'INFORMAL';
  /** You can enable the profanity setting if you want to mask profane words and phrases in your translation output. To mask profane words and phrases, Amazon Translate replaces them with the grawlix string */
  Profanity?: 'MASK';
  /** When you turn on brevity, Amazon Translate reduces the length of the translation output for most translations (when compared with the same translation with brevity turned off). By default, brevity is  */
  Brevity?: 'ON';
}

export interface Document {
  /** The Contentfield type is Binary large object (blob). This object contains the document content converted into base64-encoded binary data. If you use one of the AWS SDKs, the SDK performs the Base64-en */
  Content: string;
  /** Describes the format of the document. You can specify one of the following: text/html - The input data consists of HTML content. Amazon Translate translates only the text in the HTML element. text/pla */
  ContentType: string;
}

export interface CreateParallelDataInput {
  /** A unique identifier for the request. This token is automatically generated when you use Amazon Translate through an AWS SDK. */
  ClientToken: string;
  /** A custom name for the parallel data resource in Amazon Translate. You must assign a name that is unique in the account and region. */
  Name: string;
  /** Specifies the format and S3 location of the parallel data input file. */
  ParallelDataConfig: ParallelDataConfig;
  /** A custom description for the parallel data resource in Amazon Translate. */
  Description?: string;
  EncryptionKey?: EncryptionKey;
  /** Tags to be associated with this resource. A tag is a key-value pair that adds metadata to a resource. Each tag key for the resource must be unique. For more information, see Tagging your resources. */
  Tags?: Tag[];
}

export interface DeleteParallelDataInput {
  /** The name of the parallel data resource that is being deleted. */
  Name: string;
}

export interface DeleteTerminologyInput {
  /** The name of the custom terminology being deleted. */
  Name: string;
}

export interface DescribeTextTranslationJobInput {
  /** The identifier that Amazon Translate generated for the job. The StartTextTranslationJob operation returns this identifier in its response. */
  JobId: string;
}

export interface GetParallelDataInput {
  /** The name of the parallel data resource that is being retrieved. */
  Name: string;
}

export interface GetTerminologyInput {
  /** The name of the custom terminology being retrieved. */
  Name: string;
  /** The data format of the custom terminology being retrieved. If you don't specify this parameter, Amazon Translate returns a file with the same format as the file that was imported to create the termino */
  TerminologyDataFormat?: 'CSV' | 'TMX' | 'TSV';
}

export interface ImportTerminologyInput {
  /** The merge strategy of the custom terminology being imported. Currently, only the OVERWRITE merge strategy is supported. In this case, the imported terminology will overwrite an existing terminology of */
  MergeStrategy: 'OVERWRITE';
  /** The name of the custom terminology being imported. */
  Name: string;
  /** The terminology data for the custom terminology being imported. */
  TerminologyData: TerminologyData;
  /** The description of the custom terminology being imported. */
  Description?: string;
  /** The encryption key for the custom terminology being imported. */
  EncryptionKey?: EncryptionKey;
  /** Tags to be associated with this resource. A tag is a key-value pair that adds metadata to a resource. Each tag key for the resource must be unique. For more information, see Tagging your resources. */
  Tags?: Tag[];
}

export interface ListLanguagesInput {
  /** The language code for the language to use to display the language names in the response. The language code is en by default. */
  DisplayLanguageCode?: 'de' | 'en' | 'es' | 'fr' | 'it' | 'ja' | 'ko' | 'pt' | 'zh' | 'zh-TW';
  /** The maximum number of results to return in each response. */
  MaxResults?: number;
  /** Include the NextToken value to fetch the next group of supported languages. */
  NextToken?: string;
}

export interface ListParallelDataInput {
  /** The maximum number of parallel data resources returned for each request. */
  MaxResults?: number;
  /** A string that specifies the next page of results to return in a paginated response. */
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the given Amazon Translate resource you are querying. */
  ResourceArn: string;
}

export interface ListTerminologiesInput {
  /** The maximum number of custom terminologies returned per list request. */
  MaxResults?: number;
  /** If the result of the request to ListTerminologies was truncated, include the NextToken to fetch the next group of custom terminologies. */
  NextToken?: string;
}

export interface ListTextTranslationJobsInput {
  /** The parameters that specify which batch translation jobs to retrieve. Filters include job name, job status, and submission time. You can only set one filter at a time. */
  Filter?: TextTranslationJobFilter;
  /** The maximum number of results to return in each page. The default value is 100. */
  MaxResults?: number;
  /** The token to request the next page of results. */
  NextToken?: string;
}

export interface StartTextTranslationJobInput {
  /** A unique identifier for the request. This token is generated for you when using the Amazon Translate SDK. */
  ClientToken: string;
  /** The Amazon Resource Name (ARN) of an AWS Identity Access and Management (IAM) role that grants Amazon Translate read access to your input data. For more information, see Identity and access management */
  DataAccessRoleArn: string;
  /** Specifies the format and location of the input documents for the translation job. */
  InputDataConfig: InputDataConfig;
  /** Specifies the S3 folder to which your job output will be saved. */
  OutputDataConfig: OutputDataConfig;
  /** The language code of the input language. Specify the language if all input documents share the same language. If you don't know the language of the source files, or your input documents contains diffe */
  SourceLanguageCode: string;
  /** The target languages of the translation job. Enter up to 10 language codes. Each input file is translated into each target language. Each language code is 2 or 5 characters long. For a list of languag */
  TargetLanguageCodes: string[];
  /** The name of the batch translation job to be performed. */
  JobName?: string;
  /** The name of a parallel data resource to add to the translation job. This resource consists of examples that show how you want segments of text to be translated. If you specify multiple target language */
  ParallelDataNames?: string[];
  /** Settings to configure your translation output. You can configure the following options: Brevity: not supported. Formality: sets the formality level of the output text. Profanity: masks profane words a */
  Settings?: TranslationSettings;
  /** The name of a custom terminology resource to add to the translation job. This resource lists examples source terms and the desired translation for each term. This parameter accepts only one custom ter */
  TerminologyNames?: string[];
}

export interface StopTextTranslationJobInput {
  /** The job ID of the job to be stopped. */
  JobId: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the given Amazon Translate resource to which you want to associate the tags. */
  ResourceArn: string;
  /** Tags being associated with a specific Amazon Translate resource. There can be a maximum of 50 tags (both existing and pending) associated with a specific resource. */
  Tags: Tag[];
}

export interface TranslateDocumentInput {
  /** The content and content type for the document to be translated. The document size must not exceed 100 KB. */
  Document: Document;
  /** The language code for the language of the source text. For a list of supported language codes, see Supported languages. To have Amazon Translate determine the source language of your text, you can spe */
  SourceLanguageCode: string;
  /** The language code requested for the translated document. For a list of supported language codes, see Supported languages. */
  TargetLanguageCode: string;
  /** Settings to configure your translation output. You can configure the following options: Brevity: not supported. Formality: sets the formality level of the output text. Profanity: masks profane words a */
  Settings?: TranslationSettings;
  /** The name of a terminology list file to add to the translation job. This file provides source terms and the desired translation for each term. A terminology list can contain a maximum of 256 terms. You */
  TerminologyNames?: string[];
}

export interface TranslateTextInput {
  /** The language code for the language of the source text. For a list of language codes, see Supported languages. To have Amazon Translate determine the source language of your text, you can specify auto  */
  SourceLanguageCode: string;
  /** The language code requested for the language of the target text. For a list of language codes, see Supported languages. */
  TargetLanguageCode: string;
  /** The text to translate. The text string can be a maximum of 10,000 bytes long. Depending on your character set, this may be fewer than 10,000 characters. */
  Text: string;
  /** Settings to configure your translation output. You can configure the following options: Brevity: reduces the length of the translated output for most translations. Formality: sets the formality level  */
  Settings?: TranslationSettings;
  /** The name of a terminology list file to add to the translation job. This file provides source terms and the desired translation for each term. A terminology list can contain a maximum of 256 terms. You */
  TerminologyNames?: string[];
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the given Amazon Translate resource from which you want to remove the tags. */
  ResourceArn: string;
  /** The initial part of a key-value pair that forms a tag being removed from a given resource. Keys must be unique and cannot be duplicated for a particular resource. */
  TagKeys: string[];
}

export interface UpdateParallelDataInput {
  /** A unique identifier for the request. This token is automatically generated when you use Amazon Translate through an AWS SDK. */
  ClientToken: string;
  /** The name of the parallel data resource being updated. */
  Name: string;
  /** Specifies the format and S3 location of the parallel data input file. */
  ParallelDataConfig: ParallelDataConfig;
  /** A custom description for the parallel data resource in Amazon Translate. */
  Description?: string;
}

/** Translate service binding for Step Functions SDK integrations. */
export class Translate {
  constructor() {}

  createParallelData<T>(params: CreateParallelDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteParallelData<T>(params: DeleteParallelDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTerminology<T>(params: DeleteTerminologyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTextTranslationJob<T>(params: DescribeTextTranslationJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getParallelData<T>(params: GetParallelDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTerminology<T>(params: GetTerminologyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importTerminology<T>(params: ImportTerminologyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLanguages<T>(params: ListLanguagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listParallelData<T>(params: ListParallelDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTerminologies<T>(params: ListTerminologiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTextTranslationJobs<T>(params: ListTextTranslationJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startTextTranslationJob<T>(params: StartTextTranslationJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopTextTranslationJob<T>(params: StopTextTranslationJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  translateDocument<T>(params: TranslateDocumentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  translateText<T>(params: TranslateTextInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateParallelData<T>(params: UpdateParallelDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
