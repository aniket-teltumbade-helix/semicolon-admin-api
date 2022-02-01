import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { InviteCandidateDto } from './dto/invite-candidate.dto';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) { }

  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
  }

  @Get(':candidate_id/:user_id')
  findOne(@Param('candidate_id') candidate_id: string, @Param('user_id') user_id: string) {
    return this.candidateService.findOne(candidate_id, user_id);
  }

  @Post('delete/:candidate_id')
  deleteCandidate(@Param('candidate_id') candidate_id: string) {
    return this.candidateService.delete(candidate_id)
  }

  @Post('invite')
  inviteCandidate(@Body() inviteCandidateDto: InviteCandidateDto, @Request() req: any) {
    let { candidate_id, test_id, route } = inviteCandidateDto
    return this.candidateService.invite(candidate_id, test_id, req.headers['origin'], route)
  }
}
