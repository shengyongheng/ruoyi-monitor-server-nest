import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(firstName: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ firstName });
  }

  /**
   * 调用 articlesRepository
   */
  useArticlesRepository() {
    return;
  }

  // 批量新增用户
  async createMany(param: { users: Array<CreateUserDto> }) {
    const users = param.users;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const user of users) {
        await queryRunner.manager.save(User, user);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      // 因为我们有错误，所以让我们回滚我们所做的更改
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // 手动释放 queryRunner 实例
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
