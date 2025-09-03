import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService], // 通过 exports 将提供者暴露给其他模块，需要使用该提供者的模块需要 imports 该模块
})
export class ArticleModule {}
