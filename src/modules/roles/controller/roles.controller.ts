import { Controller } from '@nestjs/common';
import { RolesService } from '../service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
}
