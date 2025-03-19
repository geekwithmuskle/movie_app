import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/auth.dto';
import { UserService } from 'src/modules/user';
import { compare } from 'bcrypt';
import AppError from 'src/shared/utils/AppError';
import { ErrorCode } from 'src/shared';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/libs/configuration';
import { RefreshTokens } from 'src/modules/db-module';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bycrypt from 'bcrypt';

const config = configuration();
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshTokens)
    private refreshTokenRepo: Repository<RefreshTokens>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // async login(dto: LoginDto) {
  //   const user = await this.validateUser(dto);
  //   const payload = {
  //     email: user.email,
  //     sub: {
  //       name: user.name,
  //       id: user.id,
  //       roles: user.roles,
  //     },
  //   };

  //   const user_id = user.id;

  //   const refreshToken = await this.jwtService.signAsync(payload, {
  //     secret: config.jwt.refreshToken,
  //   });

  //   await this.storeRefreshToken(refreshToken, user_id);
  //   return {
  //     user,
  //     backendToken: {
  //       accessToken: await this.jwtService.signAsync(payload, {
  //         expiresIn: '1h',
  //         secret: config.jwt.secretKey,
  //       }),
  //     },
  //     refreshToken: {
  //       accessToken: refreshToken,
  //     },
  //   };
  // }

  // async generateRefreshToken(token_key: string, userId: number) {
  //   const token = await this.refreshRepo.findOne({
  //     where: { token: token_key, expiryDate: { $gte: new Date() } },
  //   });

  //   if (!token) {
  //     throw new AppError(ErrorCode['0005'], 'Invalid Token');
  //   }

  //   return this.storeRefreshToken(token_key, userId);
  // }

  // async storeRefreshToken(
  //   token: string,
  //   userId: number,
  // ): Promise<RefreshTokens> {
  //   const expiryDate = new Date();
  //   expiryDate.setDate(expiryDate.getDate() + 2);

  //   const response = await this.refreshRepo.create({
  //     token,
  //     userId,
  //     expiryDate,
  //   });

  //   const savedToken = await this.refreshRepo.save(response);
  //   return savedToken;
  // }

  // async validateUser(data: LoginDto) {
  //   const user = await this.userService.findByEmail(data);

  //   if (user && (await compare(data.password, user.password))) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   throw new AppError(ErrorCode['0005'], 'Invalid Credentials');
  // }

  // async generateAccessToken(userId) {
  //   const accessToken = this.jwtService.signAsync(
  //     { userId },
  //     { expiresIn: '1hr' },
  //   );

  //   const refreshToken = uuidv4();

  //   return { accessToken, refreshToken };
  // }

  async login(credentials: LoginDto) {
    // Find if user exist by email
    const { email, password } = credentials;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new AppError(ErrorCode['0005'], 'Invalid Credentials');
    }
    // Compare inputted password with existing password in the db
    const passwordMatch = await bycrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(ErrorCode['0005'], 'Invalid Credentials');
    }

    const { id } = user;
    // Generate JWT token
    const access_token = await this.generateUserToken(id);

    return { user, access_token };
  }

  async generateUserToken(userId: number) {
    const accessToken = await this.jwtService.signAsync(
      { userId },
      {
        expiresIn: '1h',
        secret: config.jwt.secretKey,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      { userId },
      { secret: config.jwt.refreshToken },
    );

    await this.storeRefreshToken(refreshToken, userId);
    return { accessToken, refreshToken };
  }

  async refreshToken(toks: string) {
    const token = await this.refreshTokenRepo.findOne({
      where: {
        token: toks,
        expiryDate: MoreThanOrEqual(new Date()), // Check if token is not expired
      },
    });

    if (!token) {
      throw new AppError(ErrorCode['0005'], 'Invalid token.');
    }

    return this.generateUserToken(token.userId);
  }

  async storeRefreshToken(token: string, userId: number) {
    //Calculate expiry date i.e 2days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 2);

    // Check if a token already exists for this user
    const existingToken = await this.refreshTokenRepo.findOne({
      where: { userId },
    });

    if (existingToken) {
      // Update existing token and expiry date
      existingToken.token = token;
      existingToken.expiryDate = expiryDate;
      return await this.refreshTokenRepo.save(existingToken);
    } else {
      // Create new token entry if none exists
      const newToken = this.refreshTokenRepo.create({
        token,
        userId,
        expiryDate,
      });
      return await this.refreshTokenRepo.save(newToken);
    }
  }
}
