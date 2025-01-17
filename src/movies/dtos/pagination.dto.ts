import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, Min } from 'class-validator';

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
}
