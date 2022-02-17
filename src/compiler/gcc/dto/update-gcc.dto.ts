import { PartialType } from '@nestjs/swagger';
import { CreateGccDto } from './create-gcc.dto';

export class UpdateGccDto extends PartialType(CreateGccDto) {}
