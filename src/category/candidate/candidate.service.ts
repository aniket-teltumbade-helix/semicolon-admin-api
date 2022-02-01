import { Inject, Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { Invite } from './entities/invite.entity';
import * as uuid from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,

    @InjectRepository(Invite)
    private inviteRepository: Repository<Invite>,

    private readonly mailerService: MailerService

  ) { }

  create(createCandidateDto: any) {
    let createCandidateWithId = { ...createCandidateDto, candidate_id: uuid.v4() }
    return this.candidateRepository.save(createCandidateWithId).then(res => { return res }).catch(err => { return err });
  }

  findOne(candidate_id: string, user_id: string) {
    return this.candidateRepository.findOne({ where: { candidate_id: candidate_id, user_id: user_id } }).then(res => { return res }).catch(err => { return err });
  }
  delete(candidate_id: string) {
    return this.candidateRepository.delete({ candidate_id }).then(res => { return res }).catch(err => { return err });
  }

  invite(candidate_id: string, test_id: string) {
    return this.candidateRepository.findOne({ where: { candidate_id } }).then(res => {
      if (res) {
        return this.inviteRepository.manager.save({
          candidate: candidate_id,
          test_id,
          invite_id: uuid.v4(),
          pin: Math.floor(100000 + Math.random() * 900000),
        }).then(resInvite => {
          console.log(resInvite);
          return resInvite
        }).catch(err => {
          return err
        });
      }
    })
  }
}
