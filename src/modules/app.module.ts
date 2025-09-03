import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
// import { databaseConfig } from '../../config/database.config';
import { ConfigurationModule } from './configuration/configuration.module';
import { ExceptionFilterModule } from './exception-filter/exception-filter.module';
// import { ProfileModule } from '../profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipeModule } from './pipe/pipe.module';
import { ArticleModule } from './article/article.module';
import { GuardModule } from './guard/guard.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { WebsocketModule } from './websocket/websocket.module';
@Module({
  imports: [
    UserModule,
    // ProfileModule,
    ArticleModule,
    PipeModule,
    GuardModule,
    ExceptionFilterModule,
    MiddlewareModule,
    ConfigurationModule,
    WebsocketModule,
    ConfigModule.forRoot({
      // 分配给 load 属性的值是一个数组，允许您加载多个配置文件（例如 load: [databaseConfig, authConfig] ）
      load: [configuration],
      isGlobal: true, // 全局使用模块：在根模块（如 AppModule）中加载后，在使用 COnfigService 时就无需在其他模块中重复导入 ConfigModule。
      // 缓存环境变量：由于访问 process.env 可能较慢，您可以通过设置传递给 ConfigModule.forRoot() 的选项对象中的 cache 属性，来提高 ConfigService#get 方法在处理存储在 process.env 中的变量时的性能。
      cache: true,
    }),
    // TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'nest_db',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
