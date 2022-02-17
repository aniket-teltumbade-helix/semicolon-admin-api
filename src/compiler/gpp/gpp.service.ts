import { Injectable } from '@nestjs/common';
import { CreateGppDto } from './dto/create-gpp.dto';
import { UpdateGppDto } from './dto/update-gpp.dto';

@Injectable()
export class GppService {
  run(runGppDto: any) {
    return runGppDto;
  }
}
