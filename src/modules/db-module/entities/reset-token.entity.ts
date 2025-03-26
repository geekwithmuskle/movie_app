import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'reset_tokens' })
export class ResetTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  userId: number;

  @Column()
  expiryDate: Date;

  @ManyToOne(() => User, (user) => user.resetTokens, { onDelete: 'CASCADE' })
  // This decorator specifies the foreign key column name.
  @JoinColumn({ name: 'userId' })
  user: User;
}
