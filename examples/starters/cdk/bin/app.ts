#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { OrderStack } from '../lib/stack';
import { NotificationStack } from '../lib/notification-stack';
import { DataPipelineStack } from '../lib/data-pipeline-stack';
import { EventDrivenStack } from '../lib/event-driven-stack';
import { AdvancedWorkflowStack } from '../lib/advanced-workflow-stack';
import { BatchProcessingStack } from '../lib/batch-processing-stack';

const app = new cdk.App();

new OrderStack(app, 'OrderStack');
new NotificationStack(app, 'NotificationStack');
new DataPipelineStack(app, 'DataPipelineStack');
new EventDrivenStack(app, 'EventDrivenStack');
new AdvancedWorkflowStack(app, 'AdvancedWorkflowStack');
new BatchProcessingStack(app, 'BatchProcessingStack');
