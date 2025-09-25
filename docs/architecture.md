# System Architecture  

The system is built using **Next.js, Prisma ORM, TypeScript, and AI models**.  

## High-Level Workflow  

1. **Frontend (Next.js)**  
   - Displays chat interface and progress dashboard.  

2. **Backend (API Routes)**  
   - `/api/chat` connects with Gemini API or Ollama.  
   - `/api/progress` stores learning progress in database.  

3. **Service Layer**  
   - `studyBuddyService.ts` processes AI outputs into structured responses:  
     - Definition  
     - Examples  
     - Quiz questions  
     - Recommendations  

4. **Database (Prisma + SQLite)**  
   - Stores accuracy, feedback, and progress history.  

```mermaid
flowchart TD
    User --> Frontend --> API --> AIModel[Gemini API / Ollama]
    AIModel --> ServiceLayer[studyBuddyService.ts]
    ServiceLayer --> Response[Definition, Examples, Quiz, Recommendations]
    Frontend --> ProgressTab
    ProgressTab --> DB[Prisma ORM + SQLite]
    DB --> Feedback
