-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Convite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Confirmado',
    "casamentoId" INTEGER NOT NULL,
    "convidadoId" INTEGER NOT NULL,
    CONSTRAINT "Convite_casamentoId_fkey" FOREIGN KEY ("casamentoId") REFERENCES "Casamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Convite_convidadoId_fkey" FOREIGN KEY ("convidadoId") REFERENCES "Convidado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Convite" ("casamentoId", "convidadoId", "id", "isoString", "status") SELECT "casamentoId", "convidadoId", "id", "isoString", "status" FROM "Convite";
DROP TABLE "Convite";
ALTER TABLE "new_Convite" RENAME TO "Convite";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
