import { Injectable } from '@nestjs/common';
import { CreatePythonDto } from './dto/create-python.dto';
import { UpdatePythonDto } from './dto/update-python.dto';

@Injectable()
export class PythonService {
  run(runPythonDto: any) {
    return runPythonDto;
  }
}
