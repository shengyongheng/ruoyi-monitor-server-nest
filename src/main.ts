import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { ResponseInterceptor } from './common/interceptors/responseInterceptor';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: false, // 禁用日志
    // logger: ['error', 'warn', 'log'], // 日志级别
    // logger: new ConsoleLogger({
    //   colors: false, // 禁用彩色输出
    //   prefix: 'MyApp', // 为每条日志消息配置前缀，Default is "Nest"
    //   json: true,
    // }),
  });
  app.use(compression());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, 'src/static/images'), {
    prefix: '/images',
  });
  const options = new DocumentBuilder()
    .setTitle('hsy 接口文档')
    .setDescription('hsy 接口文档的描述xxx')
    .setVersion('v1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
  console.log('process.env.SERVER_PORT:', process.env.SERVER_PORT);

  await app.listen(process.env.SERVER_PORT ?? 3000);
}

bootstrap();
