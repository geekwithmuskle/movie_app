import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseFormat } from 'src/shared';
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard';
import { Permissions } from 'src/modules/access-control/decorators/permission.decorator';
import { Action, Resource } from 'src/modules/db-module';
import { AuthorizationGuard } from 'src/modules/access-control/guard/authorization.guard';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@Controller('user')
@UseGuards(JwtGuard, AuthorizationGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Permissions([
    {
      resource: Resource.users,
      actions: Action.read,
    },
  ])
  @Get('users')
  async users(@Req() req, @Res() res) {
    const response = await this.userService.listUser();

    if (!response) {
      return ResponseFormat.failureResponse(res, response, 'Failed');
    }

    return ResponseFormat.successResponse(res, response, 'Successful');
  }

  // @Get('id')
  // async userProfile(@Req() req, @Res() res, @Param() id: QueryParamDto) {
  //   const response = await this.userService.findById(id);

  //   if (!response) {
  //     return ResponseFormat.failureResponse(res, response, 'Failed');
  //   }

  //   return ResponseFormat.successResponse(res, response, 'Successful');
  // }

  // @Get('mail')
  // async user(@Req() req, @Res() res, @Query() query: LoginDto) {
  //   const response = await this.userService.findByEmail(query);

  //   if (!response) {
  //     return ResponseFormat.failureResponse(res, response, 'Failed');
  //   }

  //   return ResponseFormat.successResponse(res, response, 'Successful');
  // }
}
