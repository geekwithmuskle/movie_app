import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
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
import { MovieDto } from 'src/movies/dtos/Movies.dto';
import { PaginationDto } from 'src/movies/dtos/pagination.dto';
import { UpdateMovieDto } from 'src/movies/dtos/UpdateMovie.dto';
import { MoviesService } from 'src/movies/services/movies/movies.service';
import { ResponseFormat } from 'src/movies/utils/ResponseFormat';
import { UpdateMovieParams } from 'src/movies/utils/types';

@ApiTags('Movie CRUD')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Get all movies in the table' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Get()
  async getAll(
    @Req() req,
    @Res() res,
    @Query() paginationDto: PaginationDto,
    // @Query() moviefilter: MovieDto,
  ) {
    const response = await this.moviesService.findAll(
      paginationDto,
      // moviefilter
    );

    if (!response) {
      return ResponseFormat.failureResponse(res, response, 'Failed');
    }
    return ResponseFormat.successResponse(res, response, 'Successful');
  }

  @ApiOperation({ summary: 'Get all movies through filter' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Get('search')
  async getMany(@Req() req, @Res() res, @Query() query: MovieDto) {
    const response = await this.moviesService.findMany(query);

    if (!response) {
      return ResponseFormat.failureResponse(res, response, 'Failed');
    }
    return ResponseFormat.successResponse(res, response, 'Successful');
  }

  @ApiOperation({ summary: 'Create movie in the table' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiBadRequestResponse({ description: 'Request failed' })
  @ApiBody({ type: CreateMovieDto })
  @Post()
  async create(
    @Req() req,
    @Res() res,
    @Param('name') name: string,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    const response1 = this.moviesService.findByName(name);
    const response2 = this.moviesService.addOne(createMovieDto);

    if (response1) {
      return ResponseFormat.successResponse(res, response1, 'Successful');
    } else {
      return ResponseFormat.successResponse(res, response2, 'Successful');
    }
  }

  @ApiOperation({ summary: 'Get a movie by id' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Get(':id')
  async get(
    @Req() req,
    @Res() res,
    @Param('id')
    id: string,
  ) {
    return await this.moviesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Get a movie by name' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Get('name')
  async getname(
    @Req() req,
    @Res() res,
    @Param('name')
    name: string,
  ) {
    return await this.moviesService.findByName(name);
  }

  @ApiOperation({ summary: 'Update movies by id' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiBody({ type: UpdateMovieDto })
  @Patch(':id')
  async update(
    @Req() req,
    @Res() res,
    @Param('id')
    id: string,
    @Body() updatemovie: UpdateMovieParams,
  ) {
    return await this.moviesService.updateById(+id, { ...updatemovie });
  }

  @ApiOperation({ summary: 'Remove movie' })
  @ApiOkResponse({ description: 'Successful' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.moviesService.delete(+id);
  }
}
