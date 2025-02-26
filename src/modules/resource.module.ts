import { Module } from '@nestjs/common';
import { MoviesController, MoviesModule, MoviesService } from './movies';
import { UserController, UserModule, UserService } from './user';
import { AuthController, AuthModule, AuthService } from './auth';
import { DatabaseModule, Movies, UsersEntity } from './db-module';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from './access-control/access-control.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    TypeOrmModule.forFeature([Movies]),
    DatabaseModule,
    MoviesModule,
    UserModule,
    AuthModule,
    AccessControlModule,
  ],
  controllers: [UserController, AuthController, MoviesController],
  providers: [MoviesService, AuthService, JwtService, UserService],
})
export class ResourceModule {}
