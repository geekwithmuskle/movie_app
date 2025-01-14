import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  Length,
  Min,
  Max,
  IsDate,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'The name of the movie',
    maxLength: 255,
    example: 'Inception',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty({
    description: 'The year the movie was released',
    minimum: 1888,
    maximum: new Date().getFullYear(),
    example: 2010,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1888) // The year the first movie was made
  @Max(new Date().getFullYear()) // Restrict to the current year
  year: number;

  @ApiProperty({
    description: 'The producer of the movie',
    maxLength: 255,
    example: 'Christopher Nolan',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  producer: string;

  @ApiPropertyOptional({
    description: 'The date the movie record was created',
    type: String,
    format: 'date-time',
    example: '2023-01-14T00:00:00Z',
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
