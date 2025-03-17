import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Resource } from '../enums';
import AppError from 'src/shared/utils/AppError';
import { ErrorCode } from 'src/shared';
import { ROLES_KEY } from '../decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const user = request.user;

    if (!user) throw new AppError(ErrorCode['0002'], 'User not found!!!');

    const requiredRoles = this.reflector.getAllAndOverride<Resource[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    return user.roles.some((role) => requiredRoles.includes(role));
  }
}
