import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MoviesModule } from './modules/movies/movies.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './shared/utils/GlobalExceptionFilter';
import { DatabaseModule } from './modules/db-module/db.module';
import { SanitizeMiddleware } from './Sanitize.middleware';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/controller/user/user.controller';

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
    UserModule,
  ],
  controllers: [UserController],
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SanitizeMiddleware).forRoutes('*'); // Apply to all routes
  }
}
