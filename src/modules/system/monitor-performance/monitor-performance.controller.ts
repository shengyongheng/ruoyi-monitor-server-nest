import { Controller, Get } from '@nestjs/common';
import { MonitorPerformanceService } from './monitor-performance.service';

@Controller('monitor-performance')
export class MonitorPerformanceController {
  constructor(
    private readonly monitorPerformanceService: MonitorPerformanceService,
  ) {}

  @Get('performance_metrics_agg')
  getPerformanceMetricsAgg() {}

  @Get('pageload_metrics_agg')
  getPageLoadMetricsAgg() {}
}
