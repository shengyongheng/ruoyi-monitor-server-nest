import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
// import { databaseConfig } from '../../config/database.config';
import { ConfigurationModule } from './configuration/configuration.module';
import { ExceptionFilterModule } from './exception-filter/exception-filter.module';
// import { ProfileModule } from '../profile/profile.module';
// import { UserModule } from '../user/user.module';
import { ArticleModule } from './article/article.module';
import { GuardModule } from './guard/guard.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    // UserModule,
    // ProfileModule,
    ArticleModule,
    GuardModule,
    ExceptionFilterModule,
    MiddlewareModule,
    ConfigurationModule,
    WebsocketModule,
    ConfigModule.forRoot({
      // 分配给 load 属性的值是一个数组，允许您加载多个配置文件（例如 load: [databaseConfig, authConfig] ）
      load: [configuration],
    }),
    // TypeOrmModule.forRoot(databaseConfig),
  ],
})
export class AppModule {}
