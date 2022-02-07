import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { candidateProviders } from './candidate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Invite } from './entities/invite.entity';
import { AwsMailerService } from 'src/aws-mailer/aws-mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, Invite])],
  controllers: [CandidateController],
  providers: [CandidateService, AwsMailerService]
})
export class CandidateModule { }
