import { Test, TestingModule } from '@nestjs/testing';
import { CasamentosController } from './casamentos.controller';
import { CasamentosService } from './casamentos.service';

describe('CasamentosController', () => {
  let controller: CasamentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasamentosController],
      providers: [CasamentosService],
    }).compile();

    controller = module.get<CasamentosController>(CasamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
