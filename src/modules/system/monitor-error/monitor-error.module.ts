import { Module } from '@nestjs/common';
import { MonitorErrorService } from './monitor-error.service';
import { MonitorErrorController } from './monitor-error.controller';

@Module({
  controllers: [MonitorErrorController],
  providers: [MonitorErrorService],
})
export class MonitorErrorModule {}
