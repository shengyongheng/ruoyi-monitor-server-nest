import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SysUserService } from './sys-user.service';
import { SysUserController } from './sys-user.controller';
import { SysMenuModule } from '../sys-menu/sys-menu.module';
import { SysUserEntity } from './entities/sys-user.entity';
import { RedisModule } from '../redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { SysUserEnum } from './enums/sys-user.enum';
@Module({
  imports: [
    TypeOrmModule.forFeature([SysUserEntity]),
    JwtModule.register({
      global: true,
      secret: SysUserEnum.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    SysMenuModule,
    RedisModule,
  ],
  controllers: [SysUserController],
  providers: [SysUserService],
})
export class SysUserModule {}
