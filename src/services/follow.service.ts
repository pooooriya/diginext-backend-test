import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from '../entities/follow.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async follow(followerId: number, followingId: number): Promise<void> {
    try {
      const follower = await this.userRepository.findOne({
        where: { id: followerId },
      });
      const following = await this.userRepository.findOne({
        where: { id: followingId },
      });

      if (!follower || !following) {
        throw new BadRequestException('خطایی رخ داده است');
      }

      const follow = this.followRepository.create({
        follower,
        following,
      });
      await this.followRepository.save(follow);
    } catch {
      throw new BadRequestException('خطایی رخ داده است');
    }
  }

  async unfollow(followerId: number, followingId: number): Promise<void> {
    const result = await this.followRepository.delete({
      follower: { id: followerId },
      following: { id: followingId },
    });
    if (result.affected === 0) {
      throw new BadRequestException(
        'امکان آنفالو برای کاربر مورد نظر میسر نیست',
      );
    }
  }

  async getFollowersCount(userId: number): Promise<number> {
    return await this.followRepository.count({
      where: { following: { id: userId } },
    });
  }
}
