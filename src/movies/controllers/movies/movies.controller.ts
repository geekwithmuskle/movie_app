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

@ApiTags('Movie CRUD')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Get all movies in the table' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Get()
  async getAll(@Req() req, @Res() res, @Query() paginationDto: PaginationDto) {
    try {
      const response = await this.moviesService.findAll(paginationDto);
      return ResponseFormat.successResponse(res, response, 'Successful');
    } catch (error) {
      console.log(error);
      return ResponseFormat.failureResponse(
        res,
        null,
        error.message || 'Failed to fetch movies',
        error.code,
      );
    }
  }

  @ApiOperation({ summary: 'Create movie in the table' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiBadRequestResponse({ description: 'Request failed' })
  @ApiBody({ type: CreateMovieDto })
  @Post()
  async create(@Req() req, @Res() res, @Body() createMovieDto: CreateMovieDto) {
    const existingMovie = await this.moviesService.findByName(
      createMovieDto.name,
    );

    if (existingMovie) {
      return ResponseFormat.failureResponse(
        res,
        null,
        'Movie with this name already exists',
      );
    }
    const response2 = await this.moviesService.addOne(createMovieDto);

    if (response2) {
      return ResponseFormat.successResponse(
        res,
        response2,
        'Movie added successfully',
      );
    } else {
      return ResponseFormat.failureResponse(res, null, 'Failed to add movie');
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
    const response = await this.moviesService.findOne(+id);

    if (!response) {
      return ResponseFormat.failureResponse(res, null, 'Request Failed', 400);
    }

    return ResponseFormat.successResponse(res, response, 'Successful', 200);
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
    @Body() updatemovie: UpdateMovieDto,
  ) {
    try {
      const response = this.moviesService.updateById(parseInt(id), updatemovie);

      return ResponseFormat.successResponse(res, response, 'Successful');
    } catch (error) {
      return ResponseFormat.failureResponse(res, error, 'Failed to update');
    }
  }

  @ApiOperation({ summary: 'Remove movie' })
  @ApiOkResponse({ description: 'Successful' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.moviesService.delete(+id);
  }
}
