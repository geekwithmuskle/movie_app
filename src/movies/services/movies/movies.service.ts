import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/movies/dtos/pagination.dto';
import { UpdateMovieDto } from 'src/movies/dtos/UpdateMovie.dto';
import AppError from 'src/movies/utils/AppError';
import { CreateMovieParams, MovieParams } from 'src/movies/utils/types';
import { ErrorCode } from 'src/shared/error-code.enum';
import { Movies } from 'src/typeorm/entities/movies';
import { Brackets, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies) private movieRepository: Repository<Movies>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<{
    movies: Movies[];
    total: number;
    conditions: FindOptionsWhere<Movies>;
  }> {
    const page = paginationDto.page > 0 ? paginationDto.page : 1;
    const limit = paginationDto.limit ?? 10;
    const skip = (page - 1) * limit;

    const { name, year, producer, search } = paginationDto;

    const querybuilder = this.movieRepository.createQueryBuilder('movies');

    const conditions: FindOptionsWhere<Movies> | FindOptionsWhere<Movies>[] = {
      ...(name ? { name } : {}),
      ...(year && !isNaN(Number(year)) ? { year: Number(year) } : {}),
      ...(producer ? { producer } : {}),
    };

    // Apply filtering conditions
    if (Object.keys(conditions).length > 0) {
      querybuilder.where(conditions);
    }

    if (search) {
      querybuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(movies.name LIKE LOWER(:search))', {
            search: `%${search}%`,
          })
            .orWhere('LOWER(movies.year LIKE LOWER(:search))', {
              search: `%${search}%`,
            })
            .orWhere('LOWER(movies.producer LIKE LOWER(:search))', {
              search: `%${search}%`,
            });
        }),
      );
    }

    querybuilder.skip(skip).take(limit);

    // Execute the query and retrieve results
    const [movies, total] = await querybuilder.getManyAndCount();

    if (search && (!movies || movies.length === 0)) {
      throw new AppError(
        ErrorCode['0002'],
        'No movies found matching the search criteria',
      );
    }

    if (movies && total) {
      return { movies, total, conditions };
    } else {
      throw new AppError(ErrorCode['0002'], 'Request Failed');
    }
  }

  async findMany(filters: MovieParams): Promise<Movies[]> {
    const { name, year, producer } = filters;
    const conditions: FindOptionsWhere<Movies> | FindOptionsWhere<Movies>[] = {
      ...(name ? { name } : {}),
      ...(year && !isNaN(Number(year)) ? { year: Number(year) } : {}),
      ...(producer ? { producer } : {}),
    };
    const result = this.movieRepository.find({ where: conditions });
    return result;
  }

  async addOne(details: CreateMovieParams) {
    const data = this.movieRepository.create({
      ...details,
      createdAt: new Date(),
    });
    const { name } = data;
    const exist = await this.movieRepository.findOne({ where: { name } });
    if (exist) {
      throw new AppError(ErrorCode['0002'], 'Movie already exist');
    }

    return this.movieRepository.save(data);
  }

  async findByName(name: string): Promise<Movies | null> {
    const response = await this.movieRepository.findOne({ where: { name } });

    if (!response) {
      throw new AppError(ErrorCode['0002'], 'Movie not found');
    }

    return response;
  }

  async findOne(id: number) {
    const result = await this.movieRepository.findOne({ where: { id } });

    if (!result) {
      throw new AppError(ErrorCode['0002'], 'Movie not found');
    }
    return result;
  }

  async updateById(id: number, updateMovie: UpdateMovieDto) {
    const result = await this.movieRepository.update(id, updateMovie);

    if (!result) {
      throw new AppError(ErrorCode['0002'], 'Movie not updated');
    }
    return result;
  }

  async delete(id: number) {
    const data = await this.movieRepository.findOne({ where: { id } });
    return this.movieRepository.remove(data);
  }
}
