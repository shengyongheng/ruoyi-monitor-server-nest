import { BaseEntity } from 'src/modules/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('monitor_error_request', {
  comment: '数据请求错误表',
})
export class MonitorErrorRequest extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '错误信息',
  })
  message: string;

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '请求URL' })
  url: string;

  @Column({ type: 'int', nullable: false, comment: 'HTTP状态码' })
  status: number;

  @Column({ type: 'int', nullable: false, comment: '请求耗时（毫秒）' })
  duration: number;

  @Column({ type: 'text', nullable: false, comment: '请求方法' })
  method: string;
}
