import { Global, Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

// @Global() 装饰器使模块具有全局作用域。全局模块通常只需注册一次 ，一般由根模块或核心模块注册。
// ArticleService 提供程序将无处不在，任何想要注入该服务的模块都不需要在其导入数组中导入 ArticleModule。
@Global()
@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService], // 通过 exports 将提供者暴露给其他模块，需要使用该提供者的模块需要 imports 该模块
})
export class ArticleModule {}
