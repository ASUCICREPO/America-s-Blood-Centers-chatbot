# America's Blood Centers AI Assistant

A comprehensive chatbot application designed to provide users with real-time information and assistance related to America's Blood Centers services, powered by Amazon Q Business and featuring a user-friendly interface for seamless interaction.

This application combines natural language processing with a knowledge base of America's Blood Centers' services, blood donation information, and educational resources, delivering accurate, context-aware responses to user queries. It includes a responsive chat interface, FAQ prompts, and source attribution for transparency. The project is built with a serverless architecture using AWS services, ensuring scalability and ease of deployment.

## Key Features

- **AI-powered responses** using Amazon Q Business
- **Responsive React-based frontend** with Material-UI components
- **Predefined FAQ prompts** for common blood donation queries
- **Source attribution** with clickable links to original content
- **Serverless backend** with AWS Lambda Function URLs (no API Gateway required)
- **Automated deployment** via AWS CodeBuild and CloudShell
- **Multi-source indexing** supporting web content and document uploads
- **Anonymous access** with CORS-enabled Lambda Function URLs
- **Real-time chat interface** with enhanced loading indicators
- **Document support** for PDF, DOCX, XLSX, and CSV files

## Architecture Overview

The application uses a modern serverless architecture:

- **Frontend**: React application hosted on AWS Amplify
- **Backend**: AWS Lambda with Function URLs for direct HTTP access
- **AI Engine**: Amazon Q Business for natural language processing
- **Data Sources**: S3-based web crawler and document indexing
- **Deployment**: Automated via AWS CDK and CodeBuild

### Architecture Features

- **Lambda Function URLs** provide direct HTTP access with simple, cost-effective operation
- **Built-in CORS handling** in Lambda functions for seamless cross-origin requests
- **Stateless chat operations** for improved scalability and reliability
- **Enhanced source attribution** with support for both web and document sources

## Repository Structure

```
.
├── Backend/                        # AWS CDK infrastructure and backend logic
│   ├── bin/                        # CDK app entry point
│   │   └── americas-blood-centers-cdk.ts
│   ├── data-sources/               # Data source files for indexing
│   │   ├── urls1.txt              # URLs for web crawling (main websites)
│   │   ├── urls2.txt              # Additional URLs for web crawling
│   │   └── *.pdf, *.docx, *.xlsx, *.csv # Document files for indexing
│   ├── lambda/                     # Lambda function code
│   │   └── lambda_function.py     # Chat handler with Function URL support
│   ├── lib/                       # CDK stack definitions
│   │   └── americas-blood-centers-stack.ts # Main CDK stack with Lambda Function URLs
│   ├── buildspec.yml              # AWS CodeBuild configuration
│   ├── cdk.json                   # CDK configuration
│   ├── deploy.sh                  # Deployment automation script
│   ├── package.json               # Backend dependencies and scripts
│   ├── package-lock.json          # Locked dependency versions
│   ├── tsconfig.json              # TypeScript configuration
│   ├── .gitignore                 # Git ignore patterns
│   └── README.md                  # Backend-specific documentation
├── Frontend/                       # React-based web application
│   ├── public/                    # Static assets and images
│   │   ├── favicon.ico            # Browser favicon
│   │   ├── index.html             # Main HTML template
│   │   ├── manifest.json          # PWA manifest
│   │   └── robots.txt             # Search engine robots file
│   ├── src/                       # React source code
│   │   ├── Components/            # React components
│   │   │   ├── AppHeader.jsx      # Application header component
│   │   │   ├── BotReply.jsx       # Bot message display component
│   │   │   ├── ChatBody.jsx       # Main chat interface with Function URL integration
│   │   │   ├── ChatHeader.jsx     # Chat section header
│   │   │   ├── ChatInput.jsx      # User input component
│   │   │   ├── AmericasBloodCentersLogo.jsx # Custom SVG logo component
│   │   │   ├── FAQExamples.jsx    # FAQ prompt buttons
│   │   │   ├── LeftNav.jsx        # Sidebar navigation
│   │   │   └── UserReply.jsx      # User message display component
│   │   ├── utilities/             # Shared utilities and configuration
│   │   │   ├── constants.js       # API endpoints and theme constants
│   │   │   ├── createMessageBlock.js # Message object creation utility
│   │   │   └── theme.js           # Material-UI theme configuration
│   │   ├── App.js                 # Main React application component
│   │   ├── App.css                # Application styles
│   │   ├── index.js               # React application entry point
│   │   └── index.css              # Global styles
│   ├── package.json               # Frontend dependencies and scripts
│   ├── package-lock.json          # Locked dependency versions
│   ├── .gitignore                 # Git ignore patterns
├── docs/                          # Documentation and assets
│   └── architecture.png           # Architecture diagram
├── LICENSE                        # Project license
└── README.md                      # Project overview and deployment guide
```

## Data Sources

The chatbot is configured to index content from:

### Web Sources
- **America's Blood Centers**: `http://americasblood.org`
- **Donating Blood**: `http://donatingblood.org`
- **Blood Center Locator**: Find local blood centers
- **Educational Resources**: Blood donation information and guidelines

### Document Sources
- **Blood Donation Statistics and Public Messaging Guide**
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
- **Donor Diversity and Patient Care**
- **Blood Supply Safety Guidelines**
- **COVID Vaccines and Blood Donation FAQ**

## Deployment Instructions

### Prerequisites

- **AWS Account** with permissions for:
  - Amazon Q Business
  - AWS Lambda (including Function URLs)
  - AWS Amplify
  - Amazon S3
  - AWS CodeBuild
  - IAM role/policy management

- **Amazon Q Business Setup**:
  1. Navigate to Amazon Q Business in AWS Console
  2. Create an application with **anonymous access** enabled
  3. Note the application ID for deployment

### Option 1: Automated Deployment (Recommended)

#### Using AWS CodeBuild and CloudShell

1. **Open AWS CloudShell**:
   - Click the CloudShell icon in the AWS Console navigation bar
   - Wait for the environment to initialize

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/America-s-Blood-Centers-chatbot.git
   cd America-s-Blood-Centers-chatbot/Backend
   ```

3. **Run Deployment Script**:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. **Provide Configuration**:
   - **GitHub URL**: Your forked repository URL
   - **Project Name**: Custom name (default: `americas-blood-centers`)
   - **Other Parameters**: Press Enter for defaults

5. **Monitor Deployment**:
   - Check AWS CodeBuild Console for build progress (~15-20 minutes)
   - Monitor CloudWatch logs for detailed information

6. **Access Application**:
   - Go to AWS Amplify Console
   - Find your application and access the provided URL
   - Test with queries like "How do I donate blood?" or "Where can I find a blood center?"

## Usage

### Sample Questions
- "How do I donate blood?"
- "What are the eligibility requirements for blood donation?"
- "Where can I find a blood center near me?"
- "What is the blood donation process?"
- "How often can I donate blood?"
- "What should I do before donating blood?"
- "What happens to my blood after donation?"
- "Are there any restrictions on blood donation?"

### Data Source Management

1. **Web Content Indexing**:
   - URLs are configured in `Backend/data-sources/urls1.txt`
   - Includes all major America's Blood Centers web pages and PDF documents
   - Web crawler automatically discovers and indexes linked PDFs

2. **PDF Document Handling**:
   - **Automatic Discovery**: Web crawler finds PDFs linked from web pages
   - **Direct Download**: Run `Backend/download-pdfs.sh` to download key PDFs locally
   - **Dual Coverage**: Both approaches ensure comprehensive PDF indexing

3. **Dynamic Content Updates**:
   - Blood supply status pages are crawled regularly
   - Scheduled sync jobs can be configured for daily updates (2 PM EST recommended)
   - Critical pages like blood supply status are prioritized for frequent updates

4. **Manual Sync**:
   - Navigate to Amazon Q Business Console
   - Select your application
   - Trigger sync jobs for immediate content updates

## Technical Architecture

### Data Flow

```
User Query → Amplify Frontend → Lambda Function URL → Amazon Q Business → Indexed Content
     ↑                                                           ↓
     └────────────────────── Response with Sources ───────────────┘
```

### AWS Services Used

- **Amazon Q Business**: AI-powered chat and content indexing
- **AWS Lambda**: Serverless compute with Function URLs
- **AWS Amplify**: Frontend hosting and deployment
- **Amazon S3**: Document storage and web crawler data
- **AWS CodeBuild**: Automated deployment pipeline
- **EventBridge**: Deployment automation triggers
- **IAM**: Security and access management

## Security Considerations

- **Anonymous Access**: Application uses anonymous access for public availability
- **CORS Configuration**: Properly configured for cross-origin requests
- **IAM Roles**: Least privilege access for all AWS services
- **Public S3 Access**: Data bucket allows public read for document sources
- **HTTPS Only**: All communications use HTTPS encryption

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push and create a pull request: `git push origin feature/your-feature`

## License

This project is licensed under the MIT License.

## Contact

For support, contact America's Blood Centers support team.