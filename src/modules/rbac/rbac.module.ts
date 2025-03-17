import { Module } from '@nestjs/common';
import { RbacController } from './controller/rbac.controller';
import { RbacService } from './service';
import { UserService } from '../user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../db-module';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RbacController],
  providers: [UserService, RbacService],
})
export class RbacModule {}
