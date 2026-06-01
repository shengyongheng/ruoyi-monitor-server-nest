import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { SysUserService } from './sys-user.service';
import { LoginDto } from './dto/sys-user.dto';
import { SysMenuService } from '../sys-menu/sys-menu.service';
import { SysMenuEntity } from '../sys-menu/entities/sys-menu.entity';
import { SysRedisService } from '../sys-redis/sys-redis.service';
import { SysRedisEnum } from '../sys-redis/enums/sys-redis.enum';
@Controller()
export class SysUserController {
  constructor(
    private readonly sysUserService: SysUserService,
    private readonly sysMenuService: SysMenuService,
    private readonly redisService: SysRedisService,
    private readonly httpService: HttpService,
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
  @Get('getInfo/:userId')
  async getInfo(@Param('userId') userId: string) {
    const userInfo = (await this.redisService.get(
      SysRedisEnum.USERS_KEY + userId,
    )) as string;
    return JSON.parse(userInfo);
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

  @Get('fastAgentApi')
  async fastAgentApi() {
    const resObservable = this.httpService.get('http://127.0.0.1:8000');

    // lastValueFrom处理Observable格式数据，转换为对象格式
    const res: { data: any } = await lastValueFrom(resObservable);
    console.log('res:', res.data);
    return res.data;
  }
}
