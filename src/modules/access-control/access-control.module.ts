import { Module } from '@nestjs/common';
import { AccessControlService } from './service/access-control.service';
import { AccessControlController } from './controller/access-control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../db-module';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [AccessControlController],
  providers: [AccessControlService],
})
export class AccessControlModule {}
