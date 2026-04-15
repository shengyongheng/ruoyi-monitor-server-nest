import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { ResponseInterceptor } from './common/interceptors/responseInterceptor';
import { AppModule } from './modules/app.module';
import { HttpExceptionFilter } from './common/filters/HttpExceptionFilter';
import { CatchEverythingFilter } from './common/filters/CatchEverythingFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: false, // 禁用日志
    // logger: ['error', 'warn', 'log'], // 日志级别
    // logger: new ConsoleLogger({
    //   colors: false, // 禁用彩色输出
    //   prefix: 'MyApp', // 为每条日志消息配置前缀，Default is "Nest"
    //   json: true,
    // }),
    abortOnError: false, // 默认情况下，如果在创建应用程序时发生任何错误，您的应用程序将以代码 1 退出。如果您想让它抛出错误，请禁用 abortOnError 选项（例如， NestFactory.create(AppModule, { abortOnError: false }) ）。
  });
  app.use(compression());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new CatchEverythingFilter(new HttpAdapterHost()));
  app.useStaticAssets(join(__dirname, '../src/static/images'), {
    prefix: '/images',
  });
  const options = new DocumentBuilder()
    .setTitle('hsy 接口文档')
    .setDescription('hsy 接口文档的描述xxx')
    .setVersion('v1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(process.env.SERVER_PORT ?? 3000);
}

bootstrap()
  .then(() => {
    console.log('nest server listen port:', process.env.SERVER_PORT);
  })
  .catch((error) => {
    console.log('bootstrap error:', JSON.stringify(error));
  });
