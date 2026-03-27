import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CreateExceptionFilterDto } from './dto/create-exception-filter.dto';
import { UpdateExceptionFilterDto } from './dto/update-exception-filter.dto';
import { ExceptionFilterService } from './exception-filter.service';
import { HttpExceptionFilter } from '../../common/filters/HttpExceptionFilter';

// @UseFilters(HttpExceptionFilter)
@Controller('exception-filter')
export class ExceptionFilterController {
  constructor(
    private readonly exceptionFilterService: ExceptionFilterService,
  ) {}

  @Post()
  create(@Body() createExceptionFilterDto: CreateExceptionFilterDto) {
    return this.exceptionFilterService.create(createExceptionFilterDto);
  }

  @Get()
  // @UseFilters(HttpExceptionFilter)
  findAll() {
    return this.exceptionFilterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exceptionFilterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExceptionFilterDto: UpdateExceptionFilterDto,
  ) {
    return this.exceptionFilterService.update(+id, updateExceptionFilterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exceptionFilterService.remove(+id);
  }
}
