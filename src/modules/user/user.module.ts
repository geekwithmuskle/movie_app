import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
