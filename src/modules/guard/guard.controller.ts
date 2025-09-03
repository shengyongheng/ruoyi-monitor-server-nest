import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesDecorator } from 'src/common/decorators/RolesDecorator';
import { RolesGuard } from 'src/common/guard/RolesGuard';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { GuardService } from './guard.service';

@UseGuards(RolesGuard)
@Controller('guard')
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  @RolesDecorator(['admin'])
  findAll(@Query() query: { roles: Array<string> }) {
    console.log('query', query.roles);
    return this.guardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
