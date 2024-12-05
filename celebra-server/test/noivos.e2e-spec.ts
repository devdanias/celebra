import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { NoivosModule } from '../src/noivos/noivos.module';
import { PrismaService } from '../src/prisma.service';
import { Usuario } from '../src/usuarios/entities/usuario.entity';

describe('NoivosController (e2e)', () => {
  let app: INestApplication;

  let noivo = {
    id: 1,
    nome: 'João',
    cpf: '531.122.876-09',
    rg: '12.345.678-9',
    endereco: 'Rua dos Bobos, 123, São Paulo, SP',
    contato: '(21) 982520018',
  };

  let user: Usuario;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NoivosModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const prismaService = new PrismaService();
    await prismaService.noivo.deleteMany();
    // @ts-expect-error tests
    user = await prismaService.usuario.create({
      data: { email: 'VwzX9@example.com', senha: '123456', nome: 'Alice' },
    });

    noivo = await prismaService.noivo.create({
      data: {
        contato: noivo.contato,
        nome: noivo.nome,
        cpf: noivo.cpf,
        rg: noivo.rg,
        endereco: noivo.endereco,
        organizadorId: user.id,
      },
    });
  });

  it('/noivos (POST)', () => {
    return request(app.getHttpServer())
      .post('/noivos')
      .send({
        nome: noivo.nome,
        cpf: noivo.cpf,
        rg: noivo.rg,
        endereco: noivo.endereco,
        contato: noivo.contato,
        organizadorId: `${user.id}`,
      })
      .expect(201);
  });

  it('/noivos (GET)', () => {
    // testar aqui as rotas de auth
    return request(app.getHttpServer()).get('/noivos').expect(200);
  });

  it('/noivos/:id (GET)', () => {
    return request(app.getHttpServer()).get(`/noivos/${noivo.id}`).expect(200);
  });

  it('/noivos/:id (GET) - Not Found', () => {
    const notFoundId = 0;
    return request(app.getHttpServer())
      .get(`/noivos/${notFoundId}`)
      .expect(404);
  });

  it('/noivos/:id (PATCH)', () => {
    noivo.contato = 'b@b.com';
    return request(app.getHttpServer())
      .patch(`/noivos/${noivo.id}`)
      .send({ contato: noivo.contato })
      .expect(200)
      .then((response) => {
        expect(response.body.contato).toEqual(noivo.contato);
      });
  });

  /**
  it('/noivos/:id (DELETE)', () => {
    return request(app.getHttpServer())
    .delete(`/noivos/${noivo.id}`)
    .expect(200);
  });
  */
});
