import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { FornecedoresModule } from '../src/fornecedores/fornecedores.module';
import { PrismaService } from '../src/prisma.service';

describe('FornecedoresController (e2e)', () => {
  let app: INestApplication;

  let vendor = {
    id: 1,
    nomeFantasia: 'Empresa salgados',
    tipo: 'salgados',
    contato: '(21) 982520018',
    cnpj: '42.654.876/0001-49',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FornecedoresModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const prismaService = new PrismaService();
    await prismaService.fornecedor.deleteMany();
    vendor = await prismaService.fornecedor.create({
      data: {
        cnpj: vendor.cnpj,
        contato: vendor.contato,
        nomeFantasia: vendor.nomeFantasia,
        tipo: vendor.tipo,
      },
    });
  });

  it('/fornecedores (POST)', () => {
    return request(app.getHttpServer())
      .post('/fornecedores')
      .send({
        nomeFantasia: vendor.nomeFantasia,
        tipo: vendor.tipo,
        contato: vendor.contato,
        cnpj: vendor.cnpj,
      })
      .expect(201);
  });

  it('/fornecedores (GET)', () => {
    // testar aqui as rotas de auth
    return request(app.getHttpServer()).get('/fornecedores').expect(200);
  });

  it('/fornecedores/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/fornecedores/${vendor.id}`)
      .expect(200);
  });

  it('/fornecedores/:id (GET) - Not Found', () => {
    const notFoundId = 0;
    return request(app.getHttpServer())
      .get(`/fornecedores/${notFoundId}`)
      .expect(404);
  });

  it('/fornecedores/:id (PATCH)', () => {
    vendor.contato = 'b@b.com';
    return request(app.getHttpServer())
      .patch(`/fornecedores/${vendor.id}`)
      .send({ contato: vendor.contato })
      .expect(200)
      .then((response) => {
        expect(response.body.contato).toEqual(vendor.contato);
      });
  });

  /** 
  it('/fornecedores/:id (DELETE)', () => {
    return request(app.getHttpServer())
    .delete(`/fornecedores/${vendor.id}`)
    .expect(200);
  });
  */
});
