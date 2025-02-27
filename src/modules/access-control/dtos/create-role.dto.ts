import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Action, Resource } from 'src/modules/db-module';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'The name of the role',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    //type: [Permission],
    description: 'List of permissions associated with the role',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Permission)
  permissions: Permission[];
}

export class Permission {
  @ApiProperty({
    enum: Resource,
    example: Resource.users,
    description: 'The resource associated with the permission',
  })
  @IsNotEmpty({ message: 'Resource is required' })
  @IsEnum(Resource, { message: 'Resource must be a valid enum value' })
  resource: Resource;

  @ApiProperty({
    enum: Action,
    example: Action.read,
    description: 'The action associated with the permission',
  })
  @IsNotEmpty({ message: 'Action is required' })
  @IsEnum(Action, { message: 'Action must be a valid enum value' })
  actions: Action;
}

// export class UpdateRoleDto {
//   @ApiProperty({
//     example: 'admin',
//     description: 'The name of the role',
//     required: false,
//   })
//   @IsOptional()
//   @IsString()
//   name?: string;

//   @ApiProperty({
//     //type: [Permission],
//     description: 'List of permissions associated with the role',
//   })
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => Permission)
//   permissions: Permission[];
// }
