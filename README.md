# 🚗 Austin AV Intelligence Platform

> **Dual-Source Architecture**: Code in GitHub + Configuration in Notion = Enterprise-Ready AV Platform

A comprehensive autonomous vehicle intelligence platform that combines the power of GitHub for source code management with Notion for live configuration control and project tracking.

## 🏗️ **Dual-Source Architecture**

This project uses an innovative **dual-source approach** designed for enterprise consulting:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   GitHub Repo   │────│   Vercel Deploy  │────│  Notion Config  │
│                 │    │                  │    │                 │
│ • Source Code   │    │ • Auto Deploy   │    │ • Live Config   │
│ • Assets        │    │ • Build Process  │    │ • Project Mgmt  │
│ • Scripts       │    │ • Environment    │    │ • Client Portal │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### **Why Dual-Source?**

- **Developers** work efficiently in GitHub with familiar tools
- **Clients** see live updates and configs in professional Notion workspace  
- **Configuration** changes instantly without code deployments
- **Project tracking** integrated with actual development workflow

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- Notion workspace with integration token
- Vercel account for deployment

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sierracatalina/austin-av-intelligence.git
   cd austin-av-intelligence
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Notion integration token and database IDs
   ```

4. **Sync with Notion**
   ```bash
   npm run notion:sync
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 **Notion Integration Setup**

### 1. Create Notion Integration
1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Create new integration with read/write permissions
3. Copy the integration token

### 2. Share Databases
Share these databases with your integration:
- Source Code Repository
- Data Repository  
- Asset Library
- Automation Scripts
- App Configuration
- Deployment Tracking

### 3. Get Database IDs
From your Notion workspace URLs, extract the database IDs:
```
https://notion.so/workspace/{database-id}?v={view-id}
```

### 4. Configure Environment
Update `.env.local` with your tokens and IDs:
```env
NOTION_TOKEN=secret_your_token_here
NOTION_SOURCE_DB=your_source_database_id
NOTION_CONFIG_PAGE_ID=your_config_page_id
# ... etc
```

## 📁 **Project Structure**

```
austin-av-intelligence/
├── src/
│   ├── lib/notion.js          # Notion API integration
│   ├── pages/api/config.js    # Configuration endpoint
│   ├── components/            # React components
│   └── pages/                 # Next.js pages
├── scripts/
│   └── notion-sync.js         # Manual sync utility
├── data/                      # Processed AV data
├── assets/                    # Media files
├── vercel.json               # Deployment config
└── package.json              # Dependencies
```

## 🛠️ **Available Scripts**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run notion:sync` - Sync with Notion databases
- `npm run deploy` - Deploy to Vercel

## 🌐 **API Endpoints**

### Configuration Management
- `GET /api/config` - Fetch live configuration from Notion

## 🚀 **Deployment**

### Automatic Deployment (Recommended)
1. Connect GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Every push to `main` triggers automatic deployment
4. Notion databases update with deployment status

### Manual Deployment
```bash
npm run build
npm run deploy
```

## 🎯 **Enterprise Features**

### For Consulting Firms
- **Client Portal**: Professional Notion workspace for client updates
- **Live Configuration**: Change settings without code deployments  
- **Project Tracking**: Integrated development and business workflows
- **Asset Management**: Centralized media and resource library

### For Development Teams
- **Familiar Tools**: Standard GitHub workflow for developers
- **API Integration**: Seamless Notion sync with minimal overhead
- **Automated Tracking**: File changes automatically logged in Notion
- **Status Updates**: Real-time deployment and build status

## 📊 **Notion Workspace**

Access the complete project management workspace:
**[Austin AV - Development Hub](https://www.notion.so/Austin-AV-Development-Hub-22032834e3f181738b79e73cb5fea26e)**

Includes:
- 📁 Directory structure tracking
- ⚙️ Live configuration control
- 📊 Deployment monitoring
- 🎨 Asset library management
- 📋 Project documentation

## 🔍 **Autonomous Vehicle Features**

- **Real-time sensor data processing**
- **Advanced computer vision algorithms**
- **Scalable cloud-native architecture**
- **Enterprise-grade security and compliance**
- **Automated testing and deployment pipelines**

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request
6. Changes automatically sync to Notion workspace

## 📝 **License**

MIT License - see [LICENSE](LICENSE) file for details.

## 🏢 **Enterprise Support**

Built for AI consulting firms working with SME automation projects. 

**Key Benefits:**
- Professional client presentations with live data
- Seamless integration of business and technical workflows  
- Real-time project visibility for stakeholders
- Enterprise-grade deployment and monitoring

---

**Built with:** Next.js • Notion API • Vercel • Enterprise Architecture

**Perfect for:** AI Consulting • Enterprise Automation • Client Portals • Professional Development
