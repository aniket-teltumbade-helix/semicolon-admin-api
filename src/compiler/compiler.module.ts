import { Module } from '@nestjs/common';
import { CompilerService } from './compiler.service';
import { CompilerController } from './compiler.controller';
import { NodeModule } from './node/node.module';
import { JavaModule } from './java/java.module';

@Module({
  controllers: [CompilerController],
  providers: [CompilerService],
  imports: [NodeModule, JavaModule]
})
export class CompilerModule {}
