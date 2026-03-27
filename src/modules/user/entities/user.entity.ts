import { Article } from 'src/modules/article/entities/article.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'firstname', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', name: 'lastname', length: 100 })
  lastName: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
