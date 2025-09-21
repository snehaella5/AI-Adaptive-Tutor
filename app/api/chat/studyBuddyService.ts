export type QuizItem = {
  question: string
  options: string[]
  answer: string
}

export type StudyBuddyOutput = {
  explanation: string
  quiz: QuizItem[]
}

export async function generateStudyBuddyContent(topic: string): Promise<StudyBuddyOutput> {
  const prompt = `
Explain the topic "${topic}" in a short, simple way (<=200 words) 
and create a 3-question multiple-choice quiz with correct answers. 
Respond strictly in JSON format like:
{
  "explanation": "...",
  "quiz": [
    {"question": "...", "options": ["A","B","C","D"], "answer": "B"},
    ...
  ]
}
`

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'llama3', prompt, stream: false }),
    })
    if (!res.ok) throw new Error('Ollama server error')
    const data = await res.json()
    try { return JSON.parse(data.response) } catch { return { explanation: data.response, quiz: [] } }
  } catch (err) {
    console.error('Ollama fallback:', err)
    return {
      explanation: `⚠️ Example explanation for "${topic}"`,
      quiz: [
        { question: `Example question for "${topic}"?`, options: ['A','B','C','D'], answer: 'A' }
      ]
    }
  }
}

