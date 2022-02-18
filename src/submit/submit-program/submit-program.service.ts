import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from 'src/prog/program.entity';
import { gcccompiler } from 'src/utils/compiler/gcccompiler';
import { Repository } from 'typeorm';
import { CreateSubmitProgramDto } from './dto/create-submit-program.dto';
import { UpdateSubmitProgramDto } from './dto/update-submit-program.dto';
import { SubmitProgram } from './entities/submit-program.entity';
import { v4 as v4uuid } from "uuid";
import * as path from "path";
import { gppcompiler } from 'src/utils/compiler/gppcompiler';
import { pythoncompiler } from 'src/utils/compiler/pythonCompiler';
import { nodecompiler } from 'src/utils/compiler/nodecompiler';
import { javacompiler } from 'src/utils/compiler/javacompiler';

@Injectable()
export class SubmitProgramService {
  constructor(
    @InjectRepository(SubmitProgram)
    private submitProgramRepository: Repository<SubmitProgram>,

    @InjectRepository(Program)
    private programRepository: Repository<Program>,
  ) { }

  create(createSubmitProgramDto: CreateSubmitProgramDto) {
    const { candidate_id, contest_id, language, prog_id, script } = createSubmitProgramDto
    var marks = 0
    this.programRepository.findOne({ where: { prog_id } }).then(prog => {
      const { input, output, points } = prog
      var uusidString = v4uuid()
      var dir = path.join(__dirname, '..', 'scripts', uusidString.slice(0, uusidString.indexOf("-")));
      switch (language) {
        case 'c':
          let c = gcccompiler(dir, { script, input })
          if (c.message) {
            if (c.message === output) {
              marks = points
            }
          }
          break;

        case 'cpp':
          let cpp = gppcompiler(dir, { script, input })
          if (cpp.message) {
            if (cpp.message === output) {
              marks = points
            }
          }
          break;

        case 'python':
          let python = pythoncompiler(dir, { script, input })
          if (python.message) {
            if (python.message === output) {
              marks = points
            }
          }
          break;

        case 'javascript':
          let javascript = nodecompiler(dir, uusidString, { script, input })
          if (javascript.message) {
            if (javascript.message === output) {
              marks = points
            }
          }
          break;

        case 'java':
          let java = javacompiler(dir, { script, input })
          if (java.message) {
            if (java.message === output) {
              marks = points
            }
          }
          break;
        default:
          break;
      }
      this.submitProgramRepository.save({ sub_id: uusidString, candidate_id, prog_id, script, points: marks })
      return { message: 'Submitted Successfully!' };
    }).catch(err => err)
  }

}
