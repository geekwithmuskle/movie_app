import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from 'src/modules/user';
import { CreateUserDto } from 'src/modules/user/dto';
import { LoginDto } from '../dto/auth.dto';
import { AuthService } from '../service';
import { ErrorCode, ResponseFormat } from 'src/shared';
import { ChangePasswordDto, RefreshDto } from '../dto';
import { JwtGuard } from '../guards';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('register')
  async register(@Res() res, @Req() req, @Body() dto: CreateUserDto) {
    const response = await this.userService.signup(dto);
    if (!response) {
      throw new ResponseFormat.failureResponse(
        res,
        null,
        'Failed to register user',
      );
    }

    return ResponseFormat.successResponse(
      res,
      response,
      'User registered successfully',
    );
  }

  @ApiOperation({ summary: 'signin an existing user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in',
    type: LoginDto,
  })
  @Post('login')
  async login(@Res() res, @Req() req, @Body() credentials: LoginDto) {
    const response = await this.authService.login(credentials);

    if (!response) {
      throw new ResponseFormat.failureResponse(res, null, 'Failed to login');
    }
    return ResponseFormat.successResponse(res, response, 'Login Successful!!!');
  }

  @Post('refresh')
  async refreshToken(@Res() res, @Req() req, @Body() data: RefreshDto) {
    const response = await this.authService.refreshToken(data.token);

    if (!response) {
      throw new ResponseFormat.failureResponse(
        res,
        null,
        'Failed get refresh token.',
      );
    }

    console.log(response);
    return ResponseFormat.successResponse(res, response, 'Valid Refresh Token');
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Put('change-password')
  async changePassword(@Req() req, @Res() res, @Body() dto: ChangePasswordDto) {
    const response = this.authService.changePassword(
      req.user.userId,
      dto.oldPassword,
      dto.newPassword,
    );

    if (!response) {
      return ResponseFormat.failureResponse(
        res,
        null,
        'Failed to change password!!!',
      );
    }
    return ResponseFormat.successResponse(
      res,
      response,
      'Password changed succesfully.',
    );
  }

  // @Post('forgot-password')
  // async forgotPassword(@req() req, @res() res(), @Body() forgotPasswordDto: ForgotPasswordDto){
  //   return this.authService.forgotPassword(forgotPasswordDto.email);
  // }
}
