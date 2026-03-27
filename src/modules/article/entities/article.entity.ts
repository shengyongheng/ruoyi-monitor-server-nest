import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // 在你设置@ManyToOne的地方，实体类对应的数据库表将有"关联 id"和外键。userId
  // 在@ManyToOne / @OneToMany关系中省略 @JoinColumn，除非你需要自定义关联列在数据库中的名称。
  @ManyToOne(() => User, (user) => user.articles)
  user: User;
}
