// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface JsonOptions {
  /** A value that specifies whether JSON input contains embedded new line characters. */
  MultiLine?: boolean;
}

export interface ExcelOptions {
  /** One or more named sheets in the Excel file that will be included in the dataset. */
  SheetNames?: any[];
  /** One or more sheet numbers in the Excel file that will be included in the dataset. */
  SheetIndexes?: any[];
  /** A variable that specifies whether the first row in the file is parsed as the header. If this value is false, column names are auto-generated. */
  HeaderRow?: boolean;
}

export interface CsvOptions {
  /** A single character that specifies the delimiter being used in the CSV file. */
  Delimiter?: string;
  /** A variable that specifies whether the first row in the file is parsed as the header. If this value is false, column names are auto-generated. */
  HeaderRow?: boolean;
}

export interface FormatOptions {
  /** Options that define how JSON input is to be interpreted by DataBrew. */
  Json?: JsonOptions;
  /** Options that define how Excel input is to be interpreted by DataBrew. */
  Excel?: ExcelOptions;
  /** Options that define how CSV input is to be interpreted by DataBrew. */
  Csv?: CsvOptions;
}

export interface S3Location {
  /** The Amazon S3 bucket name. */
  Bucket: string;
  /** The unique name of the object in the bucket. */
  Key?: string;
  /** The Amazon Web Services account ID of the bucket owner. */
  BucketOwner?: string;
}

export interface DataCatalogInputDefinition {
  /** The unique identifier of the Amazon Web Services account that holds the Data Catalog that stores the data. */
  CatalogId?: string;
  /** The name of a database in the Data Catalog. */
  DatabaseName: string;
  /** The name of a database table in the Data Catalog. This table corresponds to a DataBrew dataset. */
  TableName: string;
  /** Represents an Amazon location where DataBrew can store intermediate results. */
  TempDirectory?: any;
}

export interface DatabaseInputDefinition {
  /** The Glue Connection that stores the connection information for the target database. */
  GlueConnectionName: string;
  /** The table within the target database. */
  DatabaseTableName?: string;
  TempDirectory?: any;
  /** Custom SQL to run against the provided Glue connection. This SQL will be used as the input for DataBrew projects and jobs. */
  QueryString?: string;
}

export interface Metadata {
  /** The Amazon Resource Name (ARN) associated with the dataset. Currently, DataBrew only supports ARNs from Amazon AppFlow. */
  SourceArn?: string;
}

export interface Input {
  /** The Amazon S3 location where the data is stored. */
  S3InputDefinition?: S3Location;
  /** The Glue Data Catalog parameters for the data. */
  DataCatalogInputDefinition?: DataCatalogInputDefinition;
  /** Connection information for dataset input files stored in a database. */
  DatabaseInputDefinition?: DatabaseInputDefinition;
  /** Contains additional resource information needed for specific datasets. */
  Metadata?: Metadata;
}

export interface FilterExpression {
  /** The expression which includes condition names followed by substitution variables, possibly grouped and combined with other conditions. For example, "(starts_with :prefix1 or starts_with :prefix2) and  */
  Expression: string;
  /** The map of substitution variable names to their values used in this filter expression. */
  ValuesMap: Record<string, any>;
}

export interface FilesLimit {
  /** The number of Amazon S3 files to select. */
  MaxFiles: number;
  /** A criteria to use for Amazon S3 files sorting before their selection. By default uses LAST_MODIFIED_DATE as a sorting criteria. Currently it's the only allowed value. */
  OrderedBy?: 'LAST_MODIFIED_DATE';
  /** A criteria to use for Amazon S3 files sorting before their selection. By default uses DESCENDING order, i.e. most recent files are selected first. Another possible value is ASCENDING. */
  Order?: 'DESCENDING' | 'ASCENDING';
}

export interface PathOptions {
  /** If provided, this structure defines a date range for matching Amazon S3 objects based on their LastModifiedDate attribute in Amazon S3. */
  LastModifiedDateCondition?: FilterExpression;
  /** If provided, this structure imposes a limit on a number of files that should be selected. */
  FilesLimit?: FilesLimit;
  /** A structure that maps names of parameters used in the Amazon S3 path of a dataset to their definitions. */
  Parameters?: Record<string, any>;
}

export interface StatisticsConfiguration {
  /** List of included evaluations. When the list is undefined, all supported evaluations will be included. */
  IncludedStatistics?: any[];
  /** List of overrides for evaluations. */
  Overrides?: any[];
}

export interface EntityDetectorConfiguration {
  /** Entity types to detect. Can be any of the following: USA_SSN EMAIL USA_ITIN USA_PASSPORT_NUMBER PHONE_NUMBER USA_DRIVING_LICENSE BANK_ACCOUNT CREDIT_CARD IP_ADDRESS MAC_ADDRESS USA_DEA_NUMBER USA_HCPC */
  EntityTypes: any[];
  /** Configuration of statistics that are allowed to be run on columns that contain detected entities. When undefined, no statistics will be computed on columns that contain detected entities. */
  AllowedStatistics?: any[];
}

export interface ProfileConfiguration {
  /** Configuration for inter-column evaluations. Configuration can be used to select evaluations and override parameters of evaluations. When configuration is undefined, the profile job will run all suppor */
  DatasetStatisticsConfiguration?: StatisticsConfiguration;
  /** List of column selectors. ProfileColumns can be used to select columns from the dataset. When ProfileColumns is undefined, the profile job will profile all supported columns. */
  ProfileColumns?: any[];
  /** List of configurations for column evaluations. ColumnStatisticsConfigurations are used to select evaluations and override parameters of evaluations for particular columns. When ColumnStatisticsConfigu */
  ColumnStatisticsConfigurations?: any[];
  /** Configuration of entity detection for a profile job. When undefined, entity detection is disabled. */
  EntityDetectorConfiguration?: EntityDetectorConfiguration;
}

export interface ValidationConfiguration {
  /** The Amazon Resource Name (ARN) for the ruleset to be validated in the profile job. The TargetArn of the selected ruleset should be the same as the Amazon Resource Name (ARN) of the dataset that is ass */
  RulesetArn: string;
  /** Mode of data quality validation. Default mode is “CHECK_ALL” which verifies all rules defined in the selected ruleset. */
  ValidationMode?: 'CHECK_ALL';
}

export interface JobSample {
  /** A value that determines whether the profile job is run on the entire dataset or a specified number of rows. This value must be one of the following: FULL_DATASET - The profile job is run on the entire */
  Mode?: 'FULL_DATASET' | 'CUSTOM_ROWS';
  /** The Size parameter is only required when the mode is CUSTOM_ROWS. The profile job is run on the specified number of rows. The maximum value for size is Long.MAX_VALUE. Long.MAX_VALUE = 922337203685477 */
  Size?: number;
}

export interface Sample {
  /** The number of rows in the sample. */
  Size?: number;
  /** The way in which DataBrew obtains rows from a dataset. */
  Type: 'FIRST_N' | 'LAST_N' | 'RANDOM';
}

export interface RecipeStep {
  /** The particular action to be performed in the recipe step. */
  Action: any;
  /** One or more conditions that must be met for the recipe step to succeed. All of the conditions in the array must be met. In other words, all of the conditions must be combined using a logical AND opera */
  ConditionExpressions?: any[];
}

export interface Output {
  /** The compression algorithm used to compress the output text of the job. */
  CompressionFormat?: 'GZIP' | 'LZ4' | 'SNAPPY' | 'BZIP2' | 'DEFLATE' | 'LZO' | 'BROTLI' | 'ZSTD' | 'ZLIB';
  /** The data format of the output of the job. */
  Format?: 'CSV' | 'JSON' | 'PARQUET' | 'GLUEPARQUET' | 'AVRO' | 'ORC' | 'XML' | 'TABLEAUHYPER';
  /** The names of one or more partition columns for the output of the job. */
  PartitionColumns?: any[];
  /** The location in Amazon S3 where the job writes its output. */
  Location: any;
  /** A value that, if true, means that any data in the location specified for output is overwritten with new output. */
  Overwrite?: boolean;
  /** Represents options that define how DataBrew formats job output files. */
  FormatOptions?: any;
  /** Maximum number of files to be generated by the job and written to the output folder. For output partitioned by column(s), the MaxOutputFiles value is the maximum number of files per partition. */
  MaxOutputFiles?: number;
}

export interface DataCatalogOutput {
  /** The unique identifier of the Amazon Web Services account that holds the Data Catalog that stores the data. */
  CatalogId?: string;
  /** The name of a database in the Data Catalog. */
  DatabaseName: string;
  /** The name of a table in the Data Catalog. */
  TableName: string;
  /** Represents options that specify how and where DataBrew writes the Amazon S3 output generated by recipe jobs. */
  S3Options?: any;
  /** Represents options that specify how and where DataBrew writes the database output generated by recipe jobs. */
  DatabaseOptions?: any;
  /** A value that, if true, means that any data in the location specified for output is overwritten with new output. Not supported with DatabaseOptions. */
  Overwrite?: boolean;
}

export interface DatabaseOutput {
  /** The Glue connection that stores the connection information for the target database. */
  GlueConnectionName: string;
  /** Represents options that specify how and where DataBrew writes the database output generated by recipe jobs. */
  DatabaseOptions: any;
  /** The output mode to write into the database. Currently supported option: NEW_TABLE. */
  DatabaseOutputMode?: 'NEW_TABLE';
}

export interface RecipeReference {
  /** The name of the recipe. */
  Name: string;
  /** The identifier for the version for the recipe. */
  RecipeVersion?: string;
}

export interface Rule {
  /** The name of the rule. */
  Name: string;
  /** A value that specifies whether the rule is disabled. Once a rule is disabled, a profile job will not validate it during a job run. Default value is false. */
  Disabled?: boolean;
  /** The expression which includes column references, condition names followed by variable references, possibly grouped and combined with other conditions. For example, (:col1 starts_with :prefix1 or :col1 */
  CheckExpression: string;
  /** The map of substitution variable names to their values used in a check expression. Variable names should start with a ':' (colon). Variable values can either be actual values or column names. To diffe */
  SubstitutionMap?: Record<string, any>;
  /** The threshold used with a non-aggregate check expression. Non-aggregate check expressions will be applied to each row in a specific column, and the threshold will be used to determine whether the vali */
  Threshold?: any;
  /** List of column selectors. Selectors can be used to select columns using a name or regular expression from the dataset. Rule will be applied to selected columns. */
  ColumnSelectors?: any[];
}

export interface ViewFrame {
  /** The starting index for the range of columns to return in the view frame. */
  StartColumnIndex: number;
  /** The number of columns to include in the view frame, beginning with the StartColumnIndex value and ignoring any columns in the HiddenColumns list. */
  ColumnRange?: number;
  /** A list of columns to hide in the view frame. */
  HiddenColumns?: string[];
  /** The starting index for the range of rows to return in the view frame. */
  StartRowIndex?: number;
  /** The number of rows to include in the view frame, beginning with the StartRowIndex value. */
  RowRange?: number;
  /** Controls if analytics computation is enabled or disabled. Enabled by default. */
  Analytics?: 'ENABLE' | 'DISABLE';
}

export interface BatchDeleteRecipeVersionInput {
  /** The name of the recipe whose versions are to be deleted. */
  Name: string;
  /** An array of version identifiers, for the recipe versions to be deleted. You can specify numeric versions (X.Y) or LATEST_WORKING. LATEST_PUBLISHED is not supported. */
  RecipeVersions: string[];
}

export interface CreateDatasetInput {
  Input: Input;
  /** The name of the dataset to be created. Valid characters are alphanumeric (A-Z, a-z, 0-9), hyphen (-), period (.), and space. */
  Name: string;
  /** The file format of a dataset that is created from an Amazon S3 file or folder. */
  Format?: 'CSV' | 'JSON' | 'PARQUET' | 'EXCEL' | 'ORC';
  FormatOptions?: FormatOptions;
  /** A set of options that defines how DataBrew interprets an Amazon S3 path of the dataset. */
  PathOptions?: PathOptions;
  /** Metadata tags to apply to this dataset. */
  Tags?: Record<string, string>;
}

export interface CreateProfileJobInput {
  /** The name of the dataset that this job is to act upon. */
  DatasetName: string;
  /** The name of the job to be created. Valid characters are alphanumeric (A-Z, a-z, 0-9), hyphen (-), period (.), and space. */
  Name: string;
  OutputLocation: S3Location;
  /** The Amazon Resource Name (ARN) of the Identity and Access Management (IAM) role to be assumed when DataBrew runs the job. */
  RoleArn: string;
  /** Configuration for profile jobs. Used to select columns, do evaluations, and override default parameters of evaluations. When configuration is null, the profile job will run with default settings. */
  Configuration?: ProfileConfiguration;
  /** The Amazon Resource Name (ARN) of an encryption key that is used to protect the job. */
  EncryptionKeyArn?: string;
  /** The encryption mode for the job, which can be one of the following: SSE-KMS - SSE-KMS - Server-side encryption with KMS-managed keys. SSE-S3 - Server-side encryption with keys managed by Amazon S3. */
  EncryptionMode?: 'SSE-KMS' | 'SSE-S3';
  /** Sample configuration for profile jobs only. Determines the number of rows on which the profile job will be executed. If a JobSample value is not provided, the default value will be used. The default v */
  JobSample?: JobSample;
  /** Enables or disables Amazon CloudWatch logging for the job. If logging is enabled, CloudWatch writes one log stream for each job run. */
  LogSubscription?: 'ENABLE' | 'DISABLE';
  /** The maximum number of nodes that DataBrew can use when the job processes data. */
  MaxCapacity?: number;
  /** The maximum number of times to retry the job after a job run fails. */
  MaxRetries?: number;
  /** Metadata tags to apply to this job. */
  Tags?: Record<string, string>;
  /** The job's timeout in minutes. A job that attempts to run longer than this timeout period ends with a status of TIMEOUT. */
  Timeout?: number;
  /** List of validation configurations that are applied to the profile job. */
  ValidationConfigurations?: ValidationConfiguration[];
}

export interface CreateProjectInput {
  /** The name of an existing dataset to associate this project with. */
  DatasetName: string;
  /** A unique name for the new project. Valid characters are alphanumeric (A-Z, a-z, 0-9), hyphen (-), period (.), and space. */
  Name: string;
  /** The name of an existing recipe to associate with the project. */
  RecipeName: string;
  /** The Amazon Resource Name (ARN) of the Identity and Access Management (IAM) role to be assumed for this request. */
  RoleArn: string;
  Sample?: Sample;
  /** Metadata tags to apply to this project. */
  Tags?: Record<string, string>;
}

export interface CreateRecipeInput {
  /** A unique name for the recipe. Valid characters are alphanumeric (A-Z, a-z, 0-9), hyphen (-), period (.), and space. */
  Name: string;
  /** An array containing the steps to be performed by the recipe. Each recipe step consists of one recipe action and (optionally) an array of condition expressions. */
  Steps: RecipeStep[];
  /** A description for the recipe. */
  Description?: string;
  /** Metadata tags to apply to this recipe. */
  Tags?: Record<string, string>;
}

export interface CreateRecipeJobInput {
  /** A unique name for the job. Valid characters are alphanumeric (A-Z, a-z, 0-9), hyphen (-), period (.), and space. */
  Name: string;
  /** The Amazon Resource Name (ARN) of the Identity and Access Management (IAM) role to be assumed when DataBrew runs the job. */
  RoleArn: string;
  /** Represents a list of JDBC database output objects which defines the output destination for a DataBrew recipe job to write to. */
  DatabaseOutputs?: DatabaseOutput[];
  /** One or more artifacts that represent the Glue Data Catalog output from running the job. */
  DataCatalogOutputs?: DataCatalogOutput[];
  /** The name of the dataset that this job processes. */
  DatasetName?: string;
  /** The Amazon Resource Name (ARN) of an encryption key that is used to protect the job. */
  EncryptionKeyArn?: string;
  /** The encryption mode for the job, which can be one of the following: SSE-KMS - Server-side encryption with keys managed by KMS. SSE-S3 - Server-side encryption with keys managed by Amazon S3. */
  EncryptionMode?: 'SSE-KMS' | 'SSE-S3';
  /** Enables or disables Amazon CloudWatch logging for the job. If logging is enabled, CloudWatch writes one log stream for each job run. */
  LogSubscription?: 'ENABLE' | 'DISABLE';
  /** The maximum number of nodes that DataBrew can consume when the job processes data. */
  MaxCapacity?: number;
  /** The maximum number of times to retry the job after a job run fails. */
  MaxRetries?: number;
  /** One or more artifacts that represent the output from running the job. */
  Outputs?: Output[];
  /** Either the name of an existing project, or a combination of a recipe and a dataset to associate with the recipe. */
  ProjectName?: string;
  RecipeReference?: RecipeReference;
  /** Metadata tags to apply to this job. */
  Tags?: Record<string, string>;
  /** The job's timeout in minutes. A job that attempts to run longer than this timeout period ends with a status of TIMEOUT. */
  Timeout?: number;
}

export interface CreateRulesetInput {
  /** The name of the ruleset to be created. Valid characters are alphanumeric (A-Z, a-z, 0-9), hyphen (-), period (.), and space. */
  Name: string;
  /** A list of rules that are defined with the ruleset. A rule includes one or more checks to be validated on a DataBrew dataset. */
  Rules: Rule[];
  /** The Amazon Resource Name (ARN) of a resource (dataset) that the ruleset is associated with. */
  TargetArn: string;
  /** The description of the ruleset. */
  Description?: string;
  /** Metadata tags to apply to the ruleset. */
  Tags?: Record<string, string>;
}

export interface CreateScheduleInput {
  /** The date or dates and time or times when the jobs are to be run. For more information, see Cron expressions in the Glue DataBrew Developer Guide. */
  CronExpression: string;
  /** A unique name for the schedule. Valid characters are alphanumeric (A-Z, a-z, 0-9), hyphen (-), period (.), and space. */
  Name: string;
  /** The name or names of one or more jobs to be run. */
  JobNames?: string[];
  /** Metadata tags to apply to this schedule. */
  Tags?: Record<string, string>;
}

export interface DeleteDatasetInput {
  /** The name of the dataset to be deleted. */
  Name: string;
}

export interface DeleteJobInput {
  /** The name of the job to be deleted. */
  Name: string;
}

export interface DeleteProjectInput {
  /** The name of the project to be deleted. */
  Name: string;
}

export interface DeleteRecipeVersionInput {
  /** The name of the recipe. */
  Name: string;
  /** The version of the recipe to be deleted. You can specify a numeric versions (X.Y) or LATEST_WORKING. LATEST_PUBLISHED is not supported. */
  RecipeVersion: string;
}

export interface DeleteRulesetInput {
  /** The name of the ruleset to be deleted. */
  Name: string;
}

export interface DeleteScheduleInput {
  /** The name of the schedule to be deleted. */
  Name: string;
}

export interface DescribeDatasetInput {
  /** The name of the dataset to be described. */
  Name: string;
}

export interface DescribeJobInput {
  /** The name of the job to be described. */
  Name: string;
}

export interface DescribeJobRunInput {
  /** The name of the job being processed during this run. */
  Name: string;
  /** The unique identifier of the job run. */
  RunId: string;
}

export interface DescribeProjectInput {
  /** The name of the project to be described. */
  Name: string;
}

export interface DescribeRecipeInput {
  /** The name of the recipe to be described. */
  Name: string;
  /** The recipe version identifier. If this parameter isn't specified, then the latest published version is returned. */
  RecipeVersion?: string;
}

export interface DescribeRulesetInput {
  /** The name of the ruleset to be described. */
  Name: string;
}

export interface DescribeScheduleInput {
  /** The name of the schedule to be described. */
  Name: string;
}

export interface ListDatasetsInput {
  /** The maximum number of results to return in this request. */
  MaxResults?: number;
  /** The token returned by a previous call to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListJobRunsInput {
  /** The name of the job. */
  Name: string;
  /** The maximum number of results to return in this request. */
  MaxResults?: number;
  /** The token returned by a previous call to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListJobsInput {
  /** The name of a dataset. Using this parameter indicates to return only those jobs that act on the specified dataset. */
  DatasetName?: string;
  /** The maximum number of results to return in this request. */
  MaxResults?: number;
  /** A token generated by DataBrew that specifies where to continue pagination if a previous request was truncated. To get the next set of pages, pass in the NextToken value from the response object of the */
  NextToken?: string;
  /** The name of a project. Using this parameter indicates to return only those jobs that are associated with the specified project. */
  ProjectName?: string;
}

export interface ListProjectsInput {
  /** The maximum number of results to return in this request. */
  MaxResults?: number;
  /** The token returned by a previous call to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListRecipesInput {
  /** The maximum number of results to return in this request. */
  MaxResults?: number;
  /** The token returned by a previous call to retrieve the next set of results. */
  NextToken?: string;
  /** Return only those recipes with a version identifier of LATEST_WORKING or LATEST_PUBLISHED. If RecipeVersion is omitted, ListRecipes returns all of the LATEST_PUBLISHED recipe versions. Valid values: L */
  RecipeVersion?: string;
}

export interface ListRecipeVersionsInput {
  /** The name of the recipe for which to return version information. */
  Name: string;
  /** The maximum number of results to return in this request. */
  MaxResults?: number;
  /** The token returned by a previous call to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListRulesetsInput {
  /** The maximum number of results to return in this request. */
  MaxResults?: number;
  /** A token generated by DataBrew that specifies where to continue pagination if a previous request was truncated. To get the next set of pages, pass in the NextToken value from the response object of the */
  NextToken?: string;
  /** The Amazon Resource Name (ARN) of a resource (dataset). Using this parameter indicates to return only those rulesets that are associated with the specified resource. */
  TargetArn?: string;
}

export interface ListSchedulesInput {
  /** The name of the job that these schedules apply to. */
  JobName?: string;
  /** The maximum number of results to return in this request. */
  MaxResults?: number;
  /** The token returned by a previous call to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) string that uniquely identifies the DataBrew resource. */
  ResourceArn: string;
}

export interface PublishRecipeInput {
  /** The name of the recipe to be published. */
  Name: string;
  /** A description of the recipe to be published, for this version of the recipe. */
  Description?: string;
}

export interface SendProjectSessionActionInput {
  /** The name of the project to apply the action to. */
  Name: string;
  /** A unique identifier for an interactive session that's currently open and ready for work. The action will be performed on this session. */
  ClientSessionId?: string;
  /** If true, the result of the recipe step will be returned, but not applied. */
  Preview?: boolean;
  RecipeStep?: RecipeStep;
  /** The index from which to preview a step. This index is used to preview the result of steps that have already been applied, so that the resulting view frame is from earlier in the view frame stack. */
  StepIndex?: number;
  ViewFrame?: ViewFrame;
}

export interface StartJobRunInput {
  /** The name of the job to be run. */
  Name: string;
}

export interface StartProjectSessionInput {
  /** The name of the project to act upon. */
  Name: string;
  /** A value that, if true, enables you to take control of a session, even if a different client is currently accessing the project. */
  AssumeControl?: boolean;
}

export interface StopJobRunInput {
  /** The name of the job to be stopped. */
  Name: string;
  /** The ID of the job run to be stopped. */
  RunId: string;
}

export interface TagResourceInput {
  /** The DataBrew resource to which tags should be added. The value for this parameter is an Amazon Resource Name (ARN). For DataBrew, you can tag a dataset, a job, a project, or a recipe. */
  ResourceArn: string;
  /** One or more tags to be assigned to the resource. */
  Tags: Record<string, string>;
}

export interface UntagResourceInput {
  /** A DataBrew resource from which you want to remove a tag or tags. The value for this parameter is an Amazon Resource Name (ARN). */
  ResourceArn: string;
  /** The tag keys (names) of one or more tags to be removed. */
  TagKeys: string[];
}

export interface UpdateDatasetInput {
  Input: Input;
  /** The name of the dataset to be updated. */
  Name: string;
  /** The file format of a dataset that is created from an Amazon S3 file or folder. */
  Format?: 'CSV' | 'JSON' | 'PARQUET' | 'EXCEL' | 'ORC';
  FormatOptions?: FormatOptions;
  /** A set of options that defines how DataBrew interprets an Amazon S3 path of the dataset. */
  PathOptions?: PathOptions;
}

export interface UpdateProfileJobInput {
  /** The name of the job to be updated. */
  Name: string;
  OutputLocation: S3Location;
  /** The Amazon Resource Name (ARN) of the Identity and Access Management (IAM) role to be assumed when DataBrew runs the job. */
  RoleArn: string;
  /** Configuration for profile jobs. Used to select columns, do evaluations, and override default parameters of evaluations. When configuration is null, the profile job will run with default settings. */
  Configuration?: ProfileConfiguration;
  /** The Amazon Resource Name (ARN) of an encryption key that is used to protect the job. */
  EncryptionKeyArn?: string;
  /** The encryption mode for the job, which can be one of the following: SSE-KMS - Server-side encryption with keys managed by KMS. SSE-S3 - Server-side encryption with keys managed by Amazon S3. */
  EncryptionMode?: 'SSE-KMS' | 'SSE-S3';
  /** Sample configuration for Profile Jobs only. Determines the number of rows on which the Profile job will be executed. If a JobSample value is not provided for profile jobs, the default value will be us */
  JobSample?: JobSample;
  /** Enables or disables Amazon CloudWatch logging for the job. If logging is enabled, CloudWatch writes one log stream for each job run. */
  LogSubscription?: 'ENABLE' | 'DISABLE';
  /** The maximum number of compute nodes that DataBrew can use when the job processes data. */
  MaxCapacity?: number;
  /** The maximum number of times to retry the job after a job run fails. */
  MaxRetries?: number;
  /** The job's timeout in minutes. A job that attempts to run longer than this timeout period ends with a status of TIMEOUT. */
  Timeout?: number;
  /** List of validation configurations that are applied to the profile job. */
  ValidationConfigurations?: ValidationConfiguration[];
}

export interface UpdateProjectInput {
  /** The name of the project to be updated. */
  Name: string;
  /** The Amazon Resource Name (ARN) of the IAM role to be assumed for this request. */
  RoleArn: string;
  Sample?: Sample;
}

export interface UpdateRecipeInput {
  /** The name of the recipe to be updated. */
  Name: string;
  /** A description of the recipe. */
  Description?: string;
  /** One or more steps to be performed by the recipe. Each step consists of an action, and the conditions under which the action should succeed. */
  Steps?: RecipeStep[];
}

export interface UpdateRecipeJobInput {
  /** The name of the job to update. */
  Name: string;
  /** The Amazon Resource Name (ARN) of the Identity and Access Management (IAM) role to be assumed when DataBrew runs the job. */
  RoleArn: string;
  /** Represents a list of JDBC database output objects which defines the output destination for a DataBrew recipe job to write into. */
  DatabaseOutputs?: DatabaseOutput[];
  /** One or more artifacts that represent the Glue Data Catalog output from running the job. */
  DataCatalogOutputs?: DataCatalogOutput[];
  /** The Amazon Resource Name (ARN) of an encryption key that is used to protect the job. */
  EncryptionKeyArn?: string;
  /** The encryption mode for the job, which can be one of the following: SSE-KMS - Server-side encryption with keys managed by KMS. SSE-S3 - Server-side encryption with keys managed by Amazon S3. */
  EncryptionMode?: 'SSE-KMS' | 'SSE-S3';
  /** Enables or disables Amazon CloudWatch logging for the job. If logging is enabled, CloudWatch writes one log stream for each job run. */
  LogSubscription?: 'ENABLE' | 'DISABLE';
  /** The maximum number of nodes that DataBrew can consume when the job processes data. */
  MaxCapacity?: number;
  /** The maximum number of times to retry the job after a job run fails. */
  MaxRetries?: number;
  /** One or more artifacts that represent the output from running the job. */
  Outputs?: Output[];
  /** The job's timeout in minutes. A job that attempts to run longer than this timeout period ends with a status of TIMEOUT. */
  Timeout?: number;
}

export interface UpdateRulesetInput {
  /** The name of the ruleset to be updated. */
  Name: string;
  /** A list of rules that are defined with the ruleset. A rule includes one or more checks to be validated on a DataBrew dataset. */
  Rules: Rule[];
  /** The description of the ruleset. */
  Description?: string;
}

export interface UpdateScheduleInput {
  /** The date or dates and time or times when the jobs are to be run. For more information, see Cron expressions in the Glue DataBrew Developer Guide. */
  CronExpression: string;
  /** The name of the schedule to update. */
  Name: string;
  /** The name or names of one or more jobs to be run for this schedule. */
  JobNames?: string[];
}

/** DataBrew service binding for Step Functions SDK integrations. */
export class DataBrew {
  constructor() {}

  batchDeleteRecipeVersion<T>(params: BatchDeleteRecipeVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDataset<T>(params: CreateDatasetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createProfileJob<T>(params: CreateProfileJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createProject<T>(params: CreateProjectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRecipe<T>(params: CreateRecipeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRecipeJob<T>(params: CreateRecipeJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRuleset<T>(params: CreateRulesetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSchedule<T>(params: CreateScheduleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDataset<T>(params: DeleteDatasetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteJob<T>(params: DeleteJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteProject<T>(params: DeleteProjectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRecipeVersion<T>(params: DeleteRecipeVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRuleset<T>(params: DeleteRulesetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSchedule<T>(params: DeleteScheduleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDataset<T>(params: DescribeDatasetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeJob<T>(params: DescribeJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeJobRun<T>(params: DescribeJobRunInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProject<T>(params: DescribeProjectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRecipe<T>(params: DescribeRecipeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRuleset<T>(params: DescribeRulesetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSchedule<T>(params: DescribeScheduleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDatasets<T>(params: ListDatasetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listJobRuns<T>(params: ListJobRunsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listJobs<T>(params: ListJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listProjects<T>(params: ListProjectsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRecipes<T>(params: ListRecipesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRecipeVersions<T>(params: ListRecipeVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRulesets<T>(params: ListRulesetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSchedules<T>(params: ListSchedulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  publishRecipe<T>(params: PublishRecipeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendProjectSessionAction<T>(params: SendProjectSessionActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startJobRun<T>(params: StartJobRunInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startProjectSession<T>(params: StartProjectSessionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopJobRun<T>(params: StopJobRunInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDataset<T>(params: UpdateDatasetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateProfileJob<T>(params: UpdateProfileJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateProject<T>(params: UpdateProjectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRecipe<T>(params: UpdateRecipeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRecipeJob<T>(params: UpdateRecipeJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRuleset<T>(params: UpdateRulesetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSchedule<T>(params: UpdateScheduleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
