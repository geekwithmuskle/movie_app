import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/modules/roles/dto/create-role.dto';

export const Permissions = (permissions: Permission[]) =>
  SetMetadata('permissions', permissions);
