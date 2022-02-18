import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';
import { errorMessage } from 'src/error';
import { v4 as v4uuid } from 'uuid'
import { map, Observable } from 'rxjs';
import * as precise from 'precise'
import { gppcompiler } from 'src/utils/compiler/gppcompiler';

@Injectable()
export class GppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request = context.switchToHttp().getRequest();

    var uusidString = v4uuid()
    var dir = path.join(__dirname, '..', 'scripts', uusidString.slice(0, uusidString.indexOf("-")));
    return next.handle().pipe(map(flow => flow.data = gppcompiler(dir, request?.body))
    )
  }
}
