import { BaseEntity } from 'src/modules/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'monitor_userbehavior', comment: '用户行为表' })
export class MonitorUserBehavior extends BaseEntity {
  @Column({ type: 'text', nullable: true, comment: '用户行为描述' })
  description: string;
}
