import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies/movies.controller';
import { MoviesService } from './services/movies/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from 'src/modules/db-module/entities/movies';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Movies])],
  controllers: [MoviesController],
  providers: [MoviesService, JwtService],
})
export class MoviesModule {}
