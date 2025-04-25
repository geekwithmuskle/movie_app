import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  Res,
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
import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Successful' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Get('users')
  async users(@Req() req, @Res() res) {
    const response = await this.userService.listUser();

    if (!response) {
      return ResponseFormat.failureResponse(
        res,
        response,
        'Failed to get records',
      );
    }

    return ResponseFormat.successResponse(res, response, 'Successful');
  }

  @Get('current-user')
  async user(@Req() req, @Res() res) {
    const { id } = req.user.userId;
    const response = await this.userService.findById(id);

    if (!response) {
      return ResponseFormat.failureResponse(
        res,
        null,
        'Current user not found',
      );
    }

    return ResponseFormat.successResponse(
      res,
      response,
      'Current user retrieved.',
    );
  }

  @Patch('update-profile')
  async updateProfile(
    @Req() req,
    @Res() res,
    @Body()
    dto: UpdateUserDto,
  ) {
    //console.log(req);
    const response = await this.userService.Update(dto);
    console.log(req);
    if (!response) {
      return ResponseFormat.failureResponse(
        res,
        null,
        'Failed to update user profile',
      );
    }
    return ResponseFormat.successResponse(
      res,
      response,
      'Succesfully updated profile',
    );
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
