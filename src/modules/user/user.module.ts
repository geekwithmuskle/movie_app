import { Module } from '@nestjs/common';
import { UserController } from './controller';
import { UserService } from './service';
import { RefreshTokens, User } from '../db-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // TypeOrmModule.forFeature([RefreshTokens]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserService],
})
export class UserModule {}
