import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Convidado = {
  id: number;
  nome: string;
  contato: string;
  status: string;
};

export type Noivo = {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  endereco: string;
  telefone: string;
  email: string;
};

export type Orcamento = {
  casamentoId: number;
  criadoEm: string;
  fornecedorId: number;
  id: number;
  valor: string;
};

export type Casamento = {
  convites: unknown[];
  criadoEm: string;
  dataCasamento: string;
  id: number;
  local: string;
  noivos: string[];
  orcamentos: Orcamento[];
  observacao: string;
};

export type Fornecedor = {
  orcamentos: any;
  id: number;
  nomeFantasia: string;
  cnpj: string;
  tipo: string;
  contato: string;
};

export type DataPath =
  | "noivos"
  | "fornecedores"
  | "convidados"
  | "casamentos"
  | "pagamentos"
  | "dashboard";

export type Row = Convidado | Noivo | Casamento | Fornecedor;
