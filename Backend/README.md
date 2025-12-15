# Backend for America's Blood Centers AI Assistant

## Overview

The backend of the America's Blood Centers AI Assistant is responsible for managing data sources, processing user queries, and automating deployments. It leverages AWS services orchestrated through AWS CDK to provide a scalable and maintainable serverless infrastructure.

The backend uses **Lambda Function URLs** for direct HTTP access, providing simple configuration and cost-effective operation with built-in CORS support.

## Architecture

The backend architecture is built using AWS services defined as code via AWS CDK. It consists of the following key components:

### Key Components

- **Amazon S3 Buckets**:
  - `DataSourceBucket`: Stores text files containing URLs to be crawled and document files for indexing by Amazon Q Business.
  - `FrontendBuildBucket`: Stores zipped frontend build artifacts for automated deployment.

- **Amazon Q Business**:
  - An application with an index and retriever for conversational AI capabilities.
  - Multiple data sources are created: web crawlers for URL files and S3 document sources for uploaded files.

- **AWS Lambda Functions**:
  - Manage data sources, handle chat queries via Function URLs, and automate frontend deployments.

- **Lambda Function URLs**:
  - Provides direct HTTP endpoints for chat and health check functionality.
  - Offers simple configuration and cost-effective operation.
  - Includes built-in CORS support for cross-origin requests.

- **EventBridge**:
  - Monitors S3 uploads to the `FrontendBuildBucket` and triggers automated deployments.

### Lambda Functions

- **DataSourceCreator**: Creates data sources in Amazon Q Business based on files in S3
- **ChatLambdaFunction**: Handles chat queries and health checks via Lambda Function URL
- **AmplifyDeployer**: Automates frontend deployments when new builds are uploaded

## Data Sources

The system uses a **dual approach** for comprehensive content indexing:

### 1. Web Crawler Sources
The web crawler automatically indexes:
- **Main Websites**: `americasblood.org`, `donatingblood.org`
- **Web Pages**: Educational resources, FAQs, blood center locator
- **Linked PDFs**: Automatically discovers and indexes PDF documents linked from web pages

### 2. Direct PDF Document Sources
Key documents are also stored directly in S3 for guaranteed indexing:
- **U.S. Blood Donation Statistics and Public Messaging Guide (2024)**
- **America's Blood Centers 2025 Advocacy Agenda**
- **Blood Transfusions and Hospice Care Guidelines**
- **Cutting Red Tape to Better Support Patients**
- **Improving Patient Access to Blood Transfusions on Ambulances**
- **Strengthening Cyber Resilience of the Blood Community**
- **Timeline of Blood Donation Process**
- **Blood 101: Snapshot of America's Blood Supply**
- **Safeguarding Blood Supply Against Vector-Borne Illnesses**
- **Alpha Gal Syndrome FAQ**
- **FDA IDA Change FAQ**
- **New Eligibility Criteria Awareness**
- **Why Donor Diversity Is Critical to Patient Care**
- **Ensuring the Safety of the U.S. Blood Supply**

### PDF Handling Strategy

**Automatic PDF Discovery**: The web crawler finds and indexes PDFs linked from web pages
**Direct PDF Storage**: Critical documents are also stored in S3 for guaranteed access
**Dual Coverage**: This approach ensures no important content is missed

## Deployment

Use the `deploy.sh` script for automated deployment:

```bash
chmod +x deploy.sh
./deploy.sh
```

The script will:
1. Create necessary IAM roles
2. Set up CodeBuild project
3. Deploy backend infrastructure
4. Create Amplify application
5. Build and deploy frontend

## Configuration

The backend relies on several parameters:

- `projectName`: Used to name resources uniquely (default: `americas-blood-centers`)
- `urlFilesPath`: Location of the URL files for data sources (default: `data-sources`)
- `amplifyAppName` and `amplifyBranchName`: For frontend deployment
- `AWS_REGION`: The region where resources are deployed (default: `us-west-2`)

## Environment Variables

- `QBUSINESS_APPLICATION_ID`: Set in the `ChatLambdaFunction` to identify the Amazon Q Business application
- `DEBUG`: Optional flag for detailed error logging
- `AMPLIFY_APP_ID` and `AMPLIFY_BRANCH_NAME`: Set in the `AmplifyDeployer` Lambda

## Adding New Data Sources

### Web URLs
Add new URLs to `data-sources/urls1.txt` (one per line) and redeploy.

### Documents
1. **Automatic**: Place PDF, DOCX, XLSX, or CSV files in the `data-sources` directory and redeploy
2. **Download Script**: Run `./download-pdfs.sh` to automatically download all America's Blood Centers PDFs

### PDF Download
To download all the key PDFs for local indexing:
```bash
cd Backend
chmod +x download-pdfs.sh
./download-pdfs.sh
```

This downloads 14 key PDF documents with clean filenames for S3 indexing.

## Monitoring

- All Lambda functions log to AWS CloudWatch
- Lambda Function URLs provide built-in metrics
- Amazon Q Business provides its own monitoring capabilities
- EventBridge rules can be monitored for deployment automation

## Important Notes

- The project is optimized for the `us-west-2` region
- Uses anonymous access for public availability
- Automatically starts sync jobs after data source creation
- Supports up to 50 data sources per Q Business application