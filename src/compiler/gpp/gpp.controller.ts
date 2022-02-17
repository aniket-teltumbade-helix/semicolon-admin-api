import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req } from '@nestjs/common';
import { GppService } from './gpp.service';
import { CreateGppDto } from './dto/create-gpp.dto';
import { UpdateGppDto } from './dto/update-gpp.dto';
import { GppInterceptor } from 'src/helpers/gpp.interceptor';
import { CompileProgramDto } from '../dto/run-compiler.dto';

@Controller()
export class GppController {
  constructor(private readonly gppService: GppService) { }

  @UseInterceptors(GppInterceptor)
  @Post()
  run(@Body() runGccDto: CompileProgramDto, @Req() req) {
    return this.gppService.run({ ...runGccDto, ...req.body });
  }

}
