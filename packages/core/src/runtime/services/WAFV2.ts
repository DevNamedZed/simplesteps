// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface Rule {
  /** The name of the rule. If you change the name of a Rule after you create it and you want the rule's metric name to reflect the change, update the metric name in the rule's VisibilityConfig settings. WA */
  Name: string;
  /** If you define more than one Rule in a WebACL, WAF evaluates each request against the Rules in order based on the value of Priority. WAF processes rules with lower priority first. The priorities don't  */
  Priority: number;
  /** The WAF processing statement for the rule, for example ByteMatchStatement or SizeConstraintStatement. */
  Statement: any;
  /** The action that WAF should take on a web request when it matches the rule statement. Settings at the web ACL level can override the rule action setting. This is used only for rules whose statements do */
  Action?: any;
  /** The action to use in the place of the action that results from the rule group evaluation. Set the override action to none to leave the result of the rule group alone. Set it to count to override the r */
  OverrideAction?: any;
  /** Labels to apply to web requests that match the rule match statement. WAF applies fully qualified labels to matching web requests. A fully qualified label is the concatenation of a label namespace and  */
  RuleLabels?: any[];
  /** Defines and enables Amazon CloudWatch metrics and web request sample collection. If you change the name of a Rule after you create it and you want the rule's metric name to reflect the change, update  */
  VisibilityConfig: any;
  /** Specifies how WAF should handle CAPTCHA evaluations. If you don't specify this, WAF uses the CAPTCHA configuration that's defined for the web ACL. */
  CaptchaConfig?: any;
  /** Specifies how WAF should handle Challenge evaluations. If you don't specify this, WAF uses the challenge configuration that's defined for the web ACL. */
  ChallengeConfig?: any;
}

export interface Tag {
  /** Part of the key:value pair that defines a tag. You can use a tag key to describe a category of information, such as "customer." Tag keys are case-sensitive. */
  Key: string;
  /** Part of the key:value pair that defines a tag. You can use a tag value to describe a specific value within a category, such as "companyA" or "companyB." Tag values are case-sensitive. */
  Value: string;
}

export interface Regex {
  /** The string representing the regular expression. */
  RegexString?: string;
}

export interface VisibilityConfig {
  /** Indicates whether WAF should store a sampling of the web requests that match the rules. You can view the sampled requests through the WAF console. If you configure data protection for the web ACL, the */
  SampledRequestsEnabled: boolean;
  /** Indicates whether the associated resource sends metrics to Amazon CloudWatch. For the list of available metrics, see WAF Metrics in the WAF Developer Guide. For web ACLs, the metrics are for web reque */
  CloudWatchMetricsEnabled: boolean;
  /** A name of the Amazon CloudWatch metric dimension. The name can contain only the characters: A-Z, a-z, 0-9, - (hyphen), and _ (underscore). The name can be from one to 128 characters long. It can't con */
  MetricName: string;
}

export interface CustomResponseBody {
  /** The type of content in the payload that you are defining in the Content string. */
  ContentType: 'TEXT_PLAIN' | 'TEXT_HTML' | 'APPLICATION_JSON';
  /** The payload of the custom response. You can use JSON escape strings in JSON content. To do this, you must specify JSON content in the ContentType setting. For information about the limits on count and */
  Content: string;
}

export interface BlockAction {
  /** Defines a custom response for the web request. For information about customizing web requests and responses, see Customizing web requests and responses in WAF in the WAF Developer Guide. */
  CustomResponse?: any;
}

export interface AllowAction {
  /** Defines custom handling for the web request. For information about customizing web requests and responses, see Customizing web requests and responses in WAF in the WAF Developer Guide. */
  CustomRequestHandling?: any;
}

export interface DefaultAction {
  /** Specifies that WAF should block requests by default. */
  Block?: BlockAction;
  /** Specifies that WAF should allow requests by default. */
  Allow?: AllowAction;
}

export interface DataProtectionConfig {
  /** An array of data protection configurations for specific web request field types. This is defined for each web ACL. WAF applies the specified protection to all web requests that the web ACL inspects. */
  DataProtections: any[];
}

export interface ImmunityTimeProperty {
  /** The amount of time, in seconds, that a CAPTCHA or challenge timestamp is considered valid by WAF. The default setting is 300. For the Challenge action, the minimum setting is 300. */
  ImmunityTime: number;
}

export interface CaptchaConfig {
  /** Determines how long a CAPTCHA timestamp in the token remains valid after the client successfully solves a CAPTCHA puzzle. */
  ImmunityTimeProperty?: ImmunityTimeProperty;
}

export interface ChallengeConfig {
  /** Determines how long a challenge timestamp in the token remains valid after the client successfully responds to a challenge. */
  ImmunityTimeProperty?: ImmunityTimeProperty;
}

export interface AssociationConfig {
  /** Customizes the maximum size of the request body that your protected CloudFront, API Gateway, Amazon Cognito, App Runner, and Verified Access resources forward to WAF for inspection. The default size i */
  RequestBody?: Record<string, any>;
}

export interface OnSourceDDoSProtectionConfig {
  /** The level of DDoS protection that applies to web ACLs associated with Application Load Balancers. ACTIVE_UNDER_DDOS protection is enabled by default whenever a web ACL is associated with an Applicatio */
  ALBLowReputationMode: 'ACTIVE_UNDER_DDOS' | 'ALWAYS_ON';
}

export interface ApplicationConfig {
  /** Contains the attribute name and a list of values for that attribute. */
  Attributes?: any[];
}

export interface TimeWindow {
  /** The beginning of the time range from which you want GetSampledRequests to return a sample of the requests that your Amazon Web Services resource received. You must specify the times in Coordinated Uni */
  StartTime: string;
  /** The end of the time range from which you want GetSampledRequests to return a sample of the requests that your Amazon Web Services resource received. You must specify the times in Coordinated Universal */
  EndTime: string;
}

export interface LoggingFilter {
  /** The filters that you want to apply to the logs. */
  Filters: any[];
  /** Default handling for logs that don't match any of the specified filtering conditions. */
  DefaultBehavior: 'KEEP' | 'DROP';
}

export interface LoggingConfiguration {
  /** The Amazon Resource Name (ARN) of the web ACL that you want to associate with LogDestinationConfigs. */
  ResourceArn: string;
  /** The logging destination configuration that you want to associate with the web ACL. You can associate one logging destination to a web ACL. */
  LogDestinationConfigs: string[];
  /** The parts of the request that you want to keep out of the logs. For example, if you redact the SingleHeader field, the HEADER field in the logs will be REDACTED for all rules that use the SingleHeader */
  RedactedFields?: any[];
  /** Indicates whether the logging configuration was created by Firewall Manager, as part of an WAF policy configuration. If true, only Firewall Manager can modify or delete the configuration. The logging  */
  ManagedByFirewallManager?: boolean;
  /** Filtering that specifies which web requests are kept in the logs and which are dropped. You can filter on the rule action and on the web request labels that were applied by matching rules during web A */
  LoggingFilter?: LoggingFilter;
  /** Used to distinguish between various logging options. Currently, there is one option. Default: WAF_LOGS */
  LogType?: 'WAF_LOGS';
  /** The owner of the logging configuration, which must be set to CUSTOMER for the configurations that you manage. The log scope SECURITY_LAKE indicates a configuration that is managed through Amazon Secur */
  LogScope?: 'CUSTOMER' | 'SECURITY_LAKE' | 'CLOUDWATCH_TELEMETRY_RULE_MANAGED';
}

export interface VersionToPublish {
  /** The Amazon Resource Name (ARN) of the vendor's rule group that's used in the published managed rule group version. */
  AssociatedRuleGroupArn?: string;
  /** The amount of time the vendor expects this version of the managed rule group to last, in days. */
  ForecastedLifetime?: number;
}

export interface AssociateWebACLInput {
  /** The Amazon Resource Name (ARN) of the resource to associate with the web ACL. The ARN must be in one of the following formats: For an Application Load Balancer: arn:partition:elasticloadbalancing:regi */
  ResourceArn: string;
  /** The Amazon Resource Name (ARN) of the web ACL that you want to associate with the resource. */
  WebACLArn: string;
}

export interface CheckCapacityInput {
  /** An array of Rule that you're configuring to use in a rule group or web ACL. */
  Rules: Rule[];
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
}

export interface CreateAPIKeyInput {
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The client application domains that you want to use this API key for. Example JSON: "TokenDomains": ["abc.com", "store.abc.com"] Public suffixes aren't allowed. For example, you can't use gov.au or co */
  TokenDomains: string[];
}

export interface CreateIPSetInput {
  /** Contains an array of strings that specifies zero or more IP addresses or blocks of IP addresses that you want WAF to inspect for in incoming requests. All addresses must be specified using Classless I */
  Addresses: string[];
  /** The version of the IP addresses, either IPV4 or IPV6. */
  IPAddressVersion: 'IPV4' | 'IPV6';
  /** The name of the IP set. You cannot change the name of an IPSet after you create it. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** A description of the IP set that helps with identification. */
  Description?: string;
  /** An array of key:value pairs to associate with the resource. */
  Tags?: Tag[];
}

export interface CreateRegexPatternSetInput {
  /** The name of the set. You cannot change the name after you create the set. */
  Name: string;
  /** Array of regular expression strings. */
  RegularExpressionList: Regex[];
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** A description of the set that helps with identification. */
  Description?: string;
  /** An array of key:value pairs to associate with the resource. */
  Tags?: Tag[];
}

export interface CreateRuleGroupInput {
  /** The web ACL capacity units (WCUs) required for this rule group. When you create your own rule group, you define this, and you cannot change it after creation. When you add or modify the rules in a rul */
  Capacity: number;
  /** The name of the rule group. You cannot change the name of a rule group after you create it. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** Defines and enables Amazon CloudWatch metrics and web request sample collection. */
  VisibilityConfig: VisibilityConfig;
  /** A map of custom response keys and content bodies. When you create a rule with a block action, you can send a custom response to the web request. You define these for the rule group, and then use them  */
  CustomResponseBodies?: Record<string, CustomResponseBody>;
  /** A description of the rule group that helps with identification. */
  Description?: string;
  /** The Rule statements used to identify the web requests that you want to manage. Each rule includes one top-level statement that WAF uses to identify matching web requests, and parameters that govern ho */
  Rules?: Rule[];
  /** An array of key:value pairs to associate with the resource. */
  Tags?: Tag[];
}

export interface CreateWebACLInput {
  /** The action to perform if none of the Rules contained in the WebACL match. */
  DefaultAction: DefaultAction;
  /** The name of the web ACL. You cannot change the name of a web ACL after you create it. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** Defines and enables Amazon CloudWatch metrics and web request sample collection. */
  VisibilityConfig: VisibilityConfig;
  /** Configures the ability for the WAF console to store and retrieve application attributes during the web ACL creation process. Application attributes help WAF give recommendations for protection packs. */
  ApplicationConfig?: ApplicationConfig;
  /** Specifies custom configurations for the associations between the web ACL and protected resources. Use this to customize the maximum size of the request body that your protected resources forward to WA */
  AssociationConfig?: AssociationConfig;
  /** Specifies how WAF should handle CAPTCHA evaluations for rules that don't have their own CaptchaConfig settings. If you don't specify this, WAF uses its default settings for CaptchaConfig. */
  CaptchaConfig?: CaptchaConfig;
  /** Specifies how WAF should handle challenge evaluations for rules that don't have their own ChallengeConfig settings. If you don't specify this, WAF uses its default settings for ChallengeConfig. */
  ChallengeConfig?: ChallengeConfig;
  /** A map of custom response keys and content bodies. When you create a rule with a block action, you can send a custom response to the web request. You define these for the web ACL, and then use them in  */
  CustomResponseBodies?: Record<string, CustomResponseBody>;
  /** Specifies data protection to apply to the web request data for the web ACL. This is a web ACL level data protection option. The data protection that you configure for the web ACL alters the data that' */
  DataProtectionConfig?: DataProtectionConfig;
  /** A description of the web ACL that helps with identification. */
  Description?: string;
  /** Specifies the type of DDoS protection to apply to web request data for a web ACL. For most scenarios, it is recommended to use the default protection level, ACTIVE_UNDER_DDOS. If a web ACL is associat */
  OnSourceDDoSProtectionConfig?: OnSourceDDoSProtectionConfig;
  /** The Rule statements used to identify the web requests that you want to manage. Each rule includes one top-level statement that WAF uses to identify matching web requests, and parameters that govern ho */
  Rules?: Rule[];
  /** An array of key:value pairs to associate with the resource. */
  Tags?: Tag[];
  /** Specifies the domains that WAF should accept in a web request token. This enables the use of tokens across multiple protected websites. When WAF provides a token, it uses the domain of the Amazon Web  */
  TokenDomains?: string[];
}

export interface DeleteAPIKeyInput {
  /** The encrypted API key that you want to delete. */
  APIKey: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
}

export interface DeleteFirewallManagerRuleGroupsInput {
  /** The Amazon Resource Name (ARN) of the web ACL. */
  WebACLArn: string;
  /** A token used for optimistic locking. WAF returns a token to your get and list requests, to mark the state of the entity at the time of the request. To make changes to the entity associated with the to */
  WebACLLockToken: string;
}

export interface DeleteIPSetInput {
  /** A unique identifier for the set. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  Id: string;
  /** A token used for optimistic locking. WAF returns a token to your get and list requests, to mark the state of the entity at the time of the request. To make changes to the entity associated with the to */
  LockToken: string;
  /** The name of the IP set. You cannot change the name of an IPSet after you create it. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
}

export interface DeleteLoggingConfigurationInput {
  /** The Amazon Resource Name (ARN) of the web ACL from which you want to delete the LoggingConfiguration. */
  ResourceArn: string;
  /** The owner of the logging configuration, which must be set to CUSTOMER for the configurations that you manage. The log scope SECURITY_LAKE indicates a configuration that is managed through Amazon Secur */
  LogScope?: 'CUSTOMER' | 'SECURITY_LAKE' | 'CLOUDWATCH_TELEMETRY_RULE_MANAGED';
  /** Used to distinguish between various logging options. Currently, there is one option. Default: WAF_LOGS */
  LogType?: 'WAF_LOGS';
}

export interface DeletePermissionPolicyInput {
  /** The Amazon Resource Name (ARN) of the rule group from which you want to delete the policy. You must be the owner of the rule group to perform this operation. */
  ResourceArn: string;
}

export interface DeleteRegexPatternSetInput {
  /** A unique identifier for the set. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  Id: string;
  /** A token used for optimistic locking. WAF returns a token to your get and list requests, to mark the state of the entity at the time of the request. To make changes to the entity associated with the to */
  LockToken: string;
  /** The name of the set. You cannot change the name after you create the set. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
}

export interface DeleteRuleGroupInput {
  /** A unique identifier for the rule group. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  Id: string;
  /** A token used for optimistic locking. WAF returns a token to your get and list requests, to mark the state of the entity at the time of the request. To make changes to the entity associated with the to */
  LockToken: string;
  /** The name of the rule group. You cannot change the name of a rule group after you create it. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
}

export interface DeleteWebACLInput {
  /** The unique identifier for the web ACL. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  Id: string;
  /** A token used for optimistic locking. WAF returns a token to your get and list requests, to mark the state of the entity at the time of the request. To make changes to the entity associated with the to */
  LockToken: string;
  /** The name of the web ACL. You cannot change the name of a web ACL after you create it. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
}

export interface DescribeAllManagedProductsInput {
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
}

export interface DescribeManagedProductsByVendorInput {
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The name of the managed rule group vendor. You use this, along with the rule group name, to identify a rule group. */
  VendorName: string;
}

export interface DescribeManagedRuleGroupInput {
  /** The name of the managed rule group. You use this, along with the vendor name, to identify the rule group. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The name of the managed rule group vendor. You use this, along with the rule group name, to identify a rule group. */
  VendorName: string;
  /** The version of the rule group. You can only use a version that is not scheduled for expiration. If you don't provide this, WAF uses the vendor's default version. */
  VersionName?: string;
}

export interface DisassociateWebACLInput {
  /** The Amazon Resource Name (ARN) of the resource to disassociate from the web ACL. The ARN must be in one of the following formats: For an Application Load Balancer: arn:partition:elasticloadbalancing:r */
  ResourceArn: string;
}

export interface GenerateMobileSdkReleaseUrlInput {
  /** The device platform. */
  Platform: 'IOS' | 'ANDROID';
  /** The release version. For the latest available version, specify LATEST. */
  ReleaseVersion: string;
}

export interface GetDecryptedAPIKeyInput {
  /** The encrypted API key. */
  APIKey: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
}

export interface GetIPSetInput {
  /** A unique identifier for the set. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  Id: string;
  /** The name of the IP set. You cannot change the name of an IPSet after you create it. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
}

export interface GetLoggingConfigurationInput {
  /** The Amazon Resource Name (ARN) of the web ACL for which you want to get the LoggingConfiguration. */
  ResourceArn: string;
  /** The owner of the logging configuration, which must be set to CUSTOMER for the configurations that you manage. The log scope SECURITY_LAKE indicates a configuration that is managed through Amazon Secur */
  LogScope?: 'CUSTOMER' | 'SECURITY_LAKE' | 'CLOUDWATCH_TELEMETRY_RULE_MANAGED';
  /** Used to distinguish between various logging options. Currently, there is one option. Default: WAF_LOGS */
  LogType?: 'WAF_LOGS';
}

export interface GetManagedRuleSetInput {
  /** A unique identifier for the managed rule set. The ID is returned in the responses to commands like list. You provide it to operations like get and update. */
  Id: string;
  /** The name of the managed rule set. You use this, along with the rule set ID, to identify the rule set. This name is assigned to the corresponding managed rule group, which your customers can access and */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
}

export interface GetMobileSdkReleaseInput {
  /** The device platform. */
  Platform: 'IOS' | 'ANDROID';
  /** The release version. For the latest available version, specify LATEST. */
  ReleaseVersion: string;
}

export interface GetPermissionPolicyInput {
  /** The Amazon Resource Name (ARN) of the rule group for which you want to get the policy. */
  ResourceArn: string;
}

export interface GetRateBasedStatementManagedKeysInput {
  /** The name of the rate-based rule to get the keys for. If you have the rule defined inside a rule group that you're using in your web ACL, also provide the name of the rule group reference statement in  */
  RuleName: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The unique identifier for the web ACL. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  WebACLId: string;
  /** The name of the web ACL. You cannot change the name of a web ACL after you create it. */
  WebACLName: string;
  /** The name of the rule group reference statement in your web ACL. This is required only when you have the rate-based rule nested inside a rule group. */
  RuleGroupRuleName?: string;
}

export interface GetRegexPatternSetInput {
  /** A unique identifier for the set. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  Id: string;
  /** The name of the set. You cannot change the name after you create the set. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
}

export interface GetRuleGroupInput {
  /** The Amazon Resource Name (ARN) of the entity. */
  ARN?: string;
  /** A unique identifier for the rule group. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  Id?: string;
  /** The name of the rule group. You cannot change the name of a rule group after you create it. */
  Name?: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope?: 'CLOUDFRONT' | 'REGIONAL';
}

export interface GetSampledRequestsInput {
  /** The number of requests that you want WAF to return from among the first 5,000 requests that your Amazon Web Services resource received during the time range. If your resource received fewer requests t */
  MaxItems: number;
  /** The metric name assigned to the Rule or RuleGroup dimension for which you want a sample of requests. */
  RuleMetricName: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The start date and time and the end date and time of the range for which you want GetSampledRequests to return a sample of requests. You must specify the times in Coordinated Universal Time (UTC) form */
  TimeWindow: TimeWindow;
  /** The Amazon resource name (ARN) of the WebACL for which you want a sample of requests. */
  WebAclArn: string;
}

export interface GetWebACLInput {
  /** The Amazon Resource Name (ARN) of the web ACL that you want to retrieve. */
  ARN?: string;
  /** The unique identifier for the web ACL. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  Id?: string;
  /** The name of the web ACL. You cannot change the name of a web ACL after you create it. */
  Name?: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope?: 'CLOUDFRONT' | 'REGIONAL';
}

export interface GetWebACLForResourceInput {
  /** The Amazon Resource Name (ARN) of the resource whose web ACL you want to retrieve. The ARN must be in one of the following formats: For an Application Load Balancer: arn:partition:elasticloadbalancing */
  ResourceArn: string;
}

export interface ListAPIKeysInput {
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The maximum number of objects that you want WAF to return for this request. If more objects are available, in the response, WAF provides a NextMarker value that you can use in a subsequent call to get */
  Limit?: number;
  /** When you request a list of objects with a Limit setting, if the number of objects that are still available for retrieval exceeds the limit, WAF returns a NextMarker value in the response. To retrieve  */
  NextMarker?: string;
}

export interface ListAvailableManagedRuleGroupsInput {
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The maximum number of objects that you want WAF to return for this request. If more objects are available, in the response, WAF provides a NextMarker value that you can use in a subsequent call to get */
  Limit?: number;
  /** When you request a list of objects with a Limit setting, if the number of objects that are still available for retrieval exceeds the limit, WAF returns a NextMarker value in the response. To retrieve  */
  NextMarker?: string;
}

export interface ListAvailableManagedRuleGroupVersionsInput {
  /** The name of the managed rule group. You use this, along with the vendor name, to identify the rule group. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The name of the managed rule group vendor. You use this, along with the rule group name, to identify a rule group. */
  VendorName: string;
  /** The maximum number of objects that you want WAF to return for this request. If more objects are available, in the response, WAF provides a NextMarker value that you can use in a subsequent call to get */
  Limit?: number;
  /** When you request a list of objects with a Limit setting, if the number of objects that are still available for retrieval exceeds the limit, WAF returns a NextMarker value in the response. To retrieve  */
  NextMarker?: string;
}

export interface ListIPSetsInput {
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The maximum number of objects that you want WAF to return for this request. If more objects are available, in the response, WAF provides a NextMarker value that you can use in a subsequent call to get */
  Limit?: number;
  /** When you request a list of objects with a Limit setting, if the number of objects that are still available for retrieval exceeds the limit, WAF returns a NextMarker value in the response. To retrieve  */
  NextMarker?: string;
}

export interface ListLoggingConfigurationsInput {
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The maximum number of objects that you want WAF to return for this request. If more objects are available, in the response, WAF provides a NextMarker value that you can use in a subsequent call to get */
  Limit?: number;
  /** The owner of the logging configuration, which must be set to CUSTOMER for the configurations that you manage. The log scope SECURITY_LAKE indicates a configuration that is managed through Amazon Secur */
  LogScope?: 'CUSTOMER' | 'SECURITY_LAKE' | 'CLOUDWATCH_TELEMETRY_RULE_MANAGED';
  /** When you request a list of objects with a Limit setting, if the number of objects that are still available for retrieval exceeds the limit, WAF returns a NextMarker value in the response. To retrieve  */
  NextMarker?: string;
}

export interface ListManagedRuleSetsInput {
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The maximum number of objects that you want WAF to return for this request. If more objects are available, in the response, WAF provides a NextMarker value that you can use in a subsequent call to get */
  Limit?: number;
  /** When you request a list of objects with a Limit setting, if the number of objects that are still available for retrieval exceeds the limit, WAF returns a NextMarker value in the response. To retrieve  */
  NextMarker?: string;
}

export interface ListMobileSdkReleasesInput {
  /** The device platform to retrieve the list for. */
  Platform: 'IOS' | 'ANDROID';
  /** The maximum number of objects that you want WAF to return for this request. If more objects are available, in the response, WAF provides a NextMarker value that you can use in a subsequent call to get */
  Limit?: number;
  /** When you request a list of objects with a Limit setting, if the number of objects that are still available for retrieval exceeds the limit, WAF returns a NextMarker value in the response. To retrieve  */
  NextMarker?: string;
}

export interface ListRegexPatternSetsInput {
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The maximum number of objects that you want WAF to return for this request. If more objects are available, in the response, WAF provides a NextMarker value that you can use in a subsequent call to get */
  Limit?: number;
  /** When you request a list of objects with a Limit setting, if the number of objects that are still available for retrieval exceeds the limit, WAF returns a NextMarker value in the response. To retrieve  */
  NextMarker?: string;
}

export interface ListResourcesForWebACLInput {
  /** The Amazon Resource Name (ARN) of the web ACL. */
  WebACLArn: string;
  /** Retrieves the web ACLs that are used by the specified resource type. For Amazon CloudFront, don't use this call. Instead, use the CloudFront call ListDistributionsByWebACLId. For information, see List */
  ResourceType?: 'APPLICATION_LOAD_BALANCER' | 'API_GATEWAY' | 'APPSYNC' | 'COGNITO_USER_POOL' | 'APP_RUNNER_SERVICE' | 'VERIFIED_ACCESS_INSTANCE' | 'AMPLIFY';
}

export interface ListRuleGroupsInput {
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The maximum number of objects that you want WAF to return for this request. If more objects are available, in the response, WAF provides a NextMarker value that you can use in a subsequent call to get */
  Limit?: number;
  /** When you request a list of objects with a Limit setting, if the number of objects that are still available for retrieval exceeds the limit, WAF returns a NextMarker value in the response. To retrieve  */
  NextMarker?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the resource. */
  ResourceARN: string;
  /** The maximum number of objects that you want WAF to return for this request. If more objects are available, in the response, WAF provides a NextMarker value that you can use in a subsequent call to get */
  Limit?: number;
  /** When you request a list of objects with a Limit setting, if the number of objects that are still available for retrieval exceeds the limit, WAF returns a NextMarker value in the response. To retrieve  */
  NextMarker?: string;
}

export interface ListWebACLsInput {
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The maximum number of objects that you want WAF to return for this request. If more objects are available, in the response, WAF provides a NextMarker value that you can use in a subsequent call to get */
  Limit?: number;
  /** When you request a list of objects with a Limit setting, if the number of objects that are still available for retrieval exceeds the limit, WAF returns a NextMarker value in the response. To retrieve  */
  NextMarker?: string;
}

export interface PutLoggingConfigurationInput {
  LoggingConfiguration: LoggingConfiguration;
}

export interface PutManagedRuleSetVersionsInput {
  /** A unique identifier for the managed rule set. The ID is returned in the responses to commands like list. You provide it to operations like get and update. */
  Id: string;
  /** A token used for optimistic locking. WAF returns a token to your get and list requests, to mark the state of the entity at the time of the request. To make changes to the entity associated with the to */
  LockToken: string;
  /** The name of the managed rule set. You use this, along with the rule set ID, to identify the rule set. This name is assigned to the corresponding managed rule group, which your customers can access and */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The version of the named managed rule group that you'd like your customers to choose, from among your version offerings. */
  RecommendedVersion?: string;
  /** The versions of the named managed rule group that you want to offer to your customers. */
  VersionsToPublish?: Record<string, VersionToPublish>;
}

export interface PutPermissionPolicyInput {
  /** The policy to attach to the specified rule group. The policy specifications must conform to the following: The policy must be composed using IAM Policy version 2012-10-17. The policy must include spec */
  Policy: string;
  /** The Amazon Resource Name (ARN) of the RuleGroup to which you want to attach the policy. */
  ResourceArn: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource. */
  ResourceARN: string;
  /** An array of key:value pairs to associate with the resource. */
  Tags: Tag[];
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource. */
  ResourceARN: string;
  /** An array of keys identifying the tags to disassociate from the resource. */
  TagKeys: string[];
}

export interface UpdateIPSetInput {
  /** Contains an array of strings that specifies zero or more IP addresses or blocks of IP addresses that you want WAF to inspect for in incoming requests. All addresses must be specified using Classless I */
  Addresses: string[];
  /** A unique identifier for the set. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  Id: string;
  /** A token used for optimistic locking. WAF returns a token to your get and list requests, to mark the state of the entity at the time of the request. To make changes to the entity associated with the to */
  LockToken: string;
  /** The name of the IP set. You cannot change the name of an IPSet after you create it. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** A description of the IP set that helps with identification. */
  Description?: string;
}

export interface UpdateManagedRuleSetVersionExpiryDateInput {
  /** The time that you want the version to expire. Times are in Coordinated Universal Time (UTC) format. UTC format includes the special designator, Z. For example, "2016-09-27T14:50Z". */
  ExpiryTimestamp: string;
  /** A unique identifier for the managed rule set. The ID is returned in the responses to commands like list. You provide it to operations like get and update. */
  Id: string;
  /** A token used for optimistic locking. WAF returns a token to your get and list requests, to mark the state of the entity at the time of the request. To make changes to the entity associated with the to */
  LockToken: string;
  /** The name of the managed rule set. You use this, along with the rule set ID, to identify the rule set. This name is assigned to the corresponding managed rule group, which your customers can access and */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** The version that you want to remove from your list of offerings for the named managed rule group. */
  VersionToExpire: string;
}

export interface UpdateRegexPatternSetInput {
  /** A unique identifier for the set. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  Id: string;
  /** A token used for optimistic locking. WAF returns a token to your get and list requests, to mark the state of the entity at the time of the request. To make changes to the entity associated with the to */
  LockToken: string;
  /** The name of the set. You cannot change the name after you create the set. */
  Name: string;
  RegularExpressionList: Regex[];
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** A description of the set that helps with identification. */
  Description?: string;
}

export interface UpdateRuleGroupInput {
  /** A unique identifier for the rule group. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  Id: string;
  /** A token used for optimistic locking. WAF returns a token to your get and list requests, to mark the state of the entity at the time of the request. To make changes to the entity associated with the to */
  LockToken: string;
  /** The name of the rule group. You cannot change the name of a rule group after you create it. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** Defines and enables Amazon CloudWatch metrics and web request sample collection. */
  VisibilityConfig: VisibilityConfig;
  /** A map of custom response keys and content bodies. When you create a rule with a block action, you can send a custom response to the web request. You define these for the rule group, and then use them  */
  CustomResponseBodies?: Record<string, CustomResponseBody>;
  /** A description of the rule group that helps with identification. */
  Description?: string;
  /** The Rule statements used to identify the web requests that you want to manage. Each rule includes one top-level statement that WAF uses to identify matching web requests, and parameters that govern ho */
  Rules?: Rule[];
}

export interface UpdateWebACLInput {
  /** The action to perform if none of the Rules contained in the WebACL match. */
  DefaultAction: DefaultAction;
  /** The unique identifier for the web ACL. This ID is returned in the responses to create and list commands. You provide it to operations like update and delete. */
  Id: string;
  /** A token used for optimistic locking. WAF returns a token to your get and list requests, to mark the state of the entity at the time of the request. To make changes to the entity associated with the to */
  LockToken: string;
  /** The name of the web ACL. You cannot change the name of a web ACL after you create it. */
  Name: string;
  /** Specifies whether this is for a global resource type, such as a Amazon CloudFront distribution. For an Amplify application, use CLOUDFRONT. To work with CloudFront, you must also specify the Region US */
  Scope: 'CLOUDFRONT' | 'REGIONAL';
  /** Defines and enables Amazon CloudWatch metrics and web request sample collection. */
  VisibilityConfig: VisibilityConfig;
  /** Configures the ability for the WAF console to store and retrieve application attributes. Application attributes help WAF give recommendations for protection packs. When using UpdateWebACL, Application */
  ApplicationConfig?: ApplicationConfig;
  /** Specifies custom configurations for the associations between the web ACL and protected resources. Use this to customize the maximum size of the request body that your protected resources forward to WA */
  AssociationConfig?: AssociationConfig;
  /** Specifies how WAF should handle CAPTCHA evaluations for rules that don't have their own CaptchaConfig settings. If you don't specify this, WAF uses its default settings for CaptchaConfig. */
  CaptchaConfig?: CaptchaConfig;
  /** Specifies how WAF should handle challenge evaluations for rules that don't have their own ChallengeConfig settings. If you don't specify this, WAF uses its default settings for ChallengeConfig. */
  ChallengeConfig?: ChallengeConfig;
  /** A map of custom response keys and content bodies. When you create a rule with a block action, you can send a custom response to the web request. You define these for the web ACL, and then use them in  */
  CustomResponseBodies?: Record<string, CustomResponseBody>;
  /** Specifies data protection to apply to the web request data for the web ACL. This is a web ACL level data protection option. The data protection that you configure for the web ACL alters the data that' */
  DataProtectionConfig?: DataProtectionConfig;
  /** A description of the web ACL that helps with identification. */
  Description?: string;
  /** Specifies the type of DDoS protection to apply to web request data for a web ACL. For most scenarios, it is recommended to use the default protection level, ACTIVE_UNDER_DDOS. If a web ACL is associat */
  OnSourceDDoSProtectionConfig?: OnSourceDDoSProtectionConfig;
  /** The Rule statements used to identify the web requests that you want to manage. Each rule includes one top-level statement that WAF uses to identify matching web requests, and parameters that govern ho */
  Rules?: Rule[];
  /** Specifies the domains that WAF should accept in a web request token. This enables the use of tokens across multiple protected websites. When WAF provides a token, it uses the domain of the Amazon Web  */
  TokenDomains?: string[];
}

/** WAFV2 service binding for Step Functions SDK integrations. */
export class WAFV2 {
  constructor() {}

  associateWebACL<T>(params: AssociateWebACLInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  checkCapacity<T>(params: CheckCapacityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAPIKey<T>(params: CreateAPIKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIPSet<T>(params: CreateIPSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRegexPatternSet<T>(params: CreateRegexPatternSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRuleGroup<T>(params: CreateRuleGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createWebACL<T>(params: CreateWebACLInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAPIKey<T>(params: DeleteAPIKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteFirewallManagerRuleGroups<T>(params: DeleteFirewallManagerRuleGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIPSet<T>(params: DeleteIPSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLoggingConfiguration<T>(params: DeleteLoggingConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePermissionPolicy<T>(params: DeletePermissionPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRegexPatternSet<T>(params: DeleteRegexPatternSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRuleGroup<T>(params: DeleteRuleGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteWebACL<T>(params: DeleteWebACLInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAllManagedProducts<T>(params: DescribeAllManagedProductsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeManagedProductsByVendor<T>(params: DescribeManagedProductsByVendorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeManagedRuleGroup<T>(params: DescribeManagedRuleGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateWebACL<T>(params: DisassociateWebACLInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  generateMobileSdkReleaseUrl<T>(params: GenerateMobileSdkReleaseUrlInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDecryptedAPIKey<T>(params: GetDecryptedAPIKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIPSet<T>(params: GetIPSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLoggingConfiguration<T>(params: GetLoggingConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getManagedRuleSet<T>(params: GetManagedRuleSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMobileSdkRelease<T>(params: GetMobileSdkReleaseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPermissionPolicy<T>(params: GetPermissionPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRateBasedStatementManagedKeys<T>(params: GetRateBasedStatementManagedKeysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRegexPatternSet<T>(params: GetRegexPatternSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRuleGroup<T>(params: GetRuleGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSampledRequests<T>(params: GetSampledRequestsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getWebACL<T>(params: GetWebACLInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getWebACLForResource<T>(params: GetWebACLForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAPIKeys<T>(params: ListAPIKeysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAvailableManagedRuleGroups<T>(params: ListAvailableManagedRuleGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAvailableManagedRuleGroupVersions<T>(params: ListAvailableManagedRuleGroupVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listIPSets<T>(params: ListIPSetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLoggingConfigurations<T>(params: ListLoggingConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listManagedRuleSets<T>(params: ListManagedRuleSetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMobileSdkReleases<T>(params: ListMobileSdkReleasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRegexPatternSets<T>(params: ListRegexPatternSetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listResourcesForWebACL<T>(params: ListResourcesForWebACLInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRuleGroups<T>(params: ListRuleGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listWebACLs<T>(params: ListWebACLsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putLoggingConfiguration<T>(params: PutLoggingConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putManagedRuleSetVersions<T>(params: PutManagedRuleSetVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putPermissionPolicy<T>(params: PutPermissionPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateIPSet<T>(params: UpdateIPSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateManagedRuleSetVersionExpiryDate<T>(params: UpdateManagedRuleSetVersionExpiryDateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRegexPatternSet<T>(params: UpdateRegexPatternSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRuleGroup<T>(params: UpdateRuleGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateWebACL<T>(params: UpdateWebACLInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
