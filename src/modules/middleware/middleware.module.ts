import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/middlewares/LoggerMiddleware';
import { MiddlewareController } from './middleware.controller';
import { MiddlewareService } from './middleware.service';

@Module({
  controllers: [MiddlewareController],
  providers: [MiddlewareService],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'middleware/exclude', method: RequestMethod.POST })
      .forRoutes({ path: 'middleware/include', method: RequestMethod.GET });
  }
}
