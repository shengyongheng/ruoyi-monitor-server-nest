import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  photo: string;

  /**
   * @OneToOne 装饰器,它允许我们在两个实体之间创建一对一的关系。 type => User是一个函数，返回我们想要与之建立关系的实体的类。
   * 由于特定于语言的关系，我们只能使用一个返回类的函数，而不是直接使用该类。
   * 同时也可以把它写成()=> User，但是type => User显得代码更有可读性。type 变量本身不包含任何内容。
   */
  @OneToOne(() => User)
  /**
 * 默认情况下，关系始终引用相关实体的主列。 如果要与相关实体的其他列创建关系 - 你也可以在 @JoinColumn 中指定它们：

    @OneToOne((type) => User)
    @JoinColumn({ referencedColumnName: "name" })
    user: User;

    该关系现在引用 User 实体的 name，而不是 id。 该关系的列名将变为 photoName
 */
  @JoinColumn()
  user: User;
}
