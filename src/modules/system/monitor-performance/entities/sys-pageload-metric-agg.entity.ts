import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'sys_pageload_metric_agg', comment: '页面加载指标聚合表' })
export class SysPageloadMetricAgg {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键ID' })
  id: number;

  @Column({ type: 'varchar', length: 20, default: '', comment: '指标类型' })
  type: string;

  @Column({
    name: 'p50_value',
    type: 'double',
    nullable: false,
    comment: 'P50值',
  })
  p50Value: number;

  @Column({
    name: 'p75_value',
    type: 'double',
    nullable: false,
    comment: 'P75值',
  })
  p75Value: number;

  @Column({
    name: 'p90_value',
    type: 'double',
    nullable: false,
    comment: 'P90值',
  })
  p90Value: number;
}
