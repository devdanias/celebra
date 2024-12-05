import { Test, TestingModule } from '@nestjs/testing';
import { NoivosService } from './noivos.service';

describe('NoivosService', () => {
  let service: NoivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoivosService],
    }).compile();

    service = module.get<NoivosService>(NoivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
