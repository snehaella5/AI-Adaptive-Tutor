import { NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { studentId, answers } = await req.json();

    const total = answers?.length || 1;
    const correct = answers?.filter((a: any) => a.isCorrect).length || 0;
    const accuracy = (correct / total) * 100;

    const feedback = accuracy > 70 ? "Great job! 🎉" : "Needs improvement ⚡";

    // ---------------- Next Steps Logic ----------------
    const nextSteps: string[] = [];

    if (accuracy < 50) {
      nextSteps.push("Revise the basic concepts 📚");
      nextSteps.push("Watch related tutorial videos 🎥");
    } else if (accuracy < 70) {
      nextSteps.push("Practice more example questions ✏️");
      nextSteps.push("Review mistakes carefully 🔍");
    } else {
      nextSteps.push("Keep up the good work! ✅");
      nextSteps.push("Try advanced exercises 🌟");
    }

    const progress = await prisma.progress.create({
      data: {
        studentId,
        accuracy,
        feedback,
        recommendation: feedback,
        nextSteps: JSON.stringify(nextSteps), // ab Next Steps array save ho raha
      },
    });

    return NextResponse.json(progress);
  } catch (err) {
    console.error("Progress API Error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

