import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';

interface Data<T = any> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    // const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    // console.log('request:', request);
    // console.log('response:', response);
    const { statusCode: status } = response;
    return next.handle().pipe(
      map((data: T) => {
        return {
          data,
          status,
          message: status >= 200 && status < 400 ? '请求成功' : '请求失败',
        };
      }),
    );
  }
}
