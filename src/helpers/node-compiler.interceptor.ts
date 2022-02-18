import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as path from 'path';
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { map, Observable } from 'rxjs';
import { spawnSync } from 'child_process';
import { errorMessage } from 'src/error';
import { v4 as v4uuid } from 'uuid';
import * as precise from 'precise'

@Injectable()
export class NodeCompilerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request = context.switchToHttp().getRequest();
    var dir = path.join(__dirname, '..', 'scripts');
    var vid = v4uuid()
    try {
      if (!existsSync(dir)) {
        mkdirSync(dir);
      }
      var fileName = path.join(dir, `${vid}.js`)
      writeFileSync(fileName, request.body?.script)
      let timer = precise().start()
      const scriptExecution = spawnSync('node', [fileName], {
        input: request.body?.input,
      })

      if (timer.stop().diff() / 1000000 > 30) {
        return next.handle().pipe(map(flow => flow.data = errorMessage('ACCEPTED', "Time limit exceeded")))
      }
      if (scriptExecution.status === 0) {
        return next.handle().pipe(map(flow => flow.data = { message: scriptExecution.stdout.toString().trim() }))
      } else {
        let error = scriptExecution.stderr.toString().trim().replace(`${dir}\\${vid}`, 'index')
        return next.handle().pipe(map(flow => flow.data = errorMessage('ACCEPTED', error)))
      }
    } catch (error) {
      error = error.replace(`${dir}\\${vid}`, 'index')
      return next.handle().pipe(map(flow => flow.data = errorMessage('INTERNAL_SERVER_ERROR', `${error}`)));
    }
  }
}
