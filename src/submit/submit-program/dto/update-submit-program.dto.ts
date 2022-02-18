import { PartialType } from '@nestjs/swagger';
import { CreateSubmitProgramDto } from './create-submit-program.dto';

export class UpdateSubmitProgramDto extends PartialType(CreateSubmitProgramDto) {}
