import { PartialType } from '@nestjs/swagger';
import { CreatePythonDto } from './create-python.dto';

export class UpdatePythonDto extends PartialType(CreatePythonDto) {}
