import { Test, TestingModule } from '@nestjs/testing';
import { ConvidadosController } from './convidados.controller';
import { ConvidadosService } from './convidados.service';

describe('ConvidadosController', () => {
  let controller: ConvidadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConvidadosController],
      providers: [ConvidadosService],
    }).compile();

    controller = module.get<ConvidadosController>(ConvidadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
