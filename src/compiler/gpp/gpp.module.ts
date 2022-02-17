import { Module } from '@nestjs/common';
import { GppService } from './gpp.service';
import { GppController } from './gpp.controller';

@Module({
  controllers: [GppController],
  providers: [GppService]
})
export class GppModule {}
