import { Test, TestingModule } from '@nestjs/testing';
import { Mcq } from './mcq';

describe('Mcq', () => {
  let provider: Mcq;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mcq],
    }).compile();

    provider = module.get<Mcq>(Mcq);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
