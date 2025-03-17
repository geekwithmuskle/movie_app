import { Resource } from 'src/modules/rbac';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'user email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'user role' })
  @IsEnum(Resource, { message: 'role must be a valid user role value' })
  roles: Resource;
}
