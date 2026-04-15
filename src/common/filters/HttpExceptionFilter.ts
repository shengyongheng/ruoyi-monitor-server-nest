import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

/**
 * HttpExceptionFilter 异常过滤器，负责捕获 HttpException 类的异常实例，并为其实现自定义响应逻辑。
 * 为此，我们需要访问底层平台的 Request 和 Response 对象。我们将访问 Request 对象，以便提取原始 url 并将其包含在日志信息中。
 * 我们将使用 Response 对象，通过 response.json() 方法直接控制发送的响应。
 */

/**
 * @Catch(HttpException) 装饰器将所需的元数据绑定到异常过滤器，告诉 Nest 此过滤器只查找 HttpException 类型的异常。
 * @Catch() 装饰器可以接受单个参数，也可以接受以逗号分隔的列表。这允许您一次性为多种类型的异常设置过滤器。
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(
    exception: HttpException,
    /**
     * ArgumentsHost 类的使用: https://docs.nestjs.com/fundamentals/execution-context#argumentshost-class
     */
    host: ArgumentsHost,
  ) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
