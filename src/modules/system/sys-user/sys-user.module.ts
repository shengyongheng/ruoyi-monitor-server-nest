import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SysUserService } from './sys-user.service';
import { SysUserController } from './sys-user.controller';
import { SysMenuModule } from '../sys-menu/sys-menu.module';
import { SysUserEntity } from './entities/sys-user.entity';
import { SysRedisModule } from '../sys-redis/sys-redis.module';
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
    SysRedisModule,
  ],
  controllers: [SysUserController],
  providers: [SysUserService],
})
export class SysUserModule {}
