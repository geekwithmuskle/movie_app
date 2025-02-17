import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class QueryParamDto {
  @ApiProperty({ description: 'Id of user', example: '1' })
  @IsNumber()
  id: number;

  //   @ApiProperty({
  //     description: 'Email of user',
  //     example: 'ademolade@gmail.com',
  //   })
  //   @IsString()
  //   @IsEmail()
  //   @IsOptional()
  //   username?: string;
}
