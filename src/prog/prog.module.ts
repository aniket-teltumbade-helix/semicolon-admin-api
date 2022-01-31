import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProgController } from './prog.controller';
import { progProviders } from './prog.provider';
import { ProgService } from './prog.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProgController],
  providers: [ProgService, ...progProviders],
})
export class ProgModule {}
