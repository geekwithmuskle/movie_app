import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ErrorCode } from 'src/shared';
import AppError from 'src/shared/utils/AppError';
import { PERMISSION_KEY } from '../decorator/permission.decorator';
import { AuthService } from '../service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.user.userId);
    if (!request.user.userId) {
      throw new AppError(ErrorCode['0002'], 'User ID not found');
    }

    const routePermissions = this.reflector.getAllAndOverride(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    try {
      const userPermissions = await this.authService.getPermission(
        request.user.userId,
      );

      for (const routePermission of routePermissions) {
        const userPermission = userPermissions.find(
          (perm) => perm.resource === routePermission.resource,
        );

        if (!userPermission)
          throw new AppError(ErrorCode['0005'], 'permissions not found');

        const allActionAvailable = routePermission.action.every(
          (requiredAction) => userPermission.action.includes(requiredAction),
        );

        if (!allActionAvailable)
          throw new AppError(ErrorCode['0005'], 'actions not found');
      }
    } catch (err) {
      console.log(err);
      throw new AppError(ErrorCode['0005'], 'Error fetching route permissions');
    }

    return true;
  }
}
