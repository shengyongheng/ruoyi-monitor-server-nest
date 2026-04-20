import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sys_menu' })
export class SysMenuEntity {
  @PrimaryGeneratedColumn({
    name: 'menu_id',
    type: 'bigint',
    comment: '菜单ID',
  })
  menuId: string;

  @Column({
    name: 'menu_name',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '菜单名称',
  })
  menuName: string;

  @Column({
    name: 'parent_id',
    type: 'bigint',
    default: 0,
    nullable: true,
    comment: '父菜单ID',
  })
  parentId: string;

  @Column({
    name: 'order_num',
    type: 'int',
    default: 0,
    nullable: true,
    comment: '显示顺序',
  })
  orderNum: number;

  @Column({
    type: 'varchar',
    length: 200,
    default: '',
    nullable: true,
    comment: '路由地址',
  })
  path: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '组件路径' })
  component: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '路由参数' })
  query: string;

  @Column({
    name: 'route_name',
    type: 'varchar',
    length: 50,
    default: '',
    nullable: true,
    comment: '路由名称',
  })
  routeName: string;

  @Column({
    name: 'is_frame',
    type: 'char',
    default: '1',
    nullable: true,
    comment: '是否为外链（0是 1否）',
  })
  isFrame: string;

  @Column({
    name: 'is_cache',
    type: 'int',
    default: 0,
    nullable: true,
    comment: '是否缓存（0缓存 1不缓存）',
  })
  isCache: number;

  @Column({
    name: 'menu_type',
    type: 'char',
    length: 1,
    default: '',
    nullable: true,
    comment: '菜单类型（M目录 C菜单 F按钮）',
  })
  menuType: string;

  @Column({
    type: 'char',
    length: 1,
    default: '0',
    nullable: true,
    comment: '菜单状态（0显示 1隐藏）',
  })
  visible: string;

  @Column({
    type: 'char',
    length: 1,
    default: '0',
    nullable: true,
    comment: '菜单状态（0正常 1停用）',
  })
  status: string;

  @Column({ type: 'varchar', length: 100, nullable: true, comment: '权限标识' })
  perms: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: '#',
    nullable: true,
    comment: '菜单图标',
  })
  icon: string;

  @Column({
    name: 'create_by',
    type: 'varchar',
    length: 64,
    default: '',
    nullable: true,
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
    nullable: true,
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
    type: 'varchar',
    length: 500,
    default: '',
    nullable: true,
    comment: '备注',
  })
  remark: string;

  /** 子菜单 */
  children: Array<SysMenuEntity> = [];
}
