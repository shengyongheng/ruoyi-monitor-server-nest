import { Injectable } from '@nestjs/common';
import { CreateSerializationDto } from './dto/create-serialization.dto';
import { UpdateSerializationDto } from './dto/update-serialization.dto';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SerializationService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  create(createSerializationDto: CreateSerializationDto) {
    return 'This action adds a new serialization';
  }

  findAll() {
    return `This action returns all serialization`;
  }

  async findOne(id: number) {
    const users = await this.userRepository.find({
      where: {
        id,
      },
    });
    return users;
  }

  update(id: number, updateSerializationDto: UpdateSerializationDto) {
    return `This action updates a #${id} serialization`;
  }

  remove(id: number) {
    return `This action removes a #${id} serialization`;
  }
}
