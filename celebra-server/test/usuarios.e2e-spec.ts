import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsuariosModule } from '../src/usuarios/usuarios.module';
// import { PrismaService } from '../src/prisma.service';

describe('UsuariosController (e2e)', () => {
  let app: INestApplication;

  const user = { id: 1, nome: 'Alice', email: 'a@b.com', senha: '123456' };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsuariosModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // const prismaService = new PrismaService();
    // await prismaService.usuario.deleteMany();
  });

  it('/usuarios (POST)', () => {
    return request(app.getHttpServer())
      .post('/usuarios')
      .send({ nome: user.nome, email: user.email, senha: user.senha })
      .expect(201)
      .then((response) => {
        user.id = response.body.id;
      });
  });

  it('/usuarios (GET)', () => {
    // testar aqui as rotas de auth
    return request(app.getHttpServer()).get('/usuarios').expect(200);
  });

  it('/usuarios/:id (GET)', () => {
    return request(app.getHttpServer()).get(`/usuarios/${user.id}`).expect(200);
  });

  it('/usuarios/:id (GET) - Not Found', () => {
    const notFoundId = 0;
    return request(app.getHttpServer())
      .get(`/usuarios/${notFoundId}`)
      .expect(404);
  });

  it('/usuarios/:id (PATCH)', () => {
    user.email = 'b@b.com';
    return request(app.getHttpServer())
      .patch(`/usuarios/${user.id}`)
      .send({ email: user.email })
      .expect(200)
      .then((response) => {
        expect(response.body.email).toEqual(user.email);
      });
  });
});
