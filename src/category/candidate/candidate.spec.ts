import { Test, TestingModule } from '@nestjs/testing';
import { Candidate } from './candidate';

describe('Candidate', () => {
  let provider: Candidate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Candidate],
    }).compile();

    provider = module.get<Candidate>(Candidate);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
