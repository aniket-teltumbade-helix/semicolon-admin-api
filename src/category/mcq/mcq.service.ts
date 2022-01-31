import { Inject, Injectable } from '@nestjs/common';
import { CreateMcqDto } from './dto/create-mcq.dto';
import { CreateMcqsDto } from './dto/create-mcqs.dto';
import { Mcq } from './entities/mcq.entity';


@Injectable()
export class McqService {
  constructor(
    @Inject('MCQ_REPOSITORY')
    private mcqRepository: typeof Mcq,
  ) { }

  create(createMcqDto: CreateMcqDto) {
    return this.mcqRepository.create(createMcqDto).then(res => { return res }).catch(err => { return err });
  }

  findOne(user_id: string, mcq_id: string) {
    return this.mcqRepository.findOne({ where: { user_id: user_id, mcq_id: mcq_id } }).then(res => { return res }).catch(err => { return err });
  }

  bulkCreate(createMcqsDto: any) {
    return this.mcqRepository.bulkCreate(createMcqsDto).then(res => { return res }).catch(err => { return err });
  }
  delete(mcq_id: string) {
    return this.mcqRepository.destroy({ where: { mcq_id } }).then(res => { return res }).catch(err => { return err });
  }

  getAllByUsers(user_id: string) {
    return this.mcqRepository.findAll({ where: { user_id: user_id } }).then(res => { return res }).catch(err => { return err });
  }
}
