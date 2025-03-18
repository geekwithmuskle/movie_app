import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/auth.dto';
import { UserService } from 'src/modules/user';
import { compare } from 'bcrypt';
import AppError from 'src/shared/utils/AppError';
import { ErrorCode } from 'src/shared';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/libs/configuration';

const config = configuration();
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
        roles: user.roles,
      },
    };

    return {
      user,
      backendToken: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: config.jwt.secretKey,
        }),
      },
      refreshToken: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '2d',
          secret: config.jwt.refreshToken,
        }),
      },
    };
  }

  async validateUser(data: LoginDto) {
    const user = await this.userService.findByEmail(data);

    if (user && (await compare(data.password, user.password))) {
      const { password, id, ...result } = user;
      return result;
    }
    throw new AppError(ErrorCode['0005'], 'Invalid Credentials');
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: config.jwt.secretKey,
      }),

      refreshToken: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: config.jwt.refreshToken,
        }),
      },
    };
  }
}
