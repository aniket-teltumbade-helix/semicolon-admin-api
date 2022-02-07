import { Get, Inject, Injectable, Res } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { Invite } from './entities/invite.entity';
import * as uuid from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { errorMessage } from 'src/error';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CreateBulkCandidate } from './dto/create.bulk.dto';
import { AwsMailerService } from 'src/aws-mailer/aws-mailer.service';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,

    @InjectRepository(Invite)
    private inviteRepository: Repository<Invite>,

    private readonly mailerService: AwsMailerService

  ) { }

  create(createCandidateDto: any) {
    let createCandidateWithId = { ...createCandidateDto, candidate_id: uuid.v4(), pin: Math.floor(100000 + Math.random() * 900000) }
    if (!createCandidateDto.email && createCandidateDto.email !== '') return errorMessage('BAD_REQUEST', 'Email is required');
    return this.candidateRepository.save(createCandidateWithId).then(res => {
      return this.mailerService.sendMail(res.email, res.pin).then(resMail => {
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
          return this.mailerService.sendMail(resInvite.email, resInvite.magic_string).then(resMail => {
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



  async bulkCreate(createBulkCandidate: CreateBulkCandidate) {
    var resArray = []
    for (let i = 0; i < createBulkCandidate.candidates.length; i++) {
      try {
        let resPin = await this.candidateRepository.save({
          ...createBulkCandidate.candidates[i],
          candidate_id: uuid.v4(),
          pin: Math.floor(100000 + Math.random() * 900000)
        })
        try {
          let resMail = await this.mailerService.sendMail(resPin.email, resPin.pin)
          resArray.push(resMail)
        } catch (error) {
          errorMessage('CONFLICT', 'Something went wrong!')
        }
      } catch (error) {
        errorMessage('CONFLICT', 'Something went wrong!')
      }
    }
    return resArray
  }
}
