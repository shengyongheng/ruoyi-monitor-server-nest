import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SysUserService } from './sys-user.service';
import { SysUserController } from './sys-user.controller';
import { SysMenuModule } from '../sys-menu/sys-menu.module';
import { SysUserEntity } from './entities/sys-user.entity';
import { JwtModule } from '@nestjs/jwt';
import { SysUserEnum } from './enums/sys-user.enum';
import { SysMenuEntity } from '../sys-menu/entities/sys-menu.entity';
import { SysRoleEntity } from './entities/sys-role.entity';
import { SysUserRoleEntity } from './entities/sys-user-role.entity';
import { SysRoleMenuEntity } from '../sys-menu/entities/sys-role-menu.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      SysUserEntity,
      SysMenuEntity,
      SysRoleEntity,
      SysUserRoleEntity,
      SysRoleMenuEntity,
    ]),
    JwtModule.register({
      global: true,
      secret: SysUserEnum.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
    SysMenuModule,
  ],
  controllers: [SysUserController],
  providers: [SysUserService],
})
export class SysUserModule {}
