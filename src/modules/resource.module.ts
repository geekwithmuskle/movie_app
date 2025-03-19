import { Module } from '@nestjs/common';
import { MoviesController, MoviesModule, MoviesService } from './movies';
import { UserController, UserModule, UserService } from './user';
import { AuthController, AuthModule, AuthService } from './auth';
import { DatabaseModule, Movies, RefreshTokens, User } from './db-module';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Movies]),
    TypeOrmModule.forFeature([RefreshTokens]),
    DatabaseModule,
    MoviesModule,
    UserModule,
    AuthModule,
  ],
  controllers: [UserController, AuthController, MoviesController],
  providers: [MoviesService, AuthService, JwtService, UserService],
  exports: [JwtService],
})
export class ResourceModule {}
