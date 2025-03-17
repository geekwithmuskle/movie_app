import { SetMetadata } from '@nestjs/common';
import { Resource } from '../enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Resource[]) => SetMetadata(ROLES_KEY, roles);
