import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/auth.entity';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {

  constructor(
    @InjectRepository(Auth)
    private usersRepository: Repository<Auth>,
  ) { }
  update(id: string, updateTestDto: UpdateTestDto) {
    return this.usersRepository.update({ test_name: updateTestDto.test_name }, { user_id: id })
  }

}
