import { Module } from '@nestjs/common';
import { CandidateModule } from './candidate/candidate.module';
import { McqModule } from './mcq/mcq.module';
@Module({
  imports: [CandidateModule, McqModule],
  providers: []
})
export class CategoryModule { }
