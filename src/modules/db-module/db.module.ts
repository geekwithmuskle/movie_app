import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './entities/movies';
import configuration from 'src/libs/configuration';
//import { PermissionEntity, RoleEntity, UserEntity } from './new-entity';
import { RefreshTokens, ResetTokens, User } from './entities';
const config = configuration();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.mysql.type,
      host: config.mysql.host,
      port: config.mysql.port,
      username: config.mysql.username,
      password: config.mysql.password,
      database: config.mysql.database,
      synchronize: config.mysql.synchronize,
      entities: [Movies, User, RefreshTokens, ResetTokens],
    }),
  ],
})
export class DatabaseModule {}
