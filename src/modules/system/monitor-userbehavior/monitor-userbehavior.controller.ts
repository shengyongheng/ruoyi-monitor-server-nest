import { Controller, Get, Body, Query } from '@nestjs/common';
import { MonitorUserbehaviorService } from './monitor-userbehavior.service';
import {
  UserbehaviorDetailDto,
  UserbehaviorSessionDetailDto,
  UserbehaviorSessionDto,
  UserbehaviorTimeLineDto,
} from './dto/monitor-userbehavior.dto';

@Controller('monitor-userbehavior')
export class MonitorUserbehaviorController {
  constructor(
    private readonly monitorUserbehaviorService: MonitorUserbehaviorService,
  ) {}

  @Get('session_list')
  getSessionList(@Query() userbehaviorSessionDto: UserbehaviorSessionDto) {}

  @Get('session_detail')
  getSessionDetail(
    @Query() userbehaviorSessionDetailDto: UserbehaviorSessionDetailDto,
  ) {}

  @Get('behavior_timeline')
  getBehaviorTimeline(
    @Query() userbehaviorTimeLineDto: UserbehaviorTimeLineDto,
  ) {}

  @Get('behavior_detail')
  getBehaviorDetail(@Query() userbehaviorDetailDto: UserbehaviorDetailDto) {}
}
