import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Data<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data,
          status: 0,
          success: true,
          message: '牛逼',
        };
      }),
    );
  }
}
