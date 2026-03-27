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

/**
 * 与管道和异常过滤器类似，守卫可以作用于控制器 、方法或全局作用域。
 * 此装饰器可以接受单个参数，也可以接受以逗号分隔的参数列表。
 * 这样，您只需一次声明即可轻松应用相应的守卫集。
 */
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
