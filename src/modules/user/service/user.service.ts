import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/db-module';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import AppError from 'src/shared/utils/AppError';
import { ErrorCode } from 'src/shared';
import { hash } from 'bcrypt';
import { QueryParamDto } from '../dto/query-param.dto';
import { LoginDto } from 'src/modules/auth/dto/auth.dto';
import { Resource } from 'src/modules/rbac';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (user) throw new AppError(ErrorCode['0002'], 'User already exists!!!');

    const hashedPassword = await hash(data.password, 10);

    // Create user with role
    const newUser = this.userRepository.create({
      ...data,
      password: hashedPassword,
      // Add role ID
      roles: Resource.User, // Add role
    });

    const savedUser = await this.userRepository.save(newUser);

    // Remove password from result
    const { password, ...result } = savedUser;
    return result;
  }

  async listUser(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users.length) {
      console.warn('No users found in the database.');
    }

    return users;
  }

  async findByEmail(data: LoginDto) {
    return await this.userRepository.findOne({
      where: {
        email: data.username,
      },
    });
  }

  async findByEmailAndUpdate(dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new AppError(ErrorCode['0002'], 'User does not exist!!!');
    }

    const updatedUser = this.userRepository.merge(user, dto);

    return await this.userRepository.save(updatedUser);
  }

  async findById(data: QueryParamDto): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: data.id,
      },
    });
  }
}
