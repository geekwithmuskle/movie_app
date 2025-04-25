import { Column, Entity, OneToMany } from 'typeorm';
import { BaseDB } from './base';
import { Permission } from './permissions.entity';
import { User } from './users.entity';
import { Action, Resource } from 'src/modules/roles/enum';

@Entity()
export class Roles extends BaseDB {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: Resource })
  resource: Resource;

  @Column({ type: 'set', enum: Action })
  action: Action[];

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
