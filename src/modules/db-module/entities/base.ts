import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseDB {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  CreateAt: Date;

  @UpdateDateColumn()
  UpdateAt: Date;
}
