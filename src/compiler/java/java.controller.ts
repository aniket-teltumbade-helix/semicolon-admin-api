import { Controller, Post, Body, UseInterceptors, Req } from '@nestjs/common';
import { JavaService } from './java.service';
import { JavaCompilerInterceptor } from 'src/helpers/java-compiler.interceptor';
import { CompileProgramDto } from '../dto/run-compiler.dto';

@Controller()
export class JavaController {
  constructor(private readonly javaService: JavaService) { }

  @UseInterceptors(JavaCompilerInterceptor)
  @Post()
  run(@Body() runJavaDto: CompileProgramDto, @Req() req) {
    return this.javaService.run({ ...runJavaDto, ...req.body });
  }
}
