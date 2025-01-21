import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './typeorm/entities/movies';
import { MoviesModule } from './movies/movies.module';
import { ThrottlerModule } from '@nestjs/throttler';

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
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // Note: ttl is now in milliseconds
          limit: 10,
        },
      ],
    }),
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
