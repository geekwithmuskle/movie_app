import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { MoviesService } from 'src/movies/services/movies/movies.service';
import { UpdateMovieParams } from 'src/movies/utils/types';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}
  @Get()
  async getAll() {
    return await this.moviesService.findAll();
  }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.addOne(createMovieDto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatemovie: UpdateMovieParams,
  ) {
    return this.moviesService.updateById(+id, { ...updatemovie });
  }

  @Delete()
  async remove(@Param('id') id: string) {
    return this.moviesService.delete(+id);
  }
}
