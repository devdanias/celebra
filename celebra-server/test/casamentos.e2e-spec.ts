import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CasamentosModule } from '../src/casamentos/casamentos.module';
import { PrismaService } from '../src/prisma.service';
import { Usuario } from '../src/usuarios/entities/usuario.entity';

describe('CasamentosController (e2e)', () => {
  let app: INestApplication;
  let user: Usuario;

  const casamento: unknown = {
    id: 1,
    dataCasamento: '2024-01-01',
    local: 'Rua 1',
    organizadorId: 1,
    orcamentos: [],
    convites: [],
    noivos: [],
  };

  let fornecedor1: unknown;
  let fornecedor2: unknown;
  let convidado: unknown;
  let noivos: unknown[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CasamentosModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const prismaService = new PrismaService();
    // await prismaService.convidado.deleteMany();
    // @ts-expect-error tests
    user = await prismaService.usuario.create({
      data: { email: 'VwzX9@example.com', senha: '123456', nome: 'Alice' },
    });
    fornecedor1 = await prismaService.fornecedor.create({
      data: {
        cnpj: '12345678901234',
        contato: 'contato1@fornecedor',
        nomeFantasia: 'Fornecedor 1',
        tipo: 'Fornecedor de Materiais',
      },
    });

    fornecedor2 = await prismaService.fornecedor.create({
      data: {
        cnpj: '12345678901234',
        contato: 'contato2@fornecedor',
        nomeFantasia: 'Fornecedor 2',
        tipo: 'Fornecedor de Equipamentos',
      },
    });

    convidado = await prismaService.convidado.create({
      data: {
        contato: 'contato@convidado',
        nome: 'Convidado',
        organizadorId: user.id,
      },
    });

    noivos = await prismaService.noivo.createManyAndReturn({
      data: [
        {
          contato: 'contato@noivo1',
          nome: 'Noivo 1',
          organizadorId: user.id,
          cpf: '123.456.789-01',
          rg: '12.345.678-9',
          endereco: 'Rua dos Bobos, 123, São Paulo, SP',
        },
        {
          contato: 'contato@noivo2',
          nome: 'Noivo 2',
          organizadorId: user.id,
          cpf: '123.456.789-01',
          rg: '12.345.678-9',
          endereco: 'Rua dos Bobos, 123, São Paulo, SP',
        },
      ],
    });
  });

  it('/casamentos (POST)', () => {
    return request(app.getHttpServer())
      .post('/casamentos')
      .send({
        // @ts-expect-error tests
        dataCasamento: casamento.dataCasamento,
        // @ts-expect-error tests
        local: casamento.local,
        organizadorId: user.id,
        orcamentos: [
          {
            valor: 250,
            quantidadeParcelas: 3,
            // @ts-expect-error testes
            fornecedorId: `${fornecedor1.id}`,
          },
          {
            valor: 150,
            quantidadeParcelas: 2,
            // @ts-expect-error testes
            fornecedorId: `${fornecedor2.id}`,
          },
        ],
        convites: [
          {
            // @ts-expect-error testes
            convidadoId: `${convidado.id}`,
            status: 'confirmado',
          },
        ],
        // @ts-expect-error tests
        noivos: [noivos[0].id, noivos[1].id],
      })
      .then((response) => {
        // @ts-expect-error tests
        casamento.id = response.body.id;
        // expect(response.body).toEqual({ sla: 'sla' });
        expect(response.status).toBe(201);
      });
  });

  it('/casamentos (GET)', () => {
    // testar aqui as rotas de auth
    return request(app.getHttpServer()).get('/casamentos').expect(200);
  });

  it('/casamentos/:id (GET)', () => {
    return (
      request(app.getHttpServer())
        // @ts-expect-error tests
        .get(`/casamentos/${casamento.id}`)
        .expect(200)
    );
  });

  it('/casamentos/:id (GET) - Not Found', () => {
    const notFoundId = 0;
    return request(app.getHttpServer())
      .get(`/casamentos/${notFoundId}`)
      .expect(404);
  });

  it('/casamentos/:id (PATCH)', () => {
    // @ts-expect-error tests
    casamento.dataCasamento = new Date('2025-01-01').toISOString();
    return (
      request(app.getHttpServer())
        // @ts-expect-error tests
        .patch(`/casamentos/${casamento.id}`)
        // @ts-expect-error tests
        .send({ dataCasamento: casamento.dataCasamento })
        .expect(200)
        .then((response) => {
          // @ts-expect-error tests
          expect(response.body.dataCasamento).toEqual(casamento.dataCasamento);
        })
    );
  });
  /**

  it('/casamentos/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/casamentos/${convidado.id}`)
      .expect(200);
  });
  */
});
