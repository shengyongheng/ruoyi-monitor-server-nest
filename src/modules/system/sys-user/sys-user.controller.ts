import { Body, Controller, Get, Post } from '@nestjs/common';
import { SysUserService } from './sys-user.service';
import { LoginDto } from './dto/sys-user.dto';
import { SysMenuService } from '../sys-menu/sys-menu.service';
import { SysMenuEntity } from '../sys-menu/entities/sys-menu.entity';

@Controller('sys-user')
export class SysUserController {
  constructor(
    private readonly sysUserService: SysUserService,
    private readonly sysMenuService: SysMenuService,
  ) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {}

  @Get('getRouters')
  async getRouters() {
    const menus: Array<SysMenuEntity> =
      await this.sysMenuService.selectMenuTreeByUserId();
    return this.sysMenuService.buildMenus(menus);
  }
}
