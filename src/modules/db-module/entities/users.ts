import { Column, Entity } from 'typeorm';
import { BaseDB } from './base';
import { Resource } from 'src/modules/rbac';

@Entity({ name: 'users' })
export class User extends BaseDB {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Resource, default: Resource.User })
  roles: Resource;
}
