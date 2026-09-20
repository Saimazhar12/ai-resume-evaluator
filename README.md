# 🤖 ResumeAI — AI-Powered Resume Evaluator

ResumeAI is an AI-powered app that reviews resumes and provides feedback on **ATS compatibility, skills, structure, and improvements**.

Built as an internship project at **Internee.pk**.

> 📄 Upload a resume → 📊 Get scores → 🧩 Find skill gaps → 💡 Get improvement suggestions → 💬 Chat with AI

## 🌐 Live Demo

🚀 **[Try the Live Demo](https://ai-resume-evaluator-xjf6.vercel.app/)**


## 🛠️ Tech Stack

### 🎨 Frontend

* ⚛️ React + TypeScript
* ⚡ Vite
* 🎨 Tailwind CSS
* 🔹 Lucide React

### 🧠 Backend

* 🐍 Python + Flask
* 🔗 LangChain
* ✨ Google Gemini
* 📄 pypdf / python-docx

### ☁️ Deployment

* ▲ Vercel

## 🏗️ Architecture

```text
⚛️ React + TypeScript
        ↓
🌐 Flask REST API
        ↓
🔗 LangChain
        ↓
✨ Google Gemini
```

🔐 The Gemini API key is stored only on the backend and is never exposed to the frontend.

## ✨ Features

* 📄 Upload **PDF or DOCX** resumes
* 🎯 Add a **target job description**
* 📊 Get **overall and ATS scores**
* 🧩 Find **existing and suggested skills**
* 🧱 Get **resume structure feedback**
* 🗺️ Get an **improvement plan**
* 💬 **Chat with AI** about your resume
* 📱 Responsive UI


## 📁 Project Structure

```text
ai-resume-evaluator/
├── app.py                     # Flask routes: /, /api/analyze, /api/chat
├── analyzer/
│   ├── __init__.py
│   ├── parser.py              # PDF/DOCX → plain text
│   └── chain.py               # LangChain + Gemini analysis
├── requirements.txt
├── vercel.json                # Backend timeout configuration
├── .env.example               # API and environment variables
├── .gitignore
├── README.md
│
└── frontend/                  # React + TypeScript + Vite + Tailwind UI
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── tsconfig.node.json
    ├── .env.example           # VITE_API_URL
    ├── public/
    │   └── favicon.svg
    │
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── index.css
        ├── vite-env.d.ts
        │
        ├── components/
        │   ├── Logo.tsx
        │   ├── Navbar.tsx
        │   ├── Hero.tsx
        │   ├── ResumeUploader.tsx
        │   ├── JobDescriptionInput.tsx
        │   ├── AnalyzeButton.tsx
        │   ├── ScoreCard.tsx
        │   ├── ScoreOverview.tsx
        │   ├── SummaryCard.tsx
        │   ├── StrengthsCard.tsx
        │   ├── FormattingCard.tsx
        │   ├── SkillsSection.tsx
        │   ├── ImprovementTimeline.tsx
        │   ├── AskAI.tsx
        │   ├── LoadingState.tsx
        │   ├── ErrorState.tsx
        │   ├── EmptyState.tsx
        │   └── Footer.tsx
        │
        ├── services/
        │   └── api.ts           # Flask API calls
        │
        └── types/
            └── resume.ts        # API response types
```


## 🚀 Getting Started

### 1️⃣ Backend

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env`:

```env
GOOGLE_API_KEY=your-api-key
GEMINI_MODEL=gemini-3.5-flash-lite
```

Run:

```bash
python app.py
```

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Set the API URL:

```env
VITE_API_URL=http://localhost:5000
```

🌐 Frontend: `http://localhost:5173`

## 🔌 API

| Method  | Endpoint       | Purpose           |
| ------- | -------------- | ----------------- |
| 🟢 GET  | `/`            | API health check  |
| 🟡 POST | `/api/analyze` | Analyze resume    |
| 🔵 POST | `/api/chat`    | Chat about resume |

## 📝 Notes

* 📄 Supports text-based PDF and DOCX files
* 🚫 Scanned PDFs are not supported
* 🔐 No authentication or database currently

## 👨‍💻 Author

**Saim Azhar**

