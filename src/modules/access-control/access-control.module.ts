import { Module } from '@nestjs/common';
import { AccessControlService } from './service/access-control.service';
import { AccessControlController } from './controller/access-control.controller';

@Module({
  controllers: [AccessControlController],
  providers: [AccessControlService],
})
export class AccessControlModule {}
