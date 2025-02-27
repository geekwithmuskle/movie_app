import { Body, Controller, Post, Res } from '@nestjs/common';
import { AccessControlService } from '../service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { ResponseFormat } from 'src/shared';

@Controller('access-control')
export class AccessControlController {
  constructor(private readonly accessControlService: AccessControlService) {}

  @Post()
  async create(@Res() res, @Body() roleDto: CreateRoleDto) {
    const response = this.accessControlService.createRole(roleDto);

    if (!response) {
      ResponseFormat.failureResponse(res, null, 'Failed to create Role');
    }

    return ResponseFormat.successResponse(
      res,
      response,
      'Role Created Successfully!!!',
    );
  }
}
