import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/modules/db-module';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dtos/create-role.dto';

@Injectable()
export class AccessControlService {
  constructor(
    @InjectRepository(Role) private RoleRepository: Repository<Role>,
  ) {}

  async createRole(role: CreateRoleDto) {
    const response = this.RoleRepository.create(role);

    try {
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getRoleById(roleId: number) {
    return this.RoleRepository.findOne({
      where: {
        id: roleId,
      },
    });
  }
}
