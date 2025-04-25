import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/modules/roles/dtos';

export const PERMISSION_KEY = 'permissions';

export const Permissions = (permissions: Permission[]) =>
  SetMetadata('permissions', permissions);
