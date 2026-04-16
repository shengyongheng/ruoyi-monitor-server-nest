import { BaseEntity } from 'src/modules/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'monitor_performance_metric', comment: '性能数据表' })
export class MonitorPerformanceMetric extends BaseEntity {
  @Column({ type: 'double', nullable: false, comment: '性能指标值' })
  value: number;
}
