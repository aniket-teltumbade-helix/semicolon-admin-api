import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { candidateProviders } from './candidate';

@Module({
  controllers: [CandidateController],
  providers: [CandidateService, ...candidateProviders]
})
export class CandidateModule { }
