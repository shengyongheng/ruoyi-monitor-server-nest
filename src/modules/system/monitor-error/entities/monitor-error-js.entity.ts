import { BaseEntity } from 'src/modules/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('monitor_error_js', {
  comment: 'js 错误表',
})
export class MonitorErrorJs extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  message: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  filename: string;

  @Column({
    type: 'int',
  })
  lineno: number;

  @Column({
    type: 'int',
  })
  colno: number;

  @Column({
    type: 'text',
  })
  stack: string;
}
