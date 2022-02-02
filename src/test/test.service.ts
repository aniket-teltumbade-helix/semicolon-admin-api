import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/auth.entity';
import { Repository } from 'typeorm';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {

  constructor(
    @InjectRepository(Auth)
    private usersRepository: Repository<Auth>,
  ) { }

  update(id: string, updateTestDto: UpdateTestDto) {
    return this.usersRepository.update({ user_id: id }, { test_name: updateTestDto.test_name })
  }

}
