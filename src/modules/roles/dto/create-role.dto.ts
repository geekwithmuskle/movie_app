import { Type } from 'class-transformer';
import { ArrayUnique, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Action, Resource } from 'src/shared/utils/enums';

export class CreateRoleDto {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => Permission)
  permission: Permission[];
}

export class Permission {
  resource: Resource;

  @IsEnum(Action, { each: true })
  @ArrayUnique()
  actions: Action[];
}
