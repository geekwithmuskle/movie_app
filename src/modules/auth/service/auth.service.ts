import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/auth.dto';
import { UserService } from 'src/modules/user';
import AppError from 'src/shared/utils/AppError';
import { ErrorCode } from 'src/shared';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/libs/configuration';
import { RefreshTokens, ResetTokens } from 'src/modules/db-module';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import * as bycrypt from 'bcrypt';
import { hash } from 'bcrypt';
import { nanoid } from 'nanoid';

const config = configuration();
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshTokens)
    private refreshTokenRepo: Repository<RefreshTokens>,
    @InjectRepository(ResetTokens)
    private resetTokenRepo: Repository<ResetTokens>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(credentials: LoginDto) {
    // Find if user exist by email
    const { email, password } = credentials;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new AppError(ErrorCode['0005'], 'Invalid email or password!!!');
    }
    // Compare inputted password with existing password in the db
    const passwordMatch = await bycrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(ErrorCode['0005'], 'Passwords do not match!!!');
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
        expiresIn: '10h',
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

  async changePassword(
    userId: number,
    oldpassword: string,
    newpassword: string,
  ) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new AppError(ErrorCode['0002'], 'User not found.');
    }

    const passwordMatch = await bycrypt.compare(oldpassword, user.password);

    if (!passwordMatch) {
      throw new AppError(ErrorCode['0002'], 'Password do not match');
    }

    // change user's password and hash it
    const hashedpassword = await hash(newpassword, 10);
    user.password = hashedpassword;

    return await this.userService.save(user);
  }

  async forgotPassword(email: string) {
    //Check that user exist
    const user = await this.userService.findByEmail(email);

    //If user exists, generate password reset link
    if (user) {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const resetToken = nanoid(64);
      await this.resetTokenRepo.create({
        token: resetToken,
        userId: user.id,
        expiryDate,
      });
    }
  }
}
