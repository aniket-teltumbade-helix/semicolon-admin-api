import { PartialType } from '@nestjs/swagger';
import { CreateJavaDto } from './create-java.dto';

export class UpdateJavaDto extends PartialType(CreateJavaDto) {}
