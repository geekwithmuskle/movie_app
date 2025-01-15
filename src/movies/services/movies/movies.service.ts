import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/movies/dtos/pagination.dto';
import { UpdateMovieDto } from 'src/movies/dtos/UpdateMovie.dto';
import { CreateMovieParams } from 'src/movies/utils/types';
import { Movies } from 'src/typeorm/entities/movies';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies) private movieRepository: Repository<Movies>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<Movies[]> {
    const page = paginationDto.page > 0 ? paginationDto.page : 1;
    const limit = paginationDto.limit ?? 10;
    const skip = (page - 1) * limit;

    const movies = this.movieRepository.find({
      skip: skip,
      take: limit,
    });

    return movies;
  }

  addOne(details: CreateMovieParams) {
    const data = this.movieRepository.create({
      ...details,
      createdAt: new Date(),
    });

    return this.movieRepository.save(data);
  }

  async findOne(id: number) {
    return await this.movieRepository.findOne({ where: { id } });
  }

  async updateById(id: number, updateMovie: UpdateMovieDto) {
    return await this.movieRepository.update(id, updateMovie);
  }

  async delete(id: number) {
    const data = await this.movieRepository.findOne({ where: { id } });
    return this.movieRepository.remove(data);
  }
}
