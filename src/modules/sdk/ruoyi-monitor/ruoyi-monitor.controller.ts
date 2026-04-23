import { Controller, Post, Body } from '@nestjs/common';
import { RuoyiMonitorService } from './ruoyi-monitor.service';
import { RuoyiMonitorReportDto } from './dto/ruoyi-monitor.dto';
import { Roles } from 'src/common/decorators/Roles';
import { RolesEnum } from 'src/common/enums/RolesEnum';

@Controller('ruoyi-monitor')
export class RuoyiMonitorController {
  constructor(private readonly ruoyiMonitorService: RuoyiMonitorService) {}

  @Post('report')
  async report(@Body() ruoyiMonitorDto: RuoyiMonitorReportDto) {
    await this.ruoyiMonitorService.report(ruoyiMonitorDto);
  }

  @Post('create_project')
  @Roles(RolesEnum.Admin)
  async createProject() {
    await Promise.resolve('有 Admin 权限');
  }
}
