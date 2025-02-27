import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ErrorCode } from 'src/shared';
import AppError from 'src/shared/utils/AppError';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new AppError(ErrorCode['0002'], 'User not Found!!!');
    }

    const requiredRoutePermission = this.reflector.getAllAndOverride(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log(requiredRoutePermission);
    return true;
  }
}
