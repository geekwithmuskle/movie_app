import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseDB } from './base';
import { Action, Resource } from 'src/modules/roles/enum';
import { Roles } from './roles.entity';

@Entity()
export class Permission extends BaseDB {
  @Column({ type: 'enum', enum: Resource, default: Resource.user })
  resource: Resource;

  @Column({ type: 'set', enum: Action, default: [Action.read] })
  actions: Action[];

  @ManyToOne(() => Roles, (roles) => roles.permissions)
  @JoinColumn({ name: 'roleId' })
  role: Roles;
}
