
---

### 📄 `setup.md`  

```md
# Setup Instructions  

1. Clone the repository:  
   ```bash
   git clone https://github.com/snehaella5/AI-Adaptive-Tutor.git
   cd ai-adaptive-tutor

2. Install dependencies:

npm install


3. Add environment variables in .env.local:

DATABASE_URL="file:./prisma/dev.db"
GEMINI_API_KEY="your_gemini_api_key"


4. Run migrations:

npx prisma migrate dev --name init


5. Start development server:

npm run dev


App will be available at: http://localhost:3000


---

### 📄 `usage.md`  

```md
# Usage Guide  

## Chat Mode  
- Navigate to the Chat tab.  
- Enter a question (e.g., "Explain Newton’s Laws of Motion").  
- Receive structured output with definitions, examples, quiz, and recommendations.  

## Progress Mode  
- Switch to the Progress tab.  
- Track accuracy percentage, feedback messages, and next steps.  

## Model Selection  
- Default: Gemini API.  
- Optional: Configure Ollama endpoint to run local LLMs.  

