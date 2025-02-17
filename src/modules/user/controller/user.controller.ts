import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserService } from '../service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseFormat } from 'src/shared';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Get('users')
  async users(@Req() req, @Res() res) {
    const response = await this.userService.listUser();

    if (!response) {
      return ResponseFormat.failureResponse(res, response, 'Failed');
    }

    return ResponseFormat.successResponse(res, response, 'Successful');
  }
}
