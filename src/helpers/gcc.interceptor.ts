import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import * as path from 'path';
import { v4 as v4uuid } from 'uuid'
import { gcccompiler } from 'src/utils/compiler/gcccompiler';

@Injectable()
export class GccInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request = context.switchToHttp().getRequest();
    var uusidString = v4uuid()
    var dir = path.join(__dirname, '..', 'scripts', uusidString.slice(0, uusidString.indexOf("-")));

    return next.handle().pipe(map(flow => flow.data = gcccompiler(dir, request?.body))
    )
  }
}
