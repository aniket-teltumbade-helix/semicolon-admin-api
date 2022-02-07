import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { McqService } from './mcq.service';
import { CreateMcqDto } from './dto/create-mcq.dto';
import * as uuid from 'uuid'
import { CreateMcqsDto } from './dto/create-mcqs.dto';
import { errorMessage } from 'src/error';

@Controller('mcq')
export class McqController {
  constructor(private readonly mcqService: McqService) { }

  @Post()
  create(@Body() createMcqDto: CreateMcqDto) {
    return this.mcqService.create({ ...createMcqDto, mcq_id: uuid.v4() });
  }

  @Post('bulk-create')
  bulkCreate(@Body() createMcqsDto: CreateMcqsDto) {
    return this.mcqService.bulkCreate(createMcqsDto);
  }

  @Get('delete/:mcq_id')
  delete(@Param('mcq_id') mcq_id) {
    return this.mcqService.delete(mcq_id);
  }

  @Get('bycontest/:contest_id')
  getAllMcqsByContest(@Param('contest_id') contest_id: string) {
    return this.mcqService.getByContest(contest_id)
  }

  @Get(':contest_id/:mcq_id')
  findOne(@Param('contest_id') contest_id: string, @Param('mcq_id') mcq_id) {
    return this.mcqService.findOne(contest_id, mcq_id);
  }
}
