import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RolesService } from '../service/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() role: CreateRoleDto) {
    return this.rolesService.createRole(role);
  }
}
