import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ValidationPipe } from 'src/common/pipes/ValidationPipe';
import { CreatePipeDto } from './dto/create-pipe.dto';
import { UpdatePipeDto } from './dto/update-pipe.dto';
import { PipeService } from './pipe.service';

@Controller('pipe')
export class PipeController {
  constructor(private readonly pipeService: PipeService) {}

  @Post()
  create(@Body() createPipeDto: CreatePipeDto) {
    return this.pipeService.create(createPipeDto);
  }

  @Get()
  findAll(@Query('id', new DefaultValuePipe(9), ParseIntPipe) id: number) {
    console.log('id:', id);
    return this.pipeService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      // ParseIntPipe,
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
      ValidationPipe,
    )
    id: number,
  ) {
    console.log('id:', typeof id, id);
    // return this.pipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePipeDto: UpdatePipeDto) {
    return this.pipeService.update(+id, updatePipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipeService.remove(+id);
  }
}
