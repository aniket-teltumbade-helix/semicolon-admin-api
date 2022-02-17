import { Module } from '@nestjs/common';
import { GccService } from './gcc.service';
import { GccController } from './gcc.controller';

@Module({
  controllers: [GccController],
  providers: [GccService]
})
export class GccModule {}
