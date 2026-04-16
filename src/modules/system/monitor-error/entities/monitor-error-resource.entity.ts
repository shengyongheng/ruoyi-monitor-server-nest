import { BaseEntity } from 'src/modules/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('monitor_error_resource', {
  comment: '资源错误表',
})
export class MonitorErrorResource extends BaseEntity {
  @Column({
    name: 'tag_name',
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '标签名',
  })
  tagName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '资源地址',
  })
  src: string;

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '页面URL' })
  href: string;
}
