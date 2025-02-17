import { Controller } from '@nestjs/common';
import { LoginDto } from '../dto/auth.dto';
import { UserService } from 'src/modules/user';
import { compare } from 'bcrypt';
import AppError from 'src/shared/utils/AppError';
import { ErrorCode } from 'src/shared';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/libs/configuration';

const config = configuration();
@Controller('service')
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
          expiresIn: '7d',
          secret: config.jwt.refreshToken,
        }),
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.username);

    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new AppError(ErrorCode['0005'], 'Username or Password not correct');
  }
}
