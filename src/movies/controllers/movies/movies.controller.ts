import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { UpdateMovieDto } from 'src/movies/dtos/UpdateMovie.dto';
import { MoviesService } from 'src/movies/services/movies/movies.service';
import { UpdateMovieParams } from 'src/movies/utils/types';

@ApiTags('Movie CRUD')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Get all movies in the table' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Get()
  async getAll() {
    return await this.moviesService.findAll();
  }

  @ApiOperation({ summary: 'Create movie in the table' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiBadRequestResponse({ description: 'Request failed' })
  @ApiBody({ type: CreateMovieDto })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.addOne(createMovieDto);
  }

  @ApiOperation({ summary: 'Get a movie by id' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update movies by id' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiBody({ type: UpdateMovieDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatemovie: UpdateMovieParams,
  ) {
    return this.moviesService.updateById(+id, { ...updatemovie });
  }

  @ApiOperation({ summary: 'Remove movie' })
  @ApiOkResponse({ description: 'Successful' })
  @Delete()
  async remove(@Param('id') id: string) {
    return this.moviesService.delete(+id);
  }
}
