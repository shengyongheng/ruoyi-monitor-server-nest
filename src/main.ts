import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { ResponseInterceptor } from './common/interceptors/responseInterceptor';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
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
