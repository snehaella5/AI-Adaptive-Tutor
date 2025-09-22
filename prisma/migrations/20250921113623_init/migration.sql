-- CreateTable
CREATE TABLE "Progress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" TEXT NOT NULL,
    "accuracy" REAL NOT NULL,
    "feedback" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "nextSteps" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
