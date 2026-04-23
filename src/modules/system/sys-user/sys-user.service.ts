import { Injectable } from '@nestjs/common';
// import svgCaptcha from 'svg-captcha';
// eslint-disable-next-line
const svgCaptcha = require('svg-captcha');
import { v4 as uuidV4 } from 'uuid';
import { SysRedisEnum } from '../sys-redis/enums/sys-redis.enum';
import { SysRedisService } from '../sys-redis/sys-redis.service';
import { LoginDto } from './dto/sys-user.dto';
import { JwtService } from '@nestjs/jwt';

const CAPTCHA_EXPIRATION_TIME = 60; // 60s
@Injectable()
export class SysUserService {
  constructor(
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

    return { token: await this.jwtService.signAsync({ username }) };
  }
}
