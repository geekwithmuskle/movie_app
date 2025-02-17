import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'registered email', example: 'dudu@gmail.com' })
  @IsEmail()
  @IsString()
  @Matches(/\S/, {
    message: 'Email cannot be empty or contain only whitespace',
  })
  username: string;

  @ApiProperty({ description: 'user password', example: 'Supra12345' })
  @IsString()
  @Matches(/\S/, {
    message: 'Email cannot be empty or contain only whitespace',
  })
  password: string;
}
