import { Controller, Get, Body, Query } from '@nestjs/common';
import { MonitorUserbehaviorService } from './monitor-userbehavior.service';
import {
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
  getSessionList(@Query() userbehaviorSessionDto: UserbehaviorSessionDto) {
    console.log('userbehaviorSessionDto:', userbehaviorSessionDto);
    return this.monitorUserbehaviorService.getUserBehaviorSessionList(
      userbehaviorSessionDto,
    );
  }

  @Get('session_detail')
  getSessionDetail(
    @Query() userbehaviorSessionDetailDto: UserbehaviorSessionDetailDto,
  ) {
    return this.monitorUserbehaviorService.getSessionDetail(
      userbehaviorSessionDetailDto,
    );
  }

  @Get('behavior_timeline')
  getBehaviorTimeline(
    @Query() userbehaviorTimeLineDto: UserbehaviorTimeLineDto,
  ) {
    return this.monitorUserbehaviorService.getBehaviorTimeline(
      userbehaviorTimeLineDto,
    );
  }

  @Get('behavior_detail')
  getBehaviorDetail(
    @Query('behaviorId') behaviorId: number,
    @Query('behaviorType') behaviorType: string,
  ) {
    return this.monitorUserbehaviorService.getBehaviorDetail(
      behaviorId,
      behaviorType,
    );
  }
}
