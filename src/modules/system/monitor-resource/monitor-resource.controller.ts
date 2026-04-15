import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MonitorResourceService } from './monitor-resource.service';

@Controller('monitor-resource')
export class MonitorResourceController {
  constructor(
    private readonly monitorResourceService: MonitorResourceService,
  ) {}

  @Get('resource-statistics')
  resourceStatistics() {}

  @Get('session_list')
  getSessionList() {}

  @Get('resource_detail_list')
  getResourceDetailList() {}
}
