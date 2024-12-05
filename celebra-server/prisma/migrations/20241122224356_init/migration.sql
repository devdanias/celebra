-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Casamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Casamento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Noivo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "casamentoId" INTEGER NOT NULL,
    CONSTRAINT "Noivo_casamentoId_fkey" FOREIGN KEY ("casamentoId") REFERENCES "Casamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnpj" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Orcamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" DECIMAL NOT NULL,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "casamentoId" INTEGER NOT NULL,
    "fornecedorId" INTEGER NOT NULL,
    CONSTRAINT "Orcamento_casamentoId_fkey" FOREIGN KEY ("casamentoId") REFERENCES "Casamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orcamento_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Parcela" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orcamentoId" INTEGER NOT NULL,
    "isoString" DATETIME NOT NULL,
    CONSTRAINT "Parcela_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "Orcamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Convidado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Convite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isoString" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "casamentoId" INTEGER NOT NULL,
    "convidadoId" INTEGER NOT NULL,
    CONSTRAINT "Convite_casamentoId_fkey" FOREIGN KEY ("casamentoId") REFERENCES "Casamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Convite_convidadoId_fkey" FOREIGN KEY ("convidadoId") REFERENCES "Convidado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
