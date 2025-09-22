"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"chat" | "progress">("chat");

  // ---------------- Chat ----------------
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

  // ---------------- Progress Tracker ----------------
  const [progress, setProgress] = useState<any>(null);

  const trackProgress = async () => {
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: "123",
        answers: [
          { questionId: 1, isCorrect: true },
          { questionId: 2, isCorrect: false },
        ],
        timeSpent: 90,
      }),
    });

    const data = await res.json();
    setProgress(data);
  };

  return (
    <main
      style={{
        padding: 20,
        backgroundColor: "#0f0f0f", // dark gothic background
        color: "#e0e0e0", // light text
        minHeight: "100vh",
        fontFamily: 'Georgia, "Times New Roman", serif',
        lineHeight: 1.5,
        letterSpacing: 0.5,
      }}
    >
      <h1 style={{ color: "#a855f7" }}>🧠 Adaptive Tutor (Alias: Prism)</h1>

      {/* Tabs */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab("chat")}
          style={{
            padding: 10,
            marginRight: 10,
            background: activeTab === "chat" ? "#7c3aed" : "#1f1f1f",
            color: activeTab === "chat" ? "#fff" : "#e0e0e0",
            border: "1px solid #7c3aed",
            borderRadius: 5,
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab("progress")}
          style={{
            padding: 10,
            background: activeTab === "progress" ? "#7c3aed" : "#1f1f1f",
            color: activeTab === "progress" ? "#fff" : "#e0e0e0",
            border: "1px solid #7c3aed",
            borderRadius: 5,
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Progress
        </button>
      </div>

      {/* Chat Tab */}
      {activeTab === "chat" && (
        <div>
          <input
            type="text"
            value={input}
            placeholder="Type a topic (e.g., energy)"
            onChange={(e) => setInput(e.target.value)}
            style={{
              padding: 10,
              width: "300px",
              backgroundColor: "#1b1b1b",
              color: "#e0e0e0",
              border: "1px solid #7c3aed",
              borderRadius: 5,
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              marginLeft: 10,
              padding: 10,
              backgroundColor: "#7c3aed",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>

          {output && (
            <div
              style={{
                marginTop: 20,
                whiteSpace: "pre-wrap",
                backgroundColor: "#1e1e1e",
                padding: 15,
                border: "1px solid #7c3aed",
                borderRadius: 5,
              }}
            >
              <h3>AI Response:</h3>
              <p>{output}</p>
            </div>
          )}
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === "progress" && (
        <div>
          <button
            onClick={trackProgress}
            style={{
              padding: "10px 15px",
              background: "#f97316",
              color: "white",
              borderRadius: 5,
              border: "none",
              cursor: "pointer",
            }}
          >
            Track Progress
          </button>

          {progress && (
            <div
              style={{
                marginTop: 20,
                background: "#1b1b1b",
                color: "#e0e0e0",
                padding: 20,
                borderRadius: 10,
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                maxWidth: 400,
              }}
            >
              <p>
                <strong>Accuracy:</strong>{" "}
                <span style={{ color: progress.accuracy > 70 ? "#22c55e" : "#f87171" }}>
                  {progress.accuracy}%
                </span>
              </p>
              <p>
                <strong>Feedback:</strong>{" "}
                <span style={{ color: "#fbbf24" }}>{progress.feedback}</span>
              </p>
              <p>
                <strong>Recommendation:</strong>{" "}
                <span style={{ color: "#60a5fa" }}>{progress.recommendation}</span>
              </p>
              <p>
                <strong>Next Steps:</strong>
              </p>
              <ul style={{ paddingLeft: 20 }}>
                {(JSON.parse(progress.nextSteps) || []).map((step: string, i: number) => (
                  <li key={i} style={{ marginBottom: 5, color: "#e0e0e0" }}>
                    ➡ {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
