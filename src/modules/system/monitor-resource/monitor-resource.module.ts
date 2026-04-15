import { Module } from '@nestjs/common';
import { MonitorResourceService } from './monitor-resource.service';
import { MonitorResourceController } from './monitor-resource.controller';

@Module({
  controllers: [MonitorResourceController],
  providers: [MonitorResourceService],
})
export class MonitorResourceModule {}
