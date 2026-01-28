# 🌿 Academic Arboretum (AI-Counsellor)

> A nature-inspired, AI-driven platform guiding students through their study-abroad journey. 
> "Cultivating your academic future with growth intelligence."

This project is a full-stack web application designed to act as an automated career and university counsellor. It uses a metaphorical "Arboretum" (Garden) theme where students "plant" their aspirations and "grow" their career paths through structured phases.

---

## 🌟 Key Features

-   **Immersive Nature Aesthetics**: A premium, mobile-responsive UI built with Glassmorphism, deep forest colors, and smooth Framer Motion animations.
-   **AI-Powered Guidance**:
    -   **AI Oracle**: Integrated Chatbot (OpenRouter LLMs) providing personalized advice based on student profiles.
    -   **Fit Analysis**: Automated calculation of "AI Fit Score" for universities.
-   **Structured Progression System**:
    -   **Phase 1 (Discovery)**: Interactive Onboarding to determine "Academic Soil".
    -   **Phase 2 (Selection)**: Browsing and shortlisting universities.
    -   **Phase 3 (Locking)**: Committing to a specific target to unlock roadmaps.
    -   **Phase 4 (Application)**: Step-by-step document preparation (SOPs, Visas).
-   **Secure Authentication**: Robust Email/Password authentication powered by **Supabase Auth**.
-   **Real-time Profile Management**: Persistent user data storage via Supabase Database.
-   **Mobile-First Design**: Optimized navigation and layouts for all device sizes.

---

## 🛠️ Technology Stack

### **Frontend (Client)**
-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom "Nature" Color Palette)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **HTTP Client**: Axios
-   **Auth Integration**: `@supabase/auth-helpers-nextjs` / Supabase JS Client

### **Backend (Server)**
-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
-   **AI Integration**: [OpenRouter API](https://openrouter.ai/) (Access to GPT-4, Claude, etc.)
-   **Security**: Helmet, CORS, JWT
-   **Logging**: Morgan

---

## 📂 Project Structure

```
AI-Counsellor/
├── client/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/            # App Router Pages (Home, Dashboard, Login, etc.)
│   │   ├── components/     # Reusable UI Components (ChatBox, Cards, Nav)
│   │   ├── lib/            # Utilities (Supabase client, Mock Data)
│   │   └── ...
│   ├── public/             # Static Assets
│   └── ...
│
├── backend/                # Node.js/Express Server
│   ├── src/
│   │   ├── config/         # Database & AI Configuration
│   │   ├── controllers/    # Route Logic
│   │   ├── models/         # Data Models (if using ORM)
│   │   ├── routes/         # API Endpoint Definitions (AI, Profile, Unis)
│   │   └── index.js        # Server Entry Point
│   └── ...
│
└── README.md               # Project Documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js (v18 or higher)
-   npm or yarn
-   A Supabase Project (URL & Anon Key)
-   An OpenRouter API Key

### 1️⃣ Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    Create a `.env` file in the `backend/` root:
    ```env
    PORT=5000
    NODE_ENV=development
    
    # Supabase Configuration
    DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[db]
    NEXT_PUBLIC_PROJECT_URL=https://[your-project-ref].supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-supabase-anon-key]
    
    # AI Service
    OPENROUTER_API_KEY=[your-openrouter-key]
    
    # Security (Optional for Local, Required for Prod)
    CLIENT_URL=http://localhost:3000
    ```
4.  Start the Server:
    ```bash
    npm run dev   # Runs with Nodemon (Auto-restart)
    # OR
    npm start     # Runs normally
    ```
    *Server will start on `http://localhost:5000`*

### 2️⃣ Client Setup

1.  Navigate to the client directory:
    ```bash
    cd ../client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    Create a `.env.local` file in the `client/` root:
    ```env
    # Supabase Configuration
    NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-supabase-anon-key]
    
    # Backend API Connection
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```
4.  Start the Application:
    ```bash
    npm run dev
    ```
    *App will be live at `http://localhost:3000`*

---

## 🚀 Deployment Guide

### **Backend (e.g., Render / Railway)**
1.  **Build Command**: `npm install` (Node.js doesn't need a build step).
2.  **Start Command**: `npm start`.
3.  **Environment Variables**: copy all values from `backend/.env` to the host's environment settings. Add `CLIENT_URL` pointing to your deployed frontend domain.

### **Frontend (e.g., Vercel / Netlify)**
1.  **Framework Preset**: Next.js.
2.  **Build Command**: `next build` (or `npm run build`).
3.  **Output Directory**: `.next` (Usually auto-detected).
4.  **Environment Variables**: copy all values from `client/.env.local`. **Crucial**: Update `NEXT_PUBLIC_API_URL` to point to your *deployed* backend URL (e.g., `https://your-backend.onrender.com/api`).

---

## 🧪 API Endpoints

-   **`POST /api/profile`**: Create or update user profile.
-   **`GET /api/profile/:userId`**: Fetch user profile data.
-   **`POST /api/ai/chat`**: Send prompt to AI Oracle and get structured actions.
-   **`GET /api/universities`**: Fetch university list (with filtering).

---

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

---

**Developed for the Future of Education.**
