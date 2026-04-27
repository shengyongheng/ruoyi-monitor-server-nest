import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RuoyiMonitorService } from './ruoyi-monitor.service';
import { RuoyiMonitorReportDto } from './dto/ruoyi-monitor.dto';
import { Auths } from 'src/common/decorators/Auths';
import { RolesEnum } from 'src/common/enums/RolesEnum';
import { AuthGuard } from 'src/common/guard/AuthGuard';

@Controller('ruoyi-monitor')
@UseGuards(AuthGuard)
export class RuoyiMonitorController {
  constructor(private readonly ruoyiMonitorService: RuoyiMonitorService) {}

  @Post('report')
  async report(@Body() ruoyiMonitorDto: RuoyiMonitorReportDto) {
    await this.ruoyiMonitorService.report(ruoyiMonitorDto);
  }

  @Post('create_project')
  @Auths({
    roles: RolesEnum.Admin,
    permission: 'system:rbac:query',
  })
  async createProject() {
    return await Promise.resolve('有 Admin 权限');
  }
}
