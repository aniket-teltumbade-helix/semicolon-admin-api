import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as path from 'path';
import { execSync, spawnSync } from 'child_process';
import { errorMessage } from 'src/error';
import { v4 as v4uuid } from 'uuid'
import * as precise from 'precise'
@Injectable()
export class GccInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request = context.switchToHttp().getRequest();

    var dir1 = path.join(__dirname, '..', 'scripts');
    var uusidString = v4uuid()
    var dir = path.join(__dirname, '..', 'scripts', uusidString.slice(0, uusidString.indexOf("-")));
    try {
      var className = 'Solution'
      if (!existsSync(dir1)) {
        mkdirSync(dir1);
        mkdirSync(dir);
      }
      else {
        mkdirSync(dir);
      }
      var fileName = path.join(dir, className)
      writeFileSync(`${fileName}.c`, request.body?.script)
      let timer = precise().start()
      let scriptCompile = spawnSync('gcc', [`${fileName}.c`, '-o', fileName], {
        timeout: 5000
      })

      if (timer.stop().diff() / 1000000 > 30) {
        return next.handle().pipe(map(flow => flow.data = errorMessage('ACCEPTED', "Time limit exceeded")))
      }
      if (scriptCompile.status === 0) {
        let timer = precise().start()
        let scriptExecution = spawnSync(fileName, {
          input: request.body?.input,
        })
        if (scriptExecution.status === 0) {
          return next.handle().pipe(map(flow => flow.data = { message: scriptExecution.stdout.toString().trim() }))
        } else {
          let error = scriptExecution.stderr.toString().split(`${dir}\\`).join('')
          return next.handle().pipe(map(flow => flow.data = errorMessage('ACCEPTED', error)))
        }
      } else {
        let error = scriptCompile.stderr.toString().split(`${dir}\\`).join('')
        return next.handle().pipe(map(flow => flow.data = errorMessage('ACCEPTED', error)))
      }

    } catch (error) {
      error = `${error}`.split(`${dir}\\`).join('')
      return next.handle().pipe(map(flow => flow.data = errorMessage('INTERNAL_SERVER_ERROR', `${error}`)));
    }
  }
}
