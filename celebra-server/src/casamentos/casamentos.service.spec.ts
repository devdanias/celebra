import { Test, TestingModule } from '@nestjs/testing';
import { CasamentosService } from './casamentos.service';

describe('CasamentosService', () => {
  let service: CasamentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasamentosService],
    }).compile();

    service = module.get<CasamentosService>(CasamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
