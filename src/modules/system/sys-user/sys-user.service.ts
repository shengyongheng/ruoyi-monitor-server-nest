import { Injectable } from '@nestjs/common';
// import svgCaptcha from 'svg-captcha';
// eslint-disable-next-line
const svgCaptcha = require('svg-captcha');
import { v4 as uuidV4 } from 'uuid';
import { SysRedisEnum } from '../sys-redis/enums/sys-redis.enum';
import { SysRedisService } from '../sys-redis/sys-redis.service';
import { LoginDto } from './dto/sys-user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysUserEntity } from './entities/sys-user.entity';
import { SysUserRoleEntity } from './entities/sys-user-role.entity';
import { SysRoleEntity } from './entities/sys-role.entity';
import { SysRoleMenuEntity } from '../sys-menu/entities/sys-role-menu.entity';
import { SysMenuEntity } from '../sys-menu/entities/sys-menu.entity';

const CAPTCHA_EXPIRATION_TIME = 60; // 60s
@Injectable()
export class SysUserService {
  constructor(
    @InjectRepository(SysUserEntity)
    private sysUserRepository: Repository<SysUserEntity>,
    @InjectRepository(SysRoleEntity)
    private sysRoleRepository: Repository<SysRoleEntity>,
    private readonly redisService: SysRedisService,
    private readonly jwtService: JwtService,
  ) {}

  async getCode() {
    // eslint-disable-next-line
    const captcha: { text: string, data: string } = svgCaptcha.create({
      // size: 4,                 // 验证码长度(显示几个字符)
      // ignoreChars: '0o1i',     // 验证码字符中排除 0o1i
      // fontSize: 34,           // 验证码的字体大小
      width: 120, // 验证码的宽度
      height: 40, // 验证码的高度
      // background: '#cc9966',   // 验证码的背景颜色
      // color: 'red'
      size: 4,
      ignoreChars: '0o1i',
      noise: 2,
      color: true,
    });
    const uuid = uuidV4();
    await this.redisService.set(
      SysRedisEnum.CAPTCHA_CODE_KEY.valueOf() + uuid,
      captcha.text,
      CAPTCHA_EXPIRATION_TIME,
    );
    return {
      uuid: captcha.text,
      img: captcha.data,
    };
  }

  async login(loginDto: LoginDto) {
    const { username, password, code, uuid } = loginDto;
    console.log('username:', username);
    console.log('password:', password);
    console.log('code:', code);
    console.log('uuid:', uuid);
    // TODO 验证码校验
    const sysUser = await this.sysUserRepository.findOneBy({
      username,
      password,
    });
    if (sysUser) {
      const roleIdAndKeys = await this.sysUserRepository
        .createQueryBuilder('sysUser')
        .leftJoinAndSelect(
          SysUserRoleEntity,
          'sysUserRole',
          'sysUser.user_id = sysUserRole.user_id',
        )
        .leftJoinAndSelect(
          SysRoleEntity,
          'role',
          'role.role_id = sysUserRole.role_id',
        )
        .where('sysUser.userId = :userId', { userId: sysUser.userId })
        .select(
          `
            role.role_id as roleId,
            role.role_key as roleKey
          `,
        )
        .getRawMany<{ roleId: string; roleKey: string }>();

      const roleIds = roleIdAndKeys.map((roleIdAndKey) => roleIdAndKey.roleId);

      const permissions = await this.sysRoleRepository
        .createQueryBuilder('sysRole')
        .leftJoinAndSelect(
          SysRoleMenuEntity,
          'sysRoleMenu',
          'sysRole.role_id = sysRoleMenu.role_id',
        )
        .leftJoinAndSelect(
          SysMenuEntity,
          'sysMenu',
          'sysMenu.menu_id = sysRoleMenu.menu_id',
        )
        .where('sysRole.role_id IN (:...roleIds)', { roleIds })
        .groupBy('sysMenu.perms')
        .select(
          `
            sysMenu.perms as permission
          `,
        )
        .getRawMany<{ permission: string }>();

      await this.redisService.set(
        SysRedisEnum.USERS_KEY + sysUser.userId,
        JSON.stringify({
          user: sysUser,
          permissions: permissions.map((item) => item.permission),
          roles: roleIdAndKeys.map((roleIdAndKey) => roleIdAndKey.roleKey),
        }),
      );

      const token = await this.jwtService.signAsync({
        username,
        userId: sysUser.userId,
      });
      return { token };
    }
  }
}
