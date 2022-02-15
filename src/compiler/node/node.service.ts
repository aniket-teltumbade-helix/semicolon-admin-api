import { Injectable } from '@nestjs/common';
import { UpdateNodeDto } from './dto/update-node.dto';

@Injectable()
export class NodeService {
  run(runNodeDto: any) {
    return runNodeDto;
  }
}
