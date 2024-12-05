-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Convidado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Convidado" ("id") SELECT "id" FROM "Convidado";
DROP TABLE "Convidado";
ALTER TABLE "new_Convidado" RENAME TO "Convidado";
CREATE TABLE "new_Noivo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "casamentoId" INTEGER,
    CONSTRAINT "Noivo_casamentoId_fkey" FOREIGN KEY ("casamentoId") REFERENCES "Casamento" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Noivo" ("casamentoId", "contato", "cpf", "endereco", "id", "isoString", "nome", "rg") SELECT "casamentoId", "contato", "cpf", "endereco", "id", "isoString", "nome", "rg" FROM "Noivo";
DROP TABLE "Noivo";
ALTER TABLE "new_Noivo" RENAME TO "Noivo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
