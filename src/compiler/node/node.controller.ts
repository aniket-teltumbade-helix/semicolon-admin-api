import { Controller, Post, Body, UseInterceptors, Req } from '@nestjs/common';
import { NodeCompilerInterceptor } from 'src/helpers/node-compiler.interceptor';
import { CompileProgramDto } from '../dto/run-compiler.dto';
import { NodeService } from './node.service';

@Controller()
export class NodeController {
  constructor(private readonly nodeService: NodeService) { }

  @UseInterceptors(NodeCompilerInterceptor)
  @Post()
  run(@Body() runNodeDto: CompileProgramDto, @Req() req) {
    return this.nodeService.run({ ...runNodeDto, ...req.body });
  }
}
