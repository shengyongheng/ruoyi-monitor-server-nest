import { Module } from '@nestjs/common';
import { MonitorUserbehaviorService } from './monitor-userbehavior.service';
import { MonitorUserbehaviorController } from './monitor-userbehavior.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorUserBehavior } from './entities/monitor-userbehavior.entity';
import { MonitorPageStaytime } from './entities/monitor-page-staytime.entity';
import { MonitorRouteChange } from './entities/monitor-route-change.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MonitorUserBehavior,
      MonitorPageStaytime,
      MonitorRouteChange,
    ]),
  ],
  controllers: [MonitorUserbehaviorController],
  providers: [MonitorUserbehaviorService],
})
export class MonitorUserbehaviorModule {}
