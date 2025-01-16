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
  async getAll(@Req() req, @Res() res, @Query() paginationDto: PaginationDto) {
    const response = await this.moviesService.findAll(paginationDto);

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
  create(@Req() req, @Res() res, @Body() createMovieDto: CreateMovieDto) {
    const response = this.moviesService.addOne(createMovieDto);

    if (!response) {
      return ResponseFormat.failureResponse(res, response, 'Failed');
    }
    return ResponseFormat.successResponse(res, response, 'Successful');
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
