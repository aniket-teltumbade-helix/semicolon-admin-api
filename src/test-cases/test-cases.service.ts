import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import { TestCase } from './entities/test-case.entity';
import * as uuid from 'uuid'

@Injectable()
export class TestCasesService {
  constructor(
    @InjectRepository(TestCase)
    private testCaseService: Repository<TestCase>) {

  }
  create(createTestCaseDto: CreateTestCaseDto) {
    return this.testCaseService.save({ ...createTestCaseDto, testcase_id: uuid.v4() }).then(res => res).catch(err => err)
  }

  findByProgram(program_id: string) {
    return this.testCaseService.find({ where: { program_id } }).then(res => res).catch(err => err)
  }

}
