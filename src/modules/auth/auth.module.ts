import { Module } from '@nestjs/common';
import { AuthController } from './controller';
import { AuthService } from './service';
import { UserService } from '../user';
import { RefreshTokens, ResetTokens, Roles, User } from '../db-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from '../roles';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([RefreshTokens]),
    TypeOrmModule.forFeature([ResetTokens]),
    TypeOrmModule.forFeature([Roles]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, RolesService],
  exports: [AuthService],
})
export class AuthModule {}
