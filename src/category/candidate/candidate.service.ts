import { Inject, Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import * as uuid from 'uuid';

@Injectable()
export class CandidateService {
  constructor(
    @Inject('CANDIDATE_REPOSITORY')
    private candidateRepository: typeof Candidate,
  ) { }

  create(createCandidateDto: any) {
    let createCandidateWithId = { ...createCandidateDto, candidate_id: uuid.v4() }
    return this.candidateRepository.create(createCandidateWithId)
  }

  findOne(candidate_id: string, user_id: string) {
    return this.candidateRepository.findOne({ where: { candidate_id: candidate_id, user_id: user_id } })
  }
  delete(candidate_id: string) {
    return this.candidateRepository.destroy({ where: { candidate_id } })
  }
}
