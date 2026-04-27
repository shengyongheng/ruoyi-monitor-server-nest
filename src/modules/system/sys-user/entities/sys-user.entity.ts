import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SysUserRoleEntity } from './sys-user-role.entity';

@Entity({
  name: 'sys_user',
  comment: '用户信息表',
})
export class SysUserEntity {
  @PrimaryGeneratedColumn({
    name: 'user_id',
    type: 'bigint',
    comment: '用户ID',
  })
  userId: string; // ⚠️ bigint 推荐用 string（避免精度丢失）

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 30,
    nullable: false,
    comment: '用户昵称',
  })
  username: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    default: '',
    comment: '密码',
  })
  password: string;

  @Column({
    name: 'status',
    type: 'char',
    length: 1,
    default: '0',
    comment: '帐号状态（0正常 1停用）',
  })
  status: string;

  @Column({
    name: 'del_flag',
    type: 'char',
    length: 1,
    default: '0',
    comment: '删除标志（0代表存在 2代表删除）',
  })
  delFlag: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime',
    nullable: true,
    comment: '创建时间',
  })
  createTime: Date;

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

  @OneToMany(() => SysUserRoleEntity, (ur) => ur.user)
  userRoles: SysUserRoleEntity[];
}
