import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({
    description: 'Page Number',
    example: 1,
    required: true,
    title: 'page',
    default: 1,
  })
  readonly page: number;

  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'Limit',
    type: Number,
    example: 20,
    default: 20,
  })
  readonly limit: number;

  @ApiProperty({
    description: 'The name of the movie',
    maxLength: 255,
    //example: 'Inception',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  readonly name?: string;

  @ApiProperty({
    description: 'The year the movie was released',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly year?: number;

  @ApiProperty({
    description: 'The producer of the movie',
    maxLength: 255,
    //example: 'Christopher Nolan',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  readonly producer?: string;

  @ApiProperty({
    description: 'The search string',
    maxLength: 255,
    //example: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  readonly search?: string;

  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;
}
