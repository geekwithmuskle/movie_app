import { Module } from '@nestjs/common';
import { MoviesController, MoviesModule, MoviesService } from './movies';
import { UserController, UserModule, UserService } from './user';
import { AuthController, AuthModule, AuthService } from './auth';
import {
  DatabaseModule,
  Movies,
  RefreshTokens,
  ResetTokens,
  User,
} from './db-module';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from './logger';
import { RolesModule } from './roles';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Movies]),
    TypeOrmModule.forFeature([RefreshTokens]),
    TypeOrmModule.forFeature([ResetTokens]),
    DatabaseModule,
    MoviesModule,
    UserModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [UserController, AuthController, MoviesController],
  providers: [
    MoviesService,
    AuthService,
    JwtService,
    UserService,
    LoggerService,
  ],
  exports: [JwtService],
})
export class ResourceModule {}
