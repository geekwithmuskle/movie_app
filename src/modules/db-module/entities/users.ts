import { Column, Entity, OneToMany } from 'typeorm';
import { BaseDB } from './base';
import { RefreshTokens } from './refresh-token';
import { ResetTokens } from './reset-token';

@Entity({ name: 'users' })
export class User extends BaseDB {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // @Column({ type: 'enum', enum: Resource, default: Resource.User })
  // roles: Resource;

  @OneToMany(() => RefreshTokens, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshTokens[];

  @OneToMany(() => RefreshTokens, (resetToken) => resetToken.user)
  resetTokens: ResetTokens[];
}
