import { Test, TestingModule } from '@nestjs/testing';
import { MuralService } from './mural.service';

describe('MuralService', () => {
  let service: MuralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MuralService],
    }).compile();

    service = module.get<MuralService>(MuralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
