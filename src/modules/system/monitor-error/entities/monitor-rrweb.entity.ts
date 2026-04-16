import { BaseEntity } from 'src/modules/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'monitor_rrweb', comment: '错误 rrweb 事件表' })
export class MonitorRrweb extends BaseEntity {
  @Column({
    type: 'text',
    nullable: false,
    comment: 'rrweb 事件数据（JSON格式）',
  })
  events: string;
}
