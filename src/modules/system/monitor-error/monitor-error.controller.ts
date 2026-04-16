import { Controller, Get } from '@nestjs/common';
import { MonitorErrorService } from './monitor-error.service';

@Controller('monitor-error')
export class MonitorErrorController {
  constructor(private readonly monitorErrorService: MonitorErrorService) {}

  @Get('error_sourcemap')
  async jsErrorSourcemapContext() {
    return await this.monitorErrorService.jsErrorSourcemapContext();
  }

  @Get('error_detail_list')
  getErrorDetailList() {}

  @Get('rrweb-events/:id')
  getRRwebPlayEvents() {}

  @Get('error_count')
  errorCount() {}

  @Get('error_count_trend')
  errorTrendCount() {}
}
