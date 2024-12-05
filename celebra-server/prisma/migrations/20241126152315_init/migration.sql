-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Parcela" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orcamentoId" INTEGER,
    "isoString" DATETIME NOT NULL,
    CONSTRAINT "Parcela_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "Orcamento" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Parcela" ("id", "isoString", "orcamentoId") SELECT "id", "isoString", "orcamentoId" FROM "Parcela";
DROP TABLE "Parcela";
ALTER TABLE "new_Parcela" RENAME TO "Parcela";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
