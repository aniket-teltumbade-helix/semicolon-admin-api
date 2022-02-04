import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { errorMessage } from 'src/error';
import { CreateBulkProgram } from './dto/bulk-create-program.dto';
import { CreateProgramDto, CreateProgramResponseDto } from './dto/create_program.dto';
import { Program } from './program.entity';
import { ProgramService } from './program.service';

@Controller()
export class ProgramController {
  constructor(private readonly progService: ProgramService) { }

  @Post('/add')
  addProg(@Body() prog: CreateProgramDto): Promise<CreateProgramResponseDto> {
    if (!prog.input && !prog.output && !prog.points && !prog.question && !prog.time) return errorMessage('BAD_REQUEST', 'Some fields are missing!')
    return this.progService
      .createProg(prog).then(res => { return res }).catch(err => { return err });
  }


  @Post('bulk-create')
  bulkCreate(@Body() createBulkProgram: CreateBulkProgram) {
    return this.progService.bulkCreate(createBulkProgram);
  }

  @Get('/get')
  getAllProg(): Promise<any> {
    return this.progService
      .getAllProgs().then(res => { return res }).catch(err => { return err });
  }

  @Get('/get/:id')
  getProg(@Param('id') id): Promise<any> {
    return this.progService
      .findProg(id).then(res => { return res }).catch(err => { return err });
  }
  @Get('/delete/:prog_id/:user_id')
  deleteProg(@Param('prog_id') prog_id: string, @Param('user_id') user_id: string): Promise<any> {
    return this.progService.deleteProg(prog_id, user_id).then(res => { return res }).catch(err => { return err });
  }
}
