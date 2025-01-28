import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './entities/movies';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'oniact@#24',
      database: 'barnyard',
      entities: [Movies],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
