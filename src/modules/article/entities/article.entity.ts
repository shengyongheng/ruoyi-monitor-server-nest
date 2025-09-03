import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // // 在你设置@ManyToOne的地方，相关实体将有"关联 id"和外键。
  // @ManyToOne(() => User, (user) => user.articles)
  // user: User;
}
