import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowController } from 'src/controllers/follow.controller';
import { Follow } from 'src/entities/follow.entity';
import { User } from 'src/entities/user.entity';
import { FollowService } from 'src/services/follow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, User])],
  providers: [FollowService],
  controllers: [FollowController],
})
export class FollowModule {}
