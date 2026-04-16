import { Module } from '@nestjs/common';
import { MonitorPerformanceService } from './monitor-performance.service';
import { MonitorPerformanceController } from './monitor-performance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorPerformanceMetric } from './entities/monitor-performance-metric.entity';
import { SysPageloadMetricAgg } from './entities/sys-pageload-metric-agg.entity';
import { SysPerformanceMetricAgg } from './entities/sys-performance-metric-agg.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MonitorPerformanceMetric,
      SysPageloadMetricAgg,
      SysPerformanceMetricAgg,
    ]),
  ],
  controllers: [MonitorPerformanceController],
  providers: [MonitorPerformanceService],
  exports: [TypeOrmModule],
})
export class MonitorPerformanceModule {}
