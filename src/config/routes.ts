import { RouterModule } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { CandidateModule } from 'src/category/candidate/candidate.module';
import { McqModule } from 'src/category/mcq/mcq.module';
import { CompilerModule } from 'src/compiler/compiler.module';
import { JavaModule } from 'src/compiler/java/java.module';
import { NodeModule } from 'src/compiler/node/node.module';
import { PythonModule } from 'src/compiler/python/python.module';
import { ProgModule } from 'src/prog/program.module';
import { TestCasesModule } from 'src/test-cases/test-cases.module';
import { TestModule } from 'src/test/test.module';

export const routesConfig = RouterModule.register([
  { path: 'auth', module: AuthModule },
  { path: 'program', module: ProgModule },
  { path: 'mcq', module: McqModule },
  { path: 'candidate', module: CandidateModule },
  { path: 'test', module: TestModule },
  { path: 'test-cases', module: TestCasesModule },
  {
    path: 'compiler', module: CompilerModule, children: [
      { path: 'node', module: NodeModule },
      { path: 'java', module: JavaModule },
      { path: 'python', module: PythonModule }
    ]
  }
]);
