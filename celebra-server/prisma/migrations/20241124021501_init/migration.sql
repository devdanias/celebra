/*
  Warnings:

  - Added the required column `contato` to the `Convidado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Convidado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Convite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizadorId` to the `Noivo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Convidado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Convidado" ("id", "isoString") SELECT "id", "isoString" FROM "Convidado";
DROP TABLE "Convidado";
ALTER TABLE "new_Convidado" RENAME TO "Convidado";
CREATE TABLE "new_Convite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "casamentoId" INTEGER NOT NULL,
    "convidadoId" INTEGER NOT NULL,
    CONSTRAINT "Convite_casamentoId_fkey" FOREIGN KEY ("casamentoId") REFERENCES "Casamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Convite_convidadoId_fkey" FOREIGN KEY ("convidadoId") REFERENCES "Convidado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Convite" ("casamentoId", "convidadoId", "id", "isoString") SELECT "casamentoId", "convidadoId", "id", "isoString" FROM "Convite";
DROP TABLE "Convite";
ALTER TABLE "new_Convite" RENAME TO "Convite";
CREATE TABLE "new_Noivo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "casamentoId" INTEGER,
    "organizadorId" INTEGER NOT NULL,
    CONSTRAINT "Noivo_casamentoId_fkey" FOREIGN KEY ("casamentoId") REFERENCES "Casamento" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Noivo_organizadorId_fkey" FOREIGN KEY ("organizadorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Noivo" ("casamentoId", "contato", "cpf", "endereco", "id", "isoString", "nome", "rg") SELECT "casamentoId", "contato", "cpf", "endereco", "id", "isoString", "nome", "rg" FROM "Noivo";
DROP TABLE "Noivo";
ALTER TABLE "new_Noivo" RENAME TO "Noivo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
