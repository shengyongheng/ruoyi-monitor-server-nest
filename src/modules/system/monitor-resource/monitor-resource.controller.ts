import { Controller, Get, Query } from '@nestjs/common';
import { MonitorResourceService } from './monitor-resource.service';
import { ResourceSessionDto } from './dto/monitor-resource.dto';

@Controller('monitor-resource')
export class MonitorResourceController {
  constructor(
    private readonly monitorResourceService: MonitorResourceService,
  ) {}

  @Get('resource_statistics')
  async resourceStatistics() {
    return await this.monitorResourceService.resourceStatistics();
  }

  @Get('session_list')
  async getSessionList() {
    return await this.monitorResourceService.getResourceSessionList();
  }

  @Get('resource_detail_list')
  async getResourceDetailList(@Query() resourceSessionDto: ResourceSessionDto) {
    return await this.monitorResourceService.getResourceDetailList(
      resourceSessionDto,
    );
  }
}
