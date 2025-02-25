import { Module } from '@nestjs/common';
import { RolesService } from './service/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../db-module/entities/authorization';
import { RolesController } from './controller/roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
