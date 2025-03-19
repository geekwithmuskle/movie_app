import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import configuration from 'src/libs/configuration';
import { ErrorCode } from 'src/shared';
import AppError from 'src/shared/utils/AppError';

const config = configuration();

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token)
      throw new AppError(ErrorCode['0002'], 'Token not generated or correct');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwt.secretKey,
      });

      request['user'] = payload;
    } catch (err) {
     // console.log(err);
      throw new AppError(ErrorCode['0002'], 'Your Request Failed');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type == 'Bearer' ? token : undefined;
  }
}
