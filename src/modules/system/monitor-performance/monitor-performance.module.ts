import { Module } from '@nestjs/common';
import { MonitorPerformanceService } from './monitor-performance.service';
import { MonitorPerformanceController } from './monitor-performance.controller';

@Module({
  controllers: [MonitorPerformanceController],
  providers: [MonitorPerformanceService],
})
export class MonitorPerformanceModule {}
