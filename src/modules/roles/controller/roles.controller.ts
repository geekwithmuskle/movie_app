import { Body, Controller, Post, Res } from '@nestjs/common';
import { RolesService } from '../service';
import { CreateRoleDto } from '../dtos';
import { ResponseFormat } from 'src/shared';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'create roles' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @Post()
  async createRole(@Res() res, @Body() role: CreateRoleDto) {
    const response = this.rolesService.createRole(role);

    if (!response) {
      return ResponseFormat.failureResponse(res, null, 'Failed to create role');
    }

    return ResponseFormat.successResponse(res, response, 'Role Created');
  }
}
