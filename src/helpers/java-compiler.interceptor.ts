import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as path from 'path';
import { map, Observable } from 'rxjs';
import { execSync } from 'child_process';
import { errorMessage } from 'src/error';
import { v4 as v4uuid } from 'uuid'
import { javacompiler } from 'src/utils/compiler/javacompiler';

@Injectable()
export class JavaCompilerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request = context.switchToHttp().getRequest();

    var uusidString = v4uuid()

    var dir = path.join(__dirname, '..', 'scripts', uusidString.slice(0, uusidString.indexOf("-")));
    return next.handle().pipe(map(flow => flow.data = javacompiler(dir, request?.body))

    )
  }
}
