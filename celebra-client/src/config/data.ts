export const data = {
  noivos: {
    columns: [
      { key: "id", label: "ID" },
      { key: "nome", label: "NOME" },
      { key: "cpf", label: "CPF" },
      { key: "rg", label: "RG" },
      { key: "endereco", label: "ENDERECO" },
      { key: "contato", label: "CONTATO" },
      // { key: "casamento", label: "CASAMENTO" },
    ],
    rows: [
      {
        id: 1,
        nome: "João Pedro Silva",
        cpf: "123.456.789-01",
        rg: "12.345.678-9",
        endereco: "Rua dos Bobos, 123, São Paulo, SP",
        telefone: "(11) 98765-4321",
        email: "joao.pedro@gmail.com",
      },
      {
        id: 2,
        nome: "Maria Luiza Oliveira",
        cpf: "987.654.321-09",
        rg: "34.567.890-1",
        endereco: "Avenida dos Pinheiros, 456, Rio de Janeiro, RJ",
        telefone: "(21) 76543-2109",
        email: "maria.luiza@hotmail.com",
      },
      {
        id: 3,
        nome: "Antônio Carlos Santos",
        cpf: "456.789.012-07",
        rg: "56.789.012-3",
        endereco: "Rua dos Anjos, 789, Belo Horizonte, MG",
        telefone: "(31) 54321-9876",
        email: "antonio.carlos@yahoo.com",
      },
      {
        id: 4,
        nome: "Juliana Martins Pereira",
        cpf: "234.567.890-12",
        rg: "78.901.234-5",
        endereco: "Avenida dos Estados, 901, Brasília, DF",
        telefone: "(61) 87654-3210",
        email: "juliana.martins@gmail.com",
      },
      {
        id: 5,
        nome: "Pedro Henrique Lima",
        cpf: "567.890.123-09",
        rg: "90.123.456-7",
        endereco: "Rua dos Professores, 234, Salvador, BA",
        telefone: "(71) 76543-2109",
        email: "pedro.henrique@hotmail.com",
      },
      {
        id: 6,
        nome: "Luisa Fernanda Souza",
        cpf: "890.123.456-12",
        rg: "12.345.678-9",
        endereco: "Avenida dos Pioneiros, 567, Curitiba, PR",
        telefone: "(41) 54321-9876",
        email: "luisa.fernanda@yahoo.com",
      },
      {
        id: 7,
        nome: "Gabriel Matos Silva",
        cpf: "123.456.789-01",
        rg: "34.567.890-1",
        endereco: "Rua dos Artistas, 890, Porto Alegre, RS",
        telefone: "(51) 87654-3210",
        email: "gabriel.matos@gmail.com",
      },
      {
        id: 8,
        nome: "Beatriz Helena Costa",
        cpf: "987.654.321-09",
        rg: "56.789.012-3",
        endereco: "Avenida dos Poetas, 123, Recife, PE",
        telefone: "(81) 76543-2109",
        email: "beatriz.helena@hotmail.com",
      },
      {
        id: 9,
        nome: "Rafael Oliveira Santos",
        cpf: "456.789.012-07",
        rg: "78.901.234-5",
        endereco: "Rua dos Músicos, 456, Fortaleza, CE",
        telefone: "(85) 54321-9876",
        email: "rafael.oliveira@yahoo.com",
      },
      {
        id: 10,
        nome: "Isabela Cristina Lima",
        cpf: "234.567.890-12",
        rg: "90.123.456-7",
        endereco: "Avenida dos Esportes, 789, Goiânia, GO",
        telefone: "(62) 87654-3210",
        email: "isabela.cristina@gmail.com",
      },
    ],
  },
  fornecedores: {
    columns: [
      { key: "id", label: "ID" },
      {
        key: "nomeFantasia",
        label: "NOME FANTASIA",
      },
      {
        key: "cnpj",
        label: "CNPJ",
      },
      {
        key: "tipo",
        label: "TIPO",
      },
      {
        key: "contato",
        label: "CONTATO",
      },
    ],
    rows: [
      {
        id: 1,
        nomeFantasia: "Empresa A",
        cnpj: "12.345.678/0001-90",
        tipo: "Fornecedor de Materiais",
        contato: "contato@empresaA.com.br",
      },
      {
        id: 2,
        nomeFantasia: "Empresa B",
        cnpj: "23.456.789/0001-90",
        tipo: "Fornecedor de Serviços",
        contato: "(11) 9876-5432",
      },
      {
        id: 3,
        nomeFantasia: "Empresa C",
        cnpj: "34.567.890/0001-90",
        tipo: "Fornecedor de Equipamentos",
        contato: "contato@empresaC.com.br",
      },
      {
        id: 4,
        nomeFantasia: "Empresa D",
        cnpj: "45.678.901/0001-90",
        tipo: "Fornecedor de Tecnologia",
        contato: "(11) 3333-4444",
      },
    ],
  },
  convidados: {
    columns: [
      { key: "id", label: "ID" },
      {
        key: "nome",
        label: "NOME",
      },
      {
        key: "contato",
        label: "CONTATO",
      },
      // { key: "status", label: "STATUS" },
    ],
    rows: [
      {
        id: 1,
        nome: "João",
        contato: "(12) 34567890",
        status: "confirmado",
      },
      {
        id: 2,
        nome: "Maria",
        contato: "(98) 76543210",
        status: "não confirmado",
      },
      {
        id: 3,
        nome: "Pedro",
        contato: "(55) 55555555",
        status: "confirmado",
      },
      {
        id: 4,
        nome: "Ana",
        contato: "(11) 11111111",
        status: "não confirmado",
      },
    ],
  },
  casamentos: {
    columns: [
      { key: "id", label: "ID" },
      { key: "dataCasamento", label: "DATA CASAMENTO" },
      { key: "local", label: "LOCAL" },
      { key: "numeroConvidados", label: "Nº CONVIDADOS" },
      { key: "noivos", label: "NOIVOS" },
      { key: "fornecedores", label: "FORNECEDORES" },
      // { key: "valorOrcado", label: "VALOR ORÇADO" },
      // { key: "qtdParcelas", label: "Nº PARCELAS" },
      // { key: "valorEntrada", label: "VALOR ENTRADA" },
      // { key: "dataHorarioOrcados", label: "DATA/HORÁRIO ORÇADOS" },
      // { key: "observacao", label: "OBSERVAÇÃO" },
    ],
    rows: [
      {
        id: 1,
        dataCasamento: "17-06-2023",
        local: "Hotel Fazenda",
        numeroConvidados: 150,
        noivos: ["João", "Maria"],
        fornecedores: ["Fornecedor de comida", "Fornecedor de decoração"],
        valorOrcado: 10000,
        qtdParcelas: 5,
        valorEntrada: 2000,
        dataHorarioOrcados: "01-06-2023 14:00",
        observacao: "Casamento de verão",
      },
      {
        id: 2,
        dataCasamento: "22-09-2023",
        local: "Restaurante",
        numeroConvidados: 100,
        noivos: ["Pedro", "Ana"],
        fornecedores: ["Fornecedor de comida", "Fornecedor de música"],
        valorOrcado: 8000,
        qtdParcelas: 4,
        valorEntrada: 1500,
        dataHorarioOrcados: "01-09-2023 18:00",
        observacao: "Casamento de outono",
      },
      {
        id: 3,
        dataCasamento: "15-12-2023",
        local: "Igreja",
        numeroConvidados: 200,
        noivos: ["Luiz", "Beatriz"],
        fornecedores: ["Fornecedor de comida", "Fornecedor de decoração"],
        valorOrcado: 12000,
        qtdParcelas: 6,
        valorEntrada: 2500,
        dataHorarioOrcados: "01-12-2023 10:00",
        observacao: "Casamento de inverno",
      },
      {
        id: 4,
        dataCasamento: "21-03-2024",
        local: "Praia",
        numeroConvidados: 120,
        noivos: ["Carlos", "Juliana"],
        fornecedores: ["Fornecedor de comida", "Fornecedor de música"],
        valorOrcado: 9000,
        qtdParcelas: 5,
        valorEntrada: 2000,
        dataHorarioOrcados: "01-03-2024 16:00",
        observacao: "Casamento de primavera",
      },
      {
        id: 5,
        dataCasamento: "14-06-2024",
        local: "Clube",
        numeroConvidados: 180,
        noivos: ["Ricardo", "Gabriela"],
        fornecedores: ["Fornecedor de comida", "Fornecedor de decoração"],
        valorOrcado: 14000,
        qtdParcelas: 7,
        valorEntrada: 3000,
        dataHorarioOrcados: "01-06-2024 12:00",
        observacao: "Casamento de verão",
      },
    ],
  },
  pagamentos: {
    columns: [],
    rows: [],
  },
  dashboard: {
    columns: [{ key: "", label: "" }],
  },
};
