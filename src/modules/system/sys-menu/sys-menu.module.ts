import { Module } from '@nestjs/common';
import { SysMenuService } from './sys-menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysMenuEntity } from './entities/sys-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysMenuEntity])],
  controllers: [],
  providers: [SysMenuService],
  exports: [SysMenuService, TypeOrmModule],
})
export class SysMenuModule {}
