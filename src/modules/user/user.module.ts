import { Module } from '@nestjs/common';
import { UserController } from './controller';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
