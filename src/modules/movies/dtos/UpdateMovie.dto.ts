import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateMovieDto {
  @ApiProperty({
    description: 'The name of the movie',
    maxLength: 255,
    example: 'Inception',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @ApiProperty({
    description: 'The year the movie was released',
    minimum: 1888,
    maximum: new Date().getFullYear(),
    example: 2010,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  @Min(1888) // The year the first movie was made
  @Max(new Date().getFullYear()) // Restrict to the current year
  year?: number;

  @ApiProperty({
    description: 'The producer of the movie',
    maxLength: 255,
    example: 'Christopher Nolan',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  producer?: string;

  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;
}
