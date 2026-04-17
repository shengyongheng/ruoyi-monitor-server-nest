import { BaseEntity } from 'src/modules/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'monitor_resource', comment: '前端资源性能监控表' })
export class MonitorResource extends BaseEntity {
  @Column({
    type: 'boolean',
    default: 0,
    comment: '是否命中缓存（0-未命中 1-命中）',
  })
  cached: boolean;

  @Column({
    name: 'decoded_size',
    type: 'bigint',
    default: 0,
    comment: '解码后资源大小(bytes)',
  })
  decodedSize: number;

  @Column({ type: 'double', default: 0, comment: '资源加载总耗时(ms)' })
  duration: number;

  @Column({
    name: 'encoded_size',
    type: 'bigint',
    default: 0,
    comment: '编码后资源大小(bytes)',
  })
  encodedSize: number;

  @Column({
    name: 'initiator_type',
    type: 'varchar',
    length: 32,
    nullable: true,
    default: null,
    comment: '资源发起类型(script/img/css/fetch)',
  })
  initiatorType: string | null;

  @Column({ type: 'varchar', length: 512, nullable: false, comment: '资源URL' })
  name: string;

  @Column({
    name: 'start_time',
    type: 'double',
    default: 0,
    comment: '开始时间(performance.now)',
  })
  startTime: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    default: null,
    comment: '资源状态(success/error)',
  })
  status: string | null;

  @Column({
    name: 'transfer_size',
    type: 'bigint',
    default: 0,
    comment: '传输大小(bytes)',
  })
  transferSize: number;

  // timing 拆分字段
  @Column({ type: 'double', default: 0, comment: 'DNS解析耗时(ms)' })
  dns: number;

  @Column({ type: 'double', default: 0, comment: 'TCP连接耗时(ms)' })
  tcp: number;

  @Column({ type: 'double', default: 0, comment: 'SSL握手耗时(ms)' })
  ssl: number;

  @Column({ type: 'double', default: 0, comment: '下载耗时(ms)' })
  download: number;
}
