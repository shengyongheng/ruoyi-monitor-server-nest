import { Controller, Get, Param, Query } from '@nestjs/common';
import { MonitorErrorService } from './monitor-error.service';

@Controller('monitor-error')
export class MonitorErrorController {
  constructor(private readonly monitorErrorService: MonitorErrorService) {}

  @Get('error_sourcemap')
  async jsErrorSourcemapContext() {
    return await this.monitorErrorService.jsErrorSourcemapContext();
  }

  @Get('error_detail_list')
  async getErrorDetailList() {
    return await this.monitorErrorService.getErrorDetailList();
  }

  @Get('rrweb-events/:id')
  async getRRwebPlayEvents(@Param('id') id: number) {
    return await this.monitorErrorService.getRRwebPlayEvents(id);
  }

  @Get('error_count')
  async errorCount() {
    return await this.monitorErrorService.errorCount();
  }

  @Get('error_count_trend')
  async errorTrendCount(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.monitorErrorService.errorTrendCount(startDate, endDate);
  }
}
