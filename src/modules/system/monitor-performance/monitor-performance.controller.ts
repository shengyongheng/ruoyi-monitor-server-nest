import { Controller, Get } from '@nestjs/common';
import { MonitorPerformanceService } from './monitor-performance.service';

@Controller('monitor-performance')
export class MonitorPerformanceController {
  constructor(
    private readonly monitorPerformanceService: MonitorPerformanceService,
  ) {}

  @Get('performance_metrics_agg')
  async getPerformanceMetricsAgg() {
    return await this.monitorPerformanceService.getPerformanceMetricAgg();
  }

  @Get('pageload_metrics_agg')
  async getPageLoadMetricsAgg() {
    return await this.monitorPerformanceService.getPerformanceMetricAgg();
  }
}
