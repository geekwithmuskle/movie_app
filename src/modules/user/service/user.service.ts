import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/db-module';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import AppError from 'src/shared/utils/AppError';
import { ErrorCode } from 'src/shared';
import { hash } from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email } = data;
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (user) throw new AppError(ErrorCode['0002'], 'Request Failed!!!');

    const hashedPassword = await hash(data.password, 10);

    // Create user with role
    const newUser = this.userRepository.create({
      ...data,
      password: hashedPassword,
      // Add role ID
      // roles: Resource.User, // Add role
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

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async Update(dto: UpdateUserDto): Promise<User> {
    if (!dto.email) {
      throw new AppError(ErrorCode['0002'], 'Email is required');
    }

    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) {
      throw new AppError(ErrorCode['0002'], 'User does not exist!!!');
    }

    const updatedUser = await this.userRepository.merge(user, dto);

    return await this.userRepository.save(updatedUser);
  }

  async findById(data: number) {
    return await this.userRepository.findOne({ where: { id: data } });
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  // async loggedInUser(id: number) {
  //   return await this.userRepository.findOneBy({ id });
  // }
}
