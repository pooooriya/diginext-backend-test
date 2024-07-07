import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(username: string): Promise<User> {
    const isExist = await this.userRepository.exists({ where: { username } });
    if (isExist) {
      throw new BadRequestException('کاربری با این نام کاربری تکراری است');
    }
    const user = this.userRepository.create({ username });
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        followers: true,
        following: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['following', 'followers'],
    });
  }
}
