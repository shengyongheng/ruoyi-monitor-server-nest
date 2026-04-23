import { Module } from '@nestjs/common';
import { SysRedisService } from './sys-redis.service';

@Module({
  controllers: [],
  providers: [SysRedisService],
  exports: [SysRedisService],
})
export class SysRedisModule {}
