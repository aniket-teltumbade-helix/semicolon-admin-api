import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/auth.entity';
import { errorMessage } from 'src/error';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';
import * as uuid from 'uuid';

@Injectable()
export class TestService {

  constructor(
    @InjectRepository(Auth)
    private usersRepository: Repository<Auth>,

    @InjectRepository(Auth)
    private contestRepository: Repository<Test>,
  ) { }

  update(id: string, updateTestDto: UpdateTestDto) {
    return this.usersRepository
      .update({ admin_id: id }, { test_name: updateTestDto.test_name })
      .then(res => {
        if (res.affected === 0) {
          return errorMessage("UNAUTHORIZED", "Wrong Admin Id")
        }
        return { affected: res.affected }
      }).catch(err => err)
  }

  create(createTest: CreateTestDto) {
    return this.contestRepository.save({ ...createTest, contest_id: uuid.v4() }).then(res => res).catch(err => err)
  }
}
