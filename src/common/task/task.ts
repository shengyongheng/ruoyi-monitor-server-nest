import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MonitorPerformanceService } from 'src/modules/system/monitor-performance/monitor-performance.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly monitorPerformaceService: MonitorPerformanceService,
  ) {}

  @Cron('30 * * * * *')
  async handleCron() {
    await this.monitorPerformaceService.aggregatePerformanceMetric();
    await this.monitorPerformaceService.aggregatePageLoadWaterfallMetrics();
  }
}
