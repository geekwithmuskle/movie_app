import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/modules/db-module';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dtos';
import AppError from 'src/shared/utils/AppError';
import { ErrorCode } from 'src/shared';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Roles) private roleRepo: Repository<Roles>) {}

  async createRole(role: CreateRoleDto) {
    if (await this.verifyRole(role.name)) {
      throw new AppError(ErrorCode['0002'], 'Role already exists');
    }
    console.log(role);
    const result = await this.roleRepo.create(role);

    return await this.roleRepo.save(result);
  }

  async deleteRole(rolename: string) {
    const result = await this.verifyRole(rolename);
    return await this.roleRepo.remove(result);
  }

  async verifyRole(rolename: string) {
    return await this.roleRepo.findOneBy({ name: rolename });
  }

  async getRoleId(roleId: number) {
    return await this.roleRepo.find({ where: { id: roleId } });
  }
}
