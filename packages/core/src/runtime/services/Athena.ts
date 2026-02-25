// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Athena operations. */
export interface AthenaOptions {
  retry?: RetryPolicy;
  timeoutSeconds?: number;
  heartbeatSeconds?: number;
}

export interface QueryExecutionContext {
  /** The name of the database used in the query execution. The database must exist in the catalog. */
  Database?: string;
  /** The name of the data catalog used in the query execution. */
  Catalog?: string;
}

export interface EncryptionConfiguration {
  /** Indicates whether Amazon S3 server-side encryption with Amazon S3-managed keys (SSE_S3), server-side encryption with KMS-managed keys (SSE_KMS), or client-side encryption with KMS-managed keys (CSE_KM */
  EncryptionOption: 'SSE_S3' | 'SSE_KMS' | 'CSE_KMS';
  /** For SSE_KMS and CSE_KMS, this is the KMS key ARN or ID. */
  KmsKey?: string;
}

export interface AclConfiguration {
  /** The Amazon S3 canned ACL that Athena should specify when storing query results, including data files inserted by Athena as the result of statements like CTAS or INSERT INTO. Currently the only support */
  S3AclOption: 'BUCKET_OWNER_FULL_CONTROL';
}

export interface ResultConfiguration {
  /** The location in Amazon S3 where your query and calculation results are stored, such as s3://path/to/query/bucket/. To run the query, you must specify the query results location using one of the ways:  */
  OutputLocation?: string;
  /** If query and calculation results are encrypted in Amazon S3, indicates the encryption option used (for example, SSE_KMS or CSE_KMS) and key information. This is a client-side setting. If workgroup set */
  EncryptionConfiguration?: EncryptionConfiguration;
  /** The Amazon Web Services account ID that you expect to be the owner of the Amazon S3 bucket specified by ResultConfiguration$OutputLocation. If set, Athena uses the value for ExpectedBucketOwner when i */
  ExpectedBucketOwner?: string;
  /** Indicates that an Amazon S3 canned ACL should be set to control ownership of stored query results. Currently the only supported canned ACL is BUCKET_OWNER_FULL_CONTROL. This is a client-side setting.  */
  AclConfiguration?: AclConfiguration;
}

export interface ResultReuseByAgeConfiguration {
  /** True if previous query results can be reused when the query is run; otherwise, false. The default is false. */
  Enabled: boolean;
  /** Specifies, in minutes, the maximum age of a previous query result that Athena should consider for reuse. The default is 60. */
  MaxAgeInMinutes?: number;
}

export interface ResultReuseConfiguration {
  /** Specifies whether previous query results are reused, and if so, their maximum age. */
  ResultReuseByAgeConfiguration?: ResultReuseByAgeConfiguration;
}

export interface EngineConfiguration {
  /** The number of DPUs to use for the coordinator. A coordinator is a special executor that orchestrates processing work and manages other executors in a notebook session. The default is 1. */
  CoordinatorDpuSize?: number;
  /** The maximum number of DPUs that can run concurrently. */
  MaxConcurrentDpus?: number;
  /** The default number of DPUs to use for executors. An executor is the smallest unit of compute that a notebook session can request from Athena. The default is 1. */
  DefaultExecutorDpuSize?: number;
  /** Contains additional notebook engine MAP parameter mappings in the form of key-value pairs. To specify an Athena notebook that the Jupyter server will download and serve, specify a value for the StartS */
  AdditionalConfigs?: Record<string, string>;
  /** Specifies custom jar files and Spark properties for use cases like cluster encryption, table formats, and general Spark tuning. */
  SparkProperties?: Record<string, string>;
  /** The configuration classifications that can be specified for the engine. */
  Classifications?: any[];
}

export interface StartQueryExecutionInput {
  /** The SQL query statements to be executed. */
  QueryString: string;
  /** A unique case-sensitive string used to ensure the request to create the query is idempotent (executes only once). If another StartQueryExecution request is received, the same response is returned and  */
  ClientRequestToken?: string;
  /** The engine configuration for the workgroup, which includes the minimum/maximum number of Data Processing Units (DPU) that queries should use when running in provisioned capacity. If not specified, Ath */
  EngineConfiguration?: EngineConfiguration;
  /** A list of values for the parameters in a query. The values are applied sequentially to the parameters in the query in the order in which the parameters occur. */
  ExecutionParameters?: string[];
  /** The database within which the query executes. */
  QueryExecutionContext?: QueryExecutionContext;
  /** Specifies information about where and how to save the results of the query execution. If the query runs in a workgroup, then workgroup's settings may override query settings. This affects the query re */
  ResultConfiguration?: ResultConfiguration;
  /** Specifies the query result reuse behavior for the query. */
  ResultReuseConfiguration?: ResultReuseConfiguration;
  /** The name of the workgroup in which the query is being started. */
  WorkGroup?: string;
}

export interface GetQueryExecutionInput {
  /** The unique ID of the query execution. */
  QueryExecutionId: string;
}

export interface GetQueryResultsInput {
  /** The unique ID of the query execution. */
  QueryExecutionId: string;
  /** The maximum number of results (rows) to return in this request. */
  MaxResults?: number;
  /** A token generated by the Athena service that specifies where to continue pagination if a previous request was truncated. To obtain the next set of pages, pass in the NextToken from the response object */
  NextToken?: string;
  /** When you set this to DATA_ROWS or empty, GetQueryResults returns the query results in rows. If set to DATA_MANIFEST, it returns the manifest file in rows. Only the query types CREATE TABLE AS SELECT,  */
  QueryResultType?: 'DATA_MANIFEST' | 'DATA_ROWS';
}

/** Athena query binding for the SimpleSteps compiler. */
export class Athena {
  constructor() {}

  startQueryExecution<T>(params: StartQueryExecutionInput, options?: AthenaOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getQueryExecution<T>(params: GetQueryExecutionInput, options?: AthenaOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getQueryResults<T>(params: GetQueryResultsInput, options?: AthenaOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
