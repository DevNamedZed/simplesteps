// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface TagSpecification {
  /** The type of resource to tag on creation. */
  ResourceType?: 'capacity-reservation' | 'client-vpn-endpoint' | 'customer-gateway' | 'carrier-gateway' | 'coip-pool' | 'declarative-policies-report' | 'dedicated-host' | 'dhcp-options' | 'egress-only-internet-gateway' | 'elastic-ip' | 'elastic-gpu' | 'export-image-task' | 'export-instance-task' | 'fleet' | 'fpga-image' | 'host-reservation' | 'image' | 'image-usage-report' | 'import-image-task' | 'import-snapshot-task' | 'instance' | 'instance-event-window' | 'internet-gateway' | 'ipam' | 'ipam-pool' | 'ipam-scope' | 'ipv4pool-ec2' | 'ipv6pool-ec2' | 'key-pair' | 'launch-template' | 'local-gateway' | 'local-gateway-route-table' | 'local-gateway-virtual-interface' | 'local-gateway-virtual-interface-group' | 'local-gateway-route-table-vpc-association' | 'local-gateway-route-table-virtual-interface-group-association' | 'natgateway' | 'network-acl' | 'network-interface' | 'network-insights-analysis' | 'network-insights-path' | 'network-insights-access-scope' | 'network-insights-access-scope-analysis' | 'outpost-lag' | 'placement-group' | 'prefix-list' | 'replace-root-volume-task' | 'reserved-instances' | 'route-table' | 'security-group' | 'security-group-rule' | 'service-link-virtual-interface' | 'snapshot' | 'spot-fleet-request' | 'spot-instances-request' | 'subnet' | 'subnet-cidr-reservation' | 'traffic-mirror-filter' | 'traffic-mirror-session' | 'traffic-mirror-target' | 'transit-gateway' | 'transit-gateway-attachment' | 'transit-gateway-connect-peer' | 'transit-gateway-multicast-domain' | 'transit-gateway-policy-table' | 'transit-gateway-metering-policy' | 'transit-gateway-route-table' | 'transit-gateway-route-table-announcement' | 'volume' | 'vpc' | 'vpc-endpoint' | 'vpc-endpoint-connection' | 'vpc-endpoint-service' | 'vpc-endpoint-service-permission' | 'vpc-peering-connection' | 'vpn-connection' | 'vpn-gateway' | 'vpc-flow-log' | 'capacity-reservation-fleet' | 'traffic-mirror-filter-rule' | 'vpc-endpoint-connection-device-type' | 'verified-access-instance' | 'verified-access-group' | 'verified-access-endpoint' | 'verified-access-policy' | 'verified-access-trust-provider' | 'vpn-connection-device-type' | 'vpc-block-public-access-exclusion' | 'vpc-encryption-control' | 'route-server' | 'route-server-endpoint' | 'route-server-peer' | 'ipam-resource-discovery' | 'ipam-resource-discovery-association' | 'instance-connect-endpoint' | 'verified-access-endpoint-target' | 'ipam-external-resource-verification-token' | 'capacity-block' | 'mac-modification-task' | 'ipam-prefix-list-resolver' | 'ipam-policy' | 'ipam-prefix-list-resolver-target' | 'secondary-interface' | 'secondary-network' | 'secondary-subnet' | 'capacity-manager-data-export' | 'vpn-concentrator';
  /** The tags to apply to the resource. */
  Tags?: any[];
}

export interface TargetConfigurationRequest {
  /** The number of instances the Convertible Reserved Instance offering can be applied to. This parameter is reserved and cannot be specified in a request */
  InstanceCount?: number;
  /** The Convertible Reserved Instance offering ID. */
  OfferingId: string;
}

export interface IamInstanceProfileSpecification {
  /** The Amazon Resource Name (ARN) of the instance profile. */
  Arn?: string;
  /** The name of the instance profile. */
  Name?: string;
}

export interface InstanceEventWindowAssociationRequest {
  /** The IDs of the instances to associate with the event window. If the instance is on a Dedicated Host, you can't specify the Instance ID parameter; you must use the Dedicated Host ID parameter. */
  InstanceIds?: string[];
  /** The instance tags to associate with the event window. Any instances associated with the tags will be associated with the event window. Note that while you can't create tag keys beginning with aws:, yo */
  InstanceTags?: any[];
  /** The IDs of the Dedicated Hosts to associate with the event window. */
  DedicatedHostIds?: string[];
}

export interface EnaSrdUdpSpecification {
  /** Indicates whether UDP traffic to and from the instance uses ENA Express. To specify this setting, you must first enable ENA Express. */
  EnaSrdUdpEnabled?: boolean;
}

export interface EnaSrdSpecification {
  /** Indicates whether ENA Express is enabled for the network interface. */
  EnaSrdEnabled?: boolean;
  /** Configures ENA Express for UDP network traffic. */
  EnaSrdUdpSpecification?: EnaSrdUdpSpecification;
}

export interface IpPermission {
  /** The IP protocol name (tcp, udp, icmp, icmpv6) or number (see Protocol Numbers). Use -1 to specify all protocols. When authorizing security group rules, specifying -1 or a protocol number other than tc */
  IpProtocol?: string;
  /** If the protocol is TCP or UDP, this is the start of the port range. If the protocol is ICMP or ICMPv6, this is the ICMP type or -1 (all ICMP types). */
  FromPort?: number;
  /** If the protocol is TCP or UDP, this is the end of the port range. If the protocol is ICMP or ICMPv6, this is the ICMP code or -1 (all ICMP codes). If the start port is -1 (all ICMP types), then the en */
  ToPort?: number;
  /** The security group and Amazon Web Services account ID pairs. */
  UserIdGroupPairs?: any[];
  /** The IPv4 address ranges. */
  IpRanges?: any[];
  /** The IPv6 address ranges. */
  Ipv6Ranges?: any[];
  /** The prefix list IDs. */
  PrefixListIds?: any[];
}

export interface S3Storage {
  /** The access key ID of the owner of the bucket. Before you specify a value for your access key ID, review and follow the guidance in Best Practices for Amazon Web Services accounts in the Account Manage */
  AWSAccessKeyId?: string;
  /** The bucket in which to store the AMI. You can specify a bucket that you already own or a new bucket that Amazon EC2 creates on your behalf. If you specify a bucket that belongs to someone else, Amazon */
  Bucket?: string;
  /** The beginning of the file name of the AMI. */
  Prefix?: string;
  /** An Amazon S3 upload policy that gives Amazon EC2 permission to upload items into Amazon S3 on your behalf. */
  UploadPolicy?: string;
  /** The signature of the JSON document. */
  UploadPolicySignature?: string;
}

export interface Storage {
  /** An Amazon S3 storage location. */
  S3?: S3Storage;
}

export interface ReservationFleetInstanceSpecification {
  /** The instance type for which the Capacity Reservation Fleet reserves capacity. */
  InstanceType?: 'a1.medium' | 'a1.large' | 'a1.xlarge' | 'a1.2xlarge' | 'a1.4xlarge' | 'a1.metal' | 'c1.medium' | 'c1.xlarge' | 'c3.large' | 'c3.xlarge' | 'c3.2xlarge' | 'c3.4xlarge' | 'c3.8xlarge' | 'c4.large' | 'c4.xlarge' | 'c4.2xlarge' | 'c4.4xlarge' | 'c4.8xlarge' | 'c5.large' | 'c5.xlarge' | 'c5.2xlarge' | 'c5.4xlarge' | 'c5.9xlarge' | 'c5.12xlarge' | 'c5.18xlarge' | 'c5.24xlarge' | 'c5.metal' | 'c5a.large' | 'c5a.xlarge' | 'c5a.2xlarge' | 'c5a.4xlarge' | 'c5a.8xlarge' | 'c5a.12xlarge' | 'c5a.16xlarge' | 'c5a.24xlarge' | 'c5ad.large' | 'c5ad.xlarge' | 'c5ad.2xlarge' | 'c5ad.4xlarge' | 'c5ad.8xlarge' | 'c5ad.12xlarge' | 'c5ad.16xlarge' | 'c5ad.24xlarge' | 'c5d.large' | 'c5d.xlarge' | 'c5d.2xlarge' | 'c5d.4xlarge' | 'c5d.9xlarge' | 'c5d.12xlarge' | 'c5d.18xlarge' | 'c5d.24xlarge' | 'c5d.metal' | 'c5n.large' | 'c5n.xlarge' | 'c5n.2xlarge' | 'c5n.4xlarge' | 'c5n.9xlarge' | 'c5n.18xlarge' | 'c5n.metal' | 'c6g.medium' | 'c6g.large' | 'c6g.xlarge' | 'c6g.2xlarge' | 'c6g.4xlarge' | 'c6g.8xlarge' | 'c6g.12xlarge' | 'c6g.16xlarge' | 'c6g.metal' | 'c6gd.medium' | 'c6gd.large' | 'c6gd.xlarge' | 'c6gd.2xlarge' | 'c6gd.4xlarge' | 'c6gd.8xlarge' | 'c6gd.12xlarge' | 'c6gd.16xlarge' | 'c6gd.metal' | 'c6gn.medium' | 'c6gn.large' | 'c6gn.xlarge' | 'c6gn.2xlarge' | 'c6gn.4xlarge' | 'c6gn.8xlarge' | 'c6gn.12xlarge' | 'c6gn.16xlarge' | 'c6i.large' | 'c6i.xlarge' | 'c6i.2xlarge' | 'c6i.4xlarge' | 'c6i.8xlarge' | 'c6i.12xlarge' | 'c6i.16xlarge' | 'c6i.24xlarge' | 'c6i.32xlarge' | 'c6i.metal' | 'cc1.4xlarge' | 'cc2.8xlarge' | 'cg1.4xlarge' | 'cr1.8xlarge' | 'd2.xlarge' | 'd2.2xlarge' | 'd2.4xlarge' | 'd2.8xlarge' | 'd3.xlarge' | 'd3.2xlarge' | 'd3.4xlarge' | 'd3.8xlarge' | 'd3en.xlarge' | 'd3en.2xlarge' | 'd3en.4xlarge' | 'd3en.6xlarge' | 'd3en.8xlarge' | 'd3en.12xlarge' | 'dl1.24xlarge' | 'f1.2xlarge' | 'f1.4xlarge' | 'f1.16xlarge' | 'g2.2xlarge' | 'g2.8xlarge' | 'g3.4xlarge' | 'g3.8xlarge' | 'g3.16xlarge' | 'g3s.xlarge' | 'g4ad.xlarge' | 'g4ad.2xlarge' | 'g4ad.4xlarge' | 'g4ad.8xlarge' | 'g4ad.16xlarge' | 'g4dn.xlarge' | 'g4dn.2xlarge' | 'g4dn.4xlarge' | 'g4dn.8xlarge' | 'g4dn.12xlarge' | 'g4dn.16xlarge' | 'g4dn.metal' | 'g5.xlarge' | 'g5.2xlarge' | 'g5.4xlarge' | 'g5.8xlarge' | 'g5.12xlarge' | 'g5.16xlarge' | 'g5.24xlarge' | 'g5.48xlarge' | 'g5g.xlarge' | 'g5g.2xlarge' | 'g5g.4xlarge' | 'g5g.8xlarge' | 'g5g.16xlarge' | 'g5g.metal' | 'hi1.4xlarge' | 'hpc6a.48xlarge' | 'hs1.8xlarge' | 'h1.2xlarge' | 'h1.4xlarge' | 'h1.8xlarge' | 'h1.16xlarge' | 'i2.xlarge' | 'i2.2xlarge' | 'i2.4xlarge' | 'i2.8xlarge' | 'i3.large' | 'i3.xlarge' | 'i3.2xlarge' | 'i3.4xlarge' | 'i3.8xlarge' | 'i3.16xlarge' | 'i3.metal' | 'i3en.large' | 'i3en.xlarge' | 'i3en.2xlarge' | 'i3en.3xlarge' | 'i3en.6xlarge' | 'i3en.12xlarge' | 'i3en.24xlarge' | 'i3en.metal' | 'im4gn.large' | 'im4gn.xlarge' | 'im4gn.2xlarge' | 'im4gn.4xlarge' | 'im4gn.8xlarge' | 'im4gn.16xlarge' | 'inf1.xlarge' | 'inf1.2xlarge' | 'inf1.6xlarge' | 'inf1.24xlarge' | 'is4gen.medium' | 'is4gen.large' | 'is4gen.xlarge' | 'is4gen.2xlarge' | 'is4gen.4xlarge' | 'is4gen.8xlarge' | 'm1.small' | 'm1.medium' | 'm1.large' | 'm1.xlarge' | 'm2.xlarge' | 'm2.2xlarge' | 'm2.4xlarge' | 'm3.medium' | 'm3.large' | 'm3.xlarge' | 'm3.2xlarge' | 'm4.large' | 'm4.xlarge' | 'm4.2xlarge' | 'm4.4xlarge' | 'm4.10xlarge' | 'm4.16xlarge' | 'm5.large' | 'm5.xlarge' | 'm5.2xlarge' | 'm5.4xlarge' | 'm5.8xlarge' | 'm5.12xlarge' | 'm5.16xlarge' | 'm5.24xlarge' | 'm5.metal' | 'm5a.large' | 'm5a.xlarge' | 'm5a.2xlarge' | 'm5a.4xlarge' | 'm5a.8xlarge' | 'm5a.12xlarge' | 'm5a.16xlarge' | 'm5a.24xlarge' | 'm5ad.large' | 'm5ad.xlarge' | 'm5ad.2xlarge' | 'm5ad.4xlarge' | 'm5ad.8xlarge' | 'm5ad.12xlarge' | 'm5ad.16xlarge' | 'm5ad.24xlarge' | 'm5d.large' | 'm5d.xlarge' | 'm5d.2xlarge' | 'm5d.4xlarge' | 'm5d.8xlarge' | 'm5d.12xlarge' | 'm5d.16xlarge' | 'm5d.24xlarge' | 'm5d.metal' | 'm5dn.large' | 'm5dn.xlarge' | 'm5dn.2xlarge' | 'm5dn.4xlarge' | 'm5dn.8xlarge' | 'm5dn.12xlarge' | 'm5dn.16xlarge' | 'm5dn.24xlarge' | 'm5dn.metal' | 'm5n.large' | 'm5n.xlarge' | 'm5n.2xlarge' | 'm5n.4xlarge' | 'm5n.8xlarge' | 'm5n.12xlarge' | 'm5n.16xlarge' | 'm5n.24xlarge' | 'm5n.metal' | 'm5zn.large' | 'm5zn.xlarge' | 'm5zn.2xlarge' | 'm5zn.3xlarge' | 'm5zn.6xlarge' | 'm5zn.12xlarge' | 'm5zn.metal' | 'm6a.large' | 'm6a.xlarge' | 'm6a.2xlarge' | 'm6a.4xlarge' | 'm6a.8xlarge' | 'm6a.12xlarge' | 'm6a.16xlarge' | 'm6a.24xlarge' | 'm6a.32xlarge' | 'm6a.48xlarge' | 'm6g.metal' | 'm6g.medium' | 'm6g.large' | 'm6g.xlarge' | 'm6g.2xlarge' | 'm6g.4xlarge' | 'm6g.8xlarge' | 'm6g.12xlarge' | 'm6g.16xlarge' | 'm6gd.metal' | 'm6gd.medium' | 'm6gd.large' | 'm6gd.xlarge' | 'm6gd.2xlarge' | 'm6gd.4xlarge' | 'm6gd.8xlarge' | 'm6gd.12xlarge' | 'm6gd.16xlarge' | 'm6i.large' | 'm6i.xlarge' | 'm6i.2xlarge' | 'm6i.4xlarge' | 'm6i.8xlarge' | 'm6i.12xlarge' | 'm6i.16xlarge' | 'm6i.24xlarge' | 'm6i.32xlarge' | 'm6i.metal' | 'mac1.metal' | 'p2.xlarge' | 'p2.8xlarge' | 'p2.16xlarge' | 'p3.2xlarge' | 'p3.8xlarge' | 'p3.16xlarge' | 'p3dn.24xlarge' | 'p4d.24xlarge' | 'r3.large' | 'r3.xlarge' | 'r3.2xlarge' | 'r3.4xlarge' | 'r3.8xlarge' | 'r4.large' | 'r4.xlarge' | 'r4.2xlarge' | 'r4.4xlarge' | 'r4.8xlarge' | 'r4.16xlarge' | 'r5.large' | 'r5.xlarge' | 'r5.2xlarge' | 'r5.4xlarge' | 'r5.8xlarge' | 'r5.12xlarge' | 'r5.16xlarge' | 'r5.24xlarge' | 'r5.metal' | 'r5a.large' | 'r5a.xlarge' | 'r5a.2xlarge' | 'r5a.4xlarge' | 'r5a.8xlarge' | 'r5a.12xlarge' | 'r5a.16xlarge' | 'r5a.24xlarge' | 'r5ad.large' | 'r5ad.xlarge' | 'r5ad.2xlarge' | 'r5ad.4xlarge' | 'r5ad.8xlarge' | 'r5ad.12xlarge' | 'r5ad.16xlarge' | 'r5ad.24xlarge' | 'r5b.large' | 'r5b.xlarge' | 'r5b.2xlarge' | 'r5b.4xlarge' | 'r5b.8xlarge' | 'r5b.12xlarge' | 'r5b.16xlarge' | 'r5b.24xlarge' | 'r5b.metal' | 'r5d.large' | 'r5d.xlarge' | 'r5d.2xlarge' | 'r5d.4xlarge' | 'r5d.8xlarge' | 'r5d.12xlarge' | 'r5d.16xlarge' | 'r5d.24xlarge' | 'r5d.metal' | 'r5dn.large' | 'r5dn.xlarge' | 'r5dn.2xlarge' | 'r5dn.4xlarge' | 'r5dn.8xlarge' | 'r5dn.12xlarge' | 'r5dn.16xlarge' | 'r5dn.24xlarge' | 'r5dn.metal' | 'r5n.large' | 'r5n.xlarge' | 'r5n.2xlarge' | 'r5n.4xlarge' | 'r5n.8xlarge' | 'r5n.12xlarge' | 'r5n.16xlarge' | 'r5n.24xlarge' | 'r5n.metal' | 'r6g.medium' | 'r6g.large' | 'r6g.xlarge' | 'r6g.2xlarge' | 'r6g.4xlarge' | 'r6g.8xlarge' | 'r6g.12xlarge' | 'r6g.16xlarge' | 'r6g.metal' | 'r6gd.medium' | 'r6gd.large' | 'r6gd.xlarge' | 'r6gd.2xlarge' | 'r6gd.4xlarge' | 'r6gd.8xlarge' | 'r6gd.12xlarge' | 'r6gd.16xlarge' | 'r6gd.metal' | 'r6i.large' | 'r6i.xlarge' | 'r6i.2xlarge' | 'r6i.4xlarge' | 'r6i.8xlarge' | 'r6i.12xlarge' | 'r6i.16xlarge' | 'r6i.24xlarge' | 'r6i.32xlarge' | 'r6i.metal' | 't1.micro' | 't2.nano' | 't2.micro' | 't2.small' | 't2.medium' | 't2.large' | 't2.xlarge' | 't2.2xlarge' | 't3.nano' | 't3.micro' | 't3.small' | 't3.medium' | 't3.large' | 't3.xlarge' | 't3.2xlarge' | 't3a.nano' | 't3a.micro' | 't3a.small' | 't3a.medium' | 't3a.large' | 't3a.xlarge' | 't3a.2xlarge' | 't4g.nano' | 't4g.micro' | 't4g.small' | 't4g.medium' | 't4g.large' | 't4g.xlarge' | 't4g.2xlarge' | 'u-6tb1.56xlarge' | 'u-6tb1.112xlarge' | 'u-9tb1.112xlarge' | 'u-12tb1.112xlarge' | 'u-6tb1.metal' | 'u-9tb1.metal' | 'u-12tb1.metal' | 'u-18tb1.metal' | 'u-24tb1.metal' | 'vt1.3xlarge' | 'vt1.6xlarge' | 'vt1.24xlarge' | 'x1.16xlarge' | 'x1.32xlarge' | 'x1e.xlarge' | 'x1e.2xlarge' | 'x1e.4xlarge' | 'x1e.8xlarge' | 'x1e.16xlarge' | 'x1e.32xlarge' | 'x2iezn.2xlarge' | 'x2iezn.4xlarge' | 'x2iezn.6xlarge' | 'x2iezn.8xlarge' | 'x2iezn.12xlarge' | 'x2iezn.metal' | 'x2gd.medium' | 'x2gd.large' | 'x2gd.xlarge' | 'x2gd.2xlarge' | 'x2gd.4xlarge' | 'x2gd.8xlarge' | 'x2gd.12xlarge' | 'x2gd.16xlarge' | 'x2gd.metal' | 'z1d.large' | 'z1d.xlarge' | 'z1d.2xlarge' | 'z1d.3xlarge' | 'z1d.6xlarge' | 'z1d.12xlarge' | 'z1d.metal' | 'x2idn.16xlarge' | 'x2idn.24xlarge' | 'x2idn.32xlarge' | 'x2iedn.xlarge' | 'x2iedn.2xlarge' | 'x2iedn.4xlarge' | 'x2iedn.8xlarge' | 'x2iedn.16xlarge' | 'x2iedn.24xlarge' | 'x2iedn.32xlarge' | 'c6a.large' | 'c6a.xlarge' | 'c6a.2xlarge' | 'c6a.4xlarge' | 'c6a.8xlarge' | 'c6a.12xlarge' | 'c6a.16xlarge' | 'c6a.24xlarge' | 'c6a.32xlarge' | 'c6a.48xlarge' | 'c6a.metal' | 'm6a.metal' | 'i4i.large' | 'i4i.xlarge' | 'i4i.2xlarge' | 'i4i.4xlarge' | 'i4i.8xlarge' | 'i4i.16xlarge' | 'i4i.32xlarge' | 'i4i.metal' | 'x2idn.metal' | 'x2iedn.metal' | 'c7g.medium' | 'c7g.large' | 'c7g.xlarge' | 'c7g.2xlarge' | 'c7g.4xlarge' | 'c7g.8xlarge' | 'c7g.12xlarge' | 'c7g.16xlarge' | 'mac2.metal' | 'c6id.large' | 'c6id.xlarge' | 'c6id.2xlarge' | 'c6id.4xlarge' | 'c6id.8xlarge' | 'c6id.12xlarge' | 'c6id.16xlarge' | 'c6id.24xlarge' | 'c6id.32xlarge' | 'c6id.metal' | 'm6id.large' | 'm6id.xlarge' | 'm6id.2xlarge' | 'm6id.4xlarge' | 'm6id.8xlarge' | 'm6id.12xlarge' | 'm6id.16xlarge' | 'm6id.24xlarge' | 'm6id.32xlarge' | 'm6id.metal' | 'r6id.large' | 'r6id.xlarge' | 'r6id.2xlarge' | 'r6id.4xlarge' | 'r6id.8xlarge' | 'r6id.12xlarge' | 'r6id.16xlarge' | 'r6id.24xlarge' | 'r6id.32xlarge' | 'r6id.metal' | 'r6a.large' | 'r6a.xlarge' | 'r6a.2xlarge' | 'r6a.4xlarge' | 'r6a.8xlarge' | 'r6a.12xlarge' | 'r6a.16xlarge' | 'r6a.24xlarge' | 'r6a.32xlarge' | 'r6a.48xlarge' | 'r6a.metal' | 'p4de.24xlarge' | 'u-3tb1.56xlarge' | 'u-18tb1.112xlarge' | 'u-24tb1.112xlarge' | 'trn1.2xlarge' | 'trn1.32xlarge' | 'hpc6id.32xlarge' | 'c6in.large' | 'c6in.xlarge' | 'c6in.2xlarge' | 'c6in.4xlarge' | 'c6in.8xlarge' | 'c6in.12xlarge' | 'c6in.16xlarge' | 'c6in.24xlarge' | 'c6in.32xlarge' | 'm6in.large' | 'm6in.xlarge' | 'm6in.2xlarge' | 'm6in.4xlarge' | 'm6in.8xlarge' | 'm6in.12xlarge' | 'm6in.16xlarge' | 'm6in.24xlarge' | 'm6in.32xlarge' | 'm6idn.large' | 'm6idn.xlarge' | 'm6idn.2xlarge' | 'm6idn.4xlarge' | 'm6idn.8xlarge' | 'm6idn.12xlarge' | 'm6idn.16xlarge' | 'm6idn.24xlarge' | 'm6idn.32xlarge' | 'r6in.large' | 'r6in.xlarge' | 'r6in.2xlarge' | 'r6in.4xlarge' | 'r6in.8xlarge' | 'r6in.12xlarge' | 'r6in.16xlarge' | 'r6in.24xlarge' | 'r6in.32xlarge' | 'r6idn.large' | 'r6idn.xlarge' | 'r6idn.2xlarge' | 'r6idn.4xlarge' | 'r6idn.8xlarge' | 'r6idn.12xlarge' | 'r6idn.16xlarge' | 'r6idn.24xlarge' | 'r6idn.32xlarge' | 'c7g.metal' | 'm7g.medium' | 'm7g.large' | 'm7g.xlarge' | 'm7g.2xlarge' | 'm7g.4xlarge' | 'm7g.8xlarge' | 'm7g.12xlarge' | 'm7g.16xlarge' | 'm7g.metal' | 'r7g.medium' | 'r7g.large' | 'r7g.xlarge' | 'r7g.2xlarge' | 'r7g.4xlarge' | 'r7g.8xlarge' | 'r7g.12xlarge' | 'r7g.16xlarge' | 'r7g.metal' | 'c6in.metal' | 'm6in.metal' | 'm6idn.metal' | 'r6in.metal' | 'r6idn.metal' | 'inf2.xlarge' | 'inf2.8xlarge' | 'inf2.24xlarge' | 'inf2.48xlarge' | 'trn1n.32xlarge' | 'i4g.large' | 'i4g.xlarge' | 'i4g.2xlarge' | 'i4g.4xlarge' | 'i4g.8xlarge' | 'i4g.16xlarge' | 'hpc7g.4xlarge' | 'hpc7g.8xlarge' | 'hpc7g.16xlarge' | 'c7gn.medium' | 'c7gn.large' | 'c7gn.xlarge' | 'c7gn.2xlarge' | 'c7gn.4xlarge' | 'c7gn.8xlarge' | 'c7gn.12xlarge' | 'c7gn.16xlarge' | 'p5.48xlarge' | 'm7i.large' | 'm7i.xlarge' | 'm7i.2xlarge' | 'm7i.4xlarge' | 'm7i.8xlarge' | 'm7i.12xlarge' | 'm7i.16xlarge' | 'm7i.24xlarge' | 'm7i.48xlarge' | 'm7i-flex.large' | 'm7i-flex.xlarge' | 'm7i-flex.2xlarge' | 'm7i-flex.4xlarge' | 'm7i-flex.8xlarge' | 'm7a.medium' | 'm7a.large' | 'm7a.xlarge' | 'm7a.2xlarge' | 'm7a.4xlarge' | 'm7a.8xlarge' | 'm7a.12xlarge' | 'm7a.16xlarge' | 'm7a.24xlarge' | 'm7a.32xlarge' | 'm7a.48xlarge' | 'm7a.metal-48xl' | 'hpc7a.12xlarge' | 'hpc7a.24xlarge' | 'hpc7a.48xlarge' | 'hpc7a.96xlarge' | 'c7gd.medium' | 'c7gd.large' | 'c7gd.xlarge' | 'c7gd.2xlarge' | 'c7gd.4xlarge' | 'c7gd.8xlarge' | 'c7gd.12xlarge' | 'c7gd.16xlarge' | 'm7gd.medium' | 'm7gd.large' | 'm7gd.xlarge' | 'm7gd.2xlarge' | 'm7gd.4xlarge' | 'm7gd.8xlarge' | 'm7gd.12xlarge' | 'm7gd.16xlarge' | 'r7gd.medium' | 'r7gd.large' | 'r7gd.xlarge' | 'r7gd.2xlarge' | 'r7gd.4xlarge' | 'r7gd.8xlarge' | 'r7gd.12xlarge' | 'r7gd.16xlarge' | 'r7a.medium' | 'r7a.large' | 'r7a.xlarge' | 'r7a.2xlarge' | 'r7a.4xlarge' | 'r7a.8xlarge' | 'r7a.12xlarge' | 'r7a.16xlarge' | 'r7a.24xlarge' | 'r7a.32xlarge' | 'r7a.48xlarge' | 'c7i.large' | 'c7i.xlarge' | 'c7i.2xlarge' | 'c7i.4xlarge' | 'c7i.8xlarge' | 'c7i.12xlarge' | 'c7i.16xlarge' | 'c7i.24xlarge' | 'c7i.48xlarge' | 'mac2-m2pro.metal' | 'r7iz.large' | 'r7iz.xlarge' | 'r7iz.2xlarge' | 'r7iz.4xlarge' | 'r7iz.8xlarge' | 'r7iz.12xlarge' | 'r7iz.16xlarge' | 'r7iz.32xlarge' | 'c7a.medium' | 'c7a.large' | 'c7a.xlarge' | 'c7a.2xlarge' | 'c7a.4xlarge' | 'c7a.8xlarge' | 'c7a.12xlarge' | 'c7a.16xlarge' | 'c7a.24xlarge' | 'c7a.32xlarge' | 'c7a.48xlarge' | 'c7a.metal-48xl' | 'r7a.metal-48xl' | 'r7i.large' | 'r7i.xlarge' | 'r7i.2xlarge' | 'r7i.4xlarge' | 'r7i.8xlarge' | 'r7i.12xlarge' | 'r7i.16xlarge' | 'r7i.24xlarge' | 'r7i.48xlarge' | 'dl2q.24xlarge' | 'mac2-m2.metal' | 'i4i.12xlarge' | 'i4i.24xlarge' | 'c7i.metal-24xl' | 'c7i.metal-48xl' | 'm7i.metal-24xl' | 'm7i.metal-48xl' | 'r7i.metal-24xl' | 'r7i.metal-48xl' | 'r7iz.metal-16xl' | 'r7iz.metal-32xl' | 'c7gd.metal' | 'm7gd.metal' | 'r7gd.metal' | 'g6.xlarge' | 'g6.2xlarge' | 'g6.4xlarge' | 'g6.8xlarge' | 'g6.12xlarge' | 'g6.16xlarge' | 'g6.24xlarge' | 'g6.48xlarge' | 'gr6.4xlarge' | 'gr6.8xlarge' | 'c7i-flex.large' | 'c7i-flex.xlarge' | 'c7i-flex.2xlarge' | 'c7i-flex.4xlarge' | 'c7i-flex.8xlarge' | 'u7i-12tb.224xlarge' | 'u7in-16tb.224xlarge' | 'u7in-24tb.224xlarge' | 'u7in-32tb.224xlarge' | 'u7ib-12tb.224xlarge' | 'c7gn.metal' | 'r8g.medium' | 'r8g.large' | 'r8g.xlarge' | 'r8g.2xlarge' | 'r8g.4xlarge' | 'r8g.8xlarge' | 'r8g.12xlarge' | 'r8g.16xlarge' | 'r8g.24xlarge' | 'r8g.48xlarge' | 'r8g.metal-24xl' | 'r8g.metal-48xl' | 'mac2-m1ultra.metal' | 'g6e.xlarge' | 'g6e.2xlarge' | 'g6e.4xlarge' | 'g6e.8xlarge' | 'g6e.12xlarge' | 'g6e.16xlarge' | 'g6e.24xlarge' | 'g6e.48xlarge' | 'c8g.medium' | 'c8g.large' | 'c8g.xlarge' | 'c8g.2xlarge' | 'c8g.4xlarge' | 'c8g.8xlarge' | 'c8g.12xlarge' | 'c8g.16xlarge' | 'c8g.24xlarge' | 'c8g.48xlarge' | 'c8g.metal-24xl' | 'c8g.metal-48xl' | 'm8g.medium' | 'm8g.large' | 'm8g.xlarge' | 'm8g.2xlarge' | 'm8g.4xlarge' | 'm8g.8xlarge' | 'm8g.12xlarge' | 'm8g.16xlarge' | 'm8g.24xlarge' | 'm8g.48xlarge' | 'm8g.metal-24xl' | 'm8g.metal-48xl' | 'x8g.medium' | 'x8g.large' | 'x8g.xlarge' | 'x8g.2xlarge' | 'x8g.4xlarge' | 'x8g.8xlarge' | 'x8g.12xlarge' | 'x8g.16xlarge' | 'x8g.24xlarge' | 'x8g.48xlarge' | 'x8g.metal-24xl' | 'x8g.metal-48xl' | 'i7ie.large' | 'i7ie.xlarge' | 'i7ie.2xlarge' | 'i7ie.3xlarge' | 'i7ie.6xlarge' | 'i7ie.12xlarge' | 'i7ie.18xlarge' | 'i7ie.24xlarge' | 'i7ie.48xlarge' | 'i8g.large' | 'i8g.xlarge' | 'i8g.2xlarge' | 'i8g.4xlarge' | 'i8g.8xlarge' | 'i8g.12xlarge' | 'i8g.16xlarge' | 'i8g.24xlarge' | 'i8g.metal-24xl' | 'u7i-6tb.112xlarge' | 'u7i-8tb.112xlarge' | 'u7inh-32tb.480xlarge' | 'p5e.48xlarge' | 'p5en.48xlarge' | 'f2.12xlarge' | 'f2.48xlarge' | 'trn2.48xlarge' | 'c7i-flex.12xlarge' | 'c7i-flex.16xlarge' | 'm7i-flex.12xlarge' | 'm7i-flex.16xlarge' | 'i7ie.metal-24xl' | 'i7ie.metal-48xl' | 'i8g.48xlarge' | 'c8gd.medium' | 'c8gd.large' | 'c8gd.xlarge' | 'c8gd.2xlarge' | 'c8gd.4xlarge' | 'c8gd.8xlarge' | 'c8gd.12xlarge' | 'c8gd.16xlarge' | 'c8gd.24xlarge' | 'c8gd.48xlarge' | 'c8gd.metal-24xl' | 'c8gd.metal-48xl' | 'i7i.large' | 'i7i.xlarge' | 'i7i.2xlarge' | 'i7i.4xlarge' | 'i7i.8xlarge' | 'i7i.12xlarge' | 'i7i.16xlarge' | 'i7i.24xlarge' | 'i7i.48xlarge' | 'i7i.metal-24xl' | 'i7i.metal-48xl' | 'p6-b200.48xlarge' | 'm8gd.medium' | 'm8gd.large' | 'm8gd.xlarge' | 'm8gd.2xlarge' | 'm8gd.4xlarge' | 'm8gd.8xlarge' | 'm8gd.12xlarge' | 'm8gd.16xlarge' | 'm8gd.24xlarge' | 'm8gd.48xlarge' | 'm8gd.metal-24xl' | 'm8gd.metal-48xl' | 'r8gd.medium' | 'r8gd.large' | 'r8gd.xlarge' | 'r8gd.2xlarge' | 'r8gd.4xlarge' | 'r8gd.8xlarge' | 'r8gd.12xlarge' | 'r8gd.16xlarge' | 'r8gd.24xlarge' | 'r8gd.48xlarge' | 'r8gd.metal-24xl' | 'r8gd.metal-48xl' | 'c8gn.medium' | 'c8gn.large' | 'c8gn.xlarge' | 'c8gn.2xlarge' | 'c8gn.4xlarge' | 'c8gn.8xlarge' | 'c8gn.12xlarge' | 'c8gn.16xlarge' | 'c8gn.24xlarge' | 'c8gn.48xlarge' | 'c8gn.metal-24xl' | 'c8gn.metal-48xl' | 'f2.6xlarge' | 'p6e-gb200.36xlarge' | 'g6f.large' | 'g6f.xlarge' | 'g6f.2xlarge' | 'g6f.4xlarge' | 'gr6f.4xlarge' | 'p5.4xlarge' | 'r8i.large' | 'r8i.xlarge' | 'r8i.2xlarge' | 'r8i.4xlarge' | 'r8i.8xlarge' | 'r8i.12xlarge' | 'r8i.16xlarge' | 'r8i.24xlarge' | 'r8i.32xlarge' | 'r8i.48xlarge' | 'r8i.96xlarge' | 'r8i.metal-48xl' | 'r8i.metal-96xl' | 'r8i-flex.large' | 'r8i-flex.xlarge' | 'r8i-flex.2xlarge' | 'r8i-flex.4xlarge' | 'r8i-flex.8xlarge' | 'r8i-flex.12xlarge' | 'r8i-flex.16xlarge' | 'm8i.large' | 'm8i.xlarge' | 'm8i.2xlarge' | 'm8i.4xlarge' | 'm8i.8xlarge' | 'm8i.12xlarge' | 'm8i.16xlarge' | 'm8i.24xlarge' | 'm8i.32xlarge' | 'm8i.48xlarge' | 'm8i.96xlarge' | 'm8i.metal-48xl' | 'm8i.metal-96xl' | 'm8i-flex.large' | 'm8i-flex.xlarge' | 'm8i-flex.2xlarge' | 'm8i-flex.4xlarge' | 'm8i-flex.8xlarge' | 'm8i-flex.12xlarge' | 'm8i-flex.16xlarge' | 'i8ge.large' | 'i8ge.xlarge' | 'i8ge.2xlarge' | 'i8ge.3xlarge' | 'i8ge.6xlarge' | 'i8ge.12xlarge' | 'i8ge.18xlarge' | 'i8ge.24xlarge' | 'i8ge.48xlarge' | 'i8ge.metal-24xl' | 'i8ge.metal-48xl' | 'mac-m4.metal' | 'mac-m4pro.metal' | 'r8gn.medium' | 'r8gn.large' | 'r8gn.xlarge' | 'r8gn.2xlarge' | 'r8gn.4xlarge' | 'r8gn.8xlarge' | 'r8gn.12xlarge' | 'r8gn.16xlarge' | 'r8gn.24xlarge' | 'r8gn.48xlarge' | 'r8gn.metal-24xl' | 'r8gn.metal-48xl' | 'c8i.large' | 'c8i.xlarge' | 'c8i.2xlarge' | 'c8i.4xlarge' | 'c8i.8xlarge' | 'c8i.12xlarge' | 'c8i.16xlarge' | 'c8i.24xlarge' | 'c8i.32xlarge' | 'c8i.48xlarge' | 'c8i.96xlarge' | 'c8i.metal-48xl' | 'c8i.metal-96xl' | 'c8i-flex.large' | 'c8i-flex.xlarge' | 'c8i-flex.2xlarge' | 'c8i-flex.4xlarge' | 'c8i-flex.8xlarge' | 'c8i-flex.12xlarge' | 'c8i-flex.16xlarge' | 'r8gb.medium' | 'r8gb.large' | 'r8gb.xlarge' | 'r8gb.2xlarge' | 'r8gb.4xlarge' | 'r8gb.8xlarge' | 'r8gb.12xlarge' | 'r8gb.16xlarge' | 'r8gb.24xlarge' | 'r8gb.metal-24xl' | 'm8a.medium' | 'm8a.large' | 'm8a.xlarge' | 'm8a.2xlarge' | 'm8a.4xlarge' | 'm8a.8xlarge' | 'm8a.12xlarge' | 'm8a.16xlarge' | 'm8a.24xlarge' | 'm8a.48xlarge' | 'm8a.metal-24xl' | 'm8a.metal-48xl' | 'trn2.3xlarge' | 'r8a.medium' | 'r8a.large' | 'r8a.xlarge' | 'r8a.2xlarge' | 'r8a.4xlarge' | 'r8a.8xlarge' | 'r8a.12xlarge' | 'r8a.16xlarge' | 'r8a.24xlarge' | 'r8a.48xlarge' | 'r8a.metal-24xl' | 'r8a.metal-48xl' | 'p6-b300.48xlarge' | 'c8a.medium' | 'c8a.large' | 'c8a.xlarge' | 'c8a.2xlarge' | 'c8a.4xlarge' | 'c8a.8xlarge' | 'c8a.12xlarge' | 'c8a.16xlarge' | 'c8a.24xlarge' | 'c8a.48xlarge' | 'c8a.metal-24xl' | 'c8a.metal-48xl' | 'c8gb.12xlarge' | 'c8gb.16xlarge' | 'c8gb.24xlarge' | 'c8gb.2xlarge' | 'c8gb.4xlarge' | 'c8gb.8xlarge' | 'c8gb.large' | 'c8gb.medium' | 'c8gb.metal-24xl' | 'c8gb.xlarge' | 'c8gb.48xlarge' | 'c8gb.metal-48xl' | 'm8gb.12xlarge' | 'm8gb.16xlarge' | 'm8gb.24xlarge' | 'm8gb.2xlarge' | 'm8gb.4xlarge' | 'm8gb.8xlarge' | 'm8gb.large' | 'm8gb.medium' | 'm8gb.xlarge' | 'm8gb.48xlarge' | 'm8gb.metal-24xl' | 'm8gb.metal-48xl' | 'm8gn.12xlarge' | 'm8gn.16xlarge' | 'm8gn.24xlarge' | 'm8gn.2xlarge' | 'm8gn.48xlarge' | 'm8gn.4xlarge' | 'm8gn.8xlarge' | 'm8gn.large' | 'm8gn.medium' | 'm8gn.xlarge' | 'm8gn.metal-24xl' | 'm8gn.metal-48xl' | 'x8aedz.12xlarge' | 'x8aedz.24xlarge' | 'x8aedz.3xlarge' | 'x8aedz.6xlarge' | 'x8aedz.large' | 'x8aedz.metal-12xl' | 'x8aedz.metal-24xl' | 'x8aedz.xlarge' | 'm8azn.medium' | 'm8azn.large' | 'm8azn.xlarge' | 'm8azn.3xlarge' | 'm8azn.6xlarge' | 'm8azn.12xlarge' | 'm8azn.24xlarge' | 'm8azn.metal-12xl' | 'm8azn.metal-24xl' | 'x8i.large' | 'x8i.xlarge' | 'x8i.2xlarge' | 'x8i.4xlarge' | 'x8i.8xlarge' | 'x8i.12xlarge' | 'x8i.16xlarge' | 'x8i.24xlarge' | 'x8i.32xlarge' | 'x8i.48xlarge' | 'x8i.64xlarge' | 'x8i.96xlarge' | 'x8i.metal-48xl' | 'x8i.metal-96xl' | 'mac-m4max.metal' | 'g7e.2xlarge' | 'g7e.4xlarge' | 'g7e.8xlarge' | 'g7e.12xlarge' | 'g7e.24xlarge' | 'g7e.48xlarge' | 'r8id.large' | 'r8id.xlarge' | 'r8id.2xlarge' | 'r8id.4xlarge' | 'r8id.8xlarge' | 'r8id.12xlarge' | 'r8id.16xlarge' | 'r8id.24xlarge' | 'r8id.32xlarge' | 'r8id.48xlarge' | 'r8id.96xlarge' | 'r8id.metal-48xl' | 'r8id.metal-96xl';
  /** The type of operating system for which the Capacity Reservation Fleet reserves capacity. */
  InstancePlatform?: 'Linux/UNIX' | 'Red Hat Enterprise Linux' | 'SUSE Linux' | 'Windows' | 'Windows with SQL Server' | 'Windows with SQL Server Enterprise' | 'Windows with SQL Server Standard' | 'Windows with SQL Server Web' | 'Linux with SQL Server Standard' | 'Linux with SQL Server Web' | 'Linux with SQL Server Enterprise' | 'RHEL with SQL Server Standard' | 'RHEL with SQL Server Enterprise' | 'RHEL with SQL Server Web' | 'RHEL with HA' | 'RHEL with HA and SQL Server Standard' | 'RHEL with HA and SQL Server Enterprise' | 'Ubuntu Pro';
  /** The number of capacity units provided by the specified instance type. This value, together with the total target capacity that you specify for the Fleet determine the number of instances for which the */
  Weight?: number;
  /** The Availability Zone in which the Capacity Reservation Fleet reserves the capacity. A Capacity Reservation Fleet can't span Availability Zones. All instance type specifications that you specify for t */
  AvailabilityZone?: string;
  /** The ID of the Availability Zone in which the Capacity Reservation Fleet reserves the capacity. A Capacity Reservation Fleet can't span Availability Zones. All instance type specifications that you spe */
  AvailabilityZoneId?: string;
  /** Indicates whether the Capacity Reservation Fleet supports EBS-optimized instances types. This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide o */
  EbsOptimized?: boolean;
  /** The priority to assign to the instance type. This value is used to determine which of the instance types specified for the Fleet should be prioritized for use. A lower value indicates a high priority. */
  Priority?: number;
}

export interface ClientVpnAuthenticationRequest {
  /** The type of client authentication to be used. */
  Type?: 'certificate-authentication' | 'directory-service-authentication' | 'federated-authentication';
  /** Information about the Active Directory to be used, if applicable. You must provide this information if Type is directory-service-authentication. */
  ActiveDirectory?: any;
  /** Information about the authentication certificates to be used, if applicable. You must provide this information if Type is certificate-authentication. */
  MutualAuthentication?: any;
  /** Information about the IAM SAML identity provider to be used, if applicable. You must provide this information if Type is federated-authentication. */
  FederatedAuthentication?: any;
}

export interface ConnectionLogOptions {
  /** Indicates whether connection logging is enabled. */
  Enabled?: boolean;
  /** The name of the CloudWatch Logs log group. Required if connection logging is enabled. */
  CloudwatchLogGroup?: string;
  /** The name of the CloudWatch Logs log stream to which the connection data is published. */
  CloudwatchLogStream?: string;
}

export interface ClientConnectOptions {
  /** Indicates whether client connect options are enabled. The default is false (not enabled). */
  Enabled?: boolean;
  /** The Amazon Resource Name (ARN) of the Lambda function used for connection authorization. */
  LambdaFunctionArn?: string;
}

export interface ClientLoginBannerOptions {
  /** Enable or disable a customizable text banner that will be displayed on Amazon Web Services provided clients when a VPN session is established. Valid values: true | false Default value: false */
  Enabled?: boolean;
  /** Customizable text that will be displayed in a banner on Amazon Web Services provided clients when a VPN session is established. UTF-8 encoded characters only. Maximum of 1400 characters. */
  BannerText?: string;
}

export interface ClientRouteEnforcementOptions {
  /** Enable or disable Client Route Enforcement. The state can either be true (enabled) or false (disabled). The default is false. Valid values: true | false Default value: false */
  Enforced?: boolean;
}

export interface NewDhcpConfiguration {
  /** The name of a DHCP option. */
  Key?: string;
  /** The values for the DHCP option. */
  Values?: any[];
}

export interface FleetSpotMaintenanceStrategiesRequest {
  /** The strategy to use when Amazon EC2 emits a signal that your Spot Instance is at an elevated risk of being interrupted. */
  CapacityRebalance?: any;
}

export interface SpotOptionsRequest {
  /** The strategy that determines how to allocate the target Spot Instance capacity across the Spot Instance pools specified by the EC2 Fleet launch configuration. For more information, see Allocation stra */
  AllocationStrategy?: 'lowest-price' | 'diversified' | 'capacity-optimized' | 'capacity-optimized-prioritized' | 'price-capacity-optimized';
  /** The strategies for managing your Spot Instances that are at an elevated risk of being interrupted. */
  MaintenanceStrategies?: FleetSpotMaintenanceStrategiesRequest;
  /** The behavior when a Spot Instance is interrupted. Default: terminate */
  InstanceInterruptionBehavior?: 'hibernate' | 'stop' | 'terminate';
  /** The number of Spot pools across which to allocate your target Spot capacity. Supported only when Spot AllocationStrategy is set to lowest-price. EC2 Fleet selects the cheapest Spot pools and evenly al */
  InstancePoolsToUseCount?: number;
  /** Indicates that the fleet uses a single instance type to launch all Spot Instances in the fleet. Supported only for fleets of type instant. */
  SingleInstanceType?: boolean;
  /** Indicates that the fleet launches all Spot Instances into a single Availability Zone. Supported only for fleets of type instant. */
  SingleAvailabilityZone?: boolean;
  /** The minimum target capacity for Spot Instances in the fleet. If this minimum capacity isn't reached, no instances are launched. Constraints: Maximum value of 1000. Supported only for fleets of type in */
  MinTargetCapacity?: number;
  /** The maximum amount per hour for Spot Instances that you're willing to pay. We do not recommend using this parameter because it can lead to increased interruptions. If you do not specify this parameter */
  MaxTotalPrice?: string;
}

export interface CapacityReservationOptionsRequest {
  /** Indicates whether to use unused Capacity Reservations for fulfilling On-Demand capacity. If you specify use-capacity-reservations-first, the fleet uses unused Capacity Reservations to fulfill On-Deman */
  UsageStrategy?: 'use-capacity-reservations-first';
}

export interface OnDemandOptionsRequest {
  /** The strategy that determines the order of the launch template overrides to use in fulfilling On-Demand capacity. lowest-price - EC2 Fleet uses price to determine the order, launching the lowest price  */
  AllocationStrategy?: 'lowest-price' | 'prioritized';
  /** The strategy for using unused Capacity Reservations for fulfilling On-Demand capacity. Supported only for fleets of type instant. */
  CapacityReservationOptions?: CapacityReservationOptionsRequest;
  /** Indicates that the fleet uses a single instance type to launch all On-Demand Instances in the fleet. Supported only for fleets of type instant. */
  SingleInstanceType?: boolean;
  /** Indicates that the fleet launches all On-Demand Instances into a single Availability Zone. Supported only for fleets of type instant. */
  SingleAvailabilityZone?: boolean;
  /** The minimum target capacity for On-Demand Instances in the fleet. If this minimum capacity isn't reached, no instances are launched. Constraints: Maximum value of 1000. Supported only for fleets of ty */
  MinTargetCapacity?: number;
  /** The maximum amount per hour for On-Demand Instances that you're willing to pay. If your fleet includes T instances that are configured as unlimited, and if their average CPU usage exceeds the baseline */
  MaxTotalPrice?: string;
}

export interface FleetLaunchTemplateConfigRequest {
  /** The launch template to use. You must specify either the launch template ID or launch template name in the request. */
  LaunchTemplateSpecification?: any;
  /** Any parameters that you specify override the same parameters in the launch template. For fleets of type request and maintain, a maximum of 300 items is allowed across all launch templates. */
  Overrides?: any[];
}

export interface TargetCapacitySpecificationRequest {
  /** The number of units to request, filled using the default target capacity type. */
  TotalTargetCapacity: number;
  /** The number of On-Demand units to request. */
  OnDemandTargetCapacity?: number;
  /** The number of Spot units to request. */
  SpotTargetCapacity?: number;
  /** The default target capacity type. */
  DefaultTargetCapacityType?: 'spot' | 'on-demand' | 'capacity-block';
  /** The unit for the target capacity. You can specify this parameter only when using attributed-based instance type selection. Default: units (the number of instances) */
  TargetCapacityUnitType?: 'vcpu' | 'memory-mib' | 'units';
}

export interface DestinationOptionsRequest {
  /** The format for the flow log. The default is plain-text. */
  FileFormat?: 'plain-text' | 'parquet';
  /** Indicates whether to use Hive-compatible prefixes for flow logs stored in Amazon S3. The default is false. */
  HiveCompatiblePartitions?: boolean;
  /** Indicates whether to partition the flow log per hour. This reduces the cost and response time for queries. The default is false. */
  PerHourPartition?: boolean;
}

export interface StorageLocation {
  /** The name of the S3 bucket. */
  Bucket?: string;
  /** The key. */
  Key?: string;
}

export interface BlockDeviceMapping {
  /** Parameters used to automatically set up EBS volumes when the instance is launched. */
  Ebs?: any;
  /** To omit the device from the block device mapping, specify an empty string. When this property is specified, the device is removed from the block device mapping regardless of the assigned value. */
  NoDevice?: string;
  /** The device name. For available device names, see Device names for volumes. */
  DeviceName?: string;
  /** The virtual device name (ephemeralN). Instance store volumes are numbered starting from 0. An instance type with 2 available instance store volumes can specify mappings for ephemeral0 and ephemeral1.  */
  VirtualName?: string;
}

export interface ImageUsageResourceTypeRequest {
  /** The resource type. Valid values: ec2:Instance | ec2:LaunchTemplate */
  ResourceType?: string;
  /** The options that affect the scope of the report. Valid only when ResourceType is ec2:LaunchTemplate. */
  ResourceTypeOptions?: any[];
}

export interface InstanceEventWindowTimeRangeRequest {
  /** The day on which the time range begins. */
  StartWeekDay?: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  /** The hour when the time range begins. */
  StartHour?: number;
  /** The day on which the time range ends. */
  EndWeekDay?: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  /** The hour when the time range ends. */
  EndHour?: number;
}

export interface ExportToS3TaskSpecification {
  /** The format for the exported image. */
  DiskImageFormat?: 'VMDK' | 'RAW' | 'VHD';
  /** The container format used to combine disk images with metadata (such as OVF). If absent, only the disk image is exported. */
  ContainerFormat?: 'ova';
  /** The Amazon S3 bucket for the destination image. The destination bucket must exist and have an access control list (ACL) attached that specifies the Region-specific canonical account ID for the Grantee */
  S3Bucket?: string;
  /** The image is written to a single object in the Amazon S3 bucket at the S3 key s3prefix + exportTaskId + '.' + diskImageFormat. */
  S3Prefix?: string;
}

export interface AddIpamOperatingRegion {
  /** The name of the operating Region. */
  RegionName?: string;
}

export interface RequestIpamResourceTag {
  /** The key of a tag assigned to the resource. Use this filter to find all resources assigned a tag with a specific key, regardless of the tag value. */
  Key?: string;
  /** The value for the tag. */
  Value?: string;
}

export interface IpamPoolSourceResourceRequest {
  /** The source resource ID. */
  ResourceId?: string;
  /** The source resource type. */
  ResourceType?: 'vpc';
  /** The source resource Region. */
  ResourceRegion?: string;
  /** The source resource owner. */
  ResourceOwner?: string;
}

export interface IpamPrefixListResolverRuleRequest {
  /** The type of CIDR selection rule. Valid values include include for selecting CIDRs that match the conditions, and exclude for excluding CIDRs that match the conditions. */
  RuleType: 'static-cidr' | 'ipam-resource-cidr' | 'ipam-pool-cidr';
  /** A fixed list of CIDRs that do not change (like a manual list replicated across Regions). */
  StaticCidr?: string;
  /** The ID of the IPAM scope from which to select CIDRs. This determines whether to select from public or private IP address space. */
  IpamScopeId?: string;
  /** For rules of type ipam-resource-cidr, this is the resource type. */
  ResourceType?: 'vpc' | 'subnet' | 'eip' | 'public-ipv4-pool' | 'ipv6-pool' | 'eni' | 'anycast-ip-list';
  /** The conditions that determine which CIDRs are selected by this rule. Conditions specify criteria such as resource type, tags, account IDs, and Regions. */
  Conditions?: any[];
}

export interface ExternalAuthorityConfiguration {
  /** The type of external authority. */
  Type?: 'infoblox';
  /** The identifier for the external resource managing this scope. For Infoblox integrations, this is the Infoblox resource identifier in the format .identity.account... */
  ExternalResourceIdentifier?: string;
}

export interface LaunchTemplateIamInstanceProfileSpecificationRequest {
  /** The Amazon Resource Name (ARN) of the instance profile. */
  Arn?: string;
  /** The name of the instance profile. */
  Name?: string;
}

export interface LaunchTemplatesMonitoringRequest {
  /** Specify true to enable detailed monitoring. Otherwise, basic monitoring is enabled. */
  Enabled?: boolean;
}

export interface LaunchTemplatePlacementRequest {
  /** The Availability Zone for the instance. Either AvailabilityZone or AvailabilityZoneId can be specified, but not both */
  AvailabilityZone?: string;
  /** The ID of the Availability Zone for the instance. Either AvailabilityZone or AvailabilityZoneId can be specified, but not both */
  AvailabilityZoneId?: string;
  /** The affinity setting for an instance on a Dedicated Host. */
  Affinity?: string;
  /** The name of the placement group for the instance. */
  GroupName?: string;
  /** The ID of the Dedicated Host for the instance. */
  HostId?: string;
  /** The tenancy of the instance. An instance with a tenancy of dedicated runs on single-tenant hardware. */
  Tenancy?: 'default' | 'dedicated' | 'host';
  /** Reserved for future use. */
  SpreadDomain?: string;
  /** The ARN of the host resource group in which to launch the instances. If you specify a host resource group ARN, omit the Tenancy parameter or set it to host. */
  HostResourceGroupArn?: string;
  /** The number of the partition the instance should launch in. Valid only if the placement group strategy is set to partition. */
  PartitionNumber?: number;
  /** The Group Id of a placement group. You must specify the Placement Group Group Id to launch an instance in a shared placement group. */
  GroupId?: string;
}

export interface LaunchTemplateInstanceMarketOptionsRequest {
  /** The market type. */
  MarketType?: 'spot' | 'capacity-block' | 'interruptible-capacity-reservation';
  /** The options for Spot Instances. */
  SpotOptions?: any;
}

export interface CreditSpecificationRequest {
  /** The credit option for CPU usage of a T instance. Valid values: standard | unlimited */
  CpuCredits: string;
}

export interface LaunchTemplateCpuOptionsRequest {
  /** The number of CPU cores for the instance. */
  CoreCount?: number;
  /** The number of threads per CPU core. To disable multithreading for the instance, specify a value of 1. Otherwise, specify the default value of 2. */
  ThreadsPerCore?: number;
  /** Indicates whether to enable the instance for AMD SEV-SNP. AMD SEV-SNP is supported with M6a, R6a, and C6a instance types only. For more information, see AMD SEV-SNP for Amazon EC2 instances. */
  AmdSevSnp?: 'enabled' | 'disabled';
  /** Indicates whether to enable the instance for nested virtualization. Nested virtualization is supported only on 8th generation Intel-based instance types (c8i, m8i, r8i, and their flex variants). When  */
  NestedVirtualization?: 'enabled' | 'disabled';
}

export interface LaunchTemplateCapacityReservationSpecificationRequest {
  /** Indicates the instance's Capacity Reservation preferences. Possible preferences include: capacity-reservations-only - The instance will only run in a Capacity Reservation or Capacity Reservation group */
  CapacityReservationPreference?: 'capacity-reservations-only' | 'open' | 'none';
  /** Information about the target Capacity Reservation or Capacity Reservation group. */
  CapacityReservationTarget?: any;
}

export interface LaunchTemplateHibernationOptionsRequest {
  /** If you set this parameter to true, the instance is enabled for hibernation. Default: false */
  Configured?: boolean;
}

export interface LaunchTemplateInstanceMetadataOptionsRequest {
  /** Indicates whether IMDSv2 is required. optional - IMDSv2 is optional. You can choose whether to send a session token in your instance metadata retrieval requests. If you retrieve IAM role credentials w */
  HttpTokens?: 'optional' | 'required';
  /** The desired HTTP PUT response hop limit for instance metadata requests. The larger the number, the further instance metadata requests can travel. Default: 1 Possible values: Integers from 1 to 64 */
  HttpPutResponseHopLimit?: number;
  /** Enables or disables the HTTP metadata endpoint on your instances. If the parameter is not specified, the default state is enabled. If you specify a value of disabled, you will not be able to access yo */
  HttpEndpoint?: 'disabled' | 'enabled';
  /** Enables or disables the IPv6 endpoint for the instance metadata service. Default: disabled */
  HttpProtocolIpv6?: 'disabled' | 'enabled';
  /** Set to enabled to allow access to instance tags from the instance metadata. Set to disabled to turn off access to instance tags from the instance metadata. For more information, see View tags for your */
  InstanceMetadataTags?: 'disabled' | 'enabled';
}

export interface LaunchTemplateEnclaveOptionsRequest {
  /** To enable the instance for Amazon Web Services Nitro Enclaves, set this parameter to true. */
  Enabled?: boolean;
}

export interface InstanceRequirementsRequest {
  /** The minimum and maximum number of vCPUs. */
  VCpuCount: any;
  /** The minimum and maximum amount of memory, in MiB. */
  MemoryMiB: any;
  /** The CPU manufacturers to include. For instance types with Intel CPUs, specify intel. For instance types with AMD CPUs, specify amd. For instance types with Amazon Web Services CPUs, specify amazon-web */
  CpuManufacturers?: any[];
  /** The minimum and maximum amount of memory per vCPU, in GiB. Default: No minimum or maximum limits */
  MemoryGiBPerVCpu?: any;
  /** The instance types to exclude. You can use strings with one or more wild cards, represented by an asterisk (*), to exclude an instance family, type, size, or generation. The following are examples: m5 */
  ExcludedInstanceTypes?: any[];
  /** Indicates whether current or previous generation instance types are included. The current generation instance types are recommended for use. Current generation instance types are typically the latest  */
  InstanceGenerations?: any[];
  /** [Price protection] The price protection threshold for Spot Instances, as a percentage higher than an identified Spot price. The identified Spot price is the Spot price of the lowest priced current gen */
  SpotMaxPricePercentageOverLowestPrice?: number;
  /** [Price protection] The price protection threshold for On-Demand Instances, as a percentage higher than an identified On-Demand price. The identified On-Demand price is the price of the lowest priced c */
  OnDemandMaxPricePercentageOverLowestPrice?: number;
  /** Indicates whether bare metal instance types must be included, excluded, or required. To include bare metal instance types, specify included. To require only bare metal instance types, specify required */
  BareMetal?: 'included' | 'required' | 'excluded';
  /** Indicates whether burstable performance T instance types are included, excluded, or required. For more information, see Burstable performance instances. To include burstable performance instance types */
  BurstablePerformance?: 'included' | 'required' | 'excluded';
  /** Indicates whether instance types must support hibernation for On-Demand Instances. This parameter is not supported for GetSpotPlacementScores. Default: false */
  RequireHibernateSupport?: boolean;
  /** The minimum and maximum number of network interfaces. Default: No minimum or maximum limits */
  NetworkInterfaceCount?: any;
  /** Indicates whether instance types with instance store volumes are included, excluded, or required. For more information, Amazon EC2 instance store in the Amazon EC2 User Guide. To include instance type */
  LocalStorage?: 'included' | 'required' | 'excluded';
  /** The type of local storage that is required. For instance types with hard disk drive (HDD) storage, specify hdd. For instance types with solid state drive (SSD) storage, specify ssd. Default: hdd and s */
  LocalStorageTypes?: any[];
  /** The minimum and maximum amount of total local storage, in GB. Default: No minimum or maximum limits */
  TotalLocalStorageGB?: any;
  /** The minimum and maximum baseline bandwidth to Amazon EBS, in Mbps. For more information, see Amazon EBS–optimized instances in the Amazon EC2 User Guide. Default: No minimum or maximum limits */
  BaselineEbsBandwidthMbps?: any;
  /** The accelerator types that must be on the instance type. For instance types with FPGA accelerators, specify fpga. For instance types with GPU accelerators, specify gpu. For instance types with Inferen */
  AcceleratorTypes?: any[];
  /** The minimum and maximum number of accelerators (GPUs, FPGAs, or Amazon Web Services Inferentia chips) on an instance. To exclude accelerator-enabled instance types, set Max to 0. Default: No minimum o */
  AcceleratorCount?: any;
  /** Indicates whether instance types must have accelerators by specific manufacturers. For instance types with Amazon Web Services devices, specify amazon-web-services. For instance types with AMD devices */
  AcceleratorManufacturers?: any[];
  /** The accelerators that must be on the instance type. For instance types with NVIDIA A10G GPUs, specify a10g. For instance types with NVIDIA A100 GPUs, specify a100. For instance types with NVIDIA H100  */
  AcceleratorNames?: any[];
  /** The minimum and maximum amount of total accelerator memory, in MiB. Default: No minimum or maximum limits */
  AcceleratorTotalMemoryMiB?: any;
  /** The minimum and maximum amount of baseline network bandwidth, in gigabits per second (Gbps). For more information, see Amazon EC2 instance network bandwidth in the Amazon EC2 User Guide. Default: No m */
  NetworkBandwidthGbps?: any;
  /** The instance types to apply your specified attributes against. All other instance types are ignored, even if they match your specified attributes. You can use strings with one or more wild cards, repr */
  AllowedInstanceTypes?: any[];
  /** [Price protection] The price protection threshold for Spot Instances, as a percentage of an identified On-Demand price. The identified On-Demand price is the price of the lowest priced current generat */
  MaxSpotPriceAsPercentageOfOptimalOnDemandPrice?: number;
  /** The baseline performance to consider, using an instance family as a baseline reference. The instance family establishes the lowest acceptable level of performance. Amazon EC2 uses this baseline to gui */
  BaselinePerformanceFactors?: any;
  /** Specifies whether instance types must support encrypting in-transit traffic between instances. For more information, including the supported instance types, see Encryption in transit in the Amazon EC2 */
  RequireEncryptionInTransit?: boolean;
}

export interface LaunchTemplatePrivateDnsNameOptionsRequest {
  /** The type of hostname for Amazon EC2 instances. For IPv4 only subnets, an instance DNS name must be based on the instance IPv4 address. For IPv6 native subnets, an instance DNS name must be based on th */
  HostnameType?: 'ip-name' | 'resource-name';
  /** Indicates whether to respond to DNS queries for instance hostnames with DNS A records. */
  EnableResourceNameDnsARecord?: boolean;
  /** Indicates whether to respond to DNS queries for instance hostnames with DNS AAAA records. */
  EnableResourceNameDnsAAAARecord?: boolean;
}

export interface LaunchTemplateInstanceMaintenanceOptionsRequest {
  /** Disables the automatic recovery behavior of your instance or sets it to default. For more information, see Simplified automatic recovery. */
  AutoRecovery?: 'default' | 'disabled';
}

export interface OperatorRequest {
  /** The service provider that manages the resource. */
  Principal?: string;
}

export interface LaunchTemplateNetworkPerformanceOptionsRequest {
  /** Specify the bandwidth weighting option to boost the associated type of baseline bandwidth, as follows: default This option uses the standard bandwidth configuration for your instance type. vpc-1 This  */
  BandwidthWeighting?: 'default' | 'vpc-1' | 'ebs-1';
}

export interface RequestLaunchTemplateData {
  /** The ID of the kernel. We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see User provided kernels in the Amazon Linux 2 User Guide. */
  KernelId?: string;
  /** Indicates whether the instance is optimized for Amazon EBS I/O. This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide optimal Amazon EBS I/O per */
  EbsOptimized?: boolean;
  /** The name or Amazon Resource Name (ARN) of an IAM instance profile. */
  IamInstanceProfile?: LaunchTemplateIamInstanceProfileSpecificationRequest;
  /** The block device mapping. */
  BlockDeviceMappings?: any[];
  /** The network interfaces for the instance. */
  NetworkInterfaces?: any[];
  /** The ID of the AMI in the format ami-0ac394d6a3example. Alternatively, you can specify a Systems Manager parameter, using one of the following formats. The Systems Manager parameter will resolve to an  */
  ImageId?: string;
  /** The instance type. For more information, see Amazon EC2 instance types in the Amazon EC2 User Guide. If you specify InstanceType, you can't specify InstanceRequirements. */
  InstanceType?: 'a1.medium' | 'a1.large' | 'a1.xlarge' | 'a1.2xlarge' | 'a1.4xlarge' | 'a1.metal' | 'c1.medium' | 'c1.xlarge' | 'c3.large' | 'c3.xlarge' | 'c3.2xlarge' | 'c3.4xlarge' | 'c3.8xlarge' | 'c4.large' | 'c4.xlarge' | 'c4.2xlarge' | 'c4.4xlarge' | 'c4.8xlarge' | 'c5.large' | 'c5.xlarge' | 'c5.2xlarge' | 'c5.4xlarge' | 'c5.9xlarge' | 'c5.12xlarge' | 'c5.18xlarge' | 'c5.24xlarge' | 'c5.metal' | 'c5a.large' | 'c5a.xlarge' | 'c5a.2xlarge' | 'c5a.4xlarge' | 'c5a.8xlarge' | 'c5a.12xlarge' | 'c5a.16xlarge' | 'c5a.24xlarge' | 'c5ad.large' | 'c5ad.xlarge' | 'c5ad.2xlarge' | 'c5ad.4xlarge' | 'c5ad.8xlarge' | 'c5ad.12xlarge' | 'c5ad.16xlarge' | 'c5ad.24xlarge' | 'c5d.large' | 'c5d.xlarge' | 'c5d.2xlarge' | 'c5d.4xlarge' | 'c5d.9xlarge' | 'c5d.12xlarge' | 'c5d.18xlarge' | 'c5d.24xlarge' | 'c5d.metal' | 'c5n.large' | 'c5n.xlarge' | 'c5n.2xlarge' | 'c5n.4xlarge' | 'c5n.9xlarge' | 'c5n.18xlarge' | 'c5n.metal' | 'c6g.medium' | 'c6g.large' | 'c6g.xlarge' | 'c6g.2xlarge' | 'c6g.4xlarge' | 'c6g.8xlarge' | 'c6g.12xlarge' | 'c6g.16xlarge' | 'c6g.metal' | 'c6gd.medium' | 'c6gd.large' | 'c6gd.xlarge' | 'c6gd.2xlarge' | 'c6gd.4xlarge' | 'c6gd.8xlarge' | 'c6gd.12xlarge' | 'c6gd.16xlarge' | 'c6gd.metal' | 'c6gn.medium' | 'c6gn.large' | 'c6gn.xlarge' | 'c6gn.2xlarge' | 'c6gn.4xlarge' | 'c6gn.8xlarge' | 'c6gn.12xlarge' | 'c6gn.16xlarge' | 'c6i.large' | 'c6i.xlarge' | 'c6i.2xlarge' | 'c6i.4xlarge' | 'c6i.8xlarge' | 'c6i.12xlarge' | 'c6i.16xlarge' | 'c6i.24xlarge' | 'c6i.32xlarge' | 'c6i.metal' | 'cc1.4xlarge' | 'cc2.8xlarge' | 'cg1.4xlarge' | 'cr1.8xlarge' | 'd2.xlarge' | 'd2.2xlarge' | 'd2.4xlarge' | 'd2.8xlarge' | 'd3.xlarge' | 'd3.2xlarge' | 'd3.4xlarge' | 'd3.8xlarge' | 'd3en.xlarge' | 'd3en.2xlarge' | 'd3en.4xlarge' | 'd3en.6xlarge' | 'd3en.8xlarge' | 'd3en.12xlarge' | 'dl1.24xlarge' | 'f1.2xlarge' | 'f1.4xlarge' | 'f1.16xlarge' | 'g2.2xlarge' | 'g2.8xlarge' | 'g3.4xlarge' | 'g3.8xlarge' | 'g3.16xlarge' | 'g3s.xlarge' | 'g4ad.xlarge' | 'g4ad.2xlarge' | 'g4ad.4xlarge' | 'g4ad.8xlarge' | 'g4ad.16xlarge' | 'g4dn.xlarge' | 'g4dn.2xlarge' | 'g4dn.4xlarge' | 'g4dn.8xlarge' | 'g4dn.12xlarge' | 'g4dn.16xlarge' | 'g4dn.metal' | 'g5.xlarge' | 'g5.2xlarge' | 'g5.4xlarge' | 'g5.8xlarge' | 'g5.12xlarge' | 'g5.16xlarge' | 'g5.24xlarge' | 'g5.48xlarge' | 'g5g.xlarge' | 'g5g.2xlarge' | 'g5g.4xlarge' | 'g5g.8xlarge' | 'g5g.16xlarge' | 'g5g.metal' | 'hi1.4xlarge' | 'hpc6a.48xlarge' | 'hs1.8xlarge' | 'h1.2xlarge' | 'h1.4xlarge' | 'h1.8xlarge' | 'h1.16xlarge' | 'i2.xlarge' | 'i2.2xlarge' | 'i2.4xlarge' | 'i2.8xlarge' | 'i3.large' | 'i3.xlarge' | 'i3.2xlarge' | 'i3.4xlarge' | 'i3.8xlarge' | 'i3.16xlarge' | 'i3.metal' | 'i3en.large' | 'i3en.xlarge' | 'i3en.2xlarge' | 'i3en.3xlarge' | 'i3en.6xlarge' | 'i3en.12xlarge' | 'i3en.24xlarge' | 'i3en.metal' | 'im4gn.large' | 'im4gn.xlarge' | 'im4gn.2xlarge' | 'im4gn.4xlarge' | 'im4gn.8xlarge' | 'im4gn.16xlarge' | 'inf1.xlarge' | 'inf1.2xlarge' | 'inf1.6xlarge' | 'inf1.24xlarge' | 'is4gen.medium' | 'is4gen.large' | 'is4gen.xlarge' | 'is4gen.2xlarge' | 'is4gen.4xlarge' | 'is4gen.8xlarge' | 'm1.small' | 'm1.medium' | 'm1.large' | 'm1.xlarge' | 'm2.xlarge' | 'm2.2xlarge' | 'm2.4xlarge' | 'm3.medium' | 'm3.large' | 'm3.xlarge' | 'm3.2xlarge' | 'm4.large' | 'm4.xlarge' | 'm4.2xlarge' | 'm4.4xlarge' | 'm4.10xlarge' | 'm4.16xlarge' | 'm5.large' | 'm5.xlarge' | 'm5.2xlarge' | 'm5.4xlarge' | 'm5.8xlarge' | 'm5.12xlarge' | 'm5.16xlarge' | 'm5.24xlarge' | 'm5.metal' | 'm5a.large' | 'm5a.xlarge' | 'm5a.2xlarge' | 'm5a.4xlarge' | 'm5a.8xlarge' | 'm5a.12xlarge' | 'm5a.16xlarge' | 'm5a.24xlarge' | 'm5ad.large' | 'm5ad.xlarge' | 'm5ad.2xlarge' | 'm5ad.4xlarge' | 'm5ad.8xlarge' | 'm5ad.12xlarge' | 'm5ad.16xlarge' | 'm5ad.24xlarge' | 'm5d.large' | 'm5d.xlarge' | 'm5d.2xlarge' | 'm5d.4xlarge' | 'm5d.8xlarge' | 'm5d.12xlarge' | 'm5d.16xlarge' | 'm5d.24xlarge' | 'm5d.metal' | 'm5dn.large' | 'm5dn.xlarge' | 'm5dn.2xlarge' | 'm5dn.4xlarge' | 'm5dn.8xlarge' | 'm5dn.12xlarge' | 'm5dn.16xlarge' | 'm5dn.24xlarge' | 'm5dn.metal' | 'm5n.large' | 'm5n.xlarge' | 'm5n.2xlarge' | 'm5n.4xlarge' | 'm5n.8xlarge' | 'm5n.12xlarge' | 'm5n.16xlarge' | 'm5n.24xlarge' | 'm5n.metal' | 'm5zn.large' | 'm5zn.xlarge' | 'm5zn.2xlarge' | 'm5zn.3xlarge' | 'm5zn.6xlarge' | 'm5zn.12xlarge' | 'm5zn.metal' | 'm6a.large' | 'm6a.xlarge' | 'm6a.2xlarge' | 'm6a.4xlarge' | 'm6a.8xlarge' | 'm6a.12xlarge' | 'm6a.16xlarge' | 'm6a.24xlarge' | 'm6a.32xlarge' | 'm6a.48xlarge' | 'm6g.metal' | 'm6g.medium' | 'm6g.large' | 'm6g.xlarge' | 'm6g.2xlarge' | 'm6g.4xlarge' | 'm6g.8xlarge' | 'm6g.12xlarge' | 'm6g.16xlarge' | 'm6gd.metal' | 'm6gd.medium' | 'm6gd.large' | 'm6gd.xlarge' | 'm6gd.2xlarge' | 'm6gd.4xlarge' | 'm6gd.8xlarge' | 'm6gd.12xlarge' | 'm6gd.16xlarge' | 'm6i.large' | 'm6i.xlarge' | 'm6i.2xlarge' | 'm6i.4xlarge' | 'm6i.8xlarge' | 'm6i.12xlarge' | 'm6i.16xlarge' | 'm6i.24xlarge' | 'm6i.32xlarge' | 'm6i.metal' | 'mac1.metal' | 'p2.xlarge' | 'p2.8xlarge' | 'p2.16xlarge' | 'p3.2xlarge' | 'p3.8xlarge' | 'p3.16xlarge' | 'p3dn.24xlarge' | 'p4d.24xlarge' | 'r3.large' | 'r3.xlarge' | 'r3.2xlarge' | 'r3.4xlarge' | 'r3.8xlarge' | 'r4.large' | 'r4.xlarge' | 'r4.2xlarge' | 'r4.4xlarge' | 'r4.8xlarge' | 'r4.16xlarge' | 'r5.large' | 'r5.xlarge' | 'r5.2xlarge' | 'r5.4xlarge' | 'r5.8xlarge' | 'r5.12xlarge' | 'r5.16xlarge' | 'r5.24xlarge' | 'r5.metal' | 'r5a.large' | 'r5a.xlarge' | 'r5a.2xlarge' | 'r5a.4xlarge' | 'r5a.8xlarge' | 'r5a.12xlarge' | 'r5a.16xlarge' | 'r5a.24xlarge' | 'r5ad.large' | 'r5ad.xlarge' | 'r5ad.2xlarge' | 'r5ad.4xlarge' | 'r5ad.8xlarge' | 'r5ad.12xlarge' | 'r5ad.16xlarge' | 'r5ad.24xlarge' | 'r5b.large' | 'r5b.xlarge' | 'r5b.2xlarge' | 'r5b.4xlarge' | 'r5b.8xlarge' | 'r5b.12xlarge' | 'r5b.16xlarge' | 'r5b.24xlarge' | 'r5b.metal' | 'r5d.large' | 'r5d.xlarge' | 'r5d.2xlarge' | 'r5d.4xlarge' | 'r5d.8xlarge' | 'r5d.12xlarge' | 'r5d.16xlarge' | 'r5d.24xlarge' | 'r5d.metal' | 'r5dn.large' | 'r5dn.xlarge' | 'r5dn.2xlarge' | 'r5dn.4xlarge' | 'r5dn.8xlarge' | 'r5dn.12xlarge' | 'r5dn.16xlarge' | 'r5dn.24xlarge' | 'r5dn.metal' | 'r5n.large' | 'r5n.xlarge' | 'r5n.2xlarge' | 'r5n.4xlarge' | 'r5n.8xlarge' | 'r5n.12xlarge' | 'r5n.16xlarge' | 'r5n.24xlarge' | 'r5n.metal' | 'r6g.medium' | 'r6g.large' | 'r6g.xlarge' | 'r6g.2xlarge' | 'r6g.4xlarge' | 'r6g.8xlarge' | 'r6g.12xlarge' | 'r6g.16xlarge' | 'r6g.metal' | 'r6gd.medium' | 'r6gd.large' | 'r6gd.xlarge' | 'r6gd.2xlarge' | 'r6gd.4xlarge' | 'r6gd.8xlarge' | 'r6gd.12xlarge' | 'r6gd.16xlarge' | 'r6gd.metal' | 'r6i.large' | 'r6i.xlarge' | 'r6i.2xlarge' | 'r6i.4xlarge' | 'r6i.8xlarge' | 'r6i.12xlarge' | 'r6i.16xlarge' | 'r6i.24xlarge' | 'r6i.32xlarge' | 'r6i.metal' | 't1.micro' | 't2.nano' | 't2.micro' | 't2.small' | 't2.medium' | 't2.large' | 't2.xlarge' | 't2.2xlarge' | 't3.nano' | 't3.micro' | 't3.small' | 't3.medium' | 't3.large' | 't3.xlarge' | 't3.2xlarge' | 't3a.nano' | 't3a.micro' | 't3a.small' | 't3a.medium' | 't3a.large' | 't3a.xlarge' | 't3a.2xlarge' | 't4g.nano' | 't4g.micro' | 't4g.small' | 't4g.medium' | 't4g.large' | 't4g.xlarge' | 't4g.2xlarge' | 'u-6tb1.56xlarge' | 'u-6tb1.112xlarge' | 'u-9tb1.112xlarge' | 'u-12tb1.112xlarge' | 'u-6tb1.metal' | 'u-9tb1.metal' | 'u-12tb1.metal' | 'u-18tb1.metal' | 'u-24tb1.metal' | 'vt1.3xlarge' | 'vt1.6xlarge' | 'vt1.24xlarge' | 'x1.16xlarge' | 'x1.32xlarge' | 'x1e.xlarge' | 'x1e.2xlarge' | 'x1e.4xlarge' | 'x1e.8xlarge' | 'x1e.16xlarge' | 'x1e.32xlarge' | 'x2iezn.2xlarge' | 'x2iezn.4xlarge' | 'x2iezn.6xlarge' | 'x2iezn.8xlarge' | 'x2iezn.12xlarge' | 'x2iezn.metal' | 'x2gd.medium' | 'x2gd.large' | 'x2gd.xlarge' | 'x2gd.2xlarge' | 'x2gd.4xlarge' | 'x2gd.8xlarge' | 'x2gd.12xlarge' | 'x2gd.16xlarge' | 'x2gd.metal' | 'z1d.large' | 'z1d.xlarge' | 'z1d.2xlarge' | 'z1d.3xlarge' | 'z1d.6xlarge' | 'z1d.12xlarge' | 'z1d.metal' | 'x2idn.16xlarge' | 'x2idn.24xlarge' | 'x2idn.32xlarge' | 'x2iedn.xlarge' | 'x2iedn.2xlarge' | 'x2iedn.4xlarge' | 'x2iedn.8xlarge' | 'x2iedn.16xlarge' | 'x2iedn.24xlarge' | 'x2iedn.32xlarge' | 'c6a.large' | 'c6a.xlarge' | 'c6a.2xlarge' | 'c6a.4xlarge' | 'c6a.8xlarge' | 'c6a.12xlarge' | 'c6a.16xlarge' | 'c6a.24xlarge' | 'c6a.32xlarge' | 'c6a.48xlarge' | 'c6a.metal' | 'm6a.metal' | 'i4i.large' | 'i4i.xlarge' | 'i4i.2xlarge' | 'i4i.4xlarge' | 'i4i.8xlarge' | 'i4i.16xlarge' | 'i4i.32xlarge' | 'i4i.metal' | 'x2idn.metal' | 'x2iedn.metal' | 'c7g.medium' | 'c7g.large' | 'c7g.xlarge' | 'c7g.2xlarge' | 'c7g.4xlarge' | 'c7g.8xlarge' | 'c7g.12xlarge' | 'c7g.16xlarge' | 'mac2.metal' | 'c6id.large' | 'c6id.xlarge' | 'c6id.2xlarge' | 'c6id.4xlarge' | 'c6id.8xlarge' | 'c6id.12xlarge' | 'c6id.16xlarge' | 'c6id.24xlarge' | 'c6id.32xlarge' | 'c6id.metal' | 'm6id.large' | 'm6id.xlarge' | 'm6id.2xlarge' | 'm6id.4xlarge' | 'm6id.8xlarge' | 'm6id.12xlarge' | 'm6id.16xlarge' | 'm6id.24xlarge' | 'm6id.32xlarge' | 'm6id.metal' | 'r6id.large' | 'r6id.xlarge' | 'r6id.2xlarge' | 'r6id.4xlarge' | 'r6id.8xlarge' | 'r6id.12xlarge' | 'r6id.16xlarge' | 'r6id.24xlarge' | 'r6id.32xlarge' | 'r6id.metal' | 'r6a.large' | 'r6a.xlarge' | 'r6a.2xlarge' | 'r6a.4xlarge' | 'r6a.8xlarge' | 'r6a.12xlarge' | 'r6a.16xlarge' | 'r6a.24xlarge' | 'r6a.32xlarge' | 'r6a.48xlarge' | 'r6a.metal' | 'p4de.24xlarge' | 'u-3tb1.56xlarge' | 'u-18tb1.112xlarge' | 'u-24tb1.112xlarge' | 'trn1.2xlarge' | 'trn1.32xlarge' | 'hpc6id.32xlarge' | 'c6in.large' | 'c6in.xlarge' | 'c6in.2xlarge' | 'c6in.4xlarge' | 'c6in.8xlarge' | 'c6in.12xlarge' | 'c6in.16xlarge' | 'c6in.24xlarge' | 'c6in.32xlarge' | 'm6in.large' | 'm6in.xlarge' | 'm6in.2xlarge' | 'm6in.4xlarge' | 'm6in.8xlarge' | 'm6in.12xlarge' | 'm6in.16xlarge' | 'm6in.24xlarge' | 'm6in.32xlarge' | 'm6idn.large' | 'm6idn.xlarge' | 'm6idn.2xlarge' | 'm6idn.4xlarge' | 'm6idn.8xlarge' | 'm6idn.12xlarge' | 'm6idn.16xlarge' | 'm6idn.24xlarge' | 'm6idn.32xlarge' | 'r6in.large' | 'r6in.xlarge' | 'r6in.2xlarge' | 'r6in.4xlarge' | 'r6in.8xlarge' | 'r6in.12xlarge' | 'r6in.16xlarge' | 'r6in.24xlarge' | 'r6in.32xlarge' | 'r6idn.large' | 'r6idn.xlarge' | 'r6idn.2xlarge' | 'r6idn.4xlarge' | 'r6idn.8xlarge' | 'r6idn.12xlarge' | 'r6idn.16xlarge' | 'r6idn.24xlarge' | 'r6idn.32xlarge' | 'c7g.metal' | 'm7g.medium' | 'm7g.large' | 'm7g.xlarge' | 'm7g.2xlarge' | 'm7g.4xlarge' | 'm7g.8xlarge' | 'm7g.12xlarge' | 'm7g.16xlarge' | 'm7g.metal' | 'r7g.medium' | 'r7g.large' | 'r7g.xlarge' | 'r7g.2xlarge' | 'r7g.4xlarge' | 'r7g.8xlarge' | 'r7g.12xlarge' | 'r7g.16xlarge' | 'r7g.metal' | 'c6in.metal' | 'm6in.metal' | 'm6idn.metal' | 'r6in.metal' | 'r6idn.metal' | 'inf2.xlarge' | 'inf2.8xlarge' | 'inf2.24xlarge' | 'inf2.48xlarge' | 'trn1n.32xlarge' | 'i4g.large' | 'i4g.xlarge' | 'i4g.2xlarge' | 'i4g.4xlarge' | 'i4g.8xlarge' | 'i4g.16xlarge' | 'hpc7g.4xlarge' | 'hpc7g.8xlarge' | 'hpc7g.16xlarge' | 'c7gn.medium' | 'c7gn.large' | 'c7gn.xlarge' | 'c7gn.2xlarge' | 'c7gn.4xlarge' | 'c7gn.8xlarge' | 'c7gn.12xlarge' | 'c7gn.16xlarge' | 'p5.48xlarge' | 'm7i.large' | 'm7i.xlarge' | 'm7i.2xlarge' | 'm7i.4xlarge' | 'm7i.8xlarge' | 'm7i.12xlarge' | 'm7i.16xlarge' | 'm7i.24xlarge' | 'm7i.48xlarge' | 'm7i-flex.large' | 'm7i-flex.xlarge' | 'm7i-flex.2xlarge' | 'm7i-flex.4xlarge' | 'm7i-flex.8xlarge' | 'm7a.medium' | 'm7a.large' | 'm7a.xlarge' | 'm7a.2xlarge' | 'm7a.4xlarge' | 'm7a.8xlarge' | 'm7a.12xlarge' | 'm7a.16xlarge' | 'm7a.24xlarge' | 'm7a.32xlarge' | 'm7a.48xlarge' | 'm7a.metal-48xl' | 'hpc7a.12xlarge' | 'hpc7a.24xlarge' | 'hpc7a.48xlarge' | 'hpc7a.96xlarge' | 'c7gd.medium' | 'c7gd.large' | 'c7gd.xlarge' | 'c7gd.2xlarge' | 'c7gd.4xlarge' | 'c7gd.8xlarge' | 'c7gd.12xlarge' | 'c7gd.16xlarge' | 'm7gd.medium' | 'm7gd.large' | 'm7gd.xlarge' | 'm7gd.2xlarge' | 'm7gd.4xlarge' | 'm7gd.8xlarge' | 'm7gd.12xlarge' | 'm7gd.16xlarge' | 'r7gd.medium' | 'r7gd.large' | 'r7gd.xlarge' | 'r7gd.2xlarge' | 'r7gd.4xlarge' | 'r7gd.8xlarge' | 'r7gd.12xlarge' | 'r7gd.16xlarge' | 'r7a.medium' | 'r7a.large' | 'r7a.xlarge' | 'r7a.2xlarge' | 'r7a.4xlarge' | 'r7a.8xlarge' | 'r7a.12xlarge' | 'r7a.16xlarge' | 'r7a.24xlarge' | 'r7a.32xlarge' | 'r7a.48xlarge' | 'c7i.large' | 'c7i.xlarge' | 'c7i.2xlarge' | 'c7i.4xlarge' | 'c7i.8xlarge' | 'c7i.12xlarge' | 'c7i.16xlarge' | 'c7i.24xlarge' | 'c7i.48xlarge' | 'mac2-m2pro.metal' | 'r7iz.large' | 'r7iz.xlarge' | 'r7iz.2xlarge' | 'r7iz.4xlarge' | 'r7iz.8xlarge' | 'r7iz.12xlarge' | 'r7iz.16xlarge' | 'r7iz.32xlarge' | 'c7a.medium' | 'c7a.large' | 'c7a.xlarge' | 'c7a.2xlarge' | 'c7a.4xlarge' | 'c7a.8xlarge' | 'c7a.12xlarge' | 'c7a.16xlarge' | 'c7a.24xlarge' | 'c7a.32xlarge' | 'c7a.48xlarge' | 'c7a.metal-48xl' | 'r7a.metal-48xl' | 'r7i.large' | 'r7i.xlarge' | 'r7i.2xlarge' | 'r7i.4xlarge' | 'r7i.8xlarge' | 'r7i.12xlarge' | 'r7i.16xlarge' | 'r7i.24xlarge' | 'r7i.48xlarge' | 'dl2q.24xlarge' | 'mac2-m2.metal' | 'i4i.12xlarge' | 'i4i.24xlarge' | 'c7i.metal-24xl' | 'c7i.metal-48xl' | 'm7i.metal-24xl' | 'm7i.metal-48xl' | 'r7i.metal-24xl' | 'r7i.metal-48xl' | 'r7iz.metal-16xl' | 'r7iz.metal-32xl' | 'c7gd.metal' | 'm7gd.metal' | 'r7gd.metal' | 'g6.xlarge' | 'g6.2xlarge' | 'g6.4xlarge' | 'g6.8xlarge' | 'g6.12xlarge' | 'g6.16xlarge' | 'g6.24xlarge' | 'g6.48xlarge' | 'gr6.4xlarge' | 'gr6.8xlarge' | 'c7i-flex.large' | 'c7i-flex.xlarge' | 'c7i-flex.2xlarge' | 'c7i-flex.4xlarge' | 'c7i-flex.8xlarge' | 'u7i-12tb.224xlarge' | 'u7in-16tb.224xlarge' | 'u7in-24tb.224xlarge' | 'u7in-32tb.224xlarge' | 'u7ib-12tb.224xlarge' | 'c7gn.metal' | 'r8g.medium' | 'r8g.large' | 'r8g.xlarge' | 'r8g.2xlarge' | 'r8g.4xlarge' | 'r8g.8xlarge' | 'r8g.12xlarge' | 'r8g.16xlarge' | 'r8g.24xlarge' | 'r8g.48xlarge' | 'r8g.metal-24xl' | 'r8g.metal-48xl' | 'mac2-m1ultra.metal' | 'g6e.xlarge' | 'g6e.2xlarge' | 'g6e.4xlarge' | 'g6e.8xlarge' | 'g6e.12xlarge' | 'g6e.16xlarge' | 'g6e.24xlarge' | 'g6e.48xlarge' | 'c8g.medium' | 'c8g.large' | 'c8g.xlarge' | 'c8g.2xlarge' | 'c8g.4xlarge' | 'c8g.8xlarge' | 'c8g.12xlarge' | 'c8g.16xlarge' | 'c8g.24xlarge' | 'c8g.48xlarge' | 'c8g.metal-24xl' | 'c8g.metal-48xl' | 'm8g.medium' | 'm8g.large' | 'm8g.xlarge' | 'm8g.2xlarge' | 'm8g.4xlarge' | 'm8g.8xlarge' | 'm8g.12xlarge' | 'm8g.16xlarge' | 'm8g.24xlarge' | 'm8g.48xlarge' | 'm8g.metal-24xl' | 'm8g.metal-48xl' | 'x8g.medium' | 'x8g.large' | 'x8g.xlarge' | 'x8g.2xlarge' | 'x8g.4xlarge' | 'x8g.8xlarge' | 'x8g.12xlarge' | 'x8g.16xlarge' | 'x8g.24xlarge' | 'x8g.48xlarge' | 'x8g.metal-24xl' | 'x8g.metal-48xl' | 'i7ie.large' | 'i7ie.xlarge' | 'i7ie.2xlarge' | 'i7ie.3xlarge' | 'i7ie.6xlarge' | 'i7ie.12xlarge' | 'i7ie.18xlarge' | 'i7ie.24xlarge' | 'i7ie.48xlarge' | 'i8g.large' | 'i8g.xlarge' | 'i8g.2xlarge' | 'i8g.4xlarge' | 'i8g.8xlarge' | 'i8g.12xlarge' | 'i8g.16xlarge' | 'i8g.24xlarge' | 'i8g.metal-24xl' | 'u7i-6tb.112xlarge' | 'u7i-8tb.112xlarge' | 'u7inh-32tb.480xlarge' | 'p5e.48xlarge' | 'p5en.48xlarge' | 'f2.12xlarge' | 'f2.48xlarge' | 'trn2.48xlarge' | 'c7i-flex.12xlarge' | 'c7i-flex.16xlarge' | 'm7i-flex.12xlarge' | 'm7i-flex.16xlarge' | 'i7ie.metal-24xl' | 'i7ie.metal-48xl' | 'i8g.48xlarge' | 'c8gd.medium' | 'c8gd.large' | 'c8gd.xlarge' | 'c8gd.2xlarge' | 'c8gd.4xlarge' | 'c8gd.8xlarge' | 'c8gd.12xlarge' | 'c8gd.16xlarge' | 'c8gd.24xlarge' | 'c8gd.48xlarge' | 'c8gd.metal-24xl' | 'c8gd.metal-48xl' | 'i7i.large' | 'i7i.xlarge' | 'i7i.2xlarge' | 'i7i.4xlarge' | 'i7i.8xlarge' | 'i7i.12xlarge' | 'i7i.16xlarge' | 'i7i.24xlarge' | 'i7i.48xlarge' | 'i7i.metal-24xl' | 'i7i.metal-48xl' | 'p6-b200.48xlarge' | 'm8gd.medium' | 'm8gd.large' | 'm8gd.xlarge' | 'm8gd.2xlarge' | 'm8gd.4xlarge' | 'm8gd.8xlarge' | 'm8gd.12xlarge' | 'm8gd.16xlarge' | 'm8gd.24xlarge' | 'm8gd.48xlarge' | 'm8gd.metal-24xl' | 'm8gd.metal-48xl' | 'r8gd.medium' | 'r8gd.large' | 'r8gd.xlarge' | 'r8gd.2xlarge' | 'r8gd.4xlarge' | 'r8gd.8xlarge' | 'r8gd.12xlarge' | 'r8gd.16xlarge' | 'r8gd.24xlarge' | 'r8gd.48xlarge' | 'r8gd.metal-24xl' | 'r8gd.metal-48xl' | 'c8gn.medium' | 'c8gn.large' | 'c8gn.xlarge' | 'c8gn.2xlarge' | 'c8gn.4xlarge' | 'c8gn.8xlarge' | 'c8gn.12xlarge' | 'c8gn.16xlarge' | 'c8gn.24xlarge' | 'c8gn.48xlarge' | 'c8gn.metal-24xl' | 'c8gn.metal-48xl' | 'f2.6xlarge' | 'p6e-gb200.36xlarge' | 'g6f.large' | 'g6f.xlarge' | 'g6f.2xlarge' | 'g6f.4xlarge' | 'gr6f.4xlarge' | 'p5.4xlarge' | 'r8i.large' | 'r8i.xlarge' | 'r8i.2xlarge' | 'r8i.4xlarge' | 'r8i.8xlarge' | 'r8i.12xlarge' | 'r8i.16xlarge' | 'r8i.24xlarge' | 'r8i.32xlarge' | 'r8i.48xlarge' | 'r8i.96xlarge' | 'r8i.metal-48xl' | 'r8i.metal-96xl' | 'r8i-flex.large' | 'r8i-flex.xlarge' | 'r8i-flex.2xlarge' | 'r8i-flex.4xlarge' | 'r8i-flex.8xlarge' | 'r8i-flex.12xlarge' | 'r8i-flex.16xlarge' | 'm8i.large' | 'm8i.xlarge' | 'm8i.2xlarge' | 'm8i.4xlarge' | 'm8i.8xlarge' | 'm8i.12xlarge' | 'm8i.16xlarge' | 'm8i.24xlarge' | 'm8i.32xlarge' | 'm8i.48xlarge' | 'm8i.96xlarge' | 'm8i.metal-48xl' | 'm8i.metal-96xl' | 'm8i-flex.large' | 'm8i-flex.xlarge' | 'm8i-flex.2xlarge' | 'm8i-flex.4xlarge' | 'm8i-flex.8xlarge' | 'm8i-flex.12xlarge' | 'm8i-flex.16xlarge' | 'i8ge.large' | 'i8ge.xlarge' | 'i8ge.2xlarge' | 'i8ge.3xlarge' | 'i8ge.6xlarge' | 'i8ge.12xlarge' | 'i8ge.18xlarge' | 'i8ge.24xlarge' | 'i8ge.48xlarge' | 'i8ge.metal-24xl' | 'i8ge.metal-48xl' | 'mac-m4.metal' | 'mac-m4pro.metal' | 'r8gn.medium' | 'r8gn.large' | 'r8gn.xlarge' | 'r8gn.2xlarge' | 'r8gn.4xlarge' | 'r8gn.8xlarge' | 'r8gn.12xlarge' | 'r8gn.16xlarge' | 'r8gn.24xlarge' | 'r8gn.48xlarge' | 'r8gn.metal-24xl' | 'r8gn.metal-48xl' | 'c8i.large' | 'c8i.xlarge' | 'c8i.2xlarge' | 'c8i.4xlarge' | 'c8i.8xlarge' | 'c8i.12xlarge' | 'c8i.16xlarge' | 'c8i.24xlarge' | 'c8i.32xlarge' | 'c8i.48xlarge' | 'c8i.96xlarge' | 'c8i.metal-48xl' | 'c8i.metal-96xl' | 'c8i-flex.large' | 'c8i-flex.xlarge' | 'c8i-flex.2xlarge' | 'c8i-flex.4xlarge' | 'c8i-flex.8xlarge' | 'c8i-flex.12xlarge' | 'c8i-flex.16xlarge' | 'r8gb.medium' | 'r8gb.large' | 'r8gb.xlarge' | 'r8gb.2xlarge' | 'r8gb.4xlarge' | 'r8gb.8xlarge' | 'r8gb.12xlarge' | 'r8gb.16xlarge' | 'r8gb.24xlarge' | 'r8gb.metal-24xl' | 'm8a.medium' | 'm8a.large' | 'm8a.xlarge' | 'm8a.2xlarge' | 'm8a.4xlarge' | 'm8a.8xlarge' | 'm8a.12xlarge' | 'm8a.16xlarge' | 'm8a.24xlarge' | 'm8a.48xlarge' | 'm8a.metal-24xl' | 'm8a.metal-48xl' | 'trn2.3xlarge' | 'r8a.medium' | 'r8a.large' | 'r8a.xlarge' | 'r8a.2xlarge' | 'r8a.4xlarge' | 'r8a.8xlarge' | 'r8a.12xlarge' | 'r8a.16xlarge' | 'r8a.24xlarge' | 'r8a.48xlarge' | 'r8a.metal-24xl' | 'r8a.metal-48xl' | 'p6-b300.48xlarge' | 'c8a.medium' | 'c8a.large' | 'c8a.xlarge' | 'c8a.2xlarge' | 'c8a.4xlarge' | 'c8a.8xlarge' | 'c8a.12xlarge' | 'c8a.16xlarge' | 'c8a.24xlarge' | 'c8a.48xlarge' | 'c8a.metal-24xl' | 'c8a.metal-48xl' | 'c8gb.12xlarge' | 'c8gb.16xlarge' | 'c8gb.24xlarge' | 'c8gb.2xlarge' | 'c8gb.4xlarge' | 'c8gb.8xlarge' | 'c8gb.large' | 'c8gb.medium' | 'c8gb.metal-24xl' | 'c8gb.xlarge' | 'c8gb.48xlarge' | 'c8gb.metal-48xl' | 'm8gb.12xlarge' | 'm8gb.16xlarge' | 'm8gb.24xlarge' | 'm8gb.2xlarge' | 'm8gb.4xlarge' | 'm8gb.8xlarge' | 'm8gb.large' | 'm8gb.medium' | 'm8gb.xlarge' | 'm8gb.48xlarge' | 'm8gb.metal-24xl' | 'm8gb.metal-48xl' | 'm8gn.12xlarge' | 'm8gn.16xlarge' | 'm8gn.24xlarge' | 'm8gn.2xlarge' | 'm8gn.48xlarge' | 'm8gn.4xlarge' | 'm8gn.8xlarge' | 'm8gn.large' | 'm8gn.medium' | 'm8gn.xlarge' | 'm8gn.metal-24xl' | 'm8gn.metal-48xl' | 'x8aedz.12xlarge' | 'x8aedz.24xlarge' | 'x8aedz.3xlarge' | 'x8aedz.6xlarge' | 'x8aedz.large' | 'x8aedz.metal-12xl' | 'x8aedz.metal-24xl' | 'x8aedz.xlarge' | 'm8azn.medium' | 'm8azn.large' | 'm8azn.xlarge' | 'm8azn.3xlarge' | 'm8azn.6xlarge' | 'm8azn.12xlarge' | 'm8azn.24xlarge' | 'm8azn.metal-12xl' | 'm8azn.metal-24xl' | 'x8i.large' | 'x8i.xlarge' | 'x8i.2xlarge' | 'x8i.4xlarge' | 'x8i.8xlarge' | 'x8i.12xlarge' | 'x8i.16xlarge' | 'x8i.24xlarge' | 'x8i.32xlarge' | 'x8i.48xlarge' | 'x8i.64xlarge' | 'x8i.96xlarge' | 'x8i.metal-48xl' | 'x8i.metal-96xl' | 'mac-m4max.metal' | 'g7e.2xlarge' | 'g7e.4xlarge' | 'g7e.8xlarge' | 'g7e.12xlarge' | 'g7e.24xlarge' | 'g7e.48xlarge' | 'r8id.large' | 'r8id.xlarge' | 'r8id.2xlarge' | 'r8id.4xlarge' | 'r8id.8xlarge' | 'r8id.12xlarge' | 'r8id.16xlarge' | 'r8id.24xlarge' | 'r8id.32xlarge' | 'r8id.48xlarge' | 'r8id.96xlarge' | 'r8id.metal-48xl' | 'r8id.metal-96xl';
  /** The name of the key pair. You can create a key pair using CreateKeyPair or ImportKeyPair. If you do not specify a key pair, you can't connect to the instance unless you choose an AMI that is configure */
  KeyName?: string;
  /** The monitoring for the instance. */
  Monitoring?: LaunchTemplatesMonitoringRequest;
  /** The placement for the instance. */
  Placement?: LaunchTemplatePlacementRequest;
  /** The ID of the RAM disk. We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see User provided kernels in the Amazon EC2 User Guide. */
  RamDiskId?: string;
  /** Indicates whether termination protection is enabled for the instance. The default is false, which means that you can terminate the instance using the Amazon EC2 console, command line tools, or API. Yo */
  DisableApiTermination?: boolean;
  /** Indicates whether an instance stops or terminates when you initiate shutdown from the instance (using the operating system command for system shutdown). Default: stop */
  InstanceInitiatedShutdownBehavior?: 'stop' | 'terminate';
  /** The user data to make available to the instance. You must provide base64-encoded text. User data is limited to 16 KB. For more information, see Run commands when you launch an EC2 instance with user d */
  UserData?: string;
  /** The tags to apply to the resources that are created during instance launch. These tags are not applied to the launch template. */
  TagSpecifications?: any[];
  /** Deprecated. Amazon Elastic Graphics reached end of life on January 8, 2024. */
  ElasticGpuSpecifications?: any[];
  /** Amazon Elastic Inference is no longer available. An elastic inference accelerator to associate with the instance. Elastic inference accelerators are a resource you can attach to your Amazon EC2 instan */
  ElasticInferenceAccelerators?: any[];
  /** The IDs of the security groups. If you specify a network interface, you must specify any security groups as part of the network interface instead of using this parameter. */
  SecurityGroupIds?: string[];
  /** The names of the security groups. For a nondefault VPC, you must use security group IDs instead. If you specify a network interface, you must specify any security groups as part of the network interfa */
  SecurityGroups?: string[];
  /** The market (purchasing) option for the instances. */
  InstanceMarketOptions?: LaunchTemplateInstanceMarketOptionsRequest;
  /** The credit option for CPU usage of the instance. Valid only for T instances. */
  CreditSpecification?: CreditSpecificationRequest;
  /** The CPU options for the instance. For more information, see CPU options for Amazon EC2 instances in the Amazon EC2 User Guide. */
  CpuOptions?: LaunchTemplateCpuOptionsRequest;
  /** The Capacity Reservation targeting option. If you do not specify this parameter, the instance's Capacity Reservation preference defaults to open, which enables it to run in any open Capacity Reservati */
  CapacityReservationSpecification?: LaunchTemplateCapacityReservationSpecificationRequest;
  /** The license configurations. */
  LicenseSpecifications?: any[];
  /** Indicates whether an instance is enabled for hibernation. This parameter is valid only if the instance meets the hibernation prerequisites. For more information, see Hibernate your Amazon EC2 instance */
  HibernationOptions?: LaunchTemplateHibernationOptionsRequest;
  /** The metadata options for the instance. For more information, see Configure the Instance Metadata Service options in the Amazon EC2 User Guide. */
  MetadataOptions?: LaunchTemplateInstanceMetadataOptionsRequest;
  /** Indicates whether the instance is enabled for Amazon Web Services Nitro Enclaves. For more information, see What is Nitro Enclaves? in the Amazon Web Services Nitro Enclaves User Guide. You can't enab */
  EnclaveOptions?: LaunchTemplateEnclaveOptionsRequest;
  /** The attributes for the instance types. When you specify instance attributes, Amazon EC2 will identify instance types with these attributes. You must specify VCpuCount and MemoryMiB. All other attribut */
  InstanceRequirements?: InstanceRequirementsRequest;
  /** The options for the instance hostname. The default values are inherited from the subnet. */
  PrivateDnsNameOptions?: LaunchTemplatePrivateDnsNameOptionsRequest;
  /** The maintenance options for the instance. */
  MaintenanceOptions?: LaunchTemplateInstanceMaintenanceOptionsRequest;
  /** Indicates whether to enable the instance for stop protection. For more information, see Enable stop protection for your EC2 instances in the Amazon EC2 User Guide. */
  DisableApiStop?: boolean;
  /** The entity that manages the launch template. */
  Operator?: OperatorRequest;
  /** Contains launch template settings to boost network performance for the type of workload that runs on your instance. */
  NetworkPerformanceOptions?: LaunchTemplateNetworkPerformanceOptionsRequest;
  /** The secondary interfaces to associate with instances launched from the template. */
  SecondaryInterfaces?: any[];
}

export interface MacSystemIntegrityProtectionConfigurationRequest {
  /** Enables or disables Apple Internal. */
  AppleInternal?: 'enabled' | 'disabled';
  /** Enables or disables Base System. */
  BaseSystem?: 'enabled' | 'disabled';
  /** Enables or disables Debugging Restrictions. */
  DebuggingRestrictions?: 'enabled' | 'disabled';
  /** Enables or disables Dtrace Restrictions. */
  DTraceRestrictions?: 'enabled' | 'disabled';
  /** Enables or disables Filesystem Protections. */
  FilesystemProtections?: 'enabled' | 'disabled';
  /** Enables or disables Kext Signing. */
  KextSigning?: 'enabled' | 'disabled';
  /** Enables or disables Nvram Protections. */
  NvramProtections?: 'enabled' | 'disabled';
}

export interface AddPrefixListEntry {
  /** The CIDR block. */
  Cidr: string;
  /** A description for the entry. Constraints: Up to 255 characters in length. */
  Description?: string;
}

export interface AvailabilityZoneAddress {
  /** For regional NAT gateways only: The Availability Zone where this specific NAT gateway configuration will be active. Each AZ in a regional NAT gateway has its own configuration to handle outbound NAT t */
  AvailabilityZone?: string;
  /** For regional NAT gateways only: The ID of the Availability Zone where this specific NAT gateway configuration will be active. Each AZ in a regional NAT gateway has its own configuration to handle outb */
  AvailabilityZoneId?: string;
  /** The allocation IDs of the Elastic IP addresses (EIPs) to be used for handling outbound NAT traffic in this specific Availability Zone. */
  AllocationIds?: any[];
}

export interface IcmpTypeCode {
  /** The ICMP code. A value of -1 means all codes for the specified ICMP type. */
  Code?: number;
  /** The ICMP type. A value of -1 means all types. */
  Type?: number;
}

export interface PortRange {
  /** The first port in the range. */
  From?: number;
  /** The last port in the range. */
  To?: number;
}

export interface AccessScopePathRequest {
  /** The source. */
  Source?: any;
  /** The destination. */
  Destination?: any;
  /** The through resources. */
  ThroughResources?: any[];
}

export interface RequestFilterPortRange {
  /** The first port in the range. */
  FromPort?: number;
  /** The last port in the range. */
  ToPort?: number;
}

export interface PathRequestFilter {
  /** The source IPv4 address. */
  SourceAddress?: string;
  /** The source port range. */
  SourcePortRange?: RequestFilterPortRange;
  /** The destination IPv4 address. */
  DestinationAddress?: string;
  /** The destination port range. */
  DestinationPortRange?: RequestFilterPortRange;
}

export interface Ipv4PrefixSpecificationRequest {
  /** The IPv4 prefix. For information, see Assigning prefixes to network interfaces in the Amazon EC2 User Guide. */
  Ipv4Prefix?: string;
}

export interface Ipv6PrefixSpecificationRequest {
  /** The IPv6 prefix. */
  Ipv6Prefix?: string;
}

export interface ConnectionTrackingSpecificationRequest {
  /** Timeout (in seconds) for idle TCP connections in an established state. Min: 60 seconds. Max: 432000 seconds (5 days). Default: 432000 seconds. Recommended: Less than 432000 seconds. */
  TcpEstablishedTimeout?: number;
  /** Timeout (in seconds) for idle UDP flows classified as streams which have seen more than one request-response transaction. Min: 60 seconds. Max: 180 seconds (3 minutes). Default: 180 seconds. */
  UdpStreamTimeout?: number;
  /** Timeout (in seconds) for idle UDP flows that have seen traffic only in a single direction or a single request-response transaction. Min: 30 seconds. Max: 60 seconds. Default: 30 seconds. */
  UdpTimeout?: number;
}

export interface PrivateIpAddressSpecification {
  /** Indicates whether the private IPv4 address is the primary private IPv4 address. Only one IPv4 address can be designated as primary. */
  Primary?: boolean;
  /** The private IPv4 address. */
  PrivateIpAddress?: string;
}

export interface InstanceIpv6Address {
  /** The IPv6 address. */
  Ipv6Address?: string;
  /** Determines if an IPv6 address associated with a network interface is the primary IPv6 address. When you enable an IPv6 GUA address to be a primary IPv6, the first IPv6 GUA will be made the primary IPv */
  IsPrimaryIpv6?: boolean;
}

export interface PriceScheduleSpecification {
  /** The number of months remaining in the reservation. For example, 2 is the second to the last month before the capacity reservation expires. */
  Term?: number;
  /** The fixed price for the term. */
  Price?: number;
  /** The currency for transacting the Reserved Instance resale. At this time, the only supported currency is USD. */
  CurrencyCode?: 'USD';
}

export interface RouteServerBgpOptionsRequest {
  /** The Border Gateway Protocol (BGP) Autonomous System Number (ASN) for the appliance. Valid values are from 1 to 4294967295. We recommend using a private ASN in the 64512–65534 (16-bit ASN) or 420000000 */
  PeerAsn: number;
  /** The requested liveness detection protocol for the BGP peer. bgp-keepalive: The standard BGP keep alive mechanism (RFC4271) that is stable but may take longer to fail-over in cases of network impact or */
  PeerLivenessDetection?: 'bfd' | 'bgp-keepalive';
}

export interface InstanceSpecification {
  /** The instance to specify which volumes should be snapshotted. */
  InstanceId: string;
  /** Excludes the root volume from being snapshotted. */
  ExcludeBootVolume?: boolean;
  /** The IDs of the data (non-root) volumes to exclude from the multi-volume snapshot set. If you specify the ID of the root volume, the request fails. To exclude the root volume, use ExcludeBootVolume. Yo */
  ExcludeDataVolumeIds?: string[];
}

export interface S3ObjectTag {
  /** The key of the tag. Constraints: Tag keys are case-sensitive and can be up to 128 Unicode characters in length. May not begin with aws:. */
  Key?: string;
  /** The value of the tag. Constraints: Tag values are case-sensitive and can be up to 256 Unicode characters in length. */
  Value?: string;
}

export interface Tag {
  /** The key of the tag. Constraints: Tag keys are case-sensitive and accept a maximum of 127 Unicode characters. May not begin with aws:. */
  Key?: string;
  /** The value of the tag. Constraints: Tag values are case-sensitive and accept a maximum of 256 Unicode characters. */
  Value?: string;
}

export interface TrafficMirrorPortRangeRequest {
  /** The first port in the Traffic Mirror port range. This applies to the TCP and UDP protocols. */
  FromPort?: number;
  /** The last port in the Traffic Mirror port range. This applies to the TCP and UDP protocols. */
  ToPort?: number;
}

export interface TransitGatewayRequestOptions {
  /** A private Autonomous System Number (ASN) for the Amazon side of a BGP session. The range is 64512 to 65534 for 16-bit ASNs and 4200000000 to 4294967294 for 32-bit ASNs. The default is 64512. */
  AmazonSideAsn?: number;
  /** Enable or disable automatic acceptance of attachment requests. Disabled by default. */
  AutoAcceptSharedAttachments?: 'enable' | 'disable';
  /** Enable or disable automatic association with the default association route table. Enabled by default. */
  DefaultRouteTableAssociation?: 'enable' | 'disable';
  /** Enable or disable automatic propagation of routes to the default propagation route table. Enabled by default. */
  DefaultRouteTablePropagation?: 'enable' | 'disable';
  /** Enable or disable Equal Cost Multipath Protocol support. Enabled by default. */
  VpnEcmpSupport?: 'enable' | 'disable';
  /** Enable or disable DNS support. Enabled by default. */
  DnsSupport?: 'enable' | 'disable';
  /** Enables you to reference a security group across VPCs attached to a transit gateway to simplify security group management. This option is disabled by default. For more information about security group */
  SecurityGroupReferencingSupport?: 'enable' | 'disable';
  /** Indicates whether multicast is enabled on the transit gateway */
  MulticastSupport?: 'enable' | 'disable';
  /** One or more IPv4 or IPv6 CIDR blocks for the transit gateway. Must be a size /24 CIDR block or larger for IPv4, or a size /64 CIDR block or larger for IPv6. */
  TransitGatewayCidrBlocks?: string[];
}

export interface CreateTransitGatewayConnectRequestOptions {
  /** The tunnel protocol. */
  Protocol: 'gre';
}

export interface TransitGatewayConnectRequestBgpOptions {
  /** The peer Autonomous System Number (ASN). */
  PeerAsn?: number;
}

export interface CreateTransitGatewayMulticastDomainRequestOptions {
  /** Specify whether to enable Internet Group Management Protocol (IGMP) version 2 for the transit gateway multicast domain. */
  Igmpv2Support?: 'enable' | 'disable';
  /** Specify whether to enable support for statically configuring multicast group sources for a domain. */
  StaticSourcesSupport?: 'enable' | 'disable';
  /** Indicates whether to automatically accept cross-account subnet associations that are associated with the transit gateway multicast domain. */
  AutoAcceptSharedAssociations?: 'enable' | 'disable';
}

export interface CreateTransitGatewayPeeringAttachmentRequestOptions {
  /** Indicates whether dynamic routing is enabled or disabled. */
  DynamicRouting?: 'enable' | 'disable';
}

export interface CreateTransitGatewayVpcAttachmentRequestOptions {
  /** Enable or disable DNS support. The default is enable. */
  DnsSupport?: 'enable' | 'disable';
  /** Enables you to reference a security group across VPCs attached to a transit gateway to simplify security group management. This option is set to enable by default. However, at the transit gateway leve */
  SecurityGroupReferencingSupport?: 'enable' | 'disable';
  /** Enable or disable IPv6 support. The default is disable. */
  Ipv6Support?: 'enable' | 'disable';
  /** Enable or disable support for appliance mode. If enabled, a traffic flow between a source and destination uses the same Availability Zone for the VPC attachment for the lifetime of that flow. The defa */
  ApplianceModeSupport?: 'enable' | 'disable';
}

export interface CreateVerifiedAccessEndpointLoadBalancerOptions {
  /** The IP protocol. */
  Protocol?: 'http' | 'https' | 'tcp';
  /** The IP port number. */
  Port?: number;
  /** The ARN of the load balancer. */
  LoadBalancerArn?: string;
  /** The IDs of the subnets. You can specify only one subnet per Availability Zone. */
  SubnetIds?: string[];
  /** The port ranges. */
  PortRanges?: any[];
}

export interface CreateVerifiedAccessEndpointEniOptions {
  /** The ID of the network interface. */
  NetworkInterfaceId?: string;
  /** The IP protocol. */
  Protocol?: 'http' | 'https' | 'tcp';
  /** The IP port number. */
  Port?: number;
  /** The port ranges. */
  PortRanges?: any[];
}

export interface VerifiedAccessSseSpecificationRequest {
  /** Enable or disable the use of customer managed KMS keys for server side encryption. Valid values: True | False */
  CustomerManagedKeyEnabled?: boolean;
  /** The ARN of the KMS key. */
  KmsKeyArn?: string;
}

export interface CreateVerifiedAccessEndpointRdsOptions {
  /** The protocol. */
  Protocol?: 'http' | 'https' | 'tcp';
  /** The port. */
  Port?: number;
  /** The ARN of the RDS instance. */
  RdsDbInstanceArn?: string;
  /** The ARN of the DB cluster. */
  RdsDbClusterArn?: string;
  /** The ARN of the RDS proxy. */
  RdsDbProxyArn?: string;
  /** The RDS endpoint. */
  RdsEndpoint?: string;
  /** The IDs of the subnets. You can specify only one subnet per Availability Zone. */
  SubnetIds?: string[];
}

export interface CreateVerifiedAccessEndpointCidrOptions {
  /** The protocol. */
  Protocol?: 'http' | 'https' | 'tcp';
  /** The IDs of the subnets. */
  SubnetIds?: string[];
  /** The CIDR. */
  Cidr?: string;
  /** The port ranges. */
  PortRanges?: any[];
}

export interface CreateVerifiedAccessTrustProviderOidcOptions {
  /** The OIDC issuer. */
  Issuer?: string;
  /** The OIDC authorization endpoint. */
  AuthorizationEndpoint?: string;
  /** The OIDC token endpoint. */
  TokenEndpoint?: string;
  /** The OIDC user info endpoint. */
  UserInfoEndpoint?: string;
  /** The client identifier. */
  ClientId?: string;
  /** The client secret. */
  ClientSecret?: string;
  /** OpenID Connect (OIDC) scopes are used by an application during authentication to authorize access to a user's details. Each scope returns a specific set of user attributes. */
  Scope?: string;
}

export interface CreateVerifiedAccessTrustProviderDeviceOptions {
  /** The ID of the tenant application with the device-identity provider. */
  TenantId?: string;
  /** The URL Amazon Web Services Verified Access will use to verify the authenticity of the device tokens. */
  PublicSigningKeyUrl?: string;
}

export interface CreateVerifiedAccessNativeApplicationOidcOptions {
  /** The public signing key endpoint. */
  PublicSigningKeyEndpoint?: string;
  /** The OIDC issuer identifier of the IdP. */
  Issuer?: string;
  /** The authorization endpoint of the IdP. */
  AuthorizationEndpoint?: string;
  /** The token endpoint of the IdP. */
  TokenEndpoint?: string;
  /** The user info endpoint of the IdP. */
  UserInfoEndpoint?: string;
  /** The OAuth 2.0 client identifier. */
  ClientId?: string;
  /** The OAuth 2.0 client secret. */
  ClientSecret?: string;
  /** The set of user claims to be requested from the IdP. */
  Scope?: string;
}

export interface VpcEncryptionControlConfiguration {
  /** The encryption mode for the VPC Encryption Control configuration. */
  Mode: 'monitor' | 'enforce';
  /** Specifies whether to exclude internet gateway traffic from encryption enforcement. */
  InternetGatewayExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude egress-only internet gateway traffic from encryption enforcement. */
  EgressOnlyInternetGatewayExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude NAT gateway traffic from encryption enforcement. */
  NatGatewayExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude virtual private gateway traffic from encryption enforcement. */
  VirtualPrivateGatewayExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude VPC peering connection traffic from encryption enforcement. */
  VpcPeeringExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude Lambda function traffic from encryption enforcement. */
  LambdaExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude VPC Lattice traffic from encryption enforcement. */
  VpcLatticeExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude Elastic File System traffic from encryption enforcement. */
  ElasticFileSystemExclusion?: 'enable' | 'disable';
}

export interface DnsOptionsSpecification {
  /** The DNS records created for the endpoint. */
  DnsRecordIpType?: 'ipv4' | 'dualstack' | 'ipv6' | 'service-defined';
  /** Indicates whether to enable private DNS only for inbound endpoints. This option is available only for services that support both gateway and interface endpoints. It routes traffic that originates from */
  PrivateDnsOnlyForInboundResolverEndpoint?: boolean;
  /** The preference for which private domains have a private hosted zone created for and associated with the specified VPC. Only supported when private DNS is enabled and when the VPC endpoint type is Serv */
  PrivateDnsPreference?: string;
  /** Indicates which of the private domains to create private hosted zones for and associate with the specified VPC. Only supported when private DNS is enabled and the private DNS preference is verified-do */
  PrivateDnsSpecifiedDomains?: string[];
}

export interface SubnetConfiguration {
  /** The ID of the subnet. */
  SubnetId?: string;
  /** The IPv4 address to assign to the endpoint network interface in the subnet. You must provide an IPv4 address if the VPC endpoint supports IPv4. If you specify an IPv4 address when modifying a VPC endp */
  Ipv4?: string;
  /** The IPv6 address to assign to the endpoint network interface in the subnet. You must provide an IPv6 address if the VPC endpoint supports IPv6. If you specify an IPv6 address when modifying a VPC endp */
  Ipv6?: string;
}

export interface VpnConnectionOptionsSpecification {
  /** Indicate whether to enable acceleration for the VPN connection. Default: false */
  EnableAcceleration?: boolean;
  /** Indicate whether the VPN tunnels process IPv4 or IPv6 traffic. Default: ipv4 */
  TunnelInsideIpVersion?: 'ipv4' | 'ipv6';
  /** The tunnel options for the VPN connection. */
  TunnelOptions?: any[];
  /** The IPv4 CIDR on the customer gateway (on-premises) side of the VPN connection. Default: 0.0.0.0/0 */
  LocalIpv4NetworkCidr?: string;
  /** The IPv4 CIDR on the Amazon Web Services side of the VPN connection. Default: 0.0.0.0/0 */
  RemoteIpv4NetworkCidr?: string;
  /** The IPv6 CIDR on the customer gateway (on-premises) side of the VPN connection. Default: ::/0 */
  LocalIpv6NetworkCidr?: string;
  /** The IPv6 CIDR on the Amazon Web Services side of the VPN connection. Default: ::/0 */
  RemoteIpv6NetworkCidr?: string;
  /** The type of IP address assigned to the outside interface of the customer gateway device. Valid values: PrivateIpv4 | PublicIpv4 | Ipv6 Default: PublicIpv4 */
  OutsideIpAddressType?: string;
  /** The transit gateway attachment ID to use for the VPN tunnel. Required if OutsideIpAddressType is set to PrivateIpv4. */
  TransportTransitGatewayAttachmentId?: string;
  /** The desired bandwidth specification for the VPN tunnel, used when creating or modifying VPN connection options to set the tunnel's throughput capacity. standard supports up to 1.25 Gbps per tunnel, wh */
  TunnelBandwidth?: 'standard' | 'large';
  /** Indicate whether the VPN connection uses static routes only. If you are creating a VPN connection for a device that does not support BGP, you must specify true. Use CreateVpnConnectionRoute to create  */
  StaticRoutesOnly?: boolean;
}

export interface DeregisterInstanceTagAttributeRequest {
  /** Indicates whether to deregister all tag keys in the current Region. Specify false to deregister all tag keys. */
  IncludeAllTagsOfInstance?: boolean;
  /** Information about the tag keys to deregister. */
  InstanceTagKeys?: string[];
}

export interface Filter {
  /** The name of the filter. Filter names are case-sensitive. */
  Name?: string;
  /** The filter values. Filter values are case-sensitive. If you specify multiple values for a filter, the values are joined with an OR, and the request returns all results that match any of the specified  */
  Values?: any[];
}

export interface ResourceTypeRequest {
  /** The resource type. */
  ResourceType?: 'ec2:Instance' | 'ec2:LaunchTemplate' | 'ssm:Parameter' | 'imagebuilder:ImageRecipe' | 'imagebuilder:ContainerRecipe';
  /** The options that affect the scope of the response. Valid only when ResourceType is ec2:Instance or ec2:LaunchTemplate. */
  ResourceTypeOptions?: any[];
}

export interface SlotDateTimeRangeRequest {
  /** The earliest date and time, in UTC, for the Scheduled Instance to start. */
  EarliestTime: string;
  /** The latest date and time, in UTC, for the Scheduled Instance to start. This value must be later than or equal to the earliest date and at most three months in the future. */
  LatestTime: string;
}

export interface ScheduledInstanceRecurrenceRequest {
  /** The frequency (Daily, Weekly, or Monthly). */
  Frequency?: string;
  /** The interval quantity. The interval unit depends on the value of Frequency. For example, every 2 weeks or every 2 months. */
  Interval?: number;
  /** The days. For a monthly schedule, this is one or more days of the month (1-31). For a weekly schedule, this is one or more days of the week (1-7, where 1 is Sunday). You can't specify this value with  */
  OccurrenceDays?: number[];
  /** Indicates whether the occurrence is relative to the end of the specified week or month. You can't specify this value with a daily schedule. */
  OccurrenceRelativeToEnd?: boolean;
  /** The unit for OccurrenceDays (DayOfWeek or DayOfMonth). This value is required for a monthly schedule. You can't specify DayOfWeek with a weekly schedule. You can't specify this value with a daily sche */
  OccurrenceUnit?: string;
}

export interface SlotStartTimeRangeRequest {
  /** The earliest date and time, in UTC, for the Scheduled Instance to start. */
  EarliestTime?: string;
  /** The latest date and time, in UTC, for the Scheduled Instance to start. */
  LatestTime?: string;
}

export interface InstanceEventWindowDisassociationRequest {
  /** The IDs of the instances to disassociate from the event window. */
  InstanceIds?: string[];
  /** The instance tags to disassociate from the event window. Any instances associated with the tags will be disassociated from the event window. */
  InstanceTags?: any[];
  /** The IDs of the Dedicated Hosts to disassociate from the event window. */
  DedicatedHostIds?: string[];
}

export interface FastLaunchSnapshotConfigurationRequest {
  /** The number of pre-provisioned snapshots to keep on hand for a Windows fast launch enabled AMI. */
  TargetResourceCount?: number;
}

export interface FastLaunchLaunchTemplateSpecificationRequest {
  /** Specify the ID of the launch template that the AMI should use for Windows fast launch. */
  LaunchTemplateId?: string;
  /** Specify the name of the launch template that the AMI should use for Windows fast launch. */
  LaunchTemplateName?: string;
  /** Specify the version of the launch template that the AMI should use for Windows fast launch. */
  Version: string;
}

export interface ExportTaskS3LocationRequest {
  /** The destination Amazon S3 bucket. */
  S3Bucket: string;
  /** The prefix (logical hierarchy) in the bucket. */
  S3Prefix?: string;
}

export interface DataQuery {
  /** A user-defined ID associated with a data query that's returned in the dataResponse identifying the query. For example, if you set the Id to MyQuery01in the query, the dataResponse identifies the query */
  Id?: string;
  /** The Region or Availability Zone that's the source for the data query. For example, us-east-1. */
  Source?: string;
  /** The Region or Availability Zone that's the target for the data query. For example, eu-north-1. */
  Destination?: string;
  /** The metric used for the network performance request. */
  Metric?: 'aggregate-latency';
  /** The metric data aggregation period, p50, between the specified startDate and endDate. For example, a metric of five_minutes is the median of all the data points gathered within those five minutes. p50 */
  Statistic?: 'p50';
  /** The aggregation period used for the data query. */
  Period?: 'five-minutes' | 'fifteen-minutes' | 'one-hour' | 'three-hours' | 'one-day' | 'one-week';
}

export interface CapacityManagerCondition {
  /** The dimension-based condition that specifies how to filter the data based on dimension values. */
  DimensionCondition?: any;
}

export interface IntegrateServices {
  /** Information about the integration with Amazon Athena. */
  AthenaIntegrations?: any[];
}

export interface InstanceRequirementsWithMetadataRequest {
  /** The architecture type. */
  ArchitectureTypes?: 'i386' | 'x86_64' | 'arm64' | 'x86_64_mac' | 'arm64_mac'[];
  /** The virtualization type. */
  VirtualizationTypes?: 'hvm' | 'paravirtual'[];
  /** The attributes for the instance types. When you specify instance attributes, Amazon EC2 will identify instance types with those attributes. */
  InstanceRequirements?: InstanceRequirementsRequest;
}

export interface ClientData {
  /** A user-defined comment about the disk upload. */
  Comment?: string;
  /** The time that the disk upload ends. */
  UploadEnd?: string;
  /** The size of the uploaded disk image, in GiB. */
  UploadSize?: number;
  /** The time that the disk upload starts. */
  UploadStart?: string;
}

export interface ImageDiskContainer {
  /** The description of the disk image. */
  Description?: string;
  /** The block device mapping for the disk. */
  DeviceName?: string;
  /** The format of the disk image being imported. Valid values: OVA | VHD | VHDX | VMDK | RAW */
  Format?: string;
  /** The ID of the EBS snapshot to be used for importing the snapshot. */
  SnapshotId?: string;
  /** The URL to the Amazon S3-based disk image being imported. The URL can either be a https URL (https://..) or an Amazon S3 URL (s3://..) */
  Url?: string;
  /** The S3 bucket for the disk image. */
  UserBucket?: any;
}

export interface ImportImageLicenseConfigurationRequest {
  /** The ARN of a license configuration. */
  LicenseConfigurationArn?: string;
}

export interface UserData {
  /** The user data. If you are using an Amazon Web Services SDK or command line tool, Base64-encoding is performed for you, and you can load the text from a file. Otherwise, you must provide Base64-encoded */
  Data?: string;
}

export interface Placement {
  /** The ID of the Availability Zone of the instance. On input, you can specify AvailabilityZone or AvailabilityZoneId, but not both. If you specify neither one, Amazon EC2 automatically selects an Availab */
  AvailabilityZoneId?: string;
  /** The affinity setting for the instance on the Dedicated Host. This parameter is not supported for CreateFleet or ImportInstance. */
  Affinity?: string;
  /** The name of the placement group that the instance is in. On input, you can specify GroupId or GroupName, but not both. */
  GroupName?: string;
  /** The number of the partition that the instance is in. Valid only if the placement group strategy is set to partition. This parameter is not supported for CreateFleet. */
  PartitionNumber?: number;
  /** The ID of the Dedicated Host on which the instance resides. This parameter is not supported for CreateFleet or ImportInstance. */
  HostId?: string;
  /** The tenancy of the instance. An instance with a tenancy of dedicated runs on single-tenant hardware. This parameter is not supported for CreateFleet. The host tenancy is not supported for ImportInstan */
  Tenancy?: 'default' | 'dedicated' | 'host';
  /** Reserved for future use. */
  SpreadDomain?: string;
  /** The ARN of the host resource group in which to launch the instances. On input, if you specify this parameter, either omit the Tenancy parameter or set it to host. This parameter is not supported for C */
  HostResourceGroupArn?: string;
  /** The ID of the placement group that the instance is in. On input, you can specify GroupId or GroupName, but not both. */
  GroupId?: string;
  /** The Availability Zone of the instance. On input, you can specify AvailabilityZone or AvailabilityZoneId, but not both. If you specify neither one, Amazon EC2 automatically selects an Availability Zone */
  AvailabilityZone?: string;
}

export interface ImportInstanceLaunchSpecification {
  /** The architecture of the instance. */
  Architecture?: 'i386' | 'x86_64' | 'arm64' | 'x86_64_mac' | 'arm64_mac';
  /** The security group names. */
  GroupNames?: string[];
  /** The security group IDs. */
  GroupIds?: string[];
  /** Reserved. */
  AdditionalInfo?: string;
  /** The Base64-encoded user data to make available to the instance. */
  UserData?: UserData;
  /** The instance type. For more information about the instance types that you can import, see Instance Types in the VM Import/Export User Guide. */
  InstanceType?: 'a1.medium' | 'a1.large' | 'a1.xlarge' | 'a1.2xlarge' | 'a1.4xlarge' | 'a1.metal' | 'c1.medium' | 'c1.xlarge' | 'c3.large' | 'c3.xlarge' | 'c3.2xlarge' | 'c3.4xlarge' | 'c3.8xlarge' | 'c4.large' | 'c4.xlarge' | 'c4.2xlarge' | 'c4.4xlarge' | 'c4.8xlarge' | 'c5.large' | 'c5.xlarge' | 'c5.2xlarge' | 'c5.4xlarge' | 'c5.9xlarge' | 'c5.12xlarge' | 'c5.18xlarge' | 'c5.24xlarge' | 'c5.metal' | 'c5a.large' | 'c5a.xlarge' | 'c5a.2xlarge' | 'c5a.4xlarge' | 'c5a.8xlarge' | 'c5a.12xlarge' | 'c5a.16xlarge' | 'c5a.24xlarge' | 'c5ad.large' | 'c5ad.xlarge' | 'c5ad.2xlarge' | 'c5ad.4xlarge' | 'c5ad.8xlarge' | 'c5ad.12xlarge' | 'c5ad.16xlarge' | 'c5ad.24xlarge' | 'c5d.large' | 'c5d.xlarge' | 'c5d.2xlarge' | 'c5d.4xlarge' | 'c5d.9xlarge' | 'c5d.12xlarge' | 'c5d.18xlarge' | 'c5d.24xlarge' | 'c5d.metal' | 'c5n.large' | 'c5n.xlarge' | 'c5n.2xlarge' | 'c5n.4xlarge' | 'c5n.9xlarge' | 'c5n.18xlarge' | 'c5n.metal' | 'c6g.medium' | 'c6g.large' | 'c6g.xlarge' | 'c6g.2xlarge' | 'c6g.4xlarge' | 'c6g.8xlarge' | 'c6g.12xlarge' | 'c6g.16xlarge' | 'c6g.metal' | 'c6gd.medium' | 'c6gd.large' | 'c6gd.xlarge' | 'c6gd.2xlarge' | 'c6gd.4xlarge' | 'c6gd.8xlarge' | 'c6gd.12xlarge' | 'c6gd.16xlarge' | 'c6gd.metal' | 'c6gn.medium' | 'c6gn.large' | 'c6gn.xlarge' | 'c6gn.2xlarge' | 'c6gn.4xlarge' | 'c6gn.8xlarge' | 'c6gn.12xlarge' | 'c6gn.16xlarge' | 'c6i.large' | 'c6i.xlarge' | 'c6i.2xlarge' | 'c6i.4xlarge' | 'c6i.8xlarge' | 'c6i.12xlarge' | 'c6i.16xlarge' | 'c6i.24xlarge' | 'c6i.32xlarge' | 'c6i.metal' | 'cc1.4xlarge' | 'cc2.8xlarge' | 'cg1.4xlarge' | 'cr1.8xlarge' | 'd2.xlarge' | 'd2.2xlarge' | 'd2.4xlarge' | 'd2.8xlarge' | 'd3.xlarge' | 'd3.2xlarge' | 'd3.4xlarge' | 'd3.8xlarge' | 'd3en.xlarge' | 'd3en.2xlarge' | 'd3en.4xlarge' | 'd3en.6xlarge' | 'd3en.8xlarge' | 'd3en.12xlarge' | 'dl1.24xlarge' | 'f1.2xlarge' | 'f1.4xlarge' | 'f1.16xlarge' | 'g2.2xlarge' | 'g2.8xlarge' | 'g3.4xlarge' | 'g3.8xlarge' | 'g3.16xlarge' | 'g3s.xlarge' | 'g4ad.xlarge' | 'g4ad.2xlarge' | 'g4ad.4xlarge' | 'g4ad.8xlarge' | 'g4ad.16xlarge' | 'g4dn.xlarge' | 'g4dn.2xlarge' | 'g4dn.4xlarge' | 'g4dn.8xlarge' | 'g4dn.12xlarge' | 'g4dn.16xlarge' | 'g4dn.metal' | 'g5.xlarge' | 'g5.2xlarge' | 'g5.4xlarge' | 'g5.8xlarge' | 'g5.12xlarge' | 'g5.16xlarge' | 'g5.24xlarge' | 'g5.48xlarge' | 'g5g.xlarge' | 'g5g.2xlarge' | 'g5g.4xlarge' | 'g5g.8xlarge' | 'g5g.16xlarge' | 'g5g.metal' | 'hi1.4xlarge' | 'hpc6a.48xlarge' | 'hs1.8xlarge' | 'h1.2xlarge' | 'h1.4xlarge' | 'h1.8xlarge' | 'h1.16xlarge' | 'i2.xlarge' | 'i2.2xlarge' | 'i2.4xlarge' | 'i2.8xlarge' | 'i3.large' | 'i3.xlarge' | 'i3.2xlarge' | 'i3.4xlarge' | 'i3.8xlarge' | 'i3.16xlarge' | 'i3.metal' | 'i3en.large' | 'i3en.xlarge' | 'i3en.2xlarge' | 'i3en.3xlarge' | 'i3en.6xlarge' | 'i3en.12xlarge' | 'i3en.24xlarge' | 'i3en.metal' | 'im4gn.large' | 'im4gn.xlarge' | 'im4gn.2xlarge' | 'im4gn.4xlarge' | 'im4gn.8xlarge' | 'im4gn.16xlarge' | 'inf1.xlarge' | 'inf1.2xlarge' | 'inf1.6xlarge' | 'inf1.24xlarge' | 'is4gen.medium' | 'is4gen.large' | 'is4gen.xlarge' | 'is4gen.2xlarge' | 'is4gen.4xlarge' | 'is4gen.8xlarge' | 'm1.small' | 'm1.medium' | 'm1.large' | 'm1.xlarge' | 'm2.xlarge' | 'm2.2xlarge' | 'm2.4xlarge' | 'm3.medium' | 'm3.large' | 'm3.xlarge' | 'm3.2xlarge' | 'm4.large' | 'm4.xlarge' | 'm4.2xlarge' | 'm4.4xlarge' | 'm4.10xlarge' | 'm4.16xlarge' | 'm5.large' | 'm5.xlarge' | 'm5.2xlarge' | 'm5.4xlarge' | 'm5.8xlarge' | 'm5.12xlarge' | 'm5.16xlarge' | 'm5.24xlarge' | 'm5.metal' | 'm5a.large' | 'm5a.xlarge' | 'm5a.2xlarge' | 'm5a.4xlarge' | 'm5a.8xlarge' | 'm5a.12xlarge' | 'm5a.16xlarge' | 'm5a.24xlarge' | 'm5ad.large' | 'm5ad.xlarge' | 'm5ad.2xlarge' | 'm5ad.4xlarge' | 'm5ad.8xlarge' | 'm5ad.12xlarge' | 'm5ad.16xlarge' | 'm5ad.24xlarge' | 'm5d.large' | 'm5d.xlarge' | 'm5d.2xlarge' | 'm5d.4xlarge' | 'm5d.8xlarge' | 'm5d.12xlarge' | 'm5d.16xlarge' | 'm5d.24xlarge' | 'm5d.metal' | 'm5dn.large' | 'm5dn.xlarge' | 'm5dn.2xlarge' | 'm5dn.4xlarge' | 'm5dn.8xlarge' | 'm5dn.12xlarge' | 'm5dn.16xlarge' | 'm5dn.24xlarge' | 'm5dn.metal' | 'm5n.large' | 'm5n.xlarge' | 'm5n.2xlarge' | 'm5n.4xlarge' | 'm5n.8xlarge' | 'm5n.12xlarge' | 'm5n.16xlarge' | 'm5n.24xlarge' | 'm5n.metal' | 'm5zn.large' | 'm5zn.xlarge' | 'm5zn.2xlarge' | 'm5zn.3xlarge' | 'm5zn.6xlarge' | 'm5zn.12xlarge' | 'm5zn.metal' | 'm6a.large' | 'm6a.xlarge' | 'm6a.2xlarge' | 'm6a.4xlarge' | 'm6a.8xlarge' | 'm6a.12xlarge' | 'm6a.16xlarge' | 'm6a.24xlarge' | 'm6a.32xlarge' | 'm6a.48xlarge' | 'm6g.metal' | 'm6g.medium' | 'm6g.large' | 'm6g.xlarge' | 'm6g.2xlarge' | 'm6g.4xlarge' | 'm6g.8xlarge' | 'm6g.12xlarge' | 'm6g.16xlarge' | 'm6gd.metal' | 'm6gd.medium' | 'm6gd.large' | 'm6gd.xlarge' | 'm6gd.2xlarge' | 'm6gd.4xlarge' | 'm6gd.8xlarge' | 'm6gd.12xlarge' | 'm6gd.16xlarge' | 'm6i.large' | 'm6i.xlarge' | 'm6i.2xlarge' | 'm6i.4xlarge' | 'm6i.8xlarge' | 'm6i.12xlarge' | 'm6i.16xlarge' | 'm6i.24xlarge' | 'm6i.32xlarge' | 'm6i.metal' | 'mac1.metal' | 'p2.xlarge' | 'p2.8xlarge' | 'p2.16xlarge' | 'p3.2xlarge' | 'p3.8xlarge' | 'p3.16xlarge' | 'p3dn.24xlarge' | 'p4d.24xlarge' | 'r3.large' | 'r3.xlarge' | 'r3.2xlarge' | 'r3.4xlarge' | 'r3.8xlarge' | 'r4.large' | 'r4.xlarge' | 'r4.2xlarge' | 'r4.4xlarge' | 'r4.8xlarge' | 'r4.16xlarge' | 'r5.large' | 'r5.xlarge' | 'r5.2xlarge' | 'r5.4xlarge' | 'r5.8xlarge' | 'r5.12xlarge' | 'r5.16xlarge' | 'r5.24xlarge' | 'r5.metal' | 'r5a.large' | 'r5a.xlarge' | 'r5a.2xlarge' | 'r5a.4xlarge' | 'r5a.8xlarge' | 'r5a.12xlarge' | 'r5a.16xlarge' | 'r5a.24xlarge' | 'r5ad.large' | 'r5ad.xlarge' | 'r5ad.2xlarge' | 'r5ad.4xlarge' | 'r5ad.8xlarge' | 'r5ad.12xlarge' | 'r5ad.16xlarge' | 'r5ad.24xlarge' | 'r5b.large' | 'r5b.xlarge' | 'r5b.2xlarge' | 'r5b.4xlarge' | 'r5b.8xlarge' | 'r5b.12xlarge' | 'r5b.16xlarge' | 'r5b.24xlarge' | 'r5b.metal' | 'r5d.large' | 'r5d.xlarge' | 'r5d.2xlarge' | 'r5d.4xlarge' | 'r5d.8xlarge' | 'r5d.12xlarge' | 'r5d.16xlarge' | 'r5d.24xlarge' | 'r5d.metal' | 'r5dn.large' | 'r5dn.xlarge' | 'r5dn.2xlarge' | 'r5dn.4xlarge' | 'r5dn.8xlarge' | 'r5dn.12xlarge' | 'r5dn.16xlarge' | 'r5dn.24xlarge' | 'r5dn.metal' | 'r5n.large' | 'r5n.xlarge' | 'r5n.2xlarge' | 'r5n.4xlarge' | 'r5n.8xlarge' | 'r5n.12xlarge' | 'r5n.16xlarge' | 'r5n.24xlarge' | 'r5n.metal' | 'r6g.medium' | 'r6g.large' | 'r6g.xlarge' | 'r6g.2xlarge' | 'r6g.4xlarge' | 'r6g.8xlarge' | 'r6g.12xlarge' | 'r6g.16xlarge' | 'r6g.metal' | 'r6gd.medium' | 'r6gd.large' | 'r6gd.xlarge' | 'r6gd.2xlarge' | 'r6gd.4xlarge' | 'r6gd.8xlarge' | 'r6gd.12xlarge' | 'r6gd.16xlarge' | 'r6gd.metal' | 'r6i.large' | 'r6i.xlarge' | 'r6i.2xlarge' | 'r6i.4xlarge' | 'r6i.8xlarge' | 'r6i.12xlarge' | 'r6i.16xlarge' | 'r6i.24xlarge' | 'r6i.32xlarge' | 'r6i.metal' | 't1.micro' | 't2.nano' | 't2.micro' | 't2.small' | 't2.medium' | 't2.large' | 't2.xlarge' | 't2.2xlarge' | 't3.nano' | 't3.micro' | 't3.small' | 't3.medium' | 't3.large' | 't3.xlarge' | 't3.2xlarge' | 't3a.nano' | 't3a.micro' | 't3a.small' | 't3a.medium' | 't3a.large' | 't3a.xlarge' | 't3a.2xlarge' | 't4g.nano' | 't4g.micro' | 't4g.small' | 't4g.medium' | 't4g.large' | 't4g.xlarge' | 't4g.2xlarge' | 'u-6tb1.56xlarge' | 'u-6tb1.112xlarge' | 'u-9tb1.112xlarge' | 'u-12tb1.112xlarge' | 'u-6tb1.metal' | 'u-9tb1.metal' | 'u-12tb1.metal' | 'u-18tb1.metal' | 'u-24tb1.metal' | 'vt1.3xlarge' | 'vt1.6xlarge' | 'vt1.24xlarge' | 'x1.16xlarge' | 'x1.32xlarge' | 'x1e.xlarge' | 'x1e.2xlarge' | 'x1e.4xlarge' | 'x1e.8xlarge' | 'x1e.16xlarge' | 'x1e.32xlarge' | 'x2iezn.2xlarge' | 'x2iezn.4xlarge' | 'x2iezn.6xlarge' | 'x2iezn.8xlarge' | 'x2iezn.12xlarge' | 'x2iezn.metal' | 'x2gd.medium' | 'x2gd.large' | 'x2gd.xlarge' | 'x2gd.2xlarge' | 'x2gd.4xlarge' | 'x2gd.8xlarge' | 'x2gd.12xlarge' | 'x2gd.16xlarge' | 'x2gd.metal' | 'z1d.large' | 'z1d.xlarge' | 'z1d.2xlarge' | 'z1d.3xlarge' | 'z1d.6xlarge' | 'z1d.12xlarge' | 'z1d.metal' | 'x2idn.16xlarge' | 'x2idn.24xlarge' | 'x2idn.32xlarge' | 'x2iedn.xlarge' | 'x2iedn.2xlarge' | 'x2iedn.4xlarge' | 'x2iedn.8xlarge' | 'x2iedn.16xlarge' | 'x2iedn.24xlarge' | 'x2iedn.32xlarge' | 'c6a.large' | 'c6a.xlarge' | 'c6a.2xlarge' | 'c6a.4xlarge' | 'c6a.8xlarge' | 'c6a.12xlarge' | 'c6a.16xlarge' | 'c6a.24xlarge' | 'c6a.32xlarge' | 'c6a.48xlarge' | 'c6a.metal' | 'm6a.metal' | 'i4i.large' | 'i4i.xlarge' | 'i4i.2xlarge' | 'i4i.4xlarge' | 'i4i.8xlarge' | 'i4i.16xlarge' | 'i4i.32xlarge' | 'i4i.metal' | 'x2idn.metal' | 'x2iedn.metal' | 'c7g.medium' | 'c7g.large' | 'c7g.xlarge' | 'c7g.2xlarge' | 'c7g.4xlarge' | 'c7g.8xlarge' | 'c7g.12xlarge' | 'c7g.16xlarge' | 'mac2.metal' | 'c6id.large' | 'c6id.xlarge' | 'c6id.2xlarge' | 'c6id.4xlarge' | 'c6id.8xlarge' | 'c6id.12xlarge' | 'c6id.16xlarge' | 'c6id.24xlarge' | 'c6id.32xlarge' | 'c6id.metal' | 'm6id.large' | 'm6id.xlarge' | 'm6id.2xlarge' | 'm6id.4xlarge' | 'm6id.8xlarge' | 'm6id.12xlarge' | 'm6id.16xlarge' | 'm6id.24xlarge' | 'm6id.32xlarge' | 'm6id.metal' | 'r6id.large' | 'r6id.xlarge' | 'r6id.2xlarge' | 'r6id.4xlarge' | 'r6id.8xlarge' | 'r6id.12xlarge' | 'r6id.16xlarge' | 'r6id.24xlarge' | 'r6id.32xlarge' | 'r6id.metal' | 'r6a.large' | 'r6a.xlarge' | 'r6a.2xlarge' | 'r6a.4xlarge' | 'r6a.8xlarge' | 'r6a.12xlarge' | 'r6a.16xlarge' | 'r6a.24xlarge' | 'r6a.32xlarge' | 'r6a.48xlarge' | 'r6a.metal' | 'p4de.24xlarge' | 'u-3tb1.56xlarge' | 'u-18tb1.112xlarge' | 'u-24tb1.112xlarge' | 'trn1.2xlarge' | 'trn1.32xlarge' | 'hpc6id.32xlarge' | 'c6in.large' | 'c6in.xlarge' | 'c6in.2xlarge' | 'c6in.4xlarge' | 'c6in.8xlarge' | 'c6in.12xlarge' | 'c6in.16xlarge' | 'c6in.24xlarge' | 'c6in.32xlarge' | 'm6in.large' | 'm6in.xlarge' | 'm6in.2xlarge' | 'm6in.4xlarge' | 'm6in.8xlarge' | 'm6in.12xlarge' | 'm6in.16xlarge' | 'm6in.24xlarge' | 'm6in.32xlarge' | 'm6idn.large' | 'm6idn.xlarge' | 'm6idn.2xlarge' | 'm6idn.4xlarge' | 'm6idn.8xlarge' | 'm6idn.12xlarge' | 'm6idn.16xlarge' | 'm6idn.24xlarge' | 'm6idn.32xlarge' | 'r6in.large' | 'r6in.xlarge' | 'r6in.2xlarge' | 'r6in.4xlarge' | 'r6in.8xlarge' | 'r6in.12xlarge' | 'r6in.16xlarge' | 'r6in.24xlarge' | 'r6in.32xlarge' | 'r6idn.large' | 'r6idn.xlarge' | 'r6idn.2xlarge' | 'r6idn.4xlarge' | 'r6idn.8xlarge' | 'r6idn.12xlarge' | 'r6idn.16xlarge' | 'r6idn.24xlarge' | 'r6idn.32xlarge' | 'c7g.metal' | 'm7g.medium' | 'm7g.large' | 'm7g.xlarge' | 'm7g.2xlarge' | 'm7g.4xlarge' | 'm7g.8xlarge' | 'm7g.12xlarge' | 'm7g.16xlarge' | 'm7g.metal' | 'r7g.medium' | 'r7g.large' | 'r7g.xlarge' | 'r7g.2xlarge' | 'r7g.4xlarge' | 'r7g.8xlarge' | 'r7g.12xlarge' | 'r7g.16xlarge' | 'r7g.metal' | 'c6in.metal' | 'm6in.metal' | 'm6idn.metal' | 'r6in.metal' | 'r6idn.metal' | 'inf2.xlarge' | 'inf2.8xlarge' | 'inf2.24xlarge' | 'inf2.48xlarge' | 'trn1n.32xlarge' | 'i4g.large' | 'i4g.xlarge' | 'i4g.2xlarge' | 'i4g.4xlarge' | 'i4g.8xlarge' | 'i4g.16xlarge' | 'hpc7g.4xlarge' | 'hpc7g.8xlarge' | 'hpc7g.16xlarge' | 'c7gn.medium' | 'c7gn.large' | 'c7gn.xlarge' | 'c7gn.2xlarge' | 'c7gn.4xlarge' | 'c7gn.8xlarge' | 'c7gn.12xlarge' | 'c7gn.16xlarge' | 'p5.48xlarge' | 'm7i.large' | 'm7i.xlarge' | 'm7i.2xlarge' | 'm7i.4xlarge' | 'm7i.8xlarge' | 'm7i.12xlarge' | 'm7i.16xlarge' | 'm7i.24xlarge' | 'm7i.48xlarge' | 'm7i-flex.large' | 'm7i-flex.xlarge' | 'm7i-flex.2xlarge' | 'm7i-flex.4xlarge' | 'm7i-flex.8xlarge' | 'm7a.medium' | 'm7a.large' | 'm7a.xlarge' | 'm7a.2xlarge' | 'm7a.4xlarge' | 'm7a.8xlarge' | 'm7a.12xlarge' | 'm7a.16xlarge' | 'm7a.24xlarge' | 'm7a.32xlarge' | 'm7a.48xlarge' | 'm7a.metal-48xl' | 'hpc7a.12xlarge' | 'hpc7a.24xlarge' | 'hpc7a.48xlarge' | 'hpc7a.96xlarge' | 'c7gd.medium' | 'c7gd.large' | 'c7gd.xlarge' | 'c7gd.2xlarge' | 'c7gd.4xlarge' | 'c7gd.8xlarge' | 'c7gd.12xlarge' | 'c7gd.16xlarge' | 'm7gd.medium' | 'm7gd.large' | 'm7gd.xlarge' | 'm7gd.2xlarge' | 'm7gd.4xlarge' | 'm7gd.8xlarge' | 'm7gd.12xlarge' | 'm7gd.16xlarge' | 'r7gd.medium' | 'r7gd.large' | 'r7gd.xlarge' | 'r7gd.2xlarge' | 'r7gd.4xlarge' | 'r7gd.8xlarge' | 'r7gd.12xlarge' | 'r7gd.16xlarge' | 'r7a.medium' | 'r7a.large' | 'r7a.xlarge' | 'r7a.2xlarge' | 'r7a.4xlarge' | 'r7a.8xlarge' | 'r7a.12xlarge' | 'r7a.16xlarge' | 'r7a.24xlarge' | 'r7a.32xlarge' | 'r7a.48xlarge' | 'c7i.large' | 'c7i.xlarge' | 'c7i.2xlarge' | 'c7i.4xlarge' | 'c7i.8xlarge' | 'c7i.12xlarge' | 'c7i.16xlarge' | 'c7i.24xlarge' | 'c7i.48xlarge' | 'mac2-m2pro.metal' | 'r7iz.large' | 'r7iz.xlarge' | 'r7iz.2xlarge' | 'r7iz.4xlarge' | 'r7iz.8xlarge' | 'r7iz.12xlarge' | 'r7iz.16xlarge' | 'r7iz.32xlarge' | 'c7a.medium' | 'c7a.large' | 'c7a.xlarge' | 'c7a.2xlarge' | 'c7a.4xlarge' | 'c7a.8xlarge' | 'c7a.12xlarge' | 'c7a.16xlarge' | 'c7a.24xlarge' | 'c7a.32xlarge' | 'c7a.48xlarge' | 'c7a.metal-48xl' | 'r7a.metal-48xl' | 'r7i.large' | 'r7i.xlarge' | 'r7i.2xlarge' | 'r7i.4xlarge' | 'r7i.8xlarge' | 'r7i.12xlarge' | 'r7i.16xlarge' | 'r7i.24xlarge' | 'r7i.48xlarge' | 'dl2q.24xlarge' | 'mac2-m2.metal' | 'i4i.12xlarge' | 'i4i.24xlarge' | 'c7i.metal-24xl' | 'c7i.metal-48xl' | 'm7i.metal-24xl' | 'm7i.metal-48xl' | 'r7i.metal-24xl' | 'r7i.metal-48xl' | 'r7iz.metal-16xl' | 'r7iz.metal-32xl' | 'c7gd.metal' | 'm7gd.metal' | 'r7gd.metal' | 'g6.xlarge' | 'g6.2xlarge' | 'g6.4xlarge' | 'g6.8xlarge' | 'g6.12xlarge' | 'g6.16xlarge' | 'g6.24xlarge' | 'g6.48xlarge' | 'gr6.4xlarge' | 'gr6.8xlarge' | 'c7i-flex.large' | 'c7i-flex.xlarge' | 'c7i-flex.2xlarge' | 'c7i-flex.4xlarge' | 'c7i-flex.8xlarge' | 'u7i-12tb.224xlarge' | 'u7in-16tb.224xlarge' | 'u7in-24tb.224xlarge' | 'u7in-32tb.224xlarge' | 'u7ib-12tb.224xlarge' | 'c7gn.metal' | 'r8g.medium' | 'r8g.large' | 'r8g.xlarge' | 'r8g.2xlarge' | 'r8g.4xlarge' | 'r8g.8xlarge' | 'r8g.12xlarge' | 'r8g.16xlarge' | 'r8g.24xlarge' | 'r8g.48xlarge' | 'r8g.metal-24xl' | 'r8g.metal-48xl' | 'mac2-m1ultra.metal' | 'g6e.xlarge' | 'g6e.2xlarge' | 'g6e.4xlarge' | 'g6e.8xlarge' | 'g6e.12xlarge' | 'g6e.16xlarge' | 'g6e.24xlarge' | 'g6e.48xlarge' | 'c8g.medium' | 'c8g.large' | 'c8g.xlarge' | 'c8g.2xlarge' | 'c8g.4xlarge' | 'c8g.8xlarge' | 'c8g.12xlarge' | 'c8g.16xlarge' | 'c8g.24xlarge' | 'c8g.48xlarge' | 'c8g.metal-24xl' | 'c8g.metal-48xl' | 'm8g.medium' | 'm8g.large' | 'm8g.xlarge' | 'm8g.2xlarge' | 'm8g.4xlarge' | 'm8g.8xlarge' | 'm8g.12xlarge' | 'm8g.16xlarge' | 'm8g.24xlarge' | 'm8g.48xlarge' | 'm8g.metal-24xl' | 'm8g.metal-48xl' | 'x8g.medium' | 'x8g.large' | 'x8g.xlarge' | 'x8g.2xlarge' | 'x8g.4xlarge' | 'x8g.8xlarge' | 'x8g.12xlarge' | 'x8g.16xlarge' | 'x8g.24xlarge' | 'x8g.48xlarge' | 'x8g.metal-24xl' | 'x8g.metal-48xl' | 'i7ie.large' | 'i7ie.xlarge' | 'i7ie.2xlarge' | 'i7ie.3xlarge' | 'i7ie.6xlarge' | 'i7ie.12xlarge' | 'i7ie.18xlarge' | 'i7ie.24xlarge' | 'i7ie.48xlarge' | 'i8g.large' | 'i8g.xlarge' | 'i8g.2xlarge' | 'i8g.4xlarge' | 'i8g.8xlarge' | 'i8g.12xlarge' | 'i8g.16xlarge' | 'i8g.24xlarge' | 'i8g.metal-24xl' | 'u7i-6tb.112xlarge' | 'u7i-8tb.112xlarge' | 'u7inh-32tb.480xlarge' | 'p5e.48xlarge' | 'p5en.48xlarge' | 'f2.12xlarge' | 'f2.48xlarge' | 'trn2.48xlarge' | 'c7i-flex.12xlarge' | 'c7i-flex.16xlarge' | 'm7i-flex.12xlarge' | 'm7i-flex.16xlarge' | 'i7ie.metal-24xl' | 'i7ie.metal-48xl' | 'i8g.48xlarge' | 'c8gd.medium' | 'c8gd.large' | 'c8gd.xlarge' | 'c8gd.2xlarge' | 'c8gd.4xlarge' | 'c8gd.8xlarge' | 'c8gd.12xlarge' | 'c8gd.16xlarge' | 'c8gd.24xlarge' | 'c8gd.48xlarge' | 'c8gd.metal-24xl' | 'c8gd.metal-48xl' | 'i7i.large' | 'i7i.xlarge' | 'i7i.2xlarge' | 'i7i.4xlarge' | 'i7i.8xlarge' | 'i7i.12xlarge' | 'i7i.16xlarge' | 'i7i.24xlarge' | 'i7i.48xlarge' | 'i7i.metal-24xl' | 'i7i.metal-48xl' | 'p6-b200.48xlarge' | 'm8gd.medium' | 'm8gd.large' | 'm8gd.xlarge' | 'm8gd.2xlarge' | 'm8gd.4xlarge' | 'm8gd.8xlarge' | 'm8gd.12xlarge' | 'm8gd.16xlarge' | 'm8gd.24xlarge' | 'm8gd.48xlarge' | 'm8gd.metal-24xl' | 'm8gd.metal-48xl' | 'r8gd.medium' | 'r8gd.large' | 'r8gd.xlarge' | 'r8gd.2xlarge' | 'r8gd.4xlarge' | 'r8gd.8xlarge' | 'r8gd.12xlarge' | 'r8gd.16xlarge' | 'r8gd.24xlarge' | 'r8gd.48xlarge' | 'r8gd.metal-24xl' | 'r8gd.metal-48xl' | 'c8gn.medium' | 'c8gn.large' | 'c8gn.xlarge' | 'c8gn.2xlarge' | 'c8gn.4xlarge' | 'c8gn.8xlarge' | 'c8gn.12xlarge' | 'c8gn.16xlarge' | 'c8gn.24xlarge' | 'c8gn.48xlarge' | 'c8gn.metal-24xl' | 'c8gn.metal-48xl' | 'f2.6xlarge' | 'p6e-gb200.36xlarge' | 'g6f.large' | 'g6f.xlarge' | 'g6f.2xlarge' | 'g6f.4xlarge' | 'gr6f.4xlarge' | 'p5.4xlarge' | 'r8i.large' | 'r8i.xlarge' | 'r8i.2xlarge' | 'r8i.4xlarge' | 'r8i.8xlarge' | 'r8i.12xlarge' | 'r8i.16xlarge' | 'r8i.24xlarge' | 'r8i.32xlarge' | 'r8i.48xlarge' | 'r8i.96xlarge' | 'r8i.metal-48xl' | 'r8i.metal-96xl' | 'r8i-flex.large' | 'r8i-flex.xlarge' | 'r8i-flex.2xlarge' | 'r8i-flex.4xlarge' | 'r8i-flex.8xlarge' | 'r8i-flex.12xlarge' | 'r8i-flex.16xlarge' | 'm8i.large' | 'm8i.xlarge' | 'm8i.2xlarge' | 'm8i.4xlarge' | 'm8i.8xlarge' | 'm8i.12xlarge' | 'm8i.16xlarge' | 'm8i.24xlarge' | 'm8i.32xlarge' | 'm8i.48xlarge' | 'm8i.96xlarge' | 'm8i.metal-48xl' | 'm8i.metal-96xl' | 'm8i-flex.large' | 'm8i-flex.xlarge' | 'm8i-flex.2xlarge' | 'm8i-flex.4xlarge' | 'm8i-flex.8xlarge' | 'm8i-flex.12xlarge' | 'm8i-flex.16xlarge' | 'i8ge.large' | 'i8ge.xlarge' | 'i8ge.2xlarge' | 'i8ge.3xlarge' | 'i8ge.6xlarge' | 'i8ge.12xlarge' | 'i8ge.18xlarge' | 'i8ge.24xlarge' | 'i8ge.48xlarge' | 'i8ge.metal-24xl' | 'i8ge.metal-48xl' | 'mac-m4.metal' | 'mac-m4pro.metal' | 'r8gn.medium' | 'r8gn.large' | 'r8gn.xlarge' | 'r8gn.2xlarge' | 'r8gn.4xlarge' | 'r8gn.8xlarge' | 'r8gn.12xlarge' | 'r8gn.16xlarge' | 'r8gn.24xlarge' | 'r8gn.48xlarge' | 'r8gn.metal-24xl' | 'r8gn.metal-48xl' | 'c8i.large' | 'c8i.xlarge' | 'c8i.2xlarge' | 'c8i.4xlarge' | 'c8i.8xlarge' | 'c8i.12xlarge' | 'c8i.16xlarge' | 'c8i.24xlarge' | 'c8i.32xlarge' | 'c8i.48xlarge' | 'c8i.96xlarge' | 'c8i.metal-48xl' | 'c8i.metal-96xl' | 'c8i-flex.large' | 'c8i-flex.xlarge' | 'c8i-flex.2xlarge' | 'c8i-flex.4xlarge' | 'c8i-flex.8xlarge' | 'c8i-flex.12xlarge' | 'c8i-flex.16xlarge' | 'r8gb.medium' | 'r8gb.large' | 'r8gb.xlarge' | 'r8gb.2xlarge' | 'r8gb.4xlarge' | 'r8gb.8xlarge' | 'r8gb.12xlarge' | 'r8gb.16xlarge' | 'r8gb.24xlarge' | 'r8gb.metal-24xl' | 'm8a.medium' | 'm8a.large' | 'm8a.xlarge' | 'm8a.2xlarge' | 'm8a.4xlarge' | 'm8a.8xlarge' | 'm8a.12xlarge' | 'm8a.16xlarge' | 'm8a.24xlarge' | 'm8a.48xlarge' | 'm8a.metal-24xl' | 'm8a.metal-48xl' | 'trn2.3xlarge' | 'r8a.medium' | 'r8a.large' | 'r8a.xlarge' | 'r8a.2xlarge' | 'r8a.4xlarge' | 'r8a.8xlarge' | 'r8a.12xlarge' | 'r8a.16xlarge' | 'r8a.24xlarge' | 'r8a.48xlarge' | 'r8a.metal-24xl' | 'r8a.metal-48xl' | 'p6-b300.48xlarge' | 'c8a.medium' | 'c8a.large' | 'c8a.xlarge' | 'c8a.2xlarge' | 'c8a.4xlarge' | 'c8a.8xlarge' | 'c8a.12xlarge' | 'c8a.16xlarge' | 'c8a.24xlarge' | 'c8a.48xlarge' | 'c8a.metal-24xl' | 'c8a.metal-48xl' | 'c8gb.12xlarge' | 'c8gb.16xlarge' | 'c8gb.24xlarge' | 'c8gb.2xlarge' | 'c8gb.4xlarge' | 'c8gb.8xlarge' | 'c8gb.large' | 'c8gb.medium' | 'c8gb.metal-24xl' | 'c8gb.xlarge' | 'c8gb.48xlarge' | 'c8gb.metal-48xl' | 'm8gb.12xlarge' | 'm8gb.16xlarge' | 'm8gb.24xlarge' | 'm8gb.2xlarge' | 'm8gb.4xlarge' | 'm8gb.8xlarge' | 'm8gb.large' | 'm8gb.medium' | 'm8gb.xlarge' | 'm8gb.48xlarge' | 'm8gb.metal-24xl' | 'm8gb.metal-48xl' | 'm8gn.12xlarge' | 'm8gn.16xlarge' | 'm8gn.24xlarge' | 'm8gn.2xlarge' | 'm8gn.48xlarge' | 'm8gn.4xlarge' | 'm8gn.8xlarge' | 'm8gn.large' | 'm8gn.medium' | 'm8gn.xlarge' | 'm8gn.metal-24xl' | 'm8gn.metal-48xl' | 'x8aedz.12xlarge' | 'x8aedz.24xlarge' | 'x8aedz.3xlarge' | 'x8aedz.6xlarge' | 'x8aedz.large' | 'x8aedz.metal-12xl' | 'x8aedz.metal-24xl' | 'x8aedz.xlarge' | 'm8azn.medium' | 'm8azn.large' | 'm8azn.xlarge' | 'm8azn.3xlarge' | 'm8azn.6xlarge' | 'm8azn.12xlarge' | 'm8azn.24xlarge' | 'm8azn.metal-12xl' | 'm8azn.metal-24xl' | 'x8i.large' | 'x8i.xlarge' | 'x8i.2xlarge' | 'x8i.4xlarge' | 'x8i.8xlarge' | 'x8i.12xlarge' | 'x8i.16xlarge' | 'x8i.24xlarge' | 'x8i.32xlarge' | 'x8i.48xlarge' | 'x8i.64xlarge' | 'x8i.96xlarge' | 'x8i.metal-48xl' | 'x8i.metal-96xl' | 'mac-m4max.metal' | 'g7e.2xlarge' | 'g7e.4xlarge' | 'g7e.8xlarge' | 'g7e.12xlarge' | 'g7e.24xlarge' | 'g7e.48xlarge' | 'r8id.large' | 'r8id.xlarge' | 'r8id.2xlarge' | 'r8id.4xlarge' | 'r8id.8xlarge' | 'r8id.12xlarge' | 'r8id.16xlarge' | 'r8id.24xlarge' | 'r8id.32xlarge' | 'r8id.48xlarge' | 'r8id.96xlarge' | 'r8id.metal-48xl' | 'r8id.metal-96xl';
  /** The placement information for the instance. */
  Placement?: Placement;
  /** Indicates whether monitoring is enabled. */
  Monitoring?: boolean;
  /** [EC2-VPC] The ID of the subnet in which to launch the instance. */
  SubnetId?: string;
  /** Indicates whether an instance stops or terminates when you initiate shutdown from the instance (using the operating system command for system shutdown). */
  InstanceInitiatedShutdownBehavior?: 'stop' | 'terminate';
  /** [EC2-VPC] An available IP address from the IP address range of the subnet. */
  PrivateIpAddress?: string;
}

export interface DiskImage {
  /** A description of the disk image. */
  Description?: string;
  /** Information about the disk image. */
  Image?: any;
  /** Information about the volume. */
  Volume?: any;
}

export interface UserBucket {
  /** The name of the Amazon S3 bucket where the disk image is located. */
  S3Bucket?: string;
  /** The file name of the disk image. */
  S3Key?: string;
}

export interface SnapshotDiskContainer {
  /** The description of the disk image being imported. */
  Description?: string;
  /** The format of the disk image being imported. Valid values: VHD | VMDK | RAW */
  Format?: string;
  /** The URL to the Amazon S3-based disk image being imported. It can either be a https URL (https://..) or an Amazon S3 URL (s3://..). */
  Url?: string;
  /** The Amazon S3 bucket for the disk image. */
  UserBucket?: UserBucket;
}

export interface DiskImageDetail {
  /** The disk image format. */
  Format: 'VMDK' | 'RAW' | 'VHD';
  /** The size of the disk image, in GiB. */
  Bytes: number;
  /** A presigned URL for the import manifest stored in Amazon S3 and presented here as an Amazon S3 presigned URL. For information about creating a presigned URL for an Amazon S3 object, read the "Query St */
  ImportManifestUrl: string;
}

export interface VolumeDetail {
  /** The size of the volume, in GiB. */
  Size: number;
}

export interface DnsServersOptionsModifyStructure {
  /** The IPv4 address range, in CIDR notation, of the DNS servers to be used. You can specify up to two DNS servers. Ensure that the DNS servers can be reached by the clients. The specified values overwrit */
  CustomDnsServers?: string[];
  /** Indicates whether DNS servers should be used. Specify False to delete the existing DNS servers. */
  Enabled?: boolean;
}

export interface LoadPermissionModifications {
  /** The load permissions to add. */
  Add?: any[];
  /** The load permissions to remove. */
  Remove?: any[];
}

export interface AttributeValue {
  /** The attribute value. The value is case-sensitive. */
  Value?: string;
}

export interface LaunchPermissionModifications {
  /** The Amazon Web Services account ID, organization ARN, or OU ARN to add to the list of launch permissions for the AMI. */
  Add?: any[];
  /** The Amazon Web Services account ID, organization ARN, or OU ARN to remove from the list of launch permissions for the AMI. */
  Remove?: any[];
}

export interface AttributeBooleanValue {
  /** The attribute value. The valid values are true or false. */
  Value?: boolean;
}

export interface InstanceBlockDeviceMappingSpecification {
  /** The device name. For available device names, see Device names for volumes. */
  DeviceName?: string;
  /** Parameters used to automatically set up EBS volumes when the instance is launched. */
  Ebs?: any;
  /** The virtual device name. */
  VirtualName?: string;
  /** Suppresses the specified device included in the block device mapping. */
  NoDevice?: string;
}

export interface BlobAttributeValue {
  Value?: string;
}

export interface CapacityReservationTarget {
  /** The ID of the Capacity Reservation in which to run the instance. */
  CapacityReservationId?: string;
  /** The ARN of the Capacity Reservation resource group in which to run the instance. */
  CapacityReservationResourceGroupArn?: string;
}

export interface CapacityReservationSpecification {
  /** Indicates the instance's Capacity Reservation preferences. Possible preferences include: capacity-reservations-only - The instance will only run in a Capacity Reservation or Capacity Reservation group */
  CapacityReservationPreference?: 'capacity-reservations-only' | 'open' | 'none';
  /** Information about the target Capacity Reservation or Capacity Reservation group. */
  CapacityReservationTarget?: CapacityReservationTarget;
}

export interface InstanceCreditSpecificationRequest {
  /** The ID of the instance. */
  InstanceId: string;
  /** The credit option for CPU usage of the instance. Valid values: standard | unlimited T3 instances with host tenancy do not support the unlimited CPU credit option. */
  CpuCredits?: string;
}

export interface RemoveIpamOperatingRegion {
  /** The name of the operating Region you want to remove. */
  RegionName?: string;
}

export interface IpamPolicyAllocationRuleRequest {
  /** The ID of the source IPAM pool for the requested allocation rule. An IPAM pool is a collection of IP addresses in IPAM that can be allocated to Amazon Web Services resources. */
  SourceIpamPoolId?: string;
}

export interface AddIpamOrganizationalUnitExclusion {
  /** An Amazon Web Services Organizations entity path. Build the path for the OU(s) using Amazon Web Services Organizations IDs separated by a /. Include all child OUs by ending the path with /*. Example 1 */
  OrganizationsEntityPath?: string;
}

export interface RemoveIpamOrganizationalUnitExclusion {
  /** An Amazon Web Services Organizations entity path. Build the path for the OU(s) using Amazon Web Services Organizations IDs separated by a /. Include all child OUs by ending the path with /*. Example 1 */
  OrganizationsEntityPath?: string;
}

export interface RemovePrefixListEntry {
  /** The CIDR block. */
  Cidr: string;
}

export interface NetworkInterfaceAttachmentChanges {
  /** The default number of the ENA queues. */
  DefaultEnaQueueCount?: boolean;
  /** The number of ENA queues to be created with the instance. */
  EnaQueueCount?: number;
  /** The ID of the network interface attachment. */
  AttachmentId?: string;
  /** Indicates whether the network interface is deleted when the instance is terminated. */
  DeleteOnTermination?: boolean;
}

export interface ReservedInstancesConfiguration {
  /** The Availability Zone for the modified Reserved Instances. */
  AvailabilityZone?: string;
  /** The number of modified Reserved Instances. This is a required field for a request. */
  InstanceCount?: number;
  /** The instance type for the modified Reserved Instances. */
  InstanceType?: 'a1.medium' | 'a1.large' | 'a1.xlarge' | 'a1.2xlarge' | 'a1.4xlarge' | 'a1.metal' | 'c1.medium' | 'c1.xlarge' | 'c3.large' | 'c3.xlarge' | 'c3.2xlarge' | 'c3.4xlarge' | 'c3.8xlarge' | 'c4.large' | 'c4.xlarge' | 'c4.2xlarge' | 'c4.4xlarge' | 'c4.8xlarge' | 'c5.large' | 'c5.xlarge' | 'c5.2xlarge' | 'c5.4xlarge' | 'c5.9xlarge' | 'c5.12xlarge' | 'c5.18xlarge' | 'c5.24xlarge' | 'c5.metal' | 'c5a.large' | 'c5a.xlarge' | 'c5a.2xlarge' | 'c5a.4xlarge' | 'c5a.8xlarge' | 'c5a.12xlarge' | 'c5a.16xlarge' | 'c5a.24xlarge' | 'c5ad.large' | 'c5ad.xlarge' | 'c5ad.2xlarge' | 'c5ad.4xlarge' | 'c5ad.8xlarge' | 'c5ad.12xlarge' | 'c5ad.16xlarge' | 'c5ad.24xlarge' | 'c5d.large' | 'c5d.xlarge' | 'c5d.2xlarge' | 'c5d.4xlarge' | 'c5d.9xlarge' | 'c5d.12xlarge' | 'c5d.18xlarge' | 'c5d.24xlarge' | 'c5d.metal' | 'c5n.large' | 'c5n.xlarge' | 'c5n.2xlarge' | 'c5n.4xlarge' | 'c5n.9xlarge' | 'c5n.18xlarge' | 'c5n.metal' | 'c6g.medium' | 'c6g.large' | 'c6g.xlarge' | 'c6g.2xlarge' | 'c6g.4xlarge' | 'c6g.8xlarge' | 'c6g.12xlarge' | 'c6g.16xlarge' | 'c6g.metal' | 'c6gd.medium' | 'c6gd.large' | 'c6gd.xlarge' | 'c6gd.2xlarge' | 'c6gd.4xlarge' | 'c6gd.8xlarge' | 'c6gd.12xlarge' | 'c6gd.16xlarge' | 'c6gd.metal' | 'c6gn.medium' | 'c6gn.large' | 'c6gn.xlarge' | 'c6gn.2xlarge' | 'c6gn.4xlarge' | 'c6gn.8xlarge' | 'c6gn.12xlarge' | 'c6gn.16xlarge' | 'c6i.large' | 'c6i.xlarge' | 'c6i.2xlarge' | 'c6i.4xlarge' | 'c6i.8xlarge' | 'c6i.12xlarge' | 'c6i.16xlarge' | 'c6i.24xlarge' | 'c6i.32xlarge' | 'c6i.metal' | 'cc1.4xlarge' | 'cc2.8xlarge' | 'cg1.4xlarge' | 'cr1.8xlarge' | 'd2.xlarge' | 'd2.2xlarge' | 'd2.4xlarge' | 'd2.8xlarge' | 'd3.xlarge' | 'd3.2xlarge' | 'd3.4xlarge' | 'd3.8xlarge' | 'd3en.xlarge' | 'd3en.2xlarge' | 'd3en.4xlarge' | 'd3en.6xlarge' | 'd3en.8xlarge' | 'd3en.12xlarge' | 'dl1.24xlarge' | 'f1.2xlarge' | 'f1.4xlarge' | 'f1.16xlarge' | 'g2.2xlarge' | 'g2.8xlarge' | 'g3.4xlarge' | 'g3.8xlarge' | 'g3.16xlarge' | 'g3s.xlarge' | 'g4ad.xlarge' | 'g4ad.2xlarge' | 'g4ad.4xlarge' | 'g4ad.8xlarge' | 'g4ad.16xlarge' | 'g4dn.xlarge' | 'g4dn.2xlarge' | 'g4dn.4xlarge' | 'g4dn.8xlarge' | 'g4dn.12xlarge' | 'g4dn.16xlarge' | 'g4dn.metal' | 'g5.xlarge' | 'g5.2xlarge' | 'g5.4xlarge' | 'g5.8xlarge' | 'g5.12xlarge' | 'g5.16xlarge' | 'g5.24xlarge' | 'g5.48xlarge' | 'g5g.xlarge' | 'g5g.2xlarge' | 'g5g.4xlarge' | 'g5g.8xlarge' | 'g5g.16xlarge' | 'g5g.metal' | 'hi1.4xlarge' | 'hpc6a.48xlarge' | 'hs1.8xlarge' | 'h1.2xlarge' | 'h1.4xlarge' | 'h1.8xlarge' | 'h1.16xlarge' | 'i2.xlarge' | 'i2.2xlarge' | 'i2.4xlarge' | 'i2.8xlarge' | 'i3.large' | 'i3.xlarge' | 'i3.2xlarge' | 'i3.4xlarge' | 'i3.8xlarge' | 'i3.16xlarge' | 'i3.metal' | 'i3en.large' | 'i3en.xlarge' | 'i3en.2xlarge' | 'i3en.3xlarge' | 'i3en.6xlarge' | 'i3en.12xlarge' | 'i3en.24xlarge' | 'i3en.metal' | 'im4gn.large' | 'im4gn.xlarge' | 'im4gn.2xlarge' | 'im4gn.4xlarge' | 'im4gn.8xlarge' | 'im4gn.16xlarge' | 'inf1.xlarge' | 'inf1.2xlarge' | 'inf1.6xlarge' | 'inf1.24xlarge' | 'is4gen.medium' | 'is4gen.large' | 'is4gen.xlarge' | 'is4gen.2xlarge' | 'is4gen.4xlarge' | 'is4gen.8xlarge' | 'm1.small' | 'm1.medium' | 'm1.large' | 'm1.xlarge' | 'm2.xlarge' | 'm2.2xlarge' | 'm2.4xlarge' | 'm3.medium' | 'm3.large' | 'm3.xlarge' | 'm3.2xlarge' | 'm4.large' | 'm4.xlarge' | 'm4.2xlarge' | 'm4.4xlarge' | 'm4.10xlarge' | 'm4.16xlarge' | 'm5.large' | 'm5.xlarge' | 'm5.2xlarge' | 'm5.4xlarge' | 'm5.8xlarge' | 'm5.12xlarge' | 'm5.16xlarge' | 'm5.24xlarge' | 'm5.metal' | 'm5a.large' | 'm5a.xlarge' | 'm5a.2xlarge' | 'm5a.4xlarge' | 'm5a.8xlarge' | 'm5a.12xlarge' | 'm5a.16xlarge' | 'm5a.24xlarge' | 'm5ad.large' | 'm5ad.xlarge' | 'm5ad.2xlarge' | 'm5ad.4xlarge' | 'm5ad.8xlarge' | 'm5ad.12xlarge' | 'm5ad.16xlarge' | 'm5ad.24xlarge' | 'm5d.large' | 'm5d.xlarge' | 'm5d.2xlarge' | 'm5d.4xlarge' | 'm5d.8xlarge' | 'm5d.12xlarge' | 'm5d.16xlarge' | 'm5d.24xlarge' | 'm5d.metal' | 'm5dn.large' | 'm5dn.xlarge' | 'm5dn.2xlarge' | 'm5dn.4xlarge' | 'm5dn.8xlarge' | 'm5dn.12xlarge' | 'm5dn.16xlarge' | 'm5dn.24xlarge' | 'm5dn.metal' | 'm5n.large' | 'm5n.xlarge' | 'm5n.2xlarge' | 'm5n.4xlarge' | 'm5n.8xlarge' | 'm5n.12xlarge' | 'm5n.16xlarge' | 'm5n.24xlarge' | 'm5n.metal' | 'm5zn.large' | 'm5zn.xlarge' | 'm5zn.2xlarge' | 'm5zn.3xlarge' | 'm5zn.6xlarge' | 'm5zn.12xlarge' | 'm5zn.metal' | 'm6a.large' | 'm6a.xlarge' | 'm6a.2xlarge' | 'm6a.4xlarge' | 'm6a.8xlarge' | 'm6a.12xlarge' | 'm6a.16xlarge' | 'm6a.24xlarge' | 'm6a.32xlarge' | 'm6a.48xlarge' | 'm6g.metal' | 'm6g.medium' | 'm6g.large' | 'm6g.xlarge' | 'm6g.2xlarge' | 'm6g.4xlarge' | 'm6g.8xlarge' | 'm6g.12xlarge' | 'm6g.16xlarge' | 'm6gd.metal' | 'm6gd.medium' | 'm6gd.large' | 'm6gd.xlarge' | 'm6gd.2xlarge' | 'm6gd.4xlarge' | 'm6gd.8xlarge' | 'm6gd.12xlarge' | 'm6gd.16xlarge' | 'm6i.large' | 'm6i.xlarge' | 'm6i.2xlarge' | 'm6i.4xlarge' | 'm6i.8xlarge' | 'm6i.12xlarge' | 'm6i.16xlarge' | 'm6i.24xlarge' | 'm6i.32xlarge' | 'm6i.metal' | 'mac1.metal' | 'p2.xlarge' | 'p2.8xlarge' | 'p2.16xlarge' | 'p3.2xlarge' | 'p3.8xlarge' | 'p3.16xlarge' | 'p3dn.24xlarge' | 'p4d.24xlarge' | 'r3.large' | 'r3.xlarge' | 'r3.2xlarge' | 'r3.4xlarge' | 'r3.8xlarge' | 'r4.large' | 'r4.xlarge' | 'r4.2xlarge' | 'r4.4xlarge' | 'r4.8xlarge' | 'r4.16xlarge' | 'r5.large' | 'r5.xlarge' | 'r5.2xlarge' | 'r5.4xlarge' | 'r5.8xlarge' | 'r5.12xlarge' | 'r5.16xlarge' | 'r5.24xlarge' | 'r5.metal' | 'r5a.large' | 'r5a.xlarge' | 'r5a.2xlarge' | 'r5a.4xlarge' | 'r5a.8xlarge' | 'r5a.12xlarge' | 'r5a.16xlarge' | 'r5a.24xlarge' | 'r5ad.large' | 'r5ad.xlarge' | 'r5ad.2xlarge' | 'r5ad.4xlarge' | 'r5ad.8xlarge' | 'r5ad.12xlarge' | 'r5ad.16xlarge' | 'r5ad.24xlarge' | 'r5b.large' | 'r5b.xlarge' | 'r5b.2xlarge' | 'r5b.4xlarge' | 'r5b.8xlarge' | 'r5b.12xlarge' | 'r5b.16xlarge' | 'r5b.24xlarge' | 'r5b.metal' | 'r5d.large' | 'r5d.xlarge' | 'r5d.2xlarge' | 'r5d.4xlarge' | 'r5d.8xlarge' | 'r5d.12xlarge' | 'r5d.16xlarge' | 'r5d.24xlarge' | 'r5d.metal' | 'r5dn.large' | 'r5dn.xlarge' | 'r5dn.2xlarge' | 'r5dn.4xlarge' | 'r5dn.8xlarge' | 'r5dn.12xlarge' | 'r5dn.16xlarge' | 'r5dn.24xlarge' | 'r5dn.metal' | 'r5n.large' | 'r5n.xlarge' | 'r5n.2xlarge' | 'r5n.4xlarge' | 'r5n.8xlarge' | 'r5n.12xlarge' | 'r5n.16xlarge' | 'r5n.24xlarge' | 'r5n.metal' | 'r6g.medium' | 'r6g.large' | 'r6g.xlarge' | 'r6g.2xlarge' | 'r6g.4xlarge' | 'r6g.8xlarge' | 'r6g.12xlarge' | 'r6g.16xlarge' | 'r6g.metal' | 'r6gd.medium' | 'r6gd.large' | 'r6gd.xlarge' | 'r6gd.2xlarge' | 'r6gd.4xlarge' | 'r6gd.8xlarge' | 'r6gd.12xlarge' | 'r6gd.16xlarge' | 'r6gd.metal' | 'r6i.large' | 'r6i.xlarge' | 'r6i.2xlarge' | 'r6i.4xlarge' | 'r6i.8xlarge' | 'r6i.12xlarge' | 'r6i.16xlarge' | 'r6i.24xlarge' | 'r6i.32xlarge' | 'r6i.metal' | 't1.micro' | 't2.nano' | 't2.micro' | 't2.small' | 't2.medium' | 't2.large' | 't2.xlarge' | 't2.2xlarge' | 't3.nano' | 't3.micro' | 't3.small' | 't3.medium' | 't3.large' | 't3.xlarge' | 't3.2xlarge' | 't3a.nano' | 't3a.micro' | 't3a.small' | 't3a.medium' | 't3a.large' | 't3a.xlarge' | 't3a.2xlarge' | 't4g.nano' | 't4g.micro' | 't4g.small' | 't4g.medium' | 't4g.large' | 't4g.xlarge' | 't4g.2xlarge' | 'u-6tb1.56xlarge' | 'u-6tb1.112xlarge' | 'u-9tb1.112xlarge' | 'u-12tb1.112xlarge' | 'u-6tb1.metal' | 'u-9tb1.metal' | 'u-12tb1.metal' | 'u-18tb1.metal' | 'u-24tb1.metal' | 'vt1.3xlarge' | 'vt1.6xlarge' | 'vt1.24xlarge' | 'x1.16xlarge' | 'x1.32xlarge' | 'x1e.xlarge' | 'x1e.2xlarge' | 'x1e.4xlarge' | 'x1e.8xlarge' | 'x1e.16xlarge' | 'x1e.32xlarge' | 'x2iezn.2xlarge' | 'x2iezn.4xlarge' | 'x2iezn.6xlarge' | 'x2iezn.8xlarge' | 'x2iezn.12xlarge' | 'x2iezn.metal' | 'x2gd.medium' | 'x2gd.large' | 'x2gd.xlarge' | 'x2gd.2xlarge' | 'x2gd.4xlarge' | 'x2gd.8xlarge' | 'x2gd.12xlarge' | 'x2gd.16xlarge' | 'x2gd.metal' | 'z1d.large' | 'z1d.xlarge' | 'z1d.2xlarge' | 'z1d.3xlarge' | 'z1d.6xlarge' | 'z1d.12xlarge' | 'z1d.metal' | 'x2idn.16xlarge' | 'x2idn.24xlarge' | 'x2idn.32xlarge' | 'x2iedn.xlarge' | 'x2iedn.2xlarge' | 'x2iedn.4xlarge' | 'x2iedn.8xlarge' | 'x2iedn.16xlarge' | 'x2iedn.24xlarge' | 'x2iedn.32xlarge' | 'c6a.large' | 'c6a.xlarge' | 'c6a.2xlarge' | 'c6a.4xlarge' | 'c6a.8xlarge' | 'c6a.12xlarge' | 'c6a.16xlarge' | 'c6a.24xlarge' | 'c6a.32xlarge' | 'c6a.48xlarge' | 'c6a.metal' | 'm6a.metal' | 'i4i.large' | 'i4i.xlarge' | 'i4i.2xlarge' | 'i4i.4xlarge' | 'i4i.8xlarge' | 'i4i.16xlarge' | 'i4i.32xlarge' | 'i4i.metal' | 'x2idn.metal' | 'x2iedn.metal' | 'c7g.medium' | 'c7g.large' | 'c7g.xlarge' | 'c7g.2xlarge' | 'c7g.4xlarge' | 'c7g.8xlarge' | 'c7g.12xlarge' | 'c7g.16xlarge' | 'mac2.metal' | 'c6id.large' | 'c6id.xlarge' | 'c6id.2xlarge' | 'c6id.4xlarge' | 'c6id.8xlarge' | 'c6id.12xlarge' | 'c6id.16xlarge' | 'c6id.24xlarge' | 'c6id.32xlarge' | 'c6id.metal' | 'm6id.large' | 'm6id.xlarge' | 'm6id.2xlarge' | 'm6id.4xlarge' | 'm6id.8xlarge' | 'm6id.12xlarge' | 'm6id.16xlarge' | 'm6id.24xlarge' | 'm6id.32xlarge' | 'm6id.metal' | 'r6id.large' | 'r6id.xlarge' | 'r6id.2xlarge' | 'r6id.4xlarge' | 'r6id.8xlarge' | 'r6id.12xlarge' | 'r6id.16xlarge' | 'r6id.24xlarge' | 'r6id.32xlarge' | 'r6id.metal' | 'r6a.large' | 'r6a.xlarge' | 'r6a.2xlarge' | 'r6a.4xlarge' | 'r6a.8xlarge' | 'r6a.12xlarge' | 'r6a.16xlarge' | 'r6a.24xlarge' | 'r6a.32xlarge' | 'r6a.48xlarge' | 'r6a.metal' | 'p4de.24xlarge' | 'u-3tb1.56xlarge' | 'u-18tb1.112xlarge' | 'u-24tb1.112xlarge' | 'trn1.2xlarge' | 'trn1.32xlarge' | 'hpc6id.32xlarge' | 'c6in.large' | 'c6in.xlarge' | 'c6in.2xlarge' | 'c6in.4xlarge' | 'c6in.8xlarge' | 'c6in.12xlarge' | 'c6in.16xlarge' | 'c6in.24xlarge' | 'c6in.32xlarge' | 'm6in.large' | 'm6in.xlarge' | 'm6in.2xlarge' | 'm6in.4xlarge' | 'm6in.8xlarge' | 'm6in.12xlarge' | 'm6in.16xlarge' | 'm6in.24xlarge' | 'm6in.32xlarge' | 'm6idn.large' | 'm6idn.xlarge' | 'm6idn.2xlarge' | 'm6idn.4xlarge' | 'm6idn.8xlarge' | 'm6idn.12xlarge' | 'm6idn.16xlarge' | 'm6idn.24xlarge' | 'm6idn.32xlarge' | 'r6in.large' | 'r6in.xlarge' | 'r6in.2xlarge' | 'r6in.4xlarge' | 'r6in.8xlarge' | 'r6in.12xlarge' | 'r6in.16xlarge' | 'r6in.24xlarge' | 'r6in.32xlarge' | 'r6idn.large' | 'r6idn.xlarge' | 'r6idn.2xlarge' | 'r6idn.4xlarge' | 'r6idn.8xlarge' | 'r6idn.12xlarge' | 'r6idn.16xlarge' | 'r6idn.24xlarge' | 'r6idn.32xlarge' | 'c7g.metal' | 'm7g.medium' | 'm7g.large' | 'm7g.xlarge' | 'm7g.2xlarge' | 'm7g.4xlarge' | 'm7g.8xlarge' | 'm7g.12xlarge' | 'm7g.16xlarge' | 'm7g.metal' | 'r7g.medium' | 'r7g.large' | 'r7g.xlarge' | 'r7g.2xlarge' | 'r7g.4xlarge' | 'r7g.8xlarge' | 'r7g.12xlarge' | 'r7g.16xlarge' | 'r7g.metal' | 'c6in.metal' | 'm6in.metal' | 'm6idn.metal' | 'r6in.metal' | 'r6idn.metal' | 'inf2.xlarge' | 'inf2.8xlarge' | 'inf2.24xlarge' | 'inf2.48xlarge' | 'trn1n.32xlarge' | 'i4g.large' | 'i4g.xlarge' | 'i4g.2xlarge' | 'i4g.4xlarge' | 'i4g.8xlarge' | 'i4g.16xlarge' | 'hpc7g.4xlarge' | 'hpc7g.8xlarge' | 'hpc7g.16xlarge' | 'c7gn.medium' | 'c7gn.large' | 'c7gn.xlarge' | 'c7gn.2xlarge' | 'c7gn.4xlarge' | 'c7gn.8xlarge' | 'c7gn.12xlarge' | 'c7gn.16xlarge' | 'p5.48xlarge' | 'm7i.large' | 'm7i.xlarge' | 'm7i.2xlarge' | 'm7i.4xlarge' | 'm7i.8xlarge' | 'm7i.12xlarge' | 'm7i.16xlarge' | 'm7i.24xlarge' | 'm7i.48xlarge' | 'm7i-flex.large' | 'm7i-flex.xlarge' | 'm7i-flex.2xlarge' | 'm7i-flex.4xlarge' | 'm7i-flex.8xlarge' | 'm7a.medium' | 'm7a.large' | 'm7a.xlarge' | 'm7a.2xlarge' | 'm7a.4xlarge' | 'm7a.8xlarge' | 'm7a.12xlarge' | 'm7a.16xlarge' | 'm7a.24xlarge' | 'm7a.32xlarge' | 'm7a.48xlarge' | 'm7a.metal-48xl' | 'hpc7a.12xlarge' | 'hpc7a.24xlarge' | 'hpc7a.48xlarge' | 'hpc7a.96xlarge' | 'c7gd.medium' | 'c7gd.large' | 'c7gd.xlarge' | 'c7gd.2xlarge' | 'c7gd.4xlarge' | 'c7gd.8xlarge' | 'c7gd.12xlarge' | 'c7gd.16xlarge' | 'm7gd.medium' | 'm7gd.large' | 'm7gd.xlarge' | 'm7gd.2xlarge' | 'm7gd.4xlarge' | 'm7gd.8xlarge' | 'm7gd.12xlarge' | 'm7gd.16xlarge' | 'r7gd.medium' | 'r7gd.large' | 'r7gd.xlarge' | 'r7gd.2xlarge' | 'r7gd.4xlarge' | 'r7gd.8xlarge' | 'r7gd.12xlarge' | 'r7gd.16xlarge' | 'r7a.medium' | 'r7a.large' | 'r7a.xlarge' | 'r7a.2xlarge' | 'r7a.4xlarge' | 'r7a.8xlarge' | 'r7a.12xlarge' | 'r7a.16xlarge' | 'r7a.24xlarge' | 'r7a.32xlarge' | 'r7a.48xlarge' | 'c7i.large' | 'c7i.xlarge' | 'c7i.2xlarge' | 'c7i.4xlarge' | 'c7i.8xlarge' | 'c7i.12xlarge' | 'c7i.16xlarge' | 'c7i.24xlarge' | 'c7i.48xlarge' | 'mac2-m2pro.metal' | 'r7iz.large' | 'r7iz.xlarge' | 'r7iz.2xlarge' | 'r7iz.4xlarge' | 'r7iz.8xlarge' | 'r7iz.12xlarge' | 'r7iz.16xlarge' | 'r7iz.32xlarge' | 'c7a.medium' | 'c7a.large' | 'c7a.xlarge' | 'c7a.2xlarge' | 'c7a.4xlarge' | 'c7a.8xlarge' | 'c7a.12xlarge' | 'c7a.16xlarge' | 'c7a.24xlarge' | 'c7a.32xlarge' | 'c7a.48xlarge' | 'c7a.metal-48xl' | 'r7a.metal-48xl' | 'r7i.large' | 'r7i.xlarge' | 'r7i.2xlarge' | 'r7i.4xlarge' | 'r7i.8xlarge' | 'r7i.12xlarge' | 'r7i.16xlarge' | 'r7i.24xlarge' | 'r7i.48xlarge' | 'dl2q.24xlarge' | 'mac2-m2.metal' | 'i4i.12xlarge' | 'i4i.24xlarge' | 'c7i.metal-24xl' | 'c7i.metal-48xl' | 'm7i.metal-24xl' | 'm7i.metal-48xl' | 'r7i.metal-24xl' | 'r7i.metal-48xl' | 'r7iz.metal-16xl' | 'r7iz.metal-32xl' | 'c7gd.metal' | 'm7gd.metal' | 'r7gd.metal' | 'g6.xlarge' | 'g6.2xlarge' | 'g6.4xlarge' | 'g6.8xlarge' | 'g6.12xlarge' | 'g6.16xlarge' | 'g6.24xlarge' | 'g6.48xlarge' | 'gr6.4xlarge' | 'gr6.8xlarge' | 'c7i-flex.large' | 'c7i-flex.xlarge' | 'c7i-flex.2xlarge' | 'c7i-flex.4xlarge' | 'c7i-flex.8xlarge' | 'u7i-12tb.224xlarge' | 'u7in-16tb.224xlarge' | 'u7in-24tb.224xlarge' | 'u7in-32tb.224xlarge' | 'u7ib-12tb.224xlarge' | 'c7gn.metal' | 'r8g.medium' | 'r8g.large' | 'r8g.xlarge' | 'r8g.2xlarge' | 'r8g.4xlarge' | 'r8g.8xlarge' | 'r8g.12xlarge' | 'r8g.16xlarge' | 'r8g.24xlarge' | 'r8g.48xlarge' | 'r8g.metal-24xl' | 'r8g.metal-48xl' | 'mac2-m1ultra.metal' | 'g6e.xlarge' | 'g6e.2xlarge' | 'g6e.4xlarge' | 'g6e.8xlarge' | 'g6e.12xlarge' | 'g6e.16xlarge' | 'g6e.24xlarge' | 'g6e.48xlarge' | 'c8g.medium' | 'c8g.large' | 'c8g.xlarge' | 'c8g.2xlarge' | 'c8g.4xlarge' | 'c8g.8xlarge' | 'c8g.12xlarge' | 'c8g.16xlarge' | 'c8g.24xlarge' | 'c8g.48xlarge' | 'c8g.metal-24xl' | 'c8g.metal-48xl' | 'm8g.medium' | 'm8g.large' | 'm8g.xlarge' | 'm8g.2xlarge' | 'm8g.4xlarge' | 'm8g.8xlarge' | 'm8g.12xlarge' | 'm8g.16xlarge' | 'm8g.24xlarge' | 'm8g.48xlarge' | 'm8g.metal-24xl' | 'm8g.metal-48xl' | 'x8g.medium' | 'x8g.large' | 'x8g.xlarge' | 'x8g.2xlarge' | 'x8g.4xlarge' | 'x8g.8xlarge' | 'x8g.12xlarge' | 'x8g.16xlarge' | 'x8g.24xlarge' | 'x8g.48xlarge' | 'x8g.metal-24xl' | 'x8g.metal-48xl' | 'i7ie.large' | 'i7ie.xlarge' | 'i7ie.2xlarge' | 'i7ie.3xlarge' | 'i7ie.6xlarge' | 'i7ie.12xlarge' | 'i7ie.18xlarge' | 'i7ie.24xlarge' | 'i7ie.48xlarge' | 'i8g.large' | 'i8g.xlarge' | 'i8g.2xlarge' | 'i8g.4xlarge' | 'i8g.8xlarge' | 'i8g.12xlarge' | 'i8g.16xlarge' | 'i8g.24xlarge' | 'i8g.metal-24xl' | 'u7i-6tb.112xlarge' | 'u7i-8tb.112xlarge' | 'u7inh-32tb.480xlarge' | 'p5e.48xlarge' | 'p5en.48xlarge' | 'f2.12xlarge' | 'f2.48xlarge' | 'trn2.48xlarge' | 'c7i-flex.12xlarge' | 'c7i-flex.16xlarge' | 'm7i-flex.12xlarge' | 'm7i-flex.16xlarge' | 'i7ie.metal-24xl' | 'i7ie.metal-48xl' | 'i8g.48xlarge' | 'c8gd.medium' | 'c8gd.large' | 'c8gd.xlarge' | 'c8gd.2xlarge' | 'c8gd.4xlarge' | 'c8gd.8xlarge' | 'c8gd.12xlarge' | 'c8gd.16xlarge' | 'c8gd.24xlarge' | 'c8gd.48xlarge' | 'c8gd.metal-24xl' | 'c8gd.metal-48xl' | 'i7i.large' | 'i7i.xlarge' | 'i7i.2xlarge' | 'i7i.4xlarge' | 'i7i.8xlarge' | 'i7i.12xlarge' | 'i7i.16xlarge' | 'i7i.24xlarge' | 'i7i.48xlarge' | 'i7i.metal-24xl' | 'i7i.metal-48xl' | 'p6-b200.48xlarge' | 'm8gd.medium' | 'm8gd.large' | 'm8gd.xlarge' | 'm8gd.2xlarge' | 'm8gd.4xlarge' | 'm8gd.8xlarge' | 'm8gd.12xlarge' | 'm8gd.16xlarge' | 'm8gd.24xlarge' | 'm8gd.48xlarge' | 'm8gd.metal-24xl' | 'm8gd.metal-48xl' | 'r8gd.medium' | 'r8gd.large' | 'r8gd.xlarge' | 'r8gd.2xlarge' | 'r8gd.4xlarge' | 'r8gd.8xlarge' | 'r8gd.12xlarge' | 'r8gd.16xlarge' | 'r8gd.24xlarge' | 'r8gd.48xlarge' | 'r8gd.metal-24xl' | 'r8gd.metal-48xl' | 'c8gn.medium' | 'c8gn.large' | 'c8gn.xlarge' | 'c8gn.2xlarge' | 'c8gn.4xlarge' | 'c8gn.8xlarge' | 'c8gn.12xlarge' | 'c8gn.16xlarge' | 'c8gn.24xlarge' | 'c8gn.48xlarge' | 'c8gn.metal-24xl' | 'c8gn.metal-48xl' | 'f2.6xlarge' | 'p6e-gb200.36xlarge' | 'g6f.large' | 'g6f.xlarge' | 'g6f.2xlarge' | 'g6f.4xlarge' | 'gr6f.4xlarge' | 'p5.4xlarge' | 'r8i.large' | 'r8i.xlarge' | 'r8i.2xlarge' | 'r8i.4xlarge' | 'r8i.8xlarge' | 'r8i.12xlarge' | 'r8i.16xlarge' | 'r8i.24xlarge' | 'r8i.32xlarge' | 'r8i.48xlarge' | 'r8i.96xlarge' | 'r8i.metal-48xl' | 'r8i.metal-96xl' | 'r8i-flex.large' | 'r8i-flex.xlarge' | 'r8i-flex.2xlarge' | 'r8i-flex.4xlarge' | 'r8i-flex.8xlarge' | 'r8i-flex.12xlarge' | 'r8i-flex.16xlarge' | 'm8i.large' | 'm8i.xlarge' | 'm8i.2xlarge' | 'm8i.4xlarge' | 'm8i.8xlarge' | 'm8i.12xlarge' | 'm8i.16xlarge' | 'm8i.24xlarge' | 'm8i.32xlarge' | 'm8i.48xlarge' | 'm8i.96xlarge' | 'm8i.metal-48xl' | 'm8i.metal-96xl' | 'm8i-flex.large' | 'm8i-flex.xlarge' | 'm8i-flex.2xlarge' | 'm8i-flex.4xlarge' | 'm8i-flex.8xlarge' | 'm8i-flex.12xlarge' | 'm8i-flex.16xlarge' | 'i8ge.large' | 'i8ge.xlarge' | 'i8ge.2xlarge' | 'i8ge.3xlarge' | 'i8ge.6xlarge' | 'i8ge.12xlarge' | 'i8ge.18xlarge' | 'i8ge.24xlarge' | 'i8ge.48xlarge' | 'i8ge.metal-24xl' | 'i8ge.metal-48xl' | 'mac-m4.metal' | 'mac-m4pro.metal' | 'r8gn.medium' | 'r8gn.large' | 'r8gn.xlarge' | 'r8gn.2xlarge' | 'r8gn.4xlarge' | 'r8gn.8xlarge' | 'r8gn.12xlarge' | 'r8gn.16xlarge' | 'r8gn.24xlarge' | 'r8gn.48xlarge' | 'r8gn.metal-24xl' | 'r8gn.metal-48xl' | 'c8i.large' | 'c8i.xlarge' | 'c8i.2xlarge' | 'c8i.4xlarge' | 'c8i.8xlarge' | 'c8i.12xlarge' | 'c8i.16xlarge' | 'c8i.24xlarge' | 'c8i.32xlarge' | 'c8i.48xlarge' | 'c8i.96xlarge' | 'c8i.metal-48xl' | 'c8i.metal-96xl' | 'c8i-flex.large' | 'c8i-flex.xlarge' | 'c8i-flex.2xlarge' | 'c8i-flex.4xlarge' | 'c8i-flex.8xlarge' | 'c8i-flex.12xlarge' | 'c8i-flex.16xlarge' | 'r8gb.medium' | 'r8gb.large' | 'r8gb.xlarge' | 'r8gb.2xlarge' | 'r8gb.4xlarge' | 'r8gb.8xlarge' | 'r8gb.12xlarge' | 'r8gb.16xlarge' | 'r8gb.24xlarge' | 'r8gb.metal-24xl' | 'm8a.medium' | 'm8a.large' | 'm8a.xlarge' | 'm8a.2xlarge' | 'm8a.4xlarge' | 'm8a.8xlarge' | 'm8a.12xlarge' | 'm8a.16xlarge' | 'm8a.24xlarge' | 'm8a.48xlarge' | 'm8a.metal-24xl' | 'm8a.metal-48xl' | 'trn2.3xlarge' | 'r8a.medium' | 'r8a.large' | 'r8a.xlarge' | 'r8a.2xlarge' | 'r8a.4xlarge' | 'r8a.8xlarge' | 'r8a.12xlarge' | 'r8a.16xlarge' | 'r8a.24xlarge' | 'r8a.48xlarge' | 'r8a.metal-24xl' | 'r8a.metal-48xl' | 'p6-b300.48xlarge' | 'c8a.medium' | 'c8a.large' | 'c8a.xlarge' | 'c8a.2xlarge' | 'c8a.4xlarge' | 'c8a.8xlarge' | 'c8a.12xlarge' | 'c8a.16xlarge' | 'c8a.24xlarge' | 'c8a.48xlarge' | 'c8a.metal-24xl' | 'c8a.metal-48xl' | 'c8gb.12xlarge' | 'c8gb.16xlarge' | 'c8gb.24xlarge' | 'c8gb.2xlarge' | 'c8gb.4xlarge' | 'c8gb.8xlarge' | 'c8gb.large' | 'c8gb.medium' | 'c8gb.metal-24xl' | 'c8gb.xlarge' | 'c8gb.48xlarge' | 'c8gb.metal-48xl' | 'm8gb.12xlarge' | 'm8gb.16xlarge' | 'm8gb.24xlarge' | 'm8gb.2xlarge' | 'm8gb.4xlarge' | 'm8gb.8xlarge' | 'm8gb.large' | 'm8gb.medium' | 'm8gb.xlarge' | 'm8gb.48xlarge' | 'm8gb.metal-24xl' | 'm8gb.metal-48xl' | 'm8gn.12xlarge' | 'm8gn.16xlarge' | 'm8gn.24xlarge' | 'm8gn.2xlarge' | 'm8gn.48xlarge' | 'm8gn.4xlarge' | 'm8gn.8xlarge' | 'm8gn.large' | 'm8gn.medium' | 'm8gn.xlarge' | 'm8gn.metal-24xl' | 'm8gn.metal-48xl' | 'x8aedz.12xlarge' | 'x8aedz.24xlarge' | 'x8aedz.3xlarge' | 'x8aedz.6xlarge' | 'x8aedz.large' | 'x8aedz.metal-12xl' | 'x8aedz.metal-24xl' | 'x8aedz.xlarge' | 'm8azn.medium' | 'm8azn.large' | 'm8azn.xlarge' | 'm8azn.3xlarge' | 'm8azn.6xlarge' | 'm8azn.12xlarge' | 'm8azn.24xlarge' | 'm8azn.metal-12xl' | 'm8azn.metal-24xl' | 'x8i.large' | 'x8i.xlarge' | 'x8i.2xlarge' | 'x8i.4xlarge' | 'x8i.8xlarge' | 'x8i.12xlarge' | 'x8i.16xlarge' | 'x8i.24xlarge' | 'x8i.32xlarge' | 'x8i.48xlarge' | 'x8i.64xlarge' | 'x8i.96xlarge' | 'x8i.metal-48xl' | 'x8i.metal-96xl' | 'mac-m4max.metal' | 'g7e.2xlarge' | 'g7e.4xlarge' | 'g7e.8xlarge' | 'g7e.12xlarge' | 'g7e.24xlarge' | 'g7e.48xlarge' | 'r8id.large' | 'r8id.xlarge' | 'r8id.2xlarge' | 'r8id.4xlarge' | 'r8id.8xlarge' | 'r8id.12xlarge' | 'r8id.16xlarge' | 'r8id.24xlarge' | 'r8id.32xlarge' | 'r8id.48xlarge' | 'r8id.96xlarge' | 'r8id.metal-48xl' | 'r8id.metal-96xl';
  /** The network platform of the modified Reserved Instances. */
  Platform?: string;
  /** Whether the Reserved Instance is applied to instances in a Region or instances in a specific Availability Zone. */
  Scope?: 'Availability Zone' | 'Region';
  /** The ID of the Availability Zone. */
  AvailabilityZoneId?: string;
}

export interface SecurityGroupRuleUpdate {
  /** The ID of the security group rule. */
  SecurityGroupRuleId: string;
  /** Information about the security group rule. */
  SecurityGroupRule?: any;
}

export interface CreateVolumePermissionModifications {
  /** Adds the specified Amazon Web Services account ID or group to the list. */
  Add?: any[];
  /** Removes the specified Amazon Web Services account ID or group from the list. */
  Remove?: any[];
}

export interface LaunchTemplateConfig {
  /** The launch template to use. Make sure that the launch template does not contain the NetworkInterfaceId parameter because you can't specify a network interface ID in a Spot Fleet. */
  LaunchTemplateSpecification?: any;
  /** Any parameters that you specify override the same parameters in the launch template. */
  Overrides?: any[];
}

export interface ModifyTransitGatewayOptions {
  /** Adds IPv4 or IPv6 CIDR blocks for the transit gateway. Must be a size /24 CIDR block or larger for IPv4, or a size /64 CIDR block or larger for IPv6. */
  AddTransitGatewayCidrBlocks?: string[];
  /** Removes CIDR blocks for the transit gateway. */
  RemoveTransitGatewayCidrBlocks?: string[];
  /** Enable or disable Equal Cost Multipath Protocol support. */
  VpnEcmpSupport?: 'enable' | 'disable';
  /** Enable or disable DNS support. */
  DnsSupport?: 'enable' | 'disable';
  /** Enables you to reference a security group across VPCs attached to a transit gateway to simplify security group management. This option is disabled by default. For more information about security group */
  SecurityGroupReferencingSupport?: 'enable' | 'disable';
  /** Enable or disable automatic acceptance of attachment requests. */
  AutoAcceptSharedAttachments?: 'enable' | 'disable';
  /** Enable or disable automatic association with the default association route table. */
  DefaultRouteTableAssociation?: 'enable' | 'disable';
  /** The ID of the default association route table. */
  AssociationDefaultRouteTableId?: string;
  /** Indicates whether resource attachments automatically propagate routes to the default propagation route table. Enabled by default. If defaultRouteTablePropagation is set to enable, Amazon Web Services  */
  DefaultRouteTablePropagation?: 'enable' | 'disable';
  /** The ID of the default propagation route table. */
  PropagationDefaultRouteTableId?: string;
  /** A private Autonomous System Number (ASN) for the Amazon side of a BGP session. The range is 64512 to 65534 for 16-bit ASNs and 4200000000 to 4294967294 for 32-bit ASNs. The modify ASN operation is not */
  AmazonSideAsn?: number;
  /** Enable or disable encryption support for VPC Encryption Control. */
  EncryptionSupport?: 'enable' | 'disable';
}

export interface ModifyTransitGatewayVpcAttachmentRequestOptions {
  /** Enable or disable DNS support. The default is enable. */
  DnsSupport?: 'enable' | 'disable';
  /** Enables you to reference a security group across VPCs attached to a transit gateway to simplify security group management. This option is disabled by default. For more information about security group */
  SecurityGroupReferencingSupport?: 'enable' | 'disable';
  /** Enable or disable IPv6 support. The default is enable. */
  Ipv6Support?: 'enable' | 'disable';
  /** Enable or disable support for appliance mode. If enabled, a traffic flow between a source and destination uses the same Availability Zone for the VPC attachment for the lifetime of that flow. The defa */
  ApplianceModeSupport?: 'enable' | 'disable';
}

export interface ModifyVerifiedAccessEndpointLoadBalancerOptions {
  /** The IDs of the subnets. */
  SubnetIds?: string[];
  /** The IP protocol. */
  Protocol?: 'http' | 'https' | 'tcp';
  /** The IP port number. */
  Port?: number;
  /** The port ranges. */
  PortRanges?: any[];
}

export interface ModifyVerifiedAccessEndpointEniOptions {
  /** The IP protocol. */
  Protocol?: 'http' | 'https' | 'tcp';
  /** The IP port number. */
  Port?: number;
  /** The port ranges. */
  PortRanges?: any[];
}

export interface ModifyVerifiedAccessEndpointRdsOptions {
  /** The IDs of the subnets. */
  SubnetIds?: string[];
  /** The port. */
  Port?: number;
  /** The RDS endpoint. */
  RdsEndpoint?: string;
}

export interface ModifyVerifiedAccessEndpointCidrOptions {
  /** The port ranges. */
  PortRanges?: any[];
}

export interface VerifiedAccessLogS3DestinationOptions {
  /** Indicates whether logging is enabled. */
  Enabled: boolean;
  /** The bucket name. */
  BucketName?: string;
  /** The bucket prefix. */
  Prefix?: string;
  /** The ID of the Amazon Web Services account that owns the Amazon S3 bucket. */
  BucketOwner?: string;
}

export interface VerifiedAccessLogCloudWatchLogsDestinationOptions {
  /** Indicates whether logging is enabled. */
  Enabled: boolean;
  /** The ID of the CloudWatch Logs log group. */
  LogGroup?: string;
}

export interface VerifiedAccessLogKinesisDataFirehoseDestinationOptions {
  /** Indicates whether logging is enabled. */
  Enabled: boolean;
  /** The ID of the delivery stream. */
  DeliveryStream?: string;
}

export interface VerifiedAccessLogOptions {
  /** Sends Verified Access logs to Amazon S3. */
  S3?: VerifiedAccessLogS3DestinationOptions;
  /** Sends Verified Access logs to CloudWatch Logs. */
  CloudWatchLogs?: VerifiedAccessLogCloudWatchLogsDestinationOptions;
  /** Sends Verified Access logs to Kinesis. */
  KinesisDataFirehose?: VerifiedAccessLogKinesisDataFirehoseDestinationOptions;
  /** The logging version. Valid values: ocsf-0.1 | ocsf-1.0.0-rc.2 */
  LogVersion?: string;
  /** Indicates whether to include trust data sent by trust providers in the logs. */
  IncludeTrustContext?: boolean;
}

export interface ModifyVerifiedAccessTrustProviderOidcOptions {
  /** The OIDC issuer. */
  Issuer?: string;
  /** The OIDC authorization endpoint. */
  AuthorizationEndpoint?: string;
  /** The OIDC token endpoint. */
  TokenEndpoint?: string;
  /** The OIDC user info endpoint. */
  UserInfoEndpoint?: string;
  /** The client identifier. */
  ClientId?: string;
  /** The client secret. */
  ClientSecret?: string;
  /** OpenID Connect (OIDC) scopes are used by an application during authentication to authorize access to a user's details. Each scope returns a specific set of user attributes. */
  Scope?: string;
}

export interface ModifyVerifiedAccessTrustProviderDeviceOptions {
  /** The URL Amazon Web Services Verified Access will use to verify the authenticity of the device tokens. */
  PublicSigningKeyUrl?: string;
}

export interface ModifyVerifiedAccessNativeApplicationOidcOptions {
  /** The public signing key endpoint. */
  PublicSigningKeyEndpoint?: string;
  /** The OIDC issuer identifier of the IdP. */
  Issuer?: string;
  /** The authorization endpoint of the IdP. */
  AuthorizationEndpoint?: string;
  /** The token endpoint of the IdP. */
  TokenEndpoint?: string;
  /** The user info endpoint of the IdP. */
  UserInfoEndpoint?: string;
  /** The OAuth 2.0 client identifier. */
  ClientId?: string;
  /** The OAuth 2.0 client secret. */
  ClientSecret?: string;
  /** The set of user claims to be requested from the IdP. */
  Scope?: string;
}

export interface PeeringConnectionOptionsRequest {
  /** If true, enables a local VPC to resolve public DNS hostnames to private IP addresses when queried from instances in the peer VPC. */
  AllowDnsResolutionFromRemoteVpc?: boolean;
  /** Deprecated. */
  AllowEgressFromLocalClassicLinkToRemoteVpc?: boolean;
  /** Deprecated. */
  AllowEgressFromLocalVpcToRemoteClassicLink?: boolean;
}

export interface VpnTunnelLogOptionsSpecification {
  /** Options for sending VPN tunnel logs to CloudWatch. */
  CloudWatchLogOptions?: any;
}

export interface ModifyVpnTunnelOptionsSpecification {
  /** The range of inside IPv4 addresses for the tunnel. Any specified CIDR blocks must be unique across all VPN connections that use the same virtual private gateway. Constraints: A size /30 CIDR block fro */
  TunnelInsideCidr?: string;
  /** The range of inside IPv6 addresses for the tunnel. Any specified CIDR blocks must be unique across all VPN connections that use the same transit gateway. Constraints: A size /126 CIDR block from the l */
  TunnelInsideIpv6Cidr?: string;
  /** The pre-shared key (PSK) to establish initial authentication between the virtual private gateway and the customer gateway. Constraints: Allowed characters are alphanumeric characters, periods (.), and */
  PreSharedKey?: string;
  /** The lifetime for phase 1 of the IKE negotiation, in seconds. Constraints: A value between 900 and 28,800. Default: 28800 */
  Phase1LifetimeSeconds?: number;
  /** The lifetime for phase 2 of the IKE negotiation, in seconds. Constraints: A value between 900 and 3,600. The value must be less than the value for Phase1LifetimeSeconds. Default: 3600 */
  Phase2LifetimeSeconds?: number;
  /** The margin time, in seconds, before the phase 2 lifetime expires, during which the Amazon Web Services side of the VPN connection performs an IKE rekey. The exact time of the rekey is randomly selecte */
  RekeyMarginTimeSeconds?: number;
  /** The percentage of the rekey window (determined by RekeyMarginTimeSeconds) during which the rekey time is randomly selected. Constraints: A value between 0 and 100. Default: 100 */
  RekeyFuzzPercentage?: number;
  /** The number of packets in an IKE replay window. Constraints: A value between 64 and 2048. Default: 1024 */
  ReplayWindowSize?: number;
  /** The number of seconds after which a DPD timeout occurs. A DPD timeout of 40 seconds means that the VPN endpoint will consider the peer dead 30 seconds after the first failed keep-alive. Constraints: A */
  DPDTimeoutSeconds?: number;
  /** The action to take after DPD timeout occurs. Specify restart to restart the IKE initiation. Specify clear to end the IKE session. Valid Values: clear | none | restart Default: clear */
  DPDTimeoutAction?: string;
  /** One or more encryption algorithms that are permitted for the VPN tunnel for phase 1 IKE negotiations. Valid values: AES128 | AES256 | AES128-GCM-16 | AES256-GCM-16 */
  Phase1EncryptionAlgorithms?: any[];
  /** One or more encryption algorithms that are permitted for the VPN tunnel for phase 2 IKE negotiations. Valid values: AES128 | AES256 | AES128-GCM-16 | AES256-GCM-16 */
  Phase2EncryptionAlgorithms?: any[];
  /** One or more integrity algorithms that are permitted for the VPN tunnel for phase 1 IKE negotiations. Valid values: SHA1 | SHA2-256 | SHA2-384 | SHA2-512 */
  Phase1IntegrityAlgorithms?: any[];
  /** One or more integrity algorithms that are permitted for the VPN tunnel for phase 2 IKE negotiations. Valid values: SHA1 | SHA2-256 | SHA2-384 | SHA2-512 */
  Phase2IntegrityAlgorithms?: any[];
  /** One or more Diffie-Hellman group numbers that are permitted for the VPN tunnel for phase 1 IKE negotiations. Valid values: 2 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 */
  Phase1DHGroupNumbers?: any[];
  /** One or more Diffie-Hellman group numbers that are permitted for the VPN tunnel for phase 2 IKE negotiations. Valid values: 2 | 5 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 */
  Phase2DHGroupNumbers?: any[];
  /** The IKE versions that are permitted for the VPN tunnel. Valid values: ikev1 | ikev2 */
  IKEVersions?: any[];
  /** The action to take when the establishing the tunnel for the VPN connection. By default, your customer gateway device must initiate the IKE negotiation and bring up the tunnel. Specify start for Amazon */
  StartupAction?: string;
  /** Options for logging VPN tunnel activity. */
  LogOptions?: VpnTunnelLogOptionsSpecification;
  /** Turn on or off tunnel endpoint lifecycle control feature. */
  EnableTunnelLifecycleControl?: boolean;
}

export interface CidrAuthorizationContext {
  /** The plain-text authorization message for the prefix and account. */
  Message: string;
  /** The signed authorization message for the prefix and account. */
  Signature: string;
}

export interface AsnAuthorizationContext {
  /** The authorization context's message. */
  Message: string;
  /** The authorization context's signature. */
  Signature: string;
}

export interface IpamCidrAuthorizationContext {
  /** The plain-text authorization message for the prefix and account. */
  Message?: string;
  /** The signed authorization message for the prefix and account. */
  Signature?: string;
}

export interface ReservedInstanceLimitPrice {
  /** Used for Reserved Instance Marketplace offerings. Specifies the limit price on the total order (instanceCount * price). */
  Amount?: number;
  /** The currency in which the limitPrice amount is specified. At this time, the only supported currency is USD. */
  CurrencyCode?: 'USD';
}

export interface PurchaseRequest {
  /** The number of instances. */
  InstanceCount: number;
  /** The purchase token. */
  PurchaseToken: string;
}

export interface RegisterInstanceTagAttributeRequest {
  /** Indicates whether to register all tag keys in the current Region. Specify true to register all tag keys. */
  IncludeAllTagsOfInstance?: boolean;
  /** The tag keys to register. */
  InstanceTagKeys?: string[];
}

export interface ImageCriterionRequest {
  /** The image providers whose images are allowed. Possible values: amazon: Allow AMIs created by Amazon or verified providers. aws-marketplace: Allow AMIs created by verified providers in the Amazon Web S */
  ImageProviders?: any[];
  /** The Amazon Web Services Marketplace product codes for allowed images. Length: 1-25 characters Valid characters: Letters (A–Z, a–z) and numbers (0–9) Maximum: 50 values */
  MarketplaceProductCodes?: any[];
  /** The names of allowed images. Names can include wildcards (? and *). Length: 1–128 characters. With ?, the minimum is 3 characters. Valid characters: Letters: A–Z, a–z Numbers: 0–9 Special characters:  */
  ImageNames?: any[];
  /** The maximum period since deprecation for allowed images. */
  DeprecationTimeCondition?: any;
  /** The maximum age for allowed images. */
  CreationDateCondition?: any;
}

export interface SpotMaintenanceStrategies {
  /** The Spot Instance replacement strategy to use when Amazon EC2 emits a signal that your Spot Instance is at an elevated risk of being interrupted. For more information, see Capacity rebalancing in the  */
  CapacityRebalance?: any;
}

export interface LoadBalancersConfig {
  /** The Classic Load Balancers. */
  ClassicLoadBalancersConfig?: any;
  /** The target groups. */
  TargetGroupsConfig?: any;
}

export interface SpotFleetRequestConfigData {
  /** The strategy that determines how to allocate the target Spot Instance capacity across the Spot Instance pools specified by the Spot Fleet launch configuration. For more information, see Allocation str */
  AllocationStrategy?: 'lowestPrice' | 'diversified' | 'capacityOptimized' | 'capacityOptimizedPrioritized' | 'priceCapacityOptimized';
  /** The order of the launch template overrides to use in fulfilling On-Demand capacity. If you specify lowestPrice, Spot Fleet uses price to determine the order, launching the lowest price first. If you s */
  OnDemandAllocationStrategy?: 'lowestPrice' | 'prioritized';
  /** The strategies for managing your Spot Instances that are at an elevated risk of being interrupted. */
  SpotMaintenanceStrategies?: SpotMaintenanceStrategies;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of your listings. This helps to avoid duplicate listings. For more information, see Ensuring Idempotency. */
  ClientToken?: string;
  /** Indicates whether running instances should be terminated if you decrease the target capacity of the Spot Fleet request below the current size of the Spot Fleet. Supported only for fleets of type maint */
  ExcessCapacityTerminationPolicy?: 'noTermination' | 'default';
  /** The number of units fulfilled by this request compared to the set target capacity. You cannot set this value. */
  FulfilledCapacity?: number;
  /** The number of On-Demand units fulfilled by this request compared to the set target On-Demand capacity. */
  OnDemandFulfilledCapacity?: number;
  /** The Amazon Resource Name (ARN) of an Identity and Access Management (IAM) role that grants the Spot Fleet the permission to request, launch, terminate, and tag instances on your behalf. For more infor */
  IamFleetRole: string;
  /** The launch specifications for the Spot Fleet request. If you specify LaunchSpecifications, you can't specify LaunchTemplateConfigs. If you include On-Demand capacity in your request, you must use Laun */
  LaunchSpecifications?: any[];
  /** The launch template and overrides. If you specify LaunchTemplateConfigs, you can't specify LaunchSpecifications. If you include On-Demand capacity in your request, you must use LaunchTemplateConfigs. */
  LaunchTemplateConfigs?: any[];
  /** The maximum price per unit hour that you are willing to pay for a Spot Instance. We do not recommend using this parameter because it can lead to increased interruptions. If you do not specify this par */
  SpotPrice?: string;
  /** The number of units to request for the Spot Fleet. You can choose to set the target capacity in terms of instances or a performance characteristic that is important to your application workload, such  */
  TargetCapacity: number;
  /** The number of On-Demand units to request. You can choose to set the target capacity in terms of instances or a performance characteristic that is important to your application workload, such as vCPUs, */
  OnDemandTargetCapacity?: number;
  /** The maximum amount per hour for On-Demand Instances that you're willing to pay. You can use the onDemandMaxTotalPrice parameter, the spotMaxTotalPrice parameter, or both parameters to ensure that your */
  OnDemandMaxTotalPrice?: string;
  /** The maximum amount per hour for Spot Instances that you're willing to pay. You can use the spotMaxTotalPrice parameter, the onDemandMaxTotalPrice parameter, or both parameters to ensure that your flee */
  SpotMaxTotalPrice?: string;
  /** Indicates whether running Spot Instances are terminated when the Spot Fleet request expires. */
  TerminateInstancesWithExpiration?: boolean;
  /** The type of request. Indicates whether the Spot Fleet only requests the target capacity or also attempts to maintain it. When this value is request, the Spot Fleet only places the required requests. I */
  Type?: 'request' | 'maintain' | 'instant';
  /** The start date and time of the request, in UTC format (YYYY-MM-DDTHH:MM:SSZ). By default, Amazon EC2 starts fulfilling the request immediately. */
  ValidFrom?: string;
  /** The end date and time of the request, in UTC format (YYYY-MM-DDTHH:MM:SSZ). After the end date and time, no new Spot Instance requests are placed or able to fulfill the request. If no value is specifi */
  ValidUntil?: string;
  /** Indicates whether Spot Fleet should replace unhealthy instances. */
  ReplaceUnhealthyInstances?: boolean;
  /** The behavior when a Spot Instance is interrupted. The default is terminate. */
  InstanceInterruptionBehavior?: 'hibernate' | 'stop' | 'terminate';
  /** One or more Classic Load Balancers and target groups to attach to the Spot Fleet request. Spot Fleet registers the running Spot Instances with the specified Classic Load Balancers and target groups. W */
  LoadBalancersConfig?: LoadBalancersConfig;
  /** The number of Spot pools across which to allocate your target Spot capacity. Valid only when Spot AllocationStrategy is set to lowest-price. Spot Fleet selects the cheapest Spot pools and evenly alloc */
  InstancePoolsToUseCount?: number;
  /** Reserved. */
  Context?: string;
  /** The unit for the target capacity. You can specify this parameter only when using attribute-based instance type selection. Default: units (the number of instances) */
  TargetCapacityUnitType?: 'vcpu' | 'memory-mib' | 'units';
  /** The key-value pair for tagging the Spot Fleet request on creation. The value for ResourceType must be spot-fleet-request, otherwise the Spot Fleet request fails. To tag instances at launch, specify th */
  TagSpecifications?: any[];
}

export interface RunInstancesMonitoringEnabled {
  /** Indicates whether detailed monitoring is enabled. Otherwise, basic monitoring is enabled. */
  Enabled: boolean;
}

export interface SpotPlacement {
  /** The Availability Zone. For example, us-east-2a. [Spot Fleet only] To specify multiple Availability Zones, separate them using commas; for example, "us-east-2a, us-east-2b". Either AvailabilityZone or  */
  AvailabilityZone?: string;
  /** The name of the placement group. */
  GroupName?: string;
  /** The tenancy of the instance (if the instance is running in a VPC). An instance with a tenancy of dedicated runs on single-tenant hardware. The host tenancy is not supported for Spot Instances. */
  Tenancy?: 'default' | 'dedicated' | 'host';
  /** The ID of the Availability Zone. For example, use2-az1. [Spot Fleet only] To specify multiple Availability Zones, separate them using commas; for example, "use2-az1, use2-bz1". Either AvailabilityZone */
  AvailabilityZoneId?: string;
}

export interface RequestSpotLaunchSpecification {
  /** The IDs of the security groups. */
  SecurityGroupIds?: string[];
  /** Not supported. */
  SecurityGroups?: string[];
  /** Deprecated. */
  AddressingType?: string;
  /** The block device mapping entries. You can't specify both a snapshot ID and an encryption value. This is because only blank volumes can be encrypted on creation. If a snapshot is the basis for a volume */
  BlockDeviceMappings?: any[];
  /** Indicates whether the instance is optimized for EBS I/O. This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide optimal EBS I/O performance. This */
  EbsOptimized?: boolean;
  /** The IAM instance profile. */
  IamInstanceProfile?: IamInstanceProfileSpecification;
  /** The ID of the AMI. */
  ImageId?: string;
  /** The instance type. Only one instance type can be specified. */
  InstanceType?: 'a1.medium' | 'a1.large' | 'a1.xlarge' | 'a1.2xlarge' | 'a1.4xlarge' | 'a1.metal' | 'c1.medium' | 'c1.xlarge' | 'c3.large' | 'c3.xlarge' | 'c3.2xlarge' | 'c3.4xlarge' | 'c3.8xlarge' | 'c4.large' | 'c4.xlarge' | 'c4.2xlarge' | 'c4.4xlarge' | 'c4.8xlarge' | 'c5.large' | 'c5.xlarge' | 'c5.2xlarge' | 'c5.4xlarge' | 'c5.9xlarge' | 'c5.12xlarge' | 'c5.18xlarge' | 'c5.24xlarge' | 'c5.metal' | 'c5a.large' | 'c5a.xlarge' | 'c5a.2xlarge' | 'c5a.4xlarge' | 'c5a.8xlarge' | 'c5a.12xlarge' | 'c5a.16xlarge' | 'c5a.24xlarge' | 'c5ad.large' | 'c5ad.xlarge' | 'c5ad.2xlarge' | 'c5ad.4xlarge' | 'c5ad.8xlarge' | 'c5ad.12xlarge' | 'c5ad.16xlarge' | 'c5ad.24xlarge' | 'c5d.large' | 'c5d.xlarge' | 'c5d.2xlarge' | 'c5d.4xlarge' | 'c5d.9xlarge' | 'c5d.12xlarge' | 'c5d.18xlarge' | 'c5d.24xlarge' | 'c5d.metal' | 'c5n.large' | 'c5n.xlarge' | 'c5n.2xlarge' | 'c5n.4xlarge' | 'c5n.9xlarge' | 'c5n.18xlarge' | 'c5n.metal' | 'c6g.medium' | 'c6g.large' | 'c6g.xlarge' | 'c6g.2xlarge' | 'c6g.4xlarge' | 'c6g.8xlarge' | 'c6g.12xlarge' | 'c6g.16xlarge' | 'c6g.metal' | 'c6gd.medium' | 'c6gd.large' | 'c6gd.xlarge' | 'c6gd.2xlarge' | 'c6gd.4xlarge' | 'c6gd.8xlarge' | 'c6gd.12xlarge' | 'c6gd.16xlarge' | 'c6gd.metal' | 'c6gn.medium' | 'c6gn.large' | 'c6gn.xlarge' | 'c6gn.2xlarge' | 'c6gn.4xlarge' | 'c6gn.8xlarge' | 'c6gn.12xlarge' | 'c6gn.16xlarge' | 'c6i.large' | 'c6i.xlarge' | 'c6i.2xlarge' | 'c6i.4xlarge' | 'c6i.8xlarge' | 'c6i.12xlarge' | 'c6i.16xlarge' | 'c6i.24xlarge' | 'c6i.32xlarge' | 'c6i.metal' | 'cc1.4xlarge' | 'cc2.8xlarge' | 'cg1.4xlarge' | 'cr1.8xlarge' | 'd2.xlarge' | 'd2.2xlarge' | 'd2.4xlarge' | 'd2.8xlarge' | 'd3.xlarge' | 'd3.2xlarge' | 'd3.4xlarge' | 'd3.8xlarge' | 'd3en.xlarge' | 'd3en.2xlarge' | 'd3en.4xlarge' | 'd3en.6xlarge' | 'd3en.8xlarge' | 'd3en.12xlarge' | 'dl1.24xlarge' | 'f1.2xlarge' | 'f1.4xlarge' | 'f1.16xlarge' | 'g2.2xlarge' | 'g2.8xlarge' | 'g3.4xlarge' | 'g3.8xlarge' | 'g3.16xlarge' | 'g3s.xlarge' | 'g4ad.xlarge' | 'g4ad.2xlarge' | 'g4ad.4xlarge' | 'g4ad.8xlarge' | 'g4ad.16xlarge' | 'g4dn.xlarge' | 'g4dn.2xlarge' | 'g4dn.4xlarge' | 'g4dn.8xlarge' | 'g4dn.12xlarge' | 'g4dn.16xlarge' | 'g4dn.metal' | 'g5.xlarge' | 'g5.2xlarge' | 'g5.4xlarge' | 'g5.8xlarge' | 'g5.12xlarge' | 'g5.16xlarge' | 'g5.24xlarge' | 'g5.48xlarge' | 'g5g.xlarge' | 'g5g.2xlarge' | 'g5g.4xlarge' | 'g5g.8xlarge' | 'g5g.16xlarge' | 'g5g.metal' | 'hi1.4xlarge' | 'hpc6a.48xlarge' | 'hs1.8xlarge' | 'h1.2xlarge' | 'h1.4xlarge' | 'h1.8xlarge' | 'h1.16xlarge' | 'i2.xlarge' | 'i2.2xlarge' | 'i2.4xlarge' | 'i2.8xlarge' | 'i3.large' | 'i3.xlarge' | 'i3.2xlarge' | 'i3.4xlarge' | 'i3.8xlarge' | 'i3.16xlarge' | 'i3.metal' | 'i3en.large' | 'i3en.xlarge' | 'i3en.2xlarge' | 'i3en.3xlarge' | 'i3en.6xlarge' | 'i3en.12xlarge' | 'i3en.24xlarge' | 'i3en.metal' | 'im4gn.large' | 'im4gn.xlarge' | 'im4gn.2xlarge' | 'im4gn.4xlarge' | 'im4gn.8xlarge' | 'im4gn.16xlarge' | 'inf1.xlarge' | 'inf1.2xlarge' | 'inf1.6xlarge' | 'inf1.24xlarge' | 'is4gen.medium' | 'is4gen.large' | 'is4gen.xlarge' | 'is4gen.2xlarge' | 'is4gen.4xlarge' | 'is4gen.8xlarge' | 'm1.small' | 'm1.medium' | 'm1.large' | 'm1.xlarge' | 'm2.xlarge' | 'm2.2xlarge' | 'm2.4xlarge' | 'm3.medium' | 'm3.large' | 'm3.xlarge' | 'm3.2xlarge' | 'm4.large' | 'm4.xlarge' | 'm4.2xlarge' | 'm4.4xlarge' | 'm4.10xlarge' | 'm4.16xlarge' | 'm5.large' | 'm5.xlarge' | 'm5.2xlarge' | 'm5.4xlarge' | 'm5.8xlarge' | 'm5.12xlarge' | 'm5.16xlarge' | 'm5.24xlarge' | 'm5.metal' | 'm5a.large' | 'm5a.xlarge' | 'm5a.2xlarge' | 'm5a.4xlarge' | 'm5a.8xlarge' | 'm5a.12xlarge' | 'm5a.16xlarge' | 'm5a.24xlarge' | 'm5ad.large' | 'm5ad.xlarge' | 'm5ad.2xlarge' | 'm5ad.4xlarge' | 'm5ad.8xlarge' | 'm5ad.12xlarge' | 'm5ad.16xlarge' | 'm5ad.24xlarge' | 'm5d.large' | 'm5d.xlarge' | 'm5d.2xlarge' | 'm5d.4xlarge' | 'm5d.8xlarge' | 'm5d.12xlarge' | 'm5d.16xlarge' | 'm5d.24xlarge' | 'm5d.metal' | 'm5dn.large' | 'm5dn.xlarge' | 'm5dn.2xlarge' | 'm5dn.4xlarge' | 'm5dn.8xlarge' | 'm5dn.12xlarge' | 'm5dn.16xlarge' | 'm5dn.24xlarge' | 'm5dn.metal' | 'm5n.large' | 'm5n.xlarge' | 'm5n.2xlarge' | 'm5n.4xlarge' | 'm5n.8xlarge' | 'm5n.12xlarge' | 'm5n.16xlarge' | 'm5n.24xlarge' | 'm5n.metal' | 'm5zn.large' | 'm5zn.xlarge' | 'm5zn.2xlarge' | 'm5zn.3xlarge' | 'm5zn.6xlarge' | 'm5zn.12xlarge' | 'm5zn.metal' | 'm6a.large' | 'm6a.xlarge' | 'm6a.2xlarge' | 'm6a.4xlarge' | 'm6a.8xlarge' | 'm6a.12xlarge' | 'm6a.16xlarge' | 'm6a.24xlarge' | 'm6a.32xlarge' | 'm6a.48xlarge' | 'm6g.metal' | 'm6g.medium' | 'm6g.large' | 'm6g.xlarge' | 'm6g.2xlarge' | 'm6g.4xlarge' | 'm6g.8xlarge' | 'm6g.12xlarge' | 'm6g.16xlarge' | 'm6gd.metal' | 'm6gd.medium' | 'm6gd.large' | 'm6gd.xlarge' | 'm6gd.2xlarge' | 'm6gd.4xlarge' | 'm6gd.8xlarge' | 'm6gd.12xlarge' | 'm6gd.16xlarge' | 'm6i.large' | 'm6i.xlarge' | 'm6i.2xlarge' | 'm6i.4xlarge' | 'm6i.8xlarge' | 'm6i.12xlarge' | 'm6i.16xlarge' | 'm6i.24xlarge' | 'm6i.32xlarge' | 'm6i.metal' | 'mac1.metal' | 'p2.xlarge' | 'p2.8xlarge' | 'p2.16xlarge' | 'p3.2xlarge' | 'p3.8xlarge' | 'p3.16xlarge' | 'p3dn.24xlarge' | 'p4d.24xlarge' | 'r3.large' | 'r3.xlarge' | 'r3.2xlarge' | 'r3.4xlarge' | 'r3.8xlarge' | 'r4.large' | 'r4.xlarge' | 'r4.2xlarge' | 'r4.4xlarge' | 'r4.8xlarge' | 'r4.16xlarge' | 'r5.large' | 'r5.xlarge' | 'r5.2xlarge' | 'r5.4xlarge' | 'r5.8xlarge' | 'r5.12xlarge' | 'r5.16xlarge' | 'r5.24xlarge' | 'r5.metal' | 'r5a.large' | 'r5a.xlarge' | 'r5a.2xlarge' | 'r5a.4xlarge' | 'r5a.8xlarge' | 'r5a.12xlarge' | 'r5a.16xlarge' | 'r5a.24xlarge' | 'r5ad.large' | 'r5ad.xlarge' | 'r5ad.2xlarge' | 'r5ad.4xlarge' | 'r5ad.8xlarge' | 'r5ad.12xlarge' | 'r5ad.16xlarge' | 'r5ad.24xlarge' | 'r5b.large' | 'r5b.xlarge' | 'r5b.2xlarge' | 'r5b.4xlarge' | 'r5b.8xlarge' | 'r5b.12xlarge' | 'r5b.16xlarge' | 'r5b.24xlarge' | 'r5b.metal' | 'r5d.large' | 'r5d.xlarge' | 'r5d.2xlarge' | 'r5d.4xlarge' | 'r5d.8xlarge' | 'r5d.12xlarge' | 'r5d.16xlarge' | 'r5d.24xlarge' | 'r5d.metal' | 'r5dn.large' | 'r5dn.xlarge' | 'r5dn.2xlarge' | 'r5dn.4xlarge' | 'r5dn.8xlarge' | 'r5dn.12xlarge' | 'r5dn.16xlarge' | 'r5dn.24xlarge' | 'r5dn.metal' | 'r5n.large' | 'r5n.xlarge' | 'r5n.2xlarge' | 'r5n.4xlarge' | 'r5n.8xlarge' | 'r5n.12xlarge' | 'r5n.16xlarge' | 'r5n.24xlarge' | 'r5n.metal' | 'r6g.medium' | 'r6g.large' | 'r6g.xlarge' | 'r6g.2xlarge' | 'r6g.4xlarge' | 'r6g.8xlarge' | 'r6g.12xlarge' | 'r6g.16xlarge' | 'r6g.metal' | 'r6gd.medium' | 'r6gd.large' | 'r6gd.xlarge' | 'r6gd.2xlarge' | 'r6gd.4xlarge' | 'r6gd.8xlarge' | 'r6gd.12xlarge' | 'r6gd.16xlarge' | 'r6gd.metal' | 'r6i.large' | 'r6i.xlarge' | 'r6i.2xlarge' | 'r6i.4xlarge' | 'r6i.8xlarge' | 'r6i.12xlarge' | 'r6i.16xlarge' | 'r6i.24xlarge' | 'r6i.32xlarge' | 'r6i.metal' | 't1.micro' | 't2.nano' | 't2.micro' | 't2.small' | 't2.medium' | 't2.large' | 't2.xlarge' | 't2.2xlarge' | 't3.nano' | 't3.micro' | 't3.small' | 't3.medium' | 't3.large' | 't3.xlarge' | 't3.2xlarge' | 't3a.nano' | 't3a.micro' | 't3a.small' | 't3a.medium' | 't3a.large' | 't3a.xlarge' | 't3a.2xlarge' | 't4g.nano' | 't4g.micro' | 't4g.small' | 't4g.medium' | 't4g.large' | 't4g.xlarge' | 't4g.2xlarge' | 'u-6tb1.56xlarge' | 'u-6tb1.112xlarge' | 'u-9tb1.112xlarge' | 'u-12tb1.112xlarge' | 'u-6tb1.metal' | 'u-9tb1.metal' | 'u-12tb1.metal' | 'u-18tb1.metal' | 'u-24tb1.metal' | 'vt1.3xlarge' | 'vt1.6xlarge' | 'vt1.24xlarge' | 'x1.16xlarge' | 'x1.32xlarge' | 'x1e.xlarge' | 'x1e.2xlarge' | 'x1e.4xlarge' | 'x1e.8xlarge' | 'x1e.16xlarge' | 'x1e.32xlarge' | 'x2iezn.2xlarge' | 'x2iezn.4xlarge' | 'x2iezn.6xlarge' | 'x2iezn.8xlarge' | 'x2iezn.12xlarge' | 'x2iezn.metal' | 'x2gd.medium' | 'x2gd.large' | 'x2gd.xlarge' | 'x2gd.2xlarge' | 'x2gd.4xlarge' | 'x2gd.8xlarge' | 'x2gd.12xlarge' | 'x2gd.16xlarge' | 'x2gd.metal' | 'z1d.large' | 'z1d.xlarge' | 'z1d.2xlarge' | 'z1d.3xlarge' | 'z1d.6xlarge' | 'z1d.12xlarge' | 'z1d.metal' | 'x2idn.16xlarge' | 'x2idn.24xlarge' | 'x2idn.32xlarge' | 'x2iedn.xlarge' | 'x2iedn.2xlarge' | 'x2iedn.4xlarge' | 'x2iedn.8xlarge' | 'x2iedn.16xlarge' | 'x2iedn.24xlarge' | 'x2iedn.32xlarge' | 'c6a.large' | 'c6a.xlarge' | 'c6a.2xlarge' | 'c6a.4xlarge' | 'c6a.8xlarge' | 'c6a.12xlarge' | 'c6a.16xlarge' | 'c6a.24xlarge' | 'c6a.32xlarge' | 'c6a.48xlarge' | 'c6a.metal' | 'm6a.metal' | 'i4i.large' | 'i4i.xlarge' | 'i4i.2xlarge' | 'i4i.4xlarge' | 'i4i.8xlarge' | 'i4i.16xlarge' | 'i4i.32xlarge' | 'i4i.metal' | 'x2idn.metal' | 'x2iedn.metal' | 'c7g.medium' | 'c7g.large' | 'c7g.xlarge' | 'c7g.2xlarge' | 'c7g.4xlarge' | 'c7g.8xlarge' | 'c7g.12xlarge' | 'c7g.16xlarge' | 'mac2.metal' | 'c6id.large' | 'c6id.xlarge' | 'c6id.2xlarge' | 'c6id.4xlarge' | 'c6id.8xlarge' | 'c6id.12xlarge' | 'c6id.16xlarge' | 'c6id.24xlarge' | 'c6id.32xlarge' | 'c6id.metal' | 'm6id.large' | 'm6id.xlarge' | 'm6id.2xlarge' | 'm6id.4xlarge' | 'm6id.8xlarge' | 'm6id.12xlarge' | 'm6id.16xlarge' | 'm6id.24xlarge' | 'm6id.32xlarge' | 'm6id.metal' | 'r6id.large' | 'r6id.xlarge' | 'r6id.2xlarge' | 'r6id.4xlarge' | 'r6id.8xlarge' | 'r6id.12xlarge' | 'r6id.16xlarge' | 'r6id.24xlarge' | 'r6id.32xlarge' | 'r6id.metal' | 'r6a.large' | 'r6a.xlarge' | 'r6a.2xlarge' | 'r6a.4xlarge' | 'r6a.8xlarge' | 'r6a.12xlarge' | 'r6a.16xlarge' | 'r6a.24xlarge' | 'r6a.32xlarge' | 'r6a.48xlarge' | 'r6a.metal' | 'p4de.24xlarge' | 'u-3tb1.56xlarge' | 'u-18tb1.112xlarge' | 'u-24tb1.112xlarge' | 'trn1.2xlarge' | 'trn1.32xlarge' | 'hpc6id.32xlarge' | 'c6in.large' | 'c6in.xlarge' | 'c6in.2xlarge' | 'c6in.4xlarge' | 'c6in.8xlarge' | 'c6in.12xlarge' | 'c6in.16xlarge' | 'c6in.24xlarge' | 'c6in.32xlarge' | 'm6in.large' | 'm6in.xlarge' | 'm6in.2xlarge' | 'm6in.4xlarge' | 'm6in.8xlarge' | 'm6in.12xlarge' | 'm6in.16xlarge' | 'm6in.24xlarge' | 'm6in.32xlarge' | 'm6idn.large' | 'm6idn.xlarge' | 'm6idn.2xlarge' | 'm6idn.4xlarge' | 'm6idn.8xlarge' | 'm6idn.12xlarge' | 'm6idn.16xlarge' | 'm6idn.24xlarge' | 'm6idn.32xlarge' | 'r6in.large' | 'r6in.xlarge' | 'r6in.2xlarge' | 'r6in.4xlarge' | 'r6in.8xlarge' | 'r6in.12xlarge' | 'r6in.16xlarge' | 'r6in.24xlarge' | 'r6in.32xlarge' | 'r6idn.large' | 'r6idn.xlarge' | 'r6idn.2xlarge' | 'r6idn.4xlarge' | 'r6idn.8xlarge' | 'r6idn.12xlarge' | 'r6idn.16xlarge' | 'r6idn.24xlarge' | 'r6idn.32xlarge' | 'c7g.metal' | 'm7g.medium' | 'm7g.large' | 'm7g.xlarge' | 'm7g.2xlarge' | 'm7g.4xlarge' | 'm7g.8xlarge' | 'm7g.12xlarge' | 'm7g.16xlarge' | 'm7g.metal' | 'r7g.medium' | 'r7g.large' | 'r7g.xlarge' | 'r7g.2xlarge' | 'r7g.4xlarge' | 'r7g.8xlarge' | 'r7g.12xlarge' | 'r7g.16xlarge' | 'r7g.metal' | 'c6in.metal' | 'm6in.metal' | 'm6idn.metal' | 'r6in.metal' | 'r6idn.metal' | 'inf2.xlarge' | 'inf2.8xlarge' | 'inf2.24xlarge' | 'inf2.48xlarge' | 'trn1n.32xlarge' | 'i4g.large' | 'i4g.xlarge' | 'i4g.2xlarge' | 'i4g.4xlarge' | 'i4g.8xlarge' | 'i4g.16xlarge' | 'hpc7g.4xlarge' | 'hpc7g.8xlarge' | 'hpc7g.16xlarge' | 'c7gn.medium' | 'c7gn.large' | 'c7gn.xlarge' | 'c7gn.2xlarge' | 'c7gn.4xlarge' | 'c7gn.8xlarge' | 'c7gn.12xlarge' | 'c7gn.16xlarge' | 'p5.48xlarge' | 'm7i.large' | 'm7i.xlarge' | 'm7i.2xlarge' | 'm7i.4xlarge' | 'm7i.8xlarge' | 'm7i.12xlarge' | 'm7i.16xlarge' | 'm7i.24xlarge' | 'm7i.48xlarge' | 'm7i-flex.large' | 'm7i-flex.xlarge' | 'm7i-flex.2xlarge' | 'm7i-flex.4xlarge' | 'm7i-flex.8xlarge' | 'm7a.medium' | 'm7a.large' | 'm7a.xlarge' | 'm7a.2xlarge' | 'm7a.4xlarge' | 'm7a.8xlarge' | 'm7a.12xlarge' | 'm7a.16xlarge' | 'm7a.24xlarge' | 'm7a.32xlarge' | 'm7a.48xlarge' | 'm7a.metal-48xl' | 'hpc7a.12xlarge' | 'hpc7a.24xlarge' | 'hpc7a.48xlarge' | 'hpc7a.96xlarge' | 'c7gd.medium' | 'c7gd.large' | 'c7gd.xlarge' | 'c7gd.2xlarge' | 'c7gd.4xlarge' | 'c7gd.8xlarge' | 'c7gd.12xlarge' | 'c7gd.16xlarge' | 'm7gd.medium' | 'm7gd.large' | 'm7gd.xlarge' | 'm7gd.2xlarge' | 'm7gd.4xlarge' | 'm7gd.8xlarge' | 'm7gd.12xlarge' | 'm7gd.16xlarge' | 'r7gd.medium' | 'r7gd.large' | 'r7gd.xlarge' | 'r7gd.2xlarge' | 'r7gd.4xlarge' | 'r7gd.8xlarge' | 'r7gd.12xlarge' | 'r7gd.16xlarge' | 'r7a.medium' | 'r7a.large' | 'r7a.xlarge' | 'r7a.2xlarge' | 'r7a.4xlarge' | 'r7a.8xlarge' | 'r7a.12xlarge' | 'r7a.16xlarge' | 'r7a.24xlarge' | 'r7a.32xlarge' | 'r7a.48xlarge' | 'c7i.large' | 'c7i.xlarge' | 'c7i.2xlarge' | 'c7i.4xlarge' | 'c7i.8xlarge' | 'c7i.12xlarge' | 'c7i.16xlarge' | 'c7i.24xlarge' | 'c7i.48xlarge' | 'mac2-m2pro.metal' | 'r7iz.large' | 'r7iz.xlarge' | 'r7iz.2xlarge' | 'r7iz.4xlarge' | 'r7iz.8xlarge' | 'r7iz.12xlarge' | 'r7iz.16xlarge' | 'r7iz.32xlarge' | 'c7a.medium' | 'c7a.large' | 'c7a.xlarge' | 'c7a.2xlarge' | 'c7a.4xlarge' | 'c7a.8xlarge' | 'c7a.12xlarge' | 'c7a.16xlarge' | 'c7a.24xlarge' | 'c7a.32xlarge' | 'c7a.48xlarge' | 'c7a.metal-48xl' | 'r7a.metal-48xl' | 'r7i.large' | 'r7i.xlarge' | 'r7i.2xlarge' | 'r7i.4xlarge' | 'r7i.8xlarge' | 'r7i.12xlarge' | 'r7i.16xlarge' | 'r7i.24xlarge' | 'r7i.48xlarge' | 'dl2q.24xlarge' | 'mac2-m2.metal' | 'i4i.12xlarge' | 'i4i.24xlarge' | 'c7i.metal-24xl' | 'c7i.metal-48xl' | 'm7i.metal-24xl' | 'm7i.metal-48xl' | 'r7i.metal-24xl' | 'r7i.metal-48xl' | 'r7iz.metal-16xl' | 'r7iz.metal-32xl' | 'c7gd.metal' | 'm7gd.metal' | 'r7gd.metal' | 'g6.xlarge' | 'g6.2xlarge' | 'g6.4xlarge' | 'g6.8xlarge' | 'g6.12xlarge' | 'g6.16xlarge' | 'g6.24xlarge' | 'g6.48xlarge' | 'gr6.4xlarge' | 'gr6.8xlarge' | 'c7i-flex.large' | 'c7i-flex.xlarge' | 'c7i-flex.2xlarge' | 'c7i-flex.4xlarge' | 'c7i-flex.8xlarge' | 'u7i-12tb.224xlarge' | 'u7in-16tb.224xlarge' | 'u7in-24tb.224xlarge' | 'u7in-32tb.224xlarge' | 'u7ib-12tb.224xlarge' | 'c7gn.metal' | 'r8g.medium' | 'r8g.large' | 'r8g.xlarge' | 'r8g.2xlarge' | 'r8g.4xlarge' | 'r8g.8xlarge' | 'r8g.12xlarge' | 'r8g.16xlarge' | 'r8g.24xlarge' | 'r8g.48xlarge' | 'r8g.metal-24xl' | 'r8g.metal-48xl' | 'mac2-m1ultra.metal' | 'g6e.xlarge' | 'g6e.2xlarge' | 'g6e.4xlarge' | 'g6e.8xlarge' | 'g6e.12xlarge' | 'g6e.16xlarge' | 'g6e.24xlarge' | 'g6e.48xlarge' | 'c8g.medium' | 'c8g.large' | 'c8g.xlarge' | 'c8g.2xlarge' | 'c8g.4xlarge' | 'c8g.8xlarge' | 'c8g.12xlarge' | 'c8g.16xlarge' | 'c8g.24xlarge' | 'c8g.48xlarge' | 'c8g.metal-24xl' | 'c8g.metal-48xl' | 'm8g.medium' | 'm8g.large' | 'm8g.xlarge' | 'm8g.2xlarge' | 'm8g.4xlarge' | 'm8g.8xlarge' | 'm8g.12xlarge' | 'm8g.16xlarge' | 'm8g.24xlarge' | 'm8g.48xlarge' | 'm8g.metal-24xl' | 'm8g.metal-48xl' | 'x8g.medium' | 'x8g.large' | 'x8g.xlarge' | 'x8g.2xlarge' | 'x8g.4xlarge' | 'x8g.8xlarge' | 'x8g.12xlarge' | 'x8g.16xlarge' | 'x8g.24xlarge' | 'x8g.48xlarge' | 'x8g.metal-24xl' | 'x8g.metal-48xl' | 'i7ie.large' | 'i7ie.xlarge' | 'i7ie.2xlarge' | 'i7ie.3xlarge' | 'i7ie.6xlarge' | 'i7ie.12xlarge' | 'i7ie.18xlarge' | 'i7ie.24xlarge' | 'i7ie.48xlarge' | 'i8g.large' | 'i8g.xlarge' | 'i8g.2xlarge' | 'i8g.4xlarge' | 'i8g.8xlarge' | 'i8g.12xlarge' | 'i8g.16xlarge' | 'i8g.24xlarge' | 'i8g.metal-24xl' | 'u7i-6tb.112xlarge' | 'u7i-8tb.112xlarge' | 'u7inh-32tb.480xlarge' | 'p5e.48xlarge' | 'p5en.48xlarge' | 'f2.12xlarge' | 'f2.48xlarge' | 'trn2.48xlarge' | 'c7i-flex.12xlarge' | 'c7i-flex.16xlarge' | 'm7i-flex.12xlarge' | 'm7i-flex.16xlarge' | 'i7ie.metal-24xl' | 'i7ie.metal-48xl' | 'i8g.48xlarge' | 'c8gd.medium' | 'c8gd.large' | 'c8gd.xlarge' | 'c8gd.2xlarge' | 'c8gd.4xlarge' | 'c8gd.8xlarge' | 'c8gd.12xlarge' | 'c8gd.16xlarge' | 'c8gd.24xlarge' | 'c8gd.48xlarge' | 'c8gd.metal-24xl' | 'c8gd.metal-48xl' | 'i7i.large' | 'i7i.xlarge' | 'i7i.2xlarge' | 'i7i.4xlarge' | 'i7i.8xlarge' | 'i7i.12xlarge' | 'i7i.16xlarge' | 'i7i.24xlarge' | 'i7i.48xlarge' | 'i7i.metal-24xl' | 'i7i.metal-48xl' | 'p6-b200.48xlarge' | 'm8gd.medium' | 'm8gd.large' | 'm8gd.xlarge' | 'm8gd.2xlarge' | 'm8gd.4xlarge' | 'm8gd.8xlarge' | 'm8gd.12xlarge' | 'm8gd.16xlarge' | 'm8gd.24xlarge' | 'm8gd.48xlarge' | 'm8gd.metal-24xl' | 'm8gd.metal-48xl' | 'r8gd.medium' | 'r8gd.large' | 'r8gd.xlarge' | 'r8gd.2xlarge' | 'r8gd.4xlarge' | 'r8gd.8xlarge' | 'r8gd.12xlarge' | 'r8gd.16xlarge' | 'r8gd.24xlarge' | 'r8gd.48xlarge' | 'r8gd.metal-24xl' | 'r8gd.metal-48xl' | 'c8gn.medium' | 'c8gn.large' | 'c8gn.xlarge' | 'c8gn.2xlarge' | 'c8gn.4xlarge' | 'c8gn.8xlarge' | 'c8gn.12xlarge' | 'c8gn.16xlarge' | 'c8gn.24xlarge' | 'c8gn.48xlarge' | 'c8gn.metal-24xl' | 'c8gn.metal-48xl' | 'f2.6xlarge' | 'p6e-gb200.36xlarge' | 'g6f.large' | 'g6f.xlarge' | 'g6f.2xlarge' | 'g6f.4xlarge' | 'gr6f.4xlarge' | 'p5.4xlarge' | 'r8i.large' | 'r8i.xlarge' | 'r8i.2xlarge' | 'r8i.4xlarge' | 'r8i.8xlarge' | 'r8i.12xlarge' | 'r8i.16xlarge' | 'r8i.24xlarge' | 'r8i.32xlarge' | 'r8i.48xlarge' | 'r8i.96xlarge' | 'r8i.metal-48xl' | 'r8i.metal-96xl' | 'r8i-flex.large' | 'r8i-flex.xlarge' | 'r8i-flex.2xlarge' | 'r8i-flex.4xlarge' | 'r8i-flex.8xlarge' | 'r8i-flex.12xlarge' | 'r8i-flex.16xlarge' | 'm8i.large' | 'm8i.xlarge' | 'm8i.2xlarge' | 'm8i.4xlarge' | 'm8i.8xlarge' | 'm8i.12xlarge' | 'm8i.16xlarge' | 'm8i.24xlarge' | 'm8i.32xlarge' | 'm8i.48xlarge' | 'm8i.96xlarge' | 'm8i.metal-48xl' | 'm8i.metal-96xl' | 'm8i-flex.large' | 'm8i-flex.xlarge' | 'm8i-flex.2xlarge' | 'm8i-flex.4xlarge' | 'm8i-flex.8xlarge' | 'm8i-flex.12xlarge' | 'm8i-flex.16xlarge' | 'i8ge.large' | 'i8ge.xlarge' | 'i8ge.2xlarge' | 'i8ge.3xlarge' | 'i8ge.6xlarge' | 'i8ge.12xlarge' | 'i8ge.18xlarge' | 'i8ge.24xlarge' | 'i8ge.48xlarge' | 'i8ge.metal-24xl' | 'i8ge.metal-48xl' | 'mac-m4.metal' | 'mac-m4pro.metal' | 'r8gn.medium' | 'r8gn.large' | 'r8gn.xlarge' | 'r8gn.2xlarge' | 'r8gn.4xlarge' | 'r8gn.8xlarge' | 'r8gn.12xlarge' | 'r8gn.16xlarge' | 'r8gn.24xlarge' | 'r8gn.48xlarge' | 'r8gn.metal-24xl' | 'r8gn.metal-48xl' | 'c8i.large' | 'c8i.xlarge' | 'c8i.2xlarge' | 'c8i.4xlarge' | 'c8i.8xlarge' | 'c8i.12xlarge' | 'c8i.16xlarge' | 'c8i.24xlarge' | 'c8i.32xlarge' | 'c8i.48xlarge' | 'c8i.96xlarge' | 'c8i.metal-48xl' | 'c8i.metal-96xl' | 'c8i-flex.large' | 'c8i-flex.xlarge' | 'c8i-flex.2xlarge' | 'c8i-flex.4xlarge' | 'c8i-flex.8xlarge' | 'c8i-flex.12xlarge' | 'c8i-flex.16xlarge' | 'r8gb.medium' | 'r8gb.large' | 'r8gb.xlarge' | 'r8gb.2xlarge' | 'r8gb.4xlarge' | 'r8gb.8xlarge' | 'r8gb.12xlarge' | 'r8gb.16xlarge' | 'r8gb.24xlarge' | 'r8gb.metal-24xl' | 'm8a.medium' | 'm8a.large' | 'm8a.xlarge' | 'm8a.2xlarge' | 'm8a.4xlarge' | 'm8a.8xlarge' | 'm8a.12xlarge' | 'm8a.16xlarge' | 'm8a.24xlarge' | 'm8a.48xlarge' | 'm8a.metal-24xl' | 'm8a.metal-48xl' | 'trn2.3xlarge' | 'r8a.medium' | 'r8a.large' | 'r8a.xlarge' | 'r8a.2xlarge' | 'r8a.4xlarge' | 'r8a.8xlarge' | 'r8a.12xlarge' | 'r8a.16xlarge' | 'r8a.24xlarge' | 'r8a.48xlarge' | 'r8a.metal-24xl' | 'r8a.metal-48xl' | 'p6-b300.48xlarge' | 'c8a.medium' | 'c8a.large' | 'c8a.xlarge' | 'c8a.2xlarge' | 'c8a.4xlarge' | 'c8a.8xlarge' | 'c8a.12xlarge' | 'c8a.16xlarge' | 'c8a.24xlarge' | 'c8a.48xlarge' | 'c8a.metal-24xl' | 'c8a.metal-48xl' | 'c8gb.12xlarge' | 'c8gb.16xlarge' | 'c8gb.24xlarge' | 'c8gb.2xlarge' | 'c8gb.4xlarge' | 'c8gb.8xlarge' | 'c8gb.large' | 'c8gb.medium' | 'c8gb.metal-24xl' | 'c8gb.xlarge' | 'c8gb.48xlarge' | 'c8gb.metal-48xl' | 'm8gb.12xlarge' | 'm8gb.16xlarge' | 'm8gb.24xlarge' | 'm8gb.2xlarge' | 'm8gb.4xlarge' | 'm8gb.8xlarge' | 'm8gb.large' | 'm8gb.medium' | 'm8gb.xlarge' | 'm8gb.48xlarge' | 'm8gb.metal-24xl' | 'm8gb.metal-48xl' | 'm8gn.12xlarge' | 'm8gn.16xlarge' | 'm8gn.24xlarge' | 'm8gn.2xlarge' | 'm8gn.48xlarge' | 'm8gn.4xlarge' | 'm8gn.8xlarge' | 'm8gn.large' | 'm8gn.medium' | 'm8gn.xlarge' | 'm8gn.metal-24xl' | 'm8gn.metal-48xl' | 'x8aedz.12xlarge' | 'x8aedz.24xlarge' | 'x8aedz.3xlarge' | 'x8aedz.6xlarge' | 'x8aedz.large' | 'x8aedz.metal-12xl' | 'x8aedz.metal-24xl' | 'x8aedz.xlarge' | 'm8azn.medium' | 'm8azn.large' | 'm8azn.xlarge' | 'm8azn.3xlarge' | 'm8azn.6xlarge' | 'm8azn.12xlarge' | 'm8azn.24xlarge' | 'm8azn.metal-12xl' | 'm8azn.metal-24xl' | 'x8i.large' | 'x8i.xlarge' | 'x8i.2xlarge' | 'x8i.4xlarge' | 'x8i.8xlarge' | 'x8i.12xlarge' | 'x8i.16xlarge' | 'x8i.24xlarge' | 'x8i.32xlarge' | 'x8i.48xlarge' | 'x8i.64xlarge' | 'x8i.96xlarge' | 'x8i.metal-48xl' | 'x8i.metal-96xl' | 'mac-m4max.metal' | 'g7e.2xlarge' | 'g7e.4xlarge' | 'g7e.8xlarge' | 'g7e.12xlarge' | 'g7e.24xlarge' | 'g7e.48xlarge' | 'r8id.large' | 'r8id.xlarge' | 'r8id.2xlarge' | 'r8id.4xlarge' | 'r8id.8xlarge' | 'r8id.12xlarge' | 'r8id.16xlarge' | 'r8id.24xlarge' | 'r8id.32xlarge' | 'r8id.48xlarge' | 'r8id.96xlarge' | 'r8id.metal-48xl' | 'r8id.metal-96xl';
  /** The ID of the kernel. */
  KernelId?: string;
  /** The name of the key pair. */
  KeyName?: string;
  /** Indicates whether basic or detailed monitoring is enabled for the instance. Default: Disabled */
  Monitoring?: RunInstancesMonitoringEnabled;
  /** The network interfaces. If you specify a network interface, you must specify subnet IDs and security group IDs using the network interface. */
  NetworkInterfaces?: any[];
  /** The placement information for the instance. */
  Placement?: SpotPlacement;
  /** The ID of the RAM disk. */
  RamdiskId?: string;
  /** The ID of the subnet in which to launch the instance. */
  SubnetId?: string;
  /** The base64-encoded user data that instances use when starting up. User data is limited to 16 KB. */
  UserData?: string;
}

export interface ElasticGpuSpecification {
  /** The type of Elastic Graphics accelerator. */
  Type: string;
}

export interface ElasticInferenceAccelerator {
  /** The type of elastic inference accelerator. The possible values are eia1.medium, eia1.large, eia1.xlarge, eia2.medium, eia2.large, and eia2.xlarge. */
  Type: string;
  /** The number of elastic inference accelerators to attach to the instance. Default: 1 */
  Count?: number;
}

export interface LaunchTemplateSpecification {
  /** The ID of the launch template. You must specify either the launch template ID or the launch template name, but not both. */
  LaunchTemplateId?: string;
  /** The name of the launch template. You must specify either the launch template ID or the launch template name, but not both. */
  LaunchTemplateName?: string;
  /** The launch template version number, $Latest, or $Default. A value of $Latest uses the latest version of the launch template. A value of $Default uses the default version of the launch template. Defaul */
  Version?: string;
}

export interface SpotMarketOptions {
  /** The maximum hourly price that you're willing to pay for a Spot Instance. We do not recommend using this parameter because it can lead to increased interruptions. If you do not specify this parameter,  */
  MaxPrice?: string;
  /** The Spot Instance request type. For RunInstances, persistent Spot Instance requests are only supported when the instance interruption behavior is either hibernate or stop. */
  SpotInstanceType?: 'one-time' | 'persistent';
  /** Deprecated. */
  BlockDurationMinutes?: number;
  /** The end date of the request, in UTC format (YYYY-MM-DDTHH:MM:SSZ). Supported only for persistent requests. For a persistent request, the request remains active until the ValidUntil date and time is re */
  ValidUntil?: string;
  /** The behavior when a Spot Instance is interrupted. If Configured (for HibernationOptions ) is set to true, the InstanceInterruptionBehavior parameter is automatically set to hibernate. If you set it to */
  InstanceInterruptionBehavior?: 'hibernate' | 'stop' | 'terminate';
}

export interface InstanceMarketOptionsRequest {
  /** The market type. */
  MarketType?: 'spot' | 'capacity-block' | 'interruptible-capacity-reservation';
  /** The options for Spot Instances. */
  SpotOptions?: SpotMarketOptions;
}

export interface CpuOptionsRequest {
  /** The number of CPU cores for the instance. */
  CoreCount?: number;
  /** The number of threads per CPU core. To disable multithreading for the instance, specify a value of 1. Otherwise, specify the default value of 2. */
  ThreadsPerCore?: number;
  /** Indicates whether to enable the instance for AMD SEV-SNP. AMD SEV-SNP is supported with M6a, R6a, and C6a instance types only. For more information, see AMD SEV-SNP. */
  AmdSevSnp?: 'enabled' | 'disabled';
  /** Indicates whether to enable the instance for nested virtualization. Nested virtualization is supported only on 8th generation Intel-based instance types (c8i, m8i, r8i, and their flex variants). When  */
  NestedVirtualization?: 'enabled' | 'disabled';
}

export interface HibernationOptionsRequest {
  /** Set to true to enable your instance for hibernation. For Spot Instances, if you set Configured to true, either omit the InstanceInterruptionBehavior parameter (for SpotMarketOptions ), or set it to hi */
  Configured?: boolean;
}

export interface LicenseConfigurationRequest {
  /** The Amazon Resource Name (ARN) of the license configuration. */
  LicenseConfigurationArn?: string;
}

export interface InstanceMetadataOptionsRequest {
  /** Indicates whether IMDSv2 is required. optional - IMDSv2 is optional, which means that you can use either IMDSv2 or IMDSv1. required - IMDSv2 is required, which means that IMDSv1 is disabled, and you m */
  HttpTokens?: 'optional' | 'required';
  /** The maximum number of hops that the metadata token can travel. Possible values: Integers from 1 to 64 */
  HttpPutResponseHopLimit?: number;
  /** Enables or disables the HTTP metadata endpoint on your instances. If you specify a value of disabled, you cannot access your instance metadata. Default: enabled */
  HttpEndpoint?: 'disabled' | 'enabled';
  /** Enables or disables the IPv6 endpoint for the instance metadata service. Default: disabled */
  HttpProtocolIpv6?: 'disabled' | 'enabled';
  /** Set to enabled to allow access to instance tags from the instance metadata. Set to disabled to turn off access to instance tags from the instance metadata. For more information, see View tags for your */
  InstanceMetadataTags?: 'disabled' | 'enabled';
}

export interface EnclaveOptionsRequest {
  /** To enable the instance for Amazon Web Services Nitro Enclaves, set this parameter to true. */
  Enabled?: boolean;
}

export interface PrivateDnsNameOptionsRequest {
  /** The type of hostname for EC2 instances. For IPv4 only subnets, an instance DNS name must be based on the instance IPv4 address. For IPv6 only subnets, an instance DNS name must be based on the instanc */
  HostnameType?: 'ip-name' | 'resource-name';
  /** Indicates whether to respond to DNS queries for instance hostnames with DNS A records. */
  EnableResourceNameDnsARecord?: boolean;
  /** Indicates whether to respond to DNS queries for instance hostnames with DNS AAAA records. */
  EnableResourceNameDnsAAAARecord?: boolean;
}

export interface InstanceMaintenanceOptionsRequest {
  /** Disables the automatic recovery behavior of your instance or sets it to default. For more information, see Simplified automatic recovery. */
  AutoRecovery?: 'disabled' | 'default';
}

export interface InstanceNetworkPerformanceOptionsRequest {
  /** Specify the bandwidth weighting option to boost the associated type of baseline bandwidth, as follows: default This option uses the standard bandwidth configuration for your instance type. vpc-1 This  */
  BandwidthWeighting?: 'default' | 'vpc-1' | 'ebs-1';
}

export interface InstanceSecondaryInterfaceSpecificationRequest {
  /** Indicates whether the secondary interface is deleted when the instance is terminated. The only supported value for this field is true. */
  DeleteOnTermination?: boolean;
  /** The device index for the secondary interface attachment. */
  DeviceIndex?: number;
  /** The private IPv4 addresses to assign to the secondary interface. */
  PrivateIpAddresses?: any[];
  /** The number of private IPv4 addresses to assign to the secondary interface. */
  PrivateIpAddressCount?: number;
  /** The ID of the secondary subnet. */
  SecondarySubnetId?: string;
  /** The type of secondary interface. */
  InterfaceType?: 'secondary';
  /** The index of the network card. The network card must support secondary interfaces. */
  NetworkCardIndex?: number;
}

export interface InstanceNetworkInterfaceSpecification {
  /** Indicates whether to assign a public IPv4 address to an instance you launch in a VPC. The public IP address can only be assigned to a network interface for eth0, and can only be assigned to a new netw */
  AssociatePublicIpAddress?: boolean;
  /** If set to true, the interface is deleted when the instance is terminated. You can specify true only if creating a new network interface when launching an instance. */
  DeleteOnTermination?: boolean;
  /** The description of the network interface. Applies only if creating a network interface when launching an instance. */
  Description?: string;
  /** The position of the network interface in the attachment order. A primary network interface has a device index of 0. If you specify a network interface when launching an instance, you must specify the  */
  DeviceIndex?: number;
  /** The IDs of the security groups for the network interface. Applies only if creating a network interface when launching an instance. */
  Groups?: any[];
  /** A number of IPv6 addresses to assign to the network interface. Amazon EC2 chooses the IPv6 addresses from the range of the subnet. You cannot specify this option and the option to assign specific IPv6 */
  Ipv6AddressCount?: number;
  /** The IPv6 addresses to assign to the network interface. You cannot specify this option and the option to assign a number of IPv6 addresses in the same request. You cannot specify this option if you've  */
  Ipv6Addresses?: any[];
  /** The ID of the network interface. If you are creating a Spot Fleet, omit this parameter because you can’t specify a network interface ID in a launch specification. */
  NetworkInterfaceId?: string;
  /** The private IPv4 address of the network interface. Applies only if creating a network interface when launching an instance. You cannot specify this option if you're launching more than one instance in */
  PrivateIpAddress?: string;
  /** The private IPv4 addresses to assign to the network interface. Only one private IPv4 address can be designated as primary. You cannot specify this option if you're launching more than one instance in  */
  PrivateIpAddresses?: any[];
  /** The number of secondary private IPv4 addresses. You can’t specify this parameter and also specify a secondary private IP address using the PrivateIpAddress parameter. */
  SecondaryPrivateIpAddressCount?: number;
  /** The ID of the subnet associated with the network interface. Applies only if creating a network interface when launching an instance. */
  SubnetId?: string;
  /** Indicates whether to assign a carrier IP address to the network interface. You can only assign a carrier IP address to a network interface that is in a subnet in a Wavelength Zone. For more informatio */
  AssociateCarrierIpAddress?: boolean;
  /** The type of network interface. If you specify efa-only, do not assign any IP addresses to the network interface. EFA-only network interfaces do not support IP addresses. Valid values: interface | efa  */
  InterfaceType?: string;
  /** The index of the network card. Some instance types support multiple network cards. The primary network interface must be assigned to network card index 0. The default is network card index 0. If you a */
  NetworkCardIndex?: number;
  /** The IPv4 delegated prefixes to be assigned to the network interface. You cannot use this option if you use the Ipv4PrefixCount option. */
  Ipv4Prefixes?: any[];
  /** The number of IPv4 delegated prefixes to be automatically assigned to the network interface. You cannot use this option if you use the Ipv4Prefix option. */
  Ipv4PrefixCount?: number;
  /** The IPv6 delegated prefixes to be assigned to the network interface. You cannot use this option if you use the Ipv6PrefixCount option. */
  Ipv6Prefixes?: any[];
  /** The number of IPv6 delegated prefixes to be automatically assigned to the network interface. You cannot use this option if you use the Ipv6Prefix option. */
  Ipv6PrefixCount?: number;
  /** The primary IPv6 address of the network interface. When you enable an IPv6 GUA address to be a primary IPv6, the first IPv6 GUA will be made the primary IPv6 address until the instance is terminated o */
  PrimaryIpv6?: boolean;
  /** Specifies the ENA Express settings for the network interface that's attached to the instance. */
  EnaSrdSpecification?: any;
  /** A security group connection tracking specification that enables you to set the timeout for connection tracking on an Elastic network interface. For more information, see Connection tracking timeouts i */
  ConnectionTrackingSpecification?: any;
  /** The number of ENA queues to be created with the instance. */
  EnaQueueCount?: number;
}

export interface ScheduledInstancesIamInstanceProfile {
  /** The Amazon Resource Name (ARN). */
  Arn?: string;
  /** The name. */
  Name?: string;
}

export interface ScheduledInstancesMonitoring {
  /** Indicates whether monitoring is enabled. */
  Enabled?: boolean;
}

export interface ScheduledInstancesPlacement {
  /** The Availability Zone. */
  AvailabilityZone?: string;
  /** The name of the placement group. */
  GroupName?: string;
}

export interface ScheduledInstancesLaunchSpecification {
  /** The block device mapping entries. */
  BlockDeviceMappings?: any[];
  /** Indicates whether the instances are optimized for EBS I/O. This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide optimal EBS I/O performance. Th */
  EbsOptimized?: boolean;
  /** The IAM instance profile. */
  IamInstanceProfile?: ScheduledInstancesIamInstanceProfile;
  /** The ID of the Amazon Machine Image (AMI). */
  ImageId: string;
  /** The instance type. */
  InstanceType?: string;
  /** The ID of the kernel. */
  KernelId?: string;
  /** The name of the key pair. */
  KeyName?: string;
  /** Enable or disable monitoring for the instances. */
  Monitoring?: ScheduledInstancesMonitoring;
  /** The network interfaces. */
  NetworkInterfaces?: any[];
  /** The placement information. */
  Placement?: ScheduledInstancesPlacement;
  /** The ID of the RAM disk. */
  RamdiskId?: string;
  /** The IDs of the security groups. */
  SecurityGroupIds?: string[];
  /** The ID of the subnet in which to launch the instances. */
  SubnetId?: string;
  /** The base64-encoded MIME user data. */
  UserData?: string;
}

export interface SecurityGroupRuleDescription {
  /** The ID of the security group rule. */
  SecurityGroupRuleId?: string;
  /** The description of the security group rule. */
  Description?: string;
}

export interface AcceptAddressTransferInput {
  /** The Elastic IP address you are accepting for transfer. */
  Address: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** tag: - The key/value combination of a tag assigned to the resource. Use the tag key in the filter name and the tag value as the filter value. For example, to find all resources that have a tag with th */
  TagSpecifications?: TagSpecification[];
}

export interface AcceptCapacityReservationBillingOwnershipInput {
  /** The ID of the Capacity Reservation for which to accept the request. */
  CapacityReservationId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for accepting the quote. */
export interface AcceptReservedInstancesExchangeQuoteInput {
  /** The IDs of the Convertible Reserved Instances to exchange for another Convertible Reserved Instance of the same or higher value. */
  ReservedInstanceIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The configuration of the target Convertible Reserved Instance to exchange for your current Convertible Reserved Instances. */
  TargetConfigurations?: TargetConfigurationRequest[];
}

export interface AcceptTransitGatewayMulticastDomainAssociationsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IDs of the subnets to associate with the transit gateway multicast domain. */
  SubnetIds?: string[];
  /** The ID of the transit gateway attachment. */
  TransitGatewayAttachmentId?: string;
  /** The ID of the transit gateway multicast domain. */
  TransitGatewayMulticastDomainId?: string;
}

export interface AcceptTransitGatewayPeeringAttachmentInput {
  /** The ID of the transit gateway attachment. */
  TransitGatewayAttachmentId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AcceptTransitGatewayVpcAttachmentInput {
  /** The ID of the attachment. */
  TransitGatewayAttachmentId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AcceptVpcEndpointConnectionsInput {
  /** The ID of the VPC endpoint service. */
  ServiceId: string;
  /** The IDs of the interface VPC endpoints. */
  VpcEndpointIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AcceptVpcPeeringConnectionInput {
  /** The ID of the VPC peering connection. You must specify this parameter in the request. */
  VpcPeeringConnectionId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AdvertiseByoipCidrInput {
  /** The address range, in CIDR notation. This must be the exact range that you provisioned. You can't advertise only a portion of the provisioned range. */
  Cidr: string;
  /** The public 2-byte or 4-byte ASN that you want to advertise. */
  Asn?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** If you have Local Zones enabled, you can choose a network border group for Local Zones when you provision and advertise a BYOIPv4 CIDR. Choose the network border group carefully as the EIP and the Ama */
  NetworkBorderGroup?: string;
}

export interface AllocateAddressInput {
  /** The Elastic IP address to recover or an IPv4 address from an address pool. */
  Address?: string;
  /** The ID of a customer-owned address pool. Use this parameter to let Amazon EC2 select an address from the address pool. Alternatively, specify a specific address from the address pool. */
  CustomerOwnedIpv4Pool?: string;
  /** The network (vpc). */
  Domain?: 'vpc' | 'standard';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of an IPAM pool which has an Amazon-provided or BYOIP public IPv4 CIDR provisioned to it. For more information, see Allocate sequential Elastic IP addresses from an IPAM pool in the Amazon VPC  */
  IpamPoolId?: string;
  /** A unique set of Availability Zones, Local Zones, or Wavelength Zones from which Amazon Web Services advertises IP addresses. Use this parameter to limit the IP address to this location. IP addresses c */
  NetworkBorderGroup?: string;
  /** The ID of an address pool that you own. Use this parameter to let Amazon EC2 select an address from the address pool. To specify a specific address from the address pool, use the Address parameter ins */
  PublicIpv4Pool?: string;
  /** The tags to assign to the Elastic IP address. */
  TagSpecifications?: TagSpecification[];
}

export interface AllocateHostsInput {
  /** The IDs of the Outpost hardware assets on which to allocate the Dedicated Hosts. Targeting specific hardware assets on an Outpost can help to minimize latency between your workloads. This parameter is */
  AssetIds?: string[];
  /** Indicates whether the host accepts any untargeted instance launches that match its instance type configuration, or if it only accepts Host tenancy instance launches that specify its unique host ID. Fo */
  AutoPlacement?: 'on' | 'off';
  /** The Availability Zone in which to allocate the Dedicated Host. */
  AvailabilityZone?: string;
  /** The ID of the Availability Zone. */
  AvailabilityZoneId?: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring Idempotency. */
  ClientToken?: string;
  /** Indicates whether to enable or disable host maintenance for the Dedicated Host. For more information, see Host maintenance in the Amazon EC2 User Guide. */
  HostMaintenance?: 'on' | 'off';
  /** Indicates whether to enable or disable host recovery for the Dedicated Host. Host recovery is disabled by default. For more information, see Host recovery in the Amazon EC2 User Guide. Default: off */
  HostRecovery?: 'on' | 'off';
  /** Specifies the instance family to be supported by the Dedicated Hosts. If you specify an instance family, the Dedicated Hosts support multiple instance types within that instance family. If you want th */
  InstanceFamily?: string;
  /** Specifies the instance type to be supported by the Dedicated Hosts. If you specify an instance type, the Dedicated Hosts support instances of the specified instance type only. If you want the Dedicate */
  InstanceType?: string;
  /** The Amazon Resource Name (ARN) of the Amazon Web Services Outpost on which to allocate the Dedicated Host. If you specify OutpostArn, you can optionally specify AssetIds. If you are allocating the Ded */
  OutpostArn?: string;
  /** The number of Dedicated Hosts to allocate to your account with these parameters. If you are allocating the Dedicated Hosts on an Outpost, and you specify AssetIds, you can omit this parameter. In this */
  Quantity?: number;
  /** The tags to apply to the Dedicated Host during creation. */
  TagSpecifications?: TagSpecification[];
}

export interface AllocateIpamPoolCidrInput {
  /** The ID of the IPAM pool from which you would like to allocate a CIDR. */
  IpamPoolId: string;
  /** Include a particular CIDR range that can be returned by the pool. Allowed CIDRs are only allowed if using netmask length for allocation. */
  AllowedCidrs?: string[];
  /** The CIDR you would like to allocate from the IPAM pool. Note the following: If there is no DefaultNetmaskLength allocation rule set on the pool, you must specify either the NetmaskLength or the CIDR.  */
  Cidr?: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the allocation. */
  Description?: string;
  /** Exclude a particular CIDR range from being returned by the pool. Disallowed CIDRs are only allowed if using netmask length for allocation. */
  DisallowedCidrs?: string[];
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The netmask length of the CIDR you would like to allocate from the IPAM pool. Note the following: If there is no DefaultNetmaskLength allocation rule set on the pool, you must specify either the Netma */
  NetmaskLength?: number;
  /** A preview of the next available CIDR in a pool. */
  PreviewNextCidr?: boolean;
}

export interface ApplySecurityGroupsToClientVpnTargetNetworkInput {
  /** The ID of the Client VPN endpoint. */
  ClientVpnEndpointId: string;
  /** The IDs of the security groups to apply to the associated target network. Up to 5 security groups can be applied to an associated target network. */
  SecurityGroupIds: string[];
  /** The ID of the VPC in which the associated target network is located. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AssignIpv6AddressesInput {
  /** The ID of the network interface. */
  NetworkInterfaceId: string;
  /** The number of additional IPv6 addresses to assign to the network interface. The specified number of IPv6 addresses are assigned in addition to the existing IPv6 addresses that are already assigned to  */
  Ipv6AddressCount?: number;
  /** The IPv6 addresses to be assigned to the network interface. You can't use this option if you're specifying a number of IPv6 addresses. */
  Ipv6Addresses?: string[];
  /** The number of IPv6 prefixes that Amazon Web Services automatically assigns to the network interface. You cannot use this option if you use the Ipv6Prefixes option. */
  Ipv6PrefixCount?: number;
  /** One or more IPv6 prefixes assigned to the network interface. You can't use this option if you use the Ipv6PrefixCount option. */
  Ipv6Prefixes?: string[];
}

/** Contains the parameters for AssignPrivateIpAddresses. */
export interface AssignPrivateIpAddressesInput {
  /** The ID of the network interface. */
  NetworkInterfaceId: string;
  /** Indicates whether to allow an IP address that is already assigned to another network interface or instance to be reassigned to the specified network interface. */
  AllowReassignment?: boolean;
  /** The number of IPv4 prefixes that Amazon Web Services automatically assigns to the network interface. You can't use this option if you use the Ipv4 Prefixes option. */
  Ipv4PrefixCount?: number;
  /** One or more IPv4 prefixes assigned to the network interface. You can't use this option if you use the Ipv4PrefixCount option. */
  Ipv4Prefixes?: string[];
  /** The IP addresses to be assigned as a secondary private IP address to the network interface. You can't specify this parameter when also specifying a number of secondary IP addresses. If you don't speci */
  PrivateIpAddresses?: string[];
  /** The number of secondary IP addresses to assign to the network interface. You can't specify this parameter when also specifying private IP addresses. */
  SecondaryPrivateIpAddressCount?: number;
}

export interface AssignPrivateNatGatewayAddressInput {
  /** The ID of the NAT gateway. */
  NatGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The number of private IP addresses to assign to the NAT gateway. You can't specify this parameter when also specifying private IP addresses. */
  PrivateIpAddressCount?: number;
  /** The private IPv4 addresses you want to assign to the private NAT gateway. */
  PrivateIpAddresses?: string[];
}

export interface AssociateAddressInput {
  /** The allocation ID. This is required. */
  AllocationId?: string;
  /** Reassociation is automatic, but you can specify false to ensure the operation fails if the Elastic IP address is already associated with another resource. */
  AllowReassociation?: boolean;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the instance. The instance must have exactly one attached network interface. You can specify either the instance ID or the network interface ID, but not both. */
  InstanceId?: string;
  /** The ID of the network interface. If the instance has more than one network interface, you must specify a network interface ID. You can specify either the instance ID or the network interface ID, but n */
  NetworkInterfaceId?: string;
  /** The primary or secondary private IP address to associate with the Elastic IP address. If no private IP address is specified, the Elastic IP address is associated with the primary private IP address. */
  PrivateIpAddress?: string;
  /** Deprecated. */
  PublicIp?: string;
}

export interface AssociateCapacityReservationBillingOwnerInput {
  /** The ID of the Capacity Reservation. */
  CapacityReservationId: string;
  /** The ID of the consumer account to which to assign billing. */
  UnusedReservationBillingOwnerId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AssociateClientVpnTargetNetworkInput {
  /** The ID of the Client VPN endpoint. */
  ClientVpnEndpointId: string;
  /** The ID of the subnet to associate with the Client VPN endpoint. */
  SubnetId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AssociateDhcpOptionsInput {
  /** The ID of the DHCP options set, or default to associate no DHCP options with the VPC. */
  DhcpOptionsId: string;
  /** The ID of the VPC. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AssociateEnclaveCertificateIamRoleInput {
  /** The ARN of the ACM certificate with which to associate the IAM role. */
  CertificateArn: string;
  /** The ARN of the IAM role to associate with the ACM certificate. You can associate up to 16 IAM roles with an ACM certificate. */
  RoleArn: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AssociateIamInstanceProfileInput {
  /** The IAM instance profile. */
  IamInstanceProfile: IamInstanceProfileSpecification;
  /** The ID of the instance. */
  InstanceId: string;
}

export interface AssociateInstanceEventWindowInput {
  /** One or more targets associated with the specified event window. */
  AssociationTarget: InstanceEventWindowAssociationRequest;
  /** The ID of the event window. */
  InstanceEventWindowId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AssociateIpamByoasnInput {
  /** A public 2-byte or 4-byte ASN. */
  Asn: string;
  /** The BYOIP CIDR you want to associate with an ASN. */
  Cidr: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AssociateIpamResourceDiscoveryInput {
  /** An IPAM ID. */
  IpamId: string;
  /** A resource discovery ID. */
  IpamResourceDiscoveryId: string;
  /** A client token. */
  ClientToken?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Tag specifications. */
  TagSpecifications?: TagSpecification[];
}

export interface AssociateNatGatewayAddressInput {
  /** The allocation IDs of EIPs that you want to associate with your NAT gateway. */
  AllocationIds: string[];
  /** The ID of the NAT gateway. */
  NatGatewayId: string;
  /** For regional NAT gateways only: The Availability Zone where you want to associate an Elastic IP address (EIP). The regional NAT gateway uses a separate EIP in each AZ to handle outbound NAT traffic fr */
  AvailabilityZone?: string;
  /** For regional NAT gateways only: The ID of the Availability Zone where you want to associate an Elastic IP address (EIP). The regional NAT gateway uses a separate EIP in each AZ to handle outbound NAT  */
  AvailabilityZoneId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The private IPv4 addresses that you want to assign to the NAT gateway. */
  PrivateIpAddresses?: string[];
}

export interface AssociateRouteServerInput {
  /** The unique identifier for the route server to be associated. */
  RouteServerId: string;
  /** The ID of the VPC to associate with the route server. */
  VpcId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface AssociateRouteTableInput {
  /** The ID of the route table. */
  RouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the internet gateway or virtual private gateway. */
  GatewayId?: string;
  /** The ID of a public IPv4 pool. A public IPv4 pool is a pool of IPv4 addresses that you've brought to Amazon Web Services with BYOIP. */
  PublicIpv4Pool?: string;
  /** The ID of the subnet. */
  SubnetId?: string;
}

export interface AssociateSecurityGroupVpcInput {
  /** A security group ID. */
  GroupId: string;
  /** A VPC ID. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AssociateSubnetCidrBlockInput {
  /** The ID of your subnet. */
  SubnetId: string;
  /** The IPv6 CIDR block for your subnet. */
  Ipv6CidrBlock?: string;
  /** An IPv6 IPAM pool ID. */
  Ipv6IpamPoolId?: string;
  /** An IPv6 netmask length. */
  Ipv6NetmaskLength?: number;
}

export interface AssociateTransitGatewayMulticastDomainInput {
  /** The IDs of the subnets to associate with the transit gateway multicast domain. */
  SubnetIds: string[];
  /** The ID of the transit gateway attachment to associate with the transit gateway multicast domain. */
  TransitGatewayAttachmentId: string;
  /** The ID of the transit gateway multicast domain. */
  TransitGatewayMulticastDomainId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AssociateTransitGatewayPolicyTableInput {
  /** The ID of the transit gateway attachment to associate with the policy table. */
  TransitGatewayAttachmentId: string;
  /** The ID of the transit gateway policy table to associate with the transit gateway attachment. */
  TransitGatewayPolicyTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AssociateTransitGatewayRouteTableInput {
  /** The ID of the attachment. */
  TransitGatewayAttachmentId: string;
  /** The ID of the transit gateway route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AssociateTrunkInterfaceInput {
  /** The ID of the branch network interface. */
  BranchInterfaceId: string;
  /** The ID of the trunk network interface. */
  TrunkInterfaceId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The application key. This applies to the GRE protocol. */
  GreKey?: number;
  /** The ID of the VLAN. This applies to the VLAN protocol. */
  VlanId?: number;
}

export interface AssociateVpcCidrBlockInput {
  /** The ID of the VPC. */
  VpcId: string;
  /** Requests an Amazon-provided IPv6 CIDR block with a /56 prefix length for the VPC. You cannot specify the range of IPv6 addresses or the size of the CIDR block. */
  AmazonProvidedIpv6CidrBlock?: boolean;
  /** An IPv4 CIDR block to associate with the VPC. */
  CidrBlock?: string;
  /** Associate a CIDR allocated from an IPv4 IPAM pool to a VPC. For more information about Amazon VPC IP Address Manager (IPAM), see What is IPAM? in the Amazon VPC IPAM User Guide. */
  Ipv4IpamPoolId?: string;
  /** The netmask length of the IPv4 CIDR you would like to associate from an Amazon VPC IP Address Manager (IPAM) pool. For more information about IPAM, see What is IPAM? in the Amazon VPC IPAM User Guide. */
  Ipv4NetmaskLength?: number;
  /** An IPv6 CIDR block from the IPv6 address pool. You must also specify Ipv6Pool in the request. To let Amazon choose the IPv6 CIDR block for you, omit this parameter. */
  Ipv6CidrBlock?: string;
  /** The name of the location from which we advertise the IPV6 CIDR block. Use this parameter to limit the CIDR block to this location. You must set AmazonProvidedIpv6CidrBlock to true to use this paramete */
  Ipv6CidrBlockNetworkBorderGroup?: string;
  /** Associates a CIDR allocated from an IPv6 IPAM pool to a VPC. For more information about Amazon VPC IP Address Manager (IPAM), see What is IPAM? in the Amazon VPC IPAM User Guide. */
  Ipv6IpamPoolId?: string;
  /** The netmask length of the IPv6 CIDR you would like to associate from an Amazon VPC IP Address Manager (IPAM) pool. For more information about IPAM, see What is IPAM? in the Amazon VPC IPAM User Guide. */
  Ipv6NetmaskLength?: number;
  /** The ID of an IPv6 address pool from which to allocate the IPv6 CIDR block. */
  Ipv6Pool?: string;
}

export interface AttachClassicLinkVpcInput {
  /** The IDs of the security groups. You cannot specify security groups from a different VPC. */
  Groups: string[];
  /** The ID of the EC2-Classic instance. */
  InstanceId: string;
  /** The ID of the ClassicLink-enabled VPC. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AttachInternetGatewayInput {
  /** The ID of the internet gateway. */
  InternetGatewayId: string;
  /** The ID of the VPC. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for AttachNetworkInterface. */
export interface AttachNetworkInterfaceInput {
  /** The index of the device for the network interface attachment. */
  DeviceIndex: number;
  /** The ID of the instance. */
  InstanceId: string;
  /** The ID of the network interface. */
  NetworkInterfaceId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The number of ENA queues to be created with the instance. */
  EnaQueueCount?: number;
  /** Configures ENA Express for the network interface that this action attaches to the instance. */
  EnaSrdSpecification?: EnaSrdSpecification;
  /** The index of the network card. Some instance types support multiple network cards. The primary network interface must be assigned to network card index 0. The default is network card index 0. */
  NetworkCardIndex?: number;
}

export interface AttachVerifiedAccessTrustProviderInput {
  /** The ID of the Verified Access instance. */
  VerifiedAccessInstanceId: string;
  /** The ID of the Verified Access trust provider. */
  VerifiedAccessTrustProviderId: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AttachVolumeInput {
  /** The device name (for example, /dev/sdh or xvdh). */
  Device: string;
  /** The ID of the instance. */
  InstanceId: string;
  /** The ID of the EBS volume. The volume and instance must be within the same Availability Zone. */
  VolumeId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The index of the EBS card. Some instance types support multiple EBS cards. The default EBS card index is 0. */
  EbsCardIndex?: number;
}

/** Contains the parameters for AttachVpnGateway. */
export interface AttachVpnGatewayInput {
  /** The ID of the VPC. */
  VpcId: string;
  /** The ID of the virtual private gateway. */
  VpnGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AuthorizeClientVpnIngressInput {
  /** The ID of the Client VPN endpoint. */
  ClientVpnEndpointId: string;
  /** The IPv4 address range, in CIDR notation, of the network for which access is being authorized. */
  TargetNetworkCidr: string;
  /** The ID of the group to grant access to, for example, the Active Directory group or identity provider (IdP) group. Required if AuthorizeAllGroups is false or not specified. */
  AccessGroupId?: string;
  /** Indicates whether to grant access to all clients. Specify true to grant all clients who successfully establish a VPN connection access to the network. Must be set to true if AccessGroupId is not speci */
  AuthorizeAllGroups?: boolean;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A brief description of the authorization rule. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface AuthorizeSecurityGroupEgressInput {
  /** The ID of the security group. */
  GroupId: string;
  /** Not supported. Use IP permissions instead. */
  CidrIp?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Not supported. Use IP permissions instead. */
  FromPort?: number;
  /** The permissions for the security group rules. */
  IpPermissions?: IpPermission[];
  /** Not supported. Use IP permissions instead. */
  IpProtocol?: string;
  /** Not supported. Use IP permissions instead. */
  SourceSecurityGroupName?: string;
  /** Not supported. Use IP permissions instead. */
  SourceSecurityGroupOwnerId?: string;
  /** The tags applied to the security group rule. */
  TagSpecifications?: TagSpecification[];
  /** Not supported. Use IP permissions instead. */
  ToPort?: number;
}

export interface AuthorizeSecurityGroupIngressInput {
  /** The IPv4 address range, in CIDR format. Amazon Web Services canonicalizes IPv4 and IPv6 CIDRs. For example, if you specify 100.68.0.18/18 for the CIDR block, Amazon Web Services canonicalizes the CIDR */
  CidrIp?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** If the protocol is TCP or UDP, this is the start of the port range. If the protocol is ICMP, this is the ICMP type or -1 (all ICMP types). To specify multiple rules and descriptions for the rules, use */
  FromPort?: number;
  /** The ID of the security group. */
  GroupId?: string;
  /** [Default VPC] The name of the security group. For security groups for a default VPC you can specify either the ID or the name of the security group. For security groups for a nondefault VPC, you must  */
  GroupName?: string;
  /** The permissions for the security group rules. */
  IpPermissions?: IpPermission[];
  /** The IP protocol name (tcp, udp, icmp) or number (see Protocol Numbers). To specify all protocols, use -1. To specify icmpv6, use IP permissions instead. If you specify a protocol other than one of the */
  IpProtocol?: string;
  /** [Default VPC] The name of the source security group. The rule grants full ICMP, UDP, and TCP access. To create a rule with a specific protocol and port range, specify a set of IP permissions instead. */
  SourceSecurityGroupName?: string;
  /** The Amazon Web Services account ID for the source security group, if the source security group is in a different account. The rule grants full ICMP, UDP, and TCP access. To create a rule with a specif */
  SourceSecurityGroupOwnerId?: string;
  /** The tags applied to the security group rule. */
  TagSpecifications?: TagSpecification[];
  /** If the protocol is TCP or UDP, this is the end of the port range. If the protocol is ICMP, this is the ICMP code or -1 (all ICMP codes). If the start port is -1 (all ICMP types), then the end port mus */
  ToPort?: number;
}

/** Contains the parameters for BundleInstance. */
export interface BundleInstanceInput {
  /** The ID of the instance to bundle. Default: None */
  InstanceId: string;
  /** The bucket in which to store the AMI. You can specify a bucket that you already own or a new bucket that Amazon EC2 creates on your behalf. If you specify a bucket that belongs to someone else, Amazon */
  Storage: Storage;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for CancelBundleTask. */
export interface CancelBundleTaskInput {
  /** The ID of the bundle task. */
  BundleId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface CancelCapacityReservationInput {
  /** The ID of the Capacity Reservation to be cancelled. */
  CapacityReservationId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface CancelCapacityReservationFleetsInput {
  /** The IDs of the Capacity Reservation Fleets to cancel. */
  CapacityReservationFleetIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface CancelConversionTaskInput {
  /** The ID of the conversion task. */
  ConversionTaskId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The reason for canceling the conversion task. */
  ReasonMessage?: string;
}

export interface CancelDeclarativePoliciesReportInput {
  /** The ID of the report. */
  ReportId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface CancelExportTaskInput {
  /** The ID of the export task. This is the ID returned by the CreateInstanceExportTask and ExportImage operations. */
  ExportTaskId: string;
}

export interface CancelImageLaunchPermissionInput {
  /** The ID of the AMI that was shared with your Amazon Web Services account. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface CancelImportTaskInput {
  /** The reason for canceling the task. */
  CancelReason?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the import image or import snapshot task to be canceled. */
  ImportTaskId?: string;
}

/** Contains the parameters for CancelReservedInstancesListing. */
export interface CancelReservedInstancesListingInput {
  /** The ID of the Reserved Instance listing. */
  ReservedInstancesListingId: string;
}

/** Contains the parameters for CancelSpotFleetRequests. */
export interface CancelSpotFleetRequestsInput {
  /** The IDs of the Spot Fleet requests. Constraint: You can specify up to 100 IDs in a single request. */
  SpotFleetRequestIds: string[];
  /** Indicates whether to terminate the associated instances when the Spot Fleet request is canceled. The default is to terminate the instances. To let the instances continue to run after the Spot Fleet re */
  TerminateInstances: boolean;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for CancelSpotInstanceRequests. */
export interface CancelSpotInstanceRequestsInput {
  /** The IDs of the Spot Instance requests. */
  SpotInstanceRequestIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ConfirmProductInstanceInput {
  /** The ID of the instance. */
  InstanceId: string;
  /** The product code. This must be a product code that you own. */
  ProductCode: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface CopyFpgaImageInput {
  /** The ID of the source AFI. */
  SourceFpgaImageId: string;
  /** The Region that contains the source AFI. */
  SourceRegion: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** The description for the new AFI. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The name for the new AFI. The default is the name of the source AFI. */
  Name?: string;
}

/** Contains the parameters for CopyImage. */
export interface CopyImageInput {
  /** The name of the new AMI. */
  Name: string;
  /** The ID of the AMI to copy. */
  SourceImageId: string;
  /** The name of the Region that contains the AMI to copy. */
  SourceRegion: string;
  /** Unique, case-sensitive identifier you provide to ensure idempotency of the request. For more information, see Ensuring idempotency in Amazon EC2 API requests in the Amazon EC2 API Reference. */
  ClientToken?: string;
  /** Specifies whether to copy your user-defined AMI tags to the new AMI. The following tags are not be copied: System tags (prefixed with aws:) For public and shared AMIs, user-defined tags that are attac */
  CopyImageTags?: boolean;
  /** A description for the new AMI. */
  Description?: string;
  /** The Local Zone for the new AMI (for example, cn-north-1-pkx-1a). Only one of DestinationAvailabilityZone, DestinationAvailabilityZoneId, or DestinationOutpostArn can be specified. */
  DestinationAvailabilityZone?: string;
  /** The ID of the Local Zone for the new AMI (for example, cnn1-pkx1-az1). Only one of DestinationAvailabilityZone, DestinationAvailabilityZoneId, or DestinationOutpostArn can be specified. */
  DestinationAvailabilityZoneId?: string;
  /** The Amazon Resource Name (ARN) of the Outpost for the new AMI. Only specify this parameter when copying an AMI from an Amazon Web Services Region to an Outpost. The AMI must be in the Region of the de */
  DestinationOutpostArn?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specifies whether to encrypt the snapshots of the copied image. You can encrypt a copy of an unencrypted snapshot, but you cannot create an unencrypted copy of an encrypted snapshot. The default KMS k */
  Encrypted?: boolean;
  /** The identifier of the symmetric Key Management Service (KMS) KMS key to use when creating encrypted volumes. If this parameter is not specified, your Amazon Web Services managed KMS key for Amazon EBS */
  KmsKeyId?: string;
  /** Specify a completion duration, in 15 minute increments, to initiate a time-based AMI copy. The specified completion duration applies to each of the snapshots associated with the AMI. Each snapshot ass */
  SnapshotCopyCompletionDurationMinutes?: number;
  /** The tags to apply to the new AMI and new snapshots. You can tag the AMI, the snapshots, or both. To tag the new AMI, the value for ResourceType must be image. To tag the new snapshots, the value for R */
  TagSpecifications?: TagSpecification[];
}

export interface CopySnapshotInput {
  /** The ID of the Region that contains the snapshot to be copied. */
  SourceRegion: string;
  /** The ID of the EBS snapshot to copy. */
  SourceSnapshotId: string;
  /** Not supported when copying snapshots to or from Local Zones or Outposts. Specify a completion duration, in 15 minute increments, to initiate a time-based snapshot copy. Time-based snapshot copy operat */
  CompletionDurationMinutes?: number;
  /** A description for the EBS snapshot. */
  Description?: string;
  /** The Local Zone, for example, cn-north-1-pkx-1a to which to copy the snapshot. Only supported when copying a snapshot to a Local Zone. */
  DestinationAvailabilityZone?: string;
  /** The Amazon Resource Name (ARN) of the Outpost to which to copy the snapshot. Only supported when copying a snapshot to an Outpost. For more information, see Copy snapshots from an Amazon Web Services  */
  DestinationOutpostArn?: string;
  /** The destination Region to use in the PresignedUrl parameter of a snapshot copy operation. This parameter is only valid for specifying the destination Region in a PresignedUrl parameter, where it is re */
  DestinationRegion?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** To encrypt a copy of an unencrypted snapshot if encryption by default is not enabled, enable encryption using this parameter. Otherwise, omit this parameter. Copies of encrypted snapshots are encrypte */
  Encrypted?: boolean;
  /** The identifier of the KMS key to use for Amazon EBS encryption. If this parameter is not specified, your KMS key for Amazon EBS is used. If KmsKeyId is specified, the encrypted state must be true. You */
  KmsKeyId?: string;
  /** When you copy an encrypted source snapshot using the Amazon EC2 Query API, you must supply a pre-signed URL. This parameter is optional for unencrypted snapshots. For more information, see Query reque */
  PresignedUrl?: string;
  /** The tags to apply to the new snapshot. */
  TagSpecifications?: TagSpecification[];
}

export interface CopyVolumesInput {
  /** The ID of the source EBS volume to copy. */
  SourceVolumeId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensure Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The number of I/O operations per second (IOPS) to provision for the volume copy. Required for io1 and io2 volumes. Optional for gp3 volumes. Omit for all other volume types. Full provisioned IOPS perf */
  Iops?: number;
  /** Indicates whether to enable Amazon EBS Multi-Attach for the volume copy. If you enable Multi-Attach, you can attach the volume to up to 16 Nitro instances in the same Availability Zone simultaneously. */
  MultiAttachEnabled?: boolean;
  /** The size of the volume copy, in GiBs. The size must be equal to or greater than the size of the source volume. If not specified, the size defaults to the size of the source volume. Maximum supported s */
  Size?: number;
  /** The tags to apply to the volume copy during creation. */
  TagSpecifications?: TagSpecification[];
  /** The throughput to provision for the volume copy, in MiB/s. Supported for gp3 volumes only. Omit for all other volume types. Full provisioned throughput performance can be achieved only once the volume */
  Throughput?: number;
  /** The volume type for the volume copy. If not specified, the volume type defaults to gp2. */
  VolumeType?: 'standard' | 'io1' | 'io2' | 'gp2' | 'sc1' | 'st1' | 'gp3';
}

export interface CreateCapacityManagerDataExportInput {
  /** The file format for the exported data. Parquet format is recommended for large datasets and better compression. */
  OutputFormat: 'csv' | 'parquet';
  /** The name of the S3 bucket where the capacity data export files will be delivered. The bucket must exist and you must have write permissions to it. */
  S3BucketName: string;
  /** The frequency at which data exports are generated. */
  Schedule: 'hourly';
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensure Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The S3 key prefix for the exported data files. This allows you to organize exports in a specific folder structure within your bucket. If not specified, files are placed at the bucket root. */
  S3BucketPrefix?: string;
  /** The tags to apply to the data export configuration. You can tag the export for organization and cost tracking purposes. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateCapacityReservationInput {
  /** The number of instances for which to reserve capacity. You can request future-dated Capacity Reservations for an instance count with a minimum of 32 vCPUs. For example, if you request a future-dated C */
  InstanceCount: number;
  /** The type of operating system for which to reserve capacity. */
  InstancePlatform: 'Linux/UNIX' | 'Red Hat Enterprise Linux' | 'SUSE Linux' | 'Windows' | 'Windows with SQL Server' | 'Windows with SQL Server Enterprise' | 'Windows with SQL Server Standard' | 'Windows with SQL Server Web' | 'Linux with SQL Server Standard' | 'Linux with SQL Server Web' | 'Linux with SQL Server Enterprise' | 'RHEL with SQL Server Standard' | 'RHEL with SQL Server Enterprise' | 'RHEL with SQL Server Web' | 'RHEL with HA' | 'RHEL with HA and SQL Server Standard' | 'RHEL with HA and SQL Server Enterprise' | 'Ubuntu Pro';
  /** The instance type for which to reserve capacity. You can request future-dated Capacity Reservations for instance types in the C, M, R, I, T, and G instance families only. For more information, see Ins */
  InstanceType: string;
  /** The Availability Zone in which to create the Capacity Reservation. */
  AvailabilityZone?: string;
  /** The ID of the Availability Zone in which to create the Capacity Reservation. */
  AvailabilityZoneId?: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensure Idempotency. */
  ClientToken?: string;
  /** Required for future-dated Capacity Reservations only. To create a Capacity Reservation for immediate use, omit this parameter. Specify a commitment duration, in seconds, for the future-dated Capacity  */
  CommitmentDuration?: number;
  /** Required for future-dated Capacity Reservations only. To create a Capacity Reservation for immediate use, omit this parameter. Indicates that the requested capacity will be delivered in addition to an */
  DeliveryPreference?: 'fixed' | 'incremental';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Indicates whether the Capacity Reservation supports EBS-optimized instances. This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide optimal I/O p */
  EbsOptimized?: boolean;
  /** The date and time at which the Capacity Reservation expires. When a Capacity Reservation expires, the reserved capacity is released and you can no longer launch instances into it. The Capacity Reserva */
  EndDate?: string;
  /** Indicates the way in which the Capacity Reservation ends. A Capacity Reservation can have one of the following end types: unlimited - The Capacity Reservation remains active until you explicitly cance */
  EndDateType?: 'unlimited' | 'limited';
  /** Deprecated. */
  EphemeralStorage?: boolean;
  /** Indicates the type of instance launches that the Capacity Reservation accepts. The options include: open - The Capacity Reservation automatically matches all instances that have matching attributes (i */
  InstanceMatchCriteria?: 'open' | 'targeted';
  /** Not supported for future-dated Capacity Reservations. The Amazon Resource Name (ARN) of the Outpost on which to create the Capacity Reservation. */
  OutpostArn?: string;
  /** Not supported for future-dated Capacity Reservations. The Amazon Resource Name (ARN) of the cluster placement group in which to create the Capacity Reservation. For more information, see Capacity Rese */
  PlacementGroupArn?: string;
  /** Required for future-dated Capacity Reservations only. To create a Capacity Reservation for immediate use, omit this parameter. The date and time at which the future-dated Capacity Reservation should b */
  StartDate?: string;
  /** The tags to apply to the Capacity Reservation during launch. */
  TagSpecifications?: TagSpecification[];
  /** Indicates the tenancy of the Capacity Reservation. A Capacity Reservation can have one of the following tenancy settings: default - The Capacity Reservation is created on hardware that is shared with  */
  Tenancy?: 'default' | 'dedicated';
}

export interface CreateCapacityReservationBySplittingInput {
  /** The number of instances to split from the source Capacity Reservation. */
  InstanceCount: number;
  /** The ID of the Capacity Reservation from which you want to split the capacity. */
  SourceCapacityReservationId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensure Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to apply to the new Capacity Reservation. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateCapacityReservationFleetInput {
  /** Information about the instance types for which to reserve the capacity. */
  InstanceTypeSpecifications: ReservationFleetInstanceSpecification[];
  /** The total number of capacity units to be reserved by the Capacity Reservation Fleet. This value, together with the instance type weights that you assign to each instance type used by the Fleet determi */
  TotalTargetCapacity: number;
  /** The strategy used by the Capacity Reservation Fleet to determine which of the specified instance types to use. Currently, only the prioritized allocation strategy is supported. For more information, s */
  AllocationStrategy?: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensure Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The date and time at which the Capacity Reservation Fleet expires. When the Capacity Reservation Fleet expires, its state changes to expired and all of the Capacity Reservations in the Fleet expire. T */
  EndDate?: string;
  /** Indicates the type of instance launches that the Capacity Reservation Fleet accepts. All Capacity Reservations in the Fleet inherit this instance matching criteria. Currently, Capacity Reservation Fle */
  InstanceMatchCriteria?: 'open';
  /** The tags to assign to the Capacity Reservation Fleet. The tags are automatically assigned to the Capacity Reservations in the Fleet. */
  TagSpecifications?: TagSpecification[];
  /** Indicates the tenancy of the Capacity Reservation Fleet. All Capacity Reservations in the Fleet inherit this tenancy. The Capacity Reservation Fleet can have one of the following tenancy settings: def */
  Tenancy?: 'default';
}

export interface CreateCarrierGatewayInput {
  /** The ID of the VPC to associate with the carrier gateway. */
  VpcId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to associate with the carrier gateway. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateClientVpnEndpointInput {
  /** Information about the authentication method to be used to authenticate clients. */
  AuthenticationOptions: ClientVpnAuthenticationRequest[];
  /** Information about the client connection logging options. If you enable client connection logging, data about client connections is sent to a Cloudwatch Logs log stream. The following information is lo */
  ConnectionLogOptions: ConnectionLogOptions;
  /** The ARN of the server certificate. For more information, see the Certificate Manager User Guide. */
  ServerCertificateArn: string;
  /** The IPv4 address range, in CIDR notation, from which to assign client IP addresses. The address range cannot overlap with the local CIDR of the VPC in which the associated subnet is located, or the ro */
  ClientCidrBlock?: string;
  /** The options for managing connection authorization for new client connections. */
  ClientConnectOptions?: ClientConnectOptions;
  /** Options for enabling a customizable text banner that will be displayed on Amazon Web Services provided clients when a VPN session is established. */
  ClientLoginBannerOptions?: ClientLoginBannerOptions;
  /** Client route enforcement is a feature of the Client VPN service that helps enforce administrator defined routes on devices connected through the VPN. T his feature helps improve your security posture  */
  ClientRouteEnforcementOptions?: ClientRouteEnforcementOptions;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A brief description of the Client VPN endpoint. */
  Description?: string;
  /** Indicates whether the client VPN session is disconnected after the maximum timeout specified in SessionTimeoutHours is reached. If true, users are prompted to reconnect client VPN. If false, client VP */
  DisconnectOnSessionTimeout?: boolean;
  /** Information about the DNS servers to be used for DNS resolution. A Client VPN endpoint can have up to two DNS servers. If no DNS server is specified, the DNS address configured on the device is used f */
  DnsServers?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IP address type for the Client VPN endpoint. Valid values are ipv4 (default) for IPv4 addressing only, ipv6 for IPv6 addressing only, or dual-stack for both IPv4 and IPv6 addressing. When set to d */
  EndpointIpAddressType?: 'ipv4' | 'ipv6' | 'dual-stack';
  /** The IDs of one or more security groups to apply to the target network. You must also specify the ID of the VPC that contains the security groups. */
  SecurityGroupIds?: string[];
  /** Specify whether to enable the self-service portal for the Client VPN endpoint. Default Value: enabled */
  SelfServicePortal?: 'enabled' | 'disabled';
  /** The maximum VPN session duration time in hours. Valid values: 8 | 10 | 12 | 24 Default value: 24 */
  SessionTimeoutHours?: number;
  /** Indicates whether split-tunnel is enabled on the Client VPN endpoint. By default, split-tunnel on a VPN endpoint is disabled. For information about split-tunnel VPN endpoints, see Split-tunnel Client  */
  SplitTunnel?: boolean;
  /** The tags to apply to the Client VPN endpoint during creation. */
  TagSpecifications?: TagSpecification[];
  /** The IP address type for traffic within the Client VPN tunnel. Valid values are ipv4 (default) for IPv4 traffic only, ipv6 for IPv6 addressing only, or dual-stack for both IPv4 and IPv6 traffic. When s */
  TrafficIpAddressType?: 'ipv4' | 'ipv6' | 'dual-stack';
  /** The transport protocol to be used by the VPN session. Default value: udp */
  TransportProtocol?: 'tcp' | 'udp';
  /** The ID of the VPC to associate with the Client VPN endpoint. If no security group IDs are specified in the request, the default security group for the VPC is applied. */
  VpcId?: string;
  /** The port number to assign to the Client VPN endpoint for TCP and UDP traffic. Valid Values: 443 | 1194 Default Value: 443 */
  VpnPort?: number;
}

export interface CreateClientVpnRouteInput {
  /** The ID of the Client VPN endpoint to which to add the route. */
  ClientVpnEndpointId: string;
  /** The IPv4 address range, in CIDR notation, of the route destination. For example: To add a route for Internet access, enter 0.0.0.0/0 To add a route for a peered VPC, enter the peered VPC's IPv4 CIDR r */
  DestinationCidrBlock: string;
  /** The ID of the subnet through which you want to route traffic. The specified subnet must be an existing target network of the Client VPN endpoint. Alternatively, if you're adding a route for the local  */
  TargetVpcSubnetId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A brief description of the route. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface CreateCoipCidrInput {
  /** A customer-owned IP address range to create. */
  Cidr: string;
  /** The ID of the address pool. */
  CoipPoolId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface CreateCoipPoolInput {
  /** The ID of the local gateway route table. */
  LocalGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to the CoIP address pool. */
  TagSpecifications?: TagSpecification[];
}

/** Contains the parameters for CreateCustomerGateway. */
export interface CreateCustomerGatewayInput {
  /** The type of VPN connection that this customer gateway supports (ipsec.1). */
  Type: 'ipsec.1';
  /** For customer gateway devices that support BGP, specify the device's ASN. You must specify either BgpAsn or BgpAsnExtended when creating the customer gateway. If the ASN is larger than 2,147,483,647, y */
  BgpAsn?: number;
  /** For customer gateway devices that support BGP, specify the device's ASN. You must specify either BgpAsn or BgpAsnExtended when creating the customer gateway. If the ASN is larger than 2,147,483,647, y */
  BgpAsnExtended?: number;
  /** The Amazon Resource Name (ARN) for the customer gateway certificate. */
  CertificateArn?: string;
  /** A name for the customer gateway device. Length Constraints: Up to 255 characters. */
  DeviceName?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IP address for the customer gateway device's outside interface. The address must be static. If OutsideIpAddressType in your VPN connection options is set to PrivateIpv4, you can use an RFC6598 or  */
  IpAddress?: string;
  /** This member has been deprecated. The Internet-routable IP address for the customer gateway's outside interface. The address must be static. */
  PublicIp?: string;
  /** The tags to apply to the customer gateway. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateDefaultSubnetInput {
  /** The Availability Zone in which to create the default subnet. Either AvailabilityZone or AvailabilityZoneId must be specified, but not both. */
  AvailabilityZone?: string;
  /** The ID of the Availability Zone. Either AvailabilityZone or AvailabilityZoneId must be specified, but not both. */
  AvailabilityZoneId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Indicates whether to create an IPv6 only subnet. If you already have a default subnet for this Availability Zone, you must delete it before you can create an IPv6 only subnet. */
  Ipv6Native?: boolean;
}

export interface CreateDefaultVpcInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface CreateDelegateMacVolumeOwnershipTaskInput {
  /** The ID of the Amazon EC2 Mac instance. */
  InstanceId: string;
  /** Specifies the following credentials: Internal disk administrative user Username - Only the default administrative user (aws-managed-user) is supported and it is used by default. You can't specify a di */
  MacCredentials: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to the volume ownership delegation task. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateDhcpOptionsInput {
  /** A DHCP configuration option. */
  DhcpConfigurations: NewDhcpConfiguration[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to the DHCP option. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateEgressOnlyInternetGatewayInput {
  /** The ID of the VPC for which to create the egress-only internet gateway. */
  VpcId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to the egress-only internet gateway. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateFleetInput {
  /** The configuration for the EC2 Fleet. */
  LaunchTemplateConfigs: FleetLaunchTemplateConfigRequest[];
  /** The number of units to request. */
  TargetCapacitySpecification: TargetCapacitySpecificationRequest;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If you do not specify a client token, a randomly generated token is used for the request to ensure idempote */
  ClientToken?: string;
  /** Reserved. */
  Context?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Indicates whether running instances should be terminated if the total target capacity of the EC2 Fleet is decreased below the current size of the EC2 Fleet. Supported only for fleets of type maintain. */
  ExcessCapacityTerminationPolicy?: 'no-termination' | 'termination';
  /** Describes the configuration of On-Demand Instances in an EC2 Fleet. */
  OnDemandOptions?: OnDemandOptionsRequest;
  /** Indicates whether EC2 Fleet should replace unhealthy Spot Instances. Supported only for fleets of type maintain. For more information, see EC2 Fleet health checks in the Amazon EC2 User Guide. */
  ReplaceUnhealthyInstances?: boolean;
  /** Describes the configuration of Spot Instances in an EC2 Fleet. */
  SpotOptions?: SpotOptionsRequest;
  /** The key-value pair for tagging the EC2 Fleet request on creation. For more information, see Tag your resources. If the fleet type is instant, specify a resource type of fleet to tag the fleet or insta */
  TagSpecifications?: TagSpecification[];
  /** Indicates whether running instances should be terminated when the EC2 Fleet expires. */
  TerminateInstancesWithExpiration?: boolean;
  /** The fleet type. The default value is maintain. maintain - The EC2 Fleet places an asynchronous request for your desired capacity, and continues to maintain your desired Spot capacity by replenishing i */
  Type?: 'request' | 'maintain' | 'instant';
  /** The start date and time of the request, in UTC format (for example, YYYY-MM-DDTHH:MM:SSZ). The default is to start fulfilling the request immediately. */
  ValidFrom?: string;
  /** The end date and time of the request, in UTC format (for example, YYYY-MM-DDTHH:MM:SSZ). At this point, no new EC2 Fleet requests are placed or able to fulfill the request. If no value is specified, t */
  ValidUntil?: string;
}

export interface CreateFlowLogsInput {
  /** The IDs of the resources to monitor. For example, if the resource type is VPC, specify the IDs of the VPCs. Constraints: Maximum of 25 for transit gateway resource types. Maximum of 1000 for the other */
  ResourceIds: string[];
  /** The type of resource to monitor. */
  ResourceType: 'VPC' | 'Subnet' | 'NetworkInterface' | 'TransitGateway' | 'TransitGatewayAttachment' | 'RegionalNatGateway';
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken?: string;
  /** The ARN of the IAM role that allows Amazon EC2 to publish flow logs across accounts. */
  DeliverCrossAccountRole?: string;
  /** The ARN of the IAM role that allows Amazon EC2 to publish flow logs to the log destination. This parameter is required if the destination type is cloud-watch-logs, or if the destination type is kinesi */
  DeliverLogsPermissionArn?: string;
  /** The destination options. */
  DestinationOptions?: DestinationOptionsRequest;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The destination for the flow log data. The meaning of this parameter depends on the destination type. If the destination type is cloud-watch-logs, specify the ARN of a CloudWatch Logs log group. For e */
  LogDestination?: string;
  /** The type of destination for the flow log data. Default: cloud-watch-logs */
  LogDestinationType?: 'cloud-watch-logs' | 's3' | 'kinesis-data-firehose';
  /** The fields to include in the flow log record. List the fields in the order in which they should appear. If you omit this parameter, the flow log is created using the default format. If you specify thi */
  LogFormat?: string;
  /** The name of a new or existing CloudWatch Logs log group where Amazon EC2 publishes your flow logs. This parameter is valid only if the destination type is cloud-watch-logs. */
  LogGroupName?: string;
  /** The maximum interval of time during which a flow of packets is captured and aggregated into a flow log record. The possible values are 60 seconds (1 minute) or 600 seconds (10 minutes). This parameter */
  MaxAggregationInterval?: number;
  /** The tags to apply to the flow logs. */
  TagSpecifications?: TagSpecification[];
  /** The type of traffic to monitor (accepted traffic, rejected traffic, or all traffic). This parameter is not supported for transit gateway resource types. It is required for the other resource types. */
  TrafficType?: 'ACCEPT' | 'REJECT' | 'ALL';
}

export interface CreateFpgaImageInput {
  /** The location of the encrypted design checkpoint in Amazon S3. The input must be a tarball. */
  InputStorageLocation: StorageLocation;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring Idempotency. */
  ClientToken?: string;
  /** A description for the AFI. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The location in Amazon S3 for the output logs. */
  LogsStorageLocation?: StorageLocation;
  /** A name for the AFI. */
  Name?: string;
  /** The tags to apply to the FPGA image during creation. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateImageInput {
  /** The ID of the instance. */
  InstanceId: string;
  /** A name for the new image. Constraints: 3-128 alphanumeric characters, parentheses (()), square brackets ([]), spaces ( ), periods (.), slashes (/), dashes (-), single quotes ('), at-signs (@), or unde */
  Name: string;
  /** The block device mappings. When using the CreateImage action: You can't change the volume size using the VolumeSize parameter. If you want a different volume size, you must first change the volume siz */
  BlockDeviceMappings?: BlockDeviceMapping[];
  /** A description for the new image. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Indicates whether or not the instance should be automatically rebooted before creating the image. Specify one of the following values: true - The instance is not rebooted before creating the image. Th */
  NoReboot?: boolean;
  /** Only supported for instances in Local Zones. If the source instance is not in a Local Zone, omit this parameter. The Amazon S3 location where the snapshots will be stored. To create local snapshots in */
  SnapshotLocation?: 'regional' | 'local';
  /** The tags to apply to the AMI and snapshots on creation. You can tag the AMI, the snapshots, or both. To tag the AMI, the value for ResourceType must be image. To tag the snapshots that are created of  */
  TagSpecifications?: TagSpecification[];
}

export interface CreateImageUsageReportInput {
  /** The ID of the image to report on. */
  ImageId: string;
  /** The resource types to include in the report. */
  ResourceTypes: ImageUsageResourceTypeRequest[];
  /** The Amazon Web Services account IDs to include in the report. To include all accounts, omit this parameter. */
  AccountIds?: string[];
  /** A unique, case-sensitive identifier that you provide to ensure idempotency of the request. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to apply to the report on creation. The ResourceType must be set to image-usage-report; any other value will cause the report creation to fail. To tag a report after it has been created, see  */
  TagSpecifications?: TagSpecification[];
}

export interface CreateInstanceConnectEndpointInput {
  /** The ID of the subnet in which to create the EC2 Instance Connect Endpoint. */
  SubnetId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IP address type of the endpoint. If no value is specified, the default value is determined by the IP address type of the subnet: dualstack - If the subnet has both IPv4 and IPv6 CIDRs ipv4 - If th */
  IpAddressType?: 'ipv4' | 'dualstack' | 'ipv6';
  /** Indicates whether the client IP address is preserved as the source. The following are the possible values. true - Use the client IP address as the source. false - Use the network interface IP address  */
  PreserveClientIp?: boolean;
  /** One or more security groups to associate with the endpoint. If you don't specify a security group, the default security group for your VPC will be associated with the endpoint. */
  SecurityGroupIds?: string[];
  /** The tags to apply to the EC2 Instance Connect Endpoint during creation. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateInstanceEventWindowInput {
  /** The cron expression for the event window, for example, * 0-4,20-23 * * 1,5. If you specify a cron expression, you can't specify a time range. Constraints: Only hour and day of the week values are supp */
  CronExpression?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The name of the event window. */
  Name?: string;
  /** The tags to apply to the event window. */
  TagSpecifications?: TagSpecification[];
  /** The time range for the event window. If you specify a time range, you can't specify a cron expression. */
  TimeRanges?: InstanceEventWindowTimeRangeRequest[];
}

export interface CreateInstanceExportTaskInput {
  /** The format and location for an export instance task. */
  ExportToS3Task: ExportToS3TaskSpecification;
  /** The ID of the instance. */
  InstanceId: string;
  /** The target virtualization environment. */
  TargetEnvironment: 'citrix' | 'vmware' | 'microsoft';
  /** A description for the conversion task or the resource being exported. The maximum length is 255 characters. */
  Description?: string;
  /** The tags to apply to the export instance task during creation. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateInternetGatewayInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to the internet gateway. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateInterruptibleCapacityReservationAllocationInput {
  /** The ID of the source Capacity Reservation from which to create the interruptible Capacity Reservation. Your Capacity Reservation must be in active state with no end date set and have available capacit */
  CapacityReservationId: string;
  /** The number of instances to allocate from your source reservation. You can only allocate available instances (also called unused capacity). */
  InstanceCount: number;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. */
  DryRun?: boolean;
  /** The tags to apply to the interruptible Capacity Reservation during creation. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateIpamInput {
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the IPAM. */
  Description?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Enable this option to use your own GUA ranges as private IPv6 addresses. This option is disabled by default. */
  EnablePrivateGua?: boolean;
  /** A metered account is an Amazon Web Services account that is charged for active IP addresses managed in IPAM. For more information, see Enable cost distribution in the Amazon VPC IPAM User Guide. Possi */
  MeteredAccount?: 'ipam-owner' | 'resource-owner';
  /** The operating Regions for the IPAM. Operating Regions are Amazon Web Services Regions where the IPAM is allowed to manage IP address CIDRs. IPAM only discovers and monitors resources in the Amazon Web */
  OperatingRegions?: AddIpamOperatingRegion[];
  /** The key/value combination of a tag assigned to the resource. Use the tag key in the filter name and the tag value as the filter value. For example, to find all resources that have a tag with the key O */
  TagSpecifications?: TagSpecification[];
  /** IPAM is offered in a Free Tier and an Advanced Tier. For more information about the features available in each tier and the costs associated with the tiers, see Amazon VPC pricing > IPAM tab. */
  Tier?: 'free' | 'advanced';
}

export interface CreateIpamExternalResourceVerificationTokenInput {
  /** The ID of the IPAM that will create the token. */
  IpamId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Token tags. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateIpamPolicyInput {
  /** The ID of the IPAM for which you're creating the policy. */
  IpamId: string;
  /** A unique, case-sensitive identifier to ensure the idempotency of the request. */
  ClientToken?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The tags to assign to the IPAM policy. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateIpamPoolInput {
  /** The IP protocol assigned to this IPAM pool. You must choose either IPv4 or IPv6 protocol for a pool. */
  AddressFamily: 'ipv4' | 'ipv6';
  /** The ID of the scope in which you would like to create the IPAM pool. */
  IpamScopeId: string;
  /** The default netmask length for allocations added to this pool. If, for example, the CIDR assigned to this pool is 10.0.0.0/8 and you enter 16 here, new allocations will default to 10.0.0.0/16. */
  AllocationDefaultNetmaskLength?: number;
  /** The maximum netmask length possible for CIDR allocations in this IPAM pool to be compliant. The maximum netmask length must be greater than the minimum netmask length. Possible netmask lengths for IPv */
  AllocationMaxNetmaskLength?: number;
  /** The minimum netmask length required for CIDR allocations in this IPAM pool to be compliant. The minimum netmask length must be less than the maximum netmask length. Possible netmask lengths for IPv4 a */
  AllocationMinNetmaskLength?: number;
  /** Tags that are required for resources that use CIDRs from this IPAM pool. Resources that do not have these tags will not be allowed to allocate space from the pool. If the resources have their tags cha */
  AllocationResourceTags?: RequestIpamResourceTag[];
  /** If selected, IPAM will continuously look for resources within the CIDR range of this pool and automatically import them as allocations into your IPAM. The CIDRs that will be allocated for these resour */
  AutoImport?: boolean;
  /** Limits which service in Amazon Web Services that the pool can be used in. "ec2", for example, allows users to use space for Elastic IP addresses and VPCs. */
  AwsService?: 'ec2' | 'global-services';
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the IPAM pool. */
  Description?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The locale for the pool should be one of the following: An Amazon Web Services Region where you want this IPAM pool to be available for allocations. The network border group for an Amazon Web Services */
  Locale?: string;
  /** The IP address source for pools in the public scope. Only used for provisioning IP address CIDRs to pools in the public scope. Default is byoip. For more information, see Create IPv6 pools in the Amaz */
  PublicIpSource?: 'amazon' | 'byoip';
  /** Determines if the pool is publicly advertisable. The request can only contain PubliclyAdvertisable if AddressFamily is ipv6 and PublicIpSource is byoip. */
  PubliclyAdvertisable?: boolean;
  /** The ID of the source IPAM pool. Use this option to create a pool within an existing pool. Note that the CIDR you provision for the pool within the source pool must be available in the source pool's CI */
  SourceIpamPoolId?: string;
  /** The resource used to provision CIDRs to a resource planning pool. */
  SourceResource?: IpamPoolSourceResourceRequest;
  /** The key/value combination of a tag assigned to the resource. Use the tag key in the filter name and the tag value as the filter value. For example, to find all resources that have a tag with the key O */
  TagSpecifications?: TagSpecification[];
}

export interface CreateIpamPrefixListResolverInput {
  /** The address family for the IPAM prefix list resolver. Valid values are ipv4 and ipv6. You must create separate resolvers for IPv4 and IPv6 CIDRs as they cannot be mixed in the same resolver. */
  AddressFamily: 'ipv4' | 'ipv6';
  /** The ID of the IPAM that will serve as the source of the IP address database for CIDR selection. The IPAM must be in the Advanced tier to use this feature. */
  IpamId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the IPAM prefix list resolver to help you identify its purpose and configuration. */
  Description?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The CIDR selection rules for the resolver. CIDR selection rules define the business logic for selecting CIDRs from IPAM. If a CIDR matches any of the rules, it will be included. If a rule has multiple */
  Rules?: IpamPrefixListResolverRuleRequest[];
  /** The tags to apply to the IPAM prefix list resolver during creation. Tags help you organize and manage your Amazon Web Services resources. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateIpamPrefixListResolverTargetInput {
  /** The ID of the IPAM prefix list resolver that will manage the synchronization of CIDRs to the target prefix list. */
  IpamPrefixListResolverId: string;
  /** The ID of the managed prefix list that will be synchronized with CIDRs selected by the IPAM prefix list resolver. This prefix list becomes an IPAM managed prefix list. An IPAM-managed prefix list is a */
  PrefixListId: string;
  /** The Amazon Web Services Region where the prefix list is located. This is required when referencing a prefix list in a different Region. */
  PrefixListRegion: string;
  /** Indicates whether the resolver target should automatically track the latest version of the prefix list. When enabled, the target will always synchronize with the most current version of the prefix lis */
  TrackLatestVersion: boolean;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** The specific version of the prefix list to target. If not specified, the resolver will target the latest version. */
  DesiredVersion?: number;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The tags to apply to the IPAM prefix list resolver target during creation. Tags help you organize and manage your Amazon Web Services resources. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateIpamResourceDiscoveryInput {
  /** A client token for the IPAM resource discovery. */
  ClientToken?: string;
  /** A description for the IPAM resource discovery. */
  Description?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Operating Regions for the IPAM resource discovery. Operating Regions are Amazon Web Services Regions where the IPAM is allowed to manage IP address CIDRs. IPAM only discovers and monitors resources in */
  OperatingRegions?: AddIpamOperatingRegion[];
  /** Tag specifications for the IPAM resource discovery. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateIpamScopeInput {
  /** The ID of the IPAM for which you're creating this scope. */
  IpamId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the scope you're creating. */
  Description?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The configuration that links an Amazon VPC IPAM scope to an external authority system. It specifies the type of external system and the external resource identifier that identifies your account or ins */
  ExternalAuthorityConfiguration?: ExternalAuthorityConfiguration;
  /** The key/value combination of a tag assigned to the resource. Use the tag key in the filter name and the tag value as the filter value. For example, to find all resources that have a tag with the key O */
  TagSpecifications?: TagSpecification[];
}

export interface CreateKeyPairInput {
  /** A unique name for the key pair. Constraints: Up to 255 ASCII characters */
  KeyName: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The format of the key pair. Default: pem */
  KeyFormat?: 'pem' | 'ppk';
  /** The type of key pair. Note that ED25519 keys are not supported for Windows instances. Default: rsa */
  KeyType?: 'rsa' | 'ed25519';
  /** The tags to apply to the new key pair. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateLaunchTemplateInput {
  /** The information for the launch template. */
  LaunchTemplateData: RequestLaunchTemplateData;
  /** A name for the launch template. */
  LaunchTemplateName: string;
  /** Unique, case-sensitive identifier you provide to ensure the idempotency of the request. If a client token isn't specified, a randomly generated token is used in the request to ensure idempotency. For  */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Reserved for internal use. */
  Operator?: OperatorRequest;
  /** The tags to apply to the launch template on creation. To tag the launch template, the resource type must be launch-template. To specify the tags for the resources that are created when an instance is  */
  TagSpecifications?: TagSpecification[];
  /** A description for the first version of the launch template. */
  VersionDescription?: string;
}

export interface CreateLaunchTemplateVersionInput {
  /** The information for the launch template. */
  LaunchTemplateData: RequestLaunchTemplateData;
  /** Unique, case-sensitive identifier you provide to ensure the idempotency of the request. If a client token isn't specified, a randomly generated token is used in the request to ensure idempotency. For  */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the launch template. You must specify either the launch template ID or the launch template name, but not both. */
  LaunchTemplateId?: string;
  /** The name of the launch template. You must specify either the launch template ID or the launch template name, but not both. */
  LaunchTemplateName?: string;
  /** If true, and if a Systems Manager parameter is specified for ImageId, the AMI ID is displayed in the response for imageID. For more information, see Use a Systems Manager parameter instead of an AMI I */
  ResolveAlias?: boolean;
  /** The version of the launch template on which to base the new version. Snapshots applied to the block device mapping are ignored when creating a new version unless they are explicitly included. If you s */
  SourceVersion?: string;
  /** A description for the version of the launch template. */
  VersionDescription?: string;
}

export interface CreateLocalGatewayRouteInput {
  /** The ID of the local gateway route table. */
  LocalGatewayRouteTableId: string;
  /** The CIDR range used for destination matches. Routing decisions are based on the most specific match. */
  DestinationCidrBlock?: string;
  /** The ID of the prefix list. Use a prefix list in place of DestinationCidrBlock. You cannot use DestinationPrefixListId and DestinationCidrBlock in the same request. */
  DestinationPrefixListId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the virtual interface group. */
  LocalGatewayVirtualInterfaceGroupId?: string;
  /** The ID of the network interface. */
  NetworkInterfaceId?: string;
}

export interface CreateLocalGatewayRouteTableInput {
  /** The ID of the local gateway. */
  LocalGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The mode of the local gateway route table. */
  Mode?: 'direct-vpc-routing' | 'coip';
  /** The tags assigned to the local gateway route table. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateLocalGatewayRouteTableVirtualInterfaceGroupAssociationInput {
  /** The ID of the local gateway route table. */
  LocalGatewayRouteTableId: string;
  /** The ID of the local gateway route table virtual interface group association. */
  LocalGatewayVirtualInterfaceGroupId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags assigned to the local gateway route table virtual interface group association. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateLocalGatewayRouteTableVpcAssociationInput {
  /** The ID of the local gateway route table. */
  LocalGatewayRouteTableId: string;
  /** The ID of the VPC. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to the local gateway route table VPC association. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateLocalGatewayVirtualInterfaceInput {
  /** The IP address assigned to the local gateway virtual interface on the Outpost side. Only IPv4 is supported. */
  LocalAddress: string;
  /** The ID of the local gateway virtual interface group. */
  LocalGatewayVirtualInterfaceGroupId: string;
  /** References the Link Aggregation Group (LAG) that connects the Outpost to on-premises network devices. */
  OutpostLagId: string;
  /** The peer IP address for the local gateway virtual interface. Only IPv4 is supported. */
  PeerAddress: string;
  /** The virtual local area network (VLAN) used for the local gateway virtual interface. */
  Vlan: number;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The Autonomous System Number (ASN) of the Border Gateway Protocol (BGP) peer. */
  PeerBgpAsn?: number;
  /** The extended 32-bit ASN of the BGP peer for use with larger ASN values. */
  PeerBgpAsnExtended?: number;
  /** The tags to apply to a resource when the local gateway virtual interface is being created. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateLocalGatewayVirtualInterfaceGroupInput {
  /** The ID of the local gateway. */
  LocalGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The Autonomous System Number(ASN) for the local Border Gateway Protocol (BGP). */
  LocalBgpAsn?: number;
  /** The extended 32-bit ASN for the local BGP configuration. */
  LocalBgpAsnExtended?: number;
  /** The tags to apply to the local gateway virtual interface group when the resource is being created. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateMacSystemIntegrityProtectionModificationTaskInput {
  /** The ID of the Amazon EC2 Mac instance. */
  InstanceId: string;
  /** Specifies the overall SIP status for the instance. To enable all SIP settings, specify enabled. To disable all SIP settings, specify disabled. */
  MacSystemIntegrityProtectionStatus: 'enabled' | 'disabled';
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** [Apple silicon Mac instances only] Specifies the following credentials: Internal disk administrative user Username - Only the default administrative user (aws-managed-user) is supported and it is used */
  MacCredentials?: string;
  /** Specifies the overrides to selectively enable or disable individual SIP settings. The individual settings you specify here override the overall SIP status you specify for MacSystemIntegrityProtectionS */
  MacSystemIntegrityProtectionConfiguration?: MacSystemIntegrityProtectionConfigurationRequest;
  /** Specifies tags to apply to the SIP modification task. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateManagedPrefixListInput {
  /** The IP address type. Valid Values: IPv4 | IPv6 */
  AddressFamily: string;
  /** The maximum number of entries for the prefix list. */
  MaxEntries: number;
  /** A name for the prefix list. Constraints: Up to 255 characters in length. The name cannot start with com.amazonaws. */
  PrefixListName: string;
  /** Unique, case-sensitive identifier you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. Constraints: Up to 255 UTF-8 characters in length. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more entries for the prefix list. */
  Entries?: AddPrefixListEntry[];
  /** The tags to apply to the prefix list during creation. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateNatGatewayInput {
  /** [Public NAT gateways only] The allocation ID of an Elastic IP address to associate with the NAT gateway. You cannot specify an Elastic IP address with a private NAT gateway. If the Elastic IP address  */
  AllocationId?: string;
  /** Specifies whether to create a zonal (single-AZ) or regional (multi-AZ) NAT gateway. Defaults to zonal. A zonal NAT gateway is a NAT Gateway that provides redundancy and scalability within a single ava */
  AvailabilityMode?: 'zonal' | 'regional';
  /** For regional NAT gateways only: Specifies which Availability Zones you want the NAT gateway to support and the Elastic IP addresses (EIPs) to use in each AZ. The regional NAT gateway uses these EIPs t */
  AvailabilityZoneAddresses?: AvailabilityZoneAddress[];
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. Constraint: Maximum 64 ASCII characters. */
  ClientToken?: string;
  /** Indicates whether the NAT gateway supports public or private connectivity. The default is public connectivity. */
  ConnectivityType?: 'private' | 'public';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The private IPv4 address to assign to the NAT gateway. If you don't provide an address, a private IPv4 address will be automatically assigned. */
  PrivateIpAddress?: string;
  /** Secondary EIP allocation IDs. For more information, see Create a NAT gateway in the Amazon VPC User Guide. */
  SecondaryAllocationIds?: string[];
  /** [Private NAT gateway only] The number of secondary private IPv4 addresses you want to assign to the NAT gateway. For more information about secondary addresses, see Create a NAT gateway in the Amazon  */
  SecondaryPrivateIpAddressCount?: number;
  /** Secondary private IPv4 addresses. For more information about secondary addresses, see Create a NAT gateway in the Amazon VPC User Guide. */
  SecondaryPrivateIpAddresses?: string[];
  /** The ID of the subnet in which to create the NAT gateway. */
  SubnetId?: string;
  /** The tags to assign to the NAT gateway. */
  TagSpecifications?: TagSpecification[];
  /** The ID of the VPC where you want to create a regional NAT gateway. */
  VpcId?: string;
}

export interface CreateNetworkAclInput {
  /** The ID of the VPC. */
  VpcId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to the network ACL. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateNetworkAclEntryInput {
  /** Indicates whether this is an egress rule (rule is applied to traffic leaving the subnet). */
  Egress: boolean;
  /** The ID of the network ACL. */
  NetworkAclId: string;
  /** The protocol number. A value of "-1" means all protocols. If you specify "-1" or a protocol number other than "6" (TCP), "17" (UDP), or "1" (ICMP), traffic on all ports is allowed, regardless of any p */
  Protocol: string;
  /** Indicates whether to allow or deny the traffic that matches the rule. */
  RuleAction: 'allow' | 'deny';
  /** The rule number for the entry (for example, 100). ACL entries are processed in ascending order by rule number. Constraints: Positive integer from 1 to 32766. The range 32767 to 65535 is reserved for i */
  RuleNumber: number;
  /** The IPv4 network range to allow or deny, in CIDR notation (for example 172.16.0.0/24). We modify the specified CIDR block to its canonical form; for example, if you specify 100.68.0.18/18, we modify i */
  CidrBlock?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** ICMP protocol: The ICMP or ICMPv6 type and code. Required if specifying protocol 1 (ICMP) or protocol 58 (ICMPv6) with an IPv6 CIDR block. */
  IcmpTypeCode?: IcmpTypeCode;
  /** The IPv6 network range to allow or deny, in CIDR notation (for example 2001:db8:1234:1a00::/64). */
  Ipv6CidrBlock?: string;
  /** TCP or UDP protocols: The range of ports the rule applies to. Required if specifying protocol 6 (TCP) or 17 (UDP). */
  PortRange?: PortRange;
}

export interface CreateNetworkInsightsAccessScopeInput {
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The paths to exclude. */
  ExcludePaths?: AccessScopePathRequest[];
  /** The paths to match. */
  MatchPaths?: AccessScopePathRequest[];
  /** The tags to apply. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateNetworkInsightsPathInput {
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken: string;
  /** The protocol. */
  Protocol: 'tcp' | 'udp';
  /** The ID or ARN of the source. If the resource is in another account, you must specify an ARN. */
  Source: string;
  /** The ID or ARN of the destination. If the resource is in another account, you must specify an ARN. */
  Destination?: string;
  /** The IP address of the destination. */
  DestinationIp?: string;
  /** The destination port. */
  DestinationPort?: number;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Scopes the analysis to network paths that match specific filters at the destination. If you specify this parameter, you can't specify the parameter for the destination IP address. */
  FilterAtDestination?: PathRequestFilter;
  /** Scopes the analysis to network paths that match specific filters at the source. If you specify this parameter, you can't specify the parameters for the source IP address or the destination port. */
  FilterAtSource?: PathRequestFilter;
  /** The IP address of the source. */
  SourceIp?: string;
  /** The tags to add to the path. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateNetworkInterfaceInput {
  /** The ID of the subnet to associate with the network interface. */
  SubnetId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A connection tracking specification for the network interface. */
  ConnectionTrackingSpecification?: ConnectionTrackingSpecificationRequest;
  /** A description for the network interface. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** If you’re creating a network interface in a dual-stack or IPv6-only subnet, you have the option to assign a primary IPv6 IP address. A primary IPv6 address is an IPv6 GUA address associated with an EN */
  EnablePrimaryIpv6?: boolean;
  /** The IDs of the security groups. */
  Groups?: string[];
  /** The type of network interface. The default is interface. If you specify efa-only, do not assign any IP addresses to the network interface. EFA-only network interfaces do not support IP addresses. The  */
  InterfaceType?: 'efa' | 'efa-only' | 'branch' | 'trunk';
  /** The number of IPv4 prefixes that Amazon Web Services automatically assigns to the network interface. You can't specify a count of IPv4 prefixes if you've specified one of the following: specific IPv4  */
  Ipv4PrefixCount?: number;
  /** The IPv4 prefixes assigned to the network interface. You can't specify IPv4 prefixes if you've specified one of the following: a count of IPv4 prefixes, specific private IPv4 addresses, or a count of  */
  Ipv4Prefixes?: Ipv4PrefixSpecificationRequest[];
  /** The number of IPv6 addresses to assign to a network interface. Amazon EC2 automatically selects the IPv6 addresses from the subnet range. You can't specify a count of IPv6 addresses using this paramet */
  Ipv6AddressCount?: number;
  /** The IPv6 addresses from the IPv6 CIDR block range of your subnet. You can't specify IPv6 addresses using this parameter if you've specified one of the following: a count of IPv6 addresses, specific IP */
  Ipv6Addresses?: InstanceIpv6Address[];
  /** The number of IPv6 prefixes that Amazon Web Services automatically assigns to the network interface. You can't specify a count of IPv6 prefixes if you've specified one of the following: specific IPv6  */
  Ipv6PrefixCount?: number;
  /** The IPv6 prefixes assigned to the network interface. You can't specify IPv6 prefixes if you've specified one of the following: a count of IPv6 prefixes, specific IPv6 addresses, or a count of IPv6 add */
  Ipv6Prefixes?: Ipv6PrefixSpecificationRequest[];
  /** Reserved for internal use. */
  Operator?: OperatorRequest;
  /** The primary private IPv4 address of the network interface. If you don't specify an IPv4 address, Amazon EC2 selects one for you from the subnet's IPv4 CIDR range. If you specify an IP address, you can */
  PrivateIpAddress?: string;
  /** The private IPv4 addresses. You can't specify private IPv4 addresses if you've specified one of the following: a count of private IPv4 addresses, specific IPv4 prefixes, or a count of IPv4 prefixes. */
  PrivateIpAddresses?: PrivateIpAddressSpecification[];
  /** The number of secondary private IPv4 addresses to assign to a network interface. When you specify a number of secondary IPv4 addresses, Amazon EC2 selects these IP addresses within the subnet's IPv4 C */
  SecondaryPrivateIpAddressCount?: number;
  /** The tags to apply to the new network interface. */
  TagSpecifications?: TagSpecification[];
}

/** Contains the parameters for CreateNetworkInterfacePermission. */
export interface CreateNetworkInterfacePermissionInput {
  /** The ID of the network interface. */
  NetworkInterfaceId: string;
  /** The type of permission to grant. */
  Permission: 'INSTANCE-ATTACH' | 'EIP-ASSOCIATE';
  /** The Amazon Web Services account ID. */
  AwsAccountId?: string;
  /** The Amazon Web Services service. Currently not supported. */
  AwsService?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface CreatePlacementGroupInput {
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** A name for the placement group. Must be unique within the scope of your account for the Region. Constraints: Up to 255 ASCII characters */
  GroupName?: string;
  /** Reserved for future use. */
  LinkedGroupId?: string;
  /** Reserved for internal use. */
  Operator?: OperatorRequest;
  /** The number of partitions. Valid only when Strategy is set to partition. */
  PartitionCount?: number;
  /** Determines how placement groups spread instances. Host – You can use host only with Outpost placement groups. Rack – No usage restrictions. */
  SpreadLevel?: 'host' | 'rack';
  /** The placement strategy. */
  Strategy?: 'cluster' | 'spread' | 'partition';
  /** The tags to apply to the new placement group. */
  TagSpecifications?: TagSpecification[];
}

export interface CreatePublicIpv4PoolInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The Availability Zone (AZ) or Local Zone (LZ) network border group that the resource that the IP address is assigned to is in. Defaults to an AZ network border group. For more information on available */
  NetworkBorderGroup?: string;
  /** The key/value combination of a tag assigned to the resource. Use the tag key in the filter name and the tag value as the filter value. For example, to find all resources that have a tag with the key O */
  TagSpecifications?: TagSpecification[];
}

export interface CreateReplaceRootVolumeTaskInput {
  /** The ID of the instance for which to replace the root volume. */
  InstanceId: string;
  /** Unique, case-sensitive identifier you provide to ensure the idempotency of the request. If you do not specify a client token, a randomly generated token is used for the request to ensure idempotency.  */
  ClientToken?: string;
  /** Indicates whether to automatically delete the original root volume after the root volume replacement task completes. To delete the original root volume, specify true. If you choose to keep the origina */
  DeleteReplacedRootVolume?: boolean;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the AMI to use to restore the root volume. The specified AMI must have the same product code, billing information, architecture type, and virtualization type as that of the instance. If you  */
  ImageId?: string;
  /** The ID of the snapshot from which to restore the replacement root volume. The specified snapshot must be a snapshot that you previously created from the original root volume. If you want to restore th */
  SnapshotId?: string;
  /** The tags to apply to the root volume replacement task. */
  TagSpecifications?: TagSpecification[];
  /** Specifies the Amazon EBS Provisioned Rate for Volume Initialization (volume initialization rate), in MiB/s, at which to download the snapshot blocks from Amazon S3 to the replacement root volume. This */
  VolumeInitializationRate?: number;
}

/** Contains the parameters for CreateReservedInstancesListing. */
export interface CreateReservedInstancesListingInput {
  /** Unique, case-sensitive identifier you provide to ensure idempotency of your listings. This helps avoid duplicate listings. For more information, see Ensuring Idempotency. */
  ClientToken: string;
  /** The number of instances that are a part of a Reserved Instance account to be listed in the Reserved Instance Marketplace. This number should be less than or equal to the instance count associated with */
  InstanceCount: number;
  /** A list specifying the price of the Standard Reserved Instance for each month remaining in the Reserved Instance term. */
  PriceSchedules: PriceScheduleSpecification[];
  /** The ID of the active Standard Reserved Instance. */
  ReservedInstancesId: string;
}

export interface CreateRestoreImageTaskInput {
  /** The name of the Amazon S3 bucket that contains the stored AMI object. */
  Bucket: string;
  /** The name of the stored AMI object in the bucket. */
  ObjectKey: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The name for the restored AMI. The name must be unique for AMIs in the Region for this account. If you do not provide a name, the new AMI gets the same name as the original AMI. */
  Name?: string;
  /** The tags to apply to the AMI and snapshots on restoration. You can tag the AMI, the snapshots, or both. To tag the AMI, the value for ResourceType must be image. To tag the snapshots, the value for Re */
  TagSpecifications?: TagSpecification[];
}

export interface CreateRouteInput {
  /** The ID of the route table for the route. */
  RouteTableId: string;
  /** The ID of the carrier gateway. You can only use this option when the VPC contains a subnet which is associated with a Wavelength Zone. */
  CarrierGatewayId?: string;
  /** The Amazon Resource Name (ARN) of the core network. */
  CoreNetworkArn?: string;
  /** The IPv4 CIDR address block used for the destination match. Routing decisions are based on the most specific match. We modify the specified CIDR block to its canonical form; for example, if you specif */
  DestinationCidrBlock?: string;
  /** The IPv6 CIDR block used for the destination match. Routing decisions are based on the most specific match. */
  DestinationIpv6CidrBlock?: string;
  /** The ID of a prefix list used for the destination match. */
  DestinationPrefixListId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** [IPv6 traffic only] The ID of an egress-only internet gateway. */
  EgressOnlyInternetGatewayId?: string;
  /** The ID of an internet gateway or virtual private gateway attached to your VPC. */
  GatewayId?: string;
  /** The ID of a NAT instance in your VPC. The operation fails if you specify an instance ID unless exactly one network interface is attached. */
  InstanceId?: string;
  /** The ID of the local gateway. */
  LocalGatewayId?: string;
  /** [IPv4 traffic only] The ID of a NAT gateway. */
  NatGatewayId?: string;
  /** The ID of a network interface. */
  NetworkInterfaceId?: string;
  /** The Amazon Resource Name (ARN) of the ODB network. */
  OdbNetworkArn?: string;
  /** The ID of a transit gateway. */
  TransitGatewayId?: string;
  /** The ID of a VPC endpoint. Supported for Gateway Load Balancer endpoints only. */
  VpcEndpointId?: string;
  /** The ID of a VPC peering connection. */
  VpcPeeringConnectionId?: string;
}

export interface CreateRouteServerInput {
  /** The private Autonomous System Number (ASN) for the Amazon side of the BGP session. Valid values are from 1 to 4294967295. We recommend using a private ASN in the 64512–65534 (16-bit ASN) or 4200000000 */
  AmazonSideAsn: number;
  /** Unique, case-sensitive identifier to ensure idempotency of the request. */
  ClientToken?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Indicates whether routes should be persisted after all BGP sessions are terminated. */
  PersistRoutes?: 'enable' | 'disable' | 'reset';
  /** The number of minutes a route server will wait after BGP is re-established to unpersist the routes in the FIB and RIB. Value must be in the range of 1-5. Required if PersistRoutes is enabled. If you s */
  PersistRoutesDuration?: number;
  /** Indicates whether SNS notifications should be enabled for route server events. Enabling SNS notifications persists BGP status changes to an SNS topic provisioned by Amazon Web Services. */
  SnsNotificationsEnabled?: boolean;
  /** The tags to apply to the route server during creation. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateRouteServerEndpointInput {
  /** The ID of the route server for which to create an endpoint. */
  RouteServerId: string;
  /** The ID of the subnet in which to create the route server endpoint. */
  SubnetId: string;
  /** Unique, case-sensitive identifier to ensure idempotency of the request. */
  ClientToken?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The tags to apply to the route server endpoint during creation. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateRouteServerPeerInput {
  /** The BGP options for the peer, including ASN (Autonomous System Number) and BFD (Bidrectional Forwarding Detection) settings. */
  BgpOptions: RouteServerBgpOptionsRequest;
  /** The IPv4 address of the peer device. */
  PeerAddress: string;
  /** The ID of the route server endpoint for which to create a peer. */
  RouteServerEndpointId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The tags to apply to the route server peer during creation. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateRouteTableInput {
  /** The ID of the VPC. */
  VpcId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to the route table. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateSecondaryNetworkInput {
  /** The IPv4 CIDR block for the secondary network. The CIDR block size must be between /12 and /28. */
  Ipv4CidrBlock: string;
  /** The type of secondary network. */
  NetworkType: 'rdma';
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensure Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to the secondary network. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateSecondarySubnetInput {
  /** The IPv4 CIDR block for the secondary subnet. The CIDR block size must be between /12 and /28. */
  Ipv4CidrBlock: string;
  /** The ID of the secondary network in which to create the secondary subnet. */
  SecondaryNetworkId: string;
  /** The Availability Zone for the secondary subnet. You cannot specify both AvailabilityZone and AvailabilityZoneId in the same request. */
  AvailabilityZone?: string;
  /** The ID of the Availability Zone for the secondary subnet. This option is preferred over AvailabilityZone as it provides a consistent identifier across Amazon Web Services accounts. You cannot specify  */
  AvailabilityZoneId?: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensure Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to the secondary subnet. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateSecurityGroupInput {
  /** A description for the security group. Constraints: Up to 255 characters in length Valid characters: a-z, A-Z, 0-9, spaces, and ._-:/()#,@[]+=&;{}!$* */
  Description: string;
  /** The name of the security group. Names are case-insensitive and must be unique within the VPC. Constraints: Up to 255 characters in length. Can't start with sg-. Valid characters: a-z, A-Z, 0-9, spaces */
  GroupName: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to the security group. */
  TagSpecifications?: TagSpecification[];
  /** The ID of the VPC. Required for a nondefault VPC. */
  VpcId?: string;
}

export interface CreateSnapshotInput {
  /** The ID of the Amazon EBS volume. */
  VolumeId: string;
  /** A description for the snapshot. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Only supported for volumes in Local Zones. If the source volume is not in a Local Zone, omit this parameter. To create a local snapshot in the same Local Zone as the source volume, specify local. To c */
  Location?: 'regional' | 'local';
  /** Only supported for volumes on Outposts. If the source volume is not on an Outpost, omit this parameter. To create the snapshot on the same Outpost as the source volume, specify the ARN of that Outpost */
  OutpostArn?: string;
  /** The tags to apply to the snapshot during creation. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateSnapshotsInput {
  /** The instance to specify which volumes should be included in the snapshots. */
  InstanceSpecification: InstanceSpecification;
  /** Copies the tags from the specified volume to corresponding snapshot. */
  CopyTagsFromSource?: 'volume';
  /** A description propagated to every snapshot specified by the instance. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Only supported for instances in Local Zones. If the source instance is not in a Local Zone, omit this parameter. To create local snapshots in the same Local Zone as the source instance, specify local. */
  Location?: 'regional' | 'local';
  /** Only supported for instances on Outposts. If the source instance is not on an Outpost, omit this parameter. To create the snapshots on the same Outpost as the source instance, specify the ARN of that  */
  OutpostArn?: string;
  /** Tags to apply to every snapshot specified by the instance. */
  TagSpecifications?: TagSpecification[];
}

/** Contains the parameters for CreateSpotDatafeedSubscription. */
export interface CreateSpotDatafeedSubscriptionInput {
  /** The name of the Amazon S3 bucket in which to store the Spot Instance data feed. For more information about bucket names, see Bucket naming rules in the Amazon S3 User Guide. */
  Bucket: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The prefix for the data feed file names. */
  Prefix?: string;
}

export interface CreateStoreImageTaskInput {
  /** The name of the Amazon S3 bucket in which the AMI object will be stored. The bucket must be in the Region in which the request is being made. The AMI object appears in the bucket only after the upload */
  Bucket: string;
  /** The ID of the AMI. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to apply to the AMI object that will be stored in the Amazon S3 bucket. */
  S3ObjectTags?: S3ObjectTag[];
}

export interface CreateSubnetInput {
  /** The ID of the VPC. */
  VpcId: string;
  /** The Availability Zone or Local Zone for the subnet. Default: Amazon Web Services selects one for you. If you create more than one subnet in your VPC, we do not necessarily select a different zone for  */
  AvailabilityZone?: string;
  /** The AZ ID or the Local Zone ID of the subnet. */
  AvailabilityZoneId?: string;
  /** The IPv4 network range for the subnet, in CIDR notation. For example, 10.0.0.0/24. We modify the specified CIDR block to its canonical form; for example, if you specify 100.68.0.18/18, we modify it to */
  CidrBlock?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** An IPv4 IPAM pool ID for the subnet. */
  Ipv4IpamPoolId?: string;
  /** An IPv4 netmask length for the subnet. */
  Ipv4NetmaskLength?: number;
  /** The IPv6 network range for the subnet, in CIDR notation. This parameter is required for an IPv6 only subnet. */
  Ipv6CidrBlock?: string;
  /** An IPv6 IPAM pool ID for the subnet. */
  Ipv6IpamPoolId?: string;
  /** Indicates whether to create an IPv6 only subnet. */
  Ipv6Native?: boolean;
  /** An IPv6 netmask length for the subnet. */
  Ipv6NetmaskLength?: number;
  /** The Amazon Resource Name (ARN) of the Outpost. If you specify an Outpost ARN, you must also specify the Availability Zone of the Outpost subnet. */
  OutpostArn?: string;
  /** The tags to assign to the subnet. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateSubnetCidrReservationInput {
  /** The IPv4 or IPV6 CIDR range to reserve. */
  Cidr: string;
  /** The type of reservation. The reservation type determines how the reserved IP addresses are assigned to resources. prefix - Amazon Web Services assigns the reserved IP addresses to network interfaces.  */
  ReservationType: 'prefix' | 'explicit';
  /** The ID of the subnet. */
  SubnetId: string;
  /** The description to assign to the subnet CIDR reservation. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to the subnet CIDR reservation. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateTagsInput {
  /** The IDs of the resources, separated by spaces. Constraints: Up to 1000 resource IDs. We recommend breaking up this request into smaller batches. */
  Resources: string[];
  /** The tags. The value parameter is required, but if you don't want the tag to have a value, specify the parameter with no value, and we set the value to an empty string. */
  Tags: Tag[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface CreateTrafficMirrorFilterInput {
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken?: string;
  /** The description of the Traffic Mirror filter. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to assign to a Traffic Mirror filter. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateTrafficMirrorFilterRuleInput {
  /** The destination CIDR block to assign to the Traffic Mirror rule. */
  DestinationCidrBlock: string;
  /** The action to take on the filtered traffic. */
  RuleAction: 'accept' | 'reject';
  /** The number of the Traffic Mirror rule. This number must be unique for each Traffic Mirror rule in a given direction. The rules are processed in ascending order by rule number. */
  RuleNumber: number;
  /** The source CIDR block to assign to the Traffic Mirror rule. */
  SourceCidrBlock: string;
  /** The type of traffic. */
  TrafficDirection: 'ingress' | 'egress';
  /** The ID of the filter that this rule is associated with. */
  TrafficMirrorFilterId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken?: string;
  /** The description of the Traffic Mirror rule. */
  Description?: string;
  /** The destination port range. */
  DestinationPortRange?: TrafficMirrorPortRangeRequest;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The protocol, for example UDP, to assign to the Traffic Mirror rule. For information about the protocol value, see Protocol Numbers on the Internet Assigned Numbers Authority (IANA) website. */
  Protocol?: number;
  /** The source port range. */
  SourcePortRange?: TrafficMirrorPortRangeRequest;
  /** Traffic Mirroring tags specifications. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateTrafficMirrorSessionInput {
  /** The ID of the source network interface. */
  NetworkInterfaceId: string;
  /** The session number determines the order in which sessions are evaluated when an interface is used by multiple sessions. The first session with a matching filter is the one that mirrors the packets. Va */
  SessionNumber: number;
  /** The ID of the Traffic Mirror filter. */
  TrafficMirrorFilterId: string;
  /** The ID of the Traffic Mirror target. */
  TrafficMirrorTargetId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken?: string;
  /** The description of the Traffic Mirror session. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The number of bytes in each packet to mirror. These are bytes after the VXLAN header. Do not specify this parameter when you want to mirror the entire packet. To mirror a subset of the packet, set thi */
  PacketLength?: number;
  /** The tags to assign to a Traffic Mirror session. */
  TagSpecifications?: TagSpecification[];
  /** The VXLAN ID for the Traffic Mirror session. For more information about the VXLAN protocol, see RFC 7348. If you do not specify a VirtualNetworkId, an account-wide unique ID is chosen at random. */
  VirtualNetworkId?: number;
}

export interface CreateTrafficMirrorTargetInput {
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken?: string;
  /** The description of the Traffic Mirror target. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the Gateway Load Balancer endpoint. */
  GatewayLoadBalancerEndpointId?: string;
  /** The network interface ID that is associated with the target. */
  NetworkInterfaceId?: string;
  /** The Amazon Resource Name (ARN) of the Network Load Balancer that is associated with the target. */
  NetworkLoadBalancerArn?: string;
  /** The tags to assign to the Traffic Mirror target. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateTransitGatewayInput {
  /** A description of the transit gateway. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The transit gateway options. */
  Options?: TransitGatewayRequestOptions;
  /** The tags to apply to the transit gateway. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateTransitGatewayConnectInput {
  /** The Connect attachment options. */
  Options: CreateTransitGatewayConnectRequestOptions;
  /** The ID of the transit gateway attachment. You can specify a VPC attachment or Amazon Web Services Direct Connect attachment. */
  TransportTransitGatewayAttachmentId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to apply to the Connect attachment. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateTransitGatewayConnectPeerInput {
  /** The range of inside IP addresses that are used for BGP peering. You must specify a size /29 IPv4 CIDR block from the 169.254.0.0/16 range. The first address from the range must be configured on the ap */
  InsideCidrBlocks: string[];
  /** The peer IP address (GRE outer IP address) on the appliance side of the Connect peer. */
  PeerAddress: string;
  /** The ID of the Connect attachment. */
  TransitGatewayAttachmentId: string;
  /** The BGP options for the Connect peer. */
  BgpOptions?: TransitGatewayConnectRequestBgpOptions;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to apply to the Connect peer. */
  TagSpecifications?: TagSpecification[];
  /** The peer IP address (GRE outer IP address) on the transit gateway side of the Connect peer, which must be specified from a transit gateway CIDR block. If not specified, Amazon automatically assigns th */
  TransitGatewayAddress?: string;
}

export interface CreateTransitGatewayMeteringPolicyInput {
  /** The ID of the transit gateway for which to create the metering policy. */
  TransitGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IDs of the middlebox attachments to include in the metering policy. */
  MiddleboxAttachmentIds?: string[];
  /** The tags to assign to the metering policy. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateTransitGatewayMeteringPolicyEntryInput {
  /** The Amazon Web Services account ID to which the metered traffic should be attributed. */
  MeteredAccount: 'source-attachment-owner' | 'destination-attachment-owner' | 'transit-gateway-owner';
  /** The rule number for the metering policy entry. Rules are processed in order from lowest to highest number. */
  PolicyRuleNumber: number;
  /** The ID of the transit gateway metering policy to add the entry to. */
  TransitGatewayMeteringPolicyId: string;
  /** The destination CIDR block for traffic matching. */
  DestinationCidrBlock?: string;
  /** The destination port range for traffic matching. */
  DestinationPortRange?: string;
  /** The ID of the destination transit gateway attachment for traffic matching. */
  DestinationTransitGatewayAttachmentId?: string;
  /** The type of the destination transit gateway attachment for traffic matching. Note that the tgw-peering resource type has been deprecated. To configure metering policies for Connect, use the transport  */
  DestinationTransitGatewayAttachmentType?: 'vpc' | 'vpn' | 'vpn-concentrator' | 'direct-connect-gateway' | 'connect' | 'peering' | 'tgw-peering' | 'network-function';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The protocol for traffic matching (1, 6, 17, etc.). */
  Protocol?: string;
  /** The source CIDR block for traffic matching. */
  SourceCidrBlock?: string;
  /** The source port range for traffic matching. */
  SourcePortRange?: string;
  /** The ID of the source transit gateway attachment for traffic matching. */
  SourceTransitGatewayAttachmentId?: string;
  /** The type of the source transit gateway attachment for traffic matching. Note that the tgw-peering resource type has been deprecated. To configure metering policies for Connect, use the transport attac */
  SourceTransitGatewayAttachmentType?: 'vpc' | 'vpn' | 'vpn-concentrator' | 'direct-connect-gateway' | 'connect' | 'peering' | 'tgw-peering' | 'network-function';
}

export interface CreateTransitGatewayMulticastDomainInput {
  /** The ID of the transit gateway. */
  TransitGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The options for the transit gateway multicast domain. */
  Options?: CreateTransitGatewayMulticastDomainRequestOptions;
  /** The tags for the transit gateway multicast domain. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateTransitGatewayPeeringAttachmentInput {
  /** The ID of the Amazon Web Services account that owns the peer transit gateway. */
  PeerAccountId: string;
  /** The Region where the peer transit gateway is located. */
  PeerRegion: string;
  /** The ID of the peer transit gateway with which to create the peering attachment. */
  PeerTransitGatewayId: string;
  /** The ID of the transit gateway. */
  TransitGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Requests a transit gateway peering attachment. */
  Options?: CreateTransitGatewayPeeringAttachmentRequestOptions;
  /** The tags to apply to the transit gateway peering attachment. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateTransitGatewayPolicyTableInput {
  /** The ID of the transit gateway used for the policy table. */
  TransitGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags specification for the transit gateway policy table created during the request. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateTransitGatewayPrefixListReferenceInput {
  /** The ID of the prefix list that is used for destination matches. */
  PrefixListId: string;
  /** The ID of the transit gateway route table. */
  TransitGatewayRouteTableId: string;
  /** Indicates whether to drop traffic that matches this route. */
  Blackhole?: boolean;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the attachment to which traffic is routed. */
  TransitGatewayAttachmentId?: string;
}

export interface CreateTransitGatewayRouteInput {
  /** The CIDR range used for destination matches. Routing decisions are based on the most specific match. */
  DestinationCidrBlock: string;
  /** The ID of the transit gateway route table. */
  TransitGatewayRouteTableId: string;
  /** Indicates whether to drop traffic that matches this route. */
  Blackhole?: boolean;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the attachment. */
  TransitGatewayAttachmentId?: string;
}

export interface CreateTransitGatewayRouteTableInput {
  /** The ID of the transit gateway. */
  TransitGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to apply to the transit gateway route table. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateTransitGatewayRouteTableAnnouncementInput {
  /** The ID of the peering attachment. */
  PeeringAttachmentId: string;
  /** The ID of the transit gateway route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags specifications applied to the transit gateway route table announcement. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateTransitGatewayVpcAttachmentInput {
  /** The IDs of one or more subnets. You can specify only one subnet per Availability Zone. You must specify at least one subnet, but we recommend that you specify two subnets for better availability. The  */
  SubnetIds: string[];
  /** The ID of the transit gateway. */
  TransitGatewayId: string;
  /** The ID of the VPC. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The VPC attachment options. */
  Options?: CreateTransitGatewayVpcAttachmentRequestOptions;
  /** The tags to apply to the VPC attachment. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateVerifiedAccessEndpointInput {
  /** The type of attachment. */
  AttachmentType: 'vpc';
  /** The type of Verified Access endpoint to create. */
  EndpointType: 'load-balancer' | 'network-interface' | 'rds' | 'cidr';
  /** The ID of the Verified Access group to associate the endpoint with. */
  VerifiedAccessGroupId: string;
  /** The DNS name for users to reach your application. */
  ApplicationDomain?: string;
  /** The CIDR options. This parameter is required if the endpoint type is cidr. */
  CidrOptions?: CreateVerifiedAccessEndpointCidrOptions;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the Verified Access endpoint. */
  Description?: string;
  /** The ARN of the public TLS/SSL certificate in Amazon Web Services Certificate Manager to associate with the endpoint. The CN in the certificate must match the DNS name your end users will use to reach  */
  DomainCertificateArn?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** A custom identifier that is prepended to the DNS name that is generated for the endpoint. */
  EndpointDomainPrefix?: string;
  /** The load balancer details. This parameter is required if the endpoint type is load-balancer. */
  LoadBalancerOptions?: CreateVerifiedAccessEndpointLoadBalancerOptions;
  /** The network interface details. This parameter is required if the endpoint type is network-interface. */
  NetworkInterfaceOptions?: CreateVerifiedAccessEndpointEniOptions;
  /** The Verified Access policy document. */
  PolicyDocument?: string;
  /** The RDS details. This parameter is required if the endpoint type is rds. */
  RdsOptions?: CreateVerifiedAccessEndpointRdsOptions;
  /** The IDs of the security groups to associate with the Verified Access endpoint. Required if AttachmentType is set to vpc. */
  SecurityGroupIds?: string[];
  /** The options for server side encryption. */
  SseSpecification?: VerifiedAccessSseSpecificationRequest;
  /** The tags to assign to the Verified Access endpoint. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateVerifiedAccessGroupInput {
  /** The ID of the Verified Access instance. */
  VerifiedAccessInstanceId: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the Verified Access group. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The Verified Access policy document. */
  PolicyDocument?: string;
  /** The options for server side encryption. */
  SseSpecification?: VerifiedAccessSseSpecificationRequest;
  /** The tags to assign to the Verified Access group. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateVerifiedAccessInstanceInput {
  /** The custom subdomain. */
  CidrEndpointsCustomSubDomain?: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the Verified Access instance. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Enable or disable support for Federal Information Processing Standards (FIPS) on the instance. */
  FIPSEnabled?: boolean;
  /** The tags to assign to the Verified Access instance. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateVerifiedAccessTrustProviderInput {
  /** The identifier to be used when working with policy rules. */
  PolicyReferenceName: string;
  /** The type of trust provider. */
  TrustProviderType: 'user' | 'device';
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the Verified Access trust provider. */
  Description?: string;
  /** The options for a device-based trust provider. This parameter is required when the provider type is device. */
  DeviceOptions?: CreateVerifiedAccessTrustProviderDeviceOptions;
  /** The type of device-based trust provider. This parameter is required when the provider type is device. */
  DeviceTrustProviderType?: 'jamf' | 'crowdstrike' | 'jumpcloud';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The OpenID Connect (OIDC) options. */
  NativeApplicationOidcOptions?: CreateVerifiedAccessNativeApplicationOidcOptions;
  /** The options for a OpenID Connect-compatible user-identity trust provider. This parameter is required when the provider type is user. */
  OidcOptions?: CreateVerifiedAccessTrustProviderOidcOptions;
  /** The options for server side encryption. */
  SseSpecification?: VerifiedAccessSseSpecificationRequest;
  /** The tags to assign to the Verified Access trust provider. */
  TagSpecifications?: TagSpecification[];
  /** The type of user-based trust provider. This parameter is required when the provider type is user. */
  UserTrustProviderType?: 'iam-identity-center' | 'oidc';
}

export interface CreateVolumeInput {
  /** The ID of the Availability Zone in which to create the volume. For example, us-east-1a. Either AvailabilityZone or AvailabilityZoneId must be specified, but not both. */
  AvailabilityZone?: string;
  /** The ID of the Availability Zone in which to create the volume. For example, use1-az1. Either AvailabilityZone or AvailabilityZoneId must be specified, but not both. */
  AvailabilityZoneId?: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensure Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Indicates whether the volume should be encrypted. The effect of setting the encryption state to true depends on the volume origin (new or from a snapshot), starting encryption state, ownership, and wh */
  Encrypted?: boolean;
  /** The number of I/O operations per second (IOPS) to provision for the volume. Required for io1 and io2 volumes. Optional for gp3 volumes. Omit for all other volume types. Valid ranges: gp3: 3,000 (defau */
  Iops?: number;
  /** The identifier of the KMS key to use for Amazon EBS encryption. If this parameter is not specified, your KMS key for Amazon EBS is used. If KmsKeyId is specified, the encrypted state must be true. You */
  KmsKeyId?: string;
  /** Indicates whether to enable Amazon EBS Multi-Attach. If you enable Multi-Attach, you can attach the volume to up to 16 Instances built on the Nitro System in the same Availability Zone. This parameter */
  MultiAttachEnabled?: boolean;
  /** Reserved for internal use. */
  Operator?: OperatorRequest;
  /** The Amazon Resource Name (ARN) of the Outpost on which to create the volume. If you intend to use a volume with an instance running on an outpost, then you must create the volume on the same outpost a */
  OutpostArn?: string;
  /** The size of the volume, in GiBs. You must specify either a snapshot ID or a volume size. If you specify a snapshot, the default is the snapshot size, and you can specify a volume size that is equal to */
  Size?: number;
  /** The snapshot from which to create the volume. You must specify either a snapshot ID or a volume size. */
  SnapshotId?: string;
  /** The tags to apply to the volume during creation. */
  TagSpecifications?: TagSpecification[];
  /** The throughput to provision for the volume, in MiB/s. Supported for gp3 volumes only. Omit for all other volume types. Valid Range: 125 - 2000 MiB/s */
  Throughput?: number;
  /** Specifies the Amazon EBS Provisioned Rate for Volume Initialization (volume initialization rate), in MiB/s, at which to download the snapshot blocks from Amazon S3 to the volume. This is also known as */
  VolumeInitializationRate?: number;
  /** The volume type. This parameter can be one of the following values: General Purpose SSD: gp2 | gp3 Provisioned IOPS SSD: io1 | io2 Throughput Optimized HDD: st1 Cold HDD: sc1 Magnetic: standard Throug */
  VolumeType?: 'standard' | 'io1' | 'io2' | 'gp2' | 'sc1' | 'st1' | 'gp3';
}

export interface CreateVpcInput {
  /** Requests an Amazon-provided IPv6 CIDR block with a /56 prefix length for the VPC. You cannot specify the range of IP addresses, or the size of the CIDR block. */
  AmazonProvidedIpv6CidrBlock?: boolean;
  /** The IPv4 network range for the VPC, in CIDR notation. For example, 10.0.0.0/16. We modify the specified CIDR block to its canonical form; for example, if you specify 100.68.0.18/18, we modify it to 10 */
  CidrBlock?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tenancy options for instances launched into the VPC. For default, instances are launched with shared tenancy by default. You can launch instances with any tenancy into a shared tenancy VPC. For de */
  InstanceTenancy?: 'default' | 'dedicated' | 'host';
  /** The ID of an IPv4 IPAM pool you want to use for allocating this VPC's CIDR. For more information, see What is IPAM? in the Amazon VPC IPAM User Guide. */
  Ipv4IpamPoolId?: string;
  /** The netmask length of the IPv4 CIDR you want to allocate to this VPC from an Amazon VPC IP Address Manager (IPAM) pool. For more information about IPAM, see What is IPAM? in the Amazon VPC IPAM User G */
  Ipv4NetmaskLength?: number;
  /** The IPv6 CIDR block from the IPv6 address pool. You must also specify Ipv6Pool in the request. To let Amazon choose the IPv6 CIDR block for you, omit this parameter. */
  Ipv6CidrBlock?: string;
  /** The name of the location from which we advertise the IPV6 CIDR block. Use this parameter to limit the address to this location. You must set AmazonProvidedIpv6CidrBlock to true to use this parameter. */
  Ipv6CidrBlockNetworkBorderGroup?: string;
  /** The ID of an IPv6 IPAM pool which will be used to allocate this VPC an IPv6 CIDR. IPAM is a VPC feature that you can use to automate your IP address management workflows including assigning, tracking, */
  Ipv6IpamPoolId?: string;
  /** The netmask length of the IPv6 CIDR you want to allocate to this VPC from an Amazon VPC IP Address Manager (IPAM) pool. For more information about IPAM, see What is IPAM? in the Amazon VPC IPAM User G */
  Ipv6NetmaskLength?: number;
  /** The ID of an IPv6 address pool from which to allocate the IPv6 CIDR block. */
  Ipv6Pool?: string;
  /** The tags to assign to the VPC. */
  TagSpecifications?: TagSpecification[];
  /** Specifies the encryption control configuration to apply to the VPC during creation. VPC Encryption Control enables you to enforce encryption for all data in transit within and between VPCs to meet com */
  VpcEncryptionControl?: VpcEncryptionControlConfiguration;
}

export interface CreateVpcBlockPublicAccessExclusionInput {
  /** The exclusion mode for internet gateway traffic. allow-bidirectional: Allow all internet traffic to and from the excluded VPCs and subnets. allow-egress: Allow outbound internet traffic from the exclu */
  InternetGatewayExclusionMode: 'allow-bidirectional' | 'allow-egress';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** A subnet ID. */
  SubnetId?: string;
  /** tag - The key/value combination of a tag assigned to the resource. Use the tag key in the filter name and the tag value as the filter value. For example, to find all resources that have a tag with the */
  TagSpecifications?: TagSpecification[];
  /** A VPC ID. */
  VpcId?: string;
}

export interface CreateVpcEncryptionControlInput {
  /** The ID of the VPC for which to create the encryption control configuration. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to apply to the VPC Encryption Control resource. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateVpcEndpointInput {
  /** The ID of the VPC. */
  VpcId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken?: string;
  /** The DNS options for the endpoint. */
  DnsOptions?: DnsOptionsSpecification;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IP address type for the endpoint. */
  IpAddressType?: 'ipv4' | 'dualstack' | 'ipv6';
  /** (Interface and gateway endpoints) A policy to attach to the endpoint that controls access to the service. The policy must be in valid JSON format. If this parameter is not specified, we attach a defau */
  PolicyDocument?: string;
  /** (Interface endpoint) Indicates whether to associate a private hosted zone with the specified VPC. The private hosted zone contains a record set for the default public DNS name for the service for the  */
  PrivateDnsEnabled?: boolean;
  /** The Amazon Resource Name (ARN) of a resource configuration that will be associated with the VPC endpoint of type resource. */
  ResourceConfigurationArn?: string;
  /** (Gateway endpoint) The route table IDs. */
  RouteTableIds?: string[];
  /** (Interface endpoint) The IDs of the security groups to associate with the endpoint network interfaces. If this parameter is not specified, we use the default security group for the VPC. */
  SecurityGroupIds?: string[];
  /** The name of the endpoint service. */
  ServiceName?: string;
  /** The Amazon Resource Name (ARN) of a service network that will be associated with the VPC endpoint of type service-network. */
  ServiceNetworkArn?: string;
  /** The Region where the service is hosted. The default is the current Region. */
  ServiceRegion?: string;
  /** The subnet configurations for the endpoint. */
  SubnetConfigurations?: SubnetConfiguration[];
  /** (Interface and Gateway Load Balancer endpoints) The IDs of the subnets in which to create endpoint network interfaces. For a Gateway Load Balancer endpoint, you can specify only one subnet. */
  SubnetIds?: string[];
  /** The tags to associate with the endpoint. */
  TagSpecifications?: TagSpecification[];
  /** The type of endpoint. Default: Gateway */
  VpcEndpointType?: 'Interface' | 'Gateway' | 'GatewayLoadBalancer' | 'Resource' | 'ServiceNetwork';
}

export interface CreateVpcEndpointConnectionNotificationInput {
  /** The endpoint events for which to receive notifications. Valid values are Accept, Connect, Delete, and Reject. */
  ConnectionEvents: string[];
  /** The ARN of the SNS topic for the notifications. */
  ConnectionNotificationArn: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the endpoint service. */
  ServiceId?: string;
  /** The ID of the endpoint. */
  VpcEndpointId?: string;
}

export interface CreateVpcEndpointServiceConfigurationInput {
  /** Indicates whether requests from service consumers to create an endpoint to your service must be accepted manually. */
  AcceptanceRequired?: boolean;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The Amazon Resource Names (ARNs) of the Gateway Load Balancers. */
  GatewayLoadBalancerArns?: string[];
  /** The Amazon Resource Names (ARNs) of the Network Load Balancers. */
  NetworkLoadBalancerArns?: string[];
  /** (Interface endpoint configuration) The private DNS name to assign to the VPC endpoint service. */
  PrivateDnsName?: string;
  /** The supported IP address types. The possible values are ipv4 and ipv6. */
  SupportedIpAddressTypes?: string[];
  /** The Regions from which service consumers can access the service. */
  SupportedRegions?: string[];
  /** The tags to associate with the service. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateVpcPeeringConnectionInput {
  /** The ID of the requester VPC. You must specify this parameter in the request. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The Amazon Web Services account ID of the owner of the accepter VPC. Default: Your Amazon Web Services account ID */
  PeerOwnerId?: string;
  /** The Region code for the accepter VPC, if the accepter VPC is located in a Region other than the Region in which you make the request. Default: The Region in which you make the request. */
  PeerRegion?: string;
  /** The ID of the VPC with which you are creating the VPC peering connection. You must specify this parameter in the request. */
  PeerVpcId?: string;
  /** The tags to assign to the peering connection. */
  TagSpecifications?: TagSpecification[];
}

export interface CreateVpnConcentratorInput {
  /** The type of VPN concentrator to create. */
  Type: 'ipsec.1';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to apply to the VPN concentrator during creation. */
  TagSpecifications?: TagSpecification[];
  /** The ID of the transit gateway to attach the VPN concentrator to. */
  TransitGatewayId?: string;
}

/** Contains the parameters for CreateVpnConnection. */
export interface CreateVpnConnectionInput {
  /** The ID of the customer gateway. */
  CustomerGatewayId: string;
  /** The type of VPN connection (ipsec.1). */
  Type: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The options for the VPN connection. */
  Options?: VpnConnectionOptionsSpecification;
  /** Specifies the storage mode for the pre-shared key (PSK). Valid values are Standard" (stored in the Site-to-Site VPN service) or SecretsManager (stored in Amazon Web Services Secrets Manager). */
  PreSharedKeyStorage?: string;
  /** The tags to apply to the VPN connection. */
  TagSpecifications?: TagSpecification[];
  /** The ID of the transit gateway. If you specify a transit gateway, you cannot specify a virtual private gateway. */
  TransitGatewayId?: string;
  /** The ID of the VPN concentrator to associate with the VPN connection. */
  VpnConcentratorId?: string;
  /** The ID of the virtual private gateway. If you specify a virtual private gateway, you cannot specify a transit gateway. */
  VpnGatewayId?: string;
}

/** Contains the parameters for CreateVpnConnectionRoute. */
export interface CreateVpnConnectionRouteInput {
  /** The CIDR block associated with the local subnet of the customer network. */
  DestinationCidrBlock: string;
  /** The ID of the VPN connection. */
  VpnConnectionId: string;
}

/** Contains the parameters for CreateVpnGateway. */
export interface CreateVpnGatewayInput {
  /** The type of VPN connection this virtual private gateway supports. */
  Type: 'ipsec.1';
  /** A private Autonomous System Number (ASN) for the Amazon side of a BGP session. If you're using a 16-bit ASN, it must be in the 64512 to 65534 range. If you're using a 32-bit ASN, it must be in the 420 */
  AmazonSideAsn?: number;
  /** The Availability Zone for the virtual private gateway. */
  AvailabilityZone?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to apply to the virtual private gateway. */
  TagSpecifications?: TagSpecification[];
}

export interface DeleteCapacityManagerDataExportInput {
  /** The unique identifier of the data export configuration to delete. */
  CapacityManagerDataExportId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteCarrierGatewayInput {
  /** The ID of the carrier gateway. */
  CarrierGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteClientVpnEndpointInput {
  /** The ID of the Client VPN to be deleted. */
  ClientVpnEndpointId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteClientVpnRouteInput {
  /** The ID of the Client VPN endpoint from which the route is to be deleted. */
  ClientVpnEndpointId: string;
  /** The IPv4 address range, in CIDR notation, of the route to be deleted. */
  DestinationCidrBlock: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the target subnet used by the route. */
  TargetVpcSubnetId?: string;
}

export interface DeleteCoipCidrInput {
  /** A customer-owned IP address range that you want to delete. */
  Cidr: string;
  /** The ID of the customer-owned address pool. */
  CoipPoolId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteCoipPoolInput {
  /** The ID of the CoIP pool that you want to delete. */
  CoipPoolId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for DeleteCustomerGateway. */
export interface DeleteCustomerGatewayInput {
  /** The ID of the customer gateway. */
  CustomerGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteDhcpOptionsInput {
  /** The ID of the DHCP options set. */
  DhcpOptionsId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteEgressOnlyInternetGatewayInput {
  /** The ID of the egress-only internet gateway. */
  EgressOnlyInternetGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteFleetsInput {
  /** The IDs of the EC2 Fleets. Constraints: In a single request, you can specify up to 25 instant fleet IDs and up to 100 maintain or request fleet IDs. */
  FleetIds: string[];
  /** Indicates whether to terminate the associated instances when the EC2 Fleet is deleted. The default is to terminate the instances. To let the instances continue to run after the EC2 Fleet is deleted, s */
  TerminateInstances: boolean;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteFlowLogsInput {
  /** One or more flow log IDs. Constraint: Maximum of 1000 flow log IDs. */
  FlowLogIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteFpgaImageInput {
  /** The ID of the AFI. */
  FpgaImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteImageUsageReportInput {
  /** The ID of the report to delete. */
  ReportId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteInstanceConnectEndpointInput {
  /** The ID of the EC2 Instance Connect Endpoint to delete. */
  InstanceConnectEndpointId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteInstanceEventWindowInput {
  /** The ID of the event window. */
  InstanceEventWindowId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specify true to force delete the event window. Use the force delete parameter if the event window is currently associated with targets. */
  ForceDelete?: boolean;
}

export interface DeleteInternetGatewayInput {
  /** The ID of the internet gateway. */
  InternetGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteIpamInput {
  /** The ID of the IPAM to delete. */
  IpamId: string;
  /** Enables you to quickly delete an IPAM, private scopes, pools in private scopes, and any allocations in the pools in private scopes. You cannot delete the IPAM with this option if there is a pool in yo */
  Cascade?: boolean;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeleteIpamExternalResourceVerificationTokenInput {
  /** The token ID. */
  IpamExternalResourceVerificationTokenId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeleteIpamPolicyInput {
  /** The ID of the IPAM policy to delete. */
  IpamPolicyId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeleteIpamPoolInput {
  /** The ID of the pool to delete. */
  IpamPoolId: string;
  /** Enables you to quickly delete an IPAM pool and all resources within that pool, including provisioned CIDRs, allocations, and other pools. You can only use this option to delete pools in the private sc */
  Cascade?: boolean;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeleteIpamPrefixListResolverInput {
  /** The ID of the IPAM prefix list resolver to delete. */
  IpamPrefixListResolverId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeleteIpamPrefixListResolverTargetInput {
  /** The ID of the IPAM prefix list resolver target to delete. */
  IpamPrefixListResolverTargetId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeleteIpamResourceDiscoveryInput {
  /** The IPAM resource discovery ID. */
  IpamResourceDiscoveryId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeleteIpamScopeInput {
  /** The ID of the scope to delete. */
  IpamScopeId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeleteKeyPairInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The name of the key pair. */
  KeyName?: string;
  /** The ID of the key pair. */
  KeyPairId?: string;
}

export interface DeleteLaunchTemplateInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the launch template. You must specify either the launch template ID or the launch template name, but not both. */
  LaunchTemplateId?: string;
  /** The name of the launch template. You must specify either the launch template ID or the launch template name, but not both. */
  LaunchTemplateName?: string;
}

export interface DeleteLaunchTemplateVersionsInput {
  /** The version numbers of one or more launch template versions to delete. You can specify up to 200 launch template version numbers. */
  Versions: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the launch template. You must specify either the launch template ID or the launch template name, but not both. */
  LaunchTemplateId?: string;
  /** The name of the launch template. You must specify either the launch template ID or the launch template name, but not both. */
  LaunchTemplateName?: string;
}

export interface DeleteLocalGatewayRouteInput {
  /** The ID of the local gateway route table. */
  LocalGatewayRouteTableId: string;
  /** The CIDR range for the route. This must match the CIDR for the route exactly. */
  DestinationCidrBlock?: string;
  /** Use a prefix list in place of DestinationCidrBlock. You cannot use DestinationPrefixListId and DestinationCidrBlock in the same request. */
  DestinationPrefixListId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteLocalGatewayRouteTableInput {
  /** The ID of the local gateway route table. */
  LocalGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteLocalGatewayRouteTableVirtualInterfaceGroupAssociationInput {
  /** The ID of the local gateway route table virtual interface group association. */
  LocalGatewayRouteTableVirtualInterfaceGroupAssociationId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteLocalGatewayRouteTableVpcAssociationInput {
  /** The ID of the association. */
  LocalGatewayRouteTableVpcAssociationId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteLocalGatewayVirtualInterfaceInput {
  /** The ID of the local virtual interface to delete. */
  LocalGatewayVirtualInterfaceId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteLocalGatewayVirtualInterfaceGroupInput {
  /** The ID of the local gateway virtual interface group to delete. */
  LocalGatewayVirtualInterfaceGroupId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteManagedPrefixListInput {
  /** The ID of the prefix list. */
  PrefixListId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteNatGatewayInput {
  /** The ID of the NAT gateway. */
  NatGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteNetworkAclInput {
  /** The ID of the network ACL. */
  NetworkAclId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteNetworkAclEntryInput {
  /** Indicates whether the rule is an egress rule. */
  Egress: boolean;
  /** The ID of the network ACL. */
  NetworkAclId: string;
  /** The rule number of the entry to delete. */
  RuleNumber: number;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteNetworkInsightsAccessScopeInput {
  /** The ID of the Network Access Scope. */
  NetworkInsightsAccessScopeId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteNetworkInsightsAccessScopeAnalysisInput {
  /** The ID of the Network Access Scope analysis. */
  NetworkInsightsAccessScopeAnalysisId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteNetworkInsightsAnalysisInput {
  /** The ID of the network insights analysis. */
  NetworkInsightsAnalysisId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteNetworkInsightsPathInput {
  /** The ID of the path. */
  NetworkInsightsPathId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for DeleteNetworkInterface. */
export interface DeleteNetworkInterfaceInput {
  /** The ID of the network interface. */
  NetworkInterfaceId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for DeleteNetworkInterfacePermission. */
export interface DeleteNetworkInterfacePermissionInput {
  /** The ID of the network interface permission. */
  NetworkInterfacePermissionId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specify true to remove the permission even if the network interface is attached to an instance. */
  Force?: boolean;
}

export interface DeletePlacementGroupInput {
  /** The name of the placement group. */
  GroupName: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeletePublicIpv4PoolInput {
  /** The ID of the public IPv4 pool you want to delete. */
  PoolId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The Availability Zone (AZ) or Local Zone (LZ) network border group that the resource that the IP address is assigned to is in. Defaults to an AZ network border group. For more information on available */
  NetworkBorderGroup?: string;
}

export interface DeleteQueuedReservedInstancesInput {
  /** The IDs of the Reserved Instances. */
  ReservedInstancesIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteRouteInput {
  /** The ID of the route table. */
  RouteTableId: string;
  /** The IPv4 CIDR range for the route. The value you specify must match the CIDR for the route exactly. */
  DestinationCidrBlock?: string;
  /** The IPv6 CIDR range for the route. The value you specify must match the CIDR for the route exactly. */
  DestinationIpv6CidrBlock?: string;
  /** The ID of the prefix list for the route. */
  DestinationPrefixListId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteRouteServerInput {
  /** The ID of the route server to delete. */
  RouteServerId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeleteRouteServerEndpointInput {
  /** The ID of the route server endpoint to delete. */
  RouteServerEndpointId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeleteRouteServerPeerInput {
  /** The ID of the route server peer to delete. */
  RouteServerPeerId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeleteRouteTableInput {
  /** The ID of the route table. */
  RouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteSecondaryNetworkInput {
  /** The ID of the secondary network. */
  SecondaryNetworkId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensure Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteSecondarySubnetInput {
  /** The ID of the secondary subnet to delete. */
  SecondarySubnetId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensure Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteSecurityGroupInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the security group. */
  GroupId?: string;
  /** [Default VPC] The name of the security group. You can specify either the security group name or the security group ID. For security groups in a nondefault VPC, you must specify the security group ID. */
  GroupName?: string;
}

export interface DeleteSnapshotInput {
  /** The ID of the EBS snapshot. */
  SnapshotId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for DeleteSpotDatafeedSubscription. */
export interface DeleteSpotDatafeedSubscriptionInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteSubnetInput {
  /** The ID of the subnet. */
  SubnetId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteSubnetCidrReservationInput {
  /** The ID of the subnet CIDR reservation. */
  SubnetCidrReservationId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTagsInput {
  /** The IDs of the resources, separated by spaces. Constraints: Up to 1000 resource IDs. We recommend breaking up this request into smaller batches. */
  Resources: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to delete. Specify a tag key and an optional tag value to delete specific tags. If you specify a tag key without a tag value, we delete any tag with this key regardless of its value. If you s */
  Tags?: Tag[];
}

export interface DeleteTrafficMirrorFilterInput {
  /** The ID of the Traffic Mirror filter. */
  TrafficMirrorFilterId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTrafficMirrorFilterRuleInput {
  /** The ID of the Traffic Mirror rule. */
  TrafficMirrorFilterRuleId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTrafficMirrorSessionInput {
  /** The ID of the Traffic Mirror session. */
  TrafficMirrorSessionId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTrafficMirrorTargetInput {
  /** The ID of the Traffic Mirror target. */
  TrafficMirrorTargetId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayInput {
  /** The ID of the transit gateway. */
  TransitGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayConnectInput {
  /** The ID of the Connect attachment. */
  TransitGatewayAttachmentId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayConnectPeerInput {
  /** The ID of the Connect peer. */
  TransitGatewayConnectPeerId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayMeteringPolicyInput {
  /** The ID of the transit gateway metering policy to delete. */
  TransitGatewayMeteringPolicyId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayMeteringPolicyEntryInput {
  /** The rule number of the metering policy entry to delete. */
  PolicyRuleNumber: number;
  /** The ID of the transit gateway metering policy containing the entry to delete. */
  TransitGatewayMeteringPolicyId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayMulticastDomainInput {
  /** The ID of the transit gateway multicast domain. */
  TransitGatewayMulticastDomainId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayPeeringAttachmentInput {
  /** The ID of the transit gateway peering attachment. */
  TransitGatewayAttachmentId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayPolicyTableInput {
  /** The transit gateway policy table to delete. */
  TransitGatewayPolicyTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayPrefixListReferenceInput {
  /** The ID of the prefix list. */
  PrefixListId: string;
  /** The ID of the route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayRouteInput {
  /** The CIDR range for the route. This must match the CIDR for the route exactly. */
  DestinationCidrBlock: string;
  /** The ID of the transit gateway route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayRouteTableInput {
  /** The ID of the transit gateway route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayRouteTableAnnouncementInput {
  /** The transit gateway route table ID that's being deleted. */
  TransitGatewayRouteTableAnnouncementId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteTransitGatewayVpcAttachmentInput {
  /** The ID of the attachment. */
  TransitGatewayAttachmentId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVerifiedAccessEndpointInput {
  /** The ID of the Verified Access endpoint. */
  VerifiedAccessEndpointId: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVerifiedAccessGroupInput {
  /** The ID of the Verified Access group. */
  VerifiedAccessGroupId: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVerifiedAccessInstanceInput {
  /** The ID of the Verified Access instance. */
  VerifiedAccessInstanceId: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVerifiedAccessTrustProviderInput {
  /** The ID of the Verified Access trust provider. */
  VerifiedAccessTrustProviderId: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVolumeInput {
  /** The ID of the volume. */
  VolumeId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVpcInput {
  /** The ID of the VPC. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVpcBlockPublicAccessExclusionInput {
  /** The ID of the exclusion. */
  ExclusionId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVpcEncryptionControlInput {
  /** The ID of the VPC Encryption Control resource to delete. */
  VpcEncryptionControlId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVpcEndpointConnectionNotificationsInput {
  /** The IDs of the notifications. */
  ConnectionNotificationIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVpcEndpointsInput {
  /** The IDs of the VPC endpoints. */
  VpcEndpointIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVpcEndpointServiceConfigurationsInput {
  /** The IDs of the services. */
  ServiceIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVpcPeeringConnectionInput {
  /** The ID of the VPC peering connection. */
  VpcPeeringConnectionId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeleteVpnConcentratorInput {
  /** The ID of the VPN concentrator to delete. */
  VpnConcentratorId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for DeleteVpnConnection. */
export interface DeleteVpnConnectionInput {
  /** The ID of the VPN connection. */
  VpnConnectionId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for DeleteVpnConnectionRoute. */
export interface DeleteVpnConnectionRouteInput {
  /** The CIDR block associated with the local subnet of the customer network. */
  DestinationCidrBlock: string;
  /** The ID of the VPN connection. */
  VpnConnectionId: string;
}

/** Contains the parameters for DeleteVpnGateway. */
export interface DeleteVpnGatewayInput {
  /** The ID of the virtual private gateway. */
  VpnGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeprovisionByoipCidrInput {
  /** The address range, in CIDR notation. The prefix must be the same prefix that you specified when you provisioned the address range. */
  Cidr: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeprovisionIpamByoasnInput {
  /** An ASN. */
  Asn: string;
  /** The IPAM ID. */
  IpamId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeprovisionIpamPoolCidrInput {
  /** The ID of the pool that has the CIDR you want to deprovision. */
  IpamPoolId: string;
  /** The CIDR which you want to deprovision from the pool. */
  Cidr?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DeprovisionPublicIpv4PoolCidrInput {
  /** The CIDR you want to deprovision from the pool. */
  Cidr: string;
  /** The ID of the pool that you want to deprovision the CIDR from. */
  PoolId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

/** Contains the parameters for DeregisterImage. */
export interface DeregisterImageInput {
  /** The ID of the AMI. */
  ImageId: string;
  /** Specifies whether to delete the snapshots associated with the AMI during deregistration. If a snapshot is associated with multiple AMIs, it is not deleted, regardless of this setting. Default: The sna */
  DeleteAssociatedSnapshots?: boolean;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeregisterInstanceEventNotificationAttributesInput {
  /** Information about the tag keys to deregister. */
  InstanceTagAttribute: DeregisterInstanceTagAttributeRequest;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DeregisterTransitGatewayMulticastGroupMembersInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IP address assigned to the transit gateway multicast group. */
  GroupIpAddress?: string;
  /** The IDs of the group members' network interfaces. */
  NetworkInterfaceIds?: string[];
  /** The ID of the transit gateway multicast domain. */
  TransitGatewayMulticastDomainId?: string;
}

export interface DeregisterTransitGatewayMulticastGroupSourcesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IP address assigned to the transit gateway multicast group. */
  GroupIpAddress?: string;
  /** The IDs of the group sources' network interfaces. */
  NetworkInterfaceIds?: string[];
  /** The ID of the transit gateway multicast domain. */
  TransitGatewayMulticastDomainId?: string;
}

export interface DescribeAccountAttributesInput {
  /** The account attribute names. */
  AttributeNames?: 'supported-platforms' | 'default-vpc'[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DescribeAddressesInput {
  /** Information about the allocation IDs. */
  AllocationIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. allocation-id - The allocation ID for the address. association-id - The association ID for the address. instance-id - The ID of the ins */
  Filters?: Filter[];
  /** One or more Elastic IP addresses. Default: Describes all your Elastic IP addresses. */
  PublicIps?: string[];
}

export interface DescribeAddressesAttributeInput {
  /** [EC2-VPC] The allocation IDs. */
  AllocationIds?: string[];
  /** The attribute of the IP address. */
  Attribute?: 'domain-name';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeAddressTransfersInput {
  /** The allocation IDs of Elastic IP addresses. */
  AllocationIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of address transfers to return in one page of results. */
  MaxResults?: number;
  /** Specify the pagination token from a previous request to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeAggregateIdFormatInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DescribeAvailabilityZonesInput {
  /** Include all Availability Zones, Local Zones, and Wavelength Zones regardless of your opt-in status. If you do not use this parameter, the results include only the zones for the Regions where you have  */
  AllAvailabilityZones?: boolean;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. group-long-name - The long name of the zone group for the Availability Zone (for example, US West (Oregon) 1), the Local Zone (for example, for Zone group us-west-2-lax-1, it is US West ( */
  Filters?: Filter[];
  /** The IDs of the Availability Zones, Local Zones, and Wavelength Zones. */
  ZoneIds?: string[];
  /** The names of the Availability Zones, Local Zones, and Wavelength Zones. */
  ZoneNames?: string[];
}

export interface DescribeAwsNetworkPerformanceMetricSubscriptionsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeBundleTasksInput {
  /** The bundle task IDs. Default: Describes all your bundle tasks. */
  BundleIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. bundle-id - The ID of the bundle task. error-code - If the task failed, the error code returned. error-message - If the task failed, the error message returned. instance-id - The ID of th */
  Filters?: Filter[];
}

export interface DescribeByoipCidrsInput {
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults: number;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeCapacityBlockExtensionHistoryInput {
  /** The IDs of Capacity Block reservations that you want to display the history for. */
  CapacityReservationIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters availability-zone - The Availability Zone of the extension. availability-zone-id - The Availability Zone ID of the extension. capacity-block-extension-offering-id - The ID of the e */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeCapacityBlockExtensionOfferingsInput {
  /** The duration of the Capacity Block extension offering in hours. */
  CapacityBlockExtensionDurationHours: number;
  /** The ID of the Capacity reservation to be extended. */
  CapacityReservationId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeCapacityBlockOfferingsInput {
  /** The reservation duration for the Capacity Block, in hours. You must specify the duration in 1-day increments up 14 days, and in 7-day increments up to 182 days. */
  CapacityDurationHours: number;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The latest end date for the Capacity Block offering. */
  EndDateRange?: string;
  /** The number of instances for which to reserve capacity. Each Capacity Block can have up to 64 instances, and you can have up to 256 instances across Capacity Blocks. */
  InstanceCount?: number;
  /** The type of instance for which the Capacity Block offering reserves capacity. */
  InstanceType?: string;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
  /** The earliest start date for the Capacity Block offering. */
  StartDateRange?: string;
  /** The number of EC2 UltraServers in the offerings. */
  UltraserverCount?: number;
  /** The EC2 UltraServer type of the Capacity Block offerings. */
  UltraserverType?: string;
}

export interface DescribeCapacityBlocksInput {
  /** The IDs of the Capacity Blocks. */
  CapacityBlockIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. capacity-block-id - The ID of the Capacity Block. ultraserver-type - The Capacity Block type. The type can be instances or ultraservers. availability-zone - The Availability Zone  */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeCapacityBlockStatusInput {
  /** The ID of the Capacity Block. */
  CapacityBlockIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. interconnect-status - The status of the interconnect for the Capacity Block (ok | impaired | insufficient-data). */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeCapacityManagerDataExportsInput {
  /** The IDs of the data export configurations to describe. If not specified, all export configurations are returned. */
  CapacityManagerDataExportIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters to narrow the results. Supported filters include export status, creation date, and S3 bucket name. */
  Filters?: Filter[];
  /** The maximum number of results to return in a single call. If not specified, up to 1000 results are returned. */
  MaxResults?: number;
  /** The token for the next page of results. Use this value in a subsequent call to retrieve additional results. */
  NextToken?: string;
}

export interface DescribeCapacityReservationBillingRequestsInput {
  /** Specify one of the following: odcr-owner - If you are the Capacity Reservation owner, specify this value to view requests that you have initiated. Not supported with the requested-by filter. unused-re */
  Role: 'odcr-owner' | 'unused-reservation-billing-owner';
  /** The ID of the Capacity Reservation. */
  CapacityReservationIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. status - The state of the request (pending | accepted | rejected | cancelled | revoked | expired). requested-by - The account ID of the Capacity Reservation owner that initiated t */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeCapacityReservationFleetsInput {
  /** The IDs of the Capacity Reservation Fleets to describe. */
  CapacityReservationFleetIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. state - The state of the Fleet (submitted | modifying | active | partially_fulfilled | expiring | expired | cancelling | cancelled | failed). instance-match-criteria - The instanc */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeCapacityReservationsInput {
  /** The ID of the Capacity Reservation. */
  CapacityReservationIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. instance-type - The type of instance for which the Capacity Reservation reserves capacity. owner-id - The ID of the Amazon Web Services account that owns the Capacity Reservation. */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeCapacityReservationTopologyInput {
  /** The Capacity Reservation IDs. Default: Describes all your Capacity Reservations. Constraints: Maximum 100 explicitly specified Capacity Reservation IDs. */
  CapacityReservationIds?: string[];
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The filters. availability-zone - The name of the Availability Zone (for example, us-west-2a) or Local Zone (for example, us-west-2-lax-1b) that the Capacity Reservation is in. instance-type - The inst */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. You can't speci */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeCarrierGatewaysInput {
  /** One or more carrier gateway IDs. */
  CarrierGatewayIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. carrier-gateway-id - The ID of the carrier gateway. state - The state of the carrier gateway (pending | failed | available | deleting | deleted). owner-id - The Amazon Web Service */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeClassicLinkInstancesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. group-id - The ID of a VPC security group that's associated with the instance. instance-id - The ID of the instance. tag - The key/value combination of a tag assigned to the resource. Use */
  Filters?: Filter[];
  /** The instance IDs. Must be instances linked to a VPC through ClassicLink. */
  InstanceIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. Constraint: If  */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeClientVpnAuthorizationRulesInput {
  /** The ID of the Client VPN endpoint. */
  ClientVpnEndpointId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. description - The description of the authorization rule. destination-cidr - The CIDR of the network to which the authorization rule app */
  Filters?: Filter[];
  /** The maximum number of results to return for the request in a single page. The remaining results can be seen by sending another request with the nextToken value. */
  MaxResults?: number;
  /** The token to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeClientVpnConnectionsInput {
  /** The ID of the Client VPN endpoint. */
  ClientVpnEndpointId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. connection-id - The ID of the connection. username - For Active Directory client authentication, the user name of the client who establ */
  Filters?: Filter[];
  /** The maximum number of results to return for the request in a single page. The remaining results can be seen by sending another request with the nextToken value. */
  MaxResults?: number;
  /** The token to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeClientVpnEndpointsInput {
  /** The ID of the Client VPN endpoint. */
  ClientVpnEndpointIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. endpoint-id - The ID of the Client VPN endpoint. transport-protocol - The transport protocol (tcp | udp). */
  Filters?: Filter[];
  /** The maximum number of results to return for the request in a single page. The remaining results can be seen by sending another request with the nextToken value. */
  MaxResults?: number;
  /** The token to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeClientVpnRoutesInput {
  /** The ID of the Client VPN endpoint. */
  ClientVpnEndpointId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. destination-cidr - The CIDR of the route destination. origin - How the route was associated with the Client VPN endpoint (associate | a */
  Filters?: Filter[];
  /** The maximum number of results to return for the request in a single page. The remaining results can be seen by sending another request with the nextToken value. */
  MaxResults?: number;
  /** The token to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeClientVpnTargetNetworksInput {
  /** The ID of the Client VPN endpoint. */
  ClientVpnEndpointId: string;
  /** The IDs of the target network associations. */
  AssociationIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. association-id - The ID of the association. target-network-id - The ID of the subnet specified as the target network. vpc-id - The ID o */
  Filters?: Filter[];
  /** The maximum number of results to return for the request in a single page. The remaining results can be seen by sending another request with the nextToken value. */
  MaxResults?: number;
  /** The token to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeCoipPoolsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. coip-pool.local-gateway-route-table-id - The ID of the local gateway route table. coip-pool.pool-id - The ID of the address pool. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the address pools. */
  PoolIds?: string[];
}

export interface DescribeConversionTasksInput {
  /** The conversion task IDs. */
  ConversionTaskIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for DescribeCustomerGateways. */
export interface DescribeCustomerGatewaysInput {
  /** One or more customer gateway IDs. Default: Describes all your customer gateways. */
  CustomerGatewayIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. bgp-asn - The customer gateway's Border Gateway Protocol (BGP) Autonomous System Number (ASN). customer-gateway-id - The ID of the customer gateway. ip-address - The IP address of */
  Filters?: Filter[];
}

export interface DescribeDeclarativePoliciesReportsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** One or more report IDs. */
  ReportIds?: string[];
}

export interface DescribeDhcpOptionsInput {
  /** The IDs of DHCP option sets. */
  DhcpOptionsIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. dhcp-options-id - The ID of a DHCP options set. key - The key for one of the options (for example, domain-name). value - The value for one of the options. owner-id - The ID of the Amazon  */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeEgressOnlyInternetGatewaysInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IDs of the egress-only internet gateways. */
  EgressOnlyInternetGatewayIds?: string[];
  /** The filters. tag - The key/value combination of a tag assigned to the resource. Use the tag key in the filter name and the tag value as the filter value. For example, to find all resources that have a */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeElasticGpusInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The Elastic Graphics accelerator IDs. */
  ElasticGpuIds?: string[];
  /** The filters. availability-zone - The Availability Zone in which the Elastic Graphics accelerator resides. elastic-gpu-health - The status of the Elastic Graphics accelerator (OK | IMPAIRED). elastic-g */
  Filters?: Filter[];
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another call with the returned NextToken value. This value can be between 5 and 1000. */
  MaxResults?: number;
  /** The token to request the next page of results. */
  NextToken?: string;
}

export interface DescribeExportImageTasksInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IDs of the export image tasks. */
  ExportImageTaskIds?: string[];
  /** Filter tasks using the task-state filter and one of the following values: active, completed, deleting, or deleted. */
  Filters?: Filter[];
  /** The maximum number of results to return in a single call. */
  MaxResults?: number;
  /** A token that indicates the next page of results. */
  NextToken?: string;
}

export interface DescribeExportTasksInput {
  /** The export task IDs. */
  ExportTaskIds?: string[];
  /** the filters for the export tasks. */
  Filters?: Filter[];
}

export interface DescribeFastLaunchImagesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Use the following filters to streamline results. resource-type - The resource type for pre-provisioning. owner-id - The owner ID for the pre-provisioning resource. state - The current state of fast la */
  Filters?: Filter[];
  /** Specify one or more Windows AMI image IDs for the request. */
  ImageIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeFastSnapshotRestoresInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. The possible values are: availability-zone: The Availability Zone of the snapshot. For example, us-east-2a. availability-zone-id: The ID of the Availability Zone of the snapshot. For exam */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeFleetHistoryInput {
  /** The ID of the EC2 Fleet. */
  FleetId: string;
  /** The start date and time for the events, in UTC format (for example, YYYY-MM-DDTHH:MM:SSZ). */
  StartTime: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The type of events to describe. By default, all events are described. */
  EventType?: 'instance-change' | 'fleet-change' | 'service-error';
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeFleetInstancesInput {
  /** The ID of the EC2 Fleet. */
  FleetId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. instance-type - The instance type. */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeFleetsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. activity-status - The progress of the EC2 Fleet ( error | pending-fulfillment | pending-termination | fulfilled). excess-capacity-termination-policy - Indicates whether to terminate runni */
  Filters?: Filter[];
  /** The IDs of the EC2 Fleets. If a fleet is of type instant, you must specify the fleet ID, otherwise it does not appear in the response. */
  FleetIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeFlowLogsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. deliver-log-status - The status of the logs delivery (SUCCESS | FAILED). log-destination-type - The type of destination for the flow log data (cloud-watch-logs | s3 | kinesis-data */
  Filter?: Filter[];
  /** One or more flow log IDs. Constraint: Maximum of 1000 flow log IDs. */
  FlowLogIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to request the next page of items. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeFpgaImageAttributeInput {
  /** The AFI attribute. */
  Attribute: 'description' | 'name' | 'loadPermission' | 'productCodes';
  /** The ID of the AFI. */
  FpgaImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DescribeFpgaImagesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. create-time - The creation time of the AFI. fpga-image-id - The FPGA image identifier (AFI ID). fpga-image-global-id - The global FPGA image identifier (AGFI ID). name - The name of the A */
  Filters?: Filter[];
  /** The AFI IDs. */
  FpgaImageIds?: string[];
  /** The maximum number of results to return in a single call. */
  MaxResults?: number;
  /** The token to retrieve the next page of results. */
  NextToken?: string;
  /** Filters the AFI by owner. Specify an Amazon Web Services account ID, self (owner is the sender of the request), or an Amazon Web Services owner alias (valid values are amazon | aws-marketplace). */
  Owners?: string[];
}

export interface DescribeHostReservationOfferingsInput {
  /** The filters. instance-family - The instance family of the offering (for example, m4). payment-option - The payment option (NoUpfront | PartialUpfront | AllUpfront). */
  Filter?: Filter[];
  /** This is the maximum duration of the reservation to purchase, specified in seconds. Reservations are available in one-year and three-year terms. The number of seconds specified must be the number of se */
  MaxDuration?: number;
  /** The maximum number of results to return for the request in a single page. The remaining results can be seen by sending another request with the returned nextToken value. This value can be between 5 an */
  MaxResults?: number;
  /** This is the minimum duration of the reservation you'd like to purchase, specified in seconds. Reservations are available in one-year and three-year terms. The number of seconds specified must be the n */
  MinDuration?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
  /** The ID of the reservation offering. */
  OfferingId?: string;
}

export interface DescribeHostReservationsInput {
  /** The filters. instance-family - The instance family (for example, m4). payment-option - The payment option (NoUpfront | PartialUpfront | AllUpfront). state - The state of the reservation (payment-pendi */
  Filter?: Filter[];
  /** The host reservation IDs. */
  HostReservationIdSet?: string[];
  /** The maximum number of results to return for the request in a single page. The remaining results can be seen by sending another request with the returned nextToken value. This value can be between 5 an */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeHostsInput {
  /** The filters. auto-placement - Whether auto-placement is enabled or disabled (on | off). availability-zone - The Availability Zone of the host. client-token - The idempotency token that you provided wh */
  Filter?: Filter[];
  /** The IDs of the Dedicated Hosts. The IDs are used for targeted instance launches. */
  HostIds?: string[];
  /** The maximum number of results to return for the request in a single page. The remaining results can be seen by sending another request with the returned nextToken value. This value can be between 5 an */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeIamInstanceProfileAssociationsInput {
  /** The IAM instance profile associations. */
  AssociationIds?: string[];
  /** The filters. instance-id - The ID of the instance. state - The state of the association (associating | associated | disassociating). */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeIdentityIdFormatInput {
  /** The ARN of the principal, which can be an IAM role, IAM user, or the root user. */
  PrincipalArn: string;
  /** The type of resource: bundle | conversion-task | customer-gateway | dhcp-options | elastic-ip-allocation | elastic-ip-association | export-task | flow-log | image | import-task | instance | internet-g */
  Resource?: string;
}

export interface DescribeIdFormatInput {
  /** The type of resource: bundle | conversion-task | customer-gateway | dhcp-options | elastic-ip-allocation | elastic-ip-association | export-task | flow-log | image | import-task | instance | internet-g */
  Resource?: string;
}

/** Contains the parameters for DescribeImageAttribute. */
export interface DescribeImageAttributeInput {
  /** The AMI attribute. Note: The blockDeviceMapping attribute is deprecated. Using this attribute returns the Client.AuthFailure error. To get information about the block device mappings for an AMI, descr */
  Attribute: 'description' | 'kernel' | 'ramdisk' | 'launchPermission' | 'productCodes' | 'blockDeviceMapping' | 'sriovNetSupport' | 'bootMode' | 'tpmSupport' | 'uefiData' | 'lastLaunchedTime' | 'imdsSupport' | 'deregistrationProtection';
  /** The ID of the AMI. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DescribeImageReferencesInput {
  /** The IDs of the images to check for resource references. */
  ImageIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specifies whether to check all supported Amazon Web Services resource types for image references. When specified, default values are applied for ResourceTypeOptions. For the default values, see How AM */
  IncludeAllResourceTypes?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The Amazon Web Services resource types to check for image references. Either IncludeAllResourceTypes or ResourceTypes must be specified. */
  ResourceTypes?: ResourceTypeRequest[];
}

export interface DescribeImagesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Scopes the images by users with explicit launch permissions. Specify an Amazon Web Services account ID, self (the sender of the request), or all (public AMIs). If you specify an Amazon Web Services ac */
  ExecutableUsers?: string[];
  /** The filters. architecture - The image architecture (i386 | x86_64 | arm64 | x86_64_mac | arm64_mac). block-device-mapping.delete-on-termination - A Boolean value that indicates whether the Amazon EBS  */
  Filters?: Filter[];
  /** The image IDs. Default: Describes all images available to you. */
  ImageIds?: string[];
  /** Specifies whether to include deprecated AMIs. Default: No deprecated AMIs are included in the response. If you are the AMI owner, all deprecated AMIs appear in the response regardless of what you spec */
  IncludeDeprecated?: boolean;
  /** Specifies whether to include disabled AMIs. Default: No disabled AMIs are included in the response. */
  IncludeDisabled?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** Scopes the results to images with the specified owners. You can specify a combination of Amazon Web Services account IDs, self, amazon, aws-backup-vault, and aws-marketplace. If you omit this paramete */
  Owners?: string[];
}

export interface DescribeImageUsageReportEntriesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. account-id - A 12-digit Amazon Web Services account ID. creation-time - The time when the report was created, in the ISO 8601 format in the UTC time zone (YYYY-MM-DDThh:mm:ss.sssZ), for e */
  Filters?: Filter[];
  /** The IDs of the images for filtering the report entries. If specified, only report entries containing these images are returned. */
  ImageIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the usage reports. */
  ReportIds?: string[];
}

export interface DescribeImageUsageReportsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. creation-time - The time when the report was created, in the ISO 8601 format in the UTC time zone (YYYY-MM-DDThh:mm:ss.sssZ), for example, 2025-11-29T11:04:43.305Z. You can use a wildcard */
  Filters?: Filter[];
  /** The IDs of the images for filtering the reports. If specified, only reports containing these images are returned. */
  ImageIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the image usage reports. */
  ReportIds?: string[];
}

export interface DescribeImportImageTasksInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Filter tasks using the task-state filter and one of the following values: active, completed, deleting, or deleted. */
  Filters?: Filter[];
  /** The IDs of the import image tasks. */
  ImportTaskIds?: string[];
  /** The maximum number of results to return in a single call. */
  MaxResults?: number;
  /** A token that indicates the next page of results. */
  NextToken?: string;
}

export interface DescribeImportSnapshotTasksInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. */
  Filters?: Filter[];
  /** A list of import snapshot task IDs. */
  ImportTaskIds?: string[];
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another call with the returned NextToken value. */
  MaxResults?: number;
  /** A token that indicates the next page of results. */
  NextToken?: string;
}

export interface DescribeInstanceAttributeInput {
  /** The instance attribute. Note that the enaSupport attribute is not supported. */
  Attribute: 'instanceType' | 'kernel' | 'ramdisk' | 'userData' | 'disableApiTermination' | 'instanceInitiatedShutdownBehavior' | 'rootDeviceName' | 'blockDeviceMapping' | 'productCodes' | 'sourceDestCheck' | 'groupSet' | 'ebsOptimized' | 'sriovNetSupport' | 'enaSupport' | 'enclaveOptions' | 'disableApiStop';
  /** The ID of the instance. */
  InstanceId: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DescribeInstanceConnectEndpointsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. instance-connect-endpoint-id - The ID of the EC2 Instance Connect Endpoint. state - The state of the EC2 Instance Connect Endpoint (create-in-progress | create-complete | create-f */
  Filters?: Filter[];
  /** One or more EC2 Instance Connect Endpoint IDs. */
  InstanceConnectEndpointIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeInstanceCreditSpecificationsInput {
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The filters. instance-id - The ID of the instance. */
  Filters?: Filter[];
  /** The instance IDs. Default: Describes all your instances. Constraints: Maximum 1000 explicitly specified instance IDs. */
  InstanceIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. You cannot spec */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeInstanceEventNotificationAttributesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Describe instance event windows by InstanceEventWindow. */
export interface DescribeInstanceEventWindowsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. dedicated-host-id - The event windows associated with the specified Dedicated Host ID. event-window-name - The event windows associated with the specified names. instance-id - The */
  Filters?: Filter[];
  /** The IDs of the event windows. */
  InstanceEventWindowIds?: string[];
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another call with the returned NextToken value. This value can be between 20 and 500. You cannot speci */
  MaxResults?: number;
  /** The token to request the next page of results. */
  NextToken?: string;
}

export interface DescribeInstanceImageMetadataInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. availability-zone - The name of the Availability Zone (for example, us-west-2a) or Local Zone (for example, us-west-2-lax-1b) of the instance. instance-id - The ID of the instance. image- */
  Filters?: Filter[];
  /** The instance IDs. If you don't specify an instance ID or filters, the output includes information for all instances. */
  InstanceIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. Default: 1000 */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeInstancesInput {
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The filters. affinity - The affinity setting for an instance running on a Dedicated Host (default | host). architecture - The instance architecture (i386 | x86_64 | arm64). availability-zone - The Ava */
  Filters?: Filter[];
  /** The instance IDs. Default: Describes all your instances. */
  InstanceIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. You cannot spec */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeInstanceSqlHaHistoryStatesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The end data and time of the period for which to get historical SQL Server High Availability states. If omitted, the API returns historical states up to the current date and time. Timezone: UTC Format */
  EndTime?: string;
  /** One or more filters to apply to the results. Supported filters include: tag: - The tag key and value pair assigned to the instance. For example, to find all instances tagged with Owner:TeamA, specify  */
  Filters?: Filter[];
  /** The IDs of the SQL Server High Availability instances to describe. If omitted, the API returns historical states for all SQL Server High Availability instances. */
  InstanceIds?: string[];
  /** The maximum number of results to return for the request in a single page. The remaining results can be seen by sending another request with the returned nextToken value. */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
  /** The start data and time of the period for which to get the historical SQL Server High Availability states. If omitted, the API returns all available historical states. Timezone: UTC Format: YYYY-MM-DD */
  StartTime?: string;
}

export interface DescribeInstanceSqlHaStatesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters to apply to the results. Supported filters include: tag: - The tag key and value pair assigned to the instance. For example, to find all instances tagged with Owner:TeamA, specify  */
  Filters?: Filter[];
  /** The IDs of the SQL Server High Availability instances to describe. If omitted, the API returns SQL Server High Availability states for all SQL Server High Availability instances. */
  InstanceIds?: string[];
  /** The maximum number of results to return for the request in a single page. The remaining results can be seen by sending another request with the returned nextToken value. */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeInstanceStatusInput {
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The filters. availability-zone - The Availability Zone of the instance. availability-zone-id - The ID of the Availability Zone of the instance. event.code - The code for the scheduled event (instance- */
  Filters?: Filter[];
  /** When true, includes the health status for all instances. When false, includes the health status for running instances only. Default: false */
  IncludeAllInstances?: boolean;
  /** The instance IDs. Default: Describes all your instances. Constraints: Maximum 100 explicitly specified instance IDs. */
  InstanceIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. You cannot spec */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeInstanceTopologyInput {
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The filters. availability-zone - The name of the Availability Zone (for example, us-west-2a) or Local Zone (for example, us-west-2-lax-1b) that the instance is in. instance-type - The instance type (f */
  Filters?: Filter[];
  /** The name of the placement group that each instance is in. Constraints: Maximum 100 explicitly specified placement group names. */
  GroupNames?: string[];
  /** The instance IDs. Default: Describes all your instances. Constraints: Maximum 100 explicitly specified instance IDs. */
  InstanceIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. You can't speci */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeInstanceTypeOfferingsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. instance-type - The instance type. For a list of possible values, see Instance. location - The location. For a list of possible identif */
  Filters?: Filter[];
  /** The location type. availability-zone - The Availability Zone. When you specify a location filter, it must be an Availability Zone for the current Region. availability-zone-id - The AZ ID. When you spe */
  LocationType?: 'region' | 'availability-zone' | 'availability-zone-id' | 'outpost';
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeInstanceTypesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. auto-recovery-supported - Indicates whether Amazon CloudWatch action based recovery is supported (true | false). bare-metal - Indicates */
  Filters?: Filter[];
  /** The instance types. */
  InstanceTypes?: 'a1.medium' | 'a1.large' | 'a1.xlarge' | 'a1.2xlarge' | 'a1.4xlarge' | 'a1.metal' | 'c1.medium' | 'c1.xlarge' | 'c3.large' | 'c3.xlarge' | 'c3.2xlarge' | 'c3.4xlarge' | 'c3.8xlarge' | 'c4.large' | 'c4.xlarge' | 'c4.2xlarge' | 'c4.4xlarge' | 'c4.8xlarge' | 'c5.large' | 'c5.xlarge' | 'c5.2xlarge' | 'c5.4xlarge' | 'c5.9xlarge' | 'c5.12xlarge' | 'c5.18xlarge' | 'c5.24xlarge' | 'c5.metal' | 'c5a.large' | 'c5a.xlarge' | 'c5a.2xlarge' | 'c5a.4xlarge' | 'c5a.8xlarge' | 'c5a.12xlarge' | 'c5a.16xlarge' | 'c5a.24xlarge' | 'c5ad.large' | 'c5ad.xlarge' | 'c5ad.2xlarge' | 'c5ad.4xlarge' | 'c5ad.8xlarge' | 'c5ad.12xlarge' | 'c5ad.16xlarge' | 'c5ad.24xlarge' | 'c5d.large' | 'c5d.xlarge' | 'c5d.2xlarge' | 'c5d.4xlarge' | 'c5d.9xlarge' | 'c5d.12xlarge' | 'c5d.18xlarge' | 'c5d.24xlarge' | 'c5d.metal' | 'c5n.large' | 'c5n.xlarge' | 'c5n.2xlarge' | 'c5n.4xlarge' | 'c5n.9xlarge' | 'c5n.18xlarge' | 'c5n.metal' | 'c6g.medium' | 'c6g.large' | 'c6g.xlarge' | 'c6g.2xlarge' | 'c6g.4xlarge' | 'c6g.8xlarge' | 'c6g.12xlarge' | 'c6g.16xlarge' | 'c6g.metal' | 'c6gd.medium' | 'c6gd.large' | 'c6gd.xlarge' | 'c6gd.2xlarge' | 'c6gd.4xlarge' | 'c6gd.8xlarge' | 'c6gd.12xlarge' | 'c6gd.16xlarge' | 'c6gd.metal' | 'c6gn.medium' | 'c6gn.large' | 'c6gn.xlarge' | 'c6gn.2xlarge' | 'c6gn.4xlarge' | 'c6gn.8xlarge' | 'c6gn.12xlarge' | 'c6gn.16xlarge' | 'c6i.large' | 'c6i.xlarge' | 'c6i.2xlarge' | 'c6i.4xlarge' | 'c6i.8xlarge' | 'c6i.12xlarge' | 'c6i.16xlarge' | 'c6i.24xlarge' | 'c6i.32xlarge' | 'c6i.metal' | 'cc1.4xlarge' | 'cc2.8xlarge' | 'cg1.4xlarge' | 'cr1.8xlarge' | 'd2.xlarge' | 'd2.2xlarge' | 'd2.4xlarge' | 'd2.8xlarge' | 'd3.xlarge' | 'd3.2xlarge' | 'd3.4xlarge' | 'd3.8xlarge' | 'd3en.xlarge' | 'd3en.2xlarge' | 'd3en.4xlarge' | 'd3en.6xlarge' | 'd3en.8xlarge' | 'd3en.12xlarge' | 'dl1.24xlarge' | 'f1.2xlarge' | 'f1.4xlarge' | 'f1.16xlarge' | 'g2.2xlarge' | 'g2.8xlarge' | 'g3.4xlarge' | 'g3.8xlarge' | 'g3.16xlarge' | 'g3s.xlarge' | 'g4ad.xlarge' | 'g4ad.2xlarge' | 'g4ad.4xlarge' | 'g4ad.8xlarge' | 'g4ad.16xlarge' | 'g4dn.xlarge' | 'g4dn.2xlarge' | 'g4dn.4xlarge' | 'g4dn.8xlarge' | 'g4dn.12xlarge' | 'g4dn.16xlarge' | 'g4dn.metal' | 'g5.xlarge' | 'g5.2xlarge' | 'g5.4xlarge' | 'g5.8xlarge' | 'g5.12xlarge' | 'g5.16xlarge' | 'g5.24xlarge' | 'g5.48xlarge' | 'g5g.xlarge' | 'g5g.2xlarge' | 'g5g.4xlarge' | 'g5g.8xlarge' | 'g5g.16xlarge' | 'g5g.metal' | 'hi1.4xlarge' | 'hpc6a.48xlarge' | 'hs1.8xlarge' | 'h1.2xlarge' | 'h1.4xlarge' | 'h1.8xlarge' | 'h1.16xlarge' | 'i2.xlarge' | 'i2.2xlarge' | 'i2.4xlarge' | 'i2.8xlarge' | 'i3.large' | 'i3.xlarge' | 'i3.2xlarge' | 'i3.4xlarge' | 'i3.8xlarge' | 'i3.16xlarge' | 'i3.metal' | 'i3en.large' | 'i3en.xlarge' | 'i3en.2xlarge' | 'i3en.3xlarge' | 'i3en.6xlarge' | 'i3en.12xlarge' | 'i3en.24xlarge' | 'i3en.metal' | 'im4gn.large' | 'im4gn.xlarge' | 'im4gn.2xlarge' | 'im4gn.4xlarge' | 'im4gn.8xlarge' | 'im4gn.16xlarge' | 'inf1.xlarge' | 'inf1.2xlarge' | 'inf1.6xlarge' | 'inf1.24xlarge' | 'is4gen.medium' | 'is4gen.large' | 'is4gen.xlarge' | 'is4gen.2xlarge' | 'is4gen.4xlarge' | 'is4gen.8xlarge' | 'm1.small' | 'm1.medium' | 'm1.large' | 'm1.xlarge' | 'm2.xlarge' | 'm2.2xlarge' | 'm2.4xlarge' | 'm3.medium' | 'm3.large' | 'm3.xlarge' | 'm3.2xlarge' | 'm4.large' | 'm4.xlarge' | 'm4.2xlarge' | 'm4.4xlarge' | 'm4.10xlarge' | 'm4.16xlarge' | 'm5.large' | 'm5.xlarge' | 'm5.2xlarge' | 'm5.4xlarge' | 'm5.8xlarge' | 'm5.12xlarge' | 'm5.16xlarge' | 'm5.24xlarge' | 'm5.metal' | 'm5a.large' | 'm5a.xlarge' | 'm5a.2xlarge' | 'm5a.4xlarge' | 'm5a.8xlarge' | 'm5a.12xlarge' | 'm5a.16xlarge' | 'm5a.24xlarge' | 'm5ad.large' | 'm5ad.xlarge' | 'm5ad.2xlarge' | 'm5ad.4xlarge' | 'm5ad.8xlarge' | 'm5ad.12xlarge' | 'm5ad.16xlarge' | 'm5ad.24xlarge' | 'm5d.large' | 'm5d.xlarge' | 'm5d.2xlarge' | 'm5d.4xlarge' | 'm5d.8xlarge' | 'm5d.12xlarge' | 'm5d.16xlarge' | 'm5d.24xlarge' | 'm5d.metal' | 'm5dn.large' | 'm5dn.xlarge' | 'm5dn.2xlarge' | 'm5dn.4xlarge' | 'm5dn.8xlarge' | 'm5dn.12xlarge' | 'm5dn.16xlarge' | 'm5dn.24xlarge' | 'm5dn.metal' | 'm5n.large' | 'm5n.xlarge' | 'm5n.2xlarge' | 'm5n.4xlarge' | 'm5n.8xlarge' | 'm5n.12xlarge' | 'm5n.16xlarge' | 'm5n.24xlarge' | 'm5n.metal' | 'm5zn.large' | 'm5zn.xlarge' | 'm5zn.2xlarge' | 'm5zn.3xlarge' | 'm5zn.6xlarge' | 'm5zn.12xlarge' | 'm5zn.metal' | 'm6a.large' | 'm6a.xlarge' | 'm6a.2xlarge' | 'm6a.4xlarge' | 'm6a.8xlarge' | 'm6a.12xlarge' | 'm6a.16xlarge' | 'm6a.24xlarge' | 'm6a.32xlarge' | 'm6a.48xlarge' | 'm6g.metal' | 'm6g.medium' | 'm6g.large' | 'm6g.xlarge' | 'm6g.2xlarge' | 'm6g.4xlarge' | 'm6g.8xlarge' | 'm6g.12xlarge' | 'm6g.16xlarge' | 'm6gd.metal' | 'm6gd.medium' | 'm6gd.large' | 'm6gd.xlarge' | 'm6gd.2xlarge' | 'm6gd.4xlarge' | 'm6gd.8xlarge' | 'm6gd.12xlarge' | 'm6gd.16xlarge' | 'm6i.large' | 'm6i.xlarge' | 'm6i.2xlarge' | 'm6i.4xlarge' | 'm6i.8xlarge' | 'm6i.12xlarge' | 'm6i.16xlarge' | 'm6i.24xlarge' | 'm6i.32xlarge' | 'm6i.metal' | 'mac1.metal' | 'p2.xlarge' | 'p2.8xlarge' | 'p2.16xlarge' | 'p3.2xlarge' | 'p3.8xlarge' | 'p3.16xlarge' | 'p3dn.24xlarge' | 'p4d.24xlarge' | 'r3.large' | 'r3.xlarge' | 'r3.2xlarge' | 'r3.4xlarge' | 'r3.8xlarge' | 'r4.large' | 'r4.xlarge' | 'r4.2xlarge' | 'r4.4xlarge' | 'r4.8xlarge' | 'r4.16xlarge' | 'r5.large' | 'r5.xlarge' | 'r5.2xlarge' | 'r5.4xlarge' | 'r5.8xlarge' | 'r5.12xlarge' | 'r5.16xlarge' | 'r5.24xlarge' | 'r5.metal' | 'r5a.large' | 'r5a.xlarge' | 'r5a.2xlarge' | 'r5a.4xlarge' | 'r5a.8xlarge' | 'r5a.12xlarge' | 'r5a.16xlarge' | 'r5a.24xlarge' | 'r5ad.large' | 'r5ad.xlarge' | 'r5ad.2xlarge' | 'r5ad.4xlarge' | 'r5ad.8xlarge' | 'r5ad.12xlarge' | 'r5ad.16xlarge' | 'r5ad.24xlarge' | 'r5b.large' | 'r5b.xlarge' | 'r5b.2xlarge' | 'r5b.4xlarge' | 'r5b.8xlarge' | 'r5b.12xlarge' | 'r5b.16xlarge' | 'r5b.24xlarge' | 'r5b.metal' | 'r5d.large' | 'r5d.xlarge' | 'r5d.2xlarge' | 'r5d.4xlarge' | 'r5d.8xlarge' | 'r5d.12xlarge' | 'r5d.16xlarge' | 'r5d.24xlarge' | 'r5d.metal' | 'r5dn.large' | 'r5dn.xlarge' | 'r5dn.2xlarge' | 'r5dn.4xlarge' | 'r5dn.8xlarge' | 'r5dn.12xlarge' | 'r5dn.16xlarge' | 'r5dn.24xlarge' | 'r5dn.metal' | 'r5n.large' | 'r5n.xlarge' | 'r5n.2xlarge' | 'r5n.4xlarge' | 'r5n.8xlarge' | 'r5n.12xlarge' | 'r5n.16xlarge' | 'r5n.24xlarge' | 'r5n.metal' | 'r6g.medium' | 'r6g.large' | 'r6g.xlarge' | 'r6g.2xlarge' | 'r6g.4xlarge' | 'r6g.8xlarge' | 'r6g.12xlarge' | 'r6g.16xlarge' | 'r6g.metal' | 'r6gd.medium' | 'r6gd.large' | 'r6gd.xlarge' | 'r6gd.2xlarge' | 'r6gd.4xlarge' | 'r6gd.8xlarge' | 'r6gd.12xlarge' | 'r6gd.16xlarge' | 'r6gd.metal' | 'r6i.large' | 'r6i.xlarge' | 'r6i.2xlarge' | 'r6i.4xlarge' | 'r6i.8xlarge' | 'r6i.12xlarge' | 'r6i.16xlarge' | 'r6i.24xlarge' | 'r6i.32xlarge' | 'r6i.metal' | 't1.micro' | 't2.nano' | 't2.micro' | 't2.small' | 't2.medium' | 't2.large' | 't2.xlarge' | 't2.2xlarge' | 't3.nano' | 't3.micro' | 't3.small' | 't3.medium' | 't3.large' | 't3.xlarge' | 't3.2xlarge' | 't3a.nano' | 't3a.micro' | 't3a.small' | 't3a.medium' | 't3a.large' | 't3a.xlarge' | 't3a.2xlarge' | 't4g.nano' | 't4g.micro' | 't4g.small' | 't4g.medium' | 't4g.large' | 't4g.xlarge' | 't4g.2xlarge' | 'u-6tb1.56xlarge' | 'u-6tb1.112xlarge' | 'u-9tb1.112xlarge' | 'u-12tb1.112xlarge' | 'u-6tb1.metal' | 'u-9tb1.metal' | 'u-12tb1.metal' | 'u-18tb1.metal' | 'u-24tb1.metal' | 'vt1.3xlarge' | 'vt1.6xlarge' | 'vt1.24xlarge' | 'x1.16xlarge' | 'x1.32xlarge' | 'x1e.xlarge' | 'x1e.2xlarge' | 'x1e.4xlarge' | 'x1e.8xlarge' | 'x1e.16xlarge' | 'x1e.32xlarge' | 'x2iezn.2xlarge' | 'x2iezn.4xlarge' | 'x2iezn.6xlarge' | 'x2iezn.8xlarge' | 'x2iezn.12xlarge' | 'x2iezn.metal' | 'x2gd.medium' | 'x2gd.large' | 'x2gd.xlarge' | 'x2gd.2xlarge' | 'x2gd.4xlarge' | 'x2gd.8xlarge' | 'x2gd.12xlarge' | 'x2gd.16xlarge' | 'x2gd.metal' | 'z1d.large' | 'z1d.xlarge' | 'z1d.2xlarge' | 'z1d.3xlarge' | 'z1d.6xlarge' | 'z1d.12xlarge' | 'z1d.metal' | 'x2idn.16xlarge' | 'x2idn.24xlarge' | 'x2idn.32xlarge' | 'x2iedn.xlarge' | 'x2iedn.2xlarge' | 'x2iedn.4xlarge' | 'x2iedn.8xlarge' | 'x2iedn.16xlarge' | 'x2iedn.24xlarge' | 'x2iedn.32xlarge' | 'c6a.large' | 'c6a.xlarge' | 'c6a.2xlarge' | 'c6a.4xlarge' | 'c6a.8xlarge' | 'c6a.12xlarge' | 'c6a.16xlarge' | 'c6a.24xlarge' | 'c6a.32xlarge' | 'c6a.48xlarge' | 'c6a.metal' | 'm6a.metal' | 'i4i.large' | 'i4i.xlarge' | 'i4i.2xlarge' | 'i4i.4xlarge' | 'i4i.8xlarge' | 'i4i.16xlarge' | 'i4i.32xlarge' | 'i4i.metal' | 'x2idn.metal' | 'x2iedn.metal' | 'c7g.medium' | 'c7g.large' | 'c7g.xlarge' | 'c7g.2xlarge' | 'c7g.4xlarge' | 'c7g.8xlarge' | 'c7g.12xlarge' | 'c7g.16xlarge' | 'mac2.metal' | 'c6id.large' | 'c6id.xlarge' | 'c6id.2xlarge' | 'c6id.4xlarge' | 'c6id.8xlarge' | 'c6id.12xlarge' | 'c6id.16xlarge' | 'c6id.24xlarge' | 'c6id.32xlarge' | 'c6id.metal' | 'm6id.large' | 'm6id.xlarge' | 'm6id.2xlarge' | 'm6id.4xlarge' | 'm6id.8xlarge' | 'm6id.12xlarge' | 'm6id.16xlarge' | 'm6id.24xlarge' | 'm6id.32xlarge' | 'm6id.metal' | 'r6id.large' | 'r6id.xlarge' | 'r6id.2xlarge' | 'r6id.4xlarge' | 'r6id.8xlarge' | 'r6id.12xlarge' | 'r6id.16xlarge' | 'r6id.24xlarge' | 'r6id.32xlarge' | 'r6id.metal' | 'r6a.large' | 'r6a.xlarge' | 'r6a.2xlarge' | 'r6a.4xlarge' | 'r6a.8xlarge' | 'r6a.12xlarge' | 'r6a.16xlarge' | 'r6a.24xlarge' | 'r6a.32xlarge' | 'r6a.48xlarge' | 'r6a.metal' | 'p4de.24xlarge' | 'u-3tb1.56xlarge' | 'u-18tb1.112xlarge' | 'u-24tb1.112xlarge' | 'trn1.2xlarge' | 'trn1.32xlarge' | 'hpc6id.32xlarge' | 'c6in.large' | 'c6in.xlarge' | 'c6in.2xlarge' | 'c6in.4xlarge' | 'c6in.8xlarge' | 'c6in.12xlarge' | 'c6in.16xlarge' | 'c6in.24xlarge' | 'c6in.32xlarge' | 'm6in.large' | 'm6in.xlarge' | 'm6in.2xlarge' | 'm6in.4xlarge' | 'm6in.8xlarge' | 'm6in.12xlarge' | 'm6in.16xlarge' | 'm6in.24xlarge' | 'm6in.32xlarge' | 'm6idn.large' | 'm6idn.xlarge' | 'm6idn.2xlarge' | 'm6idn.4xlarge' | 'm6idn.8xlarge' | 'm6idn.12xlarge' | 'm6idn.16xlarge' | 'm6idn.24xlarge' | 'm6idn.32xlarge' | 'r6in.large' | 'r6in.xlarge' | 'r6in.2xlarge' | 'r6in.4xlarge' | 'r6in.8xlarge' | 'r6in.12xlarge' | 'r6in.16xlarge' | 'r6in.24xlarge' | 'r6in.32xlarge' | 'r6idn.large' | 'r6idn.xlarge' | 'r6idn.2xlarge' | 'r6idn.4xlarge' | 'r6idn.8xlarge' | 'r6idn.12xlarge' | 'r6idn.16xlarge' | 'r6idn.24xlarge' | 'r6idn.32xlarge' | 'c7g.metal' | 'm7g.medium' | 'm7g.large' | 'm7g.xlarge' | 'm7g.2xlarge' | 'm7g.4xlarge' | 'm7g.8xlarge' | 'm7g.12xlarge' | 'm7g.16xlarge' | 'm7g.metal' | 'r7g.medium' | 'r7g.large' | 'r7g.xlarge' | 'r7g.2xlarge' | 'r7g.4xlarge' | 'r7g.8xlarge' | 'r7g.12xlarge' | 'r7g.16xlarge' | 'r7g.metal' | 'c6in.metal' | 'm6in.metal' | 'm6idn.metal' | 'r6in.metal' | 'r6idn.metal' | 'inf2.xlarge' | 'inf2.8xlarge' | 'inf2.24xlarge' | 'inf2.48xlarge' | 'trn1n.32xlarge' | 'i4g.large' | 'i4g.xlarge' | 'i4g.2xlarge' | 'i4g.4xlarge' | 'i4g.8xlarge' | 'i4g.16xlarge' | 'hpc7g.4xlarge' | 'hpc7g.8xlarge' | 'hpc7g.16xlarge' | 'c7gn.medium' | 'c7gn.large' | 'c7gn.xlarge' | 'c7gn.2xlarge' | 'c7gn.4xlarge' | 'c7gn.8xlarge' | 'c7gn.12xlarge' | 'c7gn.16xlarge' | 'p5.48xlarge' | 'm7i.large' | 'm7i.xlarge' | 'm7i.2xlarge' | 'm7i.4xlarge' | 'm7i.8xlarge' | 'm7i.12xlarge' | 'm7i.16xlarge' | 'm7i.24xlarge' | 'm7i.48xlarge' | 'm7i-flex.large' | 'm7i-flex.xlarge' | 'm7i-flex.2xlarge' | 'm7i-flex.4xlarge' | 'm7i-flex.8xlarge' | 'm7a.medium' | 'm7a.large' | 'm7a.xlarge' | 'm7a.2xlarge' | 'm7a.4xlarge' | 'm7a.8xlarge' | 'm7a.12xlarge' | 'm7a.16xlarge' | 'm7a.24xlarge' | 'm7a.32xlarge' | 'm7a.48xlarge' | 'm7a.metal-48xl' | 'hpc7a.12xlarge' | 'hpc7a.24xlarge' | 'hpc7a.48xlarge' | 'hpc7a.96xlarge' | 'c7gd.medium' | 'c7gd.large' | 'c7gd.xlarge' | 'c7gd.2xlarge' | 'c7gd.4xlarge' | 'c7gd.8xlarge' | 'c7gd.12xlarge' | 'c7gd.16xlarge' | 'm7gd.medium' | 'm7gd.large' | 'm7gd.xlarge' | 'm7gd.2xlarge' | 'm7gd.4xlarge' | 'm7gd.8xlarge' | 'm7gd.12xlarge' | 'm7gd.16xlarge' | 'r7gd.medium' | 'r7gd.large' | 'r7gd.xlarge' | 'r7gd.2xlarge' | 'r7gd.4xlarge' | 'r7gd.8xlarge' | 'r7gd.12xlarge' | 'r7gd.16xlarge' | 'r7a.medium' | 'r7a.large' | 'r7a.xlarge' | 'r7a.2xlarge' | 'r7a.4xlarge' | 'r7a.8xlarge' | 'r7a.12xlarge' | 'r7a.16xlarge' | 'r7a.24xlarge' | 'r7a.32xlarge' | 'r7a.48xlarge' | 'c7i.large' | 'c7i.xlarge' | 'c7i.2xlarge' | 'c7i.4xlarge' | 'c7i.8xlarge' | 'c7i.12xlarge' | 'c7i.16xlarge' | 'c7i.24xlarge' | 'c7i.48xlarge' | 'mac2-m2pro.metal' | 'r7iz.large' | 'r7iz.xlarge' | 'r7iz.2xlarge' | 'r7iz.4xlarge' | 'r7iz.8xlarge' | 'r7iz.12xlarge' | 'r7iz.16xlarge' | 'r7iz.32xlarge' | 'c7a.medium' | 'c7a.large' | 'c7a.xlarge' | 'c7a.2xlarge' | 'c7a.4xlarge' | 'c7a.8xlarge' | 'c7a.12xlarge' | 'c7a.16xlarge' | 'c7a.24xlarge' | 'c7a.32xlarge' | 'c7a.48xlarge' | 'c7a.metal-48xl' | 'r7a.metal-48xl' | 'r7i.large' | 'r7i.xlarge' | 'r7i.2xlarge' | 'r7i.4xlarge' | 'r7i.8xlarge' | 'r7i.12xlarge' | 'r7i.16xlarge' | 'r7i.24xlarge' | 'r7i.48xlarge' | 'dl2q.24xlarge' | 'mac2-m2.metal' | 'i4i.12xlarge' | 'i4i.24xlarge' | 'c7i.metal-24xl' | 'c7i.metal-48xl' | 'm7i.metal-24xl' | 'm7i.metal-48xl' | 'r7i.metal-24xl' | 'r7i.metal-48xl' | 'r7iz.metal-16xl' | 'r7iz.metal-32xl' | 'c7gd.metal' | 'm7gd.metal' | 'r7gd.metal' | 'g6.xlarge' | 'g6.2xlarge' | 'g6.4xlarge' | 'g6.8xlarge' | 'g6.12xlarge' | 'g6.16xlarge' | 'g6.24xlarge' | 'g6.48xlarge' | 'gr6.4xlarge' | 'gr6.8xlarge' | 'c7i-flex.large' | 'c7i-flex.xlarge' | 'c7i-flex.2xlarge' | 'c7i-flex.4xlarge' | 'c7i-flex.8xlarge' | 'u7i-12tb.224xlarge' | 'u7in-16tb.224xlarge' | 'u7in-24tb.224xlarge' | 'u7in-32tb.224xlarge' | 'u7ib-12tb.224xlarge' | 'c7gn.metal' | 'r8g.medium' | 'r8g.large' | 'r8g.xlarge' | 'r8g.2xlarge' | 'r8g.4xlarge' | 'r8g.8xlarge' | 'r8g.12xlarge' | 'r8g.16xlarge' | 'r8g.24xlarge' | 'r8g.48xlarge' | 'r8g.metal-24xl' | 'r8g.metal-48xl' | 'mac2-m1ultra.metal' | 'g6e.xlarge' | 'g6e.2xlarge' | 'g6e.4xlarge' | 'g6e.8xlarge' | 'g6e.12xlarge' | 'g6e.16xlarge' | 'g6e.24xlarge' | 'g6e.48xlarge' | 'c8g.medium' | 'c8g.large' | 'c8g.xlarge' | 'c8g.2xlarge' | 'c8g.4xlarge' | 'c8g.8xlarge' | 'c8g.12xlarge' | 'c8g.16xlarge' | 'c8g.24xlarge' | 'c8g.48xlarge' | 'c8g.metal-24xl' | 'c8g.metal-48xl' | 'm8g.medium' | 'm8g.large' | 'm8g.xlarge' | 'm8g.2xlarge' | 'm8g.4xlarge' | 'm8g.8xlarge' | 'm8g.12xlarge' | 'm8g.16xlarge' | 'm8g.24xlarge' | 'm8g.48xlarge' | 'm8g.metal-24xl' | 'm8g.metal-48xl' | 'x8g.medium' | 'x8g.large' | 'x8g.xlarge' | 'x8g.2xlarge' | 'x8g.4xlarge' | 'x8g.8xlarge' | 'x8g.12xlarge' | 'x8g.16xlarge' | 'x8g.24xlarge' | 'x8g.48xlarge' | 'x8g.metal-24xl' | 'x8g.metal-48xl' | 'i7ie.large' | 'i7ie.xlarge' | 'i7ie.2xlarge' | 'i7ie.3xlarge' | 'i7ie.6xlarge' | 'i7ie.12xlarge' | 'i7ie.18xlarge' | 'i7ie.24xlarge' | 'i7ie.48xlarge' | 'i8g.large' | 'i8g.xlarge' | 'i8g.2xlarge' | 'i8g.4xlarge' | 'i8g.8xlarge' | 'i8g.12xlarge' | 'i8g.16xlarge' | 'i8g.24xlarge' | 'i8g.metal-24xl' | 'u7i-6tb.112xlarge' | 'u7i-8tb.112xlarge' | 'u7inh-32tb.480xlarge' | 'p5e.48xlarge' | 'p5en.48xlarge' | 'f2.12xlarge' | 'f2.48xlarge' | 'trn2.48xlarge' | 'c7i-flex.12xlarge' | 'c7i-flex.16xlarge' | 'm7i-flex.12xlarge' | 'm7i-flex.16xlarge' | 'i7ie.metal-24xl' | 'i7ie.metal-48xl' | 'i8g.48xlarge' | 'c8gd.medium' | 'c8gd.large' | 'c8gd.xlarge' | 'c8gd.2xlarge' | 'c8gd.4xlarge' | 'c8gd.8xlarge' | 'c8gd.12xlarge' | 'c8gd.16xlarge' | 'c8gd.24xlarge' | 'c8gd.48xlarge' | 'c8gd.metal-24xl' | 'c8gd.metal-48xl' | 'i7i.large' | 'i7i.xlarge' | 'i7i.2xlarge' | 'i7i.4xlarge' | 'i7i.8xlarge' | 'i7i.12xlarge' | 'i7i.16xlarge' | 'i7i.24xlarge' | 'i7i.48xlarge' | 'i7i.metal-24xl' | 'i7i.metal-48xl' | 'p6-b200.48xlarge' | 'm8gd.medium' | 'm8gd.large' | 'm8gd.xlarge' | 'm8gd.2xlarge' | 'm8gd.4xlarge' | 'm8gd.8xlarge' | 'm8gd.12xlarge' | 'm8gd.16xlarge' | 'm8gd.24xlarge' | 'm8gd.48xlarge' | 'm8gd.metal-24xl' | 'm8gd.metal-48xl' | 'r8gd.medium' | 'r8gd.large' | 'r8gd.xlarge' | 'r8gd.2xlarge' | 'r8gd.4xlarge' | 'r8gd.8xlarge' | 'r8gd.12xlarge' | 'r8gd.16xlarge' | 'r8gd.24xlarge' | 'r8gd.48xlarge' | 'r8gd.metal-24xl' | 'r8gd.metal-48xl' | 'c8gn.medium' | 'c8gn.large' | 'c8gn.xlarge' | 'c8gn.2xlarge' | 'c8gn.4xlarge' | 'c8gn.8xlarge' | 'c8gn.12xlarge' | 'c8gn.16xlarge' | 'c8gn.24xlarge' | 'c8gn.48xlarge' | 'c8gn.metal-24xl' | 'c8gn.metal-48xl' | 'f2.6xlarge' | 'p6e-gb200.36xlarge' | 'g6f.large' | 'g6f.xlarge' | 'g6f.2xlarge' | 'g6f.4xlarge' | 'gr6f.4xlarge' | 'p5.4xlarge' | 'r8i.large' | 'r8i.xlarge' | 'r8i.2xlarge' | 'r8i.4xlarge' | 'r8i.8xlarge' | 'r8i.12xlarge' | 'r8i.16xlarge' | 'r8i.24xlarge' | 'r8i.32xlarge' | 'r8i.48xlarge' | 'r8i.96xlarge' | 'r8i.metal-48xl' | 'r8i.metal-96xl' | 'r8i-flex.large' | 'r8i-flex.xlarge' | 'r8i-flex.2xlarge' | 'r8i-flex.4xlarge' | 'r8i-flex.8xlarge' | 'r8i-flex.12xlarge' | 'r8i-flex.16xlarge' | 'm8i.large' | 'm8i.xlarge' | 'm8i.2xlarge' | 'm8i.4xlarge' | 'm8i.8xlarge' | 'm8i.12xlarge' | 'm8i.16xlarge' | 'm8i.24xlarge' | 'm8i.32xlarge' | 'm8i.48xlarge' | 'm8i.96xlarge' | 'm8i.metal-48xl' | 'm8i.metal-96xl' | 'm8i-flex.large' | 'm8i-flex.xlarge' | 'm8i-flex.2xlarge' | 'm8i-flex.4xlarge' | 'm8i-flex.8xlarge' | 'm8i-flex.12xlarge' | 'm8i-flex.16xlarge' | 'i8ge.large' | 'i8ge.xlarge' | 'i8ge.2xlarge' | 'i8ge.3xlarge' | 'i8ge.6xlarge' | 'i8ge.12xlarge' | 'i8ge.18xlarge' | 'i8ge.24xlarge' | 'i8ge.48xlarge' | 'i8ge.metal-24xl' | 'i8ge.metal-48xl' | 'mac-m4.metal' | 'mac-m4pro.metal' | 'r8gn.medium' | 'r8gn.large' | 'r8gn.xlarge' | 'r8gn.2xlarge' | 'r8gn.4xlarge' | 'r8gn.8xlarge' | 'r8gn.12xlarge' | 'r8gn.16xlarge' | 'r8gn.24xlarge' | 'r8gn.48xlarge' | 'r8gn.metal-24xl' | 'r8gn.metal-48xl' | 'c8i.large' | 'c8i.xlarge' | 'c8i.2xlarge' | 'c8i.4xlarge' | 'c8i.8xlarge' | 'c8i.12xlarge' | 'c8i.16xlarge' | 'c8i.24xlarge' | 'c8i.32xlarge' | 'c8i.48xlarge' | 'c8i.96xlarge' | 'c8i.metal-48xl' | 'c8i.metal-96xl' | 'c8i-flex.large' | 'c8i-flex.xlarge' | 'c8i-flex.2xlarge' | 'c8i-flex.4xlarge' | 'c8i-flex.8xlarge' | 'c8i-flex.12xlarge' | 'c8i-flex.16xlarge' | 'r8gb.medium' | 'r8gb.large' | 'r8gb.xlarge' | 'r8gb.2xlarge' | 'r8gb.4xlarge' | 'r8gb.8xlarge' | 'r8gb.12xlarge' | 'r8gb.16xlarge' | 'r8gb.24xlarge' | 'r8gb.metal-24xl' | 'm8a.medium' | 'm8a.large' | 'm8a.xlarge' | 'm8a.2xlarge' | 'm8a.4xlarge' | 'm8a.8xlarge' | 'm8a.12xlarge' | 'm8a.16xlarge' | 'm8a.24xlarge' | 'm8a.48xlarge' | 'm8a.metal-24xl' | 'm8a.metal-48xl' | 'trn2.3xlarge' | 'r8a.medium' | 'r8a.large' | 'r8a.xlarge' | 'r8a.2xlarge' | 'r8a.4xlarge' | 'r8a.8xlarge' | 'r8a.12xlarge' | 'r8a.16xlarge' | 'r8a.24xlarge' | 'r8a.48xlarge' | 'r8a.metal-24xl' | 'r8a.metal-48xl' | 'p6-b300.48xlarge' | 'c8a.medium' | 'c8a.large' | 'c8a.xlarge' | 'c8a.2xlarge' | 'c8a.4xlarge' | 'c8a.8xlarge' | 'c8a.12xlarge' | 'c8a.16xlarge' | 'c8a.24xlarge' | 'c8a.48xlarge' | 'c8a.metal-24xl' | 'c8a.metal-48xl' | 'c8gb.12xlarge' | 'c8gb.16xlarge' | 'c8gb.24xlarge' | 'c8gb.2xlarge' | 'c8gb.4xlarge' | 'c8gb.8xlarge' | 'c8gb.large' | 'c8gb.medium' | 'c8gb.metal-24xl' | 'c8gb.xlarge' | 'c8gb.48xlarge' | 'c8gb.metal-48xl' | 'm8gb.12xlarge' | 'm8gb.16xlarge' | 'm8gb.24xlarge' | 'm8gb.2xlarge' | 'm8gb.4xlarge' | 'm8gb.8xlarge' | 'm8gb.large' | 'm8gb.medium' | 'm8gb.xlarge' | 'm8gb.48xlarge' | 'm8gb.metal-24xl' | 'm8gb.metal-48xl' | 'm8gn.12xlarge' | 'm8gn.16xlarge' | 'm8gn.24xlarge' | 'm8gn.2xlarge' | 'm8gn.48xlarge' | 'm8gn.4xlarge' | 'm8gn.8xlarge' | 'm8gn.large' | 'm8gn.medium' | 'm8gn.xlarge' | 'm8gn.metal-24xl' | 'm8gn.metal-48xl' | 'x8aedz.12xlarge' | 'x8aedz.24xlarge' | 'x8aedz.3xlarge' | 'x8aedz.6xlarge' | 'x8aedz.large' | 'x8aedz.metal-12xl' | 'x8aedz.metal-24xl' | 'x8aedz.xlarge' | 'm8azn.medium' | 'm8azn.large' | 'm8azn.xlarge' | 'm8azn.3xlarge' | 'm8azn.6xlarge' | 'm8azn.12xlarge' | 'm8azn.24xlarge' | 'm8azn.metal-12xl' | 'm8azn.metal-24xl' | 'x8i.large' | 'x8i.xlarge' | 'x8i.2xlarge' | 'x8i.4xlarge' | 'x8i.8xlarge' | 'x8i.12xlarge' | 'x8i.16xlarge' | 'x8i.24xlarge' | 'x8i.32xlarge' | 'x8i.48xlarge' | 'x8i.64xlarge' | 'x8i.96xlarge' | 'x8i.metal-48xl' | 'x8i.metal-96xl' | 'mac-m4max.metal' | 'g7e.2xlarge' | 'g7e.4xlarge' | 'g7e.8xlarge' | 'g7e.12xlarge' | 'g7e.24xlarge' | 'g7e.48xlarge' | 'r8id.large' | 'r8id.xlarge' | 'r8id.2xlarge' | 'r8id.4xlarge' | 'r8id.8xlarge' | 'r8id.12xlarge' | 'r8id.16xlarge' | 'r8id.24xlarge' | 'r8id.32xlarge' | 'r8id.48xlarge' | 'r8id.96xlarge' | 'r8id.metal-48xl' | 'r8id.metal-96xl'[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeInternetGatewaysInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. attachment.state - The current state of the attachment between the gateway and the VPC (available). Present only if a VPC is attached. attachment.vpc-id - The ID of an attached VPC. inter */
  Filters?: Filter[];
  /** The IDs of the internet gateways. Default: Describes all your internet gateways. */
  InternetGatewayIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeIpamByoasnInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeIpamExternalResourceVerificationTokensInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters for the request. For more information about filtering, see Filtering CLI output. Available filters: ipam-arn ipam-external-resource-verification-token-arn ipam-external-resource-ve */
  Filters?: Filter[];
  /** Verification token IDs. */
  IpamExternalResourceVerificationTokenIds?: string[];
  /** The maximum number of tokens to return in one page of results. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeIpamPoliciesInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters for the IPAM policy description. */
  Filters?: Filter[];
  /** The IDs of the IPAM policies to describe. */
  IpamPolicyIds?: string[];
  /** The maximum number of results to return in a single call. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeIpamPoolsInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters for the request. For more information about filtering, see Filtering CLI output. */
  Filters?: Filter[];
  /** The IDs of the IPAM pools you would like information on. */
  IpamPoolIds?: string[];
  /** The maximum number of results to return in the request. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeIpamPrefixListResolversInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters to limit the results. */
  Filters?: Filter[];
  /** The IDs of the IPAM prefix list resolvers to describe. If not specified, all resolvers in your account are described. */
  IpamPrefixListResolverIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeIpamPrefixListResolverTargetsInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters to limit the results. */
  Filters?: Filter[];
  /** The ID of the IPAM prefix list resolver to filter targets by. Only targets associated with this resolver will be returned. */
  IpamPrefixListResolverId?: string;
  /** The IDs of the IPAM prefix list resolver Targets to describe. If not specified, all targets in your account are described. */
  IpamPrefixListResolverTargetIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeIpamResourceDiscoveriesInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The resource discovery filters. */
  Filters?: Filter[];
  /** The IPAM resource discovery IDs. */
  IpamResourceDiscoveryIds?: string[];
  /** The maximum number of resource discoveries to return in one page of results. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeIpamResourceDiscoveryAssociationsInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The resource discovery association filters. */
  Filters?: Filter[];
  /** The resource discovery association IDs. */
  IpamResourceDiscoveryAssociationIds?: string[];
  /** The maximum number of resource discovery associations to return in one page of results. */
  MaxResults?: number;
  /** Specify the pagination token from a previous request to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeIpamsInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters for the request. For more information about filtering, see Filtering CLI output. */
  Filters?: Filter[];
  /** The IDs of the IPAMs you want information on. */
  IpamIds?: string[];
  /** The maximum number of results to return in the request. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeIpamScopesInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters for the request. For more information about filtering, see Filtering CLI output. */
  Filters?: Filter[];
  /** The IDs of the scopes you want information on. */
  IpamScopeIds?: string[];
  /** The maximum number of results to return in the request. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeIpv6PoolsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. tag: - The key/value combination of a tag assigned to the resource. Use the tag key in the filter name and the tag value as the filter value. For example, to find all resources th */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the IPv6 address pools. */
  PoolIds?: string[];
}

export interface DescribeKeyPairsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. key-pair-id - The ID of the key pair. fingerprint - The fingerprint of the key pair. key-name - The name of the key pair. tag-key - The key of a tag assigned to the resource. Use this fil */
  Filters?: Filter[];
  /** If true, the public key material is included in the response. Default: false */
  IncludePublicKey?: boolean;
  /** The key pair names. Default: Describes all of your key pairs. */
  KeyNames?: string[];
  /** The IDs of the key pairs. */
  KeyPairIds?: string[];
}

export interface DescribeLaunchTemplatesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. create-time - The time the launch template was created. launch-template-name - The name of the launch template. tag: - The key/value combination of a tag assigned to the resource. */
  Filters?: Filter[];
  /** One or more launch template IDs. */
  LaunchTemplateIds?: string[];
  /** One or more launch template names. */
  LaunchTemplateNames?: string[];
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another call with the returned NextToken value. This value can be between 1 and 200. */
  MaxResults?: number;
  /** The token to request the next page of results. */
  NextToken?: string;
}

export interface DescribeLaunchTemplateVersionsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. create-time - The time the launch template version was created. ebs-optimized - A boolean that indicates whether the instance is optimized for Amazon EBS I/O. http-endpoint - Indi */
  Filters?: Filter[];
  /** The ID of the launch template. To describe one or more versions of a specified launch template, you must specify either the launch template ID or the launch template name, but not both. To describe al */
  LaunchTemplateId?: string;
  /** The name of the launch template. To describe one or more versions of a specified launch template, you must specify either the launch template name or the launch template ID, but not both. To describe  */
  LaunchTemplateName?: string;
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another call with the returned NextToken value. This value can be between 1 and 200. */
  MaxResults?: number;
  /** The version number up to which to describe launch template versions. */
  MaxVersion?: string;
  /** The version number after which to describe launch template versions. */
  MinVersion?: string;
  /** The token to request the next page of results. */
  NextToken?: string;
  /** If true, and if a Systems Manager parameter is specified for ImageId, the AMI ID is displayed in the response for imageId. If false, and if a Systems Manager parameter is specified for ImageId, the pa */
  ResolveAlias?: boolean;
  /** One or more versions of the launch template. Valid values depend on whether you are describing a specified launch template (by ID or name) or all launch templates in your account. To describe one or m */
  Versions?: string[];
}

export interface DescribeLocalGatewayRouteTablesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. local-gateway-id - The ID of a local gateway. local-gateway-route-table-arn - The Amazon Resource Name (ARN) of the local gateway route table. local-gateway-route-table-id - The I */
  Filters?: Filter[];
  /** The IDs of the local gateway route tables. */
  LocalGatewayRouteTableIds?: string[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeLocalGatewayRouteTableVirtualInterfaceGroupAssociationsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. local-gateway-id - The ID of a local gateway. local-gateway-route-table-arn - The Amazon Resource Name (ARN) of the local gateway route table for the virtual interface group. loca */
  Filters?: Filter[];
  /** The IDs of the associations. */
  LocalGatewayRouteTableVirtualInterfaceGroupAssociationIds?: string[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeLocalGatewayRouteTableVpcAssociationsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. local-gateway-id - The ID of a local gateway. local-gateway-route-table-arn - The Amazon Resource Name (ARN) of the local gateway route table for the association. local-gateway-ro */
  Filters?: Filter[];
  /** The IDs of the associations. */
  LocalGatewayRouteTableVpcAssociationIds?: string[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeLocalGatewaysInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. local-gateway-id - The ID of a local gateway. outpost-arn - The Amazon Resource Name (ARN) of the Outpost. owner-id - The ID of the Amazon Web Services account that owns the local */
  Filters?: Filter[];
  /** The IDs of the local gateways. */
  LocalGatewayIds?: string[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeLocalGatewayVirtualInterfaceGroupsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. local-gateway-id - The ID of a local gateway. local-gateway-virtual-interface-group-id - The ID of the virtual interface group. local-gateway-virtual-interface-id - The ID of the  */
  Filters?: Filter[];
  /** The IDs of the virtual interface groups. */
  LocalGatewayVirtualInterfaceGroupIds?: string[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeLocalGatewayVirtualInterfacesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. local-address - The local address. local-bgp-asn - The Border Gateway Protocol (BGP) Autonomous System Number (ASN) of the local gateway. local-gateway-id - The ID of the local ga */
  Filters?: Filter[];
  /** The IDs of the virtual interfaces. */
  LocalGatewayVirtualInterfaceIds?: string[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeLockedSnapshotsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. lock-state - The state of the snapshot lock (compliance-cooloff | governance | compliance | expired). */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the snapshots for which to view the lock status. */
  SnapshotIds?: string[];
}

export interface DescribeMacHostsInput {
  /** The filters. availability-zone - The Availability Zone of the EC2 Mac Dedicated Host. instance-type - The instance type size that the EC2 Mac Dedicated Host is configured to support. */
  Filters?: Filter[];
  /** The IDs of the EC2 Mac Dedicated Hosts. */
  HostIds?: string[];
  /** The maximum number of results to return for the request in a single page. The remaining results can be seen by sending another request with the returned nextToken value. This value can be between 5 an */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeMacModificationTasksInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specifies one or more filters for the request: instance-id - The ID of the instance for which the task was created. task-state - The state of the task (successful | failed | in-progress | pending). ma */
  Filters?: Filter[];
  /** The ID of task. */
  MacModificationTaskIds?: string[];
  /** The maximum number of results to return for the request in a single page. The remaining results can be seen by sending another request with the returned nextToken value. This value can be between 5 an */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeManagedPrefixListsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. owner-id - The ID of the prefix list owner. prefix-list-id - The ID of the prefix list. prefix-list-name - The name of the prefix list. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** One or more prefix list IDs. */
  PrefixListIds?: string[];
}

export interface DescribeMovingAddressesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. moving-status - The status of the Elastic IP address (MovingToVpc | RestoringToClassic). */
  Filters?: Filter[];
  /** The maximum number of results to return for the request in a single page. The remaining results of the initial request can be seen by sending another request with the returned NextToken value. This va */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** One or more Elastic IP addresses. */
  PublicIps?: string[];
}

export interface DescribeNatGatewaysInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. nat-gateway-id - The ID of the NAT gateway. state - The state of the NAT gateway (pending | failed | available | deleting | deleted). subnet-id - The ID of the subnet in which the NAT gat */
  Filter?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The IDs of the NAT gateways. */
  NatGatewayIds?: string[];
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeNetworkAclsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. association.association-id - The ID of an association ID for the ACL. association.network-acl-id - The ID of the network ACL involved in the association. association.subnet-id - The ID of */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The IDs of the network ACLs. */
  NetworkAclIds?: string[];
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeNetworkInsightsAccessScopeAnalysesInput {
  /** Filters the results based on the start time. The analysis must have started on or after this time. */
  AnalysisStartTimeBegin?: string;
  /** Filters the results based on the start time. The analysis must have started on or before this time. */
  AnalysisStartTimeEnd?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** There are no supported filters. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The IDs of the Network Access Scope analyses. */
  NetworkInsightsAccessScopeAnalysisIds?: string[];
  /** The ID of the Network Access Scope. */
  NetworkInsightsAccessScopeId?: string;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeNetworkInsightsAccessScopesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** There are no supported filters. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The IDs of the Network Access Scopes. */
  NetworkInsightsAccessScopeIds?: string[];
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeNetworkInsightsAnalysesInput {
  /** The time when the network insights analyses ended. */
  AnalysisEndTime?: string;
  /** The time when the network insights analyses started. */
  AnalysisStartTime?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. The following are the possible values: path-found - A Boolean value that indicates whether a feasible path is found. status - The status of the analysis (running | succeeded | failed). */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The ID of the network insights analyses. You must specify either analysis IDs or a path ID. */
  NetworkInsightsAnalysisIds?: string[];
  /** The ID of the path. You must specify either a path ID or analysis IDs. */
  NetworkInsightsPathId?: string;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeNetworkInsightsPathsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. The following are the possible values: destination - The ID of the resource. filter-at-source.source-address - The source IPv4 address at the source. filter-at-source.source-port-range -  */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The IDs of the paths. */
  NetworkInsightsPathIds?: string[];
  /** The token for the next page of results. */
  NextToken?: string;
}

/** Contains the parameters for DescribeNetworkInterfaceAttribute. */
export interface DescribeNetworkInterfaceAttributeInput {
  /** The ID of the network interface. */
  NetworkInterfaceId: string;
  /** The attribute of the network interface. This parameter is required. */
  Attribute?: 'description' | 'groupSet' | 'sourceDestCheck' | 'attachment' | 'associatePublicIpAddress';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for DescribeNetworkInterfacePermissions. */
export interface DescribeNetworkInterfacePermissionsInput {
  /** One or more filters. network-interface-permission.network-interface-permission-id - The ID of the permission. network-interface-permission.network-interface-id - The ID of the network interface. netwo */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. If this parameter is not specified, up to 50 results  */
  MaxResults?: number;
  /** The network interface permission IDs. */
  NetworkInterfacePermissionIds?: string[];
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

/** Contains the parameters for DescribeNetworkInterfaces. */
export interface DescribeNetworkInterfacesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. association.allocation-id - The allocation ID returned when you allocated the Elastic IP address (IPv4) for your network interface. association.association-id - The association ID */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. You cannot specify this parameter and the network int */
  MaxResults?: number;
  /** The network interface IDs. Default: Describes all your network interfaces. */
  NetworkInterfaceIds?: string[];
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeOutpostLagsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters to use for narrowing down the request. The following filters are supported: service-link-virtual-interface-id - The ID of the service link virtual interface. service-link-virtual-interface */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the Outpost LAGs. */
  OutpostLagIds?: string[];
}

export interface DescribePlacementGroupsInput {
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The filters. group-name - The name of the placement group. group-arn - The Amazon Resource Name (ARN) of the placement group. spread-level - The spread level for the placement group (host | rack). sta */
  Filters?: Filter[];
  /** The IDs of the placement groups. */
  GroupIds?: string[];
  /** The names of the placement groups. Constraints: You can specify a name only if the placement group is owned by your account. If a placement group is shared with your account, specifying the name resul */
  GroupNames?: string[];
}

export interface DescribePrefixListsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. prefix-list-id: The ID of a prefix list. prefix-list-name: The name of a prefix list. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** One or more prefix list IDs. */
  PrefixListIds?: string[];
}

export interface DescribePrincipalIdFormatInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another call with the returned NextToken value. */
  MaxResults?: number;
  /** The token to request the next page of results. */
  NextToken?: string;
  /** The type of resource: bundle | conversion-task | customer-gateway | dhcp-options | elastic-ip-allocation | elastic-ip-association | export-task | flow-log | image | import-task | instance | internet-g */
  Resources?: string[];
}

export interface DescribePublicIpv4PoolsInput {
  /** One or more filters. tag: - The key/value combination of a tag assigned to the resource. Use the tag key in the filter name and the tag value as the filter value. For example, to find all resources th */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the address pools. */
  PoolIds?: string[];
}

export interface DescribeRegionsInput {
  /** Indicates whether to display all Regions, including Regions that are disabled for your account. */
  AllRegions?: boolean;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. endpoint - The endpoint of the Region (for example, ec2.us-east-1.amazonaws.com). opt-in-status - The opt-in status of the Region (opt-in-not-required | opted-in | not-opted-in). region-n */
  Filters?: Filter[];
  /** The names of the Regions. You can specify any Regions, whether they are enabled and disabled for your account. */
  RegionNames?: string[];
}

export interface DescribeReplaceRootVolumeTasksInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Filter to use: instance-id - The ID of the instance for which the root volume replacement task was created. */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The ID of the root volume replacement task to view. */
  ReplaceRootVolumeTaskIds?: string[];
}

/** Contains the parameters for DescribeReservedInstances. */
export interface DescribeReservedInstancesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. availability-zone - The Availability Zone where the Reserved Instance can be used. availability-zone-id - The ID of the Availability Zone where the Reserved Instance can be used.  */
  Filters?: Filter[];
  /** Describes whether the Reserved Instance is Standard or Convertible. */
  OfferingClass?: 'standard' | 'convertible';
  /** The Reserved Instance offering type. If you are using tools that predate the 2011-11-01 API version, you only have access to the Medium Utilization Reserved Instance offering type. */
  OfferingType?: 'Heavy Utilization' | 'Medium Utilization' | 'Light Utilization' | 'No Upfront' | 'Partial Upfront' | 'All Upfront';
  /** One or more Reserved Instance IDs. Default: Describes all your Reserved Instances, or only those otherwise specified. */
  ReservedInstancesIds?: string[];
}

/** Contains the parameters for DescribeReservedInstancesListings. */
export interface DescribeReservedInstancesListingsInput {
  /** One or more filters. reserved-instances-id - The ID of the Reserved Instances. reserved-instances-listing-id - The ID of the Reserved Instances listing. status - The status of the Reserved Instance li */
  Filters?: Filter[];
  /** One or more Reserved Instance IDs. */
  ReservedInstancesId?: string;
  /** One or more Reserved Instance listing IDs. */
  ReservedInstancesListingId?: string;
}

/** Contains the parameters for DescribeReservedInstancesModifications. */
export interface DescribeReservedInstancesModificationsInput {
  /** One or more filters. client-token - The idempotency token for the modification request. create-date - The time when the modification request was created. effective-date - The time when the modificatio */
  Filters?: Filter[];
  /** The token to retrieve the next page of results. */
  NextToken?: string;
  /** IDs for the submitted modification request. */
  ReservedInstancesModificationIds?: string[];
}

/** Contains the parameters for DescribeReservedInstancesOfferings. */
export interface DescribeReservedInstancesOfferingsInput {
  /** The Availability Zone in which the Reserved Instance can be used. Either AvailabilityZone or AvailabilityZoneId can be specified, but not both. */
  AvailabilityZone?: string;
  /** The ID of the Availability Zone. Either AvailabilityZone or AvailabilityZoneId can be specified, but not both. */
  AvailabilityZoneId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. availability-zone - The Availability Zone where the Reserved Instance can be used. availability-zone-id - The ID of the Availability Zone where the Reserved Instance can be used.  */
  Filters?: Filter[];
  /** Include Reserved Instance Marketplace offerings in the response. */
  IncludeMarketplace?: boolean;
  /** The tenancy of the instances covered by the reservation. A Reserved Instance with a tenancy of dedicated is applied to instances that run in a VPC on single-tenant hardware (i.e., Dedicated Instances) */
  InstanceTenancy?: 'default' | 'dedicated' | 'host';
  /** The instance type that the reservation will cover (for example, m1.small). For more information, see Amazon EC2 instance types in the Amazon EC2 User Guide. */
  InstanceType?: 'a1.medium' | 'a1.large' | 'a1.xlarge' | 'a1.2xlarge' | 'a1.4xlarge' | 'a1.metal' | 'c1.medium' | 'c1.xlarge' | 'c3.large' | 'c3.xlarge' | 'c3.2xlarge' | 'c3.4xlarge' | 'c3.8xlarge' | 'c4.large' | 'c4.xlarge' | 'c4.2xlarge' | 'c4.4xlarge' | 'c4.8xlarge' | 'c5.large' | 'c5.xlarge' | 'c5.2xlarge' | 'c5.4xlarge' | 'c5.9xlarge' | 'c5.12xlarge' | 'c5.18xlarge' | 'c5.24xlarge' | 'c5.metal' | 'c5a.large' | 'c5a.xlarge' | 'c5a.2xlarge' | 'c5a.4xlarge' | 'c5a.8xlarge' | 'c5a.12xlarge' | 'c5a.16xlarge' | 'c5a.24xlarge' | 'c5ad.large' | 'c5ad.xlarge' | 'c5ad.2xlarge' | 'c5ad.4xlarge' | 'c5ad.8xlarge' | 'c5ad.12xlarge' | 'c5ad.16xlarge' | 'c5ad.24xlarge' | 'c5d.large' | 'c5d.xlarge' | 'c5d.2xlarge' | 'c5d.4xlarge' | 'c5d.9xlarge' | 'c5d.12xlarge' | 'c5d.18xlarge' | 'c5d.24xlarge' | 'c5d.metal' | 'c5n.large' | 'c5n.xlarge' | 'c5n.2xlarge' | 'c5n.4xlarge' | 'c5n.9xlarge' | 'c5n.18xlarge' | 'c5n.metal' | 'c6g.medium' | 'c6g.large' | 'c6g.xlarge' | 'c6g.2xlarge' | 'c6g.4xlarge' | 'c6g.8xlarge' | 'c6g.12xlarge' | 'c6g.16xlarge' | 'c6g.metal' | 'c6gd.medium' | 'c6gd.large' | 'c6gd.xlarge' | 'c6gd.2xlarge' | 'c6gd.4xlarge' | 'c6gd.8xlarge' | 'c6gd.12xlarge' | 'c6gd.16xlarge' | 'c6gd.metal' | 'c6gn.medium' | 'c6gn.large' | 'c6gn.xlarge' | 'c6gn.2xlarge' | 'c6gn.4xlarge' | 'c6gn.8xlarge' | 'c6gn.12xlarge' | 'c6gn.16xlarge' | 'c6i.large' | 'c6i.xlarge' | 'c6i.2xlarge' | 'c6i.4xlarge' | 'c6i.8xlarge' | 'c6i.12xlarge' | 'c6i.16xlarge' | 'c6i.24xlarge' | 'c6i.32xlarge' | 'c6i.metal' | 'cc1.4xlarge' | 'cc2.8xlarge' | 'cg1.4xlarge' | 'cr1.8xlarge' | 'd2.xlarge' | 'd2.2xlarge' | 'd2.4xlarge' | 'd2.8xlarge' | 'd3.xlarge' | 'd3.2xlarge' | 'd3.4xlarge' | 'd3.8xlarge' | 'd3en.xlarge' | 'd3en.2xlarge' | 'd3en.4xlarge' | 'd3en.6xlarge' | 'd3en.8xlarge' | 'd3en.12xlarge' | 'dl1.24xlarge' | 'f1.2xlarge' | 'f1.4xlarge' | 'f1.16xlarge' | 'g2.2xlarge' | 'g2.8xlarge' | 'g3.4xlarge' | 'g3.8xlarge' | 'g3.16xlarge' | 'g3s.xlarge' | 'g4ad.xlarge' | 'g4ad.2xlarge' | 'g4ad.4xlarge' | 'g4ad.8xlarge' | 'g4ad.16xlarge' | 'g4dn.xlarge' | 'g4dn.2xlarge' | 'g4dn.4xlarge' | 'g4dn.8xlarge' | 'g4dn.12xlarge' | 'g4dn.16xlarge' | 'g4dn.metal' | 'g5.xlarge' | 'g5.2xlarge' | 'g5.4xlarge' | 'g5.8xlarge' | 'g5.12xlarge' | 'g5.16xlarge' | 'g5.24xlarge' | 'g5.48xlarge' | 'g5g.xlarge' | 'g5g.2xlarge' | 'g5g.4xlarge' | 'g5g.8xlarge' | 'g5g.16xlarge' | 'g5g.metal' | 'hi1.4xlarge' | 'hpc6a.48xlarge' | 'hs1.8xlarge' | 'h1.2xlarge' | 'h1.4xlarge' | 'h1.8xlarge' | 'h1.16xlarge' | 'i2.xlarge' | 'i2.2xlarge' | 'i2.4xlarge' | 'i2.8xlarge' | 'i3.large' | 'i3.xlarge' | 'i3.2xlarge' | 'i3.4xlarge' | 'i3.8xlarge' | 'i3.16xlarge' | 'i3.metal' | 'i3en.large' | 'i3en.xlarge' | 'i3en.2xlarge' | 'i3en.3xlarge' | 'i3en.6xlarge' | 'i3en.12xlarge' | 'i3en.24xlarge' | 'i3en.metal' | 'im4gn.large' | 'im4gn.xlarge' | 'im4gn.2xlarge' | 'im4gn.4xlarge' | 'im4gn.8xlarge' | 'im4gn.16xlarge' | 'inf1.xlarge' | 'inf1.2xlarge' | 'inf1.6xlarge' | 'inf1.24xlarge' | 'is4gen.medium' | 'is4gen.large' | 'is4gen.xlarge' | 'is4gen.2xlarge' | 'is4gen.4xlarge' | 'is4gen.8xlarge' | 'm1.small' | 'm1.medium' | 'm1.large' | 'm1.xlarge' | 'm2.xlarge' | 'm2.2xlarge' | 'm2.4xlarge' | 'm3.medium' | 'm3.large' | 'm3.xlarge' | 'm3.2xlarge' | 'm4.large' | 'm4.xlarge' | 'm4.2xlarge' | 'm4.4xlarge' | 'm4.10xlarge' | 'm4.16xlarge' | 'm5.large' | 'm5.xlarge' | 'm5.2xlarge' | 'm5.4xlarge' | 'm5.8xlarge' | 'm5.12xlarge' | 'm5.16xlarge' | 'm5.24xlarge' | 'm5.metal' | 'm5a.large' | 'm5a.xlarge' | 'm5a.2xlarge' | 'm5a.4xlarge' | 'm5a.8xlarge' | 'm5a.12xlarge' | 'm5a.16xlarge' | 'm5a.24xlarge' | 'm5ad.large' | 'm5ad.xlarge' | 'm5ad.2xlarge' | 'm5ad.4xlarge' | 'm5ad.8xlarge' | 'm5ad.12xlarge' | 'm5ad.16xlarge' | 'm5ad.24xlarge' | 'm5d.large' | 'm5d.xlarge' | 'm5d.2xlarge' | 'm5d.4xlarge' | 'm5d.8xlarge' | 'm5d.12xlarge' | 'm5d.16xlarge' | 'm5d.24xlarge' | 'm5d.metal' | 'm5dn.large' | 'm5dn.xlarge' | 'm5dn.2xlarge' | 'm5dn.4xlarge' | 'm5dn.8xlarge' | 'm5dn.12xlarge' | 'm5dn.16xlarge' | 'm5dn.24xlarge' | 'm5dn.metal' | 'm5n.large' | 'm5n.xlarge' | 'm5n.2xlarge' | 'm5n.4xlarge' | 'm5n.8xlarge' | 'm5n.12xlarge' | 'm5n.16xlarge' | 'm5n.24xlarge' | 'm5n.metal' | 'm5zn.large' | 'm5zn.xlarge' | 'm5zn.2xlarge' | 'm5zn.3xlarge' | 'm5zn.6xlarge' | 'm5zn.12xlarge' | 'm5zn.metal' | 'm6a.large' | 'm6a.xlarge' | 'm6a.2xlarge' | 'm6a.4xlarge' | 'm6a.8xlarge' | 'm6a.12xlarge' | 'm6a.16xlarge' | 'm6a.24xlarge' | 'm6a.32xlarge' | 'm6a.48xlarge' | 'm6g.metal' | 'm6g.medium' | 'm6g.large' | 'm6g.xlarge' | 'm6g.2xlarge' | 'm6g.4xlarge' | 'm6g.8xlarge' | 'm6g.12xlarge' | 'm6g.16xlarge' | 'm6gd.metal' | 'm6gd.medium' | 'm6gd.large' | 'm6gd.xlarge' | 'm6gd.2xlarge' | 'm6gd.4xlarge' | 'm6gd.8xlarge' | 'm6gd.12xlarge' | 'm6gd.16xlarge' | 'm6i.large' | 'm6i.xlarge' | 'm6i.2xlarge' | 'm6i.4xlarge' | 'm6i.8xlarge' | 'm6i.12xlarge' | 'm6i.16xlarge' | 'm6i.24xlarge' | 'm6i.32xlarge' | 'm6i.metal' | 'mac1.metal' | 'p2.xlarge' | 'p2.8xlarge' | 'p2.16xlarge' | 'p3.2xlarge' | 'p3.8xlarge' | 'p3.16xlarge' | 'p3dn.24xlarge' | 'p4d.24xlarge' | 'r3.large' | 'r3.xlarge' | 'r3.2xlarge' | 'r3.4xlarge' | 'r3.8xlarge' | 'r4.large' | 'r4.xlarge' | 'r4.2xlarge' | 'r4.4xlarge' | 'r4.8xlarge' | 'r4.16xlarge' | 'r5.large' | 'r5.xlarge' | 'r5.2xlarge' | 'r5.4xlarge' | 'r5.8xlarge' | 'r5.12xlarge' | 'r5.16xlarge' | 'r5.24xlarge' | 'r5.metal' | 'r5a.large' | 'r5a.xlarge' | 'r5a.2xlarge' | 'r5a.4xlarge' | 'r5a.8xlarge' | 'r5a.12xlarge' | 'r5a.16xlarge' | 'r5a.24xlarge' | 'r5ad.large' | 'r5ad.xlarge' | 'r5ad.2xlarge' | 'r5ad.4xlarge' | 'r5ad.8xlarge' | 'r5ad.12xlarge' | 'r5ad.16xlarge' | 'r5ad.24xlarge' | 'r5b.large' | 'r5b.xlarge' | 'r5b.2xlarge' | 'r5b.4xlarge' | 'r5b.8xlarge' | 'r5b.12xlarge' | 'r5b.16xlarge' | 'r5b.24xlarge' | 'r5b.metal' | 'r5d.large' | 'r5d.xlarge' | 'r5d.2xlarge' | 'r5d.4xlarge' | 'r5d.8xlarge' | 'r5d.12xlarge' | 'r5d.16xlarge' | 'r5d.24xlarge' | 'r5d.metal' | 'r5dn.large' | 'r5dn.xlarge' | 'r5dn.2xlarge' | 'r5dn.4xlarge' | 'r5dn.8xlarge' | 'r5dn.12xlarge' | 'r5dn.16xlarge' | 'r5dn.24xlarge' | 'r5dn.metal' | 'r5n.large' | 'r5n.xlarge' | 'r5n.2xlarge' | 'r5n.4xlarge' | 'r5n.8xlarge' | 'r5n.12xlarge' | 'r5n.16xlarge' | 'r5n.24xlarge' | 'r5n.metal' | 'r6g.medium' | 'r6g.large' | 'r6g.xlarge' | 'r6g.2xlarge' | 'r6g.4xlarge' | 'r6g.8xlarge' | 'r6g.12xlarge' | 'r6g.16xlarge' | 'r6g.metal' | 'r6gd.medium' | 'r6gd.large' | 'r6gd.xlarge' | 'r6gd.2xlarge' | 'r6gd.4xlarge' | 'r6gd.8xlarge' | 'r6gd.12xlarge' | 'r6gd.16xlarge' | 'r6gd.metal' | 'r6i.large' | 'r6i.xlarge' | 'r6i.2xlarge' | 'r6i.4xlarge' | 'r6i.8xlarge' | 'r6i.12xlarge' | 'r6i.16xlarge' | 'r6i.24xlarge' | 'r6i.32xlarge' | 'r6i.metal' | 't1.micro' | 't2.nano' | 't2.micro' | 't2.small' | 't2.medium' | 't2.large' | 't2.xlarge' | 't2.2xlarge' | 't3.nano' | 't3.micro' | 't3.small' | 't3.medium' | 't3.large' | 't3.xlarge' | 't3.2xlarge' | 't3a.nano' | 't3a.micro' | 't3a.small' | 't3a.medium' | 't3a.large' | 't3a.xlarge' | 't3a.2xlarge' | 't4g.nano' | 't4g.micro' | 't4g.small' | 't4g.medium' | 't4g.large' | 't4g.xlarge' | 't4g.2xlarge' | 'u-6tb1.56xlarge' | 'u-6tb1.112xlarge' | 'u-9tb1.112xlarge' | 'u-12tb1.112xlarge' | 'u-6tb1.metal' | 'u-9tb1.metal' | 'u-12tb1.metal' | 'u-18tb1.metal' | 'u-24tb1.metal' | 'vt1.3xlarge' | 'vt1.6xlarge' | 'vt1.24xlarge' | 'x1.16xlarge' | 'x1.32xlarge' | 'x1e.xlarge' | 'x1e.2xlarge' | 'x1e.4xlarge' | 'x1e.8xlarge' | 'x1e.16xlarge' | 'x1e.32xlarge' | 'x2iezn.2xlarge' | 'x2iezn.4xlarge' | 'x2iezn.6xlarge' | 'x2iezn.8xlarge' | 'x2iezn.12xlarge' | 'x2iezn.metal' | 'x2gd.medium' | 'x2gd.large' | 'x2gd.xlarge' | 'x2gd.2xlarge' | 'x2gd.4xlarge' | 'x2gd.8xlarge' | 'x2gd.12xlarge' | 'x2gd.16xlarge' | 'x2gd.metal' | 'z1d.large' | 'z1d.xlarge' | 'z1d.2xlarge' | 'z1d.3xlarge' | 'z1d.6xlarge' | 'z1d.12xlarge' | 'z1d.metal' | 'x2idn.16xlarge' | 'x2idn.24xlarge' | 'x2idn.32xlarge' | 'x2iedn.xlarge' | 'x2iedn.2xlarge' | 'x2iedn.4xlarge' | 'x2iedn.8xlarge' | 'x2iedn.16xlarge' | 'x2iedn.24xlarge' | 'x2iedn.32xlarge' | 'c6a.large' | 'c6a.xlarge' | 'c6a.2xlarge' | 'c6a.4xlarge' | 'c6a.8xlarge' | 'c6a.12xlarge' | 'c6a.16xlarge' | 'c6a.24xlarge' | 'c6a.32xlarge' | 'c6a.48xlarge' | 'c6a.metal' | 'm6a.metal' | 'i4i.large' | 'i4i.xlarge' | 'i4i.2xlarge' | 'i4i.4xlarge' | 'i4i.8xlarge' | 'i4i.16xlarge' | 'i4i.32xlarge' | 'i4i.metal' | 'x2idn.metal' | 'x2iedn.metal' | 'c7g.medium' | 'c7g.large' | 'c7g.xlarge' | 'c7g.2xlarge' | 'c7g.4xlarge' | 'c7g.8xlarge' | 'c7g.12xlarge' | 'c7g.16xlarge' | 'mac2.metal' | 'c6id.large' | 'c6id.xlarge' | 'c6id.2xlarge' | 'c6id.4xlarge' | 'c6id.8xlarge' | 'c6id.12xlarge' | 'c6id.16xlarge' | 'c6id.24xlarge' | 'c6id.32xlarge' | 'c6id.metal' | 'm6id.large' | 'm6id.xlarge' | 'm6id.2xlarge' | 'm6id.4xlarge' | 'm6id.8xlarge' | 'm6id.12xlarge' | 'm6id.16xlarge' | 'm6id.24xlarge' | 'm6id.32xlarge' | 'm6id.metal' | 'r6id.large' | 'r6id.xlarge' | 'r6id.2xlarge' | 'r6id.4xlarge' | 'r6id.8xlarge' | 'r6id.12xlarge' | 'r6id.16xlarge' | 'r6id.24xlarge' | 'r6id.32xlarge' | 'r6id.metal' | 'r6a.large' | 'r6a.xlarge' | 'r6a.2xlarge' | 'r6a.4xlarge' | 'r6a.8xlarge' | 'r6a.12xlarge' | 'r6a.16xlarge' | 'r6a.24xlarge' | 'r6a.32xlarge' | 'r6a.48xlarge' | 'r6a.metal' | 'p4de.24xlarge' | 'u-3tb1.56xlarge' | 'u-18tb1.112xlarge' | 'u-24tb1.112xlarge' | 'trn1.2xlarge' | 'trn1.32xlarge' | 'hpc6id.32xlarge' | 'c6in.large' | 'c6in.xlarge' | 'c6in.2xlarge' | 'c6in.4xlarge' | 'c6in.8xlarge' | 'c6in.12xlarge' | 'c6in.16xlarge' | 'c6in.24xlarge' | 'c6in.32xlarge' | 'm6in.large' | 'm6in.xlarge' | 'm6in.2xlarge' | 'm6in.4xlarge' | 'm6in.8xlarge' | 'm6in.12xlarge' | 'm6in.16xlarge' | 'm6in.24xlarge' | 'm6in.32xlarge' | 'm6idn.large' | 'm6idn.xlarge' | 'm6idn.2xlarge' | 'm6idn.4xlarge' | 'm6idn.8xlarge' | 'm6idn.12xlarge' | 'm6idn.16xlarge' | 'm6idn.24xlarge' | 'm6idn.32xlarge' | 'r6in.large' | 'r6in.xlarge' | 'r6in.2xlarge' | 'r6in.4xlarge' | 'r6in.8xlarge' | 'r6in.12xlarge' | 'r6in.16xlarge' | 'r6in.24xlarge' | 'r6in.32xlarge' | 'r6idn.large' | 'r6idn.xlarge' | 'r6idn.2xlarge' | 'r6idn.4xlarge' | 'r6idn.8xlarge' | 'r6idn.12xlarge' | 'r6idn.16xlarge' | 'r6idn.24xlarge' | 'r6idn.32xlarge' | 'c7g.metal' | 'm7g.medium' | 'm7g.large' | 'm7g.xlarge' | 'm7g.2xlarge' | 'm7g.4xlarge' | 'm7g.8xlarge' | 'm7g.12xlarge' | 'm7g.16xlarge' | 'm7g.metal' | 'r7g.medium' | 'r7g.large' | 'r7g.xlarge' | 'r7g.2xlarge' | 'r7g.4xlarge' | 'r7g.8xlarge' | 'r7g.12xlarge' | 'r7g.16xlarge' | 'r7g.metal' | 'c6in.metal' | 'm6in.metal' | 'm6idn.metal' | 'r6in.metal' | 'r6idn.metal' | 'inf2.xlarge' | 'inf2.8xlarge' | 'inf2.24xlarge' | 'inf2.48xlarge' | 'trn1n.32xlarge' | 'i4g.large' | 'i4g.xlarge' | 'i4g.2xlarge' | 'i4g.4xlarge' | 'i4g.8xlarge' | 'i4g.16xlarge' | 'hpc7g.4xlarge' | 'hpc7g.8xlarge' | 'hpc7g.16xlarge' | 'c7gn.medium' | 'c7gn.large' | 'c7gn.xlarge' | 'c7gn.2xlarge' | 'c7gn.4xlarge' | 'c7gn.8xlarge' | 'c7gn.12xlarge' | 'c7gn.16xlarge' | 'p5.48xlarge' | 'm7i.large' | 'm7i.xlarge' | 'm7i.2xlarge' | 'm7i.4xlarge' | 'm7i.8xlarge' | 'm7i.12xlarge' | 'm7i.16xlarge' | 'm7i.24xlarge' | 'm7i.48xlarge' | 'm7i-flex.large' | 'm7i-flex.xlarge' | 'm7i-flex.2xlarge' | 'm7i-flex.4xlarge' | 'm7i-flex.8xlarge' | 'm7a.medium' | 'm7a.large' | 'm7a.xlarge' | 'm7a.2xlarge' | 'm7a.4xlarge' | 'm7a.8xlarge' | 'm7a.12xlarge' | 'm7a.16xlarge' | 'm7a.24xlarge' | 'm7a.32xlarge' | 'm7a.48xlarge' | 'm7a.metal-48xl' | 'hpc7a.12xlarge' | 'hpc7a.24xlarge' | 'hpc7a.48xlarge' | 'hpc7a.96xlarge' | 'c7gd.medium' | 'c7gd.large' | 'c7gd.xlarge' | 'c7gd.2xlarge' | 'c7gd.4xlarge' | 'c7gd.8xlarge' | 'c7gd.12xlarge' | 'c7gd.16xlarge' | 'm7gd.medium' | 'm7gd.large' | 'm7gd.xlarge' | 'm7gd.2xlarge' | 'm7gd.4xlarge' | 'm7gd.8xlarge' | 'm7gd.12xlarge' | 'm7gd.16xlarge' | 'r7gd.medium' | 'r7gd.large' | 'r7gd.xlarge' | 'r7gd.2xlarge' | 'r7gd.4xlarge' | 'r7gd.8xlarge' | 'r7gd.12xlarge' | 'r7gd.16xlarge' | 'r7a.medium' | 'r7a.large' | 'r7a.xlarge' | 'r7a.2xlarge' | 'r7a.4xlarge' | 'r7a.8xlarge' | 'r7a.12xlarge' | 'r7a.16xlarge' | 'r7a.24xlarge' | 'r7a.32xlarge' | 'r7a.48xlarge' | 'c7i.large' | 'c7i.xlarge' | 'c7i.2xlarge' | 'c7i.4xlarge' | 'c7i.8xlarge' | 'c7i.12xlarge' | 'c7i.16xlarge' | 'c7i.24xlarge' | 'c7i.48xlarge' | 'mac2-m2pro.metal' | 'r7iz.large' | 'r7iz.xlarge' | 'r7iz.2xlarge' | 'r7iz.4xlarge' | 'r7iz.8xlarge' | 'r7iz.12xlarge' | 'r7iz.16xlarge' | 'r7iz.32xlarge' | 'c7a.medium' | 'c7a.large' | 'c7a.xlarge' | 'c7a.2xlarge' | 'c7a.4xlarge' | 'c7a.8xlarge' | 'c7a.12xlarge' | 'c7a.16xlarge' | 'c7a.24xlarge' | 'c7a.32xlarge' | 'c7a.48xlarge' | 'c7a.metal-48xl' | 'r7a.metal-48xl' | 'r7i.large' | 'r7i.xlarge' | 'r7i.2xlarge' | 'r7i.4xlarge' | 'r7i.8xlarge' | 'r7i.12xlarge' | 'r7i.16xlarge' | 'r7i.24xlarge' | 'r7i.48xlarge' | 'dl2q.24xlarge' | 'mac2-m2.metal' | 'i4i.12xlarge' | 'i4i.24xlarge' | 'c7i.metal-24xl' | 'c7i.metal-48xl' | 'm7i.metal-24xl' | 'm7i.metal-48xl' | 'r7i.metal-24xl' | 'r7i.metal-48xl' | 'r7iz.metal-16xl' | 'r7iz.metal-32xl' | 'c7gd.metal' | 'm7gd.metal' | 'r7gd.metal' | 'g6.xlarge' | 'g6.2xlarge' | 'g6.4xlarge' | 'g6.8xlarge' | 'g6.12xlarge' | 'g6.16xlarge' | 'g6.24xlarge' | 'g6.48xlarge' | 'gr6.4xlarge' | 'gr6.8xlarge' | 'c7i-flex.large' | 'c7i-flex.xlarge' | 'c7i-flex.2xlarge' | 'c7i-flex.4xlarge' | 'c7i-flex.8xlarge' | 'u7i-12tb.224xlarge' | 'u7in-16tb.224xlarge' | 'u7in-24tb.224xlarge' | 'u7in-32tb.224xlarge' | 'u7ib-12tb.224xlarge' | 'c7gn.metal' | 'r8g.medium' | 'r8g.large' | 'r8g.xlarge' | 'r8g.2xlarge' | 'r8g.4xlarge' | 'r8g.8xlarge' | 'r8g.12xlarge' | 'r8g.16xlarge' | 'r8g.24xlarge' | 'r8g.48xlarge' | 'r8g.metal-24xl' | 'r8g.metal-48xl' | 'mac2-m1ultra.metal' | 'g6e.xlarge' | 'g6e.2xlarge' | 'g6e.4xlarge' | 'g6e.8xlarge' | 'g6e.12xlarge' | 'g6e.16xlarge' | 'g6e.24xlarge' | 'g6e.48xlarge' | 'c8g.medium' | 'c8g.large' | 'c8g.xlarge' | 'c8g.2xlarge' | 'c8g.4xlarge' | 'c8g.8xlarge' | 'c8g.12xlarge' | 'c8g.16xlarge' | 'c8g.24xlarge' | 'c8g.48xlarge' | 'c8g.metal-24xl' | 'c8g.metal-48xl' | 'm8g.medium' | 'm8g.large' | 'm8g.xlarge' | 'm8g.2xlarge' | 'm8g.4xlarge' | 'm8g.8xlarge' | 'm8g.12xlarge' | 'm8g.16xlarge' | 'm8g.24xlarge' | 'm8g.48xlarge' | 'm8g.metal-24xl' | 'm8g.metal-48xl' | 'x8g.medium' | 'x8g.large' | 'x8g.xlarge' | 'x8g.2xlarge' | 'x8g.4xlarge' | 'x8g.8xlarge' | 'x8g.12xlarge' | 'x8g.16xlarge' | 'x8g.24xlarge' | 'x8g.48xlarge' | 'x8g.metal-24xl' | 'x8g.metal-48xl' | 'i7ie.large' | 'i7ie.xlarge' | 'i7ie.2xlarge' | 'i7ie.3xlarge' | 'i7ie.6xlarge' | 'i7ie.12xlarge' | 'i7ie.18xlarge' | 'i7ie.24xlarge' | 'i7ie.48xlarge' | 'i8g.large' | 'i8g.xlarge' | 'i8g.2xlarge' | 'i8g.4xlarge' | 'i8g.8xlarge' | 'i8g.12xlarge' | 'i8g.16xlarge' | 'i8g.24xlarge' | 'i8g.metal-24xl' | 'u7i-6tb.112xlarge' | 'u7i-8tb.112xlarge' | 'u7inh-32tb.480xlarge' | 'p5e.48xlarge' | 'p5en.48xlarge' | 'f2.12xlarge' | 'f2.48xlarge' | 'trn2.48xlarge' | 'c7i-flex.12xlarge' | 'c7i-flex.16xlarge' | 'm7i-flex.12xlarge' | 'm7i-flex.16xlarge' | 'i7ie.metal-24xl' | 'i7ie.metal-48xl' | 'i8g.48xlarge' | 'c8gd.medium' | 'c8gd.large' | 'c8gd.xlarge' | 'c8gd.2xlarge' | 'c8gd.4xlarge' | 'c8gd.8xlarge' | 'c8gd.12xlarge' | 'c8gd.16xlarge' | 'c8gd.24xlarge' | 'c8gd.48xlarge' | 'c8gd.metal-24xl' | 'c8gd.metal-48xl' | 'i7i.large' | 'i7i.xlarge' | 'i7i.2xlarge' | 'i7i.4xlarge' | 'i7i.8xlarge' | 'i7i.12xlarge' | 'i7i.16xlarge' | 'i7i.24xlarge' | 'i7i.48xlarge' | 'i7i.metal-24xl' | 'i7i.metal-48xl' | 'p6-b200.48xlarge' | 'm8gd.medium' | 'm8gd.large' | 'm8gd.xlarge' | 'm8gd.2xlarge' | 'm8gd.4xlarge' | 'm8gd.8xlarge' | 'm8gd.12xlarge' | 'm8gd.16xlarge' | 'm8gd.24xlarge' | 'm8gd.48xlarge' | 'm8gd.metal-24xl' | 'm8gd.metal-48xl' | 'r8gd.medium' | 'r8gd.large' | 'r8gd.xlarge' | 'r8gd.2xlarge' | 'r8gd.4xlarge' | 'r8gd.8xlarge' | 'r8gd.12xlarge' | 'r8gd.16xlarge' | 'r8gd.24xlarge' | 'r8gd.48xlarge' | 'r8gd.metal-24xl' | 'r8gd.metal-48xl' | 'c8gn.medium' | 'c8gn.large' | 'c8gn.xlarge' | 'c8gn.2xlarge' | 'c8gn.4xlarge' | 'c8gn.8xlarge' | 'c8gn.12xlarge' | 'c8gn.16xlarge' | 'c8gn.24xlarge' | 'c8gn.48xlarge' | 'c8gn.metal-24xl' | 'c8gn.metal-48xl' | 'f2.6xlarge' | 'p6e-gb200.36xlarge' | 'g6f.large' | 'g6f.xlarge' | 'g6f.2xlarge' | 'g6f.4xlarge' | 'gr6f.4xlarge' | 'p5.4xlarge' | 'r8i.large' | 'r8i.xlarge' | 'r8i.2xlarge' | 'r8i.4xlarge' | 'r8i.8xlarge' | 'r8i.12xlarge' | 'r8i.16xlarge' | 'r8i.24xlarge' | 'r8i.32xlarge' | 'r8i.48xlarge' | 'r8i.96xlarge' | 'r8i.metal-48xl' | 'r8i.metal-96xl' | 'r8i-flex.large' | 'r8i-flex.xlarge' | 'r8i-flex.2xlarge' | 'r8i-flex.4xlarge' | 'r8i-flex.8xlarge' | 'r8i-flex.12xlarge' | 'r8i-flex.16xlarge' | 'm8i.large' | 'm8i.xlarge' | 'm8i.2xlarge' | 'm8i.4xlarge' | 'm8i.8xlarge' | 'm8i.12xlarge' | 'm8i.16xlarge' | 'm8i.24xlarge' | 'm8i.32xlarge' | 'm8i.48xlarge' | 'm8i.96xlarge' | 'm8i.metal-48xl' | 'm8i.metal-96xl' | 'm8i-flex.large' | 'm8i-flex.xlarge' | 'm8i-flex.2xlarge' | 'm8i-flex.4xlarge' | 'm8i-flex.8xlarge' | 'm8i-flex.12xlarge' | 'm8i-flex.16xlarge' | 'i8ge.large' | 'i8ge.xlarge' | 'i8ge.2xlarge' | 'i8ge.3xlarge' | 'i8ge.6xlarge' | 'i8ge.12xlarge' | 'i8ge.18xlarge' | 'i8ge.24xlarge' | 'i8ge.48xlarge' | 'i8ge.metal-24xl' | 'i8ge.metal-48xl' | 'mac-m4.metal' | 'mac-m4pro.metal' | 'r8gn.medium' | 'r8gn.large' | 'r8gn.xlarge' | 'r8gn.2xlarge' | 'r8gn.4xlarge' | 'r8gn.8xlarge' | 'r8gn.12xlarge' | 'r8gn.16xlarge' | 'r8gn.24xlarge' | 'r8gn.48xlarge' | 'r8gn.metal-24xl' | 'r8gn.metal-48xl' | 'c8i.large' | 'c8i.xlarge' | 'c8i.2xlarge' | 'c8i.4xlarge' | 'c8i.8xlarge' | 'c8i.12xlarge' | 'c8i.16xlarge' | 'c8i.24xlarge' | 'c8i.32xlarge' | 'c8i.48xlarge' | 'c8i.96xlarge' | 'c8i.metal-48xl' | 'c8i.metal-96xl' | 'c8i-flex.large' | 'c8i-flex.xlarge' | 'c8i-flex.2xlarge' | 'c8i-flex.4xlarge' | 'c8i-flex.8xlarge' | 'c8i-flex.12xlarge' | 'c8i-flex.16xlarge' | 'r8gb.medium' | 'r8gb.large' | 'r8gb.xlarge' | 'r8gb.2xlarge' | 'r8gb.4xlarge' | 'r8gb.8xlarge' | 'r8gb.12xlarge' | 'r8gb.16xlarge' | 'r8gb.24xlarge' | 'r8gb.metal-24xl' | 'm8a.medium' | 'm8a.large' | 'm8a.xlarge' | 'm8a.2xlarge' | 'm8a.4xlarge' | 'm8a.8xlarge' | 'm8a.12xlarge' | 'm8a.16xlarge' | 'm8a.24xlarge' | 'm8a.48xlarge' | 'm8a.metal-24xl' | 'm8a.metal-48xl' | 'trn2.3xlarge' | 'r8a.medium' | 'r8a.large' | 'r8a.xlarge' | 'r8a.2xlarge' | 'r8a.4xlarge' | 'r8a.8xlarge' | 'r8a.12xlarge' | 'r8a.16xlarge' | 'r8a.24xlarge' | 'r8a.48xlarge' | 'r8a.metal-24xl' | 'r8a.metal-48xl' | 'p6-b300.48xlarge' | 'c8a.medium' | 'c8a.large' | 'c8a.xlarge' | 'c8a.2xlarge' | 'c8a.4xlarge' | 'c8a.8xlarge' | 'c8a.12xlarge' | 'c8a.16xlarge' | 'c8a.24xlarge' | 'c8a.48xlarge' | 'c8a.metal-24xl' | 'c8a.metal-48xl' | 'c8gb.12xlarge' | 'c8gb.16xlarge' | 'c8gb.24xlarge' | 'c8gb.2xlarge' | 'c8gb.4xlarge' | 'c8gb.8xlarge' | 'c8gb.large' | 'c8gb.medium' | 'c8gb.metal-24xl' | 'c8gb.xlarge' | 'c8gb.48xlarge' | 'c8gb.metal-48xl' | 'm8gb.12xlarge' | 'm8gb.16xlarge' | 'm8gb.24xlarge' | 'm8gb.2xlarge' | 'm8gb.4xlarge' | 'm8gb.8xlarge' | 'm8gb.large' | 'm8gb.medium' | 'm8gb.xlarge' | 'm8gb.48xlarge' | 'm8gb.metal-24xl' | 'm8gb.metal-48xl' | 'm8gn.12xlarge' | 'm8gn.16xlarge' | 'm8gn.24xlarge' | 'm8gn.2xlarge' | 'm8gn.48xlarge' | 'm8gn.4xlarge' | 'm8gn.8xlarge' | 'm8gn.large' | 'm8gn.medium' | 'm8gn.xlarge' | 'm8gn.metal-24xl' | 'm8gn.metal-48xl' | 'x8aedz.12xlarge' | 'x8aedz.24xlarge' | 'x8aedz.3xlarge' | 'x8aedz.6xlarge' | 'x8aedz.large' | 'x8aedz.metal-12xl' | 'x8aedz.metal-24xl' | 'x8aedz.xlarge' | 'm8azn.medium' | 'm8azn.large' | 'm8azn.xlarge' | 'm8azn.3xlarge' | 'm8azn.6xlarge' | 'm8azn.12xlarge' | 'm8azn.24xlarge' | 'm8azn.metal-12xl' | 'm8azn.metal-24xl' | 'x8i.large' | 'x8i.xlarge' | 'x8i.2xlarge' | 'x8i.4xlarge' | 'x8i.8xlarge' | 'x8i.12xlarge' | 'x8i.16xlarge' | 'x8i.24xlarge' | 'x8i.32xlarge' | 'x8i.48xlarge' | 'x8i.64xlarge' | 'x8i.96xlarge' | 'x8i.metal-48xl' | 'x8i.metal-96xl' | 'mac-m4max.metal' | 'g7e.2xlarge' | 'g7e.4xlarge' | 'g7e.8xlarge' | 'g7e.12xlarge' | 'g7e.24xlarge' | 'g7e.48xlarge' | 'r8id.large' | 'r8id.xlarge' | 'r8id.2xlarge' | 'r8id.4xlarge' | 'r8id.8xlarge' | 'r8id.12xlarge' | 'r8id.16xlarge' | 'r8id.24xlarge' | 'r8id.32xlarge' | 'r8id.48xlarge' | 'r8id.96xlarge' | 'r8id.metal-48xl' | 'r8id.metal-96xl';
  /** The maximum duration (in seconds) to filter when searching for offerings. Default: 94608000 (3 years) */
  MaxDuration?: number;
  /** The maximum number of instances to filter when searching for offerings. Default: 20 */
  MaxInstanceCount?: number;
  /** The maximum number of results to return for the request in a single page. The remaining results of the initial request can be seen by sending another request with the returned NextToken value. The max */
  MaxResults?: number;
  /** The minimum duration (in seconds) to filter when searching for offerings. Default: 2592000 (1 month) */
  MinDuration?: number;
  /** The token to retrieve the next page of results. */
  NextToken?: string;
  /** The offering class of the Reserved Instance. Can be standard or convertible. */
  OfferingClass?: 'standard' | 'convertible';
  /** The Reserved Instance offering type. If you are using tools that predate the 2011-11-01 API version, you only have access to the Medium Utilization Reserved Instance offering type. */
  OfferingType?: 'Heavy Utilization' | 'Medium Utilization' | 'Light Utilization' | 'No Upfront' | 'Partial Upfront' | 'All Upfront';
  /** The Reserved Instance product platform description. Instances that include (Amazon VPC) in the description are for use with Amazon VPC. */
  ProductDescription?: 'Linux/UNIX' | 'Linux/UNIX (Amazon VPC)' | 'Windows' | 'Windows (Amazon VPC)';
  /** One or more Reserved Instances offering IDs. */
  ReservedInstancesOfferingIds?: string[];
}

export interface DescribeRouteServerEndpointsInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters to apply to the describe request. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the route server endpoints to describe. */
  RouteServerEndpointIds?: string[];
}

export interface DescribeRouteServerPeersInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters to apply to the describe request. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the route server peers to describe. */
  RouteServerPeerIds?: string[];
}

export interface DescribeRouteServersInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters to apply to the describe request. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the route servers to describe. */
  RouteServerIds?: string[];
}

export interface DescribeRouteTablesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. association.gateway-id - The ID of the gateway involved in the association. association.route-table-association-id - The ID of an association ID for the route table. association.route-tab */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the route tables. */
  RouteTableIds?: string[];
}

/** Contains the parameters for DescribeScheduledInstanceAvailability. */
export interface DescribeScheduledInstanceAvailabilityInput {
  /** The time period for the first schedule to start. */
  FirstSlotStartTimeRange: SlotDateTimeRangeRequest;
  /** The schedule recurrence. */
  Recurrence: ScheduledInstanceRecurrenceRequest;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. availability-zone - The Availability Zone (for example, us-west-2a). instance-type - The instance type (for example, c4.large). platform - The platform (Linux/UNIX or Windows). */
  Filters?: Filter[];
  /** The maximum number of results to return in a single call. This value can be between 5 and 300. The default value is 300. To retrieve the remaining results, make another call with the returned NextToke */
  MaxResults?: number;
  /** The maximum available duration, in hours. This value must be greater than MinSlotDurationInHours and less than 1,720. */
  MaxSlotDurationInHours?: number;
  /** The minimum available duration, in hours. The minimum required duration is 1,200 hours per year. For example, the minimum daily schedule is 4 hours, the minimum weekly schedule is 24 hours, and the mi */
  MinSlotDurationInHours?: number;
  /** The token for the next set of results. */
  NextToken?: string;
}

/** Contains the parameters for DescribeScheduledInstances. */
export interface DescribeScheduledInstancesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. availability-zone - The Availability Zone (for example, us-west-2a). instance-type - The instance type (for example, c4.large). platform - The platform (Linux/UNIX or Windows). */
  Filters?: Filter[];
  /** The maximum number of results to return in a single call. This value can be between 5 and 300. The default value is 100. To retrieve the remaining results, make another call with the returned NextToke */
  MaxResults?: number;
  /** The token for the next set of results. */
  NextToken?: string;
  /** The Scheduled Instance IDs. */
  ScheduledInstanceIds?: string[];
  /** The time period for the first schedule to start. */
  SlotStartTimeRange?: SlotStartTimeRangeRequest;
}

export interface DescribeSecondaryInterfacesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. attachment.attachment-id - The ID of the secondary interface attachment. attachment.instance-id - The ID of the instance to which the secondary interface is attached. attachment.instance- */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the secondary interfaces. */
  SecondaryInterfaceIds?: string[];
}

export interface DescribeSecondaryNetworksInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. The following are the possible values: ipv4-cidr-block-association.association-id - The association ID for an IPv4 CIDR block associated with the secondary network. ipv4-cidr-block-associ */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the secondary networks. */
  SecondaryNetworkIds?: string[];
}

export interface DescribeSecondarySubnetsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. ipv4-cidr-block-association.association-id - The association ID for an IPv4 CIDR block associated with the secondary subnet. ipv4-cidr-block-association.cidr-block - An IPv4 CIDR block as */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the secondary subnets. */
  SecondarySubnetIds?: string[];
}

export interface DescribeSecurityGroupReferencesInput {
  /** The IDs of the security groups in your account. */
  GroupId: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DescribeSecurityGroupRulesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. group-id - The ID of the security group. security-group-rule-id - The ID of the security group rule. tag: - The key/value combination of a tag assigned to the resource. Use the ta */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. This value can be between 5 and 1000. If this paramet */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the security group rules. */
  SecurityGroupRuleIds?: string[];
}

export interface DescribeSecurityGroupsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. If using multiple filters for rules, the results include security groups for which any combination of rules - not necessarily a single rule - match all filters. description - The descript */
  Filters?: Filter[];
  /** The IDs of the security groups. Required for security groups in a nondefault VPC. Default: Describes all of your security groups. */
  GroupIds?: string[];
  /** [Default VPC] The names of the security groups. You can specify either the security group name or the security group ID. Default: Describes all of your security groups. */
  GroupNames?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. This value can be between 5 and 1000. If this paramet */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeSecurityGroupVpcAssociationsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Security group VPC association filters. group-id: The security group ID. group-owner-id: The group owner ID. state: The state of the association. vpc-id: The ID of the associated VPC. vpc-owner-id: Th */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeServiceLinkVirtualInterfacesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters to use for narrowing down the request. The following filters are supported: outpost-lag-id - The ID of the Outpost LAG. outpost-arn - The Outpost ARN. owner-id - The ID of the Amazon Web S */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the service link virtual interfaces. */
  ServiceLinkVirtualInterfaceIds?: string[];
}

export interface DescribeSnapshotAttributeInput {
  /** The snapshot attribute you would like to view. */
  Attribute: 'productCodes' | 'createVolumePermission';
  /** The ID of the EBS snapshot. */
  SnapshotId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DescribeSnapshotsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. description - A description of the snapshot. encrypted - Indicates whether the snapshot is encrypted (true | false) owner-alias - The owner alias, from an Amazon-maintained list (amazon). */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** Scopes the results to snapshots with the specified owners. You can specify a combination of Amazon Web Services account IDs, self, and amazon. */
  OwnerIds?: string[];
  /** The IDs of the Amazon Web Services accounts that can create volumes from the snapshot. */
  RestorableByUserIds?: string[];
  /** The snapshot IDs. Default: Describes the snapshots for which you have create volume permissions. */
  SnapshotIds?: string[];
}

export interface DescribeSnapshotTierStatusInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. snapshot-id - The snapshot ID. volume-id - The ID of the volume the snapshot is for. last-tiering-operation - The state of the last archive or restore action. (archival-in-progress | arch */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

/** Contains the parameters for DescribeSpotDatafeedSubscription. */
export interface DescribeSpotDatafeedSubscriptionInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for DescribeSpotFleetInstances. */
export interface DescribeSpotFleetInstancesInput {
  /** The ID of the Spot Fleet request. */
  SpotFleetRequestId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to include in another request to get the next page of items. This value is null when there are no more items to return. */
  NextToken?: string;
}

/** Contains the parameters for DescribeSpotFleetRequestHistory. */
export interface DescribeSpotFleetRequestHistoryInput {
  /** The ID of the Spot Fleet request. */
  SpotFleetRequestId: string;
  /** The starting date and time for the events, in UTC format (for example, YYYY-MM-DDTHH:MM:SSZ). */
  StartTime: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The type of events to describe. By default, all events are described. */
  EventType?: 'instanceChange' | 'fleetRequestChange' | 'error' | 'information';
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to include in another request to get the next page of items. This value is null when there are no more items to return. */
  NextToken?: string;
}

/** Contains the parameters for DescribeSpotFleetRequests. */
export interface DescribeSpotFleetRequestsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to include in another request to get the next page of items. This value is null when there are no more items to return. */
  NextToken?: string;
  /** The IDs of the Spot Fleet requests. */
  SpotFleetRequestIds?: string[];
}

/** Contains the parameters for DescribeSpotInstanceRequests. */
export interface DescribeSpotInstanceRequestsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. availability-zone-group - The Availability Zone group. create-time - The time stamp when the Spot Instance request was created. fault-code - The fault code related to the request. fault-m */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the Spot Instance requests. */
  SpotInstanceRequestIds?: string[];
}

/** Contains the parameters for DescribeSpotPriceHistory. */
export interface DescribeSpotPriceHistoryInput {
  /** Filters the results by the specified Availability Zone. Either AvailabilityZone or AvailabilityZoneId can be specified, but not both */
  AvailabilityZone?: string;
  /** Filters the results by the specified ID of the Availability Zone. Either AvailabilityZone or AvailabilityZoneId can be specified, but not both */
  AvailabilityZoneId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The date and time, up to the current date, from which to stop retrieving the price history data, in UTC format (for example, YYYY-MM-DDTHH:MM:SSZ). */
  EndTime?: string;
  /** The filters. availability-zone - The Availability Zone for which prices should be returned. availability-zone-id - The ID of the Availability Zone for which prices should be returned. instance-type -  */
  Filters?: Filter[];
  /** Filters the results by the specified instance types. */
  InstanceTypes?: 'a1.medium' | 'a1.large' | 'a1.xlarge' | 'a1.2xlarge' | 'a1.4xlarge' | 'a1.metal' | 'c1.medium' | 'c1.xlarge' | 'c3.large' | 'c3.xlarge' | 'c3.2xlarge' | 'c3.4xlarge' | 'c3.8xlarge' | 'c4.large' | 'c4.xlarge' | 'c4.2xlarge' | 'c4.4xlarge' | 'c4.8xlarge' | 'c5.large' | 'c5.xlarge' | 'c5.2xlarge' | 'c5.4xlarge' | 'c5.9xlarge' | 'c5.12xlarge' | 'c5.18xlarge' | 'c5.24xlarge' | 'c5.metal' | 'c5a.large' | 'c5a.xlarge' | 'c5a.2xlarge' | 'c5a.4xlarge' | 'c5a.8xlarge' | 'c5a.12xlarge' | 'c5a.16xlarge' | 'c5a.24xlarge' | 'c5ad.large' | 'c5ad.xlarge' | 'c5ad.2xlarge' | 'c5ad.4xlarge' | 'c5ad.8xlarge' | 'c5ad.12xlarge' | 'c5ad.16xlarge' | 'c5ad.24xlarge' | 'c5d.large' | 'c5d.xlarge' | 'c5d.2xlarge' | 'c5d.4xlarge' | 'c5d.9xlarge' | 'c5d.12xlarge' | 'c5d.18xlarge' | 'c5d.24xlarge' | 'c5d.metal' | 'c5n.large' | 'c5n.xlarge' | 'c5n.2xlarge' | 'c5n.4xlarge' | 'c5n.9xlarge' | 'c5n.18xlarge' | 'c5n.metal' | 'c6g.medium' | 'c6g.large' | 'c6g.xlarge' | 'c6g.2xlarge' | 'c6g.4xlarge' | 'c6g.8xlarge' | 'c6g.12xlarge' | 'c6g.16xlarge' | 'c6g.metal' | 'c6gd.medium' | 'c6gd.large' | 'c6gd.xlarge' | 'c6gd.2xlarge' | 'c6gd.4xlarge' | 'c6gd.8xlarge' | 'c6gd.12xlarge' | 'c6gd.16xlarge' | 'c6gd.metal' | 'c6gn.medium' | 'c6gn.large' | 'c6gn.xlarge' | 'c6gn.2xlarge' | 'c6gn.4xlarge' | 'c6gn.8xlarge' | 'c6gn.12xlarge' | 'c6gn.16xlarge' | 'c6i.large' | 'c6i.xlarge' | 'c6i.2xlarge' | 'c6i.4xlarge' | 'c6i.8xlarge' | 'c6i.12xlarge' | 'c6i.16xlarge' | 'c6i.24xlarge' | 'c6i.32xlarge' | 'c6i.metal' | 'cc1.4xlarge' | 'cc2.8xlarge' | 'cg1.4xlarge' | 'cr1.8xlarge' | 'd2.xlarge' | 'd2.2xlarge' | 'd2.4xlarge' | 'd2.8xlarge' | 'd3.xlarge' | 'd3.2xlarge' | 'd3.4xlarge' | 'd3.8xlarge' | 'd3en.xlarge' | 'd3en.2xlarge' | 'd3en.4xlarge' | 'd3en.6xlarge' | 'd3en.8xlarge' | 'd3en.12xlarge' | 'dl1.24xlarge' | 'f1.2xlarge' | 'f1.4xlarge' | 'f1.16xlarge' | 'g2.2xlarge' | 'g2.8xlarge' | 'g3.4xlarge' | 'g3.8xlarge' | 'g3.16xlarge' | 'g3s.xlarge' | 'g4ad.xlarge' | 'g4ad.2xlarge' | 'g4ad.4xlarge' | 'g4ad.8xlarge' | 'g4ad.16xlarge' | 'g4dn.xlarge' | 'g4dn.2xlarge' | 'g4dn.4xlarge' | 'g4dn.8xlarge' | 'g4dn.12xlarge' | 'g4dn.16xlarge' | 'g4dn.metal' | 'g5.xlarge' | 'g5.2xlarge' | 'g5.4xlarge' | 'g5.8xlarge' | 'g5.12xlarge' | 'g5.16xlarge' | 'g5.24xlarge' | 'g5.48xlarge' | 'g5g.xlarge' | 'g5g.2xlarge' | 'g5g.4xlarge' | 'g5g.8xlarge' | 'g5g.16xlarge' | 'g5g.metal' | 'hi1.4xlarge' | 'hpc6a.48xlarge' | 'hs1.8xlarge' | 'h1.2xlarge' | 'h1.4xlarge' | 'h1.8xlarge' | 'h1.16xlarge' | 'i2.xlarge' | 'i2.2xlarge' | 'i2.4xlarge' | 'i2.8xlarge' | 'i3.large' | 'i3.xlarge' | 'i3.2xlarge' | 'i3.4xlarge' | 'i3.8xlarge' | 'i3.16xlarge' | 'i3.metal' | 'i3en.large' | 'i3en.xlarge' | 'i3en.2xlarge' | 'i3en.3xlarge' | 'i3en.6xlarge' | 'i3en.12xlarge' | 'i3en.24xlarge' | 'i3en.metal' | 'im4gn.large' | 'im4gn.xlarge' | 'im4gn.2xlarge' | 'im4gn.4xlarge' | 'im4gn.8xlarge' | 'im4gn.16xlarge' | 'inf1.xlarge' | 'inf1.2xlarge' | 'inf1.6xlarge' | 'inf1.24xlarge' | 'is4gen.medium' | 'is4gen.large' | 'is4gen.xlarge' | 'is4gen.2xlarge' | 'is4gen.4xlarge' | 'is4gen.8xlarge' | 'm1.small' | 'm1.medium' | 'm1.large' | 'm1.xlarge' | 'm2.xlarge' | 'm2.2xlarge' | 'm2.4xlarge' | 'm3.medium' | 'm3.large' | 'm3.xlarge' | 'm3.2xlarge' | 'm4.large' | 'm4.xlarge' | 'm4.2xlarge' | 'm4.4xlarge' | 'm4.10xlarge' | 'm4.16xlarge' | 'm5.large' | 'm5.xlarge' | 'm5.2xlarge' | 'm5.4xlarge' | 'm5.8xlarge' | 'm5.12xlarge' | 'm5.16xlarge' | 'm5.24xlarge' | 'm5.metal' | 'm5a.large' | 'm5a.xlarge' | 'm5a.2xlarge' | 'm5a.4xlarge' | 'm5a.8xlarge' | 'm5a.12xlarge' | 'm5a.16xlarge' | 'm5a.24xlarge' | 'm5ad.large' | 'm5ad.xlarge' | 'm5ad.2xlarge' | 'm5ad.4xlarge' | 'm5ad.8xlarge' | 'm5ad.12xlarge' | 'm5ad.16xlarge' | 'm5ad.24xlarge' | 'm5d.large' | 'm5d.xlarge' | 'm5d.2xlarge' | 'm5d.4xlarge' | 'm5d.8xlarge' | 'm5d.12xlarge' | 'm5d.16xlarge' | 'm5d.24xlarge' | 'm5d.metal' | 'm5dn.large' | 'm5dn.xlarge' | 'm5dn.2xlarge' | 'm5dn.4xlarge' | 'm5dn.8xlarge' | 'm5dn.12xlarge' | 'm5dn.16xlarge' | 'm5dn.24xlarge' | 'm5dn.metal' | 'm5n.large' | 'm5n.xlarge' | 'm5n.2xlarge' | 'm5n.4xlarge' | 'm5n.8xlarge' | 'm5n.12xlarge' | 'm5n.16xlarge' | 'm5n.24xlarge' | 'm5n.metal' | 'm5zn.large' | 'm5zn.xlarge' | 'm5zn.2xlarge' | 'm5zn.3xlarge' | 'm5zn.6xlarge' | 'm5zn.12xlarge' | 'm5zn.metal' | 'm6a.large' | 'm6a.xlarge' | 'm6a.2xlarge' | 'm6a.4xlarge' | 'm6a.8xlarge' | 'm6a.12xlarge' | 'm6a.16xlarge' | 'm6a.24xlarge' | 'm6a.32xlarge' | 'm6a.48xlarge' | 'm6g.metal' | 'm6g.medium' | 'm6g.large' | 'm6g.xlarge' | 'm6g.2xlarge' | 'm6g.4xlarge' | 'm6g.8xlarge' | 'm6g.12xlarge' | 'm6g.16xlarge' | 'm6gd.metal' | 'm6gd.medium' | 'm6gd.large' | 'm6gd.xlarge' | 'm6gd.2xlarge' | 'm6gd.4xlarge' | 'm6gd.8xlarge' | 'm6gd.12xlarge' | 'm6gd.16xlarge' | 'm6i.large' | 'm6i.xlarge' | 'm6i.2xlarge' | 'm6i.4xlarge' | 'm6i.8xlarge' | 'm6i.12xlarge' | 'm6i.16xlarge' | 'm6i.24xlarge' | 'm6i.32xlarge' | 'm6i.metal' | 'mac1.metal' | 'p2.xlarge' | 'p2.8xlarge' | 'p2.16xlarge' | 'p3.2xlarge' | 'p3.8xlarge' | 'p3.16xlarge' | 'p3dn.24xlarge' | 'p4d.24xlarge' | 'r3.large' | 'r3.xlarge' | 'r3.2xlarge' | 'r3.4xlarge' | 'r3.8xlarge' | 'r4.large' | 'r4.xlarge' | 'r4.2xlarge' | 'r4.4xlarge' | 'r4.8xlarge' | 'r4.16xlarge' | 'r5.large' | 'r5.xlarge' | 'r5.2xlarge' | 'r5.4xlarge' | 'r5.8xlarge' | 'r5.12xlarge' | 'r5.16xlarge' | 'r5.24xlarge' | 'r5.metal' | 'r5a.large' | 'r5a.xlarge' | 'r5a.2xlarge' | 'r5a.4xlarge' | 'r5a.8xlarge' | 'r5a.12xlarge' | 'r5a.16xlarge' | 'r5a.24xlarge' | 'r5ad.large' | 'r5ad.xlarge' | 'r5ad.2xlarge' | 'r5ad.4xlarge' | 'r5ad.8xlarge' | 'r5ad.12xlarge' | 'r5ad.16xlarge' | 'r5ad.24xlarge' | 'r5b.large' | 'r5b.xlarge' | 'r5b.2xlarge' | 'r5b.4xlarge' | 'r5b.8xlarge' | 'r5b.12xlarge' | 'r5b.16xlarge' | 'r5b.24xlarge' | 'r5b.metal' | 'r5d.large' | 'r5d.xlarge' | 'r5d.2xlarge' | 'r5d.4xlarge' | 'r5d.8xlarge' | 'r5d.12xlarge' | 'r5d.16xlarge' | 'r5d.24xlarge' | 'r5d.metal' | 'r5dn.large' | 'r5dn.xlarge' | 'r5dn.2xlarge' | 'r5dn.4xlarge' | 'r5dn.8xlarge' | 'r5dn.12xlarge' | 'r5dn.16xlarge' | 'r5dn.24xlarge' | 'r5dn.metal' | 'r5n.large' | 'r5n.xlarge' | 'r5n.2xlarge' | 'r5n.4xlarge' | 'r5n.8xlarge' | 'r5n.12xlarge' | 'r5n.16xlarge' | 'r5n.24xlarge' | 'r5n.metal' | 'r6g.medium' | 'r6g.large' | 'r6g.xlarge' | 'r6g.2xlarge' | 'r6g.4xlarge' | 'r6g.8xlarge' | 'r6g.12xlarge' | 'r6g.16xlarge' | 'r6g.metal' | 'r6gd.medium' | 'r6gd.large' | 'r6gd.xlarge' | 'r6gd.2xlarge' | 'r6gd.4xlarge' | 'r6gd.8xlarge' | 'r6gd.12xlarge' | 'r6gd.16xlarge' | 'r6gd.metal' | 'r6i.large' | 'r6i.xlarge' | 'r6i.2xlarge' | 'r6i.4xlarge' | 'r6i.8xlarge' | 'r6i.12xlarge' | 'r6i.16xlarge' | 'r6i.24xlarge' | 'r6i.32xlarge' | 'r6i.metal' | 't1.micro' | 't2.nano' | 't2.micro' | 't2.small' | 't2.medium' | 't2.large' | 't2.xlarge' | 't2.2xlarge' | 't3.nano' | 't3.micro' | 't3.small' | 't3.medium' | 't3.large' | 't3.xlarge' | 't3.2xlarge' | 't3a.nano' | 't3a.micro' | 't3a.small' | 't3a.medium' | 't3a.large' | 't3a.xlarge' | 't3a.2xlarge' | 't4g.nano' | 't4g.micro' | 't4g.small' | 't4g.medium' | 't4g.large' | 't4g.xlarge' | 't4g.2xlarge' | 'u-6tb1.56xlarge' | 'u-6tb1.112xlarge' | 'u-9tb1.112xlarge' | 'u-12tb1.112xlarge' | 'u-6tb1.metal' | 'u-9tb1.metal' | 'u-12tb1.metal' | 'u-18tb1.metal' | 'u-24tb1.metal' | 'vt1.3xlarge' | 'vt1.6xlarge' | 'vt1.24xlarge' | 'x1.16xlarge' | 'x1.32xlarge' | 'x1e.xlarge' | 'x1e.2xlarge' | 'x1e.4xlarge' | 'x1e.8xlarge' | 'x1e.16xlarge' | 'x1e.32xlarge' | 'x2iezn.2xlarge' | 'x2iezn.4xlarge' | 'x2iezn.6xlarge' | 'x2iezn.8xlarge' | 'x2iezn.12xlarge' | 'x2iezn.metal' | 'x2gd.medium' | 'x2gd.large' | 'x2gd.xlarge' | 'x2gd.2xlarge' | 'x2gd.4xlarge' | 'x2gd.8xlarge' | 'x2gd.12xlarge' | 'x2gd.16xlarge' | 'x2gd.metal' | 'z1d.large' | 'z1d.xlarge' | 'z1d.2xlarge' | 'z1d.3xlarge' | 'z1d.6xlarge' | 'z1d.12xlarge' | 'z1d.metal' | 'x2idn.16xlarge' | 'x2idn.24xlarge' | 'x2idn.32xlarge' | 'x2iedn.xlarge' | 'x2iedn.2xlarge' | 'x2iedn.4xlarge' | 'x2iedn.8xlarge' | 'x2iedn.16xlarge' | 'x2iedn.24xlarge' | 'x2iedn.32xlarge' | 'c6a.large' | 'c6a.xlarge' | 'c6a.2xlarge' | 'c6a.4xlarge' | 'c6a.8xlarge' | 'c6a.12xlarge' | 'c6a.16xlarge' | 'c6a.24xlarge' | 'c6a.32xlarge' | 'c6a.48xlarge' | 'c6a.metal' | 'm6a.metal' | 'i4i.large' | 'i4i.xlarge' | 'i4i.2xlarge' | 'i4i.4xlarge' | 'i4i.8xlarge' | 'i4i.16xlarge' | 'i4i.32xlarge' | 'i4i.metal' | 'x2idn.metal' | 'x2iedn.metal' | 'c7g.medium' | 'c7g.large' | 'c7g.xlarge' | 'c7g.2xlarge' | 'c7g.4xlarge' | 'c7g.8xlarge' | 'c7g.12xlarge' | 'c7g.16xlarge' | 'mac2.metal' | 'c6id.large' | 'c6id.xlarge' | 'c6id.2xlarge' | 'c6id.4xlarge' | 'c6id.8xlarge' | 'c6id.12xlarge' | 'c6id.16xlarge' | 'c6id.24xlarge' | 'c6id.32xlarge' | 'c6id.metal' | 'm6id.large' | 'm6id.xlarge' | 'm6id.2xlarge' | 'm6id.4xlarge' | 'm6id.8xlarge' | 'm6id.12xlarge' | 'm6id.16xlarge' | 'm6id.24xlarge' | 'm6id.32xlarge' | 'm6id.metal' | 'r6id.large' | 'r6id.xlarge' | 'r6id.2xlarge' | 'r6id.4xlarge' | 'r6id.8xlarge' | 'r6id.12xlarge' | 'r6id.16xlarge' | 'r6id.24xlarge' | 'r6id.32xlarge' | 'r6id.metal' | 'r6a.large' | 'r6a.xlarge' | 'r6a.2xlarge' | 'r6a.4xlarge' | 'r6a.8xlarge' | 'r6a.12xlarge' | 'r6a.16xlarge' | 'r6a.24xlarge' | 'r6a.32xlarge' | 'r6a.48xlarge' | 'r6a.metal' | 'p4de.24xlarge' | 'u-3tb1.56xlarge' | 'u-18tb1.112xlarge' | 'u-24tb1.112xlarge' | 'trn1.2xlarge' | 'trn1.32xlarge' | 'hpc6id.32xlarge' | 'c6in.large' | 'c6in.xlarge' | 'c6in.2xlarge' | 'c6in.4xlarge' | 'c6in.8xlarge' | 'c6in.12xlarge' | 'c6in.16xlarge' | 'c6in.24xlarge' | 'c6in.32xlarge' | 'm6in.large' | 'm6in.xlarge' | 'm6in.2xlarge' | 'm6in.4xlarge' | 'm6in.8xlarge' | 'm6in.12xlarge' | 'm6in.16xlarge' | 'm6in.24xlarge' | 'm6in.32xlarge' | 'm6idn.large' | 'm6idn.xlarge' | 'm6idn.2xlarge' | 'm6idn.4xlarge' | 'm6idn.8xlarge' | 'm6idn.12xlarge' | 'm6idn.16xlarge' | 'm6idn.24xlarge' | 'm6idn.32xlarge' | 'r6in.large' | 'r6in.xlarge' | 'r6in.2xlarge' | 'r6in.4xlarge' | 'r6in.8xlarge' | 'r6in.12xlarge' | 'r6in.16xlarge' | 'r6in.24xlarge' | 'r6in.32xlarge' | 'r6idn.large' | 'r6idn.xlarge' | 'r6idn.2xlarge' | 'r6idn.4xlarge' | 'r6idn.8xlarge' | 'r6idn.12xlarge' | 'r6idn.16xlarge' | 'r6idn.24xlarge' | 'r6idn.32xlarge' | 'c7g.metal' | 'm7g.medium' | 'm7g.large' | 'm7g.xlarge' | 'm7g.2xlarge' | 'm7g.4xlarge' | 'm7g.8xlarge' | 'm7g.12xlarge' | 'm7g.16xlarge' | 'm7g.metal' | 'r7g.medium' | 'r7g.large' | 'r7g.xlarge' | 'r7g.2xlarge' | 'r7g.4xlarge' | 'r7g.8xlarge' | 'r7g.12xlarge' | 'r7g.16xlarge' | 'r7g.metal' | 'c6in.metal' | 'm6in.metal' | 'm6idn.metal' | 'r6in.metal' | 'r6idn.metal' | 'inf2.xlarge' | 'inf2.8xlarge' | 'inf2.24xlarge' | 'inf2.48xlarge' | 'trn1n.32xlarge' | 'i4g.large' | 'i4g.xlarge' | 'i4g.2xlarge' | 'i4g.4xlarge' | 'i4g.8xlarge' | 'i4g.16xlarge' | 'hpc7g.4xlarge' | 'hpc7g.8xlarge' | 'hpc7g.16xlarge' | 'c7gn.medium' | 'c7gn.large' | 'c7gn.xlarge' | 'c7gn.2xlarge' | 'c7gn.4xlarge' | 'c7gn.8xlarge' | 'c7gn.12xlarge' | 'c7gn.16xlarge' | 'p5.48xlarge' | 'm7i.large' | 'm7i.xlarge' | 'm7i.2xlarge' | 'm7i.4xlarge' | 'm7i.8xlarge' | 'm7i.12xlarge' | 'm7i.16xlarge' | 'm7i.24xlarge' | 'm7i.48xlarge' | 'm7i-flex.large' | 'm7i-flex.xlarge' | 'm7i-flex.2xlarge' | 'm7i-flex.4xlarge' | 'm7i-flex.8xlarge' | 'm7a.medium' | 'm7a.large' | 'm7a.xlarge' | 'm7a.2xlarge' | 'm7a.4xlarge' | 'm7a.8xlarge' | 'm7a.12xlarge' | 'm7a.16xlarge' | 'm7a.24xlarge' | 'm7a.32xlarge' | 'm7a.48xlarge' | 'm7a.metal-48xl' | 'hpc7a.12xlarge' | 'hpc7a.24xlarge' | 'hpc7a.48xlarge' | 'hpc7a.96xlarge' | 'c7gd.medium' | 'c7gd.large' | 'c7gd.xlarge' | 'c7gd.2xlarge' | 'c7gd.4xlarge' | 'c7gd.8xlarge' | 'c7gd.12xlarge' | 'c7gd.16xlarge' | 'm7gd.medium' | 'm7gd.large' | 'm7gd.xlarge' | 'm7gd.2xlarge' | 'm7gd.4xlarge' | 'm7gd.8xlarge' | 'm7gd.12xlarge' | 'm7gd.16xlarge' | 'r7gd.medium' | 'r7gd.large' | 'r7gd.xlarge' | 'r7gd.2xlarge' | 'r7gd.4xlarge' | 'r7gd.8xlarge' | 'r7gd.12xlarge' | 'r7gd.16xlarge' | 'r7a.medium' | 'r7a.large' | 'r7a.xlarge' | 'r7a.2xlarge' | 'r7a.4xlarge' | 'r7a.8xlarge' | 'r7a.12xlarge' | 'r7a.16xlarge' | 'r7a.24xlarge' | 'r7a.32xlarge' | 'r7a.48xlarge' | 'c7i.large' | 'c7i.xlarge' | 'c7i.2xlarge' | 'c7i.4xlarge' | 'c7i.8xlarge' | 'c7i.12xlarge' | 'c7i.16xlarge' | 'c7i.24xlarge' | 'c7i.48xlarge' | 'mac2-m2pro.metal' | 'r7iz.large' | 'r7iz.xlarge' | 'r7iz.2xlarge' | 'r7iz.4xlarge' | 'r7iz.8xlarge' | 'r7iz.12xlarge' | 'r7iz.16xlarge' | 'r7iz.32xlarge' | 'c7a.medium' | 'c7a.large' | 'c7a.xlarge' | 'c7a.2xlarge' | 'c7a.4xlarge' | 'c7a.8xlarge' | 'c7a.12xlarge' | 'c7a.16xlarge' | 'c7a.24xlarge' | 'c7a.32xlarge' | 'c7a.48xlarge' | 'c7a.metal-48xl' | 'r7a.metal-48xl' | 'r7i.large' | 'r7i.xlarge' | 'r7i.2xlarge' | 'r7i.4xlarge' | 'r7i.8xlarge' | 'r7i.12xlarge' | 'r7i.16xlarge' | 'r7i.24xlarge' | 'r7i.48xlarge' | 'dl2q.24xlarge' | 'mac2-m2.metal' | 'i4i.12xlarge' | 'i4i.24xlarge' | 'c7i.metal-24xl' | 'c7i.metal-48xl' | 'm7i.metal-24xl' | 'm7i.metal-48xl' | 'r7i.metal-24xl' | 'r7i.metal-48xl' | 'r7iz.metal-16xl' | 'r7iz.metal-32xl' | 'c7gd.metal' | 'm7gd.metal' | 'r7gd.metal' | 'g6.xlarge' | 'g6.2xlarge' | 'g6.4xlarge' | 'g6.8xlarge' | 'g6.12xlarge' | 'g6.16xlarge' | 'g6.24xlarge' | 'g6.48xlarge' | 'gr6.4xlarge' | 'gr6.8xlarge' | 'c7i-flex.large' | 'c7i-flex.xlarge' | 'c7i-flex.2xlarge' | 'c7i-flex.4xlarge' | 'c7i-flex.8xlarge' | 'u7i-12tb.224xlarge' | 'u7in-16tb.224xlarge' | 'u7in-24tb.224xlarge' | 'u7in-32tb.224xlarge' | 'u7ib-12tb.224xlarge' | 'c7gn.metal' | 'r8g.medium' | 'r8g.large' | 'r8g.xlarge' | 'r8g.2xlarge' | 'r8g.4xlarge' | 'r8g.8xlarge' | 'r8g.12xlarge' | 'r8g.16xlarge' | 'r8g.24xlarge' | 'r8g.48xlarge' | 'r8g.metal-24xl' | 'r8g.metal-48xl' | 'mac2-m1ultra.metal' | 'g6e.xlarge' | 'g6e.2xlarge' | 'g6e.4xlarge' | 'g6e.8xlarge' | 'g6e.12xlarge' | 'g6e.16xlarge' | 'g6e.24xlarge' | 'g6e.48xlarge' | 'c8g.medium' | 'c8g.large' | 'c8g.xlarge' | 'c8g.2xlarge' | 'c8g.4xlarge' | 'c8g.8xlarge' | 'c8g.12xlarge' | 'c8g.16xlarge' | 'c8g.24xlarge' | 'c8g.48xlarge' | 'c8g.metal-24xl' | 'c8g.metal-48xl' | 'm8g.medium' | 'm8g.large' | 'm8g.xlarge' | 'm8g.2xlarge' | 'm8g.4xlarge' | 'm8g.8xlarge' | 'm8g.12xlarge' | 'm8g.16xlarge' | 'm8g.24xlarge' | 'm8g.48xlarge' | 'm8g.metal-24xl' | 'm8g.metal-48xl' | 'x8g.medium' | 'x8g.large' | 'x8g.xlarge' | 'x8g.2xlarge' | 'x8g.4xlarge' | 'x8g.8xlarge' | 'x8g.12xlarge' | 'x8g.16xlarge' | 'x8g.24xlarge' | 'x8g.48xlarge' | 'x8g.metal-24xl' | 'x8g.metal-48xl' | 'i7ie.large' | 'i7ie.xlarge' | 'i7ie.2xlarge' | 'i7ie.3xlarge' | 'i7ie.6xlarge' | 'i7ie.12xlarge' | 'i7ie.18xlarge' | 'i7ie.24xlarge' | 'i7ie.48xlarge' | 'i8g.large' | 'i8g.xlarge' | 'i8g.2xlarge' | 'i8g.4xlarge' | 'i8g.8xlarge' | 'i8g.12xlarge' | 'i8g.16xlarge' | 'i8g.24xlarge' | 'i8g.metal-24xl' | 'u7i-6tb.112xlarge' | 'u7i-8tb.112xlarge' | 'u7inh-32tb.480xlarge' | 'p5e.48xlarge' | 'p5en.48xlarge' | 'f2.12xlarge' | 'f2.48xlarge' | 'trn2.48xlarge' | 'c7i-flex.12xlarge' | 'c7i-flex.16xlarge' | 'm7i-flex.12xlarge' | 'm7i-flex.16xlarge' | 'i7ie.metal-24xl' | 'i7ie.metal-48xl' | 'i8g.48xlarge' | 'c8gd.medium' | 'c8gd.large' | 'c8gd.xlarge' | 'c8gd.2xlarge' | 'c8gd.4xlarge' | 'c8gd.8xlarge' | 'c8gd.12xlarge' | 'c8gd.16xlarge' | 'c8gd.24xlarge' | 'c8gd.48xlarge' | 'c8gd.metal-24xl' | 'c8gd.metal-48xl' | 'i7i.large' | 'i7i.xlarge' | 'i7i.2xlarge' | 'i7i.4xlarge' | 'i7i.8xlarge' | 'i7i.12xlarge' | 'i7i.16xlarge' | 'i7i.24xlarge' | 'i7i.48xlarge' | 'i7i.metal-24xl' | 'i7i.metal-48xl' | 'p6-b200.48xlarge' | 'm8gd.medium' | 'm8gd.large' | 'm8gd.xlarge' | 'm8gd.2xlarge' | 'm8gd.4xlarge' | 'm8gd.8xlarge' | 'm8gd.12xlarge' | 'm8gd.16xlarge' | 'm8gd.24xlarge' | 'm8gd.48xlarge' | 'm8gd.metal-24xl' | 'm8gd.metal-48xl' | 'r8gd.medium' | 'r8gd.large' | 'r8gd.xlarge' | 'r8gd.2xlarge' | 'r8gd.4xlarge' | 'r8gd.8xlarge' | 'r8gd.12xlarge' | 'r8gd.16xlarge' | 'r8gd.24xlarge' | 'r8gd.48xlarge' | 'r8gd.metal-24xl' | 'r8gd.metal-48xl' | 'c8gn.medium' | 'c8gn.large' | 'c8gn.xlarge' | 'c8gn.2xlarge' | 'c8gn.4xlarge' | 'c8gn.8xlarge' | 'c8gn.12xlarge' | 'c8gn.16xlarge' | 'c8gn.24xlarge' | 'c8gn.48xlarge' | 'c8gn.metal-24xl' | 'c8gn.metal-48xl' | 'f2.6xlarge' | 'p6e-gb200.36xlarge' | 'g6f.large' | 'g6f.xlarge' | 'g6f.2xlarge' | 'g6f.4xlarge' | 'gr6f.4xlarge' | 'p5.4xlarge' | 'r8i.large' | 'r8i.xlarge' | 'r8i.2xlarge' | 'r8i.4xlarge' | 'r8i.8xlarge' | 'r8i.12xlarge' | 'r8i.16xlarge' | 'r8i.24xlarge' | 'r8i.32xlarge' | 'r8i.48xlarge' | 'r8i.96xlarge' | 'r8i.metal-48xl' | 'r8i.metal-96xl' | 'r8i-flex.large' | 'r8i-flex.xlarge' | 'r8i-flex.2xlarge' | 'r8i-flex.4xlarge' | 'r8i-flex.8xlarge' | 'r8i-flex.12xlarge' | 'r8i-flex.16xlarge' | 'm8i.large' | 'm8i.xlarge' | 'm8i.2xlarge' | 'm8i.4xlarge' | 'm8i.8xlarge' | 'm8i.12xlarge' | 'm8i.16xlarge' | 'm8i.24xlarge' | 'm8i.32xlarge' | 'm8i.48xlarge' | 'm8i.96xlarge' | 'm8i.metal-48xl' | 'm8i.metal-96xl' | 'm8i-flex.large' | 'm8i-flex.xlarge' | 'm8i-flex.2xlarge' | 'm8i-flex.4xlarge' | 'm8i-flex.8xlarge' | 'm8i-flex.12xlarge' | 'm8i-flex.16xlarge' | 'i8ge.large' | 'i8ge.xlarge' | 'i8ge.2xlarge' | 'i8ge.3xlarge' | 'i8ge.6xlarge' | 'i8ge.12xlarge' | 'i8ge.18xlarge' | 'i8ge.24xlarge' | 'i8ge.48xlarge' | 'i8ge.metal-24xl' | 'i8ge.metal-48xl' | 'mac-m4.metal' | 'mac-m4pro.metal' | 'r8gn.medium' | 'r8gn.large' | 'r8gn.xlarge' | 'r8gn.2xlarge' | 'r8gn.4xlarge' | 'r8gn.8xlarge' | 'r8gn.12xlarge' | 'r8gn.16xlarge' | 'r8gn.24xlarge' | 'r8gn.48xlarge' | 'r8gn.metal-24xl' | 'r8gn.metal-48xl' | 'c8i.large' | 'c8i.xlarge' | 'c8i.2xlarge' | 'c8i.4xlarge' | 'c8i.8xlarge' | 'c8i.12xlarge' | 'c8i.16xlarge' | 'c8i.24xlarge' | 'c8i.32xlarge' | 'c8i.48xlarge' | 'c8i.96xlarge' | 'c8i.metal-48xl' | 'c8i.metal-96xl' | 'c8i-flex.large' | 'c8i-flex.xlarge' | 'c8i-flex.2xlarge' | 'c8i-flex.4xlarge' | 'c8i-flex.8xlarge' | 'c8i-flex.12xlarge' | 'c8i-flex.16xlarge' | 'r8gb.medium' | 'r8gb.large' | 'r8gb.xlarge' | 'r8gb.2xlarge' | 'r8gb.4xlarge' | 'r8gb.8xlarge' | 'r8gb.12xlarge' | 'r8gb.16xlarge' | 'r8gb.24xlarge' | 'r8gb.metal-24xl' | 'm8a.medium' | 'm8a.large' | 'm8a.xlarge' | 'm8a.2xlarge' | 'm8a.4xlarge' | 'm8a.8xlarge' | 'm8a.12xlarge' | 'm8a.16xlarge' | 'm8a.24xlarge' | 'm8a.48xlarge' | 'm8a.metal-24xl' | 'm8a.metal-48xl' | 'trn2.3xlarge' | 'r8a.medium' | 'r8a.large' | 'r8a.xlarge' | 'r8a.2xlarge' | 'r8a.4xlarge' | 'r8a.8xlarge' | 'r8a.12xlarge' | 'r8a.16xlarge' | 'r8a.24xlarge' | 'r8a.48xlarge' | 'r8a.metal-24xl' | 'r8a.metal-48xl' | 'p6-b300.48xlarge' | 'c8a.medium' | 'c8a.large' | 'c8a.xlarge' | 'c8a.2xlarge' | 'c8a.4xlarge' | 'c8a.8xlarge' | 'c8a.12xlarge' | 'c8a.16xlarge' | 'c8a.24xlarge' | 'c8a.48xlarge' | 'c8a.metal-24xl' | 'c8a.metal-48xl' | 'c8gb.12xlarge' | 'c8gb.16xlarge' | 'c8gb.24xlarge' | 'c8gb.2xlarge' | 'c8gb.4xlarge' | 'c8gb.8xlarge' | 'c8gb.large' | 'c8gb.medium' | 'c8gb.metal-24xl' | 'c8gb.xlarge' | 'c8gb.48xlarge' | 'c8gb.metal-48xl' | 'm8gb.12xlarge' | 'm8gb.16xlarge' | 'm8gb.24xlarge' | 'm8gb.2xlarge' | 'm8gb.4xlarge' | 'm8gb.8xlarge' | 'm8gb.large' | 'm8gb.medium' | 'm8gb.xlarge' | 'm8gb.48xlarge' | 'm8gb.metal-24xl' | 'm8gb.metal-48xl' | 'm8gn.12xlarge' | 'm8gn.16xlarge' | 'm8gn.24xlarge' | 'm8gn.2xlarge' | 'm8gn.48xlarge' | 'm8gn.4xlarge' | 'm8gn.8xlarge' | 'm8gn.large' | 'm8gn.medium' | 'm8gn.xlarge' | 'm8gn.metal-24xl' | 'm8gn.metal-48xl' | 'x8aedz.12xlarge' | 'x8aedz.24xlarge' | 'x8aedz.3xlarge' | 'x8aedz.6xlarge' | 'x8aedz.large' | 'x8aedz.metal-12xl' | 'x8aedz.metal-24xl' | 'x8aedz.xlarge' | 'm8azn.medium' | 'm8azn.large' | 'm8azn.xlarge' | 'm8azn.3xlarge' | 'm8azn.6xlarge' | 'm8azn.12xlarge' | 'm8azn.24xlarge' | 'm8azn.metal-12xl' | 'm8azn.metal-24xl' | 'x8i.large' | 'x8i.xlarge' | 'x8i.2xlarge' | 'x8i.4xlarge' | 'x8i.8xlarge' | 'x8i.12xlarge' | 'x8i.16xlarge' | 'x8i.24xlarge' | 'x8i.32xlarge' | 'x8i.48xlarge' | 'x8i.64xlarge' | 'x8i.96xlarge' | 'x8i.metal-48xl' | 'x8i.metal-96xl' | 'mac-m4max.metal' | 'g7e.2xlarge' | 'g7e.4xlarge' | 'g7e.8xlarge' | 'g7e.12xlarge' | 'g7e.24xlarge' | 'g7e.48xlarge' | 'r8id.large' | 'r8id.xlarge' | 'r8id.2xlarge' | 'r8id.4xlarge' | 'r8id.8xlarge' | 'r8id.12xlarge' | 'r8id.16xlarge' | 'r8id.24xlarge' | 'r8id.32xlarge' | 'r8id.48xlarge' | 'r8id.96xlarge' | 'r8id.metal-48xl' | 'r8id.metal-96xl'[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** Filters the results by the specified basic product descriptions. */
  ProductDescriptions?: string[];
  /** The date and time, up to the past 90 days, from which to start retrieving the price history data, in UTC format (for example, YYYY-MM-DDTHH:MM:SSZ). */
  StartTime?: string;
}

export interface DescribeStaleSecurityGroupsInput {
  /** The ID of the VPC. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeStoreImageTasksInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. task-state - Returns tasks in a certain state (InProgress | Completed | Failed) bucket - Returns task information for tasks that targeted a specific bucket. For the filter value, specify  */
  Filters?: Filter[];
  /** The AMI IDs for which to show progress. Up to 20 AMI IDs can be included in a request. */
  ImageIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. You cannot spec */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeSubnetsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. availability-zone - The Availability Zone for the subnet. You can also use availabilityZone as the filter name. availability-zone-id - The ID of the Availability Zone for the subnet. You  */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the subnets. Default: Describes all your subnets. */
  SubnetIds?: string[];
}

export interface DescribeTagsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. key - The tag key. resource-id - The ID of the resource. resource-type - The resource type. For a list of possible values, see TagSpecification. tag: - The key/value combination of the ta */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. This value can be between 5 and 1000. To get the next page of items, make another request with the token returned in the output. For more inform */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeTrafficMirrorFilterRulesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Traffic mirror filters. traffic-mirror-filter-rule-id: The ID of the Traffic Mirror rule. traffic-mirror-filter-id: The ID of the filter that this rule is associated with. rule-number: The number of t */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** Traffic filter ID. */
  TrafficMirrorFilterId?: string;
  /** Traffic filter rule IDs. */
  TrafficMirrorFilterRuleIds?: string[];
}

export interface DescribeTrafficMirrorFiltersInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: description: The Traffic Mirror filter description. traffic-mirror-filter-id: The ID of the Traffic Mirror filter. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The ID of the Traffic Mirror filter. */
  TrafficMirrorFilterIds?: string[];
}

export interface DescribeTrafficMirrorSessionsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: description: The Traffic Mirror session description. network-interface-id: The ID of the Traffic Mirror session network interface. owner-id: The ID of the */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The ID of the Traffic Mirror session. */
  TrafficMirrorSessionIds?: string[];
}

export interface DescribeTrafficMirrorTargetsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: description: The Traffic Mirror target description. network-interface-id: The ID of the Traffic Mirror session network interface. network-load-balancer-ar */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The ID of the Traffic Mirror targets. */
  TrafficMirrorTargetIds?: string[];
}

export interface DescribeTransitGatewayAttachmentsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: association.state - The state of the association (associating | associated | disassociating). association.transit-gateway-route-table-id - The ID of the r */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the attachments. */
  TransitGatewayAttachmentIds?: string[];
}

export interface DescribeTransitGatewayConnectPeersInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: state - The state of the Connect peer (pending | available | deleting | deleted). transit-gateway-attachment-id - The ID of the attachment. transit-gatewa */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the Connect peers. */
  TransitGatewayConnectPeerIds?: string[];
}

export interface DescribeTransitGatewayConnectsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: options.protocol - The tunnel protocol (gre). state - The state of the attachment (initiating | initiatingRequest | pendingAcceptance | rollingBack | pend */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the attachments. */
  TransitGatewayAttachmentIds?: string[];
}

export interface DescribeTransitGatewayMeteringPoliciesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters to apply when describing transit gateway metering policies. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the transit gateway metering policies to describe. */
  TransitGatewayMeteringPolicyIds?: string[];
}

export interface DescribeTransitGatewayMulticastDomainsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: state - The state of the transit gateway multicast domain. Valid values are pending | available | deleting | deleted. transit-gateway-id - The ID of the t */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The ID of the transit gateway multicast domain. */
  TransitGatewayMulticastDomainIds?: string[];
}

export interface DescribeTransitGatewayPeeringAttachmentsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: transit-gateway-attachment-id - The ID of the transit gateway attachment. local-owner-id - The ID of your Amazon Web Services account. remote-owner-id - T */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** One or more IDs of the transit gateway peering attachments. */
  TransitGatewayAttachmentIds?: string[];
}

export interface DescribeTransitGatewayPolicyTablesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters associated with the transit gateway policy table. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the transit gateway policy tables. */
  TransitGatewayPolicyTableIds?: string[];
}

export interface DescribeTransitGatewayRouteTableAnnouncementsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters associated with the transit gateway policy table. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the transit gateway route tables that are being advertised. */
  TransitGatewayRouteTableAnnouncementIds?: string[];
}

export interface DescribeTransitGatewayRouteTablesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: default-association-route-table - Indicates whether this is the default association route table for the transit gateway (true | false). default-propagatio */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the transit gateway route tables. */
  TransitGatewayRouteTableIds?: string[];
}

export interface DescribeTransitGatewaysInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: options.propagation-default-route-table-id - The ID of the default propagation route table. options.amazon-side-asn - The private ASN for the Amazon side  */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the transit gateways. */
  TransitGatewayIds?: string[];
}

export interface DescribeTransitGatewayVpcAttachmentsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: state - The state of the attachment. Valid values are available | deleted | deleting | failed | failing | initiatingRequest | modifying | pendingAcceptanc */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the attachments. */
  TransitGatewayAttachmentIds?: string[];
}

export interface DescribeTrunkInterfaceAssociationsInput {
  /** The IDs of the associations. */
  AssociationIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. gre-key - The ID of a trunk interface association. interface-protocol - The interface protocol. Valid values are VLAN and GRE. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface DescribeVerifiedAccessEndpointsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The ID of the Verified Access endpoint. */
  VerifiedAccessEndpointIds?: string[];
  /** The ID of the Verified Access group. */
  VerifiedAccessGroupId?: string;
  /** The ID of the Verified Access instance. */
  VerifiedAccessInstanceId?: string;
}

export interface DescribeVerifiedAccessGroupsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The ID of the Verified Access groups. */
  VerifiedAccessGroupIds?: string[];
  /** The ID of the Verified Access instance. */
  VerifiedAccessInstanceId?: string;
}

export interface DescribeVerifiedAccessInstanceLoggingConfigurationsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the Verified Access instances. */
  VerifiedAccessInstanceIds?: string[];
}

export interface DescribeVerifiedAccessInstancesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the Verified Access instances. */
  VerifiedAccessInstanceIds?: string[];
}

export interface DescribeVerifiedAccessTrustProvidersInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. Filter names and values are case-sensitive. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The IDs of the Verified Access trust providers. */
  VerifiedAccessTrustProviderIds?: string[];
}

export interface DescribeVolumeAttributeInput {
  /** The attribute of the volume. This parameter is required. */
  Attribute: 'autoEnableIO' | 'productCodes';
  /** The ID of the volume. */
  VolumeId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DescribeVolumesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. attachment.attach-time - The time stamp when the attachment initiated. attachment.delete-on-termination - Whether the volume is deleted on instance termination. attachment.device - The de */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The volume IDs. If not specified, then all volumes are included in the response. */
  VolumeIds?: string[];
}

export interface DescribeVolumesModificationsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. modification-state - The current modification state (modifying | optimizing | completed | failed). original-iops - The original IOPS rate of the volume. original-size - The original size  */
  Filters?: Filter[];
  /** The maximum number of results (up to a limit of 500) to be returned in a paginated request. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the volumes. */
  VolumeIds?: string[];
}

export interface DescribeVolumeStatusInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. action.code - The action code for the event (for example, enable-volume-io). action.description - A description of the action. action.event-id - The event ID associated with the action. a */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the volumes. Default: Describes all your volumes. */
  VolumeIds?: string[];
}

export interface DescribeVpcAttributeInput {
  /** The VPC attribute. */
  Attribute: 'enableDnsSupport' | 'enableDnsHostnames' | 'enableNetworkAddressUsageMetrics';
  /** The ID of the VPC. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DescribeVpcBlockPublicAccessExclusionsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** IDs of exclusions. */
  ExclusionIds?: string[];
  /** Filters for the request: resource-arn - The Amazon Resource Name (ARN) of a exclusion. internet-gateway-exclusion-mode - The mode of a VPC BPA exclusion. Possible values: allow-bidirectional | allow-e */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface DescribeVpcBlockPublicAccessOptionsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DescribeVpcClassicLinkInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. is-classic-link-enabled - Whether the VPC is enabled for ClassicLink (true | false). tag - The key/value combination of a tag assigned to the resource. Use the tag key in the filter name  */
  Filters?: Filter[];
  /** The VPCs for which you want to describe the ClassicLink status. */
  VpcIds?: string[];
}

export interface DescribeVpcClassicLinkDnsSupportInput {
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the VPCs. */
  VpcIds?: string[];
}

export interface DescribeVpcEncryptionControlsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters to apply to the request. */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the VPC Encryption Control configurations to describe. */
  VpcEncryptionControlIds?: string[];
  /** The IDs of the VPCs to describe encryption control configurations for. */
  VpcIds?: string[];
}

export interface DescribeVpcEndpointAssociationsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. vpc-endpoint-id - The ID of the VPC endpoint. associated-resource-accessibility - The association state. When the state is accessible, it returns AVAILABLE. When the state is inaccessible */
  Filters?: Filter[];
  /** The maximum page size. */
  MaxResults?: number;
  /** The pagination token. */
  NextToken?: string;
  /** The IDs of the VPC endpoints. */
  VpcEndpointIds?: string[];
}

export interface DescribeVpcEndpointConnectionNotificationsInput {
  /** The ID of the notification. */
  ConnectionNotificationId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. connection-notification-arn - The ARN of the SNS topic for the notification. connection-notification-id - The ID of the notification. connection-notification-state - The state of the noti */
  Filters?: Filter[];
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another request with the returned NextToken value. */
  MaxResults?: number;
  /** The token to request the next page of results. */
  NextToken?: string;
}

export interface DescribeVpcEndpointConnectionsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. ip-address-type - The IP address type (ipv4 | ipv6). service-id - The ID of the service. vpc-endpoint-owner - The ID of the Amazon Web Services account ID that owns the endpoint. vpc-endp */
  Filters?: Filter[];
  /** The maximum number of results to return for the request in a single page. The remaining results of the initial request can be seen by sending another request with the returned NextToken value. This va */
  MaxResults?: number;
  /** The token to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeVpcEndpointsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. ip-address-type - The IP address type (ipv4 | ipv6). service-name - The name of the service. service-region - The Region of the service. tag: - The key/value combination of a tag assigned */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. The request returns a token that you can specify in a subsequent call to get the next set of results. Constraint: If the value is greater than 1 */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a prior call.) */
  NextToken?: string;
  /** The IDs of the VPC endpoints. */
  VpcEndpointIds?: string[];
}

export interface DescribeVpcEndpointServiceConfigurationsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. service-name - The name of the service. service-id - The ID of the service. service-state - The state of the service (Pending | Available | Deleting | Deleted | Failed). supported-ip-addr */
  Filters?: Filter[];
  /** The maximum number of results to return for the request in a single page. The remaining results of the initial request can be seen by sending another request with the returned NextToken value. This va */
  MaxResults?: number;
  /** The token to retrieve the next page of results. */
  NextToken?: string;
  /** The IDs of the endpoint services. */
  ServiceIds?: string[];
}

export interface DescribeVpcEndpointServicePermissionsInput {
  /** The ID of the service. */
  ServiceId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. principal - The ARN of the principal. principal-type - The principal type (All | Service | OrganizationUnit | Account | User | Role). */
  Filters?: Filter[];
  /** The maximum number of results to return for the request in a single page. The remaining results of the initial request can be seen by sending another request with the returned NextToken value. This va */
  MaxResults?: number;
  /** The token to retrieve the next page of results. */
  NextToken?: string;
}

export interface DescribeVpcEndpointServicesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. owner - The ID or alias of the Amazon Web Services account that owns the service. service-name - The name of the service. service-region - The Region of the service. service-type - The ty */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. The request returns a token that you can specify in a subsequent call to get the next set of results. Constraint: If the value is greater than 1 */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a prior call.) */
  NextToken?: string;
  /** The service names. */
  ServiceNames?: string[];
  /** The service Regions. */
  ServiceRegions?: string[];
}

export interface DescribeVpcPeeringConnectionsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. accepter-vpc-info.cidr-block - The IPv4 CIDR block of the accepter VPC. accepter-vpc-info.owner-id - The ID of the Amazon Web Services account that owns the accepter VPC. accepter-vpc-inf */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the VPC peering connections. Default: Describes all your VPC peering connections. */
  VpcPeeringConnectionIds?: string[];
}

export interface DescribeVpcsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. cidr - The primary IPv4 CIDR block of the VPC. The CIDR block you specify must exactly match the VPC's CIDR block for information to be returned for the VPC. Must contain the slash follow */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the VPCs. */
  VpcIds?: string[];
}

export interface DescribeVpnConcentratorsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters to limit the results. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** One or more VPN concentrator IDs. */
  VpnConcentratorIds?: string[];
}

/** Contains the parameters for DescribeVpnConnections. */
export interface DescribeVpnConnectionsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. customer-gateway-configuration - The configuration information for the customer gateway. customer-gateway-id - The ID of a customer gateway associated with the VPN connection. sta */
  Filters?: Filter[];
  /** One or more VPN connection IDs. Default: Describes your VPN connections. */
  VpnConnectionIds?: string[];
}

/** Contains the parameters for DescribeVpnGateways. */
export interface DescribeVpnGatewaysInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. amazon-side-asn - The Autonomous System Number (ASN) for the Amazon side of the gateway. attachment.state - The current state of the attachment between the gateway and the VPC (at */
  Filters?: Filter[];
  /** One or more virtual private gateway IDs. Default: Describes all your virtual private gateways. */
  VpnGatewayIds?: string[];
}

export interface DetachClassicLinkVpcInput {
  /** The ID of the instance to unlink from the VPC. */
  InstanceId: string;
  /** The ID of the VPC to which the instance is linked. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DetachInternetGatewayInput {
  /** The ID of the internet gateway. */
  InternetGatewayId: string;
  /** The ID of the VPC. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for DetachNetworkInterface. */
export interface DetachNetworkInterfaceInput {
  /** The ID of the attachment. */
  AttachmentId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specifies whether to force a detachment. Use the Force parameter only as a last resort to detach a network interface from a failed instance. If you use the Force parameter to detach a network interfac */
  Force?: boolean;
}

export interface DetachVerifiedAccessTrustProviderInput {
  /** The ID of the Verified Access instance. */
  VerifiedAccessInstanceId: string;
  /** The ID of the Verified Access trust provider. */
  VerifiedAccessTrustProviderId: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DetachVolumeInput {
  /** The ID of the volume. */
  VolumeId: string;
  /** The device name. */
  Device?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Forces detachment if the previous detachment attempt did not occur cleanly (for example, logging into an instance, unmounting the volume, and detaching normally). This option can lead to data loss or  */
  Force?: boolean;
  /** The ID of the instance. If you are detaching a Multi-Attach enabled volume, you must specify an instance ID. */
  InstanceId?: string;
}

/** Contains the parameters for DetachVpnGateway. */
export interface DetachVpnGatewayInput {
  /** The ID of the VPC. */
  VpcId: string;
  /** The ID of the virtual private gateway. */
  VpnGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableAddressTransferInput {
  /** The allocation ID of an Elastic IP address. */
  AllocationId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableAllowedImagesSettingsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableAwsNetworkPerformanceMetricSubscriptionInput {
  /** The target Region or Availability Zone that the metric subscription is disabled for. For example, eu-north-1. */
  Destination?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The metric used for the disabled subscription. */
  Metric?: 'aggregate-latency';
  /** The source Region or Availability Zone that the metric subscription is disabled for. For example, us-east-1. */
  Source?: string;
  /** The statistic used for the disabled subscription. */
  Statistic?: 'p50';
}

export interface DisableCapacityManagerInput {
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableEbsEncryptionByDefaultInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableFastLaunchInput {
  /** Specify the ID of the image for which to disable Windows fast launch. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Forces the image settings to turn off Windows fast launch for your Windows AMI. This parameter overrides any errors that are encountered while cleaning up resources in your account. */
  Force?: boolean;
}

export interface DisableFastSnapshotRestoresInput {
  /** The IDs of one or more snapshots. For example, snap-1234567890abcdef0. */
  SourceSnapshotIds: string[];
  /** One or more Availability Zone IDs. For example, use2-az1. Either AvailabilityZone or AvailabilityZoneId must be specified in the request, but not both. */
  AvailabilityZoneIds?: string[];
  /** One or more Availability Zones. For example, us-east-2a. Either AvailabilityZone or AvailabilityZoneId must be specified in the request, but not both. */
  AvailabilityZones?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableImageInput {
  /** The ID of the AMI. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableImageBlockPublicAccessInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableImageDeprecationInput {
  /** The ID of the AMI. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableImageDeregistrationProtectionInput {
  /** The ID of the AMI. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableInstanceSqlHaStandbyDetectionsInput {
  /** The IDs of the instances to disable from SQL Server High Availability standby detection monitoring. */
  InstanceIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableIpamOrganizationAdminAccountInput {
  /** The Organizations member account ID that you want to disable as IPAM account. */
  DelegatedAdminAccountId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DisableIpamPolicyInput {
  /** The ID of the IPAM policy to disable. */
  IpamPolicyId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The ID of the Amazon Web Services Organizations target for which to disable the IPAM policy. This parameter is required only when IPAM is integrated with Amazon Web Services Organizations. When IPAM i */
  OrganizationTargetId?: string;
}

export interface DisableRouteServerPropagationInput {
  /** The ID of the route server for which to disable propagation. */
  RouteServerId: string;
  /** The ID of the route table for which to disable route server propagation. */
  RouteTableId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DisableSerialConsoleAccessInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableSnapshotBlockPublicAccessInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableTransitGatewayRouteTablePropagationInput {
  /** The ID of the propagation route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the attachment. */
  TransitGatewayAttachmentId?: string;
  /** The ID of the route table announcement. */
  TransitGatewayRouteTableAnnouncementId?: string;
}

/** Contains the parameters for DisableVgwRoutePropagation. */
export interface DisableVgwRoutePropagationInput {
  /** The ID of the virtual private gateway. */
  GatewayId: string;
  /** The ID of the route table. */
  RouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableVpcClassicLinkInput {
  /** The ID of the VPC. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisableVpcClassicLinkDnsSupportInput {
  /** The ID of the VPC. */
  VpcId?: string;
}

export interface DisassociateAddressInput {
  /** The association ID. This parameter is required. */
  AssociationId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Deprecated. */
  PublicIp?: string;
}

export interface DisassociateCapacityReservationBillingOwnerInput {
  /** The ID of the Capacity Reservation. */
  CapacityReservationId: string;
  /** The ID of the consumer account to which the request was sent. */
  UnusedReservationBillingOwnerId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisassociateClientVpnTargetNetworkInput {
  /** The ID of the target network association. */
  AssociationId: string;
  /** The ID of the Client VPN endpoint from which to disassociate the target network. */
  ClientVpnEndpointId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisassociateEnclaveCertificateIamRoleInput {
  /** The ARN of the ACM certificate from which to disassociate the IAM role. */
  CertificateArn: string;
  /** The ARN of the IAM role to disassociate. */
  RoleArn: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisassociateIamInstanceProfileInput {
  /** The ID of the IAM instance profile association. */
  AssociationId: string;
}

export interface DisassociateInstanceEventWindowInput {
  /** One or more targets to disassociate from the specified event window. */
  AssociationTarget: InstanceEventWindowDisassociationRequest;
  /** The ID of the event window. */
  InstanceEventWindowId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisassociateIpamByoasnInput {
  /** A public 2-byte or 4-byte ASN. */
  Asn: string;
  /** A BYOIP CIDR. */
  Cidr: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisassociateIpamResourceDiscoveryInput {
  /** A resource discovery association ID. */
  IpamResourceDiscoveryAssociationId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DisassociateNatGatewayAddressInput {
  /** The association IDs of EIPs that have been associated with the NAT gateway. */
  AssociationIds: string[];
  /** The ID of the NAT gateway. */
  NatGatewayId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum amount of time to wait (in seconds) before forcibly releasing the IP addresses if connections are still in progress. Default value is 350 seconds. */
  MaxDrainDurationSeconds?: number;
}

export interface DisassociateRouteServerInput {
  /** The ID of the route server to disassociate. */
  RouteServerId: string;
  /** The ID of the VPC to disassociate from the route server. */
  VpcId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface DisassociateRouteTableInput {
  /** The association ID representing the current association between the route table and subnet or gateway. */
  AssociationId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisassociateSecurityGroupVpcInput {
  /** A security group ID. */
  GroupId: string;
  /** A VPC ID. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisassociateSubnetCidrBlockInput {
  /** The association ID for the CIDR block. */
  AssociationId: string;
}

export interface DisassociateTransitGatewayMulticastDomainInput {
  /** The IDs of the subnets; */
  SubnetIds: string[];
  /** The ID of the attachment. */
  TransitGatewayAttachmentId: string;
  /** The ID of the transit gateway multicast domain. */
  TransitGatewayMulticastDomainId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisassociateTransitGatewayPolicyTableInput {
  /** The ID of the transit gateway attachment to disassociate from the policy table. */
  TransitGatewayAttachmentId: string;
  /** The ID of the disassociated policy table. */
  TransitGatewayPolicyTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisassociateTransitGatewayRouteTableInput {
  /** The ID of the attachment. */
  TransitGatewayAttachmentId: string;
  /** The ID of the transit gateway route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisassociateTrunkInterfaceInput {
  /** The ID of the association */
  AssociationId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface DisassociateVpcCidrBlockInput {
  /** The association ID for the CIDR block. */
  AssociationId: string;
}

export interface EnableAddressTransferInput {
  /** The allocation ID of an Elastic IP address. */
  AllocationId: string;
  /** The ID of the account that you want to transfer the Elastic IP address to. */
  TransferAccountId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableAllowedImagesSettingsInput {
  /** Specify enabled to apply the image criteria specified by the Allowed AMIs settings. Specify audit-mode so that you can check which AMIs will be allowed or not allowed by the image criteria. */
  AllowedImagesSettingsState: 'enabled' | 'audit-mode';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableAwsNetworkPerformanceMetricSubscriptionInput {
  /** The target Region (like us-east-2) or Availability Zone ID (like use2-az2) that the metric subscription is enabled for. If you use Availability Zone IDs, the Source and Destination Availability Zones  */
  Destination?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The metric used for the enabled subscription. */
  Metric?: 'aggregate-latency';
  /** The source Region (like us-east-1) or Availability Zone ID (like use1-az1) that the metric subscription is enabled for. If you use Availability Zone IDs, the Source and Destination Availability Zones  */
  Source?: string;
  /** The statistic used for the enabled subscription. */
  Statistic?: 'p50';
}

export interface EnableCapacityManagerInput {
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specifies whether to enable cross-account access for Amazon Web Services Organizations. When enabled, Capacity Manager can aggregate data from all accounts in your organization. Default is false. */
  OrganizationsAccess?: boolean;
}

export interface EnableEbsEncryptionByDefaultInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableFastLaunchInput {
  /** Specify the ID of the image for which to enable Windows fast launch. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The launch template to use when launching Windows instances from pre-provisioned snapshots. Launch template parameters can include either the name or ID of the launch template, but not both. */
  LaunchTemplate?: FastLaunchLaunchTemplateSpecificationRequest;
  /** The maximum number of instances that Amazon EC2 can launch at the same time to create pre-provisioned snapshots for Windows fast launch. Value must be 6 or greater. */
  MaxParallelLaunches?: number;
  /** The type of resource to use for pre-provisioning the AMI for Windows fast launch. Supported values include: snapshot, which is the default value. */
  ResourceType?: string;
  /** Configuration settings for creating and managing the snapshots that are used for pre-provisioning the AMI for Windows fast launch. The associated ResourceType must be snapshot. */
  SnapshotConfiguration?: FastLaunchSnapshotConfigurationRequest;
}

export interface EnableFastSnapshotRestoresInput {
  /** The IDs of one or more snapshots. For example, snap-1234567890abcdef0. You can specify a snapshot that was shared with you from another Amazon Web Services account. */
  SourceSnapshotIds: string[];
  /** One or more Availability Zone IDs. For example, use2-az1. Either AvailabilityZone or AvailabilityZoneId must be specified in the request, but not both. */
  AvailabilityZoneIds?: string[];
  /** One or more Availability Zones. For example, us-east-2a. Either AvailabilityZone or AvailabilityZoneId must be specified in the request, but not both. */
  AvailabilityZones?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableImageInput {
  /** The ID of the AMI. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableImageBlockPublicAccessInput {
  /** Specify block-new-sharing to enable block public access for AMIs at the account level in the specified Region. This will block any attempt to publicly share your AMIs in the specified Region. */
  ImageBlockPublicAccessState: 'block-new-sharing';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableImageDeprecationInput {
  /** The date and time to deprecate the AMI, in UTC, in the following format: YYYY-MM-DDTHH:MM:SSZ. If you specify a value for seconds, Amazon EC2 rounds the seconds to the nearest minute. You can’t specif */
  DeprecateAt: string;
  /** The ID of the AMI. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableImageDeregistrationProtectionInput {
  /** The ID of the AMI. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** If true, enforces deregistration protection for 24 hours after deregistration protection is disabled. */
  WithCooldown?: boolean;
}

export interface EnableInstanceSqlHaStandbyDetectionsInput {
  /** The IDs of the instances to enable for SQL Server High Availability standby detection monitoring. */
  InstanceIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ARN of the Secrets Manager secret containing the SQL Server access credentials. The specified secret must contain valid SQL Server credentials for the specified instances. If not specified, deaful */
  SqlServerCredentials?: string;
}

export interface EnableIpamOrganizationAdminAccountInput {
  /** The Organizations member account ID that you want to enable as the IPAM account. */
  DelegatedAdminAccountId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface EnableIpamPolicyInput {
  /** The ID of the IPAM policy to enable. */
  IpamPolicyId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The ID of the Amazon Web Services Organizations target for which to enable the IPAM policy. This parameter is required only when IPAM is integrated with Amazon Web Services Organizations. When IPAM is */
  OrganizationTargetId?: string;
}

export interface EnableReachabilityAnalyzerOrganizationSharingInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableRouteServerPropagationInput {
  /** The ID of the route server for which to enable propagation. */
  RouteServerId: string;
  /** The ID of the route table to which route server will propagate routes. */
  RouteTableId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface EnableSerialConsoleAccessInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableSnapshotBlockPublicAccessInput {
  /** The mode in which to enable block public access for snapshots for the Region. Specify one of the following values: block-all-sharing - Prevents all public sharing of snapshots in the Region. Users in  */
  State: 'block-all-sharing' | 'block-new-sharing' | 'unblocked';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableTransitGatewayRouteTablePropagationInput {
  /** The ID of the propagation route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the attachment. */
  TransitGatewayAttachmentId?: string;
  /** The ID of the transit gateway route table announcement. */
  TransitGatewayRouteTableAnnouncementId?: string;
}

/** Contains the parameters for EnableVgwRoutePropagation. */
export interface EnableVgwRoutePropagationInput {
  /** The ID of the virtual private gateway that is attached to a VPC. The virtual private gateway must be attached to the same VPC that the routing tables are associated with. */
  GatewayId: string;
  /** The ID of the route table. The routing table must be associated with the same VPC that the virtual private gateway is attached to. */
  RouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableVolumeIOInput {
  /** The ID of the volume. */
  VolumeId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableVpcClassicLinkInput {
  /** The ID of the VPC. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface EnableVpcClassicLinkDnsSupportInput {
  /** The ID of the VPC. */
  VpcId?: string;
}

export interface ExportClientVpnClientCertificateRevocationListInput {
  /** The ID of the Client VPN endpoint. */
  ClientVpnEndpointId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ExportClientVpnClientConfigurationInput {
  /** The ID of the Client VPN endpoint. */
  ClientVpnEndpointId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ExportImageInput {
  /** The disk image format. */
  DiskImageFormat: 'VMDK' | 'RAW' | 'VHD';
  /** The ID of the image. */
  ImageId: string;
  /** The Amazon S3 bucket for the destination image. The destination bucket must exist. */
  S3ExportLocation: ExportTaskS3LocationRequest;
  /** Token to enable idempotency for export image requests. */
  ClientToken?: string;
  /** A description of the image being exported. The maximum length is 255 characters. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The name of the role that grants VM Import/Export permission to export images to your Amazon S3 bucket. If this parameter is not specified, the default role is named 'vmimport'. */
  RoleName?: string;
  /** The tags to apply to the export image task during creation. */
  TagSpecifications?: TagSpecification[];
}

export interface ExportTransitGatewayRoutesInput {
  /** The name of the S3 bucket. */
  S3Bucket: string;
  /** The ID of the route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: attachment.transit-gateway-attachment-id - The id of the transit gateway attachment. attachment.resource-id - The resource id of the transit gateway attac */
  Filters?: Filter[];
}

export interface ExportVerifiedAccessInstanceClientConfigurationInput {
  /** The ID of the Verified Access instance. */
  VerifiedAccessInstanceId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetActiveVpnTunnelStatusInput {
  /** The ID of the VPN connection for which to retrieve the active tunnel status. */
  VpnConnectionId: string;
  /** The external IP address of the VPN tunnel for which to retrieve the active status. */
  VpnTunnelOutsideIpAddress: string;
  /** Checks whether you have the required permissions for the action, without actually making the request. */
  DryRun?: boolean;
}

export interface GetAllowedImagesSettingsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetAssociatedEnclaveCertificateIamRolesInput {
  /** The ARN of the ACM certificate for which to view the associated IAM roles, encryption keys, and Amazon S3 object information. */
  CertificateArn: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetAssociatedIpv6PoolCidrsInput {
  /** The ID of the IPv6 address pool. */
  PoolId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetAwsNetworkPerformanceDataInput {
  /** A list of network performance data queries. */
  DataQueries?: DataQuery[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ending time for the performance data request. The end time must be formatted as yyyy-mm-ddThh:mm:ss. For example, 2022-06-12T12:00:00.000Z. */
  EndTime?: string;
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The starting time for the performance data request. The starting time must be formatted as yyyy-mm-ddThh:mm:ss. For example, 2022-06-10T12:00:00.000Z. */
  StartTime?: string;
}

export interface GetCapacityManagerAttributesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetCapacityManagerMetricDataInput {
  /** The end time for the metric data query, in ISO 8601 format. If the end time is beyond the latest ingested data, it will be automatically adjusted to the latest available data point. */
  EndTime: string;
  /** The names of the metrics to retrieve. Maximum of 10 metrics per request. */
  MetricNames: 'reservation-total-capacity-hrs-vcpu' | 'reservation-total-capacity-hrs-inst' | 'reservation-max-size-vcpu' | 'reservation-max-size-inst' | 'reservation-min-size-vcpu' | 'reservation-min-size-inst' | 'reservation-unused-total-capacity-hrs-vcpu' | 'reservation-unused-total-capacity-hrs-inst' | 'reservation-unused-total-estimated-cost' | 'reservation-max-unused-size-vcpu' | 'reservation-max-unused-size-inst' | 'reservation-min-unused-size-vcpu' | 'reservation-min-unused-size-inst' | 'reservation-max-utilization' | 'reservation-min-utilization' | 'reservation-avg-utilization-vcpu' | 'reservation-avg-utilization-inst' | 'reservation-total-count' | 'reservation-total-estimated-cost' | 'reservation-avg-future-size-vcpu' | 'reservation-avg-future-size-inst' | 'reservation-min-future-size-vcpu' | 'reservation-min-future-size-inst' | 'reservation-max-future-size-vcpu' | 'reservation-max-future-size-inst' | 'reservation-avg-committed-size-vcpu' | 'reservation-avg-committed-size-inst' | 'reservation-max-committed-size-vcpu' | 'reservation-max-committed-size-inst' | 'reservation-min-committed-size-vcpu' | 'reservation-min-committed-size-inst' | 'reserved-total-usage-hrs-vcpu' | 'reserved-total-usage-hrs-inst' | 'reserved-total-estimated-cost' | 'unreserved-total-usage-hrs-vcpu' | 'unreserved-total-usage-hrs-inst' | 'unreserved-total-estimated-cost' | 'spot-total-usage-hrs-vcpu' | 'spot-total-usage-hrs-inst' | 'spot-total-estimated-cost' | 'spot-avg-run-time-before-interruption-inst' | 'spot-max-run-time-before-interruption-inst' | 'spot-min-run-time-before-interruption-inst' | 'spot-total-interruptions-inst' | 'spot-total-interruptions-vcpu' | 'spot-total-count-inst' | 'spot-total-count-vcpu' | 'spot-interruption-rate-inst' | 'spot-interruption-rate-vcpu'[];
  /** The granularity, in seconds, of the returned data points. */
  Period: number;
  /** The start time for the metric data query, in ISO 8601 format. The time range (end time - start time) must be a multiple of the specified period. */
  StartTime: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Conditions to filter the metric data. Each filter specifies a dimension, comparison operator ('equals', 'in'), and values to match against. */
  FilterBy?: CapacityManagerCondition[];
  /** The dimensions by which to group the metric data. This determines how the data is aggregated and returned. */
  GroupBy?: 'resource-region' | 'availability-zone-id' | 'account-id' | 'instance-family' | 'instance-type' | 'instance-platform' | 'reservation-arn' | 'reservation-id' | 'reservation-type' | 'reservation-create-timestamp' | 'reservation-start-timestamp' | 'reservation-end-timestamp' | 'reservation-end-date-type' | 'tenancy' | 'reservation-state' | 'reservation-instance-match-criteria' | 'reservation-unused-financial-owner'[];
  /** The maximum number of data points to return. Valid range is 1 to 100,000. Use with NextToken for pagination of large result sets. */
  MaxResults?: number;
  /** The token for the next page of results. Use this value in a subsequent call to retrieve additional data points. */
  NextToken?: string;
}

export interface GetCapacityManagerMetricDimensionsInput {
  /** The end time for the dimension query, in ISO 8601 format. Only dimensions with data in this time range will be returned. */
  EndTime: string;
  /** The dimensions to group by when retrieving available dimension values. This determines which dimension combinations are returned. Required parameter. */
  GroupBy: 'resource-region' | 'availability-zone-id' | 'account-id' | 'instance-family' | 'instance-type' | 'instance-platform' | 'reservation-arn' | 'reservation-id' | 'reservation-type' | 'reservation-create-timestamp' | 'reservation-start-timestamp' | 'reservation-end-timestamp' | 'reservation-end-date-type' | 'tenancy' | 'reservation-state' | 'reservation-instance-match-criteria' | 'reservation-unused-financial-owner'[];
  /** The metric names to use as an additional filter when retrieving dimensions. Only dimensions that have data for these metrics will be returned. Required parameter with maximum size of 1 for v1. */
  MetricNames: 'reservation-total-capacity-hrs-vcpu' | 'reservation-total-capacity-hrs-inst' | 'reservation-max-size-vcpu' | 'reservation-max-size-inst' | 'reservation-min-size-vcpu' | 'reservation-min-size-inst' | 'reservation-unused-total-capacity-hrs-vcpu' | 'reservation-unused-total-capacity-hrs-inst' | 'reservation-unused-total-estimated-cost' | 'reservation-max-unused-size-vcpu' | 'reservation-max-unused-size-inst' | 'reservation-min-unused-size-vcpu' | 'reservation-min-unused-size-inst' | 'reservation-max-utilization' | 'reservation-min-utilization' | 'reservation-avg-utilization-vcpu' | 'reservation-avg-utilization-inst' | 'reservation-total-count' | 'reservation-total-estimated-cost' | 'reservation-avg-future-size-vcpu' | 'reservation-avg-future-size-inst' | 'reservation-min-future-size-vcpu' | 'reservation-min-future-size-inst' | 'reservation-max-future-size-vcpu' | 'reservation-max-future-size-inst' | 'reservation-avg-committed-size-vcpu' | 'reservation-avg-committed-size-inst' | 'reservation-max-committed-size-vcpu' | 'reservation-max-committed-size-inst' | 'reservation-min-committed-size-vcpu' | 'reservation-min-committed-size-inst' | 'reserved-total-usage-hrs-vcpu' | 'reserved-total-usage-hrs-inst' | 'reserved-total-estimated-cost' | 'unreserved-total-usage-hrs-vcpu' | 'unreserved-total-usage-hrs-inst' | 'unreserved-total-estimated-cost' | 'spot-total-usage-hrs-vcpu' | 'spot-total-usage-hrs-inst' | 'spot-total-estimated-cost' | 'spot-avg-run-time-before-interruption-inst' | 'spot-max-run-time-before-interruption-inst' | 'spot-min-run-time-before-interruption-inst' | 'spot-total-interruptions-inst' | 'spot-total-interruptions-vcpu' | 'spot-total-count-inst' | 'spot-total-count-vcpu' | 'spot-interruption-rate-inst' | 'spot-interruption-rate-vcpu'[];
  /** The start time for the dimension query, in ISO 8601 format. Only dimensions with data in this time range will be returned. */
  StartTime: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Conditions to filter which dimension values are returned. Each filter specifies a dimension, comparison operator, and values to match against. */
  FilterBy?: CapacityManagerCondition[];
  /** The maximum number of dimension combinations to return. Valid range is 1 to 1000. Use with NextToken for pagination. */
  MaxResults?: number;
  /** The token for the next page of results. Use this value in a subsequent call to retrieve additional dimension values. */
  NextToken?: string;
}

export interface GetCapacityReservationUsageInput {
  /** The ID of the Capacity Reservation. */
  CapacityReservationId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface GetCoipPoolUsageInput {
  /** The ID of the address pool. */
  PoolId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. coip-address-usage.allocation-id - The allocation ID of the address. coip-address-usage.aws-account-id - The ID of the Amazon Web Services account that is using the customer-owned */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetConsoleOutputInput {
  /** The ID of the instance. */
  InstanceId: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** When enabled, retrieves the latest console output for the instance. Default: disabled (false) */
  Latest?: boolean;
}

export interface GetConsoleScreenshotInput {
  /** The ID of the instance. */
  InstanceId: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** When set to true, acts as keystroke input and wakes up an instance that's in standby or "sleep" mode. */
  WakeUp?: boolean;
}

export interface GetDeclarativePoliciesReportSummaryInput {
  /** The ID of the report. */
  ReportId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetDefaultCreditSpecificationInput {
  /** The instance family. */
  InstanceFamily: 't2' | 't3' | 't3a' | 't4g';
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface GetEbsDefaultKmsKeyIdInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetEbsEncryptionByDefaultInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetEnabledIpamPolicyInput {
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface GetFlowLogsIntegrationTemplateInput {
  /** To store the CloudFormation template in Amazon S3, specify the location in Amazon S3. */
  ConfigDeliveryS3DestinationArn: string;
  /** The ID of the flow log. */
  FlowLogId: string;
  /** Information about the service integration. */
  IntegrateServices: IntegrateServices;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetGroupsForCapacityReservationInput {
  /** The ID of the Capacity Reservation. If you specify a Capacity Reservation that is shared with you, the operation returns only Capacity Reservation groups that you own. */
  CapacityReservationId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token to use to retrieve the next page of results. */
  NextToken?: string;
}

export interface GetHostReservationPurchasePreviewInput {
  /** The IDs of the Dedicated Hosts with which the reservation is associated. */
  HostIdSet: string[];
  /** The offering ID of the reservation. */
  OfferingId: string;
}

export interface GetImageAncestryInput {
  /** The ID of the AMI whose ancestry you want to trace. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetImageBlockPublicAccessStateInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetInstanceMetadataDefaultsInput {
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface GetInstanceTpmEkPubInput {
  /** The ID of the instance for which to get the public endorsement key. */
  InstanceId: string;
  /** The required public endorsement key format. Specify der for a DER-encoded public key that is compatible with OpenSSL. Specify tpmt for a TPM 2.0 format that is compatible with tpm2-tools. The returned */
  KeyFormat: 'der' | 'tpmt';
  /** The required public endorsement key type. */
  KeyType: 'rsa-2048' | 'ecc-sec-p384';
  /** Specify this parameter to verify whether the request will succeed, without actually making the request. If the request will succeed, the response is DryRunOperation. Otherwise, the response is Unautho */
  DryRun?: boolean;
}

export interface GetInstanceTypesFromInstanceRequirementsInput {
  /** The processor architecture type. */
  ArchitectureTypes: 'i386' | 'x86_64' | 'arm64' | 'x86_64_mac' | 'arm64_mac'[];
  /** The attributes required for the instance types. */
  InstanceRequirements: InstanceRequirementsRequest;
  /** The virtualization type. */
  VirtualizationTypes: 'hvm' | 'paravirtual'[];
  /** Reserved. */
  Context?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface GetInstanceUefiDataInput {
  /** The ID of the instance from which to retrieve the UEFI data. */
  InstanceId: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface GetIpamAddressHistoryInput {
  /** The CIDR you want the history of. The CIDR can be an IPv4 or IPv6 IP address range. If you enter a /16 IPv4 CIDR, you will get records that match it exactly. You will not get records for any subnets w */
  Cidr: string;
  /** The ID of the IPAM scope that the CIDR is in. */
  IpamScopeId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The end of the time period for which you are looking for history. If you omit this option, it will default to the current time. */
  EndTime?: string;
  /** The maximum number of historical results you would like returned per page. Defaults to 100. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The start of the time period for which you are looking for history. If you omit this option, it will default to the value of EndTime. */
  StartTime?: string;
  /** The ID of the VPC you want your history records filtered by. */
  VpcId?: string;
}

export interface GetIpamDiscoveredAccountsInput {
  /** The Amazon Web Services Region that the account information is returned from. */
  DiscoveryRegion: string;
  /** A resource discovery ID. */
  IpamResourceDiscoveryId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Discovered account filters. */
  Filters?: Filter[];
  /** The maximum number of discovered accounts to return in one page of results. */
  MaxResults?: number;
  /** Specify the pagination token from a previous request to retrieve the next page of results. */
  NextToken?: string;
}

export interface GetIpamDiscoveredPublicAddressesInput {
  /** The Amazon Web Services Region for the IP address. */
  AddressRegion: string;
  /** An IPAM resource discovery ID. */
  IpamResourceDiscoveryId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Filters. */
  Filters?: Filter[];
  /** The maximum number of IPAM discovered public addresses to return in one page of results. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetIpamDiscoveredResourceCidrsInput {
  /** A resource discovery ID. */
  IpamResourceDiscoveryId: string;
  /** A resource Region. */
  ResourceRegion: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Filters. */
  Filters?: Filter[];
  /** The maximum number of discovered resource CIDRs to return in one page of results. */
  MaxResults?: number;
  /** Specify the pagination token from a previous request to retrieve the next page of results. */
  NextToken?: string;
}

export interface GetIpamPolicyAllocationRulesInput {
  /** The ID of the IPAM policy for which to get allocation rules. */
  IpamPolicyId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters for the allocation rules. */
  Filters?: Filter[];
  /** The locale for which to get the allocation rules. */
  Locale?: string;
  /** The maximum number of results to return in a single call. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The resource type for which to get the allocation rules. The Amazon Web Services service or resource type that can use IP addresses through IPAM policies. Supported services and resource types include */
  ResourceType?: 'alb' | 'eip' | 'rds' | 'rnat';
}

export interface GetIpamPolicyOrganizationTargetsInput {
  /** The ID of the IPAM policy for which to get Amazon Web Services Organizations targets. */
  IpamPolicyId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters for the Amazon Web Services Organizations targets. */
  Filters?: Filter[];
  /** The maximum number of results to return in a single call. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetIpamPoolAllocationsInput {
  /** The ID of the IPAM pool you want to see the allocations for. */
  IpamPoolId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters for the request. For more information about filtering, see Filtering CLI output. */
  Filters?: Filter[];
  /** The ID of the allocation. */
  IpamPoolAllocationId?: string;
  /** The maximum number of results you would like returned per page. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetIpamPoolCidrsInput {
  /** The ID of the IPAM pool you want the CIDR for. */
  IpamPoolId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters for the request. For more information about filtering, see Filtering CLI output. */
  Filters?: Filter[];
  /** The maximum number of results to return in the request. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetIpamPrefixListResolverRulesInput {
  /** The ID of the IPAM prefix list resolver whose rules you want to retrieve. */
  IpamPrefixListResolverId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters to limit the results. */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetIpamPrefixListResolverVersionEntriesInput {
  /** The ID of the IPAM prefix list resolver whose version entries you want to retrieve. */
  IpamPrefixListResolverId: string;
  /** The version number of the resolver for which to retrieve CIDR entries. If not specified, the latest version is used. */
  IpamPrefixListResolverVersion: number;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetIpamPrefixListResolverVersionsInput {
  /** The ID of the IPAM prefix list resolver whose versions you want to retrieve. */
  IpamPrefixListResolverId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters to limit the results. */
  Filters?: Filter[];
  /** Specific version numbers to retrieve. If not specified, all versions are returned. */
  IpamPrefixListResolverVersions?: number[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetIpamResourceCidrsInput {
  /** The ID of the scope that the resource is in. */
  IpamScopeId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** One or more filters for the request. For more information about filtering, see Filtering CLI output. */
  Filters?: Filter[];
  /** The ID of the IPAM pool that the resource is in. */
  IpamPoolId?: string;
  /** The maximum number of results to return in the request. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The ID of the resource. */
  ResourceId?: string;
  /** The ID of the Amazon Web Services account that owns the resource. */
  ResourceOwner?: string;
  /** The resource tag. */
  ResourceTag?: RequestIpamResourceTag;
  /** The resource type. */
  ResourceType?: 'vpc' | 'subnet' | 'eip' | 'public-ipv4-pool' | 'ipv6-pool' | 'eni' | 'anycast-ip-list';
}

export interface GetLaunchTemplateDataInput {
  /** The ID of the instance. */
  InstanceId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetManagedPrefixListAssociationsInput {
  /** The ID of the prefix list. */
  PrefixListId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetManagedPrefixListEntriesInput {
  /** The ID of the prefix list. */
  PrefixListId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
  /** The version of the prefix list for which to return the entries. The default is the current version. */
  TargetVersion?: number;
}

export interface GetNetworkInsightsAccessScopeAnalysisFindingsInput {
  /** The ID of the Network Access Scope analysis. */
  NetworkInsightsAccessScopeAnalysisId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetNetworkInsightsAccessScopeContentInput {
  /** The ID of the Network Access Scope. */
  NetworkInsightsAccessScopeId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetPasswordDataInput {
  /** The ID of the Windows instance. */
  InstanceId: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

/** Contains the parameters for GetReservedInstanceExchangeQuote. */
export interface GetReservedInstancesExchangeQuoteInput {
  /** The IDs of the Convertible Reserved Instances to exchange. */
  ReservedInstanceIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The configuration of the target Convertible Reserved Instance to exchange for your current Convertible Reserved Instances. */
  TargetConfigurations?: TargetConfigurationRequest[];
}

export interface GetRouteServerAssociationsInput {
  /** The ID of the route server for which to get association information. */
  RouteServerId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface GetRouteServerPropagationsInput {
  /** The ID of the route server for which to get propagation information. */
  RouteServerId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The ID of the route table for which to get propagation information. */
  RouteTableId?: string;
}

export interface GetRouteServerRoutingDatabaseInput {
  /** The ID of the route server for which to get the routing database. */
  RouteServerId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Filters to apply to the routing database query. */
  Filters?: Filter[];
  /** The maximum number of routing database entries to return in a single response. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetSecurityGroupsForVpcInput {
  /** The VPC ID where the security group can be used. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters. If using multiple filters, the results include security groups which match all filters. group-id: The security group ID. description: The security group's description. group-name: The sec */
  Filters?: Filter[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface GetSerialConsoleAccessStatusInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetSnapshotBlockPublicAccessStateInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetSpotPlacementScoresInput {
  /** The target capacity. */
  TargetCapacity: number;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The attributes for the instance types. When you specify instance attributes, Amazon EC2 will identify instance types with those attributes. If you specify InstanceRequirementsWithMetadata, you can't s */
  InstanceRequirementsWithMetadata?: InstanceRequirementsWithMetadataRequest;
  /** The instance types. We recommend that you specify at least three instance types. If you specify one or two instance types, or specify variations of a single instance type (for example, an m3.xlarge wi */
  InstanceTypes?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The Regions used to narrow down the list of Regions to be scored. Enter the Region code, for example, us-east-1. */
  RegionNames?: string[];
  /** Specify true so that the response returns a list of scored Availability Zones. Otherwise, the response returns a list of scored Regions. A list of scored Availability Zones is useful if you want to la */
  SingleAvailabilityZone?: boolean;
  /** The unit for the target capacity. */
  TargetCapacityUnitType?: 'vcpu' | 'memory-mib' | 'units';
}

export interface GetSubnetCidrReservationsInput {
  /** The ID of the subnet. */
  SubnetId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. reservationType - The type of reservation (prefix | explicit). subnet-id - The ID of the subnet. tag: - The key/value combination of a tag assigned to the resource. Use the tag ke */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetTransitGatewayAttachmentPropagationsInput {
  /** The ID of the attachment. */
  TransitGatewayAttachmentId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: transit-gateway-route-table-id - The ID of the transit gateway route table. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetTransitGatewayMeteringPolicyEntriesInput {
  /** The ID of the transit gateway metering policy to retrieve entries for. */
  TransitGatewayMeteringPolicyId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters to apply when retrieving metering policy entries. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetTransitGatewayMulticastDomainAssociationsInput {
  /** The ID of the transit gateway multicast domain. */
  TransitGatewayMulticastDomainId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: resource-id - The ID of the resource. resource-type - The type of resource. The valid value is: vpc. state - The state of the subnet association. Valid va */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetTransitGatewayPolicyTableAssociationsInput {
  /** The ID of the transit gateway policy table. */
  TransitGatewayPolicyTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters associated with the transit gateway policy table. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetTransitGatewayPolicyTableEntriesInput {
  /** The ID of the transit gateway policy table. */
  TransitGatewayPolicyTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The filters associated with the transit gateway policy table. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetTransitGatewayPrefixListReferencesInput {
  /** The ID of the transit gateway route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: attachment.resource-id - The ID of the resource for the attachment. attachment.resource-type - The type of resource for the attachment. Valid values are v */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetTransitGatewayRouteTableAssociationsInput {
  /** The ID of the transit gateway route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: resource-id - The ID of the resource. resource-type - The resource type. Valid values are vpc | vpn | direct-connect-gateway | peering | connect. transit- */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetTransitGatewayRouteTablePropagationsInput {
  /** The ID of the transit gateway route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: resource-id - The ID of the resource. resource-type - The resource type. Valid values are vpc | vpn | direct-connect-gateway | peering | connect. transit- */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetVerifiedAccessEndpointPolicyInput {
  /** The ID of the Verified Access endpoint. */
  VerifiedAccessEndpointId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetVerifiedAccessEndpointTargetsInput {
  /** The ID of the network CIDR endpoint. */
  VerifiedAccessEndpointId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface GetVerifiedAccessGroupPolicyInput {
  /** The ID of the Verified Access group. */
  VerifiedAccessGroupId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface GetVpcResourcesBlockingEncryptionEnforcementInput {
  /** The ID of the VPC to check for resources blocking encryption enforcement. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface GetVpnConnectionDeviceSampleConfigurationInput {
  /** Device identifier provided by the GetVpnConnectionDeviceTypes API. */
  VpnConnectionDeviceTypeId: string;
  /** The VpnConnectionId specifies the Site-to-Site VPN connection used for the sample configuration. */
  VpnConnectionId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IKE version to be used in the sample configuration file for your customer gateway device. You can specify one of the following versions: ikev1 or ikev2. */
  InternetKeyExchangeVersion?: string;
  /** The type of sample configuration to generate. Valid values are "compatibility" (includes IKEv1) or "recommended" (throws UnsupportedOperationException for IKEv1). */
  SampleType?: string;
}

export interface GetVpnConnectionDeviceTypesInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of results returned by GetVpnConnectionDeviceTypes in paginated output. When this parameter is used, GetVpnConnectionDeviceTypes only returns MaxResults results in a single page alo */
  MaxResults?: number;
  /** The NextToken value returned from a previous paginated GetVpnConnectionDeviceTypes request where MaxResults was used and the results exceeded the value of that parameter. Pagination continues from the */
  NextToken?: string;
}

export interface GetVpnTunnelReplacementStatusInput {
  /** The ID of the Site-to-Site VPN connection. */
  VpnConnectionId: string;
  /** The external IP address of the VPN tunnel. */
  VpnTunnelOutsideIpAddress: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ImportClientVpnClientCertificateRevocationListInput {
  /** The client certificate revocation list file. For more information, see Generate a Client Certificate Revocation List in the Client VPN Administrator Guide. */
  CertificateRevocationList: string;
  /** The ID of the Client VPN endpoint to which the client certificate revocation list applies. */
  ClientVpnEndpointId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ImportImageInput {
  /** The architecture of the virtual machine. Valid values: i386 | x86_64 */
  Architecture?: string;
  /** The boot mode of the virtual machine. The uefi-preferred boot mode isn't supported for importing images. For more information, see Boot modes in the VM Import/Export User Guide. */
  BootMode?: 'legacy-bios' | 'uefi' | 'uefi-preferred';
  /** The client-specific data. */
  ClientData?: ClientData;
  /** The token to enable idempotency for VM import requests. */
  ClientToken?: string;
  /** A description string for the import image task. */
  Description?: string;
  /** Information about the disk containers. */
  DiskContainers?: ImageDiskContainer[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specifies whether the destination AMI of the imported image should be encrypted. The default KMS key for EBS is used unless you specify a non-default KMS key using KmsKeyId. For more information, see  */
  Encrypted?: boolean;
  /** The target hypervisor platform. Valid values: xen */
  Hypervisor?: string;
  /** An identifier for the symmetric KMS key to use when creating the encrypted AMI. This parameter is only required if you want to use a non-default KMS key; if this parameter is not specified, the defaul */
  KmsKeyId?: string;
  /** The ARNs of the license configurations. */
  LicenseSpecifications?: ImportImageLicenseConfigurationRequest[];
  /** The license type to be used for the Amazon Machine Image (AMI) after importing. Specify AWS to replace the source-system license with an Amazon Web Services license or BYOL to retain the source-system */
  LicenseType?: string;
  /** The operating system of the virtual machine. If you import a VM that is compatible with Unified Extensible Firmware Interface (UEFI) using an EBS snapshot, you must specify a value for the platform. V */
  Platform?: string;
  /** The name of the role to use when not using the default role, 'vmimport'. */
  RoleName?: string;
  /** The tags to apply to the import image task during creation. */
  TagSpecifications?: TagSpecification[];
  /** The usage operation value. For more information, see Licensing options in the VM Import/Export User Guide. */
  UsageOperation?: string;
}

export interface ImportInstanceInput {
  /** The instance operating system. */
  Platform: 'Windows';
  /** A description for the instance being imported. */
  Description?: string;
  /** The disk image. */
  DiskImages?: DiskImage[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The launch specification. */
  LaunchSpecification?: ImportInstanceLaunchSpecification;
}

export interface ImportKeyPairInput {
  /** A unique name for the key pair. */
  KeyName: string;
  /** The public key. */
  PublicKeyMaterial: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to apply to the imported key pair. */
  TagSpecifications?: TagSpecification[];
}

export interface ImportSnapshotInput {
  /** The client-specific data. */
  ClientData?: ClientData;
  /** Token to enable idempotency for VM import requests. */
  ClientToken?: string;
  /** The description string for the import snapshot task. */
  Description?: string;
  /** Information about the disk container. */
  DiskContainer?: SnapshotDiskContainer;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specifies whether the destination snapshot of the imported image should be encrypted. The default KMS key for EBS is used unless you specify a non-default KMS key using KmsKeyId. For more information, */
  Encrypted?: boolean;
  /** An identifier for the symmetric KMS key to use when creating the encrypted snapshot. This parameter is only required if you want to use a non-default KMS key; if this parameter is not specified, the d */
  KmsKeyId?: string;
  /** The name of the role to use when not using the default role, 'vmimport'. */
  RoleName?: string;
  /** The tags to apply to the import snapshot task during creation. */
  TagSpecifications?: TagSpecification[];
}

export interface ImportVolumeInput {
  /** The disk image. */
  Image: DiskImageDetail;
  /** The volume size. */
  Volume: VolumeDetail;
  /** The Availability Zone for the resulting EBS volume. Either AvailabilityZone or AvailabilityZoneId must be specified, but not both. */
  AvailabilityZone?: string;
  /** The ID of the Availability Zone for the resulting EBS volume. Either AvailabilityZone or AvailabilityZoneId must be specified, but not both. */
  AvailabilityZoneId?: string;
  /** A description of the volume. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ListImagesInRecycleBinInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IDs of the AMIs to list. Omit this parameter to list all of the AMIs that are in the Recycle Bin. You can specify up to 20 IDs in a single request. */
  ImageIds?: string[];
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
}

export interface ListSnapshotsInRecycleBinInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the snapshots to list. Omit this parameter to list all of the snapshots that are in the Recycle Bin. */
  SnapshotIds?: string[];
}

export interface ListVolumesInRecycleBinInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of items to return for this request. To get the next page of items, make another request with the token returned in the output. For more information, see Pagination. Valid range: 5  */
  MaxResults?: number;
  /** The token returned from a previous paginated request. Pagination continues from the end of the items returned by the previous request. */
  NextToken?: string;
  /** The IDs of the volumes to list. Omit this parameter to list all of the volumes that are in the Recycle Bin. */
  VolumeIds?: string[];
}

export interface LockSnapshotInput {
  /** The mode in which to lock the snapshot. Specify one of the following: governance - Locks the snapshot in governance mode. Snapshots locked in governance mode can't be deleted until one of the followin */
  LockMode: 'compliance' | 'governance';
  /** The ID of the snapshot to lock. */
  SnapshotId: string;
  /** The cooling-off period during which you can unlock the snapshot or modify the lock settings after locking the snapshot in compliance mode, in hours. After the cooling-off period expires, you can't unl */
  CoolOffPeriod?: number;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The date and time at which the snapshot lock is to automatically expire, in the UTC time zone (YYYY-MM-DDThh:mm:ss.sssZ). You must specify either this parameter or LockDuration, but not both. */
  ExpirationDate?: string;
  /** The period of time for which to lock the snapshot, in days. The snapshot lock will automatically expire after this period lapses. You must specify either this parameter or ExpirationDate, but not both */
  LockDuration?: number;
}

export interface ModifyAddressAttributeInput {
  /** [EC2-VPC] The allocation ID. */
  AllocationId: string;
  /** The domain name to modify for the IP address. */
  DomainName?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyAvailabilityZoneGroupInput {
  /** The name of the Availability Zone group, Local Zone group, or Wavelength Zone group. */
  GroupName: string;
  /** Indicates whether to opt in to the zone group. The only valid value is opted-in. You must contact Amazon Web Services Support to opt out of a Local Zone or Wavelength Zone group. */
  OptInStatus: 'opted-in' | 'not-opted-in';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyCapacityReservationInput {
  /** The ID of the Capacity Reservation. */
  CapacityReservationId: string;
  /** Reserved. Capacity Reservations you have created are accepted by default. */
  Accept?: boolean;
  /** Reserved for future use. */
  AdditionalInfo?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The date and time at which the Capacity Reservation expires. When a Capacity Reservation expires, the reserved capacity is released and you can no longer launch instances into it. The Capacity Reserva */
  EndDate?: string;
  /** Indicates the way in which the Capacity Reservation ends. A Capacity Reservation can have one of the following end types: unlimited - The Capacity Reservation remains active until you explicitly cance */
  EndDateType?: 'unlimited' | 'limited';
  /** The number of instances for which to reserve capacity. The number of instances can't be increased or decreased by more than 1000 in a single request. */
  InstanceCount?: number;
  /** The matching criteria (instance eligibility) that you want to use in the modified Capacity Reservation. If you change the instance eligibility of an existing Capacity Reservation from targeted to open */
  InstanceMatchCriteria?: 'open' | 'targeted';
}

export interface ModifyCapacityReservationFleetInput {
  /** The ID of the Capacity Reservation Fleet to modify. */
  CapacityReservationFleetId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The date and time at which the Capacity Reservation Fleet expires. When the Capacity Reservation Fleet expires, its state changes to expired and all of the Capacity Reservations in the Fleet expire. T */
  EndDate?: string;
  /** Indicates whether to remove the end date from the Capacity Reservation Fleet. If you remove the end date, the Capacity Reservation Fleet does not expire and it remains active until you explicitly canc */
  RemoveEndDate?: boolean;
  /** The total number of capacity units to be reserved by the Capacity Reservation Fleet. This value, together with the instance type weights that you assign to each instance type used by the Fleet determi */
  TotalTargetCapacity?: number;
}

export interface ModifyClientVpnEndpointInput {
  /** The ID of the Client VPN endpoint to modify. */
  ClientVpnEndpointId: string;
  /** The options for managing connection authorization for new client connections. */
  ClientConnectOptions?: ClientConnectOptions;
  /** Options for enabling a customizable text banner that will be displayed on Amazon Web Services provided clients when a VPN session is established. */
  ClientLoginBannerOptions?: ClientLoginBannerOptions;
  /** Client route enforcement is a feature of the Client VPN service that helps enforce administrator defined routes on devices connected through the VPN. T his feature helps improve your security posture  */
  ClientRouteEnforcementOptions?: ClientRouteEnforcementOptions;
  /** Information about the client connection logging options. If you enable client connection logging, data about client connections is sent to a Cloudwatch Logs log stream. The following information is lo */
  ConnectionLogOptions?: ConnectionLogOptions;
  /** A brief description of the Client VPN endpoint. */
  Description?: string;
  /** Indicates whether the client VPN session is disconnected after the maximum timeout specified in sessionTimeoutHours is reached. If true, users are prompted to reconnect client VPN. If false, client VP */
  DisconnectOnSessionTimeout?: boolean;
  /** Information about the DNS servers to be used by Client VPN connections. A Client VPN endpoint can have up to two DNS servers. */
  DnsServers?: DnsServersOptionsModifyStructure;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IDs of one or more security groups to apply to the target network. */
  SecurityGroupIds?: string[];
  /** Specify whether to enable the self-service portal for the Client VPN endpoint. */
  SelfServicePortal?: 'enabled' | 'disabled';
  /** The ARN of the server certificate to be used. The server certificate must be provisioned in Certificate Manager (ACM). */
  ServerCertificateArn?: string;
  /** The maximum VPN session duration time in hours. Valid values: 8 | 10 | 12 | 24 Default value: 24 */
  SessionTimeoutHours?: number;
  /** Indicates whether the VPN is split-tunnel. For information about split-tunnel VPN endpoints, see Split-tunnel Client VPN endpoint in the Client VPN Administrator Guide. */
  SplitTunnel?: boolean;
  /** The ID of the VPC to associate with the Client VPN endpoint. */
  VpcId?: string;
  /** The port number to assign to the Client VPN endpoint for TCP and UDP traffic. Valid Values: 443 | 1194 Default Value: 443 */
  VpnPort?: number;
}

export interface ModifyDefaultCreditSpecificationInput {
  /** The credit option for CPU usage of the instance family. Valid Values: standard | unlimited */
  CpuCredits: string;
  /** The instance family. */
  InstanceFamily: 't2' | 't3' | 't3a' | 't4g';
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface ModifyEbsDefaultKmsKeyIdInput {
  /** The identifier of the KMS key to use for Amazon EBS encryption. If this parameter is not specified, your KMS key for Amazon EBS is used. If KmsKeyId is specified, the encrypted state must be true. You */
  KmsKeyId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyFleetInput {
  /** The ID of the EC2 Fleet. */
  FleetId: string;
  /** Reserved. */
  Context?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Indicates whether running instances should be terminated if the total target capacity of the EC2 Fleet is decreased below the current size of the EC2 Fleet. Supported only for fleets of type maintain. */
  ExcessCapacityTerminationPolicy?: 'no-termination' | 'termination';
  /** The launch template and overrides. */
  LaunchTemplateConfigs?: FleetLaunchTemplateConfigRequest[];
  /** The size of the EC2 Fleet. */
  TargetCapacitySpecification?: TargetCapacitySpecificationRequest;
}

export interface ModifyFpgaImageAttributeInput {
  /** The ID of the AFI. */
  FpgaImageId: string;
  /** The name of the attribute. */
  Attribute?: 'description' | 'name' | 'loadPermission' | 'productCodes';
  /** A description for the AFI. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The load permission for the AFI. */
  LoadPermission?: LoadPermissionModifications;
  /** A name for the AFI. */
  Name?: string;
  /** The operation type. */
  OperationType?: 'add' | 'remove';
  /** The product codes. After you add a product code to an AFI, it can't be removed. This parameter is valid only when modifying the productCodes attribute. */
  ProductCodes?: string[];
  /** The user groups. This parameter is valid only when modifying the loadPermission attribute. */
  UserGroups?: string[];
  /** The Amazon Web Services account IDs. This parameter is valid only when modifying the loadPermission attribute. */
  UserIds?: string[];
}

export interface ModifyHostsInput {
  /** The IDs of the Dedicated Hosts to modify. */
  HostIds: string[];
  /** Specify whether to enable or disable auto-placement. */
  AutoPlacement?: 'on' | 'off';
  /** Indicates whether to enable or disable host maintenance for the Dedicated Host. For more information, see Host maintenance in the Amazon EC2 User Guide. */
  HostMaintenance?: 'on' | 'off';
  /** Indicates whether to enable or disable host recovery for the Dedicated Host. For more information, see Host recovery in the Amazon EC2 User Guide. */
  HostRecovery?: 'on' | 'off';
  /** Specifies the instance family to be supported by the Dedicated Host. Specify this parameter to modify a Dedicated Host to support multiple instance types within its current instance family. If you wan */
  InstanceFamily?: string;
  /** Specifies the instance type to be supported by the Dedicated Host. Specify this parameter to modify a Dedicated Host to support only a specific instance type. If you want to modify a Dedicated Host to */
  InstanceType?: string;
}

export interface ModifyIdentityIdFormatInput {
  /** The ARN of the principal, which can be an IAM user, IAM role, or the root user. Specify all to modify the ID format for all IAM users, IAM roles, and the root user of the account. */
  PrincipalArn: string;
  /** The type of resource: bundle | conversion-task | customer-gateway | dhcp-options | elastic-ip-allocation | elastic-ip-association | export-task | flow-log | image | import-task | internet-gateway | ne */
  Resource: string;
  /** Indicates whether the resource should use longer IDs (17-character IDs) */
  UseLongIds: boolean;
}

export interface ModifyIdFormatInput {
  /** The type of resource: bundle | conversion-task | customer-gateway | dhcp-options | elastic-ip-allocation | elastic-ip-association | export-task | flow-log | image | import-task | internet-gateway | ne */
  Resource: string;
  /** Indicate whether the resource should use longer IDs (17-character IDs). */
  UseLongIds: boolean;
}

/** Contains the parameters for ModifyImageAttribute. */
export interface ModifyImageAttributeInput {
  /** The ID of the AMI. */
  ImageId: string;
  /** The name of the attribute to modify. Valid values: description | imdsSupport | launchPermission */
  Attribute?: string;
  /** A new description for the AMI. */
  Description?: AttributeValue;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Set to v2.0 to indicate that IMDSv2 is specified in the AMI. Instances launched from this AMI will have HttpTokens automatically set to required so that, by default, the instance requires that IMDSv2  */
  ImdsSupport?: AttributeValue;
  /** A new launch permission for the AMI. */
  LaunchPermission?: LaunchPermissionModifications;
  /** The operation type. This parameter can be used only when the Attribute parameter is launchPermission. */
  OperationType?: 'add' | 'remove';
  /** The Amazon Resource Name (ARN) of an organizational unit (OU). This parameter can be used only when the Attribute parameter is launchPermission. */
  OrganizationalUnitArns?: string[];
  /** The Amazon Resource Name (ARN) of an organization. This parameter can be used only when the Attribute parameter is launchPermission. */
  OrganizationArns?: string[];
  /** Not supported. */
  ProductCodes?: string[];
  /** The user groups. This parameter can be used only when the Attribute parameter is launchPermission. */
  UserGroups?: string[];
  /** The Amazon Web Services account IDs. This parameter can be used only when the Attribute parameter is launchPermission. */
  UserIds?: string[];
  /** The value of the attribute being modified. This parameter can be used only when the Attribute parameter is description or imdsSupport. */
  Value?: string;
}

export interface ModifyInstanceAttributeInput {
  /** The ID of the instance. */
  InstanceId: string;
  /** The name of the attribute to modify. When changing the instance type: If the original instance type is configured for configurable bandwidth, and the desired instance type doesn't support configurable */
  Attribute?: 'instanceType' | 'kernel' | 'ramdisk' | 'userData' | 'disableApiTermination' | 'instanceInitiatedShutdownBehavior' | 'rootDeviceName' | 'blockDeviceMapping' | 'productCodes' | 'sourceDestCheck' | 'groupSet' | 'ebsOptimized' | 'sriovNetSupport' | 'enaSupport' | 'enclaveOptions' | 'disableApiStop';
  /** Modifies the DeleteOnTermination attribute for volumes that are currently attached. The volume must be owned by the caller. If no value is specified for DeleteOnTermination, the default is true and th */
  BlockDeviceMappings?: InstanceBlockDeviceMappingSpecification[];
  /** Indicates whether an instance is enabled for stop protection. For more information, see Enable stop protection for your instance. */
  DisableApiStop?: AttributeBooleanValue;
  /** Enable or disable termination protection for the instance. If the value is true, you can't terminate the instance using the Amazon EC2 console, command line interface, or API. You can't enable termina */
  DisableApiTermination?: AttributeBooleanValue;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Specifies whether the instance is optimized for Amazon EBS I/O. This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide optimal EBS I/O performanc */
  EbsOptimized?: AttributeBooleanValue;
  /** Set to true to enable enhanced networking with ENA for the instance. This option is supported only for HVM instances. Specifying this option with a PV instance can make it unreachable. */
  EnaSupport?: AttributeBooleanValue;
  /** Replaces the security groups of the instance with the specified security groups. You must specify the ID of at least one security group, even if it's just the default security group for the VPC. */
  Groups?: string[];
  /** Specifies whether an instance stops or terminates when you initiate shutdown from the instance (using the operating system command for system shutdown). */
  InstanceInitiatedShutdownBehavior?: AttributeValue;
  /** Changes the instance type to the specified value. For more information, see Instance types in the Amazon EC2 User Guide. If the instance type is not valid, the error returned is InvalidInstanceAttribu */
  InstanceType?: AttributeValue;
  /** Changes the instance's kernel to the specified value. We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see PV-GRUB. */
  Kernel?: AttributeValue;
  /** Changes the instance's RAM disk to the specified value. We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see PV-GRUB. */
  Ramdisk?: AttributeValue;
  /** Enable or disable source/destination checks, which ensure that the instance is either the source or the destination of any traffic that it receives. If the value is true, source/destination checks are */
  SourceDestCheck?: AttributeBooleanValue;
  /** Set to simple to enable enhanced networking with the Intel 82599 Virtual Function interface for the instance. There is no way to disable enhanced networking with the Intel 82599 Virtual Function inter */
  SriovNetSupport?: AttributeValue;
  /** Changes the instance's user data to the specified value. User data must be base64-encoded. Depending on the tool or SDK that you're using, the base64-encoding might be performed for you. For more info */
  UserData?: BlobAttributeValue;
  /** A new value for the attribute. Use only with the kernel, ramdisk, userData, disableApiTermination, or instanceInitiatedShutdownBehavior attribute. */
  Value?: string;
}

export interface ModifyInstanceCapacityReservationAttributesInput {
  /** Information about the Capacity Reservation targeting option. */
  CapacityReservationSpecification: CapacityReservationSpecification;
  /** The ID of the instance to be modified. */
  InstanceId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyInstanceConnectEndpointInput {
  /** The ID of the EC2 Instance Connect Endpoint to modify. */
  InstanceConnectEndpointId: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The new IP address type for the EC2 Instance Connect Endpoint. PreserveClientIp is only supported on IPv4 EC2 Instance Connect Endpoints. To use PreserveClientIp, the value for IpAddressType must be i */
  IpAddressType?: 'ipv4' | 'dualstack' | 'ipv6';
  /** Indicates whether the client IP address is preserved as the source when you connect to a resource. The following are the possible values. true - Use the IP address of the client. Your instance must ha */
  PreserveClientIp?: boolean;
  /** Changes the security groups for the EC2 Instance Connect Endpoint. The new set of groups you specify replaces the current set. You must specify at least one group, even if it's just the default securi */
  SecurityGroupIds?: string[];
}

export interface ModifyInstanceCpuOptionsInput {
  /** The ID of the instance to update. */
  InstanceId: string;
  /** The number of CPU cores to activate for the specified instance. */
  CoreCount?: number;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Indicates whether to enable or disable nested virtualization for the instance. When nested virtualization is enabled, Virtual Secure Mode (VSM) is automatically disabled for the instance. */
  NestedVirtualization?: 'enabled' | 'disabled';
  /** The number of threads to run for each CPU core. */
  ThreadsPerCore?: number;
}

export interface ModifyInstanceCreditSpecificationInput {
  /** Information about the credit option for CPU usage. */
  InstanceCreditSpecifications: InstanceCreditSpecificationRequest[];
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface ModifyInstanceEventStartTimeInput {
  /** The ID of the event whose date and time you are modifying. */
  InstanceEventId: string;
  /** The ID of the instance with the scheduled event. */
  InstanceId: string;
  /** The new date and time when the event will take place. */
  NotBefore: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface ModifyInstanceEventWindowInput {
  /** The ID of the event window. */
  InstanceEventWindowId: string;
  /** The cron expression of the event window, for example, * 0-4,20-23 * * 1,5. Constraints: Only hour and day of the week values are supported. For day of the week values, you can specify either integers  */
  CronExpression?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The name of the event window. */
  Name?: string;
  /** The time ranges of the event window. */
  TimeRanges?: InstanceEventWindowTimeRangeRequest[];
}

export interface ModifyInstanceMaintenanceOptionsInput {
  /** The ID of the instance. */
  InstanceId: string;
  /** Disables the automatic recovery behavior of your instance or sets it to default. */
  AutoRecovery?: 'disabled' | 'default';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specifies whether to attempt reboot migration during a user-initiated reboot of an instance that has a scheduled system-reboot event: default - Amazon EC2 attempts to migrate the instance to new hardw */
  RebootMigration?: 'disabled' | 'default';
}

export interface ModifyInstanceMetadataDefaultsInput {
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Enables or disables the IMDS endpoint on an instance. When disabled, the instance metadata can't be accessed. */
  HttpEndpoint?: 'disabled' | 'enabled' | 'no-preference';
  /** The maximum number of hops that the metadata token can travel. To indicate no preference, specify -1. Possible values: Integers from 1 to 64, and -1 to indicate no preference */
  HttpPutResponseHopLimit?: number;
  /** Indicates whether IMDSv2 is required. optional – IMDSv2 is optional, which means that you can use either IMDSv2 or IMDSv1. required – IMDSv2 is required, which means that IMDSv1 is disabled, and you m */
  HttpTokens?: 'optional' | 'required' | 'no-preference';
  /** Enables or disables access to an instance's tags from the instance metadata. For more information, see View tags for your EC2 instances using instance metadata in the Amazon EC2 User Guide. */
  InstanceMetadataTags?: 'disabled' | 'enabled' | 'no-preference';
}

export interface ModifyInstanceMetadataOptionsInput {
  /** The ID of the instance. */
  InstanceId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Enables or disables the HTTP metadata endpoint on your instances. If this parameter is not specified, the existing state is maintained. If you specify a value of disabled, you cannot access your insta */
  HttpEndpoint?: 'disabled' | 'enabled';
  /** Enables or disables the IPv6 endpoint for the instance metadata service. Applies only if you enabled the HTTP metadata endpoint. */
  HttpProtocolIpv6?: 'disabled' | 'enabled';
  /** The desired HTTP PUT response hop limit for instance metadata requests. The larger the number, the further instance metadata requests can travel. If no parameter is specified, the existing state is ma */
  HttpPutResponseHopLimit?: number;
  /** Indicates whether IMDSv2 is required. optional - IMDSv2 is optional. You can choose whether to send a session token in your instance metadata retrieval requests. If you retrieve IAM role credentials w */
  HttpTokens?: 'optional' | 'required';
  /** Set to enabled to allow access to instance tags from the instance metadata. Set to disabled to turn off access to instance tags from the instance metadata. For more information, see View tags for your */
  InstanceMetadataTags?: 'disabled' | 'enabled';
}

export interface ModifyInstanceNetworkPerformanceOptionsInput {
  /** Specify the bandwidth weighting option to boost the associated type of baseline bandwidth, as follows: default This option uses the standard bandwidth configuration for your instance type. vpc-1 This  */
  BandwidthWeighting: 'default' | 'vpc-1' | 'ebs-1';
  /** The ID of the instance to update. */
  InstanceId: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface ModifyInstancePlacementInput {
  /** The ID of the instance that you are modifying. */
  InstanceId: string;
  /** The affinity setting for the instance. For more information, see Host affinity in the Amazon EC2 User Guide. */
  Affinity?: 'default' | 'host';
  /** The Group Id of a placement group. You must specify the Placement Group Group Id to launch an instance in a shared placement group. */
  GroupId?: string;
  /** The name of the placement group in which to place the instance. For spread placement groups, the instance must have a tenancy of default. For cluster and partition placement groups, the instance must  */
  GroupName?: string;
  /** The ID of the Dedicated Host with which to associate the instance. */
  HostId?: string;
  /** The ARN of the host resource group in which to place the instance. The instance must have a tenancy of host to specify this parameter. */
  HostResourceGroupArn?: string;
  /** The number of the partition in which to place the instance. Valid only if the placement group strategy is set to partition. */
  PartitionNumber?: number;
  /** The tenancy for the instance. For T3 instances, you must launch the instance on a Dedicated Host to use a tenancy of host. You can't change the tenancy from host to dedicated or default. Attempting to */
  Tenancy?: 'default' | 'dedicated' | 'host';
}

export interface ModifyIpamInput {
  /** The ID of the IPAM you want to modify. */
  IpamId: string;
  /** Choose the operating Regions for the IPAM. Operating Regions are Amazon Web Services Regions where the IPAM is allowed to manage IP address CIDRs. IPAM only discovers and monitors resources in the Ama */
  AddOperatingRegions?: AddIpamOperatingRegion[];
  /** The description of the IPAM you want to modify. */
  Description?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Enable this option to use your own GUA ranges as private IPv6 addresses. This option is disabled by default. */
  EnablePrivateGua?: boolean;
  /** A metered account is an Amazon Web Services account that is charged for active IP addresses managed in IPAM. For more information, see Enable cost distribution in the Amazon VPC IPAM User Guide. Possi */
  MeteredAccount?: 'ipam-owner' | 'resource-owner';
  /** The operating Regions to remove. */
  RemoveOperatingRegions?: RemoveIpamOperatingRegion[];
  /** IPAM is offered in a Free Tier and an Advanced Tier. For more information about the features available in each tier and the costs associated with the tiers, see Amazon VPC pricing > IPAM tab. */
  Tier?: 'free' | 'advanced';
}

export interface ModifyIpamPolicyAllocationRulesInput {
  /** The ID of the IPAM policy whose allocation rules you want to modify. */
  IpamPolicyId: string;
  /** The locale for which to modify the allocation rules. */
  Locale: string;
  /** The resource type for which to modify the allocation rules. The Amazon Web Services service or resource type that can use IP addresses through IPAM policies. Supported services and resource types incl */
  ResourceType: 'alb' | 'eip' | 'rds' | 'rnat';
  /** The new allocation rules to apply to the IPAM policy. Allocation rules are optional configurations within an IPAM policy that map Amazon Web Services resource types to specific IPAM pools. If no rules */
  AllocationRules?: IpamPolicyAllocationRuleRequest[];
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface ModifyIpamPoolInput {
  /** The ID of the IPAM pool you want to modify. */
  IpamPoolId: string;
  /** Add tag allocation rules to a pool. For more information about allocation rules, see Create a top-level pool in the Amazon VPC IPAM User Guide. */
  AddAllocationResourceTags?: RequestIpamResourceTag[];
  /** The default netmask length for allocations added to this pool. If, for example, the CIDR assigned to this pool is 10.0.0.0/8 and you enter 16 here, new allocations will default to 10.0.0.0/16. */
  AllocationDefaultNetmaskLength?: number;
  /** The maximum netmask length possible for CIDR allocations in this IPAM pool to be compliant. Possible netmask lengths for IPv4 addresses are 0 - 32. Possible netmask lengths for IPv6 addresses are 0 -  */
  AllocationMaxNetmaskLength?: number;
  /** The minimum netmask length required for CIDR allocations in this IPAM pool to be compliant. Possible netmask lengths for IPv4 addresses are 0 - 32. Possible netmask lengths for IPv6 addresses are 0 -  */
  AllocationMinNetmaskLength?: number;
  /** If true, IPAM will continuously look for resources within the CIDR range of this pool and automatically import them as allocations into your IPAM. The CIDRs that will be allocated for these resources  */
  AutoImport?: boolean;
  /** Clear the default netmask length allocation rule for this pool. */
  ClearAllocationDefaultNetmaskLength?: boolean;
  /** The description of the IPAM pool you want to modify. */
  Description?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Remove tag allocation rules from a pool. */
  RemoveAllocationResourceTags?: RequestIpamResourceTag[];
}

export interface ModifyIpamPrefixListResolverInput {
  /** The ID of the IPAM prefix list resolver to modify. */
  IpamPrefixListResolverId: string;
  /** A new description for the IPAM prefix list resolver. */
  Description?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The updated CIDR selection rules for the resolver. These rules replace the existing rules entirely. */
  Rules?: IpamPrefixListResolverRuleRequest[];
}

export interface ModifyIpamPrefixListResolverTargetInput {
  /** The ID of the IPAM prefix list resolver target to modify. */
  IpamPrefixListResolverTargetId: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** The desired version of the prefix list to target. This allows you to pin the target to a specific version. */
  DesiredVersion?: number;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Indicates whether the resolver target should automatically track the latest version of the prefix list. When enabled, the target will always synchronize with the most current version. Choose this for  */
  TrackLatestVersion?: boolean;
}

export interface ModifyIpamResourceCidrInput {
  /** The ID of the current scope that the resource CIDR is in. */
  CurrentIpamScopeId: string;
  /** Determines if the resource is monitored by IPAM. If a resource is monitored, the resource is discovered by IPAM and you can view details about the resource’s CIDR. */
  Monitored: boolean;
  /** The CIDR of the resource you want to modify. */
  ResourceCidr: string;
  /** The ID of the resource you want to modify. */
  ResourceId: string;
  /** The Amazon Web Services Region of the resource you want to modify. */
  ResourceRegion: string;
  /** The ID of the scope you want to transfer the resource CIDR to. */
  DestinationIpamScopeId?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface ModifyIpamResourceDiscoveryInput {
  /** A resource discovery ID. */
  IpamResourceDiscoveryId: string;
  /** Add operating Regions to the resource discovery. Operating Regions are Amazon Web Services Regions where the IPAM is allowed to manage IP address CIDRs. IPAM only discovers and monitors resources in t */
  AddOperatingRegions?: AddIpamOperatingRegion[];
  /** Add an Organizational Unit (OU) exclusion to your IPAM. If your IPAM is integrated with Amazon Web Services Organizations and you add an organizational unit (OU) exclusion, IPAM will not manage the IP */
  AddOrganizationalUnitExclusions?: AddIpamOrganizationalUnitExclusion[];
  /** A resource discovery description. */
  Description?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Remove operating Regions. */
  RemoveOperatingRegions?: RemoveIpamOperatingRegion[];
  /** Remove an Organizational Unit (OU) exclusion to your IPAM. If your IPAM is integrated with Amazon Web Services Organizations and you add an organizational unit (OU) exclusion, IPAM will not manage the */
  RemoveOrganizationalUnitExclusions?: RemoveIpamOrganizationalUnitExclusion[];
}

export interface ModifyIpamScopeInput {
  /** The ID of the scope you want to modify. */
  IpamScopeId: string;
  /** The description of the scope you want to modify. */
  Description?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The configuration that links an Amazon VPC IPAM scope to an external authority system. It specifies the type of external system and the external resource identifier that identifies your account or ins */
  ExternalAuthorityConfiguration?: ExternalAuthorityConfiguration;
  /** Remove the external authority configuration. true to remove. */
  RemoveExternalAuthorityConfiguration?: boolean;
}

export interface ModifyLaunchTemplateInput {
  /** Unique, case-sensitive identifier you provide to ensure the idempotency of the request. If a client token isn't specified, a randomly generated token is used in the request to ensure idempotency. For  */
  ClientToken?: string;
  /** The version number of the launch template to set as the default version. */
  DefaultVersion?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the launch template. You must specify either the launch template ID or the launch template name, but not both. */
  LaunchTemplateId?: string;
  /** The name of the launch template. You must specify either the launch template ID or the launch template name, but not both. */
  LaunchTemplateName?: string;
}

export interface ModifyLocalGatewayRouteInput {
  /** The ID of the local gateway route table. */
  LocalGatewayRouteTableId: string;
  /** The CIDR block used for destination matches. The value that you provide must match the CIDR of an existing route in the table. */
  DestinationCidrBlock?: string;
  /** The ID of the prefix list. Use a prefix list in place of DestinationCidrBlock. You cannot use DestinationPrefixListId and DestinationCidrBlock in the same request. */
  DestinationPrefixListId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the virtual interface group. */
  LocalGatewayVirtualInterfaceGroupId?: string;
  /** The ID of the network interface. */
  NetworkInterfaceId?: string;
}

export interface ModifyManagedPrefixListInput {
  /** The ID of the prefix list. */
  PrefixListId: string;
  /** One or more entries to add to the prefix list. */
  AddEntries?: AddPrefixListEntry[];
  /** The current version of the prefix list. */
  CurrentVersion?: number;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Indicates whether synchronization with an IPAM prefix list resolver should be enabled for this managed prefix list. When enabled, the prefix list CIDRs are automatically updated based on the associate */
  IpamPrefixListResolverSyncEnabled?: boolean;
  /** The maximum number of entries for the prefix list. You cannot modify the entries of a prefix list and modify the size of a prefix list at the same time. If any of the resources that reference the pref */
  MaxEntries?: number;
  /** A name for the prefix list. */
  PrefixListName?: string;
  /** One or more entries to remove from the prefix list. */
  RemoveEntries?: RemovePrefixListEntry[];
}

/** Contains the parameters for ModifyNetworkInterfaceAttribute. */
export interface ModifyNetworkInterfaceAttributeInput {
  /** The ID of the network interface. */
  NetworkInterfaceId: string;
  /** A list of subnet IDs to associate with the network interface. */
  AssociatedSubnetIds?: string[];
  /** Indicates whether to assign a public IPv4 address to a network interface. This option can be enabled for any network interface but will only apply to the primary network interface (eth0). */
  AssociatePublicIpAddress?: boolean;
  /** Information about the interface attachment. If modifying the delete on termination attribute, you must specify the ID of the interface attachment. */
  Attachment?: NetworkInterfaceAttachmentChanges;
  /** A connection tracking specification. */
  ConnectionTrackingSpecification?: ConnectionTrackingSpecificationRequest;
  /** A description for the network interface. */
  Description?: AttributeValue;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** If you’re modifying a network interface in a dual-stack or IPv6-only subnet, you have the option to assign a primary IPv6 IP address. A primary IPv6 address is an IPv6 GUA address associated with an E */
  EnablePrimaryIpv6?: boolean;
  /** Updates the ENA Express configuration for the network interface that’s attached to the instance. */
  EnaSrdSpecification?: EnaSrdSpecification;
  /** Changes the security groups for the network interface. The new set of groups you specify replaces the current set. You must specify at least one group, even if it's just the default security group in  */
  Groups?: string[];
  /** Enable or disable source/destination checks, which ensure that the instance is either the source or the destination of any traffic that it receives. If the value is true, source/destination checks are */
  SourceDestCheck?: AttributeBooleanValue;
}

export interface ModifyPrivateDnsNameOptionsInput {
  /** The ID of the instance. */
  InstanceId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Indicates whether to respond to DNS queries for instance hostnames with DNS AAAA records. */
  EnableResourceNameDnsAAAARecord?: boolean;
  /** Indicates whether to respond to DNS queries for instance hostnames with DNS A records. */
  EnableResourceNameDnsARecord?: boolean;
  /** The type of hostname for EC2 instances. For IPv4 only subnets, an instance DNS name must be based on the instance IPv4 address. For IPv6 only subnets, an instance DNS name must be based on the instanc */
  PrivateDnsHostnameType?: 'ip-name' | 'resource-name';
}

export interface ModifyPublicIpDnsNameOptionsInput {
  /** The public hostname type. For more information, see EC2 instance hostnames, DNS names, and domains in the Amazon EC2 User Guide. public-dual-stack-dns-name: A dual-stack public hostname for a network  */
  HostnameType: 'public-dual-stack-dns-name' | 'public-ipv4-dns-name' | 'public-ipv6-dns-name';
  /** A network interface ID. */
  NetworkInterfaceId: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

/** Contains the parameters for ModifyReservedInstances. */
export interface ModifyReservedInstancesInput {
  /** The IDs of the Reserved Instances to modify. */
  ReservedInstancesIds: string[];
  /** The configuration settings for the Reserved Instances to modify. */
  TargetConfigurations: ReservedInstancesConfiguration[];
  /** A unique, case-sensitive token you provide to ensure idempotency of your modification request. For more information, see Ensuring Idempotency. */
  ClientToken?: string;
}

export interface ModifyRouteServerInput {
  /** The ID of the route server to modify. */
  RouteServerId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Specifies whether to persist routes after all BGP sessions are terminated. enable: Routes will be persisted in FIB and RIB after all BGP sessions are terminated. disable: Routes will not be persisted  */
  PersistRoutes?: 'enable' | 'disable' | 'reset';
  /** The number of minutes a route server will wait after BGP is re-established to unpersist the routes in the FIB and RIB. Value must be in the range of 1-5. Required if PersistRoutes is enabled. If you s */
  PersistRoutesDuration?: number;
  /** Specifies whether to enable SNS notifications for route server events. Enabling SNS notifications persists BGP status changes to an SNS topic provisioned by Amazon Web Services. */
  SnsNotificationsEnabled?: boolean;
}

export interface ModifySecurityGroupRulesInput {
  /** The ID of the security group. */
  GroupId: string;
  /** Information about the security group properties to update. */
  SecurityGroupRules: SecurityGroupRuleUpdate[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifySnapshotAttributeInput {
  /** The ID of the snapshot. */
  SnapshotId: string;
  /** The snapshot attribute to modify. Only volume creation permissions can be modified. */
  Attribute?: 'productCodes' | 'createVolumePermission';
  /** A JSON representation of the snapshot attribute modification. */
  CreateVolumePermission?: CreateVolumePermissionModifications;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The group to modify for the snapshot. */
  GroupNames?: string[];
  /** The type of operation to perform to the attribute. */
  OperationType?: 'add' | 'remove';
  /** The account ID to modify for the snapshot. */
  UserIds?: string[];
}

export interface ModifySnapshotTierInput {
  /** The ID of the snapshot. */
  SnapshotId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The name of the storage tier. You must specify archive. */
  StorageTier?: 'archive';
}

/** Contains the parameters for ModifySpotFleetRequest. */
export interface ModifySpotFleetRequestInput {
  /** The ID of the Spot Fleet request. */
  SpotFleetRequestId: string;
  /** Reserved. */
  Context?: string;
  /** Indicates whether running instances should be terminated if the target capacity of the Spot Fleet request is decreased below the current size of the Spot Fleet. Supported only for fleets of type maint */
  ExcessCapacityTerminationPolicy?: 'noTermination' | 'default';
  /** The launch template and overrides. You can only use this parameter if you specified a launch template (LaunchTemplateConfigs) in your Spot Fleet request. If you specified LaunchSpecifications in your  */
  LaunchTemplateConfigs?: LaunchTemplateConfig[];
  /** The number of On-Demand Instances in the fleet. */
  OnDemandTargetCapacity?: number;
  /** The size of the fleet. */
  TargetCapacity?: number;
}

export interface ModifySubnetAttributeInput {
  /** The ID of the subnet. */
  SubnetId: string;
  /** Specify true to indicate that network interfaces created in the specified subnet should be assigned an IPv6 address. This includes a network interface that's created when launching an instance into th */
  AssignIpv6AddressOnCreation?: AttributeBooleanValue;
  /** The customer-owned IPv4 address pool associated with the subnet. You must set this value when you specify true for MapCustomerOwnedIpOnLaunch. */
  CustomerOwnedIpv4Pool?: string;
  /** Specify true to indicate that local network interfaces at the current position should be disabled. */
  DisableLniAtDeviceIndex?: AttributeBooleanValue;
  /** Indicates whether DNS queries made to the Amazon-provided DNS Resolver in this subnet should return synthetic IPv6 addresses for IPv4-only destinations. You must first configure a NAT gateway in a pub */
  EnableDns64?: AttributeBooleanValue;
  /** Indicates the device position for local network interfaces in this subnet. For example, 1 indicates local network interfaces in this subnet are the secondary network interface (eth1). A local network  */
  EnableLniAtDeviceIndex?: number;
  /** Indicates whether to respond to DNS queries for instance hostnames with DNS AAAA records. */
  EnableResourceNameDnsAAAARecordOnLaunch?: AttributeBooleanValue;
  /** Indicates whether to respond to DNS queries for instance hostnames with DNS A records. */
  EnableResourceNameDnsARecordOnLaunch?: AttributeBooleanValue;
  /** Specify true to indicate that network interfaces attached to instances created in the specified subnet should be assigned a customer-owned IPv4 address. When this value is true, you must specify the c */
  MapCustomerOwnedIpOnLaunch?: AttributeBooleanValue;
  /** Specify true to indicate that network interfaces attached to instances created in the specified subnet should be assigned a public IPv4 address. Amazon Web Services charges for all public IPv4 address */
  MapPublicIpOnLaunch?: AttributeBooleanValue;
  /** The type of hostname to assign to instances in the subnet at launch. For IPv4-only and dual-stack (IPv4 and IPv6) subnets, an instance DNS name can be based on the instance IPv4 address (ip-name) or t */
  PrivateDnsHostnameTypeOnLaunch?: 'ip-name' | 'resource-name';
}

export interface ModifyTrafficMirrorFilterNetworkServicesInput {
  /** The ID of the Traffic Mirror filter. */
  TrafficMirrorFilterId: string;
  /** The network service, for example Amazon DNS, that you want to mirror. */
  AddNetworkServices?: 'amazon-dns'[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The network service, for example Amazon DNS, that you no longer want to mirror. */
  RemoveNetworkServices?: 'amazon-dns'[];
}

export interface ModifyTrafficMirrorFilterRuleInput {
  /** The ID of the Traffic Mirror rule. */
  TrafficMirrorFilterRuleId: string;
  /** The description to assign to the Traffic Mirror rule. */
  Description?: string;
  /** The destination CIDR block to assign to the Traffic Mirror rule. */
  DestinationCidrBlock?: string;
  /** The destination ports that are associated with the Traffic Mirror rule. */
  DestinationPortRange?: TrafficMirrorPortRangeRequest;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The protocol, for example TCP, to assign to the Traffic Mirror rule. */
  Protocol?: number;
  /** The properties that you want to remove from the Traffic Mirror filter rule. When you remove a property from a Traffic Mirror filter rule, the property is set to the default. */
  RemoveFields?: 'destination-port-range' | 'source-port-range' | 'protocol' | 'description'[];
  /** The action to assign to the rule. */
  RuleAction?: 'accept' | 'reject';
  /** The number of the Traffic Mirror rule. This number must be unique for each Traffic Mirror rule in a given direction. The rules are processed in ascending order by rule number. */
  RuleNumber?: number;
  /** The source CIDR block to assign to the Traffic Mirror rule. */
  SourceCidrBlock?: string;
  /** The port range to assign to the Traffic Mirror rule. */
  SourcePortRange?: TrafficMirrorPortRangeRequest;
  /** The type of traffic to assign to the rule. */
  TrafficDirection?: 'ingress' | 'egress';
}

export interface ModifyTrafficMirrorSessionInput {
  /** The ID of the Traffic Mirror session. */
  TrafficMirrorSessionId: string;
  /** The description to assign to the Traffic Mirror session. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The number of bytes in each packet to mirror. These are bytes after the VXLAN header. To mirror a subset, set this to the length (in bytes) to mirror. For example, if you set this value to 100, then t */
  PacketLength?: number;
  /** The properties that you want to remove from the Traffic Mirror session. When you remove a property from a Traffic Mirror session, the property is set to the default. */
  RemoveFields?: 'packet-length' | 'description' | 'virtual-network-id'[];
  /** The session number determines the order in which sessions are evaluated when an interface is used by multiple sessions. The first session with a matching filter is the one that mirrors the packets. Va */
  SessionNumber?: number;
  /** The ID of the Traffic Mirror filter. */
  TrafficMirrorFilterId?: string;
  /** The Traffic Mirror target. The target must be in the same VPC as the source, or have a VPC peering connection with the source. */
  TrafficMirrorTargetId?: string;
  /** The virtual network ID of the Traffic Mirror session. */
  VirtualNetworkId?: number;
}

export interface ModifyTransitGatewayInput {
  /** The ID of the transit gateway. */
  TransitGatewayId: string;
  /** The description for the transit gateway. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The options to modify. */
  Options?: ModifyTransitGatewayOptions;
}

export interface ModifyTransitGatewayMeteringPolicyInput {
  /** The ID of the transit gateway metering policy to modify. */
  TransitGatewayMeteringPolicyId: string;
  /** The IDs of middlebox attachments to add to the metering policy. */
  AddMiddleboxAttachmentIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IDs of middlebox attachments to remove from the metering policy. */
  RemoveMiddleboxAttachmentIds?: string[];
}

export interface ModifyTransitGatewayPrefixListReferenceInput {
  /** The ID of the prefix list. */
  PrefixListId: string;
  /** The ID of the transit gateway route table. */
  TransitGatewayRouteTableId: string;
  /** Indicates whether to drop traffic that matches this route. */
  Blackhole?: boolean;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the attachment to which traffic is routed. */
  TransitGatewayAttachmentId?: string;
}

export interface ModifyTransitGatewayVpcAttachmentInput {
  /** The ID of the attachment. */
  TransitGatewayAttachmentId: string;
  /** The IDs of one or more subnets to add. You can specify at most one subnet per Availability Zone. */
  AddSubnetIds?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The new VPC attachment options. */
  Options?: ModifyTransitGatewayVpcAttachmentRequestOptions;
  /** The IDs of one or more subnets to remove. */
  RemoveSubnetIds?: string[];
}

export interface ModifyVerifiedAccessEndpointInput {
  /** The ID of the Verified Access endpoint. */
  VerifiedAccessEndpointId: string;
  /** The CIDR options. */
  CidrOptions?: ModifyVerifiedAccessEndpointCidrOptions;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the Verified Access endpoint. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The load balancer details if creating the Verified Access endpoint as load-balancertype. */
  LoadBalancerOptions?: ModifyVerifiedAccessEndpointLoadBalancerOptions;
  /** The network interface options. */
  NetworkInterfaceOptions?: ModifyVerifiedAccessEndpointEniOptions;
  /** The RDS options. */
  RdsOptions?: ModifyVerifiedAccessEndpointRdsOptions;
  /** The ID of the Verified Access group. */
  VerifiedAccessGroupId?: string;
}

export interface ModifyVerifiedAccessEndpointPolicyInput {
  /** The ID of the Verified Access endpoint. */
  VerifiedAccessEndpointId: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The Verified Access policy document. */
  PolicyDocument?: string;
  /** The status of the Verified Access policy. */
  PolicyEnabled?: boolean;
  /** The options for server side encryption. */
  SseSpecification?: VerifiedAccessSseSpecificationRequest;
}

export interface ModifyVerifiedAccessGroupInput {
  /** The ID of the Verified Access group. */
  VerifiedAccessGroupId: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the Verified Access group. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the Verified Access instance. */
  VerifiedAccessInstanceId?: string;
}

export interface ModifyVerifiedAccessGroupPolicyInput {
  /** The ID of the Verified Access group. */
  VerifiedAccessGroupId: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The Verified Access policy document. */
  PolicyDocument?: string;
  /** The status of the Verified Access policy. */
  PolicyEnabled?: boolean;
  /** The options for server side encryption. */
  SseSpecification?: VerifiedAccessSseSpecificationRequest;
}

export interface ModifyVerifiedAccessInstanceInput {
  /** The ID of the Verified Access instance. */
  VerifiedAccessInstanceId: string;
  /** The custom subdomain. */
  CidrEndpointsCustomSubDomain?: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the Verified Access instance. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyVerifiedAccessInstanceLoggingConfigurationInput {
  /** The configuration options for Verified Access instances. */
  AccessLogs: VerifiedAccessLogOptions;
  /** The ID of the Verified Access instance. */
  VerifiedAccessInstanceId: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyVerifiedAccessTrustProviderInput {
  /** The ID of the Verified Access trust provider. */
  VerifiedAccessTrustProviderId: string;
  /** A unique, case-sensitive token that you provide to ensure idempotency of your modification request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A description for the Verified Access trust provider. */
  Description?: string;
  /** The options for a device-based trust provider. This parameter is required when the provider type is device. */
  DeviceOptions?: ModifyVerifiedAccessTrustProviderDeviceOptions;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The OpenID Connect (OIDC) options. */
  NativeApplicationOidcOptions?: ModifyVerifiedAccessNativeApplicationOidcOptions;
  /** The options for an OpenID Connect-compatible user-identity trust provider. */
  OidcOptions?: ModifyVerifiedAccessTrustProviderOidcOptions;
  /** The options for server side encryption. */
  SseSpecification?: VerifiedAccessSseSpecificationRequest;
}

export interface ModifyVolumeInput {
  /** The ID of the volume. */
  VolumeId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The target IOPS rate of the volume. This parameter is valid only for gp3, io1, and io2 volumes. The following are the supported values for each volume type: gp3: 3,000 - 80,000 IOPS io1: 100 - 64,000  */
  Iops?: number;
  /** Specifies whether to enable Amazon EBS Multi-Attach. If you enable Multi-Attach, you can attach the volume to up to 16 Nitro-based instances in the same Availability Zone. This parameter is supported  */
  MultiAttachEnabled?: boolean;
  /** The target size of the volume, in GiB. The target volume size must be greater than or equal to the existing size of the volume. The following are the supported volumes sizes for each volume type: gp2: */
  Size?: number;
  /** The target throughput of the volume, in MiB/s. This parameter is valid only for gp3 volumes. The maximum value is 2,000. Default: The existing value is retained if the source and target volume type is */
  Throughput?: number;
  /** The target EBS volume type of the volume. For more information, see Amazon EBS volume types in the Amazon EBS User Guide. Default: The existing type is retained. */
  VolumeType?: 'standard' | 'io1' | 'io2' | 'gp2' | 'sc1' | 'st1' | 'gp3';
}

export interface ModifyVolumeAttributeInput {
  /** The ID of the volume. */
  VolumeId: string;
  /** Indicates whether the volume should be auto-enabled for I/O operations. */
  AutoEnableIO?: AttributeBooleanValue;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyVpcAttributeInput {
  /** The ID of the VPC. */
  VpcId: string;
  /** Indicates whether the instances launched in the VPC get DNS hostnames. If enabled, instances in the VPC get DNS hostnames; otherwise, they do not. You cannot modify the DNS resolution and DNS hostname */
  EnableDnsHostnames?: AttributeBooleanValue;
  /** Indicates whether the DNS resolution is supported for the VPC. If enabled, queries to the Amazon provided DNS server at the 169.254.169.253 IP address, or the reserved IP address at the base of the VP */
  EnableDnsSupport?: AttributeBooleanValue;
  /** Indicates whether Network Address Usage metrics are enabled for your VPC. */
  EnableNetworkAddressUsageMetrics?: AttributeBooleanValue;
}

export interface ModifyVpcBlockPublicAccessExclusionInput {
  /** The ID of an exclusion. */
  ExclusionId: string;
  /** The exclusion mode for internet gateway traffic. allow-bidirectional: Allow all internet traffic to and from the excluded VPCs and subnets. allow-egress: Allow outbound internet traffic from the exclu */
  InternetGatewayExclusionMode: 'allow-bidirectional' | 'allow-egress';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyVpcBlockPublicAccessOptionsInput {
  /** The mode of VPC BPA. off: VPC BPA is not enabled and traffic is allowed to and from internet gateways and egress-only internet gateways in this Region. block-bidirectional: Block all traffic to and fr */
  InternetGatewayBlockMode: 'off' | 'block-bidirectional' | 'block-ingress';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyVpcEncryptionControlInput {
  /** The ID of the VPC Encryption Control resource to modify. */
  VpcEncryptionControlId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specifies whether to exclude egress-only internet gateway traffic from encryption enforcement. */
  EgressOnlyInternetGatewayExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude Elastic File System traffic from encryption enforcement. */
  ElasticFileSystemExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude internet gateway traffic from encryption enforcement. */
  InternetGatewayExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude Lambda function traffic from encryption enforcement. */
  LambdaExclusion?: 'enable' | 'disable';
  /** The encryption mode for the VPC Encryption Control configuration. */
  Mode?: 'monitor' | 'enforce';
  /** Specifies whether to exclude NAT gateway traffic from encryption enforcement. */
  NatGatewayExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude virtual private gateway traffic from encryption enforcement. */
  VirtualPrivateGatewayExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude VPC Lattice traffic from encryption enforcement. */
  VpcLatticeExclusion?: 'enable' | 'disable';
  /** Specifies whether to exclude VPC peering connection traffic from encryption enforcement. */
  VpcPeeringExclusion?: 'enable' | 'disable';
}

export interface ModifyVpcEndpointInput {
  /** The ID of the endpoint. */
  VpcEndpointId: string;
  /** (Gateway endpoint) The IDs of the route tables to associate with the endpoint. */
  AddRouteTableIds?: string[];
  /** (Interface endpoint) The IDs of the security groups to associate with the endpoint network interfaces. */
  AddSecurityGroupIds?: string[];
  /** (Interface and Gateway Load Balancer endpoints) The IDs of the subnets in which to serve the endpoint. For a Gateway Load Balancer endpoint, you can specify only one subnet. */
  AddSubnetIds?: string[];
  /** The DNS options for the endpoint. */
  DnsOptions?: DnsOptionsSpecification;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IP address type for the endpoint. */
  IpAddressType?: 'ipv4' | 'dualstack' | 'ipv6';
  /** (Interface and gateway endpoints) A policy to attach to the endpoint that controls access to the service. The policy must be in valid JSON format. */
  PolicyDocument?: string;
  /** (Interface endpoint) Indicates whether a private hosted zone is associated with the VPC. */
  PrivateDnsEnabled?: boolean;
  /** (Gateway endpoint) The IDs of the route tables to disassociate from the endpoint. */
  RemoveRouteTableIds?: string[];
  /** (Interface endpoint) The IDs of the security groups to disassociate from the endpoint network interfaces. */
  RemoveSecurityGroupIds?: string[];
  /** (Interface endpoint) The IDs of the subnets from which to remove the endpoint. */
  RemoveSubnetIds?: string[];
  /** (Gateway endpoint) Specify true to reset the policy document to the default policy. The default policy allows full access to the service. */
  ResetPolicy?: boolean;
  /** The subnet configurations for the endpoint. */
  SubnetConfigurations?: SubnetConfiguration[];
}

export interface ModifyVpcEndpointConnectionNotificationInput {
  /** The ID of the notification. */
  ConnectionNotificationId: string;
  /** The events for the endpoint. Valid values are Accept, Connect, Delete, and Reject. */
  ConnectionEvents?: string[];
  /** The ARN for the SNS topic for the notification. */
  ConnectionNotificationArn?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyVpcEndpointServiceConfigurationInput {
  /** The ID of the service. */
  ServiceId: string;
  /** Indicates whether requests to create an endpoint to the service must be accepted. */
  AcceptanceRequired?: boolean;
  /** The Amazon Resource Names (ARNs) of Gateway Load Balancers to add to the service configuration. */
  AddGatewayLoadBalancerArns?: string[];
  /** The Amazon Resource Names (ARNs) of Network Load Balancers to add to the service configuration. */
  AddNetworkLoadBalancerArns?: string[];
  /** The IP address types to add to the service configuration. */
  AddSupportedIpAddressTypes?: string[];
  /** The supported Regions to add to the service configuration. */
  AddSupportedRegions?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** (Interface endpoint configuration) The private DNS name to assign to the endpoint service. */
  PrivateDnsName?: string;
  /** The Amazon Resource Names (ARNs) of Gateway Load Balancers to remove from the service configuration. */
  RemoveGatewayLoadBalancerArns?: string[];
  /** The Amazon Resource Names (ARNs) of Network Load Balancers to remove from the service configuration. */
  RemoveNetworkLoadBalancerArns?: string[];
  /** (Interface endpoint configuration) Removes the private DNS name of the endpoint service. */
  RemovePrivateDnsName?: boolean;
  /** The IP address types to remove from the service configuration. */
  RemoveSupportedIpAddressTypes?: string[];
  /** The supported Regions to remove from the service configuration. */
  RemoveSupportedRegions?: string[];
}

export interface ModifyVpcEndpointServicePayerResponsibilityInput {
  /** The entity that is responsible for the endpoint costs. The default is the endpoint owner. If you set the payer responsibility to the service owner, you cannot set it back to the endpoint owner. */
  PayerResponsibility: 'ServiceOwner';
  /** The ID of the service. */
  ServiceId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyVpcEndpointServicePermissionsInput {
  /** The ID of the service. */
  ServiceId: string;
  /** The Amazon Resource Names (ARN) of the principals. Permissions are granted to the principals in this list. To grant permissions to all principals, specify an asterisk (*). */
  AddAllowedPrincipals?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The Amazon Resource Names (ARN) of the principals. Permissions are revoked for principals in this list. */
  RemoveAllowedPrincipals?: string[];
}

export interface ModifyVpcPeeringConnectionOptionsInput {
  /** The ID of the VPC peering connection. */
  VpcPeeringConnectionId: string;
  /** The VPC peering connection options for the accepter VPC. */
  AccepterPeeringConnectionOptions?: PeeringConnectionOptionsRequest;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The VPC peering connection options for the requester VPC. */
  RequesterPeeringConnectionOptions?: PeeringConnectionOptionsRequest;
}

export interface ModifyVpcTenancyInput {
  /** The instance tenancy attribute for the VPC. */
  InstanceTenancy: 'default';
  /** The ID of the VPC. */
  VpcId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyVpnConnectionInput {
  /** The ID of the VPN connection. */
  VpnConnectionId: string;
  /** The ID of the customer gateway at your end of the VPN connection. */
  CustomerGatewayId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the transit gateway. */
  TransitGatewayId?: string;
  /** The ID of the virtual private gateway at the Amazon Web Services side of the VPN connection. */
  VpnGatewayId?: string;
}

export interface ModifyVpnConnectionOptionsInput {
  /** The ID of the Site-to-Site VPN connection. */
  VpnConnectionId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IPv4 CIDR on the customer gateway (on-premises) side of the VPN connection. Default: 0.0.0.0/0 */
  LocalIpv4NetworkCidr?: string;
  /** The IPv6 CIDR on the customer gateway (on-premises) side of the VPN connection. Default: ::/0 */
  LocalIpv6NetworkCidr?: string;
  /** The IPv4 CIDR on the Amazon Web Services side of the VPN connection. Default: 0.0.0.0/0 */
  RemoteIpv4NetworkCidr?: string;
  /** The IPv6 CIDR on the Amazon Web Services side of the VPN connection. Default: ::/0 */
  RemoteIpv6NetworkCidr?: string;
}

export interface ModifyVpnTunnelCertificateInput {
  /** The ID of the Amazon Web Services Site-to-Site VPN connection. */
  VpnConnectionId: string;
  /** The external IP address of the VPN tunnel. */
  VpnTunnelOutsideIpAddress: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ModifyVpnTunnelOptionsInput {
  /** The tunnel options to modify. */
  TunnelOptions: ModifyVpnTunnelOptionsSpecification;
  /** The ID of the Amazon Web Services Site-to-Site VPN connection. */
  VpnConnectionId: string;
  /** The external IP address of the VPN tunnel. */
  VpnTunnelOutsideIpAddress: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specifies the storage mode for the pre-shared key (PSK). Valid values are Standard (stored in Site-to-Site VPN service) or SecretsManager (stored in Amazon Web Services Secrets Manager). */
  PreSharedKeyStorage?: string;
  /** Choose whether or not to trigger immediate tunnel replacement. This is only applicable when turning on or off EnableTunnelLifecycleControl. Valid values: True | False */
  SkipTunnelReplacement?: boolean;
}

export interface MonitorInstancesInput {
  /** The IDs of the instances. */
  InstanceIds: string[];
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface MoveAddressToVpcInput {
  /** The Elastic IP address. */
  PublicIp: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface MoveByoipCidrToIpamInput {
  /** The BYOIP CIDR. */
  Cidr: string;
  /** The IPAM pool ID. */
  IpamPoolId: string;
  /** The Amazon Web Services account ID of the owner of the IPAM pool. */
  IpamPoolOwner: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface MoveCapacityReservationInstancesInput {
  /** The ID of the Capacity Reservation that you want to move capacity into. */
  DestinationCapacityReservationId: string;
  /** The number of instances that you want to move from the source Capacity Reservation. */
  InstanceCount: number;
  /** The ID of the Capacity Reservation from which you want to move capacity. */
  SourceCapacityReservationId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensure Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ProvisionByoipCidrInput {
  /** The public IPv4 or IPv6 address range, in CIDR notation. The most specific IPv4 prefix that you can specify is /24. The most specific IPv6 address range that you can bring is /48 for CIDRs that are pu */
  Cidr: string;
  /** A signed document that proves that you are authorized to bring the specified IP address range to Amazon using BYOIP. */
  CidrAuthorizationContext?: CidrAuthorizationContext;
  /** A description for the address range and the address pool. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Reserved. */
  MultiRegion?: boolean;
  /** If you have Local Zones enabled, you can choose a network border group for Local Zones when you provision and advertise a BYOIPv4 CIDR. Choose the network border group carefully as the EIP and the Ama */
  NetworkBorderGroup?: string;
  /** The tags to apply to the address pool. */
  PoolTagSpecifications?: TagSpecification[];
  /** (IPv6 only) Indicate whether the address range will be publicly advertised to the internet. Default: true */
  PubliclyAdvertisable?: boolean;
}

export interface ProvisionIpamByoasnInput {
  /** A public 2-byte or 4-byte ASN. */
  Asn: string;
  /** An ASN authorization context. */
  AsnAuthorizationContext: AsnAuthorizationContext;
  /** An IPAM ID. */
  IpamId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ProvisionIpamPoolCidrInput {
  /** The ID of the IPAM pool to which you want to assign a CIDR. */
  IpamPoolId: string;
  /** The CIDR you want to assign to the IPAM pool. Either "NetmaskLength" or "Cidr" is required. This value will be null if you specify "NetmaskLength" and will be filled in during the provisioning process */
  Cidr?: string;
  /** A signed document that proves that you are authorized to bring a specified IP address range to Amazon using BYOIP. This option only applies to IPv4 and IPv6 pools in the public scope. */
  CidrAuthorizationContext?: IpamCidrAuthorizationContext;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency. */
  ClientToken?: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Verification token ID. This option only applies to IPv4 and IPv6 pools in the public scope. */
  IpamExternalResourceVerificationTokenId?: string;
  /** The netmask length of the CIDR you'd like to provision to a pool. Can be used for provisioning Amazon-provided IPv6 CIDRs to top-level pools and for provisioning CIDRs to pools with source pools. Cann */
  NetmaskLength?: number;
  /** The method for verifying control of a public IP address range. Defaults to remarks-x509 if not specified. This option only applies to IPv4 and IPv6 pools in the public scope. */
  VerificationMethod?: 'remarks-x509' | 'dns-token';
}

export interface ProvisionPublicIpv4PoolCidrInput {
  /** The ID of the IPAM pool you would like to use to allocate this CIDR. */
  IpamPoolId: string;
  /** The netmask length of the CIDR you would like to allocate to the public IPv4 pool. The least specific netmask length you can define is 24. */
  NetmaskLength: number;
  /** The ID of the public IPv4 pool you would like to use for this CIDR. */
  PoolId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The Availability Zone (AZ) or Local Zone (LZ) network border group that the resource that the IP address is assigned to is in. Defaults to an AZ network border group. For more information on available */
  NetworkBorderGroup?: string;
}

export interface PurchaseCapacityBlockInput {
  /** The ID of the Capacity Block offering. */
  CapacityBlockOfferingId: string;
  /** The type of operating system for which to reserve capacity. */
  InstancePlatform: 'Linux/UNIX' | 'Red Hat Enterprise Linux' | 'SUSE Linux' | 'Windows' | 'Windows with SQL Server' | 'Windows with SQL Server Enterprise' | 'Windows with SQL Server Standard' | 'Windows with SQL Server Web' | 'Linux with SQL Server Standard' | 'Linux with SQL Server Web' | 'Linux with SQL Server Enterprise' | 'RHEL with SQL Server Standard' | 'RHEL with SQL Server Enterprise' | 'RHEL with SQL Server Web' | 'RHEL with HA' | 'RHEL with HA and SQL Server Standard' | 'RHEL with HA and SQL Server Enterprise' | 'Ubuntu Pro';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to apply to the Capacity Block during launch. */
  TagSpecifications?: TagSpecification[];
}

export interface PurchaseCapacityBlockExtensionInput {
  /** The ID of the Capacity Block extension offering to purchase. */
  CapacityBlockExtensionOfferingId: string;
  /** The ID of the Capacity reservation to be extended. */
  CapacityReservationId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface PurchaseHostReservationInput {
  /** The IDs of the Dedicated Hosts with which the reservation will be associated. */
  HostIdSet: string[];
  /** The ID of the offering. */
  OfferingId: string;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring Idempotency. */
  ClientToken?: string;
  /** The currency in which the totalUpfrontPrice, LimitPrice, and totalHourlyPrice amounts are specified. At this time, the only supported currency is USD. */
  CurrencyCode?: 'USD';
  /** The specified limit is checked against the total upfront cost of the reservation (calculated as the offering's upfront cost multiplied by the host count). If the total upfront cost is greater than the */
  LimitPrice?: string;
  /** The tags to apply to the Dedicated Host Reservation during purchase. */
  TagSpecifications?: TagSpecification[];
}

/** Contains the parameters for PurchaseReservedInstancesOffering. */
export interface PurchaseReservedInstancesOfferingInput {
  /** The number of Reserved Instances to purchase. */
  InstanceCount: number;
  /** The ID of the Reserved Instance offering to purchase. */
  ReservedInstancesOfferingId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Specified for Reserved Instance Marketplace offerings to limit the total order and ensure that the Reserved Instances are not purchased at unexpected prices. */
  LimitPrice?: ReservedInstanceLimitPrice;
  /** The time at which to purchase the Reserved Instance, in UTC format (for example, YYYY-MM-DDTHH:MM:SSZ). */
  PurchaseTime?: string;
}

/** Contains the parameters for PurchaseScheduledInstances. */
export interface PurchaseScheduledInstancesInput {
  /** The purchase requests. */
  PurchaseRequests: PurchaseRequest[];
  /** Unique, case-sensitive identifier that ensures the idempotency of the request. For more information, see Ensuring Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface RebootInstancesInput {
  /** The instance IDs. */
  InstanceIds: string[];
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

/** Contains the parameters for RegisterImage. */
export interface RegisterImageInput {
  /** A name for your AMI. Constraints: 3-128 alphanumeric characters, parentheses (()), square brackets ([]), spaces ( ), periods (.), slashes (/), dashes (-), single quotes ('), at-signs (@), or underscor */
  Name: string;
  /** The architecture of the AMI. Default: For Amazon EBS-backed AMIs, i386. For instance store-backed AMIs, the architecture specified in the manifest file. */
  Architecture?: 'i386' | 'x86_64' | 'arm64' | 'x86_64_mac' | 'arm64_mac';
  /** The billing product codes. Your account must be authorized to specify billing product codes. If your account is not authorized to specify billing product codes, you can publish AMIs that include billa */
  BillingProducts?: string[];
  /** The block device mapping entries. If you specify an Amazon EBS volume using the ID of an Amazon EBS snapshot, you can't specify the encryption state of the volume. If you create an AMI on an Outpost,  */
  BlockDeviceMappings?: BlockDeviceMapping[];
  /** The boot mode of the AMI. A value of uefi-preferred indicates that the AMI supports both UEFI and Legacy BIOS. The operating system contained in the AMI must be configured to support the specified boo */
  BootMode?: 'legacy-bios' | 'uefi' | 'uefi-preferred';
  /** A description for your AMI. */
  Description?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Set to true to enable enhanced networking with ENA for the AMI and any instances that you launch from the AMI. This option is supported only for HVM AMIs. Specifying this option with a PV AMI can make */
  EnaSupport?: boolean;
  /** The full path to your AMI manifest in Amazon S3 storage. The specified bucket must have the aws-exec-read canned access control list (ACL) to ensure that it can be accessed by Amazon EC2. For more inf */
  ImageLocation?: string;
  /** Set to v2.0 to indicate that IMDSv2 is specified in the AMI. Instances launched from this AMI will have HttpTokens automatically set to required so that, by default, the instance requires that IMDSv2  */
  ImdsSupport?: 'v2.0';
  /** The ID of the kernel. */
  KernelId?: string;
  /** The ID of the RAM disk. */
  RamdiskId?: string;
  /** The device name of the root device volume (for example, /dev/sda1). */
  RootDeviceName?: string;
  /** Set to simple to enable enhanced networking with the Intel 82599 Virtual Function interface for the AMI and any instances that you launch from the AMI. There is no way to disable sriovNetSupport at th */
  SriovNetSupport?: string;
  /** The tags to apply to the AMI. To tag the AMI, the value for ResourceType must be image. If you specify another value for ResourceType, the request fails. To tag an AMI after it has been registered, se */
  TagSpecifications?: TagSpecification[];
  /** Set to v2.0 to enable Trusted Platform Module (TPM) support. For more information, see NitroTPM in the Amazon EC2 User Guide. */
  TpmSupport?: 'v2.0';
  /** Base64 representation of the non-volatile UEFI variable store. To retrieve the UEFI data, use the GetInstanceUefiData command. You can inspect and modify the UEFI data by using the python-uefivars too */
  UefiData?: string;
  /** The type of virtualization (hvm | paravirtual). Default: paravirtual */
  VirtualizationType?: string;
}

export interface RegisterInstanceEventNotificationAttributesInput {
  /** Information about the tag keys to register. */
  InstanceTagAttribute: RegisterInstanceTagAttributeRequest;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface RegisterTransitGatewayMulticastGroupMembersInput {
  /** The group members' network interface IDs to register with the transit gateway multicast group. */
  NetworkInterfaceIds: string[];
  /** The ID of the transit gateway multicast domain. */
  TransitGatewayMulticastDomainId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IP address assigned to the transit gateway multicast group. */
  GroupIpAddress?: string;
}

export interface RegisterTransitGatewayMulticastGroupSourcesInput {
  /** The group sources' network interface IDs to register with the transit gateway multicast group. */
  NetworkInterfaceIds: string[];
  /** The ID of the transit gateway multicast domain. */
  TransitGatewayMulticastDomainId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IP address assigned to the transit gateway multicast group. */
  GroupIpAddress?: string;
}

export interface RejectCapacityReservationBillingOwnershipInput {
  /** The ID of the Capacity Reservation for which to reject the request. */
  CapacityReservationId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface RejectTransitGatewayMulticastDomainAssociationsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The IDs of the subnets to associate with the transit gateway multicast domain. */
  SubnetIds?: string[];
  /** The ID of the transit gateway attachment. */
  TransitGatewayAttachmentId?: string;
  /** The ID of the transit gateway multicast domain. */
  TransitGatewayMulticastDomainId?: string;
}

export interface RejectTransitGatewayPeeringAttachmentInput {
  /** The ID of the transit gateway peering attachment. */
  TransitGatewayAttachmentId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface RejectTransitGatewayVpcAttachmentInput {
  /** The ID of the attachment. */
  TransitGatewayAttachmentId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface RejectVpcEndpointConnectionsInput {
  /** The ID of the service. */
  ServiceId: string;
  /** The IDs of the VPC endpoints. */
  VpcEndpointIds: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface RejectVpcPeeringConnectionInput {
  /** The ID of the VPC peering connection. */
  VpcPeeringConnectionId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ReleaseAddressInput {
  /** The allocation ID. This parameter is required. */
  AllocationId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The set of Availability Zones, Local Zones, or Wavelength Zones from which Amazon Web Services advertises IP addresses. If you provide an incorrect network border group, you receive an InvalidAddress. */
  NetworkBorderGroup?: string;
  /** Deprecated. */
  PublicIp?: string;
}

export interface ReleaseHostsInput {
  /** The IDs of the Dedicated Hosts to release. */
  HostIds: string[];
}

export interface ReleaseIpamPoolAllocationInput {
  /** The CIDR of the allocation you want to release. */
  Cidr: string;
  /** The ID of the allocation. */
  IpamPoolAllocationId: string;
  /** The ID of the IPAM pool which contains the allocation you want to release. */
  IpamPoolId: string;
  /** A check for whether you have the required permissions for the action without actually making the request and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface ReplaceIamInstanceProfileAssociationInput {
  /** The ID of the existing IAM instance profile association. */
  AssociationId: string;
  /** The IAM instance profile. */
  IamInstanceProfile: IamInstanceProfileSpecification;
}

export interface ReplaceImageCriteriaInAllowedImagesSettingsInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The list of criteria that are evaluated to determine whether AMIs are discoverable and usable in the account in the specified Amazon Web Services Region. */
  ImageCriteria?: ImageCriterionRequest[];
}

export interface ReplaceNetworkAclAssociationInput {
  /** The ID of the current association between the original network ACL and the subnet. */
  AssociationId: string;
  /** The ID of the new network ACL to associate with the subnet. */
  NetworkAclId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ReplaceNetworkAclEntryInput {
  /** Indicates whether to replace the egress rule. Default: If no value is specified, we replace the ingress rule. */
  Egress: boolean;
  /** The ID of the ACL. */
  NetworkAclId: string;
  /** The protocol number. A value of "-1" means all protocols. If you specify "-1" or a protocol number other than "6" (TCP), "17" (UDP), or "1" (ICMP), traffic on all ports is allowed, regardless of any p */
  Protocol: string;
  /** Indicates whether to allow or deny the traffic that matches the rule. */
  RuleAction: 'allow' | 'deny';
  /** The rule number of the entry to replace. */
  RuleNumber: number;
  /** The IPv4 network range to allow or deny, in CIDR notation (for example 172.16.0.0/24). */
  CidrBlock?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** ICMP protocol: The ICMP or ICMPv6 type and code. Required if specifying protocol 1 (ICMP) or protocol 58 (ICMPv6) with an IPv6 CIDR block. */
  IcmpTypeCode?: IcmpTypeCode;
  /** The IPv6 network range to allow or deny, in CIDR notation (for example 2001:bd8:1234:1a00::/64). */
  Ipv6CidrBlock?: string;
  /** TCP or UDP protocols: The range of ports the rule applies to. Required if specifying protocol 6 (TCP) or 17 (UDP). */
  PortRange?: PortRange;
}

export interface ReplaceRouteInput {
  /** The ID of the route table. */
  RouteTableId: string;
  /** [IPv4 traffic only] The ID of a carrier gateway. */
  CarrierGatewayId?: string;
  /** The Amazon Resource Name (ARN) of the core network. */
  CoreNetworkArn?: string;
  /** The IPv4 CIDR address block used for the destination match. The value that you provide must match the CIDR of an existing route in the table. */
  DestinationCidrBlock?: string;
  /** The IPv6 CIDR address block used for the destination match. The value that you provide must match the CIDR of an existing route in the table. */
  DestinationIpv6CidrBlock?: string;
  /** The ID of the prefix list for the route. */
  DestinationPrefixListId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** [IPv6 traffic only] The ID of an egress-only internet gateway. */
  EgressOnlyInternetGatewayId?: string;
  /** The ID of an internet gateway or virtual private gateway. */
  GatewayId?: string;
  /** The ID of a NAT instance in your VPC. */
  InstanceId?: string;
  /** The ID of the local gateway. */
  LocalGatewayId?: string;
  /** Specifies whether to reset the local route to its default target (local). */
  LocalTarget?: boolean;
  /** [IPv4 traffic only] The ID of a NAT gateway. */
  NatGatewayId?: string;
  /** The ID of a network interface. */
  NetworkInterfaceId?: string;
  /** The Amazon Resource Name (ARN) of the ODB network. */
  OdbNetworkArn?: string;
  /** The ID of a transit gateway. */
  TransitGatewayId?: string;
  /** The ID of a VPC endpoint. Supported for Gateway Load Balancer endpoints only. */
  VpcEndpointId?: string;
  /** The ID of a VPC peering connection. */
  VpcPeeringConnectionId?: string;
}

export interface ReplaceRouteTableAssociationInput {
  /** The association ID. */
  AssociationId: string;
  /** The ID of the new route table to associate with the subnet. */
  RouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ReplaceTransitGatewayRouteInput {
  /** The CIDR range used for the destination match. Routing decisions are based on the most specific match. */
  DestinationCidrBlock: string;
  /** The ID of the route table. */
  TransitGatewayRouteTableId: string;
  /** Indicates whether traffic matching this route is to be dropped. */
  Blackhole?: boolean;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the attachment. */
  TransitGatewayAttachmentId?: string;
}

export interface ReplaceVpnTunnelInput {
  /** The ID of the Site-to-Site VPN connection. */
  VpnConnectionId: string;
  /** The external IP address of the VPN tunnel. */
  VpnTunnelOutsideIpAddress: string;
  /** Trigger pending tunnel endpoint maintenance. */
  ApplyPendingMaintenance?: boolean;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ReportInstanceStatusInput {
  /** The instances. */
  Instances: string[];
  /** The reason codes that describe the health state of your instance. instance-stuck-in-state: My instance is stuck in a state. unresponsive: My instance is unresponsive. not-accepting-credentials: My ins */
  ReasonCodes: 'instance-stuck-in-state' | 'unresponsive' | 'not-accepting-credentials' | 'password-not-available' | 'performance-network' | 'performance-instance-store' | 'performance-ebs-volume' | 'performance-other' | 'other'[];
  /** The status of all instances listed. */
  Status: 'ok' | 'impaired';
  /** Descriptive text about the health state of your instance. */
  Description?: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** The time at which the reported instance health state ended. */
  EndTime?: string;
  /** The time at which the reported instance health state began. */
  StartTime?: string;
}

/** Contains the parameters for RequestSpotFleet. */
export interface RequestSpotFleetInput {
  /** The configuration for the Spot Fleet request. */
  SpotFleetRequestConfig: SpotFleetRequestConfigData;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for RequestSpotInstances. */
export interface RequestSpotInstancesInput {
  /** The user-specified name for a logical grouping of requests. When you specify an Availability Zone group in a Spot Instance request, all Spot Instances in the request are launched in the same Availabil */
  AvailabilityZoneGroup?: string;
  /** Deprecated. */
  BlockDurationMinutes?: number;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see Ensuring idempotency in Amazon EC2 API requests in the Amazon EC2 User Guide. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of Spot Instances to launch. Default: 1 */
  InstanceCount?: number;
  /** The behavior when a Spot Instance is interrupted. The default is terminate. */
  InstanceInterruptionBehavior?: 'hibernate' | 'stop' | 'terminate';
  /** The instance launch group. Launch groups are Spot Instances that launch together and terminate together. Default: Instances are launched and terminated individually */
  LaunchGroup?: string;
  /** The launch specification. */
  LaunchSpecification?: RequestSpotLaunchSpecification;
  /** The maximum price per unit hour that you are willing to pay for a Spot Instance. We do not recommend using this parameter because it can lead to increased interruptions. If you do not specify this par */
  SpotPrice?: string;
  /** The key-value pair for tagging the Spot Instance request on creation. The value for ResourceType must be spot-instances-request, otherwise the Spot Instance request fails. To tag the Spot Instance req */
  TagSpecifications?: TagSpecification[];
  /** The Spot Instance request type. Default: one-time */
  Type?: 'one-time' | 'persistent';
  /** The start date of the request. If this is a one-time request, the request becomes active at this date and time and remains active until all instances launch, the request expires, or the request is can */
  ValidFrom?: string;
  /** The end date of the request, in UTC format (YYYY-MM-DDTHH:MM:SSZ). For a persistent request, the request remains active until the ValidUntil date and time is reached. Otherwise, the request remains ac */
  ValidUntil?: string;
}

export interface ResetAddressAttributeInput {
  /** [EC2-VPC] The allocation ID. */
  AllocationId: string;
  /** The attribute of the IP address. */
  Attribute: 'domain-name';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ResetEbsDefaultKmsKeyIdInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ResetFpgaImageAttributeInput {
  /** The ID of the AFI. */
  FpgaImageId: string;
  /** The attribute. */
  Attribute?: 'loadPermission';
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** Contains the parameters for ResetImageAttribute. */
export interface ResetImageAttributeInput {
  /** The attribute to reset (currently you can only reset the launch permission attribute). */
  Attribute: 'launchPermission';
  /** The ID of the AMI. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface ResetInstanceAttributeInput {
  /** The attribute to reset. You can only reset the following attributes: kernel | ramdisk | sourceDestCheck. */
  Attribute: 'instanceType' | 'kernel' | 'ramdisk' | 'userData' | 'disableApiTermination' | 'instanceInitiatedShutdownBehavior' | 'rootDeviceName' | 'blockDeviceMapping' | 'productCodes' | 'sourceDestCheck' | 'groupSet' | 'ebsOptimized' | 'sriovNetSupport' | 'enaSupport' | 'enclaveOptions' | 'disableApiStop';
  /** The ID of the instance. */
  InstanceId: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

/** Contains the parameters for ResetNetworkInterfaceAttribute. */
export interface ResetNetworkInterfaceAttributeInput {
  /** The ID of the network interface. */
  NetworkInterfaceId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The source/destination checking attribute. Resets the value to true. */
  SourceDestCheck?: string;
}

export interface ResetSnapshotAttributeInput {
  /** The attribute to reset. Currently, only the attribute for permission to create volumes can be reset. */
  Attribute: 'productCodes' | 'createVolumePermission';
  /** The ID of the snapshot. */
  SnapshotId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface RestoreAddressToClassicInput {
  /** The Elastic IP address. */
  PublicIp: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface RestoreImageFromRecycleBinInput {
  /** The ID of the AMI to restore. */
  ImageId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface RestoreManagedPrefixListVersionInput {
  /** The current version number for the prefix list. */
  CurrentVersion: number;
  /** The ID of the prefix list. */
  PrefixListId: string;
  /** The version to restore. */
  PreviousVersion: number;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface RestoreSnapshotFromRecycleBinInput {
  /** The ID of the snapshot to restore. */
  SnapshotId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface RestoreSnapshotTierInput {
  /** The ID of the snapshot to restore. */
  SnapshotId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Indicates whether to permanently restore an archived snapshot. To permanently restore an archived snapshot, specify true and omit the RestoreSnapshotTierRequest$TemporaryRestoreDays parameter. */
  PermanentRestore?: boolean;
  /** Specifies the number of days for which to temporarily restore an archived snapshot. Required for temporary restores only. The snapshot will be automatically re-archived after this period. To temporari */
  TemporaryRestoreDays?: number;
}

export interface RestoreVolumeFromRecycleBinInput {
  /** The ID of the volume to restore. */
  VolumeId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface RevokeClientVpnIngressInput {
  /** The ID of the Client VPN endpoint with which the authorization rule is associated. */
  ClientVpnEndpointId: string;
  /** The IPv4 address range, in CIDR notation, of the network for which access is being removed. */
  TargetNetworkCidr: string;
  /** The ID of the Active Directory group for which to revoke access. */
  AccessGroupId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Indicates whether access should be revoked for all groups for a single TargetNetworkCidr that earlier authorized ingress for all groups using AuthorizeAllGroups. This does not impact other authorizati */
  RevokeAllGroups?: boolean;
}

export interface RevokeSecurityGroupEgressInput {
  /** The ID of the security group. */
  GroupId: string;
  /** Not supported. Use a set of IP permissions to specify the CIDR. */
  CidrIp?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** Not supported. Use a set of IP permissions to specify the port. */
  FromPort?: number;
  /** The sets of IP permissions. You can't specify a destination security group and a CIDR IP address range in the same set of permissions. */
  IpPermissions?: IpPermission[];
  /** Not supported. Use a set of IP permissions to specify the protocol name or number. */
  IpProtocol?: string;
  /** The IDs of the security group rules. */
  SecurityGroupRuleIds?: string[];
  /** Not supported. Use a set of IP permissions to specify a destination security group. */
  SourceSecurityGroupName?: string;
  /** Not supported. Use a set of IP permissions to specify a destination security group. */
  SourceSecurityGroupOwnerId?: string;
  /** Not supported. Use a set of IP permissions to specify the port. */
  ToPort?: number;
}

export interface RevokeSecurityGroupIngressInput {
  /** The CIDR IP address range. You can't specify this parameter when specifying a source security group. */
  CidrIp?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** If the protocol is TCP or UDP, this is the start of the port range. If the protocol is ICMP, this is the ICMP type or -1 (all ICMP types). */
  FromPort?: number;
  /** The ID of the security group. */
  GroupId?: string;
  /** [Default VPC] The name of the security group. You must specify either the security group ID or the security group name in the request. For security groups in a nondefault VPC, you must specify the sec */
  GroupName?: string;
  /** The sets of IP permissions. You can't specify a source security group and a CIDR IP address range in the same set of permissions. */
  IpPermissions?: IpPermission[];
  /** The IP protocol name (tcp, udp, icmp) or number (see Protocol Numbers). Use -1 to specify all. */
  IpProtocol?: string;
  /** The IDs of the security group rules. */
  SecurityGroupRuleIds?: string[];
  /** [Default VPC] The name of the source security group. You can't specify this parameter in combination with the following parameters: the CIDR IP address range, the start of the port range, the IP proto */
  SourceSecurityGroupName?: string;
  /** Not supported. */
  SourceSecurityGroupOwnerId?: string;
  /** If the protocol is TCP or UDP, this is the end of the port range. If the protocol is ICMP, this is the ICMP code or -1 (all ICMP codes). */
  ToPort?: number;
}

export interface RunInstancesInput {
  /** The maximum number of instances to launch. If you specify a value that is more capacity than Amazon EC2 can launch in the target Availability Zone, Amazon EC2 launches the largest possible number of i */
  MaxCount: number;
  /** The minimum number of instances to launch. If you specify a value that is more capacity than Amazon EC2 can provide in the target Availability Zone, Amazon EC2 does not launch any instances. Constrain */
  MinCount: number;
  /** Reserved. */
  AdditionalInfo?: string;
  /** The block device mapping, which defines the EBS volumes and instance store volumes to attach to the instance at launch. For more information, see Block device mappings in the Amazon EC2 User Guide. */
  BlockDeviceMappings?: BlockDeviceMapping[];
  /** Information about the Capacity Reservation targeting option. If you do not specify this parameter, the instance's Capacity Reservation preference defaults to open, which enables it to run in any open  */
  CapacityReservationSpecification?: CapacityReservationSpecification;
  /** Unique, case-sensitive identifier you provide to ensure the idempotency of the request. If you do not specify a client token, a randomly generated token is used for the request to ensure idempotency.  */
  ClientToken?: string;
  /** The CPU options for the instance. For more information, see Optimize CPU options in the Amazon EC2 User Guide. */
  CpuOptions?: CpuOptionsRequest;
  /** The credit option for CPU usage of the burstable performance instance. Valid values are standard and unlimited. To change this attribute after launch, use ModifyInstanceCreditSpecification. For more i */
  CreditSpecification?: CreditSpecificationRequest;
  /** Indicates whether an instance is enabled for stop protection. For more information, see Enable stop protection for your EC2 instances. */
  DisableApiStop?: boolean;
  /** Indicates whether termination protection is enabled for the instance. The default is false, which means that you can terminate the instance using the Amazon EC2 console, command line tools, or API. Yo */
  DisableApiTermination?: boolean;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Indicates whether the instance is optimized for Amazon EBS I/O. This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide optimal Amazon EBS I/O per */
  EbsOptimized?: boolean;
  /** An elastic GPU to associate with the instance. Amazon Elastic Graphics reached end of life on January 8, 2024. */
  ElasticGpuSpecification?: ElasticGpuSpecification[];
  /** An elastic inference accelerator to associate with the instance. Amazon Elastic Inference is no longer available. */
  ElasticInferenceAccelerators?: ElasticInferenceAccelerator[];
  /** If you’re launching an instance into a dual-stack or IPv6-only subnet, you can enable assigning a primary IPv6 address. A primary IPv6 address is an IPv6 GUA address associated with an ENI that you ha */
  EnablePrimaryIpv6?: boolean;
  /** Indicates whether the instance is enabled for Amazon Web Services Nitro Enclaves. For more information, see Amazon Web Services Nitro Enclaves User Guide. You can't enable Amazon Web Services Nitro En */
  EnclaveOptions?: EnclaveOptionsRequest;
  /** Indicates whether an instance is enabled for hibernation. This parameter is valid only if the instance meets the hibernation prerequisites. For more information, see Hibernate your Amazon EC2 instance */
  HibernationOptions?: HibernationOptionsRequest;
  /** The name or Amazon Resource Name (ARN) of an IAM instance profile. */
  IamInstanceProfile?: IamInstanceProfileSpecification;
  /** The ID of the AMI. An AMI ID is required to launch an instance and must be specified here or in a launch template. */
  ImageId?: string;
  /** Indicates whether an instance stops or terminates when you initiate shutdown from the instance (using the operating system command for system shutdown). Default: stop */
  InstanceInitiatedShutdownBehavior?: 'stop' | 'terminate';
  /** The market (purchasing) option for the instances. For RunInstances, persistent Spot Instance requests are only supported when InstanceInterruptionBehavior is set to either hibernate or stop. */
  InstanceMarketOptions?: InstanceMarketOptionsRequest;
  /** The instance type. For more information, see Amazon EC2 Instance Types Guide. */
  InstanceType?: 'a1.medium' | 'a1.large' | 'a1.xlarge' | 'a1.2xlarge' | 'a1.4xlarge' | 'a1.metal' | 'c1.medium' | 'c1.xlarge' | 'c3.large' | 'c3.xlarge' | 'c3.2xlarge' | 'c3.4xlarge' | 'c3.8xlarge' | 'c4.large' | 'c4.xlarge' | 'c4.2xlarge' | 'c4.4xlarge' | 'c4.8xlarge' | 'c5.large' | 'c5.xlarge' | 'c5.2xlarge' | 'c5.4xlarge' | 'c5.9xlarge' | 'c5.12xlarge' | 'c5.18xlarge' | 'c5.24xlarge' | 'c5.metal' | 'c5a.large' | 'c5a.xlarge' | 'c5a.2xlarge' | 'c5a.4xlarge' | 'c5a.8xlarge' | 'c5a.12xlarge' | 'c5a.16xlarge' | 'c5a.24xlarge' | 'c5ad.large' | 'c5ad.xlarge' | 'c5ad.2xlarge' | 'c5ad.4xlarge' | 'c5ad.8xlarge' | 'c5ad.12xlarge' | 'c5ad.16xlarge' | 'c5ad.24xlarge' | 'c5d.large' | 'c5d.xlarge' | 'c5d.2xlarge' | 'c5d.4xlarge' | 'c5d.9xlarge' | 'c5d.12xlarge' | 'c5d.18xlarge' | 'c5d.24xlarge' | 'c5d.metal' | 'c5n.large' | 'c5n.xlarge' | 'c5n.2xlarge' | 'c5n.4xlarge' | 'c5n.9xlarge' | 'c5n.18xlarge' | 'c5n.metal' | 'c6g.medium' | 'c6g.large' | 'c6g.xlarge' | 'c6g.2xlarge' | 'c6g.4xlarge' | 'c6g.8xlarge' | 'c6g.12xlarge' | 'c6g.16xlarge' | 'c6g.metal' | 'c6gd.medium' | 'c6gd.large' | 'c6gd.xlarge' | 'c6gd.2xlarge' | 'c6gd.4xlarge' | 'c6gd.8xlarge' | 'c6gd.12xlarge' | 'c6gd.16xlarge' | 'c6gd.metal' | 'c6gn.medium' | 'c6gn.large' | 'c6gn.xlarge' | 'c6gn.2xlarge' | 'c6gn.4xlarge' | 'c6gn.8xlarge' | 'c6gn.12xlarge' | 'c6gn.16xlarge' | 'c6i.large' | 'c6i.xlarge' | 'c6i.2xlarge' | 'c6i.4xlarge' | 'c6i.8xlarge' | 'c6i.12xlarge' | 'c6i.16xlarge' | 'c6i.24xlarge' | 'c6i.32xlarge' | 'c6i.metal' | 'cc1.4xlarge' | 'cc2.8xlarge' | 'cg1.4xlarge' | 'cr1.8xlarge' | 'd2.xlarge' | 'd2.2xlarge' | 'd2.4xlarge' | 'd2.8xlarge' | 'd3.xlarge' | 'd3.2xlarge' | 'd3.4xlarge' | 'd3.8xlarge' | 'd3en.xlarge' | 'd3en.2xlarge' | 'd3en.4xlarge' | 'd3en.6xlarge' | 'd3en.8xlarge' | 'd3en.12xlarge' | 'dl1.24xlarge' | 'f1.2xlarge' | 'f1.4xlarge' | 'f1.16xlarge' | 'g2.2xlarge' | 'g2.8xlarge' | 'g3.4xlarge' | 'g3.8xlarge' | 'g3.16xlarge' | 'g3s.xlarge' | 'g4ad.xlarge' | 'g4ad.2xlarge' | 'g4ad.4xlarge' | 'g4ad.8xlarge' | 'g4ad.16xlarge' | 'g4dn.xlarge' | 'g4dn.2xlarge' | 'g4dn.4xlarge' | 'g4dn.8xlarge' | 'g4dn.12xlarge' | 'g4dn.16xlarge' | 'g4dn.metal' | 'g5.xlarge' | 'g5.2xlarge' | 'g5.4xlarge' | 'g5.8xlarge' | 'g5.12xlarge' | 'g5.16xlarge' | 'g5.24xlarge' | 'g5.48xlarge' | 'g5g.xlarge' | 'g5g.2xlarge' | 'g5g.4xlarge' | 'g5g.8xlarge' | 'g5g.16xlarge' | 'g5g.metal' | 'hi1.4xlarge' | 'hpc6a.48xlarge' | 'hs1.8xlarge' | 'h1.2xlarge' | 'h1.4xlarge' | 'h1.8xlarge' | 'h1.16xlarge' | 'i2.xlarge' | 'i2.2xlarge' | 'i2.4xlarge' | 'i2.8xlarge' | 'i3.large' | 'i3.xlarge' | 'i3.2xlarge' | 'i3.4xlarge' | 'i3.8xlarge' | 'i3.16xlarge' | 'i3.metal' | 'i3en.large' | 'i3en.xlarge' | 'i3en.2xlarge' | 'i3en.3xlarge' | 'i3en.6xlarge' | 'i3en.12xlarge' | 'i3en.24xlarge' | 'i3en.metal' | 'im4gn.large' | 'im4gn.xlarge' | 'im4gn.2xlarge' | 'im4gn.4xlarge' | 'im4gn.8xlarge' | 'im4gn.16xlarge' | 'inf1.xlarge' | 'inf1.2xlarge' | 'inf1.6xlarge' | 'inf1.24xlarge' | 'is4gen.medium' | 'is4gen.large' | 'is4gen.xlarge' | 'is4gen.2xlarge' | 'is4gen.4xlarge' | 'is4gen.8xlarge' | 'm1.small' | 'm1.medium' | 'm1.large' | 'm1.xlarge' | 'm2.xlarge' | 'm2.2xlarge' | 'm2.4xlarge' | 'm3.medium' | 'm3.large' | 'm3.xlarge' | 'm3.2xlarge' | 'm4.large' | 'm4.xlarge' | 'm4.2xlarge' | 'm4.4xlarge' | 'm4.10xlarge' | 'm4.16xlarge' | 'm5.large' | 'm5.xlarge' | 'm5.2xlarge' | 'm5.4xlarge' | 'm5.8xlarge' | 'm5.12xlarge' | 'm5.16xlarge' | 'm5.24xlarge' | 'm5.metal' | 'm5a.large' | 'm5a.xlarge' | 'm5a.2xlarge' | 'm5a.4xlarge' | 'm5a.8xlarge' | 'm5a.12xlarge' | 'm5a.16xlarge' | 'm5a.24xlarge' | 'm5ad.large' | 'm5ad.xlarge' | 'm5ad.2xlarge' | 'm5ad.4xlarge' | 'm5ad.8xlarge' | 'm5ad.12xlarge' | 'm5ad.16xlarge' | 'm5ad.24xlarge' | 'm5d.large' | 'm5d.xlarge' | 'm5d.2xlarge' | 'm5d.4xlarge' | 'm5d.8xlarge' | 'm5d.12xlarge' | 'm5d.16xlarge' | 'm5d.24xlarge' | 'm5d.metal' | 'm5dn.large' | 'm5dn.xlarge' | 'm5dn.2xlarge' | 'm5dn.4xlarge' | 'm5dn.8xlarge' | 'm5dn.12xlarge' | 'm5dn.16xlarge' | 'm5dn.24xlarge' | 'm5dn.metal' | 'm5n.large' | 'm5n.xlarge' | 'm5n.2xlarge' | 'm5n.4xlarge' | 'm5n.8xlarge' | 'm5n.12xlarge' | 'm5n.16xlarge' | 'm5n.24xlarge' | 'm5n.metal' | 'm5zn.large' | 'm5zn.xlarge' | 'm5zn.2xlarge' | 'm5zn.3xlarge' | 'm5zn.6xlarge' | 'm5zn.12xlarge' | 'm5zn.metal' | 'm6a.large' | 'm6a.xlarge' | 'm6a.2xlarge' | 'm6a.4xlarge' | 'm6a.8xlarge' | 'm6a.12xlarge' | 'm6a.16xlarge' | 'm6a.24xlarge' | 'm6a.32xlarge' | 'm6a.48xlarge' | 'm6g.metal' | 'm6g.medium' | 'm6g.large' | 'm6g.xlarge' | 'm6g.2xlarge' | 'm6g.4xlarge' | 'm6g.8xlarge' | 'm6g.12xlarge' | 'm6g.16xlarge' | 'm6gd.metal' | 'm6gd.medium' | 'm6gd.large' | 'm6gd.xlarge' | 'm6gd.2xlarge' | 'm6gd.4xlarge' | 'm6gd.8xlarge' | 'm6gd.12xlarge' | 'm6gd.16xlarge' | 'm6i.large' | 'm6i.xlarge' | 'm6i.2xlarge' | 'm6i.4xlarge' | 'm6i.8xlarge' | 'm6i.12xlarge' | 'm6i.16xlarge' | 'm6i.24xlarge' | 'm6i.32xlarge' | 'm6i.metal' | 'mac1.metal' | 'p2.xlarge' | 'p2.8xlarge' | 'p2.16xlarge' | 'p3.2xlarge' | 'p3.8xlarge' | 'p3.16xlarge' | 'p3dn.24xlarge' | 'p4d.24xlarge' | 'r3.large' | 'r3.xlarge' | 'r3.2xlarge' | 'r3.4xlarge' | 'r3.8xlarge' | 'r4.large' | 'r4.xlarge' | 'r4.2xlarge' | 'r4.4xlarge' | 'r4.8xlarge' | 'r4.16xlarge' | 'r5.large' | 'r5.xlarge' | 'r5.2xlarge' | 'r5.4xlarge' | 'r5.8xlarge' | 'r5.12xlarge' | 'r5.16xlarge' | 'r5.24xlarge' | 'r5.metal' | 'r5a.large' | 'r5a.xlarge' | 'r5a.2xlarge' | 'r5a.4xlarge' | 'r5a.8xlarge' | 'r5a.12xlarge' | 'r5a.16xlarge' | 'r5a.24xlarge' | 'r5ad.large' | 'r5ad.xlarge' | 'r5ad.2xlarge' | 'r5ad.4xlarge' | 'r5ad.8xlarge' | 'r5ad.12xlarge' | 'r5ad.16xlarge' | 'r5ad.24xlarge' | 'r5b.large' | 'r5b.xlarge' | 'r5b.2xlarge' | 'r5b.4xlarge' | 'r5b.8xlarge' | 'r5b.12xlarge' | 'r5b.16xlarge' | 'r5b.24xlarge' | 'r5b.metal' | 'r5d.large' | 'r5d.xlarge' | 'r5d.2xlarge' | 'r5d.4xlarge' | 'r5d.8xlarge' | 'r5d.12xlarge' | 'r5d.16xlarge' | 'r5d.24xlarge' | 'r5d.metal' | 'r5dn.large' | 'r5dn.xlarge' | 'r5dn.2xlarge' | 'r5dn.4xlarge' | 'r5dn.8xlarge' | 'r5dn.12xlarge' | 'r5dn.16xlarge' | 'r5dn.24xlarge' | 'r5dn.metal' | 'r5n.large' | 'r5n.xlarge' | 'r5n.2xlarge' | 'r5n.4xlarge' | 'r5n.8xlarge' | 'r5n.12xlarge' | 'r5n.16xlarge' | 'r5n.24xlarge' | 'r5n.metal' | 'r6g.medium' | 'r6g.large' | 'r6g.xlarge' | 'r6g.2xlarge' | 'r6g.4xlarge' | 'r6g.8xlarge' | 'r6g.12xlarge' | 'r6g.16xlarge' | 'r6g.metal' | 'r6gd.medium' | 'r6gd.large' | 'r6gd.xlarge' | 'r6gd.2xlarge' | 'r6gd.4xlarge' | 'r6gd.8xlarge' | 'r6gd.12xlarge' | 'r6gd.16xlarge' | 'r6gd.metal' | 'r6i.large' | 'r6i.xlarge' | 'r6i.2xlarge' | 'r6i.4xlarge' | 'r6i.8xlarge' | 'r6i.12xlarge' | 'r6i.16xlarge' | 'r6i.24xlarge' | 'r6i.32xlarge' | 'r6i.metal' | 't1.micro' | 't2.nano' | 't2.micro' | 't2.small' | 't2.medium' | 't2.large' | 't2.xlarge' | 't2.2xlarge' | 't3.nano' | 't3.micro' | 't3.small' | 't3.medium' | 't3.large' | 't3.xlarge' | 't3.2xlarge' | 't3a.nano' | 't3a.micro' | 't3a.small' | 't3a.medium' | 't3a.large' | 't3a.xlarge' | 't3a.2xlarge' | 't4g.nano' | 't4g.micro' | 't4g.small' | 't4g.medium' | 't4g.large' | 't4g.xlarge' | 't4g.2xlarge' | 'u-6tb1.56xlarge' | 'u-6tb1.112xlarge' | 'u-9tb1.112xlarge' | 'u-12tb1.112xlarge' | 'u-6tb1.metal' | 'u-9tb1.metal' | 'u-12tb1.metal' | 'u-18tb1.metal' | 'u-24tb1.metal' | 'vt1.3xlarge' | 'vt1.6xlarge' | 'vt1.24xlarge' | 'x1.16xlarge' | 'x1.32xlarge' | 'x1e.xlarge' | 'x1e.2xlarge' | 'x1e.4xlarge' | 'x1e.8xlarge' | 'x1e.16xlarge' | 'x1e.32xlarge' | 'x2iezn.2xlarge' | 'x2iezn.4xlarge' | 'x2iezn.6xlarge' | 'x2iezn.8xlarge' | 'x2iezn.12xlarge' | 'x2iezn.metal' | 'x2gd.medium' | 'x2gd.large' | 'x2gd.xlarge' | 'x2gd.2xlarge' | 'x2gd.4xlarge' | 'x2gd.8xlarge' | 'x2gd.12xlarge' | 'x2gd.16xlarge' | 'x2gd.metal' | 'z1d.large' | 'z1d.xlarge' | 'z1d.2xlarge' | 'z1d.3xlarge' | 'z1d.6xlarge' | 'z1d.12xlarge' | 'z1d.metal' | 'x2idn.16xlarge' | 'x2idn.24xlarge' | 'x2idn.32xlarge' | 'x2iedn.xlarge' | 'x2iedn.2xlarge' | 'x2iedn.4xlarge' | 'x2iedn.8xlarge' | 'x2iedn.16xlarge' | 'x2iedn.24xlarge' | 'x2iedn.32xlarge' | 'c6a.large' | 'c6a.xlarge' | 'c6a.2xlarge' | 'c6a.4xlarge' | 'c6a.8xlarge' | 'c6a.12xlarge' | 'c6a.16xlarge' | 'c6a.24xlarge' | 'c6a.32xlarge' | 'c6a.48xlarge' | 'c6a.metal' | 'm6a.metal' | 'i4i.large' | 'i4i.xlarge' | 'i4i.2xlarge' | 'i4i.4xlarge' | 'i4i.8xlarge' | 'i4i.16xlarge' | 'i4i.32xlarge' | 'i4i.metal' | 'x2idn.metal' | 'x2iedn.metal' | 'c7g.medium' | 'c7g.large' | 'c7g.xlarge' | 'c7g.2xlarge' | 'c7g.4xlarge' | 'c7g.8xlarge' | 'c7g.12xlarge' | 'c7g.16xlarge' | 'mac2.metal' | 'c6id.large' | 'c6id.xlarge' | 'c6id.2xlarge' | 'c6id.4xlarge' | 'c6id.8xlarge' | 'c6id.12xlarge' | 'c6id.16xlarge' | 'c6id.24xlarge' | 'c6id.32xlarge' | 'c6id.metal' | 'm6id.large' | 'm6id.xlarge' | 'm6id.2xlarge' | 'm6id.4xlarge' | 'm6id.8xlarge' | 'm6id.12xlarge' | 'm6id.16xlarge' | 'm6id.24xlarge' | 'm6id.32xlarge' | 'm6id.metal' | 'r6id.large' | 'r6id.xlarge' | 'r6id.2xlarge' | 'r6id.4xlarge' | 'r6id.8xlarge' | 'r6id.12xlarge' | 'r6id.16xlarge' | 'r6id.24xlarge' | 'r6id.32xlarge' | 'r6id.metal' | 'r6a.large' | 'r6a.xlarge' | 'r6a.2xlarge' | 'r6a.4xlarge' | 'r6a.8xlarge' | 'r6a.12xlarge' | 'r6a.16xlarge' | 'r6a.24xlarge' | 'r6a.32xlarge' | 'r6a.48xlarge' | 'r6a.metal' | 'p4de.24xlarge' | 'u-3tb1.56xlarge' | 'u-18tb1.112xlarge' | 'u-24tb1.112xlarge' | 'trn1.2xlarge' | 'trn1.32xlarge' | 'hpc6id.32xlarge' | 'c6in.large' | 'c6in.xlarge' | 'c6in.2xlarge' | 'c6in.4xlarge' | 'c6in.8xlarge' | 'c6in.12xlarge' | 'c6in.16xlarge' | 'c6in.24xlarge' | 'c6in.32xlarge' | 'm6in.large' | 'm6in.xlarge' | 'm6in.2xlarge' | 'm6in.4xlarge' | 'm6in.8xlarge' | 'm6in.12xlarge' | 'm6in.16xlarge' | 'm6in.24xlarge' | 'm6in.32xlarge' | 'm6idn.large' | 'm6idn.xlarge' | 'm6idn.2xlarge' | 'm6idn.4xlarge' | 'm6idn.8xlarge' | 'm6idn.12xlarge' | 'm6idn.16xlarge' | 'm6idn.24xlarge' | 'm6idn.32xlarge' | 'r6in.large' | 'r6in.xlarge' | 'r6in.2xlarge' | 'r6in.4xlarge' | 'r6in.8xlarge' | 'r6in.12xlarge' | 'r6in.16xlarge' | 'r6in.24xlarge' | 'r6in.32xlarge' | 'r6idn.large' | 'r6idn.xlarge' | 'r6idn.2xlarge' | 'r6idn.4xlarge' | 'r6idn.8xlarge' | 'r6idn.12xlarge' | 'r6idn.16xlarge' | 'r6idn.24xlarge' | 'r6idn.32xlarge' | 'c7g.metal' | 'm7g.medium' | 'm7g.large' | 'm7g.xlarge' | 'm7g.2xlarge' | 'm7g.4xlarge' | 'm7g.8xlarge' | 'm7g.12xlarge' | 'm7g.16xlarge' | 'm7g.metal' | 'r7g.medium' | 'r7g.large' | 'r7g.xlarge' | 'r7g.2xlarge' | 'r7g.4xlarge' | 'r7g.8xlarge' | 'r7g.12xlarge' | 'r7g.16xlarge' | 'r7g.metal' | 'c6in.metal' | 'm6in.metal' | 'm6idn.metal' | 'r6in.metal' | 'r6idn.metal' | 'inf2.xlarge' | 'inf2.8xlarge' | 'inf2.24xlarge' | 'inf2.48xlarge' | 'trn1n.32xlarge' | 'i4g.large' | 'i4g.xlarge' | 'i4g.2xlarge' | 'i4g.4xlarge' | 'i4g.8xlarge' | 'i4g.16xlarge' | 'hpc7g.4xlarge' | 'hpc7g.8xlarge' | 'hpc7g.16xlarge' | 'c7gn.medium' | 'c7gn.large' | 'c7gn.xlarge' | 'c7gn.2xlarge' | 'c7gn.4xlarge' | 'c7gn.8xlarge' | 'c7gn.12xlarge' | 'c7gn.16xlarge' | 'p5.48xlarge' | 'm7i.large' | 'm7i.xlarge' | 'm7i.2xlarge' | 'm7i.4xlarge' | 'm7i.8xlarge' | 'm7i.12xlarge' | 'm7i.16xlarge' | 'm7i.24xlarge' | 'm7i.48xlarge' | 'm7i-flex.large' | 'm7i-flex.xlarge' | 'm7i-flex.2xlarge' | 'm7i-flex.4xlarge' | 'm7i-flex.8xlarge' | 'm7a.medium' | 'm7a.large' | 'm7a.xlarge' | 'm7a.2xlarge' | 'm7a.4xlarge' | 'm7a.8xlarge' | 'm7a.12xlarge' | 'm7a.16xlarge' | 'm7a.24xlarge' | 'm7a.32xlarge' | 'm7a.48xlarge' | 'm7a.metal-48xl' | 'hpc7a.12xlarge' | 'hpc7a.24xlarge' | 'hpc7a.48xlarge' | 'hpc7a.96xlarge' | 'c7gd.medium' | 'c7gd.large' | 'c7gd.xlarge' | 'c7gd.2xlarge' | 'c7gd.4xlarge' | 'c7gd.8xlarge' | 'c7gd.12xlarge' | 'c7gd.16xlarge' | 'm7gd.medium' | 'm7gd.large' | 'm7gd.xlarge' | 'm7gd.2xlarge' | 'm7gd.4xlarge' | 'm7gd.8xlarge' | 'm7gd.12xlarge' | 'm7gd.16xlarge' | 'r7gd.medium' | 'r7gd.large' | 'r7gd.xlarge' | 'r7gd.2xlarge' | 'r7gd.4xlarge' | 'r7gd.8xlarge' | 'r7gd.12xlarge' | 'r7gd.16xlarge' | 'r7a.medium' | 'r7a.large' | 'r7a.xlarge' | 'r7a.2xlarge' | 'r7a.4xlarge' | 'r7a.8xlarge' | 'r7a.12xlarge' | 'r7a.16xlarge' | 'r7a.24xlarge' | 'r7a.32xlarge' | 'r7a.48xlarge' | 'c7i.large' | 'c7i.xlarge' | 'c7i.2xlarge' | 'c7i.4xlarge' | 'c7i.8xlarge' | 'c7i.12xlarge' | 'c7i.16xlarge' | 'c7i.24xlarge' | 'c7i.48xlarge' | 'mac2-m2pro.metal' | 'r7iz.large' | 'r7iz.xlarge' | 'r7iz.2xlarge' | 'r7iz.4xlarge' | 'r7iz.8xlarge' | 'r7iz.12xlarge' | 'r7iz.16xlarge' | 'r7iz.32xlarge' | 'c7a.medium' | 'c7a.large' | 'c7a.xlarge' | 'c7a.2xlarge' | 'c7a.4xlarge' | 'c7a.8xlarge' | 'c7a.12xlarge' | 'c7a.16xlarge' | 'c7a.24xlarge' | 'c7a.32xlarge' | 'c7a.48xlarge' | 'c7a.metal-48xl' | 'r7a.metal-48xl' | 'r7i.large' | 'r7i.xlarge' | 'r7i.2xlarge' | 'r7i.4xlarge' | 'r7i.8xlarge' | 'r7i.12xlarge' | 'r7i.16xlarge' | 'r7i.24xlarge' | 'r7i.48xlarge' | 'dl2q.24xlarge' | 'mac2-m2.metal' | 'i4i.12xlarge' | 'i4i.24xlarge' | 'c7i.metal-24xl' | 'c7i.metal-48xl' | 'm7i.metal-24xl' | 'm7i.metal-48xl' | 'r7i.metal-24xl' | 'r7i.metal-48xl' | 'r7iz.metal-16xl' | 'r7iz.metal-32xl' | 'c7gd.metal' | 'm7gd.metal' | 'r7gd.metal' | 'g6.xlarge' | 'g6.2xlarge' | 'g6.4xlarge' | 'g6.8xlarge' | 'g6.12xlarge' | 'g6.16xlarge' | 'g6.24xlarge' | 'g6.48xlarge' | 'gr6.4xlarge' | 'gr6.8xlarge' | 'c7i-flex.large' | 'c7i-flex.xlarge' | 'c7i-flex.2xlarge' | 'c7i-flex.4xlarge' | 'c7i-flex.8xlarge' | 'u7i-12tb.224xlarge' | 'u7in-16tb.224xlarge' | 'u7in-24tb.224xlarge' | 'u7in-32tb.224xlarge' | 'u7ib-12tb.224xlarge' | 'c7gn.metal' | 'r8g.medium' | 'r8g.large' | 'r8g.xlarge' | 'r8g.2xlarge' | 'r8g.4xlarge' | 'r8g.8xlarge' | 'r8g.12xlarge' | 'r8g.16xlarge' | 'r8g.24xlarge' | 'r8g.48xlarge' | 'r8g.metal-24xl' | 'r8g.metal-48xl' | 'mac2-m1ultra.metal' | 'g6e.xlarge' | 'g6e.2xlarge' | 'g6e.4xlarge' | 'g6e.8xlarge' | 'g6e.12xlarge' | 'g6e.16xlarge' | 'g6e.24xlarge' | 'g6e.48xlarge' | 'c8g.medium' | 'c8g.large' | 'c8g.xlarge' | 'c8g.2xlarge' | 'c8g.4xlarge' | 'c8g.8xlarge' | 'c8g.12xlarge' | 'c8g.16xlarge' | 'c8g.24xlarge' | 'c8g.48xlarge' | 'c8g.metal-24xl' | 'c8g.metal-48xl' | 'm8g.medium' | 'm8g.large' | 'm8g.xlarge' | 'm8g.2xlarge' | 'm8g.4xlarge' | 'm8g.8xlarge' | 'm8g.12xlarge' | 'm8g.16xlarge' | 'm8g.24xlarge' | 'm8g.48xlarge' | 'm8g.metal-24xl' | 'm8g.metal-48xl' | 'x8g.medium' | 'x8g.large' | 'x8g.xlarge' | 'x8g.2xlarge' | 'x8g.4xlarge' | 'x8g.8xlarge' | 'x8g.12xlarge' | 'x8g.16xlarge' | 'x8g.24xlarge' | 'x8g.48xlarge' | 'x8g.metal-24xl' | 'x8g.metal-48xl' | 'i7ie.large' | 'i7ie.xlarge' | 'i7ie.2xlarge' | 'i7ie.3xlarge' | 'i7ie.6xlarge' | 'i7ie.12xlarge' | 'i7ie.18xlarge' | 'i7ie.24xlarge' | 'i7ie.48xlarge' | 'i8g.large' | 'i8g.xlarge' | 'i8g.2xlarge' | 'i8g.4xlarge' | 'i8g.8xlarge' | 'i8g.12xlarge' | 'i8g.16xlarge' | 'i8g.24xlarge' | 'i8g.metal-24xl' | 'u7i-6tb.112xlarge' | 'u7i-8tb.112xlarge' | 'u7inh-32tb.480xlarge' | 'p5e.48xlarge' | 'p5en.48xlarge' | 'f2.12xlarge' | 'f2.48xlarge' | 'trn2.48xlarge' | 'c7i-flex.12xlarge' | 'c7i-flex.16xlarge' | 'm7i-flex.12xlarge' | 'm7i-flex.16xlarge' | 'i7ie.metal-24xl' | 'i7ie.metal-48xl' | 'i8g.48xlarge' | 'c8gd.medium' | 'c8gd.large' | 'c8gd.xlarge' | 'c8gd.2xlarge' | 'c8gd.4xlarge' | 'c8gd.8xlarge' | 'c8gd.12xlarge' | 'c8gd.16xlarge' | 'c8gd.24xlarge' | 'c8gd.48xlarge' | 'c8gd.metal-24xl' | 'c8gd.metal-48xl' | 'i7i.large' | 'i7i.xlarge' | 'i7i.2xlarge' | 'i7i.4xlarge' | 'i7i.8xlarge' | 'i7i.12xlarge' | 'i7i.16xlarge' | 'i7i.24xlarge' | 'i7i.48xlarge' | 'i7i.metal-24xl' | 'i7i.metal-48xl' | 'p6-b200.48xlarge' | 'm8gd.medium' | 'm8gd.large' | 'm8gd.xlarge' | 'm8gd.2xlarge' | 'm8gd.4xlarge' | 'm8gd.8xlarge' | 'm8gd.12xlarge' | 'm8gd.16xlarge' | 'm8gd.24xlarge' | 'm8gd.48xlarge' | 'm8gd.metal-24xl' | 'm8gd.metal-48xl' | 'r8gd.medium' | 'r8gd.large' | 'r8gd.xlarge' | 'r8gd.2xlarge' | 'r8gd.4xlarge' | 'r8gd.8xlarge' | 'r8gd.12xlarge' | 'r8gd.16xlarge' | 'r8gd.24xlarge' | 'r8gd.48xlarge' | 'r8gd.metal-24xl' | 'r8gd.metal-48xl' | 'c8gn.medium' | 'c8gn.large' | 'c8gn.xlarge' | 'c8gn.2xlarge' | 'c8gn.4xlarge' | 'c8gn.8xlarge' | 'c8gn.12xlarge' | 'c8gn.16xlarge' | 'c8gn.24xlarge' | 'c8gn.48xlarge' | 'c8gn.metal-24xl' | 'c8gn.metal-48xl' | 'f2.6xlarge' | 'p6e-gb200.36xlarge' | 'g6f.large' | 'g6f.xlarge' | 'g6f.2xlarge' | 'g6f.4xlarge' | 'gr6f.4xlarge' | 'p5.4xlarge' | 'r8i.large' | 'r8i.xlarge' | 'r8i.2xlarge' | 'r8i.4xlarge' | 'r8i.8xlarge' | 'r8i.12xlarge' | 'r8i.16xlarge' | 'r8i.24xlarge' | 'r8i.32xlarge' | 'r8i.48xlarge' | 'r8i.96xlarge' | 'r8i.metal-48xl' | 'r8i.metal-96xl' | 'r8i-flex.large' | 'r8i-flex.xlarge' | 'r8i-flex.2xlarge' | 'r8i-flex.4xlarge' | 'r8i-flex.8xlarge' | 'r8i-flex.12xlarge' | 'r8i-flex.16xlarge' | 'm8i.large' | 'm8i.xlarge' | 'm8i.2xlarge' | 'm8i.4xlarge' | 'm8i.8xlarge' | 'm8i.12xlarge' | 'm8i.16xlarge' | 'm8i.24xlarge' | 'm8i.32xlarge' | 'm8i.48xlarge' | 'm8i.96xlarge' | 'm8i.metal-48xl' | 'm8i.metal-96xl' | 'm8i-flex.large' | 'm8i-flex.xlarge' | 'm8i-flex.2xlarge' | 'm8i-flex.4xlarge' | 'm8i-flex.8xlarge' | 'm8i-flex.12xlarge' | 'm8i-flex.16xlarge' | 'i8ge.large' | 'i8ge.xlarge' | 'i8ge.2xlarge' | 'i8ge.3xlarge' | 'i8ge.6xlarge' | 'i8ge.12xlarge' | 'i8ge.18xlarge' | 'i8ge.24xlarge' | 'i8ge.48xlarge' | 'i8ge.metal-24xl' | 'i8ge.metal-48xl' | 'mac-m4.metal' | 'mac-m4pro.metal' | 'r8gn.medium' | 'r8gn.large' | 'r8gn.xlarge' | 'r8gn.2xlarge' | 'r8gn.4xlarge' | 'r8gn.8xlarge' | 'r8gn.12xlarge' | 'r8gn.16xlarge' | 'r8gn.24xlarge' | 'r8gn.48xlarge' | 'r8gn.metal-24xl' | 'r8gn.metal-48xl' | 'c8i.large' | 'c8i.xlarge' | 'c8i.2xlarge' | 'c8i.4xlarge' | 'c8i.8xlarge' | 'c8i.12xlarge' | 'c8i.16xlarge' | 'c8i.24xlarge' | 'c8i.32xlarge' | 'c8i.48xlarge' | 'c8i.96xlarge' | 'c8i.metal-48xl' | 'c8i.metal-96xl' | 'c8i-flex.large' | 'c8i-flex.xlarge' | 'c8i-flex.2xlarge' | 'c8i-flex.4xlarge' | 'c8i-flex.8xlarge' | 'c8i-flex.12xlarge' | 'c8i-flex.16xlarge' | 'r8gb.medium' | 'r8gb.large' | 'r8gb.xlarge' | 'r8gb.2xlarge' | 'r8gb.4xlarge' | 'r8gb.8xlarge' | 'r8gb.12xlarge' | 'r8gb.16xlarge' | 'r8gb.24xlarge' | 'r8gb.metal-24xl' | 'm8a.medium' | 'm8a.large' | 'm8a.xlarge' | 'm8a.2xlarge' | 'm8a.4xlarge' | 'm8a.8xlarge' | 'm8a.12xlarge' | 'm8a.16xlarge' | 'm8a.24xlarge' | 'm8a.48xlarge' | 'm8a.metal-24xl' | 'm8a.metal-48xl' | 'trn2.3xlarge' | 'r8a.medium' | 'r8a.large' | 'r8a.xlarge' | 'r8a.2xlarge' | 'r8a.4xlarge' | 'r8a.8xlarge' | 'r8a.12xlarge' | 'r8a.16xlarge' | 'r8a.24xlarge' | 'r8a.48xlarge' | 'r8a.metal-24xl' | 'r8a.metal-48xl' | 'p6-b300.48xlarge' | 'c8a.medium' | 'c8a.large' | 'c8a.xlarge' | 'c8a.2xlarge' | 'c8a.4xlarge' | 'c8a.8xlarge' | 'c8a.12xlarge' | 'c8a.16xlarge' | 'c8a.24xlarge' | 'c8a.48xlarge' | 'c8a.metal-24xl' | 'c8a.metal-48xl' | 'c8gb.12xlarge' | 'c8gb.16xlarge' | 'c8gb.24xlarge' | 'c8gb.2xlarge' | 'c8gb.4xlarge' | 'c8gb.8xlarge' | 'c8gb.large' | 'c8gb.medium' | 'c8gb.metal-24xl' | 'c8gb.xlarge' | 'c8gb.48xlarge' | 'c8gb.metal-48xl' | 'm8gb.12xlarge' | 'm8gb.16xlarge' | 'm8gb.24xlarge' | 'm8gb.2xlarge' | 'm8gb.4xlarge' | 'm8gb.8xlarge' | 'm8gb.large' | 'm8gb.medium' | 'm8gb.xlarge' | 'm8gb.48xlarge' | 'm8gb.metal-24xl' | 'm8gb.metal-48xl' | 'm8gn.12xlarge' | 'm8gn.16xlarge' | 'm8gn.24xlarge' | 'm8gn.2xlarge' | 'm8gn.48xlarge' | 'm8gn.4xlarge' | 'm8gn.8xlarge' | 'm8gn.large' | 'm8gn.medium' | 'm8gn.xlarge' | 'm8gn.metal-24xl' | 'm8gn.metal-48xl' | 'x8aedz.12xlarge' | 'x8aedz.24xlarge' | 'x8aedz.3xlarge' | 'x8aedz.6xlarge' | 'x8aedz.large' | 'x8aedz.metal-12xl' | 'x8aedz.metal-24xl' | 'x8aedz.xlarge' | 'm8azn.medium' | 'm8azn.large' | 'm8azn.xlarge' | 'm8azn.3xlarge' | 'm8azn.6xlarge' | 'm8azn.12xlarge' | 'm8azn.24xlarge' | 'm8azn.metal-12xl' | 'm8azn.metal-24xl' | 'x8i.large' | 'x8i.xlarge' | 'x8i.2xlarge' | 'x8i.4xlarge' | 'x8i.8xlarge' | 'x8i.12xlarge' | 'x8i.16xlarge' | 'x8i.24xlarge' | 'x8i.32xlarge' | 'x8i.48xlarge' | 'x8i.64xlarge' | 'x8i.96xlarge' | 'x8i.metal-48xl' | 'x8i.metal-96xl' | 'mac-m4max.metal' | 'g7e.2xlarge' | 'g7e.4xlarge' | 'g7e.8xlarge' | 'g7e.12xlarge' | 'g7e.24xlarge' | 'g7e.48xlarge' | 'r8id.large' | 'r8id.xlarge' | 'r8id.2xlarge' | 'r8id.4xlarge' | 'r8id.8xlarge' | 'r8id.12xlarge' | 'r8id.16xlarge' | 'r8id.24xlarge' | 'r8id.32xlarge' | 'r8id.48xlarge' | 'r8id.96xlarge' | 'r8id.metal-48xl' | 'r8id.metal-96xl';
  /** The number of IPv6 addresses to associate with the primary network interface. Amazon EC2 chooses the IPv6 addresses from the range of your subnet. You cannot specify this option and the option to assi */
  Ipv6AddressCount?: number;
  /** The IPv6 addresses from the range of the subnet to associate with the primary network interface. You cannot specify this option and the option to assign a number of IPv6 addresses in the same request. */
  Ipv6Addresses?: InstanceIpv6Address[];
  /** The ID of the kernel. We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see PV-GRUB in the Amazon EC2 User Guide. */
  KernelId?: string;
  /** The name of the key pair. For more information, see Create a key pair for your EC2 instance. If you do not specify a key pair, you can't connect to the instance unless you choose an AMI that is config */
  KeyName?: string;
  /** The launch template. Any additional parameters that you specify for the new instance overwrite the corresponding parameters included in the launch template. */
  LaunchTemplate?: LaunchTemplateSpecification;
  /** The license configurations. */
  LicenseSpecifications?: LicenseConfigurationRequest[];
  /** The maintenance and recovery options for the instance. */
  MaintenanceOptions?: InstanceMaintenanceOptionsRequest;
  /** The metadata options for the instance. For more information, see Configure the Instance Metadata Service options. */
  MetadataOptions?: InstanceMetadataOptionsRequest;
  /** Specifies whether detailed monitoring is enabled for the instance. */
  Monitoring?: RunInstancesMonitoringEnabled;
  /** The network interfaces to associate with the instance. */
  NetworkInterfaces?: InstanceNetworkInterfaceSpecification[];
  /** Contains settings for the network performance options for the instance. */
  NetworkPerformanceOptions?: InstanceNetworkPerformanceOptionsRequest;
  /** Reserved for internal use. */
  Operator?: OperatorRequest;
  /** The placement for the instance. */
  Placement?: Placement;
  /** The options for the instance hostname. The default values are inherited from the subnet. Applies only if creating a network interface, not attaching an existing one. */
  PrivateDnsNameOptions?: PrivateDnsNameOptionsRequest;
  /** The primary IPv4 address. You must specify a value from the IPv4 address range of the subnet. Only one private IP address can be designated as primary. You can't specify this option if you've specifie */
  PrivateIpAddress?: string;
  /** The ID of the RAM disk to select. Some kernels require additional drivers at launch. Check the kernel requirements for information about whether you need to specify a RAM disk. To find kernel requirem */
  RamdiskId?: string;
  /** The secondary interfaces to associate with the instance. */
  SecondaryInterfaces?: InstanceSecondaryInterfaceSpecificationRequest[];
  /** The IDs of the security groups. If you specify a network interface, you must specify any security groups as part of the network interface instead of using this parameter. */
  SecurityGroupIds?: string[];
  /** [Default VPC] The names of the security groups. If you specify a network interface, you must specify any security groups as part of the network interface instead of using this parameter. Default: Amaz */
  SecurityGroups?: string[];
  /** The ID of the subnet to launch the instance into. If you specify a network interface, you must specify any subnets as part of the network interface instead of using this parameter. */
  SubnetId?: string;
  /** The tags to apply to the resources that are created during instance launch. You can specify tags for the following resources only: Instances Volumes Spot Instance requests Network interfaces To tag a  */
  TagSpecifications?: TagSpecification[];
  /** The user data to make available to the instance. User data must be base64-encoded. Depending on the tool or SDK that you're using, the base64-encoding might be performed for you. For more information, */
  UserData?: string;
}

/** Contains the parameters for RunScheduledInstances. */
export interface RunScheduledInstancesInput {
  /** The launch specification. You must match the instance type, Availability Zone, network, and platform of the schedule that you purchased. */
  LaunchSpecification: ScheduledInstancesLaunchSpecification;
  /** The Scheduled Instance ID. */
  ScheduledInstanceId: string;
  /** Unique, case-sensitive identifier that ensures the idempotency of the request. For more information, see Ensuring Idempotency. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The number of instances. Default: 1 */
  InstanceCount?: number;
}

export interface SearchLocalGatewayRoutesInput {
  /** The ID of the local gateway route table. */
  LocalGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. prefix-list-id - The ID of the prefix list. route-search.exact-match - The exact match of the specified filter. route-search.longest-prefix-match - The longest prefix that matches */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface SearchTransitGatewayMulticastGroupsInput {
  /** The ID of the transit gateway multicast domain. */
  TransitGatewayMulticastDomainId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** One or more filters. The possible values are: group-ip-address - The IP address of the transit gateway multicast group. is-group-member - The resource is a group member. Valid values are true | false. */
  Filters?: Filter[];
  /** The maximum number of results to return with a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface SearchTransitGatewayRoutesInput {
  /** One or more filters. The possible values are: attachment.transit-gateway-attachment-id- The id of the transit gateway attachment. attachment.resource-id - The resource id of the transit gateway attach */
  Filters: Filter[];
  /** The ID of the transit gateway route table. */
  TransitGatewayRouteTableId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum number of routes to return. If a value is not provided, the default is 1000. */
  MaxResults?: number;
  /** The token for the next page of results. */
  NextToken?: string;
}

export interface SendDiagnosticInterruptInput {
  /** The ID of the instance. */
  InstanceId: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface StartDeclarativePoliciesReportInput {
  /** The name of the S3 bucket where the report will be saved. The bucket must be in the same Region where the report generation request is made. */
  S3Bucket: string;
  /** The root ID, organizational unit ID, or account ID. Format: For root: r-ab12 For OU: ou-ab12-cdef1234 For account: 123456789012 */
  TargetId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The prefix for your S3 object. */
  S3Prefix?: string;
  /** The tags to apply. */
  TagSpecifications?: TagSpecification[];
}

export interface StartInstancesInput {
  /** The IDs of the instances. */
  InstanceIds: string[];
  /** Reserved. */
  AdditionalInfo?: string;
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface StartNetworkInsightsAccessScopeAnalysisInput {
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken: string;
  /** The ID of the Network Access Scope. */
  NetworkInsightsAccessScopeId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The tags to apply. */
  TagSpecifications?: TagSpecification[];
}

export interface StartNetworkInsightsAnalysisInput {
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. For more information, see How to ensure idempotency. */
  ClientToken: string;
  /** The ID of the path. */
  NetworkInsightsPathId: string;
  /** The member accounts that contain resources that the path can traverse. */
  AdditionalAccounts?: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The Amazon Resource Names (ARN) of the resources that the path must traverse. */
  FilterInArns?: string[];
  /** The Amazon Resource Names (ARN) of the resources that the path will ignore. */
  FilterOutArns?: string[];
  /** The tags to apply. */
  TagSpecifications?: TagSpecification[];
}

export interface StartVpcEndpointServicePrivateDnsVerificationInput {
  /** The ID of the endpoint service. */
  ServiceId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface StopInstancesInput {
  /** The IDs of the instances. */
  InstanceIds: string[];
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Forces the instance to stop. The instance will first attempt a graceful shutdown, which includes flushing file system caches and metadata. If the graceful shutdown fails to complete within the timeout */
  Force?: boolean;
  /** Hibernates the instance if the instance was enabled for hibernation at launch. If the instance cannot hibernate successfully, a normal shutdown occurs. For more information, see Hibernate your Amazon  */
  Hibernate?: boolean;
  /** Specifies whether to bypass the graceful OS shutdown process when the instance is stopped. Bypassing the graceful OS shutdown might result in data loss or corruption (for example, memory contents not  */
  SkipOsShutdown?: boolean;
}

export interface TerminateClientVpnConnectionsInput {
  /** The ID of the Client VPN endpoint to which the client is connected. */
  ClientVpnEndpointId: string;
  /** The ID of the client connection to be terminated. */
  ConnectionId?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The name of the user who initiated the connection. Use this option to terminate all active connections for the specified user. This option can only be used if the user has established up to five conne */
  Username?: string;
}

export interface TerminateInstancesInput {
  /** The IDs of the instances. Constraints: Up to 1000 instance IDs. We recommend breaking up this request into smaller batches. */
  InstanceIds: string[];
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
  /** Forces the instances to terminate. The instance will first attempt a graceful shutdown, which includes flushing file system caches and metadata. If the graceful shutdown fails to complete within the t */
  Force?: boolean;
  /** Specifies whether to bypass the graceful OS shutdown process when the instance is terminated. Default: false */
  SkipOsShutdown?: boolean;
}

export interface UnassignIpv6AddressesInput {
  /** The ID of the network interface. */
  NetworkInterfaceId: string;
  /** The IPv6 addresses to unassign from the network interface. */
  Ipv6Addresses?: string[];
  /** The IPv6 prefixes to unassign from the network interface. */
  Ipv6Prefixes?: string[];
}

/** Contains the parameters for UnassignPrivateIpAddresses. */
export interface UnassignPrivateIpAddressesInput {
  /** The ID of the network interface. */
  NetworkInterfaceId: string;
  /** The IPv4 prefixes to unassign from the network interface. */
  Ipv4Prefixes?: string[];
  /** The secondary private IP addresses to unassign from the network interface. You can specify this option multiple times to unassign more than one IP address. */
  PrivateIpAddresses?: string[];
}

export interface UnassignPrivateNatGatewayAddressInput {
  /** The ID of the NAT gateway. */
  NatGatewayId: string;
  /** The private IPv4 addresses you want to unassign. */
  PrivateIpAddresses: string[];
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The maximum amount of time to wait (in seconds) before forcibly releasing the IP addresses if connections are still in progress. Default value is 350 seconds. */
  MaxDrainDurationSeconds?: number;
}

export interface UnlockSnapshotInput {
  /** The ID of the snapshot to unlock. */
  SnapshotId: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface UnmonitorInstancesInput {
  /** The IDs of the instances. */
  InstanceIds: string[];
  /** Checks whether you have the required permissions for the operation, without actually making the request, and provides an error response. If you have the required permissions, the error response is Dry */
  DryRun?: boolean;
}

export interface UpdateCapacityManagerOrganizationsAccessInput {
  /** Specifies whether to enable or disable cross-account access for Amazon Web Services Organizations. When enabled, Capacity Manager aggregates data from all accounts in your organization. */
  OrganizationsAccess: boolean;
  /** Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  ClientToken?: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

export interface UpdateInterruptibleCapacityReservationAllocationInput {
  /** The ID of the source Capacity Reservation containing the interruptible allocation to modify. */
  CapacityReservationId: string;
  /** The new number of instances to allocate. Enter a higher number to add more capacity to share, or a lower number to reclaim capacity to your source Capacity Reservation. */
  TargetInstanceCount: number;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. */
  DryRun?: boolean;
}

export interface UpdateSecurityGroupRuleDescriptionsEgressInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the security group. You must specify either the security group ID or the security group name in the request. For security groups in a nondefault VPC, you must specify the security group ID. */
  GroupId?: string;
  /** [Default VPC] The name of the security group. You must specify either the security group ID or the security group name. */
  GroupName?: string;
  /** The IP permissions for the security group rule. You must specify either the IP permissions or the description. */
  IpPermissions?: IpPermission[];
  /** The description for the egress security group rules. You must specify either the description or the IP permissions. */
  SecurityGroupRuleDescriptions?: SecurityGroupRuleDescription[];
}

export interface UpdateSecurityGroupRuleDescriptionsIngressInput {
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
  /** The ID of the security group. You must specify either the security group ID or the security group name in the request. For security groups in a nondefault VPC, you must specify the security group ID. */
  GroupId?: string;
  /** [Default VPC] The name of the security group. You must specify either the security group ID or the security group name. For security groups in a nondefault VPC, you must specify the security group ID. */
  GroupName?: string;
  /** The IP permissions for the security group rule. You must specify either IP permissions or a description. */
  IpPermissions?: IpPermission[];
  /** The description for the ingress security group rules. You must specify either a description or IP permissions. */
  SecurityGroupRuleDescriptions?: SecurityGroupRuleDescription[];
}

export interface WithdrawByoipCidrInput {
  /** The address range, in CIDR notation. */
  Cidr: string;
  /** Checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRun */
  DryRun?: boolean;
}

/** EC2 service binding for Step Functions SDK integrations. */
export class EC2 {
  constructor() {}

  acceptAddressTransfer<T>(params: AcceptAddressTransferInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  acceptCapacityReservationBillingOwnership<T>(params: AcceptCapacityReservationBillingOwnershipInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  acceptReservedInstancesExchangeQuote<T>(params: AcceptReservedInstancesExchangeQuoteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  acceptTransitGatewayMulticastDomainAssociations<T>(params: AcceptTransitGatewayMulticastDomainAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  acceptTransitGatewayPeeringAttachment<T>(params: AcceptTransitGatewayPeeringAttachmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  acceptTransitGatewayVpcAttachment<T>(params: AcceptTransitGatewayVpcAttachmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  acceptVpcEndpointConnections<T>(params: AcceptVpcEndpointConnectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  acceptVpcPeeringConnection<T>(params: AcceptVpcPeeringConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  advertiseByoipCidr<T>(params: AdvertiseByoipCidrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  allocateAddress<T>(params: AllocateAddressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  allocateHosts<T>(params: AllocateHostsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  allocateIpamPoolCidr<T>(params: AllocateIpamPoolCidrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  applySecurityGroupsToClientVpnTargetNetwork<T>(params: ApplySecurityGroupsToClientVpnTargetNetworkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  assignIpv6Addresses<T>(params: AssignIpv6AddressesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  assignPrivateIpAddresses<T>(params: AssignPrivateIpAddressesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  assignPrivateNatGatewayAddress<T>(params: AssignPrivateNatGatewayAddressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateAddress<T>(params: AssociateAddressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateCapacityReservationBillingOwner<T>(params: AssociateCapacityReservationBillingOwnerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateClientVpnTargetNetwork<T>(params: AssociateClientVpnTargetNetworkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateDhcpOptions<T>(params: AssociateDhcpOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateEnclaveCertificateIamRole<T>(params: AssociateEnclaveCertificateIamRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateIamInstanceProfile<T>(params: AssociateIamInstanceProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateInstanceEventWindow<T>(params: AssociateInstanceEventWindowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateIpamByoasn<T>(params: AssociateIpamByoasnInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateIpamResourceDiscovery<T>(params: AssociateIpamResourceDiscoveryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateNatGatewayAddress<T>(params: AssociateNatGatewayAddressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateRouteServer<T>(params: AssociateRouteServerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateRouteTable<T>(params: AssociateRouteTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateSecurityGroupVpc<T>(params: AssociateSecurityGroupVpcInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateSubnetCidrBlock<T>(params: AssociateSubnetCidrBlockInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateTransitGatewayMulticastDomain<T>(params: AssociateTransitGatewayMulticastDomainInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateTransitGatewayPolicyTable<T>(params: AssociateTransitGatewayPolicyTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateTransitGatewayRouteTable<T>(params: AssociateTransitGatewayRouteTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateTrunkInterface<T>(params: AssociateTrunkInterfaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateVpcCidrBlock<T>(params: AssociateVpcCidrBlockInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachClassicLinkVpc<T>(params: AttachClassicLinkVpcInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachInternetGateway<T>(params: AttachInternetGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachNetworkInterface<T>(params: AttachNetworkInterfaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachVerifiedAccessTrustProvider<T>(params: AttachVerifiedAccessTrustProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachVolume<T>(params: AttachVolumeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachVpnGateway<T>(params: AttachVpnGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  authorizeClientVpnIngress<T>(params: AuthorizeClientVpnIngressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  authorizeSecurityGroupEgress<T>(params: AuthorizeSecurityGroupEgressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  authorizeSecurityGroupIngress<T>(params: AuthorizeSecurityGroupIngressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  bundleInstance<T>(params: BundleInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelBundleTask<T>(params: CancelBundleTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelCapacityReservation<T>(params: CancelCapacityReservationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelCapacityReservationFleets<T>(params: CancelCapacityReservationFleetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelConversionTask<T>(params: CancelConversionTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelDeclarativePoliciesReport<T>(params: CancelDeclarativePoliciesReportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelExportTask<T>(params: CancelExportTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelImageLaunchPermission<T>(params: CancelImageLaunchPermissionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelImportTask<T>(params: CancelImportTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelReservedInstancesListing<T>(params: CancelReservedInstancesListingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelSpotFleetRequests<T>(params: CancelSpotFleetRequestsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelSpotInstanceRequests<T>(params: CancelSpotInstanceRequestsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  confirmProductInstance<T>(params: ConfirmProductInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyFpgaImage<T>(params: CopyFpgaImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyImage<T>(params: CopyImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copySnapshot<T>(params: CopySnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyVolumes<T>(params: CopyVolumesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCapacityManagerDataExport<T>(params: CreateCapacityManagerDataExportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCapacityReservation<T>(params: CreateCapacityReservationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCapacityReservationBySplitting<T>(params: CreateCapacityReservationBySplittingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCapacityReservationFleet<T>(params: CreateCapacityReservationFleetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCarrierGateway<T>(params: CreateCarrierGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createClientVpnEndpoint<T>(params: CreateClientVpnEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createClientVpnRoute<T>(params: CreateClientVpnRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCoipCidr<T>(params: CreateCoipCidrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCoipPool<T>(params: CreateCoipPoolInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCustomerGateway<T>(params: CreateCustomerGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDefaultSubnet<T>(params: CreateDefaultSubnetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDefaultVpc<T>(params: CreateDefaultVpcInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDelegateMacVolumeOwnershipTask<T>(params: CreateDelegateMacVolumeOwnershipTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDhcpOptions<T>(params: CreateDhcpOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEgressOnlyInternetGateway<T>(params: CreateEgressOnlyInternetGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createFleet<T>(params: CreateFleetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createFlowLogs<T>(params: CreateFlowLogsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createFpgaImage<T>(params: CreateFpgaImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createImage<T>(params: CreateImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createImageUsageReport<T>(params: CreateImageUsageReportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createInstanceConnectEndpoint<T>(params: CreateInstanceConnectEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createInstanceEventWindow<T>(params: CreateInstanceEventWindowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createInstanceExportTask<T>(params: CreateInstanceExportTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createInternetGateway<T>(params: CreateInternetGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createInterruptibleCapacityReservationAllocation<T>(params: CreateInterruptibleCapacityReservationAllocationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIpam<T>(params: CreateIpamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIpamExternalResourceVerificationToken<T>(params: CreateIpamExternalResourceVerificationTokenInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIpamPolicy<T>(params: CreateIpamPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIpamPool<T>(params: CreateIpamPoolInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIpamPrefixListResolver<T>(params: CreateIpamPrefixListResolverInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIpamPrefixListResolverTarget<T>(params: CreateIpamPrefixListResolverTargetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIpamResourceDiscovery<T>(params: CreateIpamResourceDiscoveryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIpamScope<T>(params: CreateIpamScopeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createKeyPair<T>(params: CreateKeyPairInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLaunchTemplate<T>(params: CreateLaunchTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLaunchTemplateVersion<T>(params: CreateLaunchTemplateVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLocalGatewayRoute<T>(params: CreateLocalGatewayRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLocalGatewayRouteTable<T>(params: CreateLocalGatewayRouteTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLocalGatewayRouteTableVirtualInterfaceGroupAssociation<T>(params: CreateLocalGatewayRouteTableVirtualInterfaceGroupAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLocalGatewayRouteTableVpcAssociation<T>(params: CreateLocalGatewayRouteTableVpcAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLocalGatewayVirtualInterface<T>(params: CreateLocalGatewayVirtualInterfaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLocalGatewayVirtualInterfaceGroup<T>(params: CreateLocalGatewayVirtualInterfaceGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createMacSystemIntegrityProtectionModificationTask<T>(params: CreateMacSystemIntegrityProtectionModificationTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createManagedPrefixList<T>(params: CreateManagedPrefixListInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createNatGateway<T>(params: CreateNatGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createNetworkAcl<T>(params: CreateNetworkAclInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createNetworkAclEntry<T>(params: CreateNetworkAclEntryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createNetworkInsightsAccessScope<T>(params: CreateNetworkInsightsAccessScopeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createNetworkInsightsPath<T>(params: CreateNetworkInsightsPathInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createNetworkInterface<T>(params: CreateNetworkInterfaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createNetworkInterfacePermission<T>(params: CreateNetworkInterfacePermissionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPlacementGroup<T>(params: CreatePlacementGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPublicIpv4Pool<T>(params: CreatePublicIpv4PoolInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createReplaceRootVolumeTask<T>(params: CreateReplaceRootVolumeTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createReservedInstancesListing<T>(params: CreateReservedInstancesListingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRestoreImageTask<T>(params: CreateRestoreImageTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRoute<T>(params: CreateRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRouteServer<T>(params: CreateRouteServerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRouteServerEndpoint<T>(params: CreateRouteServerEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRouteServerPeer<T>(params: CreateRouteServerPeerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRouteTable<T>(params: CreateRouteTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSecondaryNetwork<T>(params: CreateSecondaryNetworkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSecondarySubnet<T>(params: CreateSecondarySubnetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSecurityGroup<T>(params: CreateSecurityGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSnapshot<T>(params: CreateSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSnapshots<T>(params: CreateSnapshotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSpotDatafeedSubscription<T>(params: CreateSpotDatafeedSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStoreImageTask<T>(params: CreateStoreImageTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSubnet<T>(params: CreateSubnetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSubnetCidrReservation<T>(params: CreateSubnetCidrReservationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTags<T>(params: CreateTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTrafficMirrorFilter<T>(params: CreateTrafficMirrorFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTrafficMirrorFilterRule<T>(params: CreateTrafficMirrorFilterRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTrafficMirrorSession<T>(params: CreateTrafficMirrorSessionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTrafficMirrorTarget<T>(params: CreateTrafficMirrorTargetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGateway<T>(params: CreateTransitGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGatewayConnect<T>(params: CreateTransitGatewayConnectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGatewayConnectPeer<T>(params: CreateTransitGatewayConnectPeerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGatewayMeteringPolicy<T>(params: CreateTransitGatewayMeteringPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGatewayMeteringPolicyEntry<T>(params: CreateTransitGatewayMeteringPolicyEntryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGatewayMulticastDomain<T>(params: CreateTransitGatewayMulticastDomainInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGatewayPeeringAttachment<T>(params: CreateTransitGatewayPeeringAttachmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGatewayPolicyTable<T>(params: CreateTransitGatewayPolicyTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGatewayPrefixListReference<T>(params: CreateTransitGatewayPrefixListReferenceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGatewayRoute<T>(params: CreateTransitGatewayRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGatewayRouteTable<T>(params: CreateTransitGatewayRouteTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGatewayRouteTableAnnouncement<T>(params: CreateTransitGatewayRouteTableAnnouncementInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTransitGatewayVpcAttachment<T>(params: CreateTransitGatewayVpcAttachmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVerifiedAccessEndpoint<T>(params: CreateVerifiedAccessEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVerifiedAccessGroup<T>(params: CreateVerifiedAccessGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVerifiedAccessInstance<T>(params: CreateVerifiedAccessInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVerifiedAccessTrustProvider<T>(params: CreateVerifiedAccessTrustProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVolume<T>(params: CreateVolumeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpc<T>(params: CreateVpcInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpcBlockPublicAccessExclusion<T>(params: CreateVpcBlockPublicAccessExclusionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpcEncryptionControl<T>(params: CreateVpcEncryptionControlInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpcEndpoint<T>(params: CreateVpcEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpcEndpointConnectionNotification<T>(params: CreateVpcEndpointConnectionNotificationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpcEndpointServiceConfiguration<T>(params: CreateVpcEndpointServiceConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpcPeeringConnection<T>(params: CreateVpcPeeringConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpnConcentrator<T>(params: CreateVpnConcentratorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpnConnection<T>(params: CreateVpnConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpnConnectionRoute<T>(params: CreateVpnConnectionRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpnGateway<T>(params: CreateVpnGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCapacityManagerDataExport<T>(params: DeleteCapacityManagerDataExportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCarrierGateway<T>(params: DeleteCarrierGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteClientVpnEndpoint<T>(params: DeleteClientVpnEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteClientVpnRoute<T>(params: DeleteClientVpnRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCoipCidr<T>(params: DeleteCoipCidrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCoipPool<T>(params: DeleteCoipPoolInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCustomerGateway<T>(params: DeleteCustomerGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDhcpOptions<T>(params: DeleteDhcpOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEgressOnlyInternetGateway<T>(params: DeleteEgressOnlyInternetGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteFleets<T>(params: DeleteFleetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteFlowLogs<T>(params: DeleteFlowLogsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteFpgaImage<T>(params: DeleteFpgaImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteImageUsageReport<T>(params: DeleteImageUsageReportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteInstanceConnectEndpoint<T>(params: DeleteInstanceConnectEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteInstanceEventWindow<T>(params: DeleteInstanceEventWindowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteInternetGateway<T>(params: DeleteInternetGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIpam<T>(params: DeleteIpamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIpamExternalResourceVerificationToken<T>(params: DeleteIpamExternalResourceVerificationTokenInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIpamPolicy<T>(params: DeleteIpamPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIpamPool<T>(params: DeleteIpamPoolInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIpamPrefixListResolver<T>(params: DeleteIpamPrefixListResolverInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIpamPrefixListResolverTarget<T>(params: DeleteIpamPrefixListResolverTargetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIpamResourceDiscovery<T>(params: DeleteIpamResourceDiscoveryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIpamScope<T>(params: DeleteIpamScopeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteKeyPair<T>(params: DeleteKeyPairInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLaunchTemplate<T>(params: DeleteLaunchTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLaunchTemplateVersions<T>(params: DeleteLaunchTemplateVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLocalGatewayRoute<T>(params: DeleteLocalGatewayRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLocalGatewayRouteTable<T>(params: DeleteLocalGatewayRouteTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLocalGatewayRouteTableVirtualInterfaceGroupAssociation<T>(params: DeleteLocalGatewayRouteTableVirtualInterfaceGroupAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLocalGatewayRouteTableVpcAssociation<T>(params: DeleteLocalGatewayRouteTableVpcAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLocalGatewayVirtualInterface<T>(params: DeleteLocalGatewayVirtualInterfaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLocalGatewayVirtualInterfaceGroup<T>(params: DeleteLocalGatewayVirtualInterfaceGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteManagedPrefixList<T>(params: DeleteManagedPrefixListInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteNatGateway<T>(params: DeleteNatGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteNetworkAcl<T>(params: DeleteNetworkAclInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteNetworkAclEntry<T>(params: DeleteNetworkAclEntryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteNetworkInsightsAccessScope<T>(params: DeleteNetworkInsightsAccessScopeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteNetworkInsightsAccessScopeAnalysis<T>(params: DeleteNetworkInsightsAccessScopeAnalysisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteNetworkInsightsAnalysis<T>(params: DeleteNetworkInsightsAnalysisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteNetworkInsightsPath<T>(params: DeleteNetworkInsightsPathInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteNetworkInterface<T>(params: DeleteNetworkInterfaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteNetworkInterfacePermission<T>(params: DeleteNetworkInterfacePermissionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePlacementGroup<T>(params: DeletePlacementGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePublicIpv4Pool<T>(params: DeletePublicIpv4PoolInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteQueuedReservedInstances<T>(params: DeleteQueuedReservedInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRoute<T>(params: DeleteRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRouteServer<T>(params: DeleteRouteServerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRouteServerEndpoint<T>(params: DeleteRouteServerEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRouteServerPeer<T>(params: DeleteRouteServerPeerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRouteTable<T>(params: DeleteRouteTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSecondaryNetwork<T>(params: DeleteSecondaryNetworkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSecondarySubnet<T>(params: DeleteSecondarySubnetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSecurityGroup<T>(params: DeleteSecurityGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSnapshot<T>(params: DeleteSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSpotDatafeedSubscription<T>(params: DeleteSpotDatafeedSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSubnet<T>(params: DeleteSubnetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSubnetCidrReservation<T>(params: DeleteSubnetCidrReservationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTags<T>(params: DeleteTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTrafficMirrorFilter<T>(params: DeleteTrafficMirrorFilterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTrafficMirrorFilterRule<T>(params: DeleteTrafficMirrorFilterRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTrafficMirrorSession<T>(params: DeleteTrafficMirrorSessionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTrafficMirrorTarget<T>(params: DeleteTrafficMirrorTargetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGateway<T>(params: DeleteTransitGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGatewayConnect<T>(params: DeleteTransitGatewayConnectInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGatewayConnectPeer<T>(params: DeleteTransitGatewayConnectPeerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGatewayMeteringPolicy<T>(params: DeleteTransitGatewayMeteringPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGatewayMeteringPolicyEntry<T>(params: DeleteTransitGatewayMeteringPolicyEntryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGatewayMulticastDomain<T>(params: DeleteTransitGatewayMulticastDomainInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGatewayPeeringAttachment<T>(params: DeleteTransitGatewayPeeringAttachmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGatewayPolicyTable<T>(params: DeleteTransitGatewayPolicyTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGatewayPrefixListReference<T>(params: DeleteTransitGatewayPrefixListReferenceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGatewayRoute<T>(params: DeleteTransitGatewayRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGatewayRouteTable<T>(params: DeleteTransitGatewayRouteTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGatewayRouteTableAnnouncement<T>(params: DeleteTransitGatewayRouteTableAnnouncementInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTransitGatewayVpcAttachment<T>(params: DeleteTransitGatewayVpcAttachmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVerifiedAccessEndpoint<T>(params: DeleteVerifiedAccessEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVerifiedAccessGroup<T>(params: DeleteVerifiedAccessGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVerifiedAccessInstance<T>(params: DeleteVerifiedAccessInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVerifiedAccessTrustProvider<T>(params: DeleteVerifiedAccessTrustProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVolume<T>(params: DeleteVolumeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpc<T>(params: DeleteVpcInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpcBlockPublicAccessExclusion<T>(params: DeleteVpcBlockPublicAccessExclusionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpcEncryptionControl<T>(params: DeleteVpcEncryptionControlInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpcEndpointConnectionNotifications<T>(params: DeleteVpcEndpointConnectionNotificationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpcEndpoints<T>(params: DeleteVpcEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpcEndpointServiceConfigurations<T>(params: DeleteVpcEndpointServiceConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpcPeeringConnection<T>(params: DeleteVpcPeeringConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpnConcentrator<T>(params: DeleteVpnConcentratorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpnConnection<T>(params: DeleteVpnConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpnConnectionRoute<T>(params: DeleteVpnConnectionRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpnGateway<T>(params: DeleteVpnGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deprovisionByoipCidr<T>(params: DeprovisionByoipCidrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deprovisionIpamByoasn<T>(params: DeprovisionIpamByoasnInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deprovisionIpamPoolCidr<T>(params: DeprovisionIpamPoolCidrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deprovisionPublicIpv4PoolCidr<T>(params: DeprovisionPublicIpv4PoolCidrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterImage<T>(params: DeregisterImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterInstanceEventNotificationAttributes<T>(params: DeregisterInstanceEventNotificationAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterTransitGatewayMulticastGroupMembers<T>(params: DeregisterTransitGatewayMulticastGroupMembersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterTransitGatewayMulticastGroupSources<T>(params: DeregisterTransitGatewayMulticastGroupSourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAccountAttributes<T>(params: DescribeAccountAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAddresses<T>(params: DescribeAddressesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAddressesAttribute<T>(params: DescribeAddressesAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAddressTransfers<T>(params: DescribeAddressTransfersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAggregateIdFormat<T>(params: DescribeAggregateIdFormatInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAvailabilityZones<T>(params: DescribeAvailabilityZonesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAwsNetworkPerformanceMetricSubscriptions<T>(params: DescribeAwsNetworkPerformanceMetricSubscriptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeBundleTasks<T>(params: DescribeBundleTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeByoipCidrs<T>(params: DescribeByoipCidrsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCapacityBlockExtensionHistory<T>(params: DescribeCapacityBlockExtensionHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCapacityBlockExtensionOfferings<T>(params: DescribeCapacityBlockExtensionOfferingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCapacityBlockOfferings<T>(params: DescribeCapacityBlockOfferingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCapacityBlocks<T>(params: DescribeCapacityBlocksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCapacityBlockStatus<T>(params: DescribeCapacityBlockStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCapacityManagerDataExports<T>(params: DescribeCapacityManagerDataExportsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCapacityReservationBillingRequests<T>(params: DescribeCapacityReservationBillingRequestsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCapacityReservationFleets<T>(params: DescribeCapacityReservationFleetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCapacityReservations<T>(params: DescribeCapacityReservationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCapacityReservationTopology<T>(params: DescribeCapacityReservationTopologyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCarrierGateways<T>(params: DescribeCarrierGatewaysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClassicLinkInstances<T>(params: DescribeClassicLinkInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClientVpnAuthorizationRules<T>(params: DescribeClientVpnAuthorizationRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClientVpnConnections<T>(params: DescribeClientVpnConnectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClientVpnEndpoints<T>(params: DescribeClientVpnEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClientVpnRoutes<T>(params: DescribeClientVpnRoutesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClientVpnTargetNetworks<T>(params: DescribeClientVpnTargetNetworksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCoipPools<T>(params: DescribeCoipPoolsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConversionTasks<T>(params: DescribeConversionTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCustomerGateways<T>(params: DescribeCustomerGatewaysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDeclarativePoliciesReports<T>(params: DescribeDeclarativePoliciesReportsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDhcpOptions<T>(params: DescribeDhcpOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEgressOnlyInternetGateways<T>(params: DescribeEgressOnlyInternetGatewaysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeElasticGpus<T>(params: DescribeElasticGpusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeExportImageTasks<T>(params: DescribeExportImageTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeExportTasks<T>(params: DescribeExportTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFastLaunchImages<T>(params: DescribeFastLaunchImagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFastSnapshotRestores<T>(params: DescribeFastSnapshotRestoresInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFleetHistory<T>(params: DescribeFleetHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFleetInstances<T>(params: DescribeFleetInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFleets<T>(params: DescribeFleetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFlowLogs<T>(params: DescribeFlowLogsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFpgaImageAttribute<T>(params: DescribeFpgaImageAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFpgaImages<T>(params: DescribeFpgaImagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeHostReservationOfferings<T>(params: DescribeHostReservationOfferingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeHostReservations<T>(params: DescribeHostReservationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeHosts<T>(params: DescribeHostsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIamInstanceProfileAssociations<T>(params: DescribeIamInstanceProfileAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIdentityIdFormat<T>(params: DescribeIdentityIdFormatInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIdFormat<T>(params: DescribeIdFormatInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImageAttribute<T>(params: DescribeImageAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImageReferences<T>(params: DescribeImageReferencesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImages<T>(params: DescribeImagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImageUsageReportEntries<T>(params: DescribeImageUsageReportEntriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImageUsageReports<T>(params: DescribeImageUsageReportsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImportImageTasks<T>(params: DescribeImportImageTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImportSnapshotTasks<T>(params: DescribeImportSnapshotTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceAttribute<T>(params: DescribeInstanceAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceConnectEndpoints<T>(params: DescribeInstanceConnectEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceCreditSpecifications<T>(params: DescribeInstanceCreditSpecificationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceEventNotificationAttributes<T>(params: DescribeInstanceEventNotificationAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceEventWindows<T>(params: DescribeInstanceEventWindowsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceImageMetadata<T>(params: DescribeInstanceImageMetadataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstances<T>(params: DescribeInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceSqlHaHistoryStates<T>(params: DescribeInstanceSqlHaHistoryStatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceSqlHaStates<T>(params: DescribeInstanceSqlHaStatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceStatus<T>(params: DescribeInstanceStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceTopology<T>(params: DescribeInstanceTopologyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceTypeOfferings<T>(params: DescribeInstanceTypeOfferingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceTypes<T>(params: DescribeInstanceTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInternetGateways<T>(params: DescribeInternetGatewaysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIpamByoasn<T>(params: DescribeIpamByoasnInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIpamExternalResourceVerificationTokens<T>(params: DescribeIpamExternalResourceVerificationTokensInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIpamPolicies<T>(params: DescribeIpamPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIpamPools<T>(params: DescribeIpamPoolsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIpamPrefixListResolvers<T>(params: DescribeIpamPrefixListResolversInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIpamPrefixListResolverTargets<T>(params: DescribeIpamPrefixListResolverTargetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIpamResourceDiscoveries<T>(params: DescribeIpamResourceDiscoveriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIpamResourceDiscoveryAssociations<T>(params: DescribeIpamResourceDiscoveryAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIpams<T>(params: DescribeIpamsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIpamScopes<T>(params: DescribeIpamScopesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIpv6Pools<T>(params: DescribeIpv6PoolsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeKeyPairs<T>(params: DescribeKeyPairsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLaunchTemplates<T>(params: DescribeLaunchTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLaunchTemplateVersions<T>(params: DescribeLaunchTemplateVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLocalGatewayRouteTables<T>(params: DescribeLocalGatewayRouteTablesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLocalGatewayRouteTableVirtualInterfaceGroupAssociations<T>(params: DescribeLocalGatewayRouteTableVirtualInterfaceGroupAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLocalGatewayRouteTableVpcAssociations<T>(params: DescribeLocalGatewayRouteTableVpcAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLocalGateways<T>(params: DescribeLocalGatewaysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLocalGatewayVirtualInterfaceGroups<T>(params: DescribeLocalGatewayVirtualInterfaceGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLocalGatewayVirtualInterfaces<T>(params: DescribeLocalGatewayVirtualInterfacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLockedSnapshots<T>(params: DescribeLockedSnapshotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMacHosts<T>(params: DescribeMacHostsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMacModificationTasks<T>(params: DescribeMacModificationTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeManagedPrefixLists<T>(params: DescribeManagedPrefixListsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMovingAddresses<T>(params: DescribeMovingAddressesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNatGateways<T>(params: DescribeNatGatewaysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNetworkAcls<T>(params: DescribeNetworkAclsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNetworkInsightsAccessScopeAnalyses<T>(params: DescribeNetworkInsightsAccessScopeAnalysesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNetworkInsightsAccessScopes<T>(params: DescribeNetworkInsightsAccessScopesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNetworkInsightsAnalyses<T>(params: DescribeNetworkInsightsAnalysesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNetworkInsightsPaths<T>(params: DescribeNetworkInsightsPathsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNetworkInterfaceAttribute<T>(params: DescribeNetworkInterfaceAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNetworkInterfacePermissions<T>(params: DescribeNetworkInterfacePermissionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNetworkInterfaces<T>(params: DescribeNetworkInterfacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOutpostLags<T>(params: DescribeOutpostLagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePlacementGroups<T>(params: DescribePlacementGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePrefixLists<T>(params: DescribePrefixListsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePrincipalIdFormat<T>(params: DescribePrincipalIdFormatInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePublicIpv4Pools<T>(params: DescribePublicIpv4PoolsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRegions<T>(params: DescribeRegionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplaceRootVolumeTasks<T>(params: DescribeReplaceRootVolumeTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedInstances<T>(params: DescribeReservedInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedInstancesListings<T>(params: DescribeReservedInstancesListingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedInstancesModifications<T>(params: DescribeReservedInstancesModificationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedInstancesOfferings<T>(params: DescribeReservedInstancesOfferingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRouteServerEndpoints<T>(params: DescribeRouteServerEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRouteServerPeers<T>(params: DescribeRouteServerPeersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRouteServers<T>(params: DescribeRouteServersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRouteTables<T>(params: DescribeRouteTablesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeScheduledInstanceAvailability<T>(params: DescribeScheduledInstanceAvailabilityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeScheduledInstances<T>(params: DescribeScheduledInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSecondaryInterfaces<T>(params: DescribeSecondaryInterfacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSecondaryNetworks<T>(params: DescribeSecondaryNetworksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSecondarySubnets<T>(params: DescribeSecondarySubnetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSecurityGroupReferences<T>(params: DescribeSecurityGroupReferencesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSecurityGroupRules<T>(params: DescribeSecurityGroupRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSecurityGroups<T>(params: DescribeSecurityGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSecurityGroupVpcAssociations<T>(params: DescribeSecurityGroupVpcAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeServiceLinkVirtualInterfaces<T>(params: DescribeServiceLinkVirtualInterfacesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSnapshotAttribute<T>(params: DescribeSnapshotAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSnapshots<T>(params: DescribeSnapshotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSnapshotTierStatus<T>(params: DescribeSnapshotTierStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSpotDatafeedSubscription<T>(params: DescribeSpotDatafeedSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSpotFleetInstances<T>(params: DescribeSpotFleetInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSpotFleetRequestHistory<T>(params: DescribeSpotFleetRequestHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSpotFleetRequests<T>(params: DescribeSpotFleetRequestsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSpotInstanceRequests<T>(params: DescribeSpotInstanceRequestsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSpotPriceHistory<T>(params: DescribeSpotPriceHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStaleSecurityGroups<T>(params: DescribeStaleSecurityGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStoreImageTasks<T>(params: DescribeStoreImageTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSubnets<T>(params: DescribeSubnetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTags<T>(params: DescribeTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTrafficMirrorFilterRules<T>(params: DescribeTrafficMirrorFilterRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTrafficMirrorFilters<T>(params: DescribeTrafficMirrorFiltersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTrafficMirrorSessions<T>(params: DescribeTrafficMirrorSessionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTrafficMirrorTargets<T>(params: DescribeTrafficMirrorTargetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTransitGatewayAttachments<T>(params: DescribeTransitGatewayAttachmentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTransitGatewayConnectPeers<T>(params: DescribeTransitGatewayConnectPeersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTransitGatewayConnects<T>(params: DescribeTransitGatewayConnectsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTransitGatewayMeteringPolicies<T>(params: DescribeTransitGatewayMeteringPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTransitGatewayMulticastDomains<T>(params: DescribeTransitGatewayMulticastDomainsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTransitGatewayPeeringAttachments<T>(params: DescribeTransitGatewayPeeringAttachmentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTransitGatewayPolicyTables<T>(params: DescribeTransitGatewayPolicyTablesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTransitGatewayRouteTableAnnouncements<T>(params: DescribeTransitGatewayRouteTableAnnouncementsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTransitGatewayRouteTables<T>(params: DescribeTransitGatewayRouteTablesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTransitGateways<T>(params: DescribeTransitGatewaysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTransitGatewayVpcAttachments<T>(params: DescribeTransitGatewayVpcAttachmentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTrunkInterfaceAssociations<T>(params: DescribeTrunkInterfaceAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVerifiedAccessEndpoints<T>(params: DescribeVerifiedAccessEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVerifiedAccessGroups<T>(params: DescribeVerifiedAccessGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVerifiedAccessInstanceLoggingConfigurations<T>(params: DescribeVerifiedAccessInstanceLoggingConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVerifiedAccessInstances<T>(params: DescribeVerifiedAccessInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVerifiedAccessTrustProviders<T>(params: DescribeVerifiedAccessTrustProvidersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVolumeAttribute<T>(params: DescribeVolumeAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVolumes<T>(params: DescribeVolumesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVolumesModifications<T>(params: DescribeVolumesModificationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVolumeStatus<T>(params: DescribeVolumeStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcAttribute<T>(params: DescribeVpcAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcBlockPublicAccessExclusions<T>(params: DescribeVpcBlockPublicAccessExclusionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcBlockPublicAccessOptions<T>(params: DescribeVpcBlockPublicAccessOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcClassicLink<T>(params: DescribeVpcClassicLinkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcClassicLinkDnsSupport<T>(params: DescribeVpcClassicLinkDnsSupportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcEncryptionControls<T>(params: DescribeVpcEncryptionControlsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcEndpointAssociations<T>(params: DescribeVpcEndpointAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcEndpointConnectionNotifications<T>(params: DescribeVpcEndpointConnectionNotificationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcEndpointConnections<T>(params: DescribeVpcEndpointConnectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcEndpoints<T>(params: DescribeVpcEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcEndpointServiceConfigurations<T>(params: DescribeVpcEndpointServiceConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcEndpointServicePermissions<T>(params: DescribeVpcEndpointServicePermissionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcEndpointServices<T>(params: DescribeVpcEndpointServicesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcPeeringConnections<T>(params: DescribeVpcPeeringConnectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcs<T>(params: DescribeVpcsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpnConcentrators<T>(params: DescribeVpnConcentratorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpnConnections<T>(params: DescribeVpnConnectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpnGateways<T>(params: DescribeVpnGatewaysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachClassicLinkVpc<T>(params: DetachClassicLinkVpcInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachInternetGateway<T>(params: DetachInternetGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachNetworkInterface<T>(params: DetachNetworkInterfaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachVerifiedAccessTrustProvider<T>(params: DetachVerifiedAccessTrustProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachVolume<T>(params: DetachVolumeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachVpnGateway<T>(params: DetachVpnGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableAddressTransfer<T>(params: DisableAddressTransferInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableAllowedImagesSettings<T>(params: DisableAllowedImagesSettingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableAwsNetworkPerformanceMetricSubscription<T>(params: DisableAwsNetworkPerformanceMetricSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableCapacityManager<T>(params: DisableCapacityManagerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableEbsEncryptionByDefault<T>(params: DisableEbsEncryptionByDefaultInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableFastLaunch<T>(params: DisableFastLaunchInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableFastSnapshotRestores<T>(params: DisableFastSnapshotRestoresInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableImage<T>(params: DisableImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableImageBlockPublicAccess<T>(params: DisableImageBlockPublicAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableImageDeprecation<T>(params: DisableImageDeprecationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableImageDeregistrationProtection<T>(params: DisableImageDeregistrationProtectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableInstanceSqlHaStandbyDetections<T>(params: DisableInstanceSqlHaStandbyDetectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableIpamOrganizationAdminAccount<T>(params: DisableIpamOrganizationAdminAccountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableIpamPolicy<T>(params: DisableIpamPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableRouteServerPropagation<T>(params: DisableRouteServerPropagationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableSerialConsoleAccess<T>(params: DisableSerialConsoleAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableSnapshotBlockPublicAccess<T>(params: DisableSnapshotBlockPublicAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableTransitGatewayRouteTablePropagation<T>(params: DisableTransitGatewayRouteTablePropagationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableVgwRoutePropagation<T>(params: DisableVgwRoutePropagationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableVpcClassicLink<T>(params: DisableVpcClassicLinkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableVpcClassicLinkDnsSupport<T>(params: DisableVpcClassicLinkDnsSupportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateAddress<T>(params: DisassociateAddressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateCapacityReservationBillingOwner<T>(params: DisassociateCapacityReservationBillingOwnerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateClientVpnTargetNetwork<T>(params: DisassociateClientVpnTargetNetworkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateEnclaveCertificateIamRole<T>(params: DisassociateEnclaveCertificateIamRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateIamInstanceProfile<T>(params: DisassociateIamInstanceProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateInstanceEventWindow<T>(params: DisassociateInstanceEventWindowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateIpamByoasn<T>(params: DisassociateIpamByoasnInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateIpamResourceDiscovery<T>(params: DisassociateIpamResourceDiscoveryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateNatGatewayAddress<T>(params: DisassociateNatGatewayAddressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateRouteServer<T>(params: DisassociateRouteServerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateRouteTable<T>(params: DisassociateRouteTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateSecurityGroupVpc<T>(params: DisassociateSecurityGroupVpcInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateSubnetCidrBlock<T>(params: DisassociateSubnetCidrBlockInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateTransitGatewayMulticastDomain<T>(params: DisassociateTransitGatewayMulticastDomainInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateTransitGatewayPolicyTable<T>(params: DisassociateTransitGatewayPolicyTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateTransitGatewayRouteTable<T>(params: DisassociateTransitGatewayRouteTableInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateTrunkInterface<T>(params: DisassociateTrunkInterfaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateVpcCidrBlock<T>(params: DisassociateVpcCidrBlockInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableAddressTransfer<T>(params: EnableAddressTransferInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableAllowedImagesSettings<T>(params: EnableAllowedImagesSettingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableAwsNetworkPerformanceMetricSubscription<T>(params: EnableAwsNetworkPerformanceMetricSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableCapacityManager<T>(params: EnableCapacityManagerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableEbsEncryptionByDefault<T>(params: EnableEbsEncryptionByDefaultInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableFastLaunch<T>(params: EnableFastLaunchInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableFastSnapshotRestores<T>(params: EnableFastSnapshotRestoresInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableImage<T>(params: EnableImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableImageBlockPublicAccess<T>(params: EnableImageBlockPublicAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableImageDeprecation<T>(params: EnableImageDeprecationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableImageDeregistrationProtection<T>(params: EnableImageDeregistrationProtectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableInstanceSqlHaStandbyDetections<T>(params: EnableInstanceSqlHaStandbyDetectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableIpamOrganizationAdminAccount<T>(params: EnableIpamOrganizationAdminAccountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableIpamPolicy<T>(params: EnableIpamPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableReachabilityAnalyzerOrganizationSharing<T>(params: EnableReachabilityAnalyzerOrganizationSharingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableRouteServerPropagation<T>(params: EnableRouteServerPropagationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableSerialConsoleAccess<T>(params: EnableSerialConsoleAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableSnapshotBlockPublicAccess<T>(params: EnableSnapshotBlockPublicAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableTransitGatewayRouteTablePropagation<T>(params: EnableTransitGatewayRouteTablePropagationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableVgwRoutePropagation<T>(params: EnableVgwRoutePropagationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableVolumeIO<T>(params: EnableVolumeIOInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableVpcClassicLink<T>(params: EnableVpcClassicLinkInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableVpcClassicLinkDnsSupport<T>(params: EnableVpcClassicLinkDnsSupportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  exportClientVpnClientCertificateRevocationList<T>(params: ExportClientVpnClientCertificateRevocationListInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  exportClientVpnClientConfiguration<T>(params: ExportClientVpnClientConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  exportImage<T>(params: ExportImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  exportTransitGatewayRoutes<T>(params: ExportTransitGatewayRoutesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  exportVerifiedAccessInstanceClientConfiguration<T>(params: ExportVerifiedAccessInstanceClientConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getActiveVpnTunnelStatus<T>(params: GetActiveVpnTunnelStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAllowedImagesSettings<T>(params: GetAllowedImagesSettingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAssociatedEnclaveCertificateIamRoles<T>(params: GetAssociatedEnclaveCertificateIamRolesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAssociatedIpv6PoolCidrs<T>(params: GetAssociatedIpv6PoolCidrsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAwsNetworkPerformanceData<T>(params: GetAwsNetworkPerformanceDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCapacityManagerAttributes<T>(params: GetCapacityManagerAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCapacityManagerMetricData<T>(params: GetCapacityManagerMetricDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCapacityManagerMetricDimensions<T>(params: GetCapacityManagerMetricDimensionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCapacityReservationUsage<T>(params: GetCapacityReservationUsageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCoipPoolUsage<T>(params: GetCoipPoolUsageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getConsoleOutput<T>(params: GetConsoleOutputInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getConsoleScreenshot<T>(params: GetConsoleScreenshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDeclarativePoliciesReportSummary<T>(params: GetDeclarativePoliciesReportSummaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDefaultCreditSpecification<T>(params: GetDefaultCreditSpecificationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEbsDefaultKmsKeyId<T>(params: GetEbsDefaultKmsKeyIdInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEbsEncryptionByDefault<T>(params: GetEbsEncryptionByDefaultInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getEnabledIpamPolicy<T>(params: GetEnabledIpamPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getFlowLogsIntegrationTemplate<T>(params: GetFlowLogsIntegrationTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getGroupsForCapacityReservation<T>(params: GetGroupsForCapacityReservationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getHostReservationPurchasePreview<T>(params: GetHostReservationPurchasePreviewInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getImageAncestry<T>(params: GetImageAncestryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getImageBlockPublicAccessState<T>(params: GetImageBlockPublicAccessStateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getInstanceMetadataDefaults<T>(params: GetInstanceMetadataDefaultsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getInstanceTpmEkPub<T>(params: GetInstanceTpmEkPubInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getInstanceTypesFromInstanceRequirements<T>(params: GetInstanceTypesFromInstanceRequirementsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getInstanceUefiData<T>(params: GetInstanceUefiDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIpamAddressHistory<T>(params: GetIpamAddressHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIpamDiscoveredAccounts<T>(params: GetIpamDiscoveredAccountsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIpamDiscoveredPublicAddresses<T>(params: GetIpamDiscoveredPublicAddressesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIpamDiscoveredResourceCidrs<T>(params: GetIpamDiscoveredResourceCidrsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIpamPolicyAllocationRules<T>(params: GetIpamPolicyAllocationRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIpamPolicyOrganizationTargets<T>(params: GetIpamPolicyOrganizationTargetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIpamPoolAllocations<T>(params: GetIpamPoolAllocationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIpamPoolCidrs<T>(params: GetIpamPoolCidrsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIpamPrefixListResolverRules<T>(params: GetIpamPrefixListResolverRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIpamPrefixListResolverVersionEntries<T>(params: GetIpamPrefixListResolverVersionEntriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIpamPrefixListResolverVersions<T>(params: GetIpamPrefixListResolverVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIpamResourceCidrs<T>(params: GetIpamResourceCidrsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLaunchTemplateData<T>(params: GetLaunchTemplateDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getManagedPrefixListAssociations<T>(params: GetManagedPrefixListAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getManagedPrefixListEntries<T>(params: GetManagedPrefixListEntriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getNetworkInsightsAccessScopeAnalysisFindings<T>(params: GetNetworkInsightsAccessScopeAnalysisFindingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getNetworkInsightsAccessScopeContent<T>(params: GetNetworkInsightsAccessScopeContentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPasswordData<T>(params: GetPasswordDataInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getReservedInstancesExchangeQuote<T>(params: GetReservedInstancesExchangeQuoteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRouteServerAssociations<T>(params: GetRouteServerAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRouteServerPropagations<T>(params: GetRouteServerPropagationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRouteServerRoutingDatabase<T>(params: GetRouteServerRoutingDatabaseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSecurityGroupsForVpc<T>(params: GetSecurityGroupsForVpcInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSerialConsoleAccessStatus<T>(params: GetSerialConsoleAccessStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSnapshotBlockPublicAccessState<T>(params: GetSnapshotBlockPublicAccessStateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSpotPlacementScores<T>(params: GetSpotPlacementScoresInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSubnetCidrReservations<T>(params: GetSubnetCidrReservationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTransitGatewayAttachmentPropagations<T>(params: GetTransitGatewayAttachmentPropagationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTransitGatewayMeteringPolicyEntries<T>(params: GetTransitGatewayMeteringPolicyEntriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTransitGatewayMulticastDomainAssociations<T>(params: GetTransitGatewayMulticastDomainAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTransitGatewayPolicyTableAssociations<T>(params: GetTransitGatewayPolicyTableAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTransitGatewayPolicyTableEntries<T>(params: GetTransitGatewayPolicyTableEntriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTransitGatewayPrefixListReferences<T>(params: GetTransitGatewayPrefixListReferencesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTransitGatewayRouteTableAssociations<T>(params: GetTransitGatewayRouteTableAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTransitGatewayRouteTablePropagations<T>(params: GetTransitGatewayRouteTablePropagationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVerifiedAccessEndpointPolicy<T>(params: GetVerifiedAccessEndpointPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVerifiedAccessEndpointTargets<T>(params: GetVerifiedAccessEndpointTargetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVerifiedAccessGroupPolicy<T>(params: GetVerifiedAccessGroupPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVpcResourcesBlockingEncryptionEnforcement<T>(params: GetVpcResourcesBlockingEncryptionEnforcementInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVpnConnectionDeviceSampleConfiguration<T>(params: GetVpnConnectionDeviceSampleConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVpnConnectionDeviceTypes<T>(params: GetVpnConnectionDeviceTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getVpnTunnelReplacementStatus<T>(params: GetVpnTunnelReplacementStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importClientVpnClientCertificateRevocationList<T>(params: ImportClientVpnClientCertificateRevocationListInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importImage<T>(params: ImportImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importInstance<T>(params: ImportInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importKeyPair<T>(params: ImportKeyPairInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importSnapshot<T>(params: ImportSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importVolume<T>(params: ImportVolumeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listImagesInRecycleBin<T>(params: ListImagesInRecycleBinInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSnapshotsInRecycleBin<T>(params: ListSnapshotsInRecycleBinInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listVolumesInRecycleBin<T>(params: ListVolumesInRecycleBinInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  lockSnapshot<T>(params: LockSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyAddressAttribute<T>(params: ModifyAddressAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyAvailabilityZoneGroup<T>(params: ModifyAvailabilityZoneGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyCapacityReservation<T>(params: ModifyCapacityReservationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyCapacityReservationFleet<T>(params: ModifyCapacityReservationFleetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyClientVpnEndpoint<T>(params: ModifyClientVpnEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDefaultCreditSpecification<T>(params: ModifyDefaultCreditSpecificationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyEbsDefaultKmsKeyId<T>(params: ModifyEbsDefaultKmsKeyIdInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyFleet<T>(params: ModifyFleetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyFpgaImageAttribute<T>(params: ModifyFpgaImageAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyHosts<T>(params: ModifyHostsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyIdentityIdFormat<T>(params: ModifyIdentityIdFormatInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyIdFormat<T>(params: ModifyIdFormatInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyImageAttribute<T>(params: ModifyImageAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceAttribute<T>(params: ModifyInstanceAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceCapacityReservationAttributes<T>(params: ModifyInstanceCapacityReservationAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceConnectEndpoint<T>(params: ModifyInstanceConnectEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceCpuOptions<T>(params: ModifyInstanceCpuOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceCreditSpecification<T>(params: ModifyInstanceCreditSpecificationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceEventStartTime<T>(params: ModifyInstanceEventStartTimeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceEventWindow<T>(params: ModifyInstanceEventWindowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceMaintenanceOptions<T>(params: ModifyInstanceMaintenanceOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceMetadataDefaults<T>(params: ModifyInstanceMetadataDefaultsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceMetadataOptions<T>(params: ModifyInstanceMetadataOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceNetworkPerformanceOptions<T>(params: ModifyInstanceNetworkPerformanceOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstancePlacement<T>(params: ModifyInstancePlacementInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyIpam<T>(params: ModifyIpamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyIpamPolicyAllocationRules<T>(params: ModifyIpamPolicyAllocationRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyIpamPool<T>(params: ModifyIpamPoolInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyIpamPrefixListResolver<T>(params: ModifyIpamPrefixListResolverInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyIpamPrefixListResolverTarget<T>(params: ModifyIpamPrefixListResolverTargetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyIpamResourceCidr<T>(params: ModifyIpamResourceCidrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyIpamResourceDiscovery<T>(params: ModifyIpamResourceDiscoveryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyIpamScope<T>(params: ModifyIpamScopeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyLaunchTemplate<T>(params: ModifyLaunchTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyLocalGatewayRoute<T>(params: ModifyLocalGatewayRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyManagedPrefixList<T>(params: ModifyManagedPrefixListInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyNetworkInterfaceAttribute<T>(params: ModifyNetworkInterfaceAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyPrivateDnsNameOptions<T>(params: ModifyPrivateDnsNameOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyPublicIpDnsNameOptions<T>(params: ModifyPublicIpDnsNameOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyReservedInstances<T>(params: ModifyReservedInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyRouteServer<T>(params: ModifyRouteServerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifySecurityGroupRules<T>(params: ModifySecurityGroupRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifySnapshotAttribute<T>(params: ModifySnapshotAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifySnapshotTier<T>(params: ModifySnapshotTierInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifySpotFleetRequest<T>(params: ModifySpotFleetRequestInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifySubnetAttribute<T>(params: ModifySubnetAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyTrafficMirrorFilterNetworkServices<T>(params: ModifyTrafficMirrorFilterNetworkServicesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyTrafficMirrorFilterRule<T>(params: ModifyTrafficMirrorFilterRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyTrafficMirrorSession<T>(params: ModifyTrafficMirrorSessionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyTransitGateway<T>(params: ModifyTransitGatewayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyTransitGatewayMeteringPolicy<T>(params: ModifyTransitGatewayMeteringPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyTransitGatewayPrefixListReference<T>(params: ModifyTransitGatewayPrefixListReferenceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyTransitGatewayVpcAttachment<T>(params: ModifyTransitGatewayVpcAttachmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVerifiedAccessEndpoint<T>(params: ModifyVerifiedAccessEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVerifiedAccessEndpointPolicy<T>(params: ModifyVerifiedAccessEndpointPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVerifiedAccessGroup<T>(params: ModifyVerifiedAccessGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVerifiedAccessGroupPolicy<T>(params: ModifyVerifiedAccessGroupPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVerifiedAccessInstance<T>(params: ModifyVerifiedAccessInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVerifiedAccessInstanceLoggingConfiguration<T>(params: ModifyVerifiedAccessInstanceLoggingConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVerifiedAccessTrustProvider<T>(params: ModifyVerifiedAccessTrustProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVolume<T>(params: ModifyVolumeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVolumeAttribute<T>(params: ModifyVolumeAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpcAttribute<T>(params: ModifyVpcAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpcBlockPublicAccessExclusion<T>(params: ModifyVpcBlockPublicAccessExclusionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpcBlockPublicAccessOptions<T>(params: ModifyVpcBlockPublicAccessOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpcEncryptionControl<T>(params: ModifyVpcEncryptionControlInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpcEndpoint<T>(params: ModifyVpcEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpcEndpointConnectionNotification<T>(params: ModifyVpcEndpointConnectionNotificationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpcEndpointServiceConfiguration<T>(params: ModifyVpcEndpointServiceConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpcEndpointServicePayerResponsibility<T>(params: ModifyVpcEndpointServicePayerResponsibilityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpcEndpointServicePermissions<T>(params: ModifyVpcEndpointServicePermissionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpcPeeringConnectionOptions<T>(params: ModifyVpcPeeringConnectionOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpcTenancy<T>(params: ModifyVpcTenancyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpnConnection<T>(params: ModifyVpnConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpnConnectionOptions<T>(params: ModifyVpnConnectionOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpnTunnelCertificate<T>(params: ModifyVpnTunnelCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyVpnTunnelOptions<T>(params: ModifyVpnTunnelOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  monitorInstances<T>(params: MonitorInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  moveAddressToVpc<T>(params: MoveAddressToVpcInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  moveByoipCidrToIpam<T>(params: MoveByoipCidrToIpamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  moveCapacityReservationInstances<T>(params: MoveCapacityReservationInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  provisionByoipCidr<T>(params: ProvisionByoipCidrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  provisionIpamByoasn<T>(params: ProvisionIpamByoasnInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  provisionIpamPoolCidr<T>(params: ProvisionIpamPoolCidrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  provisionPublicIpv4PoolCidr<T>(params: ProvisionPublicIpv4PoolCidrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  purchaseCapacityBlock<T>(params: PurchaseCapacityBlockInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  purchaseCapacityBlockExtension<T>(params: PurchaseCapacityBlockExtensionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  purchaseHostReservation<T>(params: PurchaseHostReservationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  purchaseReservedInstancesOffering<T>(params: PurchaseReservedInstancesOfferingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  purchaseScheduledInstances<T>(params: PurchaseScheduledInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rebootInstances<T>(params: RebootInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerImage<T>(params: RegisterImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerInstanceEventNotificationAttributes<T>(params: RegisterInstanceEventNotificationAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerTransitGatewayMulticastGroupMembers<T>(params: RegisterTransitGatewayMulticastGroupMembersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerTransitGatewayMulticastGroupSources<T>(params: RegisterTransitGatewayMulticastGroupSourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectCapacityReservationBillingOwnership<T>(params: RejectCapacityReservationBillingOwnershipInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectTransitGatewayMulticastDomainAssociations<T>(params: RejectTransitGatewayMulticastDomainAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectTransitGatewayPeeringAttachment<T>(params: RejectTransitGatewayPeeringAttachmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectTransitGatewayVpcAttachment<T>(params: RejectTransitGatewayVpcAttachmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectVpcEndpointConnections<T>(params: RejectVpcEndpointConnectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectVpcPeeringConnection<T>(params: RejectVpcPeeringConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  releaseAddress<T>(params: ReleaseAddressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  releaseHosts<T>(params: ReleaseHostsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  releaseIpamPoolAllocation<T>(params: ReleaseIpamPoolAllocationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  replaceIamInstanceProfileAssociation<T>(params: ReplaceIamInstanceProfileAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  replaceImageCriteriaInAllowedImagesSettings<T>(params: ReplaceImageCriteriaInAllowedImagesSettingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  replaceNetworkAclAssociation<T>(params: ReplaceNetworkAclAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  replaceNetworkAclEntry<T>(params: ReplaceNetworkAclEntryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  replaceRoute<T>(params: ReplaceRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  replaceRouteTableAssociation<T>(params: ReplaceRouteTableAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  replaceTransitGatewayRoute<T>(params: ReplaceTransitGatewayRouteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  replaceVpnTunnel<T>(params: ReplaceVpnTunnelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  reportInstanceStatus<T>(params: ReportInstanceStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  requestSpotFleet<T>(params: RequestSpotFleetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  requestSpotInstances<T>(params: RequestSpotInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resetAddressAttribute<T>(params: ResetAddressAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resetEbsDefaultKmsKeyId<T>(params: ResetEbsDefaultKmsKeyIdInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resetFpgaImageAttribute<T>(params: ResetFpgaImageAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resetImageAttribute<T>(params: ResetImageAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resetInstanceAttribute<T>(params: ResetInstanceAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resetNetworkInterfaceAttribute<T>(params: ResetNetworkInterfaceAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resetSnapshotAttribute<T>(params: ResetSnapshotAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreAddressToClassic<T>(params: RestoreAddressToClassicInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreImageFromRecycleBin<T>(params: RestoreImageFromRecycleBinInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreManagedPrefixListVersion<T>(params: RestoreManagedPrefixListVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreSnapshotFromRecycleBin<T>(params: RestoreSnapshotFromRecycleBinInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreSnapshotTier<T>(params: RestoreSnapshotTierInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreVolumeFromRecycleBin<T>(params: RestoreVolumeFromRecycleBinInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  revokeClientVpnIngress<T>(params: RevokeClientVpnIngressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  revokeSecurityGroupEgress<T>(params: RevokeSecurityGroupEgressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  revokeSecurityGroupIngress<T>(params: RevokeSecurityGroupIngressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  runInstances<T>(params: RunInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  runScheduledInstances<T>(params: RunScheduledInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchLocalGatewayRoutes<T>(params: SearchLocalGatewayRoutesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchTransitGatewayMulticastGroups<T>(params: SearchTransitGatewayMulticastGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchTransitGatewayRoutes<T>(params: SearchTransitGatewayRoutesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendDiagnosticInterrupt<T>(params: SendDiagnosticInterruptInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDeclarativePoliciesReport<T>(params: StartDeclarativePoliciesReportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startInstances<T>(params: StartInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startNetworkInsightsAccessScopeAnalysis<T>(params: StartNetworkInsightsAccessScopeAnalysisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startNetworkInsightsAnalysis<T>(params: StartNetworkInsightsAnalysisInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startVpcEndpointServicePrivateDnsVerification<T>(params: StartVpcEndpointServicePrivateDnsVerificationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopInstances<T>(params: StopInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  terminateClientVpnConnections<T>(params: TerminateClientVpnConnectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  terminateInstances<T>(params: TerminateInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  unassignIpv6Addresses<T>(params: UnassignIpv6AddressesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  unassignPrivateIpAddresses<T>(params: UnassignPrivateIpAddressesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  unassignPrivateNatGatewayAddress<T>(params: UnassignPrivateNatGatewayAddressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  unlockSnapshot<T>(params: UnlockSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  unmonitorInstances<T>(params: UnmonitorInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateCapacityManagerOrganizationsAccess<T>(params: UpdateCapacityManagerOrganizationsAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateInterruptibleCapacityReservationAllocation<T>(params: UpdateInterruptibleCapacityReservationAllocationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSecurityGroupRuleDescriptionsEgress<T>(params: UpdateSecurityGroupRuleDescriptionsEgressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSecurityGroupRuleDescriptionsIngress<T>(params: UpdateSecurityGroupRuleDescriptionsIngressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  withdrawByoipCidr<T>(params: WithdrawByoipCidrInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
