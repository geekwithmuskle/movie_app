import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/movies/dtos/pagination.dto';
import { UpdateMovieDto } from 'src/movies/dtos/UpdateMovie.dto';
import AppError from 'src/movies/utils/AppError';
import { CreateMovieParams } from 'src/movies/utils/types';
import { ErrorCode } from 'src/shared/error-code.enum';
import { Movies } from 'src/typeorm/entities/movies';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies) private movieRepository: Repository<Movies>,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<{ movies: Movies[]; total: number }> {
    const page = paginationDto.page > 0 ? paginationDto.page : 1;
    const limit = paginationDto.limit ?? 10;
    const skip = (page - 1) * limit;

    const [movies, total] = await this.movieRepository.findAndCount({
      skip: skip,
      take: limit,
    });

    return { movies, total };
  }

  addOne(details: CreateMovieParams) {
    const data = this.movieRepository.create({
      ...details,
      createdAt: new Date(),
    });

    return this.movieRepository.save(data);
  }

  async findOne(id: number) {
    const result = await this.movieRepository.findOne({ where: { id } });

    if (!result) {
      throw new AppError(ErrorCode['0002'], 'Invalid Request');
    }
    return result;
  }

  async updateById(id: number, updateMovie: UpdateMovieDto) {
    const result = await this.movieRepository.update(id, updateMovie);

    if (!result) {
      throw new AppError(ErrorCode['0002'], 'Invalid Request');
    }
    return result;
  }

  async delete(id: number) {
    const data = await this.movieRepository.findOne({ where: { id } });
    return this.movieRepository.remove(data);
  }
}
