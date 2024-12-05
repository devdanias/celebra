import { Test, TestingModule } from '@nestjs/testing';
import { NoivosController } from './noivos.controller';
import { NoivosService } from './noivos.service';

describe('NoivosController', () => {
  let controller: NoivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoivosController],
      providers: [NoivosService],
    }).compile();

    controller = module.get<NoivosController>(NoivosController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();

    const data = {
      nome: 'Alice',
      cpf: '17539619716',
      contato: 'aliceassis455@gmail.com',
      rg: '273610477',
      endereco: 'Rua das princesas',
    };

    const createdNoivo = await controller.create(data);

    expect(createdNoivo).toBeDefined();
  });
});
