import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SysUserService } from './sys-user.service';
import { SysUserController } from './sys-user.controller';
import { SysMenuModule } from '../sys-menu/sys-menu.module';
import { SysUserEntity } from './entities/sys-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysUserEntity]), SysMenuModule],
  controllers: [SysUserController],
  providers: [SysUserService],
})
export class SysUserModule {}
