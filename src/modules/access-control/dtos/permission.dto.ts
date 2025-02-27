import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Action, Resource } from 'src/modules/db-module';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'read_users',
    description: 'The name of the permission',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Allows reading user data',
    description: 'The description of the permission',
    required: false,
  })
  @IsOptional()
  @IsString()
  desc?: string;

  @ApiProperty({
    enum: Resource,
    example: Resource.users,
    description: 'The resource associated with the permission',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Resource)
  resource: Resource;

  @ApiProperty({
    enum: Action,
    example: Action.read,
    description: 'The action associated with the permission',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Action)
  actions: Action;
}

export class UpdatePermissionDto {
  @ApiProperty({
    example: 'read_users',
    description: 'The name of the permission',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Allows reading user data',
    description: 'The description of the permission',
    required: false,
  })
  @IsOptional()
  @IsString()
  desc?: string;

  @ApiProperty({
    enum: Resource,
    example: Resource.users,
    description: 'The resource associated with the permission',
    required: false,
  })
  @IsOptional()
  @IsEnum(Resource)
  resource?: Resource;

  @ApiProperty({
    enum: Action,
    example: Action.read,
    description: 'The action associated with the permission',
    required: false,
  })
  @IsOptional()
  @IsEnum(Action)
  actions?: Action;
}
