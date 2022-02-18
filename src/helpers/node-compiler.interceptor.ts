import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as path from 'path';
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { map, Observable } from 'rxjs';
import { spawnSync } from 'child_process';
import { errorMessage } from 'src/error';
import { v4 as v4uuid } from 'uuid';
import * as precise from 'precise'
import { nodecompiler } from 'src/utils/compiler/nodecompiler';

@Injectable()
export class NodeCompilerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request = context.switchToHttp().getRequest();
    var dir = path.join(__dirname, '..', 'scripts');
    var vid = v4uuid()
    return next.handle().pipe(map(flow => flow.data = nodecompiler(dir, vid, request?.body))

    )
  }
}
