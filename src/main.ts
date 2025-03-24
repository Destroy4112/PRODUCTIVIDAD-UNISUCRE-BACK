import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/archivos', express.static(join(__dirname, '..', 'archivos')));
  await app.listen(3000);
}
bootstrap();
