import { Injectable } from '@nestjs/common';
import { CreateTaskSchedulingDto } from './dto/create-task-scheduling.dto';
import { UpdateTaskSchedulingDto } from './dto/update-task-scheduling.dto';

@Injectable()
export class TaskSchedulingService {
  create(createTaskSchedulingDto: CreateTaskSchedulingDto) {
    return 'This action adds a new taskScheduling';
  }

  findAll() {
    return `This action returns all taskScheduling`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskScheduling`;
  }

  update(id: number, updateTaskSchedulingDto: UpdateTaskSchedulingDto) {
    return `This action updates a #${id} taskScheduling`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskScheduling`;
  }
}
