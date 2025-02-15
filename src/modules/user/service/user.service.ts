import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/modules/db-module/entities/users';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import AppError from 'src/shared/utils/AppError';
import { ErrorCode } from 'src/shared';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async create(data: CreateUserDto) {
    const user = this.userRepository.findOne({ where: { email: data.email } });

    if (user) throw new AppError(ErrorCode['0002'], 'User already exists!!!');

    const newUser = this.userRepository.create({
      ...data,
      password: await hash(data.password, 10),
    });

    const { password, ...result } = newUser;
    return result;
  }
}
