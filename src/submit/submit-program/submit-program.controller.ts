import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmitProgramService } from './submit-program.service';
import { CreateSubmitProgramDto } from './dto/create-submit-program.dto';
import { UpdateSubmitProgramDto } from './dto/update-submit-program.dto';

@Controller('submit-program')
export class SubmitProgramController {
  constructor(private readonly submitProgramService: SubmitProgramService) { }

  @Post()
  create(@Body() createSubmitProgramDto: CreateSubmitProgramDto) {
    return this.submitProgramService.create(createSubmitProgramDto);
  }
}
