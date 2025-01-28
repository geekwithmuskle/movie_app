import { Module } from '@nestjs/common';
import { MoviesModule } from './modules/movies/movies.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './modules/movies/utils/GlobalExceptionFilter';
import { DatabaseModule } from './modules/db-module/db.module';

@Module({
  imports: [
    DatabaseModule,
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
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
