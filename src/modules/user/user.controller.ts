import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  // Redirect,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '获取用户列表',
    description: '获取用户列表',
  })
  @Header('Cache-Control', 'no-store')
  // @Redirect('https://baidu.com', 301)
  findAll(@Req() request: Request) {
    return this.userService.findAll();
  }

  @Post('/createMany')
  createMany(@Body() createUserDtos: { users: Array<CreateUserDto> }) {
    return this.userService.createMany(createUserDtos);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
