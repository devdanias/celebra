-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Orcamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" DECIMAL NOT NULL DEFAULT 0,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "casamentoId" INTEGER NOT NULL,
    "fornecedorId" INTEGER NOT NULL,
    CONSTRAINT "Orcamento_casamentoId_fkey" FOREIGN KEY ("casamentoId") REFERENCES "Casamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orcamento_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Orcamento" ("casamentoId", "fornecedorId", "id", "isoString", "valor") SELECT "casamentoId", "fornecedorId", "id", "isoString", "valor" FROM "Orcamento";
DROP TABLE "Orcamento";
ALTER TABLE "new_Orcamento" RENAME TO "Orcamento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
