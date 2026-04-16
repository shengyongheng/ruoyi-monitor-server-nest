import { Module } from '@nestjs/common';
import { MonitorResourceService } from './monitor-resource.service';
import { MonitorResourceController } from './monitor-resource.controller';
import { MonitorResource } from './entities/monitor-resource.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MonitorResource])],
  controllers: [MonitorResourceController],
  providers: [MonitorResourceService],
  exports: [TypeOrmModule],
})
export class MonitorResourceModule {}
