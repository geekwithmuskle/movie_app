import { Module } from '@nestjs/common';
import { AuthController } from './controller';
import { AuthService } from './service';
import { UserService } from '../user';
import { UsersEntity } from '../db-module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
