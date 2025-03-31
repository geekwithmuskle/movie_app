import { ArrayUnique, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Action, Resource } from '../enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Permission {
  @ApiProperty({
    enum: Resource,
    description: 'The resource being accessed',
    example: Resource.user,
  })
  @IsEnum(Resource)
  resource: Resource;

  @ApiProperty({
    enum: Action,
    isArray: true,
    description: 'Unique list of allowed actions for the resource',
    example: [Action.read, Action.update],
  })
  @IsEnum(Action)
  @ArrayUnique()
  action: Action[];
}

export class CreateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    example: 'admin',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'List of permissions associated with the role',
    type: [Permission], // Explicit array type for Swagger
  })
  @ValidateNested()
  @Type(() => Permission)
  permission: Permission[];
}
