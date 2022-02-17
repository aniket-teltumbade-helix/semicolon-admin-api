import { Module } from '@nestjs/common';
import { CompilerService } from './compiler.service';
import { CompilerController } from './compiler.controller';
import { NodeModule } from './node/node.module';
import { JavaModule } from './java/java.module';
import { PythonModule } from './python/python.module';
import { GccModule } from './gcc/gcc.module';

@Module({
  controllers: [CompilerController],
  providers: [CompilerService],
  imports: [NodeModule, JavaModule, PythonModule, GccModule]
})
export class CompilerModule {}
