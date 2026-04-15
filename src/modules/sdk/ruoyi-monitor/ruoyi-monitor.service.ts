import { RuoyiMonitorDto } from './dto/ruoyi-monitor.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RuoyiMonitorService {
  report(ruoyiMonitorDto: RuoyiMonitorDto) {
    console.log('ruoyiMonitorDto:', ruoyiMonitorDto);
    const appVersion = ruoyiMonitorDto.appVersion;
    const projectKey = ruoyiMonitorDto.projectKey;
    const events = ruoyiMonitorDto.events;
    for (const event of events) {
      console.log('event:', event);
    }
  }
}
