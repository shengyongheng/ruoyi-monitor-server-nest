import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'monitor_route_change', comment: '路由变化表' })
export class MonitorRouteChange {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键ID' })
  id: number;

  @Column({
    name: 'project_key',
    type: 'varchar',
    length: 64,
    nullable: false,
    comment: '项目标识',
  })
  projectKey: string;

  @Column({ type: 'varchar', length: 20, nullable: false, comment: '类型' })
  type: string;

  @Column({
    name: 'event_type',
    type: 'varchar',
    length: 32,
    nullable: false,
    comment: '事件类型',
  })
  eventType: string;

  @Column({ type: 'bigint', nullable: false, comment: '时间戳（毫秒）' })
  timestamp: string;

  @Column({
    name: 'session_id',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '会话ID',
  })
  sessionId: string;

  @Column({ name: 'user_id', type: 'int', nullable: false, comment: '用户ID' })
  userId: number;

  @Column({ type: 'varchar', length: 32, nullable: false, comment: '用户名' })
  username: string;

  @Column({
    name: 'triger_type',
    type: 'varchar',
    length: 20,
    nullable: true,
    default: null,
    comment: '触发类型',
  })
  trigerType: string;

  @Column({
    name: 'new_url',
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: '新URL',
  })
  newUrl: string;

  @Column({
    name: 'old_url',
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: '旧URL',
  })
  oldUrl: string;

  @Column({
    name: 'hash_stay_time',
    type: 'bigint',
    nullable: true,
    default: null,
    comment: 'hash 页面停留时间',
  })
  hashStayTime: string;
}
