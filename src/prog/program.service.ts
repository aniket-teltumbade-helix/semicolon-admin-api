import { Inject, Injectable } from '@nestjs/common';
import { Program } from './program.entity';
import * as uuid from 'uuid'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private progRepository: Repository<Program>,
  ) { }

  createProg(prog) {
    prog = { prog_id: uuid.v4(), ...prog };
    return this.progRepository.save(prog).then(res => { return res }).catch(err => { return err });
  }

  getAllProgs() {
    return this.progRepository.find();
  }

  findProg(prog_id) {
    return this.progRepository.findOne({ where: { prog_id } }).then(res => { return res }).catch(err => { return err });
  }
  deleteProg(prog_id, contest_id) {
    return this.progRepository.delete({ prog_id, contest_id }).then(res => { return res }).catch(err => { return err });
  }
}
