import { Module } from '@nestjs/common';
import { MonitorUserbehaviorService } from './monitor-userbehavior.service';
import { MonitorUserbehaviorController } from './monitor-userbehavior.controller';

@Module({
  controllers: [MonitorUserbehaviorController],
  providers: [MonitorUserbehaviorService],
})
export class MonitorUserbehaviorModule {}
