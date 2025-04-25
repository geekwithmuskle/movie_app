import { Module } from '@nestjs/common';
import { RolesController } from './controller';
import { RolesService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '../db-module/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
