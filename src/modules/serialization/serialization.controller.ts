import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { SerializationService } from './serialization.service';
import { CreateSerializationDto } from './dto/create-serialization.dto';
import { UpdateSerializationDto } from './dto/update-serialization.dto';

@Controller('serialization')
export class SerializationController {
  constructor(private readonly serializationService: SerializationService) {}

  @Post()
  create(@Body() createSerializationDto: CreateSerializationDto) {
    return this.serializationService.create(createSerializationDto);
  }

  @Get()
  findAll() {
    return this.serializationService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string) {
    return this.serializationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSerializationDto: UpdateSerializationDto,
  ) {
    return this.serializationService.update(+id, updateSerializationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serializationService.remove(+id);
  }
}
