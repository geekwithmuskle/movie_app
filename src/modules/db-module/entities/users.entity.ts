import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseDB } from './base';
import { RefreshTokens } from './refresh-token.entity';
import { ResetTokens } from './reset-token.entity';
import { Roles } from './roles.entity';

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

  @OneToMany(() => ResetTokens, (resetToken) => resetToken.user)
  resetTokens: ResetTokens[];

  @ManyToOne(() => Roles, (roles) => roles.users)
  @JoinColumn({ name: 'roleId' })
  role: Roles;
}
