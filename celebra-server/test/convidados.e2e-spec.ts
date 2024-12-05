import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { ConvidadosModule } from '../src/convidados/convidados.module';
import { PrismaService } from '../src/prisma.service';
import { Usuario } from '../src/usuarios/entities/usuario.entity';

describe('ConvidadosController (e2e)', () => {
  let app: INestApplication;

  let convidado = {
    id: 1,
    nome: 'João',
    contato: '(21) 982520018',
    status: 'confirmado',
  };

  let user: Usuario;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConvidadosModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const prismaService = new PrismaService();
    await prismaService.convidado.deleteMany();
    // @ts-expect-error tests
    user = await prismaService.usuario.create({
      data: { email: 'VwzX9@example.com', senha: '123456', nome: 'Alice' },
    });

    // @ts-expect-error tests
    convidado = await prismaService.convidado.create({
      data: {
        contato: convidado.contato,
        nome: convidado.nome,
        organizadorId: user.id,
      },
    });
  });

  it('/convidados (POST)', () => {
    return request(app.getHttpServer())
      .post('/convidados')
      .send({
        nome: convidado.nome,
        contato: convidado.contato,
        organizadorId: `${user.id}`,
      })
      .expect(201);
  });

  it('/convidados (GET)', () => {
    // testar aqui as rotas de auth
    return request(app.getHttpServer()).get('/convidados').expect(200);
  });

  it('/convidados/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/convidados/${convidado.id}`)
      .expect(200);
  });

  it('/convidados/:id (GET) - Not Found', () => {
    const notFoundId = 0;
    return request(app.getHttpServer())
      .get(`/convidados/${notFoundId}`)
      .expect(404);
  });

  it('/convidados/:id (PATCH)', () => {
    convidado.contato = 'b@b.com';
    return request(app.getHttpServer())
      .patch(`/convidados/${convidado.id}`)
      .send({ contato: convidado.contato })
      .expect(200)
      .then((response) => {
        expect(response.body.contato).toEqual(convidado.contato);
      });
  });

  /**
  it('/convidados/:id (DELETE)', () => {
    return request(app.getHttpServer())
    .delete(`/convidados/${convidado.id}`)
    .expect(200);
  });
  */
});
