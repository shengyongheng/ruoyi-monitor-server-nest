import { Controller, Post, Body } from '@nestjs/common';
import { RuoyiMonitorService } from './ruoyi-monitor.service';
import { RuoyiMonitorReportDto } from './dto/ruoyi-monitor.dto';

@Controller('ruoyi-monitor')
export class RuoyiMonitorController {
  constructor(private readonly ruoyiMonitorService: RuoyiMonitorService) {}

  @Post('report')
  async report(@Body() ruoyiMonitorDto: RuoyiMonitorReportDto) {
    await this.ruoyiMonitorService.report(ruoyiMonitorDto);
  }
}
