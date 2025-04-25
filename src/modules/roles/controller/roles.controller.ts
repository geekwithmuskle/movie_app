import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { RolesService } from '../service';
import { CreateRoleDto } from '../dtos';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ResponseFormat } from 'src/shared';

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

  @ApiOperation({ summary: 'get roles' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @Get(':id')
  async roleID(@Res() res, @Param('name') id: number) {
    const response = this.rolesService.getRoleId(id);

    if (!response) {
      return ResponseFormat.failureResponse(
        res,
        null,
        'Failed to retrieve role id',
      );
    }

    return ResponseFormat.successResponse(res, response, 'Role ID retrieved');
  }

  @ApiOperation({ summary: 'delete role' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @Delete(':name')
  async deleteRole(@Res() res, @Param('name') rolename: string) {
    const response = this.rolesService.deleteRole(rolename);

    if (!response) {
      return ResponseFormat.failureResponse(res, null, 'Failed to delete role');
    }

    return ResponseFormat.successResponse(res, response, 'Succesful');
  }
}
