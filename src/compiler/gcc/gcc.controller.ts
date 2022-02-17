import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req } from '@nestjs/common';
import { GccService } from './gcc.service';
import { CreateGccDto } from './dto/create-gcc.dto';
import { UpdateGccDto } from './dto/update-gcc.dto';
import { GccInterceptor } from 'src/helpers/gcc.interceptor';
import { CompileProgramDto } from '../dto/run-compiler.dto';

@Controller()
export class GccController {
  constructor(private readonly gccService: GccService) { }

  @UseInterceptors(GccInterceptor)
  @Post()
  run(@Body() runGccDto: CompileProgramDto, @Req() req) {
    return this.gccService.run({ ...runGccDto, ...req.body });
  }
}
