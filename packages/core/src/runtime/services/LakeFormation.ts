// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface CatalogResource {
  /** An identifier for the catalog resource. */
  Id?: string;
}

export interface DatabaseResource {
  /** The identifier for the Data Catalog. By default, it is the account ID of the caller. */
  CatalogId?: string;
  /** The name of the database resource. Unique to the Data Catalog. */
  Name: string;
}

export interface TableResource {
  /** The identifier for the Data Catalog. By default, it is the account ID of the caller. */
  CatalogId?: string;
  /** The name of the database for the table. Unique to a Data Catalog. A database is a set of associated table definitions organized into a logical group. You can Grant and Revoke database privileges to a  */
  DatabaseName: string;
  /** The name of the table. */
  Name?: string;
  /** A wildcard object representing every table under a database. At least one of TableResource$Name or TableResource$TableWildcard is required. */
  TableWildcard?: any;
}

export interface TableWithColumnsResource {
  /** The identifier for the Data Catalog. By default, it is the account ID of the caller. */
  CatalogId?: string;
  /** The name of the database for the table with columns resource. Unique to the Data Catalog. A database is a set of associated table definitions organized into a logical group. You can Grant and Revoke d */
  DatabaseName: string;
  /** The name of the table resource. A table is a metadata definition that represents your data. You can Grant and Revoke table privileges to a principal. */
  Name: string;
  /** The list of column names for the table. At least one of ColumnNames or ColumnWildcard is required. */
  ColumnNames?: any[];
  /** A wildcard specified by a ColumnWildcard object. At least one of ColumnNames or ColumnWildcard is required. */
  ColumnWildcard?: any;
}

export interface DataLocationResource {
  /** The identifier for the Data Catalog where the location is registered with Lake Formation. By default, it is the account ID of the caller. */
  CatalogId?: string;
  /** The Amazon Resource Name (ARN) that uniquely identifies the data location resource. */
  ResourceArn: string;
}

export interface DataCellsFilterResource {
  /** The ID of the catalog to which the table belongs. */
  TableCatalogId?: string;
  /** A database in the Glue Data Catalog. */
  DatabaseName?: string;
  /** The name of the table. */
  TableName?: string;
  /** The name of the data cells filter. */
  Name?: string;
}

export interface LFTagKeyResource {
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  /** The key-name for the LF-tag. */
  TagKey: string;
  /** A list of possible values an attribute can take. */
  TagValues: any[];
}

export interface LFTagPolicyResource {
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  /** The resource type for which the LF-tag policy applies. */
  ResourceType: 'DATABASE' | 'TABLE';
  /** A list of LF-tag conditions or a saved expression that apply to the resource's LF-tag policy. */
  Expression?: any[];
  /** If provided, permissions are granted to the Data Catalog resources whose assigned LF-Tags match the expression body of the saved expression under the provided ExpressionName. */
  ExpressionName?: string;
}

export interface LFTagExpressionResource {
  /** The identifier for the Data Catalog. By default, the account ID. */
  CatalogId?: string;
  /** The name of the LF-Tag expression to grant permissions on. */
  Name: string;
}

export interface Resource {
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  Catalog?: CatalogResource;
  /** The database for the resource. Unique to the Data Catalog. A database is a set of associated table definitions organized into a logical group. You can Grant and Revoke database permissions to a princi */
  Database?: DatabaseResource;
  /** The table for the resource. A table is a metadata definition that represents your data. You can Grant and Revoke table privileges to a principal. */
  Table?: TableResource;
  /** The table with columns for the resource. A principal with permissions to this resource can select metadata from the columns of a table in the Data Catalog and the underlying data in Amazon S3. */
  TableWithColumns?: TableWithColumnsResource;
  /** The location of an Amazon S3 path where permissions are granted or revoked. */
  DataLocation?: DataLocationResource;
  /** A data cell filter. */
  DataCellsFilter?: DataCellsFilterResource;
  /** The LF-Tag key and values attached to a resource. */
  LFTag?: LFTagKeyResource;
  /** A list of LF-tag conditions or saved LF-Tag expressions that define a resource's LF-tag policy. */
  LFTagPolicy?: LFTagPolicyResource;
  /** LF-Tag expression resource. A logical expression composed of one or more LF-Tag key:value pairs. */
  LFTagExpression?: LFTagExpressionResource;
}

export interface LFTagPair {
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  /** The key-name for the LF-tag. */
  TagKey: string;
  /** A list of possible values an attribute can take. */
  TagValues: any[];
}

export interface BatchPermissionsRequestEntry {
  /** A unique identifier for the batch permissions request entry. */
  Id: string;
  /** The principal to be granted a permission. */
  Principal?: any;
  /** The resource to which the principal is to be granted a permission. */
  Resource?: any;
  /** The permissions to be granted. */
  Permissions?: any[];
  Condition?: any;
  /** Indicates if the option to pass permissions is granted. */
  PermissionsWithGrantOption?: any[];
}

export interface RowFilter {
  /** A filter expression. */
  FilterExpression?: string;
  /** A wildcard for all rows. */
  AllRowsWildcard?: any;
}

export interface ColumnWildcard {
  /** Excludes column names. Any column with this name will be excluded. */
  ExcludedColumnNames?: any[];
}

export interface DataCellsFilter {
  /** The ID of the catalog to which the table belongs. */
  TableCatalogId: string;
  /** A database in the Glue Data Catalog. */
  DatabaseName: string;
  /** A table in the database. */
  TableName: string;
  /** The name given by the user to the data filter cell. */
  Name: string;
  /** A PartiQL predicate. */
  RowFilter?: RowFilter;
  /** A list of column names and/or nested column attributes. When specifying nested attributes, use a qualified dot (.) delimited format such as "address"."zip". Nested attributes within this list may not  */
  ColumnNames?: string[];
  /** A wildcard with exclusions. You must specify either a ColumnNames list or the ColumnWildCard. */
  ColumnWildcard?: ColumnWildcard;
  /** The ID of the data cells filter version. */
  VersionId?: string;
}

export interface ExternalFilteringConfiguration {
  /** Allows to enable or disable the third-party applications that are allowed to access data managed by Lake Formation. */
  Status: 'ENABLED' | 'DISABLED';
  /** List of third-party application ARNs integrated with Lake Formation. */
  AuthorizedTargets: string[];
}

export interface DataLakePrincipal {
  /** An identifier for the Lake Formation principal. */
  DataLakePrincipalIdentifier?: string;
}

export interface Condition {
  /** An expression written based on the Cedar Policy Language used to match the principal attributes. */
  Expression?: string;
}

export interface LFTag {
  /** The key-name for the LF-tag. */
  TagKey: string;
  /** A list of possible values an attribute can take. The maximum number of values that can be defined for a LF-Tag is 1000. A single API call supports 50 values. You can use multiple API calls to add more */
  TagValues: any[];
}

export interface VirtualObject {
  /** The path to the Amazon S3 object. Must start with s3:// */
  Uri: string;
  /** The ETag of the Amazon S3 object. */
  ETag?: string;
}

export interface AuditContext {
  /** The filter engine can populate the 'AdditionalAuditContext' information with the request ID for you to track. This information will be displayed in CloudTrail log in your account. */
  AdditionalAuditContext?: string;
}

export interface PartitionValueList {
  /** The list of partition values. */
  Values: string[];
}

export interface QuerySessionContext {
  /** A unique identifier generated by the query engine for the query. */
  QueryId?: string;
  /** A timestamp provided by the query engine for when the query started. */
  QueryStartTime?: string;
  /** An identifier string for the consumer cluster. */
  ClusterId?: string;
  /** A cryptographically generated query identifier generated by Glue or Lake Formation. */
  QueryAuthorizationId?: string;
  /** An opaque string-string map passed by the query engine. */
  AdditionalContext?: Record<string, string>;
}

export interface FilterCondition {
  /** The field to filter in the filter condition. */
  Field?: 'RESOURCE_ARN' | 'ROLE_ARN' | 'LAST_MODIFIED';
  /** The comparison operator used in the filter condition. */
  ComparisonOperator?: 'EQ' | 'NE' | 'LE' | 'LT' | 'GE' | 'GT' | 'CONTAINS' | 'NOT_CONTAINS' | 'BEGINS_WITH' | 'IN' | 'BETWEEN';
  /** A string with values used in evaluating the filter condition. */
  StringValueList?: any[];
}

export interface DataLakeSettings {
  /** A list of Lake Formation principals. Supported principals are IAM users or IAM roles. */
  DataLakeAdmins?: any[];
  /** A list of Lake Formation principals with only view access to the resources, without the ability to make changes. Supported principals are IAM users or IAM roles. */
  ReadOnlyAdmins?: any[];
  /** Specifies whether access control on newly created database is managed by Lake Formation permissions or exclusively by IAM permissions. A null value indicates access control by Lake Formation permissio */
  CreateDatabaseDefaultPermissions?: any[];
  /** Specifies whether access control on newly created table is managed by Lake Formation permissions or exclusively by IAM permissions. A null value indicates access control by Lake Formation permissions. */
  CreateTableDefaultPermissions?: any[];
  /** A key-value map that provides an additional configuration on your data lake. CROSS_ACCOUNT_VERSION is the key you can configure in the Parameters field. Accepted values for the CrossAccountVersion key */
  Parameters?: Record<string, string>;
  /** A list of the resource-owning account IDs that the caller's account can use to share their user access details (user ARNs). The user ARNs can be logged in the resource owner's CloudTrail log. You may  */
  TrustedResourceOwners?: string[];
  /** Whether to allow Amazon EMR clusters to access data managed by Lake Formation. If true, you allow Amazon EMR clusters to access data in Amazon S3 locations that are registered with Lake Formation. If  */
  AllowExternalDataFiltering?: boolean;
  /** Whether to allow a third-party query engine to get data access credentials without session tags when a caller has full data access permissions. */
  AllowFullTableExternalDataAccess?: boolean;
  /** A list of the account IDs of Amazon Web Services accounts with Amazon EMR clusters that are to perform data filtering.> */
  ExternalDataFilteringAllowList?: any[];
  /** Lake Formation relies on a privileged process secured by Amazon EMR or the third party integrator to tag the user's role while assuming it. Lake Formation will publish the acceptable key-value pair, f */
  AuthorizedSessionTagValueList?: string[];
}

export interface QueryPlanningContext {
  /** The ID of the Data Catalog where the partition in question resides. If none is provided, the Amazon Web Services account ID is used by default. */
  CatalogId?: string;
  /** The database containing the table. */
  DatabaseName: string;
  /** The time as of when to read the table contents. If not set, the most recent transaction commit time will be used. Cannot be specified along with TransactionId. */
  QueryAsOfTime?: string;
  /** A map consisting of key-value pairs. */
  QueryParameters?: Record<string, string>;
  /** The transaction ID at which to read the table contents. If this transaction is not committed, the read will be treated as part of that transaction and will see its writes. If this transaction has abor */
  TransactionId?: string;
}

export interface WriteOperation {
  /** A new object to add to the governed table. */
  AddObject?: any;
  /** An object to delete from the governed table. */
  DeleteObject?: any;
}

export interface AddLFTagsToResourceInput {
  /** The LF-tags to attach to the resource. */
  LFTags: LFTagPair[];
  /** The database, table, or column resource to which to attach an LF-tag. */
  Resource: Resource;
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
}

export interface AssumeDecoratedRoleWithSAMLInput {
  /** The Amazon Resource Name (ARN) of the SAML provider in IAM that describes the IdP. */
  PrincipalArn: string;
  /** The role that represents an IAM principal whose scope down policy allows it to call credential vending APIs such as GetTemporaryTableCredentials. The caller must also have iam:PassRole permission on t */
  RoleArn: string;
  /** A SAML assertion consisting of an assertion statement for the user who needs temporary credentials. This must match the SAML assertion that was issued to IAM. This must be Base64 encoded. */
  SAMLAssertion: string;
  /** The time period, between 900 and 43,200 seconds, for the timeout of the temporary credentials. */
  DurationSeconds?: number;
}

export interface BatchGrantPermissionsInput {
  /** A list of up to 20 entries for resource permissions to be granted by batch operation to the principal. */
  Entries: BatchPermissionsRequestEntry[];
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
}

export interface BatchRevokePermissionsInput {
  /** A list of up to 20 entries for resource permissions to be revoked by batch operation to the principal. */
  Entries: BatchPermissionsRequestEntry[];
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
}

export interface CancelTransactionInput {
  /** The transaction to cancel. */
  TransactionId: string;
}

export interface CommitTransactionInput {
  /** The transaction to commit. */
  TransactionId: string;
}

export interface CreateDataCellsFilterInput {
  /** A DataCellsFilter structure containing information about the data cells filter. */
  TableData: DataCellsFilter;
}

export interface CreateLakeFormationIdentityCenterConfigurationInput {
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, view definitions, and other con */
  CatalogId?: string;
  /** A list of the account IDs of Amazon Web Services accounts of third-party applications that are allowed to access data managed by Lake Formation. */
  ExternalFiltering?: ExternalFilteringConfiguration;
  /** The ARN of the IAM Identity Center instance for which the operation will be executed. For more information about ARNs, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces in th */
  InstanceArn?: string;
  /** A list of service integrations for enabling trusted identity propagation with external services such as Redshift. */
  ServiceIntegrations?: { Redshift?: any[] }[];
  /** A list of Amazon Web Services account IDs and/or Amazon Web Services organization/organizational unit ARNs that are allowed to access data managed by Lake Formation. If the ShareRecipients list includ */
  ShareRecipients?: DataLakePrincipal[];
}

export interface CreateLakeFormationOptInInput {
  Principal: DataLakePrincipal;
  Resource: Resource;
  Condition?: Condition;
}

export interface CreateLFTagInput {
  /** The key-name for the LF-tag. */
  TagKey: string;
  /** A list of possible values an attribute can take. */
  TagValues: string[];
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
}

export interface CreateLFTagExpressionInput {
  /** A list of LF-Tag conditions (key-value pairs). */
  Expression: LFTag[];
  /** A name for the expression. */
  Name: string;
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  /** A description with information about the LF-Tag expression. */
  Description?: string;
}

export interface DeleteDataCellsFilterInput {
  /** A database in the Glue Data Catalog. */
  DatabaseName?: string;
  /** The name given by the user to the data filter cell. */
  Name?: string;
  /** The ID of the catalog to which the table belongs. */
  TableCatalogId?: string;
  /** A table in the database. */
  TableName?: string;
}

export interface DeleteLakeFormationIdentityCenterConfigurationInput {
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, view definition, and other cont */
  CatalogId?: string;
}

export interface DeleteLakeFormationOptInInput {
  Principal: DataLakePrincipal;
  Resource: Resource;
  Condition?: Condition;
}

export interface DeleteLFTagInput {
  /** The key-name for the LF-tag to delete. */
  TagKey: string;
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
}

export interface DeleteLFTagExpressionInput {
  /** The name for the LF-Tag expression. */
  Name: string;
  /** The identifier for the Data Catalog. By default, the account ID in which the LF-Tag expression is saved. */
  CatalogId?: string;
}

export interface DeleteObjectsOnCancelInput {
  /** The database that contains the governed table. */
  DatabaseName: string;
  /** A list of VirtualObject structures, which indicates the Amazon S3 objects to be deleted if the transaction cancels. */
  Objects: VirtualObject[];
  /** The name of the governed table. */
  TableName: string;
  /** ID of the transaction that the writes occur in. */
  TransactionId: string;
  /** The Glue data catalog that contains the governed table. Defaults to the current account ID. */
  CatalogId?: string;
}

export interface DeregisterResourceInput {
  /** The Amazon Resource Name (ARN) of the resource that you want to deregister. */
  ResourceArn: string;
}

export interface DescribeLakeFormationIdentityCenterConfigurationInput {
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
}

export interface DescribeResourceInput {
  /** The resource ARN. */
  ResourceArn: string;
}

export interface DescribeTransactionInput {
  /** The transaction for which to return status. */
  TransactionId: string;
}

export interface ExtendTransactionInput {
  /** The transaction to extend. */
  TransactionId?: string;
}

export interface GetDataCellsFilterInput {
  /** A database in the Glue Data Catalog. */
  DatabaseName: string;
  /** The name given by the user to the data filter cell. */
  Name: string;
  /** The ID of the catalog to which the table belongs. */
  TableCatalogId: string;
  /** A table in the database. */
  TableName: string;
}

export interface GetDataLakeSettingsInput {
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
}

export interface GetEffectivePermissionsForPathInput {
  /** The Amazon Resource Name (ARN) of the resource for which you want to get permissions. */
  ResourceArn: string;
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  /** The maximum number of results to return. */
  MaxResults?: number;
  /** A continuation token, if this is not the first call to retrieve this list. */
  NextToken?: string;
}

export interface GetLFTagInput {
  /** The key-name for the LF-tag. */
  TagKey: string;
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
}

export interface GetLFTagExpressionInput {
  /** The name for the LF-Tag expression */
  Name: string;
  /** The identifier for the Data Catalog. By default, the account ID. */
  CatalogId?: string;
}

export interface GetQueryStateInput {
  /** The ID of the plan query operation. */
  QueryId: string;
}

export interface GetQueryStatisticsInput {
  /** The ID of the plan query operation. */
  QueryId: string;
}

export interface GetResourceLFTagsInput {
  /** The database, table, or column resource for which you want to return LF-tags. */
  Resource: Resource;
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  /** Indicates whether to show the assigned LF-tags. */
  ShowAssignedLFTags?: boolean;
}

export interface GetTableObjectsInput {
  /** The database containing the governed table. */
  DatabaseName: string;
  /** The governed table for which to retrieve objects. */
  TableName: string;
  /** The catalog containing the governed table. Defaults to the caller’s account. */
  CatalogId?: string;
  /** Specifies how many values to return in a page. */
  MaxResults?: number;
  /** A continuation token if this is not the first call to retrieve these objects. */
  NextToken?: string;
  /** A predicate to filter the objects returned based on the partition keys defined in the governed table. The comparison operators supported are: =, >, =, The logical operators supported are: AND The data */
  PartitionPredicate?: string;
  /** The time as of when to read the governed table contents. If not set, the most recent transaction commit time is used. Cannot be specified along with TransactionId. */
  QueryAsOfTime?: string;
  /** The transaction ID at which to read the governed table contents. If this transaction has aborted, an error is returned. If not set, defaults to the most recent committed transaction. Cannot be specifi */
  TransactionId?: string;
}

export interface GetTemporaryDataLocationCredentialsInput {
  AuditContext?: AuditContext;
  /** The credential scope is determined by the caller's Lake Formation permission on the associated table. Credential scope can be either: READ - Provides read-only access to the data location. READ_WRITE  */
  CredentialsScope?: 'READ' | 'READWRITE';
  /** The Amazon S3 data location that you want to access. */
  DataLocations?: string[];
  /** The time period, between 900 and 43,200 seconds, for the timeout of the temporary credentials. */
  DurationSeconds?: number;
}

export interface GetTemporaryGluePartitionCredentialsInput {
  /** A list of partition values identifying a single partition. */
  Partition: PartitionValueList;
  /** The ARN of the partitions' table. */
  TableArn: string;
  /** A structure representing context to access a resource (column names, query ID, etc). */
  AuditContext?: AuditContext;
  /** The time period, between 900 and 21,600 seconds, for the timeout of the temporary credentials. */
  DurationSeconds?: number;
  /** Filters the request based on the user having been granted a list of specified permissions on the requested resource(s). */
  Permissions?: 'ALL' | 'SELECT' | 'ALTER' | 'DROP' | 'DELETE' | 'INSERT' | 'DESCRIBE' | 'CREATE_DATABASE' | 'CREATE_TABLE' | 'DATA_LOCATION_ACCESS' | 'CREATE_LF_TAG' | 'ASSOCIATE' | 'GRANT_WITH_LF_TAG_EXPRESSION' | 'CREATE_LF_TAG_EXPRESSION' | 'CREATE_CATALOG' | 'SUPER_USER'[];
  /** A list of supported permission types for the partition. Valid values are COLUMN_PERMISSION and CELL_FILTER_PERMISSION. */
  SupportedPermissionTypes?: 'COLUMN_PERMISSION' | 'CELL_FILTER_PERMISSION' | 'NESTED_PERMISSION' | 'NESTED_CELL_PERMISSION'[];
}

export interface GetTemporaryGlueTableCredentialsInput {
  /** The ARN identifying a table in the Data Catalog for the temporary credentials request. */
  TableArn: string;
  /** A structure representing context to access a resource (column names, query ID, etc). */
  AuditContext?: AuditContext;
  /** The time period, between 900 and 21,600 seconds, for the timeout of the temporary credentials. */
  DurationSeconds?: number;
  /** Filters the request based on the user having been granted a list of specified permissions on the requested resource(s). */
  Permissions?: 'ALL' | 'SELECT' | 'ALTER' | 'DROP' | 'DELETE' | 'INSERT' | 'DESCRIBE' | 'CREATE_DATABASE' | 'CREATE_TABLE' | 'DATA_LOCATION_ACCESS' | 'CREATE_LF_TAG' | 'ASSOCIATE' | 'GRANT_WITH_LF_TAG_EXPRESSION' | 'CREATE_LF_TAG_EXPRESSION' | 'CREATE_CATALOG' | 'SUPER_USER'[];
  /** A structure used as a protocol between query engines and Lake Formation or Glue. Contains both a Lake Formation generated authorization identifier and information from the request's authorization cont */
  QuerySessionContext?: QuerySessionContext;
  /** The Amazon S3 path for the table. */
  S3Path?: string;
  /** A list of supported permission types for the table. Valid values are COLUMN_PERMISSION and CELL_FILTER_PERMISSION. */
  SupportedPermissionTypes?: 'COLUMN_PERMISSION' | 'CELL_FILTER_PERMISSION' | 'NESTED_PERMISSION' | 'NESTED_CELL_PERMISSION'[];
}

export interface GetWorkUnitResultsInput {
  /** The ID of the plan query operation for which to get results. */
  QueryId: string;
  /** The work unit ID for which to get results. Value generated by enumerating WorkUnitIdMin to WorkUnitIdMax (inclusive) from the WorkUnitRange in the output of GetWorkUnits. */
  WorkUnitId: number;
  /** A work token used to query the execution service. Token output from GetWorkUnits. */
  WorkUnitToken: string;
}

export interface GetWorkUnitsInput {
  /** The ID of the plan query operation. */
  QueryId: string;
  /** A continuation token, if this is a continuation call. */
  NextToken?: string;
  /** The size of each page to get in the Amazon Web Services service call. This does not affect the number of items returned in the command's output. Setting a smaller page size results in more calls to th */
  PageSize?: number;
}

export interface GrantPermissionsInput {
  /** The permissions granted to the principal on the resource. Lake Formation defines privileges to grant and revoke access to metadata in the Data Catalog and data organized in underlying data storage suc */
  Permissions: 'ALL' | 'SELECT' | 'ALTER' | 'DROP' | 'DELETE' | 'INSERT' | 'DESCRIBE' | 'CREATE_DATABASE' | 'CREATE_TABLE' | 'DATA_LOCATION_ACCESS' | 'CREATE_LF_TAG' | 'ASSOCIATE' | 'GRANT_WITH_LF_TAG_EXPRESSION' | 'CREATE_LF_TAG_EXPRESSION' | 'CREATE_CATALOG' | 'SUPER_USER'[];
  /** The principal to be granted the permissions on the resource. Supported principals are IAM users or IAM roles, and they are defined by their principal type and their ARN. Note that if you define a reso */
  Principal: DataLakePrincipal;
  /** The resource to which permissions are to be granted. Resources in Lake Formation are the Data Catalog, databases, and tables. */
  Resource: Resource;
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  Condition?: Condition;
  /** Indicates a list of the granted permissions that the principal may pass to other users. These permissions may only be a subset of the permissions granted in the Privileges. */
  PermissionsWithGrantOption?: 'ALL' | 'SELECT' | 'ALTER' | 'DROP' | 'DELETE' | 'INSERT' | 'DESCRIBE' | 'CREATE_DATABASE' | 'CREATE_TABLE' | 'DATA_LOCATION_ACCESS' | 'CREATE_LF_TAG' | 'ASSOCIATE' | 'GRANT_WITH_LF_TAG_EXPRESSION' | 'CREATE_LF_TAG_EXPRESSION' | 'CREATE_CATALOG' | 'SUPER_USER'[];
}

export interface ListDataCellsFilterInput {
  /** The maximum size of the response. */
  MaxResults?: number;
  /** A continuation token, if this is a continuation call. */
  NextToken?: string;
  /** A table in the Glue Data Catalog. */
  Table?: TableResource;
}

export interface ListLakeFormationOptInsInput {
  /** The maximum number of results to return. */
  MaxResults?: number;
  /** A continuation token, if this is not the first call to retrieve this list. */
  NextToken?: string;
  Principal?: DataLakePrincipal;
  /** A structure for the resource. */
  Resource?: Resource;
}

export interface ListLFTagExpressionsInput {
  /** The identifier for the Data Catalog. By default, the account ID. */
  CatalogId?: string;
  /** The maximum number of results to return. */
  MaxResults?: number;
  /** A continuation token, if this is not the first call to retrieve this list. */
  NextToken?: string;
}

export interface ListLFTagsInput {
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  /** The maximum number of results to return. */
  MaxResults?: number;
  /** A continuation token, if this is not the first call to retrieve this list. */
  NextToken?: string;
  /** If resource share type is ALL, returns both in-account LF-tags and shared LF-tags that the requester has permission to view. If resource share type is FOREIGN, returns all share LF-tags that the reque */
  ResourceShareType?: 'FOREIGN' | 'ALL';
}

export interface ListPermissionsInput {
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  /** Indicates that related permissions should be included in the results when listing permissions on a table resource. Set the field to TRUE to show the cell filters on a table resource. Default is FALSE. */
  IncludeRelated?: string;
  /** The maximum number of results to return. */
  MaxResults?: number;
  /** A continuation token, if this is not the first call to retrieve this list. */
  NextToken?: string;
  /** Specifies a principal to filter the permissions returned. */
  Principal?: DataLakePrincipal;
  /** A resource where you will get a list of the principal permissions. This operation does not support getting privileges on a table with columns. Instead, call this operation on the table, and the operat */
  Resource?: Resource;
  /** Specifies a resource type to filter the permissions returned. */
  ResourceType?: 'CATALOG' | 'DATABASE' | 'TABLE' | 'DATA_LOCATION' | 'LF_TAG' | 'LF_TAG_POLICY' | 'LF_TAG_POLICY_DATABASE' | 'LF_TAG_POLICY_TABLE' | 'LF_NAMED_TAG_EXPRESSION';
}

export interface ListResourcesInput {
  /** Any applicable row-level and/or column-level filtering conditions for the resources. */
  FilterConditionList?: FilterCondition[];
  /** The maximum number of resource results. */
  MaxResults?: number;
  /** A continuation token, if this is not the first call to retrieve these resources. */
  NextToken?: string;
}

export interface ListTableStorageOptimizersInput {
  /** Name of the database where the table is present. */
  DatabaseName: string;
  /** Name of the table. */
  TableName: string;
  /** The Catalog ID of the table. */
  CatalogId?: string;
  /** The number of storage optimizers to return on each call. */
  MaxResults?: number;
  /** A continuation token, if this is a continuation call. */
  NextToken?: string;
  /** The specific type of storage optimizers to list. The supported value is compaction. */
  StorageOptimizerType?: 'COMPACTION' | 'GARBAGE_COLLECTION' | 'ALL';
}

export interface ListTransactionsInput {
  /** The catalog for which to list transactions. Defaults to the account ID of the caller. */
  CatalogId?: string;
  /** The maximum number of transactions to return in a single call. */
  MaxResults?: number;
  /** A continuation token if this is not the first call to retrieve transactions. */
  NextToken?: string;
  /** A filter indicating the status of transactions to return. Options are ALL | COMPLETED | COMMITTED | ABORTED | ACTIVE. The default is ALL. */
  StatusFilter?: 'ALL' | 'COMPLETED' | 'ACTIVE' | 'COMMITTED' | 'ABORTED';
}

export interface PutDataLakeSettingsInput {
  /** A structure representing a list of Lake Formation principals designated as data lake administrators. */
  DataLakeSettings: DataLakeSettings;
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
}

export interface RegisterResourceInput {
  /** The Amazon Resource Name (ARN) of the resource that you want to register. */
  ResourceArn: string;
  /** The Amazon Web Services account that owns the Glue tables associated with specific Amazon S3 locations. */
  ExpectedResourceOwnerAccount?: string;
  /** Specifies whether the data access of tables pointing to the location can be managed by both Lake Formation permissions as well as Amazon S3 bucket policies. */
  HybridAccessEnabled?: boolean;
  /** The identifier for the role that registers the resource. */
  RoleArn?: string;
  /** Designates an Identity and Access Management (IAM) service-linked role by registering this role with the Data Catalog. A service-linked role is a unique type of IAM role that is linked directly to Lak */
  UseServiceLinkedRole?: boolean;
  /** Whether or not the resource is a federated resource. */
  WithFederation?: boolean;
  /** Grants the calling principal the permissions to perform all supported Lake Formation operations on the registered data location. */
  WithPrivilegedAccess?: boolean;
}

export interface RemoveLFTagsFromResourceInput {
  /** The LF-tags to be removed from the resource. */
  LFTags: LFTagPair[];
  /** The database, table, or column resource where you want to remove an LF-tag. */
  Resource: Resource;
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
}

export interface RevokePermissionsInput {
  /** The permissions revoked to the principal on the resource. For information about permissions, see Security and Access Control to Metadata and Data. */
  Permissions: 'ALL' | 'SELECT' | 'ALTER' | 'DROP' | 'DELETE' | 'INSERT' | 'DESCRIBE' | 'CREATE_DATABASE' | 'CREATE_TABLE' | 'DATA_LOCATION_ACCESS' | 'CREATE_LF_TAG' | 'ASSOCIATE' | 'GRANT_WITH_LF_TAG_EXPRESSION' | 'CREATE_LF_TAG_EXPRESSION' | 'CREATE_CATALOG' | 'SUPER_USER'[];
  /** The principal to be revoked permissions on the resource. */
  Principal: DataLakePrincipal;
  /** The resource to which permissions are to be revoked. */
  Resource: Resource;
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  Condition?: Condition;
  /** Indicates a list of permissions for which to revoke the grant option allowing the principal to pass permissions to other principals. */
  PermissionsWithGrantOption?: 'ALL' | 'SELECT' | 'ALTER' | 'DROP' | 'DELETE' | 'INSERT' | 'DESCRIBE' | 'CREATE_DATABASE' | 'CREATE_TABLE' | 'DATA_LOCATION_ACCESS' | 'CREATE_LF_TAG' | 'ASSOCIATE' | 'GRANT_WITH_LF_TAG_EXPRESSION' | 'CREATE_LF_TAG_EXPRESSION' | 'CREATE_CATALOG' | 'SUPER_USER'[];
}

export interface SearchDatabasesByLFTagsInput {
  /** A list of conditions (LFTag structures) to search for in database resources. */
  Expression: LFTag[];
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  /** The maximum number of results to return. */
  MaxResults?: number;
  /** A continuation token, if this is not the first call to retrieve this list. */
  NextToken?: string;
}

export interface SearchTablesByLFTagsInput {
  /** A list of conditions (LFTag structures) to search for in table resources. */
  Expression: LFTag[];
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  /** The maximum number of results to return. */
  MaxResults?: number;
  /** A continuation token, if this is not the first call to retrieve this list. */
  NextToken?: string;
}

export interface StartQueryPlanningInput {
  /** A structure containing information about the query plan. */
  QueryPlanningContext: QueryPlanningContext;
  /** A PartiQL query statement used as an input to the planner service. */
  QueryString: string;
}

export interface StartTransactionInput {
  /** Indicates whether this transaction should be read only or read and write. Writes made using a read-only transaction ID will be rejected. Read-only transactions do not need to be committed. */
  TransactionType?: 'READ_AND_WRITE' | 'READ_ONLY';
}

export interface UpdateDataCellsFilterInput {
  /** A DataCellsFilter structure containing information about the data cells filter. */
  TableData: DataCellsFilter;
}

export interface UpdateLakeFormationIdentityCenterConfigurationInput {
  /** Allows to enable or disable the IAM Identity Center connection. */
  ApplicationStatus?: 'ENABLED' | 'DISABLED';
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, view definitions, and other con */
  CatalogId?: string;
  /** A list of the account IDs of Amazon Web Services accounts of third-party applications that are allowed to access data managed by Lake Formation. */
  ExternalFiltering?: ExternalFilteringConfiguration;
  /** A list of service integrations for enabling trusted identity propagation with external services such as Redshift. */
  ServiceIntegrations?: { Redshift?: any[] }[];
  /** A list of Amazon Web Services account IDs or Amazon Web Services organization/organizational unit ARNs that are allowed to access to access data managed by Lake Formation. If the ShareRecipients list  */
  ShareRecipients?: DataLakePrincipal[];
}

export interface UpdateLFTagInput {
  /** The key-name for the LF-tag for which to add or delete values. */
  TagKey: string;
  /** The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information t */
  CatalogId?: string;
  /** A list of LF-tag values to add from the LF-tag. */
  TagValuesToAdd?: string[];
  /** A list of LF-tag values to delete from the LF-tag. */
  TagValuesToDelete?: string[];
}

export interface UpdateLFTagExpressionInput {
  /** The LF-Tag expression body composed of one more LF-Tag key-value pairs. */
  Expression: LFTag[];
  /** The name for the LF-Tag expression. */
  Name: string;
  /** The identifier for the Data Catalog. By default, the account ID. */
  CatalogId?: string;
  /** The description with information about the saved LF-Tag expression. */
  Description?: string;
}

export interface UpdateResourceInput {
  /** The resource ARN. */
  ResourceArn: string;
  /** The new role to use for the given resource registered in Lake Formation. */
  RoleArn: string;
  /** The Amazon Web Services account that owns the Glue tables associated with specific Amazon S3 locations. */
  ExpectedResourceOwnerAccount?: string;
  /** Specifies whether the data access of tables pointing to the location can be managed by both Lake Formation permissions as well as Amazon S3 bucket policies. */
  HybridAccessEnabled?: boolean;
  /** Whether or not the resource is a federated resource. */
  WithFederation?: boolean;
}

export interface UpdateTableObjectsInput {
  /** The database containing the governed table to update. */
  DatabaseName: string;
  /** The governed table to update. */
  TableName: string;
  /** A list of WriteOperation objects that define an object to add to or delete from the manifest for a governed table. */
  WriteOperations: WriteOperation[];
  /** The catalog containing the governed table to update. Defaults to the caller’s account ID. */
  CatalogId?: string;
  /** The transaction at which to do the write. */
  TransactionId?: string;
}

export interface UpdateTableStorageOptimizerInput {
  /** Name of the database where the table is present. */
  DatabaseName: string;
  /** Name of the configuration for the storage optimizer. */
  StorageOptimizerConfig: Record<string, Record<string, string>>;
  /** Name of the table for which to enable the storage optimizer. */
  TableName: string;
  /** The Catalog ID of the table. */
  CatalogId?: string;
}

/** LakeFormation service binding for Step Functions SDK integrations. */
export class LakeFormation {
  constructor() {}

  addLFTagsToResource<T>(params: AddLFTagsToResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  assumeDecoratedRoleWithSAML<T>(params: AssumeDecoratedRoleWithSAMLInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchGrantPermissions<T>(params: BatchGrantPermissionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchRevokePermissions<T>(params: BatchRevokePermissionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelTransaction<T>(params: CancelTransactionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  commitTransaction<T>(params: CommitTransactionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDataCellsFilter<T>(params: CreateDataCellsFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLakeFormationIdentityCenterConfiguration<T>(params: CreateLakeFormationIdentityCenterConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLakeFormationOptIn<T>(params: CreateLakeFormationOptInInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLFTag<T>(params: CreateLFTagInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLFTagExpression<T>(params: CreateLFTagExpressionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDataCellsFilter<T>(params: DeleteDataCellsFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLakeFormationIdentityCenterConfiguration<T>(params: DeleteLakeFormationIdentityCenterConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLakeFormationOptIn<T>(params: DeleteLakeFormationOptInInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLFTag<T>(params: DeleteLFTagInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLFTagExpression<T>(params: DeleteLFTagExpressionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteObjectsOnCancel<T>(params: DeleteObjectsOnCancelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterResource<T>(params: DeregisterResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLakeFormationIdentityCenterConfiguration<T>(params: DescribeLakeFormationIdentityCenterConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeResource<T>(params: DescribeResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTransaction<T>(params: DescribeTransactionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  extendTransaction<T>(params: ExtendTransactionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDataCellsFilter<T>(params: GetDataCellsFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDataLakePrincipal<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDataLakeSettings<T>(params: GetDataLakeSettingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEffectivePermissionsForPath<T>(params: GetEffectivePermissionsForPathInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLFTag<T>(params: GetLFTagInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLFTagExpression<T>(params: GetLFTagExpressionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getQueryState<T>(params: GetQueryStateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getQueryStatistics<T>(params: GetQueryStatisticsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getResourceLFTags<T>(params: GetResourceLFTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTableObjects<T>(params: GetTableObjectsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTemporaryDataLocationCredentials<T>(params: GetTemporaryDataLocationCredentialsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTemporaryGluePartitionCredentials<T>(params: GetTemporaryGluePartitionCredentialsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTemporaryGlueTableCredentials<T>(params: GetTemporaryGlueTableCredentialsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getWorkUnitResults<T>(params: GetWorkUnitResultsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getWorkUnits<T>(params: GetWorkUnitsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  grantPermissions<T>(params: GrantPermissionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDataCellsFilter<T>(params: ListDataCellsFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLakeFormationOptIns<T>(params: ListLakeFormationOptInsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLFTagExpressions<T>(params: ListLFTagExpressionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLFTags<T>(params: ListLFTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPermissions<T>(params: ListPermissionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listResources<T>(params: ListResourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTableStorageOptimizers<T>(params: ListTableStorageOptimizersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTransactions<T>(params: ListTransactionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDataLakeSettings<T>(params: PutDataLakeSettingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerResource<T>(params: RegisterResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeLFTagsFromResource<T>(params: RemoveLFTagsFromResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  revokePermissions<T>(params: RevokePermissionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchDatabasesByLFTags<T>(params: SearchDatabasesByLFTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchTablesByLFTags<T>(params: SearchTablesByLFTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startQueryPlanning<T>(params: StartQueryPlanningInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startTransaction<T>(params: StartTransactionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDataCellsFilter<T>(params: UpdateDataCellsFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateLakeFormationIdentityCenterConfiguration<T>(params: UpdateLakeFormationIdentityCenterConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateLFTag<T>(params: UpdateLFTagInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateLFTagExpression<T>(params: UpdateLFTagExpressionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateResource<T>(params: UpdateResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTableObjects<T>(params: UpdateTableObjectsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTableStorageOptimizer<T>(params: UpdateTableStorageOptimizerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
