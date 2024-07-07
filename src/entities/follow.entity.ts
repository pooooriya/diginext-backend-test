import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'follow', synchronize: false })
export class Follow {
  @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
  id: never;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'follower_id' })
  follower: User;

  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn({ name: 'following_id' })
  following: User;
}
