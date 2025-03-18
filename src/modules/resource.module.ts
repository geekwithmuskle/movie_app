import { Module } from '@nestjs/common';
import { MoviesController, MoviesModule, MoviesService } from './movies';
import { UserController, UserModule, UserService } from './user';
import { AuthController, AuthModule, AuthService } from './auth';
import { DatabaseModule, Movies, RefreshTokens, User } from './db-module';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RbacController } from './rbac/controller';
import { RbacService } from './rbac/service';
import { RbacModule } from './rbac';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Movies]),
    TypeOrmModule.forFeature([RefreshTokens]),
    DatabaseModule,
    MoviesModule,
    UserModule,
    AuthModule,
    RbacModule,
  ],
  controllers: [
    UserController,
    AuthController,
    MoviesController,
    RbacController,
  ],
  providers: [MoviesService, AuthService, JwtService, UserService, RbacService],
  exports: [JwtService],
})
export class ResourceModule {}
