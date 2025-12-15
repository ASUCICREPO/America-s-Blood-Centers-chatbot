#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AmericasBloodCentersStack } from '../lib/americas-blood-centers-stack';

const app = new cdk.App();

// Get context parameters
const projectName = app.node.tryGetContext('projectName') || 'americas-blood-centers';
const urlFilesPath = app.node.tryGetContext('urlFilesPath') || 'data-sources';
const amplifyAppName = app.node.tryGetContext('amplifyAppName') || `${projectName}-frontend`;
const amplifyBranchName = app.node.tryGetContext('amplifyBranchName') || 'main';

// Get AWS account and region
const account = process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID;
const region = process.env.CDK_DEFAULT_REGION || process.env.AWS_REGION || 'us-west-2';

// Generate unique bucket names
const dataBucketName = app.node.tryGetContext('dataBucketName') || `${projectName}-data-${account}-${region}`;
const frontendBucketName = app.node.tryGetContext('frontendBucketName') || `${projectName}-builds-${account}-${region}`;

new AmericasBloodCentersStack(app, 'AmericasBloodCentersStack', {
  projectName,
  urlFilesPath,
  amplifyAppName,
  amplifyBranchName,
  dataBucketName,
  frontendBucketName,
  env: {
    account,
    region,
  },
});