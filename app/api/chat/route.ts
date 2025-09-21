import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: `You are an adaptive learning tutor. 
The student asked about "${prompt}". 
Reply in this structured format:

1. 📖 Definition:
2. 📝 Example:
3. 🎯 Quiz Question:
4. 🚀 Next Step Recommendation:`,
        stream: true, // enable streaming
      }),
    });

    // Read response as text stream
    const reader = response.body?.getReader();
    let result = "";
    if (reader) {
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = new TextDecoder().decode(value);
          // Each chunk may be JSON lines
          chunk.split("\n").forEach((line) => {
            if (line.trim()) {
              try {
                const obj = JSON.parse(line);
                if (obj.response) result += obj.response;
              } catch {}
            }
          });
        }
      }
    }

    return NextResponse.json({ output: result });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}




