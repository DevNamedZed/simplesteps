// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface VPC {
  /** (Private hosted zones only) The region that an Amazon VPC was created in. */
  VPCRegion?: 'us-east-1' | 'us-east-2' | 'us-west-1' | 'us-west-2' | 'eu-west-1' | 'eu-west-2' | 'eu-west-3' | 'eu-central-1' | 'eu-central-2' | 'ap-east-1' | 'me-south-1' | 'us-gov-west-1' | 'us-gov-east-1' | 'us-iso-east-1' | 'us-iso-west-1' | 'us-isob-east-1' | 'me-central-1' | 'ap-southeast-1' | 'ap-southeast-2' | 'ap-southeast-3' | 'ap-south-1' | 'ap-south-2' | 'ap-northeast-1' | 'ap-northeast-2' | 'ap-northeast-3' | 'eu-north-1' | 'sa-east-1' | 'ca-central-1' | 'cn-north-1' | 'cn-northwest-1' | 'af-south-1' | 'eu-south-1' | 'eu-south-2' | 'ap-southeast-4' | 'il-central-1' | 'ca-west-1' | 'ap-southeast-5' | 'mx-central-1' | 'us-isof-south-1' | 'us-isof-east-1' | 'ap-southeast-7' | 'ap-east-2' | 'eu-isoe-west-1' | 'ap-southeast-6' | 'us-isob-west-1' | 'eusc-de-east-1';
  VPCId?: string;
}

export interface CidrCollectionChange {
  /** Name of the location that is associated with the CIDR collection. */
  LocationName: string;
  /** CIDR collection change action. */
  Action: 'PUT' | 'DELETE_IF_EXISTS';
  /** List of CIDR blocks. */
  CidrList: any[];
}

export interface ChangeBatch {
  /** Optional: Any comments you want to include about a change batch request. */
  Comment?: string;
  /** Information about the changes to make to the record sets. */
  Changes: any[];
}

export interface Tag {
  /** The value of Key depends on the operation that you want to perform: Add a tag to a health check or hosted zone: Key is the name that you want to give the new tag. Edit a tag: Key is the name of the ta */
  Key?: string;
  /** The value of Value depends on the operation that you want to perform: Add a tag to a health check or hosted zone: Value is the value that you want to give the new tag. Edit a tag: Value is the new val */
  Value?: string;
}

export interface AlarmIdentifier {
  /** For the CloudWatch alarm that you want Route 53 health checkers to use to determine whether this health check is healthy, the region that the alarm was created in. For the current list of CloudWatch r */
  Region: 'us-east-1' | 'us-east-2' | 'us-west-1' | 'us-west-2' | 'ca-central-1' | 'eu-central-1' | 'eu-central-2' | 'eu-west-1' | 'eu-west-2' | 'eu-west-3' | 'ap-east-1' | 'me-south-1' | 'me-central-1' | 'ap-south-1' | 'ap-south-2' | 'ap-southeast-1' | 'ap-southeast-2' | 'ap-southeast-3' | 'ap-northeast-1' | 'ap-northeast-2' | 'ap-northeast-3' | 'eu-north-1' | 'sa-east-1' | 'cn-northwest-1' | 'cn-north-1' | 'af-south-1' | 'eu-south-1' | 'eu-south-2' | 'us-gov-west-1' | 'us-gov-east-1' | 'us-iso-east-1' | 'us-iso-west-1' | 'us-isob-east-1' | 'ap-southeast-4' | 'il-central-1' | 'ca-west-1' | 'ap-southeast-5' | 'mx-central-1' | 'us-isof-south-1' | 'us-isof-east-1' | 'ap-southeast-7' | 'ap-east-2' | 'eu-isoe-west-1' | 'ap-southeast-6' | 'us-isob-west-1' | 'eusc-de-east-1';
  /** The name of the CloudWatch alarm that you want Amazon Route 53 health checkers to use to determine whether this health check is healthy. Route 53 supports CloudWatch alarms with the following features */
  Name: string;
}

export interface HealthCheckConfig {
  /** The IPv4 or IPv6 IP address of the endpoint that you want Amazon Route 53 to perform health checks on. If you don't specify a value for IPAddress, Route 53 sends a DNS request to resolve the domain na */
  IPAddress?: string;
  /** The port on the endpoint that you want Amazon Route 53 to perform health checks on. Don't specify a value for Port when you specify a value for Type of CLOUDWATCH_METRIC or CALCULATED. */
  Port?: number;
  /** The type of health check that you want to create, which indicates how Amazon Route 53 determines whether an endpoint is healthy. You can't change the value of Type after you create a health check. You */
  Type: 'HTTP' | 'HTTPS' | 'HTTP_STR_MATCH' | 'HTTPS_STR_MATCH' | 'TCP' | 'CALCULATED' | 'CLOUDWATCH_METRIC' | 'RECOVERY_CONTROL';
  /** The path, if any, that you want Amazon Route 53 to request when performing health checks. The path can be any value for which your endpoint will return an HTTP status code of 2xx or 3xx when the endpo */
  ResourcePath?: string;
  /** Amazon Route 53 behavior depends on whether you specify a value for IPAddress. If you specify a value for IPAddress: Amazon Route 53 sends health check requests to the specified IPv4 or IPv6 address a */
  FullyQualifiedDomainName?: string;
  /** If the value of Type is HTTP_STR_MATCH or HTTPS_STR_MATCH, the string that you want Amazon Route 53 to search for in the response body from the specified resource. If the string appears in the respons */
  SearchString?: string;
  /** The number of seconds between the time that Amazon Route 53 gets a response from your endpoint and the time that it sends the next health check request. Each Route 53 health checker makes requests at  */
  RequestInterval?: number;
  /** The number of consecutive health checks that an endpoint must pass or fail for Amazon Route 53 to change the current status of the endpoint from unhealthy to healthy or vice versa. For more informatio */
  FailureThreshold?: number;
  /** Specify whether you want Amazon Route 53 to measure the latency between health checkers in multiple Amazon Web Services regions and your endpoint, and to display CloudWatch latency graphs on the Healt */
  MeasureLatency?: boolean;
  /** Specify whether you want Amazon Route 53 to invert the status of a health check, for example, to consider a health check unhealthy when it otherwise would be considered healthy. */
  Inverted?: boolean;
  /** Stops Route 53 from performing health checks. When you disable a health check, here's what happens: Health checks that check the health of endpoints: Route 53 stops submitting requests to your applica */
  Disabled?: boolean;
  /** The number of child health checks that are associated with a CALCULATED health check that Amazon Route 53 must consider healthy for the CALCULATED health check to be considered healthy. To specify the */
  HealthThreshold?: number;
  /** (CALCULATED Health Checks Only) A complex type that contains one ChildHealthCheck element for each health check that you want to associate with a CALCULATED health check. */
  ChildHealthChecks?: string[];
  /** Specify whether you want Amazon Route 53 to send the value of FullyQualifiedDomainName to the endpoint in the client_hello message during TLS negotiation. This allows the endpoint to respond to HTTPS  */
  EnableSNI?: boolean;
  /** A complex type that contains one Region element for each region from which you want Amazon Route 53 health checkers to check the specified endpoint. If you don't specify any regions, Route 53 health c */
  Regions?: 'us-east-1' | 'us-west-1' | 'us-west-2' | 'eu-west-1' | 'ap-southeast-1' | 'ap-southeast-2' | 'ap-northeast-1' | 'sa-east-1'[];
  /** A complex type that identifies the CloudWatch alarm that you want Amazon Route 53 health checkers to use to determine whether the specified health check is healthy. */
  AlarmIdentifier?: AlarmIdentifier;
  /** When CloudWatch has insufficient data about the metric to determine the alarm state, the status that you want Amazon Route 53 to assign to the health check: Healthy: Route 53 considers the health chec */
  InsufficientDataHealthStatus?: 'Healthy' | 'Unhealthy' | 'LastKnownStatus';
  /** The Amazon Resource Name (ARN) for the Route 53 Application Recovery Controller routing control. For more information about Route 53 Application Recovery Controller, see Route 53 Application Recovery  */
  RoutingControlArn?: string;
}

export interface HostedZoneConfig {
  /** Any comments that you want to include about the hosted zone. */
  Comment?: string;
  /** A value that indicates whether this is a private hosted zone. */
  PrivateZone?: boolean;
}

export interface ActivateKeySigningKeyInput {
  /** A unique string used to identify a hosted zone. */
  HostedZoneId: string;
  /** A string used to identify a key-signing key (KSK). Name can include numbers, letters, and underscores (_). Name must be unique for each key-signing key in the same hosted zone. */
  Name: string;
}

/** A complex type that contains information about the request to associate a VPC with a private hosted zone. */
export interface AssociateVPCWithHostedZoneInput {
  /** The ID of the private hosted zone that you want to associate an Amazon VPC with. Note that you can't associate a VPC with a hosted zone that doesn't have an existing VPC association. */
  HostedZoneId: string;
  /** A complex type that contains information about the VPC that you want to associate with a private hosted zone. */
  VPC: VPC;
  /** Optional: A comment about the association request. */
  Comment?: string;
}

export interface ChangeCidrCollectionInput {
  /** Information about changes to a CIDR collection. */
  Changes: CidrCollectionChange[];
  /** The UUID of the CIDR collection to update. */
  Id: string;
  /** A sequential counter that Amazon Route 53 sets to 1 when you create a collection and increments it by 1 each time you update the collection. We recommend that you use ListCidrCollection to get the cur */
  CollectionVersion?: number;
}

/** A complex type that contains change information for the resource record set. */
export interface ChangeResourceRecordSetsInput {
  /** A complex type that contains an optional comment and the Changes element. */
  ChangeBatch: ChangeBatch;
  /** The ID of the hosted zone that contains the resource record sets that you want to change. */
  HostedZoneId: string;
}

/** A complex type that contains information about the tags that you want to add, edit, or delete. */
export interface ChangeTagsForResourceInput {
  /** The ID of the resource for which you want to add, change, or delete tags. */
  ResourceId: string;
  /** The type of the resource. The resource type for health checks is healthcheck. The resource type for hosted zones is hostedzone. */
  ResourceType: 'healthcheck' | 'hostedzone';
  /** A complex type that contains a list of the tags that you want to add to the specified health check or hosted zone and/or the tags that you want to edit Value for. You can add a maximum of 10 tags to a */
  AddTags?: Tag[];
  /** A complex type that contains a list of the tags that you want to delete from the specified health check or hosted zone. You can specify up to 10 keys. */
  RemoveTagKeys?: string[];
}

export interface CreateCidrCollectionInput {
  /** A client-specific token that allows requests to be securely retried so that the intended outcome will only occur once, retries receive a similar response, and there are no additional edge cases to han */
  CallerReference: string;
  /** A unique identifier for the account that can be used to reference the collection from other API calls. */
  Name: string;
}

/** A complex type that contains the health check request information. */
export interface CreateHealthCheckInput {
  /** A unique string that identifies the request and that allows you to retry a failed CreateHealthCheck request without the risk of creating two identical health checks: If you send a CreateHealthCheck re */
  CallerReference: string;
  /** A complex type that contains settings for a new health check. */
  HealthCheckConfig: HealthCheckConfig;
}

/** A complex type that contains information about the request to create a public or private hosted zone. */
export interface CreateHostedZoneInput {
  /** A unique string that identifies the request and that allows failed CreateHostedZone requests to be retried without the risk of executing the operation twice. You must use a unique CallerReference stri */
  CallerReference: string;
  /** The name of the domain. Specify a fully qualified domain name, for example, www.example.com. The trailing dot is optional; Amazon Route 53 assumes that the domain name is fully qualified. This means t */
  Name: string;
  /** If you want to associate a reusable delegation set with this hosted zone, the ID that Amazon Route 53 assigned to the reusable delegation set when you created it. For more information about reusable d */
  DelegationSetId?: string;
  /** (Optional) A complex type that contains the following optional values: For public and private hosted zones, an optional comment For private hosted zones, an optional PrivateZone element If you don't s */
  HostedZoneConfig?: HostedZoneConfig;
  /** (Private hosted zones only) A complex type that contains information about the Amazon VPC that you're associating with this hosted zone. You can specify only one Amazon VPC when you create a private h */
  VPC?: VPC;
}

export interface CreateKeySigningKeyInput {
  /** A unique string that identifies the request. */
  CallerReference: string;
  /** The unique string (ID) used to identify a hosted zone. */
  HostedZoneId: string;
  /** The Amazon resource name (ARN) for a customer managed key in Key Management Service (KMS). The KeyManagementServiceArn must be unique for each key-signing key (KSK) in a single hosted zone. To see an  */
  KeyManagementServiceArn: string;
  /** A string used to identify a key-signing key (KSK). Name can include numbers, letters, and underscores (_). Name must be unique for each key-signing key in the same hosted zone. */
  Name: string;
  /** A string specifying the initial status of the key-signing key (KSK). You can set the value to ACTIVE or INACTIVE. */
  Status: string;
}

export interface CreateQueryLoggingConfigInput {
  /** The Amazon Resource Name (ARN) for the log group that you want to Amazon Route 53 to send query logs to. This is the format of the ARN: arn:aws:logs:region:account-id:log-group:log_group_name To get t */
  CloudWatchLogsLogGroupArn: string;
  /** The ID of the hosted zone that you want to log queries for. You can log queries only for public hosted zones. */
  HostedZoneId: string;
}

export interface CreateReusableDelegationSetInput {
  /** A unique string that identifies the request, and that allows you to retry failed CreateReusableDelegationSet requests without the risk of executing the operation twice. You must use a unique CallerRef */
  CallerReference: string;
  /** If you want to mark the delegation set for an existing hosted zone as reusable, the ID for that hosted zone. */
  HostedZoneId?: string;
}

/** A complex type that contains information about the traffic policy that you want to create. */
export interface CreateTrafficPolicyInput {
  /** The definition of this traffic policy in JSON format. For more information, see Traffic Policy Document Format. */
  Document: string;
  /** The name of the traffic policy. */
  Name: string;
  /** (Optional) Any comments that you want to include about the traffic policy. */
  Comment?: string;
}

/** A complex type that contains information about the resource record sets that you want to create based on a specified traffic policy. */
export interface CreateTrafficPolicyInstanceInput {
  /** The ID of the hosted zone that you want Amazon Route 53 to create resource record sets in by using the configuration in a traffic policy. */
  HostedZoneId: string;
  /** The domain name (such as example.com) or subdomain name (such as www.example.com) for which Amazon Route 53 responds to DNS queries by using the resource record sets that Route 53 creates for this tra */
  Name: string;
  /** The ID of the traffic policy that you want to use to create resource record sets in the specified hosted zone. */
  TrafficPolicyId: string;
  /** The version of the traffic policy that you want to use to create resource record sets in the specified hosted zone. */
  TrafficPolicyVersion: number;
  /** (Optional) The TTL that you want Amazon Route 53 to assign to all of the resource record sets that it creates in the specified hosted zone. */
  TTL: number;
}

/** A complex type that contains information about the traffic policy that you want to create a new version for. */
export interface CreateTrafficPolicyVersionInput {
  /** The definition of this version of the traffic policy, in JSON format. You specified the JSON in the CreateTrafficPolicyVersion request. For more information about the JSON format, see CreateTrafficPol */
  Document: string;
  /** The ID of the traffic policy for which you want to create a new version. */
  Id: string;
  /** The comment that you specified in the CreateTrafficPolicyVersion request, if any. */
  Comment?: string;
}

/** A complex type that contains information about the request to authorize associating a VPC with your private hosted zone. Authorization is only required when a private hosted zone and a VPC were create */
export interface CreateVPCAssociationAuthorizationInput {
  /** The ID of the private hosted zone that you want to authorize associating a VPC with. */
  HostedZoneId: string;
  /** A complex type that contains the VPC ID and region for the VPC that you want to authorize associating with your hosted zone. */
  VPC: VPC;
}

export interface DeactivateKeySigningKeyInput {
  /** A unique string used to identify a hosted zone. */
  HostedZoneId: string;
  /** A string used to identify a key-signing key (KSK). */
  Name: string;
}

export interface DeleteCidrCollectionInput {
  /** The UUID of the collection to delete. */
  Id: string;
}

/** This action deletes a health check. */
export interface DeleteHealthCheckInput {
  /** The ID of the health check that you want to delete. */
  HealthCheckId: string;
}

/** A request to delete a hosted zone. */
export interface DeleteHostedZoneInput {
  /** The ID of the hosted zone you want to delete. */
  Id: string;
}

export interface DeleteKeySigningKeyInput {
  /** A unique string used to identify a hosted zone. */
  HostedZoneId: string;
  /** A string used to identify a key-signing key (KSK). */
  Name: string;
}

export interface DeleteQueryLoggingConfigInput {
  /** The ID of the configuration that you want to delete. */
  Id: string;
}

/** A request to delete a reusable delegation set. */
export interface DeleteReusableDelegationSetInput {
  /** The ID of the reusable delegation set that you want to delete. */
  Id: string;
}

/** A request to delete a specified traffic policy version. */
export interface DeleteTrafficPolicyInput {
  /** The ID of the traffic policy that you want to delete. */
  Id: string;
  /** The version number of the traffic policy that you want to delete. */
  Version: number;
}

/** A request to delete a specified traffic policy instance. */
export interface DeleteTrafficPolicyInstanceInput {
  /** The ID of the traffic policy instance that you want to delete. When you delete a traffic policy instance, Amazon Route 53 also deletes all of the resource record sets that were created when you create */
  Id: string;
}

/** A complex type that contains information about the request to remove authorization to associate a VPC that was created by one Amazon Web Services account with a hosted zone that was created with a dif */
export interface DeleteVPCAssociationAuthorizationInput {
  /** When removing authorization to associate a VPC that was created by one Amazon Web Services account with a hosted zone that was created with a different Amazon Web Services account, the ID of the hoste */
  HostedZoneId: string;
  /** When removing authorization to associate a VPC that was created by one Amazon Web Services account with a hosted zone that was created with a different Amazon Web Services account, a complex type that */
  VPC: VPC;
}

export interface DisableHostedZoneDNSSECInput {
  /** A unique string used to identify a hosted zone. */
  HostedZoneId: string;
}

/** A complex type that contains information about the VPC that you want to disassociate from a specified private hosted zone. */
export interface DisassociateVPCFromHostedZoneInput {
  /** The ID of the private hosted zone that you want to disassociate a VPC from. */
  HostedZoneId: string;
  /** A complex type that contains information about the VPC that you're disassociating from the specified hosted zone. */
  VPC: VPC;
  /** Optional: A comment about the disassociation request. */
  Comment?: string;
}

export interface EnableHostedZoneDNSSECInput {
  /** A unique string used to identify a hosted zone. */
  HostedZoneId: string;
}

/** A complex type that contains information about the request to create a hosted zone. */
export interface GetAccountLimitInput {
  /** The limit that you want to get. Valid values include the following: MAX_HEALTH_CHECKS_BY_OWNER: The maximum number of health checks that you can create using the current account. MAX_HOSTED_ZONES_BY_O */
  Type: 'MAX_HEALTH_CHECKS_BY_OWNER' | 'MAX_HOSTED_ZONES_BY_OWNER' | 'MAX_TRAFFIC_POLICY_INSTANCES_BY_OWNER' | 'MAX_REUSABLE_DELEGATION_SETS_BY_OWNER' | 'MAX_TRAFFIC_POLICIES_BY_OWNER';
}

/** The input for a GetChange request. */
export interface GetChangeInput {
  /** The ID of the change batch request. The value that you specify here is the value that ChangeResourceRecordSets returned in the Id element when you submitted the request. */
  Id: string;
}

export interface GetDNSSECInput {
  /** A unique string used to identify a hosted zone. */
  HostedZoneId: string;
}

/** A request for information about whether a specified geographic location is supported for Amazon Route 53 geolocation resource record sets. */
export interface GetGeoLocationInput {
  /** For geolocation resource record sets, a two-letter abbreviation that identifies a continent. Amazon Route 53 supports the following continent codes: AF: Africa AN: Antarctica AS: Asia EU: Europe OC: O */
  ContinentCode?: string;
  /** Amazon Route 53 uses the two-letter country codes that are specified in ISO standard 3166-1 alpha-2. Route 53 also supports the country code UA for Ukraine. */
  CountryCode?: string;
  /** The code for the subdivision, such as a particular state within the United States. For a list of US state abbreviations, see Appendix B: Two–Letter State and Possession Abbreviations on the United Sta */
  SubdivisionCode?: string;
}

/** A request to get information about a specified health check. */
export interface GetHealthCheckInput {
  /** The identifier that Amazon Route 53 assigned to the health check when you created it. When you add or update a resource record set, you use this value to specify which health check to use. The value c */
  HealthCheckId: string;
}

/** A request for the reason that a health check failed most recently. */
export interface GetHealthCheckLastFailureReasonInput {
  /** The ID for the health check for which you want the last failure reason. When you created the health check, CreateHealthCheck returned the ID in the response, in the HealthCheckId element. If you want  */
  HealthCheckId: string;
}

/** A request to get the status for a health check. */
export interface GetHealthCheckStatusInput {
  /** The ID for the health check that you want the current status for. When you created the health check, CreateHealthCheck returned the ID in the response, in the HealthCheckId element. If you want to che */
  HealthCheckId: string;
}

/** A request to get information about a specified hosted zone. */
export interface GetHostedZoneInput {
  /** The ID of the hosted zone that you want to get information about. */
  Id: string;
}

/** A complex type that contains information about the request to create a hosted zone. */
export interface GetHostedZoneLimitInput {
  /** The ID of the hosted zone that you want to get a limit for. */
  HostedZoneId: string;
  /** The limit that you want to get. Valid values include the following: MAX_RRSETS_BY_ZONE: The maximum number of records that you can create in the specified hosted zone. MAX_VPCS_ASSOCIATED_BY_ZONE: The */
  Type: 'MAX_RRSETS_BY_ZONE' | 'MAX_VPCS_ASSOCIATED_BY_ZONE';
}

export interface GetQueryLoggingConfigInput {
  /** The ID of the configuration for DNS query logging that you want to get information about. */
  Id: string;
}

/** A request to get information about a specified reusable delegation set. */
export interface GetReusableDelegationSetInput {
  /** The ID of the reusable delegation set that you want to get a list of name servers for. */
  Id: string;
}

/** A complex type that contains information about the request to create a hosted zone. */
export interface GetReusableDelegationSetLimitInput {
  /** The ID of the delegation set that you want to get the limit for. */
  DelegationSetId: string;
  /** Specify MAX_ZONES_BY_REUSABLE_DELEGATION_SET to get the maximum number of hosted zones that you can associate with the specified reusable delegation set. */
  Type: 'MAX_ZONES_BY_REUSABLE_DELEGATION_SET';
}

/** Gets information about a specific traffic policy version. */
export interface GetTrafficPolicyInput {
  /** The ID of the traffic policy that you want to get information about. */
  Id: string;
  /** The version number of the traffic policy that you want to get information about. */
  Version: number;
}

/** Gets information about a specified traffic policy instance. */
export interface GetTrafficPolicyInstanceInput {
  /** The ID of the traffic policy instance that you want to get information about. */
  Id: string;
}

export interface ListCidrBlocksInput {
  /** The UUID of the CIDR collection. */
  CollectionId: string;
  /** The name of the CIDR collection location. */
  LocationName?: string;
  /** Maximum number of results you want returned. */
  MaxResults?: number;
  /** An opaque pagination token to indicate where the service is to begin enumerating results. */
  NextToken?: string;
}

export interface ListCidrCollectionsInput {
  /** The maximum number of CIDR collections to return in the response. */
  MaxResults?: number;
  /** An opaque pagination token to indicate where the service is to begin enumerating results. If no value is provided, the listing of results starts from the beginning. */
  NextToken?: string;
}

export interface ListCidrLocationsInput {
  /** The CIDR collection ID. */
  CollectionId: string;
  /** The maximum number of CIDR collection locations to return in the response. */
  MaxResults?: number;
  /** An opaque pagination token to indicate where the service is to begin enumerating results. If no value is provided, the listing of results starts from the beginning. */
  NextToken?: string;
}

/** A request to get a list of geographic locations that Amazon Route 53 supports for geolocation resource record sets. */
export interface ListGeoLocationsInput {
  /** (Optional) The maximum number of geolocations to be included in the response body for this request. If more than maxitems geolocations remain to be listed, then the value of the IsTruncated element in */
  MaxItems?: number;
  /** The code for the continent with which you want to start listing locations that Amazon Route 53 supports for geolocation. If Route 53 has already returned a page or more of results, if IsTruncated is t */
  StartContinentCode?: string;
  /** The code for the country with which you want to start listing locations that Amazon Route 53 supports for geolocation. If Route 53 has already returned a page or more of results, if IsTruncated is tru */
  StartCountryCode?: string;
  /** The code for the state of the United States with which you want to start listing locations that Amazon Route 53 supports for geolocation. If Route 53 has already returned a page or more of results, if */
  StartSubdivisionCode?: string;
}

/** A request to retrieve a list of the health checks that are associated with the current Amazon Web Services account. */
export interface ListHealthChecksInput {
  /** If the value of IsTruncated in the previous response was true, you have more health checks. To get another group, submit another ListHealthChecks request. For the value of marker, specify the value of */
  Marker?: string;
  /** The maximum number of health checks that you want ListHealthChecks to return in response to the current request. Amazon Route 53 returns a maximum of 1000 items. If you set MaxItems to a value greater */
  MaxItems?: number;
}

/** A request to retrieve a list of the public and private hosted zones that are associated with the current Amazon Web Services account. */
export interface ListHostedZonesInput {
  /** If you're using reusable delegation sets and you want to list all of the hosted zones that are associated with a reusable delegation set, specify the ID of that reusable delegation set. */
  DelegationSetId?: string;
  /** (Optional) Specifies if the hosted zone is private. */
  HostedZoneType?: 'PrivateHostedZone';
  /** If the value of IsTruncated in the previous response was true, you have more hosted zones. To get more hosted zones, submit another ListHostedZones request. For the value of marker, specify the value  */
  Marker?: string;
  /** (Optional) The maximum number of hosted zones that you want Amazon Route 53 to return. If you have more than maxitems hosted zones, the value of IsTruncated in the response is true, and the value of N */
  MaxItems?: number;
}

/** Retrieves a list of the public and private hosted zones that are associated with the current Amazon Web Services account in ASCII order by domain name. */
export interface ListHostedZonesByNameInput {
  /** (Optional) For your first request to ListHostedZonesByName, include the dnsname parameter only if you want to specify the name of the first hosted zone in the response. If you don't include the dnsnam */
  DNSName?: string;
  /** (Optional) For your first request to ListHostedZonesByName, do not include the hostedzoneid parameter. If you have more hosted zones than the value of maxitems, ListHostedZonesByName returns only the  */
  HostedZoneId?: string;
  /** The maximum number of hosted zones to be included in the response body for this request. If you have more than maxitems hosted zones, then the value of the IsTruncated element in the response is true, */
  MaxItems?: number;
}

/** Lists all the private hosted zones that a specified VPC is associated with, regardless of which Amazon Web Services account created the hosted zones. */
export interface ListHostedZonesByVPCInput {
  /** The ID of the Amazon VPC that you want to list hosted zones for. */
  VPCId: string;
  /** For the Amazon VPC that you specified for VPCId, the Amazon Web Services Region that you created the VPC in. */
  VPCRegion: 'us-east-1' | 'us-east-2' | 'us-west-1' | 'us-west-2' | 'eu-west-1' | 'eu-west-2' | 'eu-west-3' | 'eu-central-1' | 'eu-central-2' | 'ap-east-1' | 'me-south-1' | 'us-gov-west-1' | 'us-gov-east-1' | 'us-iso-east-1' | 'us-iso-west-1' | 'us-isob-east-1' | 'me-central-1' | 'ap-southeast-1' | 'ap-southeast-2' | 'ap-southeast-3' | 'ap-south-1' | 'ap-south-2' | 'ap-northeast-1' | 'ap-northeast-2' | 'ap-northeast-3' | 'eu-north-1' | 'sa-east-1' | 'ca-central-1' | 'cn-north-1' | 'cn-northwest-1' | 'af-south-1' | 'eu-south-1' | 'eu-south-2' | 'ap-southeast-4' | 'il-central-1' | 'ca-west-1' | 'ap-southeast-5' | 'mx-central-1' | 'us-isof-south-1' | 'us-isof-east-1' | 'ap-southeast-7' | 'ap-east-2' | 'eu-isoe-west-1' | 'ap-southeast-6' | 'us-isob-west-1' | 'eusc-de-east-1';
  /** (Optional) The maximum number of hosted zones that you want Amazon Route 53 to return. If the specified VPC is associated with more than MaxItems hosted zones, the response includes a NextToken elemen */
  MaxItems?: number;
  /** If the previous response included a NextToken element, the specified VPC is associated with more hosted zones. To get more hosted zones, submit another ListHostedZonesByVPC request. For the value of N */
  NextToken?: string;
}

export interface ListQueryLoggingConfigsInput {
  /** (Optional) If you want to list the query logging configuration that is associated with a hosted zone, specify the ID in HostedZoneId. If you don't specify a hosted zone ID, ListQueryLoggingConfigs ret */
  HostedZoneId?: string;
  /** (Optional) The maximum number of query logging configurations that you want Amazon Route 53 to return in response to the current request. If the current Amazon Web Services account has more than MaxRe */
  MaxResults?: number;
  /** (Optional) If the current Amazon Web Services account has more than MaxResults query logging configurations, use NextToken to get the second and subsequent pages of results. For the first ListQueryLog */
  NextToken?: string;
}

/** A request for the resource record sets that are associated with a specified hosted zone. */
export interface ListResourceRecordSetsInput {
  /** The ID of the hosted zone that contains the resource record sets that you want to list. */
  HostedZoneId: string;
  /** (Optional) The maximum number of resource records sets to include in the response body for this request. If the response includes more than maxitems resource record sets, the value of the IsTruncated  */
  MaxItems?: number;
  /** Resource record sets that have a routing policy other than simple: If results were truncated for a given DNS name and type, specify the value of NextRecordIdentifier from the previous response to get  */
  StartRecordIdentifier?: string;
  /** The first name in the lexicographic ordering of resource record sets that you want to list. If the specified record name doesn't exist, the results begin with the first resource record set that has a  */
  StartRecordName?: string;
  /** The type of resource record set to begin the record listing from. Valid values for basic resource record sets: A | AAAA | CAA | CNAME | MX | NAPTR | NS | PTR | SOA | SPF | SRV | TXT Values for weighte */
  StartRecordType?: 'SOA' | 'A' | 'TXT' | 'NS' | 'CNAME' | 'MX' | 'NAPTR' | 'PTR' | 'SRV' | 'SPF' | 'AAAA' | 'CAA' | 'DS' | 'TLSA' | 'SSHFP' | 'SVCB' | 'HTTPS';
}

/** A request to get a list of the reusable delegation sets that are associated with the current Amazon Web Services account. */
export interface ListReusableDelegationSetsInput {
  /** If the value of IsTruncated in the previous response was true, you have more reusable delegation sets. To get another group, submit another ListReusableDelegationSets request. For the value of marker, */
  Marker?: string;
  /** The number of reusable delegation sets that you want Amazon Route 53 to return in the response to this request. If you specify a value greater than 100, Route 53 returns only the first 100 reusable de */
  MaxItems?: number;
}

/** A complex type containing information about a request for a list of the tags that are associated with an individual resource. */
export interface ListTagsForResourceInput {
  /** The ID of the resource for which you want to retrieve tags. */
  ResourceId: string;
  /** The type of the resource. The resource type for health checks is healthcheck. The resource type for hosted zones is hostedzone. */
  ResourceType: 'healthcheck' | 'hostedzone';
}

/** A complex type that contains information about the health checks or hosted zones for which you want to list tags. */
export interface ListTagsForResourcesInput {
  /** A complex type that contains the ResourceId element for each resource for which you want to get a list of tags. */
  ResourceIds: string[];
  /** The type of the resources. The resource type for health checks is healthcheck. The resource type for hosted zones is hostedzone. */
  ResourceType: 'healthcheck' | 'hostedzone';
}

/** A complex type that contains the information about the request to list the traffic policies that are associated with the current Amazon Web Services account. */
export interface ListTrafficPoliciesInput {
  /** (Optional) The maximum number of traffic policies that you want Amazon Route 53 to return in response to this request. If you have more than MaxItems traffic policies, the value of IsTruncated in the  */
  MaxItems?: number;
  /** (Conditional) For your first request to ListTrafficPolicies, don't include the TrafficPolicyIdMarker parameter. If you have more traffic policies than the value of MaxItems, ListTrafficPolicies return */
  TrafficPolicyIdMarker?: string;
}

/** A request to get information about the traffic policy instances that you created by using the current Amazon Web Services account. */
export interface ListTrafficPolicyInstancesInput {
  /** If the value of IsTruncated in the previous response was true, you have more traffic policy instances. To get more traffic policy instances, submit another ListTrafficPolicyInstances request. For the  */
  HostedZoneIdMarker?: string;
  /** The maximum number of traffic policy instances that you want Amazon Route 53 to return in response to a ListTrafficPolicyInstances request. If you have more than MaxItems traffic policy instances, the */
  MaxItems?: number;
  /** If the value of IsTruncated in the previous response was true, you have more traffic policy instances. To get more traffic policy instances, submit another ListTrafficPolicyInstances request. For the  */
  TrafficPolicyInstanceNameMarker?: string;
  /** If the value of IsTruncated in the previous response was true, you have more traffic policy instances. To get more traffic policy instances, submit another ListTrafficPolicyInstances request. For the  */
  TrafficPolicyInstanceTypeMarker?: 'SOA' | 'A' | 'TXT' | 'NS' | 'CNAME' | 'MX' | 'NAPTR' | 'PTR' | 'SRV' | 'SPF' | 'AAAA' | 'CAA' | 'DS' | 'TLSA' | 'SSHFP' | 'SVCB' | 'HTTPS';
}

/** A request for the traffic policy instances that you created in a specified hosted zone. */
export interface ListTrafficPolicyInstancesByHostedZoneInput {
  /** The ID of the hosted zone that you want to list traffic policy instances for. */
  HostedZoneId: string;
  /** The maximum number of traffic policy instances to be included in the response body for this request. If you have more than MaxItems traffic policy instances, the value of the IsTruncated element in th */
  MaxItems?: number;
  /** If the value of IsTruncated in the previous response is true, you have more traffic policy instances. To get more traffic policy instances, submit another ListTrafficPolicyInstances request. For the v */
  TrafficPolicyInstanceNameMarker?: string;
  /** If the value of IsTruncated in the previous response is true, you have more traffic policy instances. To get more traffic policy instances, submit another ListTrafficPolicyInstances request. For the v */
  TrafficPolicyInstanceTypeMarker?: 'SOA' | 'A' | 'TXT' | 'NS' | 'CNAME' | 'MX' | 'NAPTR' | 'PTR' | 'SRV' | 'SPF' | 'AAAA' | 'CAA' | 'DS' | 'TLSA' | 'SSHFP' | 'SVCB' | 'HTTPS';
}

/** A complex type that contains the information about the request to list your traffic policy instances. */
export interface ListTrafficPolicyInstancesByPolicyInput {
  /** The ID of the traffic policy for which you want to list traffic policy instances. */
  TrafficPolicyId: string;
  /** The version of the traffic policy for which you want to list traffic policy instances. The version must be associated with the traffic policy that is specified by TrafficPolicyId. */
  TrafficPolicyVersion: number;
  /** If the value of IsTruncated in the previous response was true, you have more traffic policy instances. To get more traffic policy instances, submit another ListTrafficPolicyInstancesByPolicy request.  */
  HostedZoneIdMarker?: string;
  /** The maximum number of traffic policy instances to be included in the response body for this request. If you have more than MaxItems traffic policy instances, the value of the IsTruncated element in th */
  MaxItems?: number;
  /** If the value of IsTruncated in the previous response was true, you have more traffic policy instances. To get more traffic policy instances, submit another ListTrafficPolicyInstancesByPolicy request.  */
  TrafficPolicyInstanceNameMarker?: string;
  /** If the value of IsTruncated in the previous response was true, you have more traffic policy instances. To get more traffic policy instances, submit another ListTrafficPolicyInstancesByPolicy request.  */
  TrafficPolicyInstanceTypeMarker?: 'SOA' | 'A' | 'TXT' | 'NS' | 'CNAME' | 'MX' | 'NAPTR' | 'PTR' | 'SRV' | 'SPF' | 'AAAA' | 'CAA' | 'DS' | 'TLSA' | 'SSHFP' | 'SVCB' | 'HTTPS';
}

/** A complex type that contains the information about the request to list your traffic policies. */
export interface ListTrafficPolicyVersionsInput {
  /** Specify the value of Id of the traffic policy for which you want to list all versions. */
  Id: string;
  /** The maximum number of traffic policy versions that you want Amazon Route 53 to include in the response body for this request. If the specified traffic policy has more than MaxItems versions, the value */
  MaxItems?: number;
  /** For your first request to ListTrafficPolicyVersions, don't include the TrafficPolicyVersionMarker parameter. If you have more traffic policy versions than the value of MaxItems, ListTrafficPolicyVersi */
  TrafficPolicyVersionMarker?: string;
}

/** A complex type that contains information about that can be associated with your hosted zone. */
export interface ListVPCAssociationAuthorizationsInput {
  /** The ID of the hosted zone for which you want a list of VPCs that can be associated with the hosted zone. */
  HostedZoneId: string;
  /** Optional: An integer that specifies the maximum number of VPCs that you want Amazon Route 53 to return. If you don't specify a value for MaxResults, Route 53 returns up to 50 VPCs per page. */
  MaxResults?: number;
  /** Optional: If a response includes a NextToken element, there are more VPCs that can be associated with the specified hosted zone. To get the next page of results, submit another request, and include th */
  NextToken?: string;
}

/** Gets the value that Amazon Route 53 returns in response to a DNS request for a specified record name and type. You can optionally specify the IP address of a DNS resolver, an EDNS0 client subnet IP ad */
export interface TestDNSAnswerInput {
  /** The ID of the hosted zone that you want Amazon Route 53 to simulate a query for. */
  HostedZoneId: string;
  /** The name of the resource record set that you want Amazon Route 53 to simulate a query for. */
  RecordName: string;
  /** The type of the resource record set. */
  RecordType: 'SOA' | 'A' | 'TXT' | 'NS' | 'CNAME' | 'MX' | 'NAPTR' | 'PTR' | 'SRV' | 'SPF' | 'AAAA' | 'CAA' | 'DS' | 'TLSA' | 'SSHFP' | 'SVCB' | 'HTTPS';
  /** If the resolver that you specified for resolverip supports EDNS0, specify the IPv4 or IPv6 address of a client in the applicable location, for example, 192.0.2.44 or 2001:db8:85a3::8a2e:370:7334. */
  EDNS0ClientSubnetIP?: string;
  /** If you specify an IP address for edns0clientsubnetip, you can optionally specify the number of bits of the IP address that you want the checking tool to include in the DNS query. For example, if you s */
  EDNS0ClientSubnetMask?: string;
  /** If you want to simulate a request from a specific DNS resolver, specify the IP address for that resolver. If you omit this value, TestDnsAnswer uses the IP address of a DNS resolver in the Amazon Web  */
  ResolverIP?: string;
}

/** A complex type that contains information about a request to update a health check. */
export interface UpdateHealthCheckInput {
  /** The ID for the health check for which you want detailed information. When you created the health check, CreateHealthCheck returned the ID in the response, in the HealthCheckId element. */
  HealthCheckId: string;
  /** A complex type that identifies the CloudWatch alarm that you want Amazon Route 53 health checkers to use to determine whether the specified health check is healthy. */
  AlarmIdentifier?: AlarmIdentifier;
  /** A complex type that contains one ChildHealthCheck element for each health check that you want to associate with a CALCULATED health check. */
  ChildHealthChecks?: string[];
  /** Stops Route 53 from performing health checks. When you disable a health check, here's what happens: Health checks that check the health of endpoints: Route 53 stops submitting requests to your applica */
  Disabled?: boolean;
  /** Specify whether you want Amazon Route 53 to send the value of FullyQualifiedDomainName to the endpoint in the client_hello message during TLS negotiation. This allows the endpoint to respond to HTTPS  */
  EnableSNI?: boolean;
  /** The number of consecutive health checks that an endpoint must pass or fail for Amazon Route 53 to change the current status of the endpoint from unhealthy to healthy or vice versa. For more informatio */
  FailureThreshold?: number;
  /** Amazon Route 53 behavior depends on whether you specify a value for IPAddress. If a health check already has a value for IPAddress, you can change the value. However, you can't update an existing heal */
  FullyQualifiedDomainName?: string;
  /** A sequential counter that Amazon Route 53 sets to 1 when you create a health check and increments by 1 each time you update settings for the health check. We recommend that you use GetHealthCheck or L */
  HealthCheckVersion?: number;
  /** The number of child health checks that are associated with a CALCULATED health that Amazon Route 53 must consider healthy for the CALCULATED health check to be considered healthy. To specify the child */
  HealthThreshold?: number;
  /** When CloudWatch has insufficient data about the metric to determine the alarm state, the status that you want Amazon Route 53 to assign to the health check: Healthy: Route 53 considers the health chec */
  InsufficientDataHealthStatus?: 'Healthy' | 'Unhealthy' | 'LastKnownStatus';
  /** Specify whether you want Amazon Route 53 to invert the status of a health check, for example, to consider a health check unhealthy when it otherwise would be considered healthy. */
  Inverted?: boolean;
  /** The IPv4 or IPv6 IP address for the endpoint that you want Amazon Route 53 to perform health checks on. If you don't specify a value for IPAddress, Route 53 sends a DNS request to resolve the domain n */
  IPAddress?: string;
  /** The port on the endpoint that you want Amazon Route 53 to perform health checks on. Don't specify a value for Port when you specify a value for Type of CLOUDWATCH_METRIC or CALCULATED. */
  Port?: number;
  /** A complex type that contains one Region element for each region that you want Amazon Route 53 health checkers to check the specified endpoint from. */
  Regions?: 'us-east-1' | 'us-west-1' | 'us-west-2' | 'eu-west-1' | 'ap-southeast-1' | 'ap-southeast-2' | 'ap-northeast-1' | 'sa-east-1'[];
  /** A complex type that contains one ResettableElementName element for each element that you want to reset to the default value. Valid values for ResettableElementName include the following: ChildHealthCh */
  ResetElements?: 'FullyQualifiedDomainName' | 'Regions' | 'ResourcePath' | 'ChildHealthChecks'[];
  /** The path that you want Amazon Route 53 to request when performing health checks. The path can be any value for which your endpoint will return an HTTP status code of 2xx or 3xx when the endpoint is he */
  ResourcePath?: string;
  /** If the value of Type is HTTP_STR_MATCH or HTTPS_STR_MATCH, the string that you want Amazon Route 53 to search for in the response body from the specified resource. If the string appears in the respons */
  SearchString?: string;
}

/** A request to update the comment for a hosted zone. */
export interface UpdateHostedZoneCommentInput {
  /** The ID for the hosted zone that you want to update the comment for. */
  Id: string;
  /** The new comment for the hosted zone. If you don't specify a value for Comment, Amazon Route 53 deletes the existing value of the Comment element, if any. */
  Comment?: string;
}

export interface UpdateHostedZoneFeaturesInput {
  /** The ID of the hosted zone for which you want to update features. This is the unique identifier for your hosted zone. */
  HostedZoneId: string;
  /** Specifies whether to enable accelerated recovery for the hosted zone. Set to true to enable accelerated recovery, or false to disable it. */
  EnableAcceleratedRecovery?: boolean;
}

/** A complex type that contains information about the traffic policy that you want to update the comment for. */
export interface UpdateTrafficPolicyCommentInput {
  /** The new comment for the specified traffic policy and version. */
  Comment: string;
  /** The value of Id for the traffic policy that you want to update the comment for. */
  Id: string;
  /** The value of Version for the traffic policy that you want to update the comment for. */
  Version: number;
}

/** A complex type that contains information about the resource record sets that you want to update based on a specified traffic policy instance. */
export interface UpdateTrafficPolicyInstanceInput {
  /** The ID of the traffic policy instance that you want to update. */
  Id: string;
  /** The ID of the traffic policy that you want Amazon Route 53 to use to update resource record sets for the specified traffic policy instance. */
  TrafficPolicyId: string;
  /** The version of the traffic policy that you want Amazon Route 53 to use to update resource record sets for the specified traffic policy instance. */
  TrafficPolicyVersion: number;
  /** The TTL that you want Amazon Route 53 to assign to all of the updated resource record sets. */
  TTL: number;
}

/** Route 53 service binding for Step Functions SDK integrations. */
export class Route53 {
  constructor() {}

  activateKeySigningKey<T>(params: ActivateKeySigningKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateVPCWithHostedZone<T>(params: AssociateVPCWithHostedZoneInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  changeCidrCollection<T>(params: ChangeCidrCollectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  changeResourceRecordSets<T>(params: ChangeResourceRecordSetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  changeTagsForResource<T>(params: ChangeTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCidrCollection<T>(params: CreateCidrCollectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createHealthCheck<T>(params: CreateHealthCheckInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createHostedZone<T>(params: CreateHostedZoneInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createKeySigningKey<T>(params: CreateKeySigningKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createQueryLoggingConfig<T>(params: CreateQueryLoggingConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createReusableDelegationSet<T>(params: CreateReusableDelegationSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTrafficPolicy<T>(params: CreateTrafficPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTrafficPolicyInstance<T>(params: CreateTrafficPolicyInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTrafficPolicyVersion<T>(params: CreateTrafficPolicyVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVPCAssociationAuthorization<T>(params: CreateVPCAssociationAuthorizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deactivateKeySigningKey<T>(params: DeactivateKeySigningKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCidrCollection<T>(params: DeleteCidrCollectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteHealthCheck<T>(params: DeleteHealthCheckInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteHostedZone<T>(params: DeleteHostedZoneInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteKeySigningKey<T>(params: DeleteKeySigningKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteQueryLoggingConfig<T>(params: DeleteQueryLoggingConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteReusableDelegationSet<T>(params: DeleteReusableDelegationSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTrafficPolicy<T>(params: DeleteTrafficPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTrafficPolicyInstance<T>(params: DeleteTrafficPolicyInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVPCAssociationAuthorization<T>(params: DeleteVPCAssociationAuthorizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableHostedZoneDNSSEC<T>(params: DisableHostedZoneDNSSECInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateVPCFromHostedZone<T>(params: DisassociateVPCFromHostedZoneInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableHostedZoneDNSSEC<T>(params: EnableHostedZoneDNSSECInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAccountLimit<T>(params: GetAccountLimitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getChange<T>(params: GetChangeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCheckerIpRanges<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDNSSEC<T>(params: GetDNSSECInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getGeoLocation<T>(params: GetGeoLocationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getHealthCheck<T>(params: GetHealthCheckInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getHealthCheckCount<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getHealthCheckLastFailureReason<T>(params: GetHealthCheckLastFailureReasonInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getHealthCheckStatus<T>(params: GetHealthCheckStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getHostedZone<T>(params: GetHostedZoneInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getHostedZoneCount<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getHostedZoneLimit<T>(params: GetHostedZoneLimitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getQueryLoggingConfig<T>(params: GetQueryLoggingConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getReusableDelegationSet<T>(params: GetReusableDelegationSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getReusableDelegationSetLimit<T>(params: GetReusableDelegationSetLimitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTrafficPolicy<T>(params: GetTrafficPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTrafficPolicyInstance<T>(params: GetTrafficPolicyInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTrafficPolicyInstanceCount<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCidrBlocks<T>(params: ListCidrBlocksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCidrCollections<T>(params: ListCidrCollectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCidrLocations<T>(params: ListCidrLocationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listGeoLocations<T>(params: ListGeoLocationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listHealthChecks<T>(params: ListHealthChecksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listHostedZones<T>(params: ListHostedZonesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listHostedZonesByName<T>(params: ListHostedZonesByNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listHostedZonesByVPC<T>(params: ListHostedZonesByVPCInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listQueryLoggingConfigs<T>(params: ListQueryLoggingConfigsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listResourceRecordSets<T>(params: ListResourceRecordSetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listReusableDelegationSets<T>(params: ListReusableDelegationSetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResources<T>(params: ListTagsForResourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTrafficPolicies<T>(params: ListTrafficPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTrafficPolicyInstances<T>(params: ListTrafficPolicyInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTrafficPolicyInstancesByHostedZone<T>(params: ListTrafficPolicyInstancesByHostedZoneInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTrafficPolicyInstancesByPolicy<T>(params: ListTrafficPolicyInstancesByPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTrafficPolicyVersions<T>(params: ListTrafficPolicyVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listVPCAssociationAuthorizations<T>(params: ListVPCAssociationAuthorizationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testDNSAnswer<T>(params: TestDNSAnswerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateHealthCheck<T>(params: UpdateHealthCheckInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateHostedZoneComment<T>(params: UpdateHostedZoneCommentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateHostedZoneFeatures<T>(params: UpdateHostedZoneFeaturesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTrafficPolicyComment<T>(params: UpdateTrafficPolicyCommentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTrafficPolicyInstance<T>(params: UpdateTrafficPolicyInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
