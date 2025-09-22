/*
  Warnings:

  - You are about to alter the column `accuracy` on the `Progress` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Progress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" TEXT NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "nextSteps" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Progress" ("accuracy", "createdAt", "feedback", "id", "nextSteps", "recommendation", "studentId") SELECT "accuracy", "createdAt", "feedback", "id", "nextSteps", "recommendation", "studentId" FROM "Progress";
DROP TABLE "Progress";
ALTER TABLE "new_Progress" RENAME TO "Progress";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
