import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'user name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'user email' })
  @IsEmail()
  email: string;
}
