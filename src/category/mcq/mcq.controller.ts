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
    if (!createMcqDto.answer && !createMcqDto.option1 && !createMcqDto.option2 && !createMcqDto.option3 && !createMcqDto.option4 && !createMcqDto.question && !createMcqDto.question_number && !createMcqDto.time && !createMcqDto.points) {
      return errorMessage('BAD_REQUEST', 'Some fields are messing.')
    }
    return this.mcqService.create({ ...createMcqDto, mcq_id: uuid.v4() });
  }

  @Post('bulk-create')
  bulkCreate(@Body() createMcqsDto: CreateMcqsDto) {
    let createMcqArray = createMcqsDto.map(el => { return { ...el, mcq_id: uuid.v4() } });
    return this.mcqService.bulkCreate(createMcqArray);
  }

  @Get(':user_id/:mcq_id')
  findOne(@Param('user_id') user_id: string, @Param('mcq_id') mcq_id) {
    return this.mcqService.findOne(user_id, mcq_id);
  }

  @Get('delete/:mcq_id')
  delete(@Param('mcq_id') mcq_id) {
    return this.mcqService.delete(mcq_id);
  }

  @Get('byuser/:user_id')
  getAllMcqsByUser(@Param('user_id') user_id: string) {
    return this.mcqService.getAllByUsers(user_id)
  }
}
