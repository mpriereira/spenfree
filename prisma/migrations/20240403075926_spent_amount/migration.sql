/*
  Warnings:

  - Added the required column `amount` to the `ExpenseItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "categoryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Spent_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Spent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Spent" ("categoryId", "date", "id", "notes", "title", "userId") SELECT "categoryId", "date", "id", "notes", "title", "userId" FROM "Spent";
DROP TABLE "Spent";
ALTER TABLE "new_Spent" RENAME TO "Spent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
