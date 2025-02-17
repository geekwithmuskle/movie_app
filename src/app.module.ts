import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MoviesModule } from './modules/movies';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './shared';
import { DatabaseModule, UsersEntity } from './modules/db-module';
import { SanitizeMiddleware } from './Sanitize.middleware';
import { UserModule } from './modules/user';
import { UserController } from './modules/user/controller';
import { AuthController, AuthModule } from './modules/auth';

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
    AuthModule,
  ],
  controllers: [UserController, AuthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    UsersEntity,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SanitizeMiddleware).forRoutes('*'); // Apply to all routes
  }
}
