import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestCasesService } from './test-cases.service';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';

@Controller('test-cases')
export class TestCasesController {
  constructor(private readonly testCasesService: TestCasesService) { }

  @Post()
  create(@Body() createTestCaseDto: CreateTestCaseDto) {
    return this.testCasesService.create(createTestCaseDto);
  }

  @Get('byprogram/:program_id')
  findByProgram(@Param('program_id') program_id: string) {
    return this.testCasesService.findByProgram(program_id)
  }
}
