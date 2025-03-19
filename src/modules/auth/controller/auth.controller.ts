import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/user';
import { CreateUserDto } from 'src/modules/user/dto';
import { LoginDto } from '../dto/auth.dto';
import { AuthService } from '../service';
import { ResponseFormat } from 'src/shared';
import { RefreshDto } from '../dto';
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
}
