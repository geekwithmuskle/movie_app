import { Module } from '@nestjs/common';
import { UserController } from './controller';
import { UserService } from './service';
import { UsersEntity } from '../db-module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
