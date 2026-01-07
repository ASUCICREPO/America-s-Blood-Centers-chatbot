# America's Blood Centers AI Chatbot

An intelligent AI-powered chatbot that helps users learn about blood donation, find donation centers, and get real-time information about blood supply status. Built with AWS Bedrock Knowledge Base and a modern React frontend for America's Blood Centers.

## Demo Video

<p align="center">
  <img src="./docs/media/user-interface.gif" alt="America's Blood Centers Chatbot Demo" width="640" />
</p>

> **Note:** Please add a demo GIF at `docs/media/user-interface.gif`

## Index

| Description | Link |
|-------------|------|
| Overview | [Overview](#overview) |
| Architecture | [Architecture](#architecture-diagram) |
| Detailed Architecture | [Architecture Deep Dive](docs/architectureDeepDive.md) |
| Deployment | [Deployment Guide](docs/deploymentGuide.md) |
| User Guide | [User Guide](docs/userGuide.md) |
| API Documentation | [API Documentation](docs/APIDoc.md) |
| Modification Guide | [Modification Guide](docs/modificationGuide.md) |
| Credits | [Credits](#credits) |
| License | [License](#license) |

## Overview

America's Blood Centers AI Chatbot is a conversational AI assistant designed to provide comprehensive information about blood donation. It enables users to get instant, accurate answers about eligibility, donation process, blood center locations, and current blood supply status through natural language conversations.

### Key Features

- **AI-Powered Conversations** using AWS Bedrock with Claude 3.5 Sonnet
- **Knowledge Base Integration** with blood donation documents and website content
- **Bilingual Support** for English and Spanish users
- **Real-time Information** with daily content updates
- **Source Citations** with links to authoritative information
- **Admin Dashboard** for monitoring conversations and managing data sources
- **Blood Center Locator** integration for finding nearby donation locations
- **Responsive Design** optimized for both desktop and mobile devices

## Architecture Diagram

![Architecture Diagram](./docs/America's_Blood_Centers.png)

The application implements a serverless architecture on AWS, combining:

- **Frontend**: React application hosted on AWS Amplify
- **Backend**: AWS CDK-deployed infrastructure with API Gateway and Lambda
- **AI Layer**: AWS Bedrock Knowledge Base with document and web content
- **Data Storage**: S3 for documents, DynamoDB for conversation history
- **Authentication**: Amazon Cognito for admin dashboard access

For a detailed deep dive into the architecture, see [docs/architectureDeepDive.md](docs/architectureDeepDive.md).

## Deployment

For detailed deployment instructions, including prerequisites and step-by-step guides, see [docs/deploymentGuide.md](docs/deploymentGuide.md).

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/America-Blood-Centers-chatbot.git
cd America-Blood-Centers-chatbot/Backend

# Run the deployment script
chmod +x deploy.sh
./deploy.sh
```

## User Guide

For detailed usage instructions with screenshots, see [docs/userGuide.md](docs/userGuide.md).

## API Documentation

For complete API reference including chat endpoints, admin APIs, and authentication, see [docs/APIDoc.md](docs/APIDoc.md).

## Modification Guide

For developers looking to extend or customize this project, see [docs/modificationGuide.md](docs/modificationGuide.md).

## Directory Structure

```
├── Backend/
│   ├── bin/
│   │   └── bedrock-stack.ts        # CDK app entry point
│   ├── lambda/
│   │   ├── chat-lambda/            # Main chat handler with streaming
│   │   └── sync-operations/        # Data source management
│   ├── lib/
│   │   └── bedrock-chatbot-stack.ts # Main CDK stack definition
│   ├── data-sources/               # Knowledge base content
│   ├── deploy.sh                   # One-command deployment script
│   ├── cdk.json
│   ├── package.json
│   └── tsconfig.json
├── Frontend/
│   ├── src/
│   │   ├── admin/                  # Admin login and dashboard
│   │   ├── Components/             # Reusable UI components
│   │   ├── services/               # API and authentication services
│   │   ├── utilities/              # Constants and helper functions
│   │   ├── App.js                  # Main application component
│   │   └── index.js                # Application entry point
│   ├── public/
│   │   ├── logo.png               # America's Blood Centers logo
│   │   └── index.html
│   └── package.json
├── docs/
│   ├── architectureDeepDive.md
│   ├── deploymentGuide.md
│   ├── userGuide.md
│   ├── APIDoc.md
│   ├── modificationGuide.md
│   ├── media/                      # Screenshots and diagrams
│   └── America's_Blood_Centers.png # Architecture diagram
├── LICENSE
└── README.md
```

## Features

### Core Functionality
- **Intelligent Q&A**: Natural language processing for blood donation questions
- **Bilingual Support**: Full English and Spanish language support
- **Source Attribution**: Every response includes citations to authoritative sources
- **Real-time Updates**: Daily synchronization of blood supply and center information

### Data Sources
- **PDF Documents**: Official guidelines, statistics, and educational materials
- **Website Content**: Live content from americasblood.org including donation centers
- **Daily Sync**: Automated updates of time-sensitive information

### Admin Features
- **Conversation Monitoring**: View and analyze chat interactions
- **Data Source Management**: Manual sync triggers and status monitoring
- **System Health**: Real-time status of all system components
- **Analytics Dashboard**: Usage statistics and popular questions

### Technical Features
- **Serverless Architecture**: Auto-scaling AWS Lambda functions
- **Vector Search**: Semantic search using Amazon Bedrock Knowledge Base
- **Advanced PDF Processing**: Bedrock Data Automation with multimodal support
- **Secure Authentication**: Amazon Cognito for admin access

## Data Flow

1. **User Interaction**: User sends question through React frontend
2. **API Gateway**: Routes request to Chat Lambda function
3. **Knowledge Base Query**: Lambda queries Bedrock Knowledge Base
4. **Vector Search**: OpenSearch performs semantic search on embeddings
5. **AI Response**: Bedrock generates contextual response using retrieved information
6. **Source Attribution**: System adds citations and returns formatted response

## Security & Compliance

- **Data Privacy**: No personal information stored in conversation logs
- **Secure Authentication**: JWT-based admin authentication via Cognito
- **Encrypted Communication**: All data encrypted in transit and at rest
- **Access Control**: Fine-grained IAM permissions for all AWS resources

## Credits

This application was developed for America's Blood Centers to support their mission of ensuring a safe and adequate blood supply for patients in need.

**Built with:**
- AWS Bedrock for AI/ML capabilities
- React and Material-UI for the frontend
- AWS CDK for infrastructure as code
- OpenSearch Serverless for vector search

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.