import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskSchedulingService } from './task-scheduling.service';
import { CreateTaskSchedulingDto } from './dto/create-task-scheduling.dto';
import { UpdateTaskSchedulingDto } from './dto/update-task-scheduling.dto';

@Controller('task-scheduling')
export class TaskSchedulingController {
  constructor(private readonly taskSchedulingService: TaskSchedulingService) {}

  @Post()
  create(@Body() createTaskSchedulingDto: CreateTaskSchedulingDto) {
    return this.taskSchedulingService.create(createTaskSchedulingDto);
  }

  @Get()
  findAll() {
    return this.taskSchedulingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskSchedulingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskSchedulingDto: UpdateTaskSchedulingDto) {
    return this.taskSchedulingService.update(+id, updateTaskSchedulingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskSchedulingService.remove(+id);
  }
}
