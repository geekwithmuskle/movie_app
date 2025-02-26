import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/user';
import { CreateUserDto } from 'src/modules/user/dto';
import { LoginDto } from '../dto/auth.dto';
import { AuthService } from '../service';
import { ResponseFormat } from 'src/shared';
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
  async registerUser(@Res() res, @Req() req, @Body() dto: CreateUserDto) {
    const response = await this.userService.create(dto);
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

  @Post('login')
  async login(@Res() res, @Req() req, @Body() dto: LoginDto) {
    const response = await this.authService.login(dto);

    if (!response) {
      throw new ResponseFormat.failureResponse(res, null, 'Failed to login');
    }
    return ResponseFormat.successResponse(res, response, 'Login Successful!!!');
  }

  @Post('refresh')
  async refreshToken(@Res() res, @Req() req) {
    return await this.authService.refreshToken(req.user);
  }
}
