import { Module } from '@nestjs/common';
import { MonitorEnvironmentService } from './monitor-environment.service';
import { MonitorEnvironmentController } from './monitor-environment.controller';

@Module({
  controllers: [MonitorEnvironmentController],
  providers: [MonitorEnvironmentService],
})
export class MonitorEnvironmentModule {}
