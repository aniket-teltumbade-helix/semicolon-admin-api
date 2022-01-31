import { Inject, Injectable } from '@nestjs/common';
import { Prog } from './prog.entity';
import * as uuid from 'uuid'

@Injectable()
export class ProgService {
  constructor(
    @Inject('PROG_REPOSITORY')
    private progRepository: typeof Prog,
  ) { }

  createProg(prog) {
    prog = { prog_id: uuid.v4(), ...prog };
    return this.progRepository.create(prog).then(res => { return res }).catch(err => { return err });
  }

  getAllProgs() {
    return this.progRepository.findAll();
  }

  findProg(prog_id) {
    return this.progRepository.findOne({ where: { prog_id } }).then(res => { return res }).catch(err => { return err });
  }
  deleteProg(prog_id, user_id) {
    return this.progRepository.destroy({ where: { prog_id, user_id } }).then(res => { return res }).catch(err => { return err });
  }
}
