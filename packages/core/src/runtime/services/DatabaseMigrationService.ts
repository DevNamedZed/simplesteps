// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface Tag {
  /** A key is the required name of the tag. The string value can be 1-128 Unicode characters in length and can't be prefixed with "aws:" or "dms:". The string can only contain only the set of Unicode lette */
  Key?: string;
  /** A value is the optional value of the tag. The string value can be 1-256 Unicode characters in length and can't be prefixed with "aws:" or "dms:". The string can only contain only the set of Unicode le */
  Value?: string;
  /** The Amazon Resource Name (ARN) string that uniquely identifies the resource for which the tag is created. */
  ResourceArn?: string;
}

export interface StartRecommendationsRequestEntry {
  /** The identifier of the source database. */
  DatabaseId: string;
  /** The required target engine settings. */
  Settings: any;
}

export interface SourceDataSetting {
  /** The change data capture (CDC) start position for the source data provider. */
  CDCStartPosition?: string;
  /** The change data capture (CDC) start time for the source data provider. */
  CDCStartTime?: string;
  /** The change data capture (CDC) stop time for the source data provider. */
  CDCStopTime?: string;
  /** The name of the replication slot on the source data provider. This attribute is only valid for a PostgreSQL or Aurora PostgreSQL source. */
  SlotName?: string;
}

export interface TargetDataSetting {
  /** This setting determines how DMS handles the target tables before starting a data migration, either by leaving them untouched, dropping and recreating them, or truncating the existing data in the targe */
  TablePreparationMode?: 'do-nothing' | 'truncate' | 'drop-tables-on-target';
}

export interface RedshiftDataProviderSettings {
  /** The name of the Amazon Redshift server. */
  ServerName?: string;
  /** The port value for the Amazon Redshift data provider. */
  Port?: number;
  /** The database name on the Amazon Redshift data provider. */
  DatabaseName?: string;
  /** The path for the Amazon S3 bucket that the application uses for accessing the user-defined schema. */
  S3Path?: string;
  /** The ARN for the role the application uses to access its Amazon S3 bucket. */
  S3AccessRoleArn?: string;
}

export interface PostgreSqlDataProviderSettings {
  /** The name of the PostgreSQL server. */
  ServerName?: string;
  /** The port value for the PostgreSQL data provider. */
  Port?: number;
  /** The database name on the PostgreSQL data provider. */
  DatabaseName?: string;
  /** The SSL mode used to connect to the PostgreSQL data provider. The default value is none. */
  SslMode?: 'none' | 'require' | 'verify-ca' | 'verify-full';
  /** The Amazon Resource Name (ARN) of the certificate used for SSL connection. */
  CertificateArn?: string;
  /** The path for the Amazon S3 bucket that the application uses for accessing the user-defined schema. */
  S3Path?: string;
  /** The ARN for the role the application uses to access its Amazon S3 bucket. */
  S3AccessRoleArn?: string;
}

export interface MySqlDataProviderSettings {
  /** The name of the MySQL server. */
  ServerName?: string;
  /** The port value for the MySQL data provider. */
  Port?: number;
  /** The SSL mode used to connect to the MySQL data provider. The default value is none. */
  SslMode?: 'none' | 'require' | 'verify-ca' | 'verify-full';
  /** The Amazon Resource Name (ARN) of the certificate used for SSL connection. */
  CertificateArn?: string;
  /** The path for the Amazon S3 bucket that the application uses for accessing the user-defined schema. */
  S3Path?: string;
  /** The ARN for the role the application uses to access its Amazon S3 bucket. */
  S3AccessRoleArn?: string;
}

export interface OracleDataProviderSettings {
  /** The name of the Oracle server. */
  ServerName?: string;
  /** The port value for the Oracle data provider. */
  Port?: number;
  /** The database name on the Oracle data provider. */
  DatabaseName?: string;
  /** The SSL mode used to connect to the Oracle data provider. The default value is none. */
  SslMode?: 'none' | 'require' | 'verify-ca' | 'verify-full';
  /** The Amazon Resource Name (ARN) of the certificate used for SSL connection. */
  CertificateArn?: string;
  /** The address of your Oracle Automatic Storage Management (ASM) server. You can set this value from the asm_server value. You set asm_server as part of the extra connection attribute string to access an */
  AsmServer?: string;
  /** The identifier of the secret in Secrets Manager that contains the Oracle ASM connection details. Required only if your data provider uses the Oracle ASM server. */
  SecretsManagerOracleAsmSecretId?: string;
  /** The ARN of the IAM role that provides access to the secret in Secrets Manager that contains the Oracle ASM connection details. */
  SecretsManagerOracleAsmAccessRoleArn?: string;
  /** The identifier of the secret in Secrets Manager that contains the transparent data encryption (TDE) password. DMS requires this password to access Oracle redo logs encrypted by TDE using Binary Reader */
  SecretsManagerSecurityDbEncryptionSecretId?: string;
  /** The ARN of the IAM role that provides access to the secret in Secrets Manager that contains the TDE password. */
  SecretsManagerSecurityDbEncryptionAccessRoleArn?: string;
  /** The path for the Amazon S3 bucket that the application uses for accessing the user-defined schema. */
  S3Path?: string;
  /** The ARN for the role the application uses to access its Amazon S3 bucket. */
  S3AccessRoleArn?: string;
}

export interface SybaseAseDataProviderSettings {
  /** The name of the SAP ASE server. */
  ServerName?: string;
  /** The port value for the SAP ASE data provider. */
  Port?: number;
  /** The database name on the SAP ASE data provider. */
  DatabaseName?: string;
  /** The SSL mode used to connect to the SAP ASE data provider. The default value is none. */
  SslMode?: 'none' | 'require' | 'verify-ca' | 'verify-full';
  /** Specifies whether to encrypt the password when connecting to the Sybase ASE database. When set to true, the connection password is encrypted during transmission. Default is true. */
  EncryptPassword?: boolean;
  /** The Amazon Resource Name (ARN) of the certificate used for SSL connection. */
  CertificateArn?: string;
}

export interface MicrosoftSqlServerDataProviderSettings {
  /** The name of the Microsoft SQL Server server. */
  ServerName?: string;
  /** The port value for the Microsoft SQL Server data provider. */
  Port?: number;
  /** The database name on the Microsoft SQL Server data provider. */
  DatabaseName?: string;
  /** The SSL mode used to connect to the Microsoft SQL Server data provider. The default value is none. */
  SslMode?: 'none' | 'require' | 'verify-ca' | 'verify-full';
  /** The Amazon Resource Name (ARN) of the certificate used for SSL connection. */
  CertificateArn?: string;
  /** The path for the Amazon S3 bucket that the application uses for accessing the user-defined schema. */
  S3Path?: string;
  /** The ARN for the role the application uses to access its Amazon S3 bucket. */
  S3AccessRoleArn?: string;
}

export interface DocDbDataProviderSettings {
  /** The name of the source DocumentDB server. */
  ServerName?: string;
  /** The port value for the DocumentDB data provider. */
  Port?: number;
  /** The database name on the DocumentDB data provider. */
  DatabaseName?: string;
  /** The SSL mode used to connect to the DocumentDB data provider. The default value is none. */
  SslMode?: 'none' | 'require' | 'verify-ca' | 'verify-full';
  /** The Amazon Resource Name (ARN) of the certificate used for SSL connection. */
  CertificateArn?: string;
}

export interface MariaDbDataProviderSettings {
  /** The name of the MariaDB server. */
  ServerName?: string;
  /** The port value for the MariaDB data provider */
  Port?: number;
  /** The SSL mode used to connect to the MariaDB data provider. The default value is none. */
  SslMode?: 'none' | 'require' | 'verify-ca' | 'verify-full';
  /** The Amazon Resource Name (ARN) of the certificate used for SSL connection. */
  CertificateArn?: string;
  /** The path for the Amazon S3 bucket that the application uses for accessing the user-defined schema. */
  S3Path?: string;
  /** The ARN for the role the application uses to access its Amazon S3 bucket. */
  S3AccessRoleArn?: string;
}

export interface IbmDb2LuwDataProviderSettings {
  /** The name of the DB2 LUW server. */
  ServerName?: string;
  /** The port value for the DB2 LUW data provider. */
  Port?: number;
  /** The database name on the DB2 LUW data provider. */
  DatabaseName?: string;
  /** The SSL mode used to connect to the DB2 LUW data provider. The default value is none. Valid Values: none and verify-ca. */
  SslMode?: 'none' | 'require' | 'verify-ca' | 'verify-full';
  /** The Amazon Resource Name (ARN) of the certificate used for SSL connection. */
  CertificateArn?: string;
  /** The path for the Amazon S3 bucket that the application uses for accessing the user-defined schema. */
  S3Path?: string;
  /** The ARN for the role the application uses to access its Amazon S3 bucket. */
  S3AccessRoleArn?: string;
}

export interface IbmDb2zOsDataProviderSettings {
  /** The name of the DB2 for z/OS server. */
  ServerName?: string;
  /** The port value for the DB2 for z/OS data provider. */
  Port?: number;
  /** The database name on the DB2 for z/OS data provider. */
  DatabaseName?: string;
  /** The SSL mode used to connect to the DB2 for z/OS data provider. The default value is none. Valid Values: none and verify-ca. */
  SslMode?: 'none' | 'require' | 'verify-ca' | 'verify-full';
  /** The Amazon Resource Name (ARN) of the certificate used for SSL connection. */
  CertificateArn?: string;
  /** The path for the Amazon S3 bucket that the application uses for accessing the user-defined schema. */
  S3Path?: string;
  /** The ARN for the role the application uses to access its Amazon S3 bucket. */
  S3AccessRoleArn?: string;
}

export interface MongoDbDataProviderSettings {
  /** The name of the MongoDB server. */
  ServerName?: string;
  /** The port value for the MongoDB data provider. */
  Port?: number;
  /** The database name on the MongoDB data provider. */
  DatabaseName?: string;
  /** The SSL mode used to connect to the MongoDB data provider. The default value is none. */
  SslMode?: 'none' | 'require' | 'verify-ca' | 'verify-full';
  /** The Amazon Resource Name (ARN) of the certificate used for SSL connection. */
  CertificateArn?: string;
  /** The authentication type for the database connection. Valid values are PASSWORD or NO. */
  AuthType?: 'no' | 'password';
  /** The MongoDB database name. This setting isn't used when AuthType is set to "no". The default is "admin". */
  AuthSource?: string;
  /** The authentication method for connecting to the data provider. Valid values are DEFAULT, MONGODB_CR, or SCRAM_SHA_1. */
  AuthMechanism?: 'default' | 'mongodb_cr' | 'scram_sha_1';
}

export interface DynamoDbSettings {
  /** The Amazon Resource Name (ARN) used by the service to access the IAM role. The role must allow the iam:PassRole action. */
  ServiceAccessRoleArn: string;
}

export interface S3Settings {
  /** The Amazon Resource Name (ARN) used by the service to access the IAM role. The role must allow the iam:PassRole action. It is a required parameter that enables DMS to write and read objects from an S3 */
  ServiceAccessRoleArn?: string;
  /** Specifies how tables are defined in the S3 source files only. */
  ExternalTableDefinition?: string;
  /** The delimiter used to separate rows in the .csv file for both source and target. The default is a carriage return (\n). */
  CsvRowDelimiter?: string;
  /** The delimiter used to separate columns in the .csv file for both source and target. The default is a comma. */
  CsvDelimiter?: string;
  /** An optional parameter to set a folder name in the S3 bucket. If provided, tables are created in the path bucketFolder/schema_name/table_name/. If this parameter isn't specified, then the path used is  */
  BucketFolder?: string;
  /** The name of the S3 bucket. */
  BucketName?: string;
  /** An optional parameter to use GZIP to compress the target files. Set to GZIP to compress the target files. Either set this parameter to NONE (the default) or don't use it to leave the files uncompresse */
  CompressionType?: 'none' | 'gzip';
  /** The type of server-side encryption that you want to use for your data. This encryption type is part of the endpoint settings or the extra connections attributes for Amazon S3. You can choose either SS */
  EncryptionMode?: 'sse-s3' | 'sse-kms';
  /** If you are using SSE_KMS for the EncryptionMode, provide the KMS key ID. The key that you use needs an attached policy that enables Identity and Access Management (IAM) user permissions and allows use */
  ServerSideEncryptionKmsKeyId?: string;
  /** The format of the data that you want to use for output. You can choose one of the following: csv : This is a row-based file format with comma-separated values (.csv). parquet : Apache Parquet (.parque */
  DataFormat?: 'csv' | 'parquet';
  /** The type of encoding you are using: RLE_DICTIONARY uses a combination of bit-packing and run-length encoding to store repeated values more efficiently. This is the default. PLAIN doesn't use encoding  */
  EncodingType?: 'plain' | 'plain-dictionary' | 'rle-dictionary';
  /** The maximum size of an encoded dictionary page of a column. If the dictionary page exceeds this, this column is stored using an encoding type of PLAIN. This parameter defaults to 1024 * 1024 bytes (1  */
  DictPageSizeLimit?: number;
  /** The number of rows in a row group. A smaller row group size provides faster reads. But as the number of row groups grows, the slower writes become. This parameter defaults to 10,000 rows. This number  */
  RowGroupLength?: number;
  /** The size of one data page in bytes. This parameter defaults to 1024 * 1024 bytes (1 MiB). This number is used for .parquet file format only. */
  DataPageSize?: number;
  /** The version of the Apache Parquet format that you want to use: parquet_1_0 (the default) or parquet_2_0. */
  ParquetVersion?: 'parquet-1-0' | 'parquet-2-0';
  /** A value that enables statistics for Parquet pages and row groups. Choose true to enable statistics, false to disable. Statistics include NULL, DISTINCT, MAX, and MIN values. This parameter defaults to */
  EnableStatistics?: boolean;
  /** A value that enables a full load to write INSERT operations to the comma-separated value (.csv) or .parquet output files only to indicate how the rows were added to the source database. DMS supports t */
  IncludeOpForFullLoad?: boolean;
  /** A value that enables a change data capture (CDC) load to write only INSERT operations to .csv or columnar storage (.parquet) output files. By default (the false setting), the first field in a .csv or  */
  CdcInsertsOnly?: boolean;
  /** A value that when nonblank causes DMS to add a column with timestamp information to the endpoint data for an Amazon S3 target. DMS supports the TimestampColumnName parameter in versions 3.1.4 and late */
  TimestampColumnName?: string;
  /** A value that specifies the precision of any TIMESTAMP column values that are written to an Amazon S3 object file in .parquet format. DMS supports the ParquetTimestampInMillisecond parameter in version */
  ParquetTimestampInMillisecond?: boolean;
  /** A value that enables a change data capture (CDC) load to write INSERT and UPDATE operations to .csv or .parquet (columnar storage) output files. The default setting is false, but when CdcInsertsAndUpd */
  CdcInsertsAndUpdates?: boolean;
  /** When set to true, this parameter partitions S3 bucket folders based on transaction commit dates. The default value is false. For more information about date-based folder partitioning, see Using date-b */
  DatePartitionEnabled?: boolean;
  /** Identifies the sequence of the date format to use during folder partitioning. The default value is YYYYMMDD. Use this parameter when DatePartitionedEnabled is set to true. */
  DatePartitionSequence?: 'YYYYMMDD' | 'YYYYMMDDHH' | 'YYYYMM' | 'MMYYYYDD' | 'DDMMYYYY';
  /** Specifies a date separating delimiter to use during folder partitioning. The default value is SLASH. Use this parameter when DatePartitionedEnabled is set to true. */
  DatePartitionDelimiter?: 'SLASH' | 'UNDERSCORE' | 'DASH' | 'NONE';
  /** This setting applies if the S3 output files during a change data capture (CDC) load are written in .csv format. If set to true for columns not included in the supplemental log, DMS uses the value spec */
  UseCsvNoSupValue?: boolean;
  /** This setting only applies if your Amazon S3 output files during a change data capture (CDC) load are written in .csv format. If UseCsvNoSupValue is set to true, specify a string value that you want DM */
  CsvNoSupValue?: string;
  /** If set to true, DMS saves the transaction order for a change data capture (CDC) load on the Amazon S3 target specified by CdcPath . For more information, see Capturing data changes (CDC) including tra */
  PreserveTransactions?: boolean;
  /** Specifies the folder path of CDC files. For an S3 source, this setting is required if a task captures change data; otherwise, it's optional. If CdcPath is set, DMS reads CDC files from this path and r */
  CdcPath?: string;
  /** When set to true, this parameter uses the task start time as the timestamp column value instead of the time data is written to target. For full load, when useTaskStartTimeForFullLoadTimestamp is set t */
  UseTaskStartTimeForFullLoadTimestamp?: boolean;
  /** A value that enables DMS to specify a predefined (canned) access control list for objects created in an Amazon S3 bucket as .csv or .parquet files. For more information about Amazon S3 canned ACLs, se */
  CannedAclForObjects?: 'none' | 'private' | 'public-read' | 'public-read-write' | 'authenticated-read' | 'aws-exec-read' | 'bucket-owner-read' | 'bucket-owner-full-control';
  /** An optional parameter that, when set to true or y, you can use to add column name information to the .csv output file. The default value is false. Valid values are true, false, y, and n. */
  AddColumnName?: boolean;
  /** Maximum length of the interval, defined in seconds, after which to output a file to Amazon S3. When CdcMaxBatchInterval and CdcMinFileSize are both specified, the file write is triggered by whichever  */
  CdcMaxBatchInterval?: number;
  /** Minimum file size, defined in kilobytes, to reach for a file output to Amazon S3. When CdcMinFileSize and CdcMaxBatchInterval are both specified, the file write is triggered by whichever parameter con */
  CdcMinFileSize?: number;
  /** An optional parameter that specifies how DMS treats null values. While handling the null value, you can use this parameter to pass a user-defined string as null when writing to the target. For example */
  CsvNullValue?: string;
  /** When this value is set to 1, DMS ignores the first row header in a .csv file. A value of 1 turns on the feature; a value of 0 turns off the feature. The default is 0. */
  IgnoreHeaderRows?: number;
  /** A value that specifies the maximum size (in KB) of any .csv file to be created while migrating to an S3 target during full load. The default value is 1,048,576 KB (1 GB). Valid values include 1 to 1,0 */
  MaxFileSize?: number;
  /** For an S3 source, when this value is set to true or y, each leading double quotation mark has to be followed by an ending double quotation mark. This formatting complies with RFC 4180. When this value */
  Rfc4180?: boolean;
  /** When creating an S3 target endpoint, set DatePartitionTimezone to convert the current UTC time into a specified time zone. The conversion occurs when a date partition folder is created and a CDC filen */
  DatePartitionTimezone?: string;
  /** Use the S3 target endpoint setting AddTrailingPaddingCharacter to add padding on string data. The default value is false. */
  AddTrailingPaddingCharacter?: boolean;
  /** To specify a bucket owner and prevent sniping, you can use the ExpectedBucketOwner endpoint setting. Example: --s3-settings='{"ExpectedBucketOwner": "AWS_Account_ID"}' When you make a request to test  */
  ExpectedBucketOwner?: string;
  /** When true, allows Glue to catalog your S3 bucket. Creating an Glue catalog lets you use Athena to query your data. */
  GlueCatalogGeneration?: boolean;
}

export interface DmsTransferSettings {
  /** The Amazon Resource Name (ARN) used by the service access IAM role. The role must allow the iam:PassRole action. */
  ServiceAccessRoleArn?: string;
  /** The name of the S3 bucket to use. */
  BucketName?: string;
}

export interface MongoDbSettings {
  /** The user name you use to access the MongoDB source endpoint. */
  Username?: string;
  /** The password for the user account you use to access the MongoDB source endpoint. */
  Password?: string;
  /** The name of the server on the MongoDB source endpoint. For MongoDB Atlas, provide the server name for any of the servers in the replication set. */
  ServerName?: string;
  /** The port value for the MongoDB source endpoint. */
  Port?: number;
  /** The database name on the MongoDB source endpoint. */
  DatabaseName?: string;
  /** The authentication type you use to access the MongoDB source endpoint. When when set to "no", user name and password parameters are not used and can be empty. */
  AuthType?: 'no' | 'password';
  /** The authentication mechanism you use to access the MongoDB source endpoint. For the default value, in MongoDB version 2.x, "default" is "mongodb_cr". For MongoDB version 3.x or later, "default" is "sc */
  AuthMechanism?: 'default' | 'mongodb_cr' | 'scram_sha_1';
  /** Specifies either document or table mode. Default value is "none". Specify "none" to use document mode. Specify "one" to use table mode. */
  NestingLevel?: 'none' | 'one';
  /** Specifies the document ID. Use this setting when NestingLevel is set to "none". Default value is "false". */
  ExtractDocId?: string;
  /** Indicates the number of documents to preview to determine the document organization. Use this setting when NestingLevel is set to "one". Must be a positive value greater than 0. Default value is 1000. */
  DocsToInvestigate?: string;
  /** The MongoDB database name. This setting isn't used when AuthType is set to "no". The default is "admin". */
  AuthSource?: string;
  /** The KMS key identifier that is used to encrypt the content on the replication instance. If you don't specify a value for the KmsKeyId parameter, then DMS uses your default encryption key. KMS creates  */
  KmsKeyId?: string;
  /** The full Amazon Resource Name (ARN) of the IAM role that specifies DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the ia */
  SecretsManagerAccessRoleArn?: string;
  /** The full ARN, partial ARN, or friendly name of the SecretsManagerSecret that contains the MongoDB endpoint connection details. */
  SecretsManagerSecretId?: string;
  /** If true, DMS retrieves the entire document from the MongoDB source during migration. This may cause a migration failure if the server response exceeds bandwidth limits. To fetch only updates and delet */
  UseUpdateLookUp?: boolean;
  /** If true, DMS replicates data to shard collections. DMS only uses this setting if the target endpoint is a DocumentDB elastic cluster. When this setting is true, note the following: You must set Target */
  ReplicateShardCollections?: boolean;
}

export interface KinesisSettings {
  /** The Amazon Resource Name (ARN) for the Amazon Kinesis Data Streams endpoint. */
  StreamArn?: string;
  /** The output format for the records created on the endpoint. The message format is JSON (default) or JSON_UNFORMATTED (a single line with no tab). */
  MessageFormat?: 'json' | 'json-unformatted';
  /** The Amazon Resource Name (ARN) for the IAM role that DMS uses to write to the Kinesis data stream. The role must allow the iam:PassRole action. */
  ServiceAccessRoleArn?: string;
  /** Provides detailed transaction information from the source database. This information includes a commit timestamp, a log position, and values for transaction_id, previous transaction_id, and transactio */
  IncludeTransactionDetails?: boolean;
  /** Shows the partition value within the Kinesis message output, unless the partition type is schema-table-type. The default is false. */
  IncludePartitionValue?: boolean;
  /** Prefixes schema and table names to partition values, when the partition type is primary-key-type. Doing this increases data distribution among Kinesis shards. For example, suppose that a SysBench sche */
  PartitionIncludeSchemaTable?: boolean;
  /** Includes any data definition language (DDL) operations that change the table in the control data, such as rename-table, drop-table, add-column, drop-column, and rename-column. The default is false. */
  IncludeTableAlterOperations?: boolean;
  /** Shows detailed control information for table definition, column definition, and table and column changes in the Kinesis message output. The default is false. */
  IncludeControlDetails?: boolean;
  /** Include NULL and empty columns for records migrated to the endpoint. The default is false. */
  IncludeNullAndEmpty?: boolean;
  /** Set this optional parameter to true to avoid adding a '0x' prefix to raw data in hexadecimal format. For example, by default, DMS adds a '0x' prefix to the LOB column type in hexadecimal format moving */
  NoHexPrefix?: boolean;
  /** Specifies using the large integer value with Kinesis. */
  UseLargeIntegerValue?: boolean;
}

export interface KafkaSettings {
  /** A comma-separated list of one or more broker locations in your Kafka cluster that host your Kafka instance. Specify each broker location in the form broker-hostname-or-ip:port . For example, "ec2-12-3 */
  Broker?: string;
  /** The topic to which you migrate the data. If you don't specify a topic, DMS specifies "kafka-default-topic" as the migration topic. */
  Topic?: string;
  /** The output format for the records created on the endpoint. The message format is JSON (default) or JSON_UNFORMATTED (a single line with no tab). */
  MessageFormat?: 'json' | 'json-unformatted';
  /** Provides detailed transaction information from the source database. This information includes a commit timestamp, a log position, and values for transaction_id, previous transaction_id, and transactio */
  IncludeTransactionDetails?: boolean;
  /** Shows the partition value within the Kafka message output unless the partition type is schema-table-type. The default is false. */
  IncludePartitionValue?: boolean;
  /** Prefixes schema and table names to partition values, when the partition type is primary-key-type. Doing this increases data distribution among Kafka partitions. For example, suppose that a SysBench sc */
  PartitionIncludeSchemaTable?: boolean;
  /** Includes any data definition language (DDL) operations that change the table in the control data, such as rename-table, drop-table, add-column, drop-column, and rename-column. The default is false. */
  IncludeTableAlterOperations?: boolean;
  /** Shows detailed control information for table definition, column definition, and table and column changes in the Kafka message output. The default is false. */
  IncludeControlDetails?: boolean;
  /** The maximum size in bytes for records created on the endpoint The default is 1,000,000. */
  MessageMaxBytes?: number;
  /** Include NULL and empty columns for records migrated to the endpoint. The default is false. */
  IncludeNullAndEmpty?: boolean;
  /** Set secure connection to a Kafka target endpoint using Transport Layer Security (TLS). Options include ssl-encryption, ssl-authentication, and sasl-ssl. sasl-ssl requires SaslUsername and SaslPassword */
  SecurityProtocol?: 'plaintext' | 'ssl-authentication' | 'ssl-encryption' | 'sasl-ssl';
  /** The Amazon Resource Name (ARN) of the client certificate used to securely connect to a Kafka target endpoint. */
  SslClientCertificateArn?: string;
  /** The Amazon Resource Name (ARN) for the client private key used to securely connect to a Kafka target endpoint. */
  SslClientKeyArn?: string;
  /** The password for the client private key used to securely connect to a Kafka target endpoint. */
  SslClientKeyPassword?: string;
  /** The Amazon Resource Name (ARN) for the private certificate authority (CA) cert that DMS uses to securely connect to your Kafka target endpoint. */
  SslCaCertificateArn?: string;
  /** The secure user name you created when you first set up your MSK cluster to validate a client identity and make an encrypted connection between server and client using SASL-SSL authentication. */
  SaslUsername?: string;
  /** The secure password you created when you first set up your MSK cluster to validate a client identity and make an encrypted connection between server and client using SASL-SSL authentication. */
  SaslPassword?: string;
  /** Set this optional parameter to true to avoid adding a '0x' prefix to raw data in hexadecimal format. For example, by default, DMS adds a '0x' prefix to the LOB column type in hexadecimal format moving */
  NoHexPrefix?: boolean;
  /** For SASL/SSL authentication, DMS supports the SCRAM-SHA-512 mechanism by default. DMS versions 3.5.0 and later also support the PLAIN mechanism. To use the PLAIN mechanism, set this parameter to PLAIN */
  SaslMechanism?: 'scram-sha-512' | 'plain';
  /** Sets hostname verification for the certificate. This setting is supported in DMS version 3.5.1 and later. */
  SslEndpointIdentificationAlgorithm?: 'none' | 'https';
  /** Specifies using the large integer value with Kafka. */
  UseLargeIntegerValue?: boolean;
}

export interface ElasticsearchSettings {
  /** The Amazon Resource Name (ARN) used by the service to access the IAM role. The role must allow the iam:PassRole action. */
  ServiceAccessRoleArn: string;
  /** The endpoint for the OpenSearch cluster. DMS uses HTTPS if a transport protocol (http/https) is not specified. */
  EndpointUri: string;
  /** The maximum percentage of records that can fail to be written before a full load operation stops. To avoid early failure, this counter is only effective after 1000 records are transferred. OpenSearch  */
  FullLoadErrorPercentage?: number;
  /** The maximum number of seconds for which DMS retries failed API requests to the OpenSearch cluster. */
  ErrorRetryDuration?: number;
  /** Set this option to true for DMS to migrate documentation using the documentation type _doc. OpenSearch and an Elasticsearch cluster only support the _doc documentation type in versions 7. x and later. */
  UseNewMappingType?: boolean;
}

export interface NeptuneSettings {
  /** The Amazon Resource Name (ARN) of the service role that you created for the Neptune target endpoint. The role must allow the iam:PassRole action. For more information, see Creating an IAM Service Role */
  ServiceAccessRoleArn?: string;
  /** The name of the Amazon S3 bucket where DMS can temporarily store migrated graph data in .csv files before bulk-loading it to the Neptune target database. DMS maps the SQL source data to graph data bef */
  S3BucketName: string;
  /** A folder path where you want DMS to store migrated graph data in the S3 bucket specified by S3BucketName */
  S3BucketFolder: string;
  /** The number of milliseconds for DMS to wait to retry a bulk-load of migrated graph data to the Neptune target database before raising an error. The default is 250. */
  ErrorRetryDuration?: number;
  /** The maximum size in kilobytes of migrated graph data stored in a .csv file before DMS bulk-loads the data to the Neptune target database. The default is 1,048,576 KB. If the bulk load is successful, D */
  MaxFileSize?: number;
  /** The number of times for DMS to retry a bulk load of migrated graph data to the Neptune target database before raising an error. The default is 5. */
  MaxRetryCount?: number;
  /** If you want Identity and Access Management (IAM) authorization enabled for this endpoint, set this parameter to true. Then attach the appropriate IAM policy document to your service role specified by  */
  IamAuthEnabled?: boolean;
}

export interface RedshiftSettings {
  /** A value that indicates to allow any date format, including invalid formats such as 00/00/00 00:00:00, to be loaded without generating an error. You can choose true or false (the default). This paramet */
  AcceptAnyDate?: boolean;
  /** Code to run after connecting. This parameter should contain the code itself, not the name of a file containing the code. */
  AfterConnectScript?: string;
  /** An S3 folder where the comma-separated-value (.csv) files are stored before being uploaded to the target Redshift cluster. For full load mode, DMS converts source records into .csv files and loads the */
  BucketFolder?: string;
  /** The name of the intermediate S3 bucket used to store .csv files before uploading data to Redshift. */
  BucketName?: string;
  /** If Amazon Redshift is configured to support case sensitive schema names, set CaseSensitiveNames to true. The default is false. */
  CaseSensitiveNames?: boolean;
  /** If you set CompUpdate to true Amazon Redshift applies automatic compression if the table is empty. This applies even if the table columns already have encodings other than RAW. If you set CompUpdate t */
  CompUpdate?: boolean;
  /** A value that sets the amount of time to wait (in milliseconds) before timing out, beginning from when you initially establish a connection. */
  ConnectionTimeout?: number;
  /** The name of the Amazon Redshift data warehouse (service) that you are working with. */
  DatabaseName?: string;
  /** The date format that you are using. Valid values are auto (case-sensitive), your date format string enclosed in quotes, or NULL. If this parameter is left unset (NULL), it defaults to a format of 'YYY */
  DateFormat?: string;
  /** A value that specifies whether DMS should migrate empty CHAR and VARCHAR fields as NULL. A value of true sets empty CHAR and VARCHAR fields to null. The default is false. */
  EmptyAsNull?: boolean;
  /** The type of server-side encryption that you want to use for your data. This encryption type is part of the endpoint settings or the extra connections attributes for Amazon S3. You can choose either SS */
  EncryptionMode?: 'sse-s3' | 'sse-kms';
  /** This setting is only valid for a full-load migration task. Set ExplicitIds to true to have tables with IDENTITY columns override their auto-generated values with explicit values loaded from the source */
  ExplicitIds?: boolean;
  /** The number of threads used to upload a single file. This parameter accepts a value from 1 through 64. It defaults to 10. The number of parallel streams used to upload a single .csv file to an S3 bucke */
  FileTransferUploadStreams?: number;
  /** The amount of time to wait (in milliseconds) before timing out of operations performed by DMS on a Redshift cluster, such as Redshift COPY, INSERT, DELETE, and UPDATE. */
  LoadTimeout?: number;
  /** The maximum size (in KB) of any .csv file used to load data on an S3 bucket and transfer data to Amazon Redshift. It defaults to 1048576KB (1 GB). */
  MaxFileSize?: number;
  /** The password for the user named in the username property. */
  Password?: string;
  /** The port number for Amazon Redshift. The default value is 5439. */
  Port?: number;
  /** A value that specifies to remove surrounding quotation marks from strings in the incoming data. All characters within the quotation marks, including delimiters, are retained. Choose true to remove quo */
  RemoveQuotes?: boolean;
  /** A list of characters that you want to replace. Use with ReplaceChars. */
  ReplaceInvalidChars?: string;
  /** A value that specifies to replaces the invalid characters specified in ReplaceInvalidChars, substituting the specified characters instead. The default is "?". */
  ReplaceChars?: string;
  /** The name of the Amazon Redshift cluster you are using. */
  ServerName?: string;
  /** The Amazon Resource Name (ARN) of the IAM role that has access to the Amazon Redshift service. The role must allow the iam:PassRole action. */
  ServiceAccessRoleArn?: string;
  /** The KMS key ID. If you are using SSE_KMS for the EncryptionMode, provide this key ID. The key that you use needs an attached policy that enables IAM user permissions and allows use of the key. */
  ServerSideEncryptionKmsKeyId?: string;
  /** The time format that you want to use. Valid values are auto (case-sensitive), 'timeformat_string', 'epochsecs', or 'epochmillisecs'. It defaults to 10. Using auto recognizes most strings, even some th */
  TimeFormat?: string;
  /** A value that specifies to remove the trailing white space characters from a VARCHAR string. This parameter applies only to columns with a VARCHAR data type. Choose true to remove unneeded white space. */
  TrimBlanks?: boolean;
  /** A value that specifies to truncate data in columns to the appropriate number of characters, so that the data fits in the column. This parameter applies only to columns with a VARCHAR or CHAR data type */
  TruncateColumns?: boolean;
  /** An Amazon Redshift user name for a registered user. */
  Username?: string;
  /** The size (in KB) of the in-memory file write buffer used when generating .csv files on the local disk at the DMS replication instance. The default value is 1000 (buffer size is 1000KB). */
  WriteBufferSize?: number;
  /** The full Amazon Resource Name (ARN) of the IAM role that specifies DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the ia */
  SecretsManagerAccessRoleArn?: string;
  /** The full ARN, partial ARN, or friendly name of the SecretsManagerSecret that contains the Amazon Redshift endpoint connection details. */
  SecretsManagerSecretId?: string;
  /** When true, lets Redshift migrate the boolean type as boolean. By default, Redshift migrates booleans as varchar(1). You must set this setting on both the source and target endpoints for it to take eff */
  MapBooleanAsBoolean?: boolean;
}

export interface PostgreSQLSettings {
  /** For use with change data capture (CDC) only, this attribute has DMS bypass foreign keys and user triggers to reduce the time it takes to bulk load data. Example: afterConnectScript=SET session_replica */
  AfterConnectScript?: string;
  /** To capture DDL events, DMS creates various artifacts in the PostgreSQL database when the task starts. You can later remove these artifacts. The default value is true. If this value is set to N, you do */
  CaptureDdls?: boolean;
  /** Specifies the maximum size (in KB) of any .csv file used to transfer data to PostgreSQL. The default value is 32,768 KB (32 MB). Example: maxFileSize=512 */
  MaxFileSize?: number;
  /** Database name for the endpoint. */
  DatabaseName?: string;
  /** The schema in which the operational DDL database artifacts are created. The default value is public. Example: ddlArtifactsSchema=xyzddlschema; */
  DdlArtifactsSchema?: string;
  /** Sets the client statement timeout for the PostgreSQL instance, in seconds. The default value is 60 seconds. Example: executeTimeout=100; */
  ExecuteTimeout?: number;
  /** When set to true, this value causes a task to fail if the actual size of a LOB column is greater than the specified LobMaxSize. The default value is false. If task is set to Limited LOB mode and this  */
  FailTasksOnLobTruncation?: boolean;
  /** The write-ahead log (WAL) heartbeat feature mimics a dummy transaction. By doing this, it prevents idle logical replication slots from holding onto old WAL logs, which can result in storage full situa */
  HeartbeatEnable?: boolean;
  /** Sets the schema in which the heartbeat artifacts are created. The default value is public. */
  HeartbeatSchema?: string;
  /** Sets the WAL heartbeat frequency (in minutes). The default value is 5 minutes. */
  HeartbeatFrequency?: number;
  /** Endpoint connection password. */
  Password?: string;
  /** Endpoint TCP port. The default is 5432. */
  Port?: number;
  /** The host name of the endpoint database. For an Amazon RDS PostgreSQL instance, this is the output of DescribeDBInstances, in the Endpoint.Address field. For an Aurora PostgreSQL instance, this is the  */
  ServerName?: string;
  /** Endpoint connection user name. */
  Username?: string;
  /** Sets the name of a previously created logical replication slot for a change data capture (CDC) load of the PostgreSQL source instance. When used with the CdcStartPosition request parameter for the DMS */
  SlotName?: string;
  /** Specifies the plugin to use to create a replication slot. The default value is pglogical. */
  PluginName?: 'no-preference' | 'test-decoding' | 'pglogical';
  /** The full Amazon Resource Name (ARN) of the IAM role that specifies DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the ia */
  SecretsManagerAccessRoleArn?: string;
  /** The full ARN, partial ARN, or friendly name of the SecretsManagerSecret that contains the PostgreSQL endpoint connection details. */
  SecretsManagerSecretId?: string;
  /** Use the TrimSpaceInChar source endpoint setting to trim data on CHAR and NCHAR data types during migration. The default value is true. */
  TrimSpaceInChar?: boolean;
  /** When true, lets PostgreSQL migrate the boolean type as boolean. By default, PostgreSQL migrates booleans as varchar(5). You must set this setting on both the source and target endpoints for it to take */
  MapBooleanAsBoolean?: boolean;
  /** When true, DMS migrates JSONB values as CLOB. The default value is false. */
  MapJsonbAsClob?: boolean;
  /** Sets what datatype to map LONG values as. The default value is wstring. */
  MapLongVarcharAs?: 'wstring' | 'clob' | 'nclob';
  /** Specifies the default behavior of the replication's handling of PostgreSQL- compatible endpoints that require some additional configuration, such as Babelfish endpoints. */
  DatabaseMode?: 'default' | 'babelfish';
  /** The Babelfish for Aurora PostgreSQL database name for the endpoint. */
  BabelfishDatabaseName?: string;
  /** Disables the Unicode source filter with PostgreSQL, for values passed into the Selection rule filter on Source Endpoint column values. By default DMS performs source filter comparisons using a Unicode */
  DisableUnicodeSourceFilter?: boolean;
  /** The IAM role arn you can use to authenticate the connection to your endpoint. Ensure to include iam:PassRole and rds-db:connect actions in permission policy. */
  ServiceAccessRoleArn?: string;
  /** This attribute allows you to specify the authentication method as "iam auth". */
  AuthenticationMethod?: 'password' | 'iam';
}

export interface MySQLSettings {
  /** Specifies a script to run immediately after DMS connects to the endpoint. The migration task continues running regardless if the SQL statement succeeds or fails. For this parameter, provide the code o */
  AfterConnectScript?: string;
  /** Cleans and recreates table metadata information on the replication instance when a mismatch occurs. For example, in a situation where running an alter DDL on the table could result in different inform */
  CleanSourceMetadataOnMismatch?: boolean;
  /** Database name for the endpoint. For a MySQL source or target endpoint, don't explicitly specify the database using the DatabaseName request parameter on either the CreateEndpoint or ModifyEndpoint API */
  DatabaseName?: string;
  /** Specifies how often to check the binary log for new changes/events when the database is idle. The default is five seconds. Example: eventsPollInterval=5; In the example, DMS checks for changes in the  */
  EventsPollInterval?: number;
  /** Specifies where to migrate source tables on the target, either to a single database or multiple databases. If you specify SPECIFIC_DATABASE, specify the database name using the DatabaseName parameter  */
  TargetDbType?: 'specific-database' | 'multiple-databases';
  /** Specifies the maximum size (in KB) of any .csv file used to transfer data to a MySQL-compatible database. Example: maxFileSize=512 */
  MaxFileSize?: number;
  /** Improves performance when loading data into the MySQL-compatible target database. Specifies how many threads to use to load the data into the MySQL-compatible target database. Setting a large number o */
  ParallelLoadThreads?: number;
  /** Endpoint connection password. */
  Password?: string;
  /** Endpoint TCP port. */
  Port?: number;
  /** The host name of the endpoint database. For an Amazon RDS MySQL instance, this is the output of DescribeDBInstances, in the Endpoint.Address field. For an Aurora MySQL instance, this is the output of  */
  ServerName?: string;
  /** Specifies the time zone for the source MySQL database. Example: serverTimezone=US/Pacific; Note: Do not enclose time zones in single quotes. */
  ServerTimezone?: string;
  /** Endpoint connection user name. */
  Username?: string;
  /** The full Amazon Resource Name (ARN) of the IAM role that specifies DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the ia */
  SecretsManagerAccessRoleArn?: string;
  /** The full ARN, partial ARN, or friendly name of the SecretsManagerSecret that contains the MySQL endpoint connection details. */
  SecretsManagerSecretId?: string;
  /** Sets the client statement timeout (in seconds) for a MySQL source endpoint. */
  ExecuteTimeout?: number;
  /** The IAM role you can use to authenticate when connecting to your endpoint. Ensure to include iam:PassRole and rds-db:connect actions in permission policy. */
  ServiceAccessRoleArn?: string;
  /** This attribute allows you to specify the authentication method as "iam auth". */
  AuthenticationMethod?: 'password' | 'iam';
}

export interface OracleSettings {
  /** Set this attribute to set up table-level supplemental logging for the Oracle database. This attribute enables PRIMARY KEY supplemental logging on all tables selected for a migration task. If you use t */
  AddSupplementalLogging?: boolean;
  /** Specifies the ID of the destination for the archived redo logs. This value should be the same as a number in the dest_id column of the v$archived_log view. If you work with an additional redo log dest */
  ArchivedLogDestId?: number;
  /** Set this attribute with ArchivedLogDestId in a primary/ standby setup. This attribute is useful in the case of a switchover. In this case, DMS needs to know which destination to get archive redo logs  */
  AdditionalArchivedLogDestId?: number;
  /** Specifies the IDs of one more destinations for one or more archived redo logs. These IDs are the values of the dest_id column in the v$archived_log view. Use this setting with the archivedLogDestId ex */
  ExtraArchivedLogDestIds?: number[];
  /** Set this attribute to true to enable replication of Oracle tables containing columns that are nested tables or defined types. */
  AllowSelectNestedTables?: boolean;
  /** Set this attribute to change the number of threads that DMS configures to perform a change data capture (CDC) load using Oracle Automatic Storage Management (ASM). You can specify an integer value bet */
  ParallelAsmReadThreads?: number;
  /** Set this attribute to change the number of read-ahead blocks that DMS configures to perform a change data capture (CDC) load using Oracle Automatic Storage Management (ASM). You can specify an integer */
  ReadAheadBlocks?: number;
  /** Set this attribute to false in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source. This tells the DMS instance to not access redo logs through any specifi */
  AccessAlternateDirectly?: boolean;
  /** Set this attribute to true in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source. This tells the DMS instance to use any specified prefix replacement to a */
  UseAlternateFolderForOnline?: boolean;
  /** Set this string attribute to the required value in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source. This value specifies the default Oracle root used t */
  OraclePathPrefix?: string;
  /** Set this string attribute to the required value in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source. This value specifies the path prefix used to replac */
  UsePathPrefix?: string;
  /** Set this attribute to true in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source. This setting tells DMS instance to replace the default Oracle root with  */
  ReplacePathPrefix?: boolean;
  /** Set this attribute to enable homogenous tablespace replication and create existing tables or indexes under the same tablespace on the target. */
  EnableHomogenousTablespace?: boolean;
  /** When set to true, this attribute helps to increase the commit rate on the Oracle target database by writing directly to tables and not writing a trail to database logs. */
  DirectPathNoLog?: boolean;
  /** When this field is set to True, DMS only accesses the archived redo logs. If the archived redo logs are stored on Automatic Storage Management (ASM) only, the DMS user account needs to be granted ASM  */
  ArchivedLogsOnly?: boolean;
  /** For an Oracle source endpoint, your Oracle Automatic Storage Management (ASM) password. You can set this value from the asm_user_password value. You set this value as part of the comma-separated value */
  AsmPassword?: string;
  /** For an Oracle source endpoint, your ASM server address. You can set this value from the asm_server value. You set asm_server as part of the extra connection attribute string to access an Oracle server */
  AsmServer?: string;
  /** For an Oracle source endpoint, your ASM user name. You can set this value from the asm_user value. You set asm_user as part of the extra connection attribute string to access an Oracle server with Bin */
  AsmUser?: string;
  /** Specifies whether the length of a character column is in bytes or in characters. To indicate that the character column length is in characters, set this attribute to CHAR. Otherwise, the character col */
  CharLengthSemantics?: 'default' | 'char' | 'byte';
  /** Database name for the endpoint. */
  DatabaseName?: string;
  /** When set to true, this attribute specifies a parallel load when useDirectPathFullLoad is set to Y. This attribute also only applies when you use the DMS parallel load feature. Note that the target tab */
  DirectPathParallelLoad?: boolean;
  /** When set to true, this attribute causes a task to fail if the actual size of an LOB column is greater than the specified LobMaxSize. If a task is set to limited LOB mode and this option is set to true */
  FailTasksOnLobTruncation?: boolean;
  /** Specifies the number scale. You can select a scale up to 38, or you can select FLOAT. By default, the NUMBER data type is converted to precision 38, scale 10. Example: numberDataTypeScale=12 */
  NumberDatatypeScale?: number;
  /** Endpoint connection password. */
  Password?: string;
  /** Endpoint TCP port. */
  Port?: number;
  /** When set to true, this attribute supports tablespace replication. */
  ReadTableSpaceName?: boolean;
  /** Specifies the number of seconds that the system waits before resending a query. Example: retryInterval=6; */
  RetryInterval?: number;
  /** For an Oracle source endpoint, the transparent data encryption (TDE) password required by AWM DMS to access Oracle redo logs encrypted by TDE using Binary Reader. It is also the TDE_Password part of t */
  SecurityDbEncryption?: string;
  /** For an Oracle source endpoint, the name of a key used for the transparent data encryption (TDE) of the columns and tablespaces in an Oracle source database that is encrypted using TDE. The key value i */
  SecurityDbEncryptionName?: string;
  /** Fully qualified domain name of the endpoint. For an Amazon RDS Oracle instance, this is the output of DescribeDBInstances, in the Endpoint.Address field. */
  ServerName?: string;
  /** Use this attribute to convert SDO_GEOMETRY to GEOJSON format. By default, DMS calls the SDO2GEOJSON custom function if present and accessible. Or you can create your own custom function that mimics th */
  SpatialDataOptionToGeoJsonFunctionName?: string;
  /** Use this attribute to specify a time in minutes for the delay in standby sync. If the source is an Oracle Active Data Guard standby database, use this attribute to specify the time lag between primary */
  StandbyDelayTime?: number;
  /** Endpoint connection user name. */
  Username?: string;
  /** Set this attribute to True to capture change data using the Binary Reader utility. Set UseLogminerReader to False to set this attribute to True. To use Binary Reader with Amazon RDS for Oracle as the  */
  UseBFile?: boolean;
  /** Set this attribute to True to have DMS use a direct path full load. Specify this value to use the direct path protocol in the Oracle Call Interface (OCI). By using this OCI protocol, you can bulk-load */
  UseDirectPathFullLoad?: boolean;
  /** Set this attribute to True to capture change data using the Oracle LogMiner utility (the default). Set this attribute to False if you want to access the redo logs as a binary file. When you set UseLog */
  UseLogminerReader?: boolean;
  /** The full Amazon Resource Name (ARN) of the IAM role that specifies DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the ia */
  SecretsManagerAccessRoleArn?: string;
  /** The full ARN, partial ARN, or friendly name of the SecretsManagerSecret that contains the Oracle endpoint connection details. */
  SecretsManagerSecretId?: string;
  /** Required only if your Oracle endpoint uses Automatic Storage Management (ASM). The full ARN of the IAM role that specifies DMS as the trusted entity and grants the required permissions to access the S */
  SecretsManagerOracleAsmAccessRoleArn?: string;
  /** Required only if your Oracle endpoint uses Automatic Storage Management (ASM). The full ARN, partial ARN, or friendly name of the SecretsManagerOracleAsmSecret that contains the Oracle ASM connection  */
  SecretsManagerOracleAsmSecretId?: string;
  /** Use the TrimSpaceInChar source endpoint setting to trim data on CHAR and NCHAR data types during migration. The default value is true. */
  TrimSpaceInChar?: boolean;
  /** When true, converts timestamps with the timezone datatype to their UTC value. */
  ConvertTimestampWithZoneToUTC?: boolean;
  /** The timeframe in minutes to check for open transactions for a CDC-only task. You can specify an integer value between 0 (the default) and 240 (the maximum). This parameter is only valid in DMS version */
  OpenTransactionWindow?: number;
  /** Specifies the authentication method to be used with Oracle. */
  AuthenticationMethod?: 'password' | 'kerberos';
}

export interface SybaseSettings {
  /** Database name for the endpoint. */
  DatabaseName?: string;
  /** Endpoint connection password. */
  Password?: string;
  /** Endpoint TCP port. The default is 5000. */
  Port?: number;
  /** Fully qualified domain name of the endpoint. */
  ServerName?: string;
  /** Endpoint connection user name. */
  Username?: string;
  /** The full Amazon Resource Name (ARN) of the IAM role that specifies DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the ia */
  SecretsManagerAccessRoleArn?: string;
  /** The full ARN, partial ARN, or friendly name of the SecretsManagerSecret that contains the SAP SAE endpoint connection details. */
  SecretsManagerSecretId?: string;
}

export interface MicrosoftSQLServerSettings {
  /** Endpoint TCP port. */
  Port?: number;
  /** The maximum size of the packets (in bytes) used to transfer data using BCP. */
  BcpPacketSize?: number;
  /** Database name for the endpoint. */
  DatabaseName?: string;
  /** Specifies a file group for the DMS internal tables. When the replication task starts, all the internal DMS control tables (awsdms_ apply_exception, awsdms_apply, awsdms_changes) are created for the sp */
  ControlTablesFileGroup?: string;
  /** Endpoint connection password. */
  Password?: string;
  /** Cleans and recreates table metadata information on the replication instance when a mismatch occurs. An example is a situation where running an alter DDL statement on a table might result in different  */
  QuerySingleAlwaysOnNode?: boolean;
  /** When this attribute is set to Y, DMS only reads changes from transaction log backups and doesn't read from the active transaction log file during ongoing replication. Setting this parameter to Y enabl */
  ReadBackupOnly?: boolean;
  /** Use this attribute to minimize the need to access the backup log and enable DMS to prevent truncation using one of the following two methods. Start transactions in the database: This is the default me */
  SafeguardPolicy?: 'rely-on-sql-server-replication-agent' | 'exclusive-automatic-truncation' | 'shared-automatic-truncation';
  /** Fully qualified domain name of the endpoint. For an Amazon RDS SQL Server instance, this is the output of DescribeDBInstances, in the Endpoint.Address field. */
  ServerName?: string;
  /** Endpoint connection user name. */
  Username?: string;
  /** Use this to attribute to transfer data for full-load operations using BCP. When the target table contains an identity column that does not exist in the source table, you must disable the use BCP for l */
  UseBcpFullLoad?: boolean;
  /** When this attribute is set to Y, DMS processes third-party transaction log backups if they are created in native format. */
  UseThirdPartyBackupDevice?: boolean;
  /** The full Amazon Resource Name (ARN) of the IAM role that specifies DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the ia */
  SecretsManagerAccessRoleArn?: string;
  /** The full ARN, partial ARN, or friendly name of the SecretsManagerSecret that contains the SQL Server endpoint connection details. */
  SecretsManagerSecretId?: string;
  /** Use the TrimSpaceInChar source endpoint setting to right-trim data on CHAR and NCHAR data types during migration. Setting TrimSpaceInChar does not left-trim data. The default value is true. */
  TrimSpaceInChar?: boolean;
  /** Indicates the mode used to fetch CDC data. */
  TlogAccessMode?: 'BackupOnly' | 'PreferBackup' | 'PreferTlog' | 'TlogOnly';
  /** Forces LOB lookup on inline LOB. */
  ForceLobLookup?: boolean;
  /** Specifies the authentication method to be used with Microsoft SQL Server. */
  AuthenticationMethod?: 'password' | 'kerberos';
}

export interface IBMDb2Settings {
  /** Database name for the endpoint. */
  DatabaseName?: string;
  /** Endpoint connection password. */
  Password?: string;
  /** Endpoint TCP port. The default value is 50000. */
  Port?: number;
  /** Fully qualified domain name of the endpoint. */
  ServerName?: string;
  /** Enables ongoing replication (CDC) as a BOOLEAN value. The default is true. */
  SetDataCaptureChanges?: boolean;
  /** For ongoing replication (CDC), use CurrentLSN to specify a log sequence number (LSN) where you want the replication to start. */
  CurrentLsn?: string;
  /** Maximum number of bytes per read, as a NUMBER value. The default is 64 KB. */
  MaxKBytesPerRead?: number;
  /** Endpoint connection user name. */
  Username?: string;
  /** The full Amazon Resource Name (ARN) of the IAM role that specifies DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the ia */
  SecretsManagerAccessRoleArn?: string;
  /** The full ARN, partial ARN, or friendly name of the SecretsManagerSecret that contains the Db2 LUW endpoint connection details. */
  SecretsManagerSecretId?: string;
  /** The amount of time (in milliseconds) before DMS times out operations performed by DMS on the Db2 target. The default value is 1200 (20 minutes). */
  LoadTimeout?: number;
  /** The size (in KB) of the in-memory file write buffer used when generating .csv files on the local disk on the DMS replication instance. The default value is 1024 (1 MB). */
  WriteBufferSize?: number;
  /** Specifies the maximum size (in KB) of .csv files used to transfer data to Db2 LUW. */
  MaxFileSize?: number;
  /** If true, DMS saves any .csv files to the Db2 LUW target that were used to replicate data. DMS uses these files for analysis and troubleshooting. The default value is false. */
  KeepCsvFiles?: boolean;
}

export interface DocDbSettings {
  /** The user name you use to access the DocumentDB source endpoint. */
  Username?: string;
  /** The password for the user account you use to access the DocumentDB source endpoint. */
  Password?: string;
  /** The name of the server on the DocumentDB source endpoint. */
  ServerName?: string;
  /** The port value for the DocumentDB source endpoint. */
  Port?: number;
  /** The database name on the DocumentDB source endpoint. */
  DatabaseName?: string;
  /** Specifies either document or table mode. Default value is "none". Specify "none" to use document mode. Specify "one" to use table mode. */
  NestingLevel?: 'none' | 'one';
  /** Specifies the document ID. Use this setting when NestingLevel is set to "none". Default value is "false". */
  ExtractDocId?: boolean;
  /** Indicates the number of documents to preview to determine the document organization. Use this setting when NestingLevel is set to "one". Must be a positive value greater than 0. Default value is 1000. */
  DocsToInvestigate?: number;
  /** The KMS key identifier that is used to encrypt the content on the replication instance. If you don't specify a value for the KmsKeyId parameter, then DMS uses your default encryption key. KMS creates  */
  KmsKeyId?: string;
  /** The full Amazon Resource Name (ARN) of the IAM role that specifies DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the ia */
  SecretsManagerAccessRoleArn?: string;
  /** The full ARN, partial ARN, or friendly name of the SecretsManagerSecret that contains the DocumentDB endpoint connection details. */
  SecretsManagerSecretId?: string;
  /** If true, DMS retrieves the entire document from the DocumentDB source during migration. This may cause a migration failure if the server response exceeds bandwidth limits. To fetch only updates and de */
  UseUpdateLookUp?: boolean;
  /** If true, DMS replicates data to shard collections. DMS only uses this setting if the target endpoint is a DocumentDB elastic cluster. When this setting is true, note the following: You must set Target */
  ReplicateShardCollections?: boolean;
}

export interface RedisSettings {
  /** Fully qualified domain name of the endpoint. */
  ServerName: string;
  /** Transmission Control Protocol (TCP) port for the endpoint. */
  Port: number;
  /** The connection to a Redis target endpoint using Transport Layer Security (TLS). Valid values include plaintext and ssl-encryption. The default is ssl-encryption. The ssl-encryption option makes an enc */
  SslSecurityProtocol?: 'plaintext' | 'ssl-encryption';
  /** The type of authentication to perform when connecting to a Redis target. Options include none, auth-token, and auth-role. The auth-token option requires an AuthPassword value to be provided. The auth- */
  AuthType?: 'none' | 'auth-role' | 'auth-token';
  /** The user name provided with the auth-role option of the AuthType setting for a Redis target endpoint. */
  AuthUserName?: string;
  /** The password provided with the auth-role and auth-token options of the AuthType setting for a Redis target endpoint. */
  AuthPassword?: string;
  /** The Amazon Resource Name (ARN) for the certificate authority (CA) that DMS uses to connect to your Redis target endpoint. */
  SslCaCertificateArn?: string;
}

export interface GcpMySQLSettings {
  /** Specifies a script to run immediately after DMS connects to the endpoint. The migration task continues running regardless if the SQL statement succeeds or fails. For this parameter, provide the code o */
  AfterConnectScript?: string;
  /** Cleans and recreates table metadata information on the replication instance when a mismatch occurs. For example, in a situation where running an alter DDL on the table could result in different inform */
  CleanSourceMetadataOnMismatch?: boolean;
  /** Database name for the endpoint. For a MySQL source or target endpoint, don't explicitly specify the database using the DatabaseName request parameter on either the CreateEndpoint or ModifyEndpoint API */
  DatabaseName?: string;
  /** Specifies how often to check the binary log for new changes/events when the database is idle. The default is five seconds. Example: eventsPollInterval=5; In the example, DMS checks for changes in the  */
  EventsPollInterval?: number;
  /** Specifies where to migrate source tables on the target, either to a single database or multiple databases. Example: targetDbType=MULTIPLE_DATABASES */
  TargetDbType?: 'specific-database' | 'multiple-databases';
  /** Specifies the maximum size (in KB) of any .csv file used to transfer data to a MySQL-compatible database. Example: maxFileSize=512 */
  MaxFileSize?: number;
  /** Improves performance when loading data into the MySQL-compatible target database. Specifies how many threads to use to load the data into the MySQL-compatible target database. Setting a large number o */
  ParallelLoadThreads?: number;
  /** Endpoint connection password. */
  Password?: string;
  /** Endpoint TCP port. */
  Port?: number;
  /** The MySQL host name. */
  ServerName?: string;
  /** Specifies the time zone for the source MySQL database. Example: serverTimezone=US/Pacific; Note: Do not enclose time zones in single quotes. */
  ServerTimezone?: string;
  /** Endpoint connection user name. */
  Username?: string;
  /** The full Amazon Resource Name (ARN) of the IAM role that specifies DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the ia */
  SecretsManagerAccessRoleArn?: string;
  /** The full ARN, partial ARN, or friendly name of the SecretsManagerSecret that contains the MySQL endpoint connection details. */
  SecretsManagerSecretId?: string;
}

export interface TimestreamSettings {
  /** Database name for the endpoint. */
  DatabaseName: string;
  /** Set this attribute to specify the length of time to store all of the tables in memory that are migrated into Amazon Timestream from the source database. Time is measured in units of hours. When Timest */
  MemoryDuration: number;
  /** Set this attribute to specify the default magnetic duration applied to the Amazon Timestream tables in days. This is the number of days that records remain in magnetic store before being discarded. Fo */
  MagneticDuration: number;
  /** Set this attribute to true to specify that DMS only applies inserts and updates, and not deletes. Amazon Timestream does not allow deleting records, so if this value is false, DMS nulls out the corres */
  CdcInsertsAndUpdates?: boolean;
  /** Set this attribute to true to enable memory store writes. When this value is false, DMS does not write records that are older in days than the value specified in MagneticDuration, because Amazon Times */
  EnableMagneticStoreWrites?: boolean;
}

export interface DataProviderDescriptorDefinition {
  /** The name or Amazon Resource Name (ARN) of the data provider. */
  DataProviderIdentifier: string;
  /** The identifier of the Amazon Web Services Secrets Manager Secret used to store access credentials for the data provider. */
  SecretsManagerSecretId?: string;
  /** The ARN of the role used to access Amazon Web Services Secrets Manager. */
  SecretsManagerAccessRoleArn?: string;
}

export interface SCApplicationAttributes {
  /** The path for the Amazon S3 bucket that the application uses for exporting assessment reports. */
  S3BucketPath?: string;
  /** The ARN for the role the application uses to access its Amazon S3 bucket. */
  S3BucketRoleArn?: string;
}

export interface ComputeConfig {
  /** The Availability Zone where the DMS Serverless replication using this configuration will run. The default value is a random, system-chosen Availability Zone in the configuration's Amazon Web Services  */
  AvailabilityZone?: string;
  /** A list of custom DNS name servers supported for the DMS Serverless replication to access your source or target database. This list overrides the default name servers supported by the DMS Serverless re */
  DnsNameServers?: string;
  /** An Key Management Service (KMS) key Amazon Resource Name (ARN) that is used to encrypt the data during DMS Serverless replication. If you don't specify a value for the KmsKeyId parameter, DMS uses you */
  KmsKeyId?: string;
  /** Specifies the maximum value of the DMS capacity units (DCUs) for which a given DMS Serverless replication can be provisioned. A single DCU is 2GB of RAM, with 1 DCU as the minimum value allowed. The l */
  MaxCapacityUnits?: number;
  /** Specifies the minimum value of the DMS capacity units (DCUs) for which a given DMS Serverless replication can be provisioned. A single DCU is 2GB of RAM, with 1 DCU as the minimum value allowed. The l */
  MinCapacityUnits?: number;
  /** Specifies whether the DMS Serverless replication is a Multi-AZ deployment. You can't set the AvailabilityZone parameter if the MultiAZ parameter is set to true. */
  MultiAZ?: boolean;
  /** The weekly time range during which system maintenance can occur for the DMS Serverless replication, in Universal Coordinated Time (UTC). The format is ddd:hh24:mi-ddd:hh24:mi. The default is a 30-minu */
  PreferredMaintenanceWindow?: string;
  /** Specifies a subnet group identifier to associate with the DMS Serverless replication. */
  ReplicationSubnetGroupId?: string;
  /** Specifies the virtual private cloud (VPC) security group to use with the DMS Serverless replication. The VPC security group must work with the VPC containing the replication. */
  VpcSecurityGroupIds?: string[];
}

export interface KerberosAuthenticationSettings {
  /** Specifies the ID of the secret that stores the key cache file required for kerberos authentication. */
  KeyCacheSecretId?: string;
  /** Specifies the Amazon Resource Name (ARN) of the IAM role that grants Amazon Web Services DMS access to the secret containing key cache file for the kerberos authentication. */
  KeyCacheSecretIamArn?: string;
  /** Specifies the contents of krb5 configuration file required for kerberos authentication. */
  Krb5FileContents?: string;
}

export interface Filter {
  /** The name of the filter as specified for a Describe* or similar operation. */
  Name: string;
  /** The filter value, which can specify one or more values used to narrow the returned results. */
  Values: any[];
}

export interface TableToReload {
  /** The schema name of the table to be reloaded. */
  SchemaName: string;
  /** The table name of the table to be reloaded. */
  TableName: string;
}

export interface StatementProperties {
  /** The SQL text of the statement. */
  Definition: string;
}

export interface RecommendationSettings {
  /** The size of your target instance. Fleet Advisor calculates this value based on your data collection type, such as total capacity and resource utilization. Valid values include "total-capacity" and "ut */
  InstanceSizingType: string;
  /** The deployment option for your target engine. For production databases, Fleet Advisor chooses Multi-AZ deployment. For development or test databases, Fleet Advisor chooses Single-AZ deployment. Valid  */
  WorkloadType: string;
}

/** Associates a set of tags with an DMS resource. */
export interface AddTagsToResourceInput {
  /** Identifies the DMS resource to which tags should be added. The value for this parameter is an Amazon Resource Name (ARN). For DMS, you can tag a replication instance, an endpoint, or a replication tas */
  ResourceArn: string;
  /** One or more tags to be assigned to the resource. */
  Tags: Tag[];
}

export interface ApplyPendingMaintenanceActionInput {
  /** The pending maintenance action to apply to this resource. Valid values: os-upgrade, system-update, db-upgrade, os-patch */
  ApplyAction: string;
  /** A value that specifies the type of opt-in request, or undoes an opt-in request. You can't undo an opt-in request of type immediate. Valid values: immediate - Apply the maintenance action immediately.  */
  OptInType: string;
  /** The Amazon Resource Name (ARN) of the DMS resource that the pending maintenance action applies to. */
  ReplicationInstanceArn: string;
}

export interface BatchStartRecommendationsInput {
  /** Provides information about source databases to analyze. After this analysis, Fleet Advisor recommends target engines for each source database. */
  Data?: StartRecommendationsRequestEntry[];
}

export interface CancelMetadataModelConversionInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** The identifier for the metadata model conversion operation to cancel. This operation was initiated by StartMetadataModelConversion. */
  RequestIdentifier: string;
}

export interface CancelMetadataModelCreationInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** The identifier for the metadata model creation operation to cancel. This operation was initiated by StartMetadataModelCreation. */
  RequestIdentifier: string;
}

export interface CancelReplicationTaskAssessmentRunInput {
  /** Amazon Resource Name (ARN) of the premigration assessment run to be canceled. */
  ReplicationTaskAssessmentRunArn: string;
}

export interface CreateDataMigrationInput {
  /** Specifies if the data migration is full-load only, change data capture (CDC) only, or full-load and CDC. */
  DataMigrationType: 'full-load' | 'cdc' | 'full-load-and-cdc';
  /** An identifier for the migration project. */
  MigrationProjectIdentifier: string;
  /** The Amazon Resource Name (ARN) for the service access role that you want to use to create the data migration. */
  ServiceAccessRoleArn: string;
  /** A user-friendly name for the data migration. Data migration names have the following constraints: Must begin with a letter, and can only contain ASCII letters, digits, and hyphens. Can't end with a hy */
  DataMigrationName?: string;
  /** Specifies whether to enable CloudWatch logs for the data migration. */
  EnableCloudwatchLogs?: boolean;
  /** The number of parallel jobs that trigger parallel threads to unload the tables from the source, and then load them to the target. */
  NumberOfJobs?: number;
  /** An optional JSON string specifying what tables, views, and schemas to include or exclude from the migration. */
  SelectionRules?: string;
  /** Specifies information about the source data provider. */
  SourceDataSettings?: SourceDataSetting[];
  /** One or more tags to be assigned to the data migration. */
  Tags?: Tag[];
  /** Specifies information about the target data provider. */
  TargetDataSettings?: TargetDataSetting[];
}

export interface CreateDataProviderInput {
  /** The type of database engine for the data provider. Valid values include "aurora", "aurora-postgresql", "mysql", "oracle", "postgres", "sqlserver", redshift, mariadb, mongodb, db2, db2-zos, docdb, and  */
  Engine: string;
  /** The settings in JSON format for a data provider. */
  Settings: any;
  /** A user-friendly name for the data provider. */
  DataProviderName?: string;
  /** A user-friendly description of the data provider. */
  Description?: string;
  /** One or more tags to be assigned to the data provider. */
  Tags?: Tag[];
  /** Indicates whether the data provider is virtual. */
  Virtual?: boolean;
}

export interface CreateEndpointInput {
  /** The database endpoint identifier. Identifiers must begin with a letter and must contain only ASCII letters, digits, and hyphens. They can't end with a hyphen, or contain two consecutive hyphens. */
  EndpointIdentifier: string;
  /** The type of endpoint. Valid values are source and target. */
  EndpointType: 'source' | 'target';
  /** The type of engine for the endpoint. Valid values, depending on the EndpointType value, include "mysql", "oracle", "postgres", "mariadb", "aurora", "aurora-postgresql", "opensearch", "redshift", "s3", */
  EngineName: string;
  /** The Amazon Resource Name (ARN) for the certificate. */
  CertificateArn?: string;
  /** The name of the endpoint database. For a MySQL source or target endpoint, do not specify DatabaseName. To migrate to a specific database, use this setting and targetDbType. */
  DatabaseName?: string;
  /** The settings in JSON format for the DMS transfer type of source endpoint. Possible settings include the following: ServiceAccessRoleArn - The Amazon Resource Name (ARN) used by the service access IAM  */
  DmsTransferSettings?: DmsTransferSettings;
  DocDbSettings?: DocDbSettings;
  /** Settings in JSON format for the target Amazon DynamoDB endpoint. For information about other available settings, see Using Object Mapping to Migrate Data to DynamoDB in the Database Migration Service  */
  DynamoDbSettings?: DynamoDbSettings;
  /** Settings in JSON format for the target OpenSearch endpoint. For more information about the available settings, see Extra Connection Attributes When Using OpenSearch as a Target for DMS in the Database */
  ElasticsearchSettings?: ElasticsearchSettings;
  /** The external table definition. */
  ExternalTableDefinition?: string;
  /** Additional attributes associated with the connection. Each attribute is specified as a name-value pair associated by an equal sign (=). Multiple attributes are separated by a semicolon (;) with no add */
  ExtraConnectionAttributes?: string;
  /** Settings in JSON format for the source GCP MySQL endpoint. */
  GcpMySQLSettings?: GcpMySQLSettings;
  /** Settings in JSON format for the source IBM Db2 LUW endpoint. For information about other available settings, see Extra connection attributes when using Db2 LUW as a source for DMS in the Database Migr */
  IBMDb2Settings?: IBMDb2Settings;
  /** Settings in JSON format for the target Apache Kafka endpoint. For more information about the available settings, see Using object mapping to migrate data to a Kafka topic in the Database Migration Ser */
  KafkaSettings?: KafkaSettings;
  /** Settings in JSON format for the target endpoint for Amazon Kinesis Data Streams. For more information about the available settings, see Using object mapping to migrate data to a Kinesis data stream in */
  KinesisSettings?: KinesisSettings;
  /** An KMS key identifier that is used to encrypt the connection parameters for the endpoint. If you don't specify a value for the KmsKeyId parameter, then DMS uses your default encryption key. KMS create */
  KmsKeyId?: string;
  /** Settings in JSON format for the source and target Microsoft SQL Server endpoint. For information about other available settings, see Extra connection attributes when using SQL Server as a source for D */
  MicrosoftSQLServerSettings?: MicrosoftSQLServerSettings;
  /** Settings in JSON format for the source MongoDB endpoint. For more information about the available settings, see Endpoint configuration settings when using MongoDB as a source for Database Migration Se */
  MongoDbSettings?: MongoDbSettings;
  /** Settings in JSON format for the source and target MySQL endpoint. For information about other available settings, see Extra connection attributes when using MySQL as a source for DMS and Extra connect */
  MySQLSettings?: MySQLSettings;
  /** Settings in JSON format for the target Amazon Neptune endpoint. For more information about the available settings, see Specifying graph-mapping rules using Gremlin and R2RML for Amazon Neptune as a ta */
  NeptuneSettings?: NeptuneSettings;
  /** Settings in JSON format for the source and target Oracle endpoint. For information about other available settings, see Extra connection attributes when using Oracle as a source for DMS and Extra conne */
  OracleSettings?: OracleSettings;
  /** The password to be used to log in to the endpoint database. */
  Password?: string;
  /** The port used by the endpoint database. */
  Port?: number;
  /** Settings in JSON format for the source and target PostgreSQL endpoint. For information about other available settings, see Extra connection attributes when using PostgreSQL as a source for DMS and Ext */
  PostgreSQLSettings?: PostgreSQLSettings;
  /** Settings in JSON format for the target Redis endpoint. */
  RedisSettings?: RedisSettings;
  RedshiftSettings?: RedshiftSettings;
  /** A friendly name for the resource identifier at the end of the EndpointArn response parameter that is returned in the created Endpoint object. The value for this parameter can have up to 31 characters. */
  ResourceIdentifier?: string;
  /** Settings in JSON format for the target Amazon S3 endpoint. For more information about the available settings, see Extra Connection Attributes When Using Amazon S3 as a Target for DMS in the Database M */
  S3Settings?: S3Settings;
  /** The name of the server where the endpoint database resides. */
  ServerName?: string;
  /** The Amazon Resource Name (ARN) for the service access role that you want to use to create the endpoint. The role must allow the iam:PassRole action. */
  ServiceAccessRoleArn?: string;
  /** The Secure Sockets Layer (SSL) mode to use for the SSL connection. The default is none */
  SslMode?: 'none' | 'require' | 'verify-ca' | 'verify-full';
  /** Settings in JSON format for the source and target SAP ASE endpoint. For information about other available settings, see Extra connection attributes when using SAP ASE as a source for DMS and Extra con */
  SybaseSettings?: SybaseSettings;
  /** One or more tags to be assigned to the endpoint. */
  Tags?: Tag[];
  /** Settings in JSON format for the target Amazon Timestream endpoint. */
  TimestreamSettings?: TimestreamSettings;
  /** The user name to be used to log in to the endpoint database. */
  Username?: string;
}

export interface CreateEventSubscriptionInput {
  /** The Amazon Resource Name (ARN) of the Amazon SNS topic created for event notification. The ARN is created by Amazon SNS when you create a topic and subscribe to it. */
  SnsTopicArn: string;
  /** The name of the DMS event notification subscription. This name must be less than 255 characters. */
  SubscriptionName: string;
  /** A Boolean value; set to true to activate the subscription, or set to false to create the subscription but not activate it. */
  Enabled?: boolean;
  /** A list of event categories for a source type that you want to subscribe to. For more information, see Working with Events and Notifications in the Database Migration Service User Guide. */
  EventCategories?: string[];
  /** A list of identifiers for which DMS provides notification events. If you don't specify a value, notifications are provided for all sources. If you specify multiple values, they must be of the same typ */
  SourceIds?: string[];
  /** The type of DMS resource that generates the events. For example, if you want to be notified of events generated by a replication instance, you set this parameter to replication-instance. If this value */
  SourceType?: string;
  /** One or more tags to be assigned to the event subscription. */
  Tags?: Tag[];
}

export interface CreateFleetAdvisorCollectorInput {
  /** The name of your Fleet Advisor collector (for example, sample-collector). */
  CollectorName: string;
  /** The Amazon S3 bucket that the Fleet Advisor collector uses to store inventory metadata. */
  S3BucketName: string;
  /** The IAM role that grants permissions to access the specified Amazon S3 bucket. */
  ServiceAccessRoleArn: string;
  /** A summary description of your Fleet Advisor collector. */
  Description?: string;
}

export interface CreateInstanceProfileInput {
  /** The Availability Zone where the instance profile will be created. The default value is a random, system-chosen Availability Zone in the Amazon Web Services Region where your data provider is created,  */
  AvailabilityZone?: string;
  /** A user-friendly description of the instance profile. */
  Description?: string;
  /** A user-friendly name for the instance profile. */
  InstanceProfileName?: string;
  /** The Amazon Resource Name (ARN) of the KMS key that is used to encrypt the connection parameters for the instance profile. If you don't specify a value for the KmsKeyArn parameter, then DMS uses an Ama */
  KmsKeyArn?: string;
  /** Specifies the network type for the instance profile. A value of IPV4 represents an instance profile with IPv4 network type and only supports IPv4 addressing. A value of IPV6 represents an instance pro */
  NetworkType?: string;
  /** Specifies the accessibility options for the instance profile. A value of true represents an instance profile with a public IP address. A value of false represents an instance profile with a private IP */
  PubliclyAccessible?: boolean;
  /** A subnet group to associate with the instance profile. */
  SubnetGroupIdentifier?: string;
  /** One or more tags to be assigned to the instance profile. */
  Tags?: Tag[];
  /** Specifies the VPC security group names to be used with the instance profile. The VPC security group must work with the VPC containing the instance profile. */
  VpcSecurityGroups?: string[];
}

export interface CreateMigrationProjectInput {
  /** The identifier of the associated instance profile. Identifiers must begin with a letter and must contain only ASCII letters, digits, and hyphens. They can't end with a hyphen, or contain two consecuti */
  InstanceProfileIdentifier: string;
  /** Information about the source data provider, including the name, ARN, and Secrets Manager parameters. */
  SourceDataProviderDescriptors: DataProviderDescriptorDefinition[];
  /** Information about the target data provider, including the name, ARN, and Amazon Web Services Secrets Manager parameters. */
  TargetDataProviderDescriptors: DataProviderDescriptorDefinition[];
  /** A user-friendly description of the migration project. */
  Description?: string;
  /** A user-friendly name for the migration project. */
  MigrationProjectName?: string;
  /** The schema conversion application attributes, including the Amazon S3 bucket name and Amazon S3 role ARN. */
  SchemaConversionApplicationAttributes?: SCApplicationAttributes;
  /** One or more tags to be assigned to the migration project. */
  Tags?: Tag[];
  /** The settings in JSON format for migration rules. Migration rules make it possible for you to change the object names according to the rules that you specify. For example, you can change an object name */
  TransformationRules?: string;
}

export interface CreateReplicationConfigInput {
  /** Configuration parameters for provisioning an DMS Serverless replication. */
  ComputeConfig: ComputeConfig;
  /** A unique identifier that you want to use to create a ReplicationConfigArn that is returned as part of the output from this action. You can then pass this output ReplicationConfigArn as the value of th */
  ReplicationConfigIdentifier: string;
  /** The type of DMS Serverless replication to provision using this replication configuration. Possible values: "full-load" "cdc" "full-load-and-cdc" */
  ReplicationType: 'full-load' | 'cdc' | 'full-load-and-cdc';
  /** The Amazon Resource Name (ARN) of the source endpoint for this DMS Serverless replication configuration. */
  SourceEndpointArn: string;
  /** JSON table mappings for DMS Serverless replications that are provisioned using this replication configuration. For more information, see Specifying table selection and transformations rules using JSON */
  TableMappings: string;
  /** The Amazon Resource Name (ARN) of the target endpoint for this DMS serverless replication configuration. */
  TargetEndpointArn: string;
  /** Optional JSON settings for DMS Serverless replications that are provisioned using this replication configuration. For example, see Change processing tuning settings. */
  ReplicationSettings?: string;
  /** Optional unique value or name that you set for a given resource that can be used to construct an Amazon Resource Name (ARN) for that resource. For more information, see Fine-grained access control usi */
  ResourceIdentifier?: string;
  /** Optional JSON settings for specifying supplemental data. For more information, see Specifying supplemental data for task settings. */
  SupplementalSettings?: string;
  /** One or more optional tags associated with resources used by the DMS Serverless replication. For more information, see Tagging resources in Database Migration Service. */
  Tags?: Tag[];
}

export interface CreateReplicationInstanceInput {
  /** The compute and memory capacity of the replication instance as defined for the specified replication instance class. For example to specify the instance class dms.c4.large, set this parameter to "dms. */
  ReplicationInstanceClass: string;
  /** The replication instance identifier. This parameter is stored as a lowercase string. Constraints: Must contain 1-63 alphanumeric characters or hyphens. First character must be a letter. Can't end with */
  ReplicationInstanceIdentifier: string;
  /** The amount of storage (in gigabytes) to be initially allocated for the replication instance. */
  AllocatedStorage?: number;
  /** A value that indicates whether minor engine upgrades are applied automatically to the replication instance during the maintenance window. This parameter defaults to true. Default: true */
  AutoMinorVersionUpgrade?: boolean;
  /** The Availability Zone where the replication instance will be created. The default value is a random, system-chosen Availability Zone in the endpoint's Amazon Web Services Region, for example: us-east- */
  AvailabilityZone?: string;
  /** A list of custom DNS name servers supported for the replication instance to access your on-premise source or target database. This list overrides the default name servers supported by the replication  */
  DnsNameServers?: string;
  /** The engine version number of the replication instance. If an engine version number is not specified when a replication instance is created, the default is the latest engine version available. */
  EngineVersion?: string;
  /** Specifies the settings required for kerberos authentication when creating the replication instance. */
  KerberosAuthenticationSettings?: KerberosAuthenticationSettings;
  /** An KMS key identifier that is used to encrypt the data on the replication instance. If you don't specify a value for the KmsKeyId parameter, then DMS uses your default encryption key. KMS creates the  */
  KmsKeyId?: string;
  /** Specifies whether the replication instance is a Multi-AZ deployment. You can't set the AvailabilityZone parameter if the Multi-AZ parameter is set to true. */
  MultiAZ?: boolean;
  /** The type of IP address protocol used by a replication instance, such as IPv4 only or Dual-stack that supports both IPv4 and IPv6 addressing. IPv6 only is not yet supported. */
  NetworkType?: string;
  /** The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC). Format: ddd:hh24:mi-ddd:hh24:mi Default: A 30-minute window selected at random from an 8-hour bloc */
  PreferredMaintenanceWindow?: string;
  /** Specifies the accessibility options for the replication instance. A value of true represents an instance with a public IP address. A value of false represents an instance with a private IP address. Th */
  PubliclyAccessible?: boolean;
  /** A subnet group to associate with the replication instance. */
  ReplicationSubnetGroupIdentifier?: string;
  /** A friendly name for the resource identifier at the end of the EndpointArn response parameter that is returned in the created Endpoint object. The value for this parameter can have up to 31 characters. */
  ResourceIdentifier?: string;
  /** One or more tags to be assigned to the replication instance. */
  Tags?: Tag[];
  /** Specifies the VPC security group to be used with the replication instance. The VPC security group must work with the VPC containing the replication instance. */
  VpcSecurityGroupIds?: string[];
}

export interface CreateReplicationSubnetGroupInput {
  /** The description for the subnet group. Constraints: This parameter Must not contain non-printable control characters. */
  ReplicationSubnetGroupDescription: string;
  /** The name for the replication subnet group. This value is stored as a lowercase string. Constraints: Must contain no more than 255 alphanumeric characters, periods, underscores, or hyphens. Must not be */
  ReplicationSubnetGroupIdentifier: string;
  /** Two or more subnet IDs to be assigned to the subnet group. */
  SubnetIds: string[];
  /** One or more tags to be assigned to the subnet group. */
  Tags?: Tag[];
}

export interface CreateReplicationTaskInput {
  /** The migration type. Valid values: full-load | cdc | full-load-and-cdc */
  MigrationType: 'full-load' | 'cdc' | 'full-load-and-cdc';
  /** The Amazon Resource Name (ARN) of a replication instance. */
  ReplicationInstanceArn: string;
  /** An identifier for the replication task. Constraints: Must contain 1-255 alphanumeric characters or hyphens. First character must be a letter. Cannot end with a hyphen or contain two consecutive hyphen */
  ReplicationTaskIdentifier: string;
  /** An Amazon Resource Name (ARN) that uniquely identifies the source endpoint. */
  SourceEndpointArn: string;
  /** The table mappings for the task, in JSON format. For more information, see Using Table Mapping to Specify Task Settings in the Database Migration Service User Guide. */
  TableMappings: string;
  /** An Amazon Resource Name (ARN) that uniquely identifies the target endpoint. */
  TargetEndpointArn: string;
  /** Indicates when you want a change data capture (CDC) operation to start. Use either CdcStartPosition or CdcStartTime to specify when you want a CDC operation to start. Specifying both values results in */
  CdcStartPosition?: string;
  /** Indicates the start time for a change data capture (CDC) operation. Use either CdcStartTime or CdcStartPosition to specify when you want a CDC operation to start. Specifying both values results in an  */
  CdcStartTime?: string;
  /** Indicates when you want a change data capture (CDC) operation to stop. The value can be either server time or commit time. Server time example: --cdc-stop-position “server_time:2018-02-09T12:12:12” Co */
  CdcStopPosition?: string;
  /** Overall settings for the task, in JSON format. For more information, see Specifying Task Settings for Database Migration Service Tasks in the Database Migration Service User Guide. */
  ReplicationTaskSettings?: string;
  /** A friendly name for the resource identifier at the end of the EndpointArn response parameter that is returned in the created Endpoint object. The value for this parameter can have up to 31 characters. */
  ResourceIdentifier?: string;
  /** One or more tags to be assigned to the replication task. */
  Tags?: Tag[];
  /** Supplemental information that the task requires to migrate the data for certain source and target endpoints. For more information, see Specifying Supplemental Data for Task Settings in the Database Mi */
  TaskData?: string;
}

export interface DeleteCertificateInput {
  /** The Amazon Resource Name (ARN) of the certificate. */
  CertificateArn: string;
}

export interface DeleteConnectionInput {
  /** The Amazon Resource Name (ARN) string that uniquely identifies the endpoint. */
  EndpointArn: string;
  /** The Amazon Resource Name (ARN) of the replication instance. */
  ReplicationInstanceArn: string;
}

export interface DeleteDataMigrationInput {
  /** The identifier (name or ARN) of the data migration to delete. */
  DataMigrationIdentifier: string;
}

export interface DeleteDataProviderInput {
  /** The identifier of the data provider to delete. */
  DataProviderIdentifier: string;
}

export interface DeleteEndpointInput {
  /** The Amazon Resource Name (ARN) string that uniquely identifies the endpoint. */
  EndpointArn: string;
}

export interface DeleteEventSubscriptionInput {
  /** The name of the DMS event notification subscription to be deleted. */
  SubscriptionName: string;
}

export interface DeleteFleetAdvisorCollectorInput {
  /** The reference ID of the Fleet Advisor collector to delete. */
  CollectorReferencedId: string;
}

export interface DeleteFleetAdvisorDatabasesInput {
  /** The IDs of the Fleet Advisor collector databases to delete. */
  DatabaseIds: string[];
}

export interface DeleteInstanceProfileInput {
  /** The identifier of the instance profile to delete. */
  InstanceProfileIdentifier: string;
}

export interface DeleteMigrationProjectInput {
  /** The name or Amazon Resource Name (ARN) of the migration project to delete. */
  MigrationProjectIdentifier: string;
}

export interface DeleteReplicationConfigInput {
  /** The replication config to delete. */
  ReplicationConfigArn: string;
}

export interface DeleteReplicationInstanceInput {
  /** The Amazon Resource Name (ARN) of the replication instance to be deleted. */
  ReplicationInstanceArn: string;
}

export interface DeleteReplicationSubnetGroupInput {
  /** The subnet group name of the replication instance. */
  ReplicationSubnetGroupIdentifier: string;
}

export interface DeleteReplicationTaskInput {
  /** The Amazon Resource Name (ARN) of the replication task to be deleted. */
  ReplicationTaskArn: string;
}

export interface DeleteReplicationTaskAssessmentRunInput {
  /** Amazon Resource Name (ARN) of the premigration assessment run to be deleted. */
  ReplicationTaskAssessmentRunArn: string;
}

export interface DescribeApplicableIndividualAssessmentsInput {
  /** Optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** Maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remaining re */
  MaxRecords?: number;
  /** Name of the migration type that each provided individual assessment must support. */
  MigrationType?: 'full-load' | 'cdc' | 'full-load-and-cdc';
  /** Amazon Resource Name (ARN) of a serverless replication on which you want to base the default list of individual assessments. */
  ReplicationConfigArn?: string;
  /** ARN of a replication instance on which you want to base the default list of individual assessments. */
  ReplicationInstanceArn?: string;
  /** Amazon Resource Name (ARN) of a migration task on which you want to base the default list of individual assessments. */
  ReplicationTaskArn?: string;
  /** Name of a database engine that the specified replication instance supports as a source. */
  SourceEngineName?: string;
  /** Name of a database engine that the specified replication instance supports as a target. */
  TargetEngineName?: string;
}

export interface DescribeCertificatesInput {
  /** Filters applied to the certificates described in the form of key-value pairs. Valid values are certificate-arn and certificate-id. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeConnectionsInput {
  /** The filters applied to the connection. Valid filter names: endpoint-arn | replication-instance-arn */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeConversionConfigurationInput {
  /** The name or Amazon Resource Name (ARN) for the schema conversion project to describe. */
  MigrationProjectIdentifier: string;
}

export interface DescribeDataMigrationsInput {
  /** Filters applied to the data migrations. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** An option to set to avoid returning information about settings. Use this to reduce overhead when setting information is too large. To use this option, choose true; otherwise, choose false (the default */
  WithoutSettings?: boolean;
  /** An option to set to avoid returning information about statistics. Use this to reduce overhead when statistics information is too large. To use this option, choose true; otherwise, choose false (the de */
  WithoutStatistics?: boolean;
}

export interface DescribeDataProvidersInput {
  /** Filters applied to the data providers described in the form of key-value pairs. Valid filter names and values: data-provider-identifier, data provider arn or name */
  Filters?: Filter[];
  /** Specifies the unique pagination token that makes it possible to display the next page of results. If this parameter is specified, the response includes only records beyond the marker, up to the value  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, DMS includes a pagination token in the response so that you can retrieve the remain */
  MaxRecords?: number;
}

export interface DescribeEndpointsInput {
  /** Filters applied to the endpoints. Valid filter names: endpoint-arn | endpoint-type | endpoint-id | engine-name */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeEndpointSettingsInput {
  /** The database engine used for your source or target endpoint. */
  EngineName: string;
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeEndpointTypesInput {
  /** Filters applied to the endpoint types. Valid filter names: engine-name | endpoint-type */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeEngineVersionsInput {
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeEventCategoriesInput {
  /** Filters applied to the event categories. */
  Filters?: Filter[];
  /** The type of DMS resource that generates events. Valid values: replication-instance | replication-task */
  SourceType?: string;
}

export interface DescribeEventsInput {
  /** The duration of the events to be listed. */
  Duration?: number;
  /** The end time for the events to be listed. */
  EndTime?: string;
  /** A list of event categories for the source type that you've chosen. */
  EventCategories?: string[];
  /** Filters applied to events. The only valid filter is replication-instance-id. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The identifier of an event source. */
  SourceIdentifier?: string;
  /** The type of DMS resource that generates events. Valid values: replication-instance | replication-task */
  SourceType?: 'replication-instance';
  /** The start time for the events to be listed. */
  StartTime?: string;
}

export interface DescribeEventSubscriptionsInput {
  /** Filters applied to event subscriptions. Valid filter names: event-subscription-arn | event-subscription-id */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The name of the DMS event subscription to be described. */
  SubscriptionName?: string;
}

export interface DescribeExtensionPackAssociationsInput {
  /** The name or Amazon Resource Name (ARN) for the migration project. */
  MigrationProjectIdentifier: string;
  /** Filters applied to the extension pack associations described in the form of key-value pairs. */
  Filters?: Filter[];
  /** Specifies the unique pagination token that makes it possible to display the next page of results. If this parameter is specified, the response includes only records beyond the marker, up to the value  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, DMS includes a pagination token in the response so that you can retrieve the remain */
  MaxRecords?: number;
}

export interface DescribeFleetAdvisorCollectorsInput {
  /** If you specify any of the following filters, the output includes information for only those collectors that meet the filter criteria: collector-referenced-id – The ID of the collector agent, for examp */
  Filters?: Filter[];
  /** Sets the maximum number of records returned in the response. */
  MaxRecords?: number;
  /** If NextToken is returned by a previous response, there are more results available. The value of NextToken is a unique pagination token for each page. Make the call again using the returned token to re */
  NextToken?: string;
}

export interface DescribeFleetAdvisorDatabasesInput {
  /** If you specify any of the following filters, the output includes information for only those databases that meet the filter criteria: database-id – The ID of the database. database-name – The name of t */
  Filters?: Filter[];
  /** Sets the maximum number of records returned in the response. */
  MaxRecords?: number;
  /** If NextToken is returned by a previous response, there are more results available. The value of NextToken is a unique pagination token for each page. Make the call again using the returned token to re */
  NextToken?: string;
}

export interface DescribeFleetAdvisorLsaAnalysisInput {
  /** Sets the maximum number of records returned in the response. */
  MaxRecords?: number;
  /** If NextToken is returned by a previous response, there are more results available. The value of NextToken is a unique pagination token for each page. Make the call again using the returned token to re */
  NextToken?: string;
}

export interface DescribeFleetAdvisorSchemaObjectSummaryInput {
  /** If you specify any of the following filters, the output includes information for only those schema objects that meet the filter criteria: schema-id – The ID of the schema, for example d4610ac5-e323-4a */
  Filters?: Filter[];
  /** End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Service */
  MaxRecords?: number;
  /** If NextToken is returned by a previous response, there are more results available. The value of NextToken is a unique pagination token for each page. Make the call again using the returned token to re */
  NextToken?: string;
}

export interface DescribeFleetAdvisorSchemasInput {
  /** If you specify any of the following filters, the output includes information for only those schemas that meet the filter criteria: complexity – The schema's complexity, for example Simple. database-id */
  Filters?: Filter[];
  /** Sets the maximum number of records returned in the response. */
  MaxRecords?: number;
  /** If NextToken is returned by a previous response, there are more results available. The value of NextToken is a unique pagination token for each page. Make the call again using the returned token to re */
  NextToken?: string;
}

export interface DescribeInstanceProfilesInput {
  /** Filters applied to the instance profiles described in the form of key-value pairs. Valid filter names and values: instance-profile-identifier, instance profile arn or name */
  Filters?: Filter[];
  /** Specifies the unique pagination token that makes it possible to display the next page of results. If this parameter is specified, the response includes only records beyond the marker, up to the value  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, DMS includes a pagination token in the response so that you can retrieve the remain */
  MaxRecords?: number;
}

export interface DescribeMetadataModelInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** Specifies whether to retrieve metadata from the source or target tree. Valid values: SOURCE | TARGET */
  Origin: 'SOURCE' | 'TARGET';
  /** The JSON string that specifies which metadata model to retrieve. Only one selection rule with "rule-action": "explicit" can be provided. For more information, see Selection Rules in the DMS User Guide */
  SelectionRules: string;
}

export interface DescribeMetadataModelAssessmentsInput {
  /** The name or Amazon Resource Name (ARN) of the migration project. */
  MigrationProjectIdentifier: string;
  /** Filters applied to the metadata model assessments described in the form of key-value pairs. */
  Filters?: Filter[];
  /** Specifies the unique pagination token that makes it possible to display the next page of results. If this parameter is specified, the response includes only records beyond the marker, up to the value  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, DMS includes a pagination token in the response so that you can retrieve the remain */
  MaxRecords?: number;
}

export interface DescribeMetadataModelChildrenInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** Specifies whether to retrieve metadata from the source or target tree. Valid values: SOURCE | TARGET */
  Origin: 'SOURCE' | 'TARGET';
  /** The JSON string that specifies which metadata model's children to retrieve. Only one selection rule with "rule-action": "explicit" can be provided. For more information, see Selection Rules in the DMS */
  SelectionRules: string;
  /** Specifies the unique pagination token that indicates where the next page should start. If this parameter is specified, the response includes only records beyond the marker, up to the value specified b */
  Marker?: string;
  /** The maximum number of metadata model children to include in the response. If more items exist than the specified MaxRecords value, a marker is included in the response so that the remaining results ca */
  MaxRecords?: number;
}

export interface DescribeMetadataModelConversionsInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** Filters applied to the metadata model conversions described in the form of key-value pairs. */
  Filters?: Filter[];
  /** Specifies the unique pagination token that makes it possible to display the next page of results. If this parameter is specified, the response includes only records beyond the marker, up to the value  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, DMS includes a pagination token in the response so that you can retrieve the remain */
  MaxRecords?: number;
}

export interface DescribeMetadataModelCreationsInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** Filters applied to the metadata model creation requests described in the form of key-value pairs. The supported filters are request-id and status. */
  Filters?: Filter[];
  /** Specifies the unique pagination token that makes it possible to display the next page of metadata model creation requests. If Marker is returned by a previous response, there are more metadata model c */
  Marker?: string;
  /** The maximum number of metadata model creation requests to include in the response. If more requests exist than the specified MaxRecords value, a pagination token is provided in the response so that yo */
  MaxRecords?: number;
}

export interface DescribeMetadataModelExportsAsScriptInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** Filters applied to the metadata model exports described in the form of key-value pairs. */
  Filters?: Filter[];
  /** Specifies the unique pagination token that makes it possible to display the next page of results. If this parameter is specified, the response includes only records beyond the marker, up to the value  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, DMS includes a pagination token in the response so that you can retrieve the remain */
  MaxRecords?: number;
}

export interface DescribeMetadataModelExportsToTargetInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** Filters applied to the metadata model exports described in the form of key-value pairs. */
  Filters?: Filter[];
  /** Specifies the unique pagination token that makes it possible to display the next page of results. If this parameter is specified, the response includes only records beyond the marker, up to the value  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, DMS includes a pagination token in the response so that you can retrieve the remain */
  MaxRecords?: number;
}

export interface DescribeMetadataModelImportsInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** Filters applied to the metadata model imports described in the form of key-value pairs. */
  Filters?: Filter[];
  /** Specifies the unique pagination token that makes it possible to display the next page of results. If this parameter is specified, the response includes only records beyond the marker, up to the value  */
  Marker?: string;
  /** A paginated list of metadata model imports. */
  MaxRecords?: number;
}

export interface DescribeMigrationProjectsInput {
  /** Filters applied to the migration projects described in the form of key-value pairs. Valid filter names and values: instance-profile-identifier, instance profile arn or name data-provider-identifier, d */
  Filters?: Filter[];
  /** Specifies the unique pagination token that makes it possible to display the next page of results. If this parameter is specified, the response includes only records beyond the marker, up to the value  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, DMS includes a pagination token in the response so that you can retrieve the remain */
  MaxRecords?: number;
}

export interface DescribeOrderableReplicationInstancesInput {
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribePendingMaintenanceActionsInput {
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The Amazon Resource Name (ARN) of the replication instance. */
  ReplicationInstanceArn?: string;
}

export interface DescribeRecommendationLimitationsInput {
  /** Filters applied to the limitations described in the form of key-value pairs. Valid filter names: database-id | engine-name */
  Filters?: Filter[];
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, Fleet Advisor includes a pagination token in the response so that you can retrieve  */
  MaxRecords?: number;
  /** Specifies the unique pagination token that makes it possible to display the next page of results. If this parameter is specified, the response includes only records beyond the marker, up to the value  */
  NextToken?: string;
}

export interface DescribeRecommendationsInput {
  /** Filters applied to the target engine recommendations described in the form of key-value pairs. Valid filter names: database-id | engine-name */
  Filters?: Filter[];
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, Fleet Advisor includes a pagination token in the response so that you can retrieve  */
  MaxRecords?: number;
  /** Specifies the unique pagination token that makes it possible to display the next page of results. If this parameter is specified, the response includes only records beyond the marker, up to the value  */
  NextToken?: string;
}

export interface DescribeRefreshSchemasStatusInput {
  /** The Amazon Resource Name (ARN) string that uniquely identifies the endpoint. */
  EndpointArn: string;
}

export interface DescribeReplicationConfigsInput {
  /** Filters applied to the replication configs. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeReplicationInstancesInput {
  /** Filters applied to replication instances. Valid filter names: replication-instance-arn | replication-instance-id | replication-instance-class | engine-version */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeReplicationInstanceTaskLogsInput {
  /** The Amazon Resource Name (ARN) of the replication instance. */
  ReplicationInstanceArn: string;
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeReplicationsInput {
  /** Filters applied to the replications. Valid filter names: replication-config-arn | replication-config-id */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeReplicationSubnetGroupsInput {
  /** Filters applied to replication subnet groups. Valid filter names: replication-subnet-group-id */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeReplicationTableStatisticsInput {
  /** The replication config to describe. */
  ReplicationConfigArn: string;
  /** Filters applied to the replication table statistics. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeReplicationTaskAssessmentResultsInput {
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The Amazon Resource Name (ARN) string that uniquely identifies the task. When this input parameter is specified, the API returns only one result and ignore the values of the MaxRecords and Marker para */
  ReplicationTaskArn?: string;
}

export interface DescribeReplicationTaskAssessmentRunsInput {
  /** Filters applied to the premigration assessment runs described in the form of key-value pairs. Valid filter names: replication-task-assessment-run-arn, replication-task-arn, replication-instance-arn, s */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeReplicationTaskIndividualAssessmentsInput {
  /** Filters applied to the individual assessments described in the form of key-value pairs. Valid filter names: replication-task-assessment-run-arn, replication-task-arn, status */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeReplicationTasksInput {
  /** Filters applied to replication tasks. Valid filter names: replication-task-arn | replication-task-id | migration-type | endpoint-arn | replication-instance-arn */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** An option to set to avoid returning information about settings. Use this to reduce overhead when setting information is too large. To use this option, choose true; otherwise, choose false (the default */
  WithoutSettings?: boolean;
}

export interface DescribeSchemasInput {
  /** The Amazon Resource Name (ARN) string that uniquely identifies the endpoint. */
  EndpointArn: string;
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeTableStatisticsInput {
  /** The Amazon Resource Name (ARN) of the replication task. */
  ReplicationTaskArn: string;
  /** Filters applied to table statistics. Valid filter names: schema-name | table-name | table-state A combination of filters creates an AND condition where each record matches all specified filters. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface ExportMetadataModelAssessmentInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** A value that specifies the database objects to assess. */
  SelectionRules: string;
  /** The file format of the assessment file. */
  AssessmentReportTypes?: 'pdf' | 'csv'[];
  /** The name of the assessment file to create in your Amazon S3 bucket. */
  FileName?: string;
}

export interface GetTargetSelectionRulesInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** The JSON string representing the source selection rules for conversion. Selection rules must contain only supported metadata model types. For more information, see Selection Rules in the DMS User Guid */
  SelectionRules: string;
}

export interface ImportCertificateInput {
  /** A customer-assigned name for the certificate. Identifiers must begin with a letter and must contain only ASCII letters, digits, and hyphens. They can't end with a hyphen or contain two consecutive hyp */
  CertificateIdentifier: string;
  /** The contents of a .pem file, which contains an X.509 certificate. */
  CertificatePem?: string;
  /** The location of an imported Oracle Wallet certificate for use with SSL. Provide the name of a .sso file using the fileb:// prefix. You can't provide the certificate inline. Example: filebase64("${path */
  CertificateWallet?: string;
  /** An KMS key identifier that is used to encrypt the certificate. If you don't specify a value for the KmsKeyId parameter, then DMS uses your default encryption key. KMS creates the default encryption ke */
  KmsKeyId?: string;
  /** The tags associated with the certificate. */
  Tags?: Tag[];
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) string that uniquely identifies the DMS resource to list tags for. This returns a list of keys (names of tags) created for the resource and their associated tag values. */
  ResourceArn?: string;
  /** List of ARNs that identify multiple DMS resources that you want to list tags for. This returns a list of keys (tag names) and their associated tag values. It also returns each tag's associated Resourc */
  ResourceArnList?: string[];
}

export interface ModifyConversionConfigurationInput {
  /** The new conversion configuration. */
  ConversionConfiguration: string;
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
}

export interface ModifyDataMigrationInput {
  /** The identifier (name or ARN) of the data migration to modify. */
  DataMigrationIdentifier: string;
  /** The new name for the data migration. */
  DataMigrationName?: string;
  /** The new migration type for the data migration. */
  DataMigrationType?: 'full-load' | 'cdc' | 'full-load-and-cdc';
  /** Whether to enable Cloudwatch logs for the data migration. */
  EnableCloudwatchLogs?: boolean;
  /** The number of parallel jobs that trigger parallel threads to unload the tables from the source, and then load them to the target. */
  NumberOfJobs?: number;
  /** A JSON-formatted string that defines what objects to include and exclude from the migration. */
  SelectionRules?: string;
  /** The new service access role ARN for the data migration. */
  ServiceAccessRoleArn?: string;
  /** The new information about the source data provider for the data migration. */
  SourceDataSettings?: SourceDataSetting[];
  /** The new information about the target data provider for the data migration. */
  TargetDataSettings?: TargetDataSetting[];
}

export interface ModifyDataProviderInput {
  /** The identifier of the data provider. Identifiers must begin with a letter and must contain only ASCII letters, digits, and hyphens. They can't end with a hyphen, or contain two consecutive hyphens. */
  DataProviderIdentifier: string;
  /** The name of the data provider. */
  DataProviderName?: string;
  /** A user-friendly description of the data provider. */
  Description?: string;
  /** The type of database engine for the data provider. Valid values include "aurora", "aurora-postgresql", "mysql", "oracle", "postgres", "sqlserver", redshift, mariadb, mongodb, db2, db2-zos, docdb, and  */
  Engine?: string;
  /** If this attribute is Y, the current call to ModifyDataProvider replaces all existing data provider settings with the exact settings that you specify in this call. If this attribute is N, the current c */
  ExactSettings?: boolean;
  /** The settings in JSON format for a data provider. */
  Settings?: any;
  /** Indicates whether the data provider is virtual. */
  Virtual?: boolean;
}

export interface ModifyEndpointInput {
  /** The Amazon Resource Name (ARN) string that uniquely identifies the endpoint. */
  EndpointArn: string;
  /** The Amazon Resource Name (ARN) of the certificate used for SSL connection. */
  CertificateArn?: string;
  /** The name of the endpoint database. For a MySQL source or target endpoint, do not specify DatabaseName. */
  DatabaseName?: string;
  /** The settings in JSON format for the DMS transfer type of source endpoint. Attributes include the following: serviceAccessRoleArn - The Amazon Resource Name (ARN) used by the service access IAM role. T */
  DmsTransferSettings?: DmsTransferSettings;
  /** Settings in JSON format for the source DocumentDB endpoint. For more information about the available settings, see the configuration properties section in Using DocumentDB as a Target for Database Mig */
  DocDbSettings?: DocDbSettings;
  /** Settings in JSON format for the target Amazon DynamoDB endpoint. For information about other available settings, see Using Object Mapping to Migrate Data to DynamoDB in the Database Migration Service  */
  DynamoDbSettings?: DynamoDbSettings;
  /** Settings in JSON format for the target OpenSearch endpoint. For more information about the available settings, see Extra Connection Attributes When Using OpenSearch as a Target for DMS in the Database */
  ElasticsearchSettings?: ElasticsearchSettings;
  /** The database endpoint identifier. Identifiers must begin with a letter and must contain only ASCII letters, digits, and hyphens. They can't end with a hyphen or contain two consecutive hyphens. */
  EndpointIdentifier?: string;
  /** The type of endpoint. Valid values are source and target. */
  EndpointType?: 'source' | 'target';
  /** The database engine name. Valid values, depending on the EndpointType, include "mysql", "oracle", "postgres", "mariadb", "aurora", "aurora-postgresql", "redshift", "s3", "db2", "db2-zos", "azuredb", " */
  EngineName?: string;
  /** If this attribute is Y, the current call to ModifyEndpoint replaces all existing endpoint settings with the exact settings that you specify in this call. If this attribute is N, the current call to Mo */
  ExactSettings?: boolean;
  /** The external table definition. */
  ExternalTableDefinition?: string;
  /** Additional attributes associated with the connection. To reset this parameter, pass the empty string ("") as an argument. */
  ExtraConnectionAttributes?: string;
  /** Settings in JSON format for the source GCP MySQL endpoint. */
  GcpMySQLSettings?: GcpMySQLSettings;
  /** Settings in JSON format for the source IBM Db2 LUW endpoint. For information about other available settings, see Extra connection attributes when using Db2 LUW as a source for DMS in the Database Migr */
  IBMDb2Settings?: IBMDb2Settings;
  /** Settings in JSON format for the target Apache Kafka endpoint. For more information about the available settings, see Using object mapping to migrate data to a Kafka topic in the Database Migration Ser */
  KafkaSettings?: KafkaSettings;
  /** Settings in JSON format for the target endpoint for Amazon Kinesis Data Streams. For more information about the available settings, see Using object mapping to migrate data to a Kinesis data stream in */
  KinesisSettings?: KinesisSettings;
  /** Settings in JSON format for the source and target Microsoft SQL Server endpoint. For information about other available settings, see Extra connection attributes when using SQL Server as a source for D */
  MicrosoftSQLServerSettings?: MicrosoftSQLServerSettings;
  /** Settings in JSON format for the source MongoDB endpoint. For more information about the available settings, see the configuration properties section in Endpoint configuration settings when using Mongo */
  MongoDbSettings?: MongoDbSettings;
  /** Settings in JSON format for the source and target MySQL endpoint. For information about other available settings, see Extra connection attributes when using MySQL as a source for DMS and Extra connect */
  MySQLSettings?: MySQLSettings;
  /** Settings in JSON format for the target Amazon Neptune endpoint. For more information about the available settings, see Specifying graph-mapping rules using Gremlin and R2RML for Amazon Neptune as a ta */
  NeptuneSettings?: NeptuneSettings;
  /** Settings in JSON format for the source and target Oracle endpoint. For information about other available settings, see Extra connection attributes when using Oracle as a source for DMS and Extra conne */
  OracleSettings?: OracleSettings;
  /** The password to be used to login to the endpoint database. */
  Password?: string;
  /** The port used by the endpoint database. */
  Port?: number;
  /** Settings in JSON format for the source and target PostgreSQL endpoint. For information about other available settings, see Extra connection attributes when using PostgreSQL as a source for DMS and Ext */
  PostgreSQLSettings?: PostgreSQLSettings;
  /** Settings in JSON format for the Redis target endpoint. */
  RedisSettings?: RedisSettings;
  RedshiftSettings?: RedshiftSettings;
  /** Settings in JSON format for the target Amazon S3 endpoint. For more information about the available settings, see Extra Connection Attributes When Using Amazon S3 as a Target for DMS in the Database M */
  S3Settings?: S3Settings;
  /** The name of the server where the endpoint database resides. */
  ServerName?: string;
  /** The Amazon Resource Name (ARN) for the IAM role you want to use to modify the endpoint. The role must allow the iam:PassRole action. */
  ServiceAccessRoleArn?: string;
  /** The SSL mode used to connect to the endpoint. The default value is none. */
  SslMode?: 'none' | 'require' | 'verify-ca' | 'verify-full';
  /** Settings in JSON format for the source and target SAP ASE endpoint. For information about other available settings, see Extra connection attributes when using SAP ASE as a source for DMS and Extra con */
  SybaseSettings?: SybaseSettings;
  /** Settings in JSON format for the target Amazon Timestream endpoint. */
  TimestreamSettings?: TimestreamSettings;
  /** The user name to be used to login to the endpoint database. */
  Username?: string;
}

export interface ModifyEventSubscriptionInput {
  /** The name of the DMS event notification subscription to be modified. */
  SubscriptionName: string;
  /** A Boolean value; set to true to activate the subscription. */
  Enabled?: boolean;
  /** A list of event categories for a source type that you want to subscribe to. Use the DescribeEventCategories action to see a list of event categories. */
  EventCategories?: string[];
  /** The Amazon Resource Name (ARN) of the Amazon SNS topic created for event notification. The ARN is created by Amazon SNS when you create a topic and subscribe to it. */
  SnsTopicArn?: string;
  /** The type of DMS resource that generates the events you want to subscribe to. Valid values: replication-instance | replication-task */
  SourceType?: string;
}

export interface ModifyInstanceProfileInput {
  /** The identifier of the instance profile. Identifiers must begin with a letter and must contain only ASCII letters, digits, and hyphens. They can't end with a hyphen, or contain two consecutive hyphens. */
  InstanceProfileIdentifier: string;
  /** The Availability Zone where the instance profile runs. */
  AvailabilityZone?: string;
  /** A user-friendly description for the instance profile. */
  Description?: string;
  /** A user-friendly name for the instance profile. */
  InstanceProfileName?: string;
  /** The Amazon Resource Name (ARN) of the KMS key that is used to encrypt the connection parameters for the instance profile. If you don't specify a value for the KmsKeyArn parameter, then DMS uses an Ama */
  KmsKeyArn?: string;
  /** Specifies the network type for the instance profile. A value of IPV4 represents an instance profile with IPv4 network type and only supports IPv4 addressing. A value of IPV6 represents an instance pro */
  NetworkType?: string;
  /** Specifies the accessibility options for the instance profile. A value of true represents an instance profile with a public IP address. A value of false represents an instance profile with a private IP */
  PubliclyAccessible?: boolean;
  /** A subnet group to associate with the instance profile. */
  SubnetGroupIdentifier?: string;
  /** Specifies the VPC security groups to be used with the instance profile. The VPC security group must work with the VPC containing the instance profile. */
  VpcSecurityGroups?: string[];
}

export interface ModifyMigrationProjectInput {
  /** The identifier of the migration project. Identifiers must begin with a letter and must contain only ASCII letters, digits, and hyphens. They can't end with a hyphen, or contain two consecutive hyphens */
  MigrationProjectIdentifier: string;
  /** A user-friendly description of the migration project. */
  Description?: string;
  /** The name or Amazon Resource Name (ARN) for the instance profile. */
  InstanceProfileIdentifier?: string;
  /** A user-friendly name for the migration project. */
  MigrationProjectName?: string;
  /** The schema conversion application attributes, including the Amazon S3 bucket name and Amazon S3 role ARN. */
  SchemaConversionApplicationAttributes?: SCApplicationAttributes;
  /** Information about the source data provider, including the name, ARN, and Amazon Web Services Secrets Manager parameters. */
  SourceDataProviderDescriptors?: DataProviderDescriptorDefinition[];
  /** Information about the target data provider, including the name, ARN, and Amazon Web Services Secrets Manager parameters. */
  TargetDataProviderDescriptors?: DataProviderDescriptorDefinition[];
  /** The settings in JSON format for migration rules. Migration rules make it possible for you to change the object names according to the rules that you specify. For example, you can change an object name */
  TransformationRules?: string;
}

export interface ModifyReplicationConfigInput {
  /** The Amazon Resource Name of the replication to modify. */
  ReplicationConfigArn: string;
  /** Configuration parameters for provisioning an DMS Serverless replication. */
  ComputeConfig?: ComputeConfig;
  /** The new replication config to apply to the replication. */
  ReplicationConfigIdentifier?: string;
  /** The settings for the replication. */
  ReplicationSettings?: string;
  /** The type of replication. */
  ReplicationType?: 'full-load' | 'cdc' | 'full-load-and-cdc';
  /** The Amazon Resource Name (ARN) of the source endpoint for this DMS serverless replication configuration. */
  SourceEndpointArn?: string;
  /** Additional settings for the replication. */
  SupplementalSettings?: string;
  /** Table mappings specified in the replication. */
  TableMappings?: string;
  /** The Amazon Resource Name (ARN) of the target endpoint for this DMS serverless replication configuration. */
  TargetEndpointArn?: string;
}

export interface ModifyReplicationInstanceInput {
  /** The Amazon Resource Name (ARN) of the replication instance. */
  ReplicationInstanceArn: string;
  /** The amount of storage (in gigabytes) to be allocated for the replication instance. */
  AllocatedStorage?: number;
  /** Indicates that major version upgrades are allowed. Changing this parameter does not result in an outage, and the change is asynchronously applied as soon as possible. This parameter must be set to tru */
  AllowMajorVersionUpgrade?: boolean;
  /** Indicates whether the changes should be applied immediately or during the next maintenance window. */
  ApplyImmediately?: boolean;
  /** A value that indicates that minor version upgrades are applied automatically to the replication instance during the maintenance window. Changing this parameter doesn't result in an outage, except in t */
  AutoMinorVersionUpgrade?: boolean;
  /** The engine version number of the replication instance. When modifying a major engine version of an instance, also set AllowMajorVersionUpgrade to true. */
  EngineVersion?: string;
  /** Specifies the settings required for kerberos authentication when modifying a replication instance. */
  KerberosAuthenticationSettings?: KerberosAuthenticationSettings;
  /** Specifies whether the replication instance is a Multi-AZ deployment. You can't set the AvailabilityZone parameter if the Multi-AZ parameter is set to true. */
  MultiAZ?: boolean;
  /** The type of IP address protocol used by a replication instance, such as IPv4 only or Dual-stack that supports both IPv4 and IPv6 addressing. IPv6 only is not yet supported. */
  NetworkType?: string;
  /** The weekly time range (in UTC) during which system maintenance can occur, which might result in an outage. Changing this parameter does not result in an outage, except in the following situation, and  */
  PreferredMaintenanceWindow?: string;
  /** The compute and memory capacity of the replication instance as defined for the specified replication instance class. For example to specify the instance class dms.c4.large, set this parameter to "dms. */
  ReplicationInstanceClass?: string;
  /** The replication instance identifier. This parameter is stored as a lowercase string. */
  ReplicationInstanceIdentifier?: string;
  /** Specifies the VPC security group to be used with the replication instance. The VPC security group must work with the VPC containing the replication instance. */
  VpcSecurityGroupIds?: string[];
}

export interface ModifyReplicationSubnetGroupInput {
  /** The name of the replication instance subnet group. */
  ReplicationSubnetGroupIdentifier: string;
  /** A list of subnet IDs. */
  SubnetIds: string[];
  /** A description for the replication instance subnet group. */
  ReplicationSubnetGroupDescription?: string;
}

export interface ModifyReplicationTaskInput {
  /** The Amazon Resource Name (ARN) of the replication task. */
  ReplicationTaskArn: string;
  /** Indicates when you want a change data capture (CDC) operation to start. Use either CdcStartPosition or CdcStartTime to specify when you want a CDC operation to start. Specifying both values results in */
  CdcStartPosition?: string;
  /** Indicates the start time for a change data capture (CDC) operation. Use either CdcStartTime or CdcStartPosition to specify when you want a CDC operation to start. Specifying both values results in an  */
  CdcStartTime?: string;
  /** Indicates when you want a change data capture (CDC) operation to stop. The value can be either server time or commit time. Server time example: --cdc-stop-position “server_time:2018-02-09T12:12:12” Co */
  CdcStopPosition?: string;
  /** The migration type. Valid values: full-load | cdc | full-load-and-cdc */
  MigrationType?: 'full-load' | 'cdc' | 'full-load-and-cdc';
  /** The replication task identifier. Constraints: Must contain 1-255 alphanumeric characters or hyphens. First character must be a letter. Cannot end with a hyphen or contain two consecutive hyphens. */
  ReplicationTaskIdentifier?: string;
  /** JSON file that contains settings for the task, such as task metadata settings. */
  ReplicationTaskSettings?: string;
  /** When using the CLI or boto3, provide the path of the JSON file that contains the table mappings. Precede the path with file://. For example, --table-mappings file://mappingfile.json. When working with */
  TableMappings?: string;
  /** Supplemental information that the task requires to migrate the data for certain source and target endpoints. For more information, see Specifying Supplemental Data for Task Settings in the Database Mi */
  TaskData?: string;
}

export interface MoveReplicationTaskInput {
  /** The Amazon Resource Name (ARN) of the task that you want to move. */
  ReplicationTaskArn: string;
  /** The ARN of the replication instance where you want to move the task to. */
  TargetReplicationInstanceArn: string;
}

export interface RebootReplicationInstanceInput {
  /** The Amazon Resource Name (ARN) of the replication instance. */
  ReplicationInstanceArn: string;
  /** If this parameter is true, the reboot is conducted through a Multi-AZ failover. If the instance isn't configured for Multi-AZ, then you can't specify true. ( --force-planned-failover and --force-failo */
  ForceFailover?: boolean;
  /** If this parameter is true, the reboot is conducted through a planned Multi-AZ failover where resources are released and cleaned up prior to conducting the failover. If the instance isn''t configured f */
  ForcePlannedFailover?: boolean;
}

export interface RefreshSchemasInput {
  /** The Amazon Resource Name (ARN) string that uniquely identifies the endpoint. */
  EndpointArn: string;
  /** The Amazon Resource Name (ARN) of the replication instance. */
  ReplicationInstanceArn: string;
}

export interface ReloadReplicationTablesInput {
  /** The Amazon Resource Name of the replication config for which to reload tables. */
  ReplicationConfigArn: string;
  /** The list of tables to reload. */
  TablesToReload: TableToReload[];
  /** Options for reload. Specify data-reload to reload the data and re-validate it if validation is enabled. Specify validate-only to re-validate the table. This option applies only when validation is enab */
  ReloadOption?: 'data-reload' | 'validate-only';
}

export interface ReloadTablesInput {
  /** The Amazon Resource Name (ARN) of the replication task. */
  ReplicationTaskArn: string;
  /** The name and schema of the table to be reloaded. */
  TablesToReload: TableToReload[];
  /** Options for reload. Specify data-reload to reload the data and re-validate it if validation is enabled. Specify validate-only to re-validate the table. This option applies only when validation is enab */
  ReloadOption?: 'data-reload' | 'validate-only';
}

/** Removes one or more tags from an DMS resource. */
export interface RemoveTagsFromResourceInput {
  /** An DMS resource from which you want to remove tag(s). The value for this parameter is an Amazon Resource Name (ARN). */
  ResourceArn: string;
  /** The tag key (name) of the tag to be removed. */
  TagKeys: string[];
}

export interface StartDataMigrationInput {
  /** The identifier (name or ARN) of the data migration to start. */
  DataMigrationIdentifier: string;
  /** Specifies the start type for the data migration. Valid values include start-replication, reload-target, and resume-processing. */
  StartType: 'reload-target' | 'resume-processing' | 'start-replication';
}

export interface StartExtensionPackAssociationInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
}

export interface StartMetadataModelAssessmentInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** A value that specifies the database objects to assess. */
  SelectionRules: string;
}

export interface StartMetadataModelConversionInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** A value that specifies the database objects to convert. */
  SelectionRules: string;
}

export interface StartMetadataModelCreationInput {
  /** The name of the metadata model. */
  MetadataModelName: string;
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** The properties of metadata model in JSON format. This object is a Union. Only one member of this object can be specified or returned. */
  Properties: { StatementProperties?: StatementProperties };
  /** The JSON string that specifies the location where the metadata model will be created. Selection rules must specify a single schema. For more information, see Selection Rules in the DMS User Guide. */
  SelectionRules: string;
}

export interface StartMetadataModelExportAsScriptInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** Whether to export the metadata model from the source or the target. */
  Origin: 'SOURCE' | 'TARGET';
  /** A value that specifies the database objects to export. */
  SelectionRules: string;
  /** The name of the model file to create in the Amazon S3 bucket. */
  FileName?: string;
}

export interface StartMetadataModelExportToTargetInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** A value that specifies the database objects to export. */
  SelectionRules: string;
  /** Whether to overwrite the migration project extension pack. An extension pack is an add-on module that emulates functions present in a source database that are required when converting objects to the t */
  OverwriteExtensionPack?: boolean;
}

export interface StartMetadataModelImportInput {
  /** The migration project name or Amazon Resource Name (ARN). */
  MigrationProjectIdentifier: string;
  /** Whether to load metadata to the source or target database. */
  Origin: 'SOURCE' | 'TARGET';
  /** A value that specifies the database objects to import. */
  SelectionRules: string;
  /** If true, DMS loads metadata for the specified objects from the source database. */
  Refresh?: boolean;
}

export interface StartRecommendationsInput {
  /** The identifier of the source database to analyze and provide recommendations for. */
  DatabaseId: string;
  /** The settings in JSON format that Fleet Advisor uses to determine target engine recommendations. These parameters include target instance sizing and availability and durability settings. For target ins */
  Settings: RecommendationSettings;
}

export interface StartReplicationInput {
  /** The Amazon Resource Name of the replication for which to start replication. */
  ReplicationConfigArn: string;
  /** The replication type. When the replication type is full-load or full-load-and-cdc, the only valid value for the first run of the replication is start-replication. This option will start the replicatio */
  StartReplicationType: string;
  /** Indicates when you want a change data capture (CDC) operation to start. Use either CdcStartPosition or CdcStartTime to specify when you want a CDC operation to start. Specifying both values results in */
  CdcStartPosition?: string;
  /** Indicates the start time for a change data capture (CDC) operation. Use either CdcStartTime or CdcStartPosition to specify when you want a CDC operation to start. Specifying both values results in an  */
  CdcStartTime?: string;
  /** Indicates when you want a change data capture (CDC) operation to stop. The value can be either server time or commit time. */
  CdcStopPosition?: string;
  /** User-defined settings for the premigration assessment. The possible values are: ResultLocationFolder: The folder within an Amazon S3 bucket where you want DMS to store the results of this assessment r */
  PremigrationAssessmentSettings?: string;
}

export interface StartReplicationTaskInput {
  /** The Amazon Resource Name (ARN) of the replication task to be started. */
  ReplicationTaskArn: string;
  /** The type of replication task to start. start-replication is the only valid action that can be used for the first time a task with the migration type of full-loadfull-load, full-load-and-cdc or cdc is  */
  StartReplicationTaskType: 'start-replication' | 'resume-processing' | 'reload-target';
  /** Indicates when you want a change data capture (CDC) operation to start. Use either CdcStartPosition or CdcStartTime to specify when you want a CDC operation to start. Specifying both values results in */
  CdcStartPosition?: string;
  /** Indicates the start time for a change data capture (CDC) operation. Use either CdcStartTime or CdcStartPosition to specify when you want a CDC operation to start. Specifying both values results in an  */
  CdcStartTime?: string;
  /** Indicates when you want a change data capture (CDC) operation to stop. The value can be either server time or commit time. Server time example: --cdc-stop-position “server_time:2018-02-09T12:12:12” Co */
  CdcStopPosition?: string;
}

export interface StartReplicationTaskAssessmentInput {
  /** The Amazon Resource Name (ARN) of the replication task. */
  ReplicationTaskArn: string;
}

export interface StartReplicationTaskAssessmentRunInput {
  /** Unique name to identify the assessment run. */
  AssessmentRunName: string;
  /** Amazon Resource Name (ARN) of the migration task associated with the premigration assessment run that you want to start. */
  ReplicationTaskArn: string;
  /** Amazon S3 bucket where you want DMS to store the results of this assessment run. */
  ResultLocationBucket: string;
  /** ARN of the service role needed to start the assessment run. The role must allow the iam:PassRole action. */
  ServiceAccessRoleArn: string;
  /** Space-separated list of names for specific individual assessments that you want to exclude. These names come from the default list of individual assessments that DMS supports for the associated migrat */
  Exclude?: string[];
  /** Space-separated list of names for specific individual assessments that you want to include. These names come from the default list of individual assessments that DMS supports for the associated migrat */
  IncludeOnly?: string[];
  /** Encryption mode that you can specify to encrypt the results of this assessment run. If you don't specify this request parameter, DMS stores the assessment run results without encryption. You can speci */
  ResultEncryptionMode?: string;
  /** ARN of a custom KMS encryption key that you specify when you set ResultEncryptionMode to "SSE_KMS". */
  ResultKmsKeyArn?: string;
  /** Folder within an Amazon S3 bucket where you want DMS to store the results of this assessment run. */
  ResultLocationFolder?: string;
  /** One or more tags to be assigned to the premigration assessment run that you want to start. */
  Tags?: Tag[];
}

export interface StopDataMigrationInput {
  /** The identifier (name or ARN) of the data migration to stop. */
  DataMigrationIdentifier: string;
}

export interface StopReplicationInput {
  /** The Amazon Resource Name of the replication to stop. */
  ReplicationConfigArn: string;
}

export interface StopReplicationTaskInput {
  /** The Amazon Resource Name(ARN) of the replication task to be stopped. */
  ReplicationTaskArn: string;
}

export interface TestConnectionInput {
  /** The Amazon Resource Name (ARN) string that uniquely identifies the endpoint. */
  EndpointArn: string;
  /** The Amazon Resource Name (ARN) of the replication instance. */
  ReplicationInstanceArn: string;
}

export interface UpdateSubscriptionsToEventBridgeInput {
  /** When set to true, this operation migrates DMS subscriptions for Amazon SNS notifications no matter what your replication instance version is. If not set or set to false, this operation runs only when  */
  ForceMove?: boolean;
}

/** Database Migration Service service binding for Step Functions SDK integrations. */
export class DatabaseMigrationService {
  constructor() {}

  addTagsToResource<T>(params: AddTagsToResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  applyPendingMaintenanceAction<T>(params: ApplyPendingMaintenanceActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchStartRecommendations<T>(params: BatchStartRecommendationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelMetadataModelConversion<T>(params: CancelMetadataModelConversionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelMetadataModelCreation<T>(params: CancelMetadataModelCreationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelReplicationTaskAssessmentRun<T>(params: CancelReplicationTaskAssessmentRunInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDataMigration<T>(params: CreateDataMigrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDataProvider<T>(params: CreateDataProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEndpoint<T>(params: CreateEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEventSubscription<T>(params: CreateEventSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createFleetAdvisorCollector<T>(params: CreateFleetAdvisorCollectorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createInstanceProfile<T>(params: CreateInstanceProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createMigrationProject<T>(params: CreateMigrationProjectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createReplicationConfig<T>(params: CreateReplicationConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createReplicationInstance<T>(params: CreateReplicationInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createReplicationSubnetGroup<T>(params: CreateReplicationSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createReplicationTask<T>(params: CreateReplicationTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCertificate<T>(params: DeleteCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteConnection<T>(params: DeleteConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDataMigration<T>(params: DeleteDataMigrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDataProvider<T>(params: DeleteDataProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEndpoint<T>(params: DeleteEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEventSubscription<T>(params: DeleteEventSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteFleetAdvisorCollector<T>(params: DeleteFleetAdvisorCollectorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteFleetAdvisorDatabases<T>(params: DeleteFleetAdvisorDatabasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteInstanceProfile<T>(params: DeleteInstanceProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteMigrationProject<T>(params: DeleteMigrationProjectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteReplicationConfig<T>(params: DeleteReplicationConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteReplicationInstance<T>(params: DeleteReplicationInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteReplicationSubnetGroup<T>(params: DeleteReplicationSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteReplicationTask<T>(params: DeleteReplicationTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteReplicationTaskAssessmentRun<T>(params: DeleteReplicationTaskAssessmentRunInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAccountAttributes<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeApplicableIndividualAssessments<T>(params: DescribeApplicableIndividualAssessmentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCertificates<T>(params: DescribeCertificatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConnections<T>(params: DescribeConnectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConversionConfiguration<T>(params: DescribeConversionConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDataMigrations<T>(params: DescribeDataMigrationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDataProviders<T>(params: DescribeDataProvidersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEndpoints<T>(params: DescribeEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEndpointSettings<T>(params: DescribeEndpointSettingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEndpointTypes<T>(params: DescribeEndpointTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEngineVersions<T>(params: DescribeEngineVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEventCategories<T>(params: DescribeEventCategoriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEvents<T>(params: DescribeEventsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEventSubscriptions<T>(params: DescribeEventSubscriptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeExtensionPackAssociations<T>(params: DescribeExtensionPackAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFleetAdvisorCollectors<T>(params: DescribeFleetAdvisorCollectorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFleetAdvisorDatabases<T>(params: DescribeFleetAdvisorDatabasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFleetAdvisorLsaAnalysis<T>(params: DescribeFleetAdvisorLsaAnalysisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFleetAdvisorSchemaObjectSummary<T>(params: DescribeFleetAdvisorSchemaObjectSummaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFleetAdvisorSchemas<T>(params: DescribeFleetAdvisorSchemasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceProfiles<T>(params: DescribeInstanceProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMetadataModel<T>(params: DescribeMetadataModelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMetadataModelAssessments<T>(params: DescribeMetadataModelAssessmentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMetadataModelChildren<T>(params: DescribeMetadataModelChildrenInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMetadataModelConversions<T>(params: DescribeMetadataModelConversionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMetadataModelCreations<T>(params: DescribeMetadataModelCreationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMetadataModelExportsAsScript<T>(params: DescribeMetadataModelExportsAsScriptInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMetadataModelExportsToTarget<T>(params: DescribeMetadataModelExportsToTargetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMetadataModelImports<T>(params: DescribeMetadataModelImportsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMigrationProjects<T>(params: DescribeMigrationProjectsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOrderableReplicationInstances<T>(params: DescribeOrderableReplicationInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePendingMaintenanceActions<T>(params: DescribePendingMaintenanceActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRecommendationLimitations<T>(params: DescribeRecommendationLimitationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRecommendations<T>(params: DescribeRecommendationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRefreshSchemasStatus<T>(params: DescribeRefreshSchemasStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplicationConfigs<T>(params: DescribeReplicationConfigsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplicationInstances<T>(params: DescribeReplicationInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplicationInstanceTaskLogs<T>(params: DescribeReplicationInstanceTaskLogsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplications<T>(params: DescribeReplicationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplicationSubnetGroups<T>(params: DescribeReplicationSubnetGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplicationTableStatistics<T>(params: DescribeReplicationTableStatisticsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplicationTaskAssessmentResults<T>(params: DescribeReplicationTaskAssessmentResultsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplicationTaskAssessmentRuns<T>(params: DescribeReplicationTaskAssessmentRunsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplicationTaskIndividualAssessments<T>(params: DescribeReplicationTaskIndividualAssessmentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplicationTasks<T>(params: DescribeReplicationTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSchemas<T>(params: DescribeSchemasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTableStatistics<T>(params: DescribeTableStatisticsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  exportMetadataModelAssessment<T>(params: ExportMetadataModelAssessmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTargetSelectionRules<T>(params: GetTargetSelectionRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importCertificate<T>(params: ImportCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyConversionConfiguration<T>(params: ModifyConversionConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDataMigration<T>(params: ModifyDataMigrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDataProvider<T>(params: ModifyDataProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyEndpoint<T>(params: ModifyEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyEventSubscription<T>(params: ModifyEventSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceProfile<T>(params: ModifyInstanceProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyMigrationProject<T>(params: ModifyMigrationProjectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyReplicationConfig<T>(params: ModifyReplicationConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyReplicationInstance<T>(params: ModifyReplicationInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyReplicationSubnetGroup<T>(params: ModifyReplicationSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyReplicationTask<T>(params: ModifyReplicationTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  moveReplicationTask<T>(params: MoveReplicationTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rebootReplicationInstance<T>(params: RebootReplicationInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  refreshSchemas<T>(params: RefreshSchemasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  reloadReplicationTables<T>(params: ReloadReplicationTablesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  reloadTables<T>(params: ReloadTablesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeTagsFromResource<T>(params: RemoveTagsFromResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  runFleetAdvisorLsaAnalysis<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDataMigration<T>(params: StartDataMigrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startExtensionPackAssociation<T>(params: StartExtensionPackAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startMetadataModelAssessment<T>(params: StartMetadataModelAssessmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startMetadataModelConversion<T>(params: StartMetadataModelConversionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startMetadataModelCreation<T>(params: StartMetadataModelCreationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startMetadataModelExportAsScript<T>(params: StartMetadataModelExportAsScriptInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startMetadataModelExportToTarget<T>(params: StartMetadataModelExportToTargetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startMetadataModelImport<T>(params: StartMetadataModelImportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startRecommendations<T>(params: StartRecommendationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startReplication<T>(params: StartReplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startReplicationTask<T>(params: StartReplicationTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startReplicationTaskAssessment<T>(params: StartReplicationTaskAssessmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startReplicationTaskAssessmentRun<T>(params: StartReplicationTaskAssessmentRunInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopDataMigration<T>(params: StopDataMigrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopReplication<T>(params: StopReplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopReplicationTask<T>(params: StopReplicationTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testConnection<T>(params: TestConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSubscriptionsToEventBridge<T>(params: UpdateSubscriptionsToEventBridgeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
