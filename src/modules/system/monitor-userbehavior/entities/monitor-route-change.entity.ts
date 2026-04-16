import { BaseEntity } from 'src/modules/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'monitor_route_change', comment: '路由变化表' })
export class MonitorRouteChange extends BaseEntity {
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
