// sys-user-role.entity.ts

import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { SysUserEntity } from './sys-user.entity';
import { SysRoleEntity } from './sys-role.entity';

@Entity({
  name: 'sys_user_role',
  comment: '用户和角色关联表',
})
export class SysUserRoleEntity {
  @PrimaryColumn({
    name: 'user_id',
    type: 'bigint',
    comment: '用户ID',
  })
  userId: string;

  @PrimaryColumn({
    name: 'role_id',
    type: 'bigint',
    comment: '角色ID',
  })
  roleId: string;

  @ManyToOne(() => SysUserEntity, (user) => user.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: SysUserEntity;

  @ManyToOne(() => SysRoleEntity, (role) => role.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: SysRoleEntity;
}
