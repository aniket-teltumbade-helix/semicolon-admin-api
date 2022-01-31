import { Inject, Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/auth.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {

  constructor(
    @Inject('AUTH_REPOSITORY')
    private usersRepository: typeof Auth,
  ) { }
  update(id: string, updateTestDto: UpdateTestDto) {
    return this.usersRepository.update({ test_name: updateTestDto.test_name }, { where: { user_id: id } })
  }

}
