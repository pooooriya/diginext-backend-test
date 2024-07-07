import { Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { FollowService } from 'src/services/follow.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':followerId/:followingId')
  async follow(
    @Param('followerId') followerId: number,
    @Param('followingId') followingId: number,
  ) {
    await this.followService.follow(followerId, followingId);
  }

  @Delete(':followerId/:followingId')
  async unfollow(
    @Param('followerId') followerId: number,
    @Param('followingId') followingId: number,
  ) {
    await this.followService.unfollow(followerId, followingId);
  }

  @Get(':userId/followers/count')
  async getFollowersCount(@Param('userId') userId: number): Promise<number> {
    return await this.followService.getFollowersCount(userId);
  }
}
