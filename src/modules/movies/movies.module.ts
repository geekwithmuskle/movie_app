import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies/movies.controller';
import { MoviesService } from './services/movies/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from 'src/modules/db-module/entities/movies.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth';
import { RefreshTokens, ResetTokens, Roles, User } from '../db-module';
import { UserService } from '../user';
import { RolesService } from '../roles';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movies]),
    TypeOrmModule.forFeature([RefreshTokens]),
    TypeOrmModule.forFeature([ResetTokens]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Roles]),
  ],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    JwtService,
    AuthService,
    UserService,
    RolesService,
  ],
})
export class MoviesModule {}
