import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Action, Resource } from '../enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class Permission {
  @ApiProperty({
    enum: Resource,
    description: 'The resource being accessed',
    // example: Resource.user,
  })
  @IsEnum(Resource)
  resource: Resource;

  @ApiProperty({
    enum: Action,
    isArray: true,
    description: 'Unique list of allowed actions for the resource',
    // example: [Action.read, Action.update],
  })
  @IsArray()
  @IsEnum(Action, { each: true })
  @ArrayUnique()
  action: Action[];
}

export class CreateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    // example: 'admin',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: `role's permissions`,
  })
  @ValidateNested()
  @Type(() => Permission)
  permission: Permission[];
}
