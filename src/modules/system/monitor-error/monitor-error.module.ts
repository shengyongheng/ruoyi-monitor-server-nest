import { Module } from '@nestjs/common';
import { MonitorErrorService } from './monitor-error.service';
import { MonitorErrorController } from './monitor-error.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorErrorJs } from './entities/monitor-error-js.entity';
import { MonitorErrorRequest } from './entities/monitor-error-request.entity';
import { MonitorErrorResource } from './entities/monitor-error-resource.entity';
import { MonitorRrweb } from './entities/monitor-rrweb.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MonitorErrorJs,
      MonitorErrorRequest,
      MonitorErrorResource,
      MonitorRrweb,
    ]),
  ],
  controllers: [MonitorErrorController],
  providers: [MonitorErrorService],
  exports: [TypeOrmModule],
})
export class MonitorErrorModule {}
