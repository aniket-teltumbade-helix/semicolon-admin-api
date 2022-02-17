import { PartialType } from '@nestjs/swagger';
import { CreateGppDto } from './create-gpp.dto';

export class UpdateGppDto extends PartialType(CreateGppDto) {}
