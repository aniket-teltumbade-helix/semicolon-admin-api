import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errorMessage } from 'src/error';
import { Repository } from 'typeorm';
import { CreateMcqDto } from './dto/create-mcq.dto';
import { Mcq } from './entities/mcq.entity';


@Injectable()
export class McqService {
  constructor(
    @InjectRepository(Mcq)
    private mcqRepository: Repository<Mcq>,
  ) { }

  create(createMcqDto: any) {
    if (!createMcqDto.answer &&
      !createMcqDto.a &&
      !createMcqDto.b &&
      !createMcqDto.c &&
      !createMcqDto.d &&
      !createMcqDto.question &&
      !createMcqDto.question_number &&
      !createMcqDto.points) {
      return errorMessage('BAD_REQUEST', 'Some fields are missing.')
    }
    return this.mcqRepository.save(createMcqDto).then(res => { return res }).catch(err => { return err });
  }

  findOne(contest_id: string, mcq_id: string) {
    if ((!contest_id || contest_id === '') && (!mcq_id || mcq_id === '')) return errorMessage('BAD_REQUEST', 'contest_id and mcq_id required!');
    return this.mcqRepository.findOne({ where: { contest_id: contest_id, mcq_id: mcq_id } }).then(res => { return res }).catch(err => { return err });
  }

  bulkCreate(createMcqsDto: any) {
    for (let i = 0; i < createMcqsDto.length; i++) {
      return this.mcqRepository.save(createMcqsDto[i]).then(res => { return res }).catch(err => { return err });
    }
  }
  delete(mcq_id: string) {
    if (!mcq_id || mcq_id === '') return errorMessage('BAD_REQUEST', 'mcq_id is required!');
    return this.mcqRepository.delete({ mcq_id }).then(res => { return res }).catch(err => { return err });
  }

  getAllByUsers(contest_id: string) {
    if (!contest_id || contest_id === '') return errorMessage('BAD_REQUEST', 'contest_id is required!');
    return this.mcqRepository.find({ where: { contest_id: contest_id } }).then(res => { return res }).catch(err => { return err });
  }
}
