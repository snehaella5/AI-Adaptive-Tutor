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
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    )

    if (!res.ok) throw new Error(`Gemini API error: ${res.statusText}`)
    const data = await res.json()

    // Gemini returns text inside candidates
    const rawText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    try {
      return JSON.parse(rawText)
    } catch {
      // If model doesn’t return strict JSON
      return { explanation: rawText, quiz: [] }
    }
  } catch (err) {
    console.error("Gemini fallback:", err)
    return {
      explanation: `⚠️ Example explanation for "${topic}"`,
      quiz: [
        {
          question: `Example question for "${topic}"?`,
          options: ["A", "B", "C", "D"],
          answer: "A",
        },
      ],
    }
  }
}
