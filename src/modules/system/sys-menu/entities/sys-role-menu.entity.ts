// sys-user-role.entity.ts

import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { SysMenuEntity } from './sys-menu.entity';
import { SysRoleEntity } from '../../sys-user/entities/sys-role.entity';

@Entity({
  name: 'sys_role_menu',
  comment: '角色和菜单权限关联表',
})
export class SysRoleMenuEntity {
  @PrimaryColumn({
    name: 'menu_id',
    type: 'bigint',
    comment: '菜单ID',
  })
  menuId: string;

  @PrimaryColumn({
    name: 'role_id',
    type: 'bigint',
    comment: '角色ID',
  })
  roleId: string;

  @ManyToOne(() => SysMenuEntity, (menu) => menu.roleMenus, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'menu_id' })
  menu: SysMenuEntity;

  @ManyToOne(() => SysRoleEntity, (role) => role.roleMenus, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: SysRoleEntity;
}
