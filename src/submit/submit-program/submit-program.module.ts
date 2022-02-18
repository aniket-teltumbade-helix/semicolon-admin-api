import { Module } from '@nestjs/common';
import { SubmitProgramService } from './submit-program.service';
import { SubmitProgramController } from './submit-program.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitProgram } from './entities/submit-program.entity';
import { Program } from 'src/prog/program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubmitProgram, Program])],
  controllers: [SubmitProgramController],
  providers: [SubmitProgramService]
})
export class SubmitProgramModule { }
