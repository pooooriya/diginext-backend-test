import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Follow } from './entities/follow.entity';
import { UserModule } from './modules/user.module';
import { FollowModule } from './modules/follow.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Follow],
      synchronize: true,
    }),
    UserModule,
    FollowModule,
  ],
})
export class AppModule {}
