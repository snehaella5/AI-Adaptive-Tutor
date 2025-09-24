## Study Buddy AI – Adaptive Tutor Agent

Repository: AI-Adaptive-Tutor

Folder Name: ai-adaptive-tutor

## Overview

Study Buddy AI is an adaptive tutoring agent designed to personalize the learning experience. It integrates an AI-powered chat system with progress tracking to deliver tailored explanations, practice exercises, and improvement recommendations.

The agent uses Gemini API (with optional support for Ollama for running local LLMs) to provide structured, interactive tutoring. Learners can ask questions, receive detailed answers, test themselves with quizzes, and track progress over time.

## Features

### AI Chat Agent
Ask questions and receive structured answers with definitions, examples, quizzes, and recommendations.

### Progress Tracking
Monitors accuracy, provides feedback, and suggests next steps for improvement.

### Adaptive Learning
Generates dynamic next steps based on student responses and performance.

### Multi-Model Support
Works with cloud models (Gemini API) or local models (Ollama) for flexibility.

### Full-Stack Architecture
Built with Next.js, Prisma ORM, and TypeScript, combining responsive frontend and scalable backend.

## System Architecture

### Frontend (Next.js + Tailwind CSS)

Provides a clean interface with two main tabs:

Chat: Interactive AI agent for learning.

Progress: Dashboard showing accuracy and feedback.

### Backend (API Routes)

/api/chat: Connects with Gemini or Ollama to generate AI responses.

/api/progress: Stores and fetches student performance metrics.

### Service Layer

studyBuddyService.ts contains the logic for tutoring interactions, including formatting explanations, quiz generation, and recommendations.

### Database (Prisma + SQLite)

Tracks user performance data.

Can be extended to use other databases by updating DATABASE_URL.

## Repository Structure

app/ – Next.js App Router code (frontend + API routes).

api/chat/route.ts – AI chat endpoint.

api/progress/route.ts – Progress tracking endpoint.

page.tsx – Main application UI.

prisma/ – Prisma ORM configuration.

schema.prisma – Database schema.

migrations/ – Migration history.

dev.db – Local development database.

TS/ – TypeScript services.

studyBuddyService.ts – Core AI agent logic.

.env.local – Environment configuration (API keys, database URL).

package.json – Dependencies and scripts.

### Screenshots
Home Interface
![Homepage Screenshot](./screenshots/home_interface.jpeg)

Chat Mode
![Chat Screenshot](./screenshots/chat_mode.jpeg)

Progress Tracking
![Progress Screenshot](./screenshots/progress.jpeg) 


## How the AI Agent Works  

```mermaid
flowchart TD
    A[User Question] --> B[Frontend: Next.js UI]
    B --> C[API: /api/chat]
    C --> D[AI Model Layer]
    D -->|Gemini API or Ollama| E[AI Response]
    E --> F[Service Layer: studyBuddyService.ts]
    F --> G[Structured Output: Definition, Examples, Quiz, Recommendations]
    G --> H[Frontend: Display Response]

    A2[Track Progress] --> B2[Frontend: Progress Tab]
    B2 --> C2[API: /api/progress]
    C2 --> D2[Prisma ORM + SQLite]
    D2 --> E2[Store Accuracy & Feedback]
    E2 --> F2[Recommendations]
    F2 --> B2


This diagram explains:  

- **Chat Flow**: User asks → API forwards → Model (Gemini/Ollama) → AI response → Service formats → Frontend shows structured content.  
- **Progress Flow**: User tracks → API call → Prisma/SQLite stores results → Recommendations → Displayed back in UI.  

---

Do you want me to **insert this directly into the final README draft** (so you just copy-paste one file), or give it separately so you can add it under the "System Architecture" section?


Installation

Clone the Repository

git clone https://github.com/snehaella5/AI-Adaptive-Tutor.git
cd ai-adaptive-tutor


Install Dependencies

npm install


Environment Variables
Create a .env.local file with:

DATABASE_URL="file:./prisma/dev.db"
GEMINI_API_KEY="your_gemini_api_key"


To use Ollama instead, configure the endpoint URL accordingly.

Database Setup

npx prisma migrate dev --name init


Run the Development Server

npm run dev


Visit http://localhost:3000 in your browser.

Usage

Chat with the AI Agent
Type any question in the chat input. The AI agent responds with definitions, examples, quizzes, and recommendations.

Track Progress
Switch to the Progress tab to see accuracy, feedback, and suggested next steps based on your interactions.

Switch Models

By default, uses Gemini API.

Configure .env.local to use Ollama if running models locally.

Roadmap

User authentication and persistent progress across sessions.

Subject expansion (math, computer science, etc.).

Rich visualization dashboards for analytics.

Support for additional LLM providers.

Contributing

Fork the repository.

Create a feature branch (git checkout -b feature/your-feature).

Commit changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/your-feature).

Open a Pull Request.

License

This project is licensed under the MIT License.