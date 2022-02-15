import { Controller, Body, Patch, Param, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { UpdateTestDto } from './dto/update-test.dto';
import { CreateTestDto } from './dto/create-test.dto';

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) { }

  @Patch('publish/:admin_id')
  update(@Param('admin_id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService
      .update(id, updateTestDto)
      .then((res) => res)
      .catch((err) => err);
  }

  @Post('create')
  create(@Body() createTest: CreateTestDto) {
    return this.testService
      .create(createTest)
      .then((res) => res)
      .catch((err) => err);
  }
}
