import { Module } from '@nestjs/common';
import { RuoyiMonitorService } from './ruoyi-monitor.service';
import { RuoyiMonitorController } from './ruoyi-monitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorErrorJs } from 'src/modules/system/monitor-error/entities/monitor-error-js.entity';
import { MonitorErrorRequest } from 'src/modules/system/monitor-error/entities/monitor-error-request.entity';
import { MonitorErrorResource } from 'src/modules/system/monitor-error/entities/monitor-error-resource.entity';
import { MonitorRrweb } from 'src/modules/system/monitor-error/entities/monitor-rrweb.entity';
import { MonitorPerformanceMetric } from 'src/modules/system/monitor-performance/entities/monitor-performance-metric.entity';
import { SysPageloadMetricAgg } from 'src/modules/system/monitor-performance/entities/sys-pageload-metric-agg.entity';
import { SysPerformanceMetricAgg } from 'src/modules/system/monitor-performance/entities/sys-performance-metric-agg.entity';
import { MonitorResource } from 'src/modules/system/monitor-resource/entities/monitor-resource.entity';
import { MonitorUserBehavior } from 'src/modules/system/monitor-userbehavior/entities/monitor-userbehavior.entity';
import { MonitorPageStaytime } from 'src/modules/system/monitor-userbehavior/entities/monitor-page-staytime.entity';
import { MonitorRouteChange } from 'src/modules/system/monitor-userbehavior/entities/monitor-route-change.entity';
// import { SysRedisModule } from 'src/modules/system/sys-redis/sys-redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MonitorErrorJs,
      MonitorErrorRequest,
      MonitorErrorResource,
      MonitorRrweb,
      MonitorPerformanceMetric,
      SysPageloadMetricAgg,
      SysPerformanceMetricAgg,
      MonitorResource,
      MonitorUserBehavior,
      MonitorPageStaytime,
      MonitorRouteChange,
    ]),
    // SysRedisModule,
  ],
  controllers: [RuoyiMonitorController],
  providers: [RuoyiMonitorService],
})
export class RuoyiMonitorModule {}
