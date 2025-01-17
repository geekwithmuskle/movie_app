import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const configureSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('Movies CRUD')
    .setDescription('The Movies API documentation')
    .setVersion('1.0')
    .addTag('movies')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/documentation', app, documentFactory);
};
