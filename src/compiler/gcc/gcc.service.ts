import { Injectable } from '@nestjs/common';
import { CreateGccDto } from './dto/create-gcc.dto';
import { UpdateGccDto } from './dto/update-gcc.dto';

@Injectable()
export class GccService {
  run(runGccDto: any) {
    return runGccDto;
  }
}
