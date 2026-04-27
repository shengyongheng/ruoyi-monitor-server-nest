import { Global, Module } from '@nestjs/common';
import { SysRedisService } from './sys-redis.service';

@Global()
@Module({
  controllers: [],
  providers: [SysRedisService],
  exports: [SysRedisService],
})
export class SysRedisModule {}
