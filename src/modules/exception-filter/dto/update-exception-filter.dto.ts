import { PartialType } from '@nestjs/mapped-types';
import { CreateExceptionFilterDto } from './create-exception-filter.dto';

export class UpdateExceptionFilterDto extends PartialType(CreateExceptionFilterDto) {}
