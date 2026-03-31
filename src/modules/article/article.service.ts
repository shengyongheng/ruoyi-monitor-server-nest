import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = new Article();
    article.title = createArticleDto.title;
    const user = await this.usersRepository.find({
      where: {
        id: createArticleDto.userId,
      },
    });
    article.user = user[0];
    // user[0].articles = [article];
    // await this.usersRepository.save(user);
    await this.articlesRepository.save(article);
    return 'ok';
  }

  findAll() {
    // throw new NotFoundException('Cat not found article findAll()');
    return `This action returns all article`;
  }

  async findOne(id: number) {
    // const getUserById = await this.usersRepository.find({
    //   where: { id },
    //   relations: ['articles'],
    // });
    // console.log(getUserById);

    const getArticleById = await this.articlesRepository.find({
      where: { id },
      relations: ['user'],
    });
    console.log(getArticleById);
    return getArticleById;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
