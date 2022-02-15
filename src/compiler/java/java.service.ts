import { Injectable } from '@nestjs/common';
import { CreateJavaDto } from './dto/create-java.dto';
import { UpdateJavaDto } from './dto/update-java.dto';

@Injectable()
export class JavaService {
  run(runJavaDto: any) {
    return runJavaDto;
  }
}
