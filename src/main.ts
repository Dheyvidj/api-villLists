import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './commom/filters/all-exception.filter';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

export async function config(app: INestApplication) {
  dotenv.config();
  app.enableCors({ origin: true });
  app.use(
    helmet({
      contentSecurityPolicy: true,
      crossOriginEmbedderPolicy: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const options = new DocumentBuilder()
    .setTitle('Api Listas')
    .setDescription(`Gerenciamento de listas de compras e ficha técnica\n\n`)
    .setVersion('0.0.1')
    .addServer(process.env.NODE_ENV === 'development' ? '/dev' : '/')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });
  return;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await config(app);
  await app.listen(5005);
}
bootstrap();
