import { Test, TestingModule } from '@nestjs/testing';
import { ConvidadosService } from './convidados.service';

describe('ConvidadosService', () => {
  let service: ConvidadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvidadosService],
    }).compile();

    service = module.get<ConvidadosService>(ConvidadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
