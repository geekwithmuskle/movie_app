import { Controller } from '@nestjs/common';
import { LoginDto } from '../dto/auth.dto';
import { UserService } from 'src/modules/user';
import { compare } from 'bcrypt';
import AppError from 'src/shared/utils/AppError';
import { ErrorCode } from 'src/shared';

@Controller('service')
export class AuthService {
  constructor(private userService: UserService) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
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
