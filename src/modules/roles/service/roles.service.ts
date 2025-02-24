import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/modules/db-module/entities/authorization';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async createRole(role: CreateRoleDto){
    return this.roleRepo.create(role);
  }
}
