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

  // 批量新增用户
  async createMany(param: { users: Array<CreateUserDto> }) {
    const users = param.users;
    console.log('users:', users);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(User, users[0]);
      await queryRunner.manager.save(User, users[1]);

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

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
