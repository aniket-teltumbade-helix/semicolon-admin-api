import { Test, TestingModule } from '@nestjs/testing';
import { HelixMailerController } from './helix-mailer.controller';

describe('HelixMailerController', () => {
  let controller: HelixMailerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelixMailerController],
    }).compile();

    controller = module.get<HelixMailerController>(HelixMailerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
