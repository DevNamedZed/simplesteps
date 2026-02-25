// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface DirectPutSourceConfiguration {
  /** The value that you configure for this parameter is for information purpose only and does not affect Firehose delivery throughput limit. You can use the Firehose Limits form to request a throughput lim */
  ThroughputHintInMBs: number;
}

export interface KinesisStreamSourceConfiguration {
  /** The ARN of the source Kinesis data stream. For more information, see Amazon Kinesis Data Streams ARN Format. */
  KinesisStreamARN: string;
  /** The ARN of the role that provides access to the source Kinesis data stream. For more information, see Amazon Web Services Identity and Access Management (IAM) ARN Format. */
  RoleARN: string;
}

export interface DeliveryStreamEncryptionConfigurationInput {
  /** If you set KeyType to CUSTOMER_MANAGED_CMK, you must specify the Amazon Resource Name (ARN) of the CMK. If you set KeyType to Amazon Web Services_OWNED_CMK, Firehose uses a service-account CMK. */
  KeyARN?: string;
  /** Indicates the type of customer master key (CMK) to use for encryption. The default setting is Amazon Web Services_OWNED_CMK. For more information about CMKs, see Customer Master Keys (CMKs). When you  */
  KeyType: 'AWS_OWNED_CMK' | 'CUSTOMER_MANAGED_CMK';
}

export interface BufferingHints {
  /** Buffer incoming data to the specified size, in MiBs, before delivering it to the destination. The default value is 5. This parameter is optional but if you specify a value for it, you must also specif */
  SizeInMBs?: number;
  /** Buffer incoming data for the specified period of time, in seconds, before delivering it to the destination. The default value is 300. This parameter is optional but if you specify a value for it, you  */
  IntervalInSeconds?: number;
}

export interface EncryptionConfiguration {
  /** Specifically override existing encryption information to ensure that no encryption is used. */
  NoEncryptionConfig?: 'NoEncryption';
  /** The encryption key. */
  KMSEncryptionConfig?: any;
}

export interface CloudWatchLoggingOptions {
  /** Enables or disables CloudWatch logging. */
  Enabled?: boolean;
  /** The CloudWatch group name for logging. This value is required if CloudWatch logging is enabled. */
  LogGroupName?: string;
  /** The CloudWatch log stream name for logging. This value is required if CloudWatch logging is enabled. */
  LogStreamName?: string;
}

export interface S3DestinationConfiguration {
  /** The Amazon Resource Name (ARN) of the Amazon Web Services credentials. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  RoleARN: string;
  /** The ARN of the S3 bucket. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  BucketARN: string;
  /** The "YYYY/MM/DD/HH" time format prefix is automatically used for delivered Amazon S3 files. You can also specify a custom prefix, as described in Custom Prefixes for Amazon S3 Objects. */
  Prefix?: string;
  /** A prefix that Firehose evaluates and adds to failed records before writing them to S3. This prefix appears immediately following the bucket name. For information about how to specify this prefix, see  */
  ErrorOutputPrefix?: string;
  /** The buffering option. If no value is specified, BufferingHints object default values are used. */
  BufferingHints?: BufferingHints;
  /** The compression format. If no value is specified, the default is UNCOMPRESSED. The compression formats SNAPPY or ZIP cannot be specified for Amazon Redshift destinations because they are not supported */
  CompressionFormat?: 'UNCOMPRESSED' | 'GZIP' | 'ZIP' | 'Snappy' | 'HADOOP_SNAPPY';
  /** The encryption configuration. If no value is specified, the default is no encryption. */
  EncryptionConfiguration?: EncryptionConfiguration;
  /** The CloudWatch logging options for your Firehose stream. */
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
}

export interface ProcessingConfiguration {
  /** Enables or disables data processing. */
  Enabled?: boolean;
  /** The data processors. */
  Processors?: any[];
}

export interface DataFormatConversionConfiguration {
  /** Specifies the Amazon Web Services Glue Data Catalog table that contains the column information. This parameter is required if Enabled is set to true. */
  SchemaConfiguration?: any;
  /** Specifies the deserializer that you want Firehose to use to convert the format of your data from JSON. This parameter is required if Enabled is set to true. */
  InputFormatConfiguration?: any;
  /** Specifies the serializer that you want Firehose to use to convert the format of your data to the Parquet or ORC format. This parameter is required if Enabled is set to true. */
  OutputFormatConfiguration?: any;
  /** Defaults to true. Set it to false if you want to disable format conversion while preserving the configuration details. */
  Enabled?: boolean;
}

export interface DynamicPartitioningConfiguration {
  /** The retry behavior in case Firehose is unable to deliver data to an Amazon S3 prefix. */
  RetryOptions?: any;
  /** Specifies that the dynamic partitioning is enabled for this Firehose stream. */
  Enabled?: boolean;
}

export interface ExtendedS3DestinationConfiguration {
  /** The Amazon Resource Name (ARN) of the Amazon Web Services credentials. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  RoleARN: string;
  /** The ARN of the S3 bucket. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  BucketARN: string;
  /** The "YYYY/MM/DD/HH" time format prefix is automatically used for delivered Amazon S3 files. You can also specify a custom prefix, as described in Custom Prefixes for Amazon S3 Objects. */
  Prefix?: string;
  /** A prefix that Firehose evaluates and adds to failed records before writing them to S3. This prefix appears immediately following the bucket name. For information about how to specify this prefix, see  */
  ErrorOutputPrefix?: string;
  /** The buffering option. */
  BufferingHints?: BufferingHints;
  /** The compression format. If no value is specified, the default is UNCOMPRESSED. */
  CompressionFormat?: 'UNCOMPRESSED' | 'GZIP' | 'ZIP' | 'Snappy' | 'HADOOP_SNAPPY';
  /** The encryption configuration. If no value is specified, the default is no encryption. */
  EncryptionConfiguration?: EncryptionConfiguration;
  /** The Amazon CloudWatch logging options for your Firehose stream. */
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  /** The data processing configuration. */
  ProcessingConfiguration?: ProcessingConfiguration;
  /** The Amazon S3 backup mode. After you create a Firehose stream, you can update it to enable Amazon S3 backup if it is disabled. If backup is enabled, you can't update the Firehose stream to disable it. */
  S3BackupMode?: 'Disabled' | 'Enabled';
  /** The configuration for backup in Amazon S3. */
  S3BackupConfiguration?: S3DestinationConfiguration;
  /** The serializer, deserializer, and schema for converting data from the JSON format to the Parquet or ORC format before writing it to Amazon S3. */
  DataFormatConversionConfiguration?: DataFormatConversionConfiguration;
  /** The configuration of the dynamic partitioning mechanism that creates smaller data sets from the streaming data by partitioning it based on partition keys. Currently, dynamic partitioning is only suppo */
  DynamicPartitioningConfiguration?: DynamicPartitioningConfiguration;
  /** Specify a file extension. It will override the default file extension */
  FileExtension?: string;
  /** The time zone you prefer. UTC is the default. */
  CustomTimeZone?: string;
}

export interface CopyCommand {
  /** The name of the target table. The table must already exist in the database. */
  DataTableName: string;
  /** A comma-separated list of column names. */
  DataTableColumns?: string;
  /** Optional parameters to use with the Amazon Redshift COPY command. For more information, see the "Optional Parameters" section of Amazon Redshift COPY command. Some possible examples that would apply t */
  CopyOptions?: string;
}

export interface RedshiftRetryOptions {
  /** The length of time during which Firehose retries delivery after a failure, starting from the initial request and including the first attempt. The default value is 3600 seconds (60 minutes). Firehose d */
  DurationInSeconds?: number;
}

export interface SecretsManagerConfiguration {
  /** The ARN of the secret that stores your credentials. It must be in the same region as the Firehose stream and the role. The secret ARN can reside in a different account than the Firehose stream and rol */
  SecretARN?: string;
  /** Specifies the role that Firehose assumes when calling the Secrets Manager API operation. When you provide the role, it overrides any destination specific role defined in the destination configuration. */
  RoleARN?: string;
  /** Specifies whether you want to use the secrets manager feature. When set as True the secrets manager configuration overwrites the existing secrets in the destination configuration. When it's set to Fal */
  Enabled: boolean;
}

export interface RedshiftDestinationConfiguration {
  /** The Amazon Resource Name (ARN) of the Amazon Web Services credentials. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  RoleARN: string;
  /** The database connection string. */
  ClusterJDBCURL: string;
  /** The COPY command. */
  CopyCommand: CopyCommand;
  /** The name of the user. */
  Username?: string;
  /** The user password. */
  Password?: string;
  /** The retry behavior in case Firehose is unable to deliver documents to Amazon Redshift. Default value is 3600 (60 minutes). */
  RetryOptions?: RedshiftRetryOptions;
  /** The configuration for the intermediate Amazon S3 location from which Amazon Redshift obtains data. Restrictions are described in the topic for CreateDeliveryStream. The compression formats SNAPPY or Z */
  S3Configuration: S3DestinationConfiguration;
  /** The data processing configuration. */
  ProcessingConfiguration?: ProcessingConfiguration;
  /** The Amazon S3 backup mode. After you create a Firehose stream, you can update it to enable Amazon S3 backup if it is disabled. If backup is enabled, you can't update the Firehose stream to disable it. */
  S3BackupMode?: 'Disabled' | 'Enabled';
  /** The configuration for backup in Amazon S3. */
  S3BackupConfiguration?: S3DestinationConfiguration;
  /** The CloudWatch logging options for your Firehose stream. */
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  /** The configuration that defines how you access secrets for Amazon Redshift. */
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}

export interface ElasticsearchBufferingHints {
  /** Buffer incoming data for the specified period of time, in seconds, before delivering it to the destination. The default value is 300 (5 minutes). */
  IntervalInSeconds?: number;
  /** Buffer incoming data to the specified size, in MBs, before delivering it to the destination. The default value is 5. We recommend setting this parameter to a value greater than the amount of data you  */
  SizeInMBs?: number;
}

export interface ElasticsearchRetryOptions {
  /** After an initial failure to deliver to Amazon OpenSearch Service, the total amount of time during which Firehose retries delivery (including the first attempt). After this time has elapsed, the failed */
  DurationInSeconds?: number;
}

export interface VpcConfiguration {
  /** The IDs of the subnets that you want Firehose to use to create ENIs in the VPC of the Amazon OpenSearch Service destination. Make sure that the routing tables and inbound and outbound rules allow traf */
  SubnetIds: any[];
  /** The ARN of the IAM role that you want the Firehose stream to use to create endpoints in the destination VPC. You can use your existing Firehose delivery role or you can specify a new role. In either c */
  RoleARN: string;
  /** The IDs of the security groups that you want Firehose to use when it creates ENIs in the VPC of the Amazon OpenSearch Service destination. You can use the same security group that the Amazon OpenSearc */
  SecurityGroupIds: any[];
}

export interface DocumentIdOptions {
  /** When the FIREHOSE_DEFAULT option is chosen, Firehose generates a unique document ID for each record based on a unique internal identifier. The generated document ID is stable across multiple delivery  */
  DefaultDocumentIdFormat: 'FIREHOSE_DEFAULT' | 'NO_DOCUMENT_ID';
}

export interface ElasticsearchDestinationConfiguration {
  /** The Amazon Resource Name (ARN) of the IAM role to be assumed by Firehose for calling the Amazon OpenSearch Service Configuration API and for indexing documents. For more information, see Grant Firehos */
  RoleARN: string;
  /** The ARN of the Amazon OpenSearch Service domain. The IAM role must have permissions for DescribeDomain, DescribeDomains, and DescribeDomainConfig after assuming the role specified in RoleARN. For more */
  DomainARN?: string;
  /** The endpoint to use when communicating with the cluster. Specify either this ClusterEndpoint or the DomainARN field. */
  ClusterEndpoint?: string;
  /** The Elasticsearch index name. */
  IndexName: string;
  /** The Elasticsearch type name. For Elasticsearch 6.x, there can be only one type per index. If you try to specify a new type for an existing index that already has another type, Firehose returns an erro */
  TypeName?: string;
  /** The Elasticsearch index rotation period. Index rotation appends a timestamp to the IndexName to facilitate the expiration of old data. For more information, see Index Rotation for the Amazon OpenSearc */
  IndexRotationPeriod?: 'NoRotation' | 'OneHour' | 'OneDay' | 'OneWeek' | 'OneMonth';
  /** The buffering options. If no value is specified, the default values for ElasticsearchBufferingHints are used. */
  BufferingHints?: ElasticsearchBufferingHints;
  /** The retry behavior in case Firehose is unable to deliver documents to Amazon OpenSearch Service. The default value is 300 (5 minutes). */
  RetryOptions?: ElasticsearchRetryOptions;
  /** Defines how documents should be delivered to Amazon S3. When it is set to FailedDocumentsOnly, Firehose writes any documents that could not be indexed to the configured Amazon S3 destination, with Ama */
  S3BackupMode?: 'FailedDocumentsOnly' | 'AllDocuments';
  /** The configuration for the backup Amazon S3 location. */
  S3Configuration: S3DestinationConfiguration;
  /** The data processing configuration. */
  ProcessingConfiguration?: ProcessingConfiguration;
  /** The Amazon CloudWatch logging options for your Firehose stream. */
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  /** The details of the VPC of the Amazon destination. */
  VpcConfiguration?: VpcConfiguration;
  /** Indicates the method for setting up document ID. The supported methods are Firehose generated document ID and OpenSearch Service generated document ID. */
  DocumentIdOptions?: DocumentIdOptions;
}

export interface AmazonopensearchserviceBufferingHints {
  /** Buffer incoming data for the specified period of time, in seconds, before delivering it to the destination. The default value is 300 (5 minutes). */
  IntervalInSeconds?: number;
  /** Buffer incoming data to the specified size, in MBs, before delivering it to the destination. The default value is 5. We recommend setting this parameter to a value greater than the amount of data you  */
  SizeInMBs?: number;
}

export interface AmazonopensearchserviceRetryOptions {
  /** After an initial failure to deliver to Amazon OpenSearch Service, the total amount of time during which Firehose retries delivery (including the first attempt). After this time has elapsed, the failed */
  DurationInSeconds?: number;
}

export interface AmazonopensearchserviceDestinationConfiguration {
  /** The Amazon Resource Name (ARN) of the IAM role to be assumed by Firehose for calling the Amazon OpenSearch Service Configuration API and for indexing documents. */
  RoleARN: string;
  /** The ARN of the Amazon OpenSearch Service domain. The IAM role must have permissions for DescribeElasticsearchDomain, DescribeElasticsearchDomains, and DescribeElasticsearchDomainConfig after assuming  */
  DomainARN?: string;
  /** The endpoint to use when communicating with the cluster. Specify either this ClusterEndpoint or the DomainARN field. */
  ClusterEndpoint?: string;
  /** The ElasticsearAmazon OpenSearch Service index name. */
  IndexName: string;
  /** The Amazon OpenSearch Service type name. For Elasticsearch 6.x, there can be only one type per index. If you try to specify a new type for an existing index that already has another type, Firehose ret */
  TypeName?: string;
  /** The Amazon OpenSearch Service index rotation period. Index rotation appends a timestamp to the IndexName to facilitate the expiration of old data. */
  IndexRotationPeriod?: 'NoRotation' | 'OneHour' | 'OneDay' | 'OneWeek' | 'OneMonth';
  /** The buffering options. If no value is specified, the default values for AmazonopensearchserviceBufferingHints are used. */
  BufferingHints?: AmazonopensearchserviceBufferingHints;
  /** The retry behavior in case Firehose is unable to deliver documents to Amazon OpenSearch Service. The default value is 300 (5 minutes). */
  RetryOptions?: AmazonopensearchserviceRetryOptions;
  /** Defines how documents should be delivered to Amazon S3. When it is set to FailedDocumentsOnly, Firehose writes any documents that could not be indexed to the configured Amazon S3 destination, with Ama */
  S3BackupMode?: 'FailedDocumentsOnly' | 'AllDocuments';
  S3Configuration: S3DestinationConfiguration;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  VpcConfiguration?: VpcConfiguration;
  /** Indicates the method for setting up document ID. The supported methods are Firehose generated document ID and OpenSearch Service generated document ID. */
  DocumentIdOptions?: DocumentIdOptions;
}

export interface SplunkRetryOptions {
  /** The total amount of time that Firehose spends on retries. This duration starts after the initial attempt to send data to Splunk fails. It doesn't include the periods during which Firehose waits for ac */
  DurationInSeconds?: number;
}

export interface SplunkBufferingHints {
  /** Buffer incoming data for the specified period of time, in seconds, before delivering it to the destination. The default value is 60 (1 minute). */
  IntervalInSeconds?: number;
  /** Buffer incoming data to the specified size, in MBs, before delivering it to the destination. The default value is 5. */
  SizeInMBs?: number;
}

export interface SplunkDestinationConfiguration {
  /** The HTTP Event Collector (HEC) endpoint to which Firehose sends your data. */
  HECEndpoint: string;
  /** This type can be either "Raw" or "Event." */
  HECEndpointType: 'Raw' | 'Event';
  /** This is a GUID that you obtain from your Splunk cluster when you create a new HEC endpoint. */
  HECToken?: string;
  /** The amount of time that Firehose waits to receive an acknowledgment from Splunk after it sends it data. At the end of the timeout period, Firehose either tries to send the data again or considers it a */
  HECAcknowledgmentTimeoutInSeconds?: number;
  /** The retry behavior in case Firehose is unable to deliver data to Splunk, or if it doesn't receive an acknowledgment of receipt from Splunk. */
  RetryOptions?: SplunkRetryOptions;
  /** Defines how documents should be delivered to Amazon S3. When set to FailedEventsOnly, Firehose writes any data that could not be indexed to the configured Amazon S3 destination. When set to AllEvents, */
  S3BackupMode?: 'FailedEventsOnly' | 'AllEvents';
  /** The configuration for the backup Amazon S3 location. */
  S3Configuration: S3DestinationConfiguration;
  /** The data processing configuration. */
  ProcessingConfiguration?: ProcessingConfiguration;
  /** The Amazon CloudWatch logging options for your Firehose stream. */
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  /** The buffering options. If no value is specified, the default values for Splunk are used. */
  BufferingHints?: SplunkBufferingHints;
  /** The configuration that defines how you access secrets for Splunk. */
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}

export interface HttpEndpointConfiguration {
  /** The URL of the HTTP endpoint selected as the destination. If you choose an HTTP endpoint as your destination, review and follow the instructions in the Appendix - HTTP Endpoint Delivery Request and Re */
  Url: string;
  /** The name of the HTTP endpoint selected as the destination. */
  Name?: string;
  /** The access key required for Kinesis Firehose to authenticate with the HTTP endpoint selected as the destination. */
  AccessKey?: string;
}

export interface HttpEndpointBufferingHints {
  /** Buffer incoming data to the specified size, in MBs, before delivering it to the destination. The default value is 5. We recommend setting this parameter to a value greater than the amount of data you  */
  SizeInMBs?: number;
  /** Buffer incoming data for the specified period of time, in seconds, before delivering it to the destination. The default value is 300 (5 minutes). */
  IntervalInSeconds?: number;
}

export interface HttpEndpointRequestConfiguration {
  /** Firehose uses the content encoding to compress the body of a request before sending the request to the destination. For more information, see Content-Encoding in MDN Web Docs, the official Mozilla doc */
  ContentEncoding?: 'NONE' | 'GZIP';
  /** Describes the metadata sent to the HTTP endpoint destination. */
  CommonAttributes?: any[];
}

export interface HttpEndpointRetryOptions {
  /** The total amount of time that Firehose spends on retries. This duration starts after the initial attempt to send data to the custom destination via HTTPS endpoint fails. It doesn't include the periods */
  DurationInSeconds?: number;
}

export interface HttpEndpointDestinationConfiguration {
  /** The configuration of the HTTP endpoint selected as the destination. */
  EndpointConfiguration: HttpEndpointConfiguration;
  /** The buffering options that can be used before data is delivered to the specified destination. Firehose treats these options as hints, and it might choose to use more optimal values. The SizeInMBs and  */
  BufferingHints?: HttpEndpointBufferingHints;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  /** The configuration of the request sent to the HTTP endpoint that is specified as the destination. */
  RequestConfiguration?: HttpEndpointRequestConfiguration;
  ProcessingConfiguration?: ProcessingConfiguration;
  /** Firehose uses this IAM role for all the permissions that the delivery stream needs. */
  RoleARN?: string;
  /** Describes the retry behavior in case Firehose is unable to deliver data to the specified HTTP endpoint destination, or if it doesn't receive a valid acknowledgment of receipt from the specified HTTP e */
  RetryOptions?: HttpEndpointRetryOptions;
  /** Describes the S3 bucket backup options for the data that Firehose delivers to the HTTP endpoint destination. You can back up all documents (AllData) or only the documents that Firehose could not deliv */
  S3BackupMode?: 'FailedDataOnly' | 'AllData';
  S3Configuration: S3DestinationConfiguration;
  /** The configuration that defines how you access secrets for HTTP Endpoint destination. */
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}

export interface Tag {
  /** A unique identifier for the tag. Maximum length: 128 characters. Valid characters: Unicode letters, digits, white space, _ . / = + - % @ */
  Key: string;
  /** An optional string, which you can use to describe or define the tag. Maximum length: 256 characters. Valid characters: Unicode letters, digits, white space, _ . / = + - % @ */
  Value?: string;
}

export interface AmazonOpenSearchServerlessBufferingHints {
  /** Buffer incoming data for the specified period of time, in seconds, before delivering it to the destination. The default value is 300 (5 minutes). */
  IntervalInSeconds?: number;
  /** Buffer incoming data to the specified size, in MBs, before delivering it to the destination. The default value is 5. We recommend setting this parameter to a value greater than the amount of data you  */
  SizeInMBs?: number;
}

export interface AmazonOpenSearchServerlessRetryOptions {
  /** After an initial failure to deliver to the Serverless offering for Amazon OpenSearch Service, the total amount of time during which Firehose retries delivery (including the first attempt). After this  */
  DurationInSeconds?: number;
}

export interface AmazonOpenSearchServerlessDestinationConfiguration {
  /** The Amazon Resource Name (ARN) of the IAM role to be assumed by Firehose for calling the Serverless offering for Amazon OpenSearch Service Configuration API and for indexing documents. */
  RoleARN: string;
  /** The endpoint to use when communicating with the collection in the Serverless offering for Amazon OpenSearch Service. */
  CollectionEndpoint?: string;
  /** The Serverless offering for Amazon OpenSearch Service index name. */
  IndexName: string;
  /** The buffering options. If no value is specified, the default values for AmazonopensearchserviceBufferingHints are used. */
  BufferingHints?: AmazonOpenSearchServerlessBufferingHints;
  /** The retry behavior in case Firehose is unable to deliver documents to the Serverless offering for Amazon OpenSearch Service. The default value is 300 (5 minutes). */
  RetryOptions?: AmazonOpenSearchServerlessRetryOptions;
  /** Defines how documents should be delivered to Amazon S3. When it is set to FailedDocumentsOnly, Firehose writes any documents that could not be indexed to the configured Amazon S3 destination, with Ama */
  S3BackupMode?: 'FailedDocumentsOnly' | 'AllDocuments';
  S3Configuration: S3DestinationConfiguration;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  VpcConfiguration?: VpcConfiguration;
}

export interface AuthenticationConfiguration {
  /** The ARN of the role used to access the Amazon MSK cluster. */
  RoleARN: string;
  /** The type of connectivity used to access the Amazon MSK cluster. */
  Connectivity: 'PUBLIC' | 'PRIVATE';
}

export interface MSKSourceConfiguration {
  /** The ARN of the Amazon MSK cluster. */
  MSKClusterARN: string;
  /** The topic name within the Amazon MSK cluster. */
  TopicName: string;
  /** The authentication configuration of the Amazon MSK cluster. */
  AuthenticationConfiguration: AuthenticationConfiguration;
  /** The start date and time in UTC for the offset position within your MSK topic from where Firehose begins to read. By default, this is set to timestamp when Firehose becomes Active. If you want to creat */
  ReadFromTimestamp?: string;
}

export interface SnowflakeRoleConfiguration {
  /** Enable Snowflake role */
  Enabled?: boolean;
  /** The Snowflake role you wish to configure */
  SnowflakeRole?: string;
}

export interface SnowflakeVpcConfiguration {
  /** The VPCE ID for Firehose to privately connect with Snowflake. The ID format is com.amazonaws.vpce.[region].vpce-svc-. For more information, see Amazon PrivateLink & Snowflake */
  PrivateLinkVpceId: string;
}

export interface SnowflakeRetryOptions {
  /** the time period where Firehose will retry sending data to the chosen HTTP endpoint. */
  DurationInSeconds?: number;
}

export interface SnowflakeBufferingHints {
  /** Buffer incoming data to the specified size, in MBs, before delivering it to the destination. The default value is 128. */
  SizeInMBs?: number;
  /** Buffer incoming data for the specified period of time, in seconds, before delivering it to the destination. The default value is 0. */
  IntervalInSeconds?: number;
}

export interface SnowflakeDestinationConfiguration {
  /** URL for accessing your Snowflake account. This URL must include your account identifier. Note that the protocol (https://) and port number are optional. */
  AccountUrl: string;
  /** The private key used to encrypt your Snowflake client. For information, see Using Key Pair Authentication & Key Rotation. */
  PrivateKey?: string;
  /** Passphrase to decrypt the private key when the key is encrypted. For information, see Using Key Pair Authentication & Key Rotation. */
  KeyPassphrase?: string;
  /** User login name for the Snowflake account. */
  User?: string;
  /** All data in Snowflake is maintained in databases. */
  Database: string;
  /** Each database consists of one or more schemas, which are logical groupings of database objects, such as tables and views */
  Schema: string;
  /** All data in Snowflake is stored in database tables, logically structured as collections of columns and rows. */
  Table: string;
  /** Optionally configure a Snowflake role. Otherwise the default user role will be used. */
  SnowflakeRoleConfiguration?: SnowflakeRoleConfiguration;
  /** Choose to load JSON keys mapped to table column names or choose to split the JSON payload where content is mapped to a record content column and source metadata is mapped to a record metadata column. */
  DataLoadingOption?: 'JSON_MAPPING' | 'VARIANT_CONTENT_MAPPING' | 'VARIANT_CONTENT_AND_METADATA_MAPPING';
  /** Specify a column name in the table, where the metadata information has to be loaded. When you enable this field, you will see the following column in the snowflake table, which differs based on the so */
  MetaDataColumnName?: string;
  /** The name of the record content column. */
  ContentColumnName?: string;
  /** The VPCE ID for Firehose to privately connect with Snowflake. The ID format is com.amazonaws.vpce.[region].vpce-svc-. For more information, see Amazon PrivateLink & Snowflake */
  SnowflakeVpcConfiguration?: SnowflakeVpcConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  /** The Amazon Resource Name (ARN) of the Snowflake role */
  RoleARN: string;
  /** The time period where Firehose will retry sending data to the chosen HTTP endpoint. */
  RetryOptions?: SnowflakeRetryOptions;
  /** Choose an S3 backup mode */
  S3BackupMode?: 'FailedDataOnly' | 'AllData';
  S3Configuration: S3DestinationConfiguration;
  /** The configuration that defines how you access secrets for Snowflake. */
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
  /** Describes the buffering to perform before delivering data to the Snowflake destination. If you do not specify any value, Firehose uses the default values. */
  BufferingHints?: SnowflakeBufferingHints;
}

export interface SchemaEvolutionConfiguration {
  /** Specify whether you want to enable schema evolution. Amazon Data Firehose is in preview release and is subject to change. */
  Enabled: boolean;
}

export interface TableCreationConfiguration {
  /** Specify whether you want to enable automatic table creation. Amazon Data Firehose is in preview release and is subject to change. */
  Enabled: boolean;
}

export interface RetryOptions {
  /** The period of time during which Firehose retries to deliver data to the specified destination. */
  DurationInSeconds?: number;
}

export interface CatalogConfiguration {
  /** Specifies the Glue catalog ARN identifier of the destination Apache Iceberg Tables. You must specify the ARN in the format arn:aws:glue:region:account-id:catalog. */
  CatalogARN?: string;
  /** The warehouse location for Apache Iceberg tables. You must configure this when schema evolution and table creation is enabled. Amazon Data Firehose is in preview release and is subject to change. */
  WarehouseLocation?: string;
}

export interface IcebergDestinationConfiguration {
  /** Provides a list of DestinationTableConfigurations which Firehose uses to deliver data to Apache Iceberg Tables. Firehose will write data with insert if table specific configuration is not provided her */
  DestinationTableConfigurationList?: any[];
  /** The configuration to enable automatic schema evolution. Amazon Data Firehose is in preview release and is subject to change. */
  SchemaEvolutionConfiguration?: SchemaEvolutionConfiguration;
  /** The configuration to enable automatic table creation. Amazon Data Firehose is in preview release and is subject to change. */
  TableCreationConfiguration?: TableCreationConfiguration;
  BufferingHints?: BufferingHints;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  /** Describes how Firehose will backup records. Currently,S3 backup only supports FailedDataOnly. */
  S3BackupMode?: 'FailedDataOnly' | 'AllData';
  RetryOptions?: RetryOptions;
  /** The Amazon Resource Name (ARN) of the IAM role to be assumed by Firehose for calling Apache Iceberg Tables. */
  RoleARN: string;
  /** Describes whether all incoming data for this delivery stream will be append only (inserts only and not for updates and deletes) for Iceberg delivery. This feature is only applicable for Apache Iceberg */
  AppendOnly?: boolean;
  /** Configuration describing where the destination Apache Iceberg Tables are persisted. */
  CatalogConfiguration: CatalogConfiguration;
  S3Configuration: S3DestinationConfiguration;
}

export interface DatabaseList {
  /** The list of database patterns in source database endpoint to be included for Firehose to read from. Amazon Data Firehose is in preview release and is subject to change. */
  Include?: any[];
  /** The list of database patterns in source database endpoint to be excluded for Firehose to read from. Amazon Data Firehose is in preview release and is subject to change. */
  Exclude?: any[];
}

export interface DatabaseTableList {
  /** The list of table patterns in source database endpoint to be included for Firehose to read from. Amazon Data Firehose is in preview release and is subject to change. */
  Include?: any[];
  /** The list of table patterns in source database endpoint to be excluded for Firehose to read from. Amazon Data Firehose is in preview release and is subject to change. */
  Exclude?: any[];
}

export interface DatabaseColumnList {
  /** The list of column patterns in source database to be included for Firehose to read from. Amazon Data Firehose is in preview release and is subject to change. */
  Include?: any[];
  /** The list of column patterns in source database to be excluded for Firehose to read from. Amazon Data Firehose is in preview release and is subject to change. */
  Exclude?: any[];
}

export interface DatabaseSourceAuthenticationConfiguration {
  SecretsManagerConfiguration: any;
}

export interface DatabaseSourceVPCConfiguration {
  /** The VPC endpoint service name which Firehose uses to create a PrivateLink to the database. The endpoint service must have the Firehose service principle firehose.amazonaws.com as an allowed principal  */
  VpcEndpointServiceName: string;
}

export interface DatabaseSourceConfiguration {
  /** The type of database engine. This can be one of the following values. MySQL PostgreSQL Amazon Data Firehose is in preview release and is subject to change. */
  Type: 'MySQL' | 'PostgreSQL';
  /** The endpoint of the database server. Amazon Data Firehose is in preview release and is subject to change. */
  Endpoint: string;
  /** The port of the database. This can be one of the following values. 3306 for MySQL database type 5432 for PostgreSQL database type Amazon Data Firehose is in preview release and is subject to change. */
  Port: number;
  /** The mode to enable or disable SSL when Firehose connects to the database endpoint. Amazon Data Firehose is in preview release and is subject to change. */
  SSLMode?: 'Disabled' | 'Enabled';
  /** The list of database patterns in source database endpoint for Firehose to read from. Amazon Data Firehose is in preview release and is subject to change. */
  Databases: DatabaseList;
  /** The list of table patterns in source database endpoint for Firehose to read from. Amazon Data Firehose is in preview release and is subject to change. */
  Tables: DatabaseTableList;
  /** The list of column patterns in source database endpoint for Firehose to read from. Amazon Data Firehose is in preview release and is subject to change. */
  Columns?: DatabaseColumnList;
  /** The optional list of table and column names used as unique key columns when taking snapshot if the tables don’t have primary keys configured. Amazon Data Firehose is in preview release and is subject  */
  SurrogateKeys?: string[];
  /** The fully qualified name of the table in source database endpoint that Firehose uses to track snapshot progress. Amazon Data Firehose is in preview release and is subject to change. */
  SnapshotWatermarkTable: string;
  /** The structure to configure the authentication methods for Firehose to connect to source database endpoint. Amazon Data Firehose is in preview release and is subject to change. */
  DatabaseSourceAuthenticationConfiguration: DatabaseSourceAuthenticationConfiguration;
  /** The details of the VPC Endpoint Service which Firehose uses to create a PrivateLink to the database. Amazon Data Firehose is in preview release and is subject to change. */
  DatabaseSourceVPCConfiguration: DatabaseSourceVPCConfiguration;
}

export interface S3DestinationUpdate {
  /** The Amazon Resource Name (ARN) of the Amazon Web Services credentials. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  RoleARN?: string;
  /** The ARN of the S3 bucket. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  BucketARN?: string;
  /** The "YYYY/MM/DD/HH" time format prefix is automatically used for delivered Amazon S3 files. You can also specify a custom prefix, as described in Custom Prefixes for Amazon S3 Objects. */
  Prefix?: string;
  /** A prefix that Firehose evaluates and adds to failed records before writing them to S3. This prefix appears immediately following the bucket name. For information about how to specify this prefix, see  */
  ErrorOutputPrefix?: string;
  /** The buffering option. If no value is specified, BufferingHints object default values are used. */
  BufferingHints?: BufferingHints;
  /** The compression format. If no value is specified, the default is UNCOMPRESSED. The compression formats SNAPPY or ZIP cannot be specified for Amazon Redshift destinations because they are not supported */
  CompressionFormat?: 'UNCOMPRESSED' | 'GZIP' | 'ZIP' | 'Snappy' | 'HADOOP_SNAPPY';
  /** The encryption configuration. If no value is specified, the default is no encryption. */
  EncryptionConfiguration?: EncryptionConfiguration;
  /** The CloudWatch logging options for your Firehose stream. */
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
}

export interface ExtendedS3DestinationUpdate {
  /** The Amazon Resource Name (ARN) of the Amazon Web Services credentials. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  RoleARN?: string;
  /** The ARN of the S3 bucket. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  BucketARN?: string;
  /** The "YYYY/MM/DD/HH" time format prefix is automatically used for delivered Amazon S3 files. You can also specify a custom prefix, as described in Custom Prefixes for Amazon S3 Objects. */
  Prefix?: string;
  /** A prefix that Firehose evaluates and adds to failed records before writing them to S3. This prefix appears immediately following the bucket name. For information about how to specify this prefix, see  */
  ErrorOutputPrefix?: string;
  /** The buffering option. */
  BufferingHints?: BufferingHints;
  /** The compression format. If no value is specified, the default is UNCOMPRESSED. */
  CompressionFormat?: 'UNCOMPRESSED' | 'GZIP' | 'ZIP' | 'Snappy' | 'HADOOP_SNAPPY';
  /** The encryption configuration. If no value is specified, the default is no encryption. */
  EncryptionConfiguration?: EncryptionConfiguration;
  /** The Amazon CloudWatch logging options for your Firehose stream. */
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  /** The data processing configuration. */
  ProcessingConfiguration?: ProcessingConfiguration;
  /** You can update a Firehose stream to enable Amazon S3 backup if it is disabled. If backup is enabled, you can't update the Firehose stream to disable it. */
  S3BackupMode?: 'Disabled' | 'Enabled';
  /** The Amazon S3 destination for backup. */
  S3BackupUpdate?: S3DestinationUpdate;
  /** The serializer, deserializer, and schema for converting data from the JSON format to the Parquet or ORC format before writing it to Amazon S3. */
  DataFormatConversionConfiguration?: DataFormatConversionConfiguration;
  /** The configuration of the dynamic partitioning mechanism that creates smaller data sets from the streaming data by partitioning it based on partition keys. Currently, dynamic partitioning is only suppo */
  DynamicPartitioningConfiguration?: DynamicPartitioningConfiguration;
  /** Specify a file extension. It will override the default file extension */
  FileExtension?: string;
  /** The time zone you prefer. UTC is the default. */
  CustomTimeZone?: string;
}

export interface RedshiftDestinationUpdate {
  /** The Amazon Resource Name (ARN) of the Amazon Web Services credentials. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  RoleARN?: string;
  /** The database connection string. */
  ClusterJDBCURL?: string;
  /** The COPY command. */
  CopyCommand?: CopyCommand;
  /** The name of the user. */
  Username?: string;
  /** The user password. */
  Password?: string;
  /** The retry behavior in case Firehose is unable to deliver documents to Amazon Redshift. Default value is 3600 (60 minutes). */
  RetryOptions?: RedshiftRetryOptions;
  /** The Amazon S3 destination. The compression formats SNAPPY or ZIP cannot be specified in RedshiftDestinationUpdate.S3Update because the Amazon Redshift COPY operation that reads from the S3 bucket does */
  S3Update?: S3DestinationUpdate;
  /** The data processing configuration. */
  ProcessingConfiguration?: ProcessingConfiguration;
  /** You can update a Firehose stream to enable Amazon S3 backup if it is disabled. If backup is enabled, you can't update the Firehose stream to disable it. */
  S3BackupMode?: 'Disabled' | 'Enabled';
  /** The Amazon S3 destination for backup. */
  S3BackupUpdate?: S3DestinationUpdate;
  /** The Amazon CloudWatch logging options for your Firehose stream. */
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  /** The configuration that defines how you access secrets for Amazon Redshift. */
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}

export interface ElasticsearchDestinationUpdate {
  /** The Amazon Resource Name (ARN) of the IAM role to be assumed by Firehose for calling the Amazon OpenSearch Service Configuration API and for indexing documents. For more information, see Grant Firehos */
  RoleARN?: string;
  /** The ARN of the Amazon OpenSearch Service domain. The IAM role must have permissions for DescribeDomain, DescribeDomains, and DescribeDomainConfig after assuming the IAM role specified in RoleARN. For  */
  DomainARN?: string;
  /** The endpoint to use when communicating with the cluster. Specify either this ClusterEndpoint or the DomainARN field. */
  ClusterEndpoint?: string;
  /** The Elasticsearch index name. */
  IndexName?: string;
  /** The Elasticsearch type name. For Elasticsearch 6.x, there can be only one type per index. If you try to specify a new type for an existing index that already has another type, Firehose returns an erro */
  TypeName?: string;
  /** The Elasticsearch index rotation period. Index rotation appends a timestamp to IndexName to facilitate the expiration of old data. For more information, see Index Rotation for the Amazon OpenSearch Se */
  IndexRotationPeriod?: 'NoRotation' | 'OneHour' | 'OneDay' | 'OneWeek' | 'OneMonth';
  /** The buffering options. If no value is specified, ElasticsearchBufferingHints object default values are used. */
  BufferingHints?: ElasticsearchBufferingHints;
  /** The retry behavior in case Firehose is unable to deliver documents to Amazon OpenSearch Service. The default value is 300 (5 minutes). */
  RetryOptions?: ElasticsearchRetryOptions;
  /** The Amazon S3 destination. */
  S3Update?: S3DestinationUpdate;
  /** The data processing configuration. */
  ProcessingConfiguration?: ProcessingConfiguration;
  /** The CloudWatch logging options for your Firehose stream. */
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  /** Indicates the method for setting up document ID. The supported methods are Firehose generated document ID and OpenSearch Service generated document ID. */
  DocumentIdOptions?: DocumentIdOptions;
}

export interface AmazonopensearchserviceDestinationUpdate {
  /** The Amazon Resource Name (ARN) of the IAM role to be assumed by Firehose for calling the Amazon OpenSearch Service Configuration API and for indexing documents. */
  RoleARN?: string;
  /** The ARN of the Amazon OpenSearch Service domain. The IAM role must have permissions for DescribeDomain, DescribeDomains, and DescribeDomainConfig after assuming the IAM role specified in RoleARN. */
  DomainARN?: string;
  /** The endpoint to use when communicating with the cluster. Specify either this ClusterEndpoint or the DomainARN field. */
  ClusterEndpoint?: string;
  /** The Amazon OpenSearch Service index name. */
  IndexName?: string;
  /** The Amazon OpenSearch Service type name. For Elasticsearch 6.x, there can be only one type per index. If you try to specify a new type for an existing index that already has another type, Firehose ret */
  TypeName?: string;
  /** The Amazon OpenSearch Service index rotation period. Index rotation appends a timestamp to IndexName to facilitate the expiration of old data. */
  IndexRotationPeriod?: 'NoRotation' | 'OneHour' | 'OneDay' | 'OneWeek' | 'OneMonth';
  /** The buffering options. If no value is specified, AmazonopensearchBufferingHints object default values are used. */
  BufferingHints?: AmazonopensearchserviceBufferingHints;
  /** The retry behavior in case Firehose is unable to deliver documents to Amazon OpenSearch Service. The default value is 300 (5 minutes). */
  RetryOptions?: AmazonopensearchserviceRetryOptions;
  S3Update?: S3DestinationUpdate;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  /** Indicates the method for setting up document ID. The supported methods are Firehose generated document ID and OpenSearch Service generated document ID. */
  DocumentIdOptions?: DocumentIdOptions;
}

export interface SplunkDestinationUpdate {
  /** The HTTP Event Collector (HEC) endpoint to which Firehose sends your data. */
  HECEndpoint?: string;
  /** This type can be either "Raw" or "Event." */
  HECEndpointType?: 'Raw' | 'Event';
  /** A GUID that you obtain from your Splunk cluster when you create a new HEC endpoint. */
  HECToken?: string;
  /** The amount of time that Firehose waits to receive an acknowledgment from Splunk after it sends data. At the end of the timeout period, Firehose either tries to send the data again or considers it an e */
  HECAcknowledgmentTimeoutInSeconds?: number;
  /** The retry behavior in case Firehose is unable to deliver data to Splunk or if it doesn't receive an acknowledgment of receipt from Splunk. */
  RetryOptions?: SplunkRetryOptions;
  /** Specifies how you want Firehose to back up documents to Amazon S3. When set to FailedDocumentsOnly, Firehose writes any data that could not be indexed to the configured Amazon S3 destination. When set */
  S3BackupMode?: 'FailedEventsOnly' | 'AllEvents';
  /** Your update to the configuration of the backup Amazon S3 location. */
  S3Update?: S3DestinationUpdate;
  /** The data processing configuration. */
  ProcessingConfiguration?: ProcessingConfiguration;
  /** The Amazon CloudWatch logging options for your Firehose stream. */
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  /** The buffering options. If no value is specified, the default values for Splunk are used. */
  BufferingHints?: SplunkBufferingHints;
  /** The configuration that defines how you access secrets for Splunk. */
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}

export interface HttpEndpointDestinationUpdate {
  /** Describes the configuration of the HTTP endpoint destination. */
  EndpointConfiguration?: HttpEndpointConfiguration;
  /** Describes buffering options that can be applied to the data before it is delivered to the HTTPS endpoint destination. Firehose teats these options as hints, and it might choose to use more optimal val */
  BufferingHints?: HttpEndpointBufferingHints;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  /** The configuration of the request sent to the HTTP endpoint specified as the destination. */
  RequestConfiguration?: HttpEndpointRequestConfiguration;
  ProcessingConfiguration?: ProcessingConfiguration;
  /** Firehose uses this IAM role for all the permissions that the delivery stream needs. */
  RoleARN?: string;
  /** Describes the retry behavior in case Firehose is unable to deliver data to the specified HTTP endpoint destination, or if it doesn't receive a valid acknowledgment of receipt from the specified HTTP e */
  RetryOptions?: HttpEndpointRetryOptions;
  /** Describes the S3 bucket backup options for the data that Kinesis Firehose delivers to the HTTP endpoint destination. You can back up all documents (AllData) or only the documents that Firehose could n */
  S3BackupMode?: 'FailedDataOnly' | 'AllData';
  S3Update?: S3DestinationUpdate;
  /** The configuration that defines how you access secrets for HTTP Endpoint destination. */
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
}

export interface AmazonOpenSearchServerlessDestinationUpdate {
  /** The Amazon Resource Name (ARN) of the IAM role to be assumed by Firehose for calling the Serverless offering for Amazon OpenSearch Service Configuration API and for indexing documents. */
  RoleARN?: string;
  /** The endpoint to use when communicating with the collection in the Serverless offering for Amazon OpenSearch Service. */
  CollectionEndpoint?: string;
  /** The Serverless offering for Amazon OpenSearch Service index name. */
  IndexName?: string;
  /** The buffering options. If no value is specified, AmazonopensearchBufferingHints object default values are used. */
  BufferingHints?: AmazonOpenSearchServerlessBufferingHints;
  /** The retry behavior in case Firehose is unable to deliver documents to the Serverless offering for Amazon OpenSearch Service. The default value is 300 (5 minutes). */
  RetryOptions?: AmazonOpenSearchServerlessRetryOptions;
  S3Update?: S3DestinationUpdate;
  ProcessingConfiguration?: ProcessingConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
}

export interface SnowflakeDestinationUpdate {
  /** URL for accessing your Snowflake account. This URL must include your account identifier. Note that the protocol (https://) and port number are optional. */
  AccountUrl?: string;
  /** The private key used to encrypt your Snowflake client. For information, see Using Key Pair Authentication & Key Rotation. */
  PrivateKey?: string;
  /** Passphrase to decrypt the private key when the key is encrypted. For information, see Using Key Pair Authentication & Key Rotation. */
  KeyPassphrase?: string;
  /** User login name for the Snowflake account. */
  User?: string;
  /** All data in Snowflake is maintained in databases. */
  Database?: string;
  /** Each database consists of one or more schemas, which are logical groupings of database objects, such as tables and views */
  Schema?: string;
  /** All data in Snowflake is stored in database tables, logically structured as collections of columns and rows. */
  Table?: string;
  /** Optionally configure a Snowflake role. Otherwise the default user role will be used. */
  SnowflakeRoleConfiguration?: SnowflakeRoleConfiguration;
  /** JSON keys mapped to table column names or choose to split the JSON payload where content is mapped to a record content column and source metadata is mapped to a record metadata column. */
  DataLoadingOption?: 'JSON_MAPPING' | 'VARIANT_CONTENT_MAPPING' | 'VARIANT_CONTENT_AND_METADATA_MAPPING';
  /** The name of the record metadata column */
  MetaDataColumnName?: string;
  /** The name of the content metadata column */
  ContentColumnName?: string;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  /** The Amazon Resource Name (ARN) of the Snowflake role */
  RoleARN?: string;
  /** Specify how long Firehose retries sending data to the New Relic HTTP endpoint. After sending data, Firehose first waits for an acknowledgment from the HTTP endpoint. If an error occurs or the acknowle */
  RetryOptions?: SnowflakeRetryOptions;
  /** Choose an S3 backup mode. Once you set the mode as AllData, you can not change it to FailedDataOnly. */
  S3BackupMode?: 'FailedDataOnly' | 'AllData';
  S3Update?: S3DestinationUpdate;
  /** Describes the Secrets Manager configuration in Snowflake. */
  SecretsManagerConfiguration?: SecretsManagerConfiguration;
  /** Describes the buffering to perform before delivering data to the Snowflake destination. */
  BufferingHints?: SnowflakeBufferingHints;
}

export interface IcebergDestinationUpdate {
  /** Provides a list of DestinationTableConfigurations which Firehose uses to deliver data to Apache Iceberg Tables. Firehose will write data with insert if table specific configuration is not provided her */
  DestinationTableConfigurationList?: any[];
  /** The configuration to enable automatic schema evolution. Amazon Data Firehose is in preview release and is subject to change. */
  SchemaEvolutionConfiguration?: SchemaEvolutionConfiguration;
  /** The configuration to enable automatic table creation. Amazon Data Firehose is in preview release and is subject to change. */
  TableCreationConfiguration?: TableCreationConfiguration;
  BufferingHints?: BufferingHints;
  CloudWatchLoggingOptions?: CloudWatchLoggingOptions;
  ProcessingConfiguration?: ProcessingConfiguration;
  /** Describes how Firehose will backup records. Currently,Firehose only supports FailedDataOnly. */
  S3BackupMode?: 'FailedDataOnly' | 'AllData';
  RetryOptions?: RetryOptions;
  /** The Amazon Resource Name (ARN) of the IAM role to be assumed by Firehose for calling Apache Iceberg Tables. */
  RoleARN?: string;
  /** Describes whether all incoming data for this delivery stream will be append only (inserts only and not for updates and deletes) for Iceberg delivery. This feature is only applicable for Apache Iceberg */
  AppendOnly?: boolean;
  /** Configuration describing where the destination Iceberg tables are persisted. */
  CatalogConfiguration?: CatalogConfiguration;
  S3Configuration?: S3DestinationConfiguration;
}

export interface CreateDeliveryStreamInput {
  /** The name of the Firehose stream. This name must be unique per Amazon Web Services account in the same Amazon Web Services Region. If the Firehose streams are in different accounts or different Regions */
  DeliveryStreamName: string;
  /** The destination in the Serverless offering for Amazon OpenSearch Service. You can specify only one destination. */
  AmazonOpenSearchServerlessDestinationConfiguration?: AmazonOpenSearchServerlessDestinationConfiguration;
  /** The destination in Amazon OpenSearch Service. You can specify only one destination. */
  AmazonopensearchserviceDestinationConfiguration?: AmazonopensearchserviceDestinationConfiguration;
  /** The top level object for configuring streams with database as a source. Amazon Data Firehose is in preview release and is subject to change. */
  DatabaseSourceConfiguration?: DatabaseSourceConfiguration;
  /** Used to specify the type and Amazon Resource Name (ARN) of the KMS key needed for Server-Side Encryption (SSE). */
  DeliveryStreamEncryptionConfigurationInput?: DeliveryStreamEncryptionConfigurationInput;
  /** The Firehose stream type. This parameter can be one of the following values: DirectPut: Provider applications access the Firehose stream directly. KinesisStreamAsSource: The Firehose stream uses a Kin */
  DeliveryStreamType?: 'DirectPut' | 'KinesisStreamAsSource' | 'MSKAsSource' | 'DatabaseAsSource';
  /** The structure that configures parameters such as ThroughputHintInMBs for a stream configured with Direct PUT as a source. */
  DirectPutSourceConfiguration?: DirectPutSourceConfiguration;
  /** The destination in Amazon OpenSearch Service. You can specify only one destination. */
  ElasticsearchDestinationConfiguration?: ElasticsearchDestinationConfiguration;
  /** The destination in Amazon S3. You can specify only one destination. */
  ExtendedS3DestinationConfiguration?: ExtendedS3DestinationConfiguration;
  /** Enables configuring Kinesis Firehose to deliver data to any HTTP endpoint destination. You can specify only one destination. */
  HttpEndpointDestinationConfiguration?: HttpEndpointDestinationConfiguration;
  /** Configure Apache Iceberg Tables destination. */
  IcebergDestinationConfiguration?: IcebergDestinationConfiguration;
  /** When a Kinesis data stream is used as the source for the Firehose stream, a KinesisStreamSourceConfiguration containing the Kinesis data stream Amazon Resource Name (ARN) and the role ARN for the sour */
  KinesisStreamSourceConfiguration?: KinesisStreamSourceConfiguration;
  MSKSourceConfiguration?: MSKSourceConfiguration;
  /** The destination in Amazon Redshift. You can specify only one destination. */
  RedshiftDestinationConfiguration?: RedshiftDestinationConfiguration;
  /** [Deprecated] The destination in Amazon S3. You can specify only one destination. */
  S3DestinationConfiguration?: S3DestinationConfiguration;
  /** Configure Snowflake destination */
  SnowflakeDestinationConfiguration?: SnowflakeDestinationConfiguration;
  /** The destination in Splunk. You can specify only one destination. */
  SplunkDestinationConfiguration?: SplunkDestinationConfiguration;
  /** A set of tags to assign to the Firehose stream. A tag is a key-value pair that you can define and assign to Amazon Web Services resources. Tags are metadata. For example, you can add friendly names an */
  Tags?: Tag[];
}

export interface DeleteDeliveryStreamInput {
  /** The name of the Firehose stream. */
  DeliveryStreamName: string;
  /** Set this to true if you want to delete the Firehose stream even if Firehose is unable to retire the grant for the CMK. Firehose might be unable to retire the grant due to a customer error, such as whe */
  AllowForceDelete?: boolean;
}

export interface DescribeDeliveryStreamInput {
  /** The name of the Firehose stream. */
  DeliveryStreamName: string;
  /** The ID of the destination to start returning the destination information. Firehose supports one destination per Firehose stream. */
  ExclusiveStartDestinationId?: string;
  /** The limit on the number of destinations to return. You can have one destination per Firehose stream. */
  Limit?: number;
}

export interface ListDeliveryStreamsInput {
  /** The Firehose stream type. This can be one of the following values: DirectPut: Provider applications access the Firehose stream directly. KinesisStreamAsSource: The Firehose stream uses a Kinesis data  */
  DeliveryStreamType?: 'DirectPut' | 'KinesisStreamAsSource' | 'MSKAsSource' | 'DatabaseAsSource';
  /** The list of Firehose streams returned by this call to ListDeliveryStreams will start with the Firehose stream whose name comes alphabetically immediately after the name you specify in ExclusiveStartDe */
  ExclusiveStartDeliveryStreamName?: string;
  /** The maximum number of Firehose streams to list. The default value is 10. */
  Limit?: number;
}

export interface ListTagsForDeliveryStreamInput {
  /** The name of the Firehose stream whose tags you want to list. */
  DeliveryStreamName: string;
  /** The key to use as the starting point for the list of tags. If you set this parameter, ListTagsForDeliveryStream gets all tags that occur after ExclusiveStartTagKey. */
  ExclusiveStartTagKey?: string;
  /** The number of tags to return. If this number is less than the total number of tags associated with the Firehose stream, HasMoreTags is set to true in the response. To list additional tags, set Exclusi */
  Limit?: number;
}

export interface PutRecordInput {
  /** The name of the Firehose stream. */
  DeliveryStreamName: string;
  /** The record. */
  Record: any;
}

export interface PutRecordBatchInput {
  /** The name of the Firehose stream. */
  DeliveryStreamName: string;
  /** One or more records. */
  Records: any[];
}

export interface StartDeliveryStreamEncryptionInput {
  /** The name of the Firehose stream for which you want to enable server-side encryption (SSE). */
  DeliveryStreamName: string;
  /** Used to specify the type and Amazon Resource Name (ARN) of the KMS key needed for Server-Side Encryption (SSE). */
  DeliveryStreamEncryptionConfigurationInput?: DeliveryStreamEncryptionConfigurationInput;
}

export interface StopDeliveryStreamEncryptionInput {
  /** The name of the Firehose stream for which you want to disable server-side encryption (SSE). */
  DeliveryStreamName: string;
}

export interface TagDeliveryStreamInput {
  /** The name of the Firehose stream to which you want to add the tags. */
  DeliveryStreamName: string;
  /** A set of key-value pairs to use to create the tags. */
  Tags: Tag[];
}

export interface UntagDeliveryStreamInput {
  /** The name of the Firehose stream. */
  DeliveryStreamName: string;
  /** A list of tag keys. Each corresponding tag is removed from the delivery stream. */
  TagKeys: string[];
}

export interface UpdateDestinationInput {
  /** Obtain this value from the VersionId result of DeliveryStreamDescription. This value is required, and helps the service perform conditional operations. For example, if there is an interleaving update  */
  CurrentDeliveryStreamVersionId: string;
  /** The name of the Firehose stream. */
  DeliveryStreamName: string;
  /** The ID of the destination. */
  DestinationId: string;
  /** Describes an update for a destination in the Serverless offering for Amazon OpenSearch Service. */
  AmazonOpenSearchServerlessDestinationUpdate?: AmazonOpenSearchServerlessDestinationUpdate;
  /** Describes an update for a destination in Amazon OpenSearch Service. */
  AmazonopensearchserviceDestinationUpdate?: AmazonopensearchserviceDestinationUpdate;
  /** Describes an update for a destination in Amazon OpenSearch Service. */
  ElasticsearchDestinationUpdate?: ElasticsearchDestinationUpdate;
  /** Describes an update for a destination in Amazon S3. */
  ExtendedS3DestinationUpdate?: ExtendedS3DestinationUpdate;
  /** Describes an update to the specified HTTP endpoint destination. */
  HttpEndpointDestinationUpdate?: HttpEndpointDestinationUpdate;
  /** Describes an update for a destination in Apache Iceberg Tables. */
  IcebergDestinationUpdate?: IcebergDestinationUpdate;
  /** Describes an update for a destination in Amazon Redshift. */
  RedshiftDestinationUpdate?: RedshiftDestinationUpdate;
  /** [Deprecated] Describes an update for a destination in Amazon S3. */
  S3DestinationUpdate?: S3DestinationUpdate;
  /** Update to the Snowflake destination configuration settings. */
  SnowflakeDestinationUpdate?: SnowflakeDestinationUpdate;
  /** Describes an update for a destination in Splunk. */
  SplunkDestinationUpdate?: SplunkDestinationUpdate;
}

/** Firehose service binding for Step Functions SDK integrations. */
export class Firehose {
  constructor() {}

  createDeliveryStream<T>(params: CreateDeliveryStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDeliveryStream<T>(params: DeleteDeliveryStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDeliveryStream<T>(params: DescribeDeliveryStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDeliveryStreams<T>(params: ListDeliveryStreamsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForDeliveryStream<T>(params: ListTagsForDeliveryStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRecord<T>(params: PutRecordInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRecordBatch<T>(params: PutRecordBatchInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDeliveryStreamEncryption<T>(params: StartDeliveryStreamEncryptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopDeliveryStreamEncryption<T>(params: StopDeliveryStreamEncryptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagDeliveryStream<T>(params: TagDeliveryStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagDeliveryStream<T>(params: UntagDeliveryStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDestination<T>(params: UpdateDestinationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
