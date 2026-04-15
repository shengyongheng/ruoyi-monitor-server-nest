import { Controller, Post, Body } from '@nestjs/common';
import { RuoyiMonitorService } from './ruoyi-monitor.service';
import { RuoyiMonitorDto } from './dto/ruoyi-monitor.dto';

@Controller('ruoyi-monitor')
export class RuoyiMonitorController {
  constructor(private readonly ruoyiMonitorService: RuoyiMonitorService) {}

  @Post('report')
  report(@Body() ruoyiMonitorDto: RuoyiMonitorDto) {
    this.ruoyiMonitorService.report(ruoyiMonitorDto);
  }
}
