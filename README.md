# AutoCaption AI 🤖📸

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Express-5.1-000000?style=flat&logo=express" alt="Express">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat&logo=cloudflare" alt="Cloudflare">
  <img src="https://img.shields.io/badge/Render-Deploy-46E3B7?style=flat&logo=render" alt="Render">
</p>

> **Try it live:** [https://autocaption-app.pages.dev](https://autocaption-app.pages.dev)

---

## 🎯 Project Overview

**AutoCaption AI** is an intelligent social media caption generator that uses computer vision and large language models to analyze images and generate platform-specific captions for multiple social media platforms including Instagram, Twitter/X, WhatsApp, Facebook, and LinkedIn.

This project demonstrates full-stack development with modern technologies, cloud deployment, and AI integration—showcasing how to build production-ready applications that scale.

---

## 🚀 Key Features

| Feature | Description |
|---------|-------------|
| **AI-Powered Analysis** | Uses GPT-4 Vision to understand and describe images |
| **Multi-Platform Captions** | Generates optimized captions for 5 different social platforms |
| **Multi-Language Support** | Supports English, Indonesian, Japanese, and Spanish |
| **Image Upload** | Secure image upload with automatic Cloudinary storage and cleanup |
| **Instant Delivery** | Fast generation with intelligent caching strategies |

---

## 🛠️ Technology Stack

### Frontend
- **React 19** with hooks and functional components
- **TypeScript** for type-safe development
- **TailwindCSS 4** for modern, responsive styling
- **Zustand** for lightweight state management
- **Vite** for lightning-fast development and builds

### Backend
- **Express.js** with TypeScript
- **Multer** for multipart file handling
- **Pino** for structured JSON logging
- **Cloudinary** for image storage and management
- **GitHub Models** (OpenAI GPT-4o) for AI-powered caption generation

### Infrastructure
- **Frontend:** Cloudflare Pages (Global CDN, SSL)
- **Backend:** Render (Web Service with auto-scaling)
- **Storage:** Cloudinary (Image management)
- **Monitoring:** UptimeRobot (Free tier monitoring)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Cloudflare Pages                         │
│                        (Static Hosting)                         │
│  ┌─────────────────┐                                            │
│  │   React 19 UI   │                                            │
│  └────────┬────────┘                                            │
└───────────┼─────────────────────────────────────────────────────┘
            │
            │ HTTPS (API Call)
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Render (Backend)                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │  Express   │─►│ Cloudinary   │─►│   GitHub Models API      │ │
│  │  API Server │  │  (Upload)    │  │   (GPT-4 Vision)         │ │
│  └─────────────┘  └──────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
autocaption/
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   │   ├── api/             # API service layer
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages
│   │   ├── store/           # Zustand state management
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   └── vite.config.ts       # Vite configuration
│
├── backend/                  # Express + TypeScript backend API
│   ├── src/
│   │   ├── main.ts          # Express server entry point
│   │   ├── generate.ts     # AI caption generation logic
│   │   ├── config.ts        # Environment & Cloudinary config
│   │   ├── logger.ts        # Pino structured logging
│   │   ├── prompt.ts        # AI system prompts
│   │   └── types.ts         # TypeScript interfaces
│   ├── Dockerfile           # Container configuration
│   └── package.json
│
└── README.md                # This file
```

---

## 💻 Development Setup

### Prerequisites
- Node.js 20+
- npm or yarn
- Git
- Cloudinary account (free tier)
- GitHub account with AI models access

### Local Development

```bash
# Clone the repository
git clone https://github.com/Aiyon860/autocaption-app.git
cd autocaption-app

# Setup frontend
cd frontend
npm install
npm run dev

# Setup backend (in another terminal)
cd backend
npm install
npm run dev
```

### Environment Variables

**Backend (.env):**
```env
GITHUB_TOKEN=your_github_token
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3001
```

---

## 🔧 Production Deployment

### Frontend → Cloudflare Pages
1. Connect GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL`

### Backend → Render
1. Connect GitHub repository to Render
2. Select "Web Service"
3. Set root directory: `backend`
4. Build command: `npm run build`
5. Start command: `npm run start`
6. Add environment variables in Render dashboard

---

## 📊 What This Project Demonstrates

### Technical Skills
- ✅ Full-stack JavaScript/TypeScript development
- ✅ React ecosystem (Hooks, Context, State Management)
- ✅ RESTful API design and implementation
- ✅ TypeScript best practices and type safety
- ✅ Environment-based configuration management

### Cloud & DevOps
- ✅ Multi-platform deployment (Cloudflare + Render)
- ✅ Docker containerization
- ✅ CI/CD through GitHub integration
- ✅ Infrastructure-as-code principles

### AI Integration
- ✅ Large Language Model integration
- ✅ Computer Vision API usage
- ✅ Prompt engineering for domain-specific output

### Best Practices
- ✅ Structured logging for production debugging
- ✅ Error handling and graceful degradation
- ✅ Resource cleanup (Cloudinary image deletion)
- ✅ Security (environment variables, CORS)

---

## 🔮 Future Enhancements

- [ ] Add user authentication for saved captions
- [ ] Implement caption history and favorites
- [ ] Add custom prompt templates
- [ ] Integrate more AI models
- [ ] Add analytics dashboard

---

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

## 👤 Author

**Daniel Aiyon** - Full Stack Developer
- GitHub: [@Aiyon860](https://github.com/Aiyon860)
- Live Demo: [https://autocaption-app.pages.dev](https://autocaption-app.pages.dev)

---

<div align="center">

⭐ Star this repository if you found it helpful!

</div>