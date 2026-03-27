import { PartialType } from '@nestjs/swagger';
import { CreateTaskSchedulingDto } from './create-task-scheduling.dto';

export class UpdateTaskSchedulingDto extends PartialType(CreateTaskSchedulingDto) {}
