import { Body, Controller, Get, Post } from '@nestjs/common';
import { SysUserService } from './sys-user.service';
import { LoginDto } from './dto/sys-user.dto';
import { SysMenuService } from '../sys-menu/sys-menu.service';
import { SysMenuEntity } from '../sys-menu/entities/sys-menu.entity';
@Controller()
export class SysUserController {
  constructor(
    private readonly sysUserService: SysUserService,
    private readonly sysMenuService: SysMenuService,
  ) {}

  @Get('captchaImage')
  async getCode() {
    return await this.sysUserService.getCode();
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.sysUserService.login(loginDto);
  }

  /**
   * 获取用户信息
   *
   * @return 用户信息
   */
  @Get('getInfo')
  getInfo() {
    return {
      user: null,
      roles: 'admin',
      permission: '*:*:*',
    };
  }

  @Get('getRouters')
  async getRouters() {
    const menus: Array<SysMenuEntity> =
      await this.sysMenuService.selectMenuTreeByUserId();
    return this.sysMenuService.buildMenus(menus);
  }
}
