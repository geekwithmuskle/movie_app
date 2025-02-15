import { Module } from '@nestjs/common';
import { ControllerController } from './controller/auth.controller';
import { ServiceController } from './service/auth.service';

@Module({
  controllers: [ControllerController, ServiceController],
})
export class AuthModule {}
