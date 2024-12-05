/*
  Warnings:

  - Added the required column `organizadorId` to the `Convidado` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Convidado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizadorId" INTEGER NOT NULL,
    CONSTRAINT "Convidado_organizadorId_fkey" FOREIGN KEY ("organizadorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Convidado" ("contato", "id", "isoString", "nome") SELECT "contato", "id", "isoString", "nome" FROM "Convidado";
DROP TABLE "Convidado";
ALTER TABLE "new_Convidado" RENAME TO "Convidado";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
