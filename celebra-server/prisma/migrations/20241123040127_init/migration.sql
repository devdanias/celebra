/*
  Warnings:

  - Added the required column `nomeFantasia` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fornecedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeFantasia" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Fornecedor" ("cnpj", "contato", "id", "isoString", "tipo") SELECT "cnpj", "contato", "id", "isoString", "tipo" FROM "Fornecedor";
DROP TABLE "Fornecedor";
ALTER TABLE "new_Fornecedor" RENAME TO "Fornecedor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
