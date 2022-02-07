import { Test, TestingModule } from '@nestjs/testing';
import { AwsMailerService } from './aws-mailer.service';

describe('AwsMailerService', () => {
  let service: AwsMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsMailerService],
    }).compile();

    service = module.get<AwsMailerService>(AwsMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
