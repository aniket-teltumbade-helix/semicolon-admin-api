import { PartialType } from '@nestjs/swagger';
import { CreateCompilerDto } from './create-compiler.dto';

export class UpdateCompilerDto extends PartialType(CreateCompilerDto) {}
