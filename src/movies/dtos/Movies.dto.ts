import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsDate,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class MovieDto {
  @ApiProperty({
    description: 'The name of the movie',
    maxLength: 255,
    example: 'Inception',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @ApiProperty({
    description: 'The year the movie was released',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  year?: number;

  @ApiProperty({
    description: 'The producer of the movie',
    maxLength: 255,
    example: 'Christopher Nolan',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  producer?: string;

  @ApiProperty({
    description: 'The search string',
    maxLength: 255,
    example: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  search?: string;

  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;
}
