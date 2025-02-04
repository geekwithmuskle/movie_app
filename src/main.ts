import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureSwagger } from './libs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'POST, GET, OPTIONS, DELETE, PATCH',
    credentials: true,
    allowedHeaders:
      'Content-Type, Authorization, X-Requested-With, token, X-Forwarded-For, x-hmac-signature, X-Hmac-Signature',
  });

  app.use(helmet());
  app.use(compression());

  configureSwagger(app);

  await app.listen(process.env.PORT ?? 3000, () => {
    console.warn(`
    -----------------------------------------------------------
    Movie Application Started!
    API Docs: http://localhost:${process.env.PORT ?? 3000}/documentation
    -----------------------------------------------------------
  `);
  });
}
bootstrap();
