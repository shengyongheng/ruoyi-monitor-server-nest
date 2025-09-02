import { Article } from 'src/modules/article/entities/article.entity';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', unique: true, length: 50 })
  username: string;

  @Column({ type: 'varchar', unique: true, length: 100 })
  email: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    // cascade: true, // 级联操作
    eager: true, // 自动加载关联对象
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
