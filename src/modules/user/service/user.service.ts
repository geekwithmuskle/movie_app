import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/modules/db-module';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import AppError from 'src/shared/utils/AppError';
import { ErrorCode } from 'src/shared';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async create(data: CreateUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (user) throw new AppError(ErrorCode['0002'], 'User already exists!!!');

    const hashedpassword = await hash(data.password, 10);

    const newUser = this.userRepository.create({
      ...data,
      password: hashedpassword,
    });

    //const { password, ...result } = newUser;

    return await this.userRepository.save(newUser);
  }

  async listUser(): Promise<UsersEntity[]> {
    const users = await this.userRepository.find();
    if (!users.length) {
      console.warn('No users found in the database.');
    }

    return users;
  }
}
