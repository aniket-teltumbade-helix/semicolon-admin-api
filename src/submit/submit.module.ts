import { Module } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitController } from './submit.controller';
import { SubmitProgramModule } from './submit-program/submit-program.module';

@Module({
  controllers: [SubmitController],
  providers: [SubmitService],
  imports: [SubmitProgramModule]
})
export class SubmitModule {}
