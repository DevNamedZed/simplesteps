// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface AggregateResourceIdentifier {
  /** The 12-digit account ID of the source account. */
  SourceAccountId: string;
  /** The source region where data is aggregated. */
  SourceRegion: string;
  /** The ID of the Amazon Web Services resource. */
  ResourceId: string;
  /** The type of the Amazon Web Services resource. */
  ResourceType: 'AWS::EC2::CustomerGateway' | 'AWS::EC2::EIP' | 'AWS::EC2::Host' | 'AWS::EC2::Instance' | 'AWS::EC2::InternetGateway' | 'AWS::EC2::NetworkAcl' | 'AWS::EC2::NetworkInterface' | 'AWS::EC2::RouteTable' | 'AWS::EC2::SecurityGroup' | 'AWS::EC2::Subnet' | 'AWS::CloudTrail::Trail' | 'AWS::EC2::Volume' | 'AWS::EC2::VPC' | 'AWS::EC2::VPNConnection' | 'AWS::EC2::VPNGateway' | 'AWS::EC2::RegisteredHAInstance' | 'AWS::EC2::NatGateway' | 'AWS::EC2::EgressOnlyInternetGateway' | 'AWS::EC2::VPCEndpoint' | 'AWS::EC2::VPCEndpointService' | 'AWS::EC2::FlowLog' | 'AWS::EC2::VPCPeeringConnection' | 'AWS::Elasticsearch::Domain' | 'AWS::IAM::Group' | 'AWS::IAM::Policy' | 'AWS::IAM::Role' | 'AWS::IAM::User' | 'AWS::ElasticLoadBalancingV2::LoadBalancer' | 'AWS::ACM::Certificate' | 'AWS::RDS::DBInstance' | 'AWS::RDS::DBSubnetGroup' | 'AWS::RDS::DBSecurityGroup' | 'AWS::RDS::DBSnapshot' | 'AWS::RDS::DBCluster' | 'AWS::RDS::DBClusterSnapshot' | 'AWS::RDS::EventSubscription' | 'AWS::S3::Bucket' | 'AWS::S3::AccountPublicAccessBlock' | 'AWS::Redshift::Cluster' | 'AWS::Redshift::ClusterSnapshot' | 'AWS::Redshift::ClusterParameterGroup' | 'AWS::Redshift::ClusterSecurityGroup' | 'AWS::Redshift::ClusterSubnetGroup' | 'AWS::Redshift::EventSubscription' | 'AWS::SSM::ManagedInstanceInventory' | 'AWS::CloudWatch::Alarm' | 'AWS::CloudFormation::Stack' | 'AWS::ElasticLoadBalancing::LoadBalancer' | 'AWS::AutoScaling::AutoScalingGroup' | 'AWS::AutoScaling::LaunchConfiguration' | 'AWS::AutoScaling::ScalingPolicy' | 'AWS::AutoScaling::ScheduledAction' | 'AWS::DynamoDB::Table' | 'AWS::CodeBuild::Project' | 'AWS::WAF::RateBasedRule' | 'AWS::WAF::Rule' | 'AWS::WAF::RuleGroup' | 'AWS::WAF::WebACL' | 'AWS::WAFRegional::RateBasedRule' | 'AWS::WAFRegional::Rule' | 'AWS::WAFRegional::RuleGroup' | 'AWS::WAFRegional::WebACL' | 'AWS::CloudFront::Distribution' | 'AWS::CloudFront::StreamingDistribution' | 'AWS::Lambda::Function' | 'AWS::NetworkFirewall::Firewall' | 'AWS::NetworkFirewall::FirewallPolicy' | 'AWS::NetworkFirewall::RuleGroup' | 'AWS::ElasticBeanstalk::Application' | 'AWS::ElasticBeanstalk::ApplicationVersion' | 'AWS::ElasticBeanstalk::Environment' | 'AWS::WAFv2::WebACL' | 'AWS::WAFv2::RuleGroup' | 'AWS::WAFv2::IPSet' | 'AWS::WAFv2::RegexPatternSet' | 'AWS::WAFv2::ManagedRuleSet' | 'AWS::XRay::EncryptionConfig' | 'AWS::SSM::AssociationCompliance' | 'AWS::SSM::PatchCompliance' | 'AWS::Shield::Protection' | 'AWS::ShieldRegional::Protection' | 'AWS::Config::ConformancePackCompliance' | 'AWS::Config::ResourceCompliance' | 'AWS::ApiGateway::Stage' | 'AWS::ApiGateway::RestApi' | 'AWS::ApiGatewayV2::Stage' | 'AWS::ApiGatewayV2::Api' | 'AWS::CodePipeline::Pipeline' | 'AWS::ServiceCatalog::CloudFormationProvisionedProduct' | 'AWS::ServiceCatalog::CloudFormationProduct' | 'AWS::ServiceCatalog::Portfolio' | 'AWS::SQS::Queue' | 'AWS::KMS::Key' | 'AWS::QLDB::Ledger' | 'AWS::SecretsManager::Secret' | 'AWS::SNS::Topic' | 'AWS::SSM::FileData' | 'AWS::Backup::BackupPlan' | 'AWS::Backup::BackupSelection' | 'AWS::Backup::BackupVault' | 'AWS::Backup::RecoveryPoint' | 'AWS::ECR::Repository' | 'AWS::ECS::Cluster' | 'AWS::ECS::Service' | 'AWS::ECS::TaskDefinition' | 'AWS::EFS::AccessPoint' | 'AWS::EFS::FileSystem' | 'AWS::EKS::Cluster' | 'AWS::OpenSearch::Domain' | 'AWS::EC2::TransitGateway' | 'AWS::Kinesis::Stream' | 'AWS::Kinesis::StreamConsumer' | 'AWS::CodeDeploy::Application' | 'AWS::CodeDeploy::DeploymentConfig' | 'AWS::CodeDeploy::DeploymentGroup' | 'AWS::EC2::LaunchTemplate' | 'AWS::ECR::PublicRepository' | 'AWS::GuardDuty::Detector' | 'AWS::EMR::SecurityConfiguration' | 'AWS::SageMaker::CodeRepository' | 'AWS::Route53Resolver::ResolverEndpoint' | 'AWS::Route53Resolver::ResolverRule' | 'AWS::Route53Resolver::ResolverRuleAssociation' | 'AWS::DMS::ReplicationSubnetGroup' | 'AWS::DMS::EventSubscription' | 'AWS::MSK::Cluster' | 'AWS::StepFunctions::Activity' | 'AWS::WorkSpaces::Workspace' | 'AWS::WorkSpaces::ConnectionAlias' | 'AWS::SageMaker::Model' | 'AWS::ElasticLoadBalancingV2::Listener' | 'AWS::StepFunctions::StateMachine' | 'AWS::Batch::JobQueue' | 'AWS::Batch::ComputeEnvironment' | 'AWS::AccessAnalyzer::Analyzer' | 'AWS::Athena::WorkGroup' | 'AWS::Athena::DataCatalog' | 'AWS::Detective::Graph' | 'AWS::GlobalAccelerator::Accelerator' | 'AWS::GlobalAccelerator::EndpointGroup' | 'AWS::GlobalAccelerator::Listener' | 'AWS::EC2::TransitGatewayAttachment' | 'AWS::EC2::TransitGatewayRouteTable' | 'AWS::DMS::Certificate' | 'AWS::AppConfig::Application' | 'AWS::AppSync::GraphQLApi' | 'AWS::DataSync::LocationSMB' | 'AWS::DataSync::LocationFSxLustre' | 'AWS::DataSync::LocationS3' | 'AWS::DataSync::LocationEFS' | 'AWS::DataSync::Task' | 'AWS::DataSync::LocationNFS' | 'AWS::EC2::NetworkInsightsAccessScopeAnalysis' | 'AWS::EKS::FargateProfile' | 'AWS::Glue::Job' | 'AWS::GuardDuty::ThreatIntelSet' | 'AWS::GuardDuty::IPSet' | 'AWS::SageMaker::Workteam' | 'AWS::SageMaker::NotebookInstanceLifecycleConfig' | 'AWS::ServiceDiscovery::Service' | 'AWS::ServiceDiscovery::PublicDnsNamespace' | 'AWS::SES::ContactList' | 'AWS::SES::ConfigurationSet' | 'AWS::Route53::HostedZone' | 'AWS::IoTEvents::Input' | 'AWS::IoTEvents::DetectorModel' | 'AWS::IoTEvents::AlarmModel' | 'AWS::ServiceDiscovery::HttpNamespace' | 'AWS::Events::EventBus' | 'AWS::ImageBuilder::ContainerRecipe' | 'AWS::ImageBuilder::DistributionConfiguration' | 'AWS::ImageBuilder::InfrastructureConfiguration' | 'AWS::DataSync::LocationObjectStorage' | 'AWS::DataSync::LocationHDFS' | 'AWS::Glue::Classifier' | 'AWS::Route53RecoveryReadiness::Cell' | 'AWS::Route53RecoveryReadiness::ReadinessCheck' | 'AWS::ECR::RegistryPolicy' | 'AWS::Backup::ReportPlan' | 'AWS::Lightsail::Certificate' | 'AWS::RUM::AppMonitor' | 'AWS::Events::Endpoint' | 'AWS::SES::ReceiptRuleSet' | 'AWS::Events::Archive' | 'AWS::Events::ApiDestination' | 'AWS::Lightsail::Disk' | 'AWS::FIS::ExperimentTemplate' | 'AWS::DataSync::LocationFSxWindows' | 'AWS::SES::ReceiptFilter' | 'AWS::GuardDuty::Filter' | 'AWS::SES::Template' | 'AWS::AmazonMQ::Broker' | 'AWS::AppConfig::Environment' | 'AWS::AppConfig::ConfigurationProfile' | 'AWS::Cloud9::EnvironmentEC2' | 'AWS::EventSchemas::Registry' | 'AWS::EventSchemas::RegistryPolicy' | 'AWS::EventSchemas::Discoverer' | 'AWS::FraudDetector::Label' | 'AWS::FraudDetector::EntityType' | 'AWS::FraudDetector::Variable' | 'AWS::FraudDetector::Outcome' | 'AWS::IoT::Authorizer' | 'AWS::IoT::SecurityProfile' | 'AWS::IoT::RoleAlias' | 'AWS::IoT::Dimension' | 'AWS::IoTAnalytics::Datastore' | 'AWS::Lightsail::Bucket' | 'AWS::Lightsail::StaticIp' | 'AWS::MediaPackage::PackagingGroup' | 'AWS::Route53RecoveryReadiness::RecoveryGroup' | 'AWS::ResilienceHub::ResiliencyPolicy' | 'AWS::Transfer::Workflow' | 'AWS::EKS::IdentityProviderConfig' | 'AWS::EKS::Addon' | 'AWS::Glue::MLTransform' | 'AWS::IoT::Policy' | 'AWS::IoT::MitigationAction' | 'AWS::IoTTwinMaker::Workspace' | 'AWS::IoTTwinMaker::Entity' | 'AWS::IoTAnalytics::Dataset' | 'AWS::IoTAnalytics::Pipeline' | 'AWS::IoTAnalytics::Channel' | 'AWS::IoTSiteWise::Dashboard' | 'AWS::IoTSiteWise::Project' | 'AWS::IoTSiteWise::Portal' | 'AWS::IoTSiteWise::AssetModel' | 'AWS::IVS::Channel' | 'AWS::IVS::RecordingConfiguration' | 'AWS::IVS::PlaybackKeyPair' | 'AWS::KinesisAnalyticsV2::Application' | 'AWS::RDS::GlobalCluster' | 'AWS::S3::MultiRegionAccessPoint' | 'AWS::DeviceFarm::TestGridProject' | 'AWS::Budgets::BudgetsAction' | 'AWS::Lex::Bot' | 'AWS::CodeGuruReviewer::RepositoryAssociation' | 'AWS::IoT::CustomMetric' | 'AWS::Route53Resolver::FirewallDomainList' | 'AWS::RoboMaker::RobotApplicationVersion' | 'AWS::EC2::TrafficMirrorSession' | 'AWS::IoTSiteWise::Gateway' | 'AWS::Lex::BotAlias' | 'AWS::LookoutMetrics::Alert' | 'AWS::IoT::AccountAuditConfiguration' | 'AWS::EC2::TrafficMirrorTarget' | 'AWS::S3::StorageLens' | 'AWS::IoT::ScheduledAudit' | 'AWS::Events::Connection' | 'AWS::EventSchemas::Schema' | 'AWS::MediaPackage::PackagingConfiguration' | 'AWS::KinesisVideo::SignalingChannel' | 'AWS::AppStream::DirectoryConfig' | 'AWS::LookoutVision::Project' | 'AWS::Route53RecoveryControl::Cluster' | 'AWS::Route53RecoveryControl::SafetyRule' | 'AWS::Route53RecoveryControl::ControlPanel' | 'AWS::Route53RecoveryControl::RoutingControl' | 'AWS::Route53RecoveryReadiness::ResourceSet' | 'AWS::RoboMaker::SimulationApplication' | 'AWS::RoboMaker::RobotApplication' | 'AWS::HealthLake::FHIRDatastore' | 'AWS::Pinpoint::Segment' | 'AWS::Pinpoint::ApplicationSettings' | 'AWS::Events::Rule' | 'AWS::EC2::DHCPOptions' | 'AWS::EC2::NetworkInsightsPath' | 'AWS::EC2::TrafficMirrorFilter' | 'AWS::EC2::IPAM' | 'AWS::IoTTwinMaker::Scene' | 'AWS::NetworkManager::TransitGatewayRegistration' | 'AWS::CustomerProfiles::Domain' | 'AWS::AutoScaling::WarmPool' | 'AWS::Connect::PhoneNumber' | 'AWS::AppConfig::DeploymentStrategy' | 'AWS::AppFlow::Flow' | 'AWS::AuditManager::Assessment' | 'AWS::CloudWatch::MetricStream' | 'AWS::DeviceFarm::InstanceProfile' | 'AWS::DeviceFarm::Project' | 'AWS::EC2::EC2Fleet' | 'AWS::EC2::SubnetRouteTableAssociation' | 'AWS::ECR::PullThroughCacheRule' | 'AWS::GroundStation::Config' | 'AWS::ImageBuilder::ImagePipeline' | 'AWS::IoT::FleetMetric' | 'AWS::IoTWireless::ServiceProfile' | 'AWS::NetworkManager::Device' | 'AWS::NetworkManager::GlobalNetwork' | 'AWS::NetworkManager::Link' | 'AWS::NetworkManager::Site' | 'AWS::Panorama::Package' | 'AWS::Pinpoint::App' | 'AWS::Redshift::ScheduledAction' | 'AWS::Route53Resolver::FirewallRuleGroupAssociation' | 'AWS::SageMaker::AppImageConfig' | 'AWS::SageMaker::Image' | 'AWS::ECS::TaskSet' | 'AWS::Cassandra::Keyspace' | 'AWS::Signer::SigningProfile' | 'AWS::Amplify::App' | 'AWS::AppMesh::VirtualNode' | 'AWS::AppMesh::VirtualService' | 'AWS::AppRunner::VpcConnector' | 'AWS::AppStream::Application' | 'AWS::CodeArtifact::Repository' | 'AWS::EC2::PrefixList' | 'AWS::EC2::SpotFleet' | 'AWS::Evidently::Project' | 'AWS::Forecast::Dataset' | 'AWS::IAM::SAMLProvider' | 'AWS::IAM::ServerCertificate' | 'AWS::Pinpoint::Campaign' | 'AWS::Pinpoint::InAppTemplate' | 'AWS::SageMaker::Domain' | 'AWS::Transfer::Agreement' | 'AWS::Transfer::Connector' | 'AWS::KinesisFirehose::DeliveryStream' | 'AWS::Amplify::Branch' | 'AWS::AppIntegrations::EventIntegration' | 'AWS::AppMesh::Route' | 'AWS::Athena::PreparedStatement' | 'AWS::EC2::IPAMScope' | 'AWS::Evidently::Launch' | 'AWS::Forecast::DatasetGroup' | 'AWS::GreengrassV2::ComponentVersion' | 'AWS::GroundStation::MissionProfile' | 'AWS::MediaConnect::FlowEntitlement' | 'AWS::MediaConnect::FlowVpcInterface' | 'AWS::MediaTailor::PlaybackConfiguration' | 'AWS::MSK::Configuration' | 'AWS::Personalize::Dataset' | 'AWS::Personalize::Schema' | 'AWS::Personalize::Solution' | 'AWS::Pinpoint::EmailTemplate' | 'AWS::Pinpoint::EventStream' | 'AWS::ResilienceHub::App' | 'AWS::ACMPCA::CertificateAuthority' | 'AWS::AppConfig::HostedConfigurationVersion' | 'AWS::AppMesh::VirtualGateway' | 'AWS::AppMesh::VirtualRouter' | 'AWS::AppRunner::Service' | 'AWS::CustomerProfiles::ObjectType' | 'AWS::DMS::Endpoint' | 'AWS::EC2::CapacityReservation' | 'AWS::EC2::ClientVpnEndpoint' | 'AWS::Kendra::Index' | 'AWS::KinesisVideo::Stream' | 'AWS::Logs::Destination' | 'AWS::Pinpoint::EmailChannel' | 'AWS::S3::AccessPoint' | 'AWS::NetworkManager::CustomerGatewayAssociation' | 'AWS::NetworkManager::LinkAssociation' | 'AWS::IoTWireless::MulticastGroup' | 'AWS::Personalize::DatasetGroup' | 'AWS::IoTTwinMaker::ComponentType' | 'AWS::CodeBuild::ReportGroup' | 'AWS::SageMaker::FeatureGroup' | 'AWS::MSK::BatchScramSecret' | 'AWS::AppStream::Stack' | 'AWS::IoT::JobTemplate' | 'AWS::IoTWireless::FuotaTask' | 'AWS::IoT::ProvisioningTemplate' | 'AWS::InspectorV2::Filter' | 'AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation' | 'AWS::ServiceDiscovery::Instance' | 'AWS::Transfer::Certificate' | 'AWS::MediaConnect::FlowSource' | 'AWS::APS::RuleGroupsNamespace' | 'AWS::CodeGuruProfiler::ProfilingGroup' | 'AWS::Route53Resolver::ResolverQueryLoggingConfig' | 'AWS::Batch::SchedulingPolicy' | 'AWS::ACMPCA::CertificateAuthorityActivation' | 'AWS::AppMesh::GatewayRoute' | 'AWS::AppMesh::Mesh' | 'AWS::Connect::Instance' | 'AWS::Connect::QuickConnect' | 'AWS::EC2::CarrierGateway' | 'AWS::EC2::IPAMPool' | 'AWS::EC2::TransitGatewayConnect' | 'AWS::EC2::TransitGatewayMulticastDomain' | 'AWS::ECS::CapacityProvider' | 'AWS::IAM::InstanceProfile' | 'AWS::IoT::CACertificate' | 'AWS::IoTTwinMaker::SyncJob' | 'AWS::KafkaConnect::Connector' | 'AWS::Lambda::CodeSigningConfig' | 'AWS::NetworkManager::ConnectPeer' | 'AWS::ResourceExplorer2::Index' | 'AWS::AppStream::Fleet' | 'AWS::Cognito::UserPool' | 'AWS::Cognito::UserPoolClient' | 'AWS::Cognito::UserPoolGroup' | 'AWS::EC2::NetworkInsightsAccessScope' | 'AWS::EC2::NetworkInsightsAnalysis' | 'AWS::Grafana::Workspace' | 'AWS::GroundStation::DataflowEndpointGroup' | 'AWS::ImageBuilder::ImageRecipe' | 'AWS::KMS::Alias' | 'AWS::M2::Environment' | 'AWS::QuickSight::DataSource' | 'AWS::QuickSight::Template' | 'AWS::QuickSight::Theme' | 'AWS::RDS::OptionGroup' | 'AWS::Redshift::EndpointAccess' | 'AWS::Route53Resolver::FirewallRuleGroup' | 'AWS::SSM::Document' | 'AWS::AppConfig::ExtensionAssociation' | 'AWS::AppIntegrations::Application' | 'AWS::AppSync::ApiCache' | 'AWS::Bedrock::Guardrail' | 'AWS::Bedrock::KnowledgeBase' | 'AWS::Cognito::IdentityPool' | 'AWS::Connect::Rule' | 'AWS::Connect::User' | 'AWS::EC2::ClientVpnTargetNetworkAssociation' | 'AWS::EC2::EIPAssociation' | 'AWS::EC2::IPAMResourceDiscovery' | 'AWS::EC2::IPAMResourceDiscoveryAssociation' | 'AWS::EC2::InstanceConnectEndpoint' | 'AWS::EC2::SnapshotBlockPublicAccess' | 'AWS::EC2::VPCBlockPublicAccessExclusion' | 'AWS::EC2::VPCBlockPublicAccessOptions' | 'AWS::EC2::VPCEndpointConnectionNotification' | 'AWS::EC2::VPNConnectionRoute' | 'AWS::Evidently::Segment' | 'AWS::IAM::OIDCProvider' | 'AWS::InspectorV2::Activation' | 'AWS::MSK::ClusterPolicy' | 'AWS::MSK::VpcConnection' | 'AWS::MediaConnect::Gateway' | 'AWS::MemoryDB::SubnetGroup' | 'AWS::OpenSearchServerless::Collection' | 'AWS::OpenSearchServerless::VpcEndpoint' | 'AWS::Redshift::EndpointAuthorization' | 'AWS::Route53Profiles::Profile' | 'AWS::S3::StorageLensGroup' | 'AWS::S3Express::BucketPolicy' | 'AWS::S3Express::DirectoryBucket' | 'AWS::SageMaker::InferenceExperiment' | 'AWS::SecurityHub::Standard' | 'AWS::Transfer::Profile' | 'AWS::CloudFormation::StackSet' | 'AWS::MediaPackageV2::Channel' | 'AWS::S3::AccessGrantsLocation' | 'AWS::S3::AccessGrant' | 'AWS::S3::AccessGrantsInstance' | 'AWS::EMRServerless::Application' | 'AWS::Config::AggregationAuthorization' | 'AWS::Bedrock::ApplicationInferenceProfile' | 'AWS::ApiGatewayV2::Integration' | 'AWS::SageMaker::MlflowTrackingServer' | 'AWS::SageMaker::ModelBiasJobDefinition' | 'AWS::SecretsManager::RotationSchedule' | 'AWS::Deadline::QueueFleetAssociation' | 'AWS::ECR::RepositoryCreationTemplate' | 'AWS::CloudFormation::LambdaHook' | 'AWS::EC2::SubnetNetworkAclAssociation' | 'AWS::ApiGateway::UsagePlan' | 'AWS::AppConfig::Extension' | 'AWS::Deadline::Fleet' | 'AWS::EMR::Studio' | 'AWS::S3Tables::TableBucket' | 'AWS::CloudFront::RealtimeLogConfig' | 'AWS::BackupGateway::Hypervisor' | 'AWS::BCMDataExports::Export' | 'AWS::CloudFormation::GuardHook' | 'AWS::CloudFront::PublicKey' | 'AWS::CloudTrail::EventDataStore' | 'AWS::EntityResolution::IdMappingWorkflow' | 'AWS::EntityResolution::SchemaMapping' | 'AWS::IoT::DomainConfiguration' | 'AWS::PCAConnectorAD::DirectoryRegistration' | 'AWS::RDS::Integration' | 'AWS::Config::ConformancePack' | 'AWS::RolesAnywhere::Profile' | 'AWS::CodeArtifact::Domain' | 'AWS::Backup::RestoreTestingPlan' | 'AWS::Config::StoredQuery' | 'AWS::SageMaker::DataQualityJobDefinition' | 'AWS::SageMaker::ModelExplainabilityJobDefinition' | 'AWS::SageMaker::ModelQualityJobDefinition' | 'AWS::SageMaker::StudioLifecycleConfig' | 'AWS::SES::DedicatedIpPool' | 'AWS::SES::MailManagerTrafficPolicy' | 'AWS::SSM::ResourceDataSync' | 'AWS::BedrockAgentCore::Runtime' | 'AWS::BedrockAgentCore::BrowserCustom' | 'AWS::ElasticLoadBalancingV2::TargetGroup' | 'AWS::EMRContainers::VirtualCluster' | 'AWS::EntityResolution::MatchingWorkflow' | 'AWS::IoTCoreDeviceAdvisor::SuiteDefinition' | 'AWS::EC2::SecurityGroupVpcAssociation' | 'AWS::EC2::VerifiedAccessInstance' | 'AWS::KafkaConnect::CustomPlugin' | 'AWS::NetworkManager::TransitGatewayPeering' | 'AWS::OpenSearchServerless::SecurityConfig' | 'AWS::Redshift::Integration' | 'AWS::RolesAnywhere::TrustAnchor' | 'AWS::Route53Profiles::ProfileAssociation' | 'AWS::SSMIncidents::ResponsePlan' | 'AWS::Transfer::Server' | 'AWS::Glue::Database' | 'AWS::Organizations::OrganizationalUnit' | 'AWS::EC2::IPAMPoolCidr' | 'AWS::EC2::VPCGatewayAttachment' | 'AWS::Bedrock::Prompt' | 'AWS::Comprehend::Flywheel' | 'AWS::DataSync::Agent' | 'AWS::MediaTailor::LiveSource' | 'AWS::MSK::ServerlessCluster' | 'AWS::IoTSiteWise::Asset' | 'AWS::B2BI::Capability' | 'AWS::CloudFront::KeyValueStore' | 'AWS::Deadline::Monitor' | 'AWS::GuardDuty::MalwareProtectionPlan' | 'AWS::Location::APIKey' | 'AWS::MediaPackageV2::OriginEndpoint' | 'AWS::PCAConnectorAD::Connector' | 'AWS::S3Tables::TableBucketPolicy' | 'AWS::SecretsManager::ResourcePolicy' | 'AWS::SSMContacts::Contact' | 'AWS::IoT::ThingGroup' | 'AWS::ImageBuilder::LifecyclePolicy' | 'AWS::GameLift::Build' | 'AWS::ECR::ReplicationConfiguration' | 'AWS::EC2::SubnetCidrBlock' | 'AWS::Connect::SecurityProfile' | 'AWS::CleanRoomsML::TrainingDataset' | 'AWS::AppStream::AppBlockBuilder' | 'AWS::Route53::DNSSEC' | 'AWS::SageMaker::UserProfile' | 'AWS::ApiGateway::Method';
  /** The name of the Amazon Web Services resource. */
  ResourceName?: string;
}

export interface ResourceKey {
  /** The resource type. */
  resourceType: 'AWS::EC2::CustomerGateway' | 'AWS::EC2::EIP' | 'AWS::EC2::Host' | 'AWS::EC2::Instance' | 'AWS::EC2::InternetGateway' | 'AWS::EC2::NetworkAcl' | 'AWS::EC2::NetworkInterface' | 'AWS::EC2::RouteTable' | 'AWS::EC2::SecurityGroup' | 'AWS::EC2::Subnet' | 'AWS::CloudTrail::Trail' | 'AWS::EC2::Volume' | 'AWS::EC2::VPC' | 'AWS::EC2::VPNConnection' | 'AWS::EC2::VPNGateway' | 'AWS::EC2::RegisteredHAInstance' | 'AWS::EC2::NatGateway' | 'AWS::EC2::EgressOnlyInternetGateway' | 'AWS::EC2::VPCEndpoint' | 'AWS::EC2::VPCEndpointService' | 'AWS::EC2::FlowLog' | 'AWS::EC2::VPCPeeringConnection' | 'AWS::Elasticsearch::Domain' | 'AWS::IAM::Group' | 'AWS::IAM::Policy' | 'AWS::IAM::Role' | 'AWS::IAM::User' | 'AWS::ElasticLoadBalancingV2::LoadBalancer' | 'AWS::ACM::Certificate' | 'AWS::RDS::DBInstance' | 'AWS::RDS::DBSubnetGroup' | 'AWS::RDS::DBSecurityGroup' | 'AWS::RDS::DBSnapshot' | 'AWS::RDS::DBCluster' | 'AWS::RDS::DBClusterSnapshot' | 'AWS::RDS::EventSubscription' | 'AWS::S3::Bucket' | 'AWS::S3::AccountPublicAccessBlock' | 'AWS::Redshift::Cluster' | 'AWS::Redshift::ClusterSnapshot' | 'AWS::Redshift::ClusterParameterGroup' | 'AWS::Redshift::ClusterSecurityGroup' | 'AWS::Redshift::ClusterSubnetGroup' | 'AWS::Redshift::EventSubscription' | 'AWS::SSM::ManagedInstanceInventory' | 'AWS::CloudWatch::Alarm' | 'AWS::CloudFormation::Stack' | 'AWS::ElasticLoadBalancing::LoadBalancer' | 'AWS::AutoScaling::AutoScalingGroup' | 'AWS::AutoScaling::LaunchConfiguration' | 'AWS::AutoScaling::ScalingPolicy' | 'AWS::AutoScaling::ScheduledAction' | 'AWS::DynamoDB::Table' | 'AWS::CodeBuild::Project' | 'AWS::WAF::RateBasedRule' | 'AWS::WAF::Rule' | 'AWS::WAF::RuleGroup' | 'AWS::WAF::WebACL' | 'AWS::WAFRegional::RateBasedRule' | 'AWS::WAFRegional::Rule' | 'AWS::WAFRegional::RuleGroup' | 'AWS::WAFRegional::WebACL' | 'AWS::CloudFront::Distribution' | 'AWS::CloudFront::StreamingDistribution' | 'AWS::Lambda::Function' | 'AWS::NetworkFirewall::Firewall' | 'AWS::NetworkFirewall::FirewallPolicy' | 'AWS::NetworkFirewall::RuleGroup' | 'AWS::ElasticBeanstalk::Application' | 'AWS::ElasticBeanstalk::ApplicationVersion' | 'AWS::ElasticBeanstalk::Environment' | 'AWS::WAFv2::WebACL' | 'AWS::WAFv2::RuleGroup' | 'AWS::WAFv2::IPSet' | 'AWS::WAFv2::RegexPatternSet' | 'AWS::WAFv2::ManagedRuleSet' | 'AWS::XRay::EncryptionConfig' | 'AWS::SSM::AssociationCompliance' | 'AWS::SSM::PatchCompliance' | 'AWS::Shield::Protection' | 'AWS::ShieldRegional::Protection' | 'AWS::Config::ConformancePackCompliance' | 'AWS::Config::ResourceCompliance' | 'AWS::ApiGateway::Stage' | 'AWS::ApiGateway::RestApi' | 'AWS::ApiGatewayV2::Stage' | 'AWS::ApiGatewayV2::Api' | 'AWS::CodePipeline::Pipeline' | 'AWS::ServiceCatalog::CloudFormationProvisionedProduct' | 'AWS::ServiceCatalog::CloudFormationProduct' | 'AWS::ServiceCatalog::Portfolio' | 'AWS::SQS::Queue' | 'AWS::KMS::Key' | 'AWS::QLDB::Ledger' | 'AWS::SecretsManager::Secret' | 'AWS::SNS::Topic' | 'AWS::SSM::FileData' | 'AWS::Backup::BackupPlan' | 'AWS::Backup::BackupSelection' | 'AWS::Backup::BackupVault' | 'AWS::Backup::RecoveryPoint' | 'AWS::ECR::Repository' | 'AWS::ECS::Cluster' | 'AWS::ECS::Service' | 'AWS::ECS::TaskDefinition' | 'AWS::EFS::AccessPoint' | 'AWS::EFS::FileSystem' | 'AWS::EKS::Cluster' | 'AWS::OpenSearch::Domain' | 'AWS::EC2::TransitGateway' | 'AWS::Kinesis::Stream' | 'AWS::Kinesis::StreamConsumer' | 'AWS::CodeDeploy::Application' | 'AWS::CodeDeploy::DeploymentConfig' | 'AWS::CodeDeploy::DeploymentGroup' | 'AWS::EC2::LaunchTemplate' | 'AWS::ECR::PublicRepository' | 'AWS::GuardDuty::Detector' | 'AWS::EMR::SecurityConfiguration' | 'AWS::SageMaker::CodeRepository' | 'AWS::Route53Resolver::ResolverEndpoint' | 'AWS::Route53Resolver::ResolverRule' | 'AWS::Route53Resolver::ResolverRuleAssociation' | 'AWS::DMS::ReplicationSubnetGroup' | 'AWS::DMS::EventSubscription' | 'AWS::MSK::Cluster' | 'AWS::StepFunctions::Activity' | 'AWS::WorkSpaces::Workspace' | 'AWS::WorkSpaces::ConnectionAlias' | 'AWS::SageMaker::Model' | 'AWS::ElasticLoadBalancingV2::Listener' | 'AWS::StepFunctions::StateMachine' | 'AWS::Batch::JobQueue' | 'AWS::Batch::ComputeEnvironment' | 'AWS::AccessAnalyzer::Analyzer' | 'AWS::Athena::WorkGroup' | 'AWS::Athena::DataCatalog' | 'AWS::Detective::Graph' | 'AWS::GlobalAccelerator::Accelerator' | 'AWS::GlobalAccelerator::EndpointGroup' | 'AWS::GlobalAccelerator::Listener' | 'AWS::EC2::TransitGatewayAttachment' | 'AWS::EC2::TransitGatewayRouteTable' | 'AWS::DMS::Certificate' | 'AWS::AppConfig::Application' | 'AWS::AppSync::GraphQLApi' | 'AWS::DataSync::LocationSMB' | 'AWS::DataSync::LocationFSxLustre' | 'AWS::DataSync::LocationS3' | 'AWS::DataSync::LocationEFS' | 'AWS::DataSync::Task' | 'AWS::DataSync::LocationNFS' | 'AWS::EC2::NetworkInsightsAccessScopeAnalysis' | 'AWS::EKS::FargateProfile' | 'AWS::Glue::Job' | 'AWS::GuardDuty::ThreatIntelSet' | 'AWS::GuardDuty::IPSet' | 'AWS::SageMaker::Workteam' | 'AWS::SageMaker::NotebookInstanceLifecycleConfig' | 'AWS::ServiceDiscovery::Service' | 'AWS::ServiceDiscovery::PublicDnsNamespace' | 'AWS::SES::ContactList' | 'AWS::SES::ConfigurationSet' | 'AWS::Route53::HostedZone' | 'AWS::IoTEvents::Input' | 'AWS::IoTEvents::DetectorModel' | 'AWS::IoTEvents::AlarmModel' | 'AWS::ServiceDiscovery::HttpNamespace' | 'AWS::Events::EventBus' | 'AWS::ImageBuilder::ContainerRecipe' | 'AWS::ImageBuilder::DistributionConfiguration' | 'AWS::ImageBuilder::InfrastructureConfiguration' | 'AWS::DataSync::LocationObjectStorage' | 'AWS::DataSync::LocationHDFS' | 'AWS::Glue::Classifier' | 'AWS::Route53RecoveryReadiness::Cell' | 'AWS::Route53RecoveryReadiness::ReadinessCheck' | 'AWS::ECR::RegistryPolicy' | 'AWS::Backup::ReportPlan' | 'AWS::Lightsail::Certificate' | 'AWS::RUM::AppMonitor' | 'AWS::Events::Endpoint' | 'AWS::SES::ReceiptRuleSet' | 'AWS::Events::Archive' | 'AWS::Events::ApiDestination' | 'AWS::Lightsail::Disk' | 'AWS::FIS::ExperimentTemplate' | 'AWS::DataSync::LocationFSxWindows' | 'AWS::SES::ReceiptFilter' | 'AWS::GuardDuty::Filter' | 'AWS::SES::Template' | 'AWS::AmazonMQ::Broker' | 'AWS::AppConfig::Environment' | 'AWS::AppConfig::ConfigurationProfile' | 'AWS::Cloud9::EnvironmentEC2' | 'AWS::EventSchemas::Registry' | 'AWS::EventSchemas::RegistryPolicy' | 'AWS::EventSchemas::Discoverer' | 'AWS::FraudDetector::Label' | 'AWS::FraudDetector::EntityType' | 'AWS::FraudDetector::Variable' | 'AWS::FraudDetector::Outcome' | 'AWS::IoT::Authorizer' | 'AWS::IoT::SecurityProfile' | 'AWS::IoT::RoleAlias' | 'AWS::IoT::Dimension' | 'AWS::IoTAnalytics::Datastore' | 'AWS::Lightsail::Bucket' | 'AWS::Lightsail::StaticIp' | 'AWS::MediaPackage::PackagingGroup' | 'AWS::Route53RecoveryReadiness::RecoveryGroup' | 'AWS::ResilienceHub::ResiliencyPolicy' | 'AWS::Transfer::Workflow' | 'AWS::EKS::IdentityProviderConfig' | 'AWS::EKS::Addon' | 'AWS::Glue::MLTransform' | 'AWS::IoT::Policy' | 'AWS::IoT::MitigationAction' | 'AWS::IoTTwinMaker::Workspace' | 'AWS::IoTTwinMaker::Entity' | 'AWS::IoTAnalytics::Dataset' | 'AWS::IoTAnalytics::Pipeline' | 'AWS::IoTAnalytics::Channel' | 'AWS::IoTSiteWise::Dashboard' | 'AWS::IoTSiteWise::Project' | 'AWS::IoTSiteWise::Portal' | 'AWS::IoTSiteWise::AssetModel' | 'AWS::IVS::Channel' | 'AWS::IVS::RecordingConfiguration' | 'AWS::IVS::PlaybackKeyPair' | 'AWS::KinesisAnalyticsV2::Application' | 'AWS::RDS::GlobalCluster' | 'AWS::S3::MultiRegionAccessPoint' | 'AWS::DeviceFarm::TestGridProject' | 'AWS::Budgets::BudgetsAction' | 'AWS::Lex::Bot' | 'AWS::CodeGuruReviewer::RepositoryAssociation' | 'AWS::IoT::CustomMetric' | 'AWS::Route53Resolver::FirewallDomainList' | 'AWS::RoboMaker::RobotApplicationVersion' | 'AWS::EC2::TrafficMirrorSession' | 'AWS::IoTSiteWise::Gateway' | 'AWS::Lex::BotAlias' | 'AWS::LookoutMetrics::Alert' | 'AWS::IoT::AccountAuditConfiguration' | 'AWS::EC2::TrafficMirrorTarget' | 'AWS::S3::StorageLens' | 'AWS::IoT::ScheduledAudit' | 'AWS::Events::Connection' | 'AWS::EventSchemas::Schema' | 'AWS::MediaPackage::PackagingConfiguration' | 'AWS::KinesisVideo::SignalingChannel' | 'AWS::AppStream::DirectoryConfig' | 'AWS::LookoutVision::Project' | 'AWS::Route53RecoveryControl::Cluster' | 'AWS::Route53RecoveryControl::SafetyRule' | 'AWS::Route53RecoveryControl::ControlPanel' | 'AWS::Route53RecoveryControl::RoutingControl' | 'AWS::Route53RecoveryReadiness::ResourceSet' | 'AWS::RoboMaker::SimulationApplication' | 'AWS::RoboMaker::RobotApplication' | 'AWS::HealthLake::FHIRDatastore' | 'AWS::Pinpoint::Segment' | 'AWS::Pinpoint::ApplicationSettings' | 'AWS::Events::Rule' | 'AWS::EC2::DHCPOptions' | 'AWS::EC2::NetworkInsightsPath' | 'AWS::EC2::TrafficMirrorFilter' | 'AWS::EC2::IPAM' | 'AWS::IoTTwinMaker::Scene' | 'AWS::NetworkManager::TransitGatewayRegistration' | 'AWS::CustomerProfiles::Domain' | 'AWS::AutoScaling::WarmPool' | 'AWS::Connect::PhoneNumber' | 'AWS::AppConfig::DeploymentStrategy' | 'AWS::AppFlow::Flow' | 'AWS::AuditManager::Assessment' | 'AWS::CloudWatch::MetricStream' | 'AWS::DeviceFarm::InstanceProfile' | 'AWS::DeviceFarm::Project' | 'AWS::EC2::EC2Fleet' | 'AWS::EC2::SubnetRouteTableAssociation' | 'AWS::ECR::PullThroughCacheRule' | 'AWS::GroundStation::Config' | 'AWS::ImageBuilder::ImagePipeline' | 'AWS::IoT::FleetMetric' | 'AWS::IoTWireless::ServiceProfile' | 'AWS::NetworkManager::Device' | 'AWS::NetworkManager::GlobalNetwork' | 'AWS::NetworkManager::Link' | 'AWS::NetworkManager::Site' | 'AWS::Panorama::Package' | 'AWS::Pinpoint::App' | 'AWS::Redshift::ScheduledAction' | 'AWS::Route53Resolver::FirewallRuleGroupAssociation' | 'AWS::SageMaker::AppImageConfig' | 'AWS::SageMaker::Image' | 'AWS::ECS::TaskSet' | 'AWS::Cassandra::Keyspace' | 'AWS::Signer::SigningProfile' | 'AWS::Amplify::App' | 'AWS::AppMesh::VirtualNode' | 'AWS::AppMesh::VirtualService' | 'AWS::AppRunner::VpcConnector' | 'AWS::AppStream::Application' | 'AWS::CodeArtifact::Repository' | 'AWS::EC2::PrefixList' | 'AWS::EC2::SpotFleet' | 'AWS::Evidently::Project' | 'AWS::Forecast::Dataset' | 'AWS::IAM::SAMLProvider' | 'AWS::IAM::ServerCertificate' | 'AWS::Pinpoint::Campaign' | 'AWS::Pinpoint::InAppTemplate' | 'AWS::SageMaker::Domain' | 'AWS::Transfer::Agreement' | 'AWS::Transfer::Connector' | 'AWS::KinesisFirehose::DeliveryStream' | 'AWS::Amplify::Branch' | 'AWS::AppIntegrations::EventIntegration' | 'AWS::AppMesh::Route' | 'AWS::Athena::PreparedStatement' | 'AWS::EC2::IPAMScope' | 'AWS::Evidently::Launch' | 'AWS::Forecast::DatasetGroup' | 'AWS::GreengrassV2::ComponentVersion' | 'AWS::GroundStation::MissionProfile' | 'AWS::MediaConnect::FlowEntitlement' | 'AWS::MediaConnect::FlowVpcInterface' | 'AWS::MediaTailor::PlaybackConfiguration' | 'AWS::MSK::Configuration' | 'AWS::Personalize::Dataset' | 'AWS::Personalize::Schema' | 'AWS::Personalize::Solution' | 'AWS::Pinpoint::EmailTemplate' | 'AWS::Pinpoint::EventStream' | 'AWS::ResilienceHub::App' | 'AWS::ACMPCA::CertificateAuthority' | 'AWS::AppConfig::HostedConfigurationVersion' | 'AWS::AppMesh::VirtualGateway' | 'AWS::AppMesh::VirtualRouter' | 'AWS::AppRunner::Service' | 'AWS::CustomerProfiles::ObjectType' | 'AWS::DMS::Endpoint' | 'AWS::EC2::CapacityReservation' | 'AWS::EC2::ClientVpnEndpoint' | 'AWS::Kendra::Index' | 'AWS::KinesisVideo::Stream' | 'AWS::Logs::Destination' | 'AWS::Pinpoint::EmailChannel' | 'AWS::S3::AccessPoint' | 'AWS::NetworkManager::CustomerGatewayAssociation' | 'AWS::NetworkManager::LinkAssociation' | 'AWS::IoTWireless::MulticastGroup' | 'AWS::Personalize::DatasetGroup' | 'AWS::IoTTwinMaker::ComponentType' | 'AWS::CodeBuild::ReportGroup' | 'AWS::SageMaker::FeatureGroup' | 'AWS::MSK::BatchScramSecret' | 'AWS::AppStream::Stack' | 'AWS::IoT::JobTemplate' | 'AWS::IoTWireless::FuotaTask' | 'AWS::IoT::ProvisioningTemplate' | 'AWS::InspectorV2::Filter' | 'AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation' | 'AWS::ServiceDiscovery::Instance' | 'AWS::Transfer::Certificate' | 'AWS::MediaConnect::FlowSource' | 'AWS::APS::RuleGroupsNamespace' | 'AWS::CodeGuruProfiler::ProfilingGroup' | 'AWS::Route53Resolver::ResolverQueryLoggingConfig' | 'AWS::Batch::SchedulingPolicy' | 'AWS::ACMPCA::CertificateAuthorityActivation' | 'AWS::AppMesh::GatewayRoute' | 'AWS::AppMesh::Mesh' | 'AWS::Connect::Instance' | 'AWS::Connect::QuickConnect' | 'AWS::EC2::CarrierGateway' | 'AWS::EC2::IPAMPool' | 'AWS::EC2::TransitGatewayConnect' | 'AWS::EC2::TransitGatewayMulticastDomain' | 'AWS::ECS::CapacityProvider' | 'AWS::IAM::InstanceProfile' | 'AWS::IoT::CACertificate' | 'AWS::IoTTwinMaker::SyncJob' | 'AWS::KafkaConnect::Connector' | 'AWS::Lambda::CodeSigningConfig' | 'AWS::NetworkManager::ConnectPeer' | 'AWS::ResourceExplorer2::Index' | 'AWS::AppStream::Fleet' | 'AWS::Cognito::UserPool' | 'AWS::Cognito::UserPoolClient' | 'AWS::Cognito::UserPoolGroup' | 'AWS::EC2::NetworkInsightsAccessScope' | 'AWS::EC2::NetworkInsightsAnalysis' | 'AWS::Grafana::Workspace' | 'AWS::GroundStation::DataflowEndpointGroup' | 'AWS::ImageBuilder::ImageRecipe' | 'AWS::KMS::Alias' | 'AWS::M2::Environment' | 'AWS::QuickSight::DataSource' | 'AWS::QuickSight::Template' | 'AWS::QuickSight::Theme' | 'AWS::RDS::OptionGroup' | 'AWS::Redshift::EndpointAccess' | 'AWS::Route53Resolver::FirewallRuleGroup' | 'AWS::SSM::Document' | 'AWS::AppConfig::ExtensionAssociation' | 'AWS::AppIntegrations::Application' | 'AWS::AppSync::ApiCache' | 'AWS::Bedrock::Guardrail' | 'AWS::Bedrock::KnowledgeBase' | 'AWS::Cognito::IdentityPool' | 'AWS::Connect::Rule' | 'AWS::Connect::User' | 'AWS::EC2::ClientVpnTargetNetworkAssociation' | 'AWS::EC2::EIPAssociation' | 'AWS::EC2::IPAMResourceDiscovery' | 'AWS::EC2::IPAMResourceDiscoveryAssociation' | 'AWS::EC2::InstanceConnectEndpoint' | 'AWS::EC2::SnapshotBlockPublicAccess' | 'AWS::EC2::VPCBlockPublicAccessExclusion' | 'AWS::EC2::VPCBlockPublicAccessOptions' | 'AWS::EC2::VPCEndpointConnectionNotification' | 'AWS::EC2::VPNConnectionRoute' | 'AWS::Evidently::Segment' | 'AWS::IAM::OIDCProvider' | 'AWS::InspectorV2::Activation' | 'AWS::MSK::ClusterPolicy' | 'AWS::MSK::VpcConnection' | 'AWS::MediaConnect::Gateway' | 'AWS::MemoryDB::SubnetGroup' | 'AWS::OpenSearchServerless::Collection' | 'AWS::OpenSearchServerless::VpcEndpoint' | 'AWS::Redshift::EndpointAuthorization' | 'AWS::Route53Profiles::Profile' | 'AWS::S3::StorageLensGroup' | 'AWS::S3Express::BucketPolicy' | 'AWS::S3Express::DirectoryBucket' | 'AWS::SageMaker::InferenceExperiment' | 'AWS::SecurityHub::Standard' | 'AWS::Transfer::Profile' | 'AWS::CloudFormation::StackSet' | 'AWS::MediaPackageV2::Channel' | 'AWS::S3::AccessGrantsLocation' | 'AWS::S3::AccessGrant' | 'AWS::S3::AccessGrantsInstance' | 'AWS::EMRServerless::Application' | 'AWS::Config::AggregationAuthorization' | 'AWS::Bedrock::ApplicationInferenceProfile' | 'AWS::ApiGatewayV2::Integration' | 'AWS::SageMaker::MlflowTrackingServer' | 'AWS::SageMaker::ModelBiasJobDefinition' | 'AWS::SecretsManager::RotationSchedule' | 'AWS::Deadline::QueueFleetAssociation' | 'AWS::ECR::RepositoryCreationTemplate' | 'AWS::CloudFormation::LambdaHook' | 'AWS::EC2::SubnetNetworkAclAssociation' | 'AWS::ApiGateway::UsagePlan' | 'AWS::AppConfig::Extension' | 'AWS::Deadline::Fleet' | 'AWS::EMR::Studio' | 'AWS::S3Tables::TableBucket' | 'AWS::CloudFront::RealtimeLogConfig' | 'AWS::BackupGateway::Hypervisor' | 'AWS::BCMDataExports::Export' | 'AWS::CloudFormation::GuardHook' | 'AWS::CloudFront::PublicKey' | 'AWS::CloudTrail::EventDataStore' | 'AWS::EntityResolution::IdMappingWorkflow' | 'AWS::EntityResolution::SchemaMapping' | 'AWS::IoT::DomainConfiguration' | 'AWS::PCAConnectorAD::DirectoryRegistration' | 'AWS::RDS::Integration' | 'AWS::Config::ConformancePack' | 'AWS::RolesAnywhere::Profile' | 'AWS::CodeArtifact::Domain' | 'AWS::Backup::RestoreTestingPlan' | 'AWS::Config::StoredQuery' | 'AWS::SageMaker::DataQualityJobDefinition' | 'AWS::SageMaker::ModelExplainabilityJobDefinition' | 'AWS::SageMaker::ModelQualityJobDefinition' | 'AWS::SageMaker::StudioLifecycleConfig' | 'AWS::SES::DedicatedIpPool' | 'AWS::SES::MailManagerTrafficPolicy' | 'AWS::SSM::ResourceDataSync' | 'AWS::BedrockAgentCore::Runtime' | 'AWS::BedrockAgentCore::BrowserCustom' | 'AWS::ElasticLoadBalancingV2::TargetGroup' | 'AWS::EMRContainers::VirtualCluster' | 'AWS::EntityResolution::MatchingWorkflow' | 'AWS::IoTCoreDeviceAdvisor::SuiteDefinition' | 'AWS::EC2::SecurityGroupVpcAssociation' | 'AWS::EC2::VerifiedAccessInstance' | 'AWS::KafkaConnect::CustomPlugin' | 'AWS::NetworkManager::TransitGatewayPeering' | 'AWS::OpenSearchServerless::SecurityConfig' | 'AWS::Redshift::Integration' | 'AWS::RolesAnywhere::TrustAnchor' | 'AWS::Route53Profiles::ProfileAssociation' | 'AWS::SSMIncidents::ResponsePlan' | 'AWS::Transfer::Server' | 'AWS::Glue::Database' | 'AWS::Organizations::OrganizationalUnit' | 'AWS::EC2::IPAMPoolCidr' | 'AWS::EC2::VPCGatewayAttachment' | 'AWS::Bedrock::Prompt' | 'AWS::Comprehend::Flywheel' | 'AWS::DataSync::Agent' | 'AWS::MediaTailor::LiveSource' | 'AWS::MSK::ServerlessCluster' | 'AWS::IoTSiteWise::Asset' | 'AWS::B2BI::Capability' | 'AWS::CloudFront::KeyValueStore' | 'AWS::Deadline::Monitor' | 'AWS::GuardDuty::MalwareProtectionPlan' | 'AWS::Location::APIKey' | 'AWS::MediaPackageV2::OriginEndpoint' | 'AWS::PCAConnectorAD::Connector' | 'AWS::S3Tables::TableBucketPolicy' | 'AWS::SecretsManager::ResourcePolicy' | 'AWS::SSMContacts::Contact' | 'AWS::IoT::ThingGroup' | 'AWS::ImageBuilder::LifecyclePolicy' | 'AWS::GameLift::Build' | 'AWS::ECR::ReplicationConfiguration' | 'AWS::EC2::SubnetCidrBlock' | 'AWS::Connect::SecurityProfile' | 'AWS::CleanRoomsML::TrainingDataset' | 'AWS::AppStream::AppBlockBuilder' | 'AWS::Route53::DNSSEC' | 'AWS::SageMaker::UserProfile' | 'AWS::ApiGateway::Method';
  /** The ID of the resource (for example., sg-xxxxxx). */
  resourceId: string;
}

export interface RemediationExceptionResourceKey {
  /** The type of a resource. */
  ResourceType?: string;
  /** The ID of the resource (for example., sg-xxxxxx). */
  ResourceId?: string;
}

export interface ConfigRuleComplianceFilters {
  /** The name of the Config rule. */
  ConfigRuleName?: string;
  /** The rule compliance status. For the ConfigRuleComplianceFilters data type, Config supports only COMPLIANT and NON_COMPLIANT. Config does not support the NOT_APPLICABLE and the INSUFFICIENT_DATA values */
  ComplianceType?: 'COMPLIANT' | 'NON_COMPLIANT' | 'NOT_APPLICABLE' | 'INSUFFICIENT_DATA';
  /** The 12-digit account ID of the source account. */
  AccountId?: string;
  /** The source region where the data is aggregated. */
  AwsRegion?: string;
}

export interface AggregateConformancePackComplianceFilters {
  /** The name of the conformance pack. */
  ConformancePackName?: string;
  /** The compliance status of the conformance pack. */
  ComplianceType?: 'COMPLIANT' | 'NON_COMPLIANT' | 'INSUFFICIENT_DATA';
  /** The 12-digit Amazon Web Services account ID of the source account. */
  AccountId?: string;
  /** The source Amazon Web Services Region from where the data is aggregated. */
  AwsRegion?: string;
}

export interface DescribeConfigRulesFilters {
  /** The mode of an evaluation. The valid values are Detective or Proactive. */
  EvaluationMode?: 'DETECTIVE' | 'PROACTIVE';
}

export interface ConformancePackComplianceFilters {
  /** Filters the results by Config rule names. */
  ConfigRuleNames?: string[];
  /** Filters the results by compliance. The allowed values are COMPLIANT and NON_COMPLIANT. INSUFFICIENT_DATA is not supported. */
  ComplianceType?: 'COMPLIANT' | 'NON_COMPLIANT' | 'INSUFFICIENT_DATA';
}

export interface ConfigRuleComplianceSummaryFilters {
  /** The 12-digit account ID of the source account. */
  AccountId?: string;
  /** The source region where the data is aggregated. */
  AwsRegion?: string;
}

export interface AggregateConformancePackComplianceSummaryFilters {
  /** The 12-digit Amazon Web Services account ID of the source account. */
  AccountId?: string;
  /** The source Amazon Web Services Region from where the data is aggregated. */
  AwsRegion?: string;
}

export interface ResourceCountFilters {
  /** The type of the Amazon Web Services resource. */
  ResourceType?: 'AWS::EC2::CustomerGateway' | 'AWS::EC2::EIP' | 'AWS::EC2::Host' | 'AWS::EC2::Instance' | 'AWS::EC2::InternetGateway' | 'AWS::EC2::NetworkAcl' | 'AWS::EC2::NetworkInterface' | 'AWS::EC2::RouteTable' | 'AWS::EC2::SecurityGroup' | 'AWS::EC2::Subnet' | 'AWS::CloudTrail::Trail' | 'AWS::EC2::Volume' | 'AWS::EC2::VPC' | 'AWS::EC2::VPNConnection' | 'AWS::EC2::VPNGateway' | 'AWS::EC2::RegisteredHAInstance' | 'AWS::EC2::NatGateway' | 'AWS::EC2::EgressOnlyInternetGateway' | 'AWS::EC2::VPCEndpoint' | 'AWS::EC2::VPCEndpointService' | 'AWS::EC2::FlowLog' | 'AWS::EC2::VPCPeeringConnection' | 'AWS::Elasticsearch::Domain' | 'AWS::IAM::Group' | 'AWS::IAM::Policy' | 'AWS::IAM::Role' | 'AWS::IAM::User' | 'AWS::ElasticLoadBalancingV2::LoadBalancer' | 'AWS::ACM::Certificate' | 'AWS::RDS::DBInstance' | 'AWS::RDS::DBSubnetGroup' | 'AWS::RDS::DBSecurityGroup' | 'AWS::RDS::DBSnapshot' | 'AWS::RDS::DBCluster' | 'AWS::RDS::DBClusterSnapshot' | 'AWS::RDS::EventSubscription' | 'AWS::S3::Bucket' | 'AWS::S3::AccountPublicAccessBlock' | 'AWS::Redshift::Cluster' | 'AWS::Redshift::ClusterSnapshot' | 'AWS::Redshift::ClusterParameterGroup' | 'AWS::Redshift::ClusterSecurityGroup' | 'AWS::Redshift::ClusterSubnetGroup' | 'AWS::Redshift::EventSubscription' | 'AWS::SSM::ManagedInstanceInventory' | 'AWS::CloudWatch::Alarm' | 'AWS::CloudFormation::Stack' | 'AWS::ElasticLoadBalancing::LoadBalancer' | 'AWS::AutoScaling::AutoScalingGroup' | 'AWS::AutoScaling::LaunchConfiguration' | 'AWS::AutoScaling::ScalingPolicy' | 'AWS::AutoScaling::ScheduledAction' | 'AWS::DynamoDB::Table' | 'AWS::CodeBuild::Project' | 'AWS::WAF::RateBasedRule' | 'AWS::WAF::Rule' | 'AWS::WAF::RuleGroup' | 'AWS::WAF::WebACL' | 'AWS::WAFRegional::RateBasedRule' | 'AWS::WAFRegional::Rule' | 'AWS::WAFRegional::RuleGroup' | 'AWS::WAFRegional::WebACL' | 'AWS::CloudFront::Distribution' | 'AWS::CloudFront::StreamingDistribution' | 'AWS::Lambda::Function' | 'AWS::NetworkFirewall::Firewall' | 'AWS::NetworkFirewall::FirewallPolicy' | 'AWS::NetworkFirewall::RuleGroup' | 'AWS::ElasticBeanstalk::Application' | 'AWS::ElasticBeanstalk::ApplicationVersion' | 'AWS::ElasticBeanstalk::Environment' | 'AWS::WAFv2::WebACL' | 'AWS::WAFv2::RuleGroup' | 'AWS::WAFv2::IPSet' | 'AWS::WAFv2::RegexPatternSet' | 'AWS::WAFv2::ManagedRuleSet' | 'AWS::XRay::EncryptionConfig' | 'AWS::SSM::AssociationCompliance' | 'AWS::SSM::PatchCompliance' | 'AWS::Shield::Protection' | 'AWS::ShieldRegional::Protection' | 'AWS::Config::ConformancePackCompliance' | 'AWS::Config::ResourceCompliance' | 'AWS::ApiGateway::Stage' | 'AWS::ApiGateway::RestApi' | 'AWS::ApiGatewayV2::Stage' | 'AWS::ApiGatewayV2::Api' | 'AWS::CodePipeline::Pipeline' | 'AWS::ServiceCatalog::CloudFormationProvisionedProduct' | 'AWS::ServiceCatalog::CloudFormationProduct' | 'AWS::ServiceCatalog::Portfolio' | 'AWS::SQS::Queue' | 'AWS::KMS::Key' | 'AWS::QLDB::Ledger' | 'AWS::SecretsManager::Secret' | 'AWS::SNS::Topic' | 'AWS::SSM::FileData' | 'AWS::Backup::BackupPlan' | 'AWS::Backup::BackupSelection' | 'AWS::Backup::BackupVault' | 'AWS::Backup::RecoveryPoint' | 'AWS::ECR::Repository' | 'AWS::ECS::Cluster' | 'AWS::ECS::Service' | 'AWS::ECS::TaskDefinition' | 'AWS::EFS::AccessPoint' | 'AWS::EFS::FileSystem' | 'AWS::EKS::Cluster' | 'AWS::OpenSearch::Domain' | 'AWS::EC2::TransitGateway' | 'AWS::Kinesis::Stream' | 'AWS::Kinesis::StreamConsumer' | 'AWS::CodeDeploy::Application' | 'AWS::CodeDeploy::DeploymentConfig' | 'AWS::CodeDeploy::DeploymentGroup' | 'AWS::EC2::LaunchTemplate' | 'AWS::ECR::PublicRepository' | 'AWS::GuardDuty::Detector' | 'AWS::EMR::SecurityConfiguration' | 'AWS::SageMaker::CodeRepository' | 'AWS::Route53Resolver::ResolverEndpoint' | 'AWS::Route53Resolver::ResolverRule' | 'AWS::Route53Resolver::ResolverRuleAssociation' | 'AWS::DMS::ReplicationSubnetGroup' | 'AWS::DMS::EventSubscription' | 'AWS::MSK::Cluster' | 'AWS::StepFunctions::Activity' | 'AWS::WorkSpaces::Workspace' | 'AWS::WorkSpaces::ConnectionAlias' | 'AWS::SageMaker::Model' | 'AWS::ElasticLoadBalancingV2::Listener' | 'AWS::StepFunctions::StateMachine' | 'AWS::Batch::JobQueue' | 'AWS::Batch::ComputeEnvironment' | 'AWS::AccessAnalyzer::Analyzer' | 'AWS::Athena::WorkGroup' | 'AWS::Athena::DataCatalog' | 'AWS::Detective::Graph' | 'AWS::GlobalAccelerator::Accelerator' | 'AWS::GlobalAccelerator::EndpointGroup' | 'AWS::GlobalAccelerator::Listener' | 'AWS::EC2::TransitGatewayAttachment' | 'AWS::EC2::TransitGatewayRouteTable' | 'AWS::DMS::Certificate' | 'AWS::AppConfig::Application' | 'AWS::AppSync::GraphQLApi' | 'AWS::DataSync::LocationSMB' | 'AWS::DataSync::LocationFSxLustre' | 'AWS::DataSync::LocationS3' | 'AWS::DataSync::LocationEFS' | 'AWS::DataSync::Task' | 'AWS::DataSync::LocationNFS' | 'AWS::EC2::NetworkInsightsAccessScopeAnalysis' | 'AWS::EKS::FargateProfile' | 'AWS::Glue::Job' | 'AWS::GuardDuty::ThreatIntelSet' | 'AWS::GuardDuty::IPSet' | 'AWS::SageMaker::Workteam' | 'AWS::SageMaker::NotebookInstanceLifecycleConfig' | 'AWS::ServiceDiscovery::Service' | 'AWS::ServiceDiscovery::PublicDnsNamespace' | 'AWS::SES::ContactList' | 'AWS::SES::ConfigurationSet' | 'AWS::Route53::HostedZone' | 'AWS::IoTEvents::Input' | 'AWS::IoTEvents::DetectorModel' | 'AWS::IoTEvents::AlarmModel' | 'AWS::ServiceDiscovery::HttpNamespace' | 'AWS::Events::EventBus' | 'AWS::ImageBuilder::ContainerRecipe' | 'AWS::ImageBuilder::DistributionConfiguration' | 'AWS::ImageBuilder::InfrastructureConfiguration' | 'AWS::DataSync::LocationObjectStorage' | 'AWS::DataSync::LocationHDFS' | 'AWS::Glue::Classifier' | 'AWS::Route53RecoveryReadiness::Cell' | 'AWS::Route53RecoveryReadiness::ReadinessCheck' | 'AWS::ECR::RegistryPolicy' | 'AWS::Backup::ReportPlan' | 'AWS::Lightsail::Certificate' | 'AWS::RUM::AppMonitor' | 'AWS::Events::Endpoint' | 'AWS::SES::ReceiptRuleSet' | 'AWS::Events::Archive' | 'AWS::Events::ApiDestination' | 'AWS::Lightsail::Disk' | 'AWS::FIS::ExperimentTemplate' | 'AWS::DataSync::LocationFSxWindows' | 'AWS::SES::ReceiptFilter' | 'AWS::GuardDuty::Filter' | 'AWS::SES::Template' | 'AWS::AmazonMQ::Broker' | 'AWS::AppConfig::Environment' | 'AWS::AppConfig::ConfigurationProfile' | 'AWS::Cloud9::EnvironmentEC2' | 'AWS::EventSchemas::Registry' | 'AWS::EventSchemas::RegistryPolicy' | 'AWS::EventSchemas::Discoverer' | 'AWS::FraudDetector::Label' | 'AWS::FraudDetector::EntityType' | 'AWS::FraudDetector::Variable' | 'AWS::FraudDetector::Outcome' | 'AWS::IoT::Authorizer' | 'AWS::IoT::SecurityProfile' | 'AWS::IoT::RoleAlias' | 'AWS::IoT::Dimension' | 'AWS::IoTAnalytics::Datastore' | 'AWS::Lightsail::Bucket' | 'AWS::Lightsail::StaticIp' | 'AWS::MediaPackage::PackagingGroup' | 'AWS::Route53RecoveryReadiness::RecoveryGroup' | 'AWS::ResilienceHub::ResiliencyPolicy' | 'AWS::Transfer::Workflow' | 'AWS::EKS::IdentityProviderConfig' | 'AWS::EKS::Addon' | 'AWS::Glue::MLTransform' | 'AWS::IoT::Policy' | 'AWS::IoT::MitigationAction' | 'AWS::IoTTwinMaker::Workspace' | 'AWS::IoTTwinMaker::Entity' | 'AWS::IoTAnalytics::Dataset' | 'AWS::IoTAnalytics::Pipeline' | 'AWS::IoTAnalytics::Channel' | 'AWS::IoTSiteWise::Dashboard' | 'AWS::IoTSiteWise::Project' | 'AWS::IoTSiteWise::Portal' | 'AWS::IoTSiteWise::AssetModel' | 'AWS::IVS::Channel' | 'AWS::IVS::RecordingConfiguration' | 'AWS::IVS::PlaybackKeyPair' | 'AWS::KinesisAnalyticsV2::Application' | 'AWS::RDS::GlobalCluster' | 'AWS::S3::MultiRegionAccessPoint' | 'AWS::DeviceFarm::TestGridProject' | 'AWS::Budgets::BudgetsAction' | 'AWS::Lex::Bot' | 'AWS::CodeGuruReviewer::RepositoryAssociation' | 'AWS::IoT::CustomMetric' | 'AWS::Route53Resolver::FirewallDomainList' | 'AWS::RoboMaker::RobotApplicationVersion' | 'AWS::EC2::TrafficMirrorSession' | 'AWS::IoTSiteWise::Gateway' | 'AWS::Lex::BotAlias' | 'AWS::LookoutMetrics::Alert' | 'AWS::IoT::AccountAuditConfiguration' | 'AWS::EC2::TrafficMirrorTarget' | 'AWS::S3::StorageLens' | 'AWS::IoT::ScheduledAudit' | 'AWS::Events::Connection' | 'AWS::EventSchemas::Schema' | 'AWS::MediaPackage::PackagingConfiguration' | 'AWS::KinesisVideo::SignalingChannel' | 'AWS::AppStream::DirectoryConfig' | 'AWS::LookoutVision::Project' | 'AWS::Route53RecoveryControl::Cluster' | 'AWS::Route53RecoveryControl::SafetyRule' | 'AWS::Route53RecoveryControl::ControlPanel' | 'AWS::Route53RecoveryControl::RoutingControl' | 'AWS::Route53RecoveryReadiness::ResourceSet' | 'AWS::RoboMaker::SimulationApplication' | 'AWS::RoboMaker::RobotApplication' | 'AWS::HealthLake::FHIRDatastore' | 'AWS::Pinpoint::Segment' | 'AWS::Pinpoint::ApplicationSettings' | 'AWS::Events::Rule' | 'AWS::EC2::DHCPOptions' | 'AWS::EC2::NetworkInsightsPath' | 'AWS::EC2::TrafficMirrorFilter' | 'AWS::EC2::IPAM' | 'AWS::IoTTwinMaker::Scene' | 'AWS::NetworkManager::TransitGatewayRegistration' | 'AWS::CustomerProfiles::Domain' | 'AWS::AutoScaling::WarmPool' | 'AWS::Connect::PhoneNumber' | 'AWS::AppConfig::DeploymentStrategy' | 'AWS::AppFlow::Flow' | 'AWS::AuditManager::Assessment' | 'AWS::CloudWatch::MetricStream' | 'AWS::DeviceFarm::InstanceProfile' | 'AWS::DeviceFarm::Project' | 'AWS::EC2::EC2Fleet' | 'AWS::EC2::SubnetRouteTableAssociation' | 'AWS::ECR::PullThroughCacheRule' | 'AWS::GroundStation::Config' | 'AWS::ImageBuilder::ImagePipeline' | 'AWS::IoT::FleetMetric' | 'AWS::IoTWireless::ServiceProfile' | 'AWS::NetworkManager::Device' | 'AWS::NetworkManager::GlobalNetwork' | 'AWS::NetworkManager::Link' | 'AWS::NetworkManager::Site' | 'AWS::Panorama::Package' | 'AWS::Pinpoint::App' | 'AWS::Redshift::ScheduledAction' | 'AWS::Route53Resolver::FirewallRuleGroupAssociation' | 'AWS::SageMaker::AppImageConfig' | 'AWS::SageMaker::Image' | 'AWS::ECS::TaskSet' | 'AWS::Cassandra::Keyspace' | 'AWS::Signer::SigningProfile' | 'AWS::Amplify::App' | 'AWS::AppMesh::VirtualNode' | 'AWS::AppMesh::VirtualService' | 'AWS::AppRunner::VpcConnector' | 'AWS::AppStream::Application' | 'AWS::CodeArtifact::Repository' | 'AWS::EC2::PrefixList' | 'AWS::EC2::SpotFleet' | 'AWS::Evidently::Project' | 'AWS::Forecast::Dataset' | 'AWS::IAM::SAMLProvider' | 'AWS::IAM::ServerCertificate' | 'AWS::Pinpoint::Campaign' | 'AWS::Pinpoint::InAppTemplate' | 'AWS::SageMaker::Domain' | 'AWS::Transfer::Agreement' | 'AWS::Transfer::Connector' | 'AWS::KinesisFirehose::DeliveryStream' | 'AWS::Amplify::Branch' | 'AWS::AppIntegrations::EventIntegration' | 'AWS::AppMesh::Route' | 'AWS::Athena::PreparedStatement' | 'AWS::EC2::IPAMScope' | 'AWS::Evidently::Launch' | 'AWS::Forecast::DatasetGroup' | 'AWS::GreengrassV2::ComponentVersion' | 'AWS::GroundStation::MissionProfile' | 'AWS::MediaConnect::FlowEntitlement' | 'AWS::MediaConnect::FlowVpcInterface' | 'AWS::MediaTailor::PlaybackConfiguration' | 'AWS::MSK::Configuration' | 'AWS::Personalize::Dataset' | 'AWS::Personalize::Schema' | 'AWS::Personalize::Solution' | 'AWS::Pinpoint::EmailTemplate' | 'AWS::Pinpoint::EventStream' | 'AWS::ResilienceHub::App' | 'AWS::ACMPCA::CertificateAuthority' | 'AWS::AppConfig::HostedConfigurationVersion' | 'AWS::AppMesh::VirtualGateway' | 'AWS::AppMesh::VirtualRouter' | 'AWS::AppRunner::Service' | 'AWS::CustomerProfiles::ObjectType' | 'AWS::DMS::Endpoint' | 'AWS::EC2::CapacityReservation' | 'AWS::EC2::ClientVpnEndpoint' | 'AWS::Kendra::Index' | 'AWS::KinesisVideo::Stream' | 'AWS::Logs::Destination' | 'AWS::Pinpoint::EmailChannel' | 'AWS::S3::AccessPoint' | 'AWS::NetworkManager::CustomerGatewayAssociation' | 'AWS::NetworkManager::LinkAssociation' | 'AWS::IoTWireless::MulticastGroup' | 'AWS::Personalize::DatasetGroup' | 'AWS::IoTTwinMaker::ComponentType' | 'AWS::CodeBuild::ReportGroup' | 'AWS::SageMaker::FeatureGroup' | 'AWS::MSK::BatchScramSecret' | 'AWS::AppStream::Stack' | 'AWS::IoT::JobTemplate' | 'AWS::IoTWireless::FuotaTask' | 'AWS::IoT::ProvisioningTemplate' | 'AWS::InspectorV2::Filter' | 'AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation' | 'AWS::ServiceDiscovery::Instance' | 'AWS::Transfer::Certificate' | 'AWS::MediaConnect::FlowSource' | 'AWS::APS::RuleGroupsNamespace' | 'AWS::CodeGuruProfiler::ProfilingGroup' | 'AWS::Route53Resolver::ResolverQueryLoggingConfig' | 'AWS::Batch::SchedulingPolicy' | 'AWS::ACMPCA::CertificateAuthorityActivation' | 'AWS::AppMesh::GatewayRoute' | 'AWS::AppMesh::Mesh' | 'AWS::Connect::Instance' | 'AWS::Connect::QuickConnect' | 'AWS::EC2::CarrierGateway' | 'AWS::EC2::IPAMPool' | 'AWS::EC2::TransitGatewayConnect' | 'AWS::EC2::TransitGatewayMulticastDomain' | 'AWS::ECS::CapacityProvider' | 'AWS::IAM::InstanceProfile' | 'AWS::IoT::CACertificate' | 'AWS::IoTTwinMaker::SyncJob' | 'AWS::KafkaConnect::Connector' | 'AWS::Lambda::CodeSigningConfig' | 'AWS::NetworkManager::ConnectPeer' | 'AWS::ResourceExplorer2::Index' | 'AWS::AppStream::Fleet' | 'AWS::Cognito::UserPool' | 'AWS::Cognito::UserPoolClient' | 'AWS::Cognito::UserPoolGroup' | 'AWS::EC2::NetworkInsightsAccessScope' | 'AWS::EC2::NetworkInsightsAnalysis' | 'AWS::Grafana::Workspace' | 'AWS::GroundStation::DataflowEndpointGroup' | 'AWS::ImageBuilder::ImageRecipe' | 'AWS::KMS::Alias' | 'AWS::M2::Environment' | 'AWS::QuickSight::DataSource' | 'AWS::QuickSight::Template' | 'AWS::QuickSight::Theme' | 'AWS::RDS::OptionGroup' | 'AWS::Redshift::EndpointAccess' | 'AWS::Route53Resolver::FirewallRuleGroup' | 'AWS::SSM::Document' | 'AWS::AppConfig::ExtensionAssociation' | 'AWS::AppIntegrations::Application' | 'AWS::AppSync::ApiCache' | 'AWS::Bedrock::Guardrail' | 'AWS::Bedrock::KnowledgeBase' | 'AWS::Cognito::IdentityPool' | 'AWS::Connect::Rule' | 'AWS::Connect::User' | 'AWS::EC2::ClientVpnTargetNetworkAssociation' | 'AWS::EC2::EIPAssociation' | 'AWS::EC2::IPAMResourceDiscovery' | 'AWS::EC2::IPAMResourceDiscoveryAssociation' | 'AWS::EC2::InstanceConnectEndpoint' | 'AWS::EC2::SnapshotBlockPublicAccess' | 'AWS::EC2::VPCBlockPublicAccessExclusion' | 'AWS::EC2::VPCBlockPublicAccessOptions' | 'AWS::EC2::VPCEndpointConnectionNotification' | 'AWS::EC2::VPNConnectionRoute' | 'AWS::Evidently::Segment' | 'AWS::IAM::OIDCProvider' | 'AWS::InspectorV2::Activation' | 'AWS::MSK::ClusterPolicy' | 'AWS::MSK::VpcConnection' | 'AWS::MediaConnect::Gateway' | 'AWS::MemoryDB::SubnetGroup' | 'AWS::OpenSearchServerless::Collection' | 'AWS::OpenSearchServerless::VpcEndpoint' | 'AWS::Redshift::EndpointAuthorization' | 'AWS::Route53Profiles::Profile' | 'AWS::S3::StorageLensGroup' | 'AWS::S3Express::BucketPolicy' | 'AWS::S3Express::DirectoryBucket' | 'AWS::SageMaker::InferenceExperiment' | 'AWS::SecurityHub::Standard' | 'AWS::Transfer::Profile' | 'AWS::CloudFormation::StackSet' | 'AWS::MediaPackageV2::Channel' | 'AWS::S3::AccessGrantsLocation' | 'AWS::S3::AccessGrant' | 'AWS::S3::AccessGrantsInstance' | 'AWS::EMRServerless::Application' | 'AWS::Config::AggregationAuthorization' | 'AWS::Bedrock::ApplicationInferenceProfile' | 'AWS::ApiGatewayV2::Integration' | 'AWS::SageMaker::MlflowTrackingServer' | 'AWS::SageMaker::ModelBiasJobDefinition' | 'AWS::SecretsManager::RotationSchedule' | 'AWS::Deadline::QueueFleetAssociation' | 'AWS::ECR::RepositoryCreationTemplate' | 'AWS::CloudFormation::LambdaHook' | 'AWS::EC2::SubnetNetworkAclAssociation' | 'AWS::ApiGateway::UsagePlan' | 'AWS::AppConfig::Extension' | 'AWS::Deadline::Fleet' | 'AWS::EMR::Studio' | 'AWS::S3Tables::TableBucket' | 'AWS::CloudFront::RealtimeLogConfig' | 'AWS::BackupGateway::Hypervisor' | 'AWS::BCMDataExports::Export' | 'AWS::CloudFormation::GuardHook' | 'AWS::CloudFront::PublicKey' | 'AWS::CloudTrail::EventDataStore' | 'AWS::EntityResolution::IdMappingWorkflow' | 'AWS::EntityResolution::SchemaMapping' | 'AWS::IoT::DomainConfiguration' | 'AWS::PCAConnectorAD::DirectoryRegistration' | 'AWS::RDS::Integration' | 'AWS::Config::ConformancePack' | 'AWS::RolesAnywhere::Profile' | 'AWS::CodeArtifact::Domain' | 'AWS::Backup::RestoreTestingPlan' | 'AWS::Config::StoredQuery' | 'AWS::SageMaker::DataQualityJobDefinition' | 'AWS::SageMaker::ModelExplainabilityJobDefinition' | 'AWS::SageMaker::ModelQualityJobDefinition' | 'AWS::SageMaker::StudioLifecycleConfig' | 'AWS::SES::DedicatedIpPool' | 'AWS::SES::MailManagerTrafficPolicy' | 'AWS::SSM::ResourceDataSync' | 'AWS::BedrockAgentCore::Runtime' | 'AWS::BedrockAgentCore::BrowserCustom' | 'AWS::ElasticLoadBalancingV2::TargetGroup' | 'AWS::EMRContainers::VirtualCluster' | 'AWS::EntityResolution::MatchingWorkflow' | 'AWS::IoTCoreDeviceAdvisor::SuiteDefinition' | 'AWS::EC2::SecurityGroupVpcAssociation' | 'AWS::EC2::VerifiedAccessInstance' | 'AWS::KafkaConnect::CustomPlugin' | 'AWS::NetworkManager::TransitGatewayPeering' | 'AWS::OpenSearchServerless::SecurityConfig' | 'AWS::Redshift::Integration' | 'AWS::RolesAnywhere::TrustAnchor' | 'AWS::Route53Profiles::ProfileAssociation' | 'AWS::SSMIncidents::ResponsePlan' | 'AWS::Transfer::Server' | 'AWS::Glue::Database' | 'AWS::Organizations::OrganizationalUnit' | 'AWS::EC2::IPAMPoolCidr' | 'AWS::EC2::VPCGatewayAttachment' | 'AWS::Bedrock::Prompt' | 'AWS::Comprehend::Flywheel' | 'AWS::DataSync::Agent' | 'AWS::MediaTailor::LiveSource' | 'AWS::MSK::ServerlessCluster' | 'AWS::IoTSiteWise::Asset' | 'AWS::B2BI::Capability' | 'AWS::CloudFront::KeyValueStore' | 'AWS::Deadline::Monitor' | 'AWS::GuardDuty::MalwareProtectionPlan' | 'AWS::Location::APIKey' | 'AWS::MediaPackageV2::OriginEndpoint' | 'AWS::PCAConnectorAD::Connector' | 'AWS::S3Tables::TableBucketPolicy' | 'AWS::SecretsManager::ResourcePolicy' | 'AWS::SSMContacts::Contact' | 'AWS::IoT::ThingGroup' | 'AWS::ImageBuilder::LifecyclePolicy' | 'AWS::GameLift::Build' | 'AWS::ECR::ReplicationConfiguration' | 'AWS::EC2::SubnetCidrBlock' | 'AWS::Connect::SecurityProfile' | 'AWS::CleanRoomsML::TrainingDataset' | 'AWS::AppStream::AppBlockBuilder' | 'AWS::Route53::DNSSEC' | 'AWS::SageMaker::UserProfile' | 'AWS::ApiGateway::Method';
  /** The 12-digit ID of the account. */
  AccountId?: string;
  /** The region where the account is located. */
  Region?: string;
}

export interface ConformancePackEvaluationFilters {
  /** Filters the results by Config rule names. */
  ConfigRuleNames?: string[];
  /** Filters the results by compliance. The allowed values are COMPLIANT and NON_COMPLIANT. INSUFFICIENT_DATA is not supported. */
  ComplianceType?: 'COMPLIANT' | 'NON_COMPLIANT' | 'INSUFFICIENT_DATA';
  /** Filters the results by the resource type (for example, "AWS::EC2::Instance"). */
  ResourceType?: string;
  /** Filters the results by resource IDs. This is valid only when you provide resource type. If there is no resource type, you will see an error. */
  ResourceIds?: string[];
}

export interface StatusDetailFilters {
  /** The 12-digit account ID of the member account within an organization. */
  AccountId?: string;
  /** Indicates deployment status for Config rule in the member account. When management account calls PutOrganizationConfigRule action for the first time, Config rule status is created in the member accoun */
  MemberAccountRuleStatus?: 'CREATE_SUCCESSFUL' | 'CREATE_IN_PROGRESS' | 'CREATE_FAILED' | 'DELETE_SUCCESSFUL' | 'DELETE_FAILED' | 'DELETE_IN_PROGRESS' | 'UPDATE_SUCCESSFUL' | 'UPDATE_IN_PROGRESS' | 'UPDATE_FAILED';
}

export interface OrganizationResourceDetailedStatusFilters {
  /** The 12-digit account ID of the member account within an organization. */
  AccountId?: string;
  /** Indicates deployment status for conformance pack in a member account. When management account calls PutOrganizationConformancePack action for the first time, conformance pack status is created in the  */
  Status?: 'CREATE_SUCCESSFUL' | 'CREATE_IN_PROGRESS' | 'CREATE_FAILED' | 'DELETE_SUCCESSFUL' | 'DELETE_FAILED' | 'DELETE_IN_PROGRESS' | 'UPDATE_SUCCESSFUL' | 'UPDATE_IN_PROGRESS' | 'UPDATE_FAILED';
}

export interface ResourceFilters {
  /** The 12-digit source account ID. */
  AccountId?: string;
  /** The ID of the resource. */
  ResourceId?: string;
  /** The name of the resource. */
  ResourceName?: string;
  /** The source region. */
  Region?: string;
}

export interface ConfigurationRecorderFilter {
  /** The name of the type of filter. Currently, only recordingScope is supported. */
  filterName?: 'recordingScope';
  /** The value of the filter. For recordingScope, valid values include: INTERNAL and PAID. INTERNAL indicates that the ConfigurationItems in scope for the configuration recorder are recorded for free. PAID */
  filterValue?: any[];
}

export interface ConformancePackComplianceScoresFilters {
  /** The names of the conformance packs whose compliance scores you want to include in the conformance pack compliance score result set. You can include up to 25 conformance packs in the ConformancePackNam */
  ConformancePackNames: string[];
}

export interface TimeWindow {
  /** The start time of an execution. */
  StartTime?: string;
  /** The end time of an execution. The end time must be after the start date. */
  EndTime?: string;
}

export interface ResourceEvaluationFilters {
  /** Filters all resource evaluations results based on an evaluation mode. Currently, DECTECTIVE is not supported as a valid value. Ignore other documentation stating otherwise. */
  EvaluationMode?: 'DETECTIVE' | 'PROACTIVE';
  /** Returns a TimeWindow object. */
  TimeWindow?: TimeWindow;
  /** Filters evaluations for a given infrastructure deployment. For example: CFN Stack. */
  EvaluationContextIdentifier?: string;
}

export interface Tag {
  /** One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values. */
  Key?: string;
  /** The optional part of a key-value pair that make up a tag. A value acts as a descriptor within a tag category (key). */
  Value?: string;
}

export interface Scope {
  /** The resource types of only those Amazon Web Services resources that you want to trigger an evaluation for the rule. You can only specify one type if you also specify a resource ID for ComplianceResour */
  ComplianceResourceTypes?: any[];
  /** The tag key that is applied to only those Amazon Web Services resources that you want to trigger an evaluation for the rule. */
  TagKey?: string;
  /** The tag value applied to only those Amazon Web Services resources that you want to trigger an evaluation for the rule. If you specify a value for TagValue, you must also specify a value for TagKey. */
  TagValue?: string;
  /** The ID of the only Amazon Web Services resource that you want to trigger an evaluation for the rule. If you specify a resource ID, you must specify one resource type for ComplianceResourceTypes. */
  ComplianceResourceId?: string;
}

export interface Source {
  /** Indicates whether Amazon Web Services or the customer owns and manages the Config rule. Config Managed Rules are predefined rules owned by Amazon Web Services. For more information, see Config Managed */
  Owner: 'CUSTOM_LAMBDA' | 'AWS' | 'CUSTOM_POLICY';
  /** For Config Managed rules, a predefined identifier from a list. For example, IAM_PASSWORD_POLICY is a managed rule. To reference a managed rule, see List of Config Managed Rules. For Config Custom Lamb */
  SourceIdentifier?: string;
  /** Provides the source and the message types that cause Config to evaluate your Amazon Web Services resources against a rule. It also provides the frequency with which you want Config to run evaluations  */
  SourceDetails?: any[];
  /** Provides the runtime system, policy definition, and whether debug logging is enabled. Required when owner is set to CUSTOM_POLICY. */
  CustomPolicyDetails?: any;
}

export interface ConfigRule {
  /** The name that you assign to the Config rule. The name is required if you are adding a new rule. */
  ConfigRuleName?: string;
  /** The Amazon Resource Name (ARN) of the Config rule. */
  ConfigRuleArn?: string;
  /** The ID of the Config rule. */
  ConfigRuleId?: string;
  /** The description that you provide for the Config rule. */
  Description?: string;
  /** Defines which resources can trigger an evaluation for the rule. The scope can include one or more resource types, a combination of one resource type and one resource ID, or a combination of a tag key  */
  Scope?: Scope;
  /** Provides the rule owner (Amazon Web Services for managed rules, CUSTOM_POLICY for Custom Policy rules, and CUSTOM_LAMBDA for Custom Lambda rules), the rule identifier, and the notifications that cause */
  Source: Source;
  /** A string, in JSON format, that is passed to the Config rule Lambda function. */
  InputParameters?: string;
  /** The maximum frequency with which Config runs evaluations for a rule. You can specify a value for MaximumExecutionFrequency when: This is for an Config managed rule that is triggered at a periodic freq */
  MaximumExecutionFrequency?: 'One_Hour' | 'Three_Hours' | 'Six_Hours' | 'Twelve_Hours' | 'TwentyFour_Hours';
  /** Indicates whether the Config rule is active or is currently being deleted by Config. It can also indicate the evaluation status for the Config rule. Config sets the state of the rule to EVALUATING tem */
  ConfigRuleState?: 'ACTIVE' | 'DELETING' | 'DELETING_RESULTS' | 'EVALUATING';
  /** Service principal name of the service that created the rule. The field is populated only if the service-linked rule is created by a service. The field is empty if you create your own rule. */
  CreatedBy?: string;
  /** The modes the Config rule can be evaluated in. The valid values are distinct objects. By default, the value is Detective evaluation mode only. */
  EvaluationModes?: any[];
}

export interface AccountAggregationSource {
  /** The 12-digit account ID of the account being aggregated. */
  AccountIds: any[];
  /** If true, aggregate existing Config regions and future regions. */
  AllAwsRegions?: boolean;
  /** The source regions being aggregated. */
  AwsRegions?: any[];
}

export interface OrganizationAggregationSource {
  /** ARN of the IAM role used to retrieve Amazon Web Services Organization details associated with the aggregator account. */
  RoleArn: string;
  /** The source regions being aggregated. */
  AwsRegions?: string[];
  /** If true, aggregate existing Config regions and future regions. */
  AllAwsRegions?: boolean;
}

export interface AggregatorFilterResourceType {
  /** The type of resource type filter to apply. INCLUDE specifies that the list of resource types in the Value field will be aggregated and no other resource types will be filtered. */
  Type?: 'INCLUDE';
  /** Comma-separate list of resource types to filter your aggregated configuration recorders. */
  Value?: any[];
}

export interface AggregatorFilterServicePrincipal {
  /** The type of service principal filter to apply. INCLUDE specifies that the list of service principals in the Value field will be aggregated and no other service principals will be filtered. */
  Type?: 'INCLUDE';
  /** Comma-separated list of service principals for the linked Amazon Web Services services to filter your aggregated service-linked configuration recorders. */
  Value?: any[];
}

export interface AggregatorFilters {
  /** An object to filter the configuration recorders based on the resource types in scope for recording. */
  ResourceType?: AggregatorFilterResourceType;
  /** An object to filter service-linked configuration recorders in an aggregator based on the linked Amazon Web Services service. */
  ServicePrincipal?: AggregatorFilterServicePrincipal;
}

export interface RecordingGroup {
  /** Specifies whether Config records configuration changes for all supported resource types, excluding the global IAM resource types. If you set this field to true, when Config adds support for a new reso */
  allSupported?: boolean;
  /** This option is a bundle which only applies to the global IAM resource types: IAM users, groups, roles, and customer managed policies. These global IAM resource types can only be recorded by Config in  */
  includeGlobalResourceTypes?: boolean;
  /** A comma-separated list that specifies which resource types Config records. For a list of valid resourceTypes values, see the Resource Type Value column in Supported Amazon Web Services resource Types  */
  resourceTypes?: any[];
  /** An object that specifies how Config excludes resource types from being recorded by the configuration recorder. Required fields To use this option, you must set the useOnly field of RecordingStrategy t */
  exclusionByResourceTypes?: any;
  /** An object that specifies the recording strategy for the configuration recorder. If you set the useOnly field of RecordingStrategy to ALL_SUPPORTED_RESOURCE_TYPES, Config records configuration changes  */
  recordingStrategy?: any;
}

export interface RecordingMode {
  /** The default recording frequency that Config uses to record configuration changes. Daily recording cannot be specified for the following resource types: AWS::Config::ResourceCompliance AWS::Config::Con */
  recordingFrequency: 'CONTINUOUS' | 'DAILY';
  /** An array of recordingModeOverride objects for you to specify your overrides for the recording mode. The recordingModeOverride object in the recordingModeOverrides array consists of three fields: a des */
  recordingModeOverrides?: any[];
}

export interface ConfigurationRecorder {
  /** The Amazon Resource Name (ARN) of the specified configuration recorder. */
  arn?: string;
  /** The name of the configuration recorder. For customer managed configuration recorders, Config automatically assigns the name of "default" when creating a configuration recorder if you do not specify a  */
  name?: string;
  /** The Amazon Resource Name (ARN) of the IAM role assumed by Config and used by the specified configuration recorder. The server will reject a request without a defined roleARN for the configuration reco */
  roleARN?: string;
  /** Specifies which resource types are in scope for the configuration recorder to record. High Number of Config Evaluations You might notice increased activity in your account during your initial month re */
  recordingGroup?: RecordingGroup;
  /** Specifies the default recording frequency for the configuration recorder. Config supports Continuous recording and Daily recording. Continuous recording allows you to record configuration changes cont */
  recordingMode?: RecordingMode;
  /** Specifies whether the ConfigurationItems in scope for the specified configuration recorder are recorded for free (INTERNAL) or if it impacts the costs to your bill (PAID). */
  recordingScope?: 'INTERNAL' | 'PAID';
  /** For service-linked configuration recorders, specifies the linked Amazon Web Services service for the configuration recorder. */
  servicePrincipal?: string;
}

export interface ConformancePackInputParameter {
  /** One part of a key-value pair. */
  ParameterName: string;
  /** Another part of the key-value pair. */
  ParameterValue: string;
}

export interface TemplateSSMDocumentDetails {
  /** The name or Amazon Resource Name (ARN) of the SSM document to use to create a conformance pack. If you use the document name, Config checks only your account and Amazon Web Services Region for the SSM */
  DocumentName: string;
  /** The version of the SSM document to use to create a conformance pack. By default, Config uses the latest version. This field is optional. */
  DocumentVersion?: string;
}

export interface ConfigSnapshotDeliveryProperties {
  /** The frequency with which Config delivers configuration snapshots. */
  deliveryFrequency?: 'One_Hour' | 'Three_Hours' | 'Six_Hours' | 'Twelve_Hours' | 'TwentyFour_Hours';
}

export interface DeliveryChannel {
  /** The name of the delivery channel. By default, Config assigns the name "default" when creating the delivery channel. To change the delivery channel name, you must use the DeleteDeliveryChannel action t */
  name?: string;
  /** The name of the Amazon S3 bucket to which Config delivers configuration snapshots and configuration history files. If you specify a bucket that belongs to another Amazon Web Services account, that buc */
  s3BucketName?: string;
  /** The prefix for the specified Amazon S3 bucket. */
  s3KeyPrefix?: string;
  /** The Amazon Resource Name (ARN) of the Key Management Service (KMS ) KMS key (KMS key) used to encrypt objects delivered by Config. Must belong to the same Region as the destination S3 bucket. */
  s3KmsKeyArn?: string;
  /** The Amazon Resource Name (ARN) of the Amazon SNS topic to which Config sends notifications about configuration changes. If you choose a topic from another account, the topic must have policies that gr */
  snsTopicARN?: string;
  /** The options for how often Config delivers configuration snapshots to the Amazon S3 bucket. */
  configSnapshotDeliveryProperties?: ConfigSnapshotDeliveryProperties;
}

export interface Evaluation {
  /** The type of Amazon Web Services resource that was evaluated. */
  ComplianceResourceType: string;
  /** The ID of the Amazon Web Services resource that was evaluated. */
  ComplianceResourceId: string;
  /** Indicates whether the Amazon Web Services resource complies with the Config rule that it was evaluated against. For the Evaluation data type, Config supports only the COMPLIANT, NON_COMPLIANT, and NOT */
  ComplianceType: 'COMPLIANT' | 'NON_COMPLIANT' | 'NOT_APPLICABLE' | 'INSUFFICIENT_DATA';
  /** Supplementary information about how the evaluation determined the compliance. */
  Annotation?: string;
  /** The time of the event in Config that triggered the evaluation. For event-based evaluations, the time indicates when Config created the configuration item that triggered the evaluation. For periodic ev */
  OrderingTimestamp: string;
}

export interface ExternalEvaluation {
  /** The evaluated compliance resource type. Config accepts AWS::::Account resource type. */
  ComplianceResourceType: string;
  /** The evaluated compliance resource ID. Config accepts only Amazon Web Services account ID. */
  ComplianceResourceId: string;
  /** The compliance of the Amazon Web Services resource. The valid values are COMPLIANT, NON_COMPLIANT, and NOT_APPLICABLE. */
  ComplianceType: 'COMPLIANT' | 'NON_COMPLIANT' | 'NOT_APPLICABLE' | 'INSUFFICIENT_DATA';
  /** Supplementary information about the reason of compliance. For example, this task was completed on a specific date. */
  Annotation?: string;
  /** The time when the compliance was recorded. */
  OrderingTimestamp: string;
}

export interface OrganizationManagedRuleMetadata {
  /** The description that you provide for your organization Config rule. */
  Description?: string;
  /** For organization config managed rules, a predefined identifier from a list. For example, IAM_PASSWORD_POLICY is a managed rule. To reference a managed rule, see Using Config managed rules. */
  RuleIdentifier: string;
  /** A string, in JSON format, that is passed to your organization Config rule Lambda function. */
  InputParameters?: string;
  /** The maximum frequency with which Config runs evaluations for a rule. This is for an Config managed rule that is triggered at a periodic frequency. By default, rules with a periodic trigger are evaluat */
  MaximumExecutionFrequency?: 'One_Hour' | 'Three_Hours' | 'Six_Hours' | 'Twelve_Hours' | 'TwentyFour_Hours';
  /** The type of the Amazon Web Services resource that was evaluated. */
  ResourceTypesScope?: string[];
  /** The ID of the Amazon Web Services resource that was evaluated. */
  ResourceIdScope?: string;
  /** One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values. */
  TagKeyScope?: string;
  /** The optional part of a key-value pair that make up a tag. A value acts as a descriptor within a tag category (key). */
  TagValueScope?: string;
}

export interface OrganizationCustomRuleMetadata {
  /** The description that you provide for your organization Config rule. */
  Description?: string;
  /** The lambda function ARN. */
  LambdaFunctionArn: string;
  /** The type of notification that triggers Config to run an evaluation for a rule. You can specify the following notification types: ConfigurationItemChangeNotification - Triggers an evaluation when Confi */
  OrganizationConfigRuleTriggerTypes: 'ConfigurationItemChangeNotification' | 'OversizedConfigurationItemChangeNotification' | 'ScheduledNotification'[];
  /** A string, in JSON format, that is passed to your organization Config rule Lambda function. */
  InputParameters?: string;
  /** The maximum frequency with which Config runs evaluations for a rule. Your custom rule is triggered when Config delivers the configuration snapshot. For more information, see ConfigSnapshotDeliveryProp */
  MaximumExecutionFrequency?: 'One_Hour' | 'Three_Hours' | 'Six_Hours' | 'Twelve_Hours' | 'TwentyFour_Hours';
  /** The type of the Amazon Web Services resource that was evaluated. */
  ResourceTypesScope?: string[];
  /** The ID of the Amazon Web Services resource that was evaluated. */
  ResourceIdScope?: string;
  /** One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values. */
  TagKeyScope?: string;
  /** The optional part of a key-value pair that make up a tag. A value acts as a descriptor within a tag category (key). */
  TagValueScope?: string;
}

export interface OrganizationCustomPolicyRuleMetadata {
  /** The description that you provide for your organization Config Custom Policy rule. */
  Description?: string;
  /** The type of notification that initiates Config to run an evaluation for a rule. For Config Custom Policy rules, Config supports change-initiated notification types: ConfigurationItemChangeNotification */
  OrganizationConfigRuleTriggerTypes?: 'ConfigurationItemChangeNotification' | 'OversizedConfigurationItemChangeNotification'[];
  /** A string, in JSON format, that is passed to your organization Config Custom Policy rule. */
  InputParameters?: string;
  /** The maximum frequency with which Config runs evaluations for a rule. Your Config Custom Policy rule is triggered when Config delivers the configuration snapshot. For more information, see ConfigSnapsh */
  MaximumExecutionFrequency?: 'One_Hour' | 'Three_Hours' | 'Six_Hours' | 'Twelve_Hours' | 'TwentyFour_Hours';
  /** The type of the Amazon Web Services resource that was evaluated. */
  ResourceTypesScope?: string[];
  /** The ID of the Amazon Web Services resource that was evaluated. */
  ResourceIdScope?: string;
  /** One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values. */
  TagKeyScope?: string;
  /** The optional part of a key-value pair that make up a tag. A value acts as a descriptor within a tag category (key). */
  TagValueScope?: string;
  /** The runtime system for your organization Config Custom Policy rules. Guard is a policy-as-code language that allows you to write policies that are enforced by Config Custom Policy rules. For more info */
  PolicyRuntime: string;
  /** The policy definition containing the logic for your organization Config Custom Policy rule. */
  PolicyText: string;
  /** A list of accounts that you can enable debug logging for your organization Config Custom Policy rule. List is null when debug logging is enabled for all accounts. */
  DebugLogDeliveryAccounts?: string[];
}

export interface RemediationConfiguration {
  /** The name of the Config rule. */
  ConfigRuleName: string;
  /** The type of the target. Target executes remediation. For example, SSM document. */
  TargetType: 'SSM_DOCUMENT';
  /** Target ID is the name of the SSM document. */
  TargetId: string;
  /** Version of the target. For example, version of the SSM document. If you make backward incompatible changes to the SSM document, you must call PutRemediationConfiguration API again to ensure the remedi */
  TargetVersion?: string;
  /** An object of the RemediationParameterValue. */
  Parameters?: Record<string, any>;
  /** The type of a resource. */
  ResourceType?: string;
  /** The remediation is triggered automatically. */
  Automatic?: boolean;
  /** An ExecutionControls object. */
  ExecutionControls?: any;
  /** The maximum number of failed attempts for auto-remediation. If you do not select a number, the default is 5. For example, if you specify MaximumAutomaticAttempts as 5 with RetryAttemptSeconds as 50 se */
  MaximumAutomaticAttempts?: number;
  /** Time window to determine whether or not to add a remediation exception to prevent infinite remediation attempts. If MaximumAutomaticAttempts remediation attempts have been made under RetryAttemptSecon */
  RetryAttemptSeconds?: number;
  /** Amazon Resource Name (ARN) of remediation configuration. */
  Arn?: string;
  /** Name of the service that owns the service-linked rule, if applicable. */
  CreatedByService?: string;
}

export interface StoredQuery {
  /** The ID of the query. */
  QueryId?: string;
  /** Amazon Resource Name (ARN) of the query. For example, arn:partition:service:region:account-id:resource-type/resource-name/resource-id. */
  QueryArn?: string;
  /** The name of the query. */
  QueryName: string;
  /** A unique description for the query. */
  Description?: string;
  /** The expression of the query. For example, SELECT resourceId, resourceType, supplementaryConfiguration.BucketVersioningConfiguration.status WHERE resourceType = 'AWS::S3::Bucket' AND supplementaryConfi */
  Expression?: string;
}

export interface ResourceDetails {
  /** A unique resource ID for an evaluation. */
  ResourceId: string;
  /** The type of resource being evaluated. */
  ResourceType: string;
  /** The resource definition to be evaluated as per the resource configuration schema type. */
  ResourceConfiguration: string;
  /** The schema type of the resource configuration. You can find the Resource type schema, or CFN_RESOURCE_SCHEMA, in "Amazon Web Services public extensions" within the CloudFormation registry or with the  */
  ResourceConfigurationSchemaType?: 'CFN_RESOURCE_SCHEMA';
}

export interface EvaluationContext {
  /** A unique EvaluationContextIdentifier ID for an EvaluationContext. */
  EvaluationContextIdentifier?: string;
}

export interface AssociateResourceTypesInput {
  /** The Amazon Resource Name (ARN) of the specified configuration recorder. */
  ConfigurationRecorderArn: string;
  /** The list of resource types you want to add to the recording group of the specified configuration recorder. */
  ResourceTypes: 'AWS::EC2::CustomerGateway' | 'AWS::EC2::EIP' | 'AWS::EC2::Host' | 'AWS::EC2::Instance' | 'AWS::EC2::InternetGateway' | 'AWS::EC2::NetworkAcl' | 'AWS::EC2::NetworkInterface' | 'AWS::EC2::RouteTable' | 'AWS::EC2::SecurityGroup' | 'AWS::EC2::Subnet' | 'AWS::CloudTrail::Trail' | 'AWS::EC2::Volume' | 'AWS::EC2::VPC' | 'AWS::EC2::VPNConnection' | 'AWS::EC2::VPNGateway' | 'AWS::EC2::RegisteredHAInstance' | 'AWS::EC2::NatGateway' | 'AWS::EC2::EgressOnlyInternetGateway' | 'AWS::EC2::VPCEndpoint' | 'AWS::EC2::VPCEndpointService' | 'AWS::EC2::FlowLog' | 'AWS::EC2::VPCPeeringConnection' | 'AWS::Elasticsearch::Domain' | 'AWS::IAM::Group' | 'AWS::IAM::Policy' | 'AWS::IAM::Role' | 'AWS::IAM::User' | 'AWS::ElasticLoadBalancingV2::LoadBalancer' | 'AWS::ACM::Certificate' | 'AWS::RDS::DBInstance' | 'AWS::RDS::DBSubnetGroup' | 'AWS::RDS::DBSecurityGroup' | 'AWS::RDS::DBSnapshot' | 'AWS::RDS::DBCluster' | 'AWS::RDS::DBClusterSnapshot' | 'AWS::RDS::EventSubscription' | 'AWS::S3::Bucket' | 'AWS::S3::AccountPublicAccessBlock' | 'AWS::Redshift::Cluster' | 'AWS::Redshift::ClusterSnapshot' | 'AWS::Redshift::ClusterParameterGroup' | 'AWS::Redshift::ClusterSecurityGroup' | 'AWS::Redshift::ClusterSubnetGroup' | 'AWS::Redshift::EventSubscription' | 'AWS::SSM::ManagedInstanceInventory' | 'AWS::CloudWatch::Alarm' | 'AWS::CloudFormation::Stack' | 'AWS::ElasticLoadBalancing::LoadBalancer' | 'AWS::AutoScaling::AutoScalingGroup' | 'AWS::AutoScaling::LaunchConfiguration' | 'AWS::AutoScaling::ScalingPolicy' | 'AWS::AutoScaling::ScheduledAction' | 'AWS::DynamoDB::Table' | 'AWS::CodeBuild::Project' | 'AWS::WAF::RateBasedRule' | 'AWS::WAF::Rule' | 'AWS::WAF::RuleGroup' | 'AWS::WAF::WebACL' | 'AWS::WAFRegional::RateBasedRule' | 'AWS::WAFRegional::Rule' | 'AWS::WAFRegional::RuleGroup' | 'AWS::WAFRegional::WebACL' | 'AWS::CloudFront::Distribution' | 'AWS::CloudFront::StreamingDistribution' | 'AWS::Lambda::Function' | 'AWS::NetworkFirewall::Firewall' | 'AWS::NetworkFirewall::FirewallPolicy' | 'AWS::NetworkFirewall::RuleGroup' | 'AWS::ElasticBeanstalk::Application' | 'AWS::ElasticBeanstalk::ApplicationVersion' | 'AWS::ElasticBeanstalk::Environment' | 'AWS::WAFv2::WebACL' | 'AWS::WAFv2::RuleGroup' | 'AWS::WAFv2::IPSet' | 'AWS::WAFv2::RegexPatternSet' | 'AWS::WAFv2::ManagedRuleSet' | 'AWS::XRay::EncryptionConfig' | 'AWS::SSM::AssociationCompliance' | 'AWS::SSM::PatchCompliance' | 'AWS::Shield::Protection' | 'AWS::ShieldRegional::Protection' | 'AWS::Config::ConformancePackCompliance' | 'AWS::Config::ResourceCompliance' | 'AWS::ApiGateway::Stage' | 'AWS::ApiGateway::RestApi' | 'AWS::ApiGatewayV2::Stage' | 'AWS::ApiGatewayV2::Api' | 'AWS::CodePipeline::Pipeline' | 'AWS::ServiceCatalog::CloudFormationProvisionedProduct' | 'AWS::ServiceCatalog::CloudFormationProduct' | 'AWS::ServiceCatalog::Portfolio' | 'AWS::SQS::Queue' | 'AWS::KMS::Key' | 'AWS::QLDB::Ledger' | 'AWS::SecretsManager::Secret' | 'AWS::SNS::Topic' | 'AWS::SSM::FileData' | 'AWS::Backup::BackupPlan' | 'AWS::Backup::BackupSelection' | 'AWS::Backup::BackupVault' | 'AWS::Backup::RecoveryPoint' | 'AWS::ECR::Repository' | 'AWS::ECS::Cluster' | 'AWS::ECS::Service' | 'AWS::ECS::TaskDefinition' | 'AWS::EFS::AccessPoint' | 'AWS::EFS::FileSystem' | 'AWS::EKS::Cluster' | 'AWS::OpenSearch::Domain' | 'AWS::EC2::TransitGateway' | 'AWS::Kinesis::Stream' | 'AWS::Kinesis::StreamConsumer' | 'AWS::CodeDeploy::Application' | 'AWS::CodeDeploy::DeploymentConfig' | 'AWS::CodeDeploy::DeploymentGroup' | 'AWS::EC2::LaunchTemplate' | 'AWS::ECR::PublicRepository' | 'AWS::GuardDuty::Detector' | 'AWS::EMR::SecurityConfiguration' | 'AWS::SageMaker::CodeRepository' | 'AWS::Route53Resolver::ResolverEndpoint' | 'AWS::Route53Resolver::ResolverRule' | 'AWS::Route53Resolver::ResolverRuleAssociation' | 'AWS::DMS::ReplicationSubnetGroup' | 'AWS::DMS::EventSubscription' | 'AWS::MSK::Cluster' | 'AWS::StepFunctions::Activity' | 'AWS::WorkSpaces::Workspace' | 'AWS::WorkSpaces::ConnectionAlias' | 'AWS::SageMaker::Model' | 'AWS::ElasticLoadBalancingV2::Listener' | 'AWS::StepFunctions::StateMachine' | 'AWS::Batch::JobQueue' | 'AWS::Batch::ComputeEnvironment' | 'AWS::AccessAnalyzer::Analyzer' | 'AWS::Athena::WorkGroup' | 'AWS::Athena::DataCatalog' | 'AWS::Detective::Graph' | 'AWS::GlobalAccelerator::Accelerator' | 'AWS::GlobalAccelerator::EndpointGroup' | 'AWS::GlobalAccelerator::Listener' | 'AWS::EC2::TransitGatewayAttachment' | 'AWS::EC2::TransitGatewayRouteTable' | 'AWS::DMS::Certificate' | 'AWS::AppConfig::Application' | 'AWS::AppSync::GraphQLApi' | 'AWS::DataSync::LocationSMB' | 'AWS::DataSync::LocationFSxLustre' | 'AWS::DataSync::LocationS3' | 'AWS::DataSync::LocationEFS' | 'AWS::DataSync::Task' | 'AWS::DataSync::LocationNFS' | 'AWS::EC2::NetworkInsightsAccessScopeAnalysis' | 'AWS::EKS::FargateProfile' | 'AWS::Glue::Job' | 'AWS::GuardDuty::ThreatIntelSet' | 'AWS::GuardDuty::IPSet' | 'AWS::SageMaker::Workteam' | 'AWS::SageMaker::NotebookInstanceLifecycleConfig' | 'AWS::ServiceDiscovery::Service' | 'AWS::ServiceDiscovery::PublicDnsNamespace' | 'AWS::SES::ContactList' | 'AWS::SES::ConfigurationSet' | 'AWS::Route53::HostedZone' | 'AWS::IoTEvents::Input' | 'AWS::IoTEvents::DetectorModel' | 'AWS::IoTEvents::AlarmModel' | 'AWS::ServiceDiscovery::HttpNamespace' | 'AWS::Events::EventBus' | 'AWS::ImageBuilder::ContainerRecipe' | 'AWS::ImageBuilder::DistributionConfiguration' | 'AWS::ImageBuilder::InfrastructureConfiguration' | 'AWS::DataSync::LocationObjectStorage' | 'AWS::DataSync::LocationHDFS' | 'AWS::Glue::Classifier' | 'AWS::Route53RecoveryReadiness::Cell' | 'AWS::Route53RecoveryReadiness::ReadinessCheck' | 'AWS::ECR::RegistryPolicy' | 'AWS::Backup::ReportPlan' | 'AWS::Lightsail::Certificate' | 'AWS::RUM::AppMonitor' | 'AWS::Events::Endpoint' | 'AWS::SES::ReceiptRuleSet' | 'AWS::Events::Archive' | 'AWS::Events::ApiDestination' | 'AWS::Lightsail::Disk' | 'AWS::FIS::ExperimentTemplate' | 'AWS::DataSync::LocationFSxWindows' | 'AWS::SES::ReceiptFilter' | 'AWS::GuardDuty::Filter' | 'AWS::SES::Template' | 'AWS::AmazonMQ::Broker' | 'AWS::AppConfig::Environment' | 'AWS::AppConfig::ConfigurationProfile' | 'AWS::Cloud9::EnvironmentEC2' | 'AWS::EventSchemas::Registry' | 'AWS::EventSchemas::RegistryPolicy' | 'AWS::EventSchemas::Discoverer' | 'AWS::FraudDetector::Label' | 'AWS::FraudDetector::EntityType' | 'AWS::FraudDetector::Variable' | 'AWS::FraudDetector::Outcome' | 'AWS::IoT::Authorizer' | 'AWS::IoT::SecurityProfile' | 'AWS::IoT::RoleAlias' | 'AWS::IoT::Dimension' | 'AWS::IoTAnalytics::Datastore' | 'AWS::Lightsail::Bucket' | 'AWS::Lightsail::StaticIp' | 'AWS::MediaPackage::PackagingGroup' | 'AWS::Route53RecoveryReadiness::RecoveryGroup' | 'AWS::ResilienceHub::ResiliencyPolicy' | 'AWS::Transfer::Workflow' | 'AWS::EKS::IdentityProviderConfig' | 'AWS::EKS::Addon' | 'AWS::Glue::MLTransform' | 'AWS::IoT::Policy' | 'AWS::IoT::MitigationAction' | 'AWS::IoTTwinMaker::Workspace' | 'AWS::IoTTwinMaker::Entity' | 'AWS::IoTAnalytics::Dataset' | 'AWS::IoTAnalytics::Pipeline' | 'AWS::IoTAnalytics::Channel' | 'AWS::IoTSiteWise::Dashboard' | 'AWS::IoTSiteWise::Project' | 'AWS::IoTSiteWise::Portal' | 'AWS::IoTSiteWise::AssetModel' | 'AWS::IVS::Channel' | 'AWS::IVS::RecordingConfiguration' | 'AWS::IVS::PlaybackKeyPair' | 'AWS::KinesisAnalyticsV2::Application' | 'AWS::RDS::GlobalCluster' | 'AWS::S3::MultiRegionAccessPoint' | 'AWS::DeviceFarm::TestGridProject' | 'AWS::Budgets::BudgetsAction' | 'AWS::Lex::Bot' | 'AWS::CodeGuruReviewer::RepositoryAssociation' | 'AWS::IoT::CustomMetric' | 'AWS::Route53Resolver::FirewallDomainList' | 'AWS::RoboMaker::RobotApplicationVersion' | 'AWS::EC2::TrafficMirrorSession' | 'AWS::IoTSiteWise::Gateway' | 'AWS::Lex::BotAlias' | 'AWS::LookoutMetrics::Alert' | 'AWS::IoT::AccountAuditConfiguration' | 'AWS::EC2::TrafficMirrorTarget' | 'AWS::S3::StorageLens' | 'AWS::IoT::ScheduledAudit' | 'AWS::Events::Connection' | 'AWS::EventSchemas::Schema' | 'AWS::MediaPackage::PackagingConfiguration' | 'AWS::KinesisVideo::SignalingChannel' | 'AWS::AppStream::DirectoryConfig' | 'AWS::LookoutVision::Project' | 'AWS::Route53RecoveryControl::Cluster' | 'AWS::Route53RecoveryControl::SafetyRule' | 'AWS::Route53RecoveryControl::ControlPanel' | 'AWS::Route53RecoveryControl::RoutingControl' | 'AWS::Route53RecoveryReadiness::ResourceSet' | 'AWS::RoboMaker::SimulationApplication' | 'AWS::RoboMaker::RobotApplication' | 'AWS::HealthLake::FHIRDatastore' | 'AWS::Pinpoint::Segment' | 'AWS::Pinpoint::ApplicationSettings' | 'AWS::Events::Rule' | 'AWS::EC2::DHCPOptions' | 'AWS::EC2::NetworkInsightsPath' | 'AWS::EC2::TrafficMirrorFilter' | 'AWS::EC2::IPAM' | 'AWS::IoTTwinMaker::Scene' | 'AWS::NetworkManager::TransitGatewayRegistration' | 'AWS::CustomerProfiles::Domain' | 'AWS::AutoScaling::WarmPool' | 'AWS::Connect::PhoneNumber' | 'AWS::AppConfig::DeploymentStrategy' | 'AWS::AppFlow::Flow' | 'AWS::AuditManager::Assessment' | 'AWS::CloudWatch::MetricStream' | 'AWS::DeviceFarm::InstanceProfile' | 'AWS::DeviceFarm::Project' | 'AWS::EC2::EC2Fleet' | 'AWS::EC2::SubnetRouteTableAssociation' | 'AWS::ECR::PullThroughCacheRule' | 'AWS::GroundStation::Config' | 'AWS::ImageBuilder::ImagePipeline' | 'AWS::IoT::FleetMetric' | 'AWS::IoTWireless::ServiceProfile' | 'AWS::NetworkManager::Device' | 'AWS::NetworkManager::GlobalNetwork' | 'AWS::NetworkManager::Link' | 'AWS::NetworkManager::Site' | 'AWS::Panorama::Package' | 'AWS::Pinpoint::App' | 'AWS::Redshift::ScheduledAction' | 'AWS::Route53Resolver::FirewallRuleGroupAssociation' | 'AWS::SageMaker::AppImageConfig' | 'AWS::SageMaker::Image' | 'AWS::ECS::TaskSet' | 'AWS::Cassandra::Keyspace' | 'AWS::Signer::SigningProfile' | 'AWS::Amplify::App' | 'AWS::AppMesh::VirtualNode' | 'AWS::AppMesh::VirtualService' | 'AWS::AppRunner::VpcConnector' | 'AWS::AppStream::Application' | 'AWS::CodeArtifact::Repository' | 'AWS::EC2::PrefixList' | 'AWS::EC2::SpotFleet' | 'AWS::Evidently::Project' | 'AWS::Forecast::Dataset' | 'AWS::IAM::SAMLProvider' | 'AWS::IAM::ServerCertificate' | 'AWS::Pinpoint::Campaign' | 'AWS::Pinpoint::InAppTemplate' | 'AWS::SageMaker::Domain' | 'AWS::Transfer::Agreement' | 'AWS::Transfer::Connector' | 'AWS::KinesisFirehose::DeliveryStream' | 'AWS::Amplify::Branch' | 'AWS::AppIntegrations::EventIntegration' | 'AWS::AppMesh::Route' | 'AWS::Athena::PreparedStatement' | 'AWS::EC2::IPAMScope' | 'AWS::Evidently::Launch' | 'AWS::Forecast::DatasetGroup' | 'AWS::GreengrassV2::ComponentVersion' | 'AWS::GroundStation::MissionProfile' | 'AWS::MediaConnect::FlowEntitlement' | 'AWS::MediaConnect::FlowVpcInterface' | 'AWS::MediaTailor::PlaybackConfiguration' | 'AWS::MSK::Configuration' | 'AWS::Personalize::Dataset' | 'AWS::Personalize::Schema' | 'AWS::Personalize::Solution' | 'AWS::Pinpoint::EmailTemplate' | 'AWS::Pinpoint::EventStream' | 'AWS::ResilienceHub::App' | 'AWS::ACMPCA::CertificateAuthority' | 'AWS::AppConfig::HostedConfigurationVersion' | 'AWS::AppMesh::VirtualGateway' | 'AWS::AppMesh::VirtualRouter' | 'AWS::AppRunner::Service' | 'AWS::CustomerProfiles::ObjectType' | 'AWS::DMS::Endpoint' | 'AWS::EC2::CapacityReservation' | 'AWS::EC2::ClientVpnEndpoint' | 'AWS::Kendra::Index' | 'AWS::KinesisVideo::Stream' | 'AWS::Logs::Destination' | 'AWS::Pinpoint::EmailChannel' | 'AWS::S3::AccessPoint' | 'AWS::NetworkManager::CustomerGatewayAssociation' | 'AWS::NetworkManager::LinkAssociation' | 'AWS::IoTWireless::MulticastGroup' | 'AWS::Personalize::DatasetGroup' | 'AWS::IoTTwinMaker::ComponentType' | 'AWS::CodeBuild::ReportGroup' | 'AWS::SageMaker::FeatureGroup' | 'AWS::MSK::BatchScramSecret' | 'AWS::AppStream::Stack' | 'AWS::IoT::JobTemplate' | 'AWS::IoTWireless::FuotaTask' | 'AWS::IoT::ProvisioningTemplate' | 'AWS::InspectorV2::Filter' | 'AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation' | 'AWS::ServiceDiscovery::Instance' | 'AWS::Transfer::Certificate' | 'AWS::MediaConnect::FlowSource' | 'AWS::APS::RuleGroupsNamespace' | 'AWS::CodeGuruProfiler::ProfilingGroup' | 'AWS::Route53Resolver::ResolverQueryLoggingConfig' | 'AWS::Batch::SchedulingPolicy' | 'AWS::ACMPCA::CertificateAuthorityActivation' | 'AWS::AppMesh::GatewayRoute' | 'AWS::AppMesh::Mesh' | 'AWS::Connect::Instance' | 'AWS::Connect::QuickConnect' | 'AWS::EC2::CarrierGateway' | 'AWS::EC2::IPAMPool' | 'AWS::EC2::TransitGatewayConnect' | 'AWS::EC2::TransitGatewayMulticastDomain' | 'AWS::ECS::CapacityProvider' | 'AWS::IAM::InstanceProfile' | 'AWS::IoT::CACertificate' | 'AWS::IoTTwinMaker::SyncJob' | 'AWS::KafkaConnect::Connector' | 'AWS::Lambda::CodeSigningConfig' | 'AWS::NetworkManager::ConnectPeer' | 'AWS::ResourceExplorer2::Index' | 'AWS::AppStream::Fleet' | 'AWS::Cognito::UserPool' | 'AWS::Cognito::UserPoolClient' | 'AWS::Cognito::UserPoolGroup' | 'AWS::EC2::NetworkInsightsAccessScope' | 'AWS::EC2::NetworkInsightsAnalysis' | 'AWS::Grafana::Workspace' | 'AWS::GroundStation::DataflowEndpointGroup' | 'AWS::ImageBuilder::ImageRecipe' | 'AWS::KMS::Alias' | 'AWS::M2::Environment' | 'AWS::QuickSight::DataSource' | 'AWS::QuickSight::Template' | 'AWS::QuickSight::Theme' | 'AWS::RDS::OptionGroup' | 'AWS::Redshift::EndpointAccess' | 'AWS::Route53Resolver::FirewallRuleGroup' | 'AWS::SSM::Document' | 'AWS::AppConfig::ExtensionAssociation' | 'AWS::AppIntegrations::Application' | 'AWS::AppSync::ApiCache' | 'AWS::Bedrock::Guardrail' | 'AWS::Bedrock::KnowledgeBase' | 'AWS::Cognito::IdentityPool' | 'AWS::Connect::Rule' | 'AWS::Connect::User' | 'AWS::EC2::ClientVpnTargetNetworkAssociation' | 'AWS::EC2::EIPAssociation' | 'AWS::EC2::IPAMResourceDiscovery' | 'AWS::EC2::IPAMResourceDiscoveryAssociation' | 'AWS::EC2::InstanceConnectEndpoint' | 'AWS::EC2::SnapshotBlockPublicAccess' | 'AWS::EC2::VPCBlockPublicAccessExclusion' | 'AWS::EC2::VPCBlockPublicAccessOptions' | 'AWS::EC2::VPCEndpointConnectionNotification' | 'AWS::EC2::VPNConnectionRoute' | 'AWS::Evidently::Segment' | 'AWS::IAM::OIDCProvider' | 'AWS::InspectorV2::Activation' | 'AWS::MSK::ClusterPolicy' | 'AWS::MSK::VpcConnection' | 'AWS::MediaConnect::Gateway' | 'AWS::MemoryDB::SubnetGroup' | 'AWS::OpenSearchServerless::Collection' | 'AWS::OpenSearchServerless::VpcEndpoint' | 'AWS::Redshift::EndpointAuthorization' | 'AWS::Route53Profiles::Profile' | 'AWS::S3::StorageLensGroup' | 'AWS::S3Express::BucketPolicy' | 'AWS::S3Express::DirectoryBucket' | 'AWS::SageMaker::InferenceExperiment' | 'AWS::SecurityHub::Standard' | 'AWS::Transfer::Profile' | 'AWS::CloudFormation::StackSet' | 'AWS::MediaPackageV2::Channel' | 'AWS::S3::AccessGrantsLocation' | 'AWS::S3::AccessGrant' | 'AWS::S3::AccessGrantsInstance' | 'AWS::EMRServerless::Application' | 'AWS::Config::AggregationAuthorization' | 'AWS::Bedrock::ApplicationInferenceProfile' | 'AWS::ApiGatewayV2::Integration' | 'AWS::SageMaker::MlflowTrackingServer' | 'AWS::SageMaker::ModelBiasJobDefinition' | 'AWS::SecretsManager::RotationSchedule' | 'AWS::Deadline::QueueFleetAssociation' | 'AWS::ECR::RepositoryCreationTemplate' | 'AWS::CloudFormation::LambdaHook' | 'AWS::EC2::SubnetNetworkAclAssociation' | 'AWS::ApiGateway::UsagePlan' | 'AWS::AppConfig::Extension' | 'AWS::Deadline::Fleet' | 'AWS::EMR::Studio' | 'AWS::S3Tables::TableBucket' | 'AWS::CloudFront::RealtimeLogConfig' | 'AWS::BackupGateway::Hypervisor' | 'AWS::BCMDataExports::Export' | 'AWS::CloudFormation::GuardHook' | 'AWS::CloudFront::PublicKey' | 'AWS::CloudTrail::EventDataStore' | 'AWS::EntityResolution::IdMappingWorkflow' | 'AWS::EntityResolution::SchemaMapping' | 'AWS::IoT::DomainConfiguration' | 'AWS::PCAConnectorAD::DirectoryRegistration' | 'AWS::RDS::Integration' | 'AWS::Config::ConformancePack' | 'AWS::RolesAnywhere::Profile' | 'AWS::CodeArtifact::Domain' | 'AWS::Backup::RestoreTestingPlan' | 'AWS::Config::StoredQuery' | 'AWS::SageMaker::DataQualityJobDefinition' | 'AWS::SageMaker::ModelExplainabilityJobDefinition' | 'AWS::SageMaker::ModelQualityJobDefinition' | 'AWS::SageMaker::StudioLifecycleConfig' | 'AWS::SES::DedicatedIpPool' | 'AWS::SES::MailManagerTrafficPolicy' | 'AWS::SSM::ResourceDataSync' | 'AWS::BedrockAgentCore::Runtime' | 'AWS::BedrockAgentCore::BrowserCustom' | 'AWS::ElasticLoadBalancingV2::TargetGroup' | 'AWS::EMRContainers::VirtualCluster' | 'AWS::EntityResolution::MatchingWorkflow' | 'AWS::IoTCoreDeviceAdvisor::SuiteDefinition' | 'AWS::EC2::SecurityGroupVpcAssociation' | 'AWS::EC2::VerifiedAccessInstance' | 'AWS::KafkaConnect::CustomPlugin' | 'AWS::NetworkManager::TransitGatewayPeering' | 'AWS::OpenSearchServerless::SecurityConfig' | 'AWS::Redshift::Integration' | 'AWS::RolesAnywhere::TrustAnchor' | 'AWS::Route53Profiles::ProfileAssociation' | 'AWS::SSMIncidents::ResponsePlan' | 'AWS::Transfer::Server' | 'AWS::Glue::Database' | 'AWS::Organizations::OrganizationalUnit' | 'AWS::EC2::IPAMPoolCidr' | 'AWS::EC2::VPCGatewayAttachment' | 'AWS::Bedrock::Prompt' | 'AWS::Comprehend::Flywheel' | 'AWS::DataSync::Agent' | 'AWS::MediaTailor::LiveSource' | 'AWS::MSK::ServerlessCluster' | 'AWS::IoTSiteWise::Asset' | 'AWS::B2BI::Capability' | 'AWS::CloudFront::KeyValueStore' | 'AWS::Deadline::Monitor' | 'AWS::GuardDuty::MalwareProtectionPlan' | 'AWS::Location::APIKey' | 'AWS::MediaPackageV2::OriginEndpoint' | 'AWS::PCAConnectorAD::Connector' | 'AWS::S3Tables::TableBucketPolicy' | 'AWS::SecretsManager::ResourcePolicy' | 'AWS::SSMContacts::Contact' | 'AWS::IoT::ThingGroup' | 'AWS::ImageBuilder::LifecyclePolicy' | 'AWS::GameLift::Build' | 'AWS::ECR::ReplicationConfiguration' | 'AWS::EC2::SubnetCidrBlock' | 'AWS::Connect::SecurityProfile' | 'AWS::CleanRoomsML::TrainingDataset' | 'AWS::AppStream::AppBlockBuilder' | 'AWS::Route53::DNSSEC' | 'AWS::SageMaker::UserProfile' | 'AWS::ApiGateway::Method'[];
}

export interface BatchGetAggregateResourceConfigInput {
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
  /** A list of aggregate ResourceIdentifiers objects. */
  ResourceIdentifiers: AggregateResourceIdentifier[];
}

export interface BatchGetResourceConfigInput {
  /** A list of resource keys to be processed with the current request. Each element in the list consists of the resource type and resource ID. */
  resourceKeys: ResourceKey[];
}

export interface DeleteAggregationAuthorizationInput {
  /** The 12-digit account ID of the account authorized to aggregate data. */
  AuthorizedAccountId: string;
  /** The region authorized to collect aggregated data. */
  AuthorizedAwsRegion: string;
}

export interface DeleteConfigRuleInput {
  /** The name of the Config rule that you want to delete. */
  ConfigRuleName: string;
}

export interface DeleteConfigurationAggregatorInput {
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
}

/** The request object for the DeleteConfigurationRecorder operation. */
export interface DeleteConfigurationRecorderInput {
  /** The name of the customer managed configuration recorder that you want to delete. You can retrieve the name of your configuration recorders by using the DescribeConfigurationRecorders operation. */
  ConfigurationRecorderName: string;
}

export interface DeleteConformancePackInput {
  /** Name of the conformance pack you want to delete. */
  ConformancePackName: string;
}

/** The input for the DeleteDeliveryChannel action. The action accepts the following data, in JSON format. */
export interface DeleteDeliveryChannelInput {
  /** The name of the delivery channel that you want to delete. */
  DeliveryChannelName: string;
}

export interface DeleteEvaluationResultsInput {
  /** The name of the Config rule for which you want to delete the evaluation results. */
  ConfigRuleName: string;
}

export interface DeleteOrganizationConfigRuleInput {
  /** The name of organization Config rule that you want to delete. */
  OrganizationConfigRuleName: string;
}

export interface DeleteOrganizationConformancePackInput {
  /** The name of organization conformance pack that you want to delete. */
  OrganizationConformancePackName: string;
}

export interface DeletePendingAggregationRequestInput {
  /** The 12-digit account ID of the account requesting to aggregate data. */
  RequesterAccountId: string;
  /** The region requesting to aggregate data. */
  RequesterAwsRegion: string;
}

export interface DeleteRemediationConfigurationInput {
  /** The name of the Config rule for which you want to delete remediation configuration. */
  ConfigRuleName: string;
  /** The type of a resource. */
  ResourceType?: string;
}

export interface DeleteRemediationExceptionsInput {
  /** The name of the Config rule for which you want to delete remediation exception configuration. */
  ConfigRuleName: string;
  /** An exception list of resource exception keys to be processed with the current request. Config adds exception for each resource key. For example, Config adds 3 exceptions for 3 resource keys. */
  ResourceKeys: RemediationExceptionResourceKey[];
}

export interface DeleteResourceConfigInput {
  /** Unique identifier of the resource. */
  ResourceId: string;
  /** The type of the resource. */
  ResourceType: string;
}

export interface DeleteRetentionConfigurationInput {
  /** The name of the retention configuration to delete. */
  RetentionConfigurationName: string;
}

export interface DeleteServiceLinkedConfigurationRecorderInput {
  /** The service principal of the Amazon Web Services service for the service-linked configuration recorder that you want to delete. */
  ServicePrincipal: string;
}

export interface DeleteStoredQueryInput {
  /** The name of the query that you want to delete. */
  QueryName: string;
}

/** The input for the DeliverConfigSnapshot action. */
export interface DeliverConfigSnapshotInput {
  /** The name of the delivery channel through which the snapshot is delivered. */
  deliveryChannelName: string;
}

export interface DescribeAggregateComplianceByConfigRulesInput {
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
  /** Filters the results by ConfigRuleComplianceFilters object. */
  Filters?: ConfigRuleComplianceFilters;
  /** The maximum number of evaluation results returned on each page. The default is maximum. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface DescribeAggregateComplianceByConformancePacksInput {
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
  /** Filters the result by AggregateConformancePackComplianceFilters object. */
  Filters?: AggregateConformancePackComplianceFilters;
  /** The maximum number of conformance packs compliance details returned on each page. The default is maximum. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface DescribeAggregationAuthorizationsInput {
  /** The maximum number of AggregationAuthorizations returned on each page. The default is maximum. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface DescribeComplianceByConfigRuleInput {
  /** Filters the results by compliance. */
  ComplianceTypes?: 'COMPLIANT' | 'NON_COMPLIANT' | 'NOT_APPLICABLE' | 'INSUFFICIENT_DATA'[];
  /** Specify one or more Config rule names to filter the results by rule. */
  ConfigRuleNames?: string[];
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface DescribeComplianceByResourceInput {
  /** Filters the results by compliance. */
  ComplianceTypes?: 'COMPLIANT' | 'NON_COMPLIANT' | 'NOT_APPLICABLE' | 'INSUFFICIENT_DATA'[];
  /** The maximum number of evaluation results returned on each page. The default is 10. You cannot specify a number greater than 100. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
  /** The ID of the Amazon Web Services resource for which you want compliance information. You can specify only one resource ID. If you specify a resource ID, you must also specify a type for ResourceType. */
  ResourceId?: string;
  /** The types of Amazon Web Services resources for which you want compliance information (for example, AWS::EC2::Instance). For this operation, you can specify that the resource type is an Amazon Web Serv */
  ResourceType?: string;
}

export interface DescribeConfigRuleEvaluationStatusInput {
  /** The name of the Config managed rules for which you want status information. If you do not specify any names, Config returns status information for all Config managed rules that you use. */
  ConfigRuleNames?: string[];
  /** The number of rule evaluation results that you want returned. This parameter is required if the rule limit for your account is more than the default of 1000 rules. For information about requesting a r */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface DescribeConfigRulesInput {
  /** The names of the Config rules for which you want details. If you do not specify any names, Config returns details for all your rules. */
  ConfigRuleNames?: string[];
  /** Returns a list of Detective or Proactive Config rules. By default, this API returns an unfiltered list. For more information on Detective or Proactive Config rules, see Evaluation Mode in the Config D */
  Filters?: DescribeConfigRulesFilters;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface DescribeConfigurationAggregatorsInput {
  /** The name of the configuration aggregators. */
  ConfigurationAggregatorNames?: string[];
  /** The maximum number of configuration aggregators returned on each page. The default is maximum. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface DescribeConfigurationAggregatorSourcesStatusInput {
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
  /** The maximum number of AggregatorSourceStatus returned on each page. The default is maximum. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
  /** Filters the status type. Valid value FAILED indicates errors while moving data. Valid value SUCCEEDED indicates the data was successfully moved. Valid value OUTDATED indicates the data is not the most */
  UpdateStatus?: 'FAILED' | 'SUCCEEDED' | 'OUTDATED'[];
}

/** The input for the DescribeConfigurationRecorders action. */
export interface DescribeConfigurationRecordersInput {
  /** The Amazon Resource Name (ARN) of the configuration recorder that you want to specify. */
  Arn?: string;
  /** A list of names of the configuration recorders that you want to specify. When making a request to this operation, you can only specify one configuration recorder. */
  ConfigurationRecorderNames?: string[];
  /** For service-linked configuration recorders, you can use the service principal of the linked Amazon Web Services service to specify the configuration recorder. */
  ServicePrincipal?: string;
}

/** The input for the DescribeConfigurationRecorderStatus action. */
export interface DescribeConfigurationRecorderStatusInput {
  /** The Amazon Resource Name (ARN) of the configuration recorder that you want to specify. */
  Arn?: string;
  /** The name of the configuration recorder. If the name is not specified, the operation returns the status for the customer managed configuration recorder configured for the account, if applicable. When m */
  ConfigurationRecorderNames?: string[];
  /** For service-linked configuration recorders, you can use the service principal of the linked Amazon Web Services service to specify the configuration recorder. */
  ServicePrincipal?: string;
}

export interface DescribeConformancePackComplianceInput {
  /** Name of the conformance pack. */
  ConformancePackName: string;
  /** A ConformancePackComplianceFilters object. */
  Filters?: ConformancePackComplianceFilters;
  /** The maximum number of Config rules within a conformance pack are returned on each page. */
  Limit?: number;
  /** The nextToken string returned in a previous request that you use to request the next page of results in a paginated response. */
  NextToken?: string;
}

export interface DescribeConformancePacksInput {
  /** Comma-separated list of conformance pack names for which you want details. If you do not specify any names, Config returns details for all your conformance packs. */
  ConformancePackNames?: string[];
  /** The maximum number of conformance packs returned on each page. */
  Limit?: number;
  /** The nextToken string returned in a previous request that you use to request the next page of results in a paginated response. */
  NextToken?: string;
}

export interface DescribeConformancePackStatusInput {
  /** Comma-separated list of conformance pack names. */
  ConformancePackNames?: string[];
  /** The maximum number of conformance packs status returned on each page. */
  Limit?: number;
  /** The nextToken string returned in a previous request that you use to request the next page of results in a paginated response. */
  NextToken?: string;
}

/** The input for the DescribeDeliveryChannels action. */
export interface DescribeDeliveryChannelsInput {
  /** A list of delivery channel names. */
  DeliveryChannelNames?: string[];
}

/** The input for the DeliveryChannelStatus action. */
export interface DescribeDeliveryChannelStatusInput {
  /** A list of delivery channel names. */
  DeliveryChannelNames?: string[];
}

export interface DescribeOrganizationConfigRulesInput {
  /** The maximum number of organization Config rules returned on each page. If you do no specify a number, Config uses the default. The default is 100. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
  /** The names of organization Config rules for which you want details. If you do not specify any names, Config returns details for all your organization Config rules. */
  OrganizationConfigRuleNames?: string[];
}

export interface DescribeOrganizationConfigRuleStatusesInput {
  /** The maximum number of OrganizationConfigRuleStatuses returned on each page. If you do no specify a number, Config uses the default. The default is 100. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
  /** The names of organization Config rules for which you want status details. If you do not specify any names, Config returns details for all your organization Config rules. */
  OrganizationConfigRuleNames?: string[];
}

export interface DescribeOrganizationConformancePacksInput {
  /** The maximum number of organization config packs returned on each page. If you do no specify a number, Config uses the default. The default is 100. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
  /** The name that you assign to an organization conformance pack. */
  OrganizationConformancePackNames?: string[];
}

export interface DescribeOrganizationConformancePackStatusesInput {
  /** The maximum number of OrganizationConformancePackStatuses returned on each page. If you do no specify a number, Config uses the default. The default is 100. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
  /** The names of organization conformance packs for which you want status details. If you do not specify any names, Config returns details for all your organization conformance packs. */
  OrganizationConformancePackNames?: string[];
}

export interface DescribePendingAggregationRequestsInput {
  /** The maximum number of evaluation results returned on each page. The default is maximum. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface DescribeRemediationConfigurationsInput {
  /** A list of Config rule names of remediation configurations for which you want details. */
  ConfigRuleNames: string[];
}

export interface DescribeRemediationExceptionsInput {
  /** The name of the Config rule. */
  ConfigRuleName: string;
  /** The maximum number of RemediationExceptionResourceKey returned on each page. The default is 25. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned in a previous request that you use to request the next page of results in a paginated response. */
  NextToken?: string;
  /** An exception list of resource exception keys to be processed with the current request. Config adds exception for each resource key. For example, Config adds 3 exceptions for 3 resource keys. */
  ResourceKeys?: RemediationExceptionResourceKey[];
}

export interface DescribeRemediationExecutionStatusInput {
  /** The name of the Config rule. */
  ConfigRuleName: string;
  /** The maximum number of RemediationExecutionStatuses returned on each page. The default is maximum. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
  /** A list of resource keys to be processed with the current request. Each element in the list consists of the resource type and resource ID. */
  ResourceKeys?: ResourceKey[];
}

export interface DescribeRetentionConfigurationsInput {
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
  /** A list of names of retention configurations for which you want details. If you do not specify a name, Config returns details for all the retention configurations for that account. Currently, Config su */
  RetentionConfigurationNames?: string[];
}

export interface DisassociateResourceTypesInput {
  /** The Amazon Resource Name (ARN) of the specified configuration recorder. */
  ConfigurationRecorderArn: string;
  /** The list of resource types you want to remove from the recording group of the specified configuration recorder. */
  ResourceTypes: 'AWS::EC2::CustomerGateway' | 'AWS::EC2::EIP' | 'AWS::EC2::Host' | 'AWS::EC2::Instance' | 'AWS::EC2::InternetGateway' | 'AWS::EC2::NetworkAcl' | 'AWS::EC2::NetworkInterface' | 'AWS::EC2::RouteTable' | 'AWS::EC2::SecurityGroup' | 'AWS::EC2::Subnet' | 'AWS::CloudTrail::Trail' | 'AWS::EC2::Volume' | 'AWS::EC2::VPC' | 'AWS::EC2::VPNConnection' | 'AWS::EC2::VPNGateway' | 'AWS::EC2::RegisteredHAInstance' | 'AWS::EC2::NatGateway' | 'AWS::EC2::EgressOnlyInternetGateway' | 'AWS::EC2::VPCEndpoint' | 'AWS::EC2::VPCEndpointService' | 'AWS::EC2::FlowLog' | 'AWS::EC2::VPCPeeringConnection' | 'AWS::Elasticsearch::Domain' | 'AWS::IAM::Group' | 'AWS::IAM::Policy' | 'AWS::IAM::Role' | 'AWS::IAM::User' | 'AWS::ElasticLoadBalancingV2::LoadBalancer' | 'AWS::ACM::Certificate' | 'AWS::RDS::DBInstance' | 'AWS::RDS::DBSubnetGroup' | 'AWS::RDS::DBSecurityGroup' | 'AWS::RDS::DBSnapshot' | 'AWS::RDS::DBCluster' | 'AWS::RDS::DBClusterSnapshot' | 'AWS::RDS::EventSubscription' | 'AWS::S3::Bucket' | 'AWS::S3::AccountPublicAccessBlock' | 'AWS::Redshift::Cluster' | 'AWS::Redshift::ClusterSnapshot' | 'AWS::Redshift::ClusterParameterGroup' | 'AWS::Redshift::ClusterSecurityGroup' | 'AWS::Redshift::ClusterSubnetGroup' | 'AWS::Redshift::EventSubscription' | 'AWS::SSM::ManagedInstanceInventory' | 'AWS::CloudWatch::Alarm' | 'AWS::CloudFormation::Stack' | 'AWS::ElasticLoadBalancing::LoadBalancer' | 'AWS::AutoScaling::AutoScalingGroup' | 'AWS::AutoScaling::LaunchConfiguration' | 'AWS::AutoScaling::ScalingPolicy' | 'AWS::AutoScaling::ScheduledAction' | 'AWS::DynamoDB::Table' | 'AWS::CodeBuild::Project' | 'AWS::WAF::RateBasedRule' | 'AWS::WAF::Rule' | 'AWS::WAF::RuleGroup' | 'AWS::WAF::WebACL' | 'AWS::WAFRegional::RateBasedRule' | 'AWS::WAFRegional::Rule' | 'AWS::WAFRegional::RuleGroup' | 'AWS::WAFRegional::WebACL' | 'AWS::CloudFront::Distribution' | 'AWS::CloudFront::StreamingDistribution' | 'AWS::Lambda::Function' | 'AWS::NetworkFirewall::Firewall' | 'AWS::NetworkFirewall::FirewallPolicy' | 'AWS::NetworkFirewall::RuleGroup' | 'AWS::ElasticBeanstalk::Application' | 'AWS::ElasticBeanstalk::ApplicationVersion' | 'AWS::ElasticBeanstalk::Environment' | 'AWS::WAFv2::WebACL' | 'AWS::WAFv2::RuleGroup' | 'AWS::WAFv2::IPSet' | 'AWS::WAFv2::RegexPatternSet' | 'AWS::WAFv2::ManagedRuleSet' | 'AWS::XRay::EncryptionConfig' | 'AWS::SSM::AssociationCompliance' | 'AWS::SSM::PatchCompliance' | 'AWS::Shield::Protection' | 'AWS::ShieldRegional::Protection' | 'AWS::Config::ConformancePackCompliance' | 'AWS::Config::ResourceCompliance' | 'AWS::ApiGateway::Stage' | 'AWS::ApiGateway::RestApi' | 'AWS::ApiGatewayV2::Stage' | 'AWS::ApiGatewayV2::Api' | 'AWS::CodePipeline::Pipeline' | 'AWS::ServiceCatalog::CloudFormationProvisionedProduct' | 'AWS::ServiceCatalog::CloudFormationProduct' | 'AWS::ServiceCatalog::Portfolio' | 'AWS::SQS::Queue' | 'AWS::KMS::Key' | 'AWS::QLDB::Ledger' | 'AWS::SecretsManager::Secret' | 'AWS::SNS::Topic' | 'AWS::SSM::FileData' | 'AWS::Backup::BackupPlan' | 'AWS::Backup::BackupSelection' | 'AWS::Backup::BackupVault' | 'AWS::Backup::RecoveryPoint' | 'AWS::ECR::Repository' | 'AWS::ECS::Cluster' | 'AWS::ECS::Service' | 'AWS::ECS::TaskDefinition' | 'AWS::EFS::AccessPoint' | 'AWS::EFS::FileSystem' | 'AWS::EKS::Cluster' | 'AWS::OpenSearch::Domain' | 'AWS::EC2::TransitGateway' | 'AWS::Kinesis::Stream' | 'AWS::Kinesis::StreamConsumer' | 'AWS::CodeDeploy::Application' | 'AWS::CodeDeploy::DeploymentConfig' | 'AWS::CodeDeploy::DeploymentGroup' | 'AWS::EC2::LaunchTemplate' | 'AWS::ECR::PublicRepository' | 'AWS::GuardDuty::Detector' | 'AWS::EMR::SecurityConfiguration' | 'AWS::SageMaker::CodeRepository' | 'AWS::Route53Resolver::ResolverEndpoint' | 'AWS::Route53Resolver::ResolverRule' | 'AWS::Route53Resolver::ResolverRuleAssociation' | 'AWS::DMS::ReplicationSubnetGroup' | 'AWS::DMS::EventSubscription' | 'AWS::MSK::Cluster' | 'AWS::StepFunctions::Activity' | 'AWS::WorkSpaces::Workspace' | 'AWS::WorkSpaces::ConnectionAlias' | 'AWS::SageMaker::Model' | 'AWS::ElasticLoadBalancingV2::Listener' | 'AWS::StepFunctions::StateMachine' | 'AWS::Batch::JobQueue' | 'AWS::Batch::ComputeEnvironment' | 'AWS::AccessAnalyzer::Analyzer' | 'AWS::Athena::WorkGroup' | 'AWS::Athena::DataCatalog' | 'AWS::Detective::Graph' | 'AWS::GlobalAccelerator::Accelerator' | 'AWS::GlobalAccelerator::EndpointGroup' | 'AWS::GlobalAccelerator::Listener' | 'AWS::EC2::TransitGatewayAttachment' | 'AWS::EC2::TransitGatewayRouteTable' | 'AWS::DMS::Certificate' | 'AWS::AppConfig::Application' | 'AWS::AppSync::GraphQLApi' | 'AWS::DataSync::LocationSMB' | 'AWS::DataSync::LocationFSxLustre' | 'AWS::DataSync::LocationS3' | 'AWS::DataSync::LocationEFS' | 'AWS::DataSync::Task' | 'AWS::DataSync::LocationNFS' | 'AWS::EC2::NetworkInsightsAccessScopeAnalysis' | 'AWS::EKS::FargateProfile' | 'AWS::Glue::Job' | 'AWS::GuardDuty::ThreatIntelSet' | 'AWS::GuardDuty::IPSet' | 'AWS::SageMaker::Workteam' | 'AWS::SageMaker::NotebookInstanceLifecycleConfig' | 'AWS::ServiceDiscovery::Service' | 'AWS::ServiceDiscovery::PublicDnsNamespace' | 'AWS::SES::ContactList' | 'AWS::SES::ConfigurationSet' | 'AWS::Route53::HostedZone' | 'AWS::IoTEvents::Input' | 'AWS::IoTEvents::DetectorModel' | 'AWS::IoTEvents::AlarmModel' | 'AWS::ServiceDiscovery::HttpNamespace' | 'AWS::Events::EventBus' | 'AWS::ImageBuilder::ContainerRecipe' | 'AWS::ImageBuilder::DistributionConfiguration' | 'AWS::ImageBuilder::InfrastructureConfiguration' | 'AWS::DataSync::LocationObjectStorage' | 'AWS::DataSync::LocationHDFS' | 'AWS::Glue::Classifier' | 'AWS::Route53RecoveryReadiness::Cell' | 'AWS::Route53RecoveryReadiness::ReadinessCheck' | 'AWS::ECR::RegistryPolicy' | 'AWS::Backup::ReportPlan' | 'AWS::Lightsail::Certificate' | 'AWS::RUM::AppMonitor' | 'AWS::Events::Endpoint' | 'AWS::SES::ReceiptRuleSet' | 'AWS::Events::Archive' | 'AWS::Events::ApiDestination' | 'AWS::Lightsail::Disk' | 'AWS::FIS::ExperimentTemplate' | 'AWS::DataSync::LocationFSxWindows' | 'AWS::SES::ReceiptFilter' | 'AWS::GuardDuty::Filter' | 'AWS::SES::Template' | 'AWS::AmazonMQ::Broker' | 'AWS::AppConfig::Environment' | 'AWS::AppConfig::ConfigurationProfile' | 'AWS::Cloud9::EnvironmentEC2' | 'AWS::EventSchemas::Registry' | 'AWS::EventSchemas::RegistryPolicy' | 'AWS::EventSchemas::Discoverer' | 'AWS::FraudDetector::Label' | 'AWS::FraudDetector::EntityType' | 'AWS::FraudDetector::Variable' | 'AWS::FraudDetector::Outcome' | 'AWS::IoT::Authorizer' | 'AWS::IoT::SecurityProfile' | 'AWS::IoT::RoleAlias' | 'AWS::IoT::Dimension' | 'AWS::IoTAnalytics::Datastore' | 'AWS::Lightsail::Bucket' | 'AWS::Lightsail::StaticIp' | 'AWS::MediaPackage::PackagingGroup' | 'AWS::Route53RecoveryReadiness::RecoveryGroup' | 'AWS::ResilienceHub::ResiliencyPolicy' | 'AWS::Transfer::Workflow' | 'AWS::EKS::IdentityProviderConfig' | 'AWS::EKS::Addon' | 'AWS::Glue::MLTransform' | 'AWS::IoT::Policy' | 'AWS::IoT::MitigationAction' | 'AWS::IoTTwinMaker::Workspace' | 'AWS::IoTTwinMaker::Entity' | 'AWS::IoTAnalytics::Dataset' | 'AWS::IoTAnalytics::Pipeline' | 'AWS::IoTAnalytics::Channel' | 'AWS::IoTSiteWise::Dashboard' | 'AWS::IoTSiteWise::Project' | 'AWS::IoTSiteWise::Portal' | 'AWS::IoTSiteWise::AssetModel' | 'AWS::IVS::Channel' | 'AWS::IVS::RecordingConfiguration' | 'AWS::IVS::PlaybackKeyPair' | 'AWS::KinesisAnalyticsV2::Application' | 'AWS::RDS::GlobalCluster' | 'AWS::S3::MultiRegionAccessPoint' | 'AWS::DeviceFarm::TestGridProject' | 'AWS::Budgets::BudgetsAction' | 'AWS::Lex::Bot' | 'AWS::CodeGuruReviewer::RepositoryAssociation' | 'AWS::IoT::CustomMetric' | 'AWS::Route53Resolver::FirewallDomainList' | 'AWS::RoboMaker::RobotApplicationVersion' | 'AWS::EC2::TrafficMirrorSession' | 'AWS::IoTSiteWise::Gateway' | 'AWS::Lex::BotAlias' | 'AWS::LookoutMetrics::Alert' | 'AWS::IoT::AccountAuditConfiguration' | 'AWS::EC2::TrafficMirrorTarget' | 'AWS::S3::StorageLens' | 'AWS::IoT::ScheduledAudit' | 'AWS::Events::Connection' | 'AWS::EventSchemas::Schema' | 'AWS::MediaPackage::PackagingConfiguration' | 'AWS::KinesisVideo::SignalingChannel' | 'AWS::AppStream::DirectoryConfig' | 'AWS::LookoutVision::Project' | 'AWS::Route53RecoveryControl::Cluster' | 'AWS::Route53RecoveryControl::SafetyRule' | 'AWS::Route53RecoveryControl::ControlPanel' | 'AWS::Route53RecoveryControl::RoutingControl' | 'AWS::Route53RecoveryReadiness::ResourceSet' | 'AWS::RoboMaker::SimulationApplication' | 'AWS::RoboMaker::RobotApplication' | 'AWS::HealthLake::FHIRDatastore' | 'AWS::Pinpoint::Segment' | 'AWS::Pinpoint::ApplicationSettings' | 'AWS::Events::Rule' | 'AWS::EC2::DHCPOptions' | 'AWS::EC2::NetworkInsightsPath' | 'AWS::EC2::TrafficMirrorFilter' | 'AWS::EC2::IPAM' | 'AWS::IoTTwinMaker::Scene' | 'AWS::NetworkManager::TransitGatewayRegistration' | 'AWS::CustomerProfiles::Domain' | 'AWS::AutoScaling::WarmPool' | 'AWS::Connect::PhoneNumber' | 'AWS::AppConfig::DeploymentStrategy' | 'AWS::AppFlow::Flow' | 'AWS::AuditManager::Assessment' | 'AWS::CloudWatch::MetricStream' | 'AWS::DeviceFarm::InstanceProfile' | 'AWS::DeviceFarm::Project' | 'AWS::EC2::EC2Fleet' | 'AWS::EC2::SubnetRouteTableAssociation' | 'AWS::ECR::PullThroughCacheRule' | 'AWS::GroundStation::Config' | 'AWS::ImageBuilder::ImagePipeline' | 'AWS::IoT::FleetMetric' | 'AWS::IoTWireless::ServiceProfile' | 'AWS::NetworkManager::Device' | 'AWS::NetworkManager::GlobalNetwork' | 'AWS::NetworkManager::Link' | 'AWS::NetworkManager::Site' | 'AWS::Panorama::Package' | 'AWS::Pinpoint::App' | 'AWS::Redshift::ScheduledAction' | 'AWS::Route53Resolver::FirewallRuleGroupAssociation' | 'AWS::SageMaker::AppImageConfig' | 'AWS::SageMaker::Image' | 'AWS::ECS::TaskSet' | 'AWS::Cassandra::Keyspace' | 'AWS::Signer::SigningProfile' | 'AWS::Amplify::App' | 'AWS::AppMesh::VirtualNode' | 'AWS::AppMesh::VirtualService' | 'AWS::AppRunner::VpcConnector' | 'AWS::AppStream::Application' | 'AWS::CodeArtifact::Repository' | 'AWS::EC2::PrefixList' | 'AWS::EC2::SpotFleet' | 'AWS::Evidently::Project' | 'AWS::Forecast::Dataset' | 'AWS::IAM::SAMLProvider' | 'AWS::IAM::ServerCertificate' | 'AWS::Pinpoint::Campaign' | 'AWS::Pinpoint::InAppTemplate' | 'AWS::SageMaker::Domain' | 'AWS::Transfer::Agreement' | 'AWS::Transfer::Connector' | 'AWS::KinesisFirehose::DeliveryStream' | 'AWS::Amplify::Branch' | 'AWS::AppIntegrations::EventIntegration' | 'AWS::AppMesh::Route' | 'AWS::Athena::PreparedStatement' | 'AWS::EC2::IPAMScope' | 'AWS::Evidently::Launch' | 'AWS::Forecast::DatasetGroup' | 'AWS::GreengrassV2::ComponentVersion' | 'AWS::GroundStation::MissionProfile' | 'AWS::MediaConnect::FlowEntitlement' | 'AWS::MediaConnect::FlowVpcInterface' | 'AWS::MediaTailor::PlaybackConfiguration' | 'AWS::MSK::Configuration' | 'AWS::Personalize::Dataset' | 'AWS::Personalize::Schema' | 'AWS::Personalize::Solution' | 'AWS::Pinpoint::EmailTemplate' | 'AWS::Pinpoint::EventStream' | 'AWS::ResilienceHub::App' | 'AWS::ACMPCA::CertificateAuthority' | 'AWS::AppConfig::HostedConfigurationVersion' | 'AWS::AppMesh::VirtualGateway' | 'AWS::AppMesh::VirtualRouter' | 'AWS::AppRunner::Service' | 'AWS::CustomerProfiles::ObjectType' | 'AWS::DMS::Endpoint' | 'AWS::EC2::CapacityReservation' | 'AWS::EC2::ClientVpnEndpoint' | 'AWS::Kendra::Index' | 'AWS::KinesisVideo::Stream' | 'AWS::Logs::Destination' | 'AWS::Pinpoint::EmailChannel' | 'AWS::S3::AccessPoint' | 'AWS::NetworkManager::CustomerGatewayAssociation' | 'AWS::NetworkManager::LinkAssociation' | 'AWS::IoTWireless::MulticastGroup' | 'AWS::Personalize::DatasetGroup' | 'AWS::IoTTwinMaker::ComponentType' | 'AWS::CodeBuild::ReportGroup' | 'AWS::SageMaker::FeatureGroup' | 'AWS::MSK::BatchScramSecret' | 'AWS::AppStream::Stack' | 'AWS::IoT::JobTemplate' | 'AWS::IoTWireless::FuotaTask' | 'AWS::IoT::ProvisioningTemplate' | 'AWS::InspectorV2::Filter' | 'AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation' | 'AWS::ServiceDiscovery::Instance' | 'AWS::Transfer::Certificate' | 'AWS::MediaConnect::FlowSource' | 'AWS::APS::RuleGroupsNamespace' | 'AWS::CodeGuruProfiler::ProfilingGroup' | 'AWS::Route53Resolver::ResolverQueryLoggingConfig' | 'AWS::Batch::SchedulingPolicy' | 'AWS::ACMPCA::CertificateAuthorityActivation' | 'AWS::AppMesh::GatewayRoute' | 'AWS::AppMesh::Mesh' | 'AWS::Connect::Instance' | 'AWS::Connect::QuickConnect' | 'AWS::EC2::CarrierGateway' | 'AWS::EC2::IPAMPool' | 'AWS::EC2::TransitGatewayConnect' | 'AWS::EC2::TransitGatewayMulticastDomain' | 'AWS::ECS::CapacityProvider' | 'AWS::IAM::InstanceProfile' | 'AWS::IoT::CACertificate' | 'AWS::IoTTwinMaker::SyncJob' | 'AWS::KafkaConnect::Connector' | 'AWS::Lambda::CodeSigningConfig' | 'AWS::NetworkManager::ConnectPeer' | 'AWS::ResourceExplorer2::Index' | 'AWS::AppStream::Fleet' | 'AWS::Cognito::UserPool' | 'AWS::Cognito::UserPoolClient' | 'AWS::Cognito::UserPoolGroup' | 'AWS::EC2::NetworkInsightsAccessScope' | 'AWS::EC2::NetworkInsightsAnalysis' | 'AWS::Grafana::Workspace' | 'AWS::GroundStation::DataflowEndpointGroup' | 'AWS::ImageBuilder::ImageRecipe' | 'AWS::KMS::Alias' | 'AWS::M2::Environment' | 'AWS::QuickSight::DataSource' | 'AWS::QuickSight::Template' | 'AWS::QuickSight::Theme' | 'AWS::RDS::OptionGroup' | 'AWS::Redshift::EndpointAccess' | 'AWS::Route53Resolver::FirewallRuleGroup' | 'AWS::SSM::Document' | 'AWS::AppConfig::ExtensionAssociation' | 'AWS::AppIntegrations::Application' | 'AWS::AppSync::ApiCache' | 'AWS::Bedrock::Guardrail' | 'AWS::Bedrock::KnowledgeBase' | 'AWS::Cognito::IdentityPool' | 'AWS::Connect::Rule' | 'AWS::Connect::User' | 'AWS::EC2::ClientVpnTargetNetworkAssociation' | 'AWS::EC2::EIPAssociation' | 'AWS::EC2::IPAMResourceDiscovery' | 'AWS::EC2::IPAMResourceDiscoveryAssociation' | 'AWS::EC2::InstanceConnectEndpoint' | 'AWS::EC2::SnapshotBlockPublicAccess' | 'AWS::EC2::VPCBlockPublicAccessExclusion' | 'AWS::EC2::VPCBlockPublicAccessOptions' | 'AWS::EC2::VPCEndpointConnectionNotification' | 'AWS::EC2::VPNConnectionRoute' | 'AWS::Evidently::Segment' | 'AWS::IAM::OIDCProvider' | 'AWS::InspectorV2::Activation' | 'AWS::MSK::ClusterPolicy' | 'AWS::MSK::VpcConnection' | 'AWS::MediaConnect::Gateway' | 'AWS::MemoryDB::SubnetGroup' | 'AWS::OpenSearchServerless::Collection' | 'AWS::OpenSearchServerless::VpcEndpoint' | 'AWS::Redshift::EndpointAuthorization' | 'AWS::Route53Profiles::Profile' | 'AWS::S3::StorageLensGroup' | 'AWS::S3Express::BucketPolicy' | 'AWS::S3Express::DirectoryBucket' | 'AWS::SageMaker::InferenceExperiment' | 'AWS::SecurityHub::Standard' | 'AWS::Transfer::Profile' | 'AWS::CloudFormation::StackSet' | 'AWS::MediaPackageV2::Channel' | 'AWS::S3::AccessGrantsLocation' | 'AWS::S3::AccessGrant' | 'AWS::S3::AccessGrantsInstance' | 'AWS::EMRServerless::Application' | 'AWS::Config::AggregationAuthorization' | 'AWS::Bedrock::ApplicationInferenceProfile' | 'AWS::ApiGatewayV2::Integration' | 'AWS::SageMaker::MlflowTrackingServer' | 'AWS::SageMaker::ModelBiasJobDefinition' | 'AWS::SecretsManager::RotationSchedule' | 'AWS::Deadline::QueueFleetAssociation' | 'AWS::ECR::RepositoryCreationTemplate' | 'AWS::CloudFormation::LambdaHook' | 'AWS::EC2::SubnetNetworkAclAssociation' | 'AWS::ApiGateway::UsagePlan' | 'AWS::AppConfig::Extension' | 'AWS::Deadline::Fleet' | 'AWS::EMR::Studio' | 'AWS::S3Tables::TableBucket' | 'AWS::CloudFront::RealtimeLogConfig' | 'AWS::BackupGateway::Hypervisor' | 'AWS::BCMDataExports::Export' | 'AWS::CloudFormation::GuardHook' | 'AWS::CloudFront::PublicKey' | 'AWS::CloudTrail::EventDataStore' | 'AWS::EntityResolution::IdMappingWorkflow' | 'AWS::EntityResolution::SchemaMapping' | 'AWS::IoT::DomainConfiguration' | 'AWS::PCAConnectorAD::DirectoryRegistration' | 'AWS::RDS::Integration' | 'AWS::Config::ConformancePack' | 'AWS::RolesAnywhere::Profile' | 'AWS::CodeArtifact::Domain' | 'AWS::Backup::RestoreTestingPlan' | 'AWS::Config::StoredQuery' | 'AWS::SageMaker::DataQualityJobDefinition' | 'AWS::SageMaker::ModelExplainabilityJobDefinition' | 'AWS::SageMaker::ModelQualityJobDefinition' | 'AWS::SageMaker::StudioLifecycleConfig' | 'AWS::SES::DedicatedIpPool' | 'AWS::SES::MailManagerTrafficPolicy' | 'AWS::SSM::ResourceDataSync' | 'AWS::BedrockAgentCore::Runtime' | 'AWS::BedrockAgentCore::BrowserCustom' | 'AWS::ElasticLoadBalancingV2::TargetGroup' | 'AWS::EMRContainers::VirtualCluster' | 'AWS::EntityResolution::MatchingWorkflow' | 'AWS::IoTCoreDeviceAdvisor::SuiteDefinition' | 'AWS::EC2::SecurityGroupVpcAssociation' | 'AWS::EC2::VerifiedAccessInstance' | 'AWS::KafkaConnect::CustomPlugin' | 'AWS::NetworkManager::TransitGatewayPeering' | 'AWS::OpenSearchServerless::SecurityConfig' | 'AWS::Redshift::Integration' | 'AWS::RolesAnywhere::TrustAnchor' | 'AWS::Route53Profiles::ProfileAssociation' | 'AWS::SSMIncidents::ResponsePlan' | 'AWS::Transfer::Server' | 'AWS::Glue::Database' | 'AWS::Organizations::OrganizationalUnit' | 'AWS::EC2::IPAMPoolCidr' | 'AWS::EC2::VPCGatewayAttachment' | 'AWS::Bedrock::Prompt' | 'AWS::Comprehend::Flywheel' | 'AWS::DataSync::Agent' | 'AWS::MediaTailor::LiveSource' | 'AWS::MSK::ServerlessCluster' | 'AWS::IoTSiteWise::Asset' | 'AWS::B2BI::Capability' | 'AWS::CloudFront::KeyValueStore' | 'AWS::Deadline::Monitor' | 'AWS::GuardDuty::MalwareProtectionPlan' | 'AWS::Location::APIKey' | 'AWS::MediaPackageV2::OriginEndpoint' | 'AWS::PCAConnectorAD::Connector' | 'AWS::S3Tables::TableBucketPolicy' | 'AWS::SecretsManager::ResourcePolicy' | 'AWS::SSMContacts::Contact' | 'AWS::IoT::ThingGroup' | 'AWS::ImageBuilder::LifecyclePolicy' | 'AWS::GameLift::Build' | 'AWS::ECR::ReplicationConfiguration' | 'AWS::EC2::SubnetCidrBlock' | 'AWS::Connect::SecurityProfile' | 'AWS::CleanRoomsML::TrainingDataset' | 'AWS::AppStream::AppBlockBuilder' | 'AWS::Route53::DNSSEC' | 'AWS::SageMaker::UserProfile' | 'AWS::ApiGateway::Method'[];
}

export interface GetAggregateComplianceDetailsByConfigRuleInput {
  /** The 12-digit account ID of the source account. */
  AccountId: string;
  /** The source region from where the data is aggregated. */
  AwsRegion: string;
  /** The name of the Config rule for which you want compliance information. */
  ConfigRuleName: string;
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
  /** The resource compliance status. For the GetAggregateComplianceDetailsByConfigRuleRequest data type, Config supports only the COMPLIANT and NON_COMPLIANT. Config does not support the NOT_APPLICABLE and */
  ComplianceType?: 'COMPLIANT' | 'NON_COMPLIANT' | 'NOT_APPLICABLE' | 'INSUFFICIENT_DATA';
  /** The maximum number of evaluation results returned on each page. The default is 50. You cannot specify a number greater than 100. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface GetAggregateConfigRuleComplianceSummaryInput {
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
  /** Filters the results based on the ConfigRuleComplianceSummaryFilters object. */
  Filters?: ConfigRuleComplianceSummaryFilters;
  /** Groups the result based on ACCOUNT_ID or AWS_REGION. */
  GroupByKey?: 'ACCOUNT_ID' | 'AWS_REGION';
  /** The maximum number of evaluation results returned on each page. The default is 1000. You cannot specify a number greater than 1000. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface GetAggregateConformancePackComplianceSummaryInput {
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
  /** Filters the results based on the AggregateConformancePackComplianceSummaryFilters object. */
  Filters?: AggregateConformancePackComplianceSummaryFilters;
  /** Groups the result based on Amazon Web Services account ID or Amazon Web Services Region. */
  GroupByKey?: 'ACCOUNT_ID' | 'AWS_REGION';
  /** The maximum number of results returned on each page. The default is maximum. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface GetAggregateDiscoveredResourceCountsInput {
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
  /** Filters the results based on the ResourceCountFilters object. */
  Filters?: ResourceCountFilters;
  /** The key to group the resource counts. */
  GroupByKey?: 'RESOURCE_TYPE' | 'ACCOUNT_ID' | 'AWS_REGION';
  /** The maximum number of GroupedResourceCount objects returned on each page. The default is 1000. You cannot specify a number greater than 1000. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface GetAggregateResourceConfigInput {
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
  /** An object that identifies aggregate resource. */
  ResourceIdentifier: AggregateResourceIdentifier;
}

export interface GetComplianceDetailsByConfigRuleInput {
  /** The name of the Config rule for which you want compliance information. */
  ConfigRuleName: string;
  /** Filters the results by compliance. INSUFFICIENT_DATA is a valid ComplianceType that is returned when an Config rule cannot be evaluated. However, INSUFFICIENT_DATA cannot be used as a ComplianceType f */
  ComplianceTypes?: 'COMPLIANT' | 'NON_COMPLIANT' | 'NOT_APPLICABLE' | 'INSUFFICIENT_DATA'[];
  /** The maximum number of evaluation results returned on each page. The default is 10. You cannot specify a number greater than 100. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface GetComplianceDetailsByResourceInput {
  /** Filters the results by compliance. INSUFFICIENT_DATA is a valid ComplianceType that is returned when an Config rule cannot be evaluated. However, INSUFFICIENT_DATA cannot be used as a ComplianceType f */
  ComplianceTypes?: 'COMPLIANT' | 'NON_COMPLIANT' | 'NOT_APPLICABLE' | 'INSUFFICIENT_DATA'[];
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
  /** The unique ID of Amazon Web Services resource execution for which you want to retrieve evaluation results. You need to only provide either a ResourceEvaluationID or a ResourceID and ResourceType. */
  ResourceEvaluationId?: string;
  /** The ID of the Amazon Web Services resource for which you want compliance information. */
  ResourceId?: string;
  /** The type of the Amazon Web Services resource for which you want compliance information. */
  ResourceType?: string;
}

export interface GetComplianceSummaryByResourceTypeInput {
  /** Specify one or more resource types to get the number of resources that are compliant and the number that are noncompliant for each resource type. For this request, you can specify an Amazon Web Servic */
  ResourceTypes?: string[];
}

export interface GetConformancePackComplianceDetailsInput {
  /** Name of the conformance pack. */
  ConformancePackName: string;
  /** A ConformancePackEvaluationFilters object. */
  Filters?: ConformancePackEvaluationFilters;
  /** The maximum number of evaluation results returned on each page. If you do no specify a number, Config uses the default. The default is 100. */
  Limit?: number;
  /** The nextToken string returned in a previous request that you use to request the next page of results in a paginated response. */
  NextToken?: string;
}

export interface GetConformancePackComplianceSummaryInput {
  /** Names of conformance packs. */
  ConformancePackNames: string[];
  /** The maximum number of conformance packs returned on each page. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface GetCustomRulePolicyInput {
  /** The name of your Config Custom Policy rule. */
  ConfigRuleName?: string;
}

export interface GetDiscoveredResourceCountsInput {
  /** The maximum number of ResourceCount objects returned on each page. The default is 100. You cannot specify a number greater than 100. If you specify 0, Config uses the default. */
  limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  nextToken?: string;
  /** The comma-separated list that specifies the resource types that you want Config to return (for example, "AWS::EC2::Instance", "AWS::IAM::User"). If a value for resourceTypes is not specified, Config r */
  resourceTypes?: string[];
}

export interface GetOrganizationConfigRuleDetailedStatusInput {
  /** The name of your organization Config rule for which you want status details for member accounts. */
  OrganizationConfigRuleName: string;
  /** A StatusDetailFilters object. */
  Filters?: StatusDetailFilters;
  /** The maximum number of OrganizationConfigRuleDetailedStatus returned on each page. If you do not specify a number, Config uses the default. The default is 100. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface GetOrganizationConformancePackDetailedStatusInput {
  /** The name of organization conformance pack for which you want status details for member accounts. */
  OrganizationConformancePackName: string;
  /** An OrganizationResourceDetailedStatusFilters object. */
  Filters?: OrganizationResourceDetailedStatusFilters;
  /** The maximum number of OrganizationConformancePackDetailedStatuses returned on each page. If you do not specify a number, Config uses the default. The default is 100. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface GetOrganizationCustomRulePolicyInput {
  /** The name of your organization Config Custom Policy rule. */
  OrganizationConfigRuleName: string;
}

/** The input for the GetResourceConfigHistory action. */
export interface GetResourceConfigHistoryInput {
  /** The ID of the resource (for example., sg-xxxxxx). */
  resourceId: string;
  /** The resource type. */
  resourceType: 'AWS::EC2::CustomerGateway' | 'AWS::EC2::EIP' | 'AWS::EC2::Host' | 'AWS::EC2::Instance' | 'AWS::EC2::InternetGateway' | 'AWS::EC2::NetworkAcl' | 'AWS::EC2::NetworkInterface' | 'AWS::EC2::RouteTable' | 'AWS::EC2::SecurityGroup' | 'AWS::EC2::Subnet' | 'AWS::CloudTrail::Trail' | 'AWS::EC2::Volume' | 'AWS::EC2::VPC' | 'AWS::EC2::VPNConnection' | 'AWS::EC2::VPNGateway' | 'AWS::EC2::RegisteredHAInstance' | 'AWS::EC2::NatGateway' | 'AWS::EC2::EgressOnlyInternetGateway' | 'AWS::EC2::VPCEndpoint' | 'AWS::EC2::VPCEndpointService' | 'AWS::EC2::FlowLog' | 'AWS::EC2::VPCPeeringConnection' | 'AWS::Elasticsearch::Domain' | 'AWS::IAM::Group' | 'AWS::IAM::Policy' | 'AWS::IAM::Role' | 'AWS::IAM::User' | 'AWS::ElasticLoadBalancingV2::LoadBalancer' | 'AWS::ACM::Certificate' | 'AWS::RDS::DBInstance' | 'AWS::RDS::DBSubnetGroup' | 'AWS::RDS::DBSecurityGroup' | 'AWS::RDS::DBSnapshot' | 'AWS::RDS::DBCluster' | 'AWS::RDS::DBClusterSnapshot' | 'AWS::RDS::EventSubscription' | 'AWS::S3::Bucket' | 'AWS::S3::AccountPublicAccessBlock' | 'AWS::Redshift::Cluster' | 'AWS::Redshift::ClusterSnapshot' | 'AWS::Redshift::ClusterParameterGroup' | 'AWS::Redshift::ClusterSecurityGroup' | 'AWS::Redshift::ClusterSubnetGroup' | 'AWS::Redshift::EventSubscription' | 'AWS::SSM::ManagedInstanceInventory' | 'AWS::CloudWatch::Alarm' | 'AWS::CloudFormation::Stack' | 'AWS::ElasticLoadBalancing::LoadBalancer' | 'AWS::AutoScaling::AutoScalingGroup' | 'AWS::AutoScaling::LaunchConfiguration' | 'AWS::AutoScaling::ScalingPolicy' | 'AWS::AutoScaling::ScheduledAction' | 'AWS::DynamoDB::Table' | 'AWS::CodeBuild::Project' | 'AWS::WAF::RateBasedRule' | 'AWS::WAF::Rule' | 'AWS::WAF::RuleGroup' | 'AWS::WAF::WebACL' | 'AWS::WAFRegional::RateBasedRule' | 'AWS::WAFRegional::Rule' | 'AWS::WAFRegional::RuleGroup' | 'AWS::WAFRegional::WebACL' | 'AWS::CloudFront::Distribution' | 'AWS::CloudFront::StreamingDistribution' | 'AWS::Lambda::Function' | 'AWS::NetworkFirewall::Firewall' | 'AWS::NetworkFirewall::FirewallPolicy' | 'AWS::NetworkFirewall::RuleGroup' | 'AWS::ElasticBeanstalk::Application' | 'AWS::ElasticBeanstalk::ApplicationVersion' | 'AWS::ElasticBeanstalk::Environment' | 'AWS::WAFv2::WebACL' | 'AWS::WAFv2::RuleGroup' | 'AWS::WAFv2::IPSet' | 'AWS::WAFv2::RegexPatternSet' | 'AWS::WAFv2::ManagedRuleSet' | 'AWS::XRay::EncryptionConfig' | 'AWS::SSM::AssociationCompliance' | 'AWS::SSM::PatchCompliance' | 'AWS::Shield::Protection' | 'AWS::ShieldRegional::Protection' | 'AWS::Config::ConformancePackCompliance' | 'AWS::Config::ResourceCompliance' | 'AWS::ApiGateway::Stage' | 'AWS::ApiGateway::RestApi' | 'AWS::ApiGatewayV2::Stage' | 'AWS::ApiGatewayV2::Api' | 'AWS::CodePipeline::Pipeline' | 'AWS::ServiceCatalog::CloudFormationProvisionedProduct' | 'AWS::ServiceCatalog::CloudFormationProduct' | 'AWS::ServiceCatalog::Portfolio' | 'AWS::SQS::Queue' | 'AWS::KMS::Key' | 'AWS::QLDB::Ledger' | 'AWS::SecretsManager::Secret' | 'AWS::SNS::Topic' | 'AWS::SSM::FileData' | 'AWS::Backup::BackupPlan' | 'AWS::Backup::BackupSelection' | 'AWS::Backup::BackupVault' | 'AWS::Backup::RecoveryPoint' | 'AWS::ECR::Repository' | 'AWS::ECS::Cluster' | 'AWS::ECS::Service' | 'AWS::ECS::TaskDefinition' | 'AWS::EFS::AccessPoint' | 'AWS::EFS::FileSystem' | 'AWS::EKS::Cluster' | 'AWS::OpenSearch::Domain' | 'AWS::EC2::TransitGateway' | 'AWS::Kinesis::Stream' | 'AWS::Kinesis::StreamConsumer' | 'AWS::CodeDeploy::Application' | 'AWS::CodeDeploy::DeploymentConfig' | 'AWS::CodeDeploy::DeploymentGroup' | 'AWS::EC2::LaunchTemplate' | 'AWS::ECR::PublicRepository' | 'AWS::GuardDuty::Detector' | 'AWS::EMR::SecurityConfiguration' | 'AWS::SageMaker::CodeRepository' | 'AWS::Route53Resolver::ResolverEndpoint' | 'AWS::Route53Resolver::ResolverRule' | 'AWS::Route53Resolver::ResolverRuleAssociation' | 'AWS::DMS::ReplicationSubnetGroup' | 'AWS::DMS::EventSubscription' | 'AWS::MSK::Cluster' | 'AWS::StepFunctions::Activity' | 'AWS::WorkSpaces::Workspace' | 'AWS::WorkSpaces::ConnectionAlias' | 'AWS::SageMaker::Model' | 'AWS::ElasticLoadBalancingV2::Listener' | 'AWS::StepFunctions::StateMachine' | 'AWS::Batch::JobQueue' | 'AWS::Batch::ComputeEnvironment' | 'AWS::AccessAnalyzer::Analyzer' | 'AWS::Athena::WorkGroup' | 'AWS::Athena::DataCatalog' | 'AWS::Detective::Graph' | 'AWS::GlobalAccelerator::Accelerator' | 'AWS::GlobalAccelerator::EndpointGroup' | 'AWS::GlobalAccelerator::Listener' | 'AWS::EC2::TransitGatewayAttachment' | 'AWS::EC2::TransitGatewayRouteTable' | 'AWS::DMS::Certificate' | 'AWS::AppConfig::Application' | 'AWS::AppSync::GraphQLApi' | 'AWS::DataSync::LocationSMB' | 'AWS::DataSync::LocationFSxLustre' | 'AWS::DataSync::LocationS3' | 'AWS::DataSync::LocationEFS' | 'AWS::DataSync::Task' | 'AWS::DataSync::LocationNFS' | 'AWS::EC2::NetworkInsightsAccessScopeAnalysis' | 'AWS::EKS::FargateProfile' | 'AWS::Glue::Job' | 'AWS::GuardDuty::ThreatIntelSet' | 'AWS::GuardDuty::IPSet' | 'AWS::SageMaker::Workteam' | 'AWS::SageMaker::NotebookInstanceLifecycleConfig' | 'AWS::ServiceDiscovery::Service' | 'AWS::ServiceDiscovery::PublicDnsNamespace' | 'AWS::SES::ContactList' | 'AWS::SES::ConfigurationSet' | 'AWS::Route53::HostedZone' | 'AWS::IoTEvents::Input' | 'AWS::IoTEvents::DetectorModel' | 'AWS::IoTEvents::AlarmModel' | 'AWS::ServiceDiscovery::HttpNamespace' | 'AWS::Events::EventBus' | 'AWS::ImageBuilder::ContainerRecipe' | 'AWS::ImageBuilder::DistributionConfiguration' | 'AWS::ImageBuilder::InfrastructureConfiguration' | 'AWS::DataSync::LocationObjectStorage' | 'AWS::DataSync::LocationHDFS' | 'AWS::Glue::Classifier' | 'AWS::Route53RecoveryReadiness::Cell' | 'AWS::Route53RecoveryReadiness::ReadinessCheck' | 'AWS::ECR::RegistryPolicy' | 'AWS::Backup::ReportPlan' | 'AWS::Lightsail::Certificate' | 'AWS::RUM::AppMonitor' | 'AWS::Events::Endpoint' | 'AWS::SES::ReceiptRuleSet' | 'AWS::Events::Archive' | 'AWS::Events::ApiDestination' | 'AWS::Lightsail::Disk' | 'AWS::FIS::ExperimentTemplate' | 'AWS::DataSync::LocationFSxWindows' | 'AWS::SES::ReceiptFilter' | 'AWS::GuardDuty::Filter' | 'AWS::SES::Template' | 'AWS::AmazonMQ::Broker' | 'AWS::AppConfig::Environment' | 'AWS::AppConfig::ConfigurationProfile' | 'AWS::Cloud9::EnvironmentEC2' | 'AWS::EventSchemas::Registry' | 'AWS::EventSchemas::RegistryPolicy' | 'AWS::EventSchemas::Discoverer' | 'AWS::FraudDetector::Label' | 'AWS::FraudDetector::EntityType' | 'AWS::FraudDetector::Variable' | 'AWS::FraudDetector::Outcome' | 'AWS::IoT::Authorizer' | 'AWS::IoT::SecurityProfile' | 'AWS::IoT::RoleAlias' | 'AWS::IoT::Dimension' | 'AWS::IoTAnalytics::Datastore' | 'AWS::Lightsail::Bucket' | 'AWS::Lightsail::StaticIp' | 'AWS::MediaPackage::PackagingGroup' | 'AWS::Route53RecoveryReadiness::RecoveryGroup' | 'AWS::ResilienceHub::ResiliencyPolicy' | 'AWS::Transfer::Workflow' | 'AWS::EKS::IdentityProviderConfig' | 'AWS::EKS::Addon' | 'AWS::Glue::MLTransform' | 'AWS::IoT::Policy' | 'AWS::IoT::MitigationAction' | 'AWS::IoTTwinMaker::Workspace' | 'AWS::IoTTwinMaker::Entity' | 'AWS::IoTAnalytics::Dataset' | 'AWS::IoTAnalytics::Pipeline' | 'AWS::IoTAnalytics::Channel' | 'AWS::IoTSiteWise::Dashboard' | 'AWS::IoTSiteWise::Project' | 'AWS::IoTSiteWise::Portal' | 'AWS::IoTSiteWise::AssetModel' | 'AWS::IVS::Channel' | 'AWS::IVS::RecordingConfiguration' | 'AWS::IVS::PlaybackKeyPair' | 'AWS::KinesisAnalyticsV2::Application' | 'AWS::RDS::GlobalCluster' | 'AWS::S3::MultiRegionAccessPoint' | 'AWS::DeviceFarm::TestGridProject' | 'AWS::Budgets::BudgetsAction' | 'AWS::Lex::Bot' | 'AWS::CodeGuruReviewer::RepositoryAssociation' | 'AWS::IoT::CustomMetric' | 'AWS::Route53Resolver::FirewallDomainList' | 'AWS::RoboMaker::RobotApplicationVersion' | 'AWS::EC2::TrafficMirrorSession' | 'AWS::IoTSiteWise::Gateway' | 'AWS::Lex::BotAlias' | 'AWS::LookoutMetrics::Alert' | 'AWS::IoT::AccountAuditConfiguration' | 'AWS::EC2::TrafficMirrorTarget' | 'AWS::S3::StorageLens' | 'AWS::IoT::ScheduledAudit' | 'AWS::Events::Connection' | 'AWS::EventSchemas::Schema' | 'AWS::MediaPackage::PackagingConfiguration' | 'AWS::KinesisVideo::SignalingChannel' | 'AWS::AppStream::DirectoryConfig' | 'AWS::LookoutVision::Project' | 'AWS::Route53RecoveryControl::Cluster' | 'AWS::Route53RecoveryControl::SafetyRule' | 'AWS::Route53RecoveryControl::ControlPanel' | 'AWS::Route53RecoveryControl::RoutingControl' | 'AWS::Route53RecoveryReadiness::ResourceSet' | 'AWS::RoboMaker::SimulationApplication' | 'AWS::RoboMaker::RobotApplication' | 'AWS::HealthLake::FHIRDatastore' | 'AWS::Pinpoint::Segment' | 'AWS::Pinpoint::ApplicationSettings' | 'AWS::Events::Rule' | 'AWS::EC2::DHCPOptions' | 'AWS::EC2::NetworkInsightsPath' | 'AWS::EC2::TrafficMirrorFilter' | 'AWS::EC2::IPAM' | 'AWS::IoTTwinMaker::Scene' | 'AWS::NetworkManager::TransitGatewayRegistration' | 'AWS::CustomerProfiles::Domain' | 'AWS::AutoScaling::WarmPool' | 'AWS::Connect::PhoneNumber' | 'AWS::AppConfig::DeploymentStrategy' | 'AWS::AppFlow::Flow' | 'AWS::AuditManager::Assessment' | 'AWS::CloudWatch::MetricStream' | 'AWS::DeviceFarm::InstanceProfile' | 'AWS::DeviceFarm::Project' | 'AWS::EC2::EC2Fleet' | 'AWS::EC2::SubnetRouteTableAssociation' | 'AWS::ECR::PullThroughCacheRule' | 'AWS::GroundStation::Config' | 'AWS::ImageBuilder::ImagePipeline' | 'AWS::IoT::FleetMetric' | 'AWS::IoTWireless::ServiceProfile' | 'AWS::NetworkManager::Device' | 'AWS::NetworkManager::GlobalNetwork' | 'AWS::NetworkManager::Link' | 'AWS::NetworkManager::Site' | 'AWS::Panorama::Package' | 'AWS::Pinpoint::App' | 'AWS::Redshift::ScheduledAction' | 'AWS::Route53Resolver::FirewallRuleGroupAssociation' | 'AWS::SageMaker::AppImageConfig' | 'AWS::SageMaker::Image' | 'AWS::ECS::TaskSet' | 'AWS::Cassandra::Keyspace' | 'AWS::Signer::SigningProfile' | 'AWS::Amplify::App' | 'AWS::AppMesh::VirtualNode' | 'AWS::AppMesh::VirtualService' | 'AWS::AppRunner::VpcConnector' | 'AWS::AppStream::Application' | 'AWS::CodeArtifact::Repository' | 'AWS::EC2::PrefixList' | 'AWS::EC2::SpotFleet' | 'AWS::Evidently::Project' | 'AWS::Forecast::Dataset' | 'AWS::IAM::SAMLProvider' | 'AWS::IAM::ServerCertificate' | 'AWS::Pinpoint::Campaign' | 'AWS::Pinpoint::InAppTemplate' | 'AWS::SageMaker::Domain' | 'AWS::Transfer::Agreement' | 'AWS::Transfer::Connector' | 'AWS::KinesisFirehose::DeliveryStream' | 'AWS::Amplify::Branch' | 'AWS::AppIntegrations::EventIntegration' | 'AWS::AppMesh::Route' | 'AWS::Athena::PreparedStatement' | 'AWS::EC2::IPAMScope' | 'AWS::Evidently::Launch' | 'AWS::Forecast::DatasetGroup' | 'AWS::GreengrassV2::ComponentVersion' | 'AWS::GroundStation::MissionProfile' | 'AWS::MediaConnect::FlowEntitlement' | 'AWS::MediaConnect::FlowVpcInterface' | 'AWS::MediaTailor::PlaybackConfiguration' | 'AWS::MSK::Configuration' | 'AWS::Personalize::Dataset' | 'AWS::Personalize::Schema' | 'AWS::Personalize::Solution' | 'AWS::Pinpoint::EmailTemplate' | 'AWS::Pinpoint::EventStream' | 'AWS::ResilienceHub::App' | 'AWS::ACMPCA::CertificateAuthority' | 'AWS::AppConfig::HostedConfigurationVersion' | 'AWS::AppMesh::VirtualGateway' | 'AWS::AppMesh::VirtualRouter' | 'AWS::AppRunner::Service' | 'AWS::CustomerProfiles::ObjectType' | 'AWS::DMS::Endpoint' | 'AWS::EC2::CapacityReservation' | 'AWS::EC2::ClientVpnEndpoint' | 'AWS::Kendra::Index' | 'AWS::KinesisVideo::Stream' | 'AWS::Logs::Destination' | 'AWS::Pinpoint::EmailChannel' | 'AWS::S3::AccessPoint' | 'AWS::NetworkManager::CustomerGatewayAssociation' | 'AWS::NetworkManager::LinkAssociation' | 'AWS::IoTWireless::MulticastGroup' | 'AWS::Personalize::DatasetGroup' | 'AWS::IoTTwinMaker::ComponentType' | 'AWS::CodeBuild::ReportGroup' | 'AWS::SageMaker::FeatureGroup' | 'AWS::MSK::BatchScramSecret' | 'AWS::AppStream::Stack' | 'AWS::IoT::JobTemplate' | 'AWS::IoTWireless::FuotaTask' | 'AWS::IoT::ProvisioningTemplate' | 'AWS::InspectorV2::Filter' | 'AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation' | 'AWS::ServiceDiscovery::Instance' | 'AWS::Transfer::Certificate' | 'AWS::MediaConnect::FlowSource' | 'AWS::APS::RuleGroupsNamespace' | 'AWS::CodeGuruProfiler::ProfilingGroup' | 'AWS::Route53Resolver::ResolverQueryLoggingConfig' | 'AWS::Batch::SchedulingPolicy' | 'AWS::ACMPCA::CertificateAuthorityActivation' | 'AWS::AppMesh::GatewayRoute' | 'AWS::AppMesh::Mesh' | 'AWS::Connect::Instance' | 'AWS::Connect::QuickConnect' | 'AWS::EC2::CarrierGateway' | 'AWS::EC2::IPAMPool' | 'AWS::EC2::TransitGatewayConnect' | 'AWS::EC2::TransitGatewayMulticastDomain' | 'AWS::ECS::CapacityProvider' | 'AWS::IAM::InstanceProfile' | 'AWS::IoT::CACertificate' | 'AWS::IoTTwinMaker::SyncJob' | 'AWS::KafkaConnect::Connector' | 'AWS::Lambda::CodeSigningConfig' | 'AWS::NetworkManager::ConnectPeer' | 'AWS::ResourceExplorer2::Index' | 'AWS::AppStream::Fleet' | 'AWS::Cognito::UserPool' | 'AWS::Cognito::UserPoolClient' | 'AWS::Cognito::UserPoolGroup' | 'AWS::EC2::NetworkInsightsAccessScope' | 'AWS::EC2::NetworkInsightsAnalysis' | 'AWS::Grafana::Workspace' | 'AWS::GroundStation::DataflowEndpointGroup' | 'AWS::ImageBuilder::ImageRecipe' | 'AWS::KMS::Alias' | 'AWS::M2::Environment' | 'AWS::QuickSight::DataSource' | 'AWS::QuickSight::Template' | 'AWS::QuickSight::Theme' | 'AWS::RDS::OptionGroup' | 'AWS::Redshift::EndpointAccess' | 'AWS::Route53Resolver::FirewallRuleGroup' | 'AWS::SSM::Document' | 'AWS::AppConfig::ExtensionAssociation' | 'AWS::AppIntegrations::Application' | 'AWS::AppSync::ApiCache' | 'AWS::Bedrock::Guardrail' | 'AWS::Bedrock::KnowledgeBase' | 'AWS::Cognito::IdentityPool' | 'AWS::Connect::Rule' | 'AWS::Connect::User' | 'AWS::EC2::ClientVpnTargetNetworkAssociation' | 'AWS::EC2::EIPAssociation' | 'AWS::EC2::IPAMResourceDiscovery' | 'AWS::EC2::IPAMResourceDiscoveryAssociation' | 'AWS::EC2::InstanceConnectEndpoint' | 'AWS::EC2::SnapshotBlockPublicAccess' | 'AWS::EC2::VPCBlockPublicAccessExclusion' | 'AWS::EC2::VPCBlockPublicAccessOptions' | 'AWS::EC2::VPCEndpointConnectionNotification' | 'AWS::EC2::VPNConnectionRoute' | 'AWS::Evidently::Segment' | 'AWS::IAM::OIDCProvider' | 'AWS::InspectorV2::Activation' | 'AWS::MSK::ClusterPolicy' | 'AWS::MSK::VpcConnection' | 'AWS::MediaConnect::Gateway' | 'AWS::MemoryDB::SubnetGroup' | 'AWS::OpenSearchServerless::Collection' | 'AWS::OpenSearchServerless::VpcEndpoint' | 'AWS::Redshift::EndpointAuthorization' | 'AWS::Route53Profiles::Profile' | 'AWS::S3::StorageLensGroup' | 'AWS::S3Express::BucketPolicy' | 'AWS::S3Express::DirectoryBucket' | 'AWS::SageMaker::InferenceExperiment' | 'AWS::SecurityHub::Standard' | 'AWS::Transfer::Profile' | 'AWS::CloudFormation::StackSet' | 'AWS::MediaPackageV2::Channel' | 'AWS::S3::AccessGrantsLocation' | 'AWS::S3::AccessGrant' | 'AWS::S3::AccessGrantsInstance' | 'AWS::EMRServerless::Application' | 'AWS::Config::AggregationAuthorization' | 'AWS::Bedrock::ApplicationInferenceProfile' | 'AWS::ApiGatewayV2::Integration' | 'AWS::SageMaker::MlflowTrackingServer' | 'AWS::SageMaker::ModelBiasJobDefinition' | 'AWS::SecretsManager::RotationSchedule' | 'AWS::Deadline::QueueFleetAssociation' | 'AWS::ECR::RepositoryCreationTemplate' | 'AWS::CloudFormation::LambdaHook' | 'AWS::EC2::SubnetNetworkAclAssociation' | 'AWS::ApiGateway::UsagePlan' | 'AWS::AppConfig::Extension' | 'AWS::Deadline::Fleet' | 'AWS::EMR::Studio' | 'AWS::S3Tables::TableBucket' | 'AWS::CloudFront::RealtimeLogConfig' | 'AWS::BackupGateway::Hypervisor' | 'AWS::BCMDataExports::Export' | 'AWS::CloudFormation::GuardHook' | 'AWS::CloudFront::PublicKey' | 'AWS::CloudTrail::EventDataStore' | 'AWS::EntityResolution::IdMappingWorkflow' | 'AWS::EntityResolution::SchemaMapping' | 'AWS::IoT::DomainConfiguration' | 'AWS::PCAConnectorAD::DirectoryRegistration' | 'AWS::RDS::Integration' | 'AWS::Config::ConformancePack' | 'AWS::RolesAnywhere::Profile' | 'AWS::CodeArtifact::Domain' | 'AWS::Backup::RestoreTestingPlan' | 'AWS::Config::StoredQuery' | 'AWS::SageMaker::DataQualityJobDefinition' | 'AWS::SageMaker::ModelExplainabilityJobDefinition' | 'AWS::SageMaker::ModelQualityJobDefinition' | 'AWS::SageMaker::StudioLifecycleConfig' | 'AWS::SES::DedicatedIpPool' | 'AWS::SES::MailManagerTrafficPolicy' | 'AWS::SSM::ResourceDataSync' | 'AWS::BedrockAgentCore::Runtime' | 'AWS::BedrockAgentCore::BrowserCustom' | 'AWS::ElasticLoadBalancingV2::TargetGroup' | 'AWS::EMRContainers::VirtualCluster' | 'AWS::EntityResolution::MatchingWorkflow' | 'AWS::IoTCoreDeviceAdvisor::SuiteDefinition' | 'AWS::EC2::SecurityGroupVpcAssociation' | 'AWS::EC2::VerifiedAccessInstance' | 'AWS::KafkaConnect::CustomPlugin' | 'AWS::NetworkManager::TransitGatewayPeering' | 'AWS::OpenSearchServerless::SecurityConfig' | 'AWS::Redshift::Integration' | 'AWS::RolesAnywhere::TrustAnchor' | 'AWS::Route53Profiles::ProfileAssociation' | 'AWS::SSMIncidents::ResponsePlan' | 'AWS::Transfer::Server' | 'AWS::Glue::Database' | 'AWS::Organizations::OrganizationalUnit' | 'AWS::EC2::IPAMPoolCidr' | 'AWS::EC2::VPCGatewayAttachment' | 'AWS::Bedrock::Prompt' | 'AWS::Comprehend::Flywheel' | 'AWS::DataSync::Agent' | 'AWS::MediaTailor::LiveSource' | 'AWS::MSK::ServerlessCluster' | 'AWS::IoTSiteWise::Asset' | 'AWS::B2BI::Capability' | 'AWS::CloudFront::KeyValueStore' | 'AWS::Deadline::Monitor' | 'AWS::GuardDuty::MalwareProtectionPlan' | 'AWS::Location::APIKey' | 'AWS::MediaPackageV2::OriginEndpoint' | 'AWS::PCAConnectorAD::Connector' | 'AWS::S3Tables::TableBucketPolicy' | 'AWS::SecretsManager::ResourcePolicy' | 'AWS::SSMContacts::Contact' | 'AWS::IoT::ThingGroup' | 'AWS::ImageBuilder::LifecyclePolicy' | 'AWS::GameLift::Build' | 'AWS::ECR::ReplicationConfiguration' | 'AWS::EC2::SubnetCidrBlock' | 'AWS::Connect::SecurityProfile' | 'AWS::CleanRoomsML::TrainingDataset' | 'AWS::AppStream::AppBlockBuilder' | 'AWS::Route53::DNSSEC' | 'AWS::SageMaker::UserProfile' | 'AWS::ApiGateway::Method';
  /** The chronological order for configuration items listed. By default, the results are listed in reverse chronological order. */
  chronologicalOrder?: 'Reverse' | 'Forward';
  /** The chronologically earliest time in the time range for which the history requested. If not specified, the action returns paginated results that contain configuration items that start when the first c */
  earlierTime?: string;
  /** The chronologically latest time in the time range for which the history requested. If not specified, current time is taken. */
  laterTime?: string;
  /** The maximum number of configuration items returned on each page. The default is 10. You cannot specify a number greater than 100. If you specify 0, Config uses the default. */
  limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  nextToken?: string;
}

export interface GetResourceEvaluationSummaryInput {
  /** The unique ResourceEvaluationId of Amazon Web Services resource execution for which you want to retrieve the evaluation summary. */
  ResourceEvaluationId: string;
}

export interface GetStoredQueryInput {
  /** The name of the query. */
  QueryName: string;
}

export interface ListAggregateDiscoveredResourcesInput {
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
  /** The type of resources that you want Config to list in the response. */
  ResourceType: 'AWS::EC2::CustomerGateway' | 'AWS::EC2::EIP' | 'AWS::EC2::Host' | 'AWS::EC2::Instance' | 'AWS::EC2::InternetGateway' | 'AWS::EC2::NetworkAcl' | 'AWS::EC2::NetworkInterface' | 'AWS::EC2::RouteTable' | 'AWS::EC2::SecurityGroup' | 'AWS::EC2::Subnet' | 'AWS::CloudTrail::Trail' | 'AWS::EC2::Volume' | 'AWS::EC2::VPC' | 'AWS::EC2::VPNConnection' | 'AWS::EC2::VPNGateway' | 'AWS::EC2::RegisteredHAInstance' | 'AWS::EC2::NatGateway' | 'AWS::EC2::EgressOnlyInternetGateway' | 'AWS::EC2::VPCEndpoint' | 'AWS::EC2::VPCEndpointService' | 'AWS::EC2::FlowLog' | 'AWS::EC2::VPCPeeringConnection' | 'AWS::Elasticsearch::Domain' | 'AWS::IAM::Group' | 'AWS::IAM::Policy' | 'AWS::IAM::Role' | 'AWS::IAM::User' | 'AWS::ElasticLoadBalancingV2::LoadBalancer' | 'AWS::ACM::Certificate' | 'AWS::RDS::DBInstance' | 'AWS::RDS::DBSubnetGroup' | 'AWS::RDS::DBSecurityGroup' | 'AWS::RDS::DBSnapshot' | 'AWS::RDS::DBCluster' | 'AWS::RDS::DBClusterSnapshot' | 'AWS::RDS::EventSubscription' | 'AWS::S3::Bucket' | 'AWS::S3::AccountPublicAccessBlock' | 'AWS::Redshift::Cluster' | 'AWS::Redshift::ClusterSnapshot' | 'AWS::Redshift::ClusterParameterGroup' | 'AWS::Redshift::ClusterSecurityGroup' | 'AWS::Redshift::ClusterSubnetGroup' | 'AWS::Redshift::EventSubscription' | 'AWS::SSM::ManagedInstanceInventory' | 'AWS::CloudWatch::Alarm' | 'AWS::CloudFormation::Stack' | 'AWS::ElasticLoadBalancing::LoadBalancer' | 'AWS::AutoScaling::AutoScalingGroup' | 'AWS::AutoScaling::LaunchConfiguration' | 'AWS::AutoScaling::ScalingPolicy' | 'AWS::AutoScaling::ScheduledAction' | 'AWS::DynamoDB::Table' | 'AWS::CodeBuild::Project' | 'AWS::WAF::RateBasedRule' | 'AWS::WAF::Rule' | 'AWS::WAF::RuleGroup' | 'AWS::WAF::WebACL' | 'AWS::WAFRegional::RateBasedRule' | 'AWS::WAFRegional::Rule' | 'AWS::WAFRegional::RuleGroup' | 'AWS::WAFRegional::WebACL' | 'AWS::CloudFront::Distribution' | 'AWS::CloudFront::StreamingDistribution' | 'AWS::Lambda::Function' | 'AWS::NetworkFirewall::Firewall' | 'AWS::NetworkFirewall::FirewallPolicy' | 'AWS::NetworkFirewall::RuleGroup' | 'AWS::ElasticBeanstalk::Application' | 'AWS::ElasticBeanstalk::ApplicationVersion' | 'AWS::ElasticBeanstalk::Environment' | 'AWS::WAFv2::WebACL' | 'AWS::WAFv2::RuleGroup' | 'AWS::WAFv2::IPSet' | 'AWS::WAFv2::RegexPatternSet' | 'AWS::WAFv2::ManagedRuleSet' | 'AWS::XRay::EncryptionConfig' | 'AWS::SSM::AssociationCompliance' | 'AWS::SSM::PatchCompliance' | 'AWS::Shield::Protection' | 'AWS::ShieldRegional::Protection' | 'AWS::Config::ConformancePackCompliance' | 'AWS::Config::ResourceCompliance' | 'AWS::ApiGateway::Stage' | 'AWS::ApiGateway::RestApi' | 'AWS::ApiGatewayV2::Stage' | 'AWS::ApiGatewayV2::Api' | 'AWS::CodePipeline::Pipeline' | 'AWS::ServiceCatalog::CloudFormationProvisionedProduct' | 'AWS::ServiceCatalog::CloudFormationProduct' | 'AWS::ServiceCatalog::Portfolio' | 'AWS::SQS::Queue' | 'AWS::KMS::Key' | 'AWS::QLDB::Ledger' | 'AWS::SecretsManager::Secret' | 'AWS::SNS::Topic' | 'AWS::SSM::FileData' | 'AWS::Backup::BackupPlan' | 'AWS::Backup::BackupSelection' | 'AWS::Backup::BackupVault' | 'AWS::Backup::RecoveryPoint' | 'AWS::ECR::Repository' | 'AWS::ECS::Cluster' | 'AWS::ECS::Service' | 'AWS::ECS::TaskDefinition' | 'AWS::EFS::AccessPoint' | 'AWS::EFS::FileSystem' | 'AWS::EKS::Cluster' | 'AWS::OpenSearch::Domain' | 'AWS::EC2::TransitGateway' | 'AWS::Kinesis::Stream' | 'AWS::Kinesis::StreamConsumer' | 'AWS::CodeDeploy::Application' | 'AWS::CodeDeploy::DeploymentConfig' | 'AWS::CodeDeploy::DeploymentGroup' | 'AWS::EC2::LaunchTemplate' | 'AWS::ECR::PublicRepository' | 'AWS::GuardDuty::Detector' | 'AWS::EMR::SecurityConfiguration' | 'AWS::SageMaker::CodeRepository' | 'AWS::Route53Resolver::ResolverEndpoint' | 'AWS::Route53Resolver::ResolverRule' | 'AWS::Route53Resolver::ResolverRuleAssociation' | 'AWS::DMS::ReplicationSubnetGroup' | 'AWS::DMS::EventSubscription' | 'AWS::MSK::Cluster' | 'AWS::StepFunctions::Activity' | 'AWS::WorkSpaces::Workspace' | 'AWS::WorkSpaces::ConnectionAlias' | 'AWS::SageMaker::Model' | 'AWS::ElasticLoadBalancingV2::Listener' | 'AWS::StepFunctions::StateMachine' | 'AWS::Batch::JobQueue' | 'AWS::Batch::ComputeEnvironment' | 'AWS::AccessAnalyzer::Analyzer' | 'AWS::Athena::WorkGroup' | 'AWS::Athena::DataCatalog' | 'AWS::Detective::Graph' | 'AWS::GlobalAccelerator::Accelerator' | 'AWS::GlobalAccelerator::EndpointGroup' | 'AWS::GlobalAccelerator::Listener' | 'AWS::EC2::TransitGatewayAttachment' | 'AWS::EC2::TransitGatewayRouteTable' | 'AWS::DMS::Certificate' | 'AWS::AppConfig::Application' | 'AWS::AppSync::GraphQLApi' | 'AWS::DataSync::LocationSMB' | 'AWS::DataSync::LocationFSxLustre' | 'AWS::DataSync::LocationS3' | 'AWS::DataSync::LocationEFS' | 'AWS::DataSync::Task' | 'AWS::DataSync::LocationNFS' | 'AWS::EC2::NetworkInsightsAccessScopeAnalysis' | 'AWS::EKS::FargateProfile' | 'AWS::Glue::Job' | 'AWS::GuardDuty::ThreatIntelSet' | 'AWS::GuardDuty::IPSet' | 'AWS::SageMaker::Workteam' | 'AWS::SageMaker::NotebookInstanceLifecycleConfig' | 'AWS::ServiceDiscovery::Service' | 'AWS::ServiceDiscovery::PublicDnsNamespace' | 'AWS::SES::ContactList' | 'AWS::SES::ConfigurationSet' | 'AWS::Route53::HostedZone' | 'AWS::IoTEvents::Input' | 'AWS::IoTEvents::DetectorModel' | 'AWS::IoTEvents::AlarmModel' | 'AWS::ServiceDiscovery::HttpNamespace' | 'AWS::Events::EventBus' | 'AWS::ImageBuilder::ContainerRecipe' | 'AWS::ImageBuilder::DistributionConfiguration' | 'AWS::ImageBuilder::InfrastructureConfiguration' | 'AWS::DataSync::LocationObjectStorage' | 'AWS::DataSync::LocationHDFS' | 'AWS::Glue::Classifier' | 'AWS::Route53RecoveryReadiness::Cell' | 'AWS::Route53RecoveryReadiness::ReadinessCheck' | 'AWS::ECR::RegistryPolicy' | 'AWS::Backup::ReportPlan' | 'AWS::Lightsail::Certificate' | 'AWS::RUM::AppMonitor' | 'AWS::Events::Endpoint' | 'AWS::SES::ReceiptRuleSet' | 'AWS::Events::Archive' | 'AWS::Events::ApiDestination' | 'AWS::Lightsail::Disk' | 'AWS::FIS::ExperimentTemplate' | 'AWS::DataSync::LocationFSxWindows' | 'AWS::SES::ReceiptFilter' | 'AWS::GuardDuty::Filter' | 'AWS::SES::Template' | 'AWS::AmazonMQ::Broker' | 'AWS::AppConfig::Environment' | 'AWS::AppConfig::ConfigurationProfile' | 'AWS::Cloud9::EnvironmentEC2' | 'AWS::EventSchemas::Registry' | 'AWS::EventSchemas::RegistryPolicy' | 'AWS::EventSchemas::Discoverer' | 'AWS::FraudDetector::Label' | 'AWS::FraudDetector::EntityType' | 'AWS::FraudDetector::Variable' | 'AWS::FraudDetector::Outcome' | 'AWS::IoT::Authorizer' | 'AWS::IoT::SecurityProfile' | 'AWS::IoT::RoleAlias' | 'AWS::IoT::Dimension' | 'AWS::IoTAnalytics::Datastore' | 'AWS::Lightsail::Bucket' | 'AWS::Lightsail::StaticIp' | 'AWS::MediaPackage::PackagingGroup' | 'AWS::Route53RecoveryReadiness::RecoveryGroup' | 'AWS::ResilienceHub::ResiliencyPolicy' | 'AWS::Transfer::Workflow' | 'AWS::EKS::IdentityProviderConfig' | 'AWS::EKS::Addon' | 'AWS::Glue::MLTransform' | 'AWS::IoT::Policy' | 'AWS::IoT::MitigationAction' | 'AWS::IoTTwinMaker::Workspace' | 'AWS::IoTTwinMaker::Entity' | 'AWS::IoTAnalytics::Dataset' | 'AWS::IoTAnalytics::Pipeline' | 'AWS::IoTAnalytics::Channel' | 'AWS::IoTSiteWise::Dashboard' | 'AWS::IoTSiteWise::Project' | 'AWS::IoTSiteWise::Portal' | 'AWS::IoTSiteWise::AssetModel' | 'AWS::IVS::Channel' | 'AWS::IVS::RecordingConfiguration' | 'AWS::IVS::PlaybackKeyPair' | 'AWS::KinesisAnalyticsV2::Application' | 'AWS::RDS::GlobalCluster' | 'AWS::S3::MultiRegionAccessPoint' | 'AWS::DeviceFarm::TestGridProject' | 'AWS::Budgets::BudgetsAction' | 'AWS::Lex::Bot' | 'AWS::CodeGuruReviewer::RepositoryAssociation' | 'AWS::IoT::CustomMetric' | 'AWS::Route53Resolver::FirewallDomainList' | 'AWS::RoboMaker::RobotApplicationVersion' | 'AWS::EC2::TrafficMirrorSession' | 'AWS::IoTSiteWise::Gateway' | 'AWS::Lex::BotAlias' | 'AWS::LookoutMetrics::Alert' | 'AWS::IoT::AccountAuditConfiguration' | 'AWS::EC2::TrafficMirrorTarget' | 'AWS::S3::StorageLens' | 'AWS::IoT::ScheduledAudit' | 'AWS::Events::Connection' | 'AWS::EventSchemas::Schema' | 'AWS::MediaPackage::PackagingConfiguration' | 'AWS::KinesisVideo::SignalingChannel' | 'AWS::AppStream::DirectoryConfig' | 'AWS::LookoutVision::Project' | 'AWS::Route53RecoveryControl::Cluster' | 'AWS::Route53RecoveryControl::SafetyRule' | 'AWS::Route53RecoveryControl::ControlPanel' | 'AWS::Route53RecoveryControl::RoutingControl' | 'AWS::Route53RecoveryReadiness::ResourceSet' | 'AWS::RoboMaker::SimulationApplication' | 'AWS::RoboMaker::RobotApplication' | 'AWS::HealthLake::FHIRDatastore' | 'AWS::Pinpoint::Segment' | 'AWS::Pinpoint::ApplicationSettings' | 'AWS::Events::Rule' | 'AWS::EC2::DHCPOptions' | 'AWS::EC2::NetworkInsightsPath' | 'AWS::EC2::TrafficMirrorFilter' | 'AWS::EC2::IPAM' | 'AWS::IoTTwinMaker::Scene' | 'AWS::NetworkManager::TransitGatewayRegistration' | 'AWS::CustomerProfiles::Domain' | 'AWS::AutoScaling::WarmPool' | 'AWS::Connect::PhoneNumber' | 'AWS::AppConfig::DeploymentStrategy' | 'AWS::AppFlow::Flow' | 'AWS::AuditManager::Assessment' | 'AWS::CloudWatch::MetricStream' | 'AWS::DeviceFarm::InstanceProfile' | 'AWS::DeviceFarm::Project' | 'AWS::EC2::EC2Fleet' | 'AWS::EC2::SubnetRouteTableAssociation' | 'AWS::ECR::PullThroughCacheRule' | 'AWS::GroundStation::Config' | 'AWS::ImageBuilder::ImagePipeline' | 'AWS::IoT::FleetMetric' | 'AWS::IoTWireless::ServiceProfile' | 'AWS::NetworkManager::Device' | 'AWS::NetworkManager::GlobalNetwork' | 'AWS::NetworkManager::Link' | 'AWS::NetworkManager::Site' | 'AWS::Panorama::Package' | 'AWS::Pinpoint::App' | 'AWS::Redshift::ScheduledAction' | 'AWS::Route53Resolver::FirewallRuleGroupAssociation' | 'AWS::SageMaker::AppImageConfig' | 'AWS::SageMaker::Image' | 'AWS::ECS::TaskSet' | 'AWS::Cassandra::Keyspace' | 'AWS::Signer::SigningProfile' | 'AWS::Amplify::App' | 'AWS::AppMesh::VirtualNode' | 'AWS::AppMesh::VirtualService' | 'AWS::AppRunner::VpcConnector' | 'AWS::AppStream::Application' | 'AWS::CodeArtifact::Repository' | 'AWS::EC2::PrefixList' | 'AWS::EC2::SpotFleet' | 'AWS::Evidently::Project' | 'AWS::Forecast::Dataset' | 'AWS::IAM::SAMLProvider' | 'AWS::IAM::ServerCertificate' | 'AWS::Pinpoint::Campaign' | 'AWS::Pinpoint::InAppTemplate' | 'AWS::SageMaker::Domain' | 'AWS::Transfer::Agreement' | 'AWS::Transfer::Connector' | 'AWS::KinesisFirehose::DeliveryStream' | 'AWS::Amplify::Branch' | 'AWS::AppIntegrations::EventIntegration' | 'AWS::AppMesh::Route' | 'AWS::Athena::PreparedStatement' | 'AWS::EC2::IPAMScope' | 'AWS::Evidently::Launch' | 'AWS::Forecast::DatasetGroup' | 'AWS::GreengrassV2::ComponentVersion' | 'AWS::GroundStation::MissionProfile' | 'AWS::MediaConnect::FlowEntitlement' | 'AWS::MediaConnect::FlowVpcInterface' | 'AWS::MediaTailor::PlaybackConfiguration' | 'AWS::MSK::Configuration' | 'AWS::Personalize::Dataset' | 'AWS::Personalize::Schema' | 'AWS::Personalize::Solution' | 'AWS::Pinpoint::EmailTemplate' | 'AWS::Pinpoint::EventStream' | 'AWS::ResilienceHub::App' | 'AWS::ACMPCA::CertificateAuthority' | 'AWS::AppConfig::HostedConfigurationVersion' | 'AWS::AppMesh::VirtualGateway' | 'AWS::AppMesh::VirtualRouter' | 'AWS::AppRunner::Service' | 'AWS::CustomerProfiles::ObjectType' | 'AWS::DMS::Endpoint' | 'AWS::EC2::CapacityReservation' | 'AWS::EC2::ClientVpnEndpoint' | 'AWS::Kendra::Index' | 'AWS::KinesisVideo::Stream' | 'AWS::Logs::Destination' | 'AWS::Pinpoint::EmailChannel' | 'AWS::S3::AccessPoint' | 'AWS::NetworkManager::CustomerGatewayAssociation' | 'AWS::NetworkManager::LinkAssociation' | 'AWS::IoTWireless::MulticastGroup' | 'AWS::Personalize::DatasetGroup' | 'AWS::IoTTwinMaker::ComponentType' | 'AWS::CodeBuild::ReportGroup' | 'AWS::SageMaker::FeatureGroup' | 'AWS::MSK::BatchScramSecret' | 'AWS::AppStream::Stack' | 'AWS::IoT::JobTemplate' | 'AWS::IoTWireless::FuotaTask' | 'AWS::IoT::ProvisioningTemplate' | 'AWS::InspectorV2::Filter' | 'AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation' | 'AWS::ServiceDiscovery::Instance' | 'AWS::Transfer::Certificate' | 'AWS::MediaConnect::FlowSource' | 'AWS::APS::RuleGroupsNamespace' | 'AWS::CodeGuruProfiler::ProfilingGroup' | 'AWS::Route53Resolver::ResolverQueryLoggingConfig' | 'AWS::Batch::SchedulingPolicy' | 'AWS::ACMPCA::CertificateAuthorityActivation' | 'AWS::AppMesh::GatewayRoute' | 'AWS::AppMesh::Mesh' | 'AWS::Connect::Instance' | 'AWS::Connect::QuickConnect' | 'AWS::EC2::CarrierGateway' | 'AWS::EC2::IPAMPool' | 'AWS::EC2::TransitGatewayConnect' | 'AWS::EC2::TransitGatewayMulticastDomain' | 'AWS::ECS::CapacityProvider' | 'AWS::IAM::InstanceProfile' | 'AWS::IoT::CACertificate' | 'AWS::IoTTwinMaker::SyncJob' | 'AWS::KafkaConnect::Connector' | 'AWS::Lambda::CodeSigningConfig' | 'AWS::NetworkManager::ConnectPeer' | 'AWS::ResourceExplorer2::Index' | 'AWS::AppStream::Fleet' | 'AWS::Cognito::UserPool' | 'AWS::Cognito::UserPoolClient' | 'AWS::Cognito::UserPoolGroup' | 'AWS::EC2::NetworkInsightsAccessScope' | 'AWS::EC2::NetworkInsightsAnalysis' | 'AWS::Grafana::Workspace' | 'AWS::GroundStation::DataflowEndpointGroup' | 'AWS::ImageBuilder::ImageRecipe' | 'AWS::KMS::Alias' | 'AWS::M2::Environment' | 'AWS::QuickSight::DataSource' | 'AWS::QuickSight::Template' | 'AWS::QuickSight::Theme' | 'AWS::RDS::OptionGroup' | 'AWS::Redshift::EndpointAccess' | 'AWS::Route53Resolver::FirewallRuleGroup' | 'AWS::SSM::Document' | 'AWS::AppConfig::ExtensionAssociation' | 'AWS::AppIntegrations::Application' | 'AWS::AppSync::ApiCache' | 'AWS::Bedrock::Guardrail' | 'AWS::Bedrock::KnowledgeBase' | 'AWS::Cognito::IdentityPool' | 'AWS::Connect::Rule' | 'AWS::Connect::User' | 'AWS::EC2::ClientVpnTargetNetworkAssociation' | 'AWS::EC2::EIPAssociation' | 'AWS::EC2::IPAMResourceDiscovery' | 'AWS::EC2::IPAMResourceDiscoveryAssociation' | 'AWS::EC2::InstanceConnectEndpoint' | 'AWS::EC2::SnapshotBlockPublicAccess' | 'AWS::EC2::VPCBlockPublicAccessExclusion' | 'AWS::EC2::VPCBlockPublicAccessOptions' | 'AWS::EC2::VPCEndpointConnectionNotification' | 'AWS::EC2::VPNConnectionRoute' | 'AWS::Evidently::Segment' | 'AWS::IAM::OIDCProvider' | 'AWS::InspectorV2::Activation' | 'AWS::MSK::ClusterPolicy' | 'AWS::MSK::VpcConnection' | 'AWS::MediaConnect::Gateway' | 'AWS::MemoryDB::SubnetGroup' | 'AWS::OpenSearchServerless::Collection' | 'AWS::OpenSearchServerless::VpcEndpoint' | 'AWS::Redshift::EndpointAuthorization' | 'AWS::Route53Profiles::Profile' | 'AWS::S3::StorageLensGroup' | 'AWS::S3Express::BucketPolicy' | 'AWS::S3Express::DirectoryBucket' | 'AWS::SageMaker::InferenceExperiment' | 'AWS::SecurityHub::Standard' | 'AWS::Transfer::Profile' | 'AWS::CloudFormation::StackSet' | 'AWS::MediaPackageV2::Channel' | 'AWS::S3::AccessGrantsLocation' | 'AWS::S3::AccessGrant' | 'AWS::S3::AccessGrantsInstance' | 'AWS::EMRServerless::Application' | 'AWS::Config::AggregationAuthorization' | 'AWS::Bedrock::ApplicationInferenceProfile' | 'AWS::ApiGatewayV2::Integration' | 'AWS::SageMaker::MlflowTrackingServer' | 'AWS::SageMaker::ModelBiasJobDefinition' | 'AWS::SecretsManager::RotationSchedule' | 'AWS::Deadline::QueueFleetAssociation' | 'AWS::ECR::RepositoryCreationTemplate' | 'AWS::CloudFormation::LambdaHook' | 'AWS::EC2::SubnetNetworkAclAssociation' | 'AWS::ApiGateway::UsagePlan' | 'AWS::AppConfig::Extension' | 'AWS::Deadline::Fleet' | 'AWS::EMR::Studio' | 'AWS::S3Tables::TableBucket' | 'AWS::CloudFront::RealtimeLogConfig' | 'AWS::BackupGateway::Hypervisor' | 'AWS::BCMDataExports::Export' | 'AWS::CloudFormation::GuardHook' | 'AWS::CloudFront::PublicKey' | 'AWS::CloudTrail::EventDataStore' | 'AWS::EntityResolution::IdMappingWorkflow' | 'AWS::EntityResolution::SchemaMapping' | 'AWS::IoT::DomainConfiguration' | 'AWS::PCAConnectorAD::DirectoryRegistration' | 'AWS::RDS::Integration' | 'AWS::Config::ConformancePack' | 'AWS::RolesAnywhere::Profile' | 'AWS::CodeArtifact::Domain' | 'AWS::Backup::RestoreTestingPlan' | 'AWS::Config::StoredQuery' | 'AWS::SageMaker::DataQualityJobDefinition' | 'AWS::SageMaker::ModelExplainabilityJobDefinition' | 'AWS::SageMaker::ModelQualityJobDefinition' | 'AWS::SageMaker::StudioLifecycleConfig' | 'AWS::SES::DedicatedIpPool' | 'AWS::SES::MailManagerTrafficPolicy' | 'AWS::SSM::ResourceDataSync' | 'AWS::BedrockAgentCore::Runtime' | 'AWS::BedrockAgentCore::BrowserCustom' | 'AWS::ElasticLoadBalancingV2::TargetGroup' | 'AWS::EMRContainers::VirtualCluster' | 'AWS::EntityResolution::MatchingWorkflow' | 'AWS::IoTCoreDeviceAdvisor::SuiteDefinition' | 'AWS::EC2::SecurityGroupVpcAssociation' | 'AWS::EC2::VerifiedAccessInstance' | 'AWS::KafkaConnect::CustomPlugin' | 'AWS::NetworkManager::TransitGatewayPeering' | 'AWS::OpenSearchServerless::SecurityConfig' | 'AWS::Redshift::Integration' | 'AWS::RolesAnywhere::TrustAnchor' | 'AWS::Route53Profiles::ProfileAssociation' | 'AWS::SSMIncidents::ResponsePlan' | 'AWS::Transfer::Server' | 'AWS::Glue::Database' | 'AWS::Organizations::OrganizationalUnit' | 'AWS::EC2::IPAMPoolCidr' | 'AWS::EC2::VPCGatewayAttachment' | 'AWS::Bedrock::Prompt' | 'AWS::Comprehend::Flywheel' | 'AWS::DataSync::Agent' | 'AWS::MediaTailor::LiveSource' | 'AWS::MSK::ServerlessCluster' | 'AWS::IoTSiteWise::Asset' | 'AWS::B2BI::Capability' | 'AWS::CloudFront::KeyValueStore' | 'AWS::Deadline::Monitor' | 'AWS::GuardDuty::MalwareProtectionPlan' | 'AWS::Location::APIKey' | 'AWS::MediaPackageV2::OriginEndpoint' | 'AWS::PCAConnectorAD::Connector' | 'AWS::S3Tables::TableBucketPolicy' | 'AWS::SecretsManager::ResourcePolicy' | 'AWS::SSMContacts::Contact' | 'AWS::IoT::ThingGroup' | 'AWS::ImageBuilder::LifecyclePolicy' | 'AWS::GameLift::Build' | 'AWS::ECR::ReplicationConfiguration' | 'AWS::EC2::SubnetCidrBlock' | 'AWS::Connect::SecurityProfile' | 'AWS::CleanRoomsML::TrainingDataset' | 'AWS::AppStream::AppBlockBuilder' | 'AWS::Route53::DNSSEC' | 'AWS::SageMaker::UserProfile' | 'AWS::ApiGateway::Method';
  /** Filters the results based on the ResourceFilters object. */
  Filters?: ResourceFilters;
  /** The maximum number of resource identifiers returned on each page. You cannot specify a number greater than 100. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface ListConfigurationRecordersInput {
  /** Filters the results based on a list of ConfigurationRecorderFilter objects that you specify. */
  Filters?: ConfigurationRecorderFilter[];
  /** The maximum number of results to include in the response. */
  MaxResults?: number;
  /** The NextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface ListConformancePackComplianceScoresInput {
  /** Filters the results based on the ConformancePackComplianceScoresFilters. */
  Filters?: ConformancePackComplianceScoresFilters;
  /** The maximum number of conformance pack compliance scores returned on each page. */
  Limit?: number;
  /** The nextToken string in a prior request that you can use to get the paginated response for the next set of conformance pack compliance scores. */
  NextToken?: string;
  /** Sorts your conformance pack compliance scores in either ascending or descending order, depending on SortOrder. By default, conformance pack compliance scores are sorted in alphabetical order by name o */
  SortBy?: 'SCORE';
  /** Determines the order in which conformance pack compliance scores are sorted. Either in ascending or descending order. By default, conformance pack compliance scores are sorted in alphabetical order by */
  SortOrder?: 'ASCENDING' | 'DESCENDING';
}

export interface ListDiscoveredResourcesInput {
  /** The type of resources that you want Config to list in the response. */
  resourceType: 'AWS::EC2::CustomerGateway' | 'AWS::EC2::EIP' | 'AWS::EC2::Host' | 'AWS::EC2::Instance' | 'AWS::EC2::InternetGateway' | 'AWS::EC2::NetworkAcl' | 'AWS::EC2::NetworkInterface' | 'AWS::EC2::RouteTable' | 'AWS::EC2::SecurityGroup' | 'AWS::EC2::Subnet' | 'AWS::CloudTrail::Trail' | 'AWS::EC2::Volume' | 'AWS::EC2::VPC' | 'AWS::EC2::VPNConnection' | 'AWS::EC2::VPNGateway' | 'AWS::EC2::RegisteredHAInstance' | 'AWS::EC2::NatGateway' | 'AWS::EC2::EgressOnlyInternetGateway' | 'AWS::EC2::VPCEndpoint' | 'AWS::EC2::VPCEndpointService' | 'AWS::EC2::FlowLog' | 'AWS::EC2::VPCPeeringConnection' | 'AWS::Elasticsearch::Domain' | 'AWS::IAM::Group' | 'AWS::IAM::Policy' | 'AWS::IAM::Role' | 'AWS::IAM::User' | 'AWS::ElasticLoadBalancingV2::LoadBalancer' | 'AWS::ACM::Certificate' | 'AWS::RDS::DBInstance' | 'AWS::RDS::DBSubnetGroup' | 'AWS::RDS::DBSecurityGroup' | 'AWS::RDS::DBSnapshot' | 'AWS::RDS::DBCluster' | 'AWS::RDS::DBClusterSnapshot' | 'AWS::RDS::EventSubscription' | 'AWS::S3::Bucket' | 'AWS::S3::AccountPublicAccessBlock' | 'AWS::Redshift::Cluster' | 'AWS::Redshift::ClusterSnapshot' | 'AWS::Redshift::ClusterParameterGroup' | 'AWS::Redshift::ClusterSecurityGroup' | 'AWS::Redshift::ClusterSubnetGroup' | 'AWS::Redshift::EventSubscription' | 'AWS::SSM::ManagedInstanceInventory' | 'AWS::CloudWatch::Alarm' | 'AWS::CloudFormation::Stack' | 'AWS::ElasticLoadBalancing::LoadBalancer' | 'AWS::AutoScaling::AutoScalingGroup' | 'AWS::AutoScaling::LaunchConfiguration' | 'AWS::AutoScaling::ScalingPolicy' | 'AWS::AutoScaling::ScheduledAction' | 'AWS::DynamoDB::Table' | 'AWS::CodeBuild::Project' | 'AWS::WAF::RateBasedRule' | 'AWS::WAF::Rule' | 'AWS::WAF::RuleGroup' | 'AWS::WAF::WebACL' | 'AWS::WAFRegional::RateBasedRule' | 'AWS::WAFRegional::Rule' | 'AWS::WAFRegional::RuleGroup' | 'AWS::WAFRegional::WebACL' | 'AWS::CloudFront::Distribution' | 'AWS::CloudFront::StreamingDistribution' | 'AWS::Lambda::Function' | 'AWS::NetworkFirewall::Firewall' | 'AWS::NetworkFirewall::FirewallPolicy' | 'AWS::NetworkFirewall::RuleGroup' | 'AWS::ElasticBeanstalk::Application' | 'AWS::ElasticBeanstalk::ApplicationVersion' | 'AWS::ElasticBeanstalk::Environment' | 'AWS::WAFv2::WebACL' | 'AWS::WAFv2::RuleGroup' | 'AWS::WAFv2::IPSet' | 'AWS::WAFv2::RegexPatternSet' | 'AWS::WAFv2::ManagedRuleSet' | 'AWS::XRay::EncryptionConfig' | 'AWS::SSM::AssociationCompliance' | 'AWS::SSM::PatchCompliance' | 'AWS::Shield::Protection' | 'AWS::ShieldRegional::Protection' | 'AWS::Config::ConformancePackCompliance' | 'AWS::Config::ResourceCompliance' | 'AWS::ApiGateway::Stage' | 'AWS::ApiGateway::RestApi' | 'AWS::ApiGatewayV2::Stage' | 'AWS::ApiGatewayV2::Api' | 'AWS::CodePipeline::Pipeline' | 'AWS::ServiceCatalog::CloudFormationProvisionedProduct' | 'AWS::ServiceCatalog::CloudFormationProduct' | 'AWS::ServiceCatalog::Portfolio' | 'AWS::SQS::Queue' | 'AWS::KMS::Key' | 'AWS::QLDB::Ledger' | 'AWS::SecretsManager::Secret' | 'AWS::SNS::Topic' | 'AWS::SSM::FileData' | 'AWS::Backup::BackupPlan' | 'AWS::Backup::BackupSelection' | 'AWS::Backup::BackupVault' | 'AWS::Backup::RecoveryPoint' | 'AWS::ECR::Repository' | 'AWS::ECS::Cluster' | 'AWS::ECS::Service' | 'AWS::ECS::TaskDefinition' | 'AWS::EFS::AccessPoint' | 'AWS::EFS::FileSystem' | 'AWS::EKS::Cluster' | 'AWS::OpenSearch::Domain' | 'AWS::EC2::TransitGateway' | 'AWS::Kinesis::Stream' | 'AWS::Kinesis::StreamConsumer' | 'AWS::CodeDeploy::Application' | 'AWS::CodeDeploy::DeploymentConfig' | 'AWS::CodeDeploy::DeploymentGroup' | 'AWS::EC2::LaunchTemplate' | 'AWS::ECR::PublicRepository' | 'AWS::GuardDuty::Detector' | 'AWS::EMR::SecurityConfiguration' | 'AWS::SageMaker::CodeRepository' | 'AWS::Route53Resolver::ResolverEndpoint' | 'AWS::Route53Resolver::ResolverRule' | 'AWS::Route53Resolver::ResolverRuleAssociation' | 'AWS::DMS::ReplicationSubnetGroup' | 'AWS::DMS::EventSubscription' | 'AWS::MSK::Cluster' | 'AWS::StepFunctions::Activity' | 'AWS::WorkSpaces::Workspace' | 'AWS::WorkSpaces::ConnectionAlias' | 'AWS::SageMaker::Model' | 'AWS::ElasticLoadBalancingV2::Listener' | 'AWS::StepFunctions::StateMachine' | 'AWS::Batch::JobQueue' | 'AWS::Batch::ComputeEnvironment' | 'AWS::AccessAnalyzer::Analyzer' | 'AWS::Athena::WorkGroup' | 'AWS::Athena::DataCatalog' | 'AWS::Detective::Graph' | 'AWS::GlobalAccelerator::Accelerator' | 'AWS::GlobalAccelerator::EndpointGroup' | 'AWS::GlobalAccelerator::Listener' | 'AWS::EC2::TransitGatewayAttachment' | 'AWS::EC2::TransitGatewayRouteTable' | 'AWS::DMS::Certificate' | 'AWS::AppConfig::Application' | 'AWS::AppSync::GraphQLApi' | 'AWS::DataSync::LocationSMB' | 'AWS::DataSync::LocationFSxLustre' | 'AWS::DataSync::LocationS3' | 'AWS::DataSync::LocationEFS' | 'AWS::DataSync::Task' | 'AWS::DataSync::LocationNFS' | 'AWS::EC2::NetworkInsightsAccessScopeAnalysis' | 'AWS::EKS::FargateProfile' | 'AWS::Glue::Job' | 'AWS::GuardDuty::ThreatIntelSet' | 'AWS::GuardDuty::IPSet' | 'AWS::SageMaker::Workteam' | 'AWS::SageMaker::NotebookInstanceLifecycleConfig' | 'AWS::ServiceDiscovery::Service' | 'AWS::ServiceDiscovery::PublicDnsNamespace' | 'AWS::SES::ContactList' | 'AWS::SES::ConfigurationSet' | 'AWS::Route53::HostedZone' | 'AWS::IoTEvents::Input' | 'AWS::IoTEvents::DetectorModel' | 'AWS::IoTEvents::AlarmModel' | 'AWS::ServiceDiscovery::HttpNamespace' | 'AWS::Events::EventBus' | 'AWS::ImageBuilder::ContainerRecipe' | 'AWS::ImageBuilder::DistributionConfiguration' | 'AWS::ImageBuilder::InfrastructureConfiguration' | 'AWS::DataSync::LocationObjectStorage' | 'AWS::DataSync::LocationHDFS' | 'AWS::Glue::Classifier' | 'AWS::Route53RecoveryReadiness::Cell' | 'AWS::Route53RecoveryReadiness::ReadinessCheck' | 'AWS::ECR::RegistryPolicy' | 'AWS::Backup::ReportPlan' | 'AWS::Lightsail::Certificate' | 'AWS::RUM::AppMonitor' | 'AWS::Events::Endpoint' | 'AWS::SES::ReceiptRuleSet' | 'AWS::Events::Archive' | 'AWS::Events::ApiDestination' | 'AWS::Lightsail::Disk' | 'AWS::FIS::ExperimentTemplate' | 'AWS::DataSync::LocationFSxWindows' | 'AWS::SES::ReceiptFilter' | 'AWS::GuardDuty::Filter' | 'AWS::SES::Template' | 'AWS::AmazonMQ::Broker' | 'AWS::AppConfig::Environment' | 'AWS::AppConfig::ConfigurationProfile' | 'AWS::Cloud9::EnvironmentEC2' | 'AWS::EventSchemas::Registry' | 'AWS::EventSchemas::RegistryPolicy' | 'AWS::EventSchemas::Discoverer' | 'AWS::FraudDetector::Label' | 'AWS::FraudDetector::EntityType' | 'AWS::FraudDetector::Variable' | 'AWS::FraudDetector::Outcome' | 'AWS::IoT::Authorizer' | 'AWS::IoT::SecurityProfile' | 'AWS::IoT::RoleAlias' | 'AWS::IoT::Dimension' | 'AWS::IoTAnalytics::Datastore' | 'AWS::Lightsail::Bucket' | 'AWS::Lightsail::StaticIp' | 'AWS::MediaPackage::PackagingGroup' | 'AWS::Route53RecoveryReadiness::RecoveryGroup' | 'AWS::ResilienceHub::ResiliencyPolicy' | 'AWS::Transfer::Workflow' | 'AWS::EKS::IdentityProviderConfig' | 'AWS::EKS::Addon' | 'AWS::Glue::MLTransform' | 'AWS::IoT::Policy' | 'AWS::IoT::MitigationAction' | 'AWS::IoTTwinMaker::Workspace' | 'AWS::IoTTwinMaker::Entity' | 'AWS::IoTAnalytics::Dataset' | 'AWS::IoTAnalytics::Pipeline' | 'AWS::IoTAnalytics::Channel' | 'AWS::IoTSiteWise::Dashboard' | 'AWS::IoTSiteWise::Project' | 'AWS::IoTSiteWise::Portal' | 'AWS::IoTSiteWise::AssetModel' | 'AWS::IVS::Channel' | 'AWS::IVS::RecordingConfiguration' | 'AWS::IVS::PlaybackKeyPair' | 'AWS::KinesisAnalyticsV2::Application' | 'AWS::RDS::GlobalCluster' | 'AWS::S3::MultiRegionAccessPoint' | 'AWS::DeviceFarm::TestGridProject' | 'AWS::Budgets::BudgetsAction' | 'AWS::Lex::Bot' | 'AWS::CodeGuruReviewer::RepositoryAssociation' | 'AWS::IoT::CustomMetric' | 'AWS::Route53Resolver::FirewallDomainList' | 'AWS::RoboMaker::RobotApplicationVersion' | 'AWS::EC2::TrafficMirrorSession' | 'AWS::IoTSiteWise::Gateway' | 'AWS::Lex::BotAlias' | 'AWS::LookoutMetrics::Alert' | 'AWS::IoT::AccountAuditConfiguration' | 'AWS::EC2::TrafficMirrorTarget' | 'AWS::S3::StorageLens' | 'AWS::IoT::ScheduledAudit' | 'AWS::Events::Connection' | 'AWS::EventSchemas::Schema' | 'AWS::MediaPackage::PackagingConfiguration' | 'AWS::KinesisVideo::SignalingChannel' | 'AWS::AppStream::DirectoryConfig' | 'AWS::LookoutVision::Project' | 'AWS::Route53RecoveryControl::Cluster' | 'AWS::Route53RecoveryControl::SafetyRule' | 'AWS::Route53RecoveryControl::ControlPanel' | 'AWS::Route53RecoveryControl::RoutingControl' | 'AWS::Route53RecoveryReadiness::ResourceSet' | 'AWS::RoboMaker::SimulationApplication' | 'AWS::RoboMaker::RobotApplication' | 'AWS::HealthLake::FHIRDatastore' | 'AWS::Pinpoint::Segment' | 'AWS::Pinpoint::ApplicationSettings' | 'AWS::Events::Rule' | 'AWS::EC2::DHCPOptions' | 'AWS::EC2::NetworkInsightsPath' | 'AWS::EC2::TrafficMirrorFilter' | 'AWS::EC2::IPAM' | 'AWS::IoTTwinMaker::Scene' | 'AWS::NetworkManager::TransitGatewayRegistration' | 'AWS::CustomerProfiles::Domain' | 'AWS::AutoScaling::WarmPool' | 'AWS::Connect::PhoneNumber' | 'AWS::AppConfig::DeploymentStrategy' | 'AWS::AppFlow::Flow' | 'AWS::AuditManager::Assessment' | 'AWS::CloudWatch::MetricStream' | 'AWS::DeviceFarm::InstanceProfile' | 'AWS::DeviceFarm::Project' | 'AWS::EC2::EC2Fleet' | 'AWS::EC2::SubnetRouteTableAssociation' | 'AWS::ECR::PullThroughCacheRule' | 'AWS::GroundStation::Config' | 'AWS::ImageBuilder::ImagePipeline' | 'AWS::IoT::FleetMetric' | 'AWS::IoTWireless::ServiceProfile' | 'AWS::NetworkManager::Device' | 'AWS::NetworkManager::GlobalNetwork' | 'AWS::NetworkManager::Link' | 'AWS::NetworkManager::Site' | 'AWS::Panorama::Package' | 'AWS::Pinpoint::App' | 'AWS::Redshift::ScheduledAction' | 'AWS::Route53Resolver::FirewallRuleGroupAssociation' | 'AWS::SageMaker::AppImageConfig' | 'AWS::SageMaker::Image' | 'AWS::ECS::TaskSet' | 'AWS::Cassandra::Keyspace' | 'AWS::Signer::SigningProfile' | 'AWS::Amplify::App' | 'AWS::AppMesh::VirtualNode' | 'AWS::AppMesh::VirtualService' | 'AWS::AppRunner::VpcConnector' | 'AWS::AppStream::Application' | 'AWS::CodeArtifact::Repository' | 'AWS::EC2::PrefixList' | 'AWS::EC2::SpotFleet' | 'AWS::Evidently::Project' | 'AWS::Forecast::Dataset' | 'AWS::IAM::SAMLProvider' | 'AWS::IAM::ServerCertificate' | 'AWS::Pinpoint::Campaign' | 'AWS::Pinpoint::InAppTemplate' | 'AWS::SageMaker::Domain' | 'AWS::Transfer::Agreement' | 'AWS::Transfer::Connector' | 'AWS::KinesisFirehose::DeliveryStream' | 'AWS::Amplify::Branch' | 'AWS::AppIntegrations::EventIntegration' | 'AWS::AppMesh::Route' | 'AWS::Athena::PreparedStatement' | 'AWS::EC2::IPAMScope' | 'AWS::Evidently::Launch' | 'AWS::Forecast::DatasetGroup' | 'AWS::GreengrassV2::ComponentVersion' | 'AWS::GroundStation::MissionProfile' | 'AWS::MediaConnect::FlowEntitlement' | 'AWS::MediaConnect::FlowVpcInterface' | 'AWS::MediaTailor::PlaybackConfiguration' | 'AWS::MSK::Configuration' | 'AWS::Personalize::Dataset' | 'AWS::Personalize::Schema' | 'AWS::Personalize::Solution' | 'AWS::Pinpoint::EmailTemplate' | 'AWS::Pinpoint::EventStream' | 'AWS::ResilienceHub::App' | 'AWS::ACMPCA::CertificateAuthority' | 'AWS::AppConfig::HostedConfigurationVersion' | 'AWS::AppMesh::VirtualGateway' | 'AWS::AppMesh::VirtualRouter' | 'AWS::AppRunner::Service' | 'AWS::CustomerProfiles::ObjectType' | 'AWS::DMS::Endpoint' | 'AWS::EC2::CapacityReservation' | 'AWS::EC2::ClientVpnEndpoint' | 'AWS::Kendra::Index' | 'AWS::KinesisVideo::Stream' | 'AWS::Logs::Destination' | 'AWS::Pinpoint::EmailChannel' | 'AWS::S3::AccessPoint' | 'AWS::NetworkManager::CustomerGatewayAssociation' | 'AWS::NetworkManager::LinkAssociation' | 'AWS::IoTWireless::MulticastGroup' | 'AWS::Personalize::DatasetGroup' | 'AWS::IoTTwinMaker::ComponentType' | 'AWS::CodeBuild::ReportGroup' | 'AWS::SageMaker::FeatureGroup' | 'AWS::MSK::BatchScramSecret' | 'AWS::AppStream::Stack' | 'AWS::IoT::JobTemplate' | 'AWS::IoTWireless::FuotaTask' | 'AWS::IoT::ProvisioningTemplate' | 'AWS::InspectorV2::Filter' | 'AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation' | 'AWS::ServiceDiscovery::Instance' | 'AWS::Transfer::Certificate' | 'AWS::MediaConnect::FlowSource' | 'AWS::APS::RuleGroupsNamespace' | 'AWS::CodeGuruProfiler::ProfilingGroup' | 'AWS::Route53Resolver::ResolverQueryLoggingConfig' | 'AWS::Batch::SchedulingPolicy' | 'AWS::ACMPCA::CertificateAuthorityActivation' | 'AWS::AppMesh::GatewayRoute' | 'AWS::AppMesh::Mesh' | 'AWS::Connect::Instance' | 'AWS::Connect::QuickConnect' | 'AWS::EC2::CarrierGateway' | 'AWS::EC2::IPAMPool' | 'AWS::EC2::TransitGatewayConnect' | 'AWS::EC2::TransitGatewayMulticastDomain' | 'AWS::ECS::CapacityProvider' | 'AWS::IAM::InstanceProfile' | 'AWS::IoT::CACertificate' | 'AWS::IoTTwinMaker::SyncJob' | 'AWS::KafkaConnect::Connector' | 'AWS::Lambda::CodeSigningConfig' | 'AWS::NetworkManager::ConnectPeer' | 'AWS::ResourceExplorer2::Index' | 'AWS::AppStream::Fleet' | 'AWS::Cognito::UserPool' | 'AWS::Cognito::UserPoolClient' | 'AWS::Cognito::UserPoolGroup' | 'AWS::EC2::NetworkInsightsAccessScope' | 'AWS::EC2::NetworkInsightsAnalysis' | 'AWS::Grafana::Workspace' | 'AWS::GroundStation::DataflowEndpointGroup' | 'AWS::ImageBuilder::ImageRecipe' | 'AWS::KMS::Alias' | 'AWS::M2::Environment' | 'AWS::QuickSight::DataSource' | 'AWS::QuickSight::Template' | 'AWS::QuickSight::Theme' | 'AWS::RDS::OptionGroup' | 'AWS::Redshift::EndpointAccess' | 'AWS::Route53Resolver::FirewallRuleGroup' | 'AWS::SSM::Document' | 'AWS::AppConfig::ExtensionAssociation' | 'AWS::AppIntegrations::Application' | 'AWS::AppSync::ApiCache' | 'AWS::Bedrock::Guardrail' | 'AWS::Bedrock::KnowledgeBase' | 'AWS::Cognito::IdentityPool' | 'AWS::Connect::Rule' | 'AWS::Connect::User' | 'AWS::EC2::ClientVpnTargetNetworkAssociation' | 'AWS::EC2::EIPAssociation' | 'AWS::EC2::IPAMResourceDiscovery' | 'AWS::EC2::IPAMResourceDiscoveryAssociation' | 'AWS::EC2::InstanceConnectEndpoint' | 'AWS::EC2::SnapshotBlockPublicAccess' | 'AWS::EC2::VPCBlockPublicAccessExclusion' | 'AWS::EC2::VPCBlockPublicAccessOptions' | 'AWS::EC2::VPCEndpointConnectionNotification' | 'AWS::EC2::VPNConnectionRoute' | 'AWS::Evidently::Segment' | 'AWS::IAM::OIDCProvider' | 'AWS::InspectorV2::Activation' | 'AWS::MSK::ClusterPolicy' | 'AWS::MSK::VpcConnection' | 'AWS::MediaConnect::Gateway' | 'AWS::MemoryDB::SubnetGroup' | 'AWS::OpenSearchServerless::Collection' | 'AWS::OpenSearchServerless::VpcEndpoint' | 'AWS::Redshift::EndpointAuthorization' | 'AWS::Route53Profiles::Profile' | 'AWS::S3::StorageLensGroup' | 'AWS::S3Express::BucketPolicy' | 'AWS::S3Express::DirectoryBucket' | 'AWS::SageMaker::InferenceExperiment' | 'AWS::SecurityHub::Standard' | 'AWS::Transfer::Profile' | 'AWS::CloudFormation::StackSet' | 'AWS::MediaPackageV2::Channel' | 'AWS::S3::AccessGrantsLocation' | 'AWS::S3::AccessGrant' | 'AWS::S3::AccessGrantsInstance' | 'AWS::EMRServerless::Application' | 'AWS::Config::AggregationAuthorization' | 'AWS::Bedrock::ApplicationInferenceProfile' | 'AWS::ApiGatewayV2::Integration' | 'AWS::SageMaker::MlflowTrackingServer' | 'AWS::SageMaker::ModelBiasJobDefinition' | 'AWS::SecretsManager::RotationSchedule' | 'AWS::Deadline::QueueFleetAssociation' | 'AWS::ECR::RepositoryCreationTemplate' | 'AWS::CloudFormation::LambdaHook' | 'AWS::EC2::SubnetNetworkAclAssociation' | 'AWS::ApiGateway::UsagePlan' | 'AWS::AppConfig::Extension' | 'AWS::Deadline::Fleet' | 'AWS::EMR::Studio' | 'AWS::S3Tables::TableBucket' | 'AWS::CloudFront::RealtimeLogConfig' | 'AWS::BackupGateway::Hypervisor' | 'AWS::BCMDataExports::Export' | 'AWS::CloudFormation::GuardHook' | 'AWS::CloudFront::PublicKey' | 'AWS::CloudTrail::EventDataStore' | 'AWS::EntityResolution::IdMappingWorkflow' | 'AWS::EntityResolution::SchemaMapping' | 'AWS::IoT::DomainConfiguration' | 'AWS::PCAConnectorAD::DirectoryRegistration' | 'AWS::RDS::Integration' | 'AWS::Config::ConformancePack' | 'AWS::RolesAnywhere::Profile' | 'AWS::CodeArtifact::Domain' | 'AWS::Backup::RestoreTestingPlan' | 'AWS::Config::StoredQuery' | 'AWS::SageMaker::DataQualityJobDefinition' | 'AWS::SageMaker::ModelExplainabilityJobDefinition' | 'AWS::SageMaker::ModelQualityJobDefinition' | 'AWS::SageMaker::StudioLifecycleConfig' | 'AWS::SES::DedicatedIpPool' | 'AWS::SES::MailManagerTrafficPolicy' | 'AWS::SSM::ResourceDataSync' | 'AWS::BedrockAgentCore::Runtime' | 'AWS::BedrockAgentCore::BrowserCustom' | 'AWS::ElasticLoadBalancingV2::TargetGroup' | 'AWS::EMRContainers::VirtualCluster' | 'AWS::EntityResolution::MatchingWorkflow' | 'AWS::IoTCoreDeviceAdvisor::SuiteDefinition' | 'AWS::EC2::SecurityGroupVpcAssociation' | 'AWS::EC2::VerifiedAccessInstance' | 'AWS::KafkaConnect::CustomPlugin' | 'AWS::NetworkManager::TransitGatewayPeering' | 'AWS::OpenSearchServerless::SecurityConfig' | 'AWS::Redshift::Integration' | 'AWS::RolesAnywhere::TrustAnchor' | 'AWS::Route53Profiles::ProfileAssociation' | 'AWS::SSMIncidents::ResponsePlan' | 'AWS::Transfer::Server' | 'AWS::Glue::Database' | 'AWS::Organizations::OrganizationalUnit' | 'AWS::EC2::IPAMPoolCidr' | 'AWS::EC2::VPCGatewayAttachment' | 'AWS::Bedrock::Prompt' | 'AWS::Comprehend::Flywheel' | 'AWS::DataSync::Agent' | 'AWS::MediaTailor::LiveSource' | 'AWS::MSK::ServerlessCluster' | 'AWS::IoTSiteWise::Asset' | 'AWS::B2BI::Capability' | 'AWS::CloudFront::KeyValueStore' | 'AWS::Deadline::Monitor' | 'AWS::GuardDuty::MalwareProtectionPlan' | 'AWS::Location::APIKey' | 'AWS::MediaPackageV2::OriginEndpoint' | 'AWS::PCAConnectorAD::Connector' | 'AWS::S3Tables::TableBucketPolicy' | 'AWS::SecretsManager::ResourcePolicy' | 'AWS::SSMContacts::Contact' | 'AWS::IoT::ThingGroup' | 'AWS::ImageBuilder::LifecyclePolicy' | 'AWS::GameLift::Build' | 'AWS::ECR::ReplicationConfiguration' | 'AWS::EC2::SubnetCidrBlock' | 'AWS::Connect::SecurityProfile' | 'AWS::CleanRoomsML::TrainingDataset' | 'AWS::AppStream::AppBlockBuilder' | 'AWS::Route53::DNSSEC' | 'AWS::SageMaker::UserProfile' | 'AWS::ApiGateway::Method';
  /** Specifies whether Config includes deleted resources in the results. By default, deleted resources are not included. */
  includeDeletedResources?: boolean;
  /** The maximum number of resource identifiers returned on each page. The default is 100. You cannot specify a number greater than 100. If you specify 0, Config uses the default. */
  limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  nextToken?: string;
  /** The IDs of only those resources that you want Config to list in the response. If you do not specify this parameter, Config lists all resources of the specified type that it has discovered. You can lis */
  resourceIds?: string[];
  /** The custom name of only those resources that you want Config to list in the response. If you do not specify this parameter, Config lists all resources of the specified type that it has discovered. */
  resourceName?: string;
}

export interface ListResourceEvaluationsInput {
  /** Returns a ResourceEvaluationFilters object. */
  Filters?: ResourceEvaluationFilters;
  /** The maximum number of evaluations returned on each page. The default is 10. You cannot specify a number greater than 100. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface ListStoredQueriesInput {
  /** The maximum number of results to be returned with a single call. */
  MaxResults?: number;
  /** The nextToken string returned in a previous request that you use to request the next page of results in a paginated response. */
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) that identifies the resource for which to list the tags. The following resources are supported: ConfigurationRecorder ConfigRule OrganizationConfigRule ConformancePack O */
  ResourceArn: string;
  /** The maximum number of tags returned on each page. The limit maximum is 50. You cannot specify a number greater than 50. If you specify 0, Config uses the default. */
  Limit?: number;
  /** The nextToken string returned on a previous page that you use to get the next page of results in a paginated response. */
  NextToken?: string;
}

export interface PutAggregationAuthorizationInput {
  /** The 12-digit account ID of the account authorized to aggregate data. */
  AuthorizedAccountId: string;
  /** The region authorized to collect aggregated data. */
  AuthorizedAwsRegion: string;
  /** An array of tag object. */
  Tags?: Tag[];
}

export interface PutConfigRuleInput {
  /** The rule that you want to add to your account. */
  ConfigRule: ConfigRule;
  /** An array of tag object. */
  Tags?: Tag[];
}

export interface PutConfigurationAggregatorInput {
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
  /** A list of AccountAggregationSource object. */
  AccountAggregationSources?: AccountAggregationSource[];
  /** An object to filter configuration recorders in an aggregator. Either ResourceType or ServicePrincipal is required. */
  AggregatorFilters?: AggregatorFilters;
  /** An OrganizationAggregationSource object. */
  OrganizationAggregationSource?: OrganizationAggregationSource;
  /** An array of tag object. */
  Tags?: Tag[];
}

/** The input for the PutConfigurationRecorder action. */
export interface PutConfigurationRecorderInput {
  /** An object for the configuration recorder. A configuration recorder records configuration changes for the resource types in scope. */
  ConfigurationRecorder: ConfigurationRecorder;
  /** The tags for the customer managed configuration recorder. Each tag consists of a key and an optional value, both of which you define. */
  Tags?: Tag[];
}

export interface PutConformancePackInput {
  /** The unique name of the conformance pack you want to deploy. */
  ConformancePackName: string;
  /** A list of ConformancePackInputParameter objects. */
  ConformancePackInputParameters?: ConformancePackInputParameter[];
  /** The name of the Amazon S3 bucket where Config stores conformance pack templates. This field is optional. */
  DeliveryS3Bucket?: string;
  /** The prefix for the Amazon S3 bucket. This field is optional. */
  DeliveryS3KeyPrefix?: string;
  /** The tags for the conformance pack. Each tag consists of a key and an optional value, both of which you define. */
  Tags?: Tag[];
  /** A string that contains the full conformance pack template body. The structure containing the template body has a minimum length of 1 byte and a maximum length of 51,200 bytes. You can use a YAML templ */
  TemplateBody?: string;
  /** The location of the file containing the template body (s3://bucketname/prefix). The uri must point to a conformance pack template (max size: 300 KB) that is located in an Amazon S3 bucket in the same  */
  TemplateS3Uri?: string;
  /** An object of type TemplateSSMDocumentDetails, which contains the name or the Amazon Resource Name (ARN) of the Amazon Web Services Systems Manager document (SSM document) and the version of the SSM do */
  TemplateSSMDocumentDetails?: TemplateSSMDocumentDetails;
}

/** The input for the PutDeliveryChannel action. */
export interface PutDeliveryChannelInput {
  /** An object for the delivery channel. A delivery channel sends notifications and updated configuration states. */
  DeliveryChannel: DeliveryChannel;
}

export interface PutEvaluationsInput {
  /** An encrypted token that associates an evaluation with an Config rule. Identifies the rule and the event that triggered the evaluation. */
  ResultToken: string;
  /** The assessments that the Lambda function performs. Each evaluation identifies an Amazon Web Services resource and indicates whether it complies with the Config rule that invokes the Lambda function. */
  Evaluations?: Evaluation[];
  /** Use this parameter to specify a test run for PutEvaluations. You can verify whether your Lambda function will deliver evaluation results to Config. No updates occur to your existing evaluations, and e */
  TestMode?: boolean;
}

export interface PutExternalEvaluationInput {
  /** The name of the Config rule. */
  ConfigRuleName: string;
  /** An ExternalEvaluation object that provides details about compliance. */
  ExternalEvaluation: ExternalEvaluation;
}

export interface PutOrganizationConfigRuleInput {
  /** The name that you assign to an organization Config rule. */
  OrganizationConfigRuleName: string;
  /** A comma-separated list of accounts that you want to exclude from an organization Config rule. */
  ExcludedAccounts?: string[];
  /** An OrganizationCustomPolicyRuleMetadata object. This object specifies metadata for your organization's Config Custom Policy rule. The metadata includes the runtime system in use, which accounts have d */
  OrganizationCustomPolicyRuleMetadata?: OrganizationCustomPolicyRuleMetadata;
  /** An OrganizationCustomRuleMetadata object. This object specifies organization custom rule metadata such as resource type, resource ID of Amazon Web Services resource, Lambda function ARN, and organizat */
  OrganizationCustomRuleMetadata?: OrganizationCustomRuleMetadata;
  /** An OrganizationManagedRuleMetadata object. This object specifies organization managed rule metadata such as resource type and ID of Amazon Web Services resource along with the rule identifier. It also */
  OrganizationManagedRuleMetadata?: OrganizationManagedRuleMetadata;
}

export interface PutOrganizationConformancePackInput {
  /** Name of the organization conformance pack you want to create. */
  OrganizationConformancePackName: string;
  /** A list of ConformancePackInputParameter objects. */
  ConformancePackInputParameters?: ConformancePackInputParameter[];
  /** The name of the Amazon S3 bucket where Config stores conformance pack templates. This field is optional. If used, it must be prefixed with awsconfigconforms. */
  DeliveryS3Bucket?: string;
  /** The prefix for the Amazon S3 bucket. This field is optional. */
  DeliveryS3KeyPrefix?: string;
  /** A list of Amazon Web Services accounts to be excluded from an organization conformance pack while deploying a conformance pack. */
  ExcludedAccounts?: string[];
  /** A string that contains the full conformance pack template body. Structure containing the template body with a minimum length of 1 byte and a maximum length of 51,200 bytes. */
  TemplateBody?: string;
  /** Location of file containing the template body. The uri must point to the conformance pack template (max size: 300 KB). You must have access to read Amazon S3 bucket. In addition, in order to ensure a  */
  TemplateS3Uri?: string;
}

export interface PutRemediationConfigurationsInput {
  /** A list of remediation configuration objects. */
  RemediationConfigurations: RemediationConfiguration[];
}

export interface PutRemediationExceptionsInput {
  /** The name of the Config rule for which you want to create remediation exception. */
  ConfigRuleName: string;
  /** An exception list of resource exception keys to be processed with the current request. Config adds exception for each resource key. For example, Config adds 3 exceptions for 3 resource keys. */
  ResourceKeys: RemediationExceptionResourceKey[];
  /** The exception is automatically deleted after the expiration date. */
  ExpirationTime?: string;
  /** The message contains an explanation of the exception. */
  Message?: string;
}

export interface PutResourceConfigInput {
  /** The configuration object of the resource in valid JSON format. It must match the schema registered with CloudFormation. The configuration JSON must not exceed 64 KB. */
  Configuration: string;
  /** Unique identifier of the resource. */
  ResourceId: string;
  /** The type of the resource. The custom resource type must be registered with CloudFormation. You cannot use the organization names “amzn”, “amazon”, “alexa”, “custom” with custom resource types. It is t */
  ResourceType: string;
  /** Version of the schema registered for the ResourceType in CloudFormation. */
  SchemaVersionId: string;
  /** Name of the resource. */
  ResourceName?: string;
  /** Tags associated with the resource. This field is not to be confused with the Amazon Web Services-wide tag feature for Amazon Web Services resources. Tags for PutResourceConfig are tags that you supply */
  Tags?: Record<string, string>;
}

export interface PutRetentionConfigurationInput {
  /** Number of days Config stores your historical information. Currently, only applicable to the configuration item history. */
  RetentionPeriodInDays: number;
}

export interface PutServiceLinkedConfigurationRecorderInput {
  /** The service principal of the Amazon Web Services service for the service-linked configuration recorder that you want to create. */
  ServicePrincipal: string;
  /** The tags for a service-linked configuration recorder. Each tag consists of a key and an optional value, both of which you define. */
  Tags?: Tag[];
}

export interface PutStoredQueryInput {
  /** A list of StoredQuery objects. The mandatory fields are QueryName and Expression. When you are creating a query, you must provide a query name and an expression. When you are updating a query, you mus */
  StoredQuery: StoredQuery;
  /** A list of Tags object. */
  Tags?: Tag[];
}

export interface SelectAggregateResourceConfigInput {
  /** The name of the configuration aggregator. */
  ConfigurationAggregatorName: string;
  /** The SQL query SELECT command. */
  Expression: string;
  /** The maximum number of query results returned on each page. */
  Limit?: number;
  /** The maximum number of query results returned on each page. Config also allows the Limit request parameter. */
  MaxResults?: number;
  /** The nextToken string returned in a previous request that you use to request the next page of results in a paginated response. */
  NextToken?: string;
}

export interface SelectResourceConfigInput {
  /** The SQL query SELECT command. */
  Expression: string;
  /** The maximum number of query results returned on each page. */
  Limit?: number;
  /** The nextToken string returned in a previous request that you use to request the next page of results in a paginated response. */
  NextToken?: string;
}

export interface StartConfigRulesEvaluationInput {
  /** The list of names of Config rules that you want to run evaluations for. */
  ConfigRuleNames?: string[];
}

/** The input for the StartConfigurationRecorder operation. */
export interface StartConfigurationRecorderInput {
  /** The name of the customer managed configuration recorder that you want to start. */
  ConfigurationRecorderName: string;
}

export interface StartRemediationExecutionInput {
  /** The list of names of Config rules that you want to run remediation execution for. */
  ConfigRuleName: string;
  /** A list of resource keys to be processed with the current request. Each element in the list consists of the resource type and resource ID. */
  ResourceKeys: ResourceKey[];
}

export interface StartResourceEvaluationInput {
  /** The mode of an evaluation. The only valid value for this API is PROACTIVE. */
  EvaluationMode: 'DETECTIVE' | 'PROACTIVE';
  /** Returns a ResourceDetails object. */
  ResourceDetails: ResourceDetails;
  /** A client token is a unique, case-sensitive string of up to 64 ASCII characters. To make an idempotent API request using one of these actions, specify a client token in the request. Avoid reusing the s */
  ClientToken?: string;
  /** Returns an EvaluationContext object. */
  EvaluationContext?: EvaluationContext;
  /** The timeout for an evaluation. The default is 900 seconds. You cannot specify a number greater than 3600. If you specify 0, Config uses the default. */
  EvaluationTimeout?: number;
}

/** The input for the StopConfigurationRecorder operation. */
export interface StopConfigurationRecorderInput {
  /** The name of the customer managed configuration recorder that you want to stop. */
  ConfigurationRecorderName: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) that identifies the resource for which to list the tags. The following resources are supported: ConfigurationRecorder ConfigRule OrganizationConfigRule ConformancePack O */
  ResourceArn: string;
  /** An array of tag object. */
  Tags: Tag[];
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) that identifies the resource for which to list the tags. The following resources are supported: ConfigurationRecorder ConfigRule OrganizationConfigRule ConformancePack O */
  ResourceArn: string;
  /** The keys of the tags to be removed. */
  TagKeys: string[];
}

/** Config Service service binding for Step Functions SDK integrations. */
export class ConfigService {
  constructor() {}

  associateResourceTypes<T>(params: AssociateResourceTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchGetAggregateResourceConfig<T>(params: BatchGetAggregateResourceConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchGetResourceConfig<T>(params: BatchGetResourceConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAggregationAuthorization<T>(params: DeleteAggregationAuthorizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteConfigRule<T>(params: DeleteConfigRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteConfigurationAggregator<T>(params: DeleteConfigurationAggregatorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteConfigurationRecorder<T>(params: DeleteConfigurationRecorderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteConformancePack<T>(params: DeleteConformancePackInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDeliveryChannel<T>(params: DeleteDeliveryChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEvaluationResults<T>(params: DeleteEvaluationResultsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteOrganizationConfigRule<T>(params: DeleteOrganizationConfigRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteOrganizationConformancePack<T>(params: DeleteOrganizationConformancePackInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePendingAggregationRequest<T>(params: DeletePendingAggregationRequestInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRemediationConfiguration<T>(params: DeleteRemediationConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRemediationExceptions<T>(params: DeleteRemediationExceptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteResourceConfig<T>(params: DeleteResourceConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRetentionConfiguration<T>(params: DeleteRetentionConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteServiceLinkedConfigurationRecorder<T>(params: DeleteServiceLinkedConfigurationRecorderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStoredQuery<T>(params: DeleteStoredQueryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deliverConfigSnapshot<T>(params: DeliverConfigSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAggregateComplianceByConfigRules<T>(params: DescribeAggregateComplianceByConfigRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAggregateComplianceByConformancePacks<T>(params: DescribeAggregateComplianceByConformancePacksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAggregationAuthorizations<T>(params: DescribeAggregationAuthorizationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeComplianceByConfigRule<T>(params: DescribeComplianceByConfigRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeComplianceByResource<T>(params: DescribeComplianceByResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConfigRuleEvaluationStatus<T>(params: DescribeConfigRuleEvaluationStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConfigRules<T>(params: DescribeConfigRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConfigurationAggregators<T>(params: DescribeConfigurationAggregatorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConfigurationAggregatorSourcesStatus<T>(params: DescribeConfigurationAggregatorSourcesStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConfigurationRecorders<T>(params: DescribeConfigurationRecordersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConfigurationRecorderStatus<T>(params: DescribeConfigurationRecorderStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConformancePackCompliance<T>(params: DescribeConformancePackComplianceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConformancePacks<T>(params: DescribeConformancePacksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConformancePackStatus<T>(params: DescribeConformancePackStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDeliveryChannels<T>(params: DescribeDeliveryChannelsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDeliveryChannelStatus<T>(params: DescribeDeliveryChannelStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOrganizationConfigRules<T>(params: DescribeOrganizationConfigRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOrganizationConfigRuleStatuses<T>(params: DescribeOrganizationConfigRuleStatusesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOrganizationConformancePacks<T>(params: DescribeOrganizationConformancePacksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOrganizationConformancePackStatuses<T>(params: DescribeOrganizationConformancePackStatusesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePendingAggregationRequests<T>(params: DescribePendingAggregationRequestsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRemediationConfigurations<T>(params: DescribeRemediationConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRemediationExceptions<T>(params: DescribeRemediationExceptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRemediationExecutionStatus<T>(params: DescribeRemediationExecutionStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRetentionConfigurations<T>(params: DescribeRetentionConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateResourceTypes<T>(params: DisassociateResourceTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAggregateComplianceDetailsByConfigRule<T>(params: GetAggregateComplianceDetailsByConfigRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAggregateConfigRuleComplianceSummary<T>(params: GetAggregateConfigRuleComplianceSummaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAggregateConformancePackComplianceSummary<T>(params: GetAggregateConformancePackComplianceSummaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAggregateDiscoveredResourceCounts<T>(params: GetAggregateDiscoveredResourceCountsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAggregateResourceConfig<T>(params: GetAggregateResourceConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getComplianceDetailsByConfigRule<T>(params: GetComplianceDetailsByConfigRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getComplianceDetailsByResource<T>(params: GetComplianceDetailsByResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getComplianceSummaryByConfigRule<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getComplianceSummaryByResourceType<T>(params: GetComplianceSummaryByResourceTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getConformancePackComplianceDetails<T>(params: GetConformancePackComplianceDetailsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getConformancePackComplianceSummary<T>(params: GetConformancePackComplianceSummaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCustomRulePolicy<T>(params: GetCustomRulePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDiscoveredResourceCounts<T>(params: GetDiscoveredResourceCountsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getOrganizationConfigRuleDetailedStatus<T>(params: GetOrganizationConfigRuleDetailedStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getOrganizationConformancePackDetailedStatus<T>(params: GetOrganizationConformancePackDetailedStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getOrganizationCustomRulePolicy<T>(params: GetOrganizationCustomRulePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getResourceConfigHistory<T>(params: GetResourceConfigHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getResourceEvaluationSummary<T>(params: GetResourceEvaluationSummaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getStoredQuery<T>(params: GetStoredQueryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAggregateDiscoveredResources<T>(params: ListAggregateDiscoveredResourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listConfigurationRecorders<T>(params: ListConfigurationRecordersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listConformancePackComplianceScores<T>(params: ListConformancePackComplianceScoresInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDiscoveredResources<T>(params: ListDiscoveredResourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listResourceEvaluations<T>(params: ListResourceEvaluationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStoredQueries<T>(params: ListStoredQueriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putAggregationAuthorization<T>(params: PutAggregationAuthorizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putConfigRule<T>(params: PutConfigRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putConfigurationAggregator<T>(params: PutConfigurationAggregatorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putConfigurationRecorder<T>(params: PutConfigurationRecorderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putConformancePack<T>(params: PutConformancePackInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDeliveryChannel<T>(params: PutDeliveryChannelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putEvaluations<T>(params: PutEvaluationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putExternalEvaluation<T>(params: PutExternalEvaluationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putOrganizationConfigRule<T>(params: PutOrganizationConfigRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putOrganizationConformancePack<T>(params: PutOrganizationConformancePackInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRemediationConfigurations<T>(params: PutRemediationConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRemediationExceptions<T>(params: PutRemediationExceptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putResourceConfig<T>(params: PutResourceConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRetentionConfiguration<T>(params: PutRetentionConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putServiceLinkedConfigurationRecorder<T>(params: PutServiceLinkedConfigurationRecorderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putStoredQuery<T>(params: PutStoredQueryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  selectAggregateResourceConfig<T>(params: SelectAggregateResourceConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  selectResourceConfig<T>(params: SelectResourceConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startConfigRulesEvaluation<T>(params: StartConfigRulesEvaluationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startConfigurationRecorder<T>(params: StartConfigurationRecorderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startRemediationExecution<T>(params: StartRemediationExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startResourceEvaluation<T>(params: StartResourceEvaluationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopConfigurationRecorder<T>(params: StopConfigurationRecorderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
