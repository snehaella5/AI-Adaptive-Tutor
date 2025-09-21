"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setOutput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setOutput(data.output || "⚠️ No response from AI");
    setLoading(false);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>🧠 Adaptive Tutor (Alias: Prism)</h1>

      <input
        type="text"
        value={input}
        placeholder="Type a topic (e.g., energy)"
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: 10, width: "300px" }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginLeft: 10, padding: 10 }}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {output && (
        <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
          <h3>AI Response:</h3>
          <p>{output}</p>
        </div>
      )}
    </main>
  );
}
