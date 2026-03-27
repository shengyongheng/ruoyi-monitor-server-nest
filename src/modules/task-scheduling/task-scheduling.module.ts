import { Module } from '@nestjs/common';
import { TaskSchedulingService } from './task-scheduling.service';
import { TaskSchedulingController } from './task-scheduling.controller';

@Module({
  controllers: [TaskSchedulingController],
  providers: [TaskSchedulingService],
})
export class TaskSchedulingModule {}
