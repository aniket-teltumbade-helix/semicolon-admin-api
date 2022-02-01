import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramController } from './program.controller';
import { Program } from './program.entity';
import { progProviders } from './program.provider';
import { ProgramService } from './program.service';

@Module({
  imports: [TypeOrmModule.forFeature([Program])],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgModule { }
