import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Action, Resource } from '../enums';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({
    length: 50,
    nullable: true,
  })
  desc: string;

  @Column({
    type: 'enum',
    enum: Resource,
    default: Resource.users,
  })
  resource: Resource;

  @Column({
    type: 'enum',
    enum: Action,
    default: Action.read,
  })
  actions: Action;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
