import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class QueryParamDto {
  @ApiProperty({ description: 'Id of user', example: '1' })
  @IsNumber()
  id: number;
}
