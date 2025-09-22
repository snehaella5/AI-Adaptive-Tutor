import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an adaptive learning tutor. 
The student asked about "${prompt}". 
Reply in this structured format:

1. 📖 Definition:
2. 📝 Example:
3. 🎯 Quiz Question:
4. 🚀 Next Step Recommendation:`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();

    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

    return NextResponse.json({ output: result });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
