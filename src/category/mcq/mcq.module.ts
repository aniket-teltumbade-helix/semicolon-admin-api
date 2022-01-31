import { Module } from '@nestjs/common';
import { McqService } from './mcq.service';
import { McqController } from './mcq.controller';
import { mcqProviders } from './mcq';

@Module({
  controllers: [McqController],
  providers: [McqService, ...mcqProviders]
})
export class McqModule { }
