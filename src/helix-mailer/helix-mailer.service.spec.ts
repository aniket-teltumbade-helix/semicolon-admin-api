import { Test, TestingModule } from '@nestjs/testing';
import { HelixMailerService } from './helix-mailer.service';

describe('HelixMailerService', () => {
  let service: HelixMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelixMailerService],
    }).compile();

    service = module.get<HelixMailerService>(HelixMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
