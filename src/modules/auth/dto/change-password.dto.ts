import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ description: 'Old Password', example: 'Supra12345' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: 'New Password', example: 'Opera12345' })
  @IsString()
  newPassword: string;
}
