import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as path from 'path';
import { map, Observable } from 'rxjs';
import { pythoncompiler } from 'src/utils/compiler/pythonCompiler';

@Injectable()
export class PythonCompilerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request = context.switchToHttp().getRequest();

    var dir = path.join(__dirname, '..', 'scripts');
    return next.handle().pipe(map(flow => flow.data = pythoncompiler(dir, request?.body))
    )
  }
}
