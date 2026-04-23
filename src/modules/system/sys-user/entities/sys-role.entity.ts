import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SysUserRoleEntity } from './sys-user-role.entity';
import { SysRoleMenuEntity } from '../../sys-menu/entities/sys-role-menu.entity';

@Entity({
  name: 'sys_role',
  comment: '角色信息表',
})
export class SysRoleEntity {
  @PrimaryGeneratedColumn({
    name: 'role_id',
    type: 'bigint',
    comment: '角色ID',
  })
  roleId: string; // bigint → string

  @Column({
    name: 'role_name',
    type: 'varchar',
    length: 30,
    nullable: false,
    comment: '角色名称',
  })
  roleName: string;

  @Column({
    name: 'role_key',
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '角色权限字符串',
  })
  roleKey: string;

  @Column({
    name: 'role_sort',
    type: 'int',
    width: 4,
    nullable: false,
    comment: '显示顺序',
  })
  roleSort: number;

  @Column({
    name: 'data_scope',
    type: 'char',
    length: 1,
    default: '1',
    comment: '数据范围',
  })
  dataScope: string;

  @Column({
    name: 'menu_check_strictly',
    type: 'tinyint',
    width: 1,
    default: () => '1',
    comment: '菜单树选择项是否关联显示',
  })
  menuCheckStrictly: boolean;

  @Column({
    name: 'dept_check_strictly',
    type: 'tinyint',
    width: 1,
    default: () => '1',
    comment: '部门树选择项是否关联显示',
  })
  deptCheckStrictly: boolean;

  @Column({
    name: 'status',
    type: 'char',
    length: 1,
    nullable: false,
    comment: '角色状态（0正常 1停用）',
  })
  status: string;

  @Column({
    name: 'del_flag',
    type: 'char',
    length: 1,
    default: '0',
    comment: '删除标志',
  })
  delFlag: string;

  @Column({
    name: 'create_by',
    type: 'varchar',
    length: 64,
    default: '',
    comment: '创建者',
  })
  createBy: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime',
    nullable: true,
    comment: '创建时间',
  })
  createTime: Date;

  @Column({
    name: 'update_by',
    type: 'varchar',
    length: 64,
    default: '',
    comment: '更新者',
  })
  updateBy: string;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'datetime',
    nullable: true,
    comment: '更新时间',
  })
  updateTime: Date;

  @Column({
    name: 'remark',
    type: 'varchar',
    length: 500,
    nullable: true,
    comment: '备注',
  })
  remark?: string;

  @OneToMany(() => SysUserRoleEntity, (ur) => ur.role)
  userRoles: SysUserRoleEntity[];

  @OneToMany(() => SysRoleMenuEntity, (rm) => rm.role)
  roleMenus: SysRoleMenuEntity[];
}
