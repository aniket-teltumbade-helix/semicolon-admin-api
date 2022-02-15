import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TestCasesService } from './test-cases.service';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { CreateBulkTestCasesDto } from './dto/create-bulk-test-cases.dto';

@Controller()
export class TestCasesController {
  constructor(private readonly testCasesService: TestCasesService) { }

  @Post()
  create(@Body() createTestCaseDto: CreateTestCaseDto) {
    return this.testCasesService.create(createTestCaseDto);
  }

  @Get('byprogram/:program_id')
  findByProgram(@Param('program_id') program_id: string) {
    return this.testCasesService.findByProgram(program_id);
  }

  @Post('/bulk-create')
  createBulk(@Body() createBulkTestCasesDto: CreateBulkTestCasesDto) {
    return this.testCasesService.createBulk(createBulkTestCasesDto);
  }
}
