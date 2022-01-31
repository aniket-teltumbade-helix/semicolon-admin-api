import { Controller, Body, Patch, Param } from '@nestjs/common';
import { TestService } from './test.service';
import { UpdateTestDto } from './dto/update-test.dto';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) { }

  @Patch('publish/:user_id')
  update(@Param('user_id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(id, updateTestDto).then(res => res).catch(err => err);
  }
}
