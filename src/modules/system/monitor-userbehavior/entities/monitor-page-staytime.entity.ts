import { BaseEntity } from 'src/modules/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'monitor_page_staytime', comment: '页面停留时间表' })
export class MonitorPageStaytime extends BaseEntity {
  @Column({
    name: 'stay_time',
    type: 'bigint',
    nullable: true,
    default: null,
    comment: '页面停留时间',
  })
  stayTime: number;
}
