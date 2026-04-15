import { Module } from '@nestjs/common';
import { RuoyiMonitorService } from './ruoyi-monitor.service';
import { RuoyiMonitorController } from './ruoyi-monitor.controller';

@Module({
  controllers: [RuoyiMonitorController],
  providers: [RuoyiMonitorService],
})
export class RuoyiMonitorModule {}
