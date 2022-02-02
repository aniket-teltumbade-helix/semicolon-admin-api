import { Inject, Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { Invite } from './entities/invite.entity';
import * as uuid from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { errorMessage } from 'src/error';

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

  invite(candidate_id: string, test_id: string, origin: string, route: string) {
    if (!candidate_id && !test_id) {
      return errorMessage('BAD_REQUEST', 'candidate_id and test_id is required!');
    }
    return this.candidateRepository.findOne({ where: { candidate_id } }).then(res => {
      if (res) {
        return this.inviteRepository.save({
          candidate: candidate_id,
          test_id,
          invite_id: uuid.v4(),
          magic_string: uuid.v4(),
        }).then(resInvite => {
          return this.mailerService.sendMail({
            to: res.email,
            from: 'noreply@helixstack.in',
            subject: 'Helix Contest Invitation',
            template: 'invite',
            context: {
              name: res.name,
              link: route ? `${origin}/${route}/${resInvite.magic_string}` : `${origin}/${resInvite.magic_string}`
            },
          }).then(resMail => {
            return resMail;
          }).catch(resErr => console.log(resErr))
        }).catch(err => {
          return err
        });
      }
      else {
        return errorMessage('NOT_FOUND', 'Something went wrong!')
      }
    })
  }
}
