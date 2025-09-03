import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    // 该模块使用 forFeature() 方法来定义当前作用域中注册的存储库。完成此操作后，我们就可以使用 @InjectRepository() 装饰器将 UsersRepository 注入到 UsersService 中
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
