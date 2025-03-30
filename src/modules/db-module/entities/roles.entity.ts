import { Column, Entity, OneToMany } from 'typeorm';
import { BaseDB } from './base';
import { Permission } from './permissions.entity';
import { User } from './users.entity';

@Entity()
export class Roles extends BaseDB {
  @Column()
  name: string;

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
