import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMcqDto } from './dto/create-mcq.dto';
import { Mcq } from './entities/mcq.entity';


@Injectable()
export class McqService {
  constructor(
    @InjectRepository(Mcq)
    private mcqRepository: Repository<Mcq>,
  ) { }

  create(createMcqDto: CreateMcqDto) {
    return this.mcqRepository.save(createMcqDto).then(res => { return res }).catch(err => { return err });
  }

  findOne(user_id: string, mcq_id: string) {
    return this.mcqRepository.findOne({ where: { user_id: user_id, mcq_id: mcq_id } }).then(res => { return res }).catch(err => { return err });
  }

  bulkCreate(createMcqsDto: any) {
    for (let i = 0; i < createMcqsDto.length; i++) {
      return this.mcqRepository.save(createMcqsDto[i]).then(res => { return res }).catch(err => { return err });
    }
  }
  delete(mcq_id: string) {
    return this.mcqRepository.delete({ mcq_id }).then(res => { return res }).catch(err => { return err });
  }

  getAllByUsers(user_id: string) {
    return this.mcqRepository.find({ where: { user_id: user_id } }).then(res => { return res }).catch(err => { return err });
  }
}
