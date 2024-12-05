/*
  Warnings:

  - Added the required column `dataCasamento` to the `Casamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `local` to the `Casamento` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Casamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataCasamento" DATETIME NOT NULL,
    "local" TEXT NOT NULL,
    "organizadorId" INTEGER NOT NULL,
    CONSTRAINT "Casamento_organizadorId_fkey" FOREIGN KEY ("organizadorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Casamento" ("id", "isoString", "organizadorId") SELECT "id", "isoString", "organizadorId" FROM "Casamento";
DROP TABLE "Casamento";
ALTER TABLE "new_Casamento" RENAME TO "Casamento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
