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
