import { Get, Inject, Injectable, Res } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { Invite } from './entities/invite.entity';
import * as uuid from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { errorMessage } from 'src/error';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

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
    let createCandidateWithId = { ...createCandidateDto, candidate_id: uuid.v4(), pin: Math.floor(100000 + Math.random() * 900000) }
    if (!createCandidateDto.email && createCandidateDto.email !== '') return errorMessage('BAD_REQUEST', 'Email is required');
    return this.candidateRepository.save(createCandidateWithId).then(res => {
      return this.mailerService.sendMail({
        to: res.email,
        from: 'noreply@helixstack.in',
        subject: 'Helix Contest Invitation',
        template: 'newcandidate',
        context: {
          name: res.name,
          pin: res.pin
        },
      }).then(resMail => {
        return { messageId: resMail.messageId };
      }).catch(resErr => console.log(resErr))
    }).catch(err => { return err });
  }

  verifyCandidate(verifyCandidate: UpdateCandidateDto) {
    return this.candidateRepository
      .findOne({ where: { email: verifyCandidate.email } })
      .then(res => {
        if (res && res.pin) {
          return this.candidateRepository
            .update({ email: res.email }, { pin: null })
            .then(res => res)
            .catch(err => err)
        }
        else {
          return errorMessage('NOT_FOUND', 'Pin is invalid')
        }
      })
  }

  findOne(candidate_id: string, admin_id: string) {
    if (!candidate_id && candidate_id !== '' && !admin_id && admin_id !== '') return errorMessage('BAD_REQUEST', 'candidate_id and admin_id is required!')
    return this.candidateRepository
      .findOne({ where: { candidate_id: candidate_id, admin_id: admin_id } })
      .then(res => { return res })
      .catch(err => { return err });
  }
  delete(candidate_id: string) {
    if (!candidate_id && candidate_id !== '') return errorMessage('BAD_REQUEST', 'candidate_id is required!')
    return this.candidateRepository
      .delete({ candidate_id })
      .then(res => { return res })
      .catch(err => { return err });
  }

  invite(candidate_id: string, test_id: string, origin: string, route: string) {
    if (!candidate_id && !test_id) {
      return errorMessage('BAD_REQUEST', 'candidate_id and test_id is required!');
    }
    return this.candidateRepository.findOne({ where: { candidate_id } }).then(res => {
      if (res) {
        return this.inviteRepository.save({
          candidate_id,
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
            return { test_id: resInvite.test_id, messageId: resMail.messageId };
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
  startTest(magic_string: string) {
    if (magic_string === '' || !magic_string) return errorMessage('BAD_REQUEST', 'Magic code is not valid')
    return this.inviteRepository.findOne({ where: { magic_string } }).then(res => {
      console.log(res);

      if (res && !res.visited) {
        return this.inviteRepository.update({ magic_string }, { visited: true }).then(resVisit => resVisit).catch(err => err)
      }
      else { return errorMessage('NOT_FOUND', 'Invitation link is invalid') }
    }).catch(err => err)
  }
}
