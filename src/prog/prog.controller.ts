import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prog } from './prog.entity';
import { ProgService } from './prog.service';

@Controller()
export class ProgController {
  constructor(private readonly progService: ProgService) { }

  @Post('/add')
  addProg(@Body() prog: Prog): Promise<any> {
    return this.progService
      .createProg(prog).then(res => { return res }).catch(err => { return err });
  }

  @Get('/get')
  getAllProg(): Promise<any> {
    return this.progService
      .getAllProgs().then(res => { return res }).catch(err => { return err });
  }

  @Get('/get/:id')
  getProg(@Param('id') id): Promise<any> {
    return this.progService
      .findProg(id).then(res => { return res }).catch(err => { return err });
  }
  @Get('/delete/:prog_id/:user_id')
  deleteProg(@Param('prog_id') prog_id: string, @Param('user_id') user_id: string): Promise<any> {
    return this.progService.deleteProg(prog_id, user_id).then(res => { return res }).catch(err => { return err });
  }
}
